#!/usr/bin/env bash
set -euo pipefail

MODEL_NAME="${OLLAMA_MODEL:-$DEFAULT_MODEL}"
PORT_NUMBER="${PORT:-${OLLAMA_PORT:-11434}}"
export OLLAMA_PORT="${PORT_NUMBER}"

echo "Starting Ollama server with model: ${MODEL_NAME} on port ${OLLAMA_PORT}"

ollama serve --host 0.0.0.0 --port "${OLLAMA_PORT}" &
SERVER_PID=$!

echo "Waiting for Ollama server to become ready..."
until curl -sf -o /dev/null "http://127.0.0.1:${OLLAMA_PORT}/api/tags"; do
  sleep 1
done

if ! curl -sf -X POST "http://127.0.0.1:${OLLAMA_PORT}/api/pull" \
  -H "Content-Type: application/json" \
  -d '{"name": "'"${MODEL_NAME}"'"}'; then
  echo "Failed to pull model ${MODEL_NAME}" >&2
  kill "${SERVER_PID}"
  exit 1
fi

wait "${SERVER_PID}"

