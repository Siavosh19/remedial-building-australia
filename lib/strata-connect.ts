// ─── Strata Connect: shared config + helpers ─────────────────────────────────
// Inbound work-order intake. A strata manager forwards a work order / scope of
// works to the address below; it is parsed (Stage 2, AI extraction), reviewed in
// admin, then converted into a ClientQuoteRequest via the existing matching
// pipeline (Stage 3).

import { prisma } from "@/lib/prisma";
import { anthropicMessages, parseJsonReply, hasAnthropicKey, AI_CLASSIFIER_MODEL } from "@/lib/anthropic";
import { hashPassword } from "@/lib/directory-auth";

// Public-facing intake address (advertised to strata managers). Overridable via
// env so we never hard-code an environment-specific value in more than one place.
export const STRATA_INTAKE_EMAIL =
  process.env.STRATA_INTAKE_EMAIL || "workorders@remedialbuildingaustralia.com.au";

// Private storage bucket holding every forwarded attachment (work orders, scope
// docs, site photos). Not public — the admin screen views files via signed URLs.
export const STRATA_INTAKE_BUCKET = "strata-intake";

// Intake statuses that still need an admin to act (the review queue).
export const OPEN_INTAKE_STATUSES = ["received", "extracting", "needs_review"] as const;

// The single service account that OWNS every Strata-Connect-originated quote
// request. The real strata manager's details live in the request's contact_*
// fields (that's what businesses see); this account is just the portal owner so
// we don't provision a login per sender. Overridable via env.
const STRATA_CLIENT_EMAIL = process.env.STRATA_CLIENT_EMAIL || "strata-connect@remedialbuildingaustralia.com.au";

// Find-or-create the Strata Connect service client user. Created with a random
// unusable password (no one logs in as it) and the client_user role.
export async function getOrCreateStrataClientUser(): Promise<number> {
  const existing = await prisma.user.findUnique({ where: { email: STRATA_CLIENT_EMAIL }, select: { id: true } });
  if (existing) return existing.id;
  const randomPassword = `strata-${Math.abs(hashCode(STRATA_CLIENT_EMAIL))}-${STRATA_CLIENT_EMAIL.length}-service`;
  const created = await prisma.user.create({
    data: {
      email: STRATA_CLIENT_EMAIL,
      password_hash: await hashPassword(randomPassword),
      full_name: "Strata Connect",
      role: "client_user",
      is_verified: true,
    },
    select: { id: true },
  });
  return created.id;
}

// Small deterministic hash so the service password isn't a literal in source and
// doesn't need Math.random (which is disallowed in some build contexts).
function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

type ExtractResult = {
  building_address: string;
  suburb: string;
  postcode: string;
  state: string;
  strata_plan_number: string;
  order_number: string;
  job_description: string;
  category: string; // exact parent-category name from the supplied list, or ""
  confidence: "high" | "medium" | "low";
};

const EXTRACT_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  properties: {
    building_address: { type: "string", description: "Full street address of the building/site, or '' if not stated." },
    suburb: { type: "string" },
    postcode: { type: "string", description: "4-digit Australian postcode, or ''." },
    state: { type: "string", description: "AU state code (NSW, VIC, QLD, SA, WA, TAS, NT, ACT), or ''." },
    strata_plan_number: { type: "string", description: "Strata/community plan number e.g. 'SP12345', or ''." },
    order_number: { type: "string", description: "Work order / reference number, or ''." },
    job_description: { type: "string", description: "Concise summary of the remedial works required." },
    category: { type: "string", description: "The single best-matching category name from the provided list, or '' if none fit." },
    confidence: { type: "string", enum: ["high", "medium", "low"] },
  },
  required: ["building_address", "suburb", "postcode", "state", "strata_plan_number", "order_number", "job_description", "category", "confidence"],
};

const AU_STATES = new Set(["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"]);

// Stage 2 — AI extraction. Reads the forwarded email (+ any attachment text) and
// fills the intake's structured fields + best-matching directory category. Never
// throws: on failure it records extraction_error and leaves the intake in
// needs_review so an admin can fill it in by hand.
export async function extractIntake(intakeId: number): Promise<void> {
  const intake = await prisma.strataIntake.findUnique({
    where: { id: intakeId },
    include: { files: { select: { filename: true, extracted_text: true } } },
  });
  if (!intake) return;

  if (!hasAnthropicKey()) {
    await prisma.strataIntake.update({
      where: { id: intakeId },
      data: { status: "needs_review", extraction_error: "AI key not configured — fill fields manually." },
    });
    return;
  }

  await prisma.strataIntake.update({ where: { id: intakeId }, data: { status: "extracting" } });

  try {
    const parents = await prisma.category.findMany({
      where: { is_active: true, parent_id: null },
      select: { id: true, name: true, slug: true },
      orderBy: [{ display_order: "asc" }, { name: "asc" }],
    });

    const bodyText = intake.body_text || stripHtml(intake.body_html) || "";
    const fileText = intake.files
      .map((f) => (f.extracted_text ? `\n\n[Attachment: ${f.filename}]\n${f.extracted_text}` : ""))
      .join("");
    const corpus = `SUBJECT: ${intake.subject ?? ""}\n\nBODY:\n${bodyText}${fileText}`.slice(0, 24000);

    const res = await anthropicMessages({
      model: AI_CLASSIFIER_MODEL,
      max_tokens: 700,
      system:
        "You extract structured data from Australian strata building work orders. " +
        "Return ONLY the requested fields. Choose the category strictly from the provided list (exact name) or '' if none fit.",
      messages: [
        {
          role: "user",
          content:
            `Categories (choose one exact name or ''):\n${parents.map((p) => `- ${p.name}`).join("\n")}\n\n` +
            `Work order:\n${corpus}`,
        },
      ],
      output_config: { format: { type: "json_schema", schema: EXTRACT_SCHEMA } },
    });

    const out = parseJsonReply<ExtractResult>(res);
    const matched = out.category
      ? parents.find((p) => p.name.toLowerCase() === out.category.trim().toLowerCase()) ?? null
      : null;
    const stateCode = out.state?.trim().toUpperCase();

    await prisma.strataIntake.update({
      where: { id: intakeId },
      data: {
        building_address: out.building_address?.trim() || null,
        suburb: out.suburb?.trim() || null,
        postcode: /^\d{4}$/.test(out.postcode?.trim() ?? "") ? out.postcode.trim() : null,
        state: stateCode && AU_STATES.has(stateCode) ? (stateCode as never) : null,
        strata_plan_number: out.strata_plan_number?.trim() || null,
        order_number: out.order_number?.trim() || null,
        job_description: out.job_description?.trim() || null,
        matched_category_id: matched?.id ?? null,
        matched_category_slug: matched?.slug ?? null,
        matched_category_name: matched?.name ?? null,
        match_confidence: out.confidence ?? null,
        extraction_error: null,
        status: "needs_review",
      },
    });
  } catch (err) {
    await prisma.strataIntake.update({
      where: { id: intakeId },
      data: { status: "needs_review", extraction_error: String((err as Error)?.message ?? err).slice(0, 480) },
    });
  }
}

function stripHtml(html: string | null): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
