"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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

type UserDetail = {
  id: number;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  is_verified: boolean;
  created_at: string;
  company_users: {
    id: number;
    role: string;
    is_primary: boolean;
    company: {
      id: number;
      name: string;
      slug: string;
      abn: string | null;
      email: string;
      phone: string | null;
      website: string | null;
      status: string;
      main_category: { id: number; name: string } | null;
      locations: { suburb: string | null; state: string; postcode: string }[];
    };
  }[];
};

type Stats = {
  pending: number;
  totalCompanies: number;
  publishedCompanies: number;
  totalUsers: number;
  subscriberCount: number;
};

type Category = { id: number; name: string };

function CategoryCombobox({ categories, value, onChange }: {
  categories: Category[];
  value: string;
  onChange: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = categories.find((c) => String(c.id) === value);

  const filtered = query.trim()
    ? categories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 12)
    : categories.slice(0, 12);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative space-y-1.5">
      <span className="text-xs font-semibold text-slate-600">Category</span>
      <input
        type="text"
        placeholder={selected ? selected.name : "Search category…"}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
      />
      {selected && !query && (
        <p className="text-xs text-slate-500 px-1">Selected: <strong>{selected.name}</strong></p>
      )}
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-52 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
          <li>
            <button
              type="button"
              onClick={() => { onChange(""); setQuery(""); setOpen(false); }}
              className="w-full px-3 py-2 text-left text-xs text-slate-400 hover:bg-slate-50"
            >
              — No category —
            </button>
          </li>
          {filtered.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => { onChange(String(c.id)); setQuery(""); setOpen(false); }}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-sky-50 hover:text-sky-800 ${String(c.id) === value ? "font-semibold text-sky-700 bg-sky-50" : "text-slate-700"}`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type Props = {
  queue: QueueItem[];
  users: User[];
  stats: Stats;
};

const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

export default function AdminPanel({ queue: initialQueue, users, stats }: Props) {
  const [tab, setTab] = useState<"pending" | "companies" | "users">("pending");
  const [queue, setQueue] = useState(initialQueue);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [note, setNote] = useState<Record<number, string>>({});

  // Companies state
  const [companies, setCompanies] = useState<Company[]>([]);
  const [total, setTotal] = useState(stats.totalCompanies);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  // User detail drawer
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [drawerSaving, setDrawerSaving] = useState(false);
  const [drawerError, setDrawerError] = useState<string | null>(null);
  const [userEdit, setUserEdit] = useState<{ full_name: string; role: string; is_verified: boolean } | null>(null);
  const [companyEdit, setCompanyEdit] = useState<{ name: string; abn: string; email: string; phone: string; website: string; status: string; main_category_id: string } | null>(null);
  const [activeCompanyIdx, setActiveCompanyIdx] = useState(0);

  const fetchCompanies = useCallback(async (p: number, s: string, st: string, sf: string) => {
    setLoadingCompanies(true);
    const params = new URLSearchParams({ page: String(p) });
    if (s) params.set("search", s);
    if (st) params.set("state", st);
    if (sf) params.set("status", sf);
    const res = await fetch(`/api/directory/admin/companies?${params}`);
    const data = await res.json();
    setCompanies(data.items ?? []);
    setTotal(data.total ?? 0);
    setTotalPages(data.totalPages ?? 1);
    setLoadingCompanies(false);
  }, []);

  useEffect(() => {
    if (tab === "companies") {
      fetchCompanies(page, search, stateFilter, statusFilter);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  function applyFilters() {
    setPage(1);
    fetchCompanies(1, search, stateFilter, statusFilter);
  }

  function handlePageChange(p: number) {
    setPage(p);
    fetchCompanies(p, search, stateFilter, statusFilter);
  }

  async function openUserDrawer(userId: number) {
    setDrawerLoading(true);
    setDrawerError(null);
    setSelectedUser(null);
    setActiveCompanyIdx(0);
    const res = await fetch(`/api/directory/admin/user-detail?id=${userId}`);
    const data = await res.json();
    setDrawerLoading(false);
    if (!res.ok) { setDrawerError(data.error ?? "Failed to load user"); return; }
    const { user, categories: cats } = data;
    setSelectedUser(user);
    setCategories(cats ?? []);
    setUserEdit({ full_name: user.full_name ?? "", role: user.role, is_verified: user.is_verified });
    const cu = user.company_users[0];
    if (cu) {
      setCompanyEdit({
        name: cu.company.name,
        abn: cu.company.abn ?? "",
        email: cu.company.email,
        phone: cu.company.phone ?? "",
        website: cu.company.website ?? "",
        status: cu.company.status,
        main_category_id: String(cu.company.main_category?.id ?? ""),
      });
    } else {
      setCompanyEdit(null);
    }
  }

  async function saveUserDrawer() {
    if (!selectedUser || !userEdit) return;
    setDrawerSaving(true);
    setDrawerError(null);
    const cu = selectedUser.company_users[activeCompanyIdx];
    const body: Record<string, unknown> = {
      userId: selectedUser.id,
      user: userEdit,
    };
    if (cu && companyEdit) {
      body.companyId = cu.company.id;
      body.company = companyEdit;
    }
    const res = await fetch("/api/directory/admin/user-detail", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setDrawerSaving(false);
    if (!res.ok) {
      const d = await res.json();
      setDrawerError(d.error ?? "Save failed");
      return;
    }
    setSelectedUser(null);
  }

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

  async function doDelete(id: number) {
    setDeleteLoading(id);
    const res = await fetch(`/api/directory/admin/companies?id=${id}`, { method: "DELETE" });
    setDeleteLoading(null);
    setDeleteConfirm(null);
    if (res.ok) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
      setTotal((prev) => prev - 1);
    } else {
      const d = await res.json();
      alert(d.error ?? "Delete failed");
    }
  }

  const tabCls = (t: string) =>
    tab === t
      ? "border-b-2 border-red-500 text-slate-950 font-semibold pb-3 px-1 text-sm"
      : "text-slate-500 hover:text-slate-800 pb-3 px-1 text-sm cursor-pointer";

  return (
    <>
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          { label: "Pending Approval", value: queue.length, color: "text-red-600" },
          { label: "Total Businesses", value: stats.totalCompanies.toLocaleString(), color: "text-slate-950" },
          { label: "Live Listings", value: stats.publishedCompanies.toLocaleString(), color: "text-emerald-600" },
          { label: "Directory Users", value: stats.totalUsers, color: "text-sky-600" },
          { label: "Newsletter Subscribers", value: stats.subscriberCount.toLocaleString(), color: "text-violet-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white px-6 py-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className={`mt-1 text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex gap-6 border-b border-slate-200 px-6 pt-4">
          <button onClick={() => setTab("pending")} className={tabCls("pending")}>
            Pending Approval{" "}
            {queue.length > 0 && (
              <span className="ml-1.5 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                {queue.length}
              </span>
            )}
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
              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  placeholder="Search name, email or ABN…"
                  className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500 w-64"
                />
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500"
                >
                  <option value="">All States</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500"
                >
                  <option value="">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft (pending)</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button
                  onClick={applyFilters}
                  className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Search
                </button>
                {(search || stateFilter || statusFilter) && (
                  <button
                    onClick={() => { setSearch(""); setStateFilter(""); setStatusFilter(""); setPage(1); fetchCompanies(1, "", "", ""); }}
                    className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm text-slate-500 hover:text-slate-800"
                  >
                    Clear
                  </button>
                )}
              </div>

              <p className="text-sm text-slate-500">
                Showing {companies.length > 0 ? `${(page - 1) * 50 + 1}–${Math.min(page * 50, total)}` : "0"} of <strong>{total.toLocaleString()}</strong> businesses
              </p>

              {loadingCompanies ? (
                <div className="py-16 text-center text-slate-400">Loading…</div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                          <th className="pb-3 pr-4">Business</th>
                          <th className="pb-3 pr-4">Category</th>
                          <th className="pb-3 pr-4">Location</th>
                          <th className="pb-3 pr-4">Status</th>
                          <th className="pb-3 pr-4">Claimed</th>
                          <th className="pb-3 pr-4">Added</th>
                          <th className="pb-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {companies.map((c) => {
                          const loc = c.locations[0];
                          const isDeleting = deleteLoading === c.id;
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
                              <td className="py-3 pr-4 text-slate-600 text-xs">{c.main_category?.name ?? "—"}</td>
                              <td className="py-3 pr-4 text-slate-600 text-xs">
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
                              <td className="py-3 pr-4 text-xs">
                                {c.is_claimed
                                  ? <span className="font-semibold text-emerald-700">Yes</span>
                                  : <span className="text-slate-400">No</span>}
                              </td>
                              <td className="py-3 pr-4 text-xs text-slate-400">
                                {new Date(c.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                              </td>
                              <td className="py-3 text-right">
                                {deleteConfirm === c.id ? (
                                  <span className="inline-flex items-center gap-2">
                                    <span className="text-xs text-red-700 font-semibold">Delete?</span>
                                    <button
                                      onClick={() => doDelete(c.id)}
                                      disabled={isDeleting}
                                      className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-red-500 disabled:opacity-50"
                                    >
                                      {isDeleting ? "…" : "Yes"}
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirm(null)}
                                      className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs text-slate-600 hover:border-slate-400"
                                    >
                                      No
                                    </button>
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => setDeleteConfirm(c.id)}
                                    className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                                  >
                                    Remove
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {companies.length === 0 && !loadingCompanies && (
                      <p className="py-8 text-center text-slate-400">No results.</p>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-40 hover:border-slate-400"
                      >
                        ← Prev
                      </button>
                      <span className="text-sm text-slate-600">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-40 hover:border-slate-400"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* USERS TAB */}
          {tab === "users" && (
            <div className="overflow-x-auto">
              <p className="mb-3 text-xs text-slate-400">Click any row to view and edit user details.</p>
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
                    <tr
                      key={u.id}
                      onClick={() => openUserDrawer(u.id)}
                      className="cursor-pointer hover:bg-sky-50 transition-colors"
                    >
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

    {/* User detail drawer overlay */}

    {(drawerLoading || selectedUser) && (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => { setSelectedUser(null); setDrawerError(null); }}
        />

        {/* Drawer */}
        <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <h2 className="text-base font-bold text-slate-950">
              {drawerLoading ? "Loading…" : (selectedUser?.full_name ?? selectedUser?.email ?? "User")}
            </h2>
            <button
              onClick={() => { setSelectedUser(null); setDrawerError(null); }}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              ✕
            </button>
          </div>

          {drawerLoading ? (
            <div className="flex flex-1 items-center justify-center text-slate-400">Loading…</div>
          ) : selectedUser && userEdit ? (
            <div className="flex flex-1 flex-col overflow-y-auto">
              <div className="space-y-6 p-6">

                {/* Account section */}
                <section>
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Account</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block space-y-1.5">
                      <span className="text-xs font-semibold text-slate-600">Full name</span>
                      <input
                        type="text"
                        value={userEdit.full_name}
                        onChange={(e) => setUserEdit({ ...userEdit, full_name: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                      />
                    </label>
                    <label className="block space-y-1.5">
                      <span className="text-xs font-semibold text-slate-600">Email</span>
                      <input
                        type="text"
                        value={selectedUser.email}
                        disabled
                        className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-400"
                      />
                    </label>
                    <label className="block space-y-1.5">
                      <span className="text-xs font-semibold text-slate-600">Role</span>
                      <select
                        value={userEdit.role}
                        onChange={(e) => setUserEdit({ ...userEdit, role: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 pt-5">
                      <input
                        type="checkbox"
                        checked={userEdit.is_verified}
                        onChange={(e) => setUserEdit({ ...userEdit, is_verified: e.target.checked })}
                        className="h-4 w-4 rounded border-slate-300 accent-sky-950"
                      />
                      <span className="text-sm text-slate-700">Email verified</span>
                    </label>
                  </div>
                  <p className="mt-3 text-xs text-slate-400">
                    Joined {new Date(selectedUser.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
                    {selectedUser.phone ? ` · ${selectedUser.phone}` : ""}
                  </p>
                </section>

                {/* Company section */}
                {selectedUser.company_users.length > 0 && companyEdit && (() => {
                  const cu = selectedUser.company_users[activeCompanyIdx];
                  const loc = cu.company.locations[0];
                  return (
                    <section>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Company {selectedUser.company_users.length > 1 ? `(${activeCompanyIdx + 1}/${selectedUser.company_users.length})` : ""}
                        </h3>
                        {selectedUser.company_users.length > 1 && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                const idx = activeCompanyIdx - 1;
                                setActiveCompanyIdx(idx);
                                const c = selectedUser.company_users[idx].company;
                                setCompanyEdit({ name: c.name, abn: c.abn ?? "", email: c.email, phone: c.phone ?? "", website: c.website ?? "", status: c.status, main_category_id: String(c.main_category?.id ?? "") });
                              }}
                              disabled={activeCompanyIdx === 0}
                              className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs disabled:opacity-30 hover:border-slate-400"
                            >←</button>
                            <button
                              onClick={() => {
                                const idx = activeCompanyIdx + 1;
                                setActiveCompanyIdx(idx);
                                const c = selectedUser.company_users[idx].company;
                                setCompanyEdit({ name: c.name, abn: c.abn ?? "", email: c.email, phone: c.phone ?? "", website: c.website ?? "", status: c.status, main_category_id: String(c.main_category?.id ?? "") });
                              }}
                              disabled={activeCompanyIdx === selectedUser.company_users.length - 1}
                              className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs disabled:opacity-30 hover:border-slate-400"
                            >→</button>
                          </div>
                        )}
                      </div>

                      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        {cu.is_primary && <span className="rounded-full bg-sky-100 px-2 py-0.5 font-semibold text-sky-700">Primary</span>}
                        <span>Role: <strong>{cu.role}</strong></span>
                        {cu.company.main_category && <span>Category: <strong>{cu.company.main_category.name}</strong></span>}
                        {loc && <span>Location: <strong>{loc.suburb ? `${loc.suburb}, ` : ""}{loc.state} {loc.postcode}</strong></span>}
                        <a href={`/directory/company/${cu.company.slug}`} target="_blank" className="font-semibold text-sky-600 hover:text-sky-800">View listing ↗</a>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block space-y-1.5 sm:col-span-2">
                          <span className="text-xs font-semibold text-slate-600">Business name</span>
                          <input
                            type="text"
                            value={companyEdit.name}
                            onChange={(e) => setCompanyEdit({ ...companyEdit, name: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                          />
                        </label>
                        <div className="sm:col-span-2">
                          <CategoryCombobox
                            categories={categories}
                            value={companyEdit.main_category_id}
                            onChange={(id) => setCompanyEdit({ ...companyEdit, main_category_id: id })}
                          />
                        </div>
                        <label className="block space-y-1.5">
                          <span className="text-xs font-semibold text-slate-600">ABN</span>
                          <input
                            type="text"
                            value={companyEdit.abn}
                            onChange={(e) => setCompanyEdit({ ...companyEdit, abn: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                          />
                        </label>
                        <label className="block space-y-1.5">
                          <span className="text-xs font-semibold text-slate-600">Status</span>
                          <select
                            value={companyEdit.status}
                            onChange={(e) => setCompanyEdit({ ...companyEdit, status: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                          >
                            <option value="draft">draft (pending)</option>
                            <option value="published">published</option>
                            <option value="rejected">rejected</option>
                          </select>
                        </label>
                        <label className="block space-y-1.5">
                          <span className="text-xs font-semibold text-slate-600">Business email</span>
                          <input
                            type="email"
                            value={companyEdit.email}
                            onChange={(e) => setCompanyEdit({ ...companyEdit, email: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                          />
                        </label>
                        <label className="block space-y-1.5">
                          <span className="text-xs font-semibold text-slate-600">Phone</span>
                          <input
                            type="text"
                            value={companyEdit.phone}
                            onChange={(e) => setCompanyEdit({ ...companyEdit, phone: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                          />
                        </label>
                        <label className="block space-y-1.5 sm:col-span-2">
                          <span className="text-xs font-semibold text-slate-600">Website</span>
                          <input
                            type="text"
                            value={companyEdit.website}
                            onChange={(e) => setCompanyEdit({ ...companyEdit, website: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                          />
                        </label>
                      </div>
                    </section>
                  );
                })()}

                {selectedUser.company_users.length === 0 && (
                  <p className="text-sm text-slate-400">No company linked to this account.</p>
                )}

                {drawerError && (
                  <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-800">{drawerError}</div>
                )}
              </div>

              {/* Footer actions */}
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200 px-6 py-4">
                <button
                  onClick={async () => {
                    if (!selectedUser) return;
                    if (!confirm(`Permanently delete ${selectedUser.email}? This cannot be undone.`)) return;
                    const res = await fetch(`/api/directory/admin/user-detail?id=${selectedUser.id}`, { method: "DELETE" });
                    if (res.ok) { setSelectedUser(null); setDrawerError(null); }
                    else { const d = await res.json(); setDrawerError(d.error ?? "Delete failed."); }
                  }}
                  className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 hover:border-red-400 transition"
                >
                  Delete user
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setSelectedUser(null); setDrawerError(null); }}
                    className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveUserDrawer}
                    disabled={drawerSaving}
                    className="rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-60"
                  >
                    {drawerSaving ? "Saving…" : "Save changes"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </>
    )}
    </>
  );
}
