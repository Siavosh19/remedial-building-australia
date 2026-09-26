import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { currentYearStart, round2, yearLabel as buildYearLabel } from "@/lib/strata/levies";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import ExpensesClient, { type BudgetLine, type ExpenseRow } from "./ExpensesClient";

export const dynamic = "force-dynamic";

function iso(value: Date | null) {
  return value ? value.toISOString().slice(0, 10) : null;
}

export default async function ExpensesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;
  const now = new Date();
  const year = buildYearLabel(scheme.financial_year_start_month, currentYearStart(scheme.financial_year_start_month));

  const [expenses, budget, workOrders, contractors] = await Promise.all([
    prisma.strataExpense.findMany({
      where: { scheme_id: scheme.id },
      orderBy: [{ invoice_date: "desc" }, { id: "desc" }],
      include: { budget_item: { select: { item: true } } },
    }),
    prisma.strataBudgetItem.findMany({
      where: { scheme_id: scheme.id, year_label: year },
      orderBy: [{ fund: "asc" }, { id: "asc" }],
    }),
    prisma.strataWorkOrder.findMany({
      where: { scheme_id: scheme.id },
      orderBy: { id: "desc" },
      select: { id: true, reference: true, title: true },
    }),
    prisma.strataContractor.findMany({
      where: { scheme_id: scheme.id },
      orderBy: { business_name: "asc" },
      select: { id: true, business_name: true },
    }),
  ]);

  const rows: ExpenseRow[] = expenses.map((e) => ({
    id: e.id,
    invoiceDate: iso(e.invoice_date) ?? "",
    invoiceNumber: e.invoice_number,
    supplier: e.supplier,
    budgetItemId: e.budget_item_id,
    budgetItemName: e.budget_item?.item ?? null,
    fund: e.fund,
    amount: e.amount,
    gst: e.gst,
    status: e.status,
    dueOn: iso(e.due_on),
    paidOn: iso(e.paid_on),
    method: e.method,
    workOrderId: e.work_order_id,
    contractorId: e.contractor_id,
    notes: e.notes,
    overdue: e.status === "unpaid" && e.due_on !== null && e.due_on < now,
  }));

  // Spend per budget line, so budget-vs-actual needs no matching by name.
  const spentByLine = new Map<number, number>();
  for (const e of expenses) {
    if (e.budget_item_id === null) continue;
    spentByLine.set(e.budget_item_id, round2((spentByLine.get(e.budget_item_id) ?? 0) + e.amount));
  }

  const budgetLines: BudgetLine[] = budget.map((b) => ({
    id: b.id,
    item: b.item,
    fund: b.fund,
    budget: b.amount,
    actual: spentByLine.get(b.id) ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Expenses</h1>
        <p className="mt-1 text-sm text-slate-500">
          Invoices in, what they were for, and how the year is tracking against the budget.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="expenses" />

      <ExpensesClient
        schemeId={scheme.id}
        canManage={canManage}
        rows={rows}
        budgetLines={budgetLines}
        workOrders={workOrders}
        contractors={contractors}
        fundNames={{ fund_1: scheme.fund_1_name, fund_2: scheme.fund_2_name }}
      />
    </div>
  );
}
