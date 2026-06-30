import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { solutionIcons } from "@/components/sections/SolutionsTeaser";
import { buildMetadata } from "@/lib/seo";
import { solutions } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Solutions - Productized AI Automation Packages | tryacowork",
  description:
    "Ready-made AI automations for the back-office: month-end close, AP & bill capture, and client onboarding. Built and run for small businesses and the firms that serve them.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <section className="section-y">
        <div className="container-content">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Solutions"
            title="Ready-made automations for the back-office"
            description="Three productized workflows we build and run for small businesses and the firms that serve them. Each is scoped to how your business runs, then kept running for good."
          />
          <div className="reveal-stagger mt-12 grid gap-6 lg:grid-cols-3">
            {solutions.map((s) => {
              const Icon = solutionIcons[s.slug] ?? CalendarCheck;
              return (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="surface-card surface-interactive group flex flex-col gap-3 rounded-xl p-7 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="text-xl font-semibold text-foreground">
                    {s.name}
                  </h2>
                  <p className="font-medium text-foreground">{s.outcome}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.forWho}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    See the package
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
