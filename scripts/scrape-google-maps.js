/**
 * Google Maps lead scraper
 *
 * For each directory subcategory × city, searches Google Maps,
 * collects business details, visits each website for email / contact URL,
 * saves progress to JSON, writes CSV, upserts to directory_leads table.
 *
 * Usage:
 *   node scripts/scrape-google-maps.js --test           ← DBP Practitioners, 2 subs, NSW, max 100
 *   node scripts/scrape-google-maps.js                  ← all categories, all cities
 *   node scripts/scrape-google-maps.js --parent "Waterproofing Contractors" --state NSW
 *   node scripts/scrape-google-maps.js list             ← show subcategories to scrape
 *
 * Progress is saved after every business — safe to Ctrl+C and resume.
 */

'use strict';

require('dotenv').config({ path: '.env.local' });
const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
chromium.use(StealthPlugin());

const { PrismaClient } = require('@prisma/client');
const fs   = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// ─── Config ──────────────────────────────────────────────────────────────────

const ARGS        = process.argv.slice(2);
const IS_TEST     = ARGS.includes('--test');
const IS_LIST     = ARGS[0] === 'list';
const PARENT_ARG  = argVal('--parent') || (IS_TEST ? 'DBP Practitioners' : null);
const STATE_ARG   = argVal('--state')  || (IS_TEST ? 'NSW' : null);
const MAX_TOTAL   = parseInt(argVal('--max') || (IS_TEST ? '100' : '10000'), 10);
const MAX_SUBS    = IS_TEST ? 2 : Infinity;

const CITIES = [
  { name: 'Sydney',    state: 'NSW', slug: 'sydney-nsw'    },
  { name: 'Melbourne', state: 'VIC', slug: 'melbourne-vic' },
  { name: 'Brisbane',  state: 'QLD', slug: 'brisbane-qld'  },
  { name: 'Perth',     state: 'WA',  slug: 'perth-wa'      },
  { name: 'Adelaide',  state: 'SA',  slug: 'adelaide-sa'   },
  { name: 'Hobart',    state: 'TAS', slug: 'hobart-tas'    },
  { name: 'Canberra',  state: 'ACT', slug: 'canberra-act'  },
  { name: 'Darwin',    state: 'NT',  slug: 'darwin-nt'     },
];

const ACTIVE_CITIES = STATE_ARG
  ? CITIES.filter(c => c.state === STATE_ARG)
  : CITIES;

const OUT_DIR     = path.join(__dirname, '..', 'business-leads-output');
const RAW_FILE    = path.join(OUT_DIR, 'maps-raw.json');
const DONE_FILE   = path.join(OUT_DIR, 'maps-done.json');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function argVal(flag) {
  const i = ARGS.indexOf(flag);
  return i !== -1 && ARGS[i + 1] ? ARGS[i + 1] : null;
}

function log(msg) { console.log(`[${new Date().toISOString().slice(11,19)}] ${msg}`); }

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function randomDelay(min, max) { return sleep(min + Math.random() * (max - min)); }

function loadProgress() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let results = [];
  let done    = new Set();
  try { results = JSON.parse(fs.readFileSync(RAW_FILE, 'utf8')); } catch {}
  try { done    = new Set(JSON.parse(fs.readFileSync(DONE_FILE, 'utf8'))); } catch {}
  return { results, done };
}

function saveProgress(results, done) {
  fs.writeFileSync(RAW_FILE,  JSON.stringify(results, null, 2));
  fs.writeFileSync(DONE_FILE, JSON.stringify([...done], null, 2));
}

function toCsv(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const esc = v => {
    if (v == null) return '';
    const s = String(v);
    return (s.includes(',') || s.includes('"') || s.includes('\n'))
      ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(','), ...rows.map(r => headers.map(h => esc(r[h])).join(','))].join('\n');
}

function extractStateFromAddress(address) {
  const states = ['NSW','VIC','QLD','WA','SA','TAS','ACT','NT'];
  for (const s of states) {
    if (new RegExp(`\\b${s}\\b`).test(address)) return s;
  }
  return null;
}

function extractPostcode(address) {
  return address?.match(/\b(\d{4})\b/)?.[1] || null;
}

function extractSuburb(address) {
  if (!address) return null;
  const parts = (address).split(',').map(p => p.trim());
  for (const part of parts) {
    const m = part.match(/^(.+?)\s+(NSW|VIC|QLD|WA|SA|TAS|ACT|NT)\s+\d{4}$/);
    if (m) return m[1].trim();
  }
  return null;
}

// ─── Browser setup ────────────────────────────────────────────────────────────

async function makePage(browser) {
  const ctx = await browser.newContext({
    userAgent:  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport:   { width: 1280, height: 900 },
    locale:     'en-AU',
    timezoneId: 'Australia/Sydney',
    extraHTTPHeaders: {
      'Accept-Language': 'en-AU,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    },
  });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver',  { get: () => undefined });
    Object.defineProperty(navigator, 'languages',  { get: () => ['en-AU', 'en'] });
    Object.defineProperty(navigator, 'platform',   { get: () => 'MacIntel' });
    Object.defineProperty(navigator, 'plugins',    { get: () => [1, 2, 3, 4, 5] });
    window.chrome = { runtime: {} };
  });
  return { page, ctx };
}

// ─── Google Maps scraping ─────────────────────────────────────────────────────

async function getPlaceUrlsFromSearch(page, query) {
  const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  try {
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await randomDelay(2000, 3500);
  } catch {
    return [];
  }

  // Dismiss cookie consent if shown
  await page.locator('button:has-text("Accept all"), button:has-text("Reject all")').first()
    .click().catch(() => null);
  await randomDelay(500, 1000);

  // Check for no results
  const pageText = await page.locator('body').textContent().catch(() => '');
  if (pageText.includes("Google Maps can't find") || pageText.includes('No results for')) {
    return [];
  }

  // Wait for the results feed
  const feed = page.locator('div[role="feed"]');
  const feedVisible = await feed.waitFor({ timeout: 12000 }).then(() => true).catch(() => false);
  if (!feedVisible) return [];

  // Scroll feed to load all results (up to ~60)
  for (let i = 0; i < 10; i++) {
    await feed.evaluate(el => { el.scrollTop += 800; });
    await randomDelay(1200, 2000);

    const endMsg = await page.locator("text=You've reached the end of the list").count().catch(() => 0);
    if (endMsg > 0) break;
  }

  // Collect all place URLs from the feed
  const placeUrls = await page.$$eval('a[href*="/maps/place/"]', els =>
    [...new Set(els.map(el => el.href).filter(h => h.includes('/maps/place/')))]
  ).catch(() => []);

  return placeUrls;
}

async function extractPlaceDetails(page, placeUrl) {
  try {
    await page.goto(placeUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await randomDelay(1500, 2500);
  } catch {
    return null;
  }

  // Name
  const name = await page.locator('h1').first().textContent().catch(() => null);
  if (!name?.trim()) return null;

  // All info items keyed by data-item-id
  const infoItems = await page.$$eval('[data-item-id]', els =>
    els.map(el => ({
      id:   el.dataset.itemId || '',
      text: el.textContent?.trim() || '',
      href: el.tagName === 'A' ? (el.href || null) : null,
    }))
  ).catch(() => []);

  const phone = infoItems.find(i => i.id.startsWith('phone:'))?.text
    || infoItems.find(i => /^\+?\d[\d\s\-()]{7,}$/.test(i.text))?.text
    || null;

  const websiteItem = infoItems.find(i => i.id === 'authority');
  const website = websiteItem?.href || websiteItem?.text || null;

  const address = infoItems.find(i => i.id.startsWith('laddress:') || i.id === 'address')?.text
    || infoItems.find(i => /\d{4}/.test(i.text) && i.text.length < 120)?.text
    || null;

  // Rating
  const ratingLabel = await page.locator('[aria-label*="stars"]').first().getAttribute('aria-label').catch(() => null);
  const rating = ratingLabel ? parseFloat(ratingLabel.match(/[\d.]+/)?.[0]) : null;

  // Review count
  const reviewText = await page.locator('span:has-text("reviews"), button:has-text("reviews")').first().textContent().catch(() => null);
  const reviewCount = reviewText ? parseInt(reviewText.replace(/[^\d]/g, '')) || null : null;

  // Maps URL (canonical)
  const mapsUrl = page.url();

  return {
    name:          name.trim(),
    phone:         phone?.replace(/\s+/g, ' ').trim() || null,
    website:       website?.split('?')[0] || null,   // strip tracking params
    address:       address || null,
    rating,
    reviewCount,
    mapsUrl,
  };
}

// ─── Website scraping ─────────────────────────────────────────────────────────

async function checkRobotsAllowed(page, website) {
  try {
    const base = new URL(website);
    const robotsUrl = `${base.protocol}//${base.host}/robots.txt`;
    const res = await page.goto(robotsUrl, { waitUntil: 'domcontentloaded', timeout: 8000 });
    if (!res || res.status() !== 200) return true;
    const body = await page.content();
    const lines = body.split('\n').map(l => l.trim().toLowerCase());
    let inBlock = false;
    for (const line of lines) {
      if (line.startsWith('user-agent:')) inBlock = line.includes('*');
      if (inBlock && line === 'disallow: /') return false;
    }
    return true;
  } catch {
    return true;
  }
}

async function scrapeWebsiteForContact(page, website) {
  const result = { email: null, contactUrl: null };
  if (!website) return result;

  try {
    const allowed = await checkRobotsAllowed(page, website);
    if (!allowed) return result;

    // Visit homepage
    await page.goto(website, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await randomDelay(800, 1500);

    const homeHtml = await page.content();

    // Look for mailto links
    const mailtoMatch = homeHtml.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/);
    if (mailtoMatch) { result.email = mailtoMatch[1]; return result; }

    // Plain email pattern (exclude common false positives)
    const emailMatch = homeHtml.match(/\b([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\b/);
    if (emailMatch) {
      const e = emailMatch[1].toLowerCase();
      const skip = ['example.', 'domain.com', 'sentry.', 'cloudflare', 'wix.', 'wordpress.',
                    'schema.org', 'w3.org', 'youremail', 'email.com', 'test.com', 'mailchimp',
                    'sendgrid', 'amazonaws', 'google.com', 'apple.com'];
      const imgExt = /\.(png|jpg|jpeg|gif|svg|webp|ico|bmp)$/i;
      if (!skip.some(s => e.includes(s)) && !imgExt.test(e)) { result.email = e; return result; }
    }

    // Find contact page link
    const contactHref = await page.$$eval('a[href]', els => {
      const contact = els.find(el => /contact|get.in.touch|enquir|email.us/i.test(el.href + el.textContent));
      return contact?.href || null;
    }).catch(() => null);

    if (contactHref && contactHref !== website) {
      result.contactUrl = contactHref;
      try {
        await page.goto(contactHref, { waitUntil: 'domcontentloaded', timeout: 12000 });
        await randomDelay(600, 1200);
        const contactHtml = await page.content();

        const m1 = contactHtml.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/);
        if (m1) { result.email = m1[1]; return result; }

        const m2 = contactHtml.match(/\b([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\b/);
        if (m2) {
          const e = m2[1].toLowerCase();
          const skip = ['example.', 'domain.com', 'sentry.', 'cloudflare', 'wix.', 'wordpress.',
                        'schema.org', 'w3.org', 'youremail', 'email.com', 'test.com', 'mailchimp',
                        'sendgrid', 'amazonaws', 'google.com', 'apple.com'];
          const imgExt = /\.(png|jpg|jpeg|gif|svg|webp|ico|bmp)$/i;
          if (!skip.some(s => e.includes(s)) && !imgExt.test(e)) result.email = e;
        }
      } catch { /* contact page scrape failed — keep contactUrl */ }
    }
  } catch { /* whole website visit failed */ }

  return result;
}

// ─── DB upsert ────────────────────────────────────────────────────────────────

async function upsertLead(lead) {
  try {
    await prisma.directoryLead.upsert({
      where:  { google_place_id: lead.google_place_id },
      create: {
        google_place_id:               lead.google_place_id,
        business_name:                 lead.business_name,
        phone:                         lead.phone,
        website:                       lead.website,
        email:                         lead.email,
        address:                       lead.address,
        suburb:                        lead.suburb,
        state:                         lead.state,
        postcode:                      lead.postcode,
        latitude:                      lead.latitude,
        longitude:                     lead.longitude,
        google_maps_url:               lead.google_maps_url,
        google_rating:                 lead.google_rating,
        google_review_count:           lead.google_review_count,
        category_id:                   lead.category_id,
        subcategory_id:                lead.subcategory_id,
        category_name:                 lead.category_name,
        subcategory_name:              lead.subcategory_name,
        search_query:                  lead.search_query,
        status:                        'unverified',
        approved_for_public_directory: false,
        website_scraped:               lead.website_scraped,
        website_scrape_error:          lead.website_scrape_error,
        notes:                         lead.contact_url ? `Contact form: ${lead.contact_url}` : null,
      },
      update: {
        business_name:       lead.business_name,
        phone:               lead.phone,
        website:             lead.website,
        email:               lead.email,
        address:             lead.address,
        suburb:              lead.suburb,
        state:               lead.state,
        postcode:            lead.postcode,
        google_rating:       lead.google_rating,
        google_review_count: lead.google_review_count,
        website_scraped:     lead.website_scraped,
        notes:               lead.contact_url ? `Contact form: ${lead.contact_url}` : undefined,
        updated_at:          new Date(),
      },
    });
  } catch (err) {
    if (err.code !== 'P2002') log(`  DB error: ${err.message?.slice(0, 80)}`);
  }
}

// ─── Place ID extraction ──────────────────────────────────────────────────────

function extractPlaceId(mapsUrl) {
  // From the final URL after navigation, extract the place_id if present
  // Google Maps URLs typically contain the place after redirects
  // Fall back to hashing the maps URL
  const m = mapsUrl.match(/0x[0-9a-f]+:0x[0-9a-f]+/i);
  if (m) return m[0];
  // Use URL as unique key
  return mapsUrl.replace(/https?:\/\//, '').replace(/[^a-z0-9]/gi, '_').slice(0, 120);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Load categories from DB
  const parentWhere = PARENT_ARG
    ? { name: PARENT_ARG, parent_id: null }
    : { parent_id: null };

  const parents = await prisma.category.findMany({
    where:   parentWhere,
    include: { children: { where: { is_active: true }, orderBy: { display_order: 'asc' }, take: MAX_SUBS === Infinity ? undefined : MAX_SUBS } },
    orderBy: { display_order: 'asc' },
  });

  if (!parents.length) {
    console.error(`No parent categories found${PARENT_ARG ? ` matching "${PARENT_ARG}"` : ''}`);
    process.exit(1);
  }

  // Build flat list of {parent, sub, city} combos
  const combos = [];
  for (const parent of parents) {
    const subs = IS_TEST ? parent.children.slice(0, MAX_SUBS) : parent.children;
    for (const sub of subs) {
      for (const city of ACTIVE_CITIES) {
        combos.push({ parent, sub, city });
      }
    }
  }

  if (IS_LIST) {
    console.log(`\n${combos.length} combos to scrape:\n`);
    combos.forEach((c, i) => console.log(`  [${i}] ${c.sub.name} — ${c.city.name}`));
    process.exit(0);
  }

  log(`Starting: ${combos.length} combos (${parents.length} parent${parents.length > 1 ? 's' : ''}, ${ACTIVE_CITIES.length} cit${ACTIVE_CITIES.length > 1 ? 'ies' : 'y'})`);
  if (IS_TEST) log('TEST MODE: DBP Practitioners, 2 subs, NSW only, max 100');

  const { results, done } = loadProgress();
  log(`Resuming: ${done.size} combos already done, ${results.length} businesses collected`);

  let totalNew = 0;

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled', '--disable-setuid-sandbox'],
  });

  let { page: mapsPage, ctx: mapsCtx } = await makePage(browser);
  let { page: webPage,  ctx: webCtx  } = await makePage(browser);

  let consecutiveEmpty = 0;

  for (const { parent, sub, city } of combos) {
    if (results.length >= MAX_TOTAL) {
      log(`Reached max (${MAX_TOTAL}). Stopping.`);
      break;
    }

    const comboKey = `${sub.id}::${city.slug}`;
    if (done.has(comboKey)) {
      continue; // already scraped this combo
    }

    const query = `${sub.name} ${city.name} ${city.state} Australia`;
    log(`\n── ${sub.name} | ${city.name}`);
    log(`   Query: "${query}"`);

    // Reset Maps browser context after every 30 combos to avoid fingerprinting
    if (done.size > 0 && done.size % 30 === 0) {
      log('   Resetting Maps browser context...');
      await mapsCtx.close();
      await randomDelay(5000, 8000);
      ({ page: mapsPage, ctx: mapsCtx } = await makePage(browser));
    }

    const placeUrls = await getPlaceUrlsFromSearch(mapsPage, query);
    log(`   Found ${placeUrls.length} place URLs`);

    if (!placeUrls.length) {
      consecutiveEmpty++;
      done.add(comboKey);
      saveProgress(results, done);
      if (consecutiveEmpty >= 5) {
        log('   5 consecutive empty searches — pausing 30s...');
        await sleep(30000);
        consecutiveEmpty = 0;
      }
      continue;
    }

    consecutiveEmpty = 0;
    let addedThisCombo = 0;

    for (const placeUrl of placeUrls) {
      if (results.length >= MAX_TOTAL) break;

      // Skip if we already have this place (from a previous combo)
      const placeId = extractPlaceId(placeUrl);
      if (results.some(r => r.google_place_id === placeId)) continue;

      await randomDelay(1500, 3000);
      const details = await extractPlaceDetails(mapsPage, placeUrl);
      if (!details?.name) continue;

      // State filter
      const detectedState = extractStateFromAddress(details.address || '');
      if (STATE_ARG && detectedState && detectedState !== STATE_ARG) continue;

      // Website visit for email/contact
      let email       = null;
      let contactUrl  = null;
      let scraped     = false;
      let scrapeError = null;

      if (details.website) {
        try {
          await randomDelay(800, 1500);
          const contactResult = await scrapeWebsiteForContact(webPage, details.website);
          email      = contactResult.email;
          contactUrl = contactResult.contactUrl;
          scraped    = true;
        } catch (err) {
          scrapeError = err.message?.slice(0, 100);
        }
      }

      // Extract geo from Maps URL
      const geoMatch = placeUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      const latitude  = geoMatch ? parseFloat(geoMatch[1]) : null;
      const longitude = geoMatch ? parseFloat(geoMatch[2]) : null;

      const lead = {
        google_place_id:    placeId,
        business_name:      details.name,
        phone:              details.phone,
        website:            details.website,
        email,
        contact_url:        contactUrl,
        address:            details.address,
        suburb:             extractSuburb(details.address),
        state:              detectedState || STATE_ARG || city.state,
        postcode:           extractPostcode(details.address),
        latitude,
        longitude,
        google_maps_url:    details.mapsUrl,
        google_rating:      details.rating,
        google_review_count: details.reviewCount,
        category_id:        parent.id,
        subcategory_id:     sub.id,
        category_name:      parent.name,
        subcategory_name:   sub.name,
        search_query:       query,
        website_scraped:    scraped,
        website_scrape_error: scrapeError,
      };

      results.push(lead);
      addedThisCombo++;
      totalNew++;

      const emailIcon = email ? '✉' : contactUrl ? '📋' : '·';
      log(`   [${results.length}] ${emailIcon} ${lead.business_name} — ${lead.suburb || ''} ${lead.state || ''}`);

      // Upsert to DB
      await upsertLead(lead);

      // Save progress after every business
      saveProgress(results, done);

      await randomDelay(1000, 2500);
    }

    done.add(comboKey);
    saveProgress(results, done);
    log(`   Done: ${addedThisCombo} new businesses`);

    await randomDelay(3000, 6000);
  }

  await browser.close();
  await prisma.$disconnect();

  // Write final CSV
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const csvFile   = path.join(OUT_DIR, `maps-leads-${timestamp}.csv`);
  const csvRows   = results.map(r => ({
    business_name:     r.business_name,
    phone:             r.phone || '',
    email:             r.email || '',
    contact_url:       r.contact_url || '',
    website:           r.website || '',
    address:           r.address || '',
    suburb:            r.suburb || '',
    state:             r.state || '',
    postcode:          r.postcode || '',
    google_rating:     r.google_rating || '',
    google_review_count: r.google_review_count || '',
    category:          r.category_name || '',
    subcategory:       r.subcategory_name || '',
    search_query:      r.search_query || '',
    google_maps_url:   r.google_maps_url || '',
  }));
  fs.writeFileSync(csvFile, toCsv(csvRows), 'utf8');

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`DONE`);
  console.log(`  Total businesses collected : ${results.length}`);
  console.log(`  New this run               : ${totalNew}`);
  console.log(`  With email                 : ${results.filter(r => r.email).length}`);
  console.log(`  With contact form          : ${results.filter(r => r.contact_url && !r.email).length}`);
  console.log(`  With website only          : ${results.filter(r => r.website && !r.email && !r.contact_url).length}`);
  console.log(`  No web presence            : ${results.filter(r => !r.website).length}`);
  console.log(`  CSV: ${csvFile}`);
  console.log(`  DB:  directory_leads table (Supabase)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(err => { console.error(err); process.exit(1); });
