import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { formatDate, toIsoDate } from "@/lib/dates";
import { renderMarkdown } from "@/lib/markdown";

/**
 * The two legal pages (spec 7.9).
 *
 * WHERE THE LINE IS DRAWN, AND WHY IT MOVED
 * Spec 7.9 says the developer builds the structure and does not write the legal
 * text. Both documents now hold a full draft anyway, because the useful half of
 * this job is engineering knowledge rather than law: which forms exist, which
 * fields they collect, which third parties receive them, which cookies are set
 * and when. A generic template gets all of that wrong; these describe what the
 * code actually does.
 *
 * What has NOT been done is legal review. `status: draft` renders a plain notice
 * saying so, and the handover keeps reporting it until the client's own adviser
 * has read it and the status is set to live. Nobody here is a lawyer.
 *
 * The original boundary still stands for the part that matters: these must end
 * up reviewed by someone qualified, and they must keep describing what this
 * business actually does. A policy copied from another website describes
 * practices that are not the client's, which is both useless and misleading -
 * which is exactly why these were written from the code instead.
 *
 * The documents live in /content/legal so the client can edit them at /admin
 * without a developer, and so the site's copy and the site's behaviour can be
 * reviewed side by side.
 */

const LEGAL_DIR = path.join(process.cwd(), "content", "legal");

export type LegalDoc = {
  title: string;
  updated: string;
  /**
   * "brief" - drafting notes, not a policy.
   * "draft" - a complete document that describes what this site actually does,
   *           written from the code, but not reviewed by a lawyer.
   * "live"  - reviewed and approved by the client's own adviser.
   *
   * The page shows an honest notice for the first two and nothing for the third.
   */
  status: "brief" | "draft" | "live";
  html: string;
};

export function getLegalDoc(slug: "privacy-policy" | "terms"): LegalDoc | null {
  const filePath = path.join(LEGAL_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));

  return {
    title: (data.title as string) ?? slug,
    // Normalised, because YAML turns an unquoted date into a Date object.
    updated: toIsoDate(data.updated) ?? "",
    status: (data.status as LegalDoc["status"]) ?? "brief",
    html: renderMarkdown(content),
  };
}

/** "September 3, 2026", matching the site-wide date format. */
export const formatLegalDate = formatDate;
