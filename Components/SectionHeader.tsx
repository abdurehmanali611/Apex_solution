interface SectionHeaderProps {
  subtitle?: string;
  title?: string;
  description?: string | null;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  subtitle = "",
  title = "",
  description = null,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignClass} ${className}`}>
      {subtitle && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          <span className="w-6 h-px bg-blue-500" />
          {subtitle}
          <span className="w-6 h-px bg-blue-500" />
        </span>
      )}
      {title && (
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
          style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
      )}
      {description && (
        <p
          className="text-[#A1A1AA] text-base leading-relaxed max-w-2xl"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}
