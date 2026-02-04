import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import Link from "next/link";

interface PortfolioItem {
  link?: string;
  title: string;
  type: string;
  description: string;
  duration: number;
  image?: string;
  version?: string;
}

export default function PortfolioItem({
  link,
  title,
  type,
  description,
  duration,
  image,
  version,
}: PortfolioItem) {
  const writtenDuration =
    duration >= 30 ? `${Math.floor(duration / 30)} months` : `${duration} days`;

  return (
    <Card className="overflow-hidden border-none shadow-lg bg-white dark:bg-slate-900 group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/assets/computer.jpeg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex items-center justify-between w-full px-5">
          <Badge className="bg-amber-500 hover:bg-amber-600">{type}</Badge>
          {version && (
            <Badge
              variant="outline"
              className="bg-amber-500 backdrop-blur-md text-black"
            >
              v{version}
            </Badge>
          )}
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold text-amber-600 dark:text-amber-500">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="font-serif text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
          {description}
        </p>
      </CardContent>

      <CardFooter className="border-t border-amber-50 dark:border-amber-900/20 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            Project Duration:
          </span>
          <span className="text-sm font-bold text-amber-600">
            {writtenDuration}
          </span>
        </div>
        {link && (
          <Link
            href={link}
            className="text-sm font-bold text-amber-600 underline hover:text-blue-500"
          >
            Visit Here
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
