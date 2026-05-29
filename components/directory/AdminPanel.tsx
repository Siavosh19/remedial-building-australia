"use client";

import { useState } from "react";

type QueueItem = {
  id: number;
  status: string;
  created_at: string;
  company: {
    id: number;
    name: string;
    slug: string;
    abn: string | null;
    email: string;
    phone: string | null;
    website: string | null;
    status: string;
    main_category: { name: string } | null;
    locations: { suburb: string | null; postcode: string; state: string }[];
    users: { user: { full_name: string | null; email: string } }[];
  };
};

type Company = {
  id: number;
  name: string;
  slug: string;
  email: string;
  status: string;
  profile_status: string;
  is_claimed: boolean;
  main_category: { name: string } | null;
  locations: { suburb: string | null; state: string }[];
  created_at: string;
};

type User = {
  id: number;
  email: string;
  full_name: string | null;
  role: string;
  is_verified: boolean;
  created_at: string;
};

type Stats = {
  pending: number;
  totalCompanies: number;
  publishedCompanies: number;
  totalUsers: number;
};

type Props = {
  queue: QueueItem[];
  companies: Company[];
  users: User[];
  stats: Stats;
};

export default function AdminPanel({ queue: initialQueue, companies, users, stats }: Props) {
  const [tab, setTab] = useState<"pending" | "companies" | "users">("pending");
  const [queue, setQueue] = useState(initialQueue);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [note, setNote] = useState<Record<number, string>>({});

  async function doAction(queueId: number, action: "approve" | "reject") {
    setActionLoading(queueId);
    const res = await fetch("/api/directory/admin/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queueId, action, note: note[queueId] ?? "" }),
    });
    setActionLoading(null);
    if (res.ok) {
      setQueue((prev) => prev.filter((q) => q.id !== queueId));
    } else {
      const d = await res.json();
      alert(d.error ?? "Action failed");
    }
  }

  const filteredCompanies = companies.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  const tabCls = (t: string) =>
    tab === t
      ? "border-b-2 border-red-500 text-slate-950 font-semibold pb-3 px-1 text-sm"
      : "text-slate-500 hover:text-slate-800 pb-3 px-1 text-sm cursor-pointer";

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Pending Approval", value: queue.length, color: "text-red-600" },
          { label: "Total Businesses", value: stats.totalCompanies, color: "text-slate-950" },
          { label: "Live Listings", value: stats.publishedCompanies, color: "text-emerald-600" },
          { label: "Directory Users", value: stats.totalUsers, color: "text-sky-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white px-6 py-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className={`mt-1 text-3xl font-bold ${s.color}`}>{s.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex gap-6 border-b border-slate-200 px-6 pt-4">
          <button onClick={() => setTab("pending")} className={tabCls("pending")}>
            Pending Approval {queue.length > 0 && <span className="ml-1.5 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">{queue.length}</span>}
          </button>
          <button onClick={() => setTab("companies")} className={tabCls("companies")}>
            All Businesses
          </button>
          <button onClick={() => setTab("users")} className={tabCls("users")}>
            Users
          </button>
        </div>

        <div className="p-6">
          {/* PENDING TAB */}
          {tab === "pending" && (
            queue.length === 0 ? (
              <div className="py-16 text-center text-slate-400">No businesses pending approval.</div>
            ) : (
              <div className="space-y-4">
                {queue.map((item) => {
                  const loc = item.company.locations[0];
                  const owner = item.company.users[0]?.user;
                  const loading = actionLoading === item.id;
                  return (
                    <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <p className="text-base font-bold text-slate-950">{item.company.name}</p>
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">Pending</span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                            {item.company.main_category && <span>Category: <strong className="text-slate-700">{item.company.main_category.name}</strong></span>}
                            {loc && <span>Location: <strong className="text-slate-700">{loc.suburb ? `${loc.suburb}, ` : ""}{loc.state}</strong></span>}
                            {item.company.abn && <span>ABN: <strong className="text-slate-700">{item.company.abn}</strong></span>}
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                            <span>Business email: <strong className="text-slate-700">{item.company.email}</strong></span>
                            {item.company.phone && <span>Phone: <strong className="text-slate-700">{item.company.phone}</strong></span>}
                            {item.company.website && (
                              <a href={item.company.website} target="_blank" rel="noopener noreferrer" className="text-sky-600 underline">
                                {item.company.website}
                              </a>
                            )}
                          </div>
                          {owner && (
                            <p className="text-sm text-slate-500">
                              Account: <strong className="text-slate-700">{owner.full_name}</strong> — {owner.email}
                            </p>
                          )}
                          <p className="text-xs text-slate-400">
                            Submitted {new Date(item.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-col gap-2 md:items-end">
                          <textarea
                            value={note[item.id] ?? ""}
                            onChange={(e) => setNote((n) => ({ ...n, [item.id]: e.target.value }))}
                            placeholder="Optional note…"
                            rows={2}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 focus:outline-none md:w-56"
                          />
                          <div className="flex gap-2">
                            <a
                              href={`/directory/company/${item.company.slug}`}
                              target="_blank"
                              className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-slate-400"
                            >
                              View listing
                            </a>
                            <button
                              onClick={() => doAction(item.id, "reject")}
                              disabled={loading}
                              className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-50"
                            >
                              {loading ? "…" : "Reject"}
                            </button>
                            <button
                              onClick={() => doAction(item.id, "approve")}
                              disabled={loading}
                              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50"
                            >
                              {loading ? "…" : "Approve"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}

          {/* ALL BUSINESSES TAB */}
          {tab === "companies" && (
            <div className="space-y-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full max-w-sm rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500"
              />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <th className="pb-3 pr-4">Business</th>
                      <th className="pb-3 pr-4">Category</th>
                      <th className="pb-3 pr-4">Location</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 pr-4">Claimed</th>
                      <th className="pb-3">Added</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCompanies.map((c) => {
                      const loc = c.locations[0];
                      return (
                        <tr key={c.id} className="hover:bg-slate-50">
                          <td className="py-3 pr-4">
                            <a
                              href={`/directory/company/${c.slug}`}
                              target="_blank"
                              className="font-semibold text-slate-900 hover:text-sky-700"
                            >
                              {c.name}
                            </a>
                            <p className="text-xs text-slate-400">{c.email}</p>
                          </td>
                          <td className="py-3 pr-4 text-slate-600">{c.main_category?.name ?? "—"}</td>
                          <td className="py-3 pr-4 text-slate-600">
                            {loc ? `${loc.suburb ? loc.suburb + ", " : ""}${loc.state}` : "—"}
                          </td>
                          <td className="py-3 pr-4">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              c.status === "published" ? "bg-emerald-100 text-emerald-800" :
                              c.status === "draft" ? "bg-amber-100 text-amber-800" :
                              c.status === "rejected" ? "bg-red-100 text-red-800" :
                              "bg-slate-100 text-slate-700"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3 pr-4">
                            {c.is_claimed
                              ? <span className="text-xs font-semibold text-emerald-700">Yes</span>
                              : <span className="text-xs text-slate-400">No</span>}
                          </td>
                          <td className="py-3 text-xs text-slate-400">
                            {new Date(c.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredCompanies.length === 0 && (
                  <p className="py-8 text-center text-slate-400">No results.</p>
                )}
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {tab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 pr-4">Email</th>
                    <th className="pb-3 pr-4">Role</th>
                    <th className="pb-3 pr-4">Verified</th>
                    <th className="pb-3">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="py-3 pr-4 font-semibold text-slate-900">{u.full_name ?? "—"}</td>
                      <td className="py-3 pr-4 text-slate-600">{u.email}</td>
                      <td className="py-3 pr-4">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          u.role === "admin" ? "bg-red-100 text-red-700" : "bg-sky-100 text-sky-700"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        {u.is_verified
                          ? <span className="text-xs font-semibold text-emerald-700">Yes</span>
                          : <span className="text-xs text-slate-400">No</span>}
                      </td>
                      <td className="py-3 text-xs text-slate-400">
                        {new Date(u.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
