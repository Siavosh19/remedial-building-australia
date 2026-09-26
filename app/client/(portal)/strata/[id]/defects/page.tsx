import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { requireSchemeAccess } from "@/lib/strata/access";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import DefectsClient, { type Defect } from "./DefectsClient";

export const dynamic = "force-dynamic";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" });

export default async function DefectsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;
  const user = await getCurrentDirectoryUser();

  const [defects, lots, categories, links] = await Promise.all([
    prisma.strataDefect.findMany({
      where: { scheme_id: scheme.id },
      orderBy: [{ status: "asc" }, { reported_on: "desc" }],
      include: { lot: { select: { lot_number: true } }, _count: { select: { work_orders: true } } },
    }),
    prisma.strataLot.findMany({
      where: { scheme_id: scheme.id },
      orderBy: { id: "asc" },
      select: { id: true, lot_number: true },
    }),
    prisma.category.findMany({
      where: { parent_id: null, is_active: true },
      orderBy: [{ display_order: "asc" }, { name: "asc" }],
      select: { id: true, name: true },
    }),
    prisma.strataQuoteLink.findMany({
      where: { scheme_id: scheme.id, defect_id: { not: null } },
      select: { defect_id: true, quote_request_id: true },
    }),
  ]);

  const linkByDefect = new Map(links.map((l) => [l.defect_id, l.quote_request_id]));

  const rows: Defect[] = defects.map((d) => ({
    id: d.id,
    reference: d.reference,
    reportedOn: AU_DATE.format(d.reported_on),
    reportedBy: d.reported_by,
    lotId: d.lot_id,
    lotNumber: d.lot?.lot_number ?? null,
    locationType: d.location_type,
    location: d.location,
    description: d.description,
    priority: d.priority,
    status: d.status,
    quotedCost: d.quoted_cost,
    actualCost: d.actual_cost,
    notes: d.notes,
    quoteRequestId: linkByDefect.get(d.id) ?? null,
    workOrderCount: d._count.work_orders,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Defects &amp; maintenance</h1>
        <p className="mt-1 text-sm text-slate-500">
          What needs fixing, and how it gets fixed — log it, get quotes from verified trades, raise a work order.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="defects" />

      <DefectsClient
        schemeId={scheme.id}
        canManage={canManage}
        defects={rows}
        lots={lots}
        categories={categories}
        scheme={{
          address: scheme.address ?? "",
          suburb: scheme.suburb ?? "",
          postcode: scheme.postcode ?? "",
          planNumber: scheme.plan_number,
          propertyType: scheme.property_type,
        }}
        contact={{ name: user?.full_name ?? "", email: user?.email ?? "" }}
      />
    </div>
  );
}
