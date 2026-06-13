#!/usr/bin/env node
/**
 * insert-page-nav.js
 *
 * Inserts <PageNav /> directly AFTER the breadcrumb on every page that has one,
 * and adds the import. The breadcrumb itself is never modified.
 *
 * The breadcrumb is rendered either as a <nav> (repair-systems) or a <div>
 * (expert-remedial-advice), both carrying the class signature below. We find the
 * breadcrumb's opening line, walk to its matching closing tag, and insert after.
 *
 * Idempotent: pages that already contain <PageNav /> are skipped.
 *
 *   node scripts/insert-page-nav.js          # apply
 *   node scripts/insert-page-nav.js --dry    # report only, no writes
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");
const SIGNATURE = "text-xs font-semibold text-slate-400";
const SECTION_DIRS = ["app/repair-systems", "app/expert-remedial-advice"];
const IMPORT_LINE = 'import PageNav from "@/components/PageNav";';

function collectPages(absDir, acc) {
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith("[")) continue;
      collectPages(path.join(absDir, entry.name), acc);
    } else if (entry.name === "page.tsx") {
      acc.push(path.join(absDir, entry.name));
    }
  }
  return acc;
}

function process(absFile) {
  const src = fs.readFileSync(absFile, "utf8");
  if (!src.includes(SIGNATURE)) return "no-breadcrumb";
  if (src.includes("<PageNav")) return "already-done";

  const lines = src.split("\n");

  // 1) Locate the breadcrumb opening line and its tag type (nav | div).
  const openIdx = lines.findIndex((l) => l.includes(SIGNATURE));
  if (openIdx === -1) return "no-breadcrumb";
  const openLine = lines[openIdx];
  const tag = openLine.includes("<nav") ? "nav" : openLine.includes("<div") ? "div" : null;
  if (!tag) return "unknown-tag";
  const closeTag = `</${tag}>`;
  const indent = (openLine.match(/^\s*/) || [""])[0];

  // 2) Walk forward to the matching closing tag. The breadcrumb contains only
  //    <a>/<span> children (no nested <nav>/<div>), so the first close matches.
  let closeIdx = -1;
  for (let i = openIdx; i < lines.length; i++) {
    if (lines[i].includes(closeTag)) {
      closeIdx = i;
      break;
    }
  }
  if (closeIdx === -1) return "no-close";

  // 3) Insert <PageNav /> as a sibling immediately after the breadcrumb.
  lines.splice(closeIdx + 1, 0, `${indent}<PageNav />`);

  // 4) Add the import as the last line of the top import block (before the
  //    first blank line), unless already present.
  if (!lines.some((l) => l.includes('from "@/components/PageNav"'))) {
    let blankIdx = lines.findIndex((l) => l.trim() === "");
    if (blankIdx === -1) blankIdx = 1; // fallback: after first line
    lines.splice(blankIdx, 0, IMPORT_LINE);
  }

  if (!DRY) fs.writeFileSync(absFile, lines.join("\n"));
  return "inserted";
}

const tally = {};
let total = 0;
for (const dir of SECTION_DIRS) {
  for (const file of collectPages(path.join(ROOT, dir), [])) {
    const result = process(file);
    tally[result] = (tally[result] || 0) + 1;
    total++;
  }
}

console.log(DRY ? "[dry run]" : "[applied]", "scanned", total, "page.tsx files:");
for (const [k, v] of Object.entries(tally)) console.log(`  ${k}: ${v}`);
