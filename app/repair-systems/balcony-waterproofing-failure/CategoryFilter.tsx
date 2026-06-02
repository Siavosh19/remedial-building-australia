"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Search, X, Package } from "lucide-react";
import { PRODUCT_INDEX, type ProductEntry } from "./productSearchIndex";

type Category = { label: string; count: number; slug: string };
type Group = { heading: string; categories: Category[] };

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-yellow-100 px-0.5 text-yellow-900">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function CategoryFilter({ groups }: { groups: Group[] }) {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");

  const q = search.trim();

  // ── Category-level results ────────────────────────────────────────────────
  const filteredGroups = useMemo(() => {
    return groups
      .filter((g) => activeGroup === "All" || g.heading === activeGroup)
      .map((g) => ({
        ...g,
        categories: g.categories.filter((c) =>
          !q || c.label.toLowerCase().includes(q.toLowerCase())
        ),
      }))
      .filter((g) => g.categories.length > 0);
  }, [groups, search, activeGroup]);

  // ── Product-level results (only when searching, no group filter applied) ──
  const productResults = useMemo((): ProductEntry[] => {
    if (!q || q.length < 2) return [];
    const ql = q.toLowerCase();
    return PRODUCT_INDEX.filter((p) => {
      const groupMatch = activeGroup === "All" || groups
        .find((g) => g.heading === activeGroup)
        ?.categories.some((c) => c.slug === p.categorySlug);
      if (!groupMatch) return false;
      return (
        p.name.toLowerCase().includes(ql) ||
        p.brand.toLowerCase().includes(ql) ||
        p.keywords.some((k) => k.toLowerCase().includes(ql))
      );
    });
  }, [search, activeGroup]);

  const totalCategoryHits = filteredGroups.reduce((n, g) => n + g.categories.length, 0);
  const isFiltering = q !== "" || activeGroup !== "All";

  return (
    <section className="px-8 py-14">
      <div className="mx-auto max-w-7xl">

        {/* ── Section header ── */}
        <div className="mb-8 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Categories</h2>
            <p className="mt-1 text-sm text-slate-500">27 product categories across {PRODUCT_INDEX.length} products — search by product name, brand or keyword.</p>
          </div>
        </div>

        {/* ── Search + filter bar ── */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-lg">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search categories, products, brands or keywords…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm font-medium text-sky-950 shadow-sm placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100 transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:text-slate-600 transition"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", ...groups.map((g) => g.heading)].map((label) => (
              <button
                key={label}
                onClick={() => setActiveGroup(label)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] transition ${
                  activeGroup === label
                    ? "bg-red-700 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-500 hover:border-sky-200 hover:text-sky-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Product-level results ── */}
        {productResults.length > 0 && (
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <Package size={15} className="text-red-700 shrink-0" />
              <span className="text-sm font-bold text-sky-950">
                {productResults.length} product{productResults.length !== 1 ? "s" : ""} found
              </span>
              <span className="text-xs text-slate-400">— click to go to that product category</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {productResults.map((p, i) => (
                <a
                  key={i}
                  href={`/repair-systems/balcony-waterproofing-failure/${p.categorySlug}`}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                >
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-700" />
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold leading-tight text-sky-950 group-hover:text-sky-700 transition">
                      {highlight(p.name, q)}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-400">
                      {highlight(p.brand, q)}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {p.categoryLabel} <ArrowRight size={10} className="inline" />
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── Category-level results summary ── */}
        {isFiltering && (
          <p className="mb-6 text-sm font-semibold text-slate-500">
            {totalCategoryHits} {totalCategoryHits === 1 ? "category" : "categories"} match
            {q && <span className="ml-1 text-slate-400">for &ldquo;{q}&rdquo;</span>}
          </p>
        )}

        {/* ── Category cards ── */}
        {filteredGroups.length === 0 && productResults.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-8 py-14 text-center">
            <p className="text-sm font-semibold text-slate-400">No categories or products match your search.</p>
            <button
              onClick={() => { setSearch(""); setActiveGroup("All"); }}
              className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-sky-700 hover:bg-slate-50 transition"
            >
              Clear filters
            </button>
          </div>
        ) : filteredGroups.length > 0 ? (
          <div className="space-y-12">
            {filteredGroups.map((group) => (
              <div key={group.heading}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-red-700" />
                  <span className="text-base font-bold uppercase tracking-[0.2em] text-sky-950">{group.heading}</span>
                  <span className="h-px flex-1 bg-red-700" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.categories.map((cat) => (
                    <a
                      key={cat.slug}
                      href={`/repair-systems/balcony-waterproofing-failure/${cat.slug}`}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                    >
                      <div className="mb-3 h-0.5 w-8 rounded-full bg-red-700" />
                      <h3 className="text-base font-extrabold leading-tight text-sky-950 group-hover:text-sky-700 transition">
                        {highlight(cat.label, q)}
                      </h3>
                      <p className="mt-2 text-xs font-semibold text-slate-400">{cat.count} products</p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 group-hover:text-red-700 transition">
                        View systems <ArrowRight size={12} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
