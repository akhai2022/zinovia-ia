import logging
from typing import Dict, List

from fastapi import APIRouter, Depends

from app.chatbot.config import Settings, get_settings
from app.chatbot.llm_client import BaseLLMClient, OpenAICompatibleLLMClient
from app.chatbot.memory_store import get_session, save_session
from app.chatbot.models import ChatRequest, ChatResponse, ConversationState, Message
from app.chatbot.services_descriptions import format_services_listing
from app.chatbot.state import OnboardingState, advance_state

logger = logging.getLogger(__name__)

router = APIRouter()

_llm_client: BaseLLMClient | None = None


def get_llm_client(settings: Settings = Depends(get_settings)) -> BaseLLMClient:
    global _llm_client
    if _llm_client is None:
        _llm_client = OpenAICompatibleLLMClient(
            base_url=settings.llm_api_base_url,
            api_path=settings.llm_api_path,
            model_name=settings.llm_model_name,
            api_key=settings.llm_api_key,
        )
    return _llm_client


def _state_instruction(state: OnboardingState, conversation: ConversationState) -> str:
    match state:
        case OnboardingState.GREETING:
            return (
                "Greet the user warmly, briefly introduce Zinovia's AI solutions, "
                "and ask what brings them here today."
            )
        case OnboardingState.ASK_USER_TYPE:
            return (
                "Ask the user to identify themselves as an individual, small business, "
                "or enterprise. If they already implied one, acknowledge it and confirm "
                "before moving forward."
            )
        case OnboardingState.ASK_GOAL:
            return (
                "Ask about their primary goal or challenge. Encourage a concise description."
            )
        case OnboardingState.SHOW_SERVICES:
            suggestion = conversation.selected_service or "the service that best fits them"
            return (
                "Present the available services with short descriptions. "
                f"Highlight {suggestion} as a likely fit based on what you know. "
                "After presenting options, transition by asking for their name."
            )
        case OnboardingState.COLLECT_CONTACT_NAME:
            return "Politely ask for their name so we can personalize future communications."
        case OnboardingState.COLLECT_CONTACT_EMAIL:
            return (
                "Ask for their email address. Mention that a professional or best contact email "
                "is ideal and validate that it includes an '@' symbol."
            )
        case OnboardingState.SUMMARY:
            return (
                "Summarize the collected details (user type, goal, recommended service, name, email). "
                "Confirm we will follow up soon and invite any final questions."
            )
        case OnboardingState.DONE:
            return (
                "The onboarding flow is complete. Answer follow-up questions helpfully using the "
                "service knowledge while remaining friendly and concise."
            )
    return "Continue the conversation helpfully."


def _build_system_prompt(
    conversation: ConversationState, state_override: OnboardingState | None = None
) -> str:
    state = state_override or OnboardingState(conversation.state)
    details: List[str] = []
    if conversation.user_type:
        details.append(f"User type: {conversation.user_type}")
    if conversation.goal:
        details.append(f"Goal: {conversation.goal}")
    if conversation.selected_service:
        details.append(f"Suggested service: {conversation.selected_service}")
    if conversation.name:
        details.append(f"Name: {conversation.name}")
    if conversation.email:
        details.append(f"Email: {conversation.email}")

    structured_summary = "\n".join(details) if details else "No structured details captured yet."

    instruction = _state_instruction(state, conversation)

    return (
        "You are Zinovia's customer onboarding assistant. "
        "You guide prospects through a short discovery flow and recommend services. "
        "Keep responses friendly, concise, and professional. "
        "If the user asks unrelated questions, answer them briefly and steer back to the flow.\n\n"
        f"Current onboarding state: {state.value}\n"
        f"Structured details so far:\n{structured_summary}\n\n"
        "Available services:\n"
        f"{format_services_listing()}\n\n"
        f"Next action: {instruction}\n"
        "When presenting services, prefer short paragraphs or bullet lists. "
        "Thank the user during summary and reassure that a human will follow up soon."
    )


def _conversation_history_to_messages(conversation: ConversationState) -> List[Dict[str, str]]:
    # limit to last 12 messages to keep prompt manageable
    recent_history = conversation.history[-12:]
    return [msg.model_dump() for msg in recent_history]


@router.post("/chat", response_model=ChatResponse, tags=["Chatbot"])
async def chat_endpoint(
    payload: ChatRequest,
    settings: Settings = Depends(get_settings),
    llm_client: BaseLLMClient = Depends(get_llm_client),
) -> ChatResponse:
    conversation = get_session(payload.session_id)
    previous_state = OnboardingState(conversation.state)

    # Determine state transitions and structured data updates
    conversation = advance_state(conversation, payload.message)
    current_state = OnboardingState(conversation.state)

    state_for_prompt = current_state
    if (
        previous_state == OnboardingState.GREETING
        and not conversation.history
        and current_state == OnboardingState.ASK_USER_TYPE
    ):
        state_for_prompt = OnboardingState.GREETING

    system_prompt = _build_system_prompt(conversation, state_for_prompt)
    history_messages = _conversation_history_to_messages(conversation)
    history_messages.append({"role": "user", "content": payload.message})

    reply = await llm_client.chat(system_prompt, history_messages)

    # Update history with latest exchange
    conversation.history.extend(
        [
            Message(role="user", content=payload.message),
            Message(role="assistant", content=reply),
        ]
    )
    if len(conversation.history) > 50:
        conversation.history = conversation.history[-50:]

    save_session(payload.session_id, conversation)

    if conversation.state in {OnboardingState.SUMMARY.value, OnboardingState.DONE.value}:
        logger.info(
            "Onboarding conversation summary",
            extra={
                "session_id": payload.session_id,
                "user_type": conversation.user_type,
                "goal": conversation.goal,
                "selected_service": conversation.selected_service,
                "name": conversation.name,
                "email": conversation.email,
            },
        )

    debug_info = None
    if settings.debug_mode:
        debug_info = {
            "state": conversation.state,
            "user_type": conversation.user_type,
            "goal": conversation.goal,
            "selected_service": conversation.selected_service,
            "history_length": len(conversation.history),
        }

    return ChatResponse(
        reply=reply,
        session_id=payload.session_id,
        state=conversation.state,
        finished=conversation.state == OnboardingState.DONE.value,
        debug=debug_info,
    )

