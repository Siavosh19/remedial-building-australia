import { NextRequest, NextResponse } from "next/server";
import {
  buildProductIndex,
  expandTokens,
  keywordScore,
} from "@/lib/product-search-index";
import type { SearchableProduct } from "@/lib/product-search-index";

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY ?? "";
export const maxDuration = 30;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AiResult {
  id: string;
  confidence: "High" | "Medium" | "Low";
  matchReason: string;
  limitations: string;
  product: SearchableProduct;
}

export interface SearchResponse {
  queryAnalysis: string;
  results: AiResult[];
  fallback?: boolean;
  totalCandidates?: number;
}

// ── Route ─────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse<SearchResponse | { error: string }>> {
  let body: { query?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const query = String(body.query ?? "").trim().slice(0, 300);
  if (query.length < 2) {
    return NextResponse.json({ error: "Query too short" }, { status: 400 });
  }

  const allProducts = buildProductIndex();

  // ── Keyword pre-filter → top 25 candidates ──────────────────────────────────
  const rawTokens = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
  const tokens = expandTokens(rawTokens);

  const scored = allProducts
    .map((p) => ({ p, s: keywordScore(p, tokens) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 25);

  const candidates: SearchableProduct[] =
    scored.length > 0 ? scored.map((x) => x.p) : allProducts.slice(0, 25);

  // ── Compact catalog for Claude (minimise tokens) ────────────────────────────
  const catalog = candidates.map((p) => ({
    id: p.id,
    name: p.productName,
    mfr: p.manufacturer,
    cat: p.categoryLabel,
    sub: p.subcategoryLabel,
    type: p.productType,
    notes: p.materialNotes.slice(0, 180),
    desc: p.brandDescription.slice(0, 100),
    adv: p.advantages.slice(0, 2).map((a) => a.slice(0, 120)),
    en: p.enClass,
    depth: p.repairDepth,
    orient: p.orientation,
    str: p.structural,
    fibre: p.fibreReinforced || undefined,
  }));

  const systemPrompt = `You are a technical product selection assistant for Australian remedial building and concrete repair products.

Your ONLY role is to match user queries to products from the supplied catalog. You cannot and must not recommend anything outside this catalog.

RULES:
- Only use product "id" values that exist in the catalog — never fabricate IDs
- Never invent technical specs, standards, compliance, or properties not stated in the catalog
- Never invent suppliers, prices, or availability
- If uncertain about suitability, state it clearly in "limitations"
- Prefer 3–5 highly confident results over 6 weak ones
- Every result must include a genuine technical reason why it matches the query

MATCHING CRITERIA (in priority order):
1. Product type / category match
2. Orientation suitability (overhead "O", vertical "V", horizontal "H")
3. Repair depth / thickness compatibility
4. Exposure conditions (coastal, marine, chloride, carbonation)
5. EN classification (R2 cosmetic, R3 structural, R4 heavy-duty)
6. Defect / substrate compatibility
7. Cure time / early-strength requirements

OUTPUT: Return only valid JSON — no markdown, no code fences, no explanation outside the JSON.
Schema:
{
  "queryAnalysis": "1-2 sentences: what technical need is expressed and key requirements",
  "results": [
    {
      "id": "<exact id from catalog>",
      "confidence": "High|Medium|Low",
      "matchReason": "Specific technical reason this product matches the query (1-2 sentences)",
      "limitations": "Caveats, conditions to verify, or uncertainties (empty string if none)"
    }
  ]
}`;

  const userMessage = `Query: "${query}"

Catalog (${catalog.length} products):
${JSON.stringify(catalog)}`;

  // ── Call Claude claude-haiku-4-5 ──────────────────────────────────────────────────
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1200,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!res.ok) throw new Error(`Anthropic ${res.status}`);

    const data = await res.json();
    const rawText: string = data.content?.[0]?.text ?? "{}";

    // Strip any accidental markdown fences
    const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

    let aiResponse: {
      queryAnalysis?: string;
      results?: { id: string; confidence: string; matchReason: string; limitations: string }[];
    };

    try {
      aiResponse = JSON.parse(cleaned);
    } catch {
      console.warn("[product-search] JSON parse failed, raw:", rawText.slice(0, 200));
      aiResponse = { results: [] };
    }

    // ── Validate: only allow IDs from our catalog ──────────────────────────────
    const validIdMap = Object.fromEntries(allProducts.map((p) => [p.id, p]));

    const safeResults: AiResult[] = (aiResponse.results ?? [])
      .filter((r) => typeof r.id === "string" && r.id in validIdMap)
      .slice(0, 6)
      .map((r) => ({
        id: r.id,
        confidence: (["High", "Medium", "Low"].includes(r.confidence) ? r.confidence : "Low") as AiResult["confidence"],
        matchReason: String(r.matchReason ?? "").slice(0, 400),
        limitations: String(r.limitations ?? "").slice(0, 400),
        product: validIdMap[r.id],
      }));

    return NextResponse.json({
      queryAnalysis: String(aiResponse.queryAnalysis ?? "").slice(0, 400),
      results: safeResults,
      totalCandidates: candidates.length,
    });
  } catch (err) {
    console.error("[product-search] AI error:", err);

    // ── Fallback: return keyword candidates with Low confidence ────────────────
    const fallbackResults: AiResult[] = candidates.slice(0, 6).map((p) => ({
      id: p.id,
      confidence: "Low" as const,
      matchReason: "Keyword match — AI analysis temporarily unavailable.",
      limitations: "Verify product suitability against manufacturer technical documentation.",
      product: p,
    }));

    return NextResponse.json({
      queryAnalysis: "AI analysis unavailable — showing keyword matches. Verify suitability manually.",
      results: fallbackResults,
      fallback: true,
    });
  }
}
