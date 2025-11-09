output "service_urls" {
  description = "Map of Cloud Run service names to their HTTPS URLs."
  value = {
    for name, svc in google_cloud_run_v2_service.this :
    name => svc.uri
  }
}

output "service_accounts" {
  description = "Map of Cloud Run service names to their service accounts."
  value = {
    for name, sa in google_service_account.service :
    name => sa.email
  }
}

output "service_names" {
  description = "List of Cloud Run service names."
  value       = keys(google_cloud_run_v2_service.this)
}

output "service_revisions" {
  description = "Map of Cloud Run service names to the latest revision."
  value = {
    for name, svc in google_cloud_run_v2_service.this :
    name => svc.latest_ready_revision
  }
}

