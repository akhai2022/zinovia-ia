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
          {/* Company Image */}
          <div className="relative w-full h-96 mb-16 rounded-xl overflow-hidden">
            <Image
              src="/images/office.jpg"
              alt="Zinovia Office"
              fill
              className="object-cover"
              priority
            />
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

