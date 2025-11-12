import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Github } from "lucide-react";
import { navigation, companyInfo } from "@/lib/constants";
import Container from "./Container";

const solutionLinks = [
  { name: "Healthcare", href: "/solutions/healthcare" },
  { name: "Finance", href: "/solutions/finance" },
  { name: "E-commerce", href: "/solutions/ecommerce" },
  { name: "Legal", href: "/solutions/legal" },
  { name: "Manufacturing", href: "/solutions/manufacturing" },
];

const resourceLinks = [
  { name: "Blog", href: "/resources/blog" },
  { name: "Webinars", href: "/resources/webinars" },
  { name: "Whitepapers", href: "/resources/whitepapers" },
  { name: "ROI Calculator", href: "/resources/ai-maturity-assessment" },
  { name: "Security & Compliance", href: "/platform/security" },
];

const servicesLinks = [
  { name: "AI Consulting", href: "/services/ai-consulting" },
  { name: "Data Integration", href: "/services/data-integration" },
  { name: "Cloud & DevOps", href: "/services/cloud-devops" },
  { name: "App Development", href: "/services/app-development" },
  { name: "Support & Training", href: "/services/training" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-navy text-white">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <Image
                src="/logo.svg"
                alt="Zinovia Logo"
                width={140}
                height={50}
                className="h-10 w-auto brightness-0 invert"
              />
              <h3 className="text-2xl font-bold text-white sr-only">
                Zinovia
              </h3>
              <p className="text-sm text-neutral-text-secondary">
                {companyInfo.tagline}
              </p>
              <div className="flex space-x-4">
                <a
                  href={companyInfo.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-text-secondary hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={companyInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-text-secondary hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={companyInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-text-secondary hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-text-secondary hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {servicesLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-text-secondary hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                {solutionLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-text-secondary hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {resourceLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-text-secondary hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-neutral-text-secondary">
            <p>
              &copy; {currentYear} {companyInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

