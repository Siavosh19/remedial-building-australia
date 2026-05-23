"use client";

import { useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import { ScopeShell } from "@/components/scope-builder/ScopeShell";
import { MATERIALS } from "@/lib/scope-builder-data";

export default function MaterialsLibraryPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterUV, setFilterUV] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(MATERIALS.map((m) => m.category))).sort(),
  ];

  const filtered = MATERIALS.filter((m) => {
    if (filterCategory !== "All" && m.category !== filterCategory) return false;
    if (
      filterLocation !== "All" &&
      m.location !== filterLocation &&
      m.location !== "Both"
    )
      return false;
    if (filterUV === "UV Exposed" && !m.uvExposed) return false;
    if (filterUV === "Sheltered" && m.uvExposed) return false;
    const q = search.toLowerCase();
    if (
      q &&
      !`${m.brand} ${m.productName} ${m.category} ${m.suitableSystem} ${m.compatibleSubstrate}`
        .toLowerCase()
        .includes(q)
    )
      return false;
    return true;
  });

  return (
    <ScopeShell activePath="/ai-scope-builder">
      <main className="mx-auto max-w-6xl px-5 py-12">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/ai-scope-builder"
            className="mb-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-sky-950 transition"
          >
            ← Scope Builder
          </a>
          <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">
            AI Scope Builder
          </div>
          <h1 className="mt-1 text-3xl font-extrabold text-sky-950">
            Materials Library
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Placeholder product data — {MATERIALS.length} products. Replace this with your Supabase database or imported Excel file.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-52">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search brand, product, system or substrate…"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-sky-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-sky-950 outline-none focus:border-sky-500"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-sky-950 outline-none focus:border-sky-500"
          >
            {["All", "Internal", "External", "Both"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <select
            value={filterUV}
            onChange={(e) => setFilterUV(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-sky-950 outline-none focus:border-sky-500"
          >
            {["All", "UV Exposed", "Sheltered"].map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
          <span className="self-center text-xs font-semibold text-slate-400">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((m) => {
            const isExpanded = expanded === m.id;
            return (
              <div
                key={m.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : m.id)}
                  className="flex w-full flex-col gap-2 p-5 text-left"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-red-700">
                        {m.brand}
                      </div>
                      <div className="text-sm font-extrabold text-sky-950">
                        {m.productName}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-end">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          m.location === "External"
                            ? "bg-sky-100 text-sky-700"
                            : m.location === "Internal"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {m.location}
                      </span>
                      {m.uvExposed && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                          UV
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500">
                    {m.category}
                  </span>

                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-600">System:</span>{" "}
                    {m.suitableSystem}
                  </div>
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-600">Substrate:</span>{" "}
                    {m.compatibleSubstrate}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-3 space-y-3">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        Application Notes
                      </div>
                      <p className="text-xs text-slate-600 leading-5">
                        {m.applicationNotes}
                      </p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        Limitations
                      </div>
                      <p className="text-xs text-slate-600 leading-5">
                        {m.limitations}
                      </p>
                    </div>
                    <a
                      href={m.tdsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-sky-950 px-4 py-2 text-xs font-bold text-white hover:bg-sky-800 transition"
                    >
                      View TDS <ExternalLink size={11} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-sm text-slate-400">
            No products match your filters.
          </div>
        )}

        {/* Info banner */}
        <div className="mt-12 rounded-2xl border border-sky-100 bg-sky-50 p-5">
          <p className="text-sm font-bold text-sky-950">
            Using your own product database
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            This library uses placeholder data from{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">
              lib/scope-builder-data.ts
            </code>
            . To use your own products, replace the{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">
              MATERIALS
            </code>{" "}
            array with a Supabase query or imported Excel data. The{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">
              Material
            </code>{" "}
            type in{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">
              lib/scope-builder-types.ts
            </code>{" "}
            defines all required fields.
          </p>
        </div>
      </main>
    </ScopeShell>
  );
}
