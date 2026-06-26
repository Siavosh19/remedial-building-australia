// One-off: inject <SeoCrossPromo /> before the footer on every defect-library
// and repair-systems page, and add the import. Idempotent — safe to re-run.
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const IMPORT_LINE = 'import SeoCrossPromo from "@/components/sections/SeoCrossPromo";';

const files = execSync(
  "find app/defect-library app/repair-systems -name page.tsx",
  { encoding: "utf8" },
)
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

let changed = 0;
let skipped = 0;
const problems = [];

for (const file of files) {
  let src = readFileSync(file, "utf8");
  if (src.includes("SeoCrossPromo")) {
    skipped++;
    continue;
  }

  // 1) Insert the component right before the first <footer ...> tag.
  const footerMatch = src.match(/^([ \t]*)<footer\b/m);
  if (!footerMatch) {
    problems.push(`${file}: no <footer> found`);
    continue;
  }
  const indent = footerMatch[1];
  src = src.replace(
    footerMatch[0],
    `${indent}<SeoCrossPromo />\n\n${footerMatch[0]}`,
  );

  // 2) Add the import after the SiteHeader import (fallback: after first import).
  if (/^import SiteHeader from .*$/m.test(src)) {
    src = src.replace(/^(import SiteHeader from .*)$/m, `$1\n${IMPORT_LINE}`);
  } else {
    src = src.replace(/^(import .*)$/m, `$1\n${IMPORT_LINE}`);
  }

  writeFileSync(file, src);
  changed++;
}

console.log(`changed=${changed} skipped=${skipped} total=${files.length}`);
if (problems.length) {
  console.log("PROBLEMS:");
  for (const p of problems) console.log("  " + p);
}
