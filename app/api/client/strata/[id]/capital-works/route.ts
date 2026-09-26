import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { capitalWorksFields } from "@/lib/strata/records";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const item = String(body.item ?? "").trim();
  if (!item) return NextResponse.json({ error: "Name the item." }, { status: 400 });

  const fields = capitalWorksFields(body);
  const created = await prisma.strataCapitalWorksItem.create({
    data: { scheme_id: access.scheme.id, item, ...fields, estimated_cost: fields.estimated_cost ?? 0 },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_capital_works",
    entityId: String(created.id),
    action: "create",
    newValue: { scheme_id: access.scheme.id, item },
  });

  return NextResponse.json({ ok: true, id: created.id });
}
