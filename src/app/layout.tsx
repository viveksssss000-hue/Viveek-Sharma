import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AI Bookkeeping & Accounting Automation | Acowork",
    template: "%s | Acowork",
  },
  description:
    "Acowork builds secure AI automations for accounting & bookkeeping — reconciliation, invoices, AP/AR and reporting. Serving SMBs in the US & EU.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
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
        {/* Analytics (GA4) + Consent banner are wired in Phase 5. */}
      </body>
    </html>
  );
}
