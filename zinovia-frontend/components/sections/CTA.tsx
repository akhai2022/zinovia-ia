"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import Button from "@/components/ui/Button";
import Section from "@/components/layout/Section";

const CTA: React.FC = () => {
  return (
    <Section className="bg-primary-navy text-white">
      <motion.div
        className="text-center max-w-3xl mx-auto"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-neutral-text-secondary mb-8">
          Join hundreds of companies already using Zinovia's AI solutions to
          streamline operations and delight customers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button
              variant="secondary"
              size="lg"
              className="group bg-white text-primary-navy hover:bg-neutral-bg-light"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/case-studies">
            <Button
              variant="ghost"
              size="lg"
              className="text-white border border-white/20 hover:bg-white/10"
            >
              View Case Studies
            </Button>
          </Link>
        </div>
      </motion.div>
    </Section>
  );
};

export default CTA;

