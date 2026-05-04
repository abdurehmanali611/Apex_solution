"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroFooterItem } from "@/constants";
import { ArrowRight, Calendar, Sparkles, Brain, Zap, FileDown } from "lucide-react";
import CompanyProfileCard from "./CompanyProfileCard";

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
  { icon: Brain,    text: "AI-Augmented" },
  { icon: Zap,      text: "Intelligent Automation" },
  { icon: Sparkles, text: "AI as a Service" },
];

export default function Hero({ heroFooter }: { heroFooter: HeroFooterItem[] }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_0%_50%,rgba(37,99,235,0.10),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_50%,rgba(245,166,35,0.05),transparent)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ── Left column — text ─────────────────────────── */}
          <div className="flex flex-col gap-5 sm:gap-7 order-2 lg:order-1">

            {/* Badge */}
            <div className="flex items-center gap-3 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/25 text-xs font-semibold text-blue-300 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-blue-400" />
                Ethiopia&apos;s AI-First Technology Company
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              </div>
            </div>

            {/* Headline */}
            <div className="animate-fade-up delay-100">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05]"
                style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.03em" }}
              >
                We Don&apos;t Just Build.
                <br />
                <span className="gradient-text">We Intelligently</span>
                <br />
                <span className="gradient-text">Engineer.</span>
              </h1>
            </div>

            {/* Typewriter */}
            <p className="text-base md:text-lg text-[#A1A1AA] animate-fade-up delay-200">
              World-class <TypewriterText />
            </p>

            {/* AI pills */}
            <div className="flex flex-wrap gap-2 animate-fade-up delay-300">
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
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 btn-shimmer glow-blue-sm hover:scale-105 active:scale-95"
              >
                Explore Our Work <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/Contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 hover:border-blue-500/40 text-white font-semibold text-sm transition-all duration-200 hover:bg-white/5"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                Book a Consultation
              </Link>
            </div>

            {/* Company profile download */}
            <a
              href="/apex-company-profile.pdf"
              download
              className="group flex items-center gap-2 text-sm text-[#71717A] hover:text-[#F5A623] transition-colors w-fit animate-fade-up delay-400"
            >
              <span className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-white/8 flex items-center justify-center group-hover:border-[#F5A623]/50 transition-colors">
                <FileDown className="w-4 h-4" />
              </span>
              Download Company Profile
              <span className="text-xs text-[#3F3F46]">PDF · 17KB</span>
            </a>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8 pt-6 border-t border-white/5 animate-fade-up delay-500">
              {heroFooter.map((item) => (
                <div key={item.id} className="flex flex-col gap-0.5">
                  <span
                    className="text-2xl md:text-3xl font-bold text-white"
                    style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
                  >
                    <AnimatedCounter target={item.amount} />
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#71717A] font-medium">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — SVG poster ──────────────────── */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center animate-fade-up delay-200">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(245,166,35,0.08),transparent)] pointer-events-none" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.06),transparent)] pointer-events-none" />

            {/* Poster container */}
            <div className="relative w-full max-w-[520px] lg:max-w-full animate-float">
              {/* Subtle glow behind the SVG */}
              <div className="absolute inset-4 rounded-2xl bg-[#F5A623]/5 blur-3xl pointer-events-none" />
              <div className="absolute inset-8 rounded-2xl bg-blue-600/5 blur-2xl pointer-events-none" />

              <Image
                src="/apex-hero-poster.svg"
                alt="Apex Solution — AI-powered circuit topology connecting Software, Hotel Tech, Networking, CCTV, Consulting and AI Systems"
                width={680}
                height={680}
                priority
                className="relative w-full h-auto drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 0 40px rgba(245,166,35,0.12)) drop-shadow(0 0 80px rgba(37,99,235,0.08))" }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
    </section>
  );
}
