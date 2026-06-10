"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  Search, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Plus, Minus,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProductRow {
  id: string;
  name: string;
  brand: string;
  productType: string;
  filterTags: string[];
  pageUrl: string;
  categoryLabel: string;
  topSection: string;
}

export interface DropdownOptions {
  brands: string[];
  materialTypes: string[];
  applications: string[];
  repairPages: { label: string; url: string; section: string }[];
}

interface Props {
  products: ProductRow[];
  dropdowns: DropdownOptions;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const SECTION_LABELS: Record<string, string> = {
  "Balcony Waterproofing Failure": "Balcony Waterproofing",
  "Basement Water Ingress": "Basement Waterproofing",
  "Facade External Envelope": "Facade & External Envelope",
  "Internal Defects Finishes": "Internal Defects & Finishes",
  "Mechanical Ventilation Exhaust": "Mechanical Ventilation",
  "Penetrating Damp": "Penetrating Damp",
  "Rising Damp": "Rising Damp",
  "Roofing Defects": "Roofing Defects",
  "Sealants Joint Systems": "Sealants & Joints",
  "Services Drainage": "Services & Drainage",
};

function sectionLabel(s: string) {
  return SECTION_LABELS[s] ?? s;
}
function formatTag(t: string) {
  return t.replace(/-/g, " ");
}

// ── SearchableSelect ──────────────────────────────────────────────────────────

interface SelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}

function SearchableSelect({ options, value, onChange, placeholder, className = "" }: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  const filtered = useMemo(() => {
    if (!search) return options;
    const q = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, search]);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  function select(v: string) {
    onChange(v);
    setOpen(false);
    setSearch("");
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-10 w-full items-center justify-between gap-2 rounded-lg border px-3 text-sm transition ${
          value
            ? "border-sky-400 bg-sky-50 text-sky-900 font-medium"
            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
        }`}
      >
        <span className="truncate">{selectedLabel ?? placeholder}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full min-w-[200px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          {/* Search */}
          <div className="border-b border-slate-100 p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="max-h-60 overflow-y-auto">
            {/* Clear row */}
            <button
              type="button"
              onClick={() => select("")}
              className="w-full px-3 py-2 text-left text-xs text-slate-400 hover:bg-slate-50 transition"
            >
              All {placeholder.toLowerCase()}s
            </button>

            {filtered.length === 0 ? (
              <div className="px-3 py-3 text-center text-xs text-slate-400">No results</div>
            ) : (
              filtered.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => select(o.value)}
                  title={o.label}
                  className={`w-full px-3 py-2 text-left text-xs transition ${
                    o.value === value
                      ? "bg-sky-50 font-semibold text-sky-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-sky-700"
                  }`}
                >
                  {o.label.length > 70 ? o.label.slice(0, 68) + "…" : o.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── GroupedSearchableSelect (for Repair System Page) ──────────────────────────

interface RepairPageOption {
  label: string;
  url: string;
  section: string;
}

interface GroupedSelectProps {
  options: RepairPageOption[];
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

function GroupedSearchableSelect({ options, value, onChange, className = "" }: GroupedSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  // Group options by section
  const groups = useMemo(() => {
    const map = new Map<string, RepairPageOption[]>();
    for (const o of options) {
      const sec = sectionLabel(o.section);
      if (!map.has(sec)) map.set(sec, []);
      map.get(sec)!.push(o);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [options]);

  // When searching, show flat filtered list; when not, show grouped
  const searchQ = search.trim().toLowerCase();
  const flatFiltered = useMemo(() => {
    if (!searchQ) return [];
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(searchQ) ||
        sectionLabel(o.section).toLowerCase().includes(searchQ)
    );
  }, [options, searchQ]);

  const selectedLabel = options.find((o) => o.url === value)?.label;
  const selectedSection = options.find((o) => o.url === value);

  function select(url: string) {
    onChange(url);
    setOpen(false);
    setSearch("");
  }

  function toggleSection(sec: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(sec)) next.delete(sec);
      else next.add(sec);
      return next;
    });
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-10 w-full items-center justify-between gap-2 rounded-lg border px-3 text-sm transition ${
          value
            ? "border-sky-400 bg-sky-50 text-sky-900 font-medium"
            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
        }`}
      >
        <span className="truncate">
          {selectedLabel
            ? selectedLabel
            : "Repair System Page"}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full min-w-[240px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          {/* Search */}
          <div className="border-b border-slate-100 p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pages…"
                className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="max-h-72 overflow-y-auto">
            {/* Clear */}
            <button
              type="button"
              onClick={() => select("")}
              className="w-full px-3 py-2 text-left text-xs text-slate-400 hover:bg-slate-50 transition"
            >
              All repair system pages
            </button>

            {searchQ ? (
              /* ── Flat search results ── */
              flatFiltered.length === 0 ? (
                <div className="px-3 py-3 text-center text-xs text-slate-400">No results</div>
              ) : (
                flatFiltered.map((o) => (
                  <button
                    key={o.url}
                    type="button"
                    onClick={() => select(o.url)}
                    className={`w-full px-3 py-1.5 text-left text-xs transition ${
                      o.url === value
                        ? "bg-sky-50 font-semibold text-sky-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-sky-700"
                    }`}
                  >
                    <span className="block font-medium">{o.label}</span>
                    <span className="block text-[10px] text-slate-400">{sectionLabel(o.section)}</span>
                  </button>
                ))
              )
            ) : (
              /* ── Grouped view ── */
              groups.map(([sec, pages]) => {
                const isExpanded = expanded.has(sec);
                return (
                  <div key={sec}>
                    {/* Section header */}
                    <button
                      type="button"
                      onClick={() => toggleSection(sec)}
                      className="flex w-full items-center justify-between border-t border-slate-100 px-3 py-2 text-left transition hover:bg-slate-50"
                    >
                      <span className="text-xs font-semibold text-slate-700">{sec}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                          {pages.length}
                        </span>
                        {isExpanded ? (
                          <Minus className="h-3.5 w-3.5 text-slate-400" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 text-slate-400" />
                        )}
                      </span>
                    </button>

                    {/* Pages (only when expanded) */}
                    {isExpanded &&
                      pages.map((o) => (
                        <button
                          key={o.url}
                          type="button"
                          onClick={() => select(o.url)}
                          className={`w-full py-1.5 pl-6 pr-3 text-left text-xs transition ${
                            o.url === value
                              ? "bg-sky-50 font-semibold text-sky-700"
                              : "text-slate-600 hover:bg-slate-50 hover:text-sky-700"
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Paginator ─────────────────────────────────────────────────────────────────

function Paginator({
  page, total, pageSize, onChange,
}: { page: number; total: number; pageSize: number; onChange: (p: number) => void }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const pages: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex items-center gap-1 rounded border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Previous
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-1 text-xs text-slate-400">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`h-8 w-8 rounded text-xs font-semibold transition ${
              p === page ? "bg-sky-700 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex items-center gap-1 rounded border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
      >
        Next <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function MaterialsIndexClient({ products, dropdowns }: Props) {
  const [query, setQuery] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterApp, setFilterApp] = useState("");
  const [filterPage, setFilterPage] = useState("");
  const [page, setPage] = useState(1);

  const q = query.trim().toLowerCase();
  const hasFilters = query || filterBrand || filterType || filterApp || filterPage;

  // Pre-compute option arrays for non-grouped selects
  const brandOptions = useMemo(
    () => dropdowns.brands.map((b) => ({ value: b, label: b })),
    [dropdowns.brands]
  );
  const typeOptions = useMemo(
    () => dropdowns.materialTypes.map((t) => ({ value: t, label: t })),
    [dropdowns.materialTypes]
  );
  const appOptions = useMemo(
    () => dropdowns.applications.map((a) => ({ value: a, label: formatTag(a) })),
    [dropdowns.applications]
  );

  const filtered = useMemo(() => {
    let list = products;
    if (filterBrand) list = list.filter((p) => p.brand === filterBrand);
    if (filterType)  list = list.filter((p) => p.productType === filterType);
    if (filterApp)   list = list.filter((p) => p.filterTags.includes(filterApp));
    if (filterPage)  list = list.filter((p) => p.pageUrl === filterPage);
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.productType.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.topSection.toLowerCase().includes(q) ||
          p.filterTags.some((t) => t.toLowerCase().includes(q.replace(/\s+/g, "-")))
      );
    }
    return list;
  }, [products, filterBrand, filterType, filterApp, filterPage, q]);

  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, filtered.length);

  function reset() {
    setQuery(""); setFilterBrand(""); setFilterType("");
    setFilterApp(""); setFilterPage(""); setPage(1);
  }

  const changePage = useCallback((p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      {/* ── Filter bar ── */}
      <section className="border-b border-slate-200 bg-white px-8 py-5">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end gap-3">

            {/* General search */}
            <div className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search materials or products…"
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100 transition"
              />
            </div>

            {/* Brand */}
            <SearchableSelect
              options={brandOptions}
              value={filterBrand}
              onChange={(v) => { setFilterBrand(v); setPage(1); }}
              placeholder="Brand"
              className="min-w-[165px]"
            />

            {/* Material Type */}
            <SearchableSelect
              options={typeOptions}
              value={filterType}
              onChange={(v) => { setFilterType(v); setPage(1); }}
              placeholder="Material Type"
              className="min-w-[170px]"
            />

            {/* Application */}
            <SearchableSelect
              options={appOptions}
              value={filterApp}
              onChange={(v) => { setFilterApp(v); setPage(1); }}
              placeholder="Applications"
              className="min-w-[155px]"
            />

            {/* Repair System Page — grouped */}
            <GroupedSearchableSelect
              options={dropdowns.repairPages}
              value={filterPage}
              onChange={(v) => { setFilterPage(v); setPage(1); }}
              className="min-w-[195px]"
            />

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={reset}
                className="flex h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
              >
                <X className="h-4 w-4" /> Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Table ── */}
      <section className="mx-auto max-w-7xl px-8 py-6">
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Material / Product", "Brand", "Material Type", "Repair System Page", "Applications"].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 ${
                        ["w-[24%]", "w-[17%]", "w-[20%]", "w-[20%]", "w-[19%]"][i]
                      }`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-sm text-slate-400">
                    No products match your current filters.{" "}
                    <button onClick={reset} className="text-sky-600 hover:underline">Clear filters</button>
                  </td>
                </tr>
              ) : (
                visible.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-slate-900 leading-snug">{p.name}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-slate-700">{p.brand}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="line-clamp-2 text-xs leading-snug text-slate-600" title={p.productType}>
                        {p.productType || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <a
                        href={p.pageUrl}
                        className="line-clamp-2 text-xs font-medium leading-snug text-sky-700 hover:text-sky-900 hover:underline"
                      >
                        {p.categoryLabel}
                      </a>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.filterTags.slice(0, 4).map((t) => (
                          <span key={t} className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 whitespace-nowrap">
                            {formatTag(t)}
                          </span>
                        ))}
                        {p.filterTags.length > 4 && (
                          <span className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-400">
                            +{p.filterTags.length - 4}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination row */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {filtered.length === 0
              ? "No materials found"
              : `Showing ${from} to ${to} of ${filtered.length.toLocaleString()} material${filtered.length !== 1 ? "s" : ""}`}
          </p>
          <Paginator page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={changePage} />
        </div>
      </section>
    </div>
  );
}
