import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Toaster } from "@/components/ui/sonner";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { Analytics } from "@/components/analytics/Analytics";
import { SiteJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/content";

// Body face - calm and highly legible for long-form reading.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display face - geometric character for headings and the wordmark.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AI Workflow Automation for Small Teams | tryacowork",
    template: "%s | tryacowork",
  },
  description:
    "tryacowork turns complex, manual work into AI workflows that run on their own - designed, built and run end-to-end for small teams. Workflows, automated.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        {/* Google Consent Mode v2 - default everything to denied until the
            user opts in via the cookie banner. Runs before GA loads. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Spacer so the fixed mobile CTA never covers footer content */}
        <div aria-hidden="true" className="h-16 md:hidden" />
        <StickyMobileCTA />
        <Toaster position="top-center" richColors />
        <ConsentBanner />
        <ScrollReveal />
        <SiteJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
