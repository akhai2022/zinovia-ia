import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";

export const metadata: Metadata = {
  title: "Webinars",
  description: "On-demand and live webinars from AI experts",
};

export default function WebinarsPage() {
  return (
    <div className="pt-20 bg-neutral-bg-light">
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              Webinars
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto">
              Learn from AI experts through on-demand and live webinars
            </p>
          </div>
        </FadeIn>

        <div className="text-center py-20">
          <p className="text-xl text-neutral-text-secondary mb-8">
            Coming soon! Check back for upcoming webinars.
          </p>
          <Link href="/resources">
            <button className="bg-primary-navy text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-blue transition-colors">
              Back to Resources
            </button>
          </Link>
        </div>
      </Section>
    </div>
  );
}


