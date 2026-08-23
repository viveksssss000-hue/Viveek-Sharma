import Link from "next/link";
import { Fragment } from "react";

import { ChecklistForm } from "@/components/forms/ChecklistForm";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { microcopy, routes } from "@/content/global";
import { blogIndex } from "@/content/pilot";
import { formatPostDate, type Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

/**
 * The blog index (spec 7.8.1).
 *
 * Newest first, with no category filters and no tags at launch: with fewer than
 * twenty articles, filters are empty furniture. The data model carries a
 * `category` field already so PHASE 2 filters need no migration.
 *
 * Pagination after twelve articles, using real links with page numbers - not
 * infinite scroll, which is bad for search engines and for accessibility.
 *
 * The checklist signup appears once, after the sixth card.
 */

export const POSTS_PER_PAGE = 12;

export function BlogIndex({
  posts,
  page,
  totalPages,
}: {
  posts: Post[];
  page: number;
  totalPages: number;
}) {
  const isFirstPage = page === 1;

  return (
    <>
      <section className="bg-paper">
        <div className="gutter mx-auto max-w-content pt-12 pb-12 lg:pt-24 lg:pb-16">
          <div className="max-w-text">
            <h1>{blogIndex.h1}</h1>
            <p className="mt-6 measure text-lead text-ink-muted">
              {blogIndex.intro}
            </p>
            {!isFirstPage && (
              <p className="mt-4 text-small text-ink-muted">
                Page {page} of {totalPages}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper pb-16 lg:pb-24">
        <div className="gutter mx-auto max-w-content">
          {posts.length === 0 ? (
            <div className="max-w-text">
              <p className="measure text-body">{blogIndex.empty}</p>
              <div className="mt-10 rounded-[12px] border border-border bg-sand p-6 lg:p-8">
                <ChecklistBlock />
              </div>
            </div>
          ) : (
            <>
              <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <Fragment key={post.slug}>
                    <li>
                      <ArticleCard post={post} />
                    </li>

                    {/* Once, after the sixth card. */}
                    {isFirstPage && index === 5 && (
                      <li className="rounded-[12px] border border-border bg-sand p-6 md:col-span-2 lg:col-span-3 lg:p-8">
                        <div className="max-w-text">
                          <ChecklistBlock location="blog_index" />
                        </div>
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>

              {totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

function ArticleCard({ post }: { post: Post }) {
  return (
    <Link
      href={`${routes.blog}/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-border bg-surface shadow-rest transition-[border-color,box-shadow] duration-150 hover:border-fern hover:shadow-lift"
    >
      <PlaceholderImage
        src={post.image}
        alt={post.imageAlt ?? ""}
        width={800}
        height={450}
        note="Article thumbnail, 800x450."
        rounded={false}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      />

      <div className="flex flex-1 flex-col p-6">
        <p className="text-small text-ink-muted">
          {formatPostDate(post.date)} · {post.readingMinutes} min read
        </p>
        <h3 className="mt-2 font-sans text-h4 font-semibold">{post.title}</h3>
        <p className="mt-3 text-body text-ink-muted">{post.description}</p>
      </div>
    </Link>
  );
}

function ChecklistBlock({
  location = "blog_index",
}: {
  location?: "blog_index";
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12">
      <div>
        <h2 className="text-h3">{microcopy.checklistHeading}</h2>
        <p className="mt-3 text-body text-ink-muted">
          {microcopy.checklistBody}
        </p>
      </div>
      <ChecklistForm location={location} />
    </div>
  );
}

/** Real links with page numbers, so a crawler can follow them. */
function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const href = (n: number) => (n === 1 ? routes.blog : `${routes.blog}/page/${n}`);

  return (
    <nav aria-label="Pagination" className="mt-16">
      <ul className="flex flex-wrap items-center gap-2">
        {page > 1 && (
          <li>
            <Link
              href={href(page - 1)}
              rel="prev"
              className="flex min-h-11 items-center rounded-[10px] border border-border px-4 text-body hover:border-fern"
            >
              Previous
            </Link>
          </li>
        )}

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((n) => (
          <li key={n}>
            <Link
              href={href(n)}
              aria-current={n === page ? "page" : undefined}
              className={cn(
                "flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border px-4 text-body",
                n === page
                  ? "border-fern bg-fern text-paper"
                  : "border-border hover:border-fern"
              )}
            >
              {n}
            </Link>
          </li>
        ))}

        {page < totalPages && (
          <li>
            <Link
              href={href(page + 1)}
              rel="next"
              className="flex min-h-11 items-center rounded-[10px] border border-border px-4 text-body hover:border-fern"
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
