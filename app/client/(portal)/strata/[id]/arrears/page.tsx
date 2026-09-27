import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { byLotNumber, schemeArrears } from "@/lib/strata/arrears";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import ArrearsClient, { type ArrearsRow } from "./ArrearsClient";

export const dynamic = "force-dynamic";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" });

export default async function ArrearsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;

  // One shared figure — the levies card, this tab and the assistant all read it.
  const [summary, actions] = await Promise.all([
    schemeArrears(scheme.id),
    prisma.strataArrearsAction.findMany({
      where: { scheme_id: scheme.id },
      orderBy: { actioned_on: "desc" },
    }),
  ]);

  const rows: ArrearsRow[] = summary.lots
    .slice()
    .sort((a, b) => b.netOwing - a.netOwing || byLotNumber(a, b))
    .map((lot) => {
      // A lot that has agreed a plan is being managed, not escalated.
      const planned = actions.some((a) => a.lot_id === lot.lotId && a.action === "Payment plan agreed");
      const stage = planned && lot.netOwing > 0.005
        ? { stage: 1, label: "Payment plan", nextAction: "Monitor the agreed plan", needsCommittee: false }
        : { ...lot.stage };

      return {
        lotId: lot.lotId,
        lotNumber: lot.lotNumber,
        ownerName: lot.ownerName,
        outstanding: lot.netOwing,
        grossArrears: lot.grossArrears,
        credit: lot.credit,
        interest: lot.interest,
        oldestDue: lot.oldestDue ? AU_DATE.format(lot.oldestDue) : null,
        daysOverdue: lot.daysOverdue,
        stage: stage.stage,
        stageLabel: stage.label,
        nextAction: stage.nextAction,
        needsCommittee: stage.needsCommittee,
        history: actions
          .filter((a) => a.lot_id === lot.lotId)
          .map((a) => ({
            id: a.id,
            stage: a.stage,
            action: a.action,
            on: AU_DATE.format(a.actioned_on),
            note: a.note,
          })),
      };
    });

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Arrears</h1>
        <p className="mt-1 text-sm text-slate-500">
          What is owed across every period that has fallen due, and what has been done about it.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="arrears" />

      <ArrearsClient
        schemeId={scheme.id}
        rows={rows}
        canManage={canManage}
        totals={{
          gross: summary.grossArrears,
          credits: summary.credits,
          net: summary.netArrears,
          interest: summary.interest,
          lotsInArrears: summary.lotsInArrears,
        }}
      />
    </div>
  );
}
