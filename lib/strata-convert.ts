import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/directory-auth";
import { resolveRequestCoords } from "@/lib/quote-matching";
import { broadcastRequest } from "@/lib/quote-broadcast";
import { TERMS_VERSION } from "@/lib/legal";
import { PROPERTY_TYPE_IDS, URGENCY_IDS } from "@/lib/quote-options";
import type { PropertyType, LeadUrgency } from "@prisma/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ConvertOptions = {
  reviewerId: number;
  propertyType?: string;
  urgency?: string;
};

export type ConvertResult =
  | { ok: true; requestId: number; matched: number; delivered: number }
  | { ok: false; error: string };

// Find (by email) or create the client User that a converted quote request hangs
// off. Strata managers who emailed in aren't signed-up users, so we provision a
// verified client account for them (admin-vetted → is_verified true). They can
// reset the password later to log in and track the request.
async function findOrCreateClientUser(opts: {
  email: string;
  name: string | null;
  phone: string | null;
}): Promise<number> {
  const email = opts.email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) return existing.id;

  const password_hash = await hashPassword(randomBytes(24).toString("hex"));
  const user = await prisma.user.create({
    data: {
      email,
      password_hash,
      full_name: opts.name,
      phone: opts.phone,
      role: "client_user",
      account_type: "strata_client",
      is_verified: true,
      terms_accepted_at: new Date(),
      terms_version: TERMS_VERSION,
      client_profile: { create: { client_type: "strata_manager" } },
    },
    select: { id: true },
  });
  return user.id;
}

function fileTypeFor(contentType: string | null): string {
  if (contentType?.startsWith("image/")) return "photo";
  if (contentType?.includes("pdf")) return "report";
  return "document";
}

// Approve an intake: build a ClientQuoteRequest from its (admin-reviewed) fields,
// copy the attachments across, mark the intake converted, then broadcast to
// matching Silver/Gold businesses — the same pipeline the manual portal uses.
export async function convertIntakeToQuoteRequest(intakeId: number, opts: ConvertOptions): Promise<ConvertResult> {
  const intake = await prisma.strataIntake.findUnique({
    where: { id: intakeId },
    include: { files: true },
  });
  if (!intake) return { ok: false, error: "Intake not found." };
  if (intake.status === "converted" && intake.quote_request_id) {
    return { ok: false, error: "This work order has already been approved." };
  }

  // ── Validate the fields the quote request requires ──────────────────────────
  const contactEmail = (intake.from_email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(contactEmail)) return { ok: false, error: "The sender email is invalid — cannot create a quote request." };
  if (!intake.building_address?.trim()) return { ok: false, error: "Building address is required. Add it, then approve." };
  if (!intake.suburb?.trim()) return { ok: false, error: "Suburb is required. Add it, then approve." };
  if (!/^\d{4}$/.test((intake.postcode ?? "").trim())) return { ok: false, error: "A valid 4-digit postcode is required. Add it, then approve." };
  if (!intake.matched_category_id) return { ok: false, error: "A work category is required. Pick one, then approve." };
  if (!intake.job_description?.trim()) return { ok: false, error: "A job description is required. Add it, then approve." };

  const category = await prisma.category.findUnique({ where: { id: intake.matched_category_id }, select: { id: true } });
  if (!category) return { ok: false, error: "The selected work category no longer exists." };

  const propertyType = (PROPERTY_TYPE_IDS as readonly string[]).includes(opts.propertyType ?? "")
    ? (opts.propertyType as PropertyType)
    : ("residential_strata" as PropertyType);
  const urgency = (URGENCY_IDS as readonly string[]).includes(opts.urgency ?? "")
    ? (opts.urgency as LeadUrgency)
    : ("within_month" as LeadUrgency);

  const clientUserId = await findOrCreateClientUser({
    email: contactEmail,
    name: intake.contact_name ?? intake.from_name,
    phone: intake.contact_phone,
  });

  const coords = await resolveRequestCoords({ suburb: intake.suburb, postcode: intake.postcode, state: intake.state });

  // Fold the order number + affected units into the description so businesses
  // see the full brief.
  const units = Array.isArray(intake.extracted_units) ? (intake.extracted_units as { unit?: string; description?: string }[]) : [];
  const descParts = [intake.job_description!.trim()];
  if (intake.order_number) descParts.push(`Work order: ${intake.order_number}`);
  if (intake.strata_plan_number) descParts.push(`Strata plan: ${intake.strata_plan_number}`);
  if (units.length) descParts.push("Affected units:\n" + units.map((u) => `• ${[u.unit, u.description].filter(Boolean).join(" — ")}`).join("\n"));
  const description = descParts.join("\n\n").slice(0, 8000);

  const created = await prisma.clientQuoteRequest.create({
    data: {
      client_user_id: clientUserId,
      contact_name: (intake.contact_name ?? intake.from_name ?? contactEmail).slice(0, 200),
      contact_email: contactEmail,
      contact_phone: intake.contact_phone,
      building_address: intake.building_address!.trim(),
      suburb: intake.suburb!.trim(),
      postcode: intake.postcode!.trim(),
      state: coords.state ?? intake.state ?? null,
      strata_plan_number: intake.strata_plan_number,
      property_type: propertyType,
      work_category_id: intake.matched_category_id,
      description,
      urgency,
      // Admin approval stands in for the client accepting terms on the portal.
      terms_accepted: true,
      terms_version: TERMS_VERSION,
      accepted_at: new Date(),
      latitude: coords.lat ?? null,
      longitude: coords.lng ?? null,
      status: "submitted",
      submitted_at: new Date(),
    },
    select: { id: true },
  });

  // Copy stored attachments onto the quote request (only ones that uploaded).
  const withUrls = intake.files.filter((f) => f.url);
  if (withUrls.length) {
    await prisma.quoteRequestFile.createMany({
      data: withUrls.map((f) => ({
        request_id: created.id,
        file_type: fileTypeFor(f.content_type),
        url: f.url!,
        filename: f.filename,
        size_bytes: f.size_bytes,
        content_type: f.content_type,
        uploaded_by: "client",
      })),
    });
  }

  await prisma.strataIntake.update({
    where: { id: intake.id },
    data: { status: "converted", quote_request_id: created.id, reviewed_by: opts.reviewerId, reviewed_at: new Date() },
  });

  // Broadcast to matching businesses (same path as the manual portal submit).
  const result = await broadcastRequest(created.id);
  return { ok: true, requestId: created.id, matched: result.matched, delivered: result.delivered };
}
