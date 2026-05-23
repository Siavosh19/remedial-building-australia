"use client";

import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp, Camera } from "lucide-react";
import type { Defect, DefectCategory, Severity } from "@/lib/scope-builder-types";
import { DEFECT_CATEGORIES } from "@/lib/scope-builder-data";

const SEVERITY_CONFIG: Record<Severity, { label: string; active: string }> = {
  Minor:    { label: "Minor",    active: "border-slate-500 bg-slate-500 text-white" },
  Moderate: { label: "Moderate", active: "border-amber-500 bg-amber-500 text-white" },
  Severe:   { label: "Severe",   active: "border-orange-600 bg-orange-600 text-white" },
  Critical: { label: "Critical", active: "border-red-700 bg-red-700 text-white" },
};

const SUSPECTED_CAUSES = [
  "End-of-life / exceeded service life",
  "Poor original workmanship",
  "Inadequate detailing",
  "Movement / thermal cycling",
  "Mechanical damage",
  "UV degradation",
  "Chemical attack",
  "Chloride-induced corrosion (marine exposure)",
  "Carbonation of concrete cover",
  "Blocked or inadequate drainage",
  "Structural movement",
  "Not yet determined — investigation required",
];

const INPUT_CLS =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition";
const LABEL_CLS = "mb-1 block text-xs font-bold uppercase tracking-wider text-slate-400";

interface Props {
  defect: Defect;
  index: number;
  onUpdate: (defect: Defect) => void;
  onRemove: () => void;
}

export function DefectModuleCard({ defect, index, onUpdate, onRemove }: Props) {
  const [expanded, setExpanded] = useState(true);

  function set<K extends keyof Defect>(key: K, value: Defect[K]) {
    onUpdate({ ...defect, [key]: value });
  }

  const categories = Object.keys(DEFECT_CATEGORIES) as DefectCategory[];
  const defectTypes = DEFECT_CATEGORIES[defect.category] ?? [];

  const severityColor =
    defect.severity === "Critical"
      ? "bg-red-100 text-red-700"
      : defect.severity === "Severe"
      ? "bg-orange-100 text-orange-700"
      : defect.severity === "Moderate"
      ? "bg-amber-100 text-amber-700"
      : "bg-slate-100 text-slate-500";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Card header — click to expand/collapse */}
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-700 text-xs font-extrabold text-white">
            {index + 1}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-extrabold text-sky-950">
              {defect.defectType || (
                <span className="italic text-slate-400">Untitled Defect</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{defect.category}</span>
              {defect.severity && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${severityColor}`}>
                  {defect.severity}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
            title="Remove defect"
          >
            <Trash2 size={14} />
          </button>
          {expanded ? (
            <ChevronUp size={16} className="text-slate-400" />
          ) : (
            <ChevronDown size={16} className="text-slate-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Category */}
            <div>
              <label className={LABEL_CLS}>Defect Category</label>
              <select
                value={defect.category}
                onChange={(e) => {
                  set("category", e.target.value as DefectCategory);
                  set("defectType", "");
                }}
                className={INPUT_CLS}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Defect Type */}
            <div>
              <label className={LABEL_CLS}>Defect Type</label>
              <select
                value={defect.defectType}
                onChange={(e) => set("defectType", e.target.value)}
                className={INPUT_CLS}
              >
                <option value="">— Select type —</option>
                {defectTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <label className={LABEL_CLS}>Location / Area Affected</label>
              <input
                type="text"
                value={defect.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="e.g. Level 3 balconies, Units 301–308; roof deck podium Level 1"
                className={INPUT_CLS}
              />
            </div>

            {/* Severity */}
            <div>
              <label className={LABEL_CLS}>Severity</label>
              <div className="flex gap-2">
                {(Object.keys(SEVERITY_CONFIG) as Severity[]).map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => set("severity", sev)}
                    className={`flex-1 rounded-lg border px-2 py-2 text-xs font-bold transition ${
                      defect.severity === sev
                        ? SEVERITY_CONFIG[sev].active
                        : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className={LABEL_CLS}>Quantity / Extent</label>
              <input
                type="text"
                value={defect.quantity}
                onChange={(e) => set("quantity", e.target.value)}
                placeholder="e.g. 85m², 12 locations, 45 lin.m"
                className={INPUT_CLS}
              />
            </div>

            {/* Suspected Cause */}
            <div>
              <label className={LABEL_CLS}>Suspected Cause</label>
              <select
                value={defect.suspectedCause}
                onChange={(e) => set("suspectedCause", e.target.value)}
                className={INPUT_CLS}
              >
                <option value="">— Select cause —</option>
                {SUSPECTED_CAUSES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className="sm:col-span-2">
              <label className={LABEL_CLS}>Additional Notes</label>
              <textarea
                value={defect.notes}
                onChange={(e) => set("notes", e.target.value)}
                rows={2}
                placeholder="History, previous repairs, observations, or further investigation items…"
                className={INPUT_CLS}
              />
            </div>

            {/* Photo placeholder */}
            <div className="sm:col-span-2">
              <label className={LABEL_CLS}>Photo Reference</label>
              <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-400">
                <Camera size={18} className="shrink-0 text-slate-300" />
                <span>Photo upload — coming soon. Attach site photos to your scope report.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
