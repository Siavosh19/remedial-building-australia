import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { allocateToLot } from "@/lib/strata/bank";

type Ctx = { params: Promise<{ id: string; lineId: string }> };

/**
 * Place a statement line by hand: receipt it to a lot, settle an invoice with
 * it, or set it aside. Everything the software was not certain about ends up
 * here, and a person decides.
 */
export async function PATCH(req: Request, ctx: Ctx) {
  const { id, lineId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const line = await prisma.strataBankLine.findFirst({
    where: { id: Number(lineId), scheme_id: access.scheme.id },
  });
  if (!line) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (line.status === "matched") {
    return NextResponse.json({ error: "That line has already been placed." }, { status: 409 });
  }

  const body = await req.json().catch(() => null);
  const action = String(body?.action ?? "");

  if (action === "ignore") {
    await prisma.strataBankLine.update({
      where: { id: line.id },
      data: { status: "ignored", note: String(body?.note ?? "").trim() || "Set aside" },
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "receipt") {
    const lotId = Number(body?.lot_id ?? line.lot_id);
    const lot = await prisma.strataLot.findFirst({
      where: { id: lotId, scheme_id: access.scheme.id },
      select: { id: true, lot_number: true },
    });
    if (!lot) return NextResponse.json({ error: "Choose which lot this belongs to." }, { status: 400 });
    if (line.amount <= 0) {
      return NextResponse.json({ error: "That line is money out, not a receipt." }, { status: 400 });
    }

    const result = await allocateToLot({
      schemeId: access.scheme.id,
      lotId: lot.id,
      amount: line.amount,
      receivedOn: line.transaction_date,
      reference: line.description.slice(0, 120),
      note: "Placed by the committee from a bank import",
    });

    await prisma.strataBankLine.update({
      where: { id: line.id },
      data: {
        status: "matched",
        matched_by: "manual",
        lot_id: lot.id,
        note: `Receipted to lot ${lot.lot_number} across ${result.payments} levy row${result.payments === 1 ? "" : "s"}`,
      },
    });

    await createAuditLog({
      actorId: access.userId,
      entityType: "strata_bank_line",
      entityId: String(line.id),
      action: "receipt",
      newValue: { lot: lot.lot_number, amount: line.amount },
    });

    return NextResponse.json({ ok: true });
  }

  if (action === "settle_invoice") {
    const expenseId = Number(body?.expense_id ?? line.expense_id);
    const expense = await prisma.strataExpense.findFirst({
      where: { id: expenseId, scheme_id: access.scheme.id },
    });
    if (!expense) return NextResponse.json({ error: "Choose which invoice this paid." }, { status: 400 });

    await prisma.strataExpense.update({
      where: { id: expense.id },
      data: { status: "paid", paid_on: line.transaction_date, method: expense.method ?? "Bank" },
    });

    await prisma.strataBankLine.update({
      where: { id: line.id },
      data: {
        status: "matched",
        matched_by: "manual",
        expense_id: expense.id,
        note: `Settled the ${expense.supplier} invoice`,
      },
    });

    await createAuditLog({
      actorId: access.userId,
      entityType: "strata_bank_line",
      entityId: String(line.id),
      action: "settle_invoice",
      newValue: { supplier: expense.supplier, amount: expense.amount },
    });

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
