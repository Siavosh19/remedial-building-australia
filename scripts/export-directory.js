#!/usr/bin/env node
/**
 * Exports all directory businesses to a CSV file (opens in Excel).
 * Run: node scripts/export-directory.js
 */

const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

// Load env
const envPath = path.join(__dirname, "..", ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const envVars = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?/);
  if (m) envVars[m[1]] = m[2];
}

// Use DIRECT_URL (not pooler) for scripting
const connStr = envVars.DIRECT_URL || envVars.DATABASE_URL;
if (!connStr) { console.error("No DATABASE_URL found"); process.exit(1); }

function csvCell(val) {
  if (val === null || val === undefined) return "";
  const s = String(val).replace(/\r?\n/g, " ");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function csvRow(cells) {
  return cells.map(csvCell).join(",");
}

async function main() {
  const client = new Client({ connectionString: connStr });
  await client.connect();

  console.log("Connected. Fetching data...");

  const { rows: companies } = await client.query(`
    SELECT
      c.id,
      c.name,
      c.slug,
      c.status,
      c.profile_status,
      c.is_claimed,
      c.is_featured,
      c.confidence_score,
      c.description,
      c.phone,
      c.email,
      c.website,
      c.abn,
      c.year_established,
      c.google_business_url,
      c.created_at,
      cat.name AS main_category,
      -- Location (first location record)
      (SELECT l.suburb FROM locations l WHERE l.company_id = c.id LIMIT 1) AS suburb,
      (SELECT l.city FROM locations l WHERE l.company_id = c.id LIMIT 1) AS city,
      (SELECT l.state::text FROM locations l WHERE l.company_id = c.id LIMIT 1) AS state,
      (SELECT l.postcode FROM locations l WHERE l.company_id = c.id LIMIT 1) AS postcode,
      (SELECT l.service_radius_km FROM locations l WHERE l.company_id = c.id LIMIT 1) AS service_radius_km,
      (SELECT l.services_nationwide FROM locations l WHERE l.company_id = c.id LIMIT 1) AS services_nationwide,
      (SELECT l.services_statewide FROM locations l WHERE l.company_id = c.id LIMIT 1) AS services_statewide,
      (SELECT string_agg(l.state::text, ', ') FROM locations l WHERE l.company_id = c.id) AS all_states,
      -- Secondary categories
      (SELECT string_agg(cat2.name, ' | ') FROM company_categories cc2 JOIN categories cat2 ON cat2.id = cc2.category_id WHERE cc2.company_id = c.id AND cc2.is_approved = true) AS secondary_categories,
      -- Tags
      (SELECT string_agg(t.name, ' | ') FROM company_tags ct JOIN tags t ON t.id = ct.tag_id WHERE ct.company_id = c.id AND ct.is_approved = true AND t.tag_type = 'service') AS service_tags,
      (SELECT string_agg(t.name, ' | ') FROM company_tags ct JOIN tags t ON t.id = ct.tag_id WHERE ct.company_id = c.id AND ct.is_approved = true AND t.tag_type = 'defect') AS defect_tags,
      (SELECT string_agg(t.name, ' | ') FROM company_tags ct JOIN tags t ON t.id = ct.tag_id WHERE ct.company_id = c.id AND ct.is_approved = true AND t.tag_type = 'repair_system') AS repair_system_tags,
      (SELECT string_agg(t.name, ' | ') FROM company_tags ct JOIN tags t ON t.id = ct.tag_id WHERE ct.company_id = c.id AND ct.is_approved = true AND t.tag_type = 'capability') AS capability_tags,
      -- Licence
      (SELECT string_agg(lic.licence_number || ' (' || lic.status || ')', ' | ') FROM licences lic WHERE lic.company_id = c.id) AS licences
    FROM companies c
    LEFT JOIN categories cat ON cat.id = c.main_category_id
    ORDER BY cat.name NULLS LAST, c.name ASC
  `);

  await client.end();

  console.log(`Fetched ${companies.length} companies.`);

  // ── Build CSV ─────────────────────────────────────────────────────────
  const headers = [
    "ID", "Business Name", "Slug", "Status", "Profile Status",
    "Claimed", "Featured", "Confidence Score",
    "Main Category", "Secondary Categories",
    "Suburb", "City", "State", "Postcode",
    "Service Radius (km)", "Services Nationwide", "Services Statewide", "All States",
    "Description",
    "Phone", "Email", "Website", "ABN",
    "Year Established",
    "Google Business URL",
    "Service Tags", "Defect Tags", "Repair System Tags", "Capability Tags",
    "Licences",
    "Created At",
  ];

  const lines = [csvRow(headers)];

  for (const c of companies) {
    lines.push(csvRow([
      c.id,
      c.name,
      c.slug,
      c.status,
      c.profile_status,
      c.is_claimed ? "Yes" : "No",
      c.is_featured ? "Yes" : "No",
      c.confidence_score,
      c.main_category || "",
      c.secondary_categories || "",
      c.suburb || "",
      c.city || "",
      c.state || "",
      c.postcode || "",
      c.service_radius_km || "",
      c.services_nationwide ? "Yes" : "No",
      c.services_statewide ? "Yes" : "No",
      c.all_states || "",
      c.description || "",
      c.phone || "",
      c.email || "",
      c.website || "",
      c.abn || "",
      c.year_established || "",
      c.google_business_url || "",
      c.service_tags || "",
      c.defect_tags || "",
      c.repair_system_tags || "",
      c.capability_tags || "",
      c.licences || "",
      c.created_at ? new Date(c.created_at).toLocaleDateString("en-AU") : "",
    ]));
  }

  const csv = lines.join("\n");
  const ts = new Date().toISOString().slice(0,10);
  const outPath = path.join(__dirname, "..", `directory-export-${ts}.csv`);
  fs.writeFileSync(outPath, csv, "utf-8");

  console.log(`\n✅ Saved: ${outPath}`);
  console.log(`   ${companies.length} businesses | ${headers.length} columns`);
  console.log(`\n   Open in Excel or Numbers.`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
