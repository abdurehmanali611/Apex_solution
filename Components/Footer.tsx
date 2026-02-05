"use client";
import { Card, CardContent } from "./ui/card";
import { footerLink, NavbarComponents } from "@/constants";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Separator } from "./ui/separator";

interface FooterProps {
  active: string;
  setActive: (name: string) => void;
}

const Footer = ({ active, setActive }: FooterProps) => {
  return (
    <Card className="w-full dark:bg-slate-950">
      <CardContent>
        <div className="flex flex-col gap-5 px-0 md:px-10">
          <div className="flex justify-center items-center w-full p-5">
            <div className="flex flex-wrap items-center gap-8 md:gap-10">
              {NavbarComponents.map((item) => (
                <Link
                  href={item.link}
                  onClick={() => setActive(item.name)}
                  key={item.id}
                  className={`font-semibold font-sans cursor-pointer hover:text-amber-500 ${
                    active == item.name && "text-amber-500"
                  }`}
                >
                  <h3>{item.name}</h3>
                </Link>
              ))}
            </div>
          </div>
          <Separator className="bg-slate-100 dark:bg-slate-800" />
          <div className="flex flex-col gap-10 w-full md:w-[55%] mx-0 md:mx-59">
            <p className="font-serif text-lg italic leading-relaxed text-slate-600 dark:text-slate-400 text-center md:text-start lg:text-center">
              <span className="text-amber-500 font-bold not-italic">
                ApexSolution&apos;s{" "}
              </span>
              tech service is fast, reliable and knowledgable. System issues are
              solved before they affect operations. Our team understands
              Hospitality and IT Inside Out. What Stands out with ApexSolution
              is responsiveness. One Call the issue is handled Which keeps our
              customers system stable and productive.
            </p>
            <div className="flex items-center gap-10 justify-center">
              {footerLink.map((item) => (
                <Link
                  href={item.link}
                  key={item.id}
                  className="p-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-amber-500 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300"
                >
                  <Icon icon={item.icon} className="w-7 h-7" />
                </Link>
              ))}
            </div>
            <h3 className="text-center">
              &copy; 2026 Apex Solutions. All Rights Reserved.
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Footer;
