import type { Metadata } from "next";
import { Bot, RefreshCw, Network, Bell, GitBranch, Plug, Brain } from "lucide-react";
import { platformFeatures } from "@/lib/constants";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";
import { EnterpriseBadges } from "@/components/trust";

export const metadata: Metadata = {
  title: "AI Agent Systems",
  description: "Autonomous agents that handle complex workflows with self-healing and orchestration",
};

const iconMap: Record<string, any> = {
  "refresh-cw": RefreshCw,
  network: Network,
  bell: Bell,
  mesh: GitBranch,
  plug: Plug,
  brain: Brain,
};

export default function AgentsPage() {
  return (
    <div className="pt-20 bg-neutral-bg-light">
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              Autonomous AI Agents
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto">
              Intelligent agents that autonomously handle complex workflows and multi-step tasks
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {platformFeatures.agents.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Bot;
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bg-white rounded-xl border border-neutral-border p-6">
                  <div className="w-16 h-16 rounded-lg bg-purple-100 text-purple-600 p-4 mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-text-secondary">{feature.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.6}>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-primary-navy mb-8 text-center">
              Enterprise Trust & Security
            </h2>
            <EnterpriseBadges variant="compact" className="max-w-4xl mx-auto" />
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}


