"use client";
import {
  Globe, LayoutDashboard, Smartphone, Network, Building2,
  Cctv, LockKeyhole, Cpu, ShieldCheck, Lightbulb, LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "lucide:globe": Globe,
  "lucide:layout-dashboard": LayoutDashboard,
  "lucide:smartphone": Smartphone,
  "lucide:network": Network,
  "lucide:building-2": Building2,
  "lucide:cctv": Cctv,
  "lucide:lock-keyhole": LockKeyhole,
  "lucide:cpu": Cpu,
  "lucide:shield-check": ShieldCheck,
  "lucide:lightbulb": Lightbulb,
};

const INDUSTRIES: Record<number, string[]> = {
  0: ["Startups", "Enterprise", "Gov"],
  1: ["Finance", "Healthcare", "Gov"],
  2: ["Retail", "Startups", "Education"],
  3: ["Hotels", "Offices", "Institutions"],
  4: ["Hotels", "Hospitality", "Resorts"],
  5: ["Hotels", "Finance", "Gov"],
  6: ["Hotels", "Offices", "Resorts"],
  7: ["Finance", "Healthcare", "Retail"],
  8: ["Enterprise", "Gov", "Education"],
  9: ["Gov", "Finance", "Enterprise"],
};

interface ServiceItemProps {
  icon: string;
  title: string;
  description: string;
  index?: number;
}

export default function ServiceItem({ icon, title, description, index = 0 }: ServiceItemProps) {
  const IconComponent = ICON_MAP[icon] ?? Globe;
  const num = String(index + 1).padStart(2, "0");
  const industries = INDUSTRIES[index] ?? ["Enterprise", "Gov"];

  return (
    <div className="group relative flex gap-5 p-6 rounded-2xl bg-[#111111] border border-white/8 overflow-hidden transition-all duration-300 hover:translate-x-1.5 hover:border-[#F5A623]/30 hover:bg-[#141414] hover:shadow-xl hover:shadow-[#F5A623]/5 cursor-default">
      {/* Left amber accent border */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-[#F5A623]/0 group-hover:bg-[#F5A623] transition-all duration-300" />

      {/* Number */}
      <div className="shrink-0 pt-0.5">
        <span
          className="text-2xl font-bold text-[#F5A623]/20 group-hover:text-[#F5A623]/50 transition-colors duration-300 select-none"
          style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.04em" }}
        >
          {num}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        {/* Icon + title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-white/8 flex items-center justify-center shrink-0 group-hover:bg-[#F5A623]/10 group-hover:border-[#F5A623]/20 transition-all duration-300">
            <IconComponent className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#F5A623] transition-colors duration-300" strokeWidth={1.75} />
          </div>
          <h3
            className="text-sm font-semibold text-white leading-snug group-hover:text-[#F5A623] transition-colors duration-200"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs text-[#71717A] leading-[1.75] group-hover:text-[#D4D4D8] transition-colors duration-200">
          {description}
        </p>

        {/* Industry badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {industries.map((ind) => (
            <span key={ind} className="text-[10px] px-2 py-0.5 rounded-full bg-white/4 border border-white/6 text-[#71717A] group-hover:border-[#F5A623]/20 group-hover:text-[#A1A1AA] transition-all duration-200">
              {ind}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
