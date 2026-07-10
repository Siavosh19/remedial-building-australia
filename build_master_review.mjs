// Consolidate ALL web-scraped businesses into ONE review workbook for Sia to eyeball
// BEFORE any assignment. No merging: every business is kept under its existing
// (scraped) category — one row per occurrence. Sheet 1 = businesses (with
// descriptions) + a blank "Assign To Category" column; Sheet 2 = the existing
// category list (active-first) to assign from. Nothing is written to the DB.
import { readFileSync, readdirSync, mkdirSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import pg from "pg";
import xlsx from "xlsx";

const env = {};
for (const l of readFileSync(".env.local", "utf8").split("\n")) {
  const m = l.match(/^(?:export\s+)?([A-Za-z0-9_]+)\s*=\s*(.*)$/);
  if (!m) continue;
  let v = m[2].trim();
  if (v.length >= 2 && v[0] === v[v.length - 1] && (v[0] === '"' || v[0] === "'")) v = v.slice(1, -1);
  env[m[1]] = v;
}

const domain = (u) => (u || "").replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].toLowerCase().trim();
const normName = (s) => (s || "").toLowerCase().replace(/\b(pty|ltd|the|group|services|australia|au)\b/g, "").replace(/[^a-z0-9]/g, "");
const arr = (x) => Array.isArray(x) ? x.join("; ") : (x || "");

const SRC = path.join(os.homedir(), "Desktop", "Desktop", "RBA_New_Businesses_From_Web", "_source_json");
const OUT_DIR = path.join(os.homedir(), "Desktop", "Desktop", "RBA_Master_Business_Review_2026-07-10");

const client = new pg.Client({ connectionString: env.DIRECT_URL || env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
await client.connect();

const cats = (await client.query(
  `select c.id, c.name, c.slug, c.is_active,
          (select count(*) from companies co where co.main_category_id = c.id)::int as company_count
     from categories c`
)).rows;
const catById = new Map(cats.map((c) => [c.id, c]));

const existing = (await client.query(`select id, name, website from companies`)).rows;
const existDom = new Map(), existName = new Map();
for (const c of existing) {
  const d = domain(c.website); if (d) existDom.set(d, c);
  const n = normName(c.name); if (n.length >= 4) existName.set(n, c);
}
await client.end();

// Read every scraped record, one row per occurrence (keep existing category).
const files = readdirSync(SRC).filter((f) => /^cat-\d+\.json$/.test(f)).sort();
const rows = [];
for (const f of files) {
  let data;
  try { data = JSON.parse(readFileSync(path.join(SRC, f), "utf8")); } catch { console.log("SKIP bad JSON", f); continue; }
  const idFromName = parseInt(f.match(/cat-(\d+)\.json/)[1], 10);
  const catId = (data && !Array.isArray(data) && data.categoryId) ? data.categoryId : idFromName;
  const dbCat = catById.get(catId);
  const catName = dbCat?.name || (data && data.categoryName) || `#${catId}`;
  const businesses = Array.isArray(data) ? data : (data.businesses || []);
  for (const b of businesses) {
    const dup = (domain(b.website) && existDom.get(domain(b.website))) || (normName(b.name).length >= 4 && existName.get(normName(b.name))) || null;
    rows.push({
      "Business Name": b.name || "",
      "Existing Category": catName,
      "Category ID": catId,
      "Active Category?": dbCat ? (dbCat.is_active ? "Yes" : "Inactive") : "Missing",
      "Assign To Category": "",
      "Description": b.description || "",
      "Services": arr(b.services),
      "State": b.state || "", "Suburb": b.suburb || "", "Postcode": b.postcode || "",
      "Address": b.address || "", "Phone": b.phone || "", "Email": b.email || "",
      "Website": b.website || "", "ABN": b.abn || "",
      "Service Areas": arr(b.service_areas), "Source": b.source_url || "",
      "Already In Directory?": dup ? `YES (#${dup.id} ${dup.name})` : "No — NEW",
    });
  }
}
// Sort by existing category, then business name; add row numbers.
rows.sort((a, b) => String(a["Existing Category"]).localeCompare(String(b["Existing Category"])) || String(a["Business Name"]).localeCompare(String(b["Business Name"])));
rows.forEach((r, i) => (r["#"] = i + 1));
const orderedRows = rows.map((r) => ({ "#": r["#"], ...r }));

const newN = rows.filter((r) => r["Already In Directory?"] === "No — NEW").length;
console.log(`Rows (one per occurrence): ${rows.length} | NEW: ${newN} | already-in-dir: ${rows.length - newN}`);
console.log(`Categories: ${cats.length} (${cats.filter((c) => c.is_active).length} active)`);

mkdirSync(OUT_DIR, { recursive: true });
const wb = xlsx.utils.book_new();

// Sheet 1: businesses
const bws = xlsx.utils.json_to_sheet(orderedRows);
bws["!cols"] = [{ wch: 6 }, { wch: 40 }, { wch: 44 }, { wch: 11 }, { wch: 14 }, { wch: 30 }, { wch: 55 }, { wch: 40 }, { wch: 6 }, { wch: 16 }, { wch: 9 }, { wch: 34 }, { wch: 16 }, { wch: 28 }, { wch: 32 }, { wch: 15 }, { wch: 34 }, { wch: 34 }, { wch: 30 }];
xlsx.utils.book_append_sheet(wb, bws, "Businesses");

// Sheet 2: existing categories — active first, then by current company count
const catRows = cats.sort((a, b) => (Number(b.is_active) - Number(a.is_active)) || (b.company_count - a.company_count) || a.name.localeCompare(b.name))
  .map((c) => ({ "Category ID": c.id, "Existing Category": c.name, "Slug": c.slug, "Active?": c.is_active ? "Yes" : "No", "Current Companies": c.company_count }));
const cws = xlsx.utils.json_to_sheet(catRows);
cws["!cols"] = [{ wch: 11 }, { wch: 60 }, { wch: 40 }, { wch: 8 }, { wch: 16 }];
xlsx.utils.book_append_sheet(wb, cws, "Existing Categories");

const outFile = path.join(OUT_DIR, "Businesses_and_Categories.xlsx");
xlsx.writeFile(wb, outFile);
console.log(`\nWROTE ${outFile}`);
