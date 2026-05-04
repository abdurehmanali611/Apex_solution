import Image from "next/image";
import SectionHeader from "./SectionHeader";

interface Partner {
  image: string;
  title: string;
  description: string;
}

function PartnerTile({ image, title }: { image: string; title: string }) {
  return (
    <div className="mx-3 flex-shrink-0 rounded-2xl border border-white/8 hover:border-blue-500/30 transition-colors duration-300 overflow-hidden w-24 h-24 partner-tile cursor-pointer">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
  );
}

const MASK =
  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)";

export default function PartnerGrid({
  partners,
  screen,
}: {
  partners: Partner[];
  screen: "Home" | "Partner";
}) {
  // Repeat 6× so the track is always wide enough to scroll seamlessly
  const forward = Array.from({ length: 6 }, () => partners).flat();
  const reverse = Array.from({ length: 6 }, () => [...partners].reverse()).flat();

  return (
    <section className="section-padding px-0 overflow-hidden bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          subtitle="Partners"
          title="Our Trusted Partners"
          description="Companies and organizations we collaborate with to deliver world-class solutions."
        />
      </div>

      {screen === "Home" && partners.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          {/* Row 1 — left to right */}
          <div
            className="relative overflow-hidden group"
            style={{ maskImage: MASK, WebkitMaskImage: MASK }}
          >
            <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
              {forward.map((p, i) => (
                <PartnerTile key={i} image={p.image} title={p.title} />
              ))}
            </div>
          </div>

          {/* Row 2 — right to left */}
          <div
            className="relative overflow-hidden group"
            style={{ maskImage: MASK, WebkitMaskImage: MASK }}
          >
            <div className="flex animate-marquee-reverse group-hover:[animation-play-state:paused]">
              {reverse.map((p, i) => (
                <PartnerTile key={i} image={p.image} title={p.title} />
              ))}
            </div>
          </div>
        </div>
      )}

      {screen === "Partner" && (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-[#111111] border border-white/8 card-hover overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <h3
                  className="text-base font-semibold text-white"
                  style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm text-[#71717A] leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
