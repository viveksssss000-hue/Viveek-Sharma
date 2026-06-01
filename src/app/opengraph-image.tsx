import { ImageResponse } from "next/og";

export const alt = "Acowork — AI bookkeeping & accounting automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social-share image, generated at build (no binary asset needed). */
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
          background: "#0B2545",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#0D9488",
              color: "#ffffff",
              fontSize: 40,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            A
          </div>
          <div style={{ color: "#ffffff", fontSize: 44, fontWeight: 700 }}>
            Acowork
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            AI bookkeeping &amp; accounting automation
          </div>
          <div style={{ color: "#94A3B8", fontSize: 30 }}>
            Secure, accurate, done for you · Serving the US &amp; EU
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
