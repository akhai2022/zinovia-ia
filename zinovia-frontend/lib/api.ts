/**
 * API client for backend communication
 * Update BASE_URL when backend is deployed
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface ContactFormPayload {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface NewsletterPayload {
  email: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * Submit contact form
 */
export async function submitContactForm(
  data: ContactFormPayload
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit contact form");
    }

    return await response.json();
  } catch (error) {
    console.error("Contact form submission error:", error);
    throw error;
  }
}

/**
 * Subscribe to newsletter
 */
export async function subscribeNewsletter(
  data: NewsletterPayload
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${BASE_URL}/newsletter/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to subscribe");
    }

    return await response.json();
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    throw error;
  }
}

/**
 * Health check - verify backend is available
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/health`, {
      method: "GET",
    });
    return response.ok;
  } catch {
    return false;
  }
}

