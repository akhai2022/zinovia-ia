"""
Ephemeral in-memory session store.

IMPORTANT: Cloud Run instances are stateless and may be restarted at any time.
This module is suitable only for local development or single-instance demos.
For production deployments, replace with a shared data store such as Redis,
Firestore, or a relational database.
"""

from typing import Dict

from .models import ConversationState
from .state import get_initial_state

_sessions: Dict[str, ConversationState] = {}


def get_session(session_id: str) -> ConversationState:
    if session_id not in _sessions:
        _sessions[session_id] = get_initial_state()
    return _sessions[session_id]


def save_session(session_id: str, state: ConversationState) -> None:
    _sessions[session_id] = state

