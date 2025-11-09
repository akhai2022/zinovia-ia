#!/bin/sh
set -euo pipefail

if [ -z "${DATABASE_URL:-}" ] && [ -n "${DB_USER:-}" ] && [ -n "${DB_PASSWORD:-}" ] && [ -n "${DB_HOST:-}" ] && [ -n "${DB_NAME:-}" ]; then
  DATABASE_URL="$(python - <<'PY'
import os
from urllib.parse import quote_plus

user = os.environ["DB_USER"]
password = quote_plus(os.environ["DB_PASSWORD"])
host = os.environ["DB_HOST"]
name = os.environ["DB_NAME"]
port = os.environ.get("DB_PORT", "5432")

print(f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{name}")
PY
)"
  export DATABASE_URL
  echo "Computed DATABASE_URL for Alembic migrations."
fi

echo "Running database migrations..."
set +e
MIGRATION_OUTPUT=$(alembic upgrade head 2>&1)
MIGRATION_STATUS=$?
set -e

if [ "$MIGRATION_STATUS" -ne 0 ]; then
  echo "$MIGRATION_OUTPUT"
  if printf "%s" "$MIGRATION_OUTPUT" | grep -qiE "duplicate|already exists"; then
    echo "Detected pre-existing schema; stamping Alembic head."
    alembic stamp head
  else
    echo "Alembic migration failed. Exiting."
    exit "$MIGRATION_STATUS"
  fi
fi

echo "Starting application..."
exec "$@"

