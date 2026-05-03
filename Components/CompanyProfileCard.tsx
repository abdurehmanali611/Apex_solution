"use client";
import { FileDown, ExternalLink } from "lucide-react";

export default function CompanyProfileCard() {
  return (
    <div className="group relative w-56 rounded-2xl bg-[#111111] border border-white/8 overflow-hidden transition-all duration-300 hover:border-[#F5A623]/30 hover:shadow-2xl hover:shadow-[#F5A623]/8 flex flex-col">

      {/* ── Title bar ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex flex-col gap-0.5">
          <p
            className="text-xs font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            Company Profile
          </p>
          <p className="text-[10px] text-[#71717A]">Apex Solution · 2025</p>
        </div>
        <span className="px-1.5 py-0.5 rounded-md bg-[#F5A623]/90 text-[#0A0A0A] text-[9px] font-bold uppercase tracking-widest shrink-0">
          PDF
        </span>
      </div>

      {/* ── PDF first page preview — portrait, no scroll ── */}
      <div className="relative w-full bg-white" style={{ height: "198px" }}>
        <iframe
          src="/apex-company-profile.pdf#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitV"
          className="absolute inset-0 w-full border-0 pointer-events-none"
          style={{ height: "198px" }}
          title="Company Profile preview"
          loading="lazy"
          scrolling="no"
        />
        {/* Prevent any accidental scroll interaction */}
        <div className="absolute inset-0 pointer-events-none" />
      </div>

      {/* ── Actions ── */}
      <div className="flex items-center gap-2 p-3 border-t border-white/5">
        <a
          href="/apex-company-profile.pdf"
          download
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-[#0A0A0A] transition-all duration-200 hover:scale-105 active:scale-95 btn-shimmer"
          style={{ background: "linear-gradient(135deg, #F5A623 0%, #E8940F 100%)" }}
        >
          <FileDown className="w-3.5 h-3.5" />
          Download
        </a>
        <a
          href="/apex-company-profile.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in new tab"
          className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-[#71717A] hover:text-white hover:border-white/20 transition-all duration-200 shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
