import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialItemProps {
  image: string;
  name: string;
  profession: string;
  content: string;
  rating?: number;
}

export default function TestimonialItem({ image, name, profession, content, rating = 5 }: TestimonialItemProps) {
  return (
    <div className="group p-6 rounded-2xl bg-[#111111] border border-white/8 card-hover h-full flex flex-col gap-5">
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-blue-400 fill-blue-400" : "text-white/10"}`} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-[#A1A1AA] leading-relaxed italic flex-1">
        &ldquo;{content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src={image ?? "/assets/testimonial-1.jpg"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
            {name}
          </p>
          <p className="text-xs text-[#71717A]">{profession}</p>
        </div>
      </div>
    </div>
  );
}
