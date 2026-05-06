import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Apex Solution — AI-Powered Software & Tech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 600,
            background:
              "radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            position: "relative",
            zIndex: 1,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              borderRadius: 999,
              border: "1px solid rgba(37,99,235,0.3)",
              background: "rgba(37,99,235,0.1)",
              color: "#93C5FD",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Ethiopia&apos;s AI-First Technology Company
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
            }}
          >
            Apex Solution
          </div>

          {/* Sub */}
          <div
            style={{
              fontSize: 28,
              color: "#A1A1AA",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            Software · Networks · Hotel Tech · AI
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 48, marginTop: 16 }}>
            {[
              { value: "10+", label: "Years" },
              { value: "50+", label: "Projects" },
              { value: "20+", label: "Clients" },
            ].map((s) => (
              <div
                key={s.label}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
              >
                <span style={{ fontSize: 40, fontWeight: 800, color: "#FFFFFF" }}>{s.value}</span>
                <span style={{ fontSize: 13, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.15em" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            color: "#71717A",
            fontSize: 14,
            letterSpacing: "0.1em",
          }}
        >
          www.apexsolutionhub.com
        </div>
      </div>
    ),
    { ...size }
  );
}
