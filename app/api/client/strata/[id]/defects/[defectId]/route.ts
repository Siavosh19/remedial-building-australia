import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { defectFields } from "@/lib/strata/defects";
import { createAuditLog } from "@/lib/audit";

type Ctx = { params: Promise<{ id: string; defectId: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id, defectId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const defect = await prisma.strataDefect.findFirst({
    where: { id: Number(defectId), scheme_id: access.scheme.id },
  });
  if (!defect) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  let lotId: number | null | undefined;
  if (body.lot_id !== undefined) {
    const requested = Number(body.lot_id);
    if (Number.isFinite(requested) && requested > 0) {
      const lot = await prisma.strataLot.findFirst({
        where: { id: requested, scheme_id: access.scheme.id },
        select: { id: true },
      });
      lotId = lot?.id ?? null;
    } else {
      lotId = null;
    }
  }

  await prisma.strataDefect.update({
    where: { id: defect.id },
    data: {
      description:
        body.description !== undefined ? String(body.description).trim() || defect.description : undefined,
      lot_id: lotId,
      ...defectFields(body),
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_defect",
    entityId: String(defect.id),
    action: "update",
    previousValue: { status: defect.status, priority: defect.priority },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id, defectId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const defect = await prisma.strataDefect.findFirst({
    where: { id: Number(defectId), scheme_id: access.scheme.id },
  });
  if (!defect) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await prisma.strataDefect.delete({ where: { id: defect.id } });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_defect",
    entityId: String(defect.id),
    action: "delete",
    previousValue: { reference: defect.reference, description: defect.description },
  });

  return NextResponse.json({ ok: true });
}
