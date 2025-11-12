import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";
import Button from "@/components/ui/Button";
import { CheckCircle2, Brain, Cable, CloudCog, Boxes, ShieldCheck, GraduationCap } from "lucide-react";

const servicesIndex = [
  {
    slug: "ai-consulting",
    title: "AI Consulting",
    description:
      "Strategic workshops, production roadmaps, and stakeholder enablement to make AI adoption safe and measurable.",
    icon: Brain,
  },
  {
    slug: "data-integration",
    title: "Data Integration",
    description:
      "Pipeline design, transformation, and governance so your AI products can rely on trusted, analytics-ready data.",
    icon: Cable,
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    description:
      "Secure infrastructure-as-code, CI/CD, and observability for resilient AI platforms that scale with demand.",
    icon: CloudCog,
  },
  {
    slug: "app-development",
    title: "App Development",
    description:
      "Product-focused teams shipping performant web and mobile experiences with best-in-class DX and accessibility.",
    icon: Boxes,
  },
  {
    slug: "security",
    title: "Security & Compliance",
    description:
      "Threat modeling, policy automation, and audit-ready controls to keep your AI workloads compliant and trusted.",
    icon: ShieldCheck,
  },
  {
    slug: "training",
    title: "Support & Training",
    description:
      "Upskill internal teams with tailored training, playbooks, and co-delivery so new capabilities stick.",
    icon: GraduationCap,
  },
];

type ServiceDetail = {
  heroSubtitle: string;
  overview: string[];
  highlights: { title: string; description: string }[];
  outcomes: string[];
};

const detailContent: Record<string, ServiceDetail> = {
  "ai-consulting": {
    heroSubtitle: "Strategy, roadmaps, and executive alignment that turn AI ambition into funded initiatives.",
    overview: [
      "Frame the right use cases and quantify impact before you invest in delivery.",
      "Align stakeholders with a clear operating model, governance, and success metrics.",
      "Build an iterative roadmap that derisks adoption while accelerating value creation.",
    ],
    highlights: [
      {
        title: "Executive Workshops",
        description: "Facilitated sessions to identify high-leverage AI opportunities and stakeholder priorities.",
      },
      {
        title: "Business Case Modeling",
        description: "ROI, TCO, and capacity planning to secure sponsorship and budget sign-off.",
      },
      {
        title: "Operational Playbooks",
        description: "Governance, talent, and process recommendations tailored to your enterprise maturity.",
      },
    ],
    outcomes: [
      "Prioritized backlog of AI initiatives ready for build",
      "Executive alignment on KPIs, investment, and risk controls",
      "Roadmap for people, process, and technology enablement",
    ],
  },
  "data-integration": {
    heroSubtitle: "Trusted, analytics-ready pipelines that feed every AI product with governed data.",
    overview: [
      "Assess source systems and data quality to map ingestion patterns and SLAs.",
      "Engineer ELT/ETL pipelines, lakehouse architectures, and real-time streaming.",
      "Automate observability, lineage, and cataloging for compliance and scale.",
    ],
    highlights: [
      {
        title: "Pipeline Engineering",
        description: "Batch and streaming workflows built with dbt, Airflow, Dagster, Kafka, and Snowflake.",
      },
      {
        title: "Data Governance",
        description: "Metadata management, PII protection, and policy automation woven into ingestion.",
      },
      {
        title: "Quality Automation",
        description: "Automated testing, anomaly detection, and alerting so teams trust downstream AI.",
      },
    ],
    outcomes: [
      "Single source of truth powering AI agents and dashboards",
      "Automated documentation and lineage for audits",
      "Faster feature delivery with reusable data assets",
    ],
  },
  "cloud-devops": {
    heroSubtitle: "Secure infrastructure-as-code and MLOps pipelines to deploy AI reliably at scale.",
    overview: [
      "Design resilient cloud foundations across AWS, Azure, or GCP with zero-trust defaults.",
      "Automate CI/CD, model packaging, and environment promotion with full telemetry.",
      "Implement guardrails for cost, security, and regulatory compliance across environments.",
    ],
    highlights: [
      {
        title: "Infrastructure-as-Code",
        description: "Terraform, Pulumi, and Kubernetes blueprints with baked-in security and monitoring.",
      },
      {
        title: "MLOps & LLMOps",
        description: "Model registries, evaluation pipelines, and deployment automation for GenAI and classical ML.",
      },
      {
        title: "SRE Enablement",
        description: "Observability, incident response, and performance tuning for 24/7 AI workloads.",
      },
    ],
    outcomes: [
      "Consistent release cadence with automated compliance checks",
      "Reduced cloud spend through proactive optimization",
      "High availability footprints meeting enterprise SLAs",
    ],
  },
  "app-development": {
    heroSubtitle: "Product teams building performant web, mobile, and internal apps powered by AI experiences.",
    overview: [
      "Map user journeys and service blueprints to embed AI into key workflows.",
      "Ship React, Next.js, and mobile applications with pixel-perfect design systems.",
      "Integrate securely with APIs, legacy systems, and identity providers to unblock adoption.",
    ],
    highlights: [
      {
        title: "Experience Design",
        description: "UX research, prototyping, and accessibility baked into every sprint.",
      },
      {
        title: "Full-Stack Delivery",
        description: "Cross-functional squads delivering front-end, back-end, and AI integrations end-to-end.",
      },
      {
        title: "Quality Automation",
        description: "CI-driven testing suites with Playwright, Cypress, and contract validation.",
      },
    ],
    outcomes: [
      "Launch-ready experiences that drive adoption and retention",
      "Time-to-market measured in weeks, not quarters",
      "Maintainable codebases aligned with enterprise standards",
    ],
  },
  security: {
    heroSubtitle: "Compliance, security engineering, and policy automation purpose-built for AI workloads.",
    overview: [
      "Run gap assessments against SOC 2, HIPAA, GDPR, and industry benchmarks.",
      "Implement secure-by-default patterns spanning identity, network, and data protection.",
      "Automate evidence collection and audit reporting across your AI platform.",
    ],
    highlights: [
      {
        title: "Threat Modeling",
        description: "Red/blue team exercises, LLM prompt-injection tests, and continuous risk scoring.",
      },
      {
        title: "Policy Automation",
        description: "Guardrails, DLP, and encryption controls enforced via code and workflows.",
      },
      {
        title: "Audit Support",
        description: "Evidence gathering, control mapping, and auditor coordination.",
      },
    ],
    outcomes: [
      "Audit-ready AI operations with living documentation",
      "Reduced risk exposure through automated controls",
      "Stakeholder confidence in data privacy and governance",
    ],
  },
  training: {
    heroSubtitle: "Upskill teams with tailored enablement programs so AI capabilities stick.",
    overview: [
      "Design curricula for executives, product owners, engineers, and go-to-market teams.",
      "Deliver immersive workshops, labs, and on-the-job pairing to transfer knowledge.",
      "Establish communities of practice and change management rituals to sustain outcomes.",
    ],
    highlights: [
      {
        title: "Role-Based Tracks",
        description: "From AI fundamentals for leaders to deep dives for data scientists and developers.",
      },
      {
        title: "Hands-On Labs",
        description: "Real use cases and sandbox environments to practice safely and build confidence.",
      },
      {
        title: "Change Enablement",
        description: "Playbooks, office hours, and coaching that drive adoption beyond launch.",
      },
    ],
    outcomes: [
      "Empowered teams capable of operating AI products sustainably",
      "Shared vocabulary and governance across business and tech",
      "Faster onboarding for new talent and partners",
    ],
  },
};

const serviceSlugFromHref = (href: string) => href.replace(/^\/services\//, "");

const serviceDetailBySlug = servicesIndex.reduce<Record<string, typeof servicesIndex[number]>>(
  (acc, service) => {
    acc[service.slug] = service;
    return acc;
  },
  {}
);

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceDetailBySlug[slug];

  if (!service) {
    notFound();
  }

  const detail = detailContent[slug] ?? detailContent["ai-consulting"];
  const Icon = service.icon;

  return (
    <div className="pt-24">
      <Section className="pb-16">
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-outline-soft/60 bg-surface-glass/60 px-5 py-2 text-sm font-medium text-typography-secondary">
              <Icon className="h-5 w-5 text-accent-primary" aria-hidden="true" />
              {service.title}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-typography-primary sm:text-5xl">
              {service.description}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-typography-secondary">
              {detail.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact?intent=consultation">
                <Button variant="primary" size="lg" className="bg-accent-secondary hover:bg-accent-secondary/90">
                  Talk to an Expert
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="secondary" size="lg" className="border-outline-soft hover:border-outline-strong">
                  View Outcomes
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="py-12">
        <FadeIn delay={0.1}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-6 rounded-3xl border border-outline-soft/60 bg-surface-glass/60 p-8 shadow-glass backdrop-blur">
              <h2 className="text-2xl font-semibold text-typography-primary">What we deliver</h2>
              <ul className="space-y-4 text-typography-secondary">
                {detail.overview.map((item, index) => (
                  <li key={index} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 rounded-3xl border border-outline-soft/60 bg-surface-elevated/60 p-8 backdrop-blur">
              <h3 className="text-xl font-semibold text-typography-primary">Measured outcomes</h3>
              <ul className="space-y-3 text-typography-secondary">
                {detail.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-accent-primary" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="pb-24">
        <FadeIn delay={0.2}>
          <div className="rounded-3xl border border-outline-soft/60 bg-surface-glass/60 p-10 shadow-glass backdrop-blur">
            <h2 className="text-2xl font-semibold text-typography-primary">Why teams choose Zinovia</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {detail.highlights.map((highlight) => (
                <div key={highlight.title} className="rounded-2xl border border-outline-soft/60 bg-surface-elevated/40 p-6">
                  <h3 className="text-lg font-semibold text-typography-primary">{highlight.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-typography-secondary">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

export function generateStaticParams() {
  return servicesIndex.map((service) => ({ slug: service.slug }));
}
