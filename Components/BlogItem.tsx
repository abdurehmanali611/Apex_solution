import Image from "next/image";
import Link from "next/link";

interface BlogItemProps {
  image: string;
  title: string;
  description: string;
  source: string;
  date: string;
  link: string;
}

export default function BlogItem({ image, title, description, source, date, link }: BlogItemProps) {
  return (
    <div className="group bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border border-amber-50 dark:border-amber-900/20 shadow-sm hover:shadow-xl transition-all">
      <div className="relative h-48 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
          <span className="text-[10px] text-white font-bold uppercase tracking-widest">{source}</span>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <span className="text-amber-600 text-[10px] font-bold">{date}</span>
        <h3 className="text-lg font-bold leading-tight group-hover:text-amber-600 transition-colors">{title}</h3>
        <p className="font-serif text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{description}</p>
        <Link href={link} className="inline-block text-amber-600 font-bold text-xs uppercase tracking-widest border-b-2 border-amber-500/20 hover:border-amber-500 transition-all pt-2">
          Read Story
        </Link>
      </div>
    </div>
  );
}