import type { Metadata, Viewport } from "next";
import { Archivo, Spectral } from "next/font/google";

import "./globals.css";

import { Analytics } from "@/components/analytics/Analytics";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/JsonLd";
import { microcopy } from "@/content/global";
import { meta } from "@/content/seo";
import { searchSettings } from "@/lib/settings";
import { site } from "@/lib/site";

/**
 * Fonts are self-hosted by next/font at build time (spec 4.2.1 prefers
 * self-hosting): the files are served from this domain, so there is no
 * connection to fonts.googleapis.com or fonts.gstatic.com at all, and no
 * preconnect is needed. Only the weights the design system uses are loaded -
 * every extra weight costs page speed.
 */
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-spectral",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
});

const home = meta["/"];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: home.title, template: "%s" },
  description: home.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: home.title,
    description: home.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  /**
   * Search-console ownership, when a token has been entered in settings. Both
   * keys are omitted entirely while empty - Next renders no tag for undefined,
   * and an empty one reads to Google as a failed verification.
   *
   * Verifying is what unlocks "Request indexing", which is the only way to ask
   * Google to recrawl a page rather than wait for it.
   */
  verification: {
    ...(searchSettings.google ? { google: searchSettings.google } : {}),
    ...(searchSettings.bing ? { other: { "msvalidate.01": searchSettings.bing } } : {}),
  },
  // The favicon and the Apple touch icon come from app/icon.png and
  // app/apple-icon.png, which Next.js links automatically, so there is no
  // hand-written icon list here to fall out of step with the files.
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${spectral.variable} ${archivo.variable}`}>
      <body>
        {/* The skip link is the first focusable element on every page
            (spec 9.5), visually hidden until it takes focus. */}
        <a href="#main" className="sr-only-focusable">
          {microcopy.skipLink}
        </a>

        {/* Reading progress, drawn by a CSS scroll timeline - zero
            JavaScript. Hidden under reduced motion and in browsers without
            scroll timelines (see globals.css). */}
        <div className="scroll-progress" aria-hidden="true" />

        <Header />

        {/* Bottom padding clears the 68px sticky mobile bar plus 16px, so the
            bar can never cover the footer or a last line of text (spec 6.2). */}
        <main id="main" className="pb-[84px] md:pb-0">
          {children}
        </main>

        <Footer />

        <StickyMobileCTA />
        <ConsentBanner />
        <Analytics />

        <OrganizationSchema />
        <WebSiteSchema />
      </body>
    </html>
  );
}
