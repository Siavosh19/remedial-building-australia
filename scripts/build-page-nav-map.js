#!/usr/bin/env node
/**
 * build-page-nav-map.js
 *
 * Generates lib/page-nav-map.json — the data that drives the <PageNav /> row
 * (the small "← Previous | Back to Section | Next →" navigation that sits
 * directly under the breadcrumb on content pages).
 *
 * It walks the configured section directories, finds every page.tsx that
 * actually renders a breadcrumb (so the map stays aligned with the pages that
 * receive the component), groups pages by their immediate parent route, and
 * orders siblings alphabetically by their final slug ("auto sibling order").
 *
 * Re-run this whenever pages are added/removed in a configured section:
 *   node scripts/build-page-nav-map.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// The breadcrumb signature shared by every breadcrumb on the site. A page only
// gets PageNav if it has a breadcrumb to sit under.
const BREADCRUMB_SIGNATURE = "text-xs font-semibold text-slate-400";

// Each configured section: where its pages live, and where "Back to ..." goes.
const SECTIONS = [
  {
    dir: "app/repair-systems",
    backHref: "/repair-systems/library",
    backLabel: "Repair Systems Library",
  },
  {
    dir: "app/expert-remedial-advice",
    backHref: "/expert-remedial-advice",
    backLabel: "Expert Advice",
  },
];

/** Recursively collect page.tsx files under a directory, skipping dynamic ([..]) routes. */
function collectPages(absDir, acc) {
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith("[")) continue; // skip dynamic route segments
      collectPages(path.join(absDir, entry.name), acc);
    } else if (entry.name === "page.tsx") {
      acc.push(path.join(absDir, entry.name));
    }
  }
  return acc;
}

/** Convert an absolute page.tsx path to its route, e.g. /repair-systems/roof-leaks */
function fileToRoute(absFile) {
  const rel = path.relative(path.join(ROOT, "app"), path.dirname(absFile));
  return "/" + rel.split(path.sep).join("/");
}

const map = {};

for (const section of SECTIONS) {
  const absSectionDir = path.join(ROOT, section.dir);
  const files = collectPages(absSectionDir, []).filter((f) =>
    fs.readFileSync(f, "utf8").includes(BREADCRUMB_SIGNATURE)
  );

  const routes = files.map(fileToRoute);

  // Group routes by their immediate parent route.
  const groups = new Map();
  for (const route of routes) {
    const parent = route.slice(0, route.lastIndexOf("/")) || "/";
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(route);
  }

  for (const siblings of groups.values()) {
    // Auto sibling order: alphabetical by final slug.
    siblings.sort((a, b) => a.localeCompare(b));
    siblings.forEach((route, i) => {
      // Don't give the "Back to" target a redundant back-to-self link.
      if (route === section.backHref) return;
      map[route] = {
        prevHref: i > 0 ? siblings[i - 1] : null,
        nextHref: i < siblings.length - 1 ? siblings[i + 1] : null,
        backHref: section.backHref,
        backLabel: section.backLabel,
      };
    });
  }
}

const outFile = path.join(ROOT, "lib", "page-nav-map.json");
fs.writeFileSync(outFile, JSON.stringify(map, null, 2) + "\n");
console.log(`Wrote ${Object.keys(map).length} entries to ${path.relative(ROOT, outFile)}`);
