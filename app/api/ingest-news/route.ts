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

export const maxDuration = 300;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";

const RSS_FEEDS = [
  // ── Regulatory & practitioner framework ──────────────────────────────────
  "https://news.google.com/rss/search?q=class+2+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=design+practitioner+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=design+practitioner+act+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+practitioner+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+practitioner+act+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=residential+apartment+buildings+act+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=RAB+act+NSW+building&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+consultant+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=NSW+building+commissioner&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=David+Chandler+building+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=NSW+building+reforms&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=Construct+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=fair+trading+building+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=master+builders+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=NCC+building+code+changes+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+code+compliance+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+regulations+australia+2025&hl=en-AU&gl=AU&ceid=AU:en",
  // ── Strata, defects & insurance ─────────────────────────────────────────
  "https://news.google.com/rss/search?q=strata+building+bond+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=strata+building+defects+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+defects+warranty+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=insurance+class+2+builders+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=icare+building+insurance+NSW&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=decennial+liability+insurance+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=NCAT+building+disputes&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=water+ingress+litigation+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=strata+remediation+funding+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=construction+insolvency+strata+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=latent+defects+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  // ── Concrete repair & structural deterioration ───────────────────────────
  "https://news.google.com/rss/search?q=concrete+spalling+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=concrete+cancer+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=concrete+durability+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=concrete+carbonation+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=reinforcement+corrosion+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=cathodic+protection+concrete+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=structural+remediation+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=structural+crack+repair+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=crack+injection+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=carbon+fibre+strengthening+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=structural+strengthening+concrete+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=post+tensioned+concrete+repair+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=concrete+repair+standards+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+defect+inspection+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=condition+assessment+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+diagnostics+australia&hl=en-AU&gl=AU&ceid=AU:en",
  // ── Waterproofing & water ingress ────────────────────────────────────────
  "https://news.google.com/rss/search?q=waterproofing+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=balcony+waterproofing+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=balcony+defects+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=roof+waterproofing+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=podium+waterproofing+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=basement+water+ingress+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=facade+water+ingress+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=sealants+expansion+joints+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  // ── Façade, cladding & envelope ──────────────────────────────────────────
  "https://news.google.com/rss/search?q=facade+maintenance+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=cladding+rectification+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=combustible+cladding+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=external+wall+failure+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=building+envelope+failure+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=heritage+facade+restoration+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=rope+access+facade+inspection+australia&hl=en-AU&gl=AU&ceid=AU:en",
  // ── Fire, safety & compliance ────────────────────────────────────────────
  "https://news.google.com/rss/search?q=fire+upgrade+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=fire+compliance+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=passive+fire+protection+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=roof+safety+compliance+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=silica+dust+construction+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=construction+product+recall+australia&hl=en-AU&gl=AU&ceid=AU:en",
  "https://news.google.com/rss/search?q=structural+settlement+building+australia&hl=en-AU&gl=AU&ceid=AU:en",
  // ── Direct industry feeds ────────────────────────────────────────────────
  "https://www.constructionreview.com.au/feed/",
  "https://www.mbansw.asn.au/feed",
  "https://www.thefifthestate.com.au/feed/",
  // sourceable.net/feed — timing out, removed
  // architectureau.com/feed — 404, removed
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
  priority: 1 | 2 | 3 | 0; // 0 = reject
  category: string;
  tags: string[];
  summary: string;
  impact: string;
}

async function classifyAndEnrich(title: string, description: string): Promise<EnrichResult> {
  const fallback: EnrichResult = { priority: 0, category: "Other", tags: [], summary: "", impact: "" };

  if (!ANTHROPIC_API_KEY) return fallback;

  const prompt = `You are a content editor for an Australian remedial building industry publication. Classify each article into one of four priority levels and enrich it.

TITLE: ${title}
DESCRIPTION: ${description}

PRIORITY LEVELS:

PRIORITY_1 — Core Remedial / Technical News (highest value — strict criteria):
Accept ONLY if the article is specifically and substantively about one or more of: DBP Act / Design & Building Practitioners Act, RAB Act / Residential Apartment Buildings Act, NCC / National Construction Code updates, Building Commission NSW / Building Commissioner enforcement, Fair Trading NSW building matters, waterproofing failures or defects, concrete spalling / concrete cancer / carbonation, structural defects in buildings, façade defects or cladding rectification, strata defect litigation, NCAT building defect cases, water ingress in buildings, construction product recalls, silica dust regulations, fire compliance for Class 2 buildings, EN 1504 / AS 4654 / AS 3600 / technical building standards, major remedial building projects, cathodic protection, reinforcement corrosion, crack injection, structural remediation, icare HBCF, latent defect insurance, building bond inspections.
Requirement: Must be Australian AND directly about one of the listed topics.

PRIORITY_2 — Industry Relevant News:
Accept if the article covers broader Australian building and strata industry news with relevance to Class 2 buildings, apartment maintenance, building compliance, or apartment construction quality. Examples: builder insolvencies affecting strata, insurance or warranty changes for buildings, apartment maintenance issues, construction regulation changes, strata law updates, construction material shortages, building quality investigations, apartment project defect disputes, defect prevention initiatives, sustainability upgrades to existing buildings, fire safety upgrades, waterproofing or building materials market updates, engineering compliance updates, professional indemnity for consultants or builders, owner corporation disputes.
Requirement: Must have Australian relevance and relate to the building construction or strata sector.

PRIORITY_3 — General Australian Building Industry News:
Accept if the article is about broader Australian construction and development industry that supports SEO and site activity. Examples: apartment development news, housing construction policy, construction economy conditions, large construction projects, general property construction updates, industry market conditions, construction workforce issues, general strata news.
Requirement: Must be Australian and construction or property related (not pure investment/finance).

REJECT — Truly irrelevant:
Reject if: pure finance, banking or investment with no building context, mining or agriculture, international-only with no Australian relevance, celebrity or clickbait property content, generic real estate price/auction/mortgage news, infrastructure (roads/rail/tunnels) with no building defect angle, non-building political news, unrelated business news.

Respond in EXACTLY this format:

For PRIORITY_1, PRIORITY_2, or PRIORITY_3:
PRIORITY: priority_1
CATEGORY: <exactly one of: Building Commission NSW | DBP Act | Class 2 Buildings | Waterproofing Defects | Façade Defects | Concrete Repair | Strata Defects | Building Defects | Remedial Construction | Product & Material Updates | New Construction Systems | Other>
TAGS: <3–5 comma-separated keywords>
SUMMARY: <For priority_1 and priority_2: 6–8 sentences analytical summary in your own words, hedged language (may/could/reportedly/is understood to), written for Australian remedial building consultants, waterproofing contractors, strata managers, engineers, and certifiers. Do not reproduce source phrasing. Do not give legal or engineering advice. For priority_3: 2–4 sentences concise summary.>
IMPACT: <2–3 brief observations about practical relevance for Australian building professionals, separated by " | ". General observations only, not professional advice.>

For REJECT:
PRIORITY: reject`;

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
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) return fallback;

    const data = await res.json();
    const text: string = data.content?.[0]?.text ?? "";

    // Parse PRIORITY
    const priorityMatch = text.match(/PRIORITY:\s*(\S+)/i);
    const rawPriority = priorityMatch?.[1]?.toLowerCase() ?? "reject";
    if (rawPriority === "reject") return fallback;

    const priority: 1 | 2 | 3 = rawPriority === "priority_1" ? 1 : rawPriority === "priority_2" ? 2 : 3;

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

    return { priority, category, tags, summary, impact };
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
    new_candidates: 0,
  };

  // 1. Fetch all RSS feeds simultaneously
  const feedResults = await Promise.allSettled(
    RSS_FEEDS.map(async (url) => {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; RemBuildAU/1.0)" },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`Feed ${url} returned HTTP ${res.status}`);
      const xml = await res.text();
      return parseRSS(xml);
    })
  );

  // 2. Collect unique articles (max 5 per feed)
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

  // 3. Pre-filter against DB — only send NEW articles to Claude
  //    This is the critical step: without it, the same old articles eat the
  //    entire batch budget every run and nothing new ever gets classified.
  const { data: existingRows } = await supabase
    .from("industry_news")
    .select("source_url");

  const existingUrls = new Set((existingRows ?? []).map((r: { source_url: string }) => r.source_url));
  const newQueue = queue.filter((item) => !existingUrls.has(item.link));

  stats.skipped_duplicate = queue.length - newQueue.length;
  stats.new_candidates = newQueue.length;

  // 4. Classify new articles in parallel — cap at 25 per run to stay within maxDuration.
  //    Rejected articles are written back as status="rejected" so they won't be re-sent.
  const batch = newQueue.slice(0, 25);

  const enriched = await Promise.allSettled(
    batch.map((item) => classifyAndEnrich(item.title, item.description))
  );

  // 5. Insert relevant articles — and write rejected ones back as status="rejected"
  //    so they're excluded from future runs by the existingUrls dedup check.
  await Promise.allSettled(
    batch.map(async (item, i) => {
      const result = enriched[i];
      if (result.status === "rejected") {
        stats.errors.push(`AI error: ${String(result.reason)}`);
        return;
      }
      const { priority, category, tags, summary, impact } = result.value;

      if (priority === 0) {
        stats.skipped_irrelevant++;
        // Write back a minimal "rejected" record so this URL is never re-classified
        await supabase.from("industry_news").insert({
          title: item.title,
          slug: `rejected-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
          source_url: item.link,
          status: "rejected",
          published_date: item.pubDate
            ? (() => { const d = new Date(item.pubDate); return isNaN(d.getTime()) ? new Date().toISOString() : new Date(Math.min(d.getTime(), Date.now())).toISOString(); })()
            : new Date().toISOString(),
        });
        return;
      }

      const featured_image = getCategoryImage(category);
      const slug = slugify(item.title);
      const published_date = item.pubDate
        ? (() => {
            const d = new Date(item.pubDate);
            return isNaN(d.getTime()) ? new Date().toISOString() : new Date(Math.min(d.getTime(), Date.now())).toISOString();
          })()
        : new Date().toISOString();

      const record = {
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
        priority,
      };

      const { error } = await supabase.from("industry_news").insert(record);

      if (error) {
        if (error.code === "23505") {
          const { error: e2 } = await supabase.from("industry_news").insert({
            ...record,
            slug: `${slug}-${Date.now().toString(36)}`,
          });
          if (e2) stats.errors.push(`Insert retry failed: ${e2.message}`);
          else stats.inserted++;
        } else {
          stats.errors.push(`Insert failed: ${error.message}`);
        }
      } else {
        stats.inserted++;
      }
    })
  );

  return NextResponse.json({ success: true, ...stats });
}
