import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

import { pricing, usd } from "@/lib/site";

/**
 * The default Open Graph image (spec 10.4), 1200x630.
 *
 * MUST NOT be the logo on a white square, which looks unfinished when shared.
 * So this is a designed card in the brand's own ink and ochre, carrying the
 * tagline and the published price - the two things that make someone click.
 *
 * Fonts are read from disk at build time rather than fetched, so image
 * generation does not depend on a network call and the Content-Security-Policy
 * needs no font host.
 *
 * An article can override this with its own image via the `image` front matter
 * field; this card is the site-wide default.
 */

export const alt =
  "tryACOwork - bookkeeping capacity for US accounting firms. From $1,600 a month, everything included.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT_DIR = path.join(process.cwd(), "src", "app", "_og-fonts");

export default async function OpengraphImage() {
  const [spectral, archivo] = await Promise.all([
    fs.readFile(path.join(FONT_DIR, "Spectral-SemiBold.ttf")),
    fs.readFile(path.join(FONT_DIR, "Archivo-Medium.woff")),
  ]);

  const ink = "#1B1A17";
  const paper = "#FAF8F4";
  const ochreLight = "#E0A95C";
  const stone = "#8A8478";

  // One string, not an interpolated fragment: satori treats each text run as a
  // separate child node and rejects a div with several children unless it is
  // explicitly a flex container.
  const priceLine = `From ${usd(pricing.fullTime)} a month. Everything included.`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: ink,
          padding: "72px",
        }}
      >
        {/* The lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: ochreLight,
              color: ink,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Archivo",
              fontSize: "22px",
              letterSpacing: "0.02em",
            }}
          >
            ACO
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontFamily: "Spectral",
              fontSize: "44px",
              color: paper,
            }}
          >
            <span>try</span>
            <span
              style={{
                fontFamily: "Archivo",
                fontSize: "34px",
                color: ochreLight,
                letterSpacing: "0.01em",
              }}
            >
              ACO
            </span>
            <span>work</span>
          </div>
        </div>

        {/* The message */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Spectral",
              fontSize: "72px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: paper,
              maxWidth: "900px",
            }}
          >
            Bookkeeping capacity for US accounting firms.
          </div>

          <div
            style={{
              marginTop: "28px",
              fontFamily: "Archivo",
              fontSize: "30px",
              color: ochreLight,
            }}
          >
            {priceLine}
          </div>
        </div>

        {/* The footer line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${stone}`,
            paddingTop: "28px",
            fontFamily: "Archivo",
            fontSize: "24px",
            color: stone,
          }}
        >
          <span>Dedicated bookkeepers in India, working only for your firm</span>
          <span style={{ color: paper }}>tryacowork.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Spectral", data: spectral, style: "normal", weight: 600 },
        { name: "Archivo", data: archivo, style: "normal", weight: 500 },
      ],
    }
  );
}
