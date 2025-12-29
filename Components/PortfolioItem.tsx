import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface portfolio {
  image: string;
  title: string;
  type?: string;
}

export default function PortfolioItem({ image, title, type }: portfolio) {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
      <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          quality={85}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {type && (
          <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-sm">
            {type}
          </span>
        )}
        
        {/* View icon */}
        <div className="absolute top-4 right-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Title at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className="text-white font-semibold text-lg truncate cursor-help hover:text-blue-200 transition-colors">
              {title}
            </h3>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gray-900 text-white border-0">
            <p className="font-medium">{title}</p>
            {type && <p className="text-xs text-gray-300 mt-1">Type: {type}</p>}
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/30 rounded-2xl transition-colors duration-500 pointer-events-none" />
    </div>
  );
}