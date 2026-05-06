"use client";
import { useState, useMemo } from "react";
import PortfolioGrid from "./PortfolioGrid";
import { portFolioTypes } from "@/constants";
import { Search, X } from "lucide-react";

interface Portfolio {
  id?: number;
  link?: string;
  type: string;
  title: string;
  description: string;
  special?: boolean;
  duration: number;
  image?: string;
  version?: number;
}

export default function PortfolioPageClient({ portfolios }: { portfolios: Portfolio[] }) {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");

  const types = ["All", ...portFolioTypes.map((t) => t.name)];

  const filtered = useMemo(() => {
    return portfolios.filter((p) => {
      const matchesType = activeType === "All" || p.type === activeType;
      const q = search.toLowerCase();
      const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [portfolios, activeType, search]);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-16 z-30 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-auto sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl bg-[#111111] border border-white/8 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-blue-500/50 w-full min-w-0 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeType === type
                    ? "bg-blue-600 text-white border border-blue-500"
                    : "bg-[#111111] text-[#71717A] border border-white/8 hover:text-white hover:border-white/20"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <p className="text-xs text-[#71717A]">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <PortfolioGrid portfolios={filtered} />
    </div>
  );
}
