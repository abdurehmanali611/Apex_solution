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

interface TeamItemProps {
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
}: TeamItemProps) {
  return (
    <Card className="w-80 border-amber-100 dark:border-amber-900/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300">
      <CardHeader className="flex flex-col items-center">
        <div className="relative p-1 rounded-full border-2 border-amber-500/20 group-hover:border-amber-500 transition-colors duration-500">
          <Avatar className="w-24 h-24">
            <Image src={image} alt={name} fill className="object-cover" />
          </Avatar>
        </div>
        <CardTitle className="mt-4 text-lg font-bold">{name}</CardTitle>
        <CardDescription className="text-amber-600 dark:text-amber-500 font-bold text-xs uppercase tracking-tighter">
          {position} — {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center font-serif text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </CardContent>
      <CardFooter className="flex gap-4 justify-center border-t border-amber-50 dark:border-amber-900/10">
        <Link
          href={facebook}
          className="text-slate-400 hover:text-amber-500 transition-colors"
        >
          <Icon icon="lucide:facebook" className="w-5 h-5" />
        </Link>
        <Link
          href={instagram}
          className="text-slate-400 hover:text-amber-500 transition-colors"
        >
          <Icon icon="lucide:instagram" className="w-5 h-5" />
        </Link>
        <Link
          href={linkedin}
          className="text-slate-400 hover:text-amber-500 transition-colors"
        >
          <Icon icon="lucide:linkedin" className="w-5 h-5" />
        </Link>
        <Link
          href={telegram}
          className="text-slate-400 hover:text-amber-500 transition-colors"
        >
          <Icon icon="lucide:send" className="w-5 h-5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
