/**
 * Yellow Pages scraper — one category at a time
 *
 * Usage:
 *   node scripts/scrape-yellowpages.js <category-index>
 *   node scripts/scrape-yellowpages.js list          ← show all categories
 *
 * Examples:
 *   node scripts/scrape-yellowpages.js 0    ← remedial-building-consultants
 *   node scripts/scrape-yellowpages.js 1    ← structural-engineers
 *
 * Results accumulate in scripts/scraped-data/yp-raw.json
 * Final deduped file: scripts/scraped-data/yp-deduped.json
 */

const { chromium } = require("playwright-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
chromium.use(StealthPlugin());
const fs = require("fs");
const path = require("path");

const OUT_RAW    = path.join(__dirname, "scraped-data", "yp-raw.json");
const OUT_DEDUPED = path.join(__dirname, "scraped-data", "yp-deduped.json");

// ─── All categories ───────────────────────────────────────────────────────────
const SEARCHES = [
  // 0-7: Consultants & Practitioners
  { yp: "remedial-building-consultants",      cat: "remedial-consultants" },
  { yp: "structural-engineers",               cat: "structural-engineers" },
  { yp: "building-consultants",               cat: "remedial-consultants" },
  { yp: "quantity-surveyors",                 cat: "quantity-surveyors" },
  { yp: "building-surveyors",                 cat: "building-surveyors-certifiers" },
  { yp: "strata-managers",                    cat: "strata-managers" },
  { yp: "project-managers",                   cat: "project-managers" },
  { yp: "acoustic-consultants",               cat: "acoustic-consultants" },

  // 8-13: Remedial Contractors
  { yp: "concrete-repair-contractors",        cat: "concrete-spalling-contractors" },
  { yp: "crack-injection-contractors",        cat: "crack-injection-contractors" },
  { yp: "facade-repair-contractors",          cat: "facade-repair-contractors" },
  { yp: "balcony-repair-contractors",         cat: "balcony-repair-contractors" },
  { yp: "protective-coating-contractors",     cat: "protective-coating-contractors" },
  { yp: "shotcrete-contractors",              cat: "shotcrete-contractors" },

  // 14-15: Waterproofing
  { yp: "waterproofing-contractors",          cat: "licensed-waterproofers" },
  { yp: "leak-detection",                     cat: "leak-detection-specialists" },

  // 16-19: Roofing
  { yp: "roofing-contractors",                cat: "roofing-contractors" },
  { yp: "roof-plumbers",                      cat: "roof-leak-repair-contractors" },
  { yp: "roof-repairs",                       cat: "roof-leak-repair-contractors" },
  { yp: "guttering",                          cat: "box-gutter-contractors" },

  // 20-24: Facade & External Envelope
  { yp: "cladding",                           cat: "cladding-contractors" },
  { yp: "rendering",                          cat: "renderers" },
  { yp: "window-repairs",                     cat: "window-replacement-contractors" },
  { yp: "glaziers",                           cat: "glaziers" },
  { yp: "balustrades",                        cat: "balustrade-contractors" },

  // 25-28: Masonry & Brick
  { yp: "bricklayers",                        cat: "bricklayers" },
  { yp: "brick-repairs",                      cat: "brick-repointing-contractors" },
  { yp: "repointing",                         cat: "brick-repointing-contractors" },
  { yp: "stone-restoration",                  cat: "stone-restoration-contractors" },

  // 29-31: Access Systems
  { yp: "scaffolding",                        cat: "scaffold-companies" },
  { yp: "rope-access",                        cat: "rope-access-contractors" },
  { yp: "height-safety",                      cat: "height-safety-contractors" },

  // 32-35: Investigation & Testing
  { yp: "concrete-scanning",                  cat: "concrete-scanning" },
  { yp: "non-destructive-testing",            cat: "ndt-testing" },
  { yp: "drone-services",                     cat: "drone-inspection" },
  { yp: "asbestos-testing",                   cat: "asbestos-consultants" },

  // 36-37: Hazardous Materials
  { yp: "asbestos-removal",                   cat: "asbestos-removal-contractors" },
  { yp: "mould-removal",                      cat: "mould-remediation-contractors" },

  // 38-40: Demolition
  { yp: "demolition-contractors",             cat: "selective-demolition-contractors" },
  { yp: "concrete-cutting",                   cat: "concrete-cutting" },
  { yp: "concrete-core-drilling",             cat: "core-drilling" },

  // 41-44: Plumbing & Drainage
  { yp: "plumbers",                           cat: "commercial-plumbers" },
  { yp: "drainage-contractors",               cat: "drainage-contractors" },
  { yp: "pipe-relining",                      cat: "pipe-relining-contractors" },
  { yp: "stormwater-drainage",                cat: "stormwater-contractors" },

  // 45-48: Electrical
  { yp: "electricians",                       cat: "commercial-electricians" },
  { yp: "solar-power",                        cat: "solar-battery-installers" },
  { yp: "ev-charging",                        cat: "ev-charging-installers" },
  { yp: "security-systems",                   cat: "security-access-electricians" },

  // 49-50: HVAC & Mechanical
  { yp: "air-conditioning-contractors",       cat: "air-conditioning-contractors" },
  { yp: "ventilation",                        cat: "mechanical-ventilation-contractors" },

  // 51-54: Fire Services
  { yp: "fire-protection",                    cat: "fire-sprinkler-contractors" },
  { yp: "fire-sprinklers",                    cat: "fire-sprinkler-contractors" },
  { yp: "fire-alarms",                        cat: "fire-detection-alarm-contractors" },
  { yp: "fire-doors",                         cat: "fire-door-contractors" },

  // 55-59: Security & Building Access
  { yp: "locksmiths",                         cat: "locksmiths" },
  { yp: "automatic-doors",                    cat: "automatic-door-contractors" },
  { yp: "garage-doors",                       cat: "garage-door-contractors" },
  { yp: "intercoms",                          cat: "intercom-contractors" },
  { yp: "access-control",                     cat: "access-control-contractors" },

  // 60-61: Lifts
  { yp: "lift-maintenance",                   cat: "lift-maintenance-contractors" },
  { yp: "elevators",                          cat: "lift-maintenance-contractors" },

  // 62-65: Specialist Trades
  { yp: "tilers",                             cat: "tilers" },
  { yp: "painters",                           cat: "painters" },
  { yp: "epoxy-flooring",                     cat: "epoxy-flooring-contractors" },
  { yp: "carpenters",                         cat: "carpenters" },

  // 66-68: Landscaping
  { yp: "landscapers",                        cat: "landscape-contractors" },
  { yp: "tree-services",                      cat: "tree-services-arborists" },
  { yp: "irrigation",                         cat: "irrigation-contractors" },

  // 69-73: Cleaning & Maintenance
  { yp: "commercial-cleaning",                cat: "commercial-cleaners" },
  { yp: "window-cleaning",                    cat: "high-rise-window-cleaning-rope-access" },
  { yp: "pressure-cleaning",                  cat: "pressure-washing-contractors" },
  { yp: "graffiti-removal",                   cat: "graffiti-removal-contractors" },
  { yp: "pest-control",                       cat: "pest-control-contractors" },

  // 74-75: Legal, Insurance & Finance
  { yp: "building-lawyers",                   cat: "building-defect-lawyers" },
  { yp: "insurance-brokers",                  cat: "strata-insurance-brokers" },

  // 76-77: Suppliers & Materials
  { yp: "waterproofing-products",             cat: "waterproofing-suppliers" },
  { yp: "building-products",                  cat: "concrete-repair-suppliers" },

  // 78-79: Waste
  { yp: "skip-bins",                          cat: "skip-bin-companies" },
  { yp: "rubbish-removal",                    cat: "rubbish-removal" },
];

// All cities — used when running with --all-cities flag
const ALL_CITIES = [
  { slug: "sydney-nsw",    state: "NSW", suburb: "Sydney",    postcode: "2000" },
  { slug: "melbourne-vic", state: "VIC", suburb: "Melbourne", postcode: "3000" },
  { slug: "brisbane-qld",  state: "QLD", suburb: "Brisbane",  postcode: "4000" },
  { slug: "perth-wa",      state: "WA",  suburb: "Perth",     postcode: "6000" },
  { slug: "adelaide-sa",   state: "SA",  suburb: "Adelaide",  postcode: "5000" },
  { slug: "hobart-tas",    state: "TAS", suburb: "Hobart",    postcode: "7000" },
];

// Active city pass — change this for each city run
const ACTIVE_CITY = process.env.CITY || "sydney-nsw";
const CITIES = process.argv.includes("--all-cities")
  ? ALL_CITIES
  : ALL_CITIES.filter((c) => c.slug === ACTIVE_CITY);

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function loadExisting() {
  if (!fs.existsSync(OUT_RAW)) return { done: new Set(), results: [] };
  try {
    const data = JSON.parse(fs.readFileSync(OUT_RAW, "utf8"));
    const done = new Set(data.map((r) => r._key).filter(Boolean));
    return { done, results: data };
  } catch { return { done: new Set(), results: [] }; }
}

function save(results) {
  fs.mkdirSync(path.dirname(OUT_RAW), { recursive: true });
  fs.writeFileSync(OUT_RAW, JSON.stringify(results, null, 2));
}

function isCloudflareBlocked(title) {
  return title.includes("Attention Required") ||
         title.includes("Just a moment") ||
         title.includes("Checking your browser") ||
         title.includes("Please wait") ||
         title.includes("Security check");
}

function parseListings(raw, cityInfo, categorySlug) {
  const out = [];
  for (const l of raw) {
    if (!l.name || l.name.length < 2) continue;
    const postcode = (l.locality || "").match(/\b(\d{4})\b/)?.[1] ?? cityInfo.postcode;
    const suburb   = (l.locality || "").split(",")[0]?.trim() || cityInfo.suburb;
    out.push({
      name:        l.name,
      phone:       (l.phone || "").replace(/\s+/g, " ").trim(),
      address:     l.address || "",
      suburb,
      state:       cityInfo.state,
      postcode,
      website:     l.website || "",
      description: l.desc || "",
      category:    categorySlug,
      ypLink:      l.ypLink ? `https://www.yellowpages.com.au${l.ypLink.startsWith("/") ? l.ypLink : ""}` : "",
      email:       "",
      source:      "yellowpages",
    });
  }
  return out;
}

async function extractListings(page) {
  return page.evaluate(() => {
    const cards = [...document.querySelectorAll(".v-card, [class*='listing-result']")];
    return cards.map((card) => ({
      name:    card.querySelector("a.business-name span, a.business-name, h2.n a span, h2.n a")?.textContent?.trim() ?? "",
      phone:   card.querySelector(".phones.phone, .phone.primary, [class*='phone']")?.textContent?.trim() ?? "",
      address: card.querySelector(".street-address")?.textContent?.trim() ?? "",
      locality:card.querySelector(".locality")?.textContent?.trim() ?? "",
      website: card.querySelector("a.website-link, a[class*='website']")?.href ?? "",
      desc:    card.querySelector(".snippet, [class*='description'], [class*='tagline']")?.textContent?.trim() ?? "",
      ypLink:  card.querySelector("a.business-name, a.track-more-info")?.href ?? "",
    }));
  }).catch(() => []);
}

async function scrapePage(page, url, cityInfo, categorySlug) {
  const MAX_CF_RETRIES = 1;

  for (let attempt = 0; attempt <= MAX_CF_RETRIES; attempt++) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 35000 });
      await sleep(1500 + Math.random() * 1000);

      const title = await page.title();

      if (isCloudflareBlocked(title)) {
        if (attempt === MAX_CF_RETRIES) {
          console.log("    ✗ Cloudflare blocked — skipping (will retry next run)");
          return { results: [], blocked: true };
        }
        console.log(`    ⚠ Cloudflare — waiting 12s then retrying...`);
        await sleep(12000);
        continue;
      }

      const raw = await extractListings(page);
      const results = parseListings(raw, cityInfo, categorySlug);

      // Try page 2 if there are enough results
      const hasPage2 = await page.$("a[rel='next'], a.next, [class*='next-page']").catch(() => null);
      if (hasPage2 && results.length >= 8) {
        await sleep(2000 + Math.random() * 1000);
        try {
          await page.goto(`${url}?pageNumber=2`, { waitUntil: "domcontentloaded", timeout: 25000 });
          await sleep(1200);
          const raw2 = await extractListings(page);
          results.push(...parseListings(raw2, cityInfo, categorySlug));
        } catch { /* page 2 optional */ }
      }

      return { results, blocked: false };

    } catch (err) {
      console.log(`    ✗ Error: ${err.message?.slice(0, 80)}`);
      return { results: [], blocked: false };
    }
  }
  return { results: [], blocked: true };
}

async function makePage(browser) {
  const ctx = await browser.newContext({
    userAgent:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport:   { width: 1280, height: 900 },
    locale:     "en-AU",
    timezoneId: "Australia/Sydney",
    extraHTTPHeaders: {
      "Accept-Language": "en-AU,en;q=0.9",
      "Accept":          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    },
  });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver",  { get: () => undefined });
    Object.defineProperty(navigator, "languages",  { get: () => ["en-AU", "en"] });
    Object.defineProperty(navigator, "platform",   { get: () => "MacIntel" });
    Object.defineProperty(navigator, "plugins",    { get: () => [1, 2, 3, 4, 5] });
    window.chrome = { runtime: {} };
  });
  return { page, ctx };
}

function writeDeduped(results) {
  const seen = new Set();
  const deduped = results.filter((r) => {
    if (!r.name) return false;
    const k = `${r.name.toLowerCase().trim()}::${r.state}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  fs.writeFileSync(OUT_DEDUPED, JSON.stringify(deduped, null, 2));
  return deduped.length;
}

async function runCategory(catIdx) {
  const search = SEARCHES[catIdx];
  if (!search) {
    console.error(`No category at index ${catIdx}. Run with "list" to see all categories.`);
    process.exit(1);
  }

  const { done, results } = loadExisting();
  const preCount = results.length;

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Category [${catIdx}]: ${search.yp}  →  DB: ${search.cat}`);
  console.log(`Already scraped: ${done.size} combos total, ${results.length} raw listings`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--disable-setuid-sandbox",
    ],
  });

  let { page, ctx } = await makePage(browser);
  let consecutiveBlocks = 0;
  let addedThisCategory = 0;
  let blockedCities = [];

  for (const city of CITIES) {
    const key = `${search.yp}::${city.slug}`;

    if (done.has(key)) {
      console.log(`  ✓ skip (done): ${city.slug}`);
      continue;
    }

    if (consecutiveBlocks >= 3) {
      console.log("\n  ↻ Resetting browser context after consecutive blocks...");
      await ctx.close();
      await sleep(6000);
      ({ page, ctx } = await makePage(browser));
      consecutiveBlocks = 0;
      await sleep(3000);
    }

    const url = `https://www.yellowpages.com.au/${city.slug}/${search.yp}`;
    console.log(`  → ${city.slug} ...`);

    const { results: found, blocked } = await scrapePage(page, url, city, search.cat);

    if (blocked) {
      consecutiveBlocks++;
      blockedCities.push(city.slug);
      console.log(`     ✗ blocked (${consecutiveBlocks} consecutive) — will retry on next run`);
      await sleep(8000 + Math.random() * 5000);
      continue;
    }

    consecutiveBlocks = 0;
    found.forEach((r) => (r._key = key));
    results.push(...found);
    done.add(key);
    addedThisCategory += found.length;

    save(results);
    console.log(`     ✓ ${found.length} listings`);

    await sleep(4000 + Math.random() * 5000);
  }

  await browser.close();

  const dedupedCount = writeDeduped(results);

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`DONE: ${search.yp}`);
  console.log(`  New listings this category : ${addedThisCategory}`);
  console.log(`  Total raw (all categories) : ${results.length}`);
  console.log(`  Total deduped              : ${dedupedCount}`);
  if (blockedCities.length) {
    console.log(`  Blocked cities (retry later): ${blockedCities.join(", ")}`);
  }

  const nextIdx = catIdx + 1;
  if (nextIdx < SEARCHES.length) {
    console.log(`\nNext category [${nextIdx}]: ${SEARCHES[nextIdx].yp}`);
    console.log(`  Run: node scripts/scrape-yellowpages.js ${nextIdx}`);
  } else {
    console.log(`\nAll categories complete!`);
    console.log(`  Run: node scripts/enrich-emails.js      ← find email addresses`);
    console.log(`  Run: node scripts/import-scraped.js     ← import to database`);
  }
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

// ─── Entry point ─────────────────────────────────────────────────────────────
const arg = process.argv[2];

if (!arg || arg === "list") {
  console.log("\nAvailable categories:\n");
  SEARCHES.forEach((s, i) => {
    const { done } = loadExisting();
    const cities = CITIES.map((c) => (done.has(`${s.yp}::${c.slug}`) ? "✓" : "·")).join("");
    console.log(`  [${String(i).padStart(2)}] ${s.yp.padEnd(40)} ${cities}`);
  });
  console.log(`\nUsage: node scripts/scrape-yellowpages.js <index>`);
  console.log(`       node scripts/scrape-yellowpages.js 0    ← start with first\n`);
  process.exit(0);
}

const idx = parseInt(arg, 10);
if (isNaN(idx)) {
  console.error(`Invalid argument: "${arg}". Use a number or "list".`);
  process.exit(1);
}

runCategory(idx).catch(console.error);
