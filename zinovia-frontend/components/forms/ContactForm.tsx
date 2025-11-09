"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Input, Textarea, Button, useToast } from "@/components/ui";
import { fadeInUp } from "@/lib/animations";
import type { ContactFormData } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm: React.FC = () => {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const { submitContactForm } = await import("@/lib/api");
      const response = await submitContactForm(data);

      if (!response.success) {
        throw new Error(response.error || "Submission failed");
      }

      showToast(response.message || "Thank you! We'll get back to you soon.", "success");
      reset();
    } catch (error) {
      console.error("Contact form submission failed", error);
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Input
        label="Name"
        {...register("name")}
        error={errors.name?.message}
        required
        placeholder="John Doe"
      />

      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
        required
        placeholder="john@example.com"
      />

      <Input
        label="Company"
        {...register("company")}
        error={errors.company?.message}
        required
        placeholder="Acme Inc."
      />

      <Textarea
        label="Message"
        {...register("message")}
        error={errors.message?.message}
        required
        placeholder="Tell us about your project..."
        rows={6}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Send Message
      </Button>
    </motion.form>
  );
};

export default ContactForm;

