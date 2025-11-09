import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Shield,
  Clock,
  FileCheck,
  UserCheck,
  Brain,
} from "lucide-react";
import { industrySolutions } from "@/lib/constants";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";
import { EnterpriseBadges } from "@/components/trust";
import Button from "@/components/ui/Button";
import { ROICalculator } from "@/components/interactive";

export const metadata: Metadata = {
  title: "Healthcare AI Solutions",
  description:
    "HIPAA-compliant AI solutions for medical practices, hospitals, and healthcare providers",
};

const features = industrySolutions.healthcare.features.map((feature, index) => ({
  id: index + 1,
  title: feature,
  icon: index === 0 ? Heart : index === 1 ? Brain : index === 2 ? FileCheck : index === 3 ? Clock : UserCheck,
}));

export default function HealthcarePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              {industrySolutions.healthcare.hero.headline}
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto mb-8">
              {industrySolutions.healthcare.hero.subheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Schedule Demo
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="secondary" size="lg">
                  View Case Study
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.id} delay={index * 0.1}>
                <div className="bg-white rounded-xl border border-neutral-border p-6">
                  <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 p-3 mb-4">
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

        {/* Benefits Section */}
        <FadeIn delay={0.6}>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 md:p-12 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
                Proven Results
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industrySolutions.healthcare.benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">
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

        {/* Compliance Section */}
        <FadeIn delay={0.7}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">HIPAA Compliant</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
              Enterprise Security & Compliance
            </h2>
            <p className="text-neutral-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Built with healthcare-grade security and privacy standards
            </p>
          </div>
          <EnterpriseBadges className="max-w-4xl mx-auto" />
        </FadeIn>

        {/* ROI Calculator */}
        <div className="mt-24">
          <ROICalculator />
        </div>
      </Section>
    </div>
  );
}


