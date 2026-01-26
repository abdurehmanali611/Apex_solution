"use client";
import { NavbarComponents } from "@/constants";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import { useState } from "react";

interface NavbarProps {
  active: string;
  setActive: (name: string) => void;
}

const Navbar = ({ active, setActive }: NavbarProps) => {
  const [menuShow, setMenuShow] = useState(false);
  return (
    <div className="flex justify-between items-center w-full p-5">
      <div className="flex items-center gap-3">
        <Avatar className="bg-gray-100">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            fill
            className="rounded-full"
          />
        </Avatar>
        <h3 className="text-xl font-bold">
          <span className="text-amber-500">Apex</span> Solutions
        </h3>
      </div>
      {menuShow ? (
        <X
          className="w-10 h-10 bg-destructive/20 text-destructive rounded-xl p-2 block lg:hidden cursor-pointer"
          onClick={() => setMenuShow(!menuShow)}
        />
      ) : (
        <Menu
          className="w-10 h-10 bg-primary text-primary-foreground rounded-xl p-2 block lg:hidden cursor-pointer"
          onClick={() => setMenuShow(!menuShow)}
        />
      )}
      <div
        className={`lg:flex lg:flex-row lg:items-center lg:gap-10 ${
          menuShow
            ? "grid grid-cols-3 md:grid-cols-6 items-center text-center gap-5 bg-popover border border-border text-popover-foreground rounded-xl shadow-xl left-[50%] -translate-x-1/2 w-[90%] p-4 z-50 absolute top-[12%]"
            : "hidden"
        }`}
      >
        {NavbarComponents.map((item) => (
          <Link
            href={item.link}
            onClick={() => {
              setMenuShow(false);
              setActive(item.name);
            }}
            key={item.id}
            className={`font-semibold font-sans cursor-pointer hover:text-amber-500 ${
              active == item.name && "text-amber-500 underline"
            } ${
              item.name == "Contact Us" &&
              "bg-amber-500 p-2 rounded-xl text-black/75 hover:text-black hover:underline mx-32 w-36 md:mx-87 lg:mx-0 lg:w-28 lg:text-center"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
