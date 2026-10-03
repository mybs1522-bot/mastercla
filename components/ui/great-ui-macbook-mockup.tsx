"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  CheckCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  CircleDashed, 
  MessageSquarePlus, 
  Paperclip, 
  Mic, 
  Smile, 
  Play, 
  Lock 
} from "lucide-react";

import ObfuscatedBrand from "./obfuscated-brand";

export interface ChatMessage {
  id: number;
  sender: string;
  avatarInitial?: string;
  text: React.ReactNode;
  isCurrentUser: boolean;
  timestamp: string;
  isAudio?: boolean;
  audioDuration?: string;
  reaction?: string;
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
    text: "Here's an audio overview of how we can set that up for you:",
    isCurrentUser: true,
    timestamp: "10:12 AM",
    isAudio: true,
    audioDuration: "0:32",
  },
];

interface SidebarChatItem {
  id: string;
  name: string;
  initial: string;
  avatarUrl?: string;
  lastMsg: string;
  time: string;
  unreadCount?: number;
  isActive?: boolean;
}

const SIDEBAR_CHATS: SidebarChatItem[] = [
  {
    id: "1",
    name: "Client",
    initial: "C",
    avatarUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=150&auto=format&fit=crop",
    lastMsg: "Mainly for my small business...",
    time: "10:12 AM",
    isActive: true,
  },
  {
    id: "2",
    name: "Sarah Miller",
    initial: "S",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    lastMsg: "Let's review the new flow at 3 PM",
    time: "10:15 AM",
    unreadCount: 3,
  },
  {
    id: "3",
    name: "Automation Support",
    initial: "A",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    lastMsg: "Got the updated template, thanks!",
    time: "9:40 AM",
  },
  {
    id: "4",
    name: "Sales Team",
    initial: "S",
    avatarUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=150&auto=format&fit=crop",
    lastMsg: "Lead converted successfully in 1.2s",
    time: "Yesterday",
  },
];

export interface MacbookMockupProps {
  headerTitle?: string;
  headerSubtitle?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  userAvatarUrl?: string;
  messages?: ChatMessage[];
  autoPlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function MacbookMockup({
  headerTitle = "Client",
  headerSubtitle = "online",
  avatarUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=150&auto=format&fit=crop",
  avatarFallback = "C",
  userAvatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
  messages = DEFAULT_MESSAGES,
  autoPlay = true,
  className,
  children,
}: MacbookMockupProps) {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      setScale(Math.min(width / 770, 1));
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    if (!autoPlay || children) {
      return;
    }

    let isMounted = true;
    let t1: NodeJS.Timeout,
      t2: NodeJS.Timeout,
      t3: NodeJS.Timeout,
      t4: NodeJS.Timeout,
      tReset: NodeJS.Timeout;

    const runSequence = () => {
      if (!isMounted) return;
      setVisibleMessages([]);
      setShowTyping(false);

      t1 = setTimeout(() => {
        if (!isMounted) return;
        setVisibleMessages([messages[0]]);
        setShowTyping(true);
      }, 800);

      t2 = setTimeout(() => {
        if (!isMounted) return;
        setShowTyping(false);
        setVisibleMessages([messages[0], messages[1]]);
        setTimeout(() => {
          if (isMounted) setShowTyping(true);
        }, 650);
      }, 2700);

      t3 = setTimeout(() => {
        if (!isMounted) return;
        setShowTyping(false);
        setVisibleMessages([messages[0], messages[1], messages[2]]);
        setTimeout(() => {
          if (isMounted) setShowTyping(true);
        }, 650);
      }, 5000);

      t4 = setTimeout(() => {
        if (!isMounted) return;
        setShowTyping(false);
        setVisibleMessages(messages);
      }, 7400);

      tReset = setTimeout(() => {
        if (isMounted) {
          setCycleKey((prev) => prev + 1);
        }
      }, 11500);
    };

    runSequence();

    return () => {
      isMounted = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(tReset);
    };
  }, [autoPlay, children, messages, cycleKey]);

  const displayMessages = !autoPlay || children ? messages : visibleMessages;

  return (
    <div
      ref={containerRef}
      style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        height: `${470 * scale}px`
      }}
      className={cn(
        "relative mx-auto flex w-full max-w-[770px] flex-col items-center select-none overflow-visible",
        className,
      )}
    >
      <div 
        className="relative w-[770px] h-[470px] shrink-0 origin-top flex flex-col items-center justify-start pt-4" 
        style={{ 
          transform: `scale(${scale})`
        }}
      >
        <motion.div
          initial={{ rotateX: -70, opacity: 0, scale: 0.92 }}
          animate={{ rotateX: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 20, mass: 0.9 }}
          style={{ transformOrigin: "bottom center" }}
          className="relative z-10 flex h-[430px] w-[720px] transform-gpu flex-col overflow-hidden rounded-t-2xl bg-neutral-900 p-2.5 dark:bg-neutral-950"
        >
          <div className="relative isolate flex h-full w-full transform-gpu overflow-hidden rounded-t-[10px] bg-white text-neutral-900 transition-colors dark:bg-[#111b21] dark:text-neutral-100">
          <div className="flex w-[250px] shrink-0 flex-col bg-[#f0f2f5] transition-colors dark:bg-[#111b21]">
            <div className="flex shrink-0 items-center justify-between bg-[#f0f2f5] px-3 py-2 dark:bg-[#202c33]">
              <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-emerald-600 text-xs font-bold text-white dark:bg-emerald-700">
                {userAvatarUrl ? (
                  <img
                    src={userAvatarUrl}
                    alt="You"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>Y</span>
                )}
              </div>
              <div className="flex items-center gap-2.5 text-neutral-600 dark:text-neutral-400">
                <button
                  type="button"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <CircleDashed className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-2">
              <div className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1 text-xs text-neutral-400 dark:bg-[#202c33]">
                <Search className="h-3.5 w-3.5 shrink-0 text-neutral-500 dark:text-neutral-400" />
                <span className="truncate text-[10.5px]">Search chat...</span>
                <Filter className="ml-auto h-3 w-3 shrink-0 text-neutral-400" />
              </div>
            </div>

            <div className="flex-1 [scrollbar-width:none] overflow-y-auto [&::-webkit-scrollbar]:hidden">
              {SIDEBAR_CHATS.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "relative flex cursor-pointer items-center gap-2.5 px-3 py-2.5 transition-colors",
                    chat.isActive
                      ? "bg-neutral-200/70 dark:bg-[#2a3942]"
                      : "hover:bg-neutral-200/40 dark:hover:bg-[#202c33]/60",
                  )}
                >
                  {chat.isActive && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#00a884]" />
                  )}

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-700 text-xs font-bold text-white sm:h-8 sm:w-8 dark:bg-emerald-900">
                    {chat.avatarUrl ? (
                      <img
                        src={chat.avatarUrl}
                        alt={chat.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{chat.initial}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-[11px] font-semibold text-neutral-900 dark:text-neutral-100">
                        {chat.name}
                      </span>
                      <span className="shrink-0 text-[9px] text-neutral-400 dark:text-neutral-400">
                        {chat.time}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[10px] text-neutral-500 dark:text-neutral-400">
                      {chat.lastMsg}
                    </p>
                  </div>

                  {chat.unreadCount && (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-[9px] font-bold text-white">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-w-0 flex-1 flex-col bg-[#efeae2] transition-colors dark:bg-[#0b141a]">
            <div className="z-10 flex shrink-0 items-center justify-between bg-[#f0f2f5] px-3.5 py-2 dark:bg-[#202c33]">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-700 text-xs font-bold text-white dark:bg-emerald-900">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={headerTitle}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span>{avatarFallback}</span>
                  )}
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-xs leading-tight font-semibold text-neutral-900 dark:text-neutral-100">
                    {headerTitle}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    {headerSubtitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                <button
                  type="button"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-end space-y-2.5 overflow-hidden p-3.5">
              {children ? (
                <div className="h-full w-full [scrollbar-width:none] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  {children}
                </div>
              ) : (
                <>
                  <div className="mx-auto my-1 flex max-w-[90%] items-center justify-center gap-1 rounded-md bg-[#ffeebd] px-3 py-1 text-center text-[9.5px] text-amber-900 dark:bg-[#182229] dark:text-amber-200/80">
                    <Lock className="h-2.5 w-2.5 shrink-0 text-amber-700 dark:text-amber-400" />
                    <span>Messages and calls are end-to-end encrypted.</span>
                  </div>

                  <div className="mx-auto my-0.5 rounded-md bg-white/80 px-2.5 py-0.5 text-[9px] font-semibold tracking-wider text-neutral-500 uppercase dark:bg-[#182229]/90 dark:text-neutral-400">
                    TODAY
                  </div>

                  <div className="flex flex-1 [scrollbar-width:none] flex-col justify-end space-y-2.5 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <AnimatePresence mode="sync">
                      {displayMessages.map((msg) => (
                        <motion.div
                          key={`${cycleKey}-${msg.id}`}
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
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
                              "relative max-w-[75%] rounded-lg px-3 py-1.5 text-xs transition-colors",
                              msg.isCurrentUser
                                ? "rounded-tr-none bg-[#dcf8c6] text-neutral-900 dark:bg-[#005c4b] dark:text-neutral-100"
                                : "rounded-tl-none bg-white text-neutral-900 dark:bg-[#202c33] dark:text-neutral-100",
                            )}
                          >
                            {!msg.isCurrentUser && (
                              <p className="mb-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                                {msg.sender}
                              </p>
                            )}

                            {msg.isAudio ? (
                              <div className="flex min-w-[180px] items-center gap-3 py-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setIsPlayingAudio(!isPlayingAudio)
                                  }
                                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition-colors hover:bg-emerald-700"
                                >
                                  <Play className="ml-0.5 h-3 w-3 fill-current" />
                                </button>
                                <div className="flex flex-1 flex-col gap-1">
                                  <div className="flex h-3 items-center gap-0.5">
                                    {[
                                      40, 75, 30, 90, 60, 100, 45, 80, 50, 70,
                                      35, 90, 65, 40, 85, 55,
                                    ].map((h, idx) => (
                                      <span
                                        key={idx}
                                        className="w-1 rounded-full bg-emerald-600/80 dark:bg-emerald-400/80"
                                        style={{ height: `${h}%` }}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[9px] text-neutral-500 dark:text-neutral-400">
                                    Audio note • {msg.audioDuration}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <p className="xs:text-xs text-[11.5px] leading-snug">
                                {msg.text}
                              </p>
                            )}

                            <div className="mt-0.5 flex items-center justify-end gap-1">
                              <span
                                className={cn(
                                  "text-[9px]",
                                  msg.isCurrentUser
                                    ? "text-emerald-800/70 dark:text-emerald-200/60"
                                    : "text-neutral-400 dark:text-neutral-400",
                                )}
                              >
                                {msg.timestamp}
                              </span>
                              {msg.isCurrentUser && (
                                <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
                              )}
                            </div>

                            {msg.reaction && (
                              <div className="py-0.2 absolute right-2 -bottom-2 rounded-full bg-white px-1.5 text-[9px] dark:bg-[#182229]">
                                {msg.reaction}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}

                      {showTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-start"
                        >
                          <div className="flex items-center gap-1.5 rounded-lg rounded-tl-none bg-white px-3 py-2 dark:bg-[#202c33]">
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

            <div className="z-10 flex shrink-0 items-center gap-2 bg-[#f0f2f5] p-2.5 dark:bg-[#111b21]">
              <button
                type="button"
                className="p-1 text-neutral-600 transition-colors hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
              >
                <Smile className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1 text-neutral-600 transition-colors hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <div className="flex-1 rounded-lg bg-white px-3 py-1.5 text-xs text-neutral-400 dark:bg-[#2a3942] dark:text-neutral-400">
                Type a message
              </div>
              <button
                type="button"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white transition-colors hover:bg-emerald-600"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-20 flex h-4 w-[770px] items-start justify-center rounded-b-xl bg-neutral-300 dark:bg-neutral-800">
        <div className="h-1.5 w-20 rounded-b-md bg-neutral-400/90 dark:bg-neutral-700/90" />
      </div>
      </div>
    </div>
  );
}

export default MacbookMockup;
