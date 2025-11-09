output "managed_zone_name" {
  description = "Name of the Cloud DNS managed zone."
  value       = google_dns_managed_zone.this.name
}

output "name_servers" {
  description = "Cloud DNS name servers to configure at the registrar."
  value       = google_dns_managed_zone.this.name_servers
}

output "ipv4_address" {
  description = "Global IPv4 address of the HTTPS load balancer."
  value       = google_compute_global_address.lb_ipv4.address
}

output "ipv6_address" {
  description = "Global IPv6 address of the HTTPS load balancer."
  value       = google_compute_global_address.lb_ipv6.address
}

output "https_forwarding_rule" {
  description = "Resource ID of the HTTPS forwarding rule."
  value       = google_compute_global_forwarding_rule.https_ipv4.id
}

