project_id  = "my-prod-project"
region      = "europe-west1"
environment = "prod"

domain_name        = "example.com"
additional_domains = ["www.example.com"]

frontend_services = [
  {
    name          = "web-frontend"
    image         = "europe-west1-docker.pkg.dev/my-prod-project/zinovia-frontend/web-frontend:prod"
    min_instances = 2
    max_instances = 50
    concurrency   = 80
    env_vars = {
      APP_ENV = "production"
    }
  }
]

monitoring_notification_channels = [
  "projects/my-prod-project/notificationChannels/1234567890123456789"
]

