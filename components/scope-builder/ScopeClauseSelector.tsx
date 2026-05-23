"use client";

import { CheckSquare, Square } from "lucide-react";
import type { ScopeClause } from "@/lib/scope-builder-types";

interface Props {
  clauses: ScopeClause[];
  selected: string[];
  onToggle: (id: string) => void;
  onToggleCategory: (category: string) => void;
}

export function ScopeClauseSelector({
  clauses,
  selected,
  onToggle,
  onToggleCategory,
}: Props) {
  const categories = Array.from(new Set(clauses.map((c) => c.category)));

  return (
    <div className="space-y-5">
      {categories.map((cat) => {
        const catClauses = clauses.filter((c) => c.category === cat);
        const selectedCount = catClauses.filter((c) =>
          selected.includes(c.id)
        ).length;
        const allSelected = selectedCount === catClauses.length;

        return (
          <div
            key={cat}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-sky-950">{cat}</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  {selectedCount}/{catClauses.length}
                </span>
                <button
                  type="button"
                  onClick={() => onToggleCategory(cat)}
                  className="text-xs font-bold text-sky-700 hover:text-red-700 transition"
                >
                  {allSelected ? "Deselect all" : "Select all"}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              {catClauses.map((clause) => {
                const isSelected = selected.includes(clause.id);
                return (
                  <button
                    key={clause.id}
                    type="button"
                    onClick={() => onToggle(clause.id)}
                    className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                      isSelected
                        ? "border-sky-200 bg-sky-50"
                        : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {isSelected ? (
                      <CheckSquare
                        size={14}
                        className="mt-0.5 shrink-0 text-sky-950"
                      />
                    ) : (
                      <Square
                        size={14}
                        className="mt-0.5 shrink-0 text-slate-300"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-sky-950">
                        {clause.title}
                      </div>
                      <div className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-slate-400">
                        {clause.content}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
