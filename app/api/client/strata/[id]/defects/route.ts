import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { nextReference } from "@/lib/strata/references";
import { createAuditLog } from "@/lib/audit";
import { defectFields } from "@/lib/strata/defects";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const description = String(body.description ?? "").trim();
  if (!description) return NextResponse.json({ error: "Describe the problem." }, { status: 400 });

  // A lot can only be attached if it belongs to this scheme.
  let lotId: number | null = null;
  const requestedLot = Number(body.lot_id);
  if (Number.isFinite(requestedLot) && requestedLot > 0) {
    const lot = await prisma.strataLot.findFirst({
      where: { id: requestedLot, scheme_id: access.scheme.id },
      select: { id: true },
    });
    lotId = lot?.id ?? null;
  }

  const defect = await prisma.strataDefect.create({
    data: {
      scheme_id: access.scheme.id,
      reference: await nextReference(access.scheme.id, "defect"),
      description,
      lot_id: lotId,
      ...defectFields(body),
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_defect",
    entityId: String(defect.id),
    action: "create",
    newValue: { scheme_id: access.scheme.id, reference: defect.reference },
  });

  return NextResponse.json({ ok: true, id: defect.id, reference: defect.reference });
}
