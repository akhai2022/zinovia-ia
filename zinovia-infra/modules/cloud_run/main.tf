locals {
  services = {
    for svc in var.services :
    svc.name => merge(
      {
        cpu                   = "1"
        memory                = "512Mi"
        min_instances         = 0
        max_instances         = 50
        concurrency           = 80
        timeout_seconds       = 300
        ingress               = "INGRESS_TRAFFIC_ALL"
        env_vars              = {}
        secrets               = []
        annotations           = {}
        labels                = {}
        execution_environment = "EXECUTION_ENVIRONMENT_GEN2"
        vpc_connector_egress  = "ALL_TRAFFIC"
        additional_roles      = []
      },
      svc
    )
  }

  service_account_ids = {
    for name, svc in local.services :
    name => substr(
      trim(
        join("-", regexall("[a-z0-9]+", lower("${svc.name}-sa"))),
        "-"
      ),
      0,
      30
    )
  }

  service_roles = flatten([
    for name, svc in local.services : [
      for role in setunion(var.service_account_base_roles, svc.additional_roles) : {
        service = name
        role    = role
      }
    ]
  ])

  secret_permissions = flatten([
    for name, svc in local.services : [
      for secret in svc.secrets : {
        service = name
        secret  = secret.secret
      }
    ]
  ])
}

resource "google_service_account" "service" {
  for_each     = local.services
  project      = var.project_id
  account_id   = each.value.name == "default" ? "default-frontend-sa" : local.service_account_ids[each.key]
  display_name = "${each.value.name} Cloud Run service account"
}

resource "google_project_iam_member" "service_account_roles" {
  for_each = {
    for item in local.service_roles :
    "${item.service}:${item.role}" => item
  }
  project = var.project_id
  role    = each.value.role
  member  = "serviceAccount:${google_service_account.service[each.value.service].email}"
}

resource "google_secret_manager_secret_iam_member" "service_access" {
  for_each = {
    for item in local.secret_permissions :
    "${item.service}:${item.secret}" => item
  }

  secret_id = each.value.secret
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.service[each.value.service].email}"
}

resource "google_cloud_run_v2_service" "this" {
  for_each = local.services

  name        = each.value.name
  location    = var.region
  project     = var.project_id
  ingress     = each.value.ingress
  labels      = merge({ managed_by = "terraform" }, each.value.labels)
  annotations = each.value.annotations
  deletion_protection = false

  template {
    service_account                  = google_service_account.service[each.key].email
    timeout                          = "${each.value.timeout_seconds}s"
    max_instance_request_concurrency = each.value.concurrency
    execution_environment            = each.value.execution_environment

    scaling {
      min_instance_count = each.value.min_instances
      max_instance_count = each.value.max_instances
    }

    vpc_access {
      connector = var.vpc_connector
      egress    = each.value.vpc_connector_egress
    }

    containers {
      image = each.value.image

      resources {
        limits = {
          cpu    = each.value.cpu
          memory = each.value.memory
        }
      }

      dynamic "env" {
        for_each = each.value.env_vars
        content {
          name  = env.key
          value = env.value
        }
      }

      dynamic "env" {
        for_each = each.value.secrets
        content {
          name = env.value.env_name
          value_source {
            secret_key_ref {
              secret  = env.value.secret
              version = env.value.version
            }
          }
        }
      }
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}

resource "google_cloud_run_v2_service_iam_member" "public_invoker" {
  for_each = google_cloud_run_v2_service.this

  project  = var.project_id
  location = each.value.location
  name     = each.value.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

