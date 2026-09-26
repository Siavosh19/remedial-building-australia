import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";

function num(value: unknown): number | null {
  if (value === "" || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * Scheme settings. Every field here is a number or a name the COMMITTEE decides
 * for their own scheme — notice days, grace days, interest, spending limit, what
 * the funds are called. The software never supplies a statutory default and
 * never validates these against any Act.
 */
export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const fy = num(body.financial_year_start_month);

  const updated = await prisma.strataScheme.update({
    where: { id: access.scheme.id },
    data: {
      name: body.name !== undefined ? String(body.name).trim() || access.scheme.name : undefined,
      plan_number: body.plan_number !== undefined ? String(body.plan_number).trim() || null : undefined,
      address: body.address !== undefined ? String(body.address).trim() || null : undefined,
      suburb: body.suburb !== undefined ? String(body.suburb).trim() || null : undefined,
      postcode: body.postcode !== undefined ? String(body.postcode).trim() || null : undefined,
      fund_1_name: body.fund_1_name !== undefined ? String(body.fund_1_name).trim() || access.scheme.fund_1_name : undefined,
      fund_2_name: body.fund_2_name !== undefined ? String(body.fund_2_name).trim() || access.scheme.fund_2_name : undefined,
      financial_year_start_month: fy && fy >= 1 && fy <= 12 ? fy : undefined,
      levy_frequency: body.levy_frequency !== undefined ? String(body.levy_frequency) : undefined,
      levy_notice_days: body.levy_notice_days !== undefined ? num(body.levy_notice_days) : undefined,
      arrears_grace_days: body.arrears_grace_days !== undefined ? num(body.arrears_grace_days) : undefined,
      arrears_interest_rate: body.arrears_interest_rate !== undefined ? num(body.arrears_interest_rate) : undefined,
      committee_spend_limit: body.committee_spend_limit !== undefined ? num(body.committee_spend_limit) : undefined,
      fund_1_opening: body.fund_1_opening !== undefined ? num(body.fund_1_opening) : undefined,
      fund_2_opening: body.fund_2_opening !== undefined ? num(body.fund_2_opening) : undefined,
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_scheme",
    entityId: String(updated.id),
    action: "update_settings",
    newValue: { name: updated.name, funds: [updated.fund_1_name, updated.fund_2_name] },
  });

  return NextResponse.json({ ok: true });
}
