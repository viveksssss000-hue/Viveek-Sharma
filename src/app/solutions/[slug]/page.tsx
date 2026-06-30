import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Gauge, Plug, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/CTASection";
import { TrackView } from "@/components/analytics/TrackView";
import { buildMetadata } from "@/lib/seo";
import { solutions, site } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return buildMetadata({
    title: solution.metaTitle,
    description: solution.metaDesc,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.name,
    description: solution.outcome,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: ["US", "EU"],
    serviceType: "AI workflow automation",
    url: `${site.url}/solutions/${solution.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: `${site.url}/solutions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: solution.name,
        item: `${site.url}/solutions/${solution.slug}`,
      },
    ],
  };

  return (
    <>
      <TrackView event="package_page_view" params={{ slug: solution.slug }} />
      {/* Hero - H1: package name + outcome; sub: who it's for + the result */}
      <section className="border-b border-border bg-background">
        <div className="container-content py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden="true" />
              <li>
                <Link href="/solutions" className="hover:text-primary">
                  Solutions
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden="true" />
              <li aria-current="page" className="font-medium text-foreground">
                {solution.name}
              </li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl">{solution.name}</h1>
            <p className="mt-4 text-xl font-medium text-foreground">
              {solution.outcome}
            </p>
            <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
              {solution.forWho}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="spark">
                <Link href="/contact">
                  Book your Workflow Audit
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What it does + What you get back */}
      <section className="section-y">
        <div className="container-content grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              What it does
            </h2>
            <ul className="mt-4 space-y-3">
              {solution.whatItDoes.map((step) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent/20 text-accent-foreground">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-base text-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card flex flex-col gap-3 rounded-xl p-7">
            <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
              <Gauge className="size-5" />
            </span>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              What you get back
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {solution.whatYouGetBack}
            </p>
          </div>
        </div>
      </section>

      {/* Works with */}
      <section className="bg-surface border-y border-border section-y">
        <div className="container-content">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
              <Plug className="size-5" />
            </span>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Works with
            </h2>
          </div>
          <ul className="reveal-stagger mt-6 flex flex-wrap gap-3">
            {solution.worksWith.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
