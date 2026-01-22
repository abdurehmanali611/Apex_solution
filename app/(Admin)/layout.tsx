import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Apex Solution-Builders",
  description: "Apex Code Creators and Tech Solutions",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
