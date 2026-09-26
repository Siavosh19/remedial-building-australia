import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import ContractorsClient, { type Contractor } from "./ContractorsClient";

export const dynamic = "force-dynamic";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" });

export default async function ContractorsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;
  const now = new Date();

  const rows = await prisma.strataContractor.findMany({
    where: { scheme_id: scheme.id },
    orderBy: [{ engagement: "asc" }, { business_name: "asc" }],
    include: { _count: { select: { work_orders: true } } },
  });

  // Directory slugs for the ones that came from a listing, fetched in one go.
  const companyIds = rows.map((r) => r.company_id).filter((v): v is number => v !== null);
  const companies = companyIds.length
    ? await prisma.company.findMany({
        where: { id: { in: companyIds } },
        select: { id: true, slug: true },
      })
    : [];
  const slugById = new Map(companies.map((c) => [c.id, c.slug]));

  const contractors: Contractor[] = rows.map((c) => ({
    id: c.id,
    companyId: c.company_id,
    companySlug: c.company_id ? slugById.get(c.company_id) ?? null : null,
    trade: c.trade,
    businessName: c.business_name,
    contactName: c.contact_name,
    phone: c.phone,
    email: c.email,
    abn: c.abn,
    licenceNumber: c.licence_number,
    insuranceExpiry: c.insurance_expiry ? c.insurance_expiry.toISOString().slice(0, 10) : null,
    insuranceExpired: c.insurance_expiry !== null && c.insurance_expiry < now,
    engagement: c.engagement,
    frequency: c.frequency,
    rate: c.rate,
    rateNote: c.rate_note,
    active: c.active,
    lastEngaged: c.last_engaged ? AU_DATE.format(c.last_engaged) : null,
    jobCount: c._count.work_orders,
    notes: c.notes,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Businesses</h1>
        <p className="mt-1 text-sm text-slate-500">
          Who looks after this building — the standing services, and everyone who has worked here before.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="contractors" />

      <ContractorsClient schemeId={scheme.id} contractors={contractors} canManage={canManage} />
    </div>
  );
}
