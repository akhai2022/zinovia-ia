"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ButtonProps as BaseButtonProps } from "@/types";

interface ButtonProps extends Omit<BaseButtonProps, 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

    const variants = {
      primary:
        "bg-primary-navy text-white hover:bg-primary-dark focus:ring-primary-blue shadow-sm hover:shadow-md transition-all",
      secondary:
        "bg-white text-primary-navy border border-neutral-border hover:border-primary-navy hover:bg-neutral-bg-light focus:ring-primary-blue",
      ghost:
        "text-neutral-text-secondary hover:text-primary-navy hover:bg-neutral-bg-light focus:ring-primary-blue",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        <span className={cn(isLoading && "opacity-70")}>{children}</span>
        {variant === "primary" && (
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.6 }}
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;

