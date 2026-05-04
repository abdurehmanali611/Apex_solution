"use client";
import React from "react";
import { Toaster } from "sonner";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { NavbarComponents } from "@/constants";

interface Props {
  children: React.ReactNode;
}

export default function ClientRoot({ children }: Props) {
  const pathname = usePathname();
  const active =
    NavbarComponents.find((item) =>
      item.link === "/" ? pathname === "/" : pathname.startsWith(item.link)
    )?.name ?? "Home";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--apex-bg)" }}>
      <Navbar active={active} />
      <main className="pt-16">{children}</main>
      <Toaster richColors position="top-right" />
      <Footer active={active} />
    </div>
  );
}
