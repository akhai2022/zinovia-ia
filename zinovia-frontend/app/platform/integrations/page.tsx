import type { Metadata } from "next";
import Link from "next/link";
import {
  Plug,
  ServerCog,
  Cloud,
  Database,
  Workflow,
  ShieldCheck,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect with 500+ tools and platforms via APIs, webhooks, and native connectors.",
};

const integrationCategories = [
  {
    title: "CRM & Engagement",
    description: "Sync customer context in real time across sales, marketing, and service workflows.",
    connectors: ["Salesforce", "HubSpot", "Zendesk", "Intercom", "ServiceNow", "Dynamics 365"],
  },
  {
    title: "Data & Cloud Platforms",
    description: "Query governed data lakes and warehouses with secure, low-latency connectivity.",
    connectors: ["Snowflake", "BigQuery", "Databricks", "Redshift", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Productivity & Collaboration",
    description: "Embed AI assistance inside the tools your teams already live in every day.",
    connectors: ["Microsoft Teams", "Slack", "Google Workspace", "Notion", "SharePoint", "Confluence"],
  },
  {
    title: "Automation & RPA",
    description: "Trigger downstream actions, orchestrate bots, and keep systems of record in sync.",
    connectors: ["Zapier", "Workato", "UiPath", "Automation Anywhere", "Make", "n8n"],
  },
];

const integrationCapabilities = [
  {
    icon: ServerCog,
    title: "Native & Custom Connectors",
    description:
      "Choose from 500+ managed connectors or let our team build bespoke integrations for legacy systems and proprietary APIs.",
  },
  {
    icon: Cloud,
    title: "Hybrid Deployment",
    description:
      "Bridge on-prem, cloud, and air‑gapped environments with secure tunneling, private networking, and zero-trust policies.",
  },
  {
    icon: Workflow,
    title: "Event-Driven Automations",
    description:
      "Use webhooks, queues, and streaming pipelines to trigger downstream actions and keep every tool in lockstep.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Governance",
    description:
      "Role-based access, audit trails, PII redaction, and policy enforcement baked into every data touchpoint.",
  },
  {
    icon: Database,
    title: "Unified Semantic Layer",
    description:
      "Expose consistent business logic through GraphQL, REST, or gRPC so AI agents speak the same language as your BI teams.",
  },
  {
    icon: BarChart3,
    title: "Observability & SLAs",
    description:
      "Dashboards, alerts, and automated recovery to guarantee real-time visibility into connector health and throughput.",
  },
];

const integrationPlaybook = [
  {
    step: "01",
    title: "Assess",
    description: "Map required systems, data contracts, auth methods, and compliance scope in a 360° integration audit.",
  },
  {
    step: "02",
    title: "Connect",
    description: "Provision connectors, secrets, and networking with infrastructure-as-code and zero downtime cutovers.",
  },
  {
    step: "03",
    title: "Orchestrate",
    description: "Build workflows, retries, and fallbacks using our orchestration framework or your existing RPA stack.",
  },
  {
    step: "04",
    title: "Secure & Monitor",
    description: "Automate policy enforcement, drift detection, and SLA monitoring with proactive alerting and runbooks.",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <Section className="pb-16">
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-outline-soft/60 bg-surface-glass/60 px-4 py-2 text-sm font-semibold text-typography-secondary">
              <Plug className="h-4 w-4 text-accent-primary" /> 500+ Managed Connectors
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-typography-primary sm:text-5xl">
              Connect every system your teams rely on
            </h1>
            <p className="text-lg leading-relaxed text-typography-secondary">
              Zinovia integrates seamlessly with your CRM, data platforms, collaboration suites, and automation tools—so AI agents and human operators always act on the same source of truth.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/contact?intent=integration">
                <button className="inline-flex items-center gap-2 rounded-xl bg-accent-secondary px-6 py-3 text-white transition hover:bg-accent-secondary/90">
                  Book an Integration Review <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/resources/whitepapers">
                <button className="rounded-xl border border-outline-soft px-6 py-3 text-sm font-medium text-typography-primary transition hover:border-outline-strong">
                  Download Integration Datasheet
                </button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Categories */}
      <Section className="py-12">
        <FadeIn>
          <div className="grid gap-8 md:grid-cols-2">
            {integrationCategories.map((category) => (
              <div
                key={category.title}
                className="h-full rounded-3xl border border-outline-soft/60 bg-surface-glass/60 p-8 shadow-glass backdrop-blur"
              >
                <h2 className="text-2xl font-semibold text-typography-primary">{category.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-typography-secondary">{category.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {category.connectors.map((connector) => (
                    <span
                      key={connector}
                      className="rounded-full border border-outline-soft/50 bg-surface-elevated/60 px-3 py-1 text-xs font-medium text-typography-secondary"
                    >
                      {connector}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* Capabilities */}
      <Section className="py-12">
        <FadeIn>
          <div className="rounded-3xl border border-outline-soft/60 bg-surface-glass/60 p-10 shadow-glass backdrop-blur">
            <h2 className="text-2xl font-semibold text-typography-primary">Integration capabilities out of the box</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {integrationCapabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="rounded-2xl border border-outline-soft/60 bg-surface-elevated/40 p-6"
                >
                  <capability.icon className="h-8 w-8 text-accent-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-typography-primary">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-typography-secondary">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Playbook */}
      <Section className="pb-24">
        <FadeIn>
          <div className="mx-auto max-w-5xl space-y-10 rounded-3xl border border-outline-soft/60 bg-surface-glass/60 p-10 shadow-glass backdrop-blur">
            <h2 className="text-2xl font-semibold text-typography-primary">How we deliver enterprise integrations</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {integrationPlaybook.map((item) => (
                <div key={item.step} className="rounded-2xl border border-outline-soft/60 bg-surface-elevated/40 p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-typography-muted">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-typography-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-typography-secondary">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-sm text-typography-secondary">
                Need a connector that isn&apos;t listed? Our team builds and maintains custom integrations under enterprise SLAs.
              </p>
              <Link href="mailto:hello@zinovia.ai?subject=Custom%20Integration%20Inquiry" className="text-sm font-semibold text-accent-secondary">
                Request a custom connector
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}


