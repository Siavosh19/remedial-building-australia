import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { capitalWorksFields } from "@/lib/strata/records";

type Ctx = { params: Promise<{ id: string; itemId: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id, itemId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const existing = await prisma.strataCapitalWorksItem.findFirst({
    where: { id: Number(itemId), scheme_id: access.scheme.id },
  });
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  await prisma.strataCapitalWorksItem.update({
    where: { id: existing.id },
    data: {
      item: body.item !== undefined ? String(body.item).trim() || existing.item : undefined,
      ...capitalWorksFields(body),
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_capital_works",
    entityId: String(existing.id),
    action: "update",
    previousValue: { item: existing.item, estimated_cost: existing.estimated_cost },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id, itemId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const existing = await prisma.strataCapitalWorksItem.findFirst({
    where: { id: Number(itemId), scheme_id: access.scheme.id },
  });
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await prisma.strataCapitalWorksItem.delete({ where: { id: existing.id } });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_capital_works",
    entityId: String(existing.id),
    action: "delete",
    previousValue: { item: existing.item },
  });

  return NextResponse.json({ ok: true });
}
