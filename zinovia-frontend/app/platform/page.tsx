import type { Metadata } from "next";
import Link from "next/link";
import { Bot, MessageCircle, FileText, Settings, Shield, CheckCircle } from "lucide-react";
import { platformFeatures } from "@/lib/constants";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Explore our comprehensive AI platform with agents, chatbots, and document intelligence solutions",
};

const platformCategories = [
  {
    id: "agents",
    title: "AI Agent Systems",
    description: "Autonomous agents that handle complex workflows",
    icon: Bot,
    href: "/platform/agents",
    color: "from-purple-500 to-violet-600",
    features: platformFeatures.agents,
  },
  {
    id: "chatbots",
    title: "AI Chatbots",
    description: "Intelligent conversations that convert, 24/7",
    icon: MessageCircle,
    href: "/platform/chatbots",
    color: "from-blue-500 to-cyan-600",
    features: platformFeatures.chatbots,
  },
  {
    id: "document-intelligence",
    title: "Document Intelligence",
    description: "Extract insights from documents in seconds",
    icon: FileText,
    href: "/platform/document-intelligence",
    color: "from-green-500 to-emerald-600",
    features: platformFeatures.documentIntelligence,
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect with 500+ tools and platforms",
    icon: Settings,
    href: "/platform/integrations",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "security",
    title: "Security",
    description: "Enterprise-grade security and compliance",
    icon: Shield,
    href: "/platform/security",
    color: "from-indigo-500 to-blue-600",
  },
];

export default function PlatformPage() {
  return (
    <div className="pt-20 bg-neutral-bg-light">
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              Powerful AI Platform
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto">
              Comprehensive AI solutions designed to transform your business operations
            </p>
          </div>
        </FadeIn>

        {/* Platform Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {platformCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <FadeIn key={category.id} delay={index * 0.1}>
                <Link href={category.href}>
                  <div className="bg-white rounded-xl border border-neutral-border p-6 h-full hover:shadow-lg transition-all cursor-pointer group">
                    <div
                      className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} p-4 text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary-navy mb-2">
                      {category.title}
                    </h2>
                    <p className="text-neutral-text-secondary mb-4">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* Platform Highlights */}
        <FadeIn delay={0.6}>
          <div className="bg-white rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-primary-navy mb-8 text-center">
              Why Choose Our Platform?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-2">
                  Enterprise Ready
                </h3>
                <p className="text-neutral-text-secondary">
                  Built for scale with 99.9% uptime SLA
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-2">
                  Secure & Compliant
                </h3>
                <p className="text-neutral-text-secondary">
                  SOC 2, HIPAA, GDPR, ISO 27001 certified
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-2">
                  Easy to Integrate
                </h3>
                <p className="text-neutral-text-secondary">
                  Connect with 500+ tools via APIs
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}


