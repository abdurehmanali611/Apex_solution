import { ThemeProvider } from "@/Components/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apex Solutions- Admin Dashboard",
  description: "Apex Code Creators and Tech Solutions",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </div>
  );
}
