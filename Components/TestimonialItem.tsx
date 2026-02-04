import Image from "next/image";
import { Quote, Star } from "lucide-react";

interface TestimonialItemProps {
  image: string;
  name: string;
  profession: string;
  content: string;
  rating?: number;
}

export default function TestimonialItem({ image, name, profession, content, rating = 5 }: TestimonialItemProps) {
  return (
    <div className="p-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-amber-100/50 dark:border-amber-900/30 rounded-[2rem] h-full shadow-xl shadow-amber-500/5 relative overflow-hidden group">
      <Quote className="absolute -top-4 -right-4 w-24 h-24 text-amber-500/5 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
      
      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            {/* Enlarged Avatar to w-20 */}
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/30 p-1 bg-white dark:bg-slate-800">
              <Image
                src={image ?? "/assets/testimonial-1.jpg"}
                alt={name}
                width={80}
                height={80}
                className="rounded-xl object-cover h-full w-full"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-500 p-1.5 rounded-lg shadow-lg">
              <Star className="text-white fill-white w-3 h-3" />
            </div>
          </div>
          
          <div>
            <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-1 leading-tight">
              {name}
            </h5>
            <p className="text-amber-600 dark:text-amber-500 text-xs font-bold uppercase tracking-[0.15em]">
              {profession}
            </p>
          </div>
        </div>

        {/* Quote Content - Serif & Medium Size */}
        <p className="font-serif text-lg italic text-slate-700 dark:text-slate-300 leading-relaxed">
          &ldquo;{content}&rdquo;
        </p>

        {/* Star Rating Row */}
        <div className="flex gap-1 pt-2 border-t border-amber-50 dark:border-amber-900/20 w-fit">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "text-amber-500 fill-amber-500" : "text-slate-200"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}