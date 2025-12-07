"use client";

import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  placeholder = "Select...",
  value,
  onValueChange,
  children,
  className,
  required,
  error,
}) => {
    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
          <SelectPrimitive.Trigger
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-lg border px-4 py-3",
              "text-black placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:text-gray-500",
              "transition-all duration-300"
            )}
            aria-label={label}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className={cn(
                "relative z-50 min-w-[8rem] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
              )}
              position="popper"
            >
              <SelectPrimitive.Viewport className="p-1">
                {children}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
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
};

Select.displayName = "Select";

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none",
        "focus:bg-blue-50 focus:text-blue-900",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 flex items-center justify-center">
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = "SelectItem";

export { Select, SelectItem };

