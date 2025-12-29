import Image from "next/image";
import { Quote, Star } from "lucide-react";

interface TestimonialItemProps {
  image?: string;
  name?: string;
  profession?: string;
  content?: string;
  rating?: number;
}

export default function TestimonialItem({
  image,
  name,
  profession,
  content,
  rating = 5,
}: TestimonialItemProps) {
  return (
    <div className="p-10 bg-white shadow-lg rounded-lg h-full">
      <div className="flex items-start mb-4">
        <div className="relative shrink-0">
          <div className="relative w-25 h-25 rounded-lg overflow-hidden">
            <Image
              src={image ?? "/assets/testimonial-1.jpg"}
              alt={name ?? "Testimonial Image"}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-12 h-12 bg-[#10b982] rounded-full absolute flex items-center justify-center top-6.25 -left-6.25">
            <Quote className="text-white w-5 h-5" />
          </div>
        </div>
        <div className="pl-4 flex-1">
          <h5 className="mb-1 text-lg font-semibold font-sans text-gray-900">
            {name || "Anonymous"}
          </h5>
          <p className="m-0 text-sm text-gray-600">
            {profession || "Community Member"}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < rating
                  ? "text-[#F1C152] fill-[#F1C152]"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-base leading-relaxed text-gray-700">
          {content || "No testimonial content available."}
        </p>
      </div>
    </div>
  );
}
