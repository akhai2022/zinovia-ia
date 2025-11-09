locals {
  effective_subnets = {
    for name, subnet in var.subnets :
    name => merge(
      {
        region                   = var.region
        private_ip_google_access = true
        description              = ""
        enable_flow_logs         = true
        purpose                  = null
        role                     = null
        secondary_ip_ranges      = []
      },
      subnet,
      { region = coalesce(lookup(subnet, "region", null), var.region) }
    )
  }

  firewall_rules = [
    for rule in var.firewall_rules :
    merge(
      {
        description             = ""
        direction               = "INGRESS"
        priority                = 1000
        ranges                  = []
        source_ranges           = null
        destination_ranges      = null
        target_tags             = []
        target_service_accounts = []
      },
      rule
    )
  ]

  raw_connector_name       = lower(coalesce(var.vpc_connector.name, "frontend-connector"))
  sanitized_connector_name = substr(trim(join("-", regexall("[a-z0-9]+", local.raw_connector_name)), "-"), 0, 25)
  vpc_connector_name       = length(local.sanitized_connector_name) > 1 ? local.sanitized_connector_name : "frontend-connector"
  connector_subnet_name    = coalesce(try(var.vpc_connector.subnet_name, null), "connector-subnet")
}

resource "google_compute_network" "this" {
  name                    = var.network_name
  project                 = var.project_id
  auto_create_subnetworks = false
  routing_mode            = var.routing_mode
}

resource "google_compute_subnetwork" "this" {
  for_each                 = local.effective_subnets
  name                     = each.key
  ip_cidr_range            = each.value.ip_cidr_range
  region                   = each.value.region
  project                  = var.project_id
  network                  = google_compute_network.this.id
  private_ip_google_access = each.value.private_ip_google_access
  description              = each.value.description
  purpose                  = each.value.purpose
  role                     = each.value.role
  dynamic "secondary_ip_range" {
    for_each = each.value.secondary_ip_ranges
    content {
      range_name    = secondary_ip_range.value.range_name
      ip_cidr_range = secondary_ip_range.value.ip_cidr_range
    }
  }

}

resource "google_compute_firewall" "this" {
  for_each  = { for rule in local.firewall_rules : rule.name => rule }
  name      = each.key
  project   = var.project_id
  network   = google_compute_network.this.name
  direction = each.value.direction
  priority  = each.value.priority

  dynamic "allow" {
    for_each = each.value.allowed
    content {
      protocol = allow.value.protocol
      ports    = allow.value.ports
    }
  }

  source_ranges           = each.value.source_ranges
  destination_ranges      = each.value.destination_ranges
  target_tags             = length(each.value.target_tags) > 0 ? each.value.target_tags : null
  target_service_accounts = length(each.value.target_service_accounts) > 0 ? each.value.target_service_accounts : null
  description             = each.value.description

}

resource "google_compute_global_address" "psa" {
  name          = coalesce(var.psa_config.address_name, "frontend-psa-range")
  project       = var.project_id
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  network       = google_compute_network.this.id
  prefix_length = coalesce(var.psa_config.prefix_length, 20)
}

resource "google_vpc_access_connector" "serverless" {
  name    = local.vpc_connector_name
  region  = var.region
  project = var.project_id

  subnet {
    name       = google_compute_subnetwork.this[local.connector_subnet_name].name
    project_id = var.project_id
  }

  min_instances = coalesce(try(var.vpc_connector.min_instances, null), 2)
  max_instances = coalesce(try(var.vpc_connector.max_instances, null), 3)
  machine_type  = coalesce(try(var.vpc_connector.machine_type, null), "e2-micro")

  lifecycle {
    create_before_destroy = true
  }

  timeouts {
    create = "30m"
    delete = "30m"
  }
}

