import type { Metadata } from "next";

import { BlogIndex, POSTS_PER_PAGE } from "@/components/sections/BlogIndex";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { routes } from "@/content/global";
import { getPublishedPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.blog);

/** Blog index, page 1 (spec 7.8.1). Later pages live at /blog/page/[page]. */
export default function BlogPage() {
  const posts = getPublishedPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  return (
    <>
      <BlogIndex
        posts={posts.slice(0, POSTS_PER_PAGE)}
        page={1}
        totalPages={totalPages}
      />
      <ClosingCTA />
      <BreadcrumbSchema trail={[{ name: "Resources", path: routes.blog }]} />
    </>
  );
}
