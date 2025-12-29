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
    <Card>
      <CardContent>
        <div className="flex flex-col gap-5 px-10">
          <div className="flex justify-center items-center w-full p-5">
            <div className="flex items-center gap-10">
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
          <Separator />
          <div className="flex flex-col gap-10 w-[55%] mx-59">
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis
              maiores voluptatem doloremque. Dolores at temporibus laboriosam,
              itaque commodi suscipit excepturi sed, rerum maiores autem
              incidunt doloremque, laborum atque aliquam distinctio?
            </p>
            <div className="flex items-center gap-10 justify-center">
              {footerLink.map((item) => (
                <Link href={item.link} key={item.id}>
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
