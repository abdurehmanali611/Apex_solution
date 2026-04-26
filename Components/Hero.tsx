"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroFooterItem } from "@/constants";
import { ArrowRight, Calendar, Sparkles, Brain, Zap } from "lucide-react";

const TYPEWRITER_WORDS = [
  "AI-Powered Software.",
  "Intelligent Networks.",
  "Smart Hotel Tech.",
  "AI Consulting.",
];

function AnimatedCounter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
          }, 1500 / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPEWRITER_WORDS[wordIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 70);
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    else { setDeleting(false); setWordIndex((i) => (i + 1) % TYPEWRITER_WORDS.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIndex]);

  return <span className="text-blue-400 typing-cursor">{displayed}</span>;
}

const AI_PILLS = [
  { icon: Brain, text: "AI-Augmented Development" },
  { icon: Zap,   text: "Intelligent Automation" },
  { icon: Sparkles, text: "AI as a Service" },
];

export default function Hero({ heroFooter }: { heroFooter: HeroFooterItem[] }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.18),transparent)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-600/8 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-cyan-500/6 rounded-full blur-3xl animate-float delay-300 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col items-center text-center gap-8">

        {/* Logo + AI badge */}
        <div className="flex flex-col items-center gap-4 animate-fade-up">
          <Image src="/apex-logo-stacked.svg" alt="Apex Solution" width={120} height={83} className="h-20 w-auto opacity-90" priority />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/25 text-xs font-semibold text-blue-300 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-blue-400" />
            Ethiopia&apos;s AI-First Technology Company
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          </div>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] animate-fade-up delay-100"
          style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.03em" }}
        >
          We Don&apos;t Just Build.
          <br />
          <span className="gradient-text">We Intelligently Engineer.</span>
        </h1>

        {/* Typewriter */}
        <p className="text-lg md:text-xl text-[#A1A1AA] max-w-xl animate-fade-up delay-200">
          World-class <TypewriterText />
        </p>

        {/* AI capability pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-up delay-300">
          {AI_PILLS.map((p, i) => (
            <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] border border-white/8 text-xs text-[#A1A1AA]">
              <p.icon className="w-3 h-3 text-blue-400" />
              {p.text}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-400">
          <Link
            href="/Portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 btn-shimmer glow-blue-sm hover:scale-105 active:scale-95"
          >
            Explore Our Work <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/Contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 hover:border-blue-500/40 text-white font-semibold text-sm transition-all duration-200 hover:bg-white/5"
          >
            <Calendar className="w-4 h-4 text-blue-400" />
            Book a Consultation
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-8 mt-4 border-t border-white/5 w-full max-w-2xl animate-fade-up delay-500">
          {heroFooter.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
                <AnimatedCounter target={item.amount} />
              </span>
              <span className="text-xs uppercase tracking-widest text-[#71717A] font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
    </section>
  );
}
