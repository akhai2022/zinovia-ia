import logging
import re
from enum import Enum
from typing import Optional

from .models import ConversationState

logger = logging.getLogger(__name__)


class OnboardingState(str, Enum):
    GREETING = "GREETING"
    ASK_USER_TYPE = "ASK_USER_TYPE"
    ASK_GOAL = "ASK_GOAL"
    SHOW_SERVICES = "SHOW_SERVICES"
    COLLECT_CONTACT_NAME = "COLLECT_CONTACT_NAME"
    COLLECT_CONTACT_EMAIL = "COLLECT_CONTACT_EMAIL"
    SUMMARY = "SUMMARY"
    DONE = "DONE"


USER_TYPE_CHOICES = {"individual", "small_business", "enterprise"}

SERVICE_KEYWORDS = {
    "website": "Web Development & Frontend Apps",
    "web": "Web Development & Frontend Apps",
    "cloud": "Cloud Infrastructure & DevOps",
    "devops": "Cloud Infrastructure & DevOps",
    "infrastructure": "Cloud Infrastructure & DevOps",
    "ai": "AI Chatbots & Automation",
    "automation": "AI Chatbots & Automation",
    "data": "Data Analytics & Insights",
    "analytics": "Data Analytics & Insights",
}

EMAIL_REGEX = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def get_initial_state() -> ConversationState:
    return ConversationState(
        state=OnboardingState.GREETING.value,
    )


def detect_user_type(message: str) -> Optional[str]:
    cleaned = message.strip().lower()
    for choice in USER_TYPE_CHOICES:
        if choice.replace("_", " ") in cleaned:
            return choice
    if "startup" in cleaned or "small business" in cleaned:
        return "small_business"
    if "company" in cleaned or "enterprise" in cleaned or "corporate" in cleaned:
        return "enterprise"
    if "freelancer" in cleaned or "individual" in cleaned or "personal" in cleaned:
        return "individual"
    return None


def detect_service(goal: str, user_type: Optional[str]) -> Optional[str]:
    goal_lower = goal.lower()
    for keyword, service in SERVICE_KEYWORDS.items():
        if keyword in goal_lower:
            return service
    if user_type == "individual":
        return "AI Chatbots & Automation"
    if user_type == "small_business":
        return "Web Development & Frontend Apps"
    if user_type == "enterprise":
        return "Cloud Infrastructure & DevOps"
    return None


def validate_email(email: str) -> bool:
    return bool(EMAIL_REGEX.match(email))


def advance_state(conversation: ConversationState, user_message: str) -> ConversationState:
    state = OnboardingState(conversation.state)
    message_stripped = user_message.strip()

    if state == OnboardingState.GREETING:
        conversation.state = OnboardingState.ASK_USER_TYPE.value
        return conversation

    if state == OnboardingState.ASK_USER_TYPE:
        user_type = detect_user_type(message_stripped)
        if user_type:
            conversation.user_type = user_type
            conversation.state = OnboardingState.ASK_GOAL.value
        else:
            logger.debug("User type not detected from message: %s", message_stripped)
        return conversation

    if state == OnboardingState.ASK_GOAL:
        conversation.goal = message_stripped
        conversation.selected_service = detect_service(message_stripped, conversation.user_type)
        conversation.state = OnboardingState.SHOW_SERVICES.value
        return conversation

    if state == OnboardingState.SHOW_SERVICES:
        conversation.state = OnboardingState.COLLECT_CONTACT_NAME.value
        return conversation

    if state == OnboardingState.COLLECT_CONTACT_NAME:
        if len(message_stripped.split()) >= 1:
            conversation.name = message_stripped
            conversation.state = OnboardingState.COLLECT_CONTACT_EMAIL.value
        return conversation

    if state == OnboardingState.COLLECT_CONTACT_EMAIL:
        if validate_email(message_stripped):
            conversation.email = message_stripped
            conversation.state = OnboardingState.SUMMARY.value
        else:
            logger.debug("Invalid email supplied: %s", message_stripped)
        return conversation

    if state == OnboardingState.SUMMARY:
        conversation.state = OnboardingState.DONE.value
        return conversation

    # In DONE state we keep conversation for follow-up questions
    return conversation

