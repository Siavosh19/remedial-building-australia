"use client";

import { Check } from "lucide-react";
import { CONSTRUCTION_TYPE_GROUPS } from "@/lib/scope-builder-work-items";

interface Props {
  selected: string[];
  onToggle: (id: string) => void;
}

export function ConstructionTypeSelector({ selected, onToggle }: Props) {
  return (
    <div className="space-y-8">
      {CONSTRUCTION_TYPE_GROUPS.map((group) => (
        <div key={group.id}>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-4 w-1 rounded-full bg-red-700" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-950">
              {group.label}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {group.items.map((item) => {
              const isSelected = selected.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onToggle(item.id)}
                  className={`relative flex min-h-[80px] flex-col items-start justify-between rounded-xl border p-3 text-left transition ${
                    isSelected
                      ? "border-sky-950 bg-sky-950 text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                  }`}
                >
                  <span className="text-xs font-semibold leading-snug">
                    {item.label}
                  </span>
                  {isSelected && (
                    <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
