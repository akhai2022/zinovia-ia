import type { Metadata } from "next";
import Link from "next/link";
import { Factory, Wrench, TrendingUp, Zap, Shield, BarChart } from "lucide-react";
import { industrySolutions } from "@/lib/constants";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";
import Button from "@/components/ui/Button";
import { ROICalculator } from "@/components/interactive";

export const metadata: Metadata = {
  title: "Manufacturing AI Platform",
  description: "Predictive maintenance, quality control, and production optimization",
};

const features = industrySolutions.manufacturing.features.map((feature, index) => ({
  id: index + 1,
  title: feature,
  icon: index === 0 ? Wrench : index === 1 ? BarChart : index === 2 ? TrendingUp : index === 3 ? Factory : index === 4 ? Shield : Zap,
}));

export default function ManufacturingPage() {
  return (
    <div className="pt-20">
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              {industrySolutions.manufacturing.hero.headline}
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto mb-8">
              {industrySolutions.manufacturing.hero.subheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">Schedule Demo</Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="secondary" size="lg">View Case Study</Button>
              </Link>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.id} delay={index * 0.1}>
                <div className="bg-white rounded-xl border border-neutral-border p-6">
                  <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 p-3 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-navy mb-2">
                    {feature.title}
                  </h3>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.6}>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 md:p-12 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
                Proven Results
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industrySolutions.manufacturing.benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {benefit.split("%")[0]}%
                  </div>
                  <p className="text-neutral-text-secondary text-sm">
                    {benefit.replace(/^\d+%\s*/, "")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="mt-24">
          <ROICalculator />
        </div>
      </Section>
    </div>
  );
}


