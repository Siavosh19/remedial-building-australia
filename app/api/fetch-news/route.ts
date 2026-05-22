import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Set max duration — increase to 300 on Vercel Pro if needed
export const maxDuration = 60;

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY ?? "";

const RSS_FEEDS = [
  "https://news.google.com/rss/search?q=building+commission+nsw",
  "https://news.google.com/rss/search?q=nsw+fair+trading+building+defects",
  "https://news.google.com/rss/search?q=DBP+Act+NSW+practitioners",
  "https://news.google.com/rss/search?q=waterproofing+defects+australia+class+2",
  "https://news.google.com/rss/search?q=concrete+repair+spalling+australia",
  "https://news.google.com/rss/search?q=cladding+facade+defects+NSW",
  "https://news.google.com/rss/search?q=strata+building+defects+NSW",
  "https://news.google.com/rss/search?q=remedial+building+australia",
  "https://news.google.com/rss/search?q=master+builders+australia+construction",
  "https://news.google.com/rss/search?q=concrete+institute+australia",
  "https://news.google.com/rss/search?q=combustible+cladding+australia",
  "https://news.google.com/rss/search?q=new+building+construction+system+australia",
  "https://sourceable.net/feed",
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

async function fetchOGImage(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RemBuildAU/1.0)" },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    // Match <meta property="og:image" content="..."> in any attribute order
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

  const prompt = `You are classifying Australian construction news articles for a remedial building knowledge platform.

Article title: "${title}"
Article description: "${description}"

Task 1 — Category:
Return EXACTLY one of these categories if the article is relevant to Australian remedial building, Class 2 apartment/strata defects, waterproofing, concrete repair, façade defects, DBP Act compliance, or building regulation:
${VALID_CATEGORIES.map((c) => `- ${c}`).join("\n")}

Return IRRELEVANT if the article is about:
- General residential houses (not Class 2 strata/apartments)
- International news not applicable to Australia
- Unrelated construction or business topics

Task 2 — Summary (only if NOT irrelevant):
Write a 2–3 sentence plain English summary explaining what the article is about and why it matters to remedial building professionals. Write in your own words. Do not copy from the article.

Respond in this exact format (no other text):
CATEGORY: <category name or IRRELEVANT>
SUMMARY: <your 2-3 sentence summary, or leave blank if IRRELEVANT>`;

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
