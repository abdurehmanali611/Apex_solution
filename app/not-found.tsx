import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-8 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.08),transparent)]" />

      <div className="relative flex flex-col items-center gap-6">
        <Image
          src="/apex-logo-stacked.svg"
          alt="Apex Solution"
          width={100}
          height={69}
          className="h-16 w-auto opacity-60 mb-2"
        />
        <span
          className="text-[120px] md:text-[180px] font-bold leading-none gradient-text"
          style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.05em" }}
        >
          404
        </span>
        <h2
          className="text-2xl md:text-3xl font-bold text-white"
          style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
        >
          Page Not Found
        </h2>
        <p className="text-[#A1A1AA] max-w-md text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 btn-shimmer hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
