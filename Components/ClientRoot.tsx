"use client";
import React, { useState } from "react";
import { Toaster } from "sonner";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export default function ClientRoot({ children }: Props) {
  const [active, setActive] = useState<string>("Home");

  return (
    <div>
      <Navbar active={active} setActive={setActive} />
      <main className="py-10">{children}</main>
      <Toaster />
      <Footer active={active} setActive={setActive} />
    </div>
  );
}
