"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Wrench } from "lucide-react";
import { ScopeShell } from "@/components/scope-builder/ScopeShell";
import { REPAIR_SYSTEMS, DEFECT_CATEGORIES } from "@/lib/scope-builder-data";
import type { DefectCategory } from "@/lib/scope-builder-types";

const ALL_CATEGORIES = Object.keys(DEFECT_CATEGORIES) as DefectCategory[];

export default function RepairSystemsPage() {
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = REPAIR_SYSTEMS.filter(
    (rs) =>
      filterCategory === "All" ||
      rs.suitableFor.includes(filterCategory as DefectCategory)
  );

  return (
    <ScopeShell activePath="/ai-scope-builder">
      <main className="mx-auto max-w-5xl px-5 py-12">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/ai-scope-builder"
            className="mb-3 inline-flex items-center gap-1 text-lg font-bold uppercase tracking-wider text-slate-900 hover:text-black transition"
          >
            ← Scope Builder
          </a>
          <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">
            AI Scope Builder
          </div>
          <h1 className="mt-1 text-3xl font-extrabold text-sky-950">
            Repair Systems Reference
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {REPAIR_SYSTEMS.length} repair systems available. Filter by defect category.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilterCategory("All")}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold transition ${
              filterCategory === "All"
                ? "border-sky-950 bg-sky-950 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
            }`}
          >
            All Systems
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold transition ${
                filterCategory === cat
                  ? "border-sky-950 bg-sky-950 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Repair system cards */}
        <div className="space-y-4">
          {filtered.map((rs) => {
            const isExpanded = expanded === rs.id;
            return (
              <div
                key={rs.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : rs.id)}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                >
                  <div className="flex items-start gap-3">
                    <Wrench
                      size={16}
                      className="mt-0.5 shrink-0 text-red-700"
                    />
                    <div>
                      <div className="text-base font-extrabold text-sky-950">
                        {rs.name}
                      </div>
                      <p className="mt-1 text-sm text-slate-500 leading-5">
                        {rs.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {rs.suitableFor.map((cat) => (
                          <span
                            key={cat}
                            className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp
                      size={18}
                      className="shrink-0 text-slate-400 mt-0.5"
                    />
                  ) : (
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-slate-400 mt-0.5"
                    />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-6 pb-6 pt-4 grid gap-5 sm:grid-cols-2">
                    {/* Process */}
                    <div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Process Steps
                      </div>
                      <ol className="space-y-2">
                        {rs.process.map((step, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-slate-700"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-950 text-[10px] font-extrabold text-white">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Considerations */}
                    <div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Key Considerations
                      </div>
                      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
                        {rs.considerations}
                      </div>

                      {/* Suitable defect types */}
                      <div className="mt-4">
                        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                          Suitable For
                        </div>
                        <div className="space-y-1">
                          {rs.suitableFor.map((cat) => {
                            const types = DEFECT_CATEGORIES[cat] ?? [];
                            return (
                              <div key={cat}>
                                <div className="text-xs font-semibold text-slate-600">
                                  {cat}
                                </div>
                                <div className="ml-2 mt-0.5 flex flex-wrap gap-1">
                                  {types.slice(0, 4).map((t) => (
                                    <span
                                      key={t}
                                      className="rounded border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-500"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-sm text-slate-400">
            No repair systems match this filter.
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="/ai-scope-builder/new"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-800"
          >
            Use in a New Scope →
          </a>
          <a
            href="/ai-scope-builder/materials"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Browse Materials Library
          </a>
        </div>
      </main>
    </ScopeShell>
  );
}
