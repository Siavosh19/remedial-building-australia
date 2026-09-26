import type { StrataEngagement, StrataWorkOrderStatus } from "@prisma/client";

const ENGAGEMENTS: StrataEngagement[] = ["one_off", "ongoing"];
const WO_STATUSES: StrataWorkOrderStatus[] = [
  "draft",
  "issued",
  "accepted",
  "in_progress",
  "completed",
  "cancelled",
];

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

function date(body: Record<string, unknown>, key: string) {
  const v = body[key];
  if (v === undefined) return undefined;
  if (!v) return null;
  const d = new Date(String(v));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Shared parsing for the scheme's contractor log. */
export function contractorFields(body: Record<string, unknown>) {
  return {
    contact_name: text(body, "contact_name"),
    phone: text(body, "phone"),
    email: text(body, "email"),
    abn: text(body, "abn"),
    licence_number: text(body, "licence_number"),
    insurance_expiry: date(body, "insurance_expiry"),
    engagement:
      body.engagement !== undefined && ENGAGEMENTS.includes(body.engagement as StrataEngagement)
        ? (body.engagement as StrataEngagement)
        : undefined,
    frequency: text(body, "frequency"),
    rate: num(body, "rate"),
    rate_note: text(body, "rate_note"),
    active: body.active === undefined ? undefined : Boolean(body.active),
    first_engaged: date(body, "first_engaged"),
    last_engaged: date(body, "last_engaged"),
    notes: text(body, "notes"),
  };
}

/** Shared parsing for work orders. */
export function workOrderFields(body: Record<string, unknown>) {
  return {
    scope: text(body, "scope"),
    location: text(body, "location"),
    status:
      body.status !== undefined && WO_STATUSES.includes(body.status as StrataWorkOrderStatus)
        ? (body.status as StrataWorkOrderStatus)
        : undefined,
    agreed_price: num(body, "agreed_price"),
    issued_on: date(body, "issued_on"),
    start_on: date(body, "start_on"),
    completed_on: date(body, "completed_on"),
    warranty_until: date(body, "warranty_until"),
    defects_liability_until: date(body, "defects_liability_until"),
    invoice_reference: text(body, "invoice_reference"),
    notes: text(body, "notes"),
  };
}
