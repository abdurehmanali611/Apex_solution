"use client";
import { accessibility, footerLinks, NavbarComponents } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import {
  Mail, Linkedin, Send, Github, Music2, Youtube,
  Phone, MapPin, Sparkles, LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  mail: Mail, linkedin: Linkedin, send: Send,
  github: Github, "music-2": Music2, youtube: Youtube,
};

interface FooterProps { active: string; }

const Footer = ({ active }: FooterProps) => {
  const services = [
    "AI-Powered Software", "Hotel Technology", "Networking & Wi-Fi",
    "IT Consulting", "CCTV Systems", "Mobile Apps",
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      {/* AI tagline bar */}
      <div className="border-b border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <p className="text-xs text-[#71717A] text-center">
            Every solution we build is{" "}
            <span className="text-blue-400 font-semibold">AI-augmented</span>
            {" "}— smarter systems, faster delivery, better outcomes.
          </p>
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          <Link href="/" className="group w-fit">
            <Image
              src="/apex-logo-dark-bg.svg"
              alt="Apex Solution"
              width={160}
              height={40}
              className="h-10 w-auto transition-opacity duration-200 group-hover:opacity-80"
            />
          </Link>
          <p className="text-[#71717A] text-sm leading-relaxed">
            Building Ethiopia&apos;s AI-powered digital future — software, hotel tech, networking, and intelligent IT solutions.
          </p>

          {/* Social icons — Lucide, premium pill style */}
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
                  className="group/icon w-9 h-9 rounded-xl bg-[#1A1A1A] border border-white/8 flex items-center justify-center text-[#71717A] hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
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
                className={`text-sm transition-colors duration-200 ${
                  active === item.name ? "text-blue-400" : "text-[#71717A] hover:text-white"
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
              <Link key={s} href="/Services" className="text-sm text-[#71717A] hover:text-white transition-colors duration-200">
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em]">Contact</h4>
          <div className="flex flex-col gap-3">
            <Link href="tel:+251930272975" className="flex items-center gap-2.5 text-sm text-[#71717A] hover:text-white transition-colors group/c">
              <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover/c:bg-blue-600/20 transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
              </div>
              +251 930 272 975
            </Link>
            <Link href="tel:+251935000642" className="flex items-center gap-2.5 text-sm text-[#71717A] hover:text-white transition-colors group/c">
              <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover/c:bg-blue-600/20 transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
              </div>
              +251 935 000 642
            </Link>
            <Link href="mailto:apexsolution@gmail.com" className="flex items-center gap-2.5 text-sm text-[#71717A] hover:text-white transition-colors group/c">
              <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover/c:bg-blue-600/20 transition-colors">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
              </div>
              apexsolution@gmail.com
            </Link>
          </div>
          <div className="mt-1">
            <h5 className="text-xs font-bold text-[#71717A] uppercase tracking-[0.15em] mb-2.5 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-blue-400" /> Locations
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {accessibility.slice(0, 4).map((loc) => (
                <span key={loc.id} className="text-xs px-2.5 py-1 rounded-lg bg-[#1A1A1A] border border-white/5 text-[#71717A]">
                  {loc.name}
                </span>
              ))}
              <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 font-medium">
                +4 more
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#71717A]">
            &copy; {new Date().getFullYear()} Apex Solution. All rights reserved.
          </p>
          <p className="text-xs text-[#71717A] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-400" />
            AI-Powered · Built in Ethiopia 🇪🇹
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
