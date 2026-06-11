"use client";

import { useState } from "react";

type Claim = {
  id: number;
  company_id: number;
  user_id: number;
  status: string;
  claimant_name: string;
  claimant_email: string;
  claimant_phone: string | null;
  notes: string | null;
  admin_notes: string | null;
  created_at: string;
  reviewed_at: string | null;
  company: {
    id: number;
    name: string;
    slug: string;
    status: string;
    plan_type: string;
    listing_claim_status: string;
  };
};

const STATUS_CLS: Record<string, string> = {
  claim_pending: "bg-amber-100 text-amber-800",
  claimed: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-700",
  unclaimed: "bg-slate-100 text-slate-600",
};

export default function ClaimsAdminClient({ claims }: { claims: Claim[] }) {
  const [list, setList] = useState(claims);
  const [note, setNote] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("claim_pending");

  async function doAction(claimId: number, action: "approve" | "reject") {
    setLoading(claimId);
    const res = await fetch("/api/directory/admin/claims", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ claimId, action, adminNote: note[claimId] ?? "" }),
    });
    const data = await res.json();
    setLoading(null);
    if (res.ok) {
      setList((prev) =>
        prev.map((c) =>
          c.id === claimId ? { ...c, status: action === "approve" ? "claimed" : "rejected" } : c
        )
      );
    } else {
      alert(data.error ?? "Action failed.");
    }
  }

  const filtered = list.filter((c) => filter === "all" || c.status === filter);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Claim Requests</h1>
          <p className="text-sm text-slate-500 mt-1">{list.filter((c) => c.status === "claim_pending").length} pending</p>
        </div>
        <div className="flex gap-2">
          {["claim_pending","claimed","rejected","all"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${filter === s ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
            >
              {s === "claim_pending" ? "Pending" : s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-400">
            No {filter === "all" ? "" : filter} claims.
          </div>
        )}
        {filtered.map((c) => (
          <div key={c.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-900">{c.company.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_CLS[c.status] ?? "bg-slate-100 text-slate-600"}`}>
                    {c.status.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-slate-400">#{c.id}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {c.claimant_name} · {c.claimant_email}{c.claimant_phone ? ` · ${c.claimant_phone}` : ""}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Submitted {new Date(c.created_at).toLocaleDateString("en-AU")}
                  {c.reviewed_at ? ` · Reviewed ${new Date(c.reviewed_at).toLocaleDateString("en-AU")}` : ""}
                </p>
                {c.notes && <p className="mt-1 text-xs text-slate-500 italic">"{c.notes}"</p>}
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`/directory/company/${c.company.slug}`}
                  target="_blank"
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  View listing ↗
                </a>
              </div>
            </div>

            {c.status === "claim_pending" && (
              <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
                <textarea
                  value={note[c.id] ?? ""}
                  onChange={(e) => setNote((n) => ({ ...n, [c.id]: e.target.value }))}
                  placeholder="Admin note (optional)"
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={loading === c.id}
                    onClick={() => doAction(c.id, "approve")}
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
                  >
                    {loading === c.id ? "…" : "Approve claim"}
                  </button>
                  <button
                    type="button"
                    disabled={loading === c.id}
                    onClick={() => doAction(c.id, "reject")}
                    className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-60"
                  >
                    {loading === c.id ? "…" : "Reject"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
