from __future__ import annotations

import re
from collections import Counter
from functools import lru_cache
from pathlib import Path
from typing import Iterable, List, Tuple

BASE_PATH = Path(__file__).resolve().parent
DATA_PATH = BASE_PATH / "data" / "zinovia_enhanced_presentation.md"


def _tokenize(text: str) -> List[str]:
    return re.findall(r"[a-zA-Z0-9']+", text.lower())


@lru_cache(maxsize=1)
def _load_sections() -> List[dict]:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Knowledge base file missing: {DATA_PATH}")

    raw_text = DATA_PATH.read_text(encoding="utf-8")
    sections: List[dict] = []

    current_title = "Overview"
    current_lines: List[str] = []

    def _flush_section() -> None:
        if not current_lines:
            return
        content = "\n".join(line.strip() for line in current_lines if line.strip())
        tokens = _tokenize(content)
        sections.append(
            {
                "title": current_title,
                "content": content,
                "token_counts": Counter(tokens),
                "token_set": set(tokens),
            }
        )

    for line in raw_text.splitlines():
        if line.startswith("## "):
            _flush_section()
            current_title = line[3:].strip()
            current_lines = []
        else:
            current_lines.append(line)

    _flush_section()
    return sections


def _score_section(tokens: Iterable[str], section: dict) -> int:
    return sum(section["token_counts"].get(token, 0) for token in tokens)


def get_relevant_sections(query: str, max_sections: int = 3) -> Tuple[List[str], bool]:
    sections = _load_sections()
    query_tokens = _tokenize(query)
    if not query_tokens:
        return [], False

    scored: List[Tuple[int, dict]] = []
    for section in sections:
        score = _score_section(query_tokens, section)
        if score > 0:
            scored.append((score, section))

    if not scored:
        return [], False

    scored.sort(key=lambda item: item[0], reverse=True)
    top_sections = [item[1]["content"] for item in scored[:max_sections]]
    return top_sections, True


def get_default_context() -> str:
    sections = _load_sections()
    if not sections:
        return ""
    # Provide the first two sections as foundational context
    snippets = [sections[0]["content"]]
    if len(sections) > 1:
        snippets.append(sections[1]["content"])
    return "\n\n".join(snippets)


def build_context(query: str) -> Tuple[str, bool]:
    sections, matched = get_relevant_sections(query)
    if matched:
        return "\n\n".join(sections), True
    return get_default_context(), False


