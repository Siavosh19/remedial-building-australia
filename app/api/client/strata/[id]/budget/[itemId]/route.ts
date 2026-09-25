import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";

type Ctx = { params: Promise<{ id: string; itemId: string }> };

async function loadItem(schemeId: number, itemId: number) {
  return prisma.strataBudgetItem.findFirst({ where: { id: itemId, scheme_id: schemeId } });
}

export async function PATCH(req: Request, ctx: Ctx) {
  const { id, itemId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const existing = await loadItem(access.scheme.id, Number(itemId));
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const amount = Number(body.amount);
  await prisma.strataBudgetItem.update({
    where: { id: existing.id },
    data: {
      item: body.item !== undefined ? String(body.item).trim() || existing.item : undefined,
      category: body.category !== undefined ? String(body.category).trim() || null : undefined,
      fund: body.fund !== undefined ? (body.fund === "fund_2" ? "fund_2" : "fund_1") : undefined,
      amount: body.amount !== undefined && Number.isFinite(amount) && amount >= 0 ? amount : undefined,
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_budget_item",
    entityId: String(existing.id),
    action: "update",
    previousValue: { item: existing.item, amount: existing.amount },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id, itemId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const existing = await loadItem(access.scheme.id, Number(itemId));
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await prisma.strataBudgetItem.delete({ where: { id: existing.id } });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_budget_item",
    entityId: String(existing.id),
    action: "delete",
    previousValue: { item: existing.item, amount: existing.amount },
  });

  return NextResponse.json({ ok: true });
}
