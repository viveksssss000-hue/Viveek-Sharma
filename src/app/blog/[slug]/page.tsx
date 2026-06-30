import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { posts, type PostBlock } from "@/lib/posts";
import { site } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDesc,
    path: `/blog/${post.slug}`,
    noindex: post.noindex,
  });
}

function Block({ block }: { block: PostBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="mt-10 text-2xl font-semibold text-foreground">
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="mt-4 space-y-2.5 pl-1">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-muted-foreground">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="mt-4 text-muted-foreground leading-relaxed">{block.text}</p>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDesc,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${site.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <article className="section-y">
        <div className="container-content max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden="true" />
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
            </ol>
          </nav>

          <span className="font-mono text-xs text-subtle">
            {formatDate(post.date)} · {post.readingMins} min read
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-8">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          <div className="mt-12 border-t border-border pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              All posts
            </Link>
          </div>
        </div>
      </article>

      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
