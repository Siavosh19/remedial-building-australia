import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { dueState } from "@/lib/strata/funds";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import ComplianceClient, { type ComplianceRow } from "./ComplianceClient";

export const dynamic = "force-dynamic";

export default async function CompliancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, labels, canManage } = access;

  const items = await prisma.strataCompliance.findMany({
    where: { scheme_id: scheme.id },
    orderBy: [{ next_due: "asc" }, { item: "asc" }],
  });

  const rows: ComplianceRow[] = items.map((i) => {
    const state = dueState(i.next_due);
    return {
      id: i.id,
      item: i.item,
      provider: i.provider,
      reference: i.reference,
      sumInsured: i.sum_insured,
      lastDone: i.last_done ? i.last_done.toISOString().slice(0, 10) : null,
      nextDue: i.next_due ? i.next_due.toISOString().slice(0, 10) : null,
      cycleMonths: i.cycle_months,
      responsible: i.responsible,
      notes: i.notes,
      state: { label: state.label, tone: state.tone, days: state.days },
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Compliance &amp; insurance</h1>
        <p className="mt-1 text-sm text-slate-500">
          What has to stay current, and when it is next due. For what your scheme is actually required to hold,
          check with {labels.authority}.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="compliance" />

      <ComplianceClient schemeId={scheme.id} rows={rows} canManage={canManage} />
    </div>
  );
}
