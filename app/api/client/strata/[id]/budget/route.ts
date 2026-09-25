import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const item = String(body.item ?? "").trim();
  const yearLabel = String(body.year_label ?? "").trim();
  if (!item) return NextResponse.json({ error: "Name the budget item." }, { status: 400 });
  if (!yearLabel) return NextResponse.json({ error: "Missing financial year." }, { status: 400 });

  const amount = Number(body.amount);
  const created = await prisma.strataBudgetItem.create({
    data: {
      scheme_id: access.scheme.id,
      year_label: yearLabel,
      item,
      category: String(body.category ?? "").trim() || null,
      fund: body.fund === "fund_2" ? "fund_2" : "fund_1",
      amount: Number.isFinite(amount) && amount >= 0 ? amount : 0,
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_budget_item",
    entityId: String(created.id),
    action: "create",
    newValue: { scheme_id: access.scheme.id, item, amount: created.amount },
  });

  return NextResponse.json({ ok: true, id: created.id });
}
