#!/usr/bin/env node
/**
 * Builds an Excel review workbook of all existing product reference cards in the
 * four "Concrete & Structural Defects" repair-system sections, laid out as a
 * subcategory (row) × brand (column) matrix.
 *
 * Phase 1: every existing product rendered in BLACK.
 * Phase 2 (later): an annotations file recolours misplaced/discontinued products
 * RED and adds recommended-missing products in GREEN.
 *
 * Run: node scripts/build-product-review-xlsx.js
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const ExcelJS = require("exceljs");

const ROOT = path.join(__dirname, "..");
const { products } = require(path.join(ROOT, "lib", "materials-index-data.json"));

const SECTIONS = [
  { slug: "concrete-spalling", title: "Concrete Spalling" },
  { slug: "reinforcement-corrosion", title: "Reinforcement Corrosion" },
  { slug: "concrete-cracking", title: "Concrete Cracking" },
  { slug: "magnesite-flooring-deterioration", title: "Magnesite Flooring" },
];

const BRAND_ORDER = [
  "Sika", "Ardex", "Mapei", "Fosroc", "Parchem",
  "Westox", "Tremco", "BASF / Master Builders", "Bostik", "Other / Generic",
];

function detectBrand(str) {
  const s = (str || "").toLowerCase();
  // Generic / multi-supplier "option" cards must NOT be filed under one brand
  // just because that brand happens to appear in the supplier list.
  const chemBrands = ["sika", "ardex", "mapei", "fosroc", "westox", "tremco", "bostik"];
  const distinct = chemBrands.filter((k) => s.includes(k));
  const genericMarker = /generic|various|local distributor|engineering suppliers|specialist supply|specialist contractor|tool hire|hire or purchase|dcp chemprox|vector|cortec|soudal/i.test(s);
  if (distinct.length >= 2) return "Other / Generic";        // lists two+ manufacturers
  if (genericMarker && s.includes("/")) return "Other / Generic"; // brand + generic/supplier options
  // Single-brand cards (note: "Fosroc / Parchem" = Parchem distributes Fosroc -> Fosroc).
  if (s.includes("sika")) return "Sika";
  if (s.includes("ardex")) return "Ardex";
  if (s.includes("mapei")) return "Mapei";
  if (s.includes("fosroc")) return "Fosroc";
  if (s.includes("westox")) return "Westox";
  if (s.includes("tremco")) return "Tremco";
  if (s.includes("master builders") || s.includes("basf") || s.includes("mbcc")) return "BASF / Master Builders";
  if (s.includes("bostik")) return "Bostik";
  if (s.includes("parchem")) return "Parchem";
  return "Other / Generic";
}

// Optional review annotations (Phase 2). Shape:
// { flags: { "section|subcategory|ProductName": "red" }, recommendations: [ {section, subcategory, brand, name, type} ] }
const ANN_PATH = path.join(__dirname, "product-review-annotations.json");
const ann = fs.existsSync(ANN_PATH) ? JSON.parse(fs.readFileSync(ANN_PATH, "utf8")) : { flags: {}, recommendations: [] };

const COLORS = { black: "FF1A1A1A", gray: "FF6B7280", red: "FFC00000", green: "FF1E7A34" };

const cleanName = (n) => (n || "").split(/\s*[—–]\s*/)[0].trim();
// Brand-aware key: strip the manufacturer prefix so a recommendation written as
// "Renderoc HB40" matches the on-site product "Fosroc Renderoc HB40" (and is NOT
// duplicated as a phantom green row). Matching is brand-stripped exact-equality.
const BRANDS_RE = /\b(sika|ardex|mapei|fosroc|parchem|westox|tremco|bostik|basf|master builders|mbcc|australia|construction supplies|construction products)\b/g;
const normKey = (n) => cleanName(n).toLowerCase().replace(BRANDS_RE, "").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
const recKey = (section, sub, name) => `${section}|${sub}|${normKey(name)}`;
const recSet = new Set((ann.recommendations || []).map((r) => recKey(r.section, r.subcategory, r.name)));

function build() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Remedial Building Australia — product review";

  for (const section of SECTIONS) {
    const secProducts = products.filter((p) => (p.pageUrl || "").includes(`/${section.slug}/`));

    // Group: subcategory -> brand -> [products]
    const subs = {};
    for (const p of secProducts) {
      const sub = p.categoryLabel || "—";
      const brand = detectBrand(p.brand);
      ((subs[sub] ||= {})[brand] ||= []).push(p);
    }
    // Merge in green recommendations for this section — but only those NOT already
    // present in the index (e.g. card-override pages the index doesn't read). Recs
    // already in the index are coloured green in place via recSet (no duplicate).
    for (const rec of ann.recommendations.filter((r) => r.section === section.slug)) {
      const sub = rec.subcategory;
      const brand = rec.brand || detectBrand(rec.name);
      const already = secProducts.some((p) => (p.categoryLabel || "—") === sub && normKey(p.name) === normKey(rec.name));
      if (already) continue;
      ((subs[sub] ||= {})[brand] ||= []).push({ __rec: true, name: rec.name, productType: rec.type || "", brand });
    }

    const subNames = Object.keys(subs).sort();
    const brandsPresent = BRAND_ORDER.filter((b) => subNames.some((s) => subs[s][b]?.length));

    const ws = wb.addWorksheet(section.title, { views: [{ state: "frozen", xSplit: 1, ySplit: 1 }] });
    ws.columns = [
      { header: "Subcategory", width: 30 },
      ...brandsPresent.map((b) => ({ header: b, width: 34 })),
    ];
    const head = ws.getRow(1);
    head.font = { bold: true, color: { argb: "FFFFFFFF" } };
    head.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0C4A6E" } };
    head.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
    head.height = 22;

    for (const sub of subNames) {
      const row = ws.addRow([sub]);
      row.alignment = { vertical: "top", wrapText: true };
      row.getCell(1).font = { bold: true, color: { argb: "FF0C4A6E" } };

      brandsPresent.forEach((brand, i) => {
        const list = subs[sub][brand] || [];
        if (!list.length) return;
        const runs = [];
        list.forEach((p, idx) => {
          const isRec = p.__rec === true || recSet.has(recKey(section.slug, sub, p.name));
          const flagged = ann.flags[`${section.slug}|${sub}|${cleanName(p.name)}`] === "red";
          const color = isRec ? COLORS.green : flagged ? COLORS.red : COLORS.black;
          if (idx > 0) runs.push({ text: "\n", font: {} });
          runs.push({ text: (isRec ? "+ " : "") + cleanName(p.name), font: { color: { argb: color }, bold: isRec || flagged, size: 11 } });
          if (p.productType) runs.push({ text: "\n   " + p.productType, font: { color: { argb: COLORS.gray }, italic: true, size: 9 } });
        });
        row.getCell(i + 2).value = { richText: runs };
      });
    }

    // Legend row
    ws.addRow([]);
    const legend = ws.addRow(["Legend:"]);
    legend.getCell(1).font = { bold: true };
    const lc = ws.addRow([""]);
    lc.getCell(1).value = {
      richText: [
        { text: "Black = correct   ", font: { color: { argb: COLORS.black } } },
        { text: "Red = misplaced / discontinued / not in AU market   ", font: { color: { argb: COLORS.red }, bold: true } },
        { text: "Green (+) = recommended addition", font: { color: { argb: COLORS.green }, bold: true } },
      ],
    };
  }

  // ── Review Notes sheet — reason + source for every red flag and green rec ──
  const titleBySlug = Object.fromEntries(SECTIONS.map((s) => [s.slug, s.title]));
  const notes = wb.addWorksheet("Review Notes", { views: [{ state: "frozen", ySplit: 1 }] });
  notes.columns = [
    { header: "Section", width: 22 },
    { header: "Subcategory", width: 28 },
    { header: "Flag", width: 10 },
    { header: "Brand", width: 18 },
    { header: "Product", width: 34 },
    { header: "Reason", width: 46 },
    { header: "Evidence / source", width: 60 },
  ];
  const nhead = notes.getRow(1);
  nhead.font = { bold: true, color: { argb: "FFFFFFFF" } };
  nhead.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0C4A6E" } };
  for (const f of (ann.flagDetails || [])) {
    const r = notes.addRow([titleBySlug[f.section] || f.section, f.subcategory, "RED", "", f.name, f.reason, f.evidence]);
    r.alignment = { vertical: "top", wrapText: true };
    r.getCell(3).font = { bold: true, color: { argb: COLORS.red } };
    r.getCell(5).font = { color: { argb: COLORS.red } };
  }
  for (const rec of ann.recommendations) {
    const r = notes.addRow([titleBySlug[rec.section] || rec.section, rec.subcategory, "ADD", rec.brand, rec.name, rec.reason, ""]);
    r.alignment = { vertical: "top", wrapText: true };
    r.getCell(3).font = { bold: true, color: { argb: COLORS.green } };
    r.getCell(5).font = { color: { argb: COLORS.green } };
  }

  const out = path.join(os.homedir(), "Desktop", "RBA-Concrete-Repair-Products-Review.xlsx");
  return wb.xlsx.writeFile(out).then(() => {
    console.log("Wrote:", out);
    for (const s of SECTIONS) {
      const n = products.filter((p) => (p.pageUrl || "").includes(`/${s.slug}/`)).length;
      console.log(`  ${s.title}: ${n} existing products`);
    }
    console.log(`  Recommendations added: ${ann.recommendations.length}, red flags: ${Object.keys(ann.flags).length}`);
  });
}

build().catch((e) => { console.error(e); process.exit(1); });
