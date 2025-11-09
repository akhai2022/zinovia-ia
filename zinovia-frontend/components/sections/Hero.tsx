"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { heroContent } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/animations/AnimatedText";
import Container from "@/components/layout/Container";

const Hero: React.FC = () => {
  const scrollToContent = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
      {/* Subtle background pattern - Scale.ai style */}
      <div className="absolute inset-0 bg-neutral-bg-light">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      </div>

      <Container className="relative z-10">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-navy mb-6 leading-tight tracking-tight">
              <AnimatedText text={heroContent.headline} />
            </h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-neutral-text-secondary max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            {heroContent.subheading}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Link href="/contact">
              <Button variant="primary" size="lg" className="group bg-primary-navy hover:bg-primary-dark text-white border-none">
                {heroContent.ctaPrimary}
                <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button variant="secondary" size="lg" className="bg-white border-neutral-border text-primary-navy hover:bg-neutral-bg-light">
                {heroContent.ctaSecondary}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-neutral-text-secondary hover:text-primary-navy transition-colors"
        onClick={scrollToContent}
        aria-label="Scroll down"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.button>
    </section>
  );
};

export default Hero;

