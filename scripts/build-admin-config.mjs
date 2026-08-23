/**
 * Generates public/admin/config.yml from content/admin-config.template.yml.
 *
 * Runs automatically before `npm run dev` and `npm run build`.
 *
 * WHY THIS IS GENERATED RATHER THAN COMMITTED
 * The editor needs to know which GitHub repository to write to, and the CMS
 * reads that from a static YAML file - it cannot read an environment variable.
 * Hard-coding the repository would mean the repo name lives in two places (here
 * and in hosting) and that a fork or a rename silently breaks the editor. So
 * the repository comes from GITHUB_REPO, alongside the OAuth credentials it is
 * useless without, and this step stitches them together.
 *
 * With GITHUB_REPO unset it writes OWNER/REPO, and the editor shows its
 * "not configured yet" screen rather than failing obscurely.
 */
import fs from "node:fs/promises";
import path from "node:path";

const TEMPLATE = path.join("content", "admin-config.template.yml");
const OUTPUT = path.join("public", "admin", "config.yml");

const repo = process.env.GITHUB_REPO?.trim();

let template;
try {
  template = await fs.readFile(TEMPLATE, "utf8");
} catch {
  console.error(`[admin-config] ${TEMPLATE} is missing - cannot generate the editor config.`);
  process.exit(1);
}

const config = template.replace(/__GITHUB_REPO__/g, repo || "OWNER/REPO");

await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
await fs.writeFile(OUTPUT, config, "utf8");

console.log(
  repo
    ? `[admin-config] wrote ${OUTPUT} for ${repo}`
    : `[admin-config] wrote ${OUTPUT} with a placeholder - set GITHUB_REPO to enable the editor`
);
