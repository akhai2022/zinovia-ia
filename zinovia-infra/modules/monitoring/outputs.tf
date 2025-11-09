output "uptime_check_id" {
  description = "Identifier for the HTTPS uptime check."
  value       = google_monitoring_uptime_check_config.https.uptime_check_id
}

output "uptime_alert_policy" {
  description = "ID of the uptime alert policy."
  value       = google_monitoring_alert_policy.uptime.id
}

output "error_rate_alert_policy" {
  description = "ID of the Cloud Run error rate alert policy."
  value       = length(google_monitoring_alert_policy.error_rate) > 0 ? google_monitoring_alert_policy.error_rate[0].id : null
}

