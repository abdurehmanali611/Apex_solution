import ClientRoot from "@/Components/ClientRoot";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Apex Solution-User",
    description: "Apex Code Creators and Tech Solutions"
}

export default function UserLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <ClientRoot>
            {children}
        </ClientRoot>
    )
}