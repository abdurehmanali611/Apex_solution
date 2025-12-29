"use client";
import SectionHeader from "./SectionHeader";
import PortfolioItem from "./PortfolioItem";
import { useState } from "react";
import { portfolioButton } from "@/constants";
import { Button } from "./ui/button";

interface portfolio {
  image: string;
  type: string;
  title: string;
}

interface portfolioProp {
  portfolios: portfolio[];
}

export default function PortfolioGrid({ portfolios }: portfolioProp) {
  const [selectedType, setSelectedType] = useState<string>("All");

  const filteredContents = portfolios.filter((portfolio) => {
    if (selectedType === "All") {
      return true;
    }
    return portfolio.type === selectedType;
  });

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            subtitle="Our Portfolio"
            title="Discover Our Amazing Work"
          />

          <div className="flex flex-col gap-10">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 px-4">
              {portfolioButton.map((item) => (
                <Button
                  key={item.id}
                  variant={selectedType === item.name ? "default" : "outline"}
                  onClick={() => setSelectedType(item.name)}
                  className={`
                    cursor-pointer transition-all duration-300
                    px-6 py-3 rounded-full font-medium text-sm md:text-base
                    hover:scale-105 hover:shadow-lg active:scale-95
                    ${
                      selectedType === item.name
                        ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "hover:border-blue-500 hover:text-blue-600"
                    }
                  `}
                >
                  {item.name}
                </Button>
              ))}
            </div>

            {/* Portfolio Grid */}
            {filteredContents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
                {filteredContents.map((portfolio: portfolio, idx: number) => (
                  <div
                    key={idx}
                    className="group relative transform transition-all duration-500 hover:-translate-y-2"
                    style={{
                      animationDelay: `${idx * 100}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <PortfolioItem
                      image={portfolio.image}
                      title={portfolio.title}
                      type={portfolio.type}
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
    </div>
  );
}
