locals {
  condition_notification_channels = var.notification_channels
}

resource "google_monitoring_uptime_check_config" "https" {
  display_name = "Frontend HTTPS Uptime"
  project      = var.project_id
  timeout      = "10s"
  period       = "60s"

  monitored_resource {
    type = "uptime_url"
    labels = {
      project_id = var.project_id
      host       = var.domain_name
    }
  }

  http_check {
    path         = "/"
    port         = 443
    use_ssl      = true
    validate_ssl = true
  }

  content_matchers {
    matcher = "MATCHES_REGEX"
    content = ".*"
  }

  selected_regions = ["EUROPE", "USA"]

  user_labels = {
    environment = "production"
    component   = "frontend"
  }

}

resource "google_monitoring_alert_policy" "uptime" {
  display_name          = "Frontend Uptime Failure"
  project               = var.project_id
  combiner              = "OR"
  notification_channels = local.condition_notification_channels

  conditions {
    display_name = "Uptime check failed"
    condition_threshold {
      filter          = "metric.type=\"monitoring.googleapis.com/uptime_check/check_passed\" AND resource.type=\"uptime_url\" AND metric.label.check_id=\"${google_monitoring_uptime_check_config.https.uptime_check_id}\""
      duration        = "300s"
      comparison      = "COMPARISON_LT"
      threshold_value = 1

      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_NEXT_OLDER"
      }
    }
  }

  documentation {
    content   = "Investigate Cloud Run services for possible downtime."
    mime_type = "text/markdown"
  }
}

resource "google_monitoring_alert_policy" "error_rate" {
  count                 = length(var.cloud_run_services) > 0 ? 1 : 0
  display_name          = "Cloud Run 5xx Error Rate"
  project               = var.project_id
  combiner              = "OR"
  notification_channels = local.condition_notification_channels

  conditions {
    display_name = "5xx error ratio > 5% for 5 minutes"
    condition_threshold {
      filter          = "resource.type=\"cloud_run_revision\" AND metric.type=\"run.googleapis.com/request_count\" AND resource.labels.project_id=\"${var.project_id}\" AND metric.label.response_code_class=\"5xx\""
      duration        = "300s"
      comparison      = "COMPARISON_GT"
      threshold_value = 5

      aggregations {
        alignment_period     = "60s"
        per_series_aligner   = "ALIGN_RATE"
        cross_series_reducer = "REDUCE_SUM"
        group_by_fields      = ["resource.project_id"]
      }
    }
  }

  documentation {
    content   = "Investigate recent deployments or dependency failures causing elevated 5xx errors."
    mime_type = "text/markdown"
  }
}

