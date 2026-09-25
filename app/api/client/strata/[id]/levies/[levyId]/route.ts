import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";

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
  if (!Number.isFinite(amount) || amount === 0) {
    return NextResponse.json({ error: "Enter the amount received." }, { status: 400 });
  }

  const receivedOn = body?.received_on ? new Date(String(body.received_on)) : new Date();
  if (Number.isNaN(receivedOn.getTime())) {
    return NextResponse.json({ error: "That date is not valid." }, { status: 400 });
  }

  const payment = await prisma.strataLevyPayment.create({
    data: {
      scheme_id: access.scheme.id,
      levy_id: levy.id,
      amount,
      received_on: receivedOn,
      method: String(body?.method ?? "").trim() || null,
      reference: String(body?.reference ?? "").trim() || null,
      note: String(body?.note ?? "").trim() || null,
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_levy_payment",
    entityId: String(payment.id),
    action: "receipt",
    newValue: { scheme_id: access.scheme.id, levy_id: levy.id, amount },
  });

  return NextResponse.json({ ok: true, id: payment.id });
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
