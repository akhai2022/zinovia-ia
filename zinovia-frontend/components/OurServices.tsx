"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Cable,
  CloudCog,
  Boxes,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import Section from "./layout/Section";
import Card from "./ui/Card";

type ServiceIcon = {
  fallback: ComponentType<SVGProps<SVGSVGElement>>;
  assetSrc?: string;
  assetAlt?: string;
};

type Service = {
  title: string;
  description: string;
  href: string;
  icon: ServiceIcon;
  highlight?: string;
};

export const servicesContent: Service[] = [
  {
    title: "AI Consulting",
    description:
      "Strategic workshops, production roadmaps, and stakeholder enablement to make AI adoption safe and measurable.",
    href: "/services/ai-consulting",
    icon: { fallback: Brain, assetAlt: "AI Consulting icon" },
    highlight: "Strategy Sprint",
  },
  {
    title: "Data Integration",
    description:
      "Pipeline design, transformation, and governance so your AI products can rely on trusted, analytics-ready data.",
    href: "/services/data-integration",
    icon: { fallback: Cable, assetAlt: "Data integration icon" },
    highlight: "Trusted Pipelines",
  },
  {
    title: "Cloud & DevOps",
    description:
      "Secure infrastructure-as-code, CI/CD, and observability for resilient AI platforms that scale with demand.",
    href: "/services/cloud-devops",
    icon: { fallback: CloudCog, assetAlt: "Cloud and DevOps icon" },
    highlight: "24/7 Reliability",
  },
  {
    title: "App Development",
    description:
      "Product-focused teams shipping performant web and mobile experiences with best-in-class DX and accessibility.",
    href: "/services/app-development",
    icon: { fallback: Boxes, assetAlt: "App development icon" },
    highlight: "DX Obsessed",
  },
  {
    title: "Security & Compliance",
    description:
      "Threat modeling, policy automation, and audit-ready controls to keep your AI workloads compliant and trusted.",
    href: "/services/security",
    icon: { fallback: ShieldCheck, assetAlt: "Security and compliance icon" },
    highlight: "Audit Ready",
  },
  {
    title: "Support & Training",
    description:
      "Upskill internal teams with tailored training, playbooks, and co-delivery so new capabilities stick.",
    href: "/services/training",
    icon: { fallback: GraduationCap, assetAlt: "Support and training icon" },
    highlight: "Adoption Playbooks",
  },
];

const OurServices = () => {
  return (
    <Section
      id="services"
      className="relative overflow-hidden py-section sm:py-section-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-services-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="services-aurora" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-2xl text-center sm:max-w-4xl">
        <h2
          id="our-services-heading"
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium uppercase tracking-[0.24em] text-accent/90 backdrop-blur-sm"
        >
          We Ship Outcomes
        </h2>
        <h3 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Full-lifecycle services engineered for enterprise velocity
        </h3>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Every engagement blends strategy, architecture, and enablement so your teams adopt AI safely and scale it with confidence.
        </p>
      </div>

      <ul
        aria-labelledby="our-services-heading"
        className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 sm:gap-7 md:grid-cols-2 lg:grid-cols-3"
      >
        {servicesContent.map((service, index) => (
          <motion.li
            key={service.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: index * 0.06, ease: [0.24, 0.82, 0.25, 1] }}
          >
            <Card
              hover={false}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-0 shadow-[0_30px_80px_-40px_rgba(21,125,255,0.45)] backdrop-blur-xl transition-transform duration-500 [@supports(backdrop-filter:blur(0))]:bg-white/6"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-[rgba(142,84,255,0.35)]" />
              </div>

              <Link
                href={service.href}
                className="relative flex h-full flex-col gap-6 rounded-3xl p-7 sm:p-8 outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label={`Learn more about ${service.title}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-3 shadow-inner transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:h-16 sm:w-16">
                    {service.icon.assetSrc ? (
                      <Image
                        src={service.icon.assetSrc}
                        alt={service.icon.assetAlt ?? `${service.title} icon`}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    ) : (
                      <service.icon.fallback className="h-full w-full text-accent" aria-hidden="true" />
                    )}
                  </div>

                  {service.highlight ? (
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.32em] text-white/70 backdrop-blur">
                      {service.highlight}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col">
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-4 text-sm text-white/70 sm:text-base">{service.description}</p>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition duration-300 group-hover:gap-3">
                  Learn more
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Card>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
};

export default OurServices;


