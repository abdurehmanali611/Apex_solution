import Image from "next/image";
import Link from "next/link";

interface Blogs {
  image: string;
  title: string;
  description: string;
  source: string;
  date: string;
  link: string;
}

export default function BlogItem({
  image,
  title,
  description,
  source,
  date,
  link,
}: Blogs) {
  return (
    <div
      className="
      group
      flex flex-col
      rounded-2xl
      bg-white
      shadow-md
      hover:shadow-xl
      transition-all duration-300
      overflow-hidden
      max-w-85
    "
    >
      {/* Image */}
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={260}
          loading="eager"
          className="
            w-full h-55
            object-cover
            group-hover:scale-105
            transition-transform duration-300
          "
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">
        {/* Source & Date */}
        <div className="flex justify-between text-xs text-gray-500">
          <span className="font-medium">{source}</span>
          <span>{date}</span>
        </div>

        {/* Title */}
        <h3
          className="
          text-lg
          font-semibold
          text-gray-900
          leading-snug
          line-clamp-2
          group-hover:text-blue-600
          transition-colors
        "
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="
          text-sm
          text-gray-600
          leading-relaxed
          line-clamp-3
        "
        >
          {description}
        </p>

        <Link
          href={link}
          target="blank"
          className="
          mt-2
          text-sm
          font-medium
          text-blue-600
          hover:underline
          self-start
          cursor-pointer
        "
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}
