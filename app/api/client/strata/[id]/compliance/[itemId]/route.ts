import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { complianceFields, nextDueFrom } from "@/lib/strata/records";

type Ctx = { params: Promise<{ id: string; itemId: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id, itemId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const existing = await prisma.strataCompliance.findFirst({
    where: { id: Number(itemId), scheme_id: access.scheme.id },
  });
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const fields = complianceFields(body);

  // "Mark done" stamps today and rolls the next due date on by the cycle.
  let rolled: { last_done: Date; next_due: Date | null } | null = null;
  if (body.mark_done) {
    const done = new Date();
    rolled = { last_done: done, next_due: nextDueFrom(done, existing.cycle_months) };
  }

  await prisma.strataCompliance.update({
    where: { id: existing.id },
    data: {
      item: body.item !== undefined ? String(body.item).trim() || existing.item : undefined,
      ...fields,
      ...(rolled ?? {}),
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_compliance",
    entityId: String(existing.id),
    action: rolled ? "mark_done" : "update",
    previousValue: { next_due: existing.next_due },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id, itemId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const existing = await prisma.strataCompliance.findFirst({
    where: { id: Number(itemId), scheme_id: access.scheme.id },
  });
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await prisma.strataCompliance.delete({ where: { id: existing.id } });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_compliance",
    entityId: String(existing.id),
    action: "delete",
    previousValue: { item: existing.item },
  });

  return NextResponse.json({ ok: true });
}
