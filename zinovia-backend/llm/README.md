## Ollama LLM Service

This directory contains the Docker assets for running an Ollama server on Cloud Run. The image pulls the requested model at startup and exposes the OpenAI-compatible chat endpoint on port `11434`.

### Build & Push

```bash
# Build & push to Artifact Registry (adjust tag as needed)
make llm-push \
  LLM_IMAGE_TAG=2025-11-09-llm \
  LLM_REGISTRY_HOST=europe-west1-docker.pkg.dev \
  LLM_REGISTRY_REPO=zinovia-ia/backend
```

Environment variables:

- `OLLAMA_MODEL` (or `DEFAULT_MODEL` build-time) – name of the model to preload (defaults to `llama3.2`).
- `OLLAMA_KEEP_ALIVE` – optional keep-alive duration for model in memory.

Cloud Run services should set `LLM_API_PATH=/api/chat` when using this backend.

