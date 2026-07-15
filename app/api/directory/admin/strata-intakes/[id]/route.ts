import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { convertIntakeToQuoteRequest } from "@/lib/strata-convert";
import type { LocationState } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

const STATES = new Set(["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"]);

// Apply the admin's edits to the intake's extracted fields. Shared by "save" and
// "approve" (approve saves the final values first, then converts).
async function applyEdits(intakeId: number, body: Record<string, unknown>) {
  const data: Record<string, unknown> = {};
  const setStr = (key: string, field: string, max = 2000) => {
    if (typeof body[key] === "string") data[field] = (body[key] as string).trim().slice(0, max) || null;
  };
  setStr("buildingAddress", "building_address");
  setStr("suburb", "suburb", 200);
  setStr("strataPlanNumber", "strata_plan_number", 100);
  setStr("orderNumber", "order_number", 100);
  setStr("jobDescription", "job_description", 8000);
  setStr("contactName", "contact_name", 200);
  setStr("contactPhone", "contact_phone", 60);
  setStr("reviewNotes", "review_notes", 2000);

  if (typeof body.postcode === "string") {
    const pc = body.postcode.trim();
    data.postcode = /^\d{4}$/.test(pc) ? pc : null;
  }
  if (typeof body.state === "string") {
    const st = body.state.trim().toUpperCase();
    data.state = STATES.has(st) ? (st as LocationState) : null;
  }
  if (body.workCategoryId !== undefined) {
    const catId = Number(body.workCategoryId);
    if (Number.isInteger(catId) && catId > 0) {
      const cat = await prisma.category.findUnique({ where: { id: catId }, select: { id: true, slug: true, name: true } });
      if (cat) {
        data.matched_category_id = cat.id;
        data.matched_category_slug = cat.slug;
        data.matched_category_name = cat.name;
      }
    } else if (body.workCategoryId === null || body.workCategoryId === "") {
      data.matched_category_id = null;
      data.matched_category_slug = null;
      data.matched_category_name = null;
    }
  }
  if (Object.keys(data).length) {
    await prisma.strataIntake.update({ where: { id: intakeId }, data });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const intakeId = Number(id);
  if (!Number.isInteger(intakeId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const existing = await prisma.strataIntake.findUnique({ where: { id: intakeId }, select: { id: true, status: true } });
  if (!existing) return NextResponse.json({ error: "Work order not found." }, { status: 404 });

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const action = String(body.action ?? "save");

  // ── Reject ──────────────────────────────────────────────────────────────────
  if (action === "reject") {
    if (existing.status === "converted") return NextResponse.json({ error: "This work order was already approved." }, { status: 400 });
    await prisma.strataIntake.update({
      where: { id: intakeId },
      data: {
        status: "rejected",
        review_notes: typeof body.reviewNotes === "string" ? body.reviewNotes.trim().slice(0, 2000) || null : undefined,
        reviewed_by: admin.id,
        reviewed_at: new Date(),
      },
    });
    return NextResponse.json({ success: true });
  }

  // ── Approve (save edits, then convert + broadcast) ──────────────────────────
  if (action === "approve") {
    if (existing.status === "converted") return NextResponse.json({ error: "This work order was already approved." }, { status: 400 });
    await applyEdits(intakeId, body);
    const result = await convertIntakeToQuoteRequest(intakeId, {
      reviewerId: admin.id,
      propertyType: typeof body.propertyType === "string" ? body.propertyType : undefined,
      urgency: typeof body.urgency === "string" ? body.urgency : undefined,
    });
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ success: true, requestId: result.requestId, matched: result.matched, delivered: result.delivered });
  }

  // ── Save edits only ─────────────────────────────────────────────────────────
  if (existing.status === "converted") return NextResponse.json({ error: "This work order was already approved and can no longer be edited." }, { status: 400 });
  await applyEdits(intakeId, body);
  return NextResponse.json({ success: true });
}

// DELETE — remove a spam / test intake and its files (cascade).
export async function DELETE(request: NextRequest, { params }: Params) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const intakeId = Number(id);
  if (!Number.isInteger(intakeId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const existing = await prisma.strataIntake.findUnique({ where: { id: intakeId }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Work order not found." }, { status: 404 });

  await prisma.strataIntake.delete({ where: { id: intakeId } });
  return NextResponse.json({ success: true });
}
