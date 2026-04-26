import ClientRoot from "@/Components/ClientRoot";
import ApexChat from "@/Components/ApexChat";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Apex Solution — Software & Tech Support",
  description:
    "Apex Solution delivers reliable software development, hotel technology, networking, CCTV, and IT consulting services across Ethiopia.",
};

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClientRoot>
      {children}
      <ApexChat />
    </ClientRoot>
  );
}
