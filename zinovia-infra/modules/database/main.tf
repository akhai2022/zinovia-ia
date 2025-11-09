locals {
  effective_backup_configuration = merge(
    {
      location                       = null
      point_in_time_recovery_enabled = true
    },
    var.backup_configuration
  )

  effective_insights_config = merge(
    {
      query_string_length     = 1024
      record_application_tags = true
      record_client_address   = true
    },
    var.insights_config
  )
}

resource "google_service_networking_connection" "this" {
  network                 = var.network_self_link
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [var.service_networking_range]
}

resource "random_password" "db_password" {
  length           = var.password_length
  special          = true
  override_special = "!@#%^*-_=+?"
}

resource "google_secret_manager_secret" "db_password" {
  project   = var.project_id
  secret_id = var.secret_id

  replication {
    auto {}
  }

  labels = {
    environment = "frontend"
    component   = "database"
  }
}

resource "google_secret_manager_secret_version" "db_password" {
  secret      = google_secret_manager_secret.db_password.id
  secret_data = random_password.db_password.result
}

resource "google_sql_database_instance" "this" {
  name             = var.instance_name
  project          = var.project_id
  region           = var.region
  database_version = var.database_version

  deletion_protection = var.deletion_protection

  settings {
    tier              = var.tier
    availability_type = var.availability_type
    disk_type         = var.disk_type
    disk_size         = var.disk_size
    disk_autoresize   = var.auto_storage_increase

    ip_configuration {
      ipv4_enabled    = false
      private_network = var.network_self_link
    }

    backup_configuration {
      enabled                        = var.backup_configuration.enabled
      start_time                     = var.backup_configuration.start_time
      location                       = local.effective_backup_configuration.location
      point_in_time_recovery_enabled = local.effective_backup_configuration.point_in_time_recovery_enabled
    }

    maintenance_window {
      day          = var.maintenance_window.day
      hour         = var.maintenance_window.hour
      update_track = var.maintenance_window.update_track
    }

    insights_config {
      query_insights_enabled  = var.insights_config.query_insights_enabled
      query_string_length     = local.effective_insights_config.query_string_length
      record_application_tags = local.effective_insights_config.record_application_tags
      record_client_address   = local.effective_insights_config.record_client_address
    }

    database_flags {
      name  = "log_min_duration_statement"
      value = "2000"
    }
  }

  depends_on = [google_service_networking_connection.this]
}

resource "google_sql_database" "application" {
  name      = var.database_name
  project   = var.project_id
  instance  = google_sql_database_instance.this.name
  charset   = var.database_charset
  collation = var.database_collation
}

resource "google_sql_user" "application" {
  name     = var.db_user_name
  project  = var.project_id
  instance = google_sql_database_instance.this.name
  password = random_password.db_password.result
}

