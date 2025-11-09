variable "project_id" {
  description = "GCP project ID for all resources."
  type        = string
}

variable "region" {
  description = "Primary region for regional resources."
  type        = string
  default     = "europe-west1"
}

variable "environment" {
  description = "Environment label applied to resources."
  type        = string
  default     = "prod"
}

variable "domain_name" {
  description = "Primary domain name for the frontend."
  type        = string
  default     = "example.com"

  validation {
    condition     = length(regexall("\\.", var.domain_name)) > 0
    error_message = "domain_name must be a valid DNS name that includes at least one dot."
  }
}

variable "additional_domains" {
  description = "Additional domains (SANs) for HTTPS certificate."
  type        = list(string)
  default     = ["www.example.com"]

  validation {
    condition = alltrue([
      for d in var.additional_domains : length(regexall("\\.", d)) > 0
    ])
    error_message = "Each entry in additional_domains must be a valid DNS name that includes at least one dot."
  }
}

variable "network_name" {
  description = "Name of the VPC network."
  type        = string
  default     = "frontend-vpc"
}

variable "routing_mode" {
  description = "Routing mode for the VPC network."
  type        = string
  default     = "GLOBAL"
}

variable "subnets" {
  description = "Map of subnet definitions for the VPC."
  type = map(object({
    ip_cidr_range            = string
    region                   = optional(string)
    private_ip_google_access = optional(bool, true)
    description              = optional(string, "")
    purpose                  = optional(string)
    role                     = optional(string)
    enable_flow_logs         = optional(bool, true)
    secondary_ip_ranges      = optional(list(object({ range_name = string, ip_cidr_range = string })), [])
  }))
  default = {}
}

variable "firewall_rules" {
  description = "Additional firewall rules for the VPC."
  type = list(object({
    name                    = string
    description             = optional(string, "")
    direction               = optional(string, "INGRESS")
    priority                = optional(number, 1000)
    source_ranges           = optional(list(string), null)
    destination_ranges      = optional(list(string), null)
    target_tags             = optional(list(string), [])
    target_service_accounts = optional(list(string), [])
    allowed = list(object({
      protocol = string
      ports    = optional(list(string), null)
    }))
  }))
  default = []
}

variable "vpc_connector_config" {
  description = "Serverless VPC connector configuration."
  type = object({
    name           = optional(string, "frontend-connector")
    machine_type   = optional(string, "e2-micro")
    min_instances  = optional(number, 2)
    max_instances  = optional(number, 3)
    subnet_name    = optional(string, "connector-subnet")
    min_throughput = optional(number, 200)
    max_throughput = optional(number, 300)
  })
  default = {}
}

variable "psa_config" {
  description = "Private Service Access configuration."
  type = object({
    address_name  = optional(string, "frontend-psa-range")
    prefix_length = optional(number, 20)
    service       = optional(string, "servicenetworking.googleapis.com")
  })
  default = {}
}

variable "frontend_services" {
  description = "List of frontend Cloud Run services."
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
    attach_database       = optional(bool, false)
    expose_via_lb         = optional(bool, true)
    db_port               = optional(string, "5432")
  }))
  default = []
}

variable "service_account_base_roles" {
  description = "Base IAM roles applied to Cloud Run service accounts."
  type        = set(string)
  default = [
    "roles/cloudsql.client",
    "roles/secretmanager.secretAccessor",
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter"
  ]
}

variable "llm_service" {
  description = "Optional configuration for a dedicated LLM Cloud Run service (e.g., Ollama)."
  type = object({
    name            = string
    image           = string
    model           = optional(string, "llama3.2")
    cpu             = optional(string, "4")
    memory          = optional(string, "16Gi")
    min_instances   = optional(number, 0)
    max_instances   = optional(number, 1)
    concurrency     = optional(number, 1)
    timeout_seconds = optional(number, 600)
    ingress         = optional(string, "INGRESS_TRAFFIC_INTERNAL_ONLY")
    env_vars        = optional(map(string), {})
    secrets = optional(list(object({
      env_name = string
      secret   = string
      version  = optional(string, "latest")
    })), [])
    annotations           = optional(map(string), {})
    labels                = optional(map(string), {})
    execution_environment = optional(string, "EXECUTION_ENVIRONMENT_GEN2")
    vpc_connector_egress  = optional(string, "PRIVATE_RANGES_ONLY")
    additional_roles      = optional(set(string), [])
  })
  default = null
}

variable "db_instance_name" {
  description = "Name of the Cloud SQL instance."
  type        = string
  default     = "frontend-contact-sql"
}

variable "db_database_version" {
  description = "Database engine version."
  type        = string
  default     = "POSTGRES_15"
}

variable "db_tier" {
  description = "Machine tier for Cloud SQL."
  type        = string
  default     = "db-custom-2-3840"
}

variable "db_availability_type" {
  description = "Availability configuration for Cloud SQL."
  type        = string
  default     = "REGIONAL"
}

variable "db_disk_type" {
  description = "Disk type for Cloud SQL."
  type        = string
  default     = "PD_SSD"
}

variable "db_disk_size" {
  description = "Initial disk size for Cloud SQL."
  type        = number
  default     = 50
}

variable "db_auto_storage_increase" {
  description = "Enable automatic storage increase."
  type        = bool
  default     = true
}

variable "db_backup_configuration" {
  description = "Backup settings for Cloud SQL."
  type = object({
    enabled                        = bool
    start_time                     = string
    location                       = optional(string, null)
    point_in_time_recovery_enabled = optional(bool, true)
  })
  default = {
    enabled                        = true
    start_time                     = "03:00"
    point_in_time_recovery_enabled = true
  }
}

variable "db_maintenance_window" {
  description = "Preferred maintenance window for Cloud SQL."
  type = object({
    day          = number
    hour         = number
    update_track = optional(string, "stable")
  })
  default = {
    day          = 7
    hour         = 3
    update_track = "stable"
  }
}

variable "db_insights_config" {
  description = "Cloud SQL insights configuration."
  type = object({
    query_insights_enabled  = bool
    query_string_length     = optional(number, 1024)
    record_application_tags = optional(bool, true)
    record_client_address   = optional(bool, true)
  })
  default = {
    query_insights_enabled  = true
    query_string_length     = 1024
    record_application_tags = true
    record_client_address   = true
  }
}

variable "db_name" {
  description = "Application database name."
  type        = string
  default     = "contact_form_db"
}

variable "db_charset" {
  description = "Database character set."
  type        = string
  default     = "UTF8"
}

variable "db_collation" {
  description = "Database collation."
  type        = string
  default     = "en_US.UTF8"
}

variable "db_user" {
  description = "Application database user."
  type        = string
  default     = "contact_form_app"
}

variable "db_password_secret_id" {
  description = "Secret ID for the database password."
  type        = string
  default     = "db-contact-form-password"
}

variable "monitoring_notification_channels" {
  description = "Notification channel IDs for alerting."
  type        = list(string)
  default     = []
}

variable "load_balancer_name" {
  description = "Base name for load balancer resources."
  type        = string
  default     = "frontend-lb"
}

variable "managed_zone_name" {
  description = "Cloud DNS managed zone name."
  type        = string
  default     = "frontend-zone"
}

variable "enable_cdn" {
  description = "Enable Cloud CDN for the HTTPS load balancer."
  type        = bool
  default     = false
}

