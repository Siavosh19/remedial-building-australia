import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const maxDuration = 300;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";

async function rewriteArticle(
  title: string,
  existingSummary: string,
  category: string,
  priority: number
): Promise<{ summary: string; industry_impact: string } | null> {
  const priorityLabel = priority === 1 ? "1 (core technical)" : priority === 2 ? "2 (industry relevant)" : "3 (general)";

  const prompt = `You are a professional editor for an Australian remedial building industry publication.

Rewrite the summary and "Why it matters" section for this article using the rules below.

TITLE: ${title}
CATEGORY: ${category}
PRIORITY: ${priorityLabel}
EXISTING SUMMARY:
${existingSummary}

WRITING RULES:
1. Start with the main event in plain English.
2. For priority 1 or 2: write exactly two short paragraphs separated by a blank line. Total 120–180 words. For priority 3: one paragraph, 60–90 words.
3. Use natural sentence flow — not robotic or bullet-style wording.
4. Never start with "This article discusses", "The report highlights", "In conclusion", or "It is important to note".
5. Do not reproduce the source's exact phrasing.
6. Only use facts implied by the existing summary — do not invent new details.
7. Use hedged language where appropriate: reportedly, is understood to, may, could, according to reports.
8. Write as a professional industry editor briefing colleagues after reading the article.
9. Neutral, practical tone. No hype, no marketing language.

WHY IT MATTERS RULES:
- One short paragraph, 40–70 words.
- Start with a direct statement of why this matters to Australian building professionals (remedial consultants, strata managers, waterproofing contractors, engineers, or certifiers).
- Neutral and practical. No legal or engineering advice.
- Do not start with "It is important", "This highlights", or "This is significant".

Respond in EXACTLY this format — no other text:
SUMMARY:
<rewritten paragraphs>

WHY_IT_MATTERS:
<why it matters paragraph>`;

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
        max_tokens: 700,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const text: string = data.content?.[0]?.text ?? "";

    const summaryMatch = text.match(/SUMMARY:\s*([\s\S]+?)(?=\nWHY_IT_MATTERS:|$)/i);
    const whyMatch = text.match(/WHY_IT_MATTERS:\s*([\s\S]+)/i);

    const summary = summaryMatch?.[1]?.trim() ?? "";
    const industry_impact = whyMatch?.[1]?.trim() ?? "";

    if (!summary) return null;
    return { summary, industry_impact };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret");
  if (secret !== (process.env.ADMIN_SECRET ?? "rba-rewrite-2026")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
  }

  const { data: articles, error } = await supabase
    .from("industry_news")
    .select("id, title, summary, industry_impact, category, priority")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const results = { updated: 0, failed: 0, skipped: 0, errors: [] as string[] };

  for (const article of (articles ?? [])) {
    if (!article.summary) { results.skipped++; continue; }

    const rewritten = await rewriteArticle(
      article.title,
      article.summary,
      article.category ?? "Other",
      article.priority ?? 2
    );

    if (!rewritten) {
      results.failed++;
      results.errors.push(`Failed: ${article.title.slice(0, 50)}`);
      continue;
    }

    const { error: updateError } = await supabase
      .from("industry_news")
      .update({ summary: rewritten.summary, industry_impact: rewritten.industry_impact || article.industry_impact })
      .eq("id", article.id);

    if (updateError) {
      results.failed++;
      results.errors.push(`DB error on ${article.id}: ${updateError.message}`);
    } else {
      results.updated++;
    }

    // Small delay
    await new Promise(r => setTimeout(r, 200));
  }

  return NextResponse.json({ success: true, total: articles?.length ?? 0, ...results });
}
