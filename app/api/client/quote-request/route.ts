import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientUserFromRequest } from "@/lib/directory-auth";
import { resolveRequestCoords } from "@/lib/quote-matching";
import { PROPERTY_TYPE_IDS, URGENCY_IDS } from "@/lib/quote-options";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET — list the signed-in client's quote requests (most recent first).
export async function GET(request: NextRequest) {
  const user = await getClientUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const requests = await prisma.clientQuoteRequest.findMany({
    where: { client_user_id: user.id },
    orderBy: { created_at: "desc" },
    include: {
      work_category: { select: { name: true } },
      _count: { select: { deliveries: true, files: true } },
    },
  });
  return NextResponse.json({ requests });
}

// POST — create a new request as a draft. Submission (matching + emails) is a
// separate step via PATCH /[id] { action: "submit" } so file uploads can be
// attached in between.
export async function POST(request: NextRequest) {
  const user = await getClientUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const contactName = String(body.contactName ?? user.full_name ?? "").trim();
  const contactEmail = String(body.contactEmail ?? user.email ?? "").trim().toLowerCase();
  const contactPhone = String(body.contactPhone ?? user.phone ?? "").trim();
  const companyName = String(body.companyName ?? "").trim();
  const buildingAddress = String(body.buildingAddress ?? "").trim();
  const suburb = String(body.suburb ?? "").trim();
  const postcode = String(body.postcode ?? "").trim();
  const strataPlanNumber = String(body.strataPlanNumber ?? "").trim();
  const propertyType = String(body.propertyType ?? "").trim();
  const description = String(body.description ?? "").trim();
  const urgency = String(body.urgency ?? "").trim();
  const preferredInspection = String(body.preferredInspection ?? "").trim();
  const budgetRange = String(body.budgetRange ?? "").trim();
  const consultantScopeAvailable = body.consultantScopeAvailable === true;
  const workCategoryId = Number(body.workCategoryId);
  const workSubcategoryId = body.workSubcategoryId ? Number(body.workSubcategoryId) : null;

  if (!contactName) return NextResponse.json({ error: "Contact name is required." }, { status: 400 });
  if (!contactEmail || !EMAIL_RE.test(contactEmail)) return NextResponse.json({ error: "A valid contact email is required." }, { status: 400 });
  if (!buildingAddress) return NextResponse.json({ error: "Building address is required." }, { status: 400 });
  if (!suburb) return NextResponse.json({ error: "Suburb is required." }, { status: 400 });
  if (!/^\d{4}$/.test(postcode)) return NextResponse.json({ error: "A valid 4-digit postcode is required." }, { status: 400 });
  if (!PROPERTY_TYPE_IDS.includes(propertyType as (typeof PROPERTY_TYPE_IDS)[number])) {
    return NextResponse.json({ error: "Please select a property type." }, { status: 400 });
  }
  if (!Number.isInteger(workCategoryId)) return NextResponse.json({ error: "Please select a work category." }, { status: 400 });
  if (!description) return NextResponse.json({ error: "Please describe the issue or required works." }, { status: 400 });
  if (!URGENCY_IDS.includes(urgency as (typeof URGENCY_IDS)[number])) {
    return NextResponse.json({ error: "Please select an urgency." }, { status: 400 });
  }

  // Validate the category exists (and the subcategory belongs to it, if given).
  const category = await prisma.category.findUnique({ where: { id: workCategoryId }, select: { id: true } });
  if (!category) return NextResponse.json({ error: "Selected work category was not found." }, { status: 400 });
  let subId: number | null = null;
  if (workSubcategoryId) {
    const sub = await prisma.category.findFirst({
      where: { id: workSubcategoryId, parent_id: workCategoryId },
      select: { id: true },
    });
    subId = sub?.id ?? null;
  }

  const coords = await resolveRequestCoords({ suburb, postcode });

  const created = await prisma.clientQuoteRequest.create({
    data: {
      client_user_id: user.id,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone || null,
      company_name: companyName || null,
      building_address: buildingAddress,
      suburb,
      postcode,
      state: coords.state ?? null,
      strata_plan_number: strataPlanNumber || null,
      property_type: propertyType as (typeof PROPERTY_TYPE_IDS)[number],
      work_category_id: workCategoryId,
      work_subcategory_id: subId,
      description,
      urgency: urgency as (typeof URGENCY_IDS)[number],
      preferred_inspection: preferredInspection || null,
      consultant_scope_available: consultantScopeAvailable,
      budget_range: budgetRange || null,
      latitude: coords.lat ?? null,
      longitude: coords.lng ?? null,
      status: "draft",
    },
    select: { id: true },
  });

  return NextResponse.json({ success: true, id: created.id });
}
