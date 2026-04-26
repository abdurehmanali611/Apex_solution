import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Apex Solution — Software & Tech Support",
    template: "%s | Apex Solution",
  },
  description:
    "Apex Solution delivers reliable software development, hotel technology, networking, CCTV, and IT consulting services across Ethiopia.",
  keywords: [
    "Apex Solution",
    "software development Ethiopia",
    "hotel management system",
    "CCTV installation",
    "IT consulting",
    "network installation",
    "Hossana",
    "Addis Ababa",
  ],
  icons: {
    icon: [
      { url: "/apex-favicon-32.svg", type: "image/svg+xml" },
    ],
    apple: "/apex-icon-amber.svg",
  },
  openGraph: {
    title: "Apex Solution — Software & Tech Support",
    description:
      "Reliable software, hotel tech, networking, and IT consulting across Ethiopia.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${inter.variable} antialiased bg-[#0A0A0A] text-white`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: {
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#FAFAFA",
            },
          }}
        />
      </body>
    </html>
  );
}
