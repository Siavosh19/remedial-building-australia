"use client";

import { CheckCircle2, Circle, Wrench } from "lucide-react";
import type { RepairSystem, Defect } from "@/lib/scope-builder-types";

interface Props {
  systems: RepairSystem[];
  selected: string[];
  onToggle: (id: string) => void;
  defects: Defect[];
}

export function RepairSystemSelector({ systems, selected, onToggle, defects }: Props) {
  const defectCategories = defects.map((d) => d.category);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {systems.map((system) => {
        const isSelected = selected.includes(system.id);
        const isRecommended = system.suitableFor.some((cat) =>
          defectCategories.includes(cat)
        );

        return (
          <button
            key={system.id}
            type="button"
            onClick={() => onToggle(system.id)}
            className={`group flex flex-col gap-3 rounded-2xl border p-5 text-left transition ${
              isSelected
                ? "border-sky-950 bg-sky-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/40"
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Wrench
                  size={14}
                  className={`shrink-0 ${isSelected ? "text-sky-950" : "text-slate-400"}`}
                />
                <span
                  className={`text-sm font-extrabold leading-tight ${
                    isSelected ? "text-sky-950" : "text-slate-700"
                  }`}
                >
                  {system.name}
                </span>
              </div>
              {isSelected ? (
                <CheckCircle2 size={18} className="shrink-0 text-sky-950" />
              ) : (
                <Circle size={18} className="shrink-0 text-slate-300 group-hover:text-slate-400" />
              )}
            </div>

            {/* Recommended badge */}
            {isRecommended && (
              <span className="w-fit rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">
                Recommended for your defects
              </span>
            )}

            {/* Description */}
            <p className="text-xs leading-5 text-slate-500">{system.description}</p>

            {/* Suitable for */}
            <div className="flex flex-wrap gap-1">
              {system.suitableFor.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Process steps — show when selected */}
            {isSelected && (
              <ol className="mt-1 space-y-1 border-t border-sky-100 pt-3">
                {system.process.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky-950 text-[9px] font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            )}

            {/* Considerations — show when selected */}
            {isSelected && (
              <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
                ⚠ {system.considerations}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
