output "instance_connection_name" {
  description = "Cloud SQL instance connection name for Cloud Run integrations."
  value       = google_sql_database_instance.this.connection_name
}

output "instance_self_link" {
  description = "Self link of the Cloud SQL instance."
  value       = google_sql_database_instance.this.self_link
}

output "instance_private_ip" {
  description = "Private IP address of the Cloud SQL instance."
  value       = google_sql_database_instance.this.private_ip_address
}

output "database_name" {
  description = "Name of the application database."
  value       = google_sql_database.application.name
}

output "database_user" {
  description = "Application database user name."
  value       = google_sql_user.application.name
}

output "db_password_secret_id" {
  description = "Resource ID of the Secret Manager secret storing the database password."
  value       = google_secret_manager_secret.db_password.id
}

output "db_password_secret_name" {
  description = "Secret ID (short name) of the database password secret."
  value       = google_secret_manager_secret.db_password.secret_id
}

output "db_password_secret_version" {
  description = "Resource ID of the Secret Manager secret version containing the database password."
  value       = google_secret_manager_secret_version.db_password.id
}

