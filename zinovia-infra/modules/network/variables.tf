variable "project_id" {
  description = "GCP project ID where the network resources will be created."
  type        = string
}

variable "region" {
  description = "Region for regional resources such as subnets and the serverless VPC connector."
  type        = string
  default     = "europe-west1"
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
  description = "Map of subnet configurations keyed by subnet name."
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
  default = {
    frontend-public-subnet = {
      ip_cidr_range            = "10.0.1.0/24"
      private_ip_google_access = true
      description              = "Public facing subnet for load balancer proxies and shared services."
    }
    services-subnet = {
      ip_cidr_range            = "10.0.2.0/24"
      private_ip_google_access = true
      description              = "Subnet used by the Serverless VPC connector to reach private resources."
    }
    database-subnet = {
      ip_cidr_range            = "10.0.3.0/24"
      private_ip_google_access = true
      description              = "Subnet reserved for database and internal services."
    }
    connector-subnet = {
      ip_cidr_range            = "10.0.4.0/28"
      private_ip_google_access = true
      description              = "Dedicated /28 subnet for the Serverless VPC connector."
    }
  }
}

variable "firewall_rules" {
  description = "List of additional firewall rules to create."
  type = list(object({
    name                    = string
    description             = optional(string, "")
    direction               = optional(string, "INGRESS")
    priority                = optional(number, 1000)
    ranges                  = optional(list(string), [])
    source_ranges           = optional(list(string), null)
    destination_ranges      = optional(list(string), null)
    target_tags             = optional(list(string), [])
    target_service_accounts = optional(list(string), [])
    allowed = list(object({
      protocol = string
      ports    = optional(list(string), null)
    }))
  }))
  default = [
    {
      name               = "allow-serverless-egress-http"
      description        = "Allow Serverless VPC connector subnet to reach internet services on HTTP/HTTPS."
      direction          = "EGRESS"
      priority           = 65534
      destination_ranges = ["0.0.0.0/0"]
      source_ranges      = ["10.0.2.0/24"]
      allowed = [
        {
          protocol = "tcp"
          ports    = ["80", "443"]
        }
      ]
    },
    {
      name          = "allow-internal-all"
      description   = "Allow all internal communication within the VPC."
      direction     = "INGRESS"
      priority      = 65535
      source_ranges = ["10.0.0.0/8"]
      allowed = [
        {
          protocol = "all"
        }
      ]
    }
  ]
}

variable "vpc_connector" {
  description = "Configuration for the Serverless VPC connector."
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
  description = "Private Service Access configuration for managed services like Cloud SQL."
  type = object({
    address_name  = optional(string, "frontend-psa-range")
    prefix_length = optional(number, 20)
    service       = optional(string, "servicenetworking.googleapis.com")
  })
  default = {}
}



