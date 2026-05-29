/**
 * Pass 2 — Email enrichment
 * Reads yp-deduped.json, visits each business website, finds email address.
 * Saves to scripts/scraped-data/yp-enriched.json
 *
 * Run: node scripts/enrich-emails.js
 * Safe to re-run — skips businesses that already have an email or were already visited.
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const IN_FILE  = path.join(__dirname, "scraped-data", "yp-deduped.json");
const OUT_FILE = path.join(__dirname, "scraped-data", "yp-enriched.json");

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// Regex that matches Australian and general email formats
const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

// Pages most likely to have an email address
const CONTACT_PATHS = ["/contact", "/contact-us", "/about", "/about-us", "/get-in-touch", "/enquire"];

async function findEmail(page, websiteUrl) {
  if (!websiteUrl || !websiteUrl.startsWith("http")) return "";

  const base = websiteUrl.replace(/\/$/, "");

  // First try the homepage itself
  try {
    await page.goto(websiteUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
    await sleep(1000);
    const html = await page.content();
    const emails = html.match(EMAIL_RE) ?? [];
    const real = emails.filter(
      (e) => !e.includes("sentry") && !e.includes("example") && !e.includes("@2x") && e.includes(".")
    );
    if (real.length) return real[0];
  } catch { /* continue */ }

  // Try common contact pages
  for (const path_ of CONTACT_PATHS) {
    try {
      await page.goto(`${base}${path_}`, { waitUntil: "domcontentloaded", timeout: 10000 });
      await sleep(800);
      const html = await page.content();
      const emails = html.match(EMAIL_RE) ?? [];
      const real = emails.filter(
        (e) => !e.includes("sentry") && !e.includes("example") && !e.includes("@2x") && e.includes(".")
      );
      if (real.length) return real[0];
    } catch { /* continue */ }
  }

  return "";
}

async function main() {
  if (!fs.existsSync(IN_FILE)) {
    console.error("yp-deduped.json not found. Run scrape-yellowpages.js first.");
    process.exit(1);
  }

  const businesses = JSON.parse(fs.readFileSync(IN_FILE, "utf8"));

  // Load existing enriched file if resuming
  let enriched = [];
  const visitedWebsites = new Set();
  if (fs.existsSync(OUT_FILE)) {
    enriched = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
    enriched.forEach((b) => { if (b.website) visitedWebsites.add(b.website); });
    console.log(`Resuming — ${enriched.length} already enriched.`);
  }

  // Only process businesses not yet enriched
  const todo = businesses.filter((b) => !visitedWebsites.has(b.website));
  console.log(`${todo.length} businesses to visit for emails.\n`);

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-blink-features=AutomationControlled"],
  });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  let found = 0;
  for (let i = 0; i < todo.length; i++) {
    const biz = todo[i];
    process.stdout.write(`[${i + 1}/${todo.length}] ${biz.name.slice(0, 45).padEnd(45)} `);

    const email = await findEmail(page, biz.website);
    if (email) {
      process.stdout.write(`→ ${email}\n`);
      found++;
    } else {
      process.stdout.write(`→ (no email)\n`);
    }

    enriched.push({ ...biz, email });
    visitedWebsites.add(biz.website);

    // Save every 10 businesses
    if ((i + 1) % 10 === 0) {
      fs.writeFileSync(OUT_FILE, JSON.stringify(enriched, null, 2));
    }

    // Polite delay
    await sleep(1500 + Math.random() * 1500);
  }

  await browser.close();
  fs.writeFileSync(OUT_FILE, JSON.stringify(enriched, null, 2));

  console.log(`\n✓ Done. ${found}/${todo.length} emails found.`);
  console.log(`Saved to scripts/scraped-data/yp-enriched.json`);
}

main().catch(console.error);
