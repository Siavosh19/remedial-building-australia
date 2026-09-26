import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { contractorFields } from "@/lib/strata/contractors";
import { createAuditLog } from "@/lib/audit";

/**
 * Add a business to the scheme's own contractor log.
 *
 * Either typed in by hand (the cleaner who has been coming for ten years), or
 * carried across from an RBA directory listing by passing company_id — in which
 * case the licence and insurance details come from the listing, and the log
 * keeps a link back to it.
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const companyId = Number(body.company_id);
  let seed: {
    business_name: string;
    trade: string;
    phone: string | null;
    email: string | null;
    abn: string | null;
    company_id: number | null;
  } | null = null;

  if (Number.isFinite(companyId) && companyId > 0) {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        abn: true,
        main_category: { select: { name: true } },
      },
    });
    if (!company) return NextResponse.json({ error: "That business was not found." }, { status: 404 });

    // Already in this scheme's log? Reuse it rather than creating a duplicate.
    const existing = await prisma.strataContractor.findFirst({
      where: { scheme_id: access.scheme.id, company_id: company.id },
      select: { id: true },
    });
    if (existing) return NextResponse.json({ ok: true, id: existing.id, existing: true });

    seed = {
      business_name: company.name,
      trade: String(body.trade ?? "").trim() || company.main_category?.name || "General",
      phone: company.phone ?? null,
      email: company.email ?? null,
      abn: company.abn ?? null,
      company_id: company.id,
    };
  }

  const businessName = seed?.business_name ?? String(body.business_name ?? "").trim();
  const trade = seed?.trade ?? String(body.trade ?? "").trim();
  if (!businessName) return NextResponse.json({ error: "Name the business." }, { status: 400 });
  if (!trade) return NextResponse.json({ error: "What trade do they do?" }, { status: 400 });

  const fields = contractorFields(body);

  const contractor = await prisma.strataContractor.create({
    data: {
      scheme_id: access.scheme.id,
      company_id: seed?.company_id ?? null,
      business_name: businessName,
      trade,
      ...fields,
      phone: fields.phone ?? seed?.phone ?? null,
      email: fields.email ?? seed?.email ?? null,
      abn: fields.abn ?? seed?.abn ?? null,
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_contractor",
    entityId: String(contractor.id),
    action: "create",
    newValue: { scheme_id: access.scheme.id, business: businessName, from_directory: Boolean(seed) },
  });

  return NextResponse.json({ ok: true, id: contractor.id });
}
