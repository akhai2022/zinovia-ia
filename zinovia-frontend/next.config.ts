import type { NextConfig } from "next";

type HardenedNextConfig = NextConfig & {
  swcMinify?: boolean;
};

const isProd = process.env.NODE_ENV === "production";

// Get API URL from environment variables for CSP
const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_CHAT_API_URL || "";
let apiOrigin = "";
try {
  if (apiUrl) {
    apiOrigin = new URL(apiUrl).origin;
  }
} catch {
  // Invalid URL, will use fallback
}

// Build connect-src directive with allowed origins
const connectSrc = [
  "'self'",
  apiOrigin,
  "https://api-backend-dev-keugzsgvkq-ew.a.run.app", // Backend API (dev)
  "https://zinovia-frontend-dev-keugzsgvkq-ew.a.run.app", // Frontend (for same-origin)
].filter(Boolean).join(" ");

const cspDirectives: string[] = [
  "default-src 'self'",
  // Next.js requires 'unsafe-inline' and 'unsafe-eval' for its runtime scripts
  // Note: 'strict-dynamic' is incompatible with Next.js as it overrides 'unsafe-inline'
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'", // TODO: tighten once critical inline styles are removed
  "img-src 'self' data: blob: https:", // TODO: restrict to allowed image domains (e.g. https://cdn.zinovia.ai)
  "font-src 'self' data:",
  `connect-src ${connectSrc}`, // Allow connections to backend API
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
];

const securityHeaders: Array<{ key: string; value: string }> = [
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "camera=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
];

const nextConfig: HardenedNextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  output: "standalone",
  compiler: {
    removeConsole: isProd ? { exclude: ["error"] } : false,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["framer-motion", "lucide-react", "@radix-ui/react-dialog"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.zinovia.ai", // TODO: update with the production CDN host
      },
      // TODO: add additional trusted image hosts as needed
    ],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // TODO: adjust if remote image hosts require changes
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
