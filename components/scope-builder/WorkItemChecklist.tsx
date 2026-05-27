"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getChecklist } from "@/lib/scope-builder-checklists";
import type { WorkItemState } from "@/lib/scope-builder-types";

interface Props {
  workItemId: string;
  workItemLabel: string;
  state: WorkItemState;
  onChange: (state: WorkItemState) => void;
}

const EMPTY_STATE: WorkItemState = { checked: [], quantities: {}, notes: "" };

export function WorkItemChecklist({
  workItemId,
  workItemLabel,
  state,
  onChange,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const checklist = getChecklist(workItemId);

  // Count checkable items
  const totalCheckable = checklist
    ? checklist.sections
        .flatMap((s) => s.items)
        .filter((item) => !item.isNote).length
    : 0;
  const checkedCount = (state.checked ?? []).length;

  function toggleItem(id: string) {
    const current = state.checked ?? [];
    const next = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id];
    onChange({ ...state, checked: next });
  }

  function setQuantity(id: string, value: string) {
    onChange({
      ...state,
      quantities: { ...(state.quantities ?? {}), [id]: value },
    });
  }

  function setNotes(value: string) {
    onChange({ ...state, notes: value });
  }

  const summaryText =
    checklist && totalCheckable > 0
      ? `${checkedCount} of ${totalCheckable} items checked`
      : "No checklist — add notes below";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
      >
        <div className="min-w-0">
          <p className="text-sm font-bold text-sky-950 leading-snug">
            {workItemLabel}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">{summaryText}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {checklist && totalCheckable > 0 && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                checkedCount === totalCheckable && totalCheckable > 0
                  ? "bg-green-100 text-green-700"
                  : checkedCount > 0
                  ? "bg-sky-100 text-sky-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {checkedCount}/{totalCheckable}
            </span>
          )}
          {expanded ? (
            <ChevronUp size={16} className="text-slate-400" />
          ) : (
            <ChevronDown size={16} className="text-slate-400" />
          )}
        </div>
      </button>

      {/* Body — collapsible */}
      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4">
          {checklist ? (
            <div className="space-y-6">
              {checklist.sections.map((section) => (
                <div key={section.title}>
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {section.title}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      if (item.isNote) {
                        return (
                          <div key={item.id} className="pt-1">
                            <label className="mb-1 block text-xs font-semibold text-slate-500">
                              {item.label}
                            </label>
                            <textarea
                              value={state.quantities?.[item.id] ?? ""}
                              onChange={(e) =>
                                setQuantity(item.id, e.target.value)
                              }
                              rows={3}
                              placeholder="Enter notes here…"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
                            />
                          </div>
                        );
                      }

                      const isChecked = (state.checked ?? []).includes(item.id);
                      return (
                        <label
                          key={item.id}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2 transition ${
                            isChecked ? "bg-sky-50" : "hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleItem(item.id)}
                            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 accent-sky-950"
                          />
                          <div className="min-w-0 flex-1">
                            <span
                              className={`text-sm ${
                                isChecked
                                  ? "font-semibold text-sky-950"
                                  : "text-slate-700"
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.hasQuantity && isChecked && (
                              <div className="mt-1.5 flex items-center gap-2">
                                <input
                                  type="text"
                                  value={state.quantities?.[item.id] ?? ""}
                                  onChange={(e) =>
                                    setQuantity(item.id, e.target.value)
                                  }
                                  placeholder="Quantity"
                                  className="w-28 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-sky-950 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-100 transition"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                {item.quantityLabel && (
                                  <span className="text-xs text-slate-400">
                                    {item.quantityLabel}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mb-3 text-xs text-slate-400">
              No checklist available for this work item. Add notes below.
            </p>
          )}

          {/* Notes textarea — always shown */}
          <div className={checklist ? "mt-6 border-t border-slate-100 pt-4" : ""}>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Notes / Special Conditions
            </label>
            <textarea
              value={state.notes ?? ""}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any specific requirements, locations, or consultant instructions for this work item…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
            />
          </div>
        </div>
      )}
    </div>
  );
}
