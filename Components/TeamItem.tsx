import Image from "next/image";
import Link from "next/link";
import { Github, Facebook, Instagram, Linkedin, Send } from "lucide-react";

interface TeamItemProps {
  image: string;
  name: string;
  position: string;
  title: string;
  description: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  telegram?: string;
  objectPosition?: string;
}

export default function TeamItem({
  image, name, position, title, description,
  facebook, instagram, linkedin, telegram,
  objectPosition = "center",
}: TeamItemProps) {
  const socials = [
    { href: facebook, icon: facebook?.includes("github") ? Github : Facebook, label: "Facebook" },
    { href: instagram, icon: Instagram, label: "Instagram" },
    { href: linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: telegram, icon: Send, label: "Telegram" },
  ];

  return (
    <div className="group relative rounded-3xl bg-[#111111] border border-white/8 overflow-hidden transition-all duration-300 hover:border-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/5">

      {/* Photo — taller, full bleed */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#111111] via-[#111111]/40 to-transparent" />

        {/* Title badge — top right */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest">
            {title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Name + position */}
        <div>
          <h3
            className="text-lg font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            {name}
          </h3>
          <p className="text-xs text-blue-400 font-semibold mt-1 leading-snug">{position}</p>
        </div>

        {/* Description */}
        <p className="text-xs text-[#71717A] leading-relaxed border-l-2 border-blue-500/30 pl-3">
          {description}
        </p>

        {/* Social links */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
          {socials.map((s, i) =>
            s.href ? (
            <Link
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-[#71717A] hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all duration-200"
            >
              <s.icon className="w-3.5 h-3.5" />
            </Link>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
