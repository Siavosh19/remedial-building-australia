import { REQUEST_STATUS_LABELS, RESPONSE_STATUS_LABELS } from "@/lib/quote-options";

const REQUEST_COLORS: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600",
  submitted: "bg-sky-100 text-sky-800",
  sent_to_businesses: "bg-blue-100 text-blue-800",
  responses_received: "bg-emerald-100 text-emerald-800",
  closed: "bg-slate-200 text-slate-500",
};

const RESPONSE_COLORS: Record<string, string> = {
  pending: "bg-slate-100 text-slate-600",
  interested: "bg-sky-100 text-sky-800",
  contacted: "bg-sky-100 text-sky-800",
  quoted: "bg-indigo-100 text-indigo-800",
  won: "bg-emerald-100 text-emerald-800",
  not_proceeded: "bg-slate-200 text-slate-600",
  declined: "bg-rose-100 text-rose-700",
  not_suitable: "bg-amber-100 text-amber-800",
};

export function RequestStatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${REQUEST_COLORS[status] ?? "bg-slate-100 text-slate-600"}`}>
      {REQUEST_STATUS_LABELS[status] ?? status}
    </span>
  );
}

export function ResponseStatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${RESPONSE_COLORS[status] ?? "bg-slate-100 text-slate-600"}`}>
      {RESPONSE_STATUS_LABELS[status] ?? status}
    </span>
  );
}
