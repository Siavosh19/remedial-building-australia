import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { resolveRequestCoords } from "@/lib/quote-matching";
import { broadcastRequest } from "@/lib/quote-broadcast";
import { getOrCreateStrataClientUser, STRATA_INTAKE_BUCKET } from "@/lib/strata-connect";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { PROPERTY_TYPE_IDS, URGENCY_IDS } from "@/lib/quote-options";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Public bucket the portal uses for quote-request attachments (permanent public
// URLs so businesses can open them straight from the email).
const QUOTE_FILES_BUCKET = "quote-request-files";

type Params = { params: Promise<{ id: string }> };

// Stage 3 — an admin approves a reviewed intake. It becomes a real
// ClientQuoteRequest (owned by the Strata Connect service user, with the strata
// manager's contact details) and is broadcast to matching businesses via the
// existing pipeline. Admin-supplied overrides win over the AI-extracted fields.
export async function POST(request: NextRequest, { params }: Params) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const intakeId = Number(id);
  if (!Number.isInteger(intakeId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const intake = await prisma.strataIntake.findUnique({ where: { id: intakeId }, include: { files: true } });
  if (!intake) return NextResponse.json({ error: "Intake not found." }, { status: 404 });
  if (intake.status === "converted" && intake.quote_request_id) {
    return NextResponse.json({ error: "This work order has already been converted." }, { status: 409 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const pick = (key: string, fallback: string | null): string =>
    (typeof body[key] === "string" ? (body[key] as string) : "").trim() || (fallback ?? "").trim();

  const buildingAddress = pick("buildingAddress", intake.building_address);
  const suburb = pick("suburb", intake.suburb);
  const postcode = pick("postcode", intake.postcode);
  const strataPlan = pick("strataPlanNumber", intake.strata_plan_number);
  // Businesses should get the EXACT work-order text the strata manager sent (the
  // full email body), not the short AI summary. Falls back to summary/subject.
  const description = pick("description", intake.body_text || intake.job_description || intake.subject);
  const contactName = pick("contactName", intake.from_name || intake.from_email);
  const contactEmail = pick("contactEmail", intake.from_email).toLowerCase();
  const contactPhone = pick("contactPhone", null);
  const propertyType = pick("propertyType", "residential_strata");
  const urgency = pick("urgency", "within_month");
  const workCategoryId = Number(body.workCategoryId ?? intake.matched_category_id);

  // Validate the essentials before anything is sent to a business.
  if (!buildingAddress) return NextResponse.json({ error: "Building address is required." }, { status: 400 });
  if (!suburb) return NextResponse.json({ error: "Suburb is required." }, { status: 400 });
  if (!/^\d{4}$/.test(postcode)) return NextResponse.json({ error: "A valid 4-digit postcode is required." }, { status: 400 });
  if (!description) return NextResponse.json({ error: "A job description is required." }, { status: 400 });
  if (!Number.isInteger(workCategoryId)) return NextResponse.json({ error: "Select a work category before approving." }, { status: 400 });
  if (!PROPERTY_TYPE_IDS.includes(propertyType as (typeof PROPERTY_TYPE_IDS)[number])) {
    return NextResponse.json({ error: "Invalid property type." }, { status: 400 });
  }
  if (!URGENCY_IDS.includes(urgency as (typeof URGENCY_IDS)[number])) {
    return NextResponse.json({ error: "Invalid urgency." }, { status: 400 });
  }
  const category = await prisma.category.findUnique({ where: { id: workCategoryId }, select: { id: true } });
  if (!category) return NextResponse.json({ error: "Selected work category was not found." }, { status: 400 });

  const clientUserId = await getOrCreateStrataClientUser();
  const coords = await resolveRequestCoords({ suburb, postcode });

  const created = await prisma.clientQuoteRequest.create({
    data: {
      client_user_id: clientUserId,
      contact_name: contactName || "Strata manager",
      contact_email: contactEmail || intake.from_email,
      contact_phone: contactPhone || null,
      company_name: null,
      building_address: buildingAddress,
      suburb,
      postcode,
      state: coords.state ?? null,
      strata_plan_number: strataPlan || null,
      property_type: propertyType as (typeof PROPERTY_TYPE_IDS)[number],
      work_category_id: workCategoryId,
      description,
      urgency: urgency as (typeof URGENCY_IDS)[number],
      consultant_scope_available: false,
      latitude: coords.lat ?? null,
      longitude: coords.lng ?? null,
      terms_accepted: true,
      terms_version: "strata-connect",
      accepted_at: new Date(),
      status: "submitted",
      submitted_at: new Date(),
    },
    select: { id: true },
  });

  // Carry EVERY strata attachment across to the quote request so the matching
  // businesses receive them. The originals live in the private strata bucket; we
  // copy each into the public quote-files bucket and store its permanent public
  // URL. Best-effort per file — a single failed copy must not block the approval.
  // Runs BEFORE broadcast so the files are attached to the emails that go out.
  await supabaseAdmin.storage.createBucket(QUOTE_FILES_BUCKET, { public: true }).catch(() => {});
  for (const f of intake.files) {
    if (!f.url) continue; // no stored object (e.g. storage wasn't configured at intake time)
    try {
      const dl = await supabaseAdmin.storage.from(STRATA_INTAKE_BUCKET).download(f.url);
      if (dl.error || !dl.data) continue;
      const buffer = Buffer.from(await dl.data.arrayBuffer());
      const safe = (f.filename ?? "attachment").replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${created.id}/${f.id}-${safe}`;
      const up = await supabaseAdmin.storage.from(QUOTE_FILES_BUCKET).upload(path, buffer, {
        contentType: f.content_type ?? "application/octet-stream",
        upsert: true,
      });
      if (up.error) continue;
      const { data: urlData } = supabaseAdmin.storage.from(QUOTE_FILES_BUCKET).getPublicUrl(path);
      await prisma.quoteRequestFile.create({
        data: {
          request_id: created.id,
          file_type: (f.content_type ?? "").startsWith("image/") ? "photo" : "document",
          url: urlData.publicUrl,
          filename: f.filename ?? null,
          size_bytes: f.size_bytes ?? buffer.length,
          content_type: f.content_type ?? null,
          uploaded_by: "client",
        },
      });
    } catch {
      // best-effort; skip this attachment
    }
  }

  // Fan out to matching businesses (same pipeline the portal uses).
  const result = await broadcastRequest(created.id);

  await prisma.strataIntake.update({
    where: { id: intakeId },
    data: {
      status: "converted",
      quote_request_id: created.id,
      reviewed_by: admin.id,
      reviewed_at: new Date(),
    },
  });

  return NextResponse.json({ success: true, requestId: created.id, delivered: result.delivered, matched: result.matched });
}
