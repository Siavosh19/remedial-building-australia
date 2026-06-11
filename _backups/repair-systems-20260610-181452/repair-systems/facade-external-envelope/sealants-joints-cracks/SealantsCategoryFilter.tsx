"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Search, X } from "lucide-react";

type Category = { label: string; count: number; href: string };
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

export default function SealantsCategoryFilter({ groups }: { groups: Group[] }) {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");

  const q = search.trim();

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

  const totalHits = filteredGroups.reduce((n, g) => n + g.categories.length, 0);
  const totalCategories = groups.reduce((n, g) => n + g.categories.length, 0);
  const isFiltering = q !== "" || activeGroup !== "All";

  return (
    <section className="px-8 py-14">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Categories</h2>
            <p className="mt-1 text-sm text-slate-500">{totalCategories} product categories across {groups.length} groups — search by category name or filter by group.</p>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-lg">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search product categories…"
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

        {isFiltering && (
          <p className="mb-6 text-sm font-semibold text-slate-500">
            {totalHits} {totalHits === 1 ? "category" : "categories"} match
            {q && <span className="ml-1 text-slate-400">for &ldquo;{q}&rdquo;</span>}
          </p>
        )}

        {filteredGroups.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-8 py-14 text-center">
            <p className="text-sm font-semibold text-slate-400">No categories match your search.</p>
            <button
              onClick={() => { setSearch(""); setActiveGroup("All"); }}
              className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-sky-700 hover:bg-slate-50 transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
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
                      key={cat.href}
                      href={cat.href}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                    >
                      <div className="mb-3 h-0.5 w-8 rounded-full bg-red-700" />
                      <h3 className="text-base font-extrabold leading-tight text-sky-950 group-hover:text-sky-700 transition">
                        {highlight(cat.label, q)}
                      </h3>
                      <p className="mt-2 text-xs font-semibold text-slate-400">{cat.count} product systems</p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 group-hover:text-red-700 transition">
                        View systems <ArrowRight size={12} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
