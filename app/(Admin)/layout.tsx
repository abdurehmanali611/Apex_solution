import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Apex Solution-Builders Admin",
  description: "Admin panel for Apex Code Creators and Tech Solutions",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-425 flex-col px-4 py-6">
        {children}
      </main>
    </div>
  );
}
