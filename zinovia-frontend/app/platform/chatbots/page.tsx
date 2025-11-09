import type { Metadata } from "next";
import { MessageCircle, Globe, Mic, Heart, Network, FlaskConical, BarChart3 } from "lucide-react";
import { platformFeatures } from "@/lib/constants";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";
import { EnterpriseBadges } from "@/components/trust";

export const metadata: Metadata = {
  title: "AI Chatbots",
  description: "Intelligent conversations that convert, 24/7. Multi-language, voice, and sentiment analysis",
};

const iconMap: Record<string, any> = {
  globe: Globe,
  mic: Mic,
  heart: Heart,
  network: Network,
  flask: FlaskConical,
  "bar-chart": BarChart3,
};

export default function ChatbotsPage() {
  return (
    <div className="pt-20 bg-neutral-bg-light">
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              AI Chatbots That Convert
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto">
              Intelligent conversations powered by advanced AI, available 24/7 across all channels
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {platformFeatures.chatbots.map((feature, index) => {
            const Icon = iconMap[feature.icon] || MessageCircle;
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bg-white rounded-xl border border-neutral-border p-6">
                  <div className="w-16 h-16 rounded-lg bg-blue-100 text-blue-600 p-4 mb-4">
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
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12">
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


