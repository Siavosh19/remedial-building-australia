"use client";

import { Download, Mail, RotateCcw, RefreshCw } from "lucide-react";
import type { OutputType } from "@/lib/scope-builder-types";

const OUTPUT_TYPES: {
  value: OutputType;
  label: string;
  description: string;
}[] = [
  {
    value: "consultant",
    label: "Consultant Scope",
    description: "Full technical detail, hold points, QA",
  },
  {
    value: "builder",
    label: "Builder Pricing",
    description: "Trade breakdown, quantities, schedule",
  },
  {
    value: "strata",
    label: "Strata Summary",
    description: "Plain language for owners & committees",
  },
  {
    value: "methodology",
    label: "Methodology",
    description: "Technical method only, no commercial info",
  },
  {
    value: "tender",
    label: "Tender Scope",
    description: "Formal tender format, schedule of rates",
  },
];

interface Props {
  outputType: OutputType;
  onOutputTypeChange: (type: OutputType) => void;
  onPrint: () => void;
  onEmail: () => void;
  onReset: () => void;
  onRegenerate: () => void;
  generating: boolean;
}

export function ScopeOutputOptions({
  outputType,
  onOutputTypeChange,
  onPrint,
  onEmail,
  onReset,
  onRegenerate,
  generating,
}: Props) {
  return (
    <div className="no-print mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Output type selector */}
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
        Output Format
      </p>
      <div className="mb-5 flex flex-wrap gap-2">
        {OUTPUT_TYPES.map((ot) => (
          <button
            key={ot.value}
            type="button"
            onClick={() => onOutputTypeChange(ot.value)}
            title={ot.description}
            className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${
              outputType === ot.value
                ? "border-sky-950 bg-sky-950 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:bg-sky-50"
            }`}
          >
            {ot.label}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onRegenerate}
          disabled={generating}
          className="flex items-center gap-2 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {generating ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Generating…
            </>
          ) : (
            <>
              <RefreshCw size={14} /> Regenerate
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="flex items-center gap-2 rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-sky-800"
        >
          <Download size={14} /> Download PDF
        </button>
        <button
          type="button"
          onClick={onEmail}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <Mail size={14} /> Email
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-400 transition hover:bg-slate-50"
        >
          <RotateCcw size={14} /> New Project
        </button>
      </div>
    </div>
  );
}
