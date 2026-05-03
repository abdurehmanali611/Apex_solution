import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A]">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.08),transparent)] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo with pulse ring */}
        <div className="relative flex items-center justify-center">
          {/* Outer pulse ring */}
          <span className="absolute w-24 h-24 rounded-full bg-[#F5A623]/10 animate-ping" />
          {/* Inner glow ring */}
          <span className="absolute w-20 h-20 rounded-full border border-[#F5A623]/20 animate-pulse" />
          {/* Logo */}
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[#F5A623]/30 shadow-lg shadow-[#F5A623]/10">
            <Image
              src="/apex-icon-amber.svg"
              alt="Apex Solution"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Wordmark */}
        <Image
          src="/apex-logo-dark-bg.svg"
          alt="Apex Solution"
          width={140}
          height={35}
          className="h-8 w-auto opacity-80"
          priority
        />

        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#F5A623]/60 animate-dot-bounce"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
