locals {
  default_subnets = {
    frontend-public-subnet = {
      ip_cidr_range            = "10.0.1.0/24"
      private_ip_google_access = true
      description              = "Public facing subnet for load balancer proxies and shared services."
    }
    services-subnet = {
      ip_cidr_range            = "10.0.2.0/24"
      private_ip_google_access = true
      description              = "Subnet used by the Serverless VPC connector to reach private resources."
    }
    database-subnet = {
      ip_cidr_range            = "10.0.3.0/24"
      private_ip_google_access = true
      description              = "Subnet reserved for database and internal services."
    }
    connector-subnet = {
      ip_cidr_range            = "10.0.4.0/28"
      private_ip_google_access = true
      description              = "Dedicated /28 subnet for the Serverless VPC connector."
    }
  }

  default_firewall_rules = tolist([
    {
      name                    = "allow-serverless-egress-http"
      description             = "Allow Serverless VPC connector subnet to reach internet services on HTTP/HTTPS."
      direction               = "EGRESS"
      priority                = 65534
      destination_ranges      = ["0.0.0.0/0"]
      source_ranges           = ["10.0.2.0/24"]
      target_tags             = []
      target_service_accounts = []
      allowed = [
        {
          protocol = "tcp"
          ports    = ["80", "443"]
        }
      ]
    },
    {
      name                    = "allow-internal-all"
      description             = "Allow all internal traffic within the VPC."
      direction               = "INGRESS"
      priority                = 65535
      source_ranges           = ["10.0.0.0/8"]
      destination_ranges      = []
      target_tags             = []
      target_service_accounts = []
      allowed = [
        {
          protocol = "all"
          ports    = []
        }
      ]
    }
  ])

  effective_subnets       = length(var.subnets) > 0 ? var.subnets : local.default_subnets
  effective_firewall      = length(var.firewall_rules) > 0 ? var.firewall_rules : local.default_firewall_rules
  effective_vpc_connector = merge({ subnet_name = "connector-subnet" }, var.vpc_connector_config)
}

module "services" {
  source     = "./modules/services"
  project_id = var.project_id
}

module "network" {
  source = "./modules/network"

  project_id     = var.project_id
  region         = var.region
  network_name   = var.network_name
  routing_mode   = var.routing_mode
  subnets        = local.effective_subnets
  firewall_rules = local.effective_firewall
  vpc_connector  = local.effective_vpc_connector
  psa_config     = var.psa_config
  depends_on = [
    module.services,
    google_project_iam_member.vpcaccess_network_user
  ]
}

module "database" {
  source = "./modules/database"

  project_id               = var.project_id
  region                   = var.region
  instance_name            = var.db_instance_name
  database_version         = var.db_database_version
  tier                     = var.db_tier
  availability_type        = var.db_availability_type
  disk_type                = var.db_disk_type
  disk_size                = var.db_disk_size
  auto_storage_increase    = var.db_auto_storage_increase
  deletion_protection      = false
  backup_configuration     = var.db_backup_configuration
  maintenance_window       = var.db_maintenance_window
  insights_config          = var.db_insights_config
  database_name            = var.db_name
  database_charset         = var.db_charset
  database_collation       = var.db_collation
  db_user_name             = var.db_user
  secret_id                = var.db_password_secret_id
  network_self_link        = module.network.network_self_link
  service_networking_range = module.network.psa_address_name
  depends_on               = [module.services]
}

locals {
  llm_service_list = var.llm_service == null ? [] : [
    merge(
      {
        name  = var.llm_service.name
        image = var.llm_service.image
      },
      try(var.llm_service.cpu, null) != null ? { cpu = var.llm_service.cpu } : {},
      try(var.llm_service.memory, null) != null ? { memory = var.llm_service.memory } : {},
      try(var.llm_service.min_instances, null) != null ? { min_instances = var.llm_service.min_instances } : {},
      try(var.llm_service.max_instances, null) != null ? { max_instances = var.llm_service.max_instances } : {},
      try(var.llm_service.concurrency, null) != null ? { concurrency = var.llm_service.concurrency } : {},
      try(var.llm_service.timeout_seconds, null) != null ? { timeout_seconds = var.llm_service.timeout_seconds } : {},
      try(var.llm_service.ingress, null) != null ? { ingress = var.llm_service.ingress } : {},
      try(var.llm_service.annotations, null) != null ? { annotations = var.llm_service.annotations } : {},
      try(var.llm_service.labels, null) != null ? { labels = var.llm_service.labels } : {},
      try(var.llm_service.execution_environment, null) != null ? { execution_environment = var.llm_service.execution_environment } : {},
      try(var.llm_service.vpc_connector_egress, null) != null ? { vpc_connector_egress = var.llm_service.vpc_connector_egress } : {},
      try(var.llm_service.additional_roles, null) != null ? { additional_roles = var.llm_service.additional_roles } : {},
      {
        env_vars = merge(
          {
            OLLAMA_MODEL = try(var.llm_service.model, "llama3.2")
          },
          try(var.llm_service.env_vars, {})
        )
      },
      {
        secrets = try(var.llm_service.secrets, [])
      }
    )
  ]
}

module "cloud_run_llm" {
  count = length(local.llm_service_list) == 0 ? 0 : 1

  source = "./modules/cloud_run"

  project_id                 = var.project_id
  region                     = var.region
  vpc_connector              = module.network.vpc_connector_id
  services                   = local.llm_service_list
  service_account_base_roles = var.service_account_base_roles
  depends_on                 = [module.services]
}

locals {
  default_db_env = {
    DB_HOST            = module.database.instance_private_ip
    DB_NAME            = module.database.database_name
    DB_USER            = module.database.database_user
    DB_CONNECTION_NAME = module.database.instance_connection_name
    DB_PORT            = "5432"
  }

  db_password_secret = {
    env_name = "DB_PASSWORD"
    secret   = module.database.db_password_secret_name
    version  = "latest"
  }

  llm_service_url = var.llm_service == null ? null : module.cloud_run_llm[0].service_urls[var.llm_service.name]

  service_map = {
    for svc in var.frontend_services :
    svc.name => svc
  }

  frontend_services = [
    for name, svc in local.service_map : merge(
      {
        name  = svc.name
        image = svc.image
      },
      try(svc.cpu, null) != null ? { cpu = svc.cpu } : {},
      try(svc.memory, null) != null ? { memory = svc.memory } : {},
      try(svc.min_instances, null) != null ? { min_instances = svc.min_instances } : {},
      try(svc.max_instances, null) != null ? { max_instances = svc.max_instances } : {},
      try(svc.concurrency, null) != null ? { concurrency = svc.concurrency } : {},
      try(svc.timeout_seconds, null) != null ? { timeout_seconds = svc.timeout_seconds } : {},
      try(svc.ingress, null) != null ? { ingress = svc.ingress } : {},
      {
        env_vars = merge(
          try(svc.attach_database, false) ? merge(
            local.default_db_env,
            {
              DB_PORT = try(svc.db_port, null) != null ? svc.db_port : "5432"
            }
          ) : {},
          try(svc.env_vars, {}),
          (
            try(svc.use_llm_service, false) && local.llm_service_url != null
            ? { LLM_API_BASE_URL = local.llm_service_url }
            : {}
          )
        )
      },
      {
        secrets = try(svc.attach_database, false) ? (
          contains(
            [for s in try(svc.secrets, []) : s.env_name],
            "DB_PASSWORD"
          )
          ? try(svc.secrets, [])
          : concat(try(svc.secrets, []), [local.db_password_secret])
        ) : try(svc.secrets, [])
      },
      try(svc.annotations, null) != null ? { annotations = svc.annotations } : {},
      try(svc.labels, null) != null ? { labels = svc.labels } : {},
      try(svc.execution_environment, null) != null ? { execution_environment = svc.execution_environment } : {},
      try(svc.vpc_connector_egress, null) != null ? { vpc_connector_egress = svc.vpc_connector_egress } : {},
      try(svc.additional_roles, null) != null ? { additional_roles = svc.additional_roles } : {}
    )
  ]

  services_exposed_via_lb = {
    for name, svc in local.service_map :
    name => {
      name    = name
      region  = var.region
      project = var.project_id
    }
    if try(svc.expose_via_lb, true)
  }
}

module "cloud_run" {
  source = "./modules/cloud_run"

  project_id                 = var.project_id
  region                     = var.region
  vpc_connector              = module.network.vpc_connector_id
  services                   = local.frontend_services
  service_account_base_roles = var.service_account_base_roles
  depends_on                 = concat([module.services], length(local.llm_service_list) == 0 ? [] : [module.cloud_run_llm[0]])
}

locals {
  cloud_run_service_map = local.services_exposed_via_lb
}

module "dns" {
  source = "./modules/dns"

  project_id         = var.project_id
  domain_name        = var.domain_name
  additional_domains = var.additional_domains
  load_balancer_name = var.load_balancer_name
  managed_zone_name  = var.managed_zone_name
  enable_cdn         = var.enable_cdn
  cloud_run_services = local.cloud_run_service_map
  depends_on         = [module.services, module.cloud_run]
}

module "monitoring" {
  source = "./modules/monitoring"

  project_id            = var.project_id
  domain_name           = var.domain_name
  cloud_run_services    = module.cloud_run.service_names
  notification_channels = var.monitoring_notification_channels
  depends_on            = [module.services]
}

data "google_project" "current" {
  project_id = var.project_id
}

resource "google_project_iam_member" "vpcaccess_network_user" {
  project    = var.project_id
  role       = "roles/compute.networkUser"
  member     = "serviceAccount:service-${data.google_project.current.number}@gcp-sa-vpcaccess.iam.gserviceaccount.com"
  depends_on = [module.services]
}

