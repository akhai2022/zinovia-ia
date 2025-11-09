project_id  = "zinovia-ia"
region      = "europe-west1"
environment = "dev"

domain_name        = "zinovia.ai"
additional_domains = ["www.zinovia.ai"]

llm_service = {
  name            = "ollama-llm-dev"
  image           = "europe-west1-docker.pkg.dev/zinovia-ia/backend/zinovia-ollama:2025-11-09-llm"
  model           = "llama3.2"
  cpu             = "4"
  memory          = "16Gi"
  min_instances   = 0
  max_instances   = 1
  concurrency     = 1
  timeout_seconds = 600
  ingress         = "INGRESS_TRAFFIC_INTERNAL_ONLY"
  env_vars = {
    OLLAMA_KEEP_ALIVE = "5m"
  }
}

frontend_services = [
  {
    name            = "zinovia-frontend-dev"
    image           = "europe-west1-docker.pkg.dev/zinovia-ia/frontend/zinovia-frontend:dev"
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
    image           = "europe-west1-docker.pkg.dev/zinovia-ia/backend/zinovia-backend:dev"
    min_instances   = 0
    max_instances   = 10
    concurrency     = 40
    timeout_seconds = 60
    attach_database = true
    expose_via_lb   = false
    use_llm_service = true
    env_vars = {
      APP_ENV         = "development"
      ALLOWED_ORIGINS = "https://zinovia.ai,https://www.zinovia.ai,https://zinovia-frontend-dev-keugzsgvkq-ew.a.run.app"
      EMAIL_ENABLED   = "false"
      DB_PORT         = "5432"
      LLM_API_PATH    = "/api/chat"
      LLM_MODEL_NAME  = "llama3.2"
      DEBUG_MODE      = "false"
    }
  }
]

db_tier                  = "db-custom-1-3840"
db_auto_storage_increase = true

monitoring_notification_channels = []

