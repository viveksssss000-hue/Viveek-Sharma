import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ListChecks } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { serviceIcons } from "@/components/sections/ServicesOverview";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "What We Automate — Accounting Automation Services | Acowork",
  description:
    "Acowork automates bookkeeping, invoices & AP, accounts receivable, and financial reporting — securely, accurately, and done for you. Book a demo.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="section-y">
        <div className="container-content">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Services"
            title="What we automate"
            description="Four focused automations for the accounting work that slows your team down — each built securely, integrated with your tools, and reviewed by a human."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {services.map((s) => {
              const Icon = serviceIcons[s.slug] ?? ListChecks;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="grid size-11 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="text-xl font-semibold text-foreground">
                    {s.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.outcome}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
