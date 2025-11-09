import type { Metadata } from "next";
import Link from "next/link";
import { Book, Calculator, GraduationCap, TrendingUp, Video, FileText } from "lucide-react";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";
import { ROICalculator } from "@/components/interactive";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Learn about AI, calculate your ROI, access webinars, whitepapers, and more resources to transform your business",
};

const resourceCategories = [
  {
    id: "calculator",
    title: "ROI Calculator",
    description: "Calculate your potential savings with AI automation",
    icon: Calculator,
    href: "#calculator",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "blog",
    title: "Blog & Insights",
    description: "Latest AI trends, guides, and industry insights",
    icon: Book,
    href: "/resources/blog",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "webinars",
    title: "Webinars",
    description: "On-demand and live webinars from AI experts",
    icon: Video,
    href: "/resources/webinars",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "whitepapers",
    title: "Whitepapers",
    description: "In-depth research and industry reports",
    icon: FileText,
    href: "/resources/whitepapers",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "assessment",
    title: "AI Maturity Assessment",
    description: "Evaluate your organization's AI readiness",
    icon: GraduationCap,
    href: "/resources/ai-maturity-assessment",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: "case-studies",
    title: "Success Stories",
    description: "Real results from real companies",
    icon: TrendingUp,
    href: "/case-studies",
    color: "from-teal-500 to-cyan-600",
  },
];

export default function ResourcesPage() {
  return (
    <div className="pt-20 bg-neutral-bg-light">
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              Resources & Insights
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto">
              Everything you need to learn about AI, calculate ROI, and transform your business
            </p>
          </div>
        </FadeIn>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {resourceCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <FadeIn key={category.id} delay={index * 0.1}>
                <Link href={category.href}>
                  <div className="bg-white rounded-xl border border-neutral-border p-6 h-full hover:shadow-lg transition-all cursor-pointer group">
                    <div
                      className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} p-4 text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary-navy mb-2">
                      {category.title}
                    </h2>
                    <p className="text-neutral-text-secondary">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* ROI Calculator Section */}
        <div id="calculator" className="mb-24">
          <ROICalculator />
        </div>

        {/* CTA Section */}
        <FadeIn delay={0.6}>
          <div className="bg-gradient-to-br from-primary-navy to-primary-blue rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              Join hundreds of companies already using Zinovia's AI solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-white text-primary-navy font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  Schedule Demo
                </button>
              </Link>
              <Link href="/pricing">
                <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                  View Pricing
                </button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}


