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
    fullLabel: "Rawlplug Australia",
    brandUrl: "https://www.rawlplug.com.au",
    tdsUrl: "https://www.rawlplug.com.au/products/sleeve-anchors",
    accentColor: "#0369a1",
    name: "Rawlplug Stainless Sleeve Anchor (R-SL-A4)",
    descriptionLine: "Grade 316 stainless sleeve expansion anchor for structural masonry and cavity tie installation",
    productType: "Sleeve Torque-Control Anchor",
    filterTags: ["Rawlplug", "Sleeve-anchor", "Torque-control", "Stainless-316", "Solid-masonry", "National", "AS-3700"],
    techChips: ["Sleeve anchor", "316 SS", "Torque-control", "Rawlplug", "National"],
    systemDescription: [
      "Rawlplug R-SL-A4 is a Grade 316 stainless steel sleeve expansion anchor installed by drilling, inserting and tightening the bolt to expand the sleeve against the bore hole walls.",
      "Torque-controlled installation provides consistent pre-load — the bolt is tightened to a specified torque value to achieve the design pull-out resistance.",
      "Suitable for solid masonry substrates in cavity wall tie replacement where consistent installation torque can be achieved.",
      "Widely available through Rawlplug's broad national distribution network.",
    ],
    technicalProperties: [
      { label: "Anchor type", value: "Sleeve expansion" },
      { label: "Steel grade", value: "Grade 316 (A4)" },
      { label: "Standard", value: "AS 3700" },
      { label: "Installation", value: "Torque-controlled" },
      { label: "Substrate", value: "Solid masonry" },
      { label: "Distribution", value: "National (broad)" },
    ],
    limitations: [
      "Solid masonry only — sleeve expansion in hollow or soft masonry will fail",
      "Over-torquing can crack masonry — use calibrated torque wrench to manufacturer specification",
      "Minimum embedment depth and edge distances apply — consult Rawlplug technical data before drilling layout",
      "Not for use in masonry with existing cracks through the bore zone",
    ],
    procurementSources: [
      "Rawlplug Australia — broad national distribution through hardware and specialist fixings suppliers",
      "Trade hardware stores nationally — confirm A4 stainless grade availability",
      "Rawlplug website for nearest stockist",
    ],
  },
  {
    fullLabel: "Würth Australia",
    brandUrl: "https://www.wuerth.com.au",
    tdsUrl: "https://www.wuerth.com.au/products/anchors",
    accentColor: "#b45309",
    name: "Würth Stainless Sleeve Anchor",
    descriptionLine: "Grade 316 stainless sleeve anchor for solid masonry anchoring with torque-controlled installation",
    productType: "Sleeve Torque-Control Anchor",
    filterTags: ["Wurth", "Sleeve-anchor", "Torque-control", "Stainless-316", "Solid-masonry", "National", "AS-3700"],
    techChips: ["Sleeve anchor", "316 SS", "Torque-control", "Würth", "National"],
    systemDescription: [
      "Würth offers a range of Grade 316 stainless steel sleeve expansion anchors for structural masonry anchoring, suitable for remedial cavity wall tie installation in solid masonry substrates.",
      "Torque-controlled installation — the anchor is tightened to a specified torque value to achieve consistent expansion and load capacity.",
      "Würth's broad national distribution through trade branches makes sleeve anchors accessible to contractors without specialist supplier relationships.",
      "Technical data sheets and load tables are available through Würth's sales and technical support team.",
    ],
    technicalProperties: [
      { label: "Anchor type", value: "Sleeve expansion" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Standard", value: "AS 3700" },
      { label: "Installation", value: "Torque-controlled" },
      { label: "Substrate", value: "Solid masonry" },
      { label: "Distribution", value: "National branches" },
    ],
    limitations: [
      "Solid masonry only — do not use in hollow, perforated, or soft brick",
      "Confirm load data with Würth for the specific product before engineer specification",
      "Calibrated torque wrench required — under or over-torquing affects pull-out resistance",
      "Minimum edge distances and spacing apply — confirm with Würth technical data",
    ],
    procurementSources: [
      "Würth Australia — national branch network: Sydney, Melbourne, Brisbane, Perth, Adelaide",
      "Würth trade accounts for contractor pricing",
      "Würth website for nearest branch and TDS download",
    ],
  },
  {
    fullLabel: "Hilti Australia",
    brandUrl: "https://www.hilti.com.au",
    tdsUrl: "https://www.hilti.com.au/products/anchors/sleeve-anchors",
    accentColor: "#dc2626",
    name: "Hilti HSA-R2 Stainless Sleeve Anchor",
    descriptionLine: "Grade 316 stainless sleeve anchor with ETA approval and PROFIS design software support",
    productType: "Sleeve Torque-Control Anchor",
    filterTags: ["Hilti", "Sleeve-anchor", "HSA-R2", "Torque-control", "Stainless-316", "ETA-approved", "National", "AS-3700"],
    techChips: ["HSA-R2", "316 SS", "ETA approved", "PROFIS", "Torque-control", "National"],
    systemDescription: [
      "Hilti HSA-R2 is a Grade 316 stainless sleeve anchor with ETA approval and PROFIS Anchor software design support for engineer specification in structural masonry anchoring.",
      "The HSA-R2 is torque-controlled — the nut is tightened to a specified torque to expand the sleeve and achieve the design load capacity.",
      "ETA approval provides published characteristic resistance values that engineers can directly use in AS 3700 compliant load calculations via Hilti's Profis software.",
      "Available through Hilti's national direct supply and distribution network with full technical support.",
    ],
    technicalProperties: [
      { label: "Anchor type", value: "Sleeve expansion" },
      { label: "Steel grade", value: "Grade 316 (A4)" },
      { label: "Standard", value: "AS 3700 / ETA" },
      { label: "Load data", value: "ETA + PROFIS" },
      { label: "Installation", value: "Torque-controlled" },
      { label: "Distribution", value: "National direct + dist." },
    ],
    limitations: [
      "Solid masonry only — do not use in hollow or soft masonry",
      "Minimum embedment and edge distance per Hilti design tables — confirm before drilling layout",
      "Calibrated torque wrench required for correct installation",
      "Higher cost than standard sleeve anchors — justified by ETA load data for engineer specification",
    ],
    procurementSources: [
      "Hilti Australia — direct supply and national distribution network",
      "Hilti Centres nationally — Sydney, Melbourne, Brisbane, Perth, Adelaide",
      "Hilti online for TDS and design software",
    ],
  },
];

const SYSTEM_COMPARISON = [
  { supplier: "Rawlplug Australia", product: "R-SL-A4 Sleeve Anchor", grade: "316 (A4)", installation: "Torque-controlled", loadData: "Supplier published", distribution: "National (broad)", keyFeature: "Broad availability", primaryUse: "Standard solid masonry anchoring" },
  { supplier: "Würth Australia", product: "Würth Stainless Sleeve", grade: "316 SS", installation: "Torque-controlled", loadData: "Würth published", distribution: "National branches", keyFeature: "Trade branch network", primaryUse: "Contractor-procured solid masonry" },
  { supplier: "Hilti Australia", product: "HSA-R2 Sleeve Anchor", grade: "316 (A4)", installation: "Torque-controlled", loadData: "ETA + PROFIS", distribution: "National direct", keyFeature: "ETA + design software", primaryUse: "Engineer-specified structural anchoring" },
];

const TECH_INFO = {
  typicalApplications: ["Cavity wall tie replacement in solid dense masonry using sleeve expansion mechanism", "Applications where torque-controlled installation confirms consistent anchor capacity", "Engineer-specified anchoring with published ETA load data (Hilti HSA-R2)", "Contractor preference for broad-availability anchor products (Rawlplug, Würth)"],
  selectionCriteria: ["Solid masonry substrate is mandatory — sleeve expansion in hollow masonry fails without warning", "Use calibrated torque wrench — torque is the primary installation control", "Hilti HSA-R2 for engineer-specified applications requiring ETA load tables", "Rawlplug or Würth for broad contractor availability at lower cost"],
  limitations: ["Solid masonry substrates only", "Calibrated torque wrench mandatory — hand-tightening does not achieve design load", "Minimum edge distances and spacing apply — check load tables before layout", "Not suitable for soft, heritage, or highly porous masonry"],
  standardsNotes: ["AS 3700 Masonry Structures — structural tie requirements", "ETA approval provides characteristic resistance values (Hilti HSA-R2)", "Engineer confirmation of anchor spacing and pattern required"],
  suitableDefects: ["Failed cavity ties in solid dense masonry substrates", "Applications where consistent torque-controlled installation can be verified"],
  typicalSubstrates: ["Dense hard-fired clay brick", "Dense concrete block", "Dense calcium silicate brick", "Not suitable for soft heritage brick, hollow brick, or perforated masonry"],
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

export function SleeveTorqueControlTieIntroSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-extrabold text-sky-950">Sleeve torque-control mechanical wall ties</h2>
      <p className="max-w-3xl text-sm leading-6 text-slate-600">
        Sleeve torque-control anchors use a bolt-tightened sleeve expansion mechanism — the bolt is torqued to a specified value to expand the sleeve against the bore hole walls. Consistent torque during installation is the key installation control parameter. Suitable for solid dense masonry only — never for hollow, perforated, or soft masonry. Structural engineer confirmation required for cavity wall tie replacement.
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

export function SleeveTorqueControlTieProductSection() {
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
            <span className="text-xs font-extrabold text-sky-950">Supplier comparison — sleeve torque-control mechanical ties</span>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Supplier", "Product", "Grade", "Installation", "Load Data", "Distribution", "Key Feature", "Primary Use"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-2.5 font-bold text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.product}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.grade}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.installation}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.loadData}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.distribution}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.keyFeature}</td>
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
