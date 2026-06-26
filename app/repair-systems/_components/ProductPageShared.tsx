"use client";

import { useState } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, XCircle, FileText,
} from "lucide-react";

export function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${items.length - limit} more ↓`}
        </button>
      )}
    </div>
  );
}

export function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

export function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

export function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
        <h3 className="text-sm font-extrabold text-sky-950">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">
            {style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}
            {style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}
            {style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Data note ───────────────────────────────────────────────────────────────
// Collapsed-by-default amber note for "owner to confirm" caveats. Keeps the
// product name/type clean (and out of the materials index) while preserving the
// verification context one click away at the bottom of the card.
export function DataNote({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2">
      <button onClick={() => setExpanded((e) => !e)} className="flex w-full items-center justify-between gap-2 text-left">
        <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-700">
          <AlertTriangle size={10} className="shrink-0" /> Data note — owner to confirm
        </span>
        <span className="shrink-0 text-[9px] font-bold text-amber-600">{expanded ? "Hide ↑" : "Show ↓"}</span>
      </button>
      {expanded && <p className="mt-1.5 text-[10px] leading-4 text-amber-800/90">{text}</p>}
    </div>
  );
}

// ── AI Selection Data (review mode) ─────────────────────────────────────────
// Review-mode blocks: render EXPANDED on load, labelled "AI SELECTION DATA — REVIEW".
// Hidden later via one flag. Clone the existing card/dropdown/table patterns only.

const REVIEW_BADGE = "AI SELECTION DATA — REVIEW";

export function AISelectionReviewTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="min-w-full text-xs">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 align-top text-slate-600">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AISelectionJson({ data }: { data: unknown }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 text-[11px] leading-5 text-slate-100">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

// Stage 1 — card retained for layout/system-selector data; detail hidden from public.
// Data still flows in via props (used by the system selector); it is no longer rendered to visitors.
export function AISelectionStage1({ headers, rows, json }: { headers: string[]; rows: string[][]; json: unknown }) {
  void headers; void rows; void json;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left">
        <div>
          <span className="mb-1 inline-flex items-center rounded bg-amber-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-amber-800">{REVIEW_BADGE}</span>
          <p className="text-base font-extrabold text-sky-950">AI Selection Data</p>
          <p className="mt-0.5 text-xs text-slate-500">Stage 1 — category gates · review mode</p>
        </div>
      </div>
    </div>
  );
}

// Stage 2 — card retained for layout/system-selector data; detail hidden from public.
export function AISelectionStage2({ headers, rows, json }: { headers: string[]; rows: string[][]; json: unknown }) {
  void headers; void rows; void json;
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">AI SELECTION DATA</p>
      </div>
    </div>
  );
}

export { BookOpen, Layers, SquareStack, Ruler, CheckCircle, AlertTriangle, FileText, ExternalLink };
