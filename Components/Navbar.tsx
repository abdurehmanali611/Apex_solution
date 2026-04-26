"use client";
import { NavbarComponents } from "@/constants";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NavbarProps {
  active: string;
}

const Navbar = ({ active }: NavbarProps) => {
  const [menuShow, setMenuShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/apex-logo-dark-bg.svg"
              alt="Apex Solution"
              width={160}
              height={40}
              className="h-10 w-auto transition-opacity duration-200 group-hover:opacity-90"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NavbarComponents.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.name === "Contact Us"
                    ? "bg-blue-600 hover:bg-blue-500 text-white ml-2 btn-shimmer"
                    : active === item.name
                    ? "text-white bg-white/5"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
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
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuShow(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 bg-[#111111] border-l border-white/8 p-6 flex flex-col gap-2 animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <Image
                src="/apex-logo-dark-bg.svg"
                alt="Apex Solution"
                width={130}
                height={32}
                className="h-8 w-auto"
              />
              <button
                onClick={() => setMenuShow(false)}
                className="p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {NavbarComponents.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                onClick={() => setMenuShow(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  item.name === "Contact Us"
                    ? "bg-blue-600 hover:bg-blue-500 text-white text-center mt-2"
                    : active === item.name
                    ? "text-white bg-white/8 border border-white/10"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
