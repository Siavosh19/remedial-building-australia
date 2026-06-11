"use client";

import { useState } from "react";

type Sub = {
  subscription_status: string;
  plan_type: string;
  billing_cycle: string;
  trial_ends_at: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

type Company = {
  id: number;
  slug: string;
  name: string;
  email: string;
  status: string;
  plan_type: string;
  listing_claim_status: string;
  is_featured: boolean;
  is_claimed: boolean;
  suspended: boolean;
  profile_views: number;
  phone_clicks: number;
  website_clicks: number;
  created_at: string;
  main_category: { name: string } | null;
  locations: { suburb: string | null; state: string }[];
  directory_subscription: Sub | null;
  _count: { quote_requests: number };
};

const PLAN_CLS: Record<string, string> = {
  featured: "bg-amber-100 text-amber-800",
  claimed:  "bg-indigo-100 text-indigo-700",
  basic:    "bg-slate-100 text-slate-500",
};

const SUB_CLS: Record<string, string> = {
  trialing: "bg-sky-100 text-sky-700",
  active:   "bg-emerald-100 text-emerald-700",
  past_due: "bg-amber-100 text-amber-800",
  cancelled:"bg-red-100 text-red-700",
  expired:  "bg-slate-100 text-slate-500",
  none:     "bg-slate-100 text-slate-400",
};

type EditModal = { company: Company; plan: string; subStatus: string; note: string; trialEnd: string; quoteEnabled: boolean; suspended: boolean } | null;

export default function DirectoryCompaniesClient({ companies }: { companies: Company[] }) {
  const [list, setList] = useState(companies);
  const [filter, setFilter] = useState("all");
  const [edit, setEdit] = useState<EditModal>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = list.filter((c) => {
    if (filter === "featured" && c.plan_type !== "featured") return false;
    if (filter === "claimed" && c.plan_type !== "claimed") return false;
    if (filter === "basic" && c.plan_type !== "basic") return false;
    if (filter === "suspended" && !c.suspended) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function saveEdit() {
    if (!edit) return;
    setSaving(true);
    const res = await fetch("/api/directory/admin/directory-companies", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyId: edit.company.id,
        override_plan: edit.plan,
        override_notes: edit.note,
        subscription_status: edit.subStatus,
        trial_ends_at: edit.trialEnd || undefined,
        quote_requests_enabled: edit.quoteEnabled,
        suspended: edit.suspended,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setList((prev) => prev.map((c) => c.id === edit.company.id ? { ...c, plan_type: edit.plan as Company["plan_type"], suspended: edit.suspended } : c));
      setEdit(null);
    } else {
      alert("Save failed.");
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Directory Companies</h1>
          <p className="text-sm text-slate-500 mt-1">{list.length} total</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name…"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:outline-none"
          />
          {["all","featured","claimed","basic","suspended"].map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${filter === f ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Company</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Plan</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Subscription</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Quote reqs</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Views</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Created</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const sub = c.directory_subscription;
              return (
                <tr key={c.id} className={`border-b border-slate-100 hover:bg-slate-50 ${c.suspended ? "opacity-50" : ""}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{c.name}</div>
                    <div className="text-xs text-slate-400">{c.locations[0]?.suburb ?? ""} {c.locations[0]?.state ?? ""}</div>
                    <div className="text-xs text-slate-400">{c.main_category?.name ?? "—"}</div>
                    {c.suspended && <span className="text-xs text-red-600 font-semibold">Suspended</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${PLAN_CLS[c.plan_type] ?? "bg-slate-100"}`}>
                      {c.plan_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {sub ? (
                      <div className="space-y-0.5">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${SUB_CLS[sub.subscription_status] ?? "bg-slate-100"}`}>
                          {sub.subscription_status}
                        </span>
                        <p className="text-xs text-slate-400">{sub.billing_cycle}</p>
                        {sub.trial_ends_at && <p className="text-xs text-slate-400">Trial to {new Date(sub.trial_ends_at).toLocaleDateString("en-AU")}</p>}
                        {sub.current_period_end && <p className="text-xs text-slate-400">Period ends {new Date(sub.current_period_end).toLocaleDateString("en-AU")}</p>}
                        {sub.stripe_subscription_id && <p className="text-xs text-slate-300 truncate max-w-[120px]">{sub.stripe_subscription_id}</p>}
                      </div>
                    ) : <span className="text-xs text-slate-400">No subscription</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{c._count.quote_requests}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-slate-500">{c.profile_views} views</div>
                    <div className="text-xs text-slate-400">{c.phone_clicks} calls · {c.website_clicks} site</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString("en-AU")}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setEdit({
                        company: c,
                        plan: c.plan_type,
                        subStatus: c.directory_subscription?.subscription_status ?? "none",
                        note: "",
                        trialEnd: c.directory_subscription?.trial_ends_at ? c.directory_subscription.trial_ends_at.slice(0, 10) : "",
                        quoteEnabled: false,
                        suspended: c.suspended,
                      })}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
            {!filtered.length && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No companies found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit modal */}
      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl space-y-5">
            <h2 className="text-lg font-bold text-slate-950">Edit: {edit.company.name}</h2>

            <label className="block text-sm font-semibold text-slate-700">
              Plan override
              <select value={edit.plan} onChange={(e) => setEdit({ ...edit, plan: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none">
                {["basic","claimed","featured"].map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Subscription status
              <select value={edit.subStatus} onChange={(e) => setEdit({ ...edit, subStatus: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none">
                {["none","trialing","active","past_due","cancelled","expired"].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Trial end date
              <input type="date" value={edit.trialEnd} onChange={(e) => setEdit({ ...edit, trialEnd: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none" />
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={edit.quoteEnabled} onChange={(e) => setEdit({ ...edit, quoteEnabled: e.target.checked })} className="h-4 w-4 rounded" />
              <span className="text-sm font-semibold text-slate-700">Enable quote requests</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={edit.suspended} onChange={(e) => setEdit({ ...edit, suspended: e.target.checked })} className="h-4 w-4 rounded" />
              <span className="text-sm font-semibold text-red-700">Suspend listing</span>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Admin note
              <input type="text" value={edit.note} onChange={(e) => setEdit({ ...edit, note: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none" />
            </label>

            <div className="flex gap-3 pt-2">
              <button type="button" disabled={saving} onClick={saveEdit}
                className="flex-1 rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-60">
                {saving ? "Saving…" : "Save changes"}
              </button>
              <button type="button" onClick={() => setEdit(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
