import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { expenseFields } from "@/lib/strata/records";

type Ctx = { params: Promise<{ id: string; expenseId: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id, expenseId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const existing = await prisma.strataExpense.findFirst({
    where: { id: Number(expenseId), scheme_id: access.scheme.id },
  });
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  let budgetItemId: number | null | undefined;
  if (body.budget_item_id !== undefined) {
    const n = Number(body.budget_item_id);
    if (Number.isFinite(n) && n > 0) {
      const found = await prisma.strataBudgetItem.findFirst({
        where: { id: n, scheme_id: access.scheme.id },
        select: { id: true },
      });
      budgetItemId = found?.id ?? null;
    } else {
      budgetItemId = null;
    }
  }

  const amount = Number(body.amount);
  const invoiceDate = body.invoice_date ? new Date(String(body.invoice_date)) : undefined;

  await prisma.strataExpense.update({
    where: { id: existing.id },
    data: {
      supplier: body.supplier !== undefined ? String(body.supplier).trim() || existing.supplier : undefined,
      amount: body.amount !== undefined && Number.isFinite(amount) ? amount : undefined,
      invoice_date: invoiceDate && !Number.isNaN(invoiceDate.getTime()) ? invoiceDate : undefined,
      budget_item_id: budgetItemId,
      ...expenseFields(body),
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_expense",
    entityId: String(existing.id),
    action: "update",
    previousValue: { amount: existing.amount, status: existing.status },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id, expenseId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const existing = await prisma.strataExpense.findFirst({
    where: { id: Number(expenseId), scheme_id: access.scheme.id },
  });
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await prisma.strataExpense.delete({ where: { id: existing.id } });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_expense",
    entityId: String(existing.id),
    action: "delete",
    previousValue: { supplier: existing.supplier, amount: existing.amount },
  });

  return NextResponse.json({ ok: true });
}
