import { formatLegalDate, type LegalDoc } from "@/lib/legal";

/**
 * Layout for the two legal pages (spec 7.9.3).
 *
 * Single column, 720px measure, a "last updated" line under the H1, and body
 * text at 17px minimum - legal pages are where sites illegibly shrink their
 * type, and this one does not. No closing call-to-action band and no sticky
 * mobile bar. Indexable: the legal pages are not noindexed.
 *
 * While a document is still the drafting brief rather than the real policy, the
 * notice below says so plainly at the top. Passing a brief off as a policy
 * would be worse than having no page.
 */
export function LegalLayout({ doc }: { doc: LegalDoc }) {
  return (
    <section className="bg-paper">
      <div className="gutter mx-auto max-w-text py-12 lg:py-24">
        <h1>{doc.title}</h1>

        {doc.updated && (
          <p className="mt-4 text-small text-ink-muted">
            Last updated {formatLegalDate(doc.updated)}
          </p>
        )}

        {doc.status !== "live" && (
          <div className="mt-8 rounded-[12px] border border-border bg-sand-deep/40 p-6">
            <p className="text-small font-semibold uppercase tracking-[0.08em] text-ochre-text">
              {doc.status === "brief"
                ? "Not yet the final document"
                : "Draft, pending legal review"}
            </p>
            <p className="mt-3 measure text-body">
              {doc.status === "brief"
                ? "What follows is the drafting brief for this page, not a policy. The real document has to be written for this business and checked before the site goes live."
                : "This document was written from the site's own code, so it describes accurately what this website collects, where it goes and who receives it. It has not been reviewed by a lawyer. Have your own adviser check it before launch, then set its status to live to remove this notice."}
            </p>
          </div>
        )}

        <div
          className="prose-article mt-10"
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
      </div>
    </section>
  );
}
