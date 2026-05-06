import Image from "next/image";
import Link from "next/link";
import { Github, Facebook, Instagram, Linkedin, Send, ExternalLink, Mail } from "lucide-react";

interface TeamItemProps {
  image: string;
  name: string;
  position: string;
  title: string;
  description: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  telegram: string;
  portfolio?: string;
  objectPosition?: string;
}

export default function TeamItem({
  image, name, position, title, description,
  facebook, instagram, linkedin, telegram, portfolio,
  objectPosition = "center",
}: TeamItemProps) {
  const teamEmailMap: Record<string, string> = {
    "Atlabachew Tadesse": "atlabachew.t@apexsolutionhub.com",
    "Abdurehman Ali": "abdurehman.a@apexsolutionhub.com",
    "Tedros Milion": "tedros.m@apexsolutionhub.com",
  };
  const workEmail = teamEmailMap[name];

  const socials = [
    { href: facebook, icon: facebook.includes("github") ? Github : Facebook, label: "Facebook" },
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
        {workEmail && (
          <Link
            href={`mailto:${workEmail}`}
            className="inline-flex items-center gap-2 text-xs text-blue-300 hover:text-white transition-colors break-all"
          >
            <Mail className="w-3.5 h-3.5" />
            {workEmail}
          </Link>
        )}

        {/* Portfolio CTA */}
        {portfolio ? (
          <Link
            href={portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-300 text-xs font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-200 w-full justify-center group/btn"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Portfolio
            <span className="ml-auto opacity-0 group-hover/btn:opacity-100 transition-opacity">→</span>
          </Link>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/3 border border-white/5 text-[#71717A] text-xs font-medium w-full justify-center">
            Portfolio coming soon
          </div>
        )}

        {/* Social links */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
          {socials.map((s, i) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
