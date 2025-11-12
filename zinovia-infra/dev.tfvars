project_id  = "zinovia-ia"
region      = "europe-west1"
environment = "dev"

domain_name        = "zinovia.ai"
additional_domains = ["www.zinovia.ai"]

llm_service = null

frontend_services = [
  {
    name            = "zinovia-frontend-dev"
    image           = "europe-west1-docker.pkg.dev/zinovia-ia/frontend/zinovia-frontend:home-refresh-2025-11-12b"
    min_instances   = 0
    max_instances   = 5
    concurrency     = 40
    attach_database = false
    expose_via_lb   = true
    env_vars = {
      APP_ENV                  = "development"
      NEXT_PUBLIC_API_URL      = "https://api-backend-dev-keugzsgvkq-ew.a.run.app/api/v1"
      NEXT_PUBLIC_CHAT_API_URL = "https://api-backend-dev-keugzsgvkq-ew.a.run.app"
      NEXT_PUBLIC_SITE_URL     = "https://zinovia.ai"
    }
  },
  {
    name            = "api-backend-dev"
    image           = "europe-west1-docker.pkg.dev/zinovia-ia/backend/zinovia-backend:chatbot-2025-11-10-knowledge-fallback2"
    min_instances   = 0
    max_instances   = 10
    concurrency     = 40
    timeout_seconds = 60
    attach_database = true
    expose_via_lb   = false
    use_llm_service = false
    env_vars = {
      APP_ENV         = "development"
      ALLOWED_ORIGINS = "https://zinovia.ai,https://www.zinovia.ai,https://zinovia-frontend-dev-keugzsgvkq-ew.a.run.app,https://zinovia-frontend-dev-138959035365.europe-west1.run.app"
      EMAIL_ENABLED   = "false"
      DB_PORT         = "5432"
      LLM_API_PATH    = "/api/chat"
      LLM_MODEL_NAME  = "llama3.2"
      LLM_API_BASE_URL = "https://ollama-llm-dev-138959035365.europe-west1.run.app"
      LLM_IDENTITY_AUDIENCE = "https://ollama-llm-dev-138959035365.europe-west1.run.app"
      DEBUG_MODE      = "false"
    }
  }
]

db_tier                  = "db-custom-1-3840"
db_auto_storage_increase = true

monitoring_notification_channels = []

