from functools import lru_cache
from typing import Optional

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_env: str = Field(default="dev", alias="APP_ENV")
    llm_api_base_url: str = Field(alias="LLM_API_BASE_URL")
    llm_api_key: Optional[str] = Field(default=None, alias="LLM_API_KEY")
    llm_model_name: str = Field(alias="LLM_MODEL_NAME")
    llm_api_path: str = Field(
        default="/v1/chat/completions",
        alias="LLM_API_PATH",
        description="Relative path appended to LLM_API_BASE_URL. For OpenAI compatible APIs this is typically /v1/chat/completions.",
    )
    debug_mode: bool = Field(default=False, alias="DEBUG_MODE")
    llm_identity_audience: Optional[str] = Field(
        default=None,
        alias="LLM_IDENTITY_AUDIENCE",
        description="Optional audience for generating Google Cloud ID tokens when calling a protected Cloud Run LLM service.",
    )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        populate_by_name = True


@lru_cache
def get_settings() -> Settings:
    return Settings()

