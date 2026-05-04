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
    default: "Apex Solution — AI-Powered Software & Tech",
    template: "%s | Apex Solution",
  },
  description:
    "Apex Solution is Ethiopia's AI-first technology company — delivering intelligent software, hotel tech, networking, and AI consulting services.",
  keywords: [
    "Apex Solution", "software development Ethiopia", "hotel management system",
    "CCTV installation", "IT consulting", "network installation", "Hossana", "Addis Ababa", "AI solutions Ethiopia",
  ],
  icons: {
    icon: [{ url: "/apex-favicon-32.svg", type: "image/svg+xml" }],
    apple: "/apex-icon-amber.svg",
  },
  openGraph: {
    title: "Apex Solution — AI-Powered Software & Tech",
    description: "Ethiopia's AI-first technology company — intelligent software, hotel tech, networking, and AI consulting.",
    type: "website",
    locale: "en_US",
    siteName: "Apex Solution",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://apex-solution.vercel.app" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://apex-solution.vercel.app/#organization",
      name: "Apex Solution",
      url: "https://apex-solution.vercel.app",
      logo: "https://apex-solution.vercel.app/apex-logo-dark-bg.svg",
      description: "Ethiopia's AI-first technology company delivering intelligent software, hotel technology, networking infrastructure, and IT consulting services.",
      foundingDate: "2015",
      areaServed: "ET",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+251-930-272-975",
        contactType: "customer service",
        availableLanguage: ["English", "Amharic"],
      },
      sameAs: [
        "https://www.linkedin.com/company/apex-solution-et",
        "https://t.me/ApexSolutionET",
        "https://github.com/apex-solution",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://apex-solution.vercel.app/#localbusiness",
      name: "Apex Solution",
      image: "https://apex-solution.vercel.app/apex-logo-dark-bg.svg",
      telephone: "+251-930-272-975",
      email: "apexsolution@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hossana",
        addressRegion: "SNNPR",
        addressCountry: "ET",
      },
      geo: { "@type": "GeoCoordinates", latitude: 7.5667, longitude: 37.85 },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://apex-solution.vercel.app/#website",
      url: "https://apex-solution.vercel.app",
      name: "Apex Solution",
      publisher: { "@id": "https://apex-solution.vercel.app/#organization" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash on load */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t = localStorage.getItem('apex-theme') || 'dark';
            document.documentElement.classList.add(t);
          })()
        `}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), sans-serif", backgroundColor: "var(--apex-bg)", color: "var(--apex-text-primary)" }}
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
