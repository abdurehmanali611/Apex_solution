import Image from "next/image";

interface PartnerItemProps {
  image: string;
  title: string;
}

export default function PartnerItem({ image, title }: PartnerItemProps) {
  return (
    <div className="mx-4 my-2 group">
      <div className="flex items-center gap-4 p-3 pr-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-amber-100 dark:border-amber-900/20 rounded-2xl shadow-sm hover:border-amber-500 transition-all duration-300">
        <div className="relative h-10 w-10 transition-all duration-500">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
        <span className="font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">{title}</span>
      </div>
    </div>
  );
}