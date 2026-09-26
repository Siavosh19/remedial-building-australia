import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { contractorFields } from "@/lib/strata/contractors";
import { createAuditLog } from "@/lib/audit";

type Ctx = { params: Promise<{ id: string; contractorId: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id, contractorId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const contractor = await prisma.strataContractor.findFirst({
    where: { id: Number(contractorId), scheme_id: access.scheme.id },
  });
  if (!contractor) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  await prisma.strataContractor.update({
    where: { id: contractor.id },
    data: {
      business_name:
        body.business_name !== undefined
          ? String(body.business_name).trim() || contractor.business_name
          : undefined,
      trade: body.trade !== undefined ? String(body.trade).trim() || contractor.trade : undefined,
      ...contractorFields(body),
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_contractor",
    entityId: String(contractor.id),
    action: "update",
    previousValue: { business: contractor.business_name, engagement: contractor.engagement },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id, contractorId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const contractor = await prisma.strataContractor.findFirst({
    where: { id: Number(contractorId), scheme_id: access.scheme.id },
    include: { _count: { select: { work_orders: true } } },
  });
  if (!contractor) return NextResponse.json({ error: "Not found." }, { status: 404 });

  // A business with work history is archived, not deleted — the record of who
  // did what on the building is worth more than a tidy list.
  if (contractor._count.work_orders > 0) {
    await prisma.strataContractor.update({ where: { id: contractor.id }, data: { active: false } });
    await createAuditLog({
      actorId: access.userId,
      entityType: "strata_contractor",
      entityId: String(contractor.id),
      action: "archive",
      previousValue: { business: contractor.business_name },
    });
    return NextResponse.json({ ok: true, archived: true });
  }

  await prisma.strataContractor.delete({ where: { id: contractor.id } });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_contractor",
    entityId: String(contractor.id),
    action: "delete",
    previousValue: { business: contractor.business_name },
  });

  return NextResponse.json({ ok: true });
}
