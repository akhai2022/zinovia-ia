"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button, useToast } from "@/components/ui";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterForm: React.FC = () => {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      const { subscribeNewsletter } = await import("@/lib/api");
      const response = await subscribeNewsletter(data);

      if (!response.success) {
        throw new Error(response.error || "Subscription failed");
      }

      showToast(response.message || "Successfully subscribed to our newsletter!", "success");
      reset();
    } catch (error) {
      console.error("Newsletter subscription failed", error);
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
          className="mb-0"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Subscribe
      </Button>
    </form>
  );
};

export default NewsletterForm;

