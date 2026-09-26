// ── The registers ────────────────────────────────────────────────────────────
// Meetings, motions, correspondence, by-laws, breaches, applications, claims
// and keys are all the same shape: a scheme-scoped list of records a committee
// keeps. Rather than eight sets of routes and eight near-identical tables, each
// one is described once here — its fields, how they are parsed, and how the row
// is written — and a single pair of routes plus a single client renders it.
//
// The field list is deliberately loose where a committee's own wording matters
// more than a fixed vocabulary: the right words for a breach notice or an
// approval differ by state, and the software must not impose one.

import { prisma } from "@/lib/prisma";

export type FieldType = "text" | "textarea" | "date" | "number" | "money" | "boolean" | "select" | "ref";

export type FieldSpec = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  /** For "ref": which list of options the page supplies (lots, meetings, bylaws). */
  refSource?: "lots" | "meetings" | "bylaws";
  required?: boolean;
  span?: 1 | 2;
  /** Show this column in the table. */
  table?: boolean;
  hint?: string;
};

export type RegisterKind =
  | "meetings"
  | "motions"
  | "correspondence"
  | "bylaws"
  | "breaches"
  | "applications"
  | "claims"
  | "keys";

export type RegisterDef = {
  kind: RegisterKind;
  singular: string;
  plural: string;
  blurb: string;
  fields: FieldSpec[];
  /** Newest-first unless a register reads better in another order. */
  orderBy: Record<string, "asc" | "desc">[];
};

const DIRECTIONS = ["out", "in"];

export const REGISTERS: Record<RegisterKind, RegisterDef> = {
  meetings: {
    kind: "meetings",
    singular: "meeting",
    plural: "Meetings",
    blurb: "When the scheme met, who was there, and what was recorded.",
    orderBy: [{ held_on: "desc" }],
    fields: [
      { name: "meeting_type", label: "Type", type: "select", options: ["AGM", "EGM", "Committee meeting"], table: true },
      { name: "held_on", label: "Held on", type: "date", required: true, table: true },
      { name: "location", label: "Location", type: "text" },
      { name: "notice_issued_on", label: "Notice issued", type: "date" },
      { name: "quorum_met", label: "Quorum met", type: "boolean", table: true },
      { name: "attendance", label: "Attendance", type: "text", span: 2, table: true },
      { name: "minutes", label: "Minutes", type: "textarea", span: 2 },
    ],
  },

  motions: {
    kind: "motions",
    singular: "motion",
    plural: "Motions & actions",
    blurb: "What was put, what was carried, and who is doing something about it.",
    orderBy: [{ done: "asc" }, { due_on: "asc" }, { id: "desc" }],
    fields: [
      { name: "meeting_id", label: "Meeting", type: "ref", refSource: "meetings" },
      { name: "motion", label: "Motion", type: "textarea", required: true, span: 2, table: true },
      { name: "outcome", label: "Outcome", type: "select", options: ["Carried", "Defeated", "Deferred", "Withdrawn"], table: true },
      { name: "votes_for", label: "For", type: "number" },
      { name: "votes_against", label: "Against", type: "number" },
      { name: "action", label: "Action arising", type: "text", span: 2, table: true },
      { name: "responsible", label: "Responsible", type: "text", table: true },
      { name: "due_on", label: "Due", type: "date", table: true },
      { name: "done", label: "Done", type: "boolean", table: true },
    ],
  },

  correspondence: {
    kind: "correspondence",
    singular: "entry",
    plural: "Correspondence",
    blurb: "Everything sent and received. Self-managed schemes lose disputes on this.",
    orderBy: [{ occurred_on: "desc" }, { id: "desc" }],
    fields: [
      { name: "occurred_on", label: "Date", type: "date", required: true, table: true },
      { name: "direction", label: "In / out", type: "select", options: DIRECTIONS, table: true },
      { name: "party", label: "Party", type: "text", required: true, table: true },
      { name: "channel", label: "Channel", type: "select", options: ["Email", "Letter", "Portal", "Phone", "In person"] },
      { name: "subject", label: "Subject", type: "text", required: true, span: 2, table: true },
      { name: "summary", label: "Summary", type: "textarea", span: 2 },
      { name: "relates_to", label: "Relates to", type: "text" },
      { name: "reference", label: "Reference", type: "text" },
      { name: "action_required", label: "Action required", type: "boolean" },
      { name: "due_on", label: "Action due", type: "date", table: true },
      { name: "closed", label: "Closed", type: "boolean", table: true },
    ],
  },

  bylaws: {
    kind: "bylaws",
    singular: "by-law",
    plural: "By-laws",
    blurb: "The rules of the scheme, as registered or adopted.",
    orderBy: [{ number: "asc" }, { id: "asc" }],
    fields: [
      { name: "number", label: "No.", type: "text", table: true },
      { name: "title", label: "By-law", type: "text", required: true, table: true },
      { name: "summary", label: "What it says", type: "textarea", span: 2, table: true },
      { name: "adopted_at", label: "Adopted at", type: "text", hint: "AGM 2023, registered by-laws…" },
      { name: "adopted_on", label: "Adopted on", type: "date" },
      { name: "registered_dealing", label: "Registered dealing", type: "text" },
      { name: "status", label: "Status", type: "select", options: ["Current", "Draft", "Repealed"], table: true },
    ],
  },

  breaches: {
    kind: "breaches",
    singular: "breach",
    plural: "Breach notices",
    blurb: "Reported breaches and what was done about them.",
    orderBy: [{ reported_on: "desc" }],
    fields: [
      { name: "reported_on", label: "Reported", type: "date", required: true, table: true },
      { name: "lot_id", label: "Lot", type: "ref", refSource: "lots", table: true },
      { name: "by_law_id", label: "By-law", type: "ref", refSource: "bylaws", table: true },
      { name: "description", label: "What happened", type: "textarea", required: true, span: 2, table: true },
      { name: "notice_type", label: "Notice type", type: "text", hint: "Warning letter, notice to comply…" },
      { name: "notice_issued_on", label: "Notice issued", type: "date" },
      { name: "response_due", label: "Response due", type: "date", table: true },
      { name: "resolved_on", label: "Resolved", type: "date", table: true },
      { name: "outcome", label: "Outcome", type: "text", span: 2 },
    ],
  },

  applications: {
    kind: "applications",
    singular: "application",
    plural: "Owner applications",
    blurb: "Renovations, pets, EV chargers, air conditioning — what was asked and what was decided.",
    orderBy: [{ received_on: "desc" }],
    fields: [
      { name: "received_on", label: "Received", type: "date", required: true, table: true },
      { name: "lot_id", label: "Lot", type: "ref", refSource: "lots", table: true },
      { name: "applicant", label: "Applicant", type: "text", table: true },
      { name: "application_type", label: "Type", type: "text", required: true, table: true, hint: "Renovation, pet, EV charger…" },
      { name: "description", label: "What is being asked", type: "textarea", required: true, span: 2, table: true },
      { name: "documents", label: "Documents received", type: "text", span: 2 },
      { name: "approval_required", label: "Approval required", type: "text", hint: "Committee, general meeting, by-law…" },
      { name: "decision", label: "Decision", type: "select", options: ["Pending", "More information requested", "Approved", "Refused", "Withdrawn"], table: true },
      { name: "decision_on", label: "Decided", type: "date" },
      { name: "conditions", label: "Conditions", type: "textarea", span: 2 },
      { name: "checks_done", label: "Licence & insurance checked", type: "boolean" },
      { name: "completed_on", label: "Works completed", type: "date" },
    ],
  },

  claims: {
    kind: "claims",
    singular: "claim",
    plural: "Insurance claims",
    blurb: "What was claimed, where it got to, and what came back.",
    orderBy: [{ incident_on: "desc" }, { id: "desc" }],
    fields: [
      { name: "claim_number", label: "Claim no.", type: "text", table: true },
      { name: "insurer", label: "Insurer", type: "text", table: true },
      { name: "policy_reference", label: "Policy", type: "text" },
      { name: "incident_on", label: "Incident", type: "date", table: true },
      { name: "lodged_on", label: "Lodged", type: "date" },
      { name: "description", label: "What happened", type: "textarea", required: true, span: 2, table: true },
      { name: "location", label: "Location", type: "text" },
      { name: "estimated_damage", label: "Estimated damage ($)", type: "money" },
      { name: "excess", label: "Excess ($)", type: "money" },
      { name: "assessor", label: "Assessor", type: "text" },
      { name: "status", label: "Status", type: "select", options: ["Lodged", "Assessor appointed", "Approved", "Settled", "Declined", "Withdrawn"], table: true },
      { name: "amount_paid", label: "Amount paid ($)", type: "money", table: true },
      { name: "settled_on", label: "Settled", type: "date" },
      { name: "notes", label: "Notes", type: "text", span: 2 },
    ],
  },

  keys: {
    kind: "keys",
    singular: "device",
    plural: "Keys & access",
    blurb: "Who holds a fob, a remote or a key — and what deposit is against it.",
    orderBy: [{ device_type: "asc" }, { device_id: "asc" }],
    fields: [
      { name: "device_id", label: "Device ID", type: "text", required: true, table: true },
      { name: "device_type", label: "Type", type: "text", required: true, table: true, hint: "Security fob, garage remote, key…" },
      { name: "lot_id", label: "Lot", type: "ref", refSource: "lots", table: true },
      { name: "holder", label: "Held by", type: "text", table: true },
      { name: "issued_on", label: "Issued", type: "date", table: true },
      { name: "deposit", label: "Deposit ($)", type: "money" },
      { name: "returned_on", label: "Returned", type: "date" },
      { name: "status", label: "Status", type: "select", options: ["Issued", "Returned", "Held in reserve", "Lost"], table: true },
      { name: "notes", label: "Notes", type: "text", span: 2 },
    ],
  },
};

export function isRegisterKind(value: string): value is RegisterKind {
  return Object.prototype.hasOwnProperty.call(REGISTERS, value);
}

/** Turn a submitted form into a data object, driven by the register's own spec. */
export function parseRegisterBody(kind: RegisterKind, body: Record<string, unknown>, partial: boolean) {
  const data: Record<string, unknown> = {};

  for (const field of REGISTERS[kind].fields) {
    // Reference fields are resolved separately — they must be checked against
    // the scheme before they can be trusted.
    if (field.type === "ref") continue;

    const raw = body[field.name];
    if (raw === undefined) {
      if (partial) continue;
      // A checkbox that was not ticked is simply absent from the form.
      if (field.type === "boolean") data[field.name] = false;
      continue;
    }

    switch (field.type) {
      case "boolean":
        data[field.name] = raw === true || raw === "true" || raw === "on";
        break;
      case "number":
      case "money": {
        if (raw === "" || raw === null) {
          data[field.name] = null;
          break;
        }
        const n = Number(raw);
        data[field.name] = Number.isFinite(n) ? n : null;
        break;
      }
      case "date": {
        if (!raw) {
          data[field.name] = null;
          break;
        }
        const d = new Date(String(raw));
        data[field.name] = Number.isNaN(d.getTime()) ? null : d;
        break;
      }
      default: {
        const text = String(raw).trim();
        data[field.name] = text || (field.required ? undefined : null);
      }
    }
  }

  return data;
}

/** Reference fields, checked to belong to this scheme before use. */
export async function resolveRefs(schemeId: number, kind: RegisterKind, body: Record<string, unknown>, partial: boolean) {
  const refs: Record<string, number | null> = {};

  for (const field of REGISTERS[kind].fields) {
    if (field.type !== "ref") continue;
    const raw = body[field.name];
    if (raw === undefined && partial) continue;

    const n = Number(raw);
    if (!Number.isFinite(n) || n <= 0) {
      refs[field.name] = null;
      continue;
    }

    let found: { id: number } | null = null;
    if (field.refSource === "lots") {
      found = await prisma.strataLot.findFirst({ where: { id: n, scheme_id: schemeId }, select: { id: true } });
    } else if (field.refSource === "meetings") {
      found = await prisma.strataMeeting.findFirst({ where: { id: n, scheme_id: schemeId }, select: { id: true } });
    } else if (field.refSource === "bylaws") {
      found = await prisma.strataByLaw.findFirst({ where: { id: n, scheme_id: schemeId }, select: { id: true } });
    }
    refs[field.name] = found?.id ?? null;
  }

  return refs;
}

type Data = Record<string, unknown>;

/**
 * The one place a register kind meets its Prisma model. Explicit rather than
 * indexed by string, so the compiler still checks every call.
 */
export const REGISTER_DB = {
  meetings: {
    list: (schemeId: number, orderBy: Data[]) =>
      prisma.strataMeeting.findMany({ where: { scheme_id: schemeId }, orderBy: orderBy as never }),
    find: (schemeId: number, id: number) => prisma.strataMeeting.findFirst({ where: { id, scheme_id: schemeId } }),
    create: (schemeId: number, data: Data) =>
      prisma.strataMeeting.create({ data: ({ ...data, scheme_id: schemeId } as never) }),
    update: (id: number, data: Data) => prisma.strataMeeting.update({ where: { id }, data: data as never }),
    remove: (id: number) => prisma.strataMeeting.delete({ where: { id } }),
  },
  motions: {
    list: (schemeId: number, orderBy: Data[]) =>
      prisma.strataMotion.findMany({ where: { scheme_id: schemeId }, orderBy: orderBy as never }),
    find: (schemeId: number, id: number) => prisma.strataMotion.findFirst({ where: { id, scheme_id: schemeId } }),
    create: (schemeId: number, data: Data) =>
      prisma.strataMotion.create({ data: ({ ...data, scheme_id: schemeId } as never) }),
    update: (id: number, data: Data) => prisma.strataMotion.update({ where: { id }, data: data as never }),
    remove: (id: number) => prisma.strataMotion.delete({ where: { id } }),
  },
  correspondence: {
    list: (schemeId: number, orderBy: Data[]) =>
      prisma.strataCorrespondence.findMany({ where: { scheme_id: schemeId }, orderBy: orderBy as never }),
    find: (schemeId: number, id: number) =>
      prisma.strataCorrespondence.findFirst({ where: { id, scheme_id: schemeId } }),
    create: (schemeId: number, data: Data) =>
      prisma.strataCorrespondence.create({ data: ({ ...data, scheme_id: schemeId } as never) }),
    update: (id: number, data: Data) => prisma.strataCorrespondence.update({ where: { id }, data: data as never }),
    remove: (id: number) => prisma.strataCorrespondence.delete({ where: { id } }),
  },
  bylaws: {
    list: (schemeId: number, orderBy: Data[]) =>
      prisma.strataByLaw.findMany({ where: { scheme_id: schemeId }, orderBy: orderBy as never }),
    find: (schemeId: number, id: number) => prisma.strataByLaw.findFirst({ where: { id, scheme_id: schemeId } }),
    create: (schemeId: number, data: Data) =>
      prisma.strataByLaw.create({ data: ({ ...data, scheme_id: schemeId } as never) }),
    update: (id: number, data: Data) => prisma.strataByLaw.update({ where: { id }, data: data as never }),
    remove: (id: number) => prisma.strataByLaw.delete({ where: { id } }),
  },
  breaches: {
    list: (schemeId: number, orderBy: Data[]) =>
      prisma.strataBreach.findMany({ where: { scheme_id: schemeId }, orderBy: orderBy as never }),
    find: (schemeId: number, id: number) => prisma.strataBreach.findFirst({ where: { id, scheme_id: schemeId } }),
    create: (schemeId: number, data: Data) =>
      prisma.strataBreach.create({ data: ({ ...data, scheme_id: schemeId } as never) }),
    update: (id: number, data: Data) => prisma.strataBreach.update({ where: { id }, data: data as never }),
    remove: (id: number) => prisma.strataBreach.delete({ where: { id } }),
  },
  applications: {
    list: (schemeId: number, orderBy: Data[]) =>
      prisma.strataApplication.findMany({ where: { scheme_id: schemeId }, orderBy: orderBy as never }),
    find: (schemeId: number, id: number) => prisma.strataApplication.findFirst({ where: { id, scheme_id: schemeId } }),
    create: (schemeId: number, data: Data) =>
      prisma.strataApplication.create({ data: ({ ...data, scheme_id: schemeId } as never) }),
    update: (id: number, data: Data) => prisma.strataApplication.update({ where: { id }, data: data as never }),
    remove: (id: number) => prisma.strataApplication.delete({ where: { id } }),
  },
  claims: {
    list: (schemeId: number, orderBy: Data[]) =>
      prisma.strataInsuranceClaim.findMany({ where: { scheme_id: schemeId }, orderBy: orderBy as never }),
    find: (schemeId: number, id: number) =>
      prisma.strataInsuranceClaim.findFirst({ where: { id, scheme_id: schemeId } }),
    create: (schemeId: number, data: Data) =>
      prisma.strataInsuranceClaim.create({ data: ({ ...data, scheme_id: schemeId } as never) }),
    update: (id: number, data: Data) => prisma.strataInsuranceClaim.update({ where: { id }, data: data as never }),
    remove: (id: number) => prisma.strataInsuranceClaim.delete({ where: { id } }),
  },
  keys: {
    list: (schemeId: number, orderBy: Data[]) =>
      prisma.strataKey.findMany({ where: { scheme_id: schemeId }, orderBy: orderBy as never }),
    find: (schemeId: number, id: number) => prisma.strataKey.findFirst({ where: { id, scheme_id: schemeId } }),
    create: (schemeId: number, data: Data) =>
      prisma.strataKey.create({ data: ({ ...data, scheme_id: schemeId } as never) }),
    update: (id: number, data: Data) => prisma.strataKey.update({ where: { id }, data: data as never }),
    remove: (id: number) => prisma.strataKey.delete({ where: { id } }),
  },
} as const;

/** Log something the software did, so the correspondence record is complete. */
export async function logCorrespondence(opts: {
  schemeId: number;
  party: string;
  subject: string;
  summary?: string;
  relatesTo?: string;
  reference?: string;
  direction?: "in" | "out";
  channel?: string;
}) {
  try {
    await prisma.strataCorrespondence.create({
      data: {
        scheme_id: opts.schemeId,
        party: opts.party,
        subject: opts.subject,
        summary: opts.summary ?? null,
        relates_to: opts.relatesTo ?? null,
        reference: opts.reference ?? null,
        direction: opts.direction ?? "out",
        channel: opts.channel ?? null,
        source: "system",
      },
    });
  } catch (err) {
    // The log is a record, not a gate — never fail the action it describes.
    console.error("[strata] could not log correspondence:", err);
  }
}
