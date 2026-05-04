"use client";
import SectionHeader from "./SectionHeader";
import PortfolioItem from "./PortfolioItem";

interface Portfolio {
  link?: string;
  type: string;
  title: string;
  description: string;
  special?: boolean;
  duration: number;
  image?: string;
  version?: number;
}

export default function PortfolioGrid({ portfolios }: { portfolios: Portfolio[] }) {
  return (
    <section className="section-padding px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="Our Work"
          title="Projects We're Proud Of"
          description="A selection of real-world projects delivered across Ethiopia and beyond."
        />
        {portfolios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolios.map((p, idx) => (
              <div
                key={idx}
                className="animate-fade-up"
                style={{ animationDelay: `${idx * 80}ms`, animationFillMode: "both", opacity: 0 }}
              >
                <PortfolioItem {...p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#71717A]">
            <p className="text-lg">No projects found</p>
          </div>
        )}
      </div>
    </section>
  );
}
