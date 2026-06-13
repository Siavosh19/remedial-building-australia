#!/usr/bin/env node
/**
 * Business import pipeline for maps-raw.json
 * Steps:
 *  1. Backup maps-raw.json
 *  2. Remove junk records ("Google Maps can't reach the internet")
 *  3. Deduplicate within scraped data (by place_id, then name+suburb+state)
 *  4. Match against DB companies — enrich missing email/phone/website/google_business_url
 *  5. Insert new businesses as draft/unclaimed/basic with Location records
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const RAW_PATH = path.join(__dirname, '../business-leads-output/maps-raw.json');
const BACKUP_DIR = path.join(__dirname, '../business-leads-output/backups');
const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

// Strip private-use Unicode chars (e.g.  prefix on phone/address from scraper)
function stripPrivateUnicode(s) {
  if (!s) return s;
  return s.replace(/[-]/g, '').trim();
}

function normalisePhone(p) {
  if (!p) return null;
  const s = stripPrivateUnicode(p).replace(/\s+/g, ' ').trim();
  return s || null;
}

function normaliseWebsite(w) {
  if (!w) return null;
  try {
    const u = new URL(w);
    return u.origin + u.pathname.replace(/\/$/, '') || null;
  } catch {
    return w.trim() || null;
  }
}

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

async function main() {
  // ── 1. Backup ──────────────────────────────────────────────────────────────
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupPath = path.join(BACKUP_DIR, `maps-raw-${ts}.json`);
  fs.copyFileSync(RAW_PATH, backupPath);
  console.log(`✓ Backed up to ${backupPath}`);

  // ── 2. Load & remove junk ──────────────────────────────────────────────────
  const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  console.log(`  Loaded ${raw.length} raw records`);

  const clean = raw.filter(r => {
    const name = r.business_name || '';
    return !name.includes("Google Maps") && !name.includes("can't reach");
  });
  const junkCount = raw.length - clean.length;
  console.log(`✓ Removed ${junkCount} junk records → ${clean.length} remain`);

  // ── 3. Deduplicate within scraped data ────────────────────────────────────
  // Primary: by google_place_id
  // Secondary: by normalised name + suburb + state (keep first occurrence)
  const byPlaceId = new Map();
  const byNameSuburbState = new Map();
  const deduped = [];

  for (const r of clean) {
    const placeId = r.google_place_id;
    if (placeId && byPlaceId.has(placeId)) continue;
    if (placeId) byPlaceId.set(placeId, true);

    const nameKey = [
      (r.business_name || '').trim().toLowerCase(),
      (r.suburb || '').toLowerCase(),
      (r.state || '').toUpperCase(),
    ].join('|');
    if (byNameSuburbState.has(nameKey)) continue;
    byNameSuburbState.set(nameKey, true);

    deduped.push(r);
  }
  console.log(`✓ Deduplicated: ${clean.length - deduped.length} removed → ${deduped.length} unique`);

  // ── 4. Load DB companies for matching ─────────────────────────────────────
  const client = new Client({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const { rows: dbCompanies } = await client.query(`
    SELECT c.id, c.name, c.phone, c.email, c.website, c.google_business_url,
           l.suburb, l.state, l.postcode, l.address
    FROM companies c
    LEFT JOIN locations l ON l.company_id = c.id
  `);
  console.log(`  Loaded ${dbCompanies.length} existing DB companies`);

  // Build lookup maps for matching
  const dbByNameState = new Map();
  const dbByPhone = new Map();
  const dbByWebsite = new Map();

  for (const c of dbCompanies) {
    const nameStateKey = [
      (c.name || '').trim().toLowerCase(),
      (c.state || '').toUpperCase(),
    ].join('|');
    dbByNameState.set(nameStateKey, c);

    const phone = normalisePhone(c.phone);
    if (phone) dbByPhone.set(phone, c);

    const website = normaliseWebsite(c.website);
    if (website) dbByWebsite.set(website, c);
  }

  // ── 5. Match & enrich / collect new ──────────────────────────────────────
  let enriched = 0;
  let enrichedFields = { email: 0, phone: 0, website: 0, google_business_url: 0 };
  const toInsert = [];

  for (const r of deduped) {
    const scrapedPhone = normalisePhone(r.phone);
    const scrapedWebsite = normaliseWebsite(r.website);
    const scrapedEmail = (r.email || '').trim() || null;
    const scrapedGBUrl = (r.google_maps_url || '').trim() || null;

    // Match attempts: name+state → phone → website
    const nameStateKey = [
      (r.business_name || '').trim().toLowerCase(),
      (r.state || '').toUpperCase(),
    ].join('|');

    let match = dbByNameState.get(nameStateKey)
      || (scrapedPhone && dbByPhone.get(scrapedPhone))
      || (scrapedWebsite && dbByWebsite.get(scrapedWebsite));

    if (match) {
      // Enrich: only fill fields that are null/empty in DB
      const updates = {};
      if (!match.email && scrapedEmail) { updates.email = scrapedEmail; enrichedFields.email++; }
      if (!match.phone && scrapedPhone) { updates.phone = scrapedPhone; enrichedFields.phone++; }
      if (!match.website && scrapedWebsite) { updates.website = scrapedWebsite; enrichedFields.website++; }
      if (!match.google_business_url && scrapedGBUrl) { updates.google_business_url = scrapedGBUrl; enrichedFields.google_business_url++; }

      if (Object.keys(updates).length > 0) {
        const setClauses = Object.keys(updates).map((k, i) => `${k} = $${i + 2}`).join(', ');
        const values = [match.id, ...Object.values(updates)];
        await client.query(`UPDATE companies SET ${setClauses}, updated_at = NOW() WHERE id = $1`, values);
        enriched++;
      }
    } else {
      toInsert.push(r);
    }
  }

  console.log(`✓ Matched ${deduped.length - toInsert.length} against existing companies`);
  console.log(`  Enriched ${enriched} records: email+${enrichedFields.email} phone+${enrichedFields.phone} website+${enrichedFields.website} gburl+${enrichedFields.google_business_url}`);
  console.log(`  New businesses to insert: ${toInsert.length}`);

  // ── 6. Insert new businesses ──────────────────────────────────────────────
  let inserted = 0;
  let skipped = 0;

  for (const r of toInsert) {
    const name = (r.business_name || '').trim();
    if (!name) { skipped++; continue; }

    const baseSlug = slugify(name);
    // Ensure unique slug
    const { rows: existing } = await client.query(
      `SELECT slug FROM companies WHERE slug LIKE $1 ORDER BY slug`,
      [`${baseSlug}%`]
    );
    const existingSlugs = new Set(existing.map(e => e.slug));

    // Skip if exact slug already exists (idempotent re-run)
    if (existingSlugs.has(baseSlug)) { skipped++; continue; }
    let slug = baseSlug;
    let i = 2;
    while (existingSlugs.has(slug)) { slug = `${baseSlug}-${i++}`; }

    const phone = normalisePhone(r.phone);
    const website = normaliseWebsite(r.website);
    const email = (r.email || '').trim();
    const gbUrl = (r.google_maps_url || '').trim() || null;
    const catId = r.category_id || null;
    const address = stripPrivateUnicode(r.address || '');

    try {
      const { rows: [company] } = await client.query(`
        INSERT INTO companies (
          name, slug, phone, email, website, google_business_url,
          main_category_id, status, plan_type, is_claimed, listing_claim_status,
          confidence_score, created_at, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,'draft','basic',false,'unclaimed',0,NOW(),NOW())
        RETURNING id
      `, [name, slug, phone, email, website, gbUrl, catId]);

      await client.query(`
        INSERT INTO locations (
          company_id, address, suburb, city, state, postcode, latitude, longitude
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      `, [
        company.id,
        address,
        (r.suburb || '').trim() || null,
        (r.suburb || '').trim() || null,
        (r.state || '').trim() || null,
        (r.postcode || '').trim(),
        r.latitude || null,
        r.longitude || null,
      ]);

      inserted++;
    } catch (err) {
      console.error(`  Error inserting "${name}": ${err.message}`);
      skipped++;
    }
  }

  console.log(`✓ Inserted ${inserted} new businesses (${skipped} skipped due to errors)`);

  await client.end();

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n── Summary ───────────────────────────────────────────────────');
  console.log(`  Raw records:        ${raw.length}`);
  console.log(`  After junk removal: ${clean.length} (-${junkCount})`);
  console.log(`  After dedup:        ${deduped.length}`);
  console.log(`  Matched to DB:      ${deduped.length - toInsert.length}`);
  console.log(`    → enriched:       ${enriched}`);
  console.log(`  New inserted:       ${inserted}`);
  console.log(`  Skipped/errors:     ${skipped}`);
  console.log('─────────────────────────────────────────────────────────────');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
