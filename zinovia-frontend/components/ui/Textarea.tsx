"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FormFieldProps } from "@/types";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Partial<Omit<FormFieldProps, 'type'>> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <motion.textarea
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg border transition-all duration-300 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500",
            "disabled:bg-gray-100 disabled:cursor-not-allowed",
            className
          )}
          whileFocus={{ scale: 1.01 }}
          {...(props as React.ComponentProps<typeof motion.textarea>)}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;

