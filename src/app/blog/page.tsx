import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { posts } from "@/lib/posts";

export const metadata: Metadata = buildMetadata({
  title: "Blog - Back-Office Automation, in plain English | tryacowork",
  description:
    "Practical, jargon-free writing on automating your bookkeeping, bills and back-office: month-end close, AP, onboarding and the hours they give back. From tryacowork.",
  path: "/blog",
});

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="container-content py-12 md:py-16">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Blog"
            title="Automation, in plain English"
            description="Practical writing on automating the bookkeeping, bills and back-office that slow your business down - no jargon, no hype."
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-content">
          <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="surface-card surface-interactive group flex flex-col gap-3 rounded-xl p-7 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="font-mono text-xs text-subtle">
                  {formatDate(post.date)} · {post.readingMins} min read
                </span>
                <h2 className="text-lg font-semibold text-foreground">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
