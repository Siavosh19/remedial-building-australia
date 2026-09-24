import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { paymentReference } from "@/lib/strata/jurisdictions";
import { createAuditLog } from "@/lib/audit";
import { lotFields } from "@/lib/strata/lots";

type Ctx = { params: Promise<{ id: string; lotId: string }> };

/** Loads a lot only if it belongs to a scheme the caller can access. */
async function loadLot(schemeId: number, lotId: number) {
  return prisma.strataLot.findFirst({ where: { id: lotId, scheme_id: schemeId } });
}

export async function PATCH(req: Request, ctx: Ctx) {
  const { id, lotId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const lot = await loadLot(access.scheme.id, Number(lotId));
  if (!lot) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const nextNumber = body.lot_number !== undefined ? String(body.lot_number).trim() : lot.lot_number;
  if (!nextNumber) return NextResponse.json({ error: "Enter a lot number." }, { status: 400 });

  try {
    await prisma.strataLot.update({
      where: { id: lot.id },
      data: {
        ...lotFields(body),
        lot_number: nextNumber,
        // The reference follows the lot number so it stays quotable and unique.
        payment_reference:
          nextNumber === lot.lot_number && lot.payment_reference
            ? undefined
            : paymentReference(access.scheme.plan_number, access.scheme.id, nextNumber),
      },
    });

    await createAuditLog({
      actorId: access.userId,
      entityType: "strata_lot",
      entityId: String(lot.id),
      action: "update",
      previousValue: { lot_number: lot.lot_number, levy_basis: lot.levy_basis },
      newValue: { lot_number: nextNumber },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json({ error: `Lot ${nextNumber} already exists in this scheme.` }, { status: 409 });
    }
    throw err;
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id, lotId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const lot = await loadLot(access.scheme.id, Number(lotId));
  if (!lot) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await prisma.strataLot.delete({ where: { id: lot.id } });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_lot",
    entityId: String(lot.id),
    action: "delete",
    previousValue: { scheme_id: access.scheme.id, lot_number: lot.lot_number },
  });

  return NextResponse.json({ ok: true });
}
