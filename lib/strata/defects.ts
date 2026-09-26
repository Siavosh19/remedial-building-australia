import type { StrataDefectPriority, StrataDefectStatus } from "@prisma/client";

const PRIORITIES: StrataDefectPriority[] = ["urgent", "high", "medium", "low"];
const STATUSES: StrataDefectStatus[] = ["open", "awaiting_quote", "scheduled", "in_progress", "closed"];

/**
 * Shared parsing for defect fields. Lives here rather than in the route module
 * because Next.js only allows HTTP handlers to be exported from a route file.
 */
export function defectFields(body: Record<string, unknown>) {
  const text = (key: string) => {
    const v = body[key];
    if (v === undefined) return undefined;
    return String(v).trim() || null;
  };
  const num = (key: string) => {
    const v = body[key];
    if (v === undefined) return undefined;
    if (v === "" || v === null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  const date = (key: string) => {
    const v = body[key];
    if (v === undefined) return undefined;
    if (!v) return null;
    const d = new Date(String(v));
    return Number.isNaN(d.getTime()) ? null : d;
  };

  return {
    reported_by: text("reported_by"),
    location_type: text("location_type"),
    location: text("location"),
    priority: body.priority !== undefined && PRIORITIES.includes(body.priority as StrataDefectPriority)
      ? (body.priority as StrataDefectPriority)
      : undefined,
    status: body.status !== undefined && STATUSES.includes(body.status as StrataDefectStatus)
      ? (body.status as StrataDefectStatus)
      : undefined,
    quoted_cost: num("quoted_cost"),
    actual_cost: num("actual_cost"),
    resolved_on: date("resolved_on"),
    notes: text("notes"),
  };
}
