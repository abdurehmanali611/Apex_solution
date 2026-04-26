"use client";
import { NavbarComponents } from "@/constants";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NavbarProps { active: string; }

const Navbar = ({ active }: NavbarProps) => {
  const [menuShow, setMenuShow] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrolled = scrollY > 40;
  const navLinks = NavbarComponents.filter((i) => i.name !== "Contact Us");

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? `rgba(10,10,10,${Math.min(0.97, 0.6 + scrollY / 400)})`
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image
              src="/apex-logo-dark-bg.svg"
              alt="Apex Solution"
              width={160}
              height={40}
              className="h-9 w-auto transition-opacity duration-200 group-hover:opacity-90"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02] group"
              >
                <span className={`transition-colors duration-200 ${
                  active === item.name
                    ? "text-white"
                    : "text-[#A1A1AA] group-hover:text-white"
                }`}>
                  {item.name}
                </span>
                {/* Amber dot indicator */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F5A623] transition-all duration-300 ${
                  active === item.name ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`} />
              </Link>
            ))}

            {/* Get a Quote pill */}
            <Link
              href="/Contact"
              className="ml-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-[#0A0A0A] transition-all duration-200 hover:scale-105 active:scale-95 btn-shimmer"
              style={{ background: "linear-gradient(135deg, #F5A623 0%, #E8940F 100%)" }}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMenuShow(!menuShow)}
            aria-label="Toggle menu"
          >
            {menuShow ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuShow && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuShow(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-[#0D0D0D] border-l border-white/8 p-6 flex flex-col gap-2 animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <Image src="/apex-logo-dark-bg.svg" alt="Apex Solution" width={130} height={32} className="h-8 w-auto" />
              <button onClick={() => setMenuShow(false)} className="p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            {NavbarComponents.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                onClick={() => setMenuShow(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                  item.name === "Contact Us"
                    ? "mt-2 text-[#0A0A0A] font-semibold rounded-full"
                    : active === item.name
                    ? "text-white bg-white/8 border border-white/10"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                }`}
                style={item.name === "Contact Us" ? { background: "linear-gradient(135deg, #F5A623 0%, #E8940F 100%)" } : {}}
              >
                {item.name}
                {active === item.name && item.name !== "Contact Us" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
