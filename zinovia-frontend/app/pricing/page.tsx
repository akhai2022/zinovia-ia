"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { pricingPlans } from "@/lib/constants";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";
import Button from "@/components/ui/Button";
import { EnterpriseBadges } from "@/components/trust";

export default function PricingPage() {
  return (
    <div className="pt-20 bg-neutral-bg-light">
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto mb-8">
              Choose the plan that fits your business. Upgrade or downgrade anytime.
            </p>
            <div className="flex items-center justify-center gap-3 bg-white rounded-full px-4 py-2 w-fit mx-auto shadow-sm">
              <span className="text-sm font-medium text-neutral-text-secondary">Monthly</span>
              <span className="text-sm font-medium text-primary-navy">•</span>
              <span className="text-sm font-medium text-neutral-text-secondary">
                Annual <span className="text-xs text-accent-success">(Save 20%)</span>
              </span>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <FadeIn key={plan.id} delay={index * 0.15}>
              <motion.div
                className={`relative bg-white rounded-2xl border-2 ${
                  plan.popular
                    ? "border-primary-navy shadow-xl scale-105"
                    : "border-neutral-border"
                } p-8 h-full flex flex-col`}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-navy text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-primary-navy mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-neutral-text-secondary text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-primary-navy">
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-neutral-text-secondary text-sm">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  {plan.price !== "Custom" && (
                    <p className="text-neutral-text-secondary text-sm mt-1">
                      Annual: {plan.priceAnnual}/{plan.period}
                    </p>
                  )}
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-accent-success" />
                      </div>
                      <span className="text-sm text-neutral-text-primary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href={plan.cta === "Contact Sales" ? "/contact" : "/contact"}>
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Trust Section */}
        <FadeIn delay={0.45}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-navy mb-8">
              Enterprise-Grade Security
            </h2>
            <EnterpriseBadges variant="compact" className="max-w-4xl mx-auto" />
          </div>
        </FadeIn>

        {/* FAQ Section */}
        <FadeIn delay={0.5}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-navy mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-neutral-border">
                <h3 className="font-semibold text-primary-navy mb-2">
                  Can I switch plans anytime?
                </h3>
                <p className="text-neutral-text-secondary text-sm">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect
                  immediately, and we'll prorate any charges or credits.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-border">
                <h3 className="font-semibold text-primary-navy mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-neutral-text-secondary text-sm">
                  We accept all major credit cards, ACH transfers, and wire transfers for
                  Enterprise plans. All payments are processed securely.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-border">
                <h3 className="font-semibold text-primary-navy mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-neutral-text-secondary text-sm">
                  Yes! All plans include a 14-day free trial with full access to all features.
                  No credit card required to start.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-border">
                <h3 className="font-semibold text-primary-navy mb-2">
                  What kind of support do you offer?
                </h3>
                <p className="text-neutral-text-secondary text-sm">
                  Starter includes email support. Professional includes priority support with a
                  4-hour response time. Enterprise includes a dedicated account manager and
                  24/7 support.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}


