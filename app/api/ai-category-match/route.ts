import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { anthropicMessages, parseJsonReply, hasAnthropicKey, AI_CLASSIFIER_MODEL } from "@/lib/anthropic";

// AI category matcher (proof of concept).
//
// Takes a free-text work description from a building owner and maps it onto the
// directory's TOP-LEVEL (parent) categories using Claude Haiku. The owner never
// has to know whether their problem is "Waterproofing", "Membrane Repair" or one
// of the 20 near-duplicate leaf categories — they describe the job in plain
// English and the model returns the right group.
//
// Why parent categories: the existing /api/directory/search filter matches both
// `main_category.slug` AND `main_category.parent.slug`, so returning a PARENT
// slug automatically folds in every (duplicated) child category underneath it —
// which is exactly how we route around the category fragmentation without having
// to merge the duplicates first.

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_DESCRIPTION = 1500;

type MatchedCategory = { id: number; name: string; slug: string };

// Shape Claude returns (validated by output_config.format json_schema).
type AiResult = {
  category: string; // exact parent-category name, or "" if nothing fits
  alternates: string[]; // up to 2 other plausible parent-category names
  query: string; // short canonical trade phrase for the keyword search
  location: string; // suburb/town/postcode/state mentioned in the description, or ""
  confidence: "high" | "medium" | "low";
};

const RESULT_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  properties: {
    category: {
      type: "string",
      description:
        "The single best-matching category name, copied EXACTLY from the provided list. Empty string if none of them fit.",
    },
    alternates: {
      type: "array",
      items: { type: "string" },
      description:
        "Up to 2 other plausible category names from the list (exact copies), best first. Empty array if none.",
    },
    query: {
      type: "string",
      description:
        "A 2-5 word canonical trade phrase a person would type to find this work (e.g. 'balcony waterproofing', 'concrete spalling repair').",
    },
    location: {
      type: "string",
      description:
        "Any Australian suburb, town, city, postcode or state the owner mentions for WHERE the work is, copied as written (e.g. 'Bondi', '2026', 'Parramatta NSW'). Empty string if no location is mentioned.",
    },
    confidence: { type: "string", enum: ["high", "medium", "low"] },
  },
  required: ["category", "alternates", "query", "location", "confidence"],
};

function buildSystemPrompt(categoryNames: string[]): string {
  return [
    "You classify a building owner's free-text description of work they need done into ONE building-trade category.",
    "",
    "You MUST choose from this exact list of categories (copy the name verbatim — do not invent, rename, pluralise, or merge names):",
    "",
    categoryNames.map((n) => `- ${n}`).join("\n"),
    "",
    "Rules:",
    "- Pick the single category that best matches the PRIMARY trade the owner needs.",
    "- Prefer the trade that physically does the repair or installation work over inspection, testing, consulting, engineering or certification categories — UNLESS the owner explicitly asks for an inspection, test, assessment, report, certificate or advice. (e.g. 'concrete spalling needs fixing' → a concrete/remedial repair trade, NOT a concrete testing service.)",
    "- If two trades are clearly involved, put the secondary one in `alternates`.",
    "- `query` is a short, normal search phrase for the specific work (not the category name) — what a person would type.",
    "- Use confidence 'low' and category '' only when nothing in the list reasonably fits.",
    "- Choose the CATEGORY from the work itself — do not let any mentioned location change the trade.",
    "- Separately, if the owner mentions WHERE the work is (a suburb, town, postcode or state), copy it into `location`. Otherwise leave `location` empty.",
  ].join("\n");
}

export async function POST(request: NextRequest) {
  if (!hasAnthropicKey()) {
    return NextResponse.json({ error: "AI matching is not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const description = typeof body?.description === "string" ? body.description.trim() : "";
  if (description.length < 8) {
    return NextResponse.json(
      { error: "Please describe the work in a bit more detail." },
      { status: 400 },
    );
  }
  const clipped = description.slice(0, MAX_DESCRIPTION);

  // Active top-level (parent) categories = the classification target set.
  const parents = await prisma.category.findMany({
    where: { is_active: true, parent_id: null },
    select: { id: true, name: true, slug: true },
    orderBy: [{ display_order: "asc" }, { name: "asc" }],
  });

  // Some parent names are duplicated (their own fragmentation). Dedupe by name
  // for the prompt; keep every record so we can resolve the chosen name back to
  // the best slug afterwards.
  const byName = new Map<string, MatchedCategory[]>();
  for (const c of parents) {
    const key = c.name.trim().toLowerCase();
    (byName.get(key) ?? byName.set(key, []).get(key)!).push(c);
  }
  const uniqueNames = [...byName.values()].map((rows) => rows[0].name).sort((a, b) => a.localeCompare(b));

  let ai: AiResult;
  try {
    const message = await anthropicMessages({
      model: AI_CLASSIFIER_MODEL,
      // Output is a small fixed JSON (category + up to 2 alternates + a short
      // query phrase) — ~150 tokens is ample headroom. Fewer output tokens =
      // faster generation, which is what the user feels on every AI search.
      max_tokens: 150,
      system: [
        {
          type: "text",
          text: buildSystemPrompt(uniqueNames),
          // Category list is identical across requests — cache it. (Silently
          // skipped if the prefix is under the model's caching minimum.)
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: clipped }],
      output_config: { format: { type: "json_schema", schema: RESULT_SCHEMA } },
    });
    ai = parseJsonReply<AiResult>(message);
  } catch (err) {
    console.error("[ai-category-match] classifier error:", err);
    return NextResponse.json({ error: "Could not classify that description. Please try again." }, { status: 502 });
  }

  // Resolve an AI-returned name to the best parent record. When a name is
  // duplicated, prefer the parent whose subtree has the most published
  // businesses (so the owner lands on the populated group).
  async function resolve(name: string): Promise<MatchedCategory | null> {
    const rows = byName.get(name.trim().toLowerCase());
    if (!rows || rows.length === 0) return null;
    if (rows.length === 1) return rows[0];
    const counts = await Promise.all(
      rows.map((r) =>
        prisma.company.count({
          where: {
            status: "published",
            OR: [{ main_category_id: r.id }, { main_category: { parent_id: r.id } }],
          },
        }),
      ),
    );
    let best = rows[0];
    let bestN = counts[0];
    rows.forEach((r, i) => {
      if (counts[i] > bestN) { bestN = counts[i]; best = r; }
    });
    return best;
  }

  const matched = ai.category ? await resolve(ai.category) : null;
  const alternates: MatchedCategory[] = [];
  for (const alt of (ai.alternates ?? []).slice(0, 2)) {
    const r = await resolve(alt);
    if (r && r.id !== matched?.id && !alternates.some((a) => a.id === r.id)) alternates.push(r);
  }

  return NextResponse.json({
    matched, // { id, name, slug } | null  — pass slug as `category` to /api/directory/search
    alternates, // MatchedCategory[]
    query: ai.query ?? "", // pass as `q` for in-group relevance ranking
    location: (ai.location ?? "").trim(), // place mentioned in the description, or ""
    confidence: ai.confidence ?? "low",
  });
}
