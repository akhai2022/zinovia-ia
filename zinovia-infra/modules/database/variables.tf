variable "project_id" {
  description = "GCP project ID where the Cloud SQL resources will be created."
  type        = string
}

variable "region" {
  description = "Region for regional Cloud SQL resources."
  type        = string
  default     = "europe-west1"
}

variable "instance_name" {
  description = "Name of the Cloud SQL instance."
  type        = string
  default     = "frontend-contact-sql"
}

variable "database_version" {
  description = "Cloud SQL database engine version."
  type        = string
  default     = "POSTGRES_15"
}

variable "tier" {
  description = "Machine tier for the Cloud SQL instance."
  type        = string
  default     = "db-custom-2-3840"
}

variable "availability_type" {
  description = "Availability type for Cloud SQL (ZONAL or REGIONAL)."
  type        = string
  default     = "REGIONAL"
}

variable "disk_type" {
  description = "Disk type to use for Cloud SQL."
  type        = string
  default     = "PD_SSD"
}

variable "disk_size" {
  description = "Initial disk size in GB."
  type        = number
  default     = 50
}

variable "auto_storage_increase" {
  description = "Enable automatic storage increase."
  type        = bool
  default     = true
}

variable "deletion_protection" {
  description = "Whether to enable deletion protection on the Cloud SQL instance."
  type        = bool
  default     = false
}

variable "backup_configuration" {
  description = "Automated backup configuration."
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

variable "maintenance_window" {
  description = "Preferred maintenance window."
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

variable "insights_config" {
  description = "Query insights configuration."
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

variable "database_name" {
  description = "Name of the application database to create."
  type        = string
  default     = "contact_form_db"
}

variable "database_charset" {
  description = "Character set for the application database."
  type        = string
  default     = "UTF8"
}

variable "database_collation" {
  description = "Collation for the application database."
  type        = string
  default     = "en_US.UTF8"
}

variable "db_user_name" {
  description = "Database user for the application."
  type        = string
  default     = "contact_form_app"
}

variable "secret_id" {
  description = "Secret Manager ID for storing the database password."
  type        = string
  default     = "db-contact-form-password"
}

variable "password_length" {
  description = "Length of the generated database password."
  type        = number
  default     = 32
}

variable "network_self_link" {
  description = "Self link of the VPC network for private service access."
  type        = string
}

variable "service_networking_range" {
  description = "Name of the reserved IP range for private service access."
  type        = string
}


