"use client";

import Image from "next/image";
import { Users, Target, Lightbulb, Heart } from "lucide-react";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";


const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We're committed to making AI accessible and valuable for businesses of all sizes.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We stay ahead of the curve with cutting-edge technology and creative solutions.",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description:
      "Your success is our success. We build lasting partnerships with our clients.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our team combines deep technical expertise with business acumen.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              About Zinovia
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto">
              We're a team of AI experts dedicated to helping businesses
              harness the power of artificial intelligence to achieve
              extraordinary results.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/* Company Visual */}
          <div className="relative w-full h-96 mb-16 overflow-hidden rounded-3xl border border-outline-soft/60 bg-gradient-to-br from-surface-muted via-surface-primary to-surface-elevated shadow-glass">
            <div className="absolute inset-0 opacity-70">
              <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(91,245,255,0.25)_0%,_rgba(91,245,255,0)_65%)] blur-3xl" />
              <div className="absolute bottom-0 right-1/5 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(142,84,255,0.20)_0%,_rgba(142,84,255,0)_70%)] blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.08)_100%)]" />
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-12 text-center">
              <span className="rounded-full border border-outline-soft/60 bg-surface-glass/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-typography-secondary">
                Our Culture
              </span>
              <h2 className="text-3xl font-semibold text-typography-primary">
                Innovation-led, customer-obsessed, globally distributed.
              </h2>
              <p className="max-w-2xl text-base text-typography-secondary">
                We operate as one integrated team—research, engineering, delivery, and success—bringing enterprise AI products to life with speed and accountability.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-bold text-primary-navy mb-4">
              Our Story
            </h2>
            <p className="text-neutral-text-primary mb-4">
              Founded in 2020, Zinovia emerged from a simple belief: AI should
              be accessible, practical, and transformative for every business.
              What started as a small team of passionate engineers has grown
              into a trusted partner for hundreds of companies worldwide.
            </p>
            <p className="text-neutral-text-primary mb-4">
              We've helped organizations across industries—from startups to
              Fortune 500 companies—implement AI solutions that drive real
              business value. Our approach combines technical excellence with
              deep understanding of business challenges.
            </p>
            <p className="text-neutral-text-primary">
              Today, we continue to push boundaries, developing innovative
              solutions that not only solve today's problems but anticipate
              tomorrow's opportunities.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div>
            <h2 className="text-3xl font-bold text-primary-navy mb-8 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <FadeIn key={index} delay={0.1 * index}>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-navy flex items-center justify-center text-white">
                      <value.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-navy mb-2">
                      {value.title}
                    </h3>
                    <p className="text-neutral-text-secondary">{value.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

