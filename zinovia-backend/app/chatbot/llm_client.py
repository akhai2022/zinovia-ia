import asyncio
import logging
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional

import httpx
from fastapi import HTTPException, status

logger = logging.getLogger(__name__)


class BaseLLMClient(ABC):
    @abstractmethod
    async def chat(self, system_prompt: str, messages: List[Dict[str, str]]) -> str:
        raise NotImplementedError


class OpenAICompatibleLLMClient(BaseLLMClient):
    def __init__(
        self,
        *,
        base_url: str,
        api_path: str,
        model_name: str,
        api_key: Optional[str] = None,
        timeout_seconds: float = 15.0,
        identity_audience: Optional[str] = None,
    ) -> None:
        self._base_url = base_url.rstrip("/")
        self._api_path = api_path if api_path.startswith("/") else f"/{api_path}"
        self._model_name = model_name
        self._api_key = api_key
        self._timeout = timeout_seconds
        self._identity_audience = identity_audience

    async def chat(self, system_prompt: str, messages: List[Dict[str, str]]) -> str:
        payload = {
            "model": self._model_name,
            "messages": [{"role": "system", "content": system_prompt}, *messages],
        }
        headers: Dict[str, str] = {"Content-Type": "application/json"}
        if self._api_key:
            headers["Authorization"] = f"Bearer {self._api_key}"

        auth_headers = await self._build_identity_headers()
        headers.update(auth_headers)

        api_path = self._api_path
        if self._base_url.endswith("/v1") and api_path.startswith("/v1/"):
            api_path = api_path[3:]
        url = f"{self._base_url}{api_path}"
        try:
            async with httpx.AsyncClient(timeout=self._timeout) as client:
                response = await client.post(url, json=payload, headers=headers)
        except httpx.RequestError as exc:
            logger.exception("LLM request failed: %s", exc)
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Unable to reach language model service. Please try again later.",
            ) from exc

        if response.status_code >= 400:
            logger.error(
                "LLM returned error status %s: %s", response.status_code, response.text
            )
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Language model service responded with an error.",
            )

        data: Dict[str, Any] = response.json()
        try:
            return data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError) as exc:
            logger.exception("Unexpected LLM response format: %s", data)
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Invalid response from language model service.",
            ) from exc

    async def _build_identity_headers(self) -> Dict[str, str]:
        if not self._identity_audience:
            return {}

        def _blocking_fetch() -> str:
            try:
                from google.auth.transport.requests import Request
                from google.oauth2 import id_token
            except ImportError as exc:  # pragma: no cover - defensive
                logger.error("google-auth library is required for identity tokens")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Server is missing google-auth dependency required for identity tokens.",
                ) from exc

            request = Request()
            try:
                return id_token.fetch_id_token(request, self._identity_audience)
            except Exception as exc:  # pragma: no cover
                logger.exception("Failed to fetch identity token for audience %s", self._identity_audience)
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail="Unable to authenticate with language model service.",
                ) from exc

        loop = asyncio.get_running_loop()
        token = await loop.run_in_executor(None, _blocking_fetch)
        return {"Authorization": f"Bearer {token}"}

