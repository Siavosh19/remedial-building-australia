import type { StrataExpenseStatus, StrataFund } from "@prisma/client";

const EXPENSE_STATUSES: StrataExpenseStatus[] = ["unpaid", "paid", "disputed"];

function text(body: Record<string, unknown>, key: string) {
  const v = body[key];
  if (v === undefined) return undefined;
  return String(v).trim() || null;
}

function num(body: Record<string, unknown>, key: string) {
  const v = body[key];
  if (v === undefined) return undefined;
  if (v === "" || v === null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function int(body: Record<string, unknown>, key: string) {
  const v = num(body, key);
  return v === undefined || v === null ? v : Math.round(v);
}

function date(body: Record<string, unknown>, key: string) {
  const v = body[key];
  if (v === undefined) return undefined;
  if (!v) return null;
  const d = new Date(String(v));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function complianceFields(body: Record<string, unknown>) {
  return {
    provider: text(body, "provider"),
    reference: text(body, "reference"),
    sum_insured: num(body, "sum_insured"),
    last_done: date(body, "last_done"),
    next_due: date(body, "next_due"),
    cycle_months: int(body, "cycle_months"),
    responsible: text(body, "responsible"),
    notes: text(body, "notes"),
  };
}

export function capitalWorksFields(body: Record<string, unknown>) {
  return {
    last_done_year: int(body, "last_done_year"),
    cycle_years: int(body, "cycle_years"),
    next_due_year: int(body, "next_due_year"),
    estimated_cost: num(body, "estimated_cost") ?? undefined,
    notes: text(body, "notes"),
  };
}

export function expenseFields(body: Record<string, unknown>) {
  const status =
    body.status !== undefined && EXPENSE_STATUSES.includes(body.status as StrataExpenseStatus)
      ? (body.status as StrataExpenseStatus)
      : undefined;

  return {
    invoice_number: text(body, "invoice_number"),
    fund: body.fund !== undefined ? ((body.fund === "fund_2" ? "fund_2" : "fund_1") as StrataFund) : undefined,
    gst: num(body, "gst"),
    status,
    due_on: date(body, "due_on"),
    // Marking an invoice paid without saying when stamps today, so a paid
    // invoice always carries a date for the cash position to use.
    paid_on: status === "paid" ? date(body, "paid_on") ?? new Date() : date(body, "paid_on"),
    method: text(body, "method"),
    notes: text(body, "notes"),
  };
}

/**
 * Roll a compliance item forward. Marking something done sets the next due
 * date from the cycle the committee entered — no cycle, no assumption.
 */
export function nextDueFrom(lastDone: Date, cycleMonths: number | null) {
  if (!cycleMonths || cycleMonths <= 0) return null;
  const next = new Date(lastDone);
  next.setUTCMonth(next.getUTCMonth() + cycleMonths);
  return next;
}
