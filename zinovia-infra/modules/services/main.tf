resource "google_project_service" "this" {
  for_each           = toset(var.services)
  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

resource "null_resource" "apis_enabled_token" {
  depends_on = [google_project_service.this]
}

