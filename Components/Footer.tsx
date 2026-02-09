"use client";
import { Card, CardContent } from "./ui/card";
import { accessibility, footerLink, NavbarComponents } from "@/constants";
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
          <div className="flex flex-col gap-10 w-full mx-0">
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-10">
              <div className="flex flex-col gap-4">
                <h2 className="text-[21px] font-bold font-serif text-slate-700 dark:text-slate-300">
                  Our Accessibilities with Full Support
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-6">
                  {accessibility.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <Icon icon="streamline-plump-color:location-pin-flat" />
                      <h2 className="font-serif text-md">{item.name}</h2>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-[21px] font-bold font-serif text-slate-700 dark:text-slate-300 text-start md:text-center">
                  Contact Us
                </h2>
                <div className="flex flex-row md:flex-col gap-4 mt-4 items-center">
                  <div className="flex items-center gap-3">
                    <Icon icon="streamline-flex-color:call-center-support-service-flat" />
                    <Link className="font-serif text-md hover:underline" href="tel:+251930272975">+251 930 272 975</Link>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="streamline-flex-color:call-center-support-service-flat" />
                    <Link className="font-serif text-md hover:underline" href="tel:+251935000642">+251 935 000 642</Link>
                  </div>
                </div>
              </div>
            </div>
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
