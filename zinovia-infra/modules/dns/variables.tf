variable "project_id" {
  description = "GCP project ID for DNS and load balancer resources."
  type        = string
}

variable "domain_name" {
  description = "Primary domain managed by Cloud DNS and HTTPS load balancer."
  type        = string
  default     = "example.com"
}

variable "additional_domains" {
  description = "Additional subject alternative names for the SSL certificate."
  type        = list(string)
  default     = ["www.example.com"]
}

variable "cloud_run_services" {
  description = "Mapping of Cloud Run service identifiers to their configuration."
  type = map(object({
    name    = string
    region  = string
    project = optional(string)
  }))
}

variable "load_balancer_name" {
  description = "Base name for load balancer resources."
  type        = string
  default     = "frontend-lb"
}

variable "managed_zone_name" {
  description = "Name of the Cloud DNS managed zone."
  type        = string
  default     = "frontend-zone"
}

variable "dns_ttl" {
  description = "TTL for DNS A/AAAA records."
  type        = number
  default     = 300
}

variable "enable_cdn" {
  description = "Enable Cloud CDN on the backend service."
  type        = bool
  default     = false
}


