/**
 * Rewrites summary and industry_impact for all published industry_news articles
 * using the new professional writing style.
 * Run: node --env-file=.env.local scripts/rewrite-news-summaries.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://krttmsatnftkdnbtwouy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydHRtc2F0bmZ0a2RuYnR3b3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MDQyODYsImV4cCI6MjA5NDk4MDI4Nn0.av5L6-CHe_9VkTUuOdUenZ-B8beMqPhJA59KIVAfIlY";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";

const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function rewrite(title, existingSummary, category, priority) {
  const prompt = `You are a professional editor for an Australian remedial building industry publication.

You have been given a news article title, its current AI-generated summary, its category, and priority level. Rewrite the summary and "Why it matters" section using the style rules below.

TITLE: ${title}
CATEGORY: ${category}
PRIORITY: ${priority}
EXISTING SUMMARY:
${existingSummary}

WRITING RULES:
1. Start with the main event in plain English.
2. For priority 1 or 2: write exactly two short paragraphs separated by a blank line. Total 120–180 words. For priority 3: one paragraph, 60–90 words.
3. Use natural sentence flow, not robotic bullet-style wording.
4. Avoid phrases like "This article discusses", "The report highlights", "In conclusion", "It is important to note", "It is worth noting".
5. Do not overuse the publisher's wording. Do not reproduce source phrasing.
6. Do not add facts that are not implied by the existing summary.
7. Use hedged language where appropriate: reportedly, is understood to, may, could, according to reports.
8. Write as a professional industry editor briefing colleagues after reading the article.
9. Keep the tone neutral, practical, and professional. No hype, no marketing language.

WHY IT MATTERS RULES:
- One short paragraph, 40–70 words.
- Start with a direct statement of why this matters to Australian building professionals (remedial consultants, strata managers, waterproofing contractors, engineers, or certifiers).
- Neutral, practical tone. No hype, no legal or engineering advice.
- Do not start with "It is important", "This highlights", or "This is significant".

Respond in EXACTLY this format:
SUMMARY:
<rewritten summary paragraphs>

WHY_IT_MATTERS:
<why it matters paragraph>`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const text = data.content?.[0]?.text ?? "";

  const summaryMatch = text.match(/SUMMARY:\s*([\s\S]+?)(?=\nWHY_IT_MATTERS:|$)/i);
  const whyMatch = text.match(/WHY_IT_MATTERS:\s*([\s\S]+)/i);

  return {
    summary: summaryMatch?.[1]?.trim() ?? null,
    industry_impact: whyMatch?.[1]?.trim() ?? null,
  };
}

async function main() {
  const { data: articles, error } = await sb
    .from("industry_news")
    .select("id, title, summary, industry_impact, category, priority, status")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) { console.error("Fetch error:", error); process.exit(1); }
  console.log(`Found ${articles.length} published articles to rewrite.\n`);

  let updated = 0;
  let failed = 0;

  for (const article of articles) {
    if (!article.summary) { console.log(`  SKIP (no summary): ${article.title.slice(0, 60)}`); continue; }

    process.stdout.write(`  Rewriting: ${article.title.slice(0, 60)}... `);
    const result = await rewrite(article.title, article.summary, article.category, article.priority);

    if (!result?.summary) {
      console.log("FAILED (AI error)");
      failed++;
      continue;
    }

    const { error: updateError } = await sb
      .from("industry_news")
      .update({ summary: result.summary, industry_impact: result.industry_impact ?? article.industry_impact })
      .eq("id", article.id);

    if (updateError) {
      console.log(`FAILED (DB: ${updateError.message})`);
      failed++;
    } else {
      console.log("OK");
      updated++;
    }

    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\nDone. Updated: ${updated}, Failed: ${failed}`);
}

main().catch(console.error);
