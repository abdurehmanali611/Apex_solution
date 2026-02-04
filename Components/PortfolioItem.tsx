import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "next/image";

interface portfolio {
  link?: string;
  title: string;
  type: string;
  description: string;
  duration: number;
  image?: string;
  version?: number;
}

export default function PortfolioItem({
  link,
  title,
  type,
  description,
  duration,
  image,
  version,
}: portfolio) {
  const writtenDuration =
    duration >= 30
      ? `${duration % 30} ${duration === 30 ? "month" : "months"}`
      : `${duration} days`;
  return (
    <Card>
      <CardHeader className="flex flex-col gap-5 items-center">
        <div className="flex items-center w-full justify-between">
          <Badge>{type}</Badge>
          {version && (
            <Badge>
              <span>Version: </span>
              {version}
            </Badge>
          )}
        </div>
        <CardTitle className="text-center text-xl font-serif">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-start justify-between gap-5">
        {image && (
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            loading="eager"
            className="rounded-xl"
          />
        )}
        <p className="text-lg font-serif">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <h2 className="font-serif">
          <span className="font-semibold text-lg text-amber-500">
            Duration:
          </span>{" "}
          {writtenDuration}
        </h2>
        {link && (
          <Link href={link} target="blank" className="text-blue-500 underline">
            Visit Here
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
