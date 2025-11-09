"use client";

import React from "react";
import { motion } from "framer-motion";
import { stats } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import CountUp from "@/components/animations/CountUp";
import Section from "@/components/layout/Section";

const Stats: React.FC = () => {
  return (
    <Section className="bg-primary-navy text-white">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Results That Speak
          </h2>
          <p className="text-lg text-neutral-text-secondary max-w-2xl mx-auto">
            Trusted by leading companies worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                  decimals={stat.suffix === "x" ? 1 : 0}
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{stat.label}</h3>
              <p className="text-blue-100 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Stats;

