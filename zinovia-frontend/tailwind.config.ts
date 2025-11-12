import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-muted": "rgb(var(--bg-muted) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        elev: "rgb(var(--elev) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
        "brand-contrast": "rgb(var(--brand-contrast) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          primary: "rgb(var(--accent-primary) / <alpha-value>)",
          secondary: "rgb(var(--accent-secondary) / <alpha-value>)",
          warm: "rgb(var(--accent-warm) / <alpha-value>)",
        },
        ring: "rgb(var(--ring) / <alpha-value>)",
        link: "rgb(var(--link) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        surface: {
          primary: "rgb(var(--surface-primary) / <alpha-value>)",
          muted: "rgb(var(--surface-muted) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
          contrast: "rgb(var(--surface-contrast) / <alpha-value>)",
          glass: "rgb(var(--surface-glass) / <alpha-value>)",
          "glass-outline": "var(--surface-glass-outline)",
        },
        typography: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
        outline: {
          soft: "rgb(var(--border-soft) / <alpha-value>)",
          strong: "rgb(var(--border-strong) / <alpha-value>)",
        },
        primary: {
          navy: "rgb(var(--brand) / <alpha-value>)",
          blue: "rgb(var(--accent-primary) / <alpha-value>)",
          dark: "rgb(var(--text) / <alpha-value>)",
        },
        neutral: {
          background: "rgb(var(--bg) / <alpha-value>)",
          "bg-light": "rgb(var(--bg-muted) / <alpha-value>)",
          "text-primary": "rgb(var(--text) / <alpha-value>)",
          "text-secondary": "rgb(var(--text-muted) / <alpha-value>)",
          border: "rgb(var(--border) / <alpha-value>)",
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      spacing: {
        section: "5rem",
        "section-md": "7rem",
        "section-lg": "10rem",
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
      boxShadow: {
        glass: "var(--shadow-glass)",
      },
      backgroundImage: {
        "hero-gradient": "var(--gradient-hero)",
      },
    },
  },
  plugins: [],
};

export default config;

