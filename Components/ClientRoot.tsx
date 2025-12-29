"use client";
import React, { useState } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "./theme-provider";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export default function ClientRoot({ children }: Props) {
  const [active, setActive] = useState<string>("Home");

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Navbar active={active} setActive={setActive} />
      <main className="py-10">{children}</main>
      <Toaster />
      <Footer active={active} setActive={setActive} />
    </ThemeProvider>
  );
}
