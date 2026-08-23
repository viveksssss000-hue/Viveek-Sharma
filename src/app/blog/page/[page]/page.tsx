import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { BlogIndex, POSTS_PER_PAGE } from "@/components/sections/BlogIndex";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { routes } from "@/content/global";
import { getPublishedPosts } from "@/lib/posts";
import { meta } from "@/content/seo";
import { site } from "@/lib/site";

type Params = { params: Promise<{ page: string }> };

/**
 * Paginated blog index (spec 7.8.1 and 10.4).
 *
 * Each paginated page canonicalises to ITSELF, not to page one - pointing them
 * all at page one hides the articles on pages two and beyond from search.
 */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { page } = await params;
  const entry = meta[routes.blog];
  const url = `${site.url}${routes.blog}/page/${page}`;

  return {
    title: { absolute: `${entry.title} - Page ${page}` },
    description: entry.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${entry.title} - Page ${page}`,
      description: entry.description,
      url,
    },
  };
}

export function generateStaticParams() {
  const total = Math.ceil(getPublishedPosts().length / POSTS_PER_PAGE);
  // Page 1 is served by /blog itself, so start at 2.
  return Array.from({ length: Math.max(0, total - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export default async function BlogPaginatedPage({ params }: Params) {
  const { page: pageParam } = await params;
  const page = Number(pageParam);

  // /blog/page/1 is a duplicate of /blog, so send it there permanently rather
  // than serving the same content at two URLs.
  if (page === 1) redirect(routes.blog);
  if (!Number.isInteger(page) || page < 1) notFound();

  const posts = getPublishedPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  if (page > totalPages) notFound();

  const start = (page - 1) * POSTS_PER_PAGE;

  return (
    <>
      <BlogIndex
        posts={posts.slice(start, start + POSTS_PER_PAGE)}
        page={page}
        totalPages={totalPages}
      />
      <ClosingCTA />
      <BreadcrumbSchema trail={[{ name: "Resources", path: routes.blog }]} />
    </>
  );
}
