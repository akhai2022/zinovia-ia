"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, FileText, Bot, ArrowRight } from "lucide-react";
import { services } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Card from "@/components/ui/Card";
import Section from "@/components/layout/Section";

const iconMap = {
  "message-circle": MessageCircle,
  "file-text": FileText,
  bot: Bot,
};

const serviceImageMap: Record<number, string> = {
  1: "/images/services/service-chatbot.jpg",
  2: "/images/services/service-document.jpg",
  3: "/images/services/service-agents.jpg",
};

const Services: React.FC = memo(() => {
  return (
    <Section id="services">
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
            Our Services
          </h2>
          <p className="text-lg text-neutral-text-secondary max-w-2xl mx-auto">
            Cutting-edge AI solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Bot;
            const imagePath = serviceImageMap[service.id];

            // Gradient backgrounds for each service (UX-friendly)
            const gradientClasses: Record<number, string> = {
              1: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700", // Chatbots - Blue
              2: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700", // Document - Purple
              3: "bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700", // Agents - Indigo
            };

            const gradientClass = gradientClasses[service.id] || "bg-gradient-to-br from-primary-navy to-primary-dark";

            return (
              <motion.div key={service.id} variants={fadeInUp}>
                <Card className="h-full flex flex-col group cursor-pointer overflow-hidden">
                  {/* Service Image Header with Gradient Background */}
                  <div className={`relative w-full h-48 mb-4 -mx-6 -mt-6 overflow-hidden ${gradientClass}`}>
                    {/* Gradient Background Overlay */}
                    <div className={`absolute inset-0 ${gradientClass} opacity-90`} />
                    
                    {/* Pattern Overlay for Texture */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]" />
                    </div>
                    
                    {/* Try to load actual image, fallback to gradient */}
                    {imagePath && (
                      <Image
                        src={imagePath}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    
                    {/* Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Icon Background Glow */}
                        <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl scale-150 group-hover:scale-175 transition-transform duration-300" />
                        {/* Icon Container */}
                        <div className="relative w-20 h-20 rounded-2xl bg-white/95 backdrop-blur-sm p-5 shadow-2xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                          <Icon className="h-10 w-10 text-primary-navy" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 px-2">
                    <h3 className="text-2xl font-bold text-primary-navy mb-2 group-hover:text-primary-blue transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-neutral-text-secondary mb-6 leading-relaxed">{service.description}</p>
                    
                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-neutral-text-secondary">
                          <span className="text-primary-blue mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Link */}
                  <div className="mt-auto pt-4 border-t border-neutral-border px-2">
                    <Link
                      href="/services"
                      className="inline-flex items-center text-primary-navy font-semibold hover:text-primary-blue transition-colors group-hover:gap-2 gap-1"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
});

Services.displayName = "Services";

export default Services;
