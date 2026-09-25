import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";

/**
 * Record an arrears step that the committee has taken — a reminder sent, a
 * notice of demand issued, a matter referred. The software keeps the history;
 * it does not send anything on the scheme's behalf.
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const lot = await prisma.strataLot.findFirst({
    where: { id: Number(body.lot_id), scheme_id: access.scheme.id },
    select: { id: true, lot_number: true },
  });
  if (!lot) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const action = String(body.action ?? "").trim();
  if (!action) return NextResponse.json({ error: "Say what was done." }, { status: 400 });

  const stage = Number(body.stage);
  const actionedOn = body.actioned_on ? new Date(String(body.actioned_on)) : new Date();
  if (Number.isNaN(actionedOn.getTime())) {
    return NextResponse.json({ error: "That date is not valid." }, { status: 400 });
  }

  const record = await prisma.strataArrearsAction.create({
    data: {
      scheme_id: access.scheme.id,
      lot_id: lot.id,
      stage: Number.isFinite(stage) ? stage : 0,
      action,
      actioned_on: actionedOn,
      note: String(body.note ?? "").trim() || null,
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_arrears_action",
    entityId: String(record.id),
    action: "record",
    newValue: { scheme_id: access.scheme.id, lot: lot.lot_number, stage: record.stage, action },
  });

  return NextResponse.json({ ok: true, id: record.id });
}
