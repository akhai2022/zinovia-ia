"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  DollarSign,
  ShoppingBag,
  Factory,
  Scale,
  ArrowRight,
} from "lucide-react";
import { industrySolutions } from "@/lib/constants";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";
import { EnterpriseBadges } from "@/components/trust";

const industries = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Heart,
    color: "from-red-500 to-pink-600",
    href: "/solutions/healthcare",
  },
  {
    id: "finance",
    name: "Finance",
    icon: DollarSign,
    color: "from-green-500 to-emerald-600",
    href: "/solutions/finance",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: ShoppingBag,
    color: "from-blue-500 to-cyan-600",
    href: "/solutions/ecommerce",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    color: "from-purple-500 to-violet-600",
    href: "/solutions/manufacturing",
  },
  {
    id: "legal",
    name: "Legal",
    icon: Scale,
    color: "from-indigo-500 to-blue-600",
    href: "/solutions/legal",
  },
];

export default function SolutionsPage() {
  return (
    <div className="pt-20">
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              Industry-Specific AI Solutions
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto">
              Tailored AI platforms designed for your industry's unique challenges
              and compliance requirements
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {industries.map((industry) => {
            const solution = industrySolutions[
              industry.id as keyof typeof industrySolutions
            ];
            const Icon = industry.icon;

            return (
              <FadeIn key={industry.id} delay={industries.indexOf(industry) * 0.1}>
                <Link href={industry.href}>
                  <motion.div
                    className="bg-white rounded-xl border border-neutral-border p-6 h-full hover:shadow-lg transition-all cursor-pointer group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`w-16 h-16 rounded-lg bg-gradient-to-br ${industry.color} p-4 text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary-navy mb-2">
                      {solution?.title}
                    </h2>
                    <p className="text-neutral-text-secondary mb-4">
                      {solution?.description}
                    </p>
                    <div className="flex items-center text-primary-navy font-medium group-hover:gap-2 transition-all">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.6}>
          <div className="bg-gradient-to-br from-primary-navy to-primary-blue rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise-Grade Security & Compliance
            </h2>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              All solutions are built with industry-leading security, compliance, and
              privacy standards
            </p>
            <div className="max-w-4xl mx-auto">
              <EnterpriseBadges variant="compact" showLabels={false} />
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}


