"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Lightbulb, Code, Rocket } from "lucide-react";
import { howItWorks } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Section from "@/components/layout/Section";

const iconMap = {
  phone: Phone,
  lightbulb: Lightbulb,
  code: Code,
  rocket: Rocket,
};

const HowItWorks: React.FC = () => {
  return (
    <Section className="bg-neutral-bg-light">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-neutral-text-secondary max-w-2xl mx-auto">
            A simple, proven process to transform your business with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap] || Phone;

            return (
              <motion.div
                key={step.id}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary-navy flex items-center justify-center text-white shadow-sm">
                    <Icon className="h-10 w-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-sm">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-text-secondary">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
};

export default HowItWorks;

