import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { serviceIcons } from "@/components/sections/ServicesOverview";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Services - AI Workflow Automation | tryacowork",
  description:
    "Workflow audit, custom AI workflows, integration & handoff, continuous optimization - designed, built and run end-to-end. Book a demo.",
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
            title="Designed, built and run - end to end"
            description="We don't hand you software and walk away. Every engagement moves through the same arc: find the time-sink, automate it, and keep it sharp."
          />
          <div className="reveal-stagger mt-12 grid gap-6 sm:grid-cols-2">
            {services.map((s) => {
              const Icon = serviceIcons[s.slug] ?? Search;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="surface-card surface-interactive group flex flex-col gap-3 rounded-xl p-7 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="text-xl font-semibold text-foreground">
                    {s.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.outcome}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary">
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
