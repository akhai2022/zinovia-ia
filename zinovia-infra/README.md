# Cloud Run Frontend Infrastructure

Production-ready Terraform configuration for deploying frontend workloads to Google Cloud Run with private networking, Cloud SQL, HTTPS load balancing, DNS, and monitoring.

## Prerequisites

- Google Cloud project with billing enabled.
- Terraform `v1.6.0` or newer.
- `gcloud` CLI authenticated (`gcloud auth application-default login` or workload identity).
- Remote state bucket (e.g. `terraform-state-<project-id>`) created manually or via a separate bootstrap process.
- Service account or user running Terraform with permissions to manage networking, Cloud Run, Cloud SQL, Cloud DNS, Monitoring, and Secret Manager.
- A publicly registered domain name that you control (e.g. `example.com`) for HTTPS and DNS delegation.

### Backend configuration

Update the `terraform { backend "gcs" { ... } }` block in `versions.tf` or provide a `backend.tfvars` file, then run:

```bash
cd zinovia-infra
terraform init \
  -backend-config="bucket=terraform-state-your-project" \
  -backend-config="prefix=cloud-run-frontend"
```

## Configuration

Copy `terraform.tfvars.example` to an environment-specific file (e.g. `dev.tfvars`, `prod.tfvars`) and adjust:

- `project_id` and `region`.
- `domain_name` and `additional_domains` for SSL SANs (must be valid DNS names that you own).
- `frontend_services` list with container images and scaling preferences.
- Optional VPC subnet CIDRs, firewall rules, or Cloud SQL sizing.
- `monitoring_notification_channels` (IDs from Cloud Monitoring).

Sample files are provided:

- `dev.tfvars`
- `prod.tfvars`

## Modules

- `modules/services`: Enables required Google Cloud APIs before provisioning other resources.
- `modules/network`: VPC, subnets, firewall rules, Serverless VPC connector (dedicated /28 subnet), Private Service Access range.
- `modules/database`: Cloud SQL for PostgreSQL (private IP), database/user provisioning, password stored in Secret Manager.
- `modules/cloud_run`: Multiple Cloud Run services with per-service IAM, autoscaling, VPC connectivity, secret/env wiring.
- `modules/dns`: Cloud DNS managed zone, managed SSL certificate, global HTTPS load balancer (HTTP->HTTPS redirect), static IPs, DNS records.
- `modules/monitoring`: HTTPS uptime check and Cloud Run 5xx alert policy.

## Deployment

```bash
cd zinovia-infra
terraform init -backend-config="bucket=terraform-state-your-project" -backend-config="prefix=cloud-run-frontend"
terraform plan  -var-file="dev.tfvars"
terraform apply -var-file="dev.tfvars"
```

Switch to production inputs with:

```bash
terraform apply -var-file="prod.tfvars"
```

## Cloud Run service configuration

- Each entry in `frontend_services` creates its own service account with least-privilege roles.
- Database connection parameters (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_CONNECTION_NAME`) are injected automatically.
- The database password secret (`DB_PASSWORD`) is added unless explicitly defined in the service definition.
- Additional secrets can be mounted by specifying `env_name`, `secret`, and `version`.
- Autoscaling settings (`min_instances`, `max_instances`, `concurrency`, `timeout_seconds`) are configurable per service.

## DNS & HTTPS

1. After `terraform apply`, note the `dns_name_servers` output.
2. Update your domain registrar to use the Cloud DNS name servers.
3. Wait for the managed SSL certificate on the HTTPS load balancer to become active (monitor via Cloud Console or `gcloud compute ssl-certificates describe <cert-name>`).
4. Verify HTTPS by visiting `https://<domain_name>`.

## Database access

- Cloud SQL is provisioned with private IP only.
- Password is stored in Secret Manager (`db_password_secret_name` output).
- Cloud Run services connect via Serverless VPC connector using the private IP.
- Database user and name are provided via outputs and environment variables.

## Monitoring & Alerts

- HTTPS uptime check monitors the public endpoint.
- Alert policy fires on repeated uptime check failures.
- Optional 5xx error-rate alert uses Monitoring Query Language (enable by providing notification channels).

## Multi-environment workflow

1. Adjust per-environment `*.tfvars` files.
2. Initialize once per backend bucket.
3. Use `terraform workspace` if desired, or separate state prefixes/buckets.
4. Run plan/apply with the appropriate `-var-file`.

## Git workflow

Run formatting before commits:

```bash
terraform fmt -recursive
```

Follow your organization's branching policy (e.g. work on feature branches, merge to `develop`, then sync with `master`/`main` as required). Include linting and planning steps in CI/CD pipelines before applying changes.

