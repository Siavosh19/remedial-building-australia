#!/usr/bin/env node
/**
 * Extracts product data from all *ProductSection.tsx files and outputs
 * lib/materials-index-data.json for the Materials & Products Index page.
 *
 * Run: node scripts/extract-materials-index.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const APP_DIR = path.join(ROOT, "app");
const OUTPUT = path.join(ROOT, "lib", "materials-index-data.json");

// ── Slug → human label ────────────────────────────────────────────────────────

function slugToLabel(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bPu\b/g, "PU")
    .replace(/\bPvdf\b/g, "PVDF")
    .replace(/\bEifs\b/g, "EIFS")
    .replace(/\bHdpe\b/g, "HDPE")
    .replace(/\bTpo\b/g, "TPO")
    .replace(/\bFpo\b/g, "FPO")
    .replace(/\bVcl\b/g, "VCL")
    .replace(/\bDpc\b/g, "DPC")
    .replace(/\bSs\b/g, "SS")
    .replace(/\bFr\b/g, "FR")
    .replace(/\bHpl\b/g, "HPL")
    .replace(/\bNhl\b/g, "NHL")
    .replace(/\bNcc\b/g, "NCC")
    .replace(/\bEpdm\b/g, "EPDM")
    .replace(/\bPir\b/g, "PIR")
    .replace(/\bBtu\b/g, "BTU")
    .replace(/\bAs\b/g, "AS");
}

// Convert file path → { pageUrl, categoryLabel, topSection, sectionPath }
function pathToMeta(filePath) {
  const rel = path.relative(APP_DIR, filePath);
  const parts = rel.split(path.sep);
  const dirParts = parts.slice(0, -1); // exclude filename
  const pageUrl = "/" + dirParts.join("/");
  const topSection = slugToLabel(dirParts[1] || "");   // e.g. "Balcony Waterproofing Failure"
  const categoryLabel = slugToLabel(dirParts[dirParts.length - 1] || "");
  return { pageUrl, categoryLabel, topSection };
}

// ── Parser ────────────────────────────────────────────────────────────────────

function extractStringField(text, fieldName) {
  const re = new RegExp(`\\b${fieldName}:\\s*["'\`]([^"'\`]+)["'\`]`);
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

function extractFilterTags(text) {
  const re = /filterTags:\s*\[([^\]]*)\]/;
  const m = text.match(re);
  if (!m) return [];
  return [...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
}

function parseProductsFromFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  if (!content.includes("fullLabel:")) return [];

  // Scan from the first `Product[]` array declaration to the end of the file so
  // pages that use multiple or renamed arrays (e.g. POLYMER_PRODUCTS,
  // EPOXY_PRODUCTS, GROUT_PRODUCTS) are captured — not only `const PRODUCTS`.
  // Starting at the array declaration skips the `type Product = { fullLabel }`
  // definition; if no typed array is found we fall back to the whole file (the
  // type-def segment is filtered out later because it has no quoted values).
  const arrStart = content.indexOf(": Product[]");
  const arrayContent = arrStart === -1 ? content : content.slice(arrStart);
  const positions = [];
  let from = 0;
  while (true) {
    const pos = arrayContent.indexOf("fullLabel:", from);
    if (pos === -1) break;
    positions.push(pos);
    from = pos + 1;
  }

  return positions.map((start, i) => {
    const end = i + 1 < positions.length ? positions[i + 1] : arrayContent.length;
    const seg = arrayContent.slice(start, end);
    const fullLabel = extractStringField(seg, "fullLabel");
    let name = extractStringField(seg, "name");
    // Defensive: never let an unresolved "— TODO …" caveat leak into the index
    // name. Strip a dash-delimited TODO suffix only when a real product name
    // precedes it (whole-TODO names, which shouldn't exist, are left intact).
    if (name) {
      const m = name.match(/^(.*?)\s*[—–-]\s*TODO[:\s]/i);
      if (m && m[1].trim().length >= 3) name = m[1].trim();
    }
    const productType = extractStringField(seg, "productType");
    const filterTags = extractFilterTags(seg);
    if (!name || !fullLabel) return null;
    return { fullLabel, name, productType: productType || "", filterTags };
  }).filter(Boolean);
}

// ── Collect files ─────────────────────────────────────────────────────────────

function findFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findFiles(full));
    else if (entry.isFile() && entry.name.endsWith("ProductSection.tsx")) results.push(full);
  }
  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log("Finding ProductSection.tsx files...");
const files = findFiles(APP_DIR);
console.log(`Found ${files.length} files`);

const allProducts = [];
let fileIdx = 0;
let prodIdx = 0;

for (const filePath of files) {
  const meta = pathToMeta(filePath);
  fileIdx++;
  for (const p of parseProductsFromFile(filePath)) {
    allProducts.push({
      id: `${fileIdx}_${prodIdx++}`,
      name: p.name,
      brand: p.fullLabel,
      productType: p.productType,
      filterTags: p.filterTags,
      pageUrl: meta.pageUrl,
      categoryLabel: meta.categoryLabel,
      topSection: meta.topSection,
    });
  }
}

console.log(`Extracted ${allProducts.length} raw products from ${fileIdx} files`);

// Deduplicate by name + brand + pageUrl
const seen = new Set();
const products = [];
for (const p of allProducts) {
  const key = `${p.name}|||${p.brand}|||${p.pageUrl}`;
  if (!seen.has(key)) { seen.add(key); products.push(p); }
}
console.log(`After dedup: ${products.length} products`);

// ── Normalise brand names (case inconsistencies like "ARDEX Australia" vs "Ardex Australia") ──
// Group by lowercase key, pick the most-common capitalisation as the canonical form, then
// rewrite every product's brand to use that canonical form.
const brandVariantFreq = {};
for (const p of products) {
  const key = p.brand.trim().toLowerCase();
  if (!brandVariantFreq[key]) brandVariantFreq[key] = {};
  brandVariantFreq[key][p.brand] = (brandVariantFreq[key][p.brand] || 0) + 1;
}
const brandCanonical = {};
for (const [key, variants] of Object.entries(brandVariantFreq)) {
  const canon = Object.entries(variants).sort((a, b) => b[1] - a[1])[0][0];
  for (const v of Object.keys(variants)) brandCanonical[v] = canon;
}
for (const p of products) p.brand = brandCanonical[p.brand] || p.brand;

// ── Second pass: merge single-word brand aliases into their longer (or more common) forms ──
// e.g. "Ardex" (1 product) → "ARDEX Australia" (34 products)
// For each pair (shortBrand, longerBrand) where longerBrand starts with shortBrand + " ",
// merge the less-common form into the more-common form.
const brandFreq2 = {};
for (const p of products) brandFreq2[p.brand] = (brandFreq2[p.brand] || 0) + 1;

const allBrands2 = Object.keys(brandFreq2);
const brandAlias2 = {};

for (const short of allBrands2) {
  // Only consider single-word, non-compound brands as potential aliases
  if (short.includes(" ") || short.includes("/")) continue;
  const shortLower = short.toLowerCase();

  // Find all longer brands that start with this word (no slash = not a compound brand)
  const candidates = allBrands2.filter(
    (b) =>
      b !== short &&
      !b.includes("/") &&
      b.toLowerCase().startsWith(shortLower + " ")
  );
  if (candidates.length === 0) continue;

  // Pick the candidate with the most products
  const best = candidates.sort((a, b) => brandFreq2[b] - brandFreq2[a])[0];

  // Merge into whichever form has more products
  if (brandFreq2[short] >= brandFreq2[best]) {
    // Short is more common — map best → short
    brandAlias2[best] = short;
  } else {
    // Long form is more common — map short → best
    brandAlias2[short] = best;
  }
}

for (const p of products) p.brand = brandAlias2[p.brand] || p.brand;
console.log(`Brand aliases applied: ${Object.keys(brandAlias2).length} merges`);
Object.entries(brandAlias2).forEach(([from, to]) =>
  console.log(`  "${from}" → "${to}"`)
);

// ── Build dropdown option arrays ──────────────────────────────────────────────

// Brands: all unique canonical forms, sorted
const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))].sort((a, b) =>
  a.localeCompare(b)
);

// Material types: unique productType values, sorted
const materialTypes = [...new Set(products.map((p) => p.productType).filter(Boolean))].sort((a, b) =>
  a.localeCompare(b)
);

// Applications: filterTags appearing >=5 times, non-numeric, non-spec patterns
const tagFreq = {};
for (const p of products) {
  for (const t of p.filterTags) tagFreq[t] = (tagFreq[t] || 0) + 1;
}
const applications = Object.entries(tagFreq)
  .filter(([t, c]) =>
    c >= 5 &&
    !/^\d/.test(t) &&
    !/^(AS|ISO|NCC|NBC)-?\d/.test(t) &&
    !/\d+mm$|\d+gsm$|BMT$|kPa$|MPa$/.test(t) &&
    !/^\d+[CcGg]$/.test(t)
  )
  .sort((a, b) => b[1] - a[1])
  .map(([t]) => t);

// Repair pages: unique pageUrl → label mapping, with section for disambiguation
const pageMap = new Map();
for (const p of products) {
  if (!pageMap.has(p.pageUrl)) {
    pageMap.set(p.pageUrl, { label: p.categoryLabel, url: p.pageUrl, section: p.topSection });
  }
}
const repairPages = [...pageMap.values()].sort((a, b) => a.label.localeCompare(b.label));

// Stats
const sectionCounts = {};
for (const p of products) {
  sectionCounts[p.topSection] = (sectionCounts[p.topSection] || 0) + 1;
}

const output = {
  meta: {
    generatedAt: new Date().toISOString(),
    totalProducts: products.length,
    totalBrands: brands.length,
    totalMaterialTypes: materialTypes.length,
    totalRepairPages: repairPages.length,
    sectionCounts,
  },
  dropdowns: { brands, materialTypes, applications, repairPages },
  products,
};

fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
console.log(`\nWritten to ${OUTPUT}`);
console.log(`  Products:      ${products.length}`);
console.log(`  Brands:        ${brands.length}`);
console.log(`  Material types: ${materialTypes.length}`);
console.log(`  Applications:  ${applications.length}`);
console.log(`  Repair pages:  ${repairPages.length}`);
