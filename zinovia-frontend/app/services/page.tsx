import type { Metadata } from "next";
import { services } from "@/lib/constants";
import { MessageCircle, FileText, Bot } from "lucide-react";
import { Card } from "@/components/ui";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover our comprehensive AI solutions: Custom AI Chatbots, Document Intelligence, and AI Agent Systems.",
};

const iconMap = {
  "message-circle": MessageCircle,
  "file-text": FileText,
  bot: Bot,
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <Section>
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
              Our Services
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive AI solutions designed to transform your business
              operations
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Bot;

            return (
              <FadeIn key={service.id} delay={service.id * 0.1}>
                <Card className="h-full">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              Let's discuss how our AI solutions can transform your business
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

