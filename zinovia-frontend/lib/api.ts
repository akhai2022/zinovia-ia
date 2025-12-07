/**
 * API client for backend communication.
 * Runtime configuration is injected via window.__ZINOVIA_RUNTIME__ to ensure
 * Cloud Run environment variables are respected even for statically generated bundles.
 */

type RuntimeConfig = {
  apiBaseUrl?: string;
  chatApiUrl?: string;
};

declare global {
  interface Window {
    __ZINOVIA_RUNTIME__?: RuntimeConfig;
  }

  // eslint-disable-next-line no-var
  var __ZINOVIA_RUNTIME__: RuntimeConfig | undefined;
}

const DEFAULT_API_BASE_URL = "http://localhost:8000/api/v1";

function computeServerRuntimeConfig(): RuntimeConfig {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_BASE_URL ||
    process.env.API_URL ||
    DEFAULT_API_BASE_URL;

  const chatBase =
    process.env.NEXT_PUBLIC_CHAT_API_URL ||
    process.env.CHAT_API_URL ||
    (apiBase.endsWith("/api/v1") ? apiBase.replace(/\/api\/v1$/, "") : apiBase);

  return {
    apiBaseUrl: apiBase,
    chatApiUrl: chatBase,
  };
}

if (typeof globalThis !== "undefined" && !globalThis.__ZINOVIA_RUNTIME__) {
  globalThis.__ZINOVIA_RUNTIME__ = computeServerRuntimeConfig();
}

function getRuntimeConfig(): RuntimeConfig {
  if (typeof window !== "undefined" && window.__ZINOVIA_RUNTIME__) {
    return window.__ZINOVIA_RUNTIME__;
  }
  return globalThis.__ZINOVIA_RUNTIME__ || computeServerRuntimeConfig();
}

export function getApiBaseUrl(): string {
  const runtime = getRuntimeConfig();
  return runtime.apiBaseUrl || DEFAULT_API_BASE_URL;
}

export function getChatBaseUrl(): string {
  const runtime = getRuntimeConfig();
  if (runtime.chatApiUrl) {
    return runtime.chatApiUrl;
  }
  const apiBase = getApiBaseUrl();
  return apiBase.endsWith("/api/v1") ? apiBase.replace(/\/api\/v1$/, "") : apiBase;
}

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

export interface ChatRequestPayload {
  session_id: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface ChatResponsePayload {
  reply: string;
  session_id: string;
  state: string;
  finished: boolean;
  debug?: Record<string, unknown>;
}

/**
 * Submit contact form
 */
export async function submitContactForm(
  data: ContactFormPayload
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // FastAPI returns errors with 'detail' field, not 'message'
      const errorMessage = errorData.detail || errorData.message || `Failed to submit contact form (${response.status})`;
      throw new Error(errorMessage);
    }

    const result = await response.json();
    // Backend returns ContactResponse with success, message, and contact_id
    // This matches ApiResponse format, so return as-is
    return result;
  } catch (error) {
    console.error("Contact form submission error:", error);
    // Re-throw with a more user-friendly message if it's a network error
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Unable to connect to server. Please check your connection and try again.");
    }
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
    const response = await fetch(`${getApiBaseUrl()}/newsletter/subscribe`, {
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
 * Send chat message to onboarding assistant
 */
export async function sendChatMessage(
  payload: ChatRequestPayload
): Promise<ChatResponsePayload> {
  try {
    const response = await fetch(`/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || errorData.message || "Chat service unavailable"
      );
    }

    return (await response.json()) as ChatResponsePayload;
  } catch (error) {
    console.error("Chat message error:", error);
    throw error;
  }
}

/**
 * Health check - verify backend is available
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/health`, {
      method: "GET",
    });
    return response.ok;
  } catch {
    return false;
  }
}

