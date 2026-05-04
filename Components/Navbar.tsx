"use client";
import { NavbarComponents } from "@/constants";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

interface NavbarProps { active: string; }

const Navbar = ({ active }: NavbarProps) => {
  const [menuShow, setMenuShow] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { theme, toggle } = useTheme();

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
            ? theme === "light"
              ? `rgba(255,255,255,${Math.min(0.97, 0.6 + scrollY / 400)})`
              : `rgba(10,10,10,${Math.min(0.97, 0.6 + scrollY / 400)})`
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? theme === "light"
              ? "1px solid rgba(0,0,0,0.08)"
              : "1px solid rgba(255,255,255,0.05)"
            : "none",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.15)" : "none",
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
                    ? theme === "light" && scrolled ? "text-[#0A0A0A]" : "text-white"
                    : theme === "light" && scrolled
                    ? "text-[#52525B] group-hover:text-[#0A0A0A]"
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

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                theme === "light" && scrolled
                  ? "bg-black/5 border-black/10 text-[#52525B] hover:text-[#0A0A0A] hover:bg-black/10"
                  : "bg-white/5 border-white/8 text-[#A1A1AA] hover:text-white hover:bg-white/10"
              }`}
            >
              {theme === "dark"
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />}
            </button>

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
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: theme === 'light' && scrolled ? '#52525B' : '#A1A1AA' }}
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
              <div className="flex items-center gap-2">
                <button
                  onClick={toggle}
                  aria-label="Toggle theme"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button onClick={() => setMenuShow(false)} className="p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5">
                  <X className="w-5 h-5" />
                </button>
              </div>
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
