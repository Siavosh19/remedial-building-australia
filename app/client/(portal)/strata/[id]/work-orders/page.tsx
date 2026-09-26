import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import WorkOrdersClient, { type WorkOrderRow } from "./WorkOrdersClient";

export const dynamic = "force-dynamic";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" });

export default async function WorkOrdersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;

  const [orders, defects, contractors] = await Promise.all([
    prisma.strataWorkOrder.findMany({
      where: { scheme_id: scheme.id },
      orderBy: { id: "desc" },
      include: {
        contractor: { select: { business_name: true } },
        defect: { select: { reference: true } },
      },
    }),
    prisma.strataDefect.findMany({
      where: { scheme_id: scheme.id, status: { not: "closed" } },
      orderBy: { id: "desc" },
      select: { id: true, reference: true, description: true },
    }),
    prisma.strataContractor.findMany({
      where: { scheme_id: scheme.id, active: true },
      orderBy: { business_name: "asc" },
      select: { id: true, business_name: true, trade: true },
    }),
  ]);

  const rows: WorkOrderRow[] = orders.map((o) => ({
    id: o.id,
    reference: o.reference,
    title: o.title,
    status: o.status,
    contractorName: o.contractor?.business_name ?? null,
    defectReference: o.defect?.reference ?? null,
    agreedPrice: o.agreed_price,
    issuedOn: o.issued_on ? AU_DATE.format(o.issued_on) : null,
    completedOn: o.completed_on ? AU_DATE.format(o.completed_on) : null,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Work orders</h1>
        <p className="mt-1 text-sm text-slate-500">
          What was engaged, from whom, for how much, and when it was done.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="workOrders" />

      <WorkOrdersClient
        schemeId={scheme.id}
        canManage={canManage}
        orders={rows}
        defects={defects}
        contractors={contractors}
      />
    </div>
  );
}
