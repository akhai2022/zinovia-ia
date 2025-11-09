variable "project_id" {
  description = "Project ID where the Google APIs should be enabled."
  type        = string
}

variable "services" {
  description = "List of Google APIs to enable for this project."
  type        = list(string)
  default = [
    "compute.googleapis.com",
    "dns.googleapis.com",
    "secretmanager.googleapis.com",
    "vpcaccess.googleapis.com",
    "run.googleapis.com",
    "monitoring.googleapis.com",
    "iam.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "serviceusage.googleapis.com",
    "logging.googleapis.com",
    "stackdriver.googleapis.com",
    "servicenetworking.googleapis.com",
    "sqladmin.googleapis.com",
    "deploymentmanager.googleapis.com",
  ]
}

