"use client";

import { useState } from "react";
import Link from "next/link";
import { DollarSign, Briefcase, Star, Clock, Users, ExternalLink, Tags } from "lucide-react";

export type AdminJob = {
  id: number; slug: string; title: string; company: string; employerEmail: string;
  status: string; effectiveStatus: string; isFeatured: boolean; applications: number;
  expiresAt: string | null; createdAt: string;
};
export type AdminPayment = { id: number; jobTitle: string; amount: string; isFeatured: boolean; status: string; date: string };
export type AdminEmployer = { id: number; email: string; company: string | null; jobs: number; joined: string };

const TABS = ["Jobs", "Payments", "Employers"] as const;

export default function AdminJobsClient({
  revenue, counts, jobs, payments, employers,
}: {
  revenue: string;
  counts: { active: number; featured: number; expired: number; applications: number; draft: number };
  jobs: AdminJob[];
  payments: AdminPayment[];
  employers: AdminEmployer[];
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Jobs");
  const [busy, setBusy] = useState<number | null>(null);

  async function act(id: number, action: string) {
    if ((action === "reject" || action === "expire") && !confirm(`${action[0].toUpperCase() + action.slice(1)} this job?`)) return;
    setBusy(id);
    const res = await fetch(`/api/directory/admin/jobs/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }),
    });
    if (res.ok) { location.reload(); return; }
    const d = await res.json().catch(() => ({}));
    alert(d.error ?? "Failed."); setBusy(null);
  }
  async function remove(id: number) {
    if (!confirm("Delete this job permanently?")) return;
    setBusy(id);
    const res = await fetch(`/api/directory/admin/jobs/${id}`, { method: "DELETE" });
    if (res.ok) { location.reload(); return; }
    setBusy(null);
  }

  const cards = [
    { label: "Total Revenue", value: revenue, icon: DollarSign },
    { label: "Active Jobs", value: counts.active, icon: Briefcase },
    { label: "Featured", value: counts.featured, icon: Star },
    { label: "Expired", value: counts.expired, icon: Clock },
    { label: "Applications", value: counts.applications, icon: Users },
  ];
  const btn = "rounded-md border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-400 disabled:opacity-50";

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Jobs Management</h1>
        <Link href="/directory/admin/jobs/pricing" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          <Tags size={15} /> Manage Pricing
        </Link>
      </div>

      {/* Summary */}
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-xl border border-slate-200 bg-white p-4">
              <Icon size={16} className="text-slate-400" />
              <p className="mt-2 text-xl font-extrabold text-slate-900">{c.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{c.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 border-b border-slate-200">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold ${tab === t ? "border-red-600 text-red-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Jobs" && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
              <tr><th className="px-3 py-2.5">Job</th><th className="px-3 py-2.5">Status</th><th className="px-3 py-2.5">Apps</th><th className="px-3 py-2.5">Created</th><th className="px-3 py-2.5">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.length === 0 ? (
                <tr><td colSpan={5} className="px-3 py-10 text-center text-slate-400">No jobs yet.</td></tr>
              ) : jobs.map((j) => (
                <tr key={j.id}>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                      {j.isFeatured && <Star size={12} className="fill-amber-500 text-amber-500" />}
                      {j.title}
                    </div>
                    <div className="text-xs text-slate-400">{j.company} · {j.employerEmail}</div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${j.effectiveStatus === "active" ? "bg-emerald-100 text-emerald-800" : j.effectiveStatus === "expired" ? "bg-slate-200 text-slate-600" : j.effectiveStatus === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"}`}>
                      {j.effectiveStatus === "pending_payment" ? "awaiting pay" : j.effectiveStatus}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-slate-600">{j.applications}</td>
                  <td className="px-3 py-2.5 text-slate-500">{j.createdAt}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      <a href={`/industry-jobs/${j.slug}`} target="_blank" className={btn}><ExternalLink size={11} className="inline" /></a>
                      <a href={`/directory/dashboard/jobs/${j.id}/edit`} target="_blank" className={btn}>Edit</a>
                      {j.effectiveStatus !== "active" && <button onClick={() => act(j.id, "approve")} disabled={busy === j.id} className={btn}>Approve</button>}
                      {j.effectiveStatus === "active" && <button onClick={() => act(j.id, "expire")} disabled={busy === j.id} className={btn}>Expire</button>}
                      {j.effectiveStatus === "expired" && <button onClick={() => act(j.id, "renew")} disabled={busy === j.id} className={btn}>Renew</button>}
                      {j.isFeatured ? <button onClick={() => act(j.id, "unfeature")} disabled={busy === j.id} className={btn}>Unfeature</button> : <button onClick={() => act(j.id, "feature")} disabled={busy === j.id} className={btn}>Feature</button>}
                      <button onClick={() => act(j.id, "reject")} disabled={busy === j.id} className={btn}>Reject</button>
                      <button onClick={() => remove(j.id)} disabled={busy === j.id} className={`${btn} text-red-600 hover:border-red-400`}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "Payments" && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
              <tr><th className="px-3 py-2.5">Date</th><th className="px-3 py-2.5">Job</th><th className="px-3 py-2.5">Type</th><th className="px-3 py-2.5">Amount</th><th className="px-3 py-2.5">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.length === 0 ? <tr><td colSpan={5} className="px-3 py-10 text-center text-slate-400">No payments yet.</td></tr> :
                payments.map((p) => (
                  <tr key={p.id}>
                    <td className="px-3 py-2.5 text-slate-500">{p.date}</td>
                    <td className="px-3 py-2.5 font-semibold text-slate-900">{p.jobTitle}</td>
                    <td className="px-3 py-2.5 text-slate-600">{p.isFeatured ? "Featured" : "Standard"}</td>
                    <td className="px-3 py-2.5 font-semibold text-slate-900">{p.amount}</td>
                    <td className="px-3 py-2.5"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${p.status === "paid" ? "bg-emerald-100 text-emerald-800" : p.status === "failed" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-500"}`}>{p.status}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "Employers" && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
              <tr><th className="px-3 py-2.5">Email</th><th className="px-3 py-2.5">Company</th><th className="px-3 py-2.5">Jobs</th><th className="px-3 py-2.5">Joined</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employers.length === 0 ? <tr><td colSpan={4} className="px-3 py-10 text-center text-slate-400">No employers yet.</td></tr> :
                employers.map((e) => (
                  <tr key={e.id}>
                    <td className="px-3 py-2.5 font-semibold text-slate-900">{e.email}</td>
                    <td className="px-3 py-2.5 text-slate-600">{e.company ?? "—"}</td>
                    <td className="px-3 py-2.5 text-slate-600">{e.jobs}</td>
                    <td className="px-3 py-2.5 text-slate-500">{e.joined}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
