from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    session_id: str = Field(..., description="Client-generated session identifier")
    message: str = Field(..., min_length=1, description="Latest user message")
    metadata: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Optional metadata supplied by the client for future use",
    )


class ChatResponse(BaseModel):
    reply: str
    session_id: str
    state: str
    finished: bool
    debug: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Optional debugging information when DEBUG_MODE is enabled",
    )


class Message(BaseModel):
    role: str
    content: str


class ConversationState(BaseModel):
    state: str
    user_type: Optional[str] = None
    goal: Optional[str] = None
    selected_service: Optional[str] = None
    name: Optional[str] = None
    email: Optional[str] = None
    history: List[Message] = Field(default_factory=list)

