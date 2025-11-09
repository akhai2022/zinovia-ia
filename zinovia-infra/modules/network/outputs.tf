output "network_name" {
  description = "Name of the VPC network."
  value       = google_compute_network.this.name
}

output "network_self_link" {
  description = "Self link of the VPC network."
  value       = google_compute_network.this.self_link
}

output "subnet_self_links" {
  description = "Map of subnet names to their self links."
  value = {
    for name, subnet in google_compute_subnetwork.this : name => subnet.self_link
  }
}

output "subnet_ips" {
  description = "Map of subnet names to their primary CIDR ranges."
  value = {
    for name, subnet in google_compute_subnetwork.this : name => subnet.ip_cidr_range
  }
}

output "vpc_connector_name" {
  description = "Name of the Serverless VPC connector."
  value       = google_vpc_access_connector.serverless.name
}

output "vpc_connector_id" {
  description = "ID of the Serverless VPC connector."
  value       = google_vpc_access_connector.serverless.id
}

output "psa_address_name" {
  description = "Name of the reserved Private Service Access IP range for managed services."
  value       = google_compute_global_address.psa.name
}

output "psa_address_self_link" {
  description = "Self link of the reserved Private Service Access IP range."
  value       = google_compute_global_address.psa.self_link
}

