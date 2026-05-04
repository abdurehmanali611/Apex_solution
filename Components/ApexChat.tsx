"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Bot, Minus } from "lucide-react";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "What AI services do you offer?",
  "How does AI improve hotel systems?",
  "Tell me about AI consulting",
];

const FOLLOW_UPS: Record<string, string[]> = {
  default: ["How do I get started?", "What's your pricing?", "View portfolio"],
  services: ["Tell me about hotel tech", "What about networking?", "AI consulting details"],
  hotel: ["How does AI improve HMS?", "What about CCTV AI?", "Smart door locks?"],
  pricing: ["Book a consultation", "What's included?", "How long does it take?"],
};

function getFollowUps(content: string): string[] {
  const lower = content.toLowerCase();
  if (lower.includes("hotel") || lower.includes("hms")) return FOLLOW_UPS.hotel;
  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate")) return FOLLOW_UPS.pricing;
  if (lower.includes("service") || lower.includes("offer")) return FOLLOW_UPS.services;
  return FOLLOW_UPS.default;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-dot-bounce" style={{ animationDelay: `${i * 0.16}s` }} />
      ))}
    </div>
  );
}

const SESSION_KEY = "apex_chat_messages";

export default function ApexChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [{ role: "assistant", content: "Hi! I'm Apex AI — your intelligent guide to Ethiopia's most advanced tech company. How can I help you today?" }];
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : [{ role: "assistant", content: "Hi! I'm Apex AI — your intelligent guide to Ethiopia's most advanced tech company. How can I help you today?" }];
    } catch { return [{ role: "assistant", content: "Hi! I'm Apex AI — your intelligent guide to Ethiopia's most advanced tech company. How can I help you today?" }]; }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const [cooldown, setCooldown] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persist to sessionStorage
  useEffect(() => {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages.slice(-10))); } catch {}
  }, [messages]);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
      setUnread(0);
    }
  }, [messages, open, minimized]);

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const send = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading || cooldown) return;

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);
    setCooldown(true);
    setTimeout(() => setCooldown(false), 1000);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      const reply = data.message ?? "I couldn't process that. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if (!open || minimized) setUnread((n) => n + 1);
    } catch {
      setError("Connection issue — please try again.");
    } finally {
      setLoading(false);
    }
  }, [input, loading, cooldown, messages, open, minimized]);

  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
  const followUps = lastAssistantMsg ? getFollowUps(lastAssistantMsg.content) : FOLLOW_UPS.default;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* Floating trigger */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {showTooltip && !open && (
          <div className="animate-fade-up px-3 py-2 rounded-xl bg-[#111111] border border-white/8 text-xs text-white whitespace-nowrap shadow-lg">
            Ask Apex AI →
          </div>
        )}
        <div className="flex items-center gap-2">
          {!open && (
            <span className="text-xs font-semibold text-[#A1A1AA] bg-[#111111] border border-white/8 px-2.5 py-1 rounded-lg whitespace-nowrap shadow-md">
              Apex AI
            </span>
          )}
          <div className="relative">
            {!open && (
              <>
                <span className="absolute inset-0 rounded-full bg-[#F5A623]/20 animate-ping" />
                <span className="absolute inset-[-4px] rounded-full border border-[#F5A623]/30 animate-pulse" />
              </>
            )}
            {/* Unread badge */}
            {!open && unread > 0 && (
              <span className="absolute -top-1 -right-1 z-10 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
            <button
              onClick={() => { setOpen(!open); setMinimized(false); setShowTooltip(false); setUnread(0); }}
              className="relative w-14 h-14 rounded-full overflow-hidden bg-[#0D1B30] hover:scale-110 active:scale-95 shadow-lg shadow-[#F5A623]/25 transition-all duration-200 flex items-center justify-center"
              aria-label="Open Apex AI Chat"
            >
              {open ? <X className="w-5 h-5 text-white" /> : <Image src="/apex-icon-amber.svg" alt="Apex AI" width={56} height={56} className="w-14 h-14" />}
            </button>
          </div>
        </div>
      </div>

      {/* Chat panel */}
      {open && (
        <div className={`fixed z-50 flex flex-col bg-[#0A0A0A]/97 backdrop-blur-xl border border-white/8 shadow-2xl shadow-black/50 animate-slide-in-up overflow-hidden transition-all duration-300 ${
          isMobile
            ? "inset-0 rounded-none"
            : minimized
            ? "bottom-24 right-6 w-[360px] h-14 rounded-2xl"
            : "bottom-24 right-6 w-[380px] h-[520px] rounded-2xl"
        }`}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-[#111111]/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#F5A623]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>Apex AI</p>
                {!minimized && <p className="text-[10px] text-[#71717A]">AI-powered · Ask about our services</p>}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {!isMobile && (
                <button
                  onClick={() => setMinimized(!minimized)}
                  className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[#71717A] hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Minimize"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[#71717A] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-[1.75] ${
                      msg.role === "user"
                        ? "text-[#0A0A0A] font-medium rounded-br-sm"
                        : "bg-[#1A1A1A] border border-white/8 text-[#D4D4D8] rounded-bl-sm"
                    }`}
                    style={msg.role === "user" ? { background: "linear-gradient(135deg, #F5A623 0%, #E8940F 100%)" } : {}}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-[#1A1A1A] border border-white/8 rounded-2xl rounded-bl-sm">
                      <TypingDots />
                    </div>
                  </div>
                )}
                {error && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 text-center">{error}</p>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick prompts (first load) or follow-ups */}
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {(messages.length <= 1 ? QUICK_PROMPTS : followUps).map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    disabled={loading || cooldown}
                    className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-white/8 text-xs text-[#A1A1AA] hover:text-white hover:border-[#F5A623]/30 disabled:opacity-40 transition-all duration-200"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-white/5 flex items-center gap-2 shrink-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/8 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#F5A623]/40 transition-colors"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading || cooldown}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#0A0A0A] transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #F5A623 0%, #E8940F 100%)" }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
