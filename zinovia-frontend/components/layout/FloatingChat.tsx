"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Bubble */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <AnimatePresence>
          {!isOpen ? (
            <motion.button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-primary-navy rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary-blue transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open chat"
            >
              <MessageCircle className="h-6 w-6" />
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl w-80 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-primary-navy">Chat with Expert</h3>
                  <p className="text-xs text-neutral-text-secondary">
                    We're here to help
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-text-secondary hover:text-primary-navy"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3 mb-4">
                <div className="bg-neutral-bg-light rounded-lg p-3 text-sm">
                  <p className="text-neutral-text-primary mb-2">
                    👋 Hi! I'm here to help you find the perfect AI solution for your business.
                  </p>
                  <p className="text-neutral-text-secondary text-xs">
                    Available now • Usually replies in seconds
                  </p>
                </div>
              </div>
              <Link href="/contact">
                <motion.button
                  className="w-full bg-primary-navy text-white rounded-lg py-3 px-4 font-medium hover:bg-primary-blue transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Conversation
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default FloatingChat;


