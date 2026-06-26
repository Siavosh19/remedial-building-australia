// One-off: replace the bespoke inline <header>…</header> on the homepage,
// defect-library index, and directory login page with the shared <SiteHeader />.
import { readFileSync, writeFileSync } from "node:fs";

const IMPORT = 'import SiteHeader from "@/components/SiteHeader";';
const files = [
  "app/HomeClient.tsx",
  "app/defect-library/page.tsx",
  "app/directory/login/page.tsx",
];

for (const file of files) {
  let src = readFileSync(file, "utf8");

  // Replace the first <header ...> … </header> block with <SiteHeader />.
  const headerRe = /[ \t]*<header\b[\s\S]*?<\/header>\n/;
  if (!headerRe.test(src)) {
    console.log(`${file}: NO inline <header> found — skipped`);
    continue;
  }
  src = src.replace(headerRe, "      <SiteHeader />\n");

  // Add the import if missing (after the first import line).
  if (!src.includes(IMPORT)) {
    src = src.replace(/^(import .*)$/m, `$1\n${IMPORT}`);
  }

  writeFileSync(file, src);
  console.log(`${file}: header replaced with <SiteHeader />`);
}
