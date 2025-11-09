project_id  = "zinovia-ia"
region      = "europe-west1"
environment = "dev"

domain_name        = "zinovia.ai"
additional_domains = ["zinovia.ai"]

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
      APP_ENV              = "development"
      NEXT_PUBLIC_API_URL  = "https://api.zinovia.ai/api/v1"
      NEXT_PUBLIC_SITE_URL = "https://zinovia.ai"
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
    env_vars = {
      APP_ENV         = "development"
      ALLOWED_ORIGINS = "https://zinovia.ai,https://www.zinovia.ai"
      EMAIL_ENABLED   = "false"
      DB_PORT         = "5432"
    }
  }
]

db_tier                  = "db-custom-1-3840"
db_auto_storage_increase = true

monitoring_notification_channels = []

