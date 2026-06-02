/**
 * Business lead collector — Google Places API
 *
 * Discovers businesses by category/subcategory via Google Places Text Search,
 * enriches with Place Details, optionally scrapes websites for email,
 * deduplicates by google_place_id, writes CSVs, inserts to directory_leads.
 *
 * Usage:
 *   node scripts/collect-leads.js                         ← full run (all categories)
 *   node scripts/collect-leads.js --test                  ← test: DBP Practitioners, 2 subs, NSW/Sydney, max 100
 *   node scripts/collect-leads.js --parent "DBP Practitioners" --state NSW --max 50
 *
 * Required env var:
 *   GOOGLE_PLACES_API_KEY
 */

'use strict';

require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// ─── Config ──────────────────────────────────────────────────────────────────

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const ARGS = process.argv.slice(2);
const IS_TEST = ARGS.includes('--test');
const STATE_ARG = argVal('--state') || (IS_TEST ? 'NSW' : null);
const MAX_TOTAL = parseInt(argVal('--max') || (IS_TEST ? '100' : '5000'), 10);
const PARENT_FILTER = argVal('--parent') || (IS_TEST ? 'DBP Practitioners' : null);
const MAX_SUBS = IS_TEST ? 2 : Infinity;

const SYDNEY_COORDS = { lat: -33.8688, lng: 151.2093 };
const STATE_COORDS = {
  NSW: { lat: -33.8688, lng: 151.2093 },  // Sydney
  VIC: { lat: -37.8136, lng: 144.9631 },  // Melbourne
  QLD: { lat: -27.4698, lng: 153.0251 },  // Brisbane
  WA:  { lat: -31.9505, lng: 115.8605 },  // Perth
  SA:  { lat: -34.9285, lng: 138.6007 },  // Adelaide
  TAS: { lat: -42.8821, lng: 147.3272 },  // Hobart
  ACT: { lat: -35.2809, lng: 149.1300 },  // Canberra
  NT:  { lat: -12.4634, lng: 130.8456 },  // Darwin
};

const SEARCH_RADIUS_M = 50000; // 50 km radius
const PLACES_FIELDS = 'place_id,name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,geometry,url';

const OUTPUT_DIR = path.join(__dirname, '..', 'business-leads-output');
const prisma = new PrismaClient();

// ─── Helpers ─────────────────────────────────────────────────────────────────

function argVal(flag) {
  const idx = ARGS.indexOf(flag);
  return idx !== -1 && ARGS[idx + 1] ? ARGS[idx + 1] : null;
}

function log(msg) { console.log(`[${new Date().toISOString()}] ${msg}`); }

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { timeout: 10000 }, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject).on('timeout', () => reject(new Error('timeout')));
  });
}

async function placesTextSearch(query, coords) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${coords.lat},${coords.lng}&radius=${SEARCH_RADIUS_M}&key=${API_KEY}`;
  const { body } = await httpsGet(url);
  return JSON.parse(body);
}

async function placeDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${PLACES_FIELDS}&key=${API_KEY}`;
  const { body } = await httpsGet(url);
  return JSON.parse(body);
}

async function checkRobotsAllowed(website) {
  try {
    const base = new URL(website);
    const robotsUrl = `${base.protocol}//${base.host}/robots.txt`;
    const { body } = await httpsGet(robotsUrl);
    const lines = body.split('\n').map(l => l.trim().toLowerCase());
    let inRelevantBlock = false;
    for (const line of lines) {
      if (line.startsWith('user-agent:')) {
        inRelevantBlock = line.includes('*') || line.includes('claude') || line.includes('bot');
      }
      if (inRelevantBlock && line.startsWith('disallow: /') && !line.startsWith('disallow: //')) {
        return false; // disallow all
      }
    }
    return true;
  } catch {
    return true; // can't fetch robots.txt → allow by default
  }
}

async function scrapeEmail(website) {
  try {
    const allowed = await checkRobotsAllowed(website);
    if (!allowed) return { email: null, error: 'blocked by robots.txt' };

    const { status, body } = await httpsGet(website);
    if (status !== 200) return { email: null, error: `HTTP ${status}` };

    const mailtos = body.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g) || [];
    if (mailtos.length > 0) {
      const email = mailtos[0].replace('mailto:', '');
      return { email, error: null };
    }

    // Plain text email pattern
    const plain = body.match(/\b([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\b/);
    if (plain && !plain[1].includes('example.') && !plain[1].includes('@sentry') && !plain[1].includes('@cloudflare')) {
      return { email: plain[1], error: null };
    }

    return { email: null, error: null };
  } catch (err) {
    return { email: null, error: err.message };
  }
}

function extractSuburb(address) {
  if (!address) return null;
  const parts = address.split(',').map(p => p.trim());
  // Typically: "123 Street, Suburb STATE Postcode, Australia"
  if (parts.length >= 2) {
    const middle = parts[parts.length - 2];
    const suburbMatch = middle.match(/^([A-Za-z\s]+)\s+(?:NSW|VIC|QLD|WA|SA|TAS|ACT|NT)\s+\d{4}/);
    if (suburbMatch) return suburbMatch[1].trim();
    return middle.split(/\s+(?:NSW|VIC|QLD|WA|SA|TAS|ACT|NT)/)[0].trim();
  }
  return null;
}

function extractPostcode(address) {
  const m = address?.match(/\b(\d{4})\b/);
  return m ? m[1] : null;
}

function extractState(address) {
  const valid = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
  for (const s of valid) {
    if (address?.includes(` ${s} `) || address?.includes(` ${s},`) || address?.includes(` ${s}\n`)) return s;
  }
  return null;
}

function toCsv(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escape = v => {
    if (v == null) return '';
    const s = String(v);
    return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(','), ...rows.map(r => headers.map(h => escape(r[h])).join(','))];
  return lines.join('\n');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!API_KEY) {
    console.error('ERROR: GOOGLE_PLACES_API_KEY is not set in .env.local');
    console.error('Add: GOOGLE_PLACES_API_KEY=<your-key>');
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Load categories from DB
  const parentWhere = PARENT_FILTER
    ? { name: PARENT_FILTER, parent_id: null }
    : { parent_id: null };

  const parents = await prisma.category.findMany({
    where: parentWhere,
    include: { children: { where: { is_active: true }, orderBy: { display_order: 'asc' } } },
    orderBy: { display_order: 'asc' },
  });

  if (!parents.length) {
    log(`No parent categories found${PARENT_FILTER ? ` matching "${PARENT_FILTER}"` : ''}`);
    process.exit(1);
  }

  log(`Loaded ${parents.length} parent categor${parents.length === 1 ? 'y' : 'ies'}`);

  const coords = STATE_ARG && STATE_COORDS[STATE_ARG] ? STATE_COORDS[STATE_ARG] : SYDNEY_COORDS;
  const stateLabel = STATE_ARG || 'NSW';

  let totalCollected = 0;
  const allLeads = [];

  outer:
  for (const parent of parents) {
    const subs = parent.children.slice(0, MAX_SUBS);
    log(`\n── Parent: ${parent.name} (${subs.length} subcategories)`);

    for (const sub of subs) {
      if (totalCollected >= MAX_TOTAL) {
        log(`Reached max total (${MAX_TOTAL}). Stopping.`);
        break outer;
      }

      const query = `${sub.name} ${stateLabel} Australia`;
      log(`  Searching: "${query}"`);

      let pageToken = null;
      let pageCount = 0;
      const seenInSub = new Set();

      do {
        let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${coords.lat},${coords.lng}&radius=${SEARCH_RADIUS_M}&key=${API_KEY}`;
        if (pageToken) url += `&pagetoken=${pageToken}`;

        const { body } = await httpsGet(url);
        const result = JSON.parse(body);

        if (result.status === 'REQUEST_DENIED' || result.status === 'INVALID_REQUEST') {
          log(`  API error: ${result.status} — ${result.error_message || ''}`);
          break;
        }

        const places = result.results || [];
        log(`  Page ${pageCount + 1}: ${places.length} results (status: ${result.status})`);

        for (const place of places) {
          if (totalCollected >= MAX_TOTAL) break;
          if (seenInSub.has(place.place_id)) continue;
          seenInSub.add(place.place_id);

          // Get details
          await sleep(200); // be polite to the API
          const detailRes = await placeDetails(place.place_id);
          const d = detailRes.result || {};

          const address = d.formatted_address || place.formatted_address || '';
          const state = extractState(address);

          // Filter to target state if specified
          if (STATE_ARG && state && state !== STATE_ARG) continue;

          // Scrape email from website
          let email = null;
          let scrapeError = null;
          let scraped = false;
          if (d.website) {
            await sleep(500);
            const scrapeResult = await scrapeEmail(d.website);
            email = scrapeResult.email;
            scrapeError = scrapeResult.error;
            scraped = true;
          }

          const lead = {
            google_place_id: place.place_id,
            business_name: d.name || place.name,
            phone: d.formatted_phone_number || null,
            website: d.website || null,
            email,
            address: address || null,
            suburb: extractSuburb(address),
            state: state || STATE_ARG || null,
            postcode: extractPostcode(address),
            latitude: d.geometry?.location?.lat || place.geometry?.location?.lat || null,
            longitude: d.geometry?.location?.lng || place.geometry?.location?.lng || null,
            google_maps_url: d.url || null,
            google_rating: d.rating || place.rating || null,
            google_review_count: d.user_ratings_total || place.user_ratings_total || null,
            category_id: parent.id,
            subcategory_id: sub.id,
            category_name: parent.name,
            subcategory_name: sub.name,
            search_query: query,
            status: 'unverified',
            approved_for_public_directory: false,
            website_scraped: scraped,
            website_scrape_error: scrapeError,
            notes: null,
          };

          allLeads.push(lead);
          totalCollected++;
          log(`    [${totalCollected}] ${lead.business_name} — ${lead.suburb || ''} ${lead.state || ''}`);
        }

        pageToken = result.next_page_token || null;
        pageCount++;

        if (pageToken) await sleep(2000); // Google requires delay before next page token is ready
      } while (pageToken && pageCount < 3 && totalCollected < MAX_TOTAL);

      await sleep(1000); // between subcategories
    }
  }

  log(`\nCollected ${allLeads.length} leads total`);

  if (!allLeads.length) {
    log('No leads to save. Exiting.');
    return;
  }

  // Deduplicate by google_place_id
  const deduped = Object.values(
    allLeads.reduce((acc, l) => { acc[l.google_place_id] = l; return acc; }, {})
  );
  log(`After deduplication: ${deduped.length} unique leads`);

  // Write CSV
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const csvFile = path.join(OUTPUT_DIR, `leads-${timestamp}.csv`);
  fs.writeFileSync(csvFile, toCsv(deduped), 'utf8');
  log(`CSV written: ${csvFile}`);

  // Insert to Supabase (skip existing by place_id)
  let inserted = 0;
  let skipped = 0;

  for (const lead of deduped) {
    try {
      await prisma.directoryLead.upsert({
        where: { google_place_id: lead.google_place_id },
        update: {
          business_name: lead.business_name,
          phone: lead.phone,
          website: lead.website,
          email: lead.email,
          address: lead.address,
          suburb: lead.suburb,
          state: lead.state,
          postcode: lead.postcode,
          latitude: lead.latitude,
          longitude: lead.longitude,
          google_maps_url: lead.google_maps_url,
          google_rating: lead.google_rating,
          google_review_count: lead.google_review_count,
          website_scraped: lead.website_scraped,
          website_scrape_error: lead.website_scrape_error,
          updated_at: new Date(),
        },
        create: {
          google_place_id: lead.google_place_id,
          business_name: lead.business_name,
          phone: lead.phone,
          website: lead.website,
          email: lead.email,
          address: lead.address,
          suburb: lead.suburb,
          state: lead.state,
          postcode: lead.postcode,
          latitude: lead.latitude,
          longitude: lead.longitude,
          google_maps_url: lead.google_maps_url,
          google_rating: lead.google_rating,
          google_review_count: lead.google_review_count,
          category_id: lead.category_id,
          subcategory_id: lead.subcategory_id,
          category_name: lead.category_name,
          subcategory_name: lead.subcategory_name,
          search_query: lead.search_query,
          status: 'unverified',
          approved_for_public_directory: false,
          website_scraped: lead.website_scraped,
          website_scrape_error: lead.website_scrape_error,
          notes: null,
        },
      });
      inserted++;
    } catch (err) {
      if (err.code === 'P2002') {
        skipped++; // duplicate
      } else {
        log(`  DB error for ${lead.business_name}: ${err.message}`);
      }
    }
  }

  log(`\nDatabase: ${inserted} inserted/updated, ${skipped} skipped (already existed)`);
  log(`Done. CSV at: ${csvFile}`);
}

main()
  .catch(err => { console.error(err); process.exit(1); })
  .finally(() => prisma.$disconnect());
