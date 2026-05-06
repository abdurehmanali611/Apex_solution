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
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <div className={`flex flex-col gap-4 mb-12 ${alignClass} ${className}`}>
      {subtitle && (
        <span className="eyebrow">{subtitle}</span>
      )}
      {title && (
        <h2 className="section-heading text-white max-w-3xl text-balance">
          {title}
        </h2>
      )}
      {description && (
        <p
          className="text-[#A1A1AA] text-base leading-[1.75] max-w-2xl text-pretty px-1 sm:px-0"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}
