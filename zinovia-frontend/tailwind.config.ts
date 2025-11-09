import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Scale.ai inspired colors - dark navy, clean whites, subtle grays
        primary: {
          navy: "#0A0E27", // Very dark navy/black for headers
          blue: "#2563EB", // Professional blue accent
          dark: "#1E293B", // Dark sections
        },
        neutral: {
          background: "#FFFFFF",
          "bg-light": "#F8FAFC",
          "text-primary": "#0F172A", // Dark slate
          "text-secondary": "#64748B", // Medium gray
          border: "#E2E8F0",
        },
        accent: {
          blue: "#3B82F6",
          "blue-light": "#60A5FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      spacing: {
        section: "5rem", // py-20
        "section-md": "7rem", // py-28
        "section-lg": "10rem", // py-40
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

