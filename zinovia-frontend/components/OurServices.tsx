"use client";

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

type Service = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const servicesContent: Service[] = [
  {
    title: "AI Consulting",
    description:
      "Strategic workshops, production roadmaps, and stakeholder enablement to make AI adoption safe and measurable.",
    href: "/services/ai-consulting",
    icon: Brain,
  },
  {
    title: "Data Integration",
    description:
      "Pipeline design, transformation, and governance so your AI products can rely on trusted, analytics-ready data.",
    href: "/services/data-integration",
    icon: Cable,
  },
  {
    title: "Cloud & DevOps",
    description:
      "Secure infrastructure-as-code, CI/CD, and observability for resilient AI platforms that scale with demand.",
    href: "/services/cloud-devops",
    icon: CloudCog,
  },
  {
    title: "App Development",
    description:
      "Product-focused teams shipping performant web and mobile experiences with best-in-class DX and accessibility.",
    href: "/services/app-development",
    icon: Boxes,
  },
  {
    title: "Security & Compliance",
    description:
      "Threat modeling, policy automation, and audit-ready controls to keep your AI workloads compliant and trusted.",
    href: "/services/security",
    icon: ShieldCheck,
  },
  {
    title: "Support & Training",
    description:
      "Upskill internal teams with tailored training, playbooks, and co-delivery so new capabilities stick.",
    href: "/services/training",
    icon: GraduationCap,
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: index * 0.05,
    },
  }),
};

const OurServices = () => {
  return (
    <Section id="services" className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
        <h2
          id="our-services-heading"
          className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary-navy"
        >
          Our Services
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral-text-secondary">
          Full-lifecycle support from discovery to scale—designed to unlock
          momentum with measurable outcomes.
        </p>
      </div>

      <ul
        aria-labelledby="our-services-heading"
        className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {servicesContent.map((service, index) => (
          <motion.li
            key={service.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            variants={containerVariants}
          >
            <Card
              hover={false}
              className="h-full rounded-2xl border border-neutral-200 bg-white p-0 shadow-sm transition-shadow duration-300 focus-within:ring-2 focus-within:ring-primary-blue focus-within:ring-offset-2 focus-within:ring-offset-white"
            >
              <Link
                href={service.href}
                className="group flex flex-col h-full rounded-2xl p-6 sm:p-7 outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white transition"
                aria-label={`Learn more about ${service.title}`}
              >
                <div className="inline-flex items-center justify-center rounded-xl bg-primary-blue/10 text-primary-blue w-12 h-12 sm:w-14 sm:h-14 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-primary-navy">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-neutral-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-blue group-hover:translate-x-1 transition-transform duration-300">
                  Learn more
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
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


