locals {
  domains = toset(concat([var.domain_name], var.additional_domains))

  region_negs = {
    for key, svc in var.cloud_run_services :
    key => {
      name    = svc.name
      region  = svc.region
      project = coalesce(svc.project, var.project_id)
    }
  }

  dns_records = [
    for domain in local.domains : {
      name = domain == var.domain_name ? "${var.domain_name}." : "${domain}."
    }
  ]
}

resource "google_dns_managed_zone" "this" {
  name        = var.managed_zone_name
  project     = var.project_id
  dns_name    = "${var.domain_name}."
  description = "Managed zone for ${var.domain_name} frontend."
  visibility  = "public"
}

resource "google_compute_global_address" "lb_ipv4" {
  name         = "${var.load_balancer_name}-ipv4"
  project      = var.project_id
  address_type = "EXTERNAL"
  ip_version   = "IPV4"
}

resource "google_compute_global_address" "lb_ipv6" {
  name         = "${var.load_balancer_name}-ipv6"
  project      = var.project_id
  address_type = "EXTERNAL"
  ip_version   = "IPV6"
}

resource "google_compute_managed_ssl_certificate" "this" {
  name    = "${var.load_balancer_name}-cert"
  project = var.project_id

  managed {
    domains = sort(local.domains)
  }
}

resource "google_compute_region_network_endpoint_group" "serverless" {
  for_each = local.region_negs

  name                  = "${var.load_balancer_name}-${each.value.name}-neg"
  project               = var.project_id
  region                = each.value.region
  network_endpoint_type = "SERVERLESS"

  cloud_run {
    service = each.value.name
    # project defaults to provider project
  }

}

resource "google_compute_backend_service" "this" {
  name                  = "${var.load_balancer_name}-backend"
  project               = var.project_id
  protocol              = "HTTPS"
  enable_cdn            = var.enable_cdn
  load_balancing_scheme = "EXTERNAL_MANAGED"
  timeout_sec           = 30

  dynamic "backend" {
    for_each = google_compute_region_network_endpoint_group.serverless
    content {
      group = backend.value.self_link
    }
  }

}

resource "google_compute_url_map" "https" {
  name            = "${var.load_balancer_name}-https"
  project         = var.project_id
  default_service = google_compute_backend_service.this.id

  host_rule {
    hosts        = sort(local.domains)
    path_matcher = "all-paths"
  }

  path_matcher {
    name            = "all-paths"
    default_service = google_compute_backend_service.this.id
  }

}

resource "google_compute_target_https_proxy" "this" {
  name             = "${var.load_balancer_name}-https-proxy"
  project          = var.project_id
  ssl_certificates = [google_compute_managed_ssl_certificate.this.self_link]
  url_map          = google_compute_url_map.https.self_link
}

resource "google_compute_target_http_proxy" "redirect" {
  name    = "${var.load_balancer_name}-http-proxy"
  project = var.project_id
  url_map = google_compute_url_map.http_redirect.id
}

resource "google_compute_url_map" "http_redirect" {
  name    = "${var.load_balancer_name}-http-redirect"
  project = var.project_id

  default_url_redirect {
    https_redirect         = true
    strip_query            = false
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
  }

}

resource "google_compute_global_forwarding_rule" "https_ipv4" {
  name                  = "${var.load_balancer_name}-https-ipv4"
  project               = var.project_id
  load_balancing_scheme = "EXTERNAL_MANAGED"
  ip_protocol           = "TCP"
  port_range            = "443"
  target                = google_compute_target_https_proxy.this.self_link
  ip_address            = google_compute_global_address.lb_ipv4.address
  labels = {
    environment = "frontend"
  }
}

resource "google_compute_global_forwarding_rule" "https_ipv6" {
  name                  = "${var.load_balancer_name}-https-ipv6"
  project               = var.project_id
  load_balancing_scheme = "EXTERNAL_MANAGED"
  ip_protocol           = "TCP"
  port_range            = "443"
  target                = google_compute_target_https_proxy.this.self_link
  ip_address            = google_compute_global_address.lb_ipv6.address
}

resource "google_compute_global_forwarding_rule" "http" {
  name                  = "${var.load_balancer_name}-http"
  project               = var.project_id
  load_balancing_scheme = "EXTERNAL_MANAGED"
  ip_protocol           = "TCP"
  port_range            = "80"
  target                = google_compute_target_http_proxy.redirect.self_link
  ip_address            = google_compute_global_address.lb_ipv4.address
}

resource "google_dns_record_set" "a_records" {
  for_each = {
    for record in local.dns_records :
    record.name => record
  }

  name         = each.key
  project      = var.project_id
  managed_zone = google_dns_managed_zone.this.name
  type         = "A"
  ttl          = var.dns_ttl
  rrdatas      = [google_compute_global_address.lb_ipv4.address]
}

resource "google_dns_record_set" "aaaa_records" {
  for_each = {
    for record in local.dns_records :
    record.name => record
  }

  name         = each.key
  project      = var.project_id
  managed_zone = google_dns_managed_zone.this.name
  type         = "AAAA"
  ttl          = var.dns_ttl
  rrdatas      = [google_compute_global_address.lb_ipv6.address]
}

