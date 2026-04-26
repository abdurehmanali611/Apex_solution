import Image from "next/image";

interface PartnerItemProps {
  image: string;
  title: string;
}

export default function PartnerItem({ image, title }: PartnerItemProps) {
  return (
    <div className="mx-4 flex items-center gap-3 px-5 py-3 rounded-xl bg-[#111111] border border-white/8 hover:border-blue-500/30 transition-all duration-200 group">
      <div className="relative h-8 w-8 shrink-0">
        <Image src={image} alt={title} fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
      </div>
      <span className="text-sm font-medium text-[#71717A] group-hover:text-white transition-colors whitespace-nowrap">
        {title}
      </span>
    </div>
  );
}
