import Image from "next/image";
import SectionHeader from "./SectionHeader";

interface Partner {
  image: string;
  title: string;
  description: string;
}

function PartnerTile({ image, title }: { image: string; title: string }) {
  return (
    <div className="mx-3 flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#111111] border border-white/8 hover:border-blue-500/30 hover:bg-[#161616] transition-all duration-300 group cursor-default w-52">
      <div className="relative w-10 h-10 shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
          sizes="40px"
        />
      </div>
      <span
        className="text-sm font-semibold text-[#71717A] group-hover:text-white transition-colors duration-300 whitespace-nowrap truncate"
        style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
      >
        {title}
      </span>
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
      <div className="max-w-7xl mx-auto px-6">
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
            className="relative overflow-hidden"
            style={{ maskImage: MASK, WebkitMaskImage: MASK }}
          >
            <div className="flex animate-marquee">
              {forward.map((p, i) => (
                <PartnerTile key={i} image={p.image} title={p.title} />
              ))}
            </div>
          </div>

          {/* Row 2 — right to left */}
          <div
            className="relative overflow-hidden"
            style={{ maskImage: MASK, WebkitMaskImage: MASK }}
          >
            <div className="flex animate-marquee-reverse">
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
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
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
