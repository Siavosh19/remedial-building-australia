import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { expenseFields } from "@/lib/strata/records";

/** Only link a budget line, work order or contractor that belongs to this scheme. */
async function resolveLinks(schemeId: number, body: Record<string, unknown>) {
  const pick = async (
    value: unknown,
    finder: (n: number) => Promise<{ id: number } | null>,
  ): Promise<number | null> => {
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0) return null;
    const found = await finder(n);
    return found?.id ?? null;
  };

  const [budgetItemId, workOrderId, contractorId] = await Promise.all([
    pick(body.budget_item_id, (n) =>
      prisma.strataBudgetItem.findFirst({ where: { id: n, scheme_id: schemeId }, select: { id: true } }),
    ),
    pick(body.work_order_id, (n) =>
      prisma.strataWorkOrder.findFirst({ where: { id: n, scheme_id: schemeId }, select: { id: true } }),
    ),
    pick(body.contractor_id, (n) =>
      prisma.strataContractor.findFirst({ where: { id: n, scheme_id: schemeId }, select: { id: true } }),
    ),
  ]);

  return { budgetItemId, workOrderId, contractorId };
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const supplier = String(body.supplier ?? "").trim();
  if (!supplier) return NextResponse.json({ error: "Who is the invoice from?" }, { status: 400 });

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount === 0) {
    return NextResponse.json({ error: "Enter the invoice amount." }, { status: 400 });
  }

  const invoiceDate = body.invoice_date ? new Date(String(body.invoice_date)) : new Date();
  if (Number.isNaN(invoiceDate.getTime())) {
    return NextResponse.json({ error: "That date is not valid." }, { status: 400 });
  }

  const links = await resolveLinks(access.scheme.id, body);

  const created = await prisma.strataExpense.create({
    data: {
      scheme_id: access.scheme.id,
      supplier,
      amount,
      invoice_date: invoiceDate,
      budget_item_id: links.budgetItemId,
      work_order_id: links.workOrderId,
      contractor_id: links.contractorId,
      ...expenseFields(body),
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_expense",
    entityId: String(created.id),
    action: "create",
    newValue: { scheme_id: access.scheme.id, supplier, amount },
  });

  return NextResponse.json({ ok: true, id: created.id });
}
