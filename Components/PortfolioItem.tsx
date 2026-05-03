import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

interface PortfolioItemProps {
  link?: string;
  title: string;
  type: string;
  description: string;
  duration: number;
  image?: string;
  version?: number;
}

const TYPE_COLORS: Record<string, string> = {
  "Website":                                    "bg-blue-600/90 text-white",
  "Web App":                                    "bg-blue-600/90 text-white",
  "Digital System(SaaS)":                       "bg-blue-600/90 text-white",
  "Mobile App":                                 "bg-violet-600/90 text-white",
  "Hotel and Hospitality Technology":           "bg-[#F5A623]/90 text-[#0A0A0A]",
  "Network and Wi-Fi Infrastructure Projects":  "bg-cyan-500/90 text-[#0A0A0A]",
  "Network and Wi-Fi infrastructure Projects":  "bg-cyan-500/90 text-[#0A0A0A]",
};
const DEFAULT_COLOR = "bg-purple-600/90 text-white";

const typeImageMap: Record<string, string> = {
  Website:                          "/assets/website.jpg",
  "Web App":                        "/assets/webapp.jpg",
  "Digital System(SaaS)":           "/assets/webapp.jpg",
  "Mobile App":                     "/assets/mobileapp.jpg",
  "Hotel and Hospitality Technology": "/assets/hotel.jpg",
};

export default function PortfolioItem({ link, title, type, description, duration, image, version }: PortfolioItemProps) {
  const src = image || typeImageMap[type] || "/assets/network.jpg";
  const durationLabel = duration >= 30 ? `${Math.floor(duration / 30)}mo` : `${duration}d`;

  const content = (
    <div className="group relative rounded-2xl overflow-hidden bg-[#111111] border border-white/8 card-hover h-full">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-lg backdrop-blur-sm text-xs font-semibold ${TYPE_COLORS[type] ?? DEFAULT_COLOR}`}>
            {type}
          </span>
        </div>
        {version && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm text-white text-xs font-semibold border border-white/20">
              v{version}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors leading-tight"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            {title}
          </h3>
          {link && <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-blue-400 shrink-0 transition-colors" />}
        </div>
        <p className="text-sm text-[#71717A] leading-relaxed line-clamp-2">{description}</p>
        <div className="flex items-center gap-1.5 text-xs text-[#71717A] pt-1 border-t border-white/5">
          <Clock className="w-3 h-3" />
          <span>{durationLabel}</span>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </Link>
    );
  }
  return <div className="h-full">{content}</div>;
}
