"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/constants";
import Section from "@/components/layout/Section";

const testimonialImageMap: Record<number, string> = {
  1: "/images/testimonials/testimonial-sarah.jpg",
  2: "/images/testimonials/testimonial-michael.jpg",
  3: "/images/testimonials/testimonial-emily.jpg",
};

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-4 tracking-tight">
          What Clients Say
        </h2>
        <p className="text-lg text-neutral-text-secondary max-w-2xl mx-auto">
          Don't just take our word for it
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-12"
          >
            <Quote className="h-12 w-12 text-primary-navy mb-4" />
            <blockquote className="text-xl md:text-2xl font-medium text-primary-navy mb-6">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {testimonialImageMap[testimonials[currentIndex].id] && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonialImageMap[testimonials[currentIndex].id]}
                      alt={testimonials[currentIndex].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-primary-navy">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-neutral-text-secondary">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
              <p className="text-neutral-text-secondary font-medium">
                {testimonials[currentIndex].company}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary-navy"
                      : "w-3 bg-neutral-border hover:bg-neutral-text-secondary"
                  }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;

