import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientUserFromRequest } from "@/lib/directory-auth";
import { TERMS_VERSION } from "@/lib/legal";

type Params = { params: Promise<{ id: string }> };

async function loadOwnedRequest(request: NextRequest, idStr: string) {
  const user = await getClientUserFromRequest(request);
  if (!user) return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  const id = Number(idStr);
  if (!Number.isInteger(id)) return { error: NextResponse.json({ error: "Invalid ID." }, { status: 400 }) };
  const found = await prisma.clientQuoteRequest.findFirst({ where: { id, client_user_id: user.id } });
  if (!found) return { error: NextResponse.json({ error: "Request not found." }, { status: 404 }) };
  return { user, request: found };
}

// GET — full request detail incl. matched businesses + uploaded files.
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const ctx = await loadOwnedRequest(request, id);
  if ("error" in ctx) return ctx.error;

  const detail = await prisma.clientQuoteRequest.findUnique({
    where: { id: ctx.request.id },
    include: {
      work_category: { select: { name: true } },
      subcategory: { select: { name: true } },
      files: { orderBy: { created_at: "asc" } },
      deliveries: {
        orderBy: { rank_tier: "asc" },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              slug: true,
              plan_type: true,
              locations: { select: { suburb: true, state: true }, take: 1 },
            },
          },
        },
      },
    },
  });

  return NextResponse.json({ request: detail });
}

// PATCH — update a draft, submit it (matching + emails), or close it.
export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const ctx = await loadOwnedRequest(request, id);
  if ("error" in ctx) return ctx.error;
  const existing = ctx.request;

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const action = String(body.action ?? "update");

  // ── Close ──────────────────────────────────────────────────────────────────
  if (action === "close") {
    await prisma.clientQuoteRequest.update({
      where: { id: existing.id },
      data: { status: "closed", closed_at: new Date() },
    });
    return NextResponse.json({ success: true });
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  if (action === "submit") {
    if (existing.status !== "draft") {
      return NextResponse.json({ error: "This request has already been submitted." }, { status: 400 });
    }
    if (body.termsAccepted !== true && !existing.terms_accepted) {
      return NextResponse.json({ error: "You must accept the platform terms and disclaimer to submit." }, { status: 400 });
    }
    // No auto-broadcast: submitting records the request and the client then
    // browses the results page and hand-picks which businesses to send it to.
    await prisma.clientQuoteRequest.update({
      where: { id: existing.id },
      data: { terms_accepted: true, terms_version: TERMS_VERSION, accepted_at: new Date(), status: "submitted", submitted_at: existing.submitted_at ?? new Date() },
    });
    return NextResponse.json({ success: true });
  }

  // ── Update (draft only) ──────────────────────────────────────────────────────
  if (existing.status !== "draft") {
    return NextResponse.json({ error: "Only draft requests can be edited." }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  const setStr = (key: string, field: string) => {
    if (typeof body[key] === "string") data[field] = body[key].trim() || null;
  };
  setStr("companyName", "company_name");
  setStr("buildingAddress", "building_address");
  setStr("strataPlanNumber", "strata_plan_number");
  setStr("description", "description");
  setStr("preferredInspection", "preferred_inspection");
  setStr("budgetRange", "budget_range");
  setStr("contactPhone", "contact_phone");
  if (typeof body.consultantScopeAvailable === "boolean") data.consultant_scope_available = body.consultantScopeAvailable;

  await prisma.clientQuoteRequest.update({ where: { id: existing.id }, data });
  return NextResponse.json({ success: true });
}
