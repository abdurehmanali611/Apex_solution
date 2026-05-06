import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";

interface BlogItemProps {
  image: string;
  title: string;
  description: string;
  source: string;
  date: string;
  link: string;
  category?: string;
}

export default function BlogItem({ image, title, description, source, date, link, category }: BlogItemProps) {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer" className="group block h-full">
      <div className="h-full rounded-2xl overflow-hidden bg-[#111111] border border-white/8 hover:border-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 flex flex-col">
        {/* Image */}
        <div className="relative h-44 overflow-hidden shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#111111]/90 via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            {category ? (
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm ${
                category === "Ethiopia" ? "bg-green-600/85 text-white" : "bg-blue-600/85 text-white"
              }`}>
                {category === "Ethiopia" ? "🇪🇹 Ethiopia" : "🌍 Global"}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-blue-600/85 backdrop-blur-sm text-white text-[10px] font-bold">
                {source}
              </span>
            )}
          </div>

          {/* Source */}
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-1 rounded-lg bg-[#111111]/80 backdrop-blur-sm text-[#A1A1AA] text-[10px] font-semibold border border-white/8">
              {source}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <span className="flex items-center gap-1.5 text-[10px] text-[#71717A]">
            <Calendar className="w-3 h-3" />{date}
          </span>
          <h3
            className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-snug line-clamp-2 flex-1"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            {title}
          </h3>
          <p className="text-xs text-[#71717A] leading-relaxed line-clamp-2">{description}</p>
          <div className="flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors pt-2 border-t border-white/5">
            Read Article <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
