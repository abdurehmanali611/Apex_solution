"use client";
import {
  Globe, LayoutDashboard, Smartphone, Network, Building2,
  Cctv, LockKeyhole, Cpu, ShieldCheck, Lightbulb,
  LucideIcon,
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

// Gradient pairs per service index — cycles through 5 combos
const GRADIENTS = [
  "from-blue-600/20 to-cyan-500/10 border-blue-500/20 text-blue-400",
  "from-violet-600/20 to-blue-500/10 border-violet-500/20 text-violet-400",
  "from-cyan-600/20 to-teal-500/10 border-cyan-500/20 text-cyan-400",
  "from-indigo-600/20 to-blue-500/10 border-indigo-500/20 text-indigo-400",
  "from-sky-600/20 to-cyan-500/10 border-sky-500/20 text-sky-400",
];

interface ServiceItemProps {
  icon: string;
  title: string;
  description: string;
  index?: number;
}

export default function ServiceItem({ icon, title, description, index = 0 }: ServiceItemProps) {
  const IconComponent = ICON_MAP[icon] ?? Globe;
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <div className="group relative p-6 rounded-2xl bg-[#111111] border border-white/8 card-hover cursor-default overflow-hidden">
      {/* Subtle top-left glow on hover */}
      <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-blue-600/0 group-hover:bg-blue-600/8 blur-2xl transition-all duration-500 pointer-events-none" />

      <div className="relative flex flex-col gap-4">
        {/* Icon box */}
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="w-5 h-5" strokeWidth={1.75} />
        </div>

        {/* Title */}
        <h3
          className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-200 leading-snug"
          style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#71717A] leading-relaxed group-hover:text-[#A1A1AA] transition-colors duration-200">
          {description}
        </p>

        {/* Bottom accent line on hover */}
        <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-blue-500/60 to-transparent transition-all duration-500" />
      </div>
    </div>
  );
}
