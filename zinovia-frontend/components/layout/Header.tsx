"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MessageCircle, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/app/theme/ThemeProvider";
import { navigation } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { resolved, theme, setTheme, toggleTheme } = useTheme();
  
  // Use dark logo in dark mode, light logo in light mode
  const logoSrc = useMemo(() => {
    return resolved === "dark" ? "/logo-dark.svg" : "/logo.svg";
  }, [resolved]);

  const solutionsMenu = [
    { name: "Healthcare", href: "/solutions/healthcare" },
    { name: "Finance", href: "/solutions/finance" },
    { name: "E-commerce", href: "/solutions/ecommerce" },
    { name: "Manufacturing", href: "/solutions/manufacturing" },
    { name: "Legal", href: "/solutions/legal" },
  ];

  const platformMenu = [
    { name: "AI Agents", href: "/platform/agents" },
    { name: "Chatbots", href: "/platform/chatbots" },
    { name: "Document Intelligence", href: "/platform/document-intelligence" },
    { name: "Integrations", href: "/platform/integrations" },
    { name: "Security", href: "/platform/security" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/90 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-card/70 backdrop-blur"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src={logoSrc}
                alt="Zinovia Logo"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
              <span className="text-2xl font-bold text-primary-navy sr-only">
                Zinovia
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const isSolutions = item.name === "Solutions";
              const isPlatform = item.name === "Platform";
              const menuItems = isSolutions ? solutionsMenu : isPlatform ? platformMenu : null;

              if (menuItems) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-sm font-medium transition-colors duration-300 text-text-muted hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1 py-1">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-border bg-card/95 shadow-lg backdrop-blur-md py-2 z-50"
                        >
                          {menuItems.map((menuItem) => (
                            <Link
                              key={menuItem.name}
                              href={menuItem.href}
                              className="block px-4 py-2 text-sm text-text-muted hover:bg-bg-muted/70 hover:text-text transition-colors rounded-lg"
                            >
                              {menuItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-300 px-1 py-1 rounded-md",
                    isActive(item.href)
                      ? "text-text"
                      : "text-text-muted hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand"
                      layoutId="activeIndicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-text shadow-sm transition-colors hover:bg-bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Toggle color theme"
            >
              {resolved === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="hidden lg:inline">{resolved === "dark" ? "Dark" : "Light"}</span>
            </button>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-sm font-medium text-text hover:text-brand transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Chat with Expert
            </Link>
            <Link href="/contact">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-lg p-2 text-text hover:bg-bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-border bg-card/95 backdrop-blur"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-2 py-2 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-bg-muted/70 text-text"
                      : "text-text-muted hover:bg-bg-muted/60 hover:text-text"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-3 rounded-lg bg-bg-muted/60 px-3 py-3">
                <span className="text-sm font-medium text-text">Theme</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      theme === "light"
                        ? "border-brand bg-brand/10 text-text"
                        : "border-border text-text-muted hover:text-text"
                    )}
                  >
                    <Sun className="h-3.5 w-3.5" />
                    Light
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      theme === "dark"
                        ? "border-brand bg-brand/10 text-text"
                        : "border-border text-text-muted hover:text-text"
                    )}
                  >
                    <Moon className="h-3.5 w-3.5" />
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      theme === "system"
                        ? "border-brand bg-brand/10 text-text"
                        : "border-border text-text-muted hover:text-text"
                    )}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    Auto
                  </button>
                </div>
              </div>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full mt-4">
                  Get Started
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

