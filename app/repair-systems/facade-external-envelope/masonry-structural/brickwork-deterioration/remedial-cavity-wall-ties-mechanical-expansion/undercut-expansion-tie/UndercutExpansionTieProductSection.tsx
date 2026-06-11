"use client";
import { useState, useRef } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type Supplier = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: string[];
  techChips: string[];
  systemDescription: string[];
  technicalProperties: { label: string; value: string }[];
  limitations: string[];
  procurementSources: string[];
};

const SUPPLIERS: Supplier[] = [
  {
    fullLabel: "Hilti Australia",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#dc2626",
    name: "Hilti HDA Undercut Anchor",
    descriptionLine: "High-load undercut anchor with keyed mechanical lock for structural masonry anchoring",
    productType: "Undercut Expansion Anchor",
    filterTags: ["Hilti", "Undercut", "HDA", "Mechanical", "Stainless-316", "Very-high-load", "ETA-approved", "National", "AS-3700"],
    techChips: ["HDA undercut", "316 SS", "Very high load", "ETA approved", "PROFIS", "National"],
    systemDescription: [
      "Hilti HDA (High-performance Deformation-controlled Anchor) is a specialist undercut anchor that achieves significantly higher load capacity than standard wedge or sleeve expansion anchors by locking into an undercut profile drilled in the masonry.",
      "The undercut mechanism transfers load through a bearing surface in the masonry rather than pure friction — provides higher characteristic resistance and more ductile failure mode.",
      "ETA-approved with published characteristic resistance values for engineers using Hilti Profis Anchor software for AS 3700 compliant load calculations.",
      "Specified for the most demanding structural anchoring applications where standard expansion anchors cannot achieve the required load.",
    ],
    technicalProperties: [
      { label: "Anchor type", value: "Undercut expansion" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Standard", value: "AS 3700 / ETA" },
      { label: "Load rating", value: "Very high" },
      { label: "Load data", value: "ETA + PROFIS" },
      { label: "Distribution", value: "National direct + dist." },
    ],
    limitations: [
      "Requires Hilti specialist drill bit and undercut tooling — not compatible with standard drill bits",
      "Higher cost than standard expansion or resin anchors — confirmed by engineer for highest-demand applications only",
      "Solid masonry substrates only — undercut mechanism cannot form in hollow or soft masonry",
      "Structural engineer specification required — not a standard contractor-selected product",
    ],
    procurementSources: [
      "Hilti Australia — direct supply and national distribution through Hilti Centres",
      "Hilti Centres: Sydney, Melbourne, Brisbane, Perth, Adelaide",
      "Hilti online for TDS and design software",
    ],
  },
  {
    fullLabel: "Fischer Fixings Australia",
    brandUrl: "https://www.fischer.com.au",
    accentColor: "#0369a1",
    name: "Fischer FAZ II Undercut Anchor",
    descriptionLine: "High-load deformation-controlled undercut anchor for structural masonry and concrete",
    productType: "Undercut Expansion Anchor",
    filterTags: ["Fischer", "Undercut", "FAZ-II", "Mechanical", "Stainless-316", "Very-high-load", "ETA-approved", "National", "AS-3700"],
    techChips: ["FAZ II undercut", "316 SS", "Very high load", "ETA approved", "Fischer", "National"],
    systemDescription: [
      "Fischer FAZ II is a deformation-controlled undercut anchor for high-load structural anchoring in solid masonry and concrete — an alternative to the Hilti HDA for the most demanding applications.",
      "The FAZ II expands into an undercut profile to achieve bearing-based load transfer rather than friction-based expansion — higher capacity and more ductile failure behaviour than wedge or sleeve anchors.",
      "ETA-approved with published characteristic resistance values for engineer load calculation.",
      "Available through Fischer's national specialist distribution network with technical support.",
    ],
    technicalProperties: [
      { label: "Anchor type", value: "Undercut expansion" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Standard", value: "AS 3700 / ETA" },
      { label: "Load rating", value: "Very high" },
      { label: "Load data", value: "ETA published" },
      { label: "Distribution", value: "National (specialist)" },
    ],
    limitations: [
      "Requires Fischer undercut tooling — specialist drill bit and setting tool required",
      "Higher installation cost than standard mechanical or resin anchors",
      "Solid masonry substrates only",
      "Specified by engineer for highest-demand applications — not a standard contractor-selected product",
    ],
    procurementSources: [
      "Fischer Fixings Australia — national distribution through specialist fixings suppliers",
      "Trade fixings distributors nationally — confirm FAZ II availability with local branch",
      "Fischer website for nearest distributor and TDS",
    ],
  },
];

const SYSTEM_COMPARISON = [
  { supplier: "Hilti Australia", product: "HDA Undercut Anchor", mechanism: "Undercut bearing", grade: "316 SS", tooling: "Hilti specialist kit", loadData: "ETA + PROFIS", distribution: "National direct", primaryUse: "Highest-demand structural anchoring" },
  { supplier: "Fischer Fixings", product: "FAZ II Undercut Anchor", mechanism: "Undercut bearing", grade: "316 SS", tooling: "Fischer specialist kit", loadData: "ETA published", distribution: "National (specialist)", primaryUse: "Very high-load masonry anchoring" },
];

const TECH_INFO = {
  typicalApplications: ["Structural cavity wall tie replacement requiring the highest mechanical anchor load capacity", "Applications where standard wedge, sleeve, or resin anchors cannot achieve engineer-specified loads", "High-rise and commercial facades with very high wind pressure and out-of-plane loads", "Engineer-specified critical anchor applications with ETA load data requirement"],
  selectionCriteria: ["Specify undercut anchors only where engineer confirms standard mechanical or resin anchors are insufficient", "Specialist tooling is required — Hilti or Fischer undercut drill bits and setting tools must be on site before scheduling work", "Solid dense masonry substrate required — undercut cannot form in hollow or soft masonry", "ETA load data available from both Hilti and Fischer for engineer calculation"],
  limitations: ["Specialist tooling required — not compatible with standard drill bits", "Higher cost than all other anchor types — specify only where load demand requires it", "Solid masonry only — not for hollow, perforated, or soft brick", "Structural engineer specification is mandatory"],
  standardsNotes: ["AS 3700 Masonry Structures — structural tie requirements", "ETA approval provides characteristic resistance values for AS 3700 compliant engineer calculation", "Engineer confirmation of anchor spacing and pattern required for every project"],
  suitableDefects: ["Failed cavity ties in high-load applications where standard anchors are insufficient", "Structural anchoring in the most demanding masonry facade zones"],
  typicalSubstrates: ["Dense hard-fired clay brick", "Dense concrete masonry", "Reinforced concrete backing walls", "Not suitable for hollow, perforated, or soft masonry"],
};

function CollapsibleSources({ sources }: { sources: string[] }) {
  const [open, setOpen] = useState(false);
  const visible = open ? sources : sources.slice(0, 2);
  return (
    <div>
      <ul className="space-y-1">
        {visible.map((s, i) => (<li key={i} className="text-xs leading-5 text-slate-500">{s}</li>))}
      </ul>
      {sources.length > 2 && (
        <button onClick={() => setOpen(!open)} className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-sky-600 hover:text-sky-800">
          {open ? <><ChevronUp size={11} />Show less</> : <><ChevronDown size={11} />+{sources.length - 2} more</>}
        </button>
      )}
    </div>
  );
}

function CollapsibleCardDetails({ supplier }: { supplier: Supplier }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 border-t border-slate-100 pt-4">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900">
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        {open ? "Hide technical detail" : "Show technical detail"}
      </button>
      {open && (
        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Technical Properties</div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {supplier.technicalProperties.map((p) => (
                <div key={p.label} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{p.label}</span>
                  <span className="text-xs font-bold text-sky-950">{p.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Limitations</div>
            <ul className="space-y-1.5">
              {supplier.limitations.map((l, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Procurement Sources</div>
            <CollapsibleSources sources={supplier.procurementSources} />
          </div>
        </div>
      )}
    </div>
  );
}

function CollapsibleDescription({ lines }: { lines: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p className="text-sm leading-6 text-slate-600">{lines[0]}</p>
      {lines.length > 1 && (
        <>
          {open && lines.slice(1).map((l, i) => <p key={i} className="mt-2 text-sm leading-6 text-slate-600">{l}</p>)}
          <button onClick={() => setOpen(!open)} className="mt-2 flex items-center gap-1 text-[10px] font-bold text-sky-600 hover:text-sky-800">
            {open ? <><ChevronUp size={11} />Show less</> : <><ChevronDown size={11} />Read more</>}
          </button>
        </>
      )}
    </div>
  );
}

function TechCard({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between">
        <span className="text-xs font-bold text-sky-950">{title}</span>
        {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
      </button>
      {open && (
        <ul className="mt-3 space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function UndercutExpansionTieIntroSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-extrabold text-sky-950">Undercut expansion mechanical wall ties</h2>
      <p className="max-w-3xl text-sm leading-6 text-slate-600">
        Undercut expansion anchors are the highest-load mechanical anchor type — they drill an undercut profile in the masonry and lock into it under bearing rather than friction. They outperform all other mechanical anchor types in characteristic resistance values and provide a more ductile failure behaviour. Specialist tooling is required. These are engineer-specified products for the most demanding structural masonry anchoring applications. Structural engineer specification is mandatory.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <TechCard title="Typical Applications" items={TECH_INFO.typicalApplications} />
        <TechCard title="Selection Criteria" items={TECH_INFO.selectionCriteria} />
        <TechCard title="Suitable Defects" items={TECH_INFO.suitableDefects} />
        <TechCard title="Typical Substrates" items={TECH_INFO.typicalSubstrates} />
        <TechCard title="Limitations" items={TECH_INFO.limitations} />
        <TechCard title="Standards Notes" items={TECH_INFO.standardsNotes} />
      </div>
    </div>
  );
}

export function UndercutExpansionTieProductSection() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const allTags = Array.from(new Set(SUPPLIERS.flatMap((s) => s.filterTags)));
  const toggleFilter = (tag: string) =>
    setActiveFilters((f) => (f.includes(tag) ? f.filter((t) => t !== tag) : [...f, tag]));
  const filtered = activeFilters.length === 0 ? SUPPLIERS : SUPPLIERS.filter((s) => activeFilters.every((t) => s.filterTags.includes(t)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-sky-950">Supplier reference</h2>
        <span className="text-xs font-semibold text-slate-400">{filtered.length} of {SUPPLIERS.length} suppliers</span>
      </div>
      <div ref={scrollRef} className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button key={tag} onClick={() => toggleFilter(tag)}
            className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition ${activeFilters.includes(tag) ? "border-sky-700 bg-sky-700 text-white" : "border-slate-200 bg-white text-slate-500 hover:border-sky-300 hover:text-sky-700"}`}>
            {tag}
          </button>
        ))}
        {activeFilters.length > 0 && (
          <button onClick={() => setActiveFilters([])} className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 hover:bg-red-100">Clear filters</button>
        )}
      </div>
      <div className="grid gap-5 lg:grid-cols-1">
        {filtered.map((supplier) => (
          <div key={supplier.fullLabel} className="rounded-2xl border border-slate-200 bg-white p-6" style={{ borderLeftWidth: 4, borderLeftColor: supplier.accentColor }}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">{supplier.productType}</div>
                <h3 className="text-base font-extrabold text-sky-950">{supplier.name}</h3>
                <p className="mt-0.5 text-sm font-semibold text-slate-500">{supplier.descriptionLine}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a href={supplier.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50 transition">Brand site <ExternalLink size={11} /></a>
                {supplier.tdsUrl && <a href={supplier.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50 transition">TDS <ExternalLink size={11} /></a>}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {supplier.techChips.map((chip) => (<span key={chip} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">{chip}</span>))}
            </div>
            <div className="mt-4"><CollapsibleDescription lines={supplier.systemDescription} /></div>
            <CollapsibleCardDetails supplier={supplier} />
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <div className="min-w-[700px]">
          <div className="border-b border-slate-100 px-5 py-3">
            <span className="text-xs font-extrabold text-sky-950">Supplier comparison — undercut expansion mechanical ties</span>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Supplier", "Product", "Mechanism", "Grade", "Tooling", "Load Data", "Distribution", "Primary Use"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-2.5 font-bold text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.product}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.mechanism}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.grade}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.tooling}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.loadData}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.distribution}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
