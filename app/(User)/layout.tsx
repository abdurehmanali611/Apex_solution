"use client"
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { ThemeProvider } from "@/Components/theme-provider";
import { useState } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("Home")
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Navbar active={active} setActive={setActive} />
        <main className="py-10">{children}</main>
        <Footer active={active} setActive={setActive} />
      </ThemeProvider>
    </div>
  );
}
