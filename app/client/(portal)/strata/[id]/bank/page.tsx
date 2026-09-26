import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import BankClient, { type BankLine, type ImportSummary } from "./BankClient";

export const dynamic = "force-dynamic";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" });

export default async function BankPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;

  const [imports, lines, lots, unpaid] = await Promise.all([
    prisma.strataBankImport.findMany({
      where: { scheme_id: scheme.id },
      orderBy: { id: "desc" },
      take: 10,
    }),
    // Only the most recent import's lines, plus anything still unplaced from
    // earlier ones — an old statement should not clutter the page forever.
    prisma.strataBankLine.findMany({
      where: { scheme_id: scheme.id },
      orderBy: [{ status: "asc" }, { transaction_date: "desc" }],
      take: 200,
    }),
    prisma.strataLot.findMany({
      where: { scheme_id: scheme.id },
      orderBy: { id: "asc" },
      select: { id: true, lot_number: true, owner_name: true },
    }),
    prisma.strataExpense.findMany({
      where: { scheme_id: scheme.id, status: { not: "paid" } },
      orderBy: { invoice_date: "desc" },
      select: { id: true, supplier: true, amount: true },
    }),
  ]);

  const rows: BankLine[] = lines.map((l) => ({
    id: l.id,
    date: AU_DATE.format(l.transaction_date),
    description: l.description,
    amount: l.amount,
    status: l.status,
    matchedBy: l.matched_by,
    lotId: l.lot_id,
    expenseId: l.expense_id,
    suggestion: l.suggestion,
    note: l.note,
  }));

  const summaries: ImportSummary[] = imports.map((i) => ({
    id: i.id,
    filename: i.filename,
    when: AU_DATE.format(i.created_at),
    rows: i.row_count,
    auto: i.auto_count,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Bank</h1>
        <p className="mt-1 text-sm text-slate-500">
          Import the scheme&apos;s statement and let the payment references do the receipting.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="bank" />

      <BankClient
        schemeId={scheme.id}
        canManage={canManage}
        imports={summaries}
        lines={rows}
        lots={lots}
        unpaidInvoices={unpaid}
      />
    </div>
  );
}
