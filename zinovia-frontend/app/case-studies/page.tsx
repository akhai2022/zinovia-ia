"use client";

import { useState } from "react";
import Image from "next/image";
import { caseStudies } from "@/lib/constants";
import { Card, Badge } from "@/components/ui";
import Section from "@/components/layout/Section";
import { FadeIn } from "@/components/animations";

const industries = ["All", "Retail", "Finance", "Healthcare", "Manufacturing"];

const caseStudyImageMap: Record<number, string> = {
  1: "/images/case-studies/case-study-retail.jpg",
  2: "/images/case-studies/case-study-finance.jpg",
  3: "/images/case-studies/case-study-healthcare.jpg",
  4: "/images/case-studies/case-study-manufacturing.jpg",
};

export default function CaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const filteredCaseStudies =
    selectedIndustry === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.industry === selectedIndustry);

  return (
    <div className="pt-20">
      <Section>
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-4 tracking-tight">
              Case Studies
            </h1>
            <p className="text-lg text-neutral-text-secondary max-w-2xl mx-auto">
              Real results from real clients across various industries
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedIndustry === industry
                    ? "bg-primary-navy text-white"
                    : "bg-neutral-bg-light text-primary-navy hover:bg-neutral-border"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCaseStudies.map((caseStudy, index) => {
            const imagePath = caseStudyImageMap[caseStudy.id];

            return (
              <FadeIn key={caseStudy.id} delay={index * 0.1}>
                <Card className="h-full overflow-hidden">
                  {/* Case Study Image */}
                  {imagePath && (
                    <div className="relative w-full h-56 -mx-6 -mt-6 mb-6 overflow-hidden">
                      <Image
                        src={imagePath}
                        alt={caseStudy.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-primary-navy">
                      {caseStudy.title}
                    </h2>
                    <Badge variant="outline">{caseStudy.industry}</Badge>
                  </div>
                  <p className="text-neutral-text-secondary mb-6">{caseStudy.description}</p>
                  <div>
                    <h3 className="font-semibold text-primary-navy mb-3">Results:</h3>
                    <ul className="space-y-2">
                      {caseStudy.results.map((result, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-accent-success mr-2">✓</span>
                          <span className="text-neutral-text-primary">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
