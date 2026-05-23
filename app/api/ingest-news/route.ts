/*
  SQL — run this in Supabase SQL editor before using this route:

  CREATE TABLE IF NOT EXISTS industry_news (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title           text NOT NULL,
    slug            text UNIQUE NOT NULL,
    summary         text,
    industry_impact text,
    category        text,
    tags            text[],
    source_name     text,
    source_url      text,
    published_date  timestamptz,
    featured_image  text,
    status          text DEFAULT 'published',
    created_at      timestamptz DEFAULT now()
  );
*/

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getCategoryImage, VALID_CATEGORIES } from "@/lib/news-categories";

// Set max duration — increase to 300 on Vercel Pro if needed
export const maxDuration = 60;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";

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

// ─── Slug ─────────────────────────────────────────────────────────────────────

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function normTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 80);
}

// ─── AI classification + enrichment ──────────────────────────────────────────

interface EnrichResult {
  relevant: boolean;
  category: string;
  tags: string[];
  summary: string;
  impact: string;
}

async function classifyAndEnrich(title: string, description: string): Promise<EnrichResult> {
  const fallback: EnrichResult = { relevant: false, category: "Other", tags: [], summary: "", impact: "" };

  if (!ANTHROPIC_API_KEY) return fallback;

  const prompt = `You are a specialist content editor for an Australian remedial building platform. Analyse this news item and respond in EXACTLY the format shown.

TITLE: ${title}
DESCRIPTION: ${description}

STEP 1 — Is this directly relevant to Australian remedial building? Include if it covers:
Class 2 buildings / strata apartments, apartment building defects, waterproofing, concrete repair or spalling, façade rectification, DBP Act / Design and Building Practitioners Act NSW, RAB Act, Building Commission NSW, cladding rectification, fire compliance / passive fire protection, NCC building code, building defects warranty, strata building bond, icare building insurance NSW, NSW building reforms, remedial building works.

Exclude if about: general residential houses or greenfield development, infrastructure / roads / tunnels, commercial fitout / retail / hotels, international-only news, real estate prices / property investment advice, mining / agriculture / tech.

STEP 2 — Respond in this EXACT format (no other text):

RELEVANT: yes
CATEGORY: <exactly one of: Building Commission NSW | DBP Act | Class 2 Buildings | Waterproofing Defects | Façade Defects | Concrete Repair | Strata Defects | Building Defects | Remedial Construction | Product & Material Updates | New Construction Systems | Other>
TAGS: <3–5 comma-separated keywords>
SUMMARY: <2–3 sentences written in your own words — original, not copied. What happened and the factual context. Written for a professional audience of remedial building consultants, waterproofing contractors and strata managers.>
IMPACT: <2–3 short points separated by " | " explaining the practical consequence for Australian remedial building professionals. Each point starts with the action or implication, e.g. "Strata managers should…" or "This may increase demand for…">

If not relevant, respond only:
RELEVANT: no`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) return fallback;

    const data = await res.json();
    const text: string = data.content?.[0]?.text ?? "";

    // Parse RELEVANT
    const relevantMatch = text.match(/RELEVANT:\s*(\w+)/i);
    const relevant = relevantMatch?.[1]?.toLowerCase() === "yes";
    if (!relevant) return { ...fallback, relevant: false };

    // Parse CATEGORY
    const categoryMatch = text.match(/CATEGORY:\s*(.+)/i);
    const rawCategory = categoryMatch?.[1]?.trim() ?? "Other";
    const category = (VALID_CATEGORIES as readonly string[]).includes(rawCategory) ? rawCategory : "Other";

    // Parse TAGS
    const tagsMatch = text.match(/TAGS:\s*(.+)/i);
    const tags = tagsMatch?.[1]
      ? tagsMatch[1].split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    // Parse SUMMARY (everything from SUMMARY: line to IMPACT: line, may be multi-line)
    const summaryMatch = text.match(/SUMMARY:\s*([\s\S]+?)(?=\nIMPACT:|$)/i);
    const summary = summaryMatch?.[1]?.trim() ?? "";

    // Parse IMPACT (rest after IMPACT:)
    const impactMatch = text.match(/IMPACT:\s*([\s\S]+)/i);
    const impact = impactMatch?.[1]?.trim() ?? "";

    return { relevant: true, category, tags, summary, impact };
  } catch {
    return fallback;
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
  const seenTitles = new Set<string>();
  const queue: RSSItem[] = [];

  for (let i = 0; i < feedResults.length; i++) {
    const result = feedResults[i];
    if (result.status === "rejected") {
      stats.errors.push(`Feed ${i + 1}: ${(result.reason as Error)?.message ?? "Unknown error"}`);
      continue;
    }
    for (const item of result.value.slice(0, 5)) {
      const nt = normTitle(item.title);
      if (!seenLinks.has(item.link) && !seenTitles.has(nt)) {
        seenLinks.add(item.link);
        seenTitles.add(nt);
        queue.push(item);
      }
    }
  }

  stats.total_fetched = queue.length;

  // 3. Cap at 15 per run, classify all in parallel
  const batch = queue.slice(0, 15);

  const enriched = await Promise.allSettled(
    batch.map((item) => classifyAndEnrich(item.title, item.description))
  );

  // 4. Upsert in parallel — DB UNIQUE constraint on source_url prevents duplicates
  await Promise.allSettled(
    batch.map(async (item, i) => {
      const result = enriched[i];
      if (result.status === "rejected") {
        stats.errors.push(`AI error: ${String(result.reason)}`);
        return;
      }
      const { relevant, category, tags, summary, impact } = result.value;
      if (!relevant) {
        stats.skipped_irrelevant++;
        return;
      }
      const featured_image = getCategoryImage(category);
      const slug = slugify(item.title);
      const published_date = item.pubDate
        ? (() => {
            const d = new Date(item.pubDate);
            return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
          })()
        : new Date().toISOString();

      const { error, data } = await supabase
        .from("industry_news")
        .upsert(
          {
            title: item.title,
            slug,
            summary,
            industry_impact: impact,
            category,
            tags,
            source_name: item.sourceName || "Industry News",
            source_url: item.link,
            published_date,
            featured_image,
            status: "published",
          },
          { onConflict: "slug", ignoreDuplicates: true }
        )
        .select("id");

      if (error) {
        stats.errors.push(`Upsert failed: ${error.message}`);
      } else if (data && data.length > 0) {
        stats.inserted++;
      } else {
        stats.skipped_duplicate++;
      }
    })
  );

  return NextResponse.json({ success: true, ...stats });
}
