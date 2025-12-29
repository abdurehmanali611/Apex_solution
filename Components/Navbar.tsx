"use client";
import { NavbarComponents } from "@/constants";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  active: string;
  setActive: (name: string) => void;
}

const Navbar = ({ active, setActive }: NavbarProps) => {
  return (
    <div className="flex justify-between items-center w-full p-5">
      <div className="flex items-center gap-3">
        <Image
          src="/vercel.svg"
          alt="Vercel"
          width={20}
          height={20}
          className="rounded-full"
        />
        <h3 className="text-xl font-bold">
          <span className="text-amber-500">Apex</span> Solutions
        </h3>
      </div>
      <div className="flex items-center gap-10">
        {NavbarComponents.map((item) => (
          <Link
            href={item.link}
            onClick={() => setActive(item.name)}
            key={item.id}
            className={`font-semibold font-sans cursor-pointer hover:text-amber-500 ${
              active == item.name && "text-amber-500 underline"
            } ${
              item.name == "Contact Us" &&
              "bg-amber-500 p-2 rounded-xl text-black/75 hover:text-black hover:underline"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;