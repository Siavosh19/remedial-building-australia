#!/usr/bin/env node
/**
 * apply-page-nav.js
 *
 * Inserts <PageNav /> into every page listed in lib/page-nav-map.json, at the
 * correct anchor for its section, and adds the import. Idempotent: a page that
 * already renders PageNav is skipped. Works on both pretty-printed and
 * single-line ("minified") pages. Anything it cannot anchor confidently is left
 * untouched and reported as FAILED.
 *
 *   node scripts/apply-page-nav.js          # apply
 *   node scripts/apply-page-nav.js --dry    # report only, no writes
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");
const MAP = require(path.join(ROOT, "lib", "page-nav-map.json"));
const IMPORT_LINE = 'import PageNav from "@/components/PageNav";';
const SIG = "text-xs font-semibold text-slate-400";

// Per-section anchor strategy, matched by route prefix (first match wins).
const STRATEGIES = [
  // Repair Systems: breadcrumb is a <nav ...slate-400>...</nav>; sit just below it.
  { prefix: "/repair-systems", mode: "afterClose",
    open: new RegExp(`<nav\\b[^>]*${SIG}[^>]*>`), close: "</nav>" },
  // Expert Advice: breadcrumb is a <div ...slate-400>...</div>; sit just below it.
  { prefix: "/expert-remedial-advice", mode: "afterClose",
    open: new RegExp(`<div\\b[^>]*${SIG}[^>]*>`), close: "</div>" },
  // Defect Library: no breadcrumb; sit directly above the red title eyebrow.
  { prefix: "/defect-library", mode: "before",
    open: /<p\b[^>]*tracking-\[0\.25em\] text-red-700[^>]*>/ },
];

function strategyFor(route) {
  return STRATEGIES.find((s) => route.startsWith(s.prefix));
}

/** Indentation (leading whitespace) of the line containing string index `idx`. */
function lineIndent(src, idx) {
  const lineStart = src.lastIndexOf("\n", idx - 1) + 1;
  return src.slice(lineStart, idx).match(/^\s*/)[0];
}
/** Is everything from `idx` to end-of-line only whitespace? (i.e. tag ends its line) */
function restOfLineBlank(src, idx) {
  let nl = src.indexOf("\n", idx);
  if (nl === -1) nl = src.length;
  return /^\s*$/.test(src.slice(idx, nl));
}

function insertNav(src, strat) {
  const m = strat.open.exec(src);
  if (!m) return null;

  if (strat.mode === "before") {
    const idx = m.index;
    const lineStart = src.lastIndexOf("\n", idx - 1) + 1;
    const indent = src.slice(lineStart, idx);
    if (/^\s*$/.test(indent)) {
      // pretty: the <p> starts its own line -> put PageNav on the line above it.
      return src.slice(0, lineStart) + indent + "<PageNav />\n" + src.slice(lineStart);
    }
    // minified / mid-line: insert inline right before the <p>.
    return src.slice(0, idx) + "<PageNav />" + src.slice(idx);
  }

  // afterClose: find the matching close tag after the opening tag.
  const closeIdx = src.indexOf(strat.close, m.index + m[0].length);
  if (closeIdx === -1) return null;
  const after = closeIdx + strat.close.length;
  if (restOfLineBlank(src, after)) {
    // pretty: close tag ends its line -> add PageNav on the next line, same indent.
    const indent = lineIndent(src, m.index);
    return src.slice(0, after) + `\n${indent}<PageNav />` + src.slice(after);
  }
  // minified / mid-line: insert inline right after the close tag.
  return src.slice(0, after) + "<PageNav />" + src.slice(after);
}

function addImport(src) {
  if (src.includes("@/components/PageNav")) return src;
  const importRe = /^import[\s\S]*?from\s*["'][^"']+["'];?[ \t]*$|^import\s*["'][^"']+["'];?[ \t]*$/gm;
  let last = null, m;
  while ((m = importRe.exec(src)) !== null) last = m;
  if (last) {
    const at = last.index + last[0].length;
    return src.slice(0, at) + "\n" + IMPORT_LINE + src.slice(at);
  }
  // No imports at all: place after a leading "use client" directive if present.
  const directive = src.match(/^\s*["']use [a-z]+["'];?\s*\n/);
  if (directive) {
    const at = directive[0].length;
    return src.slice(0, at) + IMPORT_LINE + "\n" + src.slice(at);
  }
  return IMPORT_LINE + "\n" + src;
}

const report = { edited: [], skipped: [], failed: [] };

for (const route of Object.keys(MAP)) {
  const file = path.join(ROOT, "app", route, "page.tsx");
  if (!fs.existsSync(file)) { report.failed.push([route, "no page.tsx"]); continue; }

  let src = fs.readFileSync(file, "utf8");
  if (src.includes("<PageNav")) { report.skipped.push(route); continue; }

  const strat = strategyFor(route);
  if (!strat) { report.failed.push([route, "no strategy"]); continue; }

  const withNav = insertNav(src, strat);
  if (withNav === null) { report.failed.push([route, "anchor not found"]); continue; }
  src = addImport(withNav);

  if (!DRY) fs.writeFileSync(file, src);
  report.edited.push(route);
}

console.log(`${DRY ? "[DRY RUN] " : ""}edited: ${report.edited.length}  skipped(already): ${report.skipped.length}  failed: ${report.failed.length}`);
if (report.failed.length) {
  console.log("\nFAILED (need manual review):");
  for (const [r, why] of report.failed) console.log(`  ${r}  — ${why}`);
}
