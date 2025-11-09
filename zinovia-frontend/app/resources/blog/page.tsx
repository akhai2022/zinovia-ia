import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description: "Latest AI trends, guides, and industry insights from Zinovia",
};

export default function BlogPage() {
  return (
    <div className="pt-20 bg-neutral-bg-light">
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              Blog & Insights
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto">
              Stay updated with the latest AI trends, guides, and industry insights
            </p>
          </div>
        </FadeIn>

        <div className="text-center py-20">
          <p className="text-xl text-neutral-text-secondary mb-8">
            Coming soon! Check back for the latest insights and updates.
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


