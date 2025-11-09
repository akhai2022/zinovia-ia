"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { navigation } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

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
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-border"
          : "bg-white"
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
                src="/logo.svg"
                alt="Zinovia Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
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
                    <button className="flex items-center gap-1 text-sm font-medium transition-colors duration-300 text-neutral-text-secondary hover:text-primary-navy">
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
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-border py-2 z-50"
                        >
                          {menuItems.map((menuItem) => (
                            <Link
                              key={menuItem.name}
                              href={menuItem.href}
                              className="block px-4 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-bg-light hover:text-primary-navy transition-colors"
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
                    "relative text-sm font-medium transition-colors duration-300",
                    isActive(item.href)
                      ? "text-primary-navy"
                      : "text-neutral-text-secondary hover:text-primary-navy"
                  )}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-navy"
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
            <Link href="/contact" className="flex items-center gap-2 text-sm font-medium text-primary-navy hover:text-primary-blue transition-colors">
              <MessageCircle className="h-4 w-4" />
              Chat with Expert
            </Link>
            <Link href="/contact">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
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
            className="md:hidden bg-white border-t border-neutral-border"
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
                    "block py-2 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "text-primary-navy"
                      : "text-neutral-text-secondary hover:text-primary-navy"
                  )}
                >
                  {item.name}
                </Link>
              ))}
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

