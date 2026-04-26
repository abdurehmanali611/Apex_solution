"use client";
import { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are the Apex Solution AI assistant. Apex is Ethiopia's AI-first technology company offering AI-powered software development, intelligent hotel technology solutions (AI CCTV, smart door locks, AI-enhanced Hotel Management Systems), smart networking infrastructure, and AI strategy consulting. Every solution Apex builds is augmented with artificial intelligence — from predictive analytics to intelligent automation to computer vision. Answer visitor questions about services, AI capabilities, pricing guidance, project process, team, and how to get started. Keep responses concise, professional, and warm. If asked about pricing, say rates depend on project scope and encourage booking a consultation. Always highlight the AI-first approach and offer to connect them with the team.`;

const QUICK_PROMPTS = [
  "What AI services do you offer?",
  "How does AI improve hotel systems?",
  "Tell me about AI consulting",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-dot-bounce"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  );
}

export default function ApexChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Apex AI — your intelligent guide to Ethiopia's most advanced tech company. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, open]);

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      const reply = data.content?.[0]?.text ?? data.message ?? "I couldn't process that. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setError("Connection issue — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Tooltip */}
        {showTooltip && !open && (
          <div className="animate-fade-up px-3 py-2 rounded-xl bg-[#111111] border border-white/8 text-xs text-white whitespace-nowrap shadow-lg">
            Ask about Apex →
          </div>
        )}

        {/* Button + label row */}
        <div className="flex items-center gap-2">
          {/* "Apex AI" label — visible when closed */}
          {!open && (
            <span className="text-xs font-semibold text-[#A1A1AA] bg-[#111111] border border-white/8 px-2.5 py-1 rounded-lg whitespace-nowrap shadow-md">
              Apex AI
            </span>
          )}

          {/* Pulse ring wrapper */}
          <div className="relative">
            {/* Outer pulse ring */}
            {!open && (
              <>
                <span className="absolute inset-0 rounded-full bg-[#F5A623]/20 animate-ping" />
                <span className="absolute inset-[-4px] rounded-full border border-[#F5A623]/30 animate-pulse" />
              </>
            )}
            <button
              onClick={() => { setOpen(!open); setShowTooltip(false); }}
              className="relative w-14 h-14 rounded-full overflow-hidden bg-[#0D1B30] hover:scale-110 active:scale-95 shadow-lg shadow-[#F5A623]/25 transition-all duration-200 flex items-center justify-center"
              aria-label="Open Apex AI Chat"
            >
              {open ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Image src="/apex-icon-amber.svg" alt="Apex AI" width={56} height={56} className="w-14 h-14" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] h-[500px] max-h-[calc(100vh-120px)] flex flex-col rounded-2xl bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/8 shadow-2xl shadow-black/50 animate-slide-in-up overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#111111]/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
                  Apex AI
                </p>
                <p className="text-xs text-[#71717A]">AI-powered · Ask about our services</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[#71717A] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-[#1A1A1A] border border-white/8 text-[#E4E4E7] rounded-bl-sm"
                  }`}
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
              <div className="text-center">
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{error}</p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-white/8 text-xs text-[#A1A1AA] hover:text-white hover:border-blue-500/30 transition-all duration-200"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/5 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/8 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
