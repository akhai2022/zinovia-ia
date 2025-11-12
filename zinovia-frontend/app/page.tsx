import { Suspense } from "react";
import { Hero, Services } from "@/components/sections";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => <div className="min-h-[400px]" />,
});
const CTA = dynamic(() => import("@/components/sections/CTA"), {
  loading: () => <div className="min-h-[300px]" />,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <CTA />
      </Suspense>
    </>
  );
}
