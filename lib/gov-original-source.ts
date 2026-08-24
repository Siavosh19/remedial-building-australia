// Find the ORIGINAL government publication behind a third-party news article.
//
// A newspaper writes "the Building Commission has ordered...". This asks Claude
// to go and find the Commission's own page — the media release, the regulatory
// notice, the code amendment — and to summarise THAT document rather than the
// newspaper's account of it. The result becomes a separate draft article on the
// site, credited to the agency and linked to the agency's own URL.
//
// Uses the Claude API's server-side web_search tool: Claude runs the searches
// on Anthropic's infrastructure and reads the results itself, so there is no
// search API to wire up here. Calls go through fetch() rather than the SDK to
// match how the rest of this codebase talks to the Claude API.
//
// Nothing is trusted on the model's word: the URL it returns must be a real
// government host (lib/gov-sources.ts) and must actually resolve before we
// write a row.

import { VALID_CATEGORIES } from "@/lib/news-categories";
import { governmentAgencyFromUrl, isGovernmentSourceUrl } from "@/lib/gov-sources";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

// Claude Opus 5 — this runs a handful of times per ingest, not once per
// article, and getting the right official document is the whole point.
const MODEL = "claude-opus-5";

export interface GovernmentOriginal {
  url: string;
  title: string;
  agency: string;
  published_date: string | null;
  summary: string;
  impact: string;
  category: string;
  tags: string[];
}

export interface LookupOptions {
  /** Reasoning depth. "high" for the backfill; "medium" keeps a web request inside its function budget. */
  effort?: "low" | "medium" | "high" | "xhigh" | "max";
  /** How many web searches Claude may run for one article. */
  maxUses?: number;
  /** Hard ceiling on the whole lookup, including search time. */
  timeoutMs?: number;
}

export interface SourceArticle {
  title: string;
  description?: string | null;
  summary?: string | null;
  source_url?: string | null;
  source_name?: string | null;
}

function buildPrompt(article: SourceArticle): string {
  const context = [
    `HEADLINE: ${article.title}`,
    article.source_name ? `REPORTED BY: ${article.source_name}` : "",
    article.source_url ? `THIRD-PARTY LINK: ${article.source_url}` : "",
    article.description ? `DESCRIPTION: ${article.description}` : "",
    article.summary ? `SUMMARY OF THE COVERAGE:\n${article.summary}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `You research Australian building regulation for a remedial building industry publication.

Below is a news article that covers a government matter — a regulator, a minister, an Act, a code change, an inquiry, a tribunal or court decision, or an enforcement action. Your job is to find the ORIGINAL government publication behind it and summarise that publication.

${context}

WHAT TO FIND
Search the web for the government body's own page about this matter: a media release, a regulatory notice, a code or standard amendment, published guidance, a tabled report, an Act or regulation on the legislation register, or a published judgment. It must be on the government's own website — an Australian domain ending in .gov.au (or an official body such as abcb.gov.au, legislation.nsw.gov.au, caselaw.nsw.gov.au, standards.org.au).

Never return: a news outlet, a law firm, an industry association, a consultancy, a press-release wire, an aggregator, or a PDF hosted by any of those. If the only coverage is third-party reporting and the government has published nothing you can find, that is a legitimate answer — say so.

WHAT TO WRITE
Summarise the GOVERNMENT DOCUMENT, not the news article. Read what the agency actually published and report that: what it says, what it requires, who it applies to, and when it takes effect. If the news coverage and the official document differ, follow the official document.

Write as an experienced industry person briefing colleagues. Direct, plain, conversational. Fully in your own words — do not copy or paraphrase the document's opening sentence. Do not use "reportedly", "appears to", "understood to", "highlights", "underscores", "reflects", "it is worth noting", "it is important", "this article", "the report", or "in conclusion". Do not start sentences with "This". Do not add facts that are not in the document. Active voice where possible.

RESPOND WITH ONE JSON OBJECT AND NOTHING ELSE:
{
  "found": true or false,
  "url": "the government page's exact URL",
  "title": "the government publication's own title",
  "agency": "the publishing body, e.g. Building Commission NSW",
  "published_date": "YYYY-MM-DD or null if the page shows no date",
  "summary": "Two paragraphs separated by a blank line. First paragraph up to 350 words on what the government published and what it requires. Second paragraph 75 words maximum on why it matters to Australian remedial building professionals, strata managers, waterproofing contractors and the construction sector.",
  "impact": "One paragraph, 45-75 words, plainly stating why this is relevant to remedial consultants, strata managers, waterproofing contractors, engineers or certifiers. Neutral and practical. No hype, no marketing, no legal or engineering advice.",
  "category": "exactly one of: ${VALID_CATEGORIES.join(" | ")}",
  "tags": ["3 to 5 keywords"]
}

If you cannot find an official government publication, respond with exactly: {"found": false}`;
}

type ContentBlock = { type: string; text?: string };

/** Pull the JSON object out of Claude's final text, tolerating any wrapping. */
function parseResult(blocks: ContentBlock[]): Record<string, unknown> | null {
  const text = blocks
    .filter((b) => b.type === "text" && typeof b.text === "string")
    .map((b) => b.text as string)
    .join("\n")
    .trim();
  if (!text) return null;

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  if (!candidate) return null;
  try {
    const parsed = JSON.parse(candidate);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** A URL the model returns is only real once it resolves. */
async function urlResolves(url: string): Promise<boolean> {
  const attempt = async (method: "HEAD" | "GET") => {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RemBuildAU/1.0)" },
      signal: AbortSignal.timeout(12000),
    });
    return res.ok || res.status === 403 || res.status === 405; // some gov sites block bots but the page exists
  };
  try {
    return await attempt("HEAD");
  } catch {
    try {
      return await attempt("GET");
    } catch {
      return false;
    }
  }
}

/**
 * Ask Claude to find and summarise the government publication behind an
 * article. Returns null whenever there is no official source to point at —
 * a normal outcome, not a failure.
 */
export async function findGovernmentOriginal(
  article: SourceArticle,
  options: LookupOptions = {},
): Promise<GovernmentOriginal | null> {
  if (!ANTHROPIC_API_KEY) return null;

  const effort = options.effort ?? "high";
  const maxUses = options.maxUses ?? 8;
  const timeoutMs = options.timeoutMs ?? 240000;
  const deadline = Date.now() + timeoutMs;

  const messages: { role: string; content: unknown }[] = [
    { role: "user", content: buildPrompt(article) },
  ];

  // Web search runs server-side; a long search turn can come back as
  // "pause_turn", which means "send this straight back to continue".
  const MAX_CONTINUATIONS = 4;
  let blocks: ContentBlock[] = [];

  for (let attempt = 0; attempt <= MAX_CONTINUATIONS; attempt++) {
    const remaining = deadline - Date.now();
    if (remaining <= 2000) return null;

    let res: Response;
    try {
      res = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: {
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 8000,
          output_config: { effort },
          tools: [{ type: "web_search_20260209", name: "web_search", max_uses: maxUses }],
          messages,
        }),
        signal: AbortSignal.timeout(remaining),
      });
    } catch {
      return null;
    }

    if (!res.ok) {
      console.error("[gov-original] Claude API error:", res.status, await res.text().catch(() => ""));
      return null;
    }

    const data = (await res.json()) as {
      content?: ContentBlock[];
      stop_reason?: string;
    };

    // A refusal is a successful HTTP 200 with no usable content — check the
    // stop reason before reading anything out of the response.
    if (data.stop_reason === "refusal") return null;

    blocks = data.content ?? [];

    if (data.stop_reason === "pause_turn") {
      messages.push({ role: "assistant", content: blocks });
      continue;
    }
    break;
  }

  const parsed = parseResult(blocks);
  if (!parsed || parsed.found !== true) return null;

  const url = typeof parsed.url === "string" ? parsed.url.trim() : "";
  const summary = typeof parsed.summary === "string" ? parsed.summary.trim() : "";
  const title = typeof parsed.title === "string" ? parsed.title.trim() : "";

  // The three things that make this worth publishing: a real government host,
  // a title, and an actual summary.
  if (!isGovernmentSourceUrl(url) || title.length < 8 || summary.length < 120) return null;
  if (!(await urlResolves(url))) return null;

  const rawCategory = typeof parsed.category === "string" ? parsed.category.trim() : "";
  const category = (VALID_CATEGORIES as readonly string[]).includes(rawCategory) ? rawCategory : "Other";

  const rawDate = typeof parsed.published_date === "string" ? parsed.published_date.trim() : "";
  const parsedDate = rawDate ? new Date(rawDate) : null;
  const published_date =
    parsedDate && !isNaN(parsedDate.getTime()) && parsedDate.getTime() <= Date.now()
      ? parsedDate.toISOString()
      : null;

  const agency =
    (typeof parsed.agency === "string" && parsed.agency.trim()) ||
    governmentAgencyFromUrl(url) ||
    "Australian Government";

  const tags = Array.isArray(parsed.tags)
    ? parsed.tags.filter((t): t is string => typeof t === "string").map((t) => t.trim()).filter(Boolean).slice(0, 5)
    : [];

  return {
    url,
    title: title.slice(0, 300),
    agency: agency.slice(0, 120),
    published_date,
    summary,
    impact: typeof parsed.impact === "string" ? parsed.impact.trim() : "",
    category,
    tags,
  };
}
