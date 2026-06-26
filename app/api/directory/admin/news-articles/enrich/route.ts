import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { VALID_CATEGORIES } from "@/lib/news-categories";

export const maxDuration = 60;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchArticleText(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RBA-NewsBot/1.0; +https://www.remedialbuildingaustralia.com.au)" },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    return stripHtml(html).slice(0, 6000);
  } catch {
    return "";
  }
}

type Enriched = { summary: string; impact: string; category: string; tags: string[] };

async function summarize(title: string, content: string): Promise<Enriched | null> {
  if (!ANTHROPIC_API_KEY) return null;

  const prompt = `You are a content editor for an Australian remedial building industry publication. Write an editorial summary for the article below so it can be published on our news site.

TITLE: ${title}
ARTICLE CONTENT: ${content || "(full text unavailable — summarise conservatively from the title only; stay general and factual, do not invent specific facts, figures, names or quotes)"}

Respond in EXACTLY this format:
CATEGORY: <exactly one of: Building Commission NSW | DBP Act | Class 2 Buildings | Waterproofing Defects | Façade Defects | Concrete Repair | Strata Defects | Building Defects | Remedial Construction | Product & Material Updates | New Construction Systems | Other>
TAGS: <3-5 comma-separated keywords>
SUMMARY: <Two paragraphs separated by a blank line, 145-215 words total. Write as an experienced industry person briefing colleagues — direct, plain, conversational; fully rewrite in your own words; do not copy the source wording; do not use "reportedly", "appears to", "highlights", "underscores", "this article", "the report"; do not start sentences with "This"; do not invent facts not in the content; the first paragraph covers what happened, the second explains why it matters to Australian remedial building professionals, strata managers, waterproofing contractors, or the construction sector.>
IMPACT: <One short paragraph, 45-75 words, on why this is relevant to Australian building professionals. Neutral, practical tone. No hype, no legal or engineering advice.>`;

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
    if (!res.ok) return null;

    const data = await res.json();
    const text: string = data.content?.[0]?.text ?? "";

    const rawCategory = text.match(/CATEGORY:\s*(.+)/i)?.[1]?.trim() ?? "Other";
    const category = (VALID_CATEGORIES as readonly string[]).includes(rawCategory) ? rawCategory : "Other";
    const tags = text.match(/TAGS:\s*(.+)/i)?.[1]?.split(",").map((t) => t.trim()).filter(Boolean) ?? [];
    const summary = text.match(/SUMMARY:\s*([\s\S]+?)(?=\nIMPACT:|$)/i)?.[1]?.trim() ?? "";
    const impact = text.match(/IMPACT:\s*([\s\S]+)/i)?.[1]?.trim() ?? "";

    if (!summary) return null;
    return { summary, impact, category, tags };
  } catch {
    return null;
  }
}

// Generate an AI editorial summary for an article (used when recycling a
// rejected article that has no summary, or filling in an already-published one).
// Pass ?publish=true to also set the article live.
export async function POST(request: NextRequest) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  const publish = request.nextUrl.searchParams.get("publish") === "true";
  const force = request.nextUrl.searchParams.get("force") === "true";
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const { data: art, error: readErr } = await supabaseAdmin
    .from("industry_news")
    .select("id, title, source_url, summary, category")
    .eq("id", id)
    .single();
  if (readErr || !art) return NextResponse.json({ error: "Article not found" }, { status: 404 });

  const row = art as Record<string, unknown>;
  const update: Record<string, unknown> = {};
  if (publish) update.status = "published";

  let generated: Enriched | null = null;
  const hasSummary = String(row.summary ?? "").trim().length > 0;
  if (!hasSummary || force) {
    const content = row.source_url ? await fetchArticleText(String(row.source_url)) : "";
    generated = await summarize(String(row.title ?? ""), content);
    if (generated) {
      update.summary = generated.summary;
      update.industry_impact = generated.impact;
      update.tags = generated.tags;
      if (!row.category || row.category === "Other") update.category = generated.category;
    }
  }

  if (Object.keys(update).length === 0)
    return NextResponse.json({ error: "Nothing to do." }, { status: 400 });

  const { error: updErr } = await supabaseAdmin.from("industry_news").update(update).eq("id", id);
  if (updErr) {
    console.error("[news enrich] update error:", updErr);
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    generated: Boolean(generated),
    summary: generated?.summary ?? null,
    industry_impact: generated?.impact ?? null,
    category: (update.category as string) ?? (row.category as string) ?? null,
  });
}
