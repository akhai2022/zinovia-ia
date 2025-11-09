variable "project_id" {
  description = "GCP project ID for deploying Cloud Run services."
  type        = string
}

variable "region" {
  description = "Region for Cloud Run services."
  type        = string
  default     = "europe-west1"
}

variable "vpc_connector" {
  description = "Name of the Serverless VPC connector to attach."
  type        = string
}

variable "service_account_base_roles" {
  description = "Base IAM roles granted to each Cloud Run service account."
  type        = set(string)
  default = [
    "roles/cloudsql.client",
    "roles/secretmanager.secretAccessor",
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter"
  ]
}

variable "services" {
  description = "List of Cloud Run service definitions."
  type = list(object({
    name            = string
    image           = string
    cpu             = optional(string, "1")
    memory          = optional(string, "512Mi")
    min_instances   = optional(number, 0)
    max_instances   = optional(number, 50)
    concurrency     = optional(number, 80)
    timeout_seconds = optional(number, 300)
    ingress         = optional(string, "INGRESS_TRAFFIC_ALL")
    env_vars        = optional(map(string), {})
    secrets = optional(list(object({
      env_name = string
      secret   = string
      version  = optional(string, "latest")
    })), [])
    annotations           = optional(map(string), {})
    labels                = optional(map(string), {})
    execution_environment = optional(string, "EXECUTION_ENVIRONMENT_GEN2")
    vpc_connector_egress  = optional(string, "ALL_TRAFFIC")
    additional_roles      = optional(set(string), [])
  }))
  default = []
}


