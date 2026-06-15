import { ImageResponse } from "next/og";

export const alt = "tryacowork - Workflows, automated.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social-share image in the Flowline identity, generated at build. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070B",
          backgroundImage:
            "radial-gradient(80% 70% at 85% 0%, rgba(124,92,255,.25), rgba(31,227,214,.05) 50%, transparent 70%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Flowline node-path mark */}
          <svg width="72" height="72" viewBox="0 0 78 78" fill="none">
            <rect
              x="2"
              y="2"
              width="74"
              height="74"
              rx="17"
              stroke="rgba(124,92,255,.5)"
              strokeWidth="2"
            />
            <path
              d="M16 50 L32 50 L40 30 L48 50 L62 50"
              stroke="#1FE3D6"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="50" r="5" fill="#7C5CFF" />
            <circle cx="40" cy="30" r="5" fill="#1FE3D6" />
            <circle cx="62" cy="50" r="5.5" fill="#C9FF3D" />
          </svg>
          <div style={{ display: "flex", color: "#ECECF3", fontSize: 46, fontWeight: 700 }}>
            try
            <span style={{ color: "#C9FF3D" }}>a</span>
            cowork
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              color: "#ECECF3",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 980,
              letterSpacing: "-0.02em",
            }}
          >
            Workflows, automated.
          </div>
          <div style={{ color: "#8A8A99", fontSize: 30 }}>
            We turn complex, manual work into AI workflows that run on their own.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
