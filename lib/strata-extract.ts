import { prisma } from "@/lib/prisma";
import { anthropicMessages, parseJsonReply, hasAnthropicKey, AI_CLASSIFIER_MODEL } from "@/lib/anthropic";
import type { LocationState } from "@prisma/client";

// ─── Strata Connect: AI extraction (Stage 2) ─────────────────────────────────
// A strata manager forwards a work order / scope of works to workorders@… . The
// inbound webhook stores the raw email as a StrataIntake; this turns that free
// text into the structured fields an admin reviews before it becomes a quote
// request. Uses the same raw-fetch Anthropic helper + parent-category classifier
// approach as /api/ai-category-match, so a matched category folds in every
// (fragmented) child category underneath it.

export { hasAnthropicKey };

const STATES = new Set(["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"]);
const MAX_INPUT = 12000; // plenty for an email body + attachment filenames

type MatchedCategory = { id: number; name: string; slug: string };

export type StrataExtractInput = {
  subject?: string | null;
  bodyText?: string | null;
  bodyHtml?: string | null;
  fromName?: string | null;
  fromEmail?: string | null;
  attachmentNames?: string[];
};

// What we persist onto the StrataIntake after extraction.
export type StrataExtractResult = {
  building_address: string | null;
  suburb: string | null;
  postcode: string | null;
  state: LocationState | null;
  strata_plan_number: string | null;
  order_number: string | null;
  job_description: string | null;
  extracted_units: unknown | null; // Json — array of { unit, description }
  matched_category_id: number | null;
  matched_category_slug: string | null;
  matched_category_name: string | null;
  match_confidence: string | null;
  // Contact details lifted from the email so the admin (and later the lead) has them.
  contact_name: string | null;
  contact_phone: string | null;
};

// Shape Claude returns (constrained by output_config.format json_schema).
type AiExtract = {
  building_address: string;
  suburb: string;
  postcode: string;
  state: string; // one of STATES, or ""
  strata_plan_number: string;
  order_number: string;
  job_description: string;
  units: { unit: string; description: string }[];
  category: string; // exact parent-category name, or ""
  confidence: "high" | "medium" | "low";
  contact_name: string;
  contact_phone: string;
};

const EXTRACT_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  properties: {
    building_address: { type: "string", description: "Street address of the building the works are for (no suburb/state/postcode). Empty string if not stated." },
    suburb: { type: "string", description: "Suburb/town of the building. Empty string if not stated." },
    postcode: { type: "string", description: "4-digit Australian postcode of the building. Empty string if not stated." },
    state: { type: "string", enum: ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT", ""], description: "Australian state/territory of the building. Empty string if unknown." },
    strata_plan_number: { type: "string", description: "Strata plan number (e.g. 'SP12345', 'OC 987'). Empty string if not stated." },
    order_number: { type: "string", description: "The work order / job / reference number the strata manager quotes for this job. Empty string if none." },
    job_description: { type: "string", description: "A clear, self-contained summary of the works required, in plain English. Combine the email and any scope wording. 1-4 sentences." },
    units: {
      type: "array",
      description: "Individual lots/units named as affected, if the order lists them. Empty array if none.",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          unit: { type: "string", description: "Unit/lot identifier, e.g. 'Unit 4', 'Lot 12'." },
          description: { type: "string", description: "What is required at that unit. Empty string if unspecified." },
        },
        required: ["unit", "description"],
      },
    },
    category: { type: "string", description: "The single best-matching trade category, copied EXACTLY from the provided list. Empty string if none fit." },
    confidence: { type: "string", enum: ["high", "medium", "low"], description: "Confidence in the category match AND the extracted address." },
    contact_name: { type: "string", description: "Name of the person who sent the order (the strata manager / building manager). Empty string if unknown." },
    contact_phone: { type: "string", description: "A contact phone number for that person, digits as written. Empty string if none." },
  },
  required: ["building_address", "suburb", "postcode", "state", "strata_plan_number", "order_number", "job_description", "units", "category", "confidence", "contact_name", "contact_phone"],
};

function buildSystemPrompt(categoryNames: string[]): string {
  return [
    "You extract structured details from an email a strata manager (or building manager) has forwarded, which contains a work order / scope of works for remedial building work on a strata building in Australia.",
    "",
    "Return ONLY the fields defined by the schema. Copy values as written; do not invent details that are not present. Use empty strings / empty arrays when something is genuinely not stated.",
    "",
    "For `category`, choose the single trade that best matches the PRIMARY work required, copying the name VERBATIM from this list (do not invent, rename, pluralise or merge):",
    "",
    categoryNames.map((n) => `- ${n}`).join("\n"),
    "",
    "Rules:",
    "- Prefer the trade that physically does the repair/installation over inspection/testing/consulting categories, UNLESS the order explicitly asks for an inspection, test, report or certificate.",
    "- `job_description` should read as a clean brief a contractor can quote from — summarise, don't just copy the raw email signature/disclaimer.",
    "- Use confidence 'low' (and category '') only when nothing in the list reasonably fits.",
  ].join("\n");
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function buildUserContent(input: StrataExtractInput): string {
  const bodyText = (input.bodyText ?? "").trim();
  const body = bodyText || stripHtml(input.bodyHtml ?? "");
  const parts = [
    input.subject ? `Subject: ${input.subject}` : "",
    input.fromName || input.fromEmail ? `From: ${[input.fromName, input.fromEmail].filter(Boolean).join(" ")}` : "",
    input.attachmentNames?.length ? `Attachments: ${input.attachmentNames.join(", ")}` : "",
    "",
    "--- Email body ---",
    body || "(no readable body)",
  ];
  return parts.filter((p) => p !== null).join("\n").slice(0, MAX_INPUT);
}

// Resolve an AI-returned category name to the best parent record. When a name is
// duplicated across parents, prefer the one whose subtree has the most published
// businesses (identical logic to /api/ai-category-match).
async function resolveCategory(name: string, byName: Map<string, MatchedCategory[]>): Promise<MatchedCategory | null> {
  const rows = byName.get(name.trim().toLowerCase());
  if (!rows || rows.length === 0) return null;
  if (rows.length === 1) return rows[0];
  const counts = await Promise.all(
    rows.map((r) =>
      prisma.company.count({
        where: { status: "published", OR: [{ main_category_id: r.id }, { main_category: { parent_id: r.id } }] },
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

// Throws on a missing key or an Anthropic error — the caller records the message
// in extraction_error and sets the intake status to "failed".
export async function extractStrataIntake(input: StrataExtractInput): Promise<StrataExtractResult> {
  if (!hasAnthropicKey()) throw new Error("ANTHROPIC_API_KEY is not configured.");

  const parents = await prisma.category.findMany({
    where: { is_active: true, parent_id: null },
    select: { id: true, name: true, slug: true },
    orderBy: [{ display_order: "asc" }, { name: "asc" }],
  });
  const byName = new Map<string, MatchedCategory[]>();
  for (const c of parents) {
    const key = c.name.trim().toLowerCase();
    (byName.get(key) ?? byName.set(key, []).get(key)!).push(c);
  }
  const uniqueNames = [...byName.values()].map((rows) => rows[0].name).sort((a, b) => a.localeCompare(b));

  const message = await anthropicMessages({
    model: AI_CLASSIFIER_MODEL,
    max_tokens: 900,
    system: [
      { type: "text", text: buildSystemPrompt(uniqueNames), cache_control: { type: "ephemeral" } },
    ],
    messages: [{ role: "user", content: buildUserContent(input) }],
    output_config: { format: { type: "json_schema", schema: EXTRACT_SCHEMA } },
  });
  const ai = parseJsonReply<AiExtract>(message);

  const matched = ai.category ? await resolveCategory(ai.category, byName) : null;
  const stateRaw = (ai.state ?? "").trim().toUpperCase();
  const state = STATES.has(stateRaw) ? (stateRaw as LocationState) : null;
  const postcode = /^\d{4}$/.test((ai.postcode ?? "").trim()) ? ai.postcode.trim() : null;
  const units = Array.isArray(ai.units) && ai.units.length ? ai.units : null;
  const clean = (s: string | undefined) => (s ?? "").trim() || null;

  return {
    building_address: clean(ai.building_address),
    suburb: clean(ai.suburb),
    postcode,
    state,
    strata_plan_number: clean(ai.strata_plan_number),
    order_number: clean(ai.order_number),
    job_description: clean(ai.job_description),
    extracted_units: units,
    matched_category_id: matched?.id ?? null,
    matched_category_slug: matched?.slug ?? null,
    matched_category_name: matched?.name ?? null,
    match_confidence: ai.confidence ?? "low",
    contact_name: clean(ai.contact_name),
    contact_phone: clean(ai.contact_phone),
  };
}
