import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

const ROOT = "/Users/siasepehrara/remedial-building-australia/app/repair-systems";
const OUT  = "/Users/siasepehrara/Desktop/repair-systems-products.xlsx";

// ── helpers ───────────────────────────────────────────────────────────────────

function walk(dir) {
  let out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out = out.concat(walk(full));
    else if (entry.endsWith("ProductSection.tsx")) out.push(full);
  }
  return out;
}

function pathMeta(filePath) {
  const parts = relative(ROOT, filePath).split("/");
  const fmt = s => s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  return {
    category:    fmt(parts[0] ?? ""),
    subcategory: fmt(parts.length > 2 ? parts[1] : ""),
  };
}

// Extract first match of a string field: key: "value" or key: `value`
function strField(src, key) {
  const m = src.match(new RegExp(`\\b${key}\\s*:\\s*["'\`]([^"'\`]{0,400})["'\`]`));
  return m ? m[1].trim() : "";
}

// Extract all items from a string array: ["a", "b", ...]
function strArrayField(src, key) {
  const m = src.match(new RegExp(`\\b${key}\\s*:\\s*\\[([^\\]]{0,2000})\\]`, "s"));
  if (!m) return "";
  return [...m[1].matchAll(/["'\`]([^"'\`]{1,300})["'\`]/g)].map(x => x[1]).join(" | ");
}

// Extract techChip labels: [{label:"a",...},{label:"b",...}]
function chipsField(src) {
  const m = src.match(/techChips\s*:\s*\[([^\]]{0,2000})\]/s);
  if (!m) return "";
  return [...m[1].matchAll(/label\s*:\s*["'\`]([^"'\`]{1,100})["'\`]/g)].map(x => x[1]).join(" | ");
}

// Split source into individual product object chunks by finding objects
// that contain both a `name:` field and either `fullLabel:` or `brand:`.
function extractProducts(filePath) {
  const src = readFileSync(filePath, "utf8");
  const { category, subcategory } = pathMeta(filePath);

  // Find the PRODUCTS array body (handles both PRODUCTS and similar names)
  const arrMatch = src.match(/(?:const\s+PRODUCTS|PRODUCTS)\s*(?::\s*\w[^=]*?)?\s*=\s*\[/);
  if (!arrMatch) return [];

  const arrStart = arrMatch.index + arrMatch[0].length - 1; // position of opening [
  // Walk brackets to find matching ]
  let depth = 0, arrEnd = arrStart;
  for (let i = arrStart; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") { depth--; if (depth === 0) { arrEnd = i; break; } }
  }
  const arrBody = src.slice(arrStart + 1, arrEnd);

  // Split into individual object blocks by tracking { } depth
  const objects = [];
  let objDepth = 0, objStart = -1;
  for (let i = 0; i < arrBody.length; i++) {
    if (arrBody[i] === "{") {
      if (objDepth === 0) objStart = i;
      objDepth++;
    } else if (arrBody[i] === "}") {
      objDepth--;
      if (objDepth === 0 && objStart >= 0) {
        objects.push(arrBody.slice(objStart, i + 1));
        objStart = -1;
      }
    }
  }

  const products = [];
  for (const obj of objects) {
    const name = strField(obj, "name");
    if (!name || name.length < 2) continue;

    // brand can be either `fullLabel` or `brand`
    const brand = strField(obj, "fullLabel") || strField(obj, "brand");

    const brandUrl  = strField(obj, "brandUrl");
    const tdsUrl    = strField(obj, "tdsUrl");
    const desc      = strField(obj, "descriptionLine");
    const prodType  = strField(obj, "productType");
    const accentCol = strField(obj, "accentColor");
    const filterTags = strArrayField(obj, "filterTags");
    const techChips  = chipsField(obj);
    const techProps  = strArrayField(obj, "technicalProperties");
    const limitations = strArrayField(obj, "limitations");

    // procurement sources
    const srcM = obj.match(/procurementSources\s*:\s*\[([^\]]{0,1000})\]/s);
    const sources = srcM
      ? [...srcM[1].matchAll(/name\s*:\s*["'\`]([^"'\`]{1,150})["'\`]/g)].map(x => x[1]).join(" | ")
      : "";

    // sponsored
    const sponsoredM = obj.match(/sponsored\s*:\s*(true|false)/);
    const sponsored = sponsoredM?.[1] === "true" ? "Yes" : "No";

    products.push({
      Category:       category,
      Subcategory:    subcategory,
      "Product Name": name,
      Brand:          brand,
      "Brand URL":    brandUrl,
      "TDS URL":      tdsUrl,
      Description:    desc,
      "Product Type": prodType,
      "Tech Specs":   techChips,
      "Filter Tags":  filterTags,
      "Technical Properties": techProps,
      Limitations:    limitations,
      "Supply Sources": sources,
      "Accent Colour": accentCol,
      Sponsored:      sponsored,
    });
  }
  return products;
}

// ── run ───────────────────────────────────────────────────────────────────────

const files = walk(ROOT);
console.log(`Scanning ${files.length} ProductSection files…`);

const allProducts = [];
const seen = new Set();
let fileCount = 0;

for (const file of files) {
  try {
    const products = extractProducts(file);
    fileCount++;
    for (const p of products) {
      const key = `${p.Category}||${p.Subcategory}||${p["Product Name"]}`;
      if (!seen.has(key)) { seen.add(key); allProducts.push(p); }
    }
  } catch (e) {
    console.warn("  WARN:", file, "—", e.message);
  }
}

console.log(`Extracted ${allProducts.length} unique products from ${fileCount} files`);

// ── build workbook ────────────────────────────────────────────────────────────

const wb = XLSX.utils.book_new();

// Sheet 1 — all products
const ws1 = XLSX.utils.json_to_sheet(allProducts);
ws1["!cols"] = [
  { wch: 30 },  // Category
  { wch: 36 },  // Subcategory
  { wch: 42 },  // Product Name
  { wch: 22 },  // Brand
  { wch: 40 },  // Brand URL
  { wch: 55 },  // TDS URL
  { wch: 60 },  // Description
  { wch: 50 },  // Product Type
  { wch: 55 },  // Tech Specs
  { wch: 35 },  // Filter Tags
  { wch: 80 },  // Technical Properties
  { wch: 60 },  // Limitations
  { wch: 50 },  // Supply Sources
  { wch: 14 },  // Accent Colour
  { wch: 10 },  // Sponsored
];
XLSX.utils.book_append_sheet(wb, ws1, "All Products");

// Sheet 2 — summary by category
const catMap = {};
for (const p of allProducts) {
  const k = p.Category;
  if (!catMap[k]) catMap[k] = { Category: k, Products: 0, Subcategories: new Set() };
  catMap[k].Products++;
  if (p.Subcategory) catMap[k].Subcategories.add(p.Subcategory);
}
const summaryData = Object.values(catMap)
  .sort((a, b) => b.Products - a.Products)
  .map(r => ({ Category: r.Category, "Product Count": r.Products, "Subcategory Count": r.Subcategories.size }));

const ws2 = XLSX.utils.json_to_sheet(summaryData);
ws2["!cols"] = [{ wch: 38 }, { wch: 16 }, { wch: 20 }];
XLSX.utils.book_append_sheet(wb, ws2, "Summary by Category");

// Sheet 3 — brands
const brandMap = {};
for (const p of allProducts) {
  const b = p.Brand || "Unknown";
  if (!brandMap[b]) brandMap[b] = { Brand: b, "Product Count": 0, "Brand URL": p["Brand URL"] };
  brandMap[b]["Product Count"]++;
}
const brandData = Object.values(brandMap)
  .sort((a, b) => b["Product Count"] - a["Product Count"]);

const ws3 = XLSX.utils.json_to_sheet(brandData);
ws3["!cols"] = [{ wch: 30 }, { wch: 16 }, { wch: 45 }];
XLSX.utils.book_append_sheet(wb, ws3, "Brands");

XLSX.writeFile(wb, OUT);
console.log(`\n✓ Saved: ${OUT}`);
