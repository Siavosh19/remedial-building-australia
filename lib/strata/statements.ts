// ── Financial statements ─────────────────────────────────────────────────────
// Income and expenditure on an accrual basis, and a balance sheet that has to
// balance. Everything is derived from the levies, receipts and invoices already
// recorded — there is no separate set of books to keep in step.
//
// The algebra, so the check row is not a mystery:
//   cash        = opening + receipts − invoices paid
//   receivable  = raised − receipts + interest accrued
//   net assets  = cash + receivable − invoices unpaid
//               = opening + raised + interest − all invoices
//   fund balance = opening + (raised + interest − all invoices)
// The two are the same expression, so the check is always zero unless a figure
// has been recorded in a way the statements cannot see.

import { prisma } from "@/lib/prisma";
import { interestOn, round2 } from "@/lib/strata/levies";

export type FundPair = { fund1: number; fund2: number; total: number };

function pair(fund1: number, fund2: number): FundPair {
  return { fund1: round2(fund1), fund2: round2(fund2), total: round2(fund1 + fund2) };
}

export type Statements = {
  asAt: Date;
  income: { levies: FundPair; interest: FundPair; total: FundPair };
  expenditure: { lines: { label: string; amounts: FundPair }[]; total: FundPair };
  surplus: FundPair;
  balanceSheet: {
    cash: FundPair;
    receivable: FundPair;
    totalAssets: FundPair;
    creditors: FundPair;
    netAssets: FundPair;
    openingFunds: FundPair;
    closingFunds: FundPair;
    check: FundPair;
  };
};

export async function buildStatements(schemeId: number, asAt = new Date()): Promise<Statements> {
  const scheme = await prisma.strataScheme.findUnique({ where: { id: schemeId } });
  if (!scheme) throw new Error("Scheme not found");

  const [levies, expenses] = await Promise.all([
    prisma.strataLevy.findMany({
      where: { scheme_id: schemeId },
      include: { period: { select: { due_date: true } }, payments: { select: { amount: true } } },
    }),
    prisma.strataExpense.findMany({
      where: { scheme_id: schemeId },
      include: { budget_item: { select: { category: true, item: true } } },
    }),
  ]);

  let raised1 = 0;
  let raised2 = 0;
  let received1 = 0;
  let received2 = 0;
  let interest = 0;

  for (const levy of levies) {
    const due = levy.period.due_date <= asAt;
    const total = levy.fund_1_amount + levy.fund_2_amount;
    const received = levy.payments.reduce((sum, p) => sum + p.amount, 0);

    if (due) {
      raised1 += levy.fund_1_amount;
      raised2 += levy.fund_2_amount;
      interest += interestOn({
        outstanding: round2(total - received),
        dueDate: levy.period.due_date,
        graceDays: scheme.arrears_grace_days,
        annualRatePercent: scheme.arrears_interest_rate,
        asOf: asAt,
      });
    }

    // Receipts follow the levy they paid, split in the same proportion.
    if (received > 0) {
      if (total <= 0) received1 += received;
      else {
        received1 += (received * levy.fund_1_amount) / total;
        received2 += (received * levy.fund_2_amount) / total;
      }
    }
  }

  // Expenditure grouped by the budget category the invoice was coded to, so the
  // statement reads the way the budget was written.
  const grouped = new Map<string, { fund1: number; fund2: number }>();
  let paid1 = 0;
  let paid2 = 0;
  let unpaid1 = 0;
  let unpaid2 = 0;

  for (const e of expenses) {
    const label = e.budget_item?.category || e.budget_item?.item || "Other expenditure";
    const entry = grouped.get(label) ?? { fund1: 0, fund2: 0 };
    if (e.fund === "fund_2") entry.fund2 += e.amount;
    else entry.fund1 += e.amount;
    grouped.set(label, entry);

    // Anything not actually paid is a creditor, disputed invoices included.
    if (e.status === "paid") {
      if (e.fund === "fund_2") paid2 += e.amount;
      else paid1 += e.amount;
    } else if (e.fund === "fund_2") unpaid2 += e.amount;
    else unpaid1 += e.amount;
  }

  const lines = [...grouped.entries()]
    .map(([label, v]) => ({ label, amounts: pair(v.fund1, v.fund2) }))
    .sort((a, b) => b.amounts.total - a.amounts.total);

  const totalExp1 = paid1 + unpaid1;
  const totalExp2 = paid2 + unpaid2;

  const opening1 = scheme.fund_1_opening ?? 0;
  const opening2 = scheme.fund_2_opening ?? 0;

  const income = {
    levies: pair(raised1, raised2),
    interest: pair(interest, 0),
    total: pair(raised1 + interest, raised2),
  };

  const surplus = pair(raised1 + interest - totalExp1, raised2 - totalExp2);

  const cash = pair(opening1 + received1 - paid1, opening2 + received2 - paid2);
  const receivable = pair(raised1 - received1 + interest, raised2 - received2);
  const totalAssets = pair(cash.fund1 + receivable.fund1, cash.fund2 + receivable.fund2);
  const creditors = pair(unpaid1, unpaid2);
  const netAssets = pair(totalAssets.fund1 - creditors.fund1, totalAssets.fund2 - creditors.fund2);
  const openingFunds = pair(opening1, opening2);
  const closingFunds = pair(opening1 + surplus.fund1, opening2 + surplus.fund2);

  return {
    asAt,
    income,
    expenditure: { lines, total: pair(totalExp1, totalExp2) },
    surplus,
    balanceSheet: {
      cash,
      receivable,
      totalAssets,
      creditors,
      netAssets,
      openingFunds,
      closingFunds,
      check: pair(netAssets.fund1 - closingFunds.fund1, netAssets.fund2 - closingFunds.fund2),
    },
  };
}
