import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSchemeAccess } from "@/lib/strata/access";
import { buildStatements } from "@/lib/strata/statements";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import StatementsView from "./StatementsView";

export const dynamic = "force-dynamic";

export default async function FinancialsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme } = access;
  const statements = await buildStatements(scheme.id);

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Financial statements</h1>
            <p className="mt-1 text-sm text-slate-500">
              Built from the levies, receipts and invoices already recorded. Nothing to keep in step by hand.
            </p>
          </div>
          <Link
            href={`/client/strata/${scheme.id}/financials/agm-pack`}
            className="rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Build the AGM pack
          </Link>
        </div>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="financials" />

      <StatementsView
        statements={statements}
        fundNames={{ fund_1: scheme.fund_1_name, fund_2: scheme.fund_2_name }}
      />
    </div>
  );
}
