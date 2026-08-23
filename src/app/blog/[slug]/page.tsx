import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyLinkButton } from "@/components/blog/CopyLinkButton";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { routes } from "@/content/global";
import { blogIndex } from "@/content/pilot";
import {
  formatPostDate,
  getPost,
  getPublishedPosts,
  getRelatedPosts,
} from "@/lib/posts";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

/**
 * The blog article template (spec 7.8.2).
 *
 * Single column, text held to 720px, no sidebar - a sidebar halves the reading
 * width for no benefit on a site with no advertising. Body copy is set slightly
 * looser than the rest of the site because articles are read, not scanned.
 *
 * The author block matters for search-engine trust signals and for human trust,
 * which is why every article is attributed to a person rather than to the firm.
 */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${site.url}${routes.blog}/${post.slug}`;
  const title = post.metaTitle ?? `${post.title} | tryACOwork`;

  return {
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: site.name,
      title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description: post.description },
  };
}

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const author = post.author ?? site.founder.name;
  const authorRole = post.authorRole ?? site.founder.role;
  // A table of contents only earns its space on a long article.
  const showToc = post.wordCount > 1200 && post.toc.length > 2;

  return (
    <>
      <article className="bg-paper">
        <div className="gutter mx-auto max-w-text py-12 lg:py-16">
          {/* A visible breadcrumb is required on articles (spec 10.5). */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-small text-ink-muted">
              <li>
                <Link href={routes.home} className="underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={routes.blog} className="underline-offset-4 hover:underline">
                  Resources
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {post.title}
              </li>
            </ol>
          </nav>

          <p className="mt-8 text-small text-ink-muted">
            {formatPostDate(post.date)} · {post.readingMinutes} min read
          </p>

          <h1 className="mt-3">{post.title}</h1>

          {/* Author block, directly under the title. */}
          <div className="mt-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-full bg-sand-deep font-sans text-small font-semibold text-ink"
            >
              {author
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </span>
            <p className="text-small">
              <span className="font-semibold">{author}</span>
              <span className="block text-ink-muted">{authorRole}</span>
            </p>
          </div>

          {post.image && (
            <div className="mt-10">
              <PlaceholderImage
                src={post.image}
                alt={post.imageAlt ?? ""}
                width={800}
                height={450}
                priority
                sizes="(min-width: 768px) 720px, 100vw"
              />
            </div>
          )}

          {showToc && (
            <nav
              aria-labelledby="toc-heading"
              className="mt-10 rounded-[12px] border border-border bg-surface p-6"
            >
              <h2 id="toc-heading" className="font-sans text-h4 font-semibold">
                In this article
              </h2>
              <ol className="mt-4 grid gap-2">
                {post.toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-body text-fern underline decoration-1 underline-offset-4 hover:decoration-2"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Markdown authored by the client, rendered at build time. */}
          <div
            className="prose-article mt-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* No third-party share widgets: they are slow and they track
              readers. A copy-link button is enough (spec 7.8.2). */}
          <div className="mt-12 border-t border-border pt-8">
            <CopyLinkButton url={`${site.url}${routes.blog}/${post.slug}`} />
          </div>

          {/* The standard end-of-article call to action, same copy on every
              article (spec 7.8.2). */}
          <div className="mt-12 rounded-[12px] border border-border bg-sand p-6 lg:p-8">
            <h2 className="text-h3">{blogIndex.articleCta.heading}</h2>
            <p className="mt-3 measure text-body">{blogIndex.articleCta.body}</p>
            <div className="mt-6">
              <Button asChild full className="sm:w-auto">
                <Link href={routes.bookACall}>
                  {blogIndex.articleCta.buttonLabel}
                </Link>
              </Button>
            </div>
          </div>

          {/* Every article links to the Services page and the booking page
              (spec 5.4), plus two related articles chosen manually. */}
          <div className="mt-12">
            <h2 className="text-h3">Read next</h2>
            <ul className="mt-4 grid gap-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`${routes.blog}/${item.slug}`}
                    className="group inline-flex min-h-11 items-center gap-2 text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
                  >
                    {item.title}
                    <ArrowRightIcon
                      size={18}
                      className="transition-transform duration-150 group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={routes.services}
                  className="group inline-flex min-h-11 items-center gap-2 text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
                >
                  See how our dedicated bookkeeping works
                  <ArrowRightIcon
                    size={18}
                    className="transition-transform duration-150 group-hover:translate-x-1"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </article>

      <ClosingCTA />

      <ArticleSchema
        headline={post.title}
        description={post.description}
        slug={post.slug}
        datePublished={post.date}
        dateModified={post.updated ?? post.date}
        image={post.image}
        authorName={author}
      />
      <BreadcrumbSchema
        trail={[
          { name: "Resources", path: routes.blog },
          { name: post.title, path: `${routes.blog}/${post.slug}` },
        ]}
      />
    </>
  );
}
