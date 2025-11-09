import type { Metadata } from "next";
import Link from "next/link";
import { Settings, Plug } from "lucide-react";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect with 500+ tools and platforms via APIs and webhooks",
};

export default function IntegrationsPage() {
  return (
    <div className="pt-20 bg-neutral-bg-light">
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Plug className="h-5 w-5" />
              <span className="font-semibold">500+ Integrations</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              Connect Everything
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto">
              Seamlessly integrate with your existing tools via REST APIs, webhooks, and native connectors
            </p>
          </div>
        </FadeIn>

        <div className="text-center py-20">
          <Settings className="h-24 w-24 text-neutral-border mx-auto mb-8" />
          <p className="text-xl text-neutral-text-secondary mb-8">
            Integration catalog coming soon!
          </p>
          <Link href="/platform">
            <button className="bg-primary-navy text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-blue transition-colors">
              Back to Platform
            </button>
          </Link>
        </div>
      </Section>
    </div>
  );
}


