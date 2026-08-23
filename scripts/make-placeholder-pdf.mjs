/**
 * Writes the placeholder for the checklist lead magnet.
 *
 * Spec 8.5 is explicit that the client supplies this document - "it is not the
 * developer's job to write it". But the download button, the thank-you page and
 * the autoresponder all link to it, and a 404 on the most-clicked link in a
 * lead magnet is worse than a missing document.
 *
 * So this writes a real, valid, one-page PDF that says plainly what it is: a
 * placeholder to be replaced before launch. If anyone ships without replacing
 * it, the failure is visible and honest rather than a broken link or, worse, a
 * document nobody wrote pretending to be advice.
 *
 *   node scripts/make-placeholder-pdf.mjs
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(
  process.cwd(),
  "public",
  "12-questions-offshore-bookkeeper-checklist.pdf"
);

const lines = [
  ["Helvetica-Bold", 20, "The 12 questions to ask before you"],
  ["Helvetica-Bold", 20, "hire an offshore bookkeeper"],
  ["", 0, ""],
  ["Helvetica-Bold", 12, "PLACEHOLDER - THIS DOCUMENT IS NOT FINISHED"],
  ["", 0, ""],
  ["Helvetica", 11, "This file exists so that every link to the checklist on the website"],
  ["Helvetica", 11, "resolves during the build and in staging. It is not the checklist."],
  ["", 0, ""],
  ["Helvetica", 11, "Before the site goes live, replace this file with the real one-page"],
  ["Helvetica", 11, "checklist, keeping the same file name so no link has to change:"],
  ["", 0, ""],
  ["Helvetica-Bold", 11, "public/12-questions-offshore-bookkeeper-checklist.pdf"],
  ["", 0, ""],
  ["Helvetica", 11, "It is linked from three places: the footer signup on every page, the"],
  ["Helvetica", 11, "signup inside the blog, and the download button on /thank-you-checklist."],
  ["Helvetica", 11, "The autoresponder emails the same URL."],
  ["", 0, ""],
  ["Helvetica", 11, "The promise the form makes is: one email, the checklist, and nothing"],
  ["Helvetica", 11, "else. Whatever replaces this file, that promise has to stay true, or"],
  ["Helvetica", 11, "the wording on the form has to change first."],
];

function escape(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

let y = 760;
const parts = ["BT"];
for (const [font, size, text] of lines) {
  if (!text) {
    y -= 14;
    continue;
  }
  parts.push(`/${font === "Helvetica-Bold" ? "F2" : "F1"} ${size} Tf`);
  parts.push(`1 0 0 1 62 ${y} Tm`);
  parts.push(`(${escape(text)}) Tj`);
  y -= size + 8;
}
parts.push("ET");
const content = parts.join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
  `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, index) => {
  offsets.push(pdf.length);
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
});

const startxref = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const offset of offsets) {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

fs.writeFileSync(OUT, pdf, "latin1");
console.log(`Wrote ${OUT} (${Math.round(pdf.length / 1024)}KB)`);
