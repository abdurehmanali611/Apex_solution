"use client";
import SectionHeader from "./SectionHeader";
import PortfolioItem from "./PortfolioItem";

interface portfolio {
  link?: string;
  type: string;
  title: string;
  description: string;
  special?: boolean
  duration: number;
  image?: string
  version?: number
}

interface portfolioProp {
  portfolios: portfolio[];
}

export default function PortfolioGrid({ portfolios }: portfolioProp) {
  return (
    <div className="w-full py-12">
      <div className="px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            subtitle="Our Portfolio"
            title="Discover Our Amazing Work"
          />
          {portfolios.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {portfolios.map((portfolio: portfolio, idx: number) => (
                <div
                  key={idx}
                  className="group relative transform transition-all duration-500 hover:-translate-y-2"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <PortfolioItem
                    link={portfolio.link}
                    title={portfolio.title}
                    type={portfolio.type}
                    description={portfolio.description}
                    duration={portfolio.duration}
                    image={portfolio.image}
                    version={portfolio.version}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
