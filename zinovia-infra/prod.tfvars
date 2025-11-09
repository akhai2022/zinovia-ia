project_id  = "my-prod-project"
region      = "europe-west1"
environment = "prod"

domain_name        = "example.com"
additional_domains = ["www.example.com"]

llm_service = {
  name            = "ollama-llm-prod"
  image           = "europe-west1-docker.pkg.dev/my-prod-project/backend/zinovia-ollama:prod"
  model           = "llama3.2"
  cpu             = "4"
  memory          = "16Gi"
  min_instances   = 1
  max_instances   = 2
  concurrency     = 1
  timeout_seconds = 600
  ingress         = "INGRESS_TRAFFIC_INTERNAL_ONLY"
  env_vars = {
    OLLAMA_KEEP_ALIVE = "10m"
  }
}

frontend_services = [
  {
    name          = "web-frontend"
    image         = "europe-west1-docker.pkg.dev/my-prod-project/zinovia-frontend/web-frontend:prod"
    min_instances = 2
    max_instances = 50
    concurrency   = 80
    env_vars = {
      APP_ENV                  = "production"
      NEXT_PUBLIC_API_URL      = "https://api-backend-prod-xxxxxxxxxx-ew.a.run.app/api/v1"
      NEXT_PUBLIC_CHAT_API_URL = "https://api-backend-prod-xxxxxxxxxx-ew.a.run.app"
    }
  },
  {
    name            = "api-backend-prod"
    image           = "europe-west1-docker.pkg.dev/my-prod-project/backend/zinovia-backend:prod"
    min_instances   = 1
    max_instances   = 20
    concurrency     = 40
    timeout_seconds = 60
    attach_database = true
    expose_via_lb   = false
    use_llm_service = true
    env_vars = {
      APP_ENV         = "production"
      ALLOWED_ORIGINS = "https://example.com,https://www.example.com"
      EMAIL_ENABLED   = "true"
      DB_PORT         = "5432"
      LLM_API_PATH    = "/api/chat"
      LLM_MODEL_NAME  = "llama3.2"
      DEBUG_MODE      = "false"
    }
  }
]

monitoring_notification_channels = [
  "projects/my-prod-project/notificationChannels/1234567890123456789"
]

