import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/app/theme/ThemeProvider";
import { ToastProvider } from "@/components/ui";
import { Header, Footer } from "@/components/layout";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { getOrganizationSchema } from "@/lib/structured-data";
import "./globals.css";

// Lazy load FloatingChat - not critical for initial render
const FloatingChat = dynamic(() => import("@/components/layout/FloatingChat"));

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Zinovia - Transform Your Business with Intelligent AI Solutions",
    template: "%s | Zinovia",
  },
  description:
    "We build custom AI agents, chatbots, and automation systems that work 24/7 to streamline your operations and delight your customers.",
  keywords: [
    "AI solutions",
    "artificial intelligence",
    "chatbots",
    "document intelligence",
    "AI agents",
    "automation",
    "business AI",
  ],
  authors: [{ name: "Zinovia" }],
  creator: "Zinovia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zinovia.com",
    siteName: "Zinovia",
    title: "Zinovia - Transform Your Business with Intelligent AI Solutions",
    description:
      "We build custom AI agents, chatbots, and automation systems that work 24/7 to streamline your operations and delight your customers.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zinovia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinovia - Transform Your Business with Intelligent AI Solutions",
    description:
      "We build custom AI agents, chatbots, and automation systems that work 24/7 to streamline your operations and delight your customers.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes here when available
  },
};

const NoFlash = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(){try{var stored=localStorage.getItem('theme');var sys=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var mode=!stored||stored==='system'?sys:stored;var root=document.documentElement;root.dataset.theme=mode;if(mode==='dark'){root.classList.add('dark');}else{root.classList.remove('dark');}}catch(e){}})();`,
    }}
  />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <NoFlash />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased theme-transition bg-bg text-text`}>
        <ThemeProvider>
          <ToastProvider>
            <ScrollProgress />
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingChat />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
