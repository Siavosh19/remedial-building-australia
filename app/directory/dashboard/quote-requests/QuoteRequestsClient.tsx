"use client";

import { useState } from "react";
import Link from "next/link";

type Quote = {
  id: number;
  requester_name: string;
  requester_email: string;
  requester_phone: string | null;
  requester_role: string | null;
  building_suburb: string | null;
  project_category: string | null;
  urgency: string | null;
  budget_range: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const STATUS_OPTS = [
  { value: "new",          label: "New",          cls: "bg-sky-100 text-sky-800" },
  { value: "viewed",       label: "Viewed",        cls: "bg-slate-100 text-slate-700" },
  { value: "responded",    label: "Responded",     cls: "bg-blue-100 text-blue-800" },
  { value: "not_suitable", label: "Not suitable",  cls: "bg-amber-100 text-amber-800" },
  { value: "won",          label: "Won",           cls: "bg-emerald-100 text-emerald-800" },
  { value: "lost",         label: "Lost",          cls: "bg-red-100 text-red-800" },
];

function StatusBadge({ status }: { status: string }) {
  const opt = STATUS_OPTS.find((s) => s.value === status) ?? { label: status, cls: "bg-slate-100 text-slate-700" };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${opt.cls}`}>{opt.label}</span>;
}

export default function QuoteRequestsClient({
  quotes,
  planType,
  quoteRequestsEnabled,
}: {
  quotes: Quote[];
  planType: string;
  quoteRequestsEnabled: boolean;
}) {
  const [list, setList] = useState(quotes);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);

  async function updateStatus(id: number, status: string) {
    setUpdating(id);
    await fetch(`/api/directory/quote-request/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setList((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    setUpdating(null);
  }

  if (planType === "basic") {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-slate-950">Quote Requests</h1>
        <p className="mt-4 text-slate-600">
          Quote requests are available on Claimed Profile and Featured Profile plans.
        </p>
        <Link
          href="/directory/pricing"
          className="mt-6 inline-flex rounded-2xl bg-sky-950 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-800"
        >
          View plans →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">Quote Requests</h1>
            <p className="mt-1 text-slate-600">{list.length} total request{list.length !== 1 ? "s" : ""}</p>
          </div>
          {!quoteRequestsEnabled && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
              Quote requests are currently disabled for your listing. Contact support to enable.
            </div>
          )}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="font-semibold text-slate-700">No quote requests yet</p>
          <p className="mt-1 text-sm text-slate-400">When someone submits a quote request on your listing, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((q) => (
            <div key={q.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-900">{q.requester_name}</span>
                    <StatusBadge status={q.status} />
                    {q.status === "new" && (
                      <span className="h-2 w-2 rounded-full bg-sky-500 inline-block" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {q.project_category ?? "General"} · {q.building_suburb ?? "Location not specified"} · {new Date(q.created_at).toLocaleDateString("en-AU")}
                  </p>
                </div>
                <span className="text-slate-400 shrink-0">{expanded === q.id ? "▲" : "▼"}</span>
              </button>

              {expanded === q.id && (
                <div className="border-t border-slate-100 px-6 py-5 space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Email", q.requester_email],
                      q.requester_phone ? ["Phone", q.requester_phone] : null,
                      q.requester_role ? ["Role", q.requester_role.replace(/_/g, " ")] : null,
                      q.building_suburb ? ["Suburb", q.building_suburb] : null,
                      q.project_category ? ["Category", q.project_category] : null,
                      q.urgency ? ["Urgency", q.urgency] : null,
                      q.budget_range ? ["Budget", q.budget_range] : null,
                    ].filter(Boolean).map((pair) => {
                      const [label, value] = pair as [string, string];
                      return (
                        <div key={label} className="rounded-xl bg-slate-50 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
                        </div>
                      );
                    })}
                  </div>

                  {q.message && (
                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Message</p>
                      <p className="mt-1 text-sm text-slate-700 leading-relaxed">{q.message}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    <p className="w-full text-xs font-semibold text-slate-500 mb-1">Update status:</p>
                    {STATUS_OPTS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        disabled={updating === q.id || q.status === opt.value}
                        onClick={() => updateStatus(q.id, opt.value)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                          q.status === opt.value
                            ? `${opt.cls} cursor-default`
                            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                        } disabled:opacity-50`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
