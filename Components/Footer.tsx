"use client";
import { accessibility, footerLinks, NavbarComponents } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Mail, Linkedin, Send, Github, Music2, Youtube,
  Phone, MapPin, Sparkles, Brain, LucideIcon, ArrowRight,
} from "lucide-react";
import { CreateNewsletterSubscriber } from "@/lib/actions";

const ICON_MAP: Record<string, LucideIcon> = {
  mail: Mail, linkedin: Linkedin, send: Send,
  github: Github, "music-2": Music2, youtube: Youtube,
};

const TICKER_ITEMS = [
  "AI-Powered Software Development",
  "50+ Projects Delivered",
  "Hotel Technology Solutions",
  "Smart Network Infrastructure",
  "10+ Years Experience",
  "CCTV & Surveillance AI",
  "20+ Happy Clients",
  "IT Consulting & Strategy",
  "Building Ethiopia's Digital Future",
];

interface FooterProps { active: string; }

const Footer = ({ active }: FooterProps) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const services = [
    "AI-Powered Software", "Hotel Technology", "Networking & Wi-Fi",
    "IT Consulting", "CCTV Systems", "Mobile Apps",
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const result = await CreateNewsletterSubscriber({ email }, setLoading);
    if (result) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">

      {/* Animated ticker */}
      <div className="border-b border-white/5 bg-[#0D0D0D] overflow-hidden py-2.5">
        <div className="flex animate-marquee whitespace-nowrap" style={{ willChange: "transform" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 text-xs text-[#71717A]">
              <span className="w-1 h-1 rounded-full bg-[#F5A623] shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="group w-fit">
            <Image src="/apex-logo-primary.svg" alt="Apex Solution" width={160} height={40} className="h-10 w-auto transition-opacity duration-200 group-hover:opacity-80" />
          </Link>
          <p className="text-[#71717A] text-sm leading-[1.75]">
            Building Ethiopia&apos;s AI-powered digital future — software, hotel tech, networking, and intelligent IT solutions.
          </p>

          {/* Made with AI badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5A623]/8 border border-[#F5A623]/20 w-fit">
            <Brain className="w-3 h-3 text-[#F5A623]" />
            <span className="text-[10px] font-bold text-[#F5A623] uppercase tracking-widest">Made with AI in Ethiopia 🇪🇹</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2 flex-wrap">
            {footerLinks.map((item) => {
              const Icon = ICON_MAP[item.icon] ?? Mail;
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-white/8 flex items-center justify-center text-[#71717A] hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em]">Navigation</h4>
          <div className="flex flex-col gap-2.5">
            {NavbarComponents.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className={`text-sm leading-[1.75] transition-colors duration-200 ${
                  active === item.name ? "text-[#F5A623]" : "text-[#71717A] hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em]">Services</h4>
          <div className="flex flex-col gap-2.5">
            {services.map((s) => (
              <Link key={s} href="/Services" className="text-sm text-[#71717A] hover:text-white transition-colors duration-200 leading-[1.75]">
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact + Newsletter */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em]">Contact</h4>
            <Link href="tel:+251930272975" className="flex items-center gap-2.5 text-sm text-[#71717A] hover:text-white transition-colors group/c">
              <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover/c:bg-blue-600/20 transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
              </div>
              +251 930 272 975
            </Link>
            <Link href="mailto:contact@apexsolutionhub.com" className="flex items-center gap-2.5 text-sm text-[#71717A] hover:text-white transition-colors group/c break-all">
              <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover/c:bg-blue-600/20 transition-colors">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
              </div>
              contact@apexsolutionhub.com
            </Link>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {accessibility.slice(0, 3).map((loc) => (
                <span key={loc.id} className="text-xs px-2.5 py-1 rounded-lg bg-[#1A1A1A] border border-white/5 text-[#71717A]">
                  {loc.name}
                </span>
              ))}
              <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 font-medium">+5 more</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em]">IT Insights</h4>
            </div>
            <p className="text-xs text-[#71717A] leading-relaxed">Get weekly AI & tech insights from Ethiopia&apos;s leading IT team.</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                You&apos;re subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-white/8 text-xs text-white placeholder:text-[#71717A] focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors shrink-0"
                >
                  {loading ? <span className="w-3.5 h-3.5 border border-white/40 border-t-white rounded-full animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <p className="text-xs text-[#71717A]">
              &copy; {new Date().getFullYear()} Apex Solution PLC. All rights reserved.
            </p>
            <p className="text-xs text-[#71717A] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#F5A623]" />
              Registered in Ethiopia · Addis Ababa.
            </p>
          </div>
          <p className="text-xs text-[#71717A] flex items-center gap-1.5">
            <Brain className="w-3 h-3 text-blue-400" />
            AI-Powered · Built in Ethiopia 🇪🇹
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
