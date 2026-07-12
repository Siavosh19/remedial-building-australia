"use client";

import { useState } from "react";
import { Plus, Star, Eye, Users, Pencil, Copy, RefreshCw, XCircle, Trash2, CreditCard, ExternalLink } from "lucide-react";

export type DashboardJob = {
  id: number;
  slug: string;
  title: string;
  status: string;
  effectiveStatus: string;
  is_featured: boolean;
  views: number;
  applications: number;
  published_at: string | null;
  expires_at: string | null;
};

export type DashboardPayment = {
  id: number;
  jobTitle: string;
  amount: string;
  planKey: string;
  isFeatured: boolean;
  status: string;
  date: string;
};

const TABS = [
  { key: "active", label: "Active" },
  { key: "draft", label: "Drafts" },
  { key: "expired", label: "Expired" },
  { key: "featured", label: "Featured" },
  { key: "payments", label: "Payments" },
] as const;

export default function EmployerDashboard({
  email,
  companyName,
  jobs,
  payments,
}: {
  email: string;
  companyName: string | null;
  jobs: DashboardJob[];
  payments: DashboardPayment[];
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("active");
  const [busyId, setBusyId] = useState<number | null>(null);

  const counts = {
    active: jobs.filter((j) => j.effectiveStatus === "active").length,
    draft: jobs.filter((j) => j.effectiveStatus === "draft" || j.effectiveStatus === "pending_payment").length,
    expired: jobs.filter((j) => j.effectiveStatus === "expired").length,
    featured: jobs.filter((j) => j.is_featured && j.effectiveStatus === "active").length,
    applications: jobs.reduce((s, j) => s + j.applications, 0),
  };

  const filtered =
    tab === "featured"
      ? jobs.filter((j) => j.is_featured && j.effectiveStatus === "active")
      : tab === "draft"
      ? jobs.filter((j) => j.effectiveStatus === "draft" || j.effectiveStatus === "pending_payment")
      : jobs.filter((j) => j.effectiveStatus === tab);

  async function call(url: string, body?: unknown, method = "POST") {
    const res = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    return { ok: res.ok, data: await res.json().catch(() => ({})) };
  }

  async function pay(id: number, is_featured?: boolean) {
    setBusyId(id);
    const { ok, data } = await call(`/api/industry-jobs/jobs/${id}/checkout`, is_featured != null ? { is_featured } : {});
    if (ok && data.checkoutUrl) { window.location.href = data.checkoutUrl; return; }
    if (ok) { window.location.reload(); return; }
    alert(data.error ?? "Something went wrong.");
    setBusyId(null);
  }

  async function action(id: number, act: string) {
    if (act === "expire" && !confirm("Take this listing offline now?")) return;
    setBusyId(id);
    const { ok, data } = await call(`/api/industry-jobs/jobs/${id}/action`, { action: act });
    if (ok && act === "duplicate" && data.id) { window.location.href = `/directory/dashboard/jobs/${data.id}/edit`; return; }
    if (ok) { window.location.reload(); return; }
    alert(data.error ?? "Something went wrong.");
    setBusyId(null);
  }

  async function remove(id: number) {
    if (!confirm("Delete this job permanently? This cannot be undone.")) return;
    setBusyId(id);
    const { ok, data } = await call(`/api/industry-jobs/jobs/${id}`, undefined, "DELETE");
    if (ok) { window.location.reload(); return; }
    alert(data.error ?? "Something went wrong.");
    setBusyId(null);
  }

  const btn = "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-sky-800 transition hover:border-sky-300 hover:text-red-700 disabled:opacity-50";

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-sky-950">Jobs</h1>
          <p className="mt-1 text-sm text-slate-500">{companyName ? `${companyName} · ` : ""}{email}</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/directory/dashboard/jobs/new" className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800">
            <Plus size={16} /> Post a Job
          </a>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: "Active", value: counts.active },
          { label: "Drafts", value: counts.draft },
          { label: "Expired", value: counts.expired },
          { label: "Featured", value: counts.featured },
          { label: "Applications", value: counts.applications },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-2xl font-extrabold text-sky-950">{s.value}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition ${tab === t.key ? "border-red-600 text-red-700" : "border-transparent text-slate-500 hover:text-sky-800"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Payments tab */}
      {tab === "payments" ? (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          {payments.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-400">No payments yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Job</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3 text-slate-500">{p.date}</td>
                    <td className="px-4 py-3 font-semibold text-sky-950">{p.jobTitle}</td>
                    <td className="px-4 py-3 text-slate-600">{p.isFeatured ? "Featured" : "Standard"}</td>
                    <td className="px-4 py-3 font-semibold text-sky-950">{p.amount}</td>
                    <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-bold ${p.status === "paid" ? "bg-emerald-100 text-emerald-800" : p.status === "failed" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-500"}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        /* Job lists */
        <div className="mt-6 space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-14 text-center">
              <p className="text-sm font-semibold text-slate-500">Nothing here yet.</p>
              {tab === "draft" && <a href="/directory/dashboard/jobs/new" className="mt-2 inline-block text-sm font-bold text-sky-700 hover:text-red-700">Post your first job →</a>}
            </div>
          ) : (
            filtered.map((j) => {
              const isDraft = j.effectiveStatus === "draft" || j.effectiveStatus === "pending_payment";
              const isExpired = j.effectiveStatus === "expired";
              const isActive = j.effectiveStatus === "active";
              return (
                <div key={j.id} className={`rounded-2xl border bg-white p-5 ${j.is_featured && isActive ? "border-amber-300" : "border-slate-200"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {j.is_featured && isActive && <Star size={14} className="fill-amber-500 text-amber-500" />}
                        <h3 className="text-base font-bold text-sky-950">{j.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${isActive ? "bg-emerald-100 text-emerald-800" : isExpired ? "bg-slate-200 text-slate-600" : "bg-amber-100 text-amber-800"}`}>
                          {j.effectiveStatus === "pending_payment" ? "awaiting payment" : j.effectiveStatus}
                        </span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1"><Eye size={12} /> {j.views} views</span>
                        <span className="inline-flex items-center gap-1"><Users size={12} /> {j.applications} applications</span>
                        {j.expires_at && isActive && <span>Expires {new Date(j.expires_at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}</span>}
                      </div>
                    </div>
                    {isActive && <a href={`/industry-jobs/${j.slug}`} target="_blank" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-red-700"><ExternalLink size={12} /> View live</a>}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {j.applications > 0 && (
                      <a href={`/directory/dashboard/jobs/${j.id}/applications`} className={`${btn} border-sky-200 text-sky-800`}><Users size={13} /> Applications ({j.applications})</a>
                    )}
                    <a href={`/directory/dashboard/jobs/${j.id}/edit`} className={btn}><Pencil size={13} /> Edit</a>
                    {isDraft && (
                      <button onClick={() => pay(j.id)} disabled={busyId === j.id} className="inline-flex items-center gap-1.5 rounded-lg bg-red-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-800 disabled:opacity-50">
                        <CreditCard size={13} /> {busyId === j.id ? "…" : "Pay & publish"}
                      </button>
                    )}
                    {isActive && !j.is_featured && (
                      <button onClick={() => pay(j.id, true)} disabled={busyId === j.id} className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-50">
                        <Star size={13} /> Upgrade to Featured
                      </button>
                    )}
                    {(isExpired || isActive) && (
                      <button onClick={() => pay(j.id)} disabled={busyId === j.id} className={btn}><RefreshCw size={13} /> Renew</button>
                    )}
                    <button onClick={() => action(j.id, "duplicate")} disabled={busyId === j.id} className={btn}><Copy size={13} /> Duplicate</button>
                    {isActive && <button onClick={() => action(j.id, "expire")} disabled={busyId === j.id} className={btn}><XCircle size={13} /> Expire</button>}
                    <button onClick={() => remove(j.id)} disabled={busyId === j.id} className={`${btn} hover:border-red-300`}><Trash2 size={13} /> Delete</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
