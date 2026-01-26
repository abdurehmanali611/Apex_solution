import Image from "next/image";
import { Avatar } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface Teams {
  image: string;
  name: string;
  position: string;
  title: string;
  description: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  telegram: string;
}

export default function TeamItem({
  image,
  name,
  position,
  title,
  description,
  facebook,
  instagram,
  linkedin,
  telegram,
}: Teams) {
  return (
    <Card className="w-98 p-5">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="w-28 h-28">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            loading="eager"
          />
        </Avatar>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="md:text-center lg:text-start">
          {position}: {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">{description}</CardContent>
      <CardFooter className="flex gap-4 items-center justify-center">
        <Link href={facebook}>
          <Icon icon="logos:facebook" className="w-5 h-5" />
        </Link>
        <Link href={instagram}>
          <Icon icon="skill-icons:instagram" className="w-5 h-5" />
        </Link>
        <Link href={linkedin}>
          <Icon icon="skill-icons:linkedin" className="w-5 h-5" />
        </Link>
        <Link href={telegram}>
          <Icon icon="logos:telegram" className="w-5 h-5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
