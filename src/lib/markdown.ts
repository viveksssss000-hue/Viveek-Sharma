import { marked } from "marked";

/**
 * Markdown to HTML, for blog articles and the two legal pages.
 *
 * WHY THIS POST-PROCESSES THE HTML INSTEAD OF OVERRIDING marked's RENDERER
 * A custom renderer looked like the tidy way to add heading ids and wrap
 * tables, but marked's renderer methods depend on `this.parser`, which is only
 * attached while parsing - so a bound override throws at render time. And
 * `marked.use()` mutates a module-level singleton, so one page's override
 * silently changes every other page's rendering. Two small string passes over
 * the output are less clever and cannot break either way.
 */

/** "Why we only do bookkeeping" -> "why-we-only-do-bookkeeping" */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

/** Decodes the handful of entities marked emits, so slugs read cleanly. */
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "’");
}

export function headingText(rawInnerHtml: string): string {
  return decodeEntities(stripTags(rawInnerHtml)).trim();
}

/**
 * Adds ids to H2 and H3 so the table of contents can link to them and
 * in-article anchors survive an edit, then wraps every table in its own
 * horizontally scrolling container so a wide table can never make the page
 * scroll sideways (spec 0.3 and 7.8.2).
 */
function enhance(html: string): string {
  const withIds = html.replace(
    /<(h[23])>([\s\S]*?)<\/\1>/g,
    (_match, tag: string, inner: string) =>
      `<${tag} id="${slugifyHeading(headingText(inner))}">${inner}</${tag}>`
  );

  return withIds.replace(
    /<table>[\s\S]*?<\/table>/g,
    (table) =>
      `<div class="table-scroll" tabindex="0" role="group" aria-label="Table, scrollable">${table}</div>`
  );
}

export function renderMarkdown(source: string): string {
  return enhance(marked.parse(source, { async: false, gfm: true }) as string);
}

/** The H2 headings, in order, for the table of contents. */
export function extractToc(source: string): { id: string; text: string }[] {
  return [...source.matchAll(/^##\s+(.+)$/gm)].map((match) => {
    const text = match[1].trim();
    return { text, id: slugifyHeading(text) };
  });
}
