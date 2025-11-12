"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { sendChatMessage } from "@/lib/api";

type ChatRole = "assistant" | "user" | "system";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentState, setCurrentState] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content:
        "👋 Hi! I'm here to help you explore Zinovia's AI solutions. Ask me anything or tell me what brought you here today.",
    },
  ]);

  useEffect(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      setSessionId(crypto.randomUUID());
    } else {
      setSessionId(`session-${Math.random().toString(36).slice(2)}`);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const disableInput = isSending || !sessionId;

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || disableInput) {
      return;
    }

    setError(null);
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsSending(true);

    try {
      const response = await sendChatMessage({
        session_id: sessionId as string,
        message: trimmed,
      });

      setCurrentState(response.state);

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.reply,
        },
      ]);
    } catch (err) {
      const fallbackMessage: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        content:
          "Apologies, I'm having trouble reaching our assistant right now. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, fallbackMessage]);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSend();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  };

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
              className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 p-6 flex flex-col"
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
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`text-sm rounded-lg px-3 py-2 ${
                      message.role === "assistant"
                        ? "bg-neutral-bg-light text-neutral-text-primary"
                        : "bg-primary-navy text-white ml-auto"
                    } max-w-[85%] whitespace-pre-wrap break-words`}
                  >
                    {message.content}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              {currentState && (
                <p className="text-xs text-neutral-text-secondary mb-2">
                  Workflow step: {currentState.replaceAll("_", " ").toLowerCase()}
                </p>
              )}
              {error && (
                <p className="text-xs text-red-500 mb-2">Error: {error}</p>
              )}
              <form onSubmit={handleSubmit} className="space-y-2">
                <textarea
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  rows={2}
                  className="w-full rounded-lg border border-neutral-border-light px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue resize-none"
                  disabled={disableInput}
                />
                <motion.button
                  type="submit"
                  className="w-full bg-primary-navy text-white rounded-lg py-3 px-4 font-medium hover:bg-primary-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: disableInput ? 1 : 1.02 }}
                  whileTap={{ scale: disableInput ? 1 : 0.98 }}
                  disabled={disableInput}
                >
                  {isSending ? "Sending..." : "Send"}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default FloatingChat;


