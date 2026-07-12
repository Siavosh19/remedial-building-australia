"use client";
import { useState, useEffect, type ReactNode } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type Category = { id: number; name: string; slug: string };

type QueueItem = {
  id: number;
  company_id: number;
  status: string;
  source: string | null;
  notes: string | null;
  reviewed_by: number | null;
  reviewed_at: string | null;
  created_at: string;
  company: {
    id: number;
    slug: string;
    name: string;
    email: string;
    phone: string | null;
    abn: string | null;
    website: string | null;
    google_business_url: string | null;
    description: string | null;
    year_established: number | null;
    profile_status: string;
    confidence_score: number;
    is_claimed: boolean;
    is_featured: boolean;
    status: string;
    main_category: { id: number; name: string; slug: string } | null;
    locations: Array<{
      id: number;
      address: string;
      suburb: string | null;
      city: string | null;
      state: string;
      postcode: string;
      services_nationwide: boolean;
      services_statewide: boolean;
    }>;
    licences: Array<{
      id: number;
      licence_number: string;
      licence_class: string | null;
      licence_authority: string | null;
      licence_state: string | null;
      status: string;
    }>;
    company_categories: Array<{
      id: number;
      is_primary: boolean;
      is_approved: boolean;
      category: { id: number; name: string; slug: string };
    }>;
    company_tags: Array<{
      id: number;
      is_approved: boolean;
      tag: { id: number; name: string; tag_type: string };
    }>;
  };
  reviewer: { id: number; full_name: string | null; email: string } | null;
};

type ActionLogEntry = { ts: string; actor: string; action: string; note?: string };

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseActionLog(notes: string | null): ActionLogEntry[] {
  if (!notes) return [];
  try {
    const parsed = JSON.parse(notes);
    if (Array.isArray(parsed)) return parsed;
    return [{ ts: new Date().toISOString(), actor: "system", action: "note", note: notes }];
  } catch {
    return [{ ts: new Date().toISOString(), actor: "system", action: "note", note: notes }];
  }
}

function confidenceBreakdown(company: QueueItem["company"]) {
  return [
    { label: "ABN", points: 10, earned: !!company.abn },
    { label: "Phone", points: 15, earned: !!company.phone },
    { label: "Website", points: 10, earned: !!company.website },
    { label: "Google Business", points: 10, earned: !!company.google_business_url },
    { label: "Licence verified", points: 30, earned: company.licences.some((l) => l.status === "verified") },
    { label: "Claimed", points: 25, earned: company.is_claimed },
  ];
}

const STATUS_COLORS: Record<string, string> = {
  discovered: "bg-slate-100 text-slate-700",
  possible_match: "bg-sky-100 text-sky-700",
  verified: "bg-emerald-100 text-emerald-700",
  needs_review: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
  published: "bg-green-100 text-green-700",
  needs_recheck: "bg-orange-100 text-orange-700",
  approve: "bg-emerald-100 text-emerald-700",
  reject: "bg-red-100 text-red-700",
  note: "bg-slate-100 text-slate-600",
  legacy_note: "bg-slate-100 text-slate-600",
};

function fmtDate(ts: string | null) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

function fmtDateTime(ts: string | null) {
  if (!ts) return "—";
  return new Date(ts).toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
const QUEUE_STATUSES = [
  "discovered",
  "possible_match",
  "verified",
  "needs_review",
  "needs_recheck",
  "published",
  "rejected",
];

// ── Props ────────────────────────────────────────────────────────────────────

interface Props {
  initialItems: QueueItem[];
  initialTotal: number;
  initialTotalPages: number;
  categories: Category[];
  statusCounts: Record<string, number>;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function AdminReviewPanel({
  initialItems,
  initialTotal,
  initialTotalPages,
  categories,
  statusCounts,
}: Props) {
  const [statusFilter, setStatusFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const [items, setItems] = useState<QueueItem[]>(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<QueueItem | null>(null);
  const [actionNote, setActionNote] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  // Skip initial mount fetch — use SSR data
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);

  useEffect(() => {
    if (!hasMounted) return;
    let cancelled = false;
    setLoading(true);

    const params = new URLSearchParams({ page: String(page) });
    if (statusFilter) params.set("status", statusFilter);
    if (stateFilter) params.set("state", stateFilter);
    if (categoryFilter) params.set("category", categoryFilter);

    fetch(`/api/directory/admin/queue?${params}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && !cancelled) {
          setItems(data.items ?? []);
          setTotal(data.total ?? 0);
          setTotalPages(data.totalPages ?? 1);
        }
      })
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [hasMounted, statusFilter, stateFilter, categoryFilter, page, refreshKey]);

  function changeFilter(setter: (v: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  function openPanel(item: QueueItem) {
    setSelected(item);
    setActionNote("");
    setActionError("");
  }

  async function handleAction(action: string) {
    if (!selected || actionLoading) return;
    setActionLoading(true);
    setActionError("");
    try {
      const res = await fetch("/api/directory/admin/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          queueId: selected.id,
          action,
          note: actionNote.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setActionError((err as { error?: string }).error ?? "Action failed. Try again.");
        return;
      }
      setSelected(null);
      setActionNote("");
      setRefreshKey((k) => k + 1);
    } finally {
      setActionLoading(false);
    }
  }

  const breakdown = selected ? confidenceBreakdown(selected.company) : [];
  const computedScore = breakdown.reduce((sum, row) => sum + (row.earned ? row.points : 0), 0);
  const actionLog = selected ? parseActionLog(selected.notes) : [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">

      {/* Status filter pills */}
      <div className="mb-5 flex flex-wrap gap-2">
        {QUEUE_STATUSES.map((s) => {
          const count = statusCounts[s] ?? 0;
          const active = statusFilter === s;
          return (
            <button
              key={s}
              onClick={() => changeFilter(setStatusFilter, active ? "" : s)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                STATUS_COLORS[s] ?? "bg-slate-100 text-slate-600"
              } ${active ? "ring-2 ring-slate-400 ring-offset-1" : "opacity-80 hover:opacity-100"}`}
            >
              {s.replace(/_/g, " ")}
              {count > 0 && <span className="ml-1.5 opacity-70">({count})</span>}
            </button>
          );
        })}
        {statusFilter && (
          <button
            onClick={() => changeFilter(setStatusFilter, "")}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-400 hover:text-slate-700 transition"
          >
            Clear ×
          </button>
        )}
      </div>

      {/* Dropdowns */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          value={stateFilter}
          onChange={(e) => changeFilter(setStateFilter, e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <option value="">All states</option>
          {AU_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => changeFilter(setCategoryFilter, e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>

        <span className="ml-auto text-sm text-slate-400">
          {loading ? "Loading…" : `${total} item${total !== 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-left">
            <tr>
              {["Company", "Category", "State", "Source", "Status", "Score", "Added", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center text-slate-400">
                  {loading ? "Loading…" : "No items in queue"}
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer transition hover:bg-slate-50"
                onClick={() => openPanel(item)}
              >
                <td className="px-4 py-3 font-semibold text-slate-900">{item.company.name}</td>
                <td className="px-4 py-3 text-slate-500">{item.company.main_category?.name ?? "—"}</td>
                <td className="px-4 py-3 text-slate-500">{item.company.locations[0]?.state ?? "—"}</td>
                <td className="px-4 py-3 text-slate-400">{item.source ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      STATUS_COLORS[item.status] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`font-bold ${
                      item.company.confidence_score >= 60
                        ? "text-emerald-700"
                        : item.company.confidence_score >= 30
                        ? "text-amber-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.company.confidence_score}
                  </span>
                  <span className="text-slate-300">/100</span>
                </td>
                <td className="px-4 py-3 text-slate-400">{fmtDate(item.created_at)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); openPanel(item); }}
                    className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-400">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 disabled:opacity-40 transition hover:bg-slate-50"
            >
              Previous
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 disabled:opacity-40 transition hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ── Review panel (slide-over) ──────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/25" onClick={() => setSelected(null)} />

          {/* Panel */}
          <div className="relative flex w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl">

            {/* Panel header */}
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div className="min-w-0 flex-1 pr-4">
                <p className="truncate text-xl font-bold text-slate-950">{selected.company.name}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      STATUS_COLORS[selected.status] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {selected.status.replace(/_/g, " ")}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">
                    {selected.company.profile_status.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-slate-300">·</span>
                  <span className="text-xs text-slate-400">{selected.company.status}</span>
                  <a
                    href={`/directory/company/${selected.company.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    View profile ↗
                  </a>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">

              {/* Company details */}
              <Section title="Company Details">
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                  <DetailRow label="ABN" value={selected.company.abn} />
                  <DetailRow label="Email" value={selected.company.email} />
                  <DetailRow label="Phone" value={selected.company.phone} />
                  <DetailRow label="Website" value={selected.company.website} isLink />
                  <DetailRow label="Google Business" value={selected.company.google_business_url} isLink />
                  <DetailRow
                    label="Year est."
                    value={selected.company.year_established?.toString() ?? null}
                  />
                  <DetailRow label="Claimed" value={selected.company.is_claimed ? "Yes" : "No"} />
                </div>
                {selected.company.description && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {selected.company.description}
                  </p>
                )}
              </Section>

              {/* Confidence score */}
              <Section
                title={
                  <span>
                    Confidence Score{" "}
                    <span
                      className={`ml-1 font-bold ${
                        computedScore >= 60
                          ? "text-emerald-700"
                          : computedScore >= 30
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {computedScore} / 100
                    </span>
                  </span>
                }
              >
                <div className="space-y-2">
                  {breakdown.map((row) => (
                    <div key={row.label} className="flex items-center gap-3 text-sm">
                      <span
                        className={`w-5 text-center text-base font-bold ${
                          row.earned ? "text-emerald-500" : "text-slate-300"
                        }`}
                      >
                        {row.earned ? "✓" : "✗"}
                      </span>
                      <span className="flex-1 text-slate-700">{row.label}</span>
                      <span
                        className={`tabular-nums text-xs font-semibold ${
                          row.earned ? "text-emerald-600" : "text-slate-300"
                        }`}
                      >
                        {row.earned ? `+${row.points}` : `+0`} pts
                      </span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Location */}
              {selected.company.locations.length > 0 && (
                <Section title="Location">
                  {selected.company.locations.map((loc) => (
                    <div key={loc.id} className="text-sm text-slate-700">
                      <p className="font-medium">{loc.address}</p>
                      <p className="text-slate-500">
                        {[loc.suburb, loc.city, loc.state, loc.postcode].filter(Boolean).join(", ")}
                      </p>
                      {loc.services_nationwide && (
                        <p className="mt-1 text-xs font-semibold text-emerald-600">Services nationwide</p>
                      )}
                      {loc.services_statewide && !loc.services_nationwide && (
                        <p className="mt-1 text-xs font-semibold text-sky-600">Services statewide</p>
                      )}
                    </div>
                  ))}
                </Section>
              )}

              {/* Licences */}
              {selected.company.licences.length > 0 && (
                <Section title="Licences">
                  <div className="space-y-2">
                    {selected.company.licences.map((lic) => (
                      <div
                        key={lic.id}
                        className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-semibold text-slate-800">
                            {lic.licence_number}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              lic.status === "verified"
                                ? "bg-emerald-100 text-emerald-700"
                                : lic.status === "expired"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {lic.status}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {[lic.licence_class, lic.licence_authority, lic.licence_state]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Categories */}
              {selected.company.company_categories.length > 0 && (
                <Section title="Categories">
                  <div className="flex flex-wrap gap-2">
                    {selected.company.company_categories.map((cc) => (
                      <span
                        key={cc.id}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          cc.is_primary
                            ? "bg-slate-900 text-white"
                            : cc.is_approved
                            ? "bg-slate-100 text-slate-700"
                            : "border border-dashed border-slate-300 text-slate-400"
                        }`}
                      >
                        {cc.category.name}
                        {cc.is_primary && " ★"}
                        {!cc.is_approved && " ⏳"}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Tags */}
              {selected.company.company_tags.length > 0 && (
                <Section title="Tags">
                  <div className="flex flex-wrap gap-2">
                    {selected.company.company_tags.map((ct) => (
                      <span
                        key={ct.id}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          ct.tag.tag_type === "service"
                            ? "bg-sky-100 text-sky-700"
                            : ct.tag.tag_type === "defect"
                            ? "bg-rose-100 text-rose-700"
                            : ct.tag.tag_type === "repair_system"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-slate-100 text-slate-600"
                        } ${!ct.is_approved ? "opacity-60" : ""}`}
                      >
                        {ct.tag.name}
                        {!ct.is_approved && " ⏳"}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Queue info */}
              <Section title="Queue Info">
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                  <DetailRow label="Queue ID" value={`#${selected.id}`} />
                  <DetailRow label="Source" value={selected.source} />
                  <DetailRow label="Added" value={fmtDate(selected.created_at)} />
                  <DetailRow label="Last reviewed" value={fmtDate(selected.reviewed_at)} />
                  {selected.reviewer && (
                    <DetailRow
                      label="Reviewed by"
                      value={selected.reviewer.full_name || selected.reviewer.email}
                    />
                  )}
                </div>
              </Section>

              {/* Action log */}
              {actionLog.length > 0 && (
                <Section title="Action History">
                  <div className="space-y-3">
                    {actionLog.map((entry, i) => (
                      <div key={i} className="border-l-2 border-slate-100 pl-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              STATUS_COLORS[entry.action] ?? "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {entry.action.replace(/_/g, " ")}
                          </span>
                          <span className="text-xs text-slate-400">{fmtDateTime(entry.ts)}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-400">{entry.actor}</p>
                        {entry.note && (
                          <p className="mt-1 text-xs italic text-slate-500">"{entry.note}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {/* Action bar (sticky) */}
            <div className="border-t border-slate-100 bg-white px-6 py-4">
              <textarea
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                placeholder="Optional note (logged with action)…"
                rows={2}
                className="mb-3 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              {actionError && (
                <p className="mb-2 text-xs font-medium text-red-600">{actionError}</p>
              )}
              <div className="flex flex-wrap gap-2">
                <ActionButton
                  label="Approve"
                  action="approve"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                  onAction={handleAction}
                  loading={actionLoading}
                />
                <ActionButton
                  label="Needs Review"
                  action="needs_review"
                  className="bg-amber-500 text-white hover:bg-amber-600"
                  onAction={handleAction}
                  loading={actionLoading}
                />
                <ActionButton
                  label="Needs Recheck"
                  action="needs_recheck"
                  className="bg-orange-500 text-white hover:bg-orange-600"
                  onAction={handleAction}
                  loading={actionLoading}
                />
                <ActionButton
                  label="Reject"
                  action="reject"
                  className="bg-red-600 text-white hover:bg-red-700"
                  onAction={handleAction}
                  loading={actionLoading}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</h3>
      {children}
    </section>
  );
}

function DetailRow({
  label,
  value,
  isLink,
}: {
  label: string;
  value: string | null | undefined;
  isLink?: boolean;
}) {
  return (
    <>
      <span className="whitespace-nowrap text-slate-400">{label}</span>
      {!value ? (
        <span className="text-slate-300">—</span>
      ) : isLink ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-indigo-600 hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="text-slate-800">{value}</span>
      )}
    </>
  );
}

function ActionButton({
  label,
  action,
  className,
  onAction,
  loading,
}: {
  label: string;
  action: string;
  className: string;
  onAction: (action: string) => void;
  loading: boolean;
}) {
  return (
    <button
      disabled={loading}
      onClick={() => onAction(action)}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${className}`}
    >
      {loading ? "…" : label}
    </button>
  );
}
