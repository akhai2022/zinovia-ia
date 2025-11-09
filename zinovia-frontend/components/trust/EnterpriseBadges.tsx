"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle, Award, Server, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Badge {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  certified: boolean;
}

const badges: Badge[] = [
  {
    id: "soc2",
    name: "SOC 2 Type II",
    icon: <Shield className="h-6 w-6" />,
    description: "Enterprise security standards",
    certified: true,
  },
  {
    id: "hipaa",
    name: "HIPAA",
    icon: <Lock className="h-6 w-6" />,
    description: "Healthcare compliance",
    certified: true,
  },
  {
    id: "gdpr",
    name: "GDPR",
    icon: <CheckCircle className="h-6 w-6" />,
    description: "EU data protection",
    certified: true,
  },
  {
    id: "ccpa",
    name: "CCPA",
    icon: <CheckCircle className="h-6 w-6" />,
    description: "California privacy rights",
    certified: true,
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    icon: <Award className="h-6 w-6" />,
    description: "Information security management",
    certified: true,
  },
  {
    id: "uptime",
    name: "99.9% Uptime",
    icon: <Server className="h-6 w-6" />,
    description: "SLA guarantee",
    certified: true,
  },
];

const EnterpriseBadges: React.FC<{
  variant?: "default" | "compact" | "inline";
  showLabels?: boolean;
  className?: string;
}> = ({ variant = "default", showLabels = true, className }) => {
  const isCompact = variant === "compact";
  const isInline = variant === "inline";

  if (isInline) {
    return (
      <div className={cn("flex flex-wrap items-center gap-4", className)}>
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            className="flex items-center gap-2 text-sm text-neutral-text-secondary"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-primary-navy">{badge.icon}</div>
            {showLabels && (
              <>
                <span className="font-medium text-neutral-text-primary">
                  {badge.name}
                </span>
                {badge.certified && (
                  <CheckCircle className="h-4 w-4 text-accent-success" />
                )}
              </>
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 gap-6",
        isCompact && "gap-4",
        className
      )}
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={cn(
            "rounded-xl border border-neutral-border bg-white p-4 transition-shadow",
            "hover:shadow-lg"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary-navy/10 p-2 text-primary-navy">
              {badge.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3
                  className={cn(
                    "font-semibold text-neutral-text-primary",
                    isCompact ? "text-sm" : "text-base"
                  )}
                >
                  {badge.name}
                </h3>
                {badge.certified && (
                  <CheckCircle className="h-4 w-4 text-accent-success flex-shrink-0" />
                )}
              </div>
              {showLabels && (
                <p
                  className={cn(
                    "text-neutral-text-secondary mt-1",
                    isCompact ? "text-xs" : "text-sm"
                  )}
                >
                  {badge.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EnterpriseBadges;


