import Image from "next/image";

interface Projects {
  image: string;
  title: string;
}

export default function ProjectItem({ image, title }: Projects) {
  return (
    <div className="flex flex-col gap-10">
      <div className="group flex items-center gap-4 mr-6 p-2 pr-6 bg-white/50 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-100 hover:-translate-y-1">
        <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            loading="eager"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Project
          </span>
          <h3 className="font-serif text-base font-semibold text-gray-800 whitespace-nowrap leading-tight">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
