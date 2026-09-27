import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { paymentReference } from "@/lib/strata/jurisdictions";
import { createAuditLog } from "@/lib/audit";
import { syncQuantity } from "@/lib/strata/billing";
import { entitlementForOwner } from "@/lib/strata/entitlement";
import { lotFields } from "@/lib/strata/lots";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const lotNumber = String(body.lot_number ?? "").trim();
  if (!lotNumber) return NextResponse.json({ error: "Enter a lot number." }, { status: 400 });

  // Refuse the lot that would tip the account over, rather than accepting it and
  // then making the whole scheme read-only. Trialling and subscribed accounts are
  // unaffected — they have already paid or are entitled to exceed it.
  const entitlement = await entitlementForOwner(access.scheme.owner_user_id);
  if (entitlement.state === "locked" || (entitlement.withinFreeAllowance && entitlement.state === "free")) {
    const wouldExceed = entitlement.lots + 1 > entitlement.settings.freeLotLimit;
    if (wouldExceed) {
      return NextResponse.json(
        {
          error: `The free plan covers one scheme of up to ${entitlement.settings.freeLotLimit} lots, and this would be lot ${entitlement.lots + 1}. Subscribe on the Your plan page to add it — your existing lots keep working either way.`,
          needsSubscription: true,
        },
        { status: 402 },
      );
    }
  }

  const fields = lotFields(body);

  try {
    const lot = await prisma.strataLot.create({
      data: {
        scheme_id: access.scheme.id,
        lot_number: lotNumber,
        payment_reference: paymentReference(access.scheme.plan_number, access.scheme.id, lotNumber),
        ...fields,
        levy_basis: fields.levy_basis ?? 0,
        ownership_basis: fields.ownership_basis ?? fields.levy_basis ?? 0,
      },
    });

    await createAuditLog({
      actorId: access.userId,
      entityType: "strata_lot",
      entityId: String(lot.id),
      action: "create",
      newValue: { scheme_id: access.scheme.id, lot_number: lot.lot_number },
    });

    // A bigger roll costs more from now on; a smaller one waits for renewal.
    await syncQuantity(access.scheme.owner_user_id);

    return NextResponse.json({ ok: true, id: lot.id });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json({ error: `Lot ${lotNumber} already exists in this scheme.` }, { status: 409 });
    }
    throw err;
  }
}
