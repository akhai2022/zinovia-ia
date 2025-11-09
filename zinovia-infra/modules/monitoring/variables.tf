variable "project_id" {
  description = "Project ID for monitoring resources."
  type        = string
}

variable "domain_name" {
  description = "Domain endpoint to target with uptime checks."
  type        = string
  default     = "example.com"
}

variable "notification_channels" {
  description = "List of Monitoring notification channel IDs."
  type        = list(string)
  default     = []
}

variable "cloud_run_services" {
  description = "List of Cloud Run service names to monitor."
  type        = list(string)
  default     = []
}


