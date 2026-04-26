export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A]">
      {/* Hero skeleton */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
          <div className="h-5 w-48 rounded-full bg-white/5 animate-pulse" />
          <div className="h-16 w-full rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-16 w-3/4 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-5 w-96 rounded-full bg-white/5 animate-pulse" />
          <div className="flex gap-4">
            <div className="h-12 w-40 rounded-xl bg-blue-600/20 animate-pulse" />
            <div className="h-12 w-40 rounded-xl bg-white/5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
