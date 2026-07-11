import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { TERMS_VERSION } from "@/lib/legal";
import { notifyCompanyOwners } from "@/lib/notifications";
import { sendUpdatedQuoteRequestEmail } from "@/lib/directory-email";
import { PROPERTY_TYPE_OPTIONS, URGENCY_OPTIONS, URGENCY_LABELS, formatBudget } from "@/lib/quote-options";

type Params = { params: Promise<{ id: string }> };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

async function loadOwnedRequest(request: NextRequest, idStr: string) {
  const user = await getDirectoryUserFromRequest(request);
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

  // ── Update (draft, submitted or already-sent — never closed) ─────────────────
  if (existing.status === "closed") {
    return NextResponse.json({ error: "This request is closed and can no longer be edited." }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  // Blankable fields → null when empty.
  const setStr = (key: string, field: string) => {
    if (typeof body[key] === "string") data[field] = body[key].trim() || null;
  };
  // Required fields → only overwrite when a non-empty value is supplied.
  const setRequired = (key: string, field: string) => {
    if (typeof body[key] === "string" && body[key].trim()) data[field] = body[key].trim();
  };
  setRequired("contactName", "contact_name");
  setRequired("contactEmail", "contact_email");
  setRequired("buildingAddress", "building_address");
  setRequired("suburb", "suburb");
  setRequired("postcode", "postcode");
  setRequired("description", "description");
  setStr("contactPhone", "contact_phone");
  setStr("companyName", "company_name");
  setStr("strataPlanNumber", "strata_plan_number");
  setStr("preferredInspection", "preferred_inspection");
  setStr("budgetRange", "budget_range");
  if (typeof body.propertyType === "string" && PROPERTY_TYPE_OPTIONS.some((o) => o.id === body.propertyType)) {
    data.property_type = body.propertyType;
  }
  if (typeof body.urgency === "string" && URGENCY_OPTIONS.some((o) => o.id === body.urgency)) {
    data.urgency = body.urgency;
  }
  const catId = Number(body.workCategoryId);
  if (Number.isInteger(catId) && catId > 0) data.work_category_id = catId;
  if (typeof body.consultantScopeAvailable === "boolean") data.consultant_scope_available = body.consultantScopeAvailable;

  await prisma.clientQuoteRequest.update({ where: { id: existing.id }, data });

  // If it had already been sent to businesses, tell them it changed (bell + email).
  if (existing.status !== "draft") {
    const deliveries = await prisma.quoteRequestDelivery.findMany({
      where: { request_id: existing.id },
      include: { company: { select: { id: true, name: true, email: true } } },
    });
    if (deliveries.length > 0) {
      const updated = await prisma.clientQuoteRequest.findUnique({
        where: { id: existing.id },
        include: { work_category: { select: { name: true } }, files: { select: { filename: true, url: true } } },
      });
      const catName = updated?.work_category?.name ?? "Building works";
      for (const d of deliveries) {
        await notifyCompanyOwners(d.company.id, {
          type: "lead_updated",
          title: "Lead updated",
          body: `${catName} · ${updated?.suburb ?? ""} ${updated?.postcode ?? ""}`.trim(),
          link: "/directory/dashboard/lead-requests",
        });
        if (d.company.email && updated) {
          sendUpdatedQuoteRequestEmail({
            to: d.company.email,
            businessName: d.company.name,
            clientName: updated.contact_name,
            clientEmail: updated.contact_email,
            clientPhone: updated.contact_phone,
            suburb: updated.suburb,
            postcode: updated.postcode,
            category: catName,
            description: updated.description,
            budget: formatBudget(updated.budget_range) || null,
            urgency: URGENCY_LABELS[updated.urgency] ?? updated.urgency,
            files: updated.files,
            dashboardUrl: `${SITE_URL}/directory/dashboard/lead-requests`,
          }).catch((e) => console.error("[quote edit] business email failed:", e));
        }
      }
    }
  }

  return NextResponse.json({ success: true });
}
