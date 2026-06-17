"use client";

// ──────────────────────────────────────────────────────────────────────────────
// SpecCard — LOCAL to the polymer-modified repair mortars page only.
// Built for the feature/spec-cards-pm-mortars rework. Does NOT touch the shared
// ProductReferenceCard (used by other pages). Four zones:
//   1. Identity   — brand / product / standard-grade badge
//   2. Specs grid — generic specs[] (label, value, unit, status, note, source)
//   3. Strengths  — green
//   4. Limitations — red
// Spec data is TDS-sourced; each spec.source records the AU TDS revision/date.
// ──────────────────────────────────────────────────────────────────────────────

import { CheckCircle, XCircle, ExternalLink, FileText } from "lucide-react";

export type SpecStatus =
  | "sourced"       // real value read from the AU TDS
  | "class-min"     // an EN class designation/minimum — labelled as such, never a tested value
  | "not-reported"  // the (sourced) TDS exists but does not publish this field
  | "unsourced";    // no TDS could be located for this product/field

export interface Spec {
  label: string;
  value: string;
  unit?: string;
  status: SpecStatus;
  note?: string;
  source?: string; // AU TDS revision/date the value came from
}

export interface SpecCardProduct {
  brand: string;
  brandUrl: string;
  name: string;
  productType: string;
  gradeBadge: string;
  accentColor: string;
  tdsReference: string; // e.g. "Sika Australia PDS — April 2023"
  noTds?: boolean;      // true => card-top "TDS could not be sourced" banner
  specs: Spec[];
  strengths: string[];
  limitations: string[];
}

export interface ProcurementSource {
  name: string;
  url?: string;
}

function statusMeta(status: SpecStatus) {
  switch (status) {
    case "sourced":
      return { tick: true, tag: "", tagCls: "" };
    case "class-min":
      return { tick: false, tag: "class designation", tagCls: "bg-amber-100 text-amber-800" };
    case "not-reported":
      return { tick: false, tag: "not in TDS", tagCls: "bg-slate-100 text-slate-500" };
    case "unsourced":
      return { tick: false, tag: "unsourced", tagCls: "bg-red-100 text-red-700" };
  }
}

function SpecRow({ spec }: { spec: Spec }) {
  const meta = statusMeta(spec.status);
  const title = [spec.note, spec.source ? `Source: ${spec.source}` : ""].filter(Boolean).join(" — ");
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2" title={title || undefined}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{spec.label}</p>
        {meta.tag && (
          <span className={`shrink-0 rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide ${meta.tagCls}`}>
            {meta.tag}
          </span>
        )}
      </div>
      <div className="mt-1 flex items-start gap-1.5">
        {meta.tick ? (
          <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
        ) : spec.status === "unsourced" ? (
          <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
        ) : null}
        {spec.status === "unsourced" ? (
          <p className="text-xs font-semibold leading-snug text-red-500">TDS could not be sourced</p>
        ) : (
          <p className="text-xs font-semibold leading-snug text-slate-800">
            {spec.value}
            {spec.unit ? <span className="ml-0.5 font-medium text-slate-500">{spec.unit}</span> : null}
          </p>
        )}
      </div>
    </div>
  );
}

export function SpecCard({
  product,
  procurementSources,
}: {
  product: SpecCardProduct;
  procurementSources?: ProcurementSource[];
}) {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      style={{ borderLeft: `4px solid ${product.accentColor}` }}
    >
      {/* ── Zone 1 — Identity ── */}
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            {product.brand}
          </span>
          <a
            href={product.brandUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
          >
            <ExternalLink size={9} /> Brand Site
          </a>
        </div>
        <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
        <span className="mt-2 inline-flex items-center rounded-full bg-sky-950 px-2.5 py-0.5 text-[10px] font-bold text-white">
          {product.gradeBadge}
        </span>
        {product.noTds && (
          <div className="mt-3 flex items-start gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
            <XCircle size={12} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-[11px] font-semibold leading-snug text-red-700">
              TDS could not be sourced — no values verified
            </p>
          </div>
        )}
      </div>

      {/* ── Zone 2 — Selection specs grid ── */}
      <div className="border-b border-slate-100 px-5 py-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">Selection Specs</p>
        <div className="grid grid-cols-2 gap-2">
          {product.specs.map((s) => (
            <SpecRow key={s.label} spec={s} />
          ))}
        </div>
      </div>

      {/* ── Zone 3 — Strengths ── */}
      <div className="border-b border-slate-100 px-5 py-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Strengths</p>
        <ul className="space-y-1.5">
          {product.strengths.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Zone 4 — Limitations ── */}
      <div className="px-5 py-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
        <ul className="space-y-1.5">
          {product.limitations.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Procurement (preserved from the original card) ── */}
      {procurementSources && procurementSources.length > 0 && (
        <div className="border-t border-slate-100 px-5 py-4">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">Procurement Sources</p>
          <div className="space-y-1.5">
            {procurementSources.map((src) => (
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
          <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
        </div>
      )}

      {/* ── Footer — TDS reference ── */}
      <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
        <p className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
          <FileText size={10} className="shrink-0" /> Specs sourced from {product.tdsReference}
        </p>
      </div>
    </div>
  );
}
