output "network_name" {
  description = "Name of the provisioned VPC network."
  value       = module.network.network_name
}

output "network_self_link" {
  description = "Self link of the VPC network."
  value       = module.network.network_self_link
}

output "subnet_cidrs" {
  description = "Map of subnet names to their CIDR ranges."
  value       = module.network.subnet_ips
}

output "vpc_connector_name" {
  description = "Name of the Serverless VPC connector."
  value       = module.network.vpc_connector_name
}

output "cloud_run_service_urls" {
  description = "Map of Cloud Run service names to their HTTPS URLs."
  value       = module.cloud_run.service_urls
}

output "cloud_run_service_accounts" {
  description = "Cloud Run service account emails keyed by service."
  value       = module.cloud_run.service_accounts
}

output "load_balancer_ipv4" {
  description = "Global IPv4 address for the HTTPS load balancer."
  value       = module.dns.ipv4_address
}

output "load_balancer_ipv6" {
  description = "Global IPv6 address for the HTTPS load balancer."
  value       = module.dns.ipv6_address
}

output "dns_name_servers" {
  description = "Name servers to configure at the domain registrar."
  value       = module.dns.name_servers
}

output "cloud_sql_connection_name" {
  description = "Instance connection name for the Cloud SQL instance."
  value       = module.database.instance_connection_name
}

output "cloud_sql_private_ip" {
  description = "Private IP address of the Cloud SQL instance."
  value       = module.database.instance_private_ip
}

output "cloud_sql_database_name" {
  description = "Name of the application database."
  value       = module.database.database_name
}

output "cloud_sql_database_user" {
  description = "Application database user."
  value       = module.database.database_user
}

output "db_password_secret_name" {
  description = "Secret Manager ID storing the database password."
  value       = module.database.db_password_secret_name
}

output "uptime_check_id" {
  description = "Identifier for the HTTPS uptime check."
  value       = module.monitoring.uptime_check_id
}

output "uptime_alert_policy_id" {
  description = "Alert policy resource ID for uptime failures."
  value       = module.monitoring.uptime_alert_policy
}

output "error_rate_alert_policy_id" {
  description = "Alert policy resource ID for Cloud Run 5xx error rate."
  value       = module.monitoring.error_rate_alert_policy
}

