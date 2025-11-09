import type { Metadata } from "next";
import {
  Shield,
  Lock,
  Server,
  Eye,
  Key,
  CheckCircle,
  FileCheck,
  Users,
  Globe,
} from "lucide-react";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";
import { EnterpriseBadges } from "@/components/trust";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description:
    "Enterprise-grade security, compliance certifications, and data protection for your AI platform",
};

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All data in transit and at rest is encrypted using AES-256 encryption standards",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description:
      "Granular permissions and access controls to ensure only authorized users access data",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Server,
    title: "Multi-Region Deployment",
    description:
      "Deploy across multiple AWS regions with automatic failover and redundancy",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Eye,
    title: "Activity Monitoring",
    description:
      "Comprehensive audit logs and real-time monitoring of all system activity",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Key,
    title: "Single Sign-On (SSO)",
    description:
      "Support for SAML 2.0, OAuth 2.0, and other enterprise authentication protocols",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: FileCheck,
    title: "Regular Security Audits",
    description:
      "Third-party penetration testing and security assessments conducted quarterly",
    color: "from-teal-500 to-cyan-600",
  },
];

const complianceFeatures = [
  {
    standard: "SOC 2 Type II",
    description:
      "Annual independent audits verify our security, availability, processing integrity, confidentiality, and privacy controls",
    verified: true,
  },
  {
    standard: "HIPAA",
    description:
      "Full compliance with Health Insurance Portability and Accountability Act for protected health information",
    verified: true,
  },
  {
    standard: "GDPR",
    description:
      "European Union General Data Protection Regulation compliance for data privacy and protection",
    verified: true,
  },
  {
    standard: "CCPA",
    description:
      "California Consumer Privacy Act compliance for California residents' data rights",
    verified: true,
  },
  {
    standard: "ISO 27001",
    description:
      "International standard for information security management systems",
    verified: true,
  },
  {
    standard: "PCI DSS",
    description:
      "Payment Card Industry Data Security Standard for secure payment processing",
    verified: true,
  },
];

export default function SecurityPage() {
  return (
    <div className="pt-20 bg-neutral-bg-light">
      {/* Hero Section */}
      <Section>
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">Enterprise Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 tracking-tight">
              Security & Compliance
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-3xl mx-auto">
              Enterprise-grade security, privacy, and compliance built into every
              aspect of our platform
            </p>
          </div>
        </FadeIn>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bg-white rounded-xl border border-neutral-border p-6">
                  <div
                    className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} p-4 text-white mb-4`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-text-secondary">{feature.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Compliance Section */}
        <FadeIn delay={0.6}>
          <div className="bg-white rounded-2xl p-8 md:p-12 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
                Compliance Certifications
              </h2>
              <p className="text-neutral-text-secondary text-lg max-w-2xl mx-auto">
                We maintain the highest standards of security and compliance across all
                industries
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {complianceFeatures.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-neutral-bg-light rounded-xl"
                >
                  <div className="flex-shrink-0">
                    {item.verified ? (
                      <CheckCircle className="h-6 w-6 text-accent-success" />
                    ) : (
                      <FileCheck className="h-6 w-6 text-neutral-text-secondary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-navy mb-1">
                      {item.standard}
                    </h3>
                    <p className="text-neutral-text-secondary text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <EnterpriseBadges variant="compact" className="max-w-4xl mx-auto" />
            </div>
          </div>
        </FadeIn>

        {/* Data Protection Section */}
        <FadeIn delay={0.7}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl border border-neutral-border p-8">
              <Globe className="h-12 w-12 text-primary-navy mb-4" />
              <h3 className="text-2xl font-bold text-primary-navy mb-4">
                Data Residency
              </h3>
              <p className="text-neutral-text-secondary mb-6">
                Choose where your data is stored and processed. We support data
                residency in multiple regions including:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-neutral-text-primary">
                  <CheckCircle className="h-5 w-5 text-accent-success flex-shrink-0" />
                  United States (AWS US regions)
                </li>
                <li className="flex items-center gap-2 text-neutral-text-primary">
                  <CheckCircle className="h-5 w-5 text-accent-success flex-shrink-0" />
                  European Union (AWS EU regions)
                </li>
                <li className="flex items-center gap-2 text-neutral-text-primary">
                  <CheckCircle className="h-5 w-5 text-accent-success flex-shrink-0" />
                  Asia Pacific (AWS APAC regions)
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-neutral-border p-8">
              <Shield className="h-12 w-12 text-primary-navy mb-4" />
              <h3 className="text-2xl font-bold text-primary-navy mb-4">
                Incident Response
              </h3>
              <p className="text-neutral-text-secondary mb-6">
                We maintain a dedicated security operations center (SOC) with:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-neutral-text-primary">
                  <CheckCircle className="h-5 w-5 text-accent-success flex-shrink-0" />
                  24/7 monitoring and threat detection
                </li>
                <li className="flex items-center gap-2 text-neutral-text-primary">
                  <CheckCircle className="h-5 w-5 text-accent-success flex-shrink-0" />
                  Automated incident response workflows
                </li>
                <li className="flex items-center gap-2 text-neutral-text-primary">
                  <CheckCircle className="h-5 w-5 text-accent-success flex-shrink-0" />
                  Guaranteed notification SLA
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.8}>
          <div className="bg-gradient-to-br from-primary-navy to-primary-blue rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              See our security and compliance documentation or schedule a call with our
              security team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary-navy font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-block"
              >
                Contact Security Team
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors inline-block"
              >
                Request Compliance Docs
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}


