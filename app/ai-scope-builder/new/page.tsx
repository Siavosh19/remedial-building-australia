"use client";

import { useState, useMemo, useEffect } from "react";
import {
  ArrowRight, ArrowLeft, AlertCircle, FileText, Printer,
  ChevronDown, ChevronUp, Plus, X, Check,
} from "lucide-react";
import { ScopeShell } from "@/components/scope-builder/ScopeShell";
import { ProjectSetupForm } from "@/components/scope-builder/ProjectSetupForm";
import { WorkItemChecklist } from "@/components/scope-builder/WorkItemChecklist";
import { WORK_ITEM_GROUPS, PRELIMINARY_CLAUSES } from "@/lib/scope-builder-work-items";
import {
  AREA_GROUPS,
  getSuggestedWorkItems,
  ACCESS_CONSTRAINTS,
  COMPLIANCE_TRIGGERS,
  INVESTIGATIONS,
} from "@/lib/scope-builder-areas-v3";
import type {
  ProjectDataV2,
  WorkItemState,
  DefectEntryV3,
  AreaStateV3,
  SavedProjectV3,
} from "@/lib/scope-builder-types";

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_PROJECT: ProjectDataV2 = {
  buildingName: "",
  address: "",
  suburb: "",
  state: "NSW",
  buildingClass: "Class 2 residential strata",
  storeys: "",
  yearOfConstruction: "",
  coastal: false,
  occupied: true,
  hazmat: false,
  hazmatNotes: "",
  consultantName: "",
  reportDate: "",
  aiNotes: "",
};

const STEPS = ["Project", "Areas", "Defects", "Work Items", "Access & Context", "Review"];

const SEVERITY_OPTIONS = ["Minor", "Moderate", "Widespread", "Severe", "Safety Critical"] as const;
const EXTENT_OPTIONS = ["Localised", "Moderate extent", "Widespread"] as const;

const OUTPUT_FORMAT_OPTIONS = [
  { id: "consultant", label: "Consultant Scope", description: "Technical scope with methodology, hold points and QA" },
  { id: "tender", label: "Tender Document", description: "Formal tender with schedule of rates" },
  { id: "strata", label: "Strata Plain-Language", description: "Plain-language summary for owners and committees" },
  { id: "methodology", label: "Methodology Statement", description: "Method statement only — no commercial content" },
  { id: "builder", label: "Builder Scope", description: "Scope formatted for builders to price" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getWorkItemLabel(id: string): string {
  for (const group of WORK_ITEM_GROUPS) {
    const item = group.items.find((i) => i.id === id);
    if (item) return item.label;
  }
  return id;
}

function renderMarkdown(md: string): string {
  try {
    return md
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/^## (.+)$/gm, '<h2 class="mt-8 mb-3 text-lg font-extrabold text-sky-950 border-b border-slate-200 pb-2">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="mt-6 mb-2 text-base font-bold text-sky-950">$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4 class="mt-4 mb-1 text-sm font-bold text-slate-700">$1</h4>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-slate-700 leading-6">$1</li>')
      .replace(/(<li[^>]*>.*?<\/li>\n?)+/g, (m) => `<ul class="my-2 space-y-0.5">${m}</ul>`)
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-slate-700 leading-6">$1</li>')
      .replace(/^---$/gm, '<hr class="my-6 border-slate-200" />')
      .replace(/^⚠(.+)$/gm, '<div class="my-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">⚠$1</div>')
      .replace(/\n\n+/g, '\n\n')
      .split("\n\n")
      .map((block) => {
        if (/^<[huldp\s/]/.test(block.trim())) return block;
        return `<p class="mt-3 text-slate-700 leading-7">${block.trim()}</p>`;
      })
      .join("\n");
  } catch {
    return `<p class="mt-3 text-slate-700 leading-7">${md.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`;
  }
}

// ─── Step bar ─────────────────────────────────────────────────────────────────

function StepBar({ step }: { step: number }) {
  return (
    <div className="mb-10 flex items-center overflow-x-auto pb-1">
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const active = step === idx;
        const done = step > idx;
        return (
          <div key={label} className="flex flex-1 items-center min-w-0">
            <div className="flex flex-col items-center shrink-0">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold transition-colors ${
                done ? "bg-red-700 text-white" : active ? "bg-sky-950 text-white" : "bg-slate-100 text-slate-400"
              }`}>
                {done ? "✓" : idx}
              </div>
              <span className={`mt-1 hidden text-[10px] font-semibold uppercase tracking-wider sm:block whitespace-nowrap ${
                active ? "text-sky-950" : done ? "text-red-700" : "text-slate-400"
              }`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 transition-colors ${done ? "bg-red-700" : "bg-slate-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── DefectDetailPanel ────────────────────────────────────────────────────────

function DefectDetailPanel({
  defectId,
  entry,
  probableCauses,
  onChange,
}: {
  defectId: string;
  entry: DefectEntryV3;
  probableCauses: string[];
  onChange: (updated: DefectEntryV3) => void;
}) {
  function set<K extends keyof DefectEntryV3>(key: K, value: DefectEntryV3[K]) {
    onChange({ ...entry, [key]: value });
  }

  return (
    <div className="mt-3 rounded-xl border border-sky-100 bg-sky-50 p-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Severity
          </label>
          <div className="flex flex-wrap gap-1.5">
            {SEVERITY_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set("severity", s)}
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold transition border ${
                  entry.severity === s
                    ? s === "Safety Critical" || s === "Severe"
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-sky-800 bg-sky-800 text-white"
                    : "border-slate-200 bg-white text-slate-500 hover:border-sky-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Extent
          </label>
          <div className="flex flex-wrap gap-1.5">
            {EXTENT_OPTIONS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => set("extent", e as DefectEntryV3["extent"])}
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold transition border ${
                  entry.extent === e
                    ? "border-sky-800 bg-sky-800 text-white"
                    : "border-slate-200 bg-white text-slate-500 hover:border-sky-300"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Probable Cause
        </label>
        <select
          value={entry.probableCause}
          onChange={(e) => set("probableCause", e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-sky-950 outline-none focus:border-sky-500"
        >
          <option value="">Select probable cause…</option>
          {probableCauses.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
          <option value="Unknown / to be investigated">Unknown / to be investigated</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Notes (location, quantity, observations)
        </label>
        <input
          type="text"
          value={entry.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="e.g. Levels 3–8 west elevation, approx 40 locations"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-sky-950 outline-none focus:border-sky-500"
        />
      </div>
    </div>
  );
}

// ─── WorkItemRow ──────────────────────────────────────────────────────────────

function WorkItemRow({
  item,
  checked,
  suggested,
  state,
  onToggle,
  onStateChange,
}: {
  item: { id: string; label: string };
  checked: boolean;
  suggested: boolean;
  state: WorkItemState;
  onToggle: () => void;
  onStateChange: (s: WorkItemState) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`rounded-xl border transition ${checked ? "border-sky-200 bg-sky-50" : "border-slate-100 bg-white hover:border-slate-200"}`}>
      <div className="flex items-center gap-3 p-3">
        <button
          type="button"
          onClick={onToggle}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
            checked ? "border-sky-700 bg-sky-700" : "border-slate-300 bg-white hover:border-sky-400"
          }`}
        >
          {checked && <Check size={12} className="text-white" />}
        </button>
        <span className={`flex-1 text-sm ${checked ? "font-semibold text-sky-950" : "text-slate-600"}`}>
          {item.label}
        </span>
        {suggested && !checked && (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-700 border border-amber-200 shrink-0">
            Suggested
          </span>
        )}
        {checked && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-[10px] font-bold text-sky-600 hover:text-sky-800 shrink-0"
          >
            Detail {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        )}
      </div>
      {checked && expanded && (
        <div className="border-t border-sky-100 px-3 pb-3">
          <WorkItemChecklist
            workItemId={item.id}
            workItemLabel={item.label}
            state={state}
            onChange={onStateChange}
          />
        </div>
      )}
    </div>
  );
}

// ─── Work item units for tender schedule ─────────────────────────────────────

const WORK_ITEM_UNITS: Record<string, string> = {
  // balcony-terrace
  "bal-wp-full": "m²", "bal-wp-local": "m²", "bal-tile-floor": "m²",
  "bal-tile-skirting": "lm", "bal-screed-replace": "m²", "bal-screed-retain": "m²",
  "bal-falls": "m²", "bal-spall-soffit": "m²", "bal-spall-top": "m²",
  "bal-spall-spandrel": "lm", "bal-spall-column": "nr", "bal-cavity-flash": "lm",
  "bal-door-replace": "nr", "bal-hob-new": "lm", "bal-hob-makegood": "lm",
  "bal-balustrade-replace": "lm", "bal-balustrade-reinstate": "lm",
  "bal-privacy-screen": "nr", "bal-parapet-replace": "lm", "bal-divwall-replace": "m²",
  "bal-perimeter-hob": "lm", "bal-spitters": "nr", "bal-demtech": "lm",
  "bal-exp-joint": "lm", "bal-penetration-plinths": "nr", "bal-outlet-replace": "nr",
  "bal-door-protect": "nr", "bal-anti-carbonation": "m²",
  // roof-flat
  "roof-mem-full": "m²", "roof-mem-overlay": "m²", "roof-mem-local": "m²",
  "roof-perimeter-hob": "lm", "roof-overflow-scupper": "nr", "roof-anchor": "nr",
  "roof-vent-plinth": "nr", "roof-aerial": "nr", "roof-coating": "m²",
  "roof-asbestos-enc": "m²", "roof-cemintel": "m²", "roof-colorbond-capping": "lm",
  "roof-rwh-replace": "nr", "roof-dp-replace-flat": "nr",
  // roof-pitched
  "roof-tile-full": "m²", "roof-tile-local": "m²", "roof-ridge-cap": "lm",
  "roof-sarking": "m²", "roof-valley": "lm", "roof-flash-ridge": "lm",
  "roof-flash-penetrations": "nr", "roof-gutter-replace": "lm",
  "roof-fascia-replace": "lm", "roof-dp-replace-pitched": "nr", "roof-eaves-replace": "m²",
  // facade-masonry
  "fac-repoint": "m²", "fac-brick-replace": "m²", "fac-archbar": "nr",
  "fac-cavity-flash": "lm", "fac-render-repair": "m²", "fac-render-full": "m²",
  "fac-wp-render": "m²", "fac-sealant-joints": "lm", "fac-sealant-windows": "nr",
  "fac-window-replace": "nr", "fac-cladding-fc": "m²", "fac-cladding-panel": "m²",
  "fac-spalling": "m²", "fac-anti-carbonation": "m²", "fac-salt-treatment": "m²",
  // painting
  "paint-masonry": "m²", "paint-metal": "m²", "paint-timber": "m²",
  "paint-eaves": "m²", "paint-slab-edges": "m²", "paint-bal-soffit": "m²",
  "paint-fascia": "lm", "paint-dp-pvc": "nr", "paint-doors": "nr",
  "paint-slab-edge-wp": "m²", "paint-waterblast": "m²",
  // below-grade
  "bg-wp-negative": "m²", "bg-wp-positive": "m²", "bg-crack-injection": "lm",
  "bg-drainage-channel": "lm", "bg-sump-pump": "nr", "bg-exp-joint": "lm",
  "bg-spall-soffit": "m²", "bg-spall-walls": "m²", "bg-coating-floor": "m²",
  // plumbing-drainage
  "pl-dp-full": "nr", "pl-dp-local": "nr", "pl-gutter-full": "lm",
  "pl-stormwater": "Sum", "pl-fire-collar": "nr", "pl-drainage-pit": "nr",
  "pl-sewer-makegood": "Sum",
  // other-structures
  "planter-wp-full": "m²", "planter-wp-local": "m²",
  "planter-outlet": "nr", "planter-lining": "m²",
  // site-prelims
  "site-scaffold-full": "Wks", "site-scaffold-tower": "Wks",
  "site-rope-access": "Wks", "site-ewp": "Wks", "site-hoarding": "lm",
  "site-dilapidation": "Sum", "site-traffic": "Wks", "site-asbestos-swms": "Sum",
  "site-regulated-design": "Sum", "site-demolition": "Sum", "site-establishment": "Sum",
};

// ─── TenderSchedule ───────────────────────────────────────────────────────────

function TenderSchedule({
  projectData,
  selectedWorkItems,
  customWorkItems,
  workItemStates,
}: {
  projectData: ProjectDataV2;
  selectedWorkItems: string[];
  customWorkItems: string[];
  workItemStates: Record<string, WorkItemState>;
}) {
  const selectedSet = new Set(selectedWorkItems);

  const sections = WORK_ITEM_GROUPS
    .map((group) => ({
      ...group,
      rows: group.items.filter((item) => selectedSet.has(item.id)),
    }))
    .filter((g) => g.rows.length > 0);

  let counter = 0;
  const sectionsWithNums = sections.map((section) => ({
    ...section,
    rows: section.rows.map((item) => {
      const state = workItemStates[item.id];
      const qty =
        state?.notes?.match(/\d[\d,.]*(?:\s*m²|\s*lm|\s*nr|\s*no\.?)?/i)?.[0] ??
        Object.values(state?.quantities ?? {}).find(Boolean) ??
        "";
      return { ...item, num: ++counter, qty };
    }),
  }));
  const customStart = counter;

  return (
    <div className="mt-10 border-t-4 border-sky-950 pt-8 print-area">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-red-700">Schedule of Rates</div>
          <h2 className="mt-1 text-xl font-extrabold text-sky-950">Tender Schedule</h2>
          <p className="mt-0.5 text-sm text-slate-500">{projectData.buildingName || projectData.address}</p>
        </div>
        <div className="text-right text-xs text-slate-400">
          {projectData.consultantName && <div className="font-semibold text-slate-600">{projectData.consultantName}</div>}
          <div>{projectData.address}</div>
        </div>
      </div>

      <p className="mb-6 text-xs text-slate-500 leading-5">
        Tenderers are to insert rates and amounts for all items. Blank items indicate the tenderer is to allow for the full scope described.
        Rates are to be exclusive of GST unless stated otherwise.
      </p>

      {sectionsWithNums.map((section) => (
        <div key={section.id} className="mb-6 overflow-hidden rounded-xl border border-slate-200">
          <div className="bg-sky-950 px-4 py-2.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">{section.label}</h3>
          </div>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50">
                <th className="border-b border-slate-200 px-3 py-2 text-left font-bold text-slate-600 w-10">#</th>
                <th className="border-b border-slate-200 px-3 py-2 text-left font-bold text-slate-600">Description</th>
                <th className="border-b border-slate-200 px-3 py-2 text-center font-bold text-slate-600 w-14">Unit</th>
                <th className="border-b border-slate-200 px-3 py-2 text-center font-bold text-slate-600 w-20">Qty</th>
                <th className="border-b border-slate-200 px-3 py-2 text-right font-bold text-slate-600 w-28">Rate (ex. GST)</th>
                <th className="border-b border-slate-200 px-3 py-2 text-right font-bold text-slate-600 w-28">Amount (ex. GST)</th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-2.5 text-slate-500">{item.num}</td>
                  <td className="px-3 py-2.5 text-slate-700 leading-5">{item.label}</td>
                  <td className="px-3 py-2.5 text-center text-slate-500">{WORK_ITEM_UNITS[item.id] ?? "Sum"}</td>
                  <td className="px-3 py-2.5 text-center text-slate-500">{item.qty || <span className="text-slate-300">—</span>}</td>
                  <td className="border-l border-slate-100 px-3 py-2.5 text-right text-slate-300">$</td>
                  <td className="border-l border-slate-100 px-3 py-2.5 text-right text-slate-300">$</td>
                </tr>
              ))}
              <tr className="bg-slate-50 border-t-2 border-slate-200">
                <td colSpan={5} className="px-3 py-2 text-right text-xs font-bold text-slate-600 uppercase tracking-wide">
                  {section.label} — Section Total
                </td>
                <td className="border-l border-slate-200 px-3 py-2 text-right text-slate-300">$</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      {customWorkItems.length > 0 && (
        <div className="mb-6 overflow-hidden rounded-xl border border-slate-200">
          <div className="bg-sky-950 px-4 py-2.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">Custom Work Items</h3>
          </div>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50">
                <th className="border-b border-slate-200 px-3 py-2 text-left font-bold text-slate-600 w-10">#</th>
                <th className="border-b border-slate-200 px-3 py-2 text-left font-bold text-slate-600">Description</th>
                <th className="border-b border-slate-200 px-3 py-2 text-center font-bold text-slate-600 w-14">Unit</th>
                <th className="border-b border-slate-200 px-3 py-2 text-center font-bold text-slate-600 w-20">Qty</th>
                <th className="border-b border-slate-200 px-3 py-2 text-right font-bold text-slate-600 w-28">Rate (ex. GST)</th>
                <th className="border-b border-slate-200 px-3 py-2 text-right font-bold text-slate-600 w-28">Amount (ex. GST)</th>
              </tr>
            </thead>
            <tbody>
              {customWorkItems.map((label, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-2.5 text-slate-500">{customStart + idx + 1}</td>
                  <td className="px-3 py-2.5 text-slate-700 leading-5">{label}</td>
                  <td className="px-3 py-2.5 text-center text-slate-500">Sum</td>
                  <td className="px-3 py-2.5 text-center text-slate-300">—</td>
                  <td className="border-l border-slate-100 px-3 py-2.5 text-right text-slate-300">$</td>
                  <td className="border-l border-slate-100 px-3 py-2.5 text-right text-slate-300">$</td>
                </tr>
              ))}
              <tr className="bg-slate-50 border-t-2 border-slate-200">
                <td colSpan={5} className="px-3 py-2 text-right text-xs font-bold text-slate-600 uppercase tracking-wide">
                  Custom Items — Section Total
                </td>
                <td className="border-l border-slate-200 px-3 py-2 text-right text-slate-300">$</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Summary */}
      <div className="mb-8 flex justify-end">
        <table className="w-72 border-collapse text-xs">
          <tbody>
            <tr>
              <td className="rounded-tl-xl border border-slate-200 bg-white px-4 py-2.5 font-bold text-slate-700">Subtotal (ex. GST)</td>
              <td className="rounded-tr-xl border border-slate-200 bg-white px-4 py-2.5 text-right text-slate-400 w-28">$</td>
            </tr>
            <tr>
              <td className="border border-slate-200 bg-slate-50 px-4 py-2.5 font-bold text-slate-700">GST (10%)</td>
              <td className="border border-slate-200 bg-slate-50 px-4 py-2.5 text-right text-slate-400">$</td>
            </tr>
            <tr>
              <td className="rounded-bl-xl border-2 border-sky-950 bg-sky-950 px-4 py-3 text-sm font-extrabold text-white">TOTAL (inc. GST)</td>
              <td className="rounded-br-xl border-2 border-sky-950 bg-sky-950 px-4 py-3 text-right text-sm font-extrabold text-white">$</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tenderer Declaration */}
      <div className="rounded-2xl border-2 border-slate-200 p-6">
        <div className="mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">Tenderer Declaration</div>
        <p className="mb-6 text-xs leading-5 text-slate-600">
          I/We confirm that we have read the Scope of Works and understand the full extent of work described herein.
          The rates and prices submitted are firm and all-inclusive of labour, materials, plant, equipment, insurances,
          holding points, WHS obligations and all other incidentals required to complete the works to the satisfaction
          of the Superintendent.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {["Company / Trading Name", "ABN", "Contractor's Licence No.", "Contact Name", "Phone", "Email"].map((label) => (
            <div key={label}>
              <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
              <div className="h-9 rounded-xl border border-slate-200 bg-slate-50" />
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Authorised Signature</div>
            <div className="h-20 rounded-xl border border-slate-200 bg-slate-50" />
          </div>
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Print Name &amp; Date</div>
            <div className="h-20 rounded-xl border border-slate-200 bg-slate-50" />
          </div>
        </div>
        <p className="mt-4 text-[10px] leading-4 text-slate-400">
          Tender validity: this tender remains open for acceptance for 60 days from the date of submission, unless extended by written agreement.
        </p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function NewScopePage() {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectDataV2>(DEFAULT_PROJECT);
  const [areas, setAreas] = useState<Record<string, AreaStateV3>>({});
  const [selectedWorkItems, setSelectedWorkItems] = useState<string[]>([]);
  const [customWorkItems, setCustomWorkItems] = useState<string[]>([]);
  const [workItemStates, setWorkItemStates] = useState<Record<string, WorkItemState>>({});
  const [accessConstraints, setAccessConstraints] = useState<string[]>([]);
  const [complianceTriggers, setComplianceTriggers] = useState<string[]>([]);
  const [investigations, setInvestigations] = useState<string[]>([]);
  const [outputFormat, setOutputFormat] = useState("consultant");
  const [consultantNotes, setConsultantNotes] = useState("");
  const [prelimClauses, setPrelimClauses] = useState<string[]>(PRELIMINARY_CLAUSES.map((c) => c.id));
  const [generating, setGenerating] = useState(false);
  const [generatedScope, setGeneratedScope] = useState("");
  const [error, setError] = useState("");
  const [customItemInput, setCustomItemInput] = useState("");
  const [expandedDefects, setExpandedDefects] = useState<Set<string>>(new Set());
  const [showTenderSchedule, setShowTenderSchedule] = useState(false);

  useEffect(() => {
    setProjectData((prev) => ({
      ...prev,
      reportDate: prev.reportDate || new Date().toLocaleDateString("en-CA"),
    }));
  }, []);

  useEffect(() => {
    if (step === 7) setShowTenderSchedule(outputFormat === "tender");
  }, [step, outputFormat]);

  // ── Area helpers ──

  const selectedAreaIds = Object.keys(areas);

  function toggleArea(areaId: string) {
    setAreas((prev) => {
      if (prev[areaId]) {
        const next = { ...prev };
        delete next[areaId];
        return next;
      }
      return { ...prev, [areaId]: { constructionTypes: [], defects: [] } };
    });
  }

  function toggleAreaConstructionType(areaId: string, ctId: string) {
    setAreas((prev) => {
      const area = prev[areaId];
      if (!area) return prev;
      const cts = area.constructionTypes.includes(ctId)
        ? area.constructionTypes.filter((c) => c !== ctId)
        : [...area.constructionTypes, ctId];
      return { ...prev, [areaId]: { ...area, constructionTypes: cts } };
    });
  }

  function toggleAreaDefect(areaId: string, defectId: string, probableCauses: string[]) {
    setAreas((prev) => {
      const area = prev[areaId];
      if (!area) return prev;
      const existing = area.defects.find((d) => d.defectId === defectId);
      const defects = existing
        ? area.defects.filter((d) => d.defectId !== defectId)
        : [
            ...area.defects,
            { defectId, severity: "Moderate" as const, extent: "Localised" as const, probableCause: "", notes: "" },
          ];
      return { ...prev, [areaId]: { ...area, defects } };
    });
    if (!areas[areaId]?.defects.find((d) => d.defectId === defectId)) {
      setExpandedDefects((prev) => new Set(prev).add(defectId));
    } else {
      setExpandedDefects((prev) => { const s = new Set(prev); s.delete(defectId); return s; });
    }
  }

  function updateDefectEntry(areaId: string, defectId: string, entry: DefectEntryV3) {
    setAreas((prev) => {
      const area = prev[areaId];
      if (!area) return prev;
      const defects = area.defects.map((d) => d.defectId === defectId ? entry : d);
      return { ...prev, [areaId]: { ...area, defects } };
    });
  }

  // ── All selected defect IDs ──

  const allDefectIds = useMemo(
    () => Object.values(areas).flatMap((a) => a.defects.map((d) => d.defectId)),
    [areas]
  );

  const suggestedWorkItems = useMemo(() => getSuggestedWorkItems(allDefectIds), [allDefectIds]);

  // ── Advance to step 4 — auto-select suggested items ──

  function advanceToStep4() {
    setSelectedWorkItems((prev) => {
      const existing = new Set(prev);
      const merged = [...prev];
      for (const id of suggestedWorkItems) {
        if (!existing.has(id)) merged.push(id);
      }
      return merged;
    });
    setStep(4);
  }

  // ── Work item helpers ──

  function toggleWorkItem(id: string) {
    setSelectedWorkItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function updateWorkItemState(id: string, state: WorkItemState) {
    setWorkItemStates((prev) => ({ ...prev, [id]: state }));
  }

  function addCustomItem() {
    const label = customItemInput.trim();
    if (!label) return;
    setCustomWorkItems((prev) => [...prev, label]);
    setCustomItemInput("");
  }

  // ── Visible work item groups for step 4 ──

  const visibleWorkItemGroups = useMemo(() => {
    const suggested = new Set(suggestedWorkItems);
    const selected = new Set(selectedWorkItems);
    return WORK_ITEM_GROUPS.filter((group) => {
      if (group.triggerGroups.includes("*")) return true;
      return group.items.some((item) => suggested.has(item.id) || selected.has(item.id));
    });
  }, [suggestedWorkItems, selectedWorkItems]);

  // ── Toggle access/compliance/investigation ──

  function toggle(list: string[], setList: (v: string[]) => void, id: string) {
    setList(list.includes(id) ? list.filter((i) => i !== id) : [...list, id]);
  }

  // ── Generate ──

  async function generate() {
    setError("");
    setGenerating(true);

    const allWorkItems = [
      ...selectedWorkItems.map((id) => ({ id, label: getWorkItemLabel(id) })),
      ...customWorkItems.map((label, idx) => ({ id: `custom-${idx}`, label })),
    ];

    const areasPayload = Object.entries(areas).map(([areaId, areaState]) => {
      const areaGroup = AREA_GROUPS.find((a) => a.id === areaId);
      return {
        area: areaGroup?.label ?? areaId,
        constructionTypes: areaState.constructionTypes
          .map((ctId) => areaGroup?.constructionTypes.find((c) => c.id === ctId)?.label ?? ctId)
          .filter(Boolean),
        defects: areaState.defects.map((d) => {
          const defOpt = areaGroup?.defects.find((def) => def.id === d.defectId);
          return {
            defect: defOpt?.label ?? d.defectId,
            severity: d.severity,
            extent: d.extent,
            probableCause: d.probableCause || "Not specified",
            notes: d.notes || "",
          };
        }),
      };
    });

    const accessLabels = accessConstraints.map(
      (id) => ACCESS_CONSTRAINTS.find((a) => a.id === id)?.label ?? id
    );
    const complianceLabels = complianceTriggers.map(
      (id) => COMPLIANCE_TRIGGERS.find((c) => c.id === id)?.label ?? id
    );
    const investigationLabels = investigations.map(
      (id) => INVESTIGATIONS.find((i) => i.id === id)?.label ?? id
    );

    const workItemsPayload = allWorkItems.map((item) => ({
      id: item.id,
      label: item.label,
      state: workItemStates[item.id] ?? { checked: [], quantities: {}, notes: "" },
    }));

    try {
      const res = await fetch("/api/generate-scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: 3,
          projectData,
          areas: areasPayload,
          workItems: workItemsPayload,
          accessConstraints: accessLabels,
          complianceTriggers: complianceLabels,
          investigations: investigationLabels,
          outputFormat,
          consultantNotes,
          prelimClauses: PRELIMINARY_CLAUSES.filter((c) => prelimClauses.includes(c.id)).map((c) => c.label),
        }),
      });

      if (!res.ok) {
        let msg = "Generation failed. Please try again.";
        try {
          const errData = await res.json();
          msg = errData.error ?? msg;
        } catch {
          if (res.status === 504 || res.status === 502) {
            msg = "Generation timed out. Please try again.";
          }
        }
        setError(msg);
        setGenerating(false);
        return;
      }

      // V3 returns a streaming text/plain response — read chunks as they arrive
      if (!res.body) {
        setError("No response from server. Please try again.");
        setGenerating(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      if (!fullText || fullText.trim().length < 50) {
        setError("AI returned an empty response. Please try again.");
        setGenerating(false);
        return;
      }

      setGeneratedScope(fullText);
      setStep(7);
      try { saveProject(fullText); } catch { /* localStorage quota — non-fatal */ }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg.toLowerCase().includes("network") || msg.toLowerCase().includes("fetch")
        ? "Network error. Please check your connection and try again."
        : "Generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  function saveProject(scope: string) {
    if (typeof window === "undefined") return;
    const saved: SavedProjectV3 = {
      id: crypto.randomUUID(),
      version: 3,
      projectData,
      areas,
      selectedWorkItems,
      customWorkItems,
      workItemStates,
      accessConstraints,
      complianceTriggers,
      investigations,
      outputFormat,
      consultantNotes,
      prelimClauses,
      generatedScope: scope,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("scope_projects") ?? "[]");
    localStorage.setItem("scope_projects", JSON.stringify([saved, ...existing].slice(0, 50)));
  }

  function handleReset() {
    setStep(1);
    setProjectData(DEFAULT_PROJECT);
    setAreas({});
    setSelectedWorkItems([]);
    setCustomWorkItems([]);
    setWorkItemStates({});
    setAccessConstraints([]);
    setComplianceTriggers([]);
    setInvestigations([]);
    setOutputFormat("consultant");
    setConsultantNotes("");
    setPrelimClauses(PRELIMINARY_CLAUSES.map((c) => c.id));
    setGeneratedScope("");
    setError("");
    setCustomItemInput("");
    setExpandedDefects(new Set());
  }

  // ── Validation ──

  const step1Valid = projectData.address.trim().length > 0;
  const step2Valid = selectedAreaIds.length > 0;
  const step3Valid = allDefectIds.length > 0;
  const step4Valid = selectedWorkItems.length > 0 || customWorkItems.length > 0;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <ScopeShell activePath="/ai-scope-builder">
      <main className="mx-auto max-w-5xl px-5 py-12">

        {step <= 6 && !generating && (
          <div className="no-print mb-8">
            <a href="/ai-scope-builder" className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-sky-950 transition">
              ← Back to Scope Builder
            </a>
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">AI Scope Builder</div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">New Scope of Works</h1>
          </div>
        )}

        {step <= 6 && !generating && <StepBar step={step} />}

        {/* ─── STEP 1: Project Details ─── */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Project Details</h2>
              <p className="mt-1 text-sm text-slate-500">Enter the building and project information. More detail produces a more tailored scope.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ProjectSetupForm data={projectData} onChange={setProjectData} />
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setStep(2)} disabled={!step1Valid}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-40">
                Next: Areas <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Areas & Construction Types ─── */}
        {step === 2 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Building Areas</h2>
              <p className="mt-1 text-sm text-slate-500">Select the areas of the building where defects are present, then choose the construction type for each selected area.</p>
            </div>

            <div className="space-y-4">
              {AREA_GROUPS.map((area) => {
                const isSelected = !!areas[area.id];
                const areaState = areas[area.id];
                return (
                  <div key={area.id} className={`rounded-2xl border transition ${isSelected ? "border-sky-200 shadow-md" : "border-slate-200 bg-white shadow-sm hover:border-slate-300"}`}>
                    <button
                      type="button"
                      onClick={() => toggleArea(area.id)}
                      className="flex w-full items-center gap-4 p-5 text-left"
                    >
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border transition ${
                        isSelected ? "border-sky-700 bg-sky-700" : "border-slate-300 bg-white"
                      }`}>
                        {isSelected && <Check size={14} className="text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-extrabold ${isSelected ? "text-sky-950" : "text-slate-700"}`}>
                          {area.label}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-400">{area.description}</div>
                      </div>
                      {isSelected && areaState.constructionTypes.length > 0 && (
                        <span className="shrink-0 rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold text-sky-700">
                          {areaState.constructionTypes.length} type{areaState.constructionTypes.length !== 1 ? "s" : ""}
                        </span>
                      )}
                    </button>

                    {isSelected && (
                      <div className="border-t border-sky-100 bg-sky-50/50 px-5 pb-5">
                        <p className="mb-3 pt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                          Construction Type — select all that apply
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {area.constructionTypes.map((ct) => {
                            const active = areaState.constructionTypes.includes(ct.id);
                            return (
                              <button
                                key={ct.id}
                                type="button"
                                onClick={() => toggleAreaConstructionType(area.id, ct.id)}
                                className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs transition ${
                                  active ? "border-sky-600 bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
                                }`}
                              >
                                <div className={`h-3.5 w-3.5 shrink-0 rounded-sm border ${active ? "border-white bg-white" : "border-slate-300"}`}>
                                  {active && <Check size={10} className="text-sky-600 -m-px" />}
                                </div>
                                {ct.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-950 transition">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={() => setStep(3)} disabled={!step2Valid}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-40">
                Next: Defects <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: Defects ─── */}
        {step === 3 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Observed Defects</h2>
              <p className="mt-1 text-sm text-slate-500">Select the defects observed in each area. Add severity, extent and probable cause for each.</p>
            </div>

            <div className="space-y-6">
              {selectedAreaIds.map((areaId) => {
                const areaGroup = AREA_GROUPS.find((a) => a.id === areaId);
                if (!areaGroup) return null;
                const areaState = areas[areaId];

                return (
                  <div key={areaId} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 bg-sky-950 px-6 py-4">
                      <div className="h-1.5 w-10 rounded-full bg-red-500" />
                      <h3 className="font-extrabold text-white">{areaGroup.label}</h3>
                      {areaState.constructionTypes.length > 0 && (
                        <span className="ml-auto text-xs text-sky-300">
                          {areaState.constructionTypes
                            .map((ctId) => areaGroup.constructionTypes.find((c) => c.id === ctId)?.label)
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      )}
                    </div>
                    <div className="p-5 space-y-2">
                      {areaGroup.defects.map((defect) => {
                        const selectedEntry = areaState.defects.find((d) => d.defectId === defect.id);
                        const isSelected = !!selectedEntry;
                        const isExpanded = expandedDefects.has(defect.id);

                        return (
                          <div key={defect.id}>
                            <div
                              className={`flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 transition ${
                                isSelected ? "bg-sky-50 border border-sky-200" : "hover:bg-slate-50"
                              }`}
                              onClick={() => toggleAreaDefect(areaId, defect.id, defect.probableCauses)}
                            >
                              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                                isSelected ? "border-sky-700 bg-sky-700" : "border-slate-300 bg-white"
                              }`}>
                                {isSelected && <Check size={11} className="text-white" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className={`text-sm ${isSelected ? "font-semibold text-sky-950" : "text-slate-700"}`}>
                                  {defect.label}
                                </span>
                                {isSelected && selectedEntry && (
                                  <div className="mt-1 flex flex-wrap gap-1.5">
                                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                                      selectedEntry.severity === "Safety Critical" || selectedEntry.severity === "Severe"
                                        ? "bg-red-100 text-red-700" : "bg-sky-100 text-sky-700"
                                    }`}>
                                      {selectedEntry.severity}
                                    </span>
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-600">
                                      {selectedEntry.extent}
                                    </span>
                                    {selectedEntry.notes && (
                                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] text-slate-500 truncate max-w-[200px]">
                                        {selectedEntry.notes}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                              {isSelected && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedDefects((prev) => {
                                      const s = new Set(prev);
                                      if (s.has(defect.id)) s.delete(defect.id); else s.add(defect.id);
                                      return s;
                                    });
                                  }}
                                  className="shrink-0 text-xs font-bold text-sky-600 hover:text-sky-800"
                                >
                                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                              )}
                            </div>
                            {isSelected && isExpanded && selectedEntry && (
                              <DefectDetailPanel
                                defectId={defect.id}
                                entry={selectedEntry}
                                probableCauses={defect.probableCauses}
                                onChange={(updated) => updateDefectEntry(areaId, defect.id, updated)}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-950 transition">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={advanceToStep4} disabled={!step3Valid}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-40">
                Next: Work Items <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: Work Items ─── */}
        {step === 4 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Work Items</h2>
              <p className="mt-1 text-sm text-slate-500">
                Work items have been auto-suggested from your defect selections. Confirm, adjust and expand any item to add quantities and notes.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
                  {selectedWorkItems.length + customWorkItems.length} selected
                </span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">
                  {suggestedWorkItems.length} suggested
                </span>
              </div>
            </div>

            <div className="space-y-5">
              {visibleWorkItemGroups.map((group) => {
                const groupItems = group.items;
                const groupSuggested = new Set(suggestedWorkItems);
                const anyRelevant = groupItems.some(
                  (item) => groupSuggested.has(item.id) || selectedWorkItems.includes(item.id)
                );
                if (!anyRelevant && !group.triggerGroups.includes("*")) return null;

                return (
                  <div key={group.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3 bg-slate-50">
                      <div className="h-1 w-8 rounded-full bg-red-700" />
                      <h3 className="text-sm font-extrabold text-sky-950">{group.label}</h3>
                      <span className="ml-auto text-xs text-slate-400">
                        {groupItems.filter((item) => selectedWorkItems.includes(item.id)).length} / {groupItems.length} selected
                      </span>
                    </div>
                    <div className="divide-y divide-slate-50 p-3 space-y-1">
                      {groupItems.map((item) => (
                        <WorkItemRow
                          key={item.id}
                          item={item}
                          checked={selectedWorkItems.includes(item.id)}
                          suggested={groupSuggested.has(item.id)}
                          state={workItemStates[item.id] ?? { checked: [], quantities: {}, notes: "" }}
                          onToggle={() => toggleWorkItem(item.id)}
                          onStateChange={(s) => updateWorkItemState(item.id, s)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Custom items */}
              {customWorkItems.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3 bg-slate-50">
                    <div className="h-1 w-8 rounded-full bg-red-700" />
                    <h3 className="text-sm font-extrabold text-sky-950">Custom Work Items</h3>
                  </div>
                  <div className="p-3 space-y-1">
                    {customWorkItems.map((label, idx) => {
                      const id = `custom-${idx}`;
                      return (
                        <div key={idx} className="flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 p-3">
                          <Check size={14} className="shrink-0 text-sky-700" />
                          <span className="flex-1 text-sm font-semibold text-sky-950">{label}</span>
                          <button type="button" onClick={() => setCustomWorkItems((prev) => prev.filter((_, i) => i !== idx))}
                            className="text-slate-400 hover:text-red-600 transition">
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add custom item */}
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
                <p className="mb-3 text-xs font-bold text-slate-400">Add custom work item</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customItemInput}
                    onChange={(e) => setCustomItemInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
                    placeholder="e.g. Rectify trip hazard at car park entry"
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-sky-950 outline-none focus:border-sky-500"
                  />
                  <button type="button" onClick={addCustomItem}
                    className="flex items-center gap-1.5 rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-800 transition">
                    <Plus size={14} /> Add
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button onClick={() => setStep(3)} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-950 transition">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={() => setStep(5)} disabled={!step4Valid}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-40">
                Next: Access & Context <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 5: Access & Context ─── */}
        {step === 5 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Access & Scope Context</h2>
              <p className="mt-1 text-sm text-slate-500">Select access constraints, compliance triggers and investigations to include in your scope.</p>
            </div>

            {/* Access Constraints */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1 w-8 rounded-full bg-red-700" />
                <h3 className="text-sm font-extrabold text-sky-950">Access Constraints</h3>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {ACCESS_CONSTRAINTS.map((item) => {
                  const active = accessConstraints.includes(item.id);
                  return (
                    <label key={item.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                      active ? "border-sky-200 bg-sky-50" : "border-slate-100 hover:border-slate-200"
                    }`}>
                      <input type="checkbox" checked={active} onChange={() => toggle(accessConstraints, setAccessConstraints, item.id)}
                        className="h-4 w-4 shrink-0 cursor-pointer rounded accent-sky-950" />
                      <span className={`text-xs ${active ? "font-semibold text-sky-950" : "text-slate-600"}`}>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Compliance Triggers */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1 w-8 rounded-full bg-red-700" />
                <h3 className="text-sm font-extrabold text-sky-950">Compliance Triggers</h3>
              </div>
              <div className="space-y-2">
                {COMPLIANCE_TRIGGERS.map((item) => {
                  const active = complianceTriggers.includes(item.id);
                  return (
                    <label key={item.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                      active ? "border-sky-200 bg-sky-50" : "border-slate-100 hover:border-slate-200"
                    }`}>
                      <input type="checkbox" checked={active} onChange={() => toggle(complianceTriggers, setComplianceTriggers, item.id)}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-sky-950" />
                      <div>
                        <div className={`text-xs ${active ? "font-semibold text-sky-950" : "text-slate-600"}`}>{item.label}</div>
                        <div className="mt-0.5 text-[10px] leading-4 text-slate-400">{item.note}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Recommended Investigations */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1 w-8 rounded-full bg-red-700" />
                <h3 className="text-sm font-extrabold text-sky-950">Recommended Investigations</h3>
              </div>
              <div className="space-y-2">
                {INVESTIGATIONS.map((item) => {
                  const active = investigations.includes(item.id);
                  return (
                    <label key={item.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                      active ? "border-sky-200 bg-sky-50" : "border-slate-100 hover:border-slate-200"
                    }`}>
                      <input type="checkbox" checked={active} onChange={() => toggle(investigations, setInvestigations, item.id)}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-sky-950" />
                      <div>
                        <div className={`text-xs ${active ? "font-semibold text-sky-950" : "text-slate-600"}`}>{item.label}</div>
                        <div className="mt-0.5 text-[10px] leading-4 text-slate-400">{item.purpose}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button onClick={() => setStep(4)} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-950 transition">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={() => setStep(6)}
                className="flex items-center gap-2 rounded-xl bg-sky-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-800">
                Next: Review & Generate <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 6: Review & Generate ─── */}
        {step === 6 && !generating && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-sky-950">Review & Generate</h2>
              <p className="mt-1 text-sm text-slate-500">Add your consultant notes, choose an output format, confirm preliminary clauses, then generate.</p>
            </div>

            {/* Consultant Notes */}
            <div className="mb-6 rounded-2xl border-2 border-sky-950 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <FileText size={16} className="text-sky-950" />
                <p className="text-sm font-extrabold text-sky-950">Consultant Notes</p>
                <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-bold text-red-700">Most important field</span>
              </div>
              <p className="mb-3 text-xs text-slate-500">
                Describe your site findings, investigation results, specific defect locations, prior repair history, and any project-specific context. The more detail here, the more tailored the output.
              </p>
              {projectData.coastal && (
                <div className="mb-3 flex items-start gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2.5">
                  <AlertCircle size={13} className="mt-0.5 shrink-0 text-sky-600" />
                  <p className="text-xs text-sky-700"><span className="font-bold">Coastal modifier active</span> — scope will include marine-grade materials and corrosion protection language.</p>
                </div>
              )}
              {projectData.hazmat && (
                <div className="mb-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5">
                  <AlertCircle size={13} className="mt-0.5 shrink-0 text-amber-600" />
                  <p className="text-xs text-amber-700"><span className="font-bold">Hazardous materials modifier active</span> — scope will include SWMS, ACM handling and safe work procedure language.</p>
                </div>
              )}
              <textarea
                value={consultantNotes}
                onChange={(e) => setConsultantNotes(e.target.value)}
                rows={8}
                placeholder="e.g. Site inspection carried out 14 May 2026. Carbonation testing confirms carbonation front has reached reinforcement level on north and west balconies levels 3–8. Previous repair attempts circa 2018 have failed. Water ingress reported to units 301, 302, 401 and 402. Original torch-on membrane estimated 32 years old — end of service life. Access will require full-face scaffold."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
              />
            </div>

            {/* Output Format */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-extrabold text-sky-950">Output Format</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {OUTPUT_FORMAT_OPTIONS.map((opt) => (
                  <button key={opt.id} type="button" onClick={() => setOutputFormat(opt.id)}
                    className={`rounded-xl border p-3 text-left transition ${
                      outputFormat === opt.id ? "border-sky-950 bg-sky-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                    }`}>
                    <p className={`text-xs font-bold ${outputFormat === opt.id ? "text-white" : "text-sky-950"}`}>{opt.label}</p>
                    <p className={`mt-0.5 text-[10px] leading-relaxed ${outputFormat === opt.id ? "text-sky-200" : "text-slate-400"}`}>{opt.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Preliminary Clauses */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-extrabold text-sky-950">Preliminary Clauses</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setPrelimClauses(PRELIMINARY_CLAUSES.map((c) => c.id))}
                    className="text-[10px] font-bold text-sky-700 hover:text-red-700 transition">Select all</button>
                  <span className="text-[10px] text-slate-300">|</span>
                  <button type="button" onClick={() => setPrelimClauses([])}
                    className="text-[10px] font-bold text-sky-700 hover:text-red-700 transition">Clear</button>
                </div>
              </div>
              <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100">
                {PRELIMINARY_CLAUSES.map((clause) => {
                  const isSelected = prelimClauses.includes(clause.id);
                  return (
                    <label key={clause.id} className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 transition ${isSelected ? "bg-sky-50" : "hover:bg-slate-50"}`}>
                      <input type="checkbox" checked={isSelected} onChange={() => setPrelimClauses((prev) => prev.includes(clause.id) ? prev.filter((c) => c !== clause.id) : [...prev, clause.id])}
                        className="h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 accent-sky-950" />
                      <span className={`text-xs ${isSelected ? "font-semibold text-sky-950" : "text-slate-600"}`}>{clause.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">Summary</p>
              <div className="grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
                <div><span className="font-semibold text-slate-700">Address:</span> {projectData.address || "—"}</div>
                <div><span className="font-semibold text-slate-700">Building Class:</span> {projectData.buildingClass}</div>
                <div><span className="font-semibold text-slate-700">Areas:</span> {selectedAreaIds.map((id) => AREA_GROUPS.find((a) => a.id === id)?.label).join(", ") || "—"}</div>
                <div><span className="font-semibold text-slate-700">Defects:</span> {allDefectIds.length} selected</div>
                <div><span className="font-semibold text-slate-700">Work Items:</span> {selectedWorkItems.length + customWorkItems.length} selected</div>
                <div><span className="font-semibold text-slate-700">Coastal:</span> {projectData.coastal ? "Yes" : "No"}</div>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div className="flex items-center justify-between">
              <button onClick={() => setStep(5)} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-950 transition">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={generate} disabled={generating}
                className="flex items-center gap-2 rounded-xl bg-red-700 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-red-800 disabled:opacity-60">
                Generate Scope <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── Generating ─── */}
        {generating && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="relative mb-6">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-100 border-t-red-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-sky-950" />
              </div>
            </div>
            <h2 className="text-xl font-extrabold text-sky-950">Generating your scope…</h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Assembling your tailored scope from {selectedWorkItems.length + customWorkItems.length} work items and {allDefectIds.length} defects. This takes 20–45 seconds.
            </p>
            <div className="mt-6 flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-2 w-2 animate-bounce rounded-full bg-red-700" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* ─── STEP 7: Generated Scope ─── */}
        {step === 7 && !generating && generatedScope && (
          <div>
            <div className="no-print mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-red-700">Scope Generated</div>
                <h2 className="mt-1 text-2xl font-extrabold text-sky-950">{projectData.buildingName || projectData.address}</h2>
                <p className="mt-1 text-sm text-slate-400">
                  {projectData.address} · {OUTPUT_FORMAT_OPTIONS.find((o) => o.id === outputFormat)?.label ?? "Scope of Works"}
                </p>
              </div>
              <button type="button" onClick={() => window.print()}
                className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition">
                <Printer size={15} /> Print
              </button>
            </div>

            <div className="print-area rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-8 border-b border-slate-200 pb-6">
                <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-red-700">
                  {OUTPUT_FORMAT_OPTIONS.find((o) => o.id === outputFormat)?.label ?? "Scope of Works"}
                </div>
                <h2 className="mt-1 text-2xl font-extrabold text-sky-950">{projectData.buildingName || projectData.address}</h2>
                {projectData.buildingName && <p className="mt-0.5 text-sm text-slate-500">{projectData.address}</p>}
                <div className="mt-4 grid gap-1.5 text-sm text-slate-600 sm:grid-cols-2">
                  {projectData.consultantName && <div><span className="font-semibold text-slate-700">Consultant:</span> {projectData.consultantName}</div>}
                  <div><span className="font-semibold text-slate-700">Building Class:</span> {projectData.buildingClass}</div>
                  {projectData.storeys && <div><span className="font-semibold text-slate-700">Storeys:</span> {projectData.storeys}</div>}
                  {projectData.yearOfConstruction && <div><span className="font-semibold text-slate-700">Year of Construction:</span> {projectData.yearOfConstruction}</div>}
                  {projectData.coastal && <div><span className="font-semibold text-slate-700">Coastal Location:</span> Yes</div>}
                  <div>
                    <span className="font-semibold text-slate-700">Date:</span>{" "}
                    {projectData.reportDate ? new Date(projectData.reportDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }) : new Date().toLocaleDateString("en-AU")}
                  </div>
                </div>
              </div>

              <div className="text-sm" dangerouslySetInnerHTML={{ __html: renderMarkdown(generatedScope) }} />

              {showTenderSchedule && (
                <TenderSchedule
                  projectData={projectData}
                  selectedWorkItems={selectedWorkItems}
                  customWorkItems={customWorkItems}
                  workItemStates={workItemStates}
                />
              )}

              <div className="mt-10 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-400">
                Generated by Remedial Building Australia AI Scope Builder · {new Date().toLocaleDateString("en-AU")}
                <br />
                This document is AI-generated and must be reviewed by a qualified remedial building consultant before use. It does not constitute engineering or legal advice.
              </div>
            </div>

            <div className="no-print mt-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <a href="/ai-scope-builder/projects" className="text-sm font-bold text-sky-700 hover:text-red-700 transition">
                  View saved projects →
                </a>
                <button
                  type="button"
                  onClick={() => setShowTenderSchedule((v) => !v)}
                  className="text-sm font-bold text-slate-400 hover:text-sky-950 transition"
                >
                  {showTenderSchedule ? "Hide" : "Show"} Tender Schedule
                </button>
              </div>
              <button onClick={handleReset} className="text-sm font-bold text-slate-400 hover:text-sky-950 transition">
                Start a new scope
              </button>
            </div>
          </div>
        )}

      </main>
    </ScopeShell>
  );
}
