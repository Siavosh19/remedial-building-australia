import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Set max duration — increase to 300 on Vercel Pro if needed
export const maxDuration = 60;

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY ?? "";

const RSS_FEEDS = [
  // Google News — AU-localised searches
  "https://news.google.com/rss/search?q=class+2+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=design+practitioner+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=design+practitioner+act+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+practitioner+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+practitioner+act+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=residential+apartment+buildings+act+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=RAB+act+NSW+building&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+consultant+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=remedial+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=facade+maintenance+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=concrete+spalling+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=waterproofing+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=concrete+cancer+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=master+builders+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=insurance+class+2+builders+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=strata+building+bond+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=NSW+building+commissioner&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=David+Chandler+building+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=NSW+building+reforms&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=Construct+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=cladding+rectification+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=combustible+cladding+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=strata+building+defects+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=post+tensioned+concrete+repair+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=balcony+waterproofing+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=structural+crack+repair+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=fire+upgrade+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=fire+compliance+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=passive+fire+protection+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=NCC+building+code+changes+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+code+compliance+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+regulations+australia+2025&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=decennial+liability+insurance+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+defects+warranty+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=fair+trading+building+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=icare+building+insurance+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  // Direct industry feeds
  "https://sourceable.net/feed/",
  "https://www.constructionreview.com.au/feed/",
  "https://www.mbansw.asn.au/feed",
  "https://www.thefifthestate.com.au/feed/",
  "https://architectureau.com/feed/",
];

const VALID_CATEGORIES = [
  "Building Commission NSW",
  "Class 2 Buildings",
  "Waterproofing Defects",
  "Concrete Repair",
  "Façade Defects",
  "Strata Defects",
  "DBP Act",
  "Remedial Construction",
  "Building Defects",
  "Product & Material Updates",
  "New Construction Systems",
];

// ─── Blocked (paywalled) domains ─────────────────────────────────────────────

const BLOCKED_DOMAINS = new Set([
  "theaustralian.com.au",
  "afr.com",
  "smh.com.au",
  "age.com.au",
  "ft.com",
  "wsj.com",
  "bloomberg.com",
  "theadviser.com.au",
]);

function isBlockedDomain(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return BLOCKED_DOMAINS.has(host);
  } catch {
    return false;
  }
}

// ─── RSS parsing ──────────────────────────────────────────────────────────────

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  sourceName: string;
}

function stripCDATA(s: string): string {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function stripHTML(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? stripCDATA(m[1]).trim() : "";
}

function extractLink(xml: string): string {
  // <link>https://...</link>
  const m1 = xml.match(/<link>(https?:\/\/[^<\s]+)<\/link>/i);
  if (m1) return m1[1].trim();
  // <link href="https://..." />
  const m2 = xml.match(/<link[^>]+href="(https?:\/\/[^"]+)"/i);
  if (m2) return m2[1].trim();
  return "";
}

function extractSourceName(xml: string): string {
  // <source url="https://...">Source Name</source>
  const m = xml.match(/<source[^>]*>([\s\S]*?)<\/source>/i);
  return m ? stripCDATA(m[1]).trim() : "";
}

// Google News appends " - Source Name" to every title — remove it
function cleanTitle(title: string): string {
  const cleaned = title.replace(/\s{2,}-\s{2,}[^-]+$/, "").replace(/\s+-\s+[^-]+$/, "").trim();
  return cleaned || title;
}

function parseRSS(xml: string): RSSItem[] {
  const items: RSSItem[] = [];
  const matches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)];

  for (const m of matches) {
    const raw = m[1];
    const title = cleanTitle(extractTag(raw, "title"));
    const link = extractLink(raw) || extractTag(raw, "guid");
    const description = stripHTML(extractTag(raw, "description")).slice(0, 500);
    const pubDate = extractTag(raw, "pubDate");
    const sourceName = extractSourceName(raw);

    if (title && link && link.startsWith("http")) {
      items.push({ title, link, description, pubDate, sourceName });
    }
  }

  return items;
}

// ─── OG image extraction ──────────────────────────────────────────────────────
// Returns: string = image URL (may be empty), null = paywall detected → skip article

const PAYWALL_PATTERNS = [
  /login/i,
  /subscribe/i,
  /subscription/i,
  /signin/i,
  /sign-in/i,
  /paywall/i,
  /register/i,
  /access-denied/i,
];

async function fetchOGImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RemBuildAU/1.0)" },
      signal: AbortSignal.timeout(6000),
      redirect: "follow",
    });

    // 401/403 = auth required → skip article
    if (res.status === 401 || res.status === 403) return null;

    // Redirected to a login/subscribe page → skip article
    if (PAYWALL_PATTERNS.some((p) => p.test(res.url))) return null;

    if (!res.ok) return "";

    const html = await res.text();

    // Check if the landed page itself looks like a paywall
    if (PAYWALL_PATTERNS.some((p) => p.test(res.url))) return null;

    // Extract og:image in any attribute order
    const m =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    return m?.[1]?.trim() ?? "";
  } catch {
    return "";
  }
}

// ─── Slug ─────────────────────────────────────────────────────────────────────

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
  return `${base}-${Date.now().toString(36)}`;
}

// ─── AI classification ────────────────────────────────────────────────────────

async function classify(title: string, description: string): Promise<{ category: string; summary: string }> {
  if (!ANTHROPIC_KEY) return { category: "IRRELEVANT", summary: "" };

  const prompt = `You are a strict content filter for an Australian remedial building knowledge platform.

Article title: "${title}"
Article description: "${description}"

STEP 1 — RELEVANCE CHECK
Only save articles directly relevant to at least one of these topics:
- Class 2 building (apartments, strata, multi-residential)
- Design practitioner or building practitioner (NSW/Australia)
- DBP Act / Design and Building Practitioners Act NSW
- RAB Act / Residential Apartment Buildings Act NSW
- Building consultant (construction defects, compliance)
- Remedial building works
- Façade maintenance or cladding rectification
- Concrete spalling, concrete cancer, or structural crack repair
- Waterproofing (balconies, roofs, basements, wet areas)
- Balcony waterproofing
- Post-tensioned concrete repair
- Master Builders Australia
- Insurance for Class 2 builders
- Decennial liability insurance
- Building defects warranty
- Strata building bond
- Strata defects
- NSW Building Commissioner or David Chandler
- NSW building reforms or Construct NSW
- Combustible cladding
- Fire upgrade, fire compliance, or passive fire protection
- NCC building code, building code compliance, or building regulations
- Fair Trading building NSW
- icare building insurance NSW

Mark IRRELEVANT if the article is about:
- General residential houses or greenfield land development (not Class 2 strata)
- Infrastructure, roads, tunnels, bridges, or civil works
- Commercial fitout, retail, or hotel construction
- International news with no direct Australian application
- General business, property market prices, or finance news
- Unrelated industries (mining, agriculture, tech, etc.)

STEP 2 — CATEGORY (only if relevant)
Assign EXACTLY one category:
${VALID_CATEGORIES.map((c) => `- ${c}`).join("\n")}

STEP 3 — SUMMARY (only if relevant)
Write 2–3 sentences in plain English:
1. What the article is about
2. Why it matters to remedial building professionals on Class 2 buildings in Australia
Write in your own words. Do not copy from the article.

Respond in this exact format — no other text:
CATEGORY: <one category from the list, or IRRELEVANT>
SUMMARY: <2-3 sentence summary, or blank if IRRELEVANT>`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) return { category: "IRRELEVANT", summary: "" };

    const data = await res.json();
    const text: string = data.content?.[0]?.text ?? "";

    const categoryMatch = text.match(/CATEGORY:\s*(.+)/i);
    const summaryMatch = text.match(/SUMMARY:\s*([\s\S]+)/i);

    const rawCategory = categoryMatch?.[1]?.trim() ?? "IRRELEVANT";
    const category = VALID_CATEGORIES.includes(rawCategory) ? rawCategory : "IRRELEVANT";
    const summary = summaryMatch?.[1]?.trim() ?? "";

    return { category, summary };
  } catch {
    return { category: "IRRELEVANT", summary: "" };
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET() {
  const stats = {
    inserted: 0,
    skipped_duplicate: 0,
    skipped_irrelevant: 0,
    skipped_paywall: 0,
    errors: [] as string[],
    total_fetched: 0,
  };

  // 1. Fetch all RSS feeds simultaneously
  const feedResults = await Promise.allSettled(
    RSS_FEEDS.map(async (url) => {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; RemBuildAU/1.0)" },
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Feed ${url} returned HTTP ${res.status}`);
      const xml = await res.text();
      return parseRSS(xml);
    })
  );

  // 2. Collect unique articles (max 5 per feed to control API costs)
  const seenLinks = new Set<string>();
  const queue: RSSItem[] = [];

  for (let i = 0; i < feedResults.length; i++) {
    const result = feedResults[i];
    if (result.status === "rejected") {
      stats.errors.push(`Feed ${i + 1}: ${result.reason?.message ?? "Unknown error"}`);
      continue;
    }
    for (const item of result.value.slice(0, 5)) {
      if (!seenLinks.has(item.link)) {
        seenLinks.add(item.link);
        queue.push(item);
      }
    }
  }

  stats.total_fetched = queue.length;

  // 3. Process articles sequentially to respect Anthropic rate limits
  for (const item of queue) {
    try {
      // Skip paywalled domains immediately — no API calls wasted
      if (isBlockedDomain(item.link)) {
        stats.skipped_paywall++;
        continue;
      }

      // Check for existing article with same URL
      const { data: existing } = await supabase
        .from("news_articles")
        .select("id")
        .eq("source_url", item.link)
        .limit(1);

      if (existing && existing.length > 0) {
        stats.skipped_duplicate++;
        continue;
      }

      // Classify + fetch OG image in parallel
      const [{ category, summary }, image_url] = await Promise.all([
        classify(item.title, item.description),
        fetchOGImage(item.link),
      ]);

      // null from fetchOGImage means paywall detected at fetch time → skip
      if (image_url === null) {
        stats.skipped_paywall++;
        continue;
      }

      if (category === "IRRELEVANT") {
        stats.skipped_irrelevant++;
        continue;
      }

      // Save to Supabase
      const { error } = await supabase.from("news_articles").insert({
        title: item.title,
        slug: slugify(item.title),
        category,
        source: item.sourceName || "Industry News",
        date_published: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
        excerpt: item.description,
        summary,
        source_url: item.link,
        image_url: image_url || null,
        status: "published",
        featured: false,
      });

      if (error) {
        stats.errors.push(`Insert failed: ${error.message}`);
      } else {
        stats.inserted++;
      }
    } catch (err) {
      stats.errors.push(String(err));
    }
  }

  return NextResponse.json({ success: true, ...stats });
}
