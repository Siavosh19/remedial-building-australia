"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { getVisibleWorkItemGroups } from "@/lib/scope-builder-work-items";

interface Props {
  constructionTypes: string[];
  selectedItems: string[];
  onToggle: (id: string) => void;
  customItems: string[];
  onAddCustom: (label: string) => void;
  onRemoveCustom: (idx: number) => void;
}

export function WorkItemSelector({
  constructionTypes,
  selectedItems,
  onToggle,
  customItems,
  onAddCustom,
  onRemoveCustom,
}: Props) {
  const [customInput, setCustomInput] = useState("");

  const visibleGroups = getVisibleWorkItemGroups(constructionTypes);

  function handleAddCustom() {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    onAddCustom(trimmed);
    setCustomInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustom();
    }
  }

  return (
    <div className="space-y-8">
      {visibleGroups.map((group) => {
        const groupSelectedCount = group.items.filter((item) =>
          selectedItems.includes(item.id)
        ).length;

        return (
          <div key={group.id}>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-red-700" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-950">
                  {group.label}
                </h3>
              </div>
              {groupSelectedCount > 0 && (
                <span className="rounded-full bg-sky-950 px-2.5 py-0.5 text-[10px] font-bold text-white">
                  {groupSelectedCount} selected
                </span>
              )}
            </div>

            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
              {group.items.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition ${
                      isSelected
                        ? "bg-sky-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(item.id)}
                      className="h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 accent-sky-950"
                    />
                    <span
                      className={`text-sm ${
                        isSelected
                          ? "font-semibold text-sky-950"
                          : "text-slate-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Custom work items */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-4 w-1 rounded-full bg-red-700" />
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-950">
            Custom Work Items
          </h3>
        </div>
        <p className="mb-3 text-xs text-slate-500">
          Add any work items not covered in the lists above.
        </p>

        {customItems.length > 0 && (
          <div className="mb-3 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
            {customItems.map((label, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <span className="text-sm font-semibold text-sky-950">
                  {label}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveCustom(idx)}
                  className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Fire door replacement — levels 3–8"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
          />
          <button
            type="button"
            onClick={handleAddCustom}
            disabled={!customInput.trim()}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-sky-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={15} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
