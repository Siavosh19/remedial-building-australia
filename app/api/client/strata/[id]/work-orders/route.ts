import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { workOrderFields } from "@/lib/strata/contractors";
import { nextReference } from "@/lib/strata/references";
import { createAuditLog } from "@/lib/audit";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const title = String(body.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Give the work order a title." }, { status: 400 });

  // A defect or contractor may only be attached if it belongs to this scheme.
  let defectId: number | null = null;
  const requestedDefect = Number(body.defect_id);
  if (Number.isFinite(requestedDefect) && requestedDefect > 0) {
    const defect = await prisma.strataDefect.findFirst({
      where: { id: requestedDefect, scheme_id: access.scheme.id },
      select: { id: true },
    });
    defectId = defect?.id ?? null;
  }

  let contractorId: number | null = null;
  const requestedContractor = Number(body.contractor_id);
  if (Number.isFinite(requestedContractor) && requestedContractor > 0) {
    const contractor = await prisma.strataContractor.findFirst({
      where: { id: requestedContractor, scheme_id: access.scheme.id },
      select: { id: true },
    });
    contractorId = contractor?.id ?? null;
  }

  const order = await prisma.strataWorkOrder.create({
    data: {
      scheme_id: access.scheme.id,
      reference: await nextReference(access.scheme.id, "work_order"),
      title,
      defect_id: defectId,
      contractor_id: contractorId,
      ...workOrderFields(body),
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_work_order",
    entityId: String(order.id),
    action: "create",
    newValue: { scheme_id: access.scheme.id, reference: order.reference, title },
  });

  return NextResponse.json({ ok: true, id: order.id, reference: order.reference });
}
