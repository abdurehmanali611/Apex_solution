"use client";
import { NavbarComponents } from "@/constants";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import { useState } from "react";

interface NavbarProps {
  active: string;
  setActive: (name: string) => void;
}

const Navbar = ({ active, setActive }: NavbarProps) => {
  const [menuShow, setMenuShow] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-amber-100 dark:border-amber-900/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:px-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <Avatar className="h-10 w-10 border-2 border-amber-500/20 group-hover:border-amber-500 transition-colors">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              fill
              className="rounded-full object-cover"
            />
          </Avatar>
          <h3 className="text-xl font-bold tracking-tight">
            <span className="text-amber-600 dark:text-amber-500">Apex</span> 
            <span className="text-slate-800 dark:text-slate-200"> Solutions</span>
          </h3>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {NavbarComponents.map((item) => (
            <Link
              href={item.link}
              onClick={() => setActive(item.name)}
              key={item.id}
              className={`text-sm font-medium transition-all duration-300 hover:text-amber-500 ${
                active === item.name 
                  ? "text-amber-600 dark:text-amber-500 underline decoration-2 underline-offset-8" 
                  : "text-slate-600 dark:text-slate-400"
              } ${
                item.name === "Contact Us" &&
                "bg-amber-500 hover:bg-amber-600 text-white! px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 no-underline!"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden" onClick={() => setMenuShow(!menuShow)}>
          {menuShow ? (
            <X className="w-8 h-8 text-amber-600" />
          ) : (
            <Menu className="w-8 h-8 text-slate-700 dark:text-slate-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuShow && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-amber-100 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {NavbarComponents.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              onClick={() => {
                setMenuShow(false);
                setActive(item.name);
              }}
              className={`text-lg font-semibold ${
                active === item.name ? "text-amber-500" : "text-slate-700 dark:text-slate-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;