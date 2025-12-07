"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/app/theme/ThemeProvider";
import { ChevronDown, ArrowRight } from "lucide-react";
import { heroContent } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/animations/AnimatedText";
import Container from "@/components/layout/Container";

const Hero: React.FC = () => {
  const { resolved } = useTheme();
  
  // Use dark logo in dark mode, light logo in light mode
  const logoSrc = useMemo(() => {
    return resolved === "dark" ? "/logo-dark.svg" : "/logo.svg";
  }, [resolved]);
  
  const scrollToContent = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-24 text-typography-primary">
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-32 left-1/2 h-[580px] w-[580px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(91,245,255,0.25)_0%,_rgba(91,245,255,0)_68%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[420px] bg-[linear-gradient(180deg,rgba(5,7,15,0)_0%,rgba(5,7,15,0.9)_85%)]" />
        <div className="absolute inset-y-0 left-1/2 h-full w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-40" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center">
          <motion.div
            className="max-w-2xl space-y-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-outline-soft/60 bg-surface-glass/60 px-4 py-2 text-sm text-typography-secondary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-primary/80" aria-hidden="true" />
              {heroContent.tagline}
            </div>

            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-typography-primary sm:text-5xl lg:text-6xl">
              <AnimatedText text={heroContent.headline} />
            </h1>

            <motion.p
              className="text-lg leading-relaxed text-typography-secondary md:text-xl"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              {heroContent.subheading}
            </motion.p>

            <motion.div
              className="flex flex-col items-start gap-4 sm:flex-row"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Link href={heroContent.primaryAction.href}>
                <Button
                  variant="primary"
                  size="lg"
                  className="group bg-accent-secondary text-white shadow-glass hover:bg-accent-secondary/90"
                >
                  {heroContent.primaryAction.label}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href={heroContent.secondaryAction.href}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-outline-soft bg-transparent text-typography-primary hover:border-outline-strong hover:bg-surface-glass/40 hover:text-typography-primary"
                >
                  {heroContent.secondaryAction.label}
                </Button>
              </Link>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-3">
              {heroContent.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-outline-soft/50 bg-surface-glass/60 p-5 backdrop-blur shadow-glass"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-typography-muted">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-typography-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-typography-secondary">{stat.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-[32px] border border-outline-soft/40 bg-surface-glass/50 p-8 text-left shadow-glass backdrop-blur-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="absolute -top-16 right-10 hidden h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(142,84,255,0.35)_0%,_rgba(142,84,255,0)_70%)] blur-2xl lg:block" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <Image
                  src={logoSrc}
                  alt="Zinovia wordmark"
                  width={180}
                  height={64}
                  className="h-12 w-auto"
                  priority
                />
                <span className="rounded-full border border-outline-soft/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-typography-secondary">
                  Trusted Partner
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-outline-soft/50 bg-surface-elevated/40 p-4 backdrop-blur">
                  <p className="text-sm font-medium text-typography-secondary">Compliance & Security</p>
                  <p className="mt-2 text-base font-semibold text-typography-primary">
                    SOC 2 Type II • HIPAA • GDPR • ISO 27001
                  </p>
                </div>
                <div className="rounded-2xl border border-outline-soft/50 bg-surface-elevated/40 p-4 backdrop-blur">
                  <p className="text-sm font-medium text-typography-secondary">Customer Success</p>
                  <p className="mt-2 text-base font-semibold text-typography-primary">
                    98% satisfaction • 99.9% uptime SLA
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {heroContent.stats.map((stat) => (
                  <span
                    key={`pill-${stat.label}`}
                    className="rounded-full border border-outline-soft/40 bg-surface-glass/40 px-3 py-1 text-xs font-medium text-typography-secondary"
                  >
                    {stat.value} {stat.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.button
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full border border-outline-soft/50 bg-surface-glass/40 p-3 text-typography-secondary backdrop-blur transition-colors hover:border-outline-strong hover:text-typography-primary"
        onClick={scrollToContent}
        aria-label="Scroll down"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
};

export default Hero;

