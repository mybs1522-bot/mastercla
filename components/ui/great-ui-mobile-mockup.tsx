"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  CheckCheck, 
  Phone, 
  Video, 
  ArrowLeft, 
  MoreVertical, 
  Paperclip, 
  Camera, 
  Mic, 
  Smile 
} from "lucide-react";

import ObfuscatedBrand from "./obfuscated-brand";

export interface ChatMessage {
  id: number;
  sender: string;
  avatarInitial?: string;
  text?: React.ReactNode;
  isCurrentUser: boolean;
  timestamp: string;
  isImage?: boolean;
  imageUrl?: string;
  imageCaption?: string;
}

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: "Client",
    avatarInitial: "C",
    text: <>Hi! I'm interested in <ObfuscatedBrand /> automation.</>,
    isCurrentUser: false,
    timestamp: "10:11 AM",
  },
  {
    id: 2,
    sender: "You",
    avatarInitial: "Y",
    text: "Hello! Welcome. Are you looking to automate personal replies or a business account?",
    isCurrentUser: true,
    timestamp: "10:11 AM",
  },
  {
    id: 3,
    sender: "Client",
    avatarInitial: "C",
    text: "Mainly for my small business, to answer general questions automatically.",
    isCurrentUser: false,
    timestamp: "10:12 AM",
  },
  {
    id: 4,
    sender: "You",
    avatarInitial: "Y",
    text: "Perfect! We can set up a general business reply. Here is an example of an automated response setup.",
    isCurrentUser: true,
    timestamp: "10:12 AM",
  },
  {
    id: 5,
    sender: "You",
    avatarInitial: "Y",
    isImage: true,
    imageUrl:
      "/automation_dashboard.jpg",
    imageCaption: "A screenshot of our automation dashboard.",
    isCurrentUser: true,
    timestamp: "10:12 AM",
  },
  {
    id: 6,
    sender: "Client",
    avatarInitial: "C",
    text: "Wow, that looks exactly like what I need! Can it also send images automatically?",
    isCurrentUser: false,
    timestamp: "10:13 AM",
  },
  {
    id: 7,
    sender: "You",
    avatarInitial: "Y",
    text: "Yes, you can easily share images, PDFs, and links in the chat automatically! 😊",
    isCurrentUser: true,
    timestamp: "10:13 AM",
  }
];

export interface MobileMockupProps {
  headerTitle?: string;
  headerSubtitle?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  messages?: ChatMessage[];
  autoPlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function MobileMockup({
  headerTitle = "Client",
  headerSubtitle = "online",
  avatarUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=150&auto=format&fit=crop",
  avatarFallback = "C",
  messages = DEFAULT_MESSAGES,
  autoPlay = true,
  className,
  children,
}: MobileMockupProps) {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (!autoPlay || children) {
      return;
    }

    let isMounted = true;
    let timeouts: NodeJS.Timeout[] = [];

    const runSequence = () => {
      if (!isMounted) return;
      setVisibleMessages([]);
      setShowTyping(false);

      timeouts.push(setTimeout(() => {
        if (!isMounted) return;
        setVisibleMessages([messages[0]]);
        setShowTyping(true);
      }, 800));

      timeouts.push(setTimeout(() => {
        if (!isMounted) return;
        setShowTyping(false);
        setVisibleMessages([messages[0], messages[1]]);
      }, 2500));
      
      timeouts.push(setTimeout(() => {
        if (!isMounted) return;
        setVisibleMessages([messages[0], messages[1], messages[2]]);
        setTimeout(() => { if (isMounted) setShowTyping(true); }, 600);
      }, 4500));

      timeouts.push(setTimeout(() => {
        if (!isMounted) return;
        setShowTyping(false);
        setVisibleMessages([messages[0], messages[1], messages[2], messages[3], messages[4]]);
      }, 6800));
      
      timeouts.push(setTimeout(() => {
        if (!isMounted) return;
        setVisibleMessages([messages[0], messages[1], messages[2], messages[3], messages[4], messages[5]]);
        setTimeout(() => { if (isMounted) setShowTyping(true); }, 600);
      }, 8800));
      
      timeouts.push(setTimeout(() => {
        if (!isMounted) return;
        setShowTyping(false);
        setVisibleMessages(messages);
      }, 10800));

      timeouts.push(setTimeout(() => {
        if (isMounted) {
          setCycleKey((prev) => prev + 1);
        }
      }, 15000));
    };

    runSequence();

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
    };
  }, [autoPlay, children, messages, cycleKey]);

  const displayMessages = !autoPlay || children ? messages : visibleMessages;

  return (
    <div
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      className={cn(
        "xs:max-w-[265px] relative mx-auto flex w-full max-w-[245px] items-center justify-center py-2 select-none sm:max-w-[285px]",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.94, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        whileHover={{ y: -6, rotate: 0.5, transition: { duration: 0.25 } }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="xs:h-[530px] relative flex h-[490px] w-full transform-gpu flex-col overflow-hidden rounded-[40px] bg-neutral-900 p-2.5 transition-colors sm:h-[560px] dark:bg-neutral-950"
      >
        <div className="absolute top-24 -left-[5px] h-8 w-[2.5px] rounded-l-xs bg-neutral-700 dark:bg-neutral-800" />
        <div className="absolute top-36 -left-[5px] h-10 w-[2.5px] rounded-l-xs bg-neutral-700 dark:bg-neutral-800" />
        <div className="absolute top-48 -left-[5px] h-10 w-[2.5px] rounded-l-xs bg-neutral-700 dark:bg-neutral-800" />
        <div className="absolute top-32 -right-[5px] h-14 w-[2.5px] rounded-r-xs bg-neutral-700 dark:bg-neutral-800" />

        <div className="relative isolate flex h-full w-full transform-gpu flex-col overflow-hidden rounded-[30px] bg-[#efeae2] text-neutral-900 dark:bg-[#0b141a] dark:text-neutral-100">
          <div className="z-30 flex shrink-0 items-center justify-between bg-[#008069] px-4 pt-2 pb-1 text-[11px] font-semibold text-white transition-colors dark:bg-[#111b21]">
            <span className="w-10 text-left font-bold tracking-tight">
              10:13
            </span>

            <div className="flex items-center justify-end gap-1.5 text-white">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="16" width="3.5" height="5" rx="0.5" />
                <rect x="7.5" y="12" width="3.5" height="9" rx="0.5" />
                <rect x="13" y="8" width="3.5" height="13" rx="0.5" />
                <rect x="18.5" y="4" width="3.5" height="17" rx="0.5" />
              </svg>
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                />
              </svg>
              <svg
                className="h-2.5 w-4"
                fill="none"
                viewBox="0 0 24 14"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="1" y="1" width="18" height="12" rx="3" />
                <rect
                  x="3"
                  y="3"
                  width="11"
                  height="8"
                  rx="1.5"
                  fill="currentColor"
                />
                <path d="M21 4v6" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="z-20 flex shrink-0 items-center justify-between bg-[#008069] px-3 py-1.5 text-white transition-colors dark:bg-[#111b21]">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="text-white/90 transition-colors hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-700 text-[11px] font-bold text-white dark:bg-emerald-900">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={headerTitle}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{avatarFallback}</span>
                )}
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="xs:max-w-[120px] max-w-[100px] truncate text-[11.5px] leading-tight font-semibold text-white">
                  {headerTitle}
                </span>
                <span className="mt-0.5 text-[9.5px] leading-none font-medium text-emerald-200 dark:text-emerald-400">
                  {headerSubtitle}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-white/90">
              <button
                type="button"
                className="transition-colors hover:text-white"
              >
                <Video className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="transition-colors hover:text-white"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="transition-colors hover:text-white"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col justify-end overflow-hidden bg-[#efeae2] p-2.5 transition-colors dark:bg-[#0b141a]">
            {children ? (
              <div className="relative z-10 h-full w-full [scrollbar-width:none] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                {children}
              </div>
            ) : (
              <>
                <div className="relative z-10 mx-auto mb-1.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[9px] font-medium text-neutral-600 dark:bg-[#182229]/90 dark:text-neutral-400">
                  Today
                </div>

                <div className="relative z-10 flex flex-1 [scrollbar-width:none] flex-col justify-end space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  <AnimatePresence mode="sync">
                    {displayMessages.map((msg) => (
                      <motion.div
                        key={`${cycleKey}-${msg.id}`}
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                        className={`flex flex-col ${msg.isCurrentUser ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={cn(
                            "relative flex max-w-[85%] flex-col rounded-xl px-2.5 py-1 text-[11px] transition-colors",
                            msg.isCurrentUser
                              ? "rounded-tr-none bg-[#dcf8c6] text-neutral-900 dark:bg-[#005c4b] dark:text-neutral-100"
                              : "rounded-tl-none bg-white text-neutral-900 dark:bg-[#202c33] dark:text-neutral-100",
                          )}
                        >
                          {msg.isImage ? (
                            <div className="flex min-w-[150px] flex-col gap-1">
                              <div className="relative max-h-[100px] overflow-hidden rounded-lg">
                                <img
                                  src={msg.imageUrl}
                                  alt="Attached media"
                                  className="h-22 w-full object-cover"
                                />
                              </div>
                              {msg.imageCaption && (
                                <p className="mt-0.5 px-0.5 text-[10.5px] leading-tight">
                                  {msg.imageCaption}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-[11px] leading-tight">
                              {msg.text}
                            </p>
                          )}

                          <div className="mt-0.5 flex items-center justify-end gap-1 self-end">
                            <span
                              className={cn(
                                "text-[8.5px]",
                                msg.isCurrentUser
                                  ? "text-emerald-800/70 dark:text-emerald-200/60"
                                  : "text-neutral-400 dark:text-neutral-400",
                              )}
                            >
                              {msg.timestamp}
                            </span>
                            {msg.isCurrentUser && (
                              <CheckCheck className="h-3 w-3 text-[#34b7f1]" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {showTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-start"
                      >
                        <div className="flex items-center gap-1.5 rounded-xl rounded-tl-none bg-white px-3 py-2 dark:bg-[#202c33]">
                          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                            typing
                          </span>
                          <div className="flex items-center gap-1">
                            {[0, 1, 2].map((dotIndex) => (
                              <motion.span
                                key={dotIndex}
                                className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                                animate={{
                                  y: [0, -3, 0],
                                  opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: dotIndex * 0.15,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>

          <div className="z-20 flex shrink-0 items-center gap-1.5 bg-[#f0f2f5] p-2 transition-colors dark:bg-[#111b21]">
            <button
              type="button"
              className="p-1 text-neutral-600 transition-colors hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
            >
              <Smile className="w-5 h-5" />
            </button>
            <div className="flex flex-1 items-center justify-between rounded-full bg-white px-3 py-1.5 text-xs text-neutral-400 dark:bg-[#2a3942] dark:text-neutral-400">
              <span className="truncate">Message</span>
              <div className="flex items-center gap-2 text-neutral-400">
                <button
                  type="button"
                  className="hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white transition-colors hover:bg-emerald-600"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <div className="flex shrink-0 justify-center bg-[#f0f2f5] pt-0.5 pb-1.5 dark:bg-[#111b21]">
            <div className="h-1 w-24 rounded-full bg-neutral-400 dark:bg-neutral-700/80" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MobileMockup;
