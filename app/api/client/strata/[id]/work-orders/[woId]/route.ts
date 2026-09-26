import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { workOrderFields } from "@/lib/strata/contractors";
import { createAuditLog } from "@/lib/audit";

type Ctx = { params: Promise<{ id: string; woId: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id, woId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const order = await prisma.strataWorkOrder.findFirst({
    where: { id: Number(woId), scheme_id: access.scheme.id },
  });
  if (!order) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  let contractorId: number | null | undefined;
  if (body.contractor_id !== undefined) {
    const requested = Number(body.contractor_id);
    if (Number.isFinite(requested) && requested > 0) {
      const contractor = await prisma.strataContractor.findFirst({
        where: { id: requested, scheme_id: access.scheme.id },
        select: { id: true },
      });
      contractorId = contractor?.id ?? null;
    } else {
      contractorId = null;
    }
  }

  const fields = workOrderFields(body);

  // Hard rule, not a warning: a business whose insurance has lapsed cannot be
  // put to work on the building until the date is updated.
  const engaging = contractorId ?? order.contractor_id;
  const goingLive = ["issued", "accepted", "in_progress", "completed"].includes(String(fields.status ?? ""));
  if (engaging && goingLive) {
    const candidate = await prisma.strataContractor.findUnique({
      where: { id: engaging },
      select: { business_name: true, insurance_expiry: true },
    });
    if (candidate?.insurance_expiry && candidate.insurance_expiry < new Date()) {
      return NextResponse.json(
        {
          error: `${candidate.business_name}'s insurance expired on ${candidate.insurance_expiry.toLocaleDateString("en-AU")}. Update it on the Businesses tab before engaging them.`,
        },
        { status: 409 },
      );
    }
  }

  const updated = await prisma.strataWorkOrder.update({
    where: { id: order.id },
    data: {
      title: body.title !== undefined ? String(body.title).trim() || order.title : undefined,
      contractor_id: contractorId,
      ...fields,
    },
  });

  // Engaging a business is the moment the contractor log learns about it.
  const engagedId = contractorId ?? order.contractor_id;
  if (engagedId && (fields.issued_on || updated.status === "issued" || updated.status === "completed")) {
    const when = updated.completed_on ?? updated.issued_on ?? new Date();
    const contractor = await prisma.strataContractor.findUnique({
      where: { id: engagedId },
      select: { first_engaged: true },
    });
    await prisma.strataContractor.update({
      where: { id: engagedId },
      data: { last_engaged: when, first_engaged: contractor?.first_engaged ?? when },
    });
  }

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_work_order",
    entityId: String(order.id),
    action: "update",
    previousValue: { status: order.status, contractor_id: order.contractor_id },
    newValue: { status: updated.status, contractor_id: updated.contractor_id },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id, woId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const order = await prisma.strataWorkOrder.findFirst({
    where: { id: Number(woId), scheme_id: access.scheme.id },
  });
  if (!order) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await prisma.strataWorkOrder.delete({ where: { id: order.id } });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_work_order",
    entityId: String(order.id),
    action: "delete",
    previousValue: { reference: order.reference, title: order.title },
  });

  return NextResponse.json({ ok: true });
}
