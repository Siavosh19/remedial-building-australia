import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { allocateToLot } from "@/lib/strata/bank";

type Ctx = { params: Promise<{ id: string; levyId: string }> };

/** Record money received against one levy. */
export async function POST(req: Request, ctx: Ctx) {
  const { id, levyId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const levy = await prisma.strataLevy.findFirst({
    where: { id: Number(levyId), scheme_id: access.scheme.id },
  });
  if (!levy) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  const amount = Number(body?.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    // A negative receipt read as a payment and drove the lot's debt UP. Money
    // going back out is a refund and needs its own treatment, not a minus sign.
    return NextResponse.json(
      { error: "Enter a positive amount. To reverse a receipt entered in error, delete it instead." },
      { status: 400 },
    );
  }

  const receivedOn = body?.received_on ? new Date(String(body.received_on)) : new Date();
  if (Number.isNaN(receivedOn.getTime())) {
    return NextResponse.json({ error: "That date is not valid." }, { status: 400 });
  }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (receivedOn > tomorrow) {
    return NextResponse.json({ error: "That date is in the future." }, { status: 400 });
  }

  // Settle this period first, then spill forward — so an overpayment reduces the
  // next quarter instead of sitting as a credit nobody sees. Imported receipts
  // already behaved this way; manual ones did not, and the two disagreed.
  const result = await allocateToLot({
    schemeId: access.scheme.id,
    lotId: levy.lot_id,
    amount,
    receivedOn,
    reference: String(body?.reference ?? "").trim() || null,
    note: String(body?.note ?? "").trim() || null,
    startLevyId: levy.id,
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_levy_payment",
    entityId: String(levy.id),
    action: "receipt",
    newValue: { scheme_id: access.scheme.id, levy_id: levy.id, amount, spread_over: result.payments },
  });

  return NextResponse.json({ ok: true, payments: result.payments });
}

/** Reverse a receipt entered in error. */
export async function DELETE(req: Request, ctx: Ctx) {
  const { id, levyId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const paymentId = Number(new URL(req.url).searchParams.get("payment"));
  const payment = await prisma.strataLevyPayment.findFirst({
    where: { id: paymentId, scheme_id: access.scheme.id, levy_id: Number(levyId) },
  });
  if (!payment) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await prisma.strataLevyPayment.delete({ where: { id: payment.id } });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_levy_payment",
    entityId: String(payment.id),
    action: "receipt_reversed",
    previousValue: { amount: payment.amount, received_on: payment.received_on },
  });

  return NextResponse.json({ ok: true });
}
