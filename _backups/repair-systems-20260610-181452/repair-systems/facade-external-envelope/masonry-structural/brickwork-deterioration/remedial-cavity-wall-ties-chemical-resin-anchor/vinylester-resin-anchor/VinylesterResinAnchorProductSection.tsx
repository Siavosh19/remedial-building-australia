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
    fullLabel: "Helifix Australia",
    brandUrl: "https://www.helifix.com.au",
    tdsUrl: "https://www.helifix.com.au/products/resin-anchor-ties",
    accentColor: "#0369a1",
    name: "Helifix Vinylester Resin Anchor System",
    descriptionLine: "316 stainless tie with vinylester resin injection for high-load cavity wall tie replacement",
    productType: "Vinylester Resin Anchor",
    filterTags: ["Helifix", "Vinylester", "Resin-anchor", "Stainless-316", "High-load", "National", "AS-3700", "Cavity-tie"],
    techChips: ["Vinylester", "316 SS", "High load", "Resin-inject", "AS 3700", "National"],
    systemDescription: [
      "Helifix vinylester resin anchor system uses a Grade 316 stainless tie rod installed into pre-drilled holes with vinylester resin injection to achieve high load capacity in cavity masonry.",
      "Vinylester resin provides superior chemical resistance compared to polyester, and is suitable for damp or submerged substrates where epoxy curing is inhibited.",
      "The system achieves higher characteristic withdrawal loads than standard helical grout-in ties, making it suitable for high-demand zones and substrates where helical friction is unreliable.",
      "Helifix supplies the full system including resin cartridges, tie rods, and installation tooling.",
    ],
    technicalProperties: [
      { label: "Resin type", value: "Vinylester" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Standard", value: "AS 3700" },
      { label: "Damp substrates", value: "Yes" },
      { label: "Load rating", value: "High" },
      { label: "Distribution", value: "National (authorised)" },
    ],
    limitations: [
      "Vinylester resin has a limited pot life — temperature-dependent; check current TDS for open time in Australian summer conditions",
      "Hole must be clean, dry or damp (not wet) — heavily wet holes inhibit resin cure; use epoxy in persistently wet conditions",
      "Specialist distributor supply — not available from general hardware",
      "Structural engineer specification required for tie spacing and load confirmation",
    ],
    procurementSources: [
      "Helifix Australia — national distribution through authorised remedial distributors",
      "Remedial building specialist suppliers — Sydney, Melbourne, Brisbane, Perth, Adelaide",
      "Helifix website for nearest authorised distributor",
    ],
  },
  {
    fullLabel: "Thor Helical Australia",
    brandUrl: "https://www.thorhelical.com.au",
    tdsUrl: "https://www.thorhelical.com.au/resin-ties",
    accentColor: "#b45309",
    name: "Thor Helical Vinylester Resin Wall Tie",
    descriptionLine: "316 stainless helical tie with vinylester resin for cavity masonry — high bond in damp conditions",
    productType: "Vinylester Resin Anchor",
    filterTags: ["Thor-Helical", "Vinylester", "Resin-anchor", "Stainless-316", "High-load", "National", "AS-3700", "Cavity-tie"],
    techChips: ["Vinylester", "316 SS", "High load", "Thor Helical", "Damp OK", "National"],
    systemDescription: [
      "Thor Helical vinylester resin tie system uses a Grade 316 stainless tie installed into pre-drilled holes with Thor vinylester resin injection for high-load cavity wall remediation.",
      "Vinylester resin achieves reliable cure in damp masonry conditions — better moisture tolerance than standard polyester resins.",
      "The system is suitable for applications requiring higher load capacity than helical grout-in ties, and for substrates where mechanical friction engagement is unreliable.",
      "Thor Helical provides load data and installation guides for engineer specification.",
    ],
    technicalProperties: [
      { label: "Resin type", value: "Vinylester" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Standard", value: "AS 3700" },
      { label: "Damp substrates", value: "Yes" },
      { label: "Cure time", value: "Temperature-dependent" },
      { label: "Distribution", value: "National (specialist)" },
    ],
    limitations: [
      "Pot life is temperature-dependent — check TDS for current batch open time at Australian summer temperatures",
      "Hole cleaning is critical — dust, debris, or standing water will reduce resin bond strength",
      "Not suitable in freezing conditions — confirm minimum cure temperature with Thor Helical",
      "Specialist distributor supply only",
    ],
    procurementSources: [
      "Thor Helical Australia — national distribution through specialist network",
      "Remedial building specialist suppliers",
      "Thor Helical website for nearest distributor",
    ],
  },
  {
    fullLabel: "Simpson Strong-Tie Australia",
    brandUrl: "https://www.strongtie.com.au",
    tdsUrl: "https://www.strongtie.com.au/products/anchors",
    accentColor: "#7c3aed",
    name: "Simpson Strong-Tie SET-XP Vinylester Anchor",
    descriptionLine: "SET-XP high-strength vinylester adhesive anchor system for masonry tie installation",
    productType: "Vinylester Resin Anchor",
    filterTags: ["Simpson", "Vinylester", "SET-XP", "Resin-anchor", "Stainless-316", "High-load", "National", "AS-3700"],
    techChips: ["SET-XP", "Vinylester", "316 SS", "High load", "Simpson", "National"],
    systemDescription: [
      "Simpson Strong-Tie SET-XP is a high-performance vinylester adhesive anchor system widely used in structural masonry anchoring, including remedial cavity wall tie installation.",
      "SET-XP achieves high characteristic bond strengths in both dry and damp concrete and masonry substrates, with ICC-ES and ETA approvals for a wide range of anchoring applications.",
      "The cartridge system is compatible with standard dispensing guns and is available nationally through Simpson's broad distribution network.",
      "Engineer load calculations should reference Simpson's published characteristic resistance values for AS 3700 compliance.",
    ],
    technicalProperties: [
      { label: "Resin type", value: "Vinylester (SET-XP)" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Standard", value: "AS 3700 / ETA" },
      { label: "Damp substrates", value: "Yes" },
      { label: "Load data", value: "ICC-ES / ETA published" },
      { label: "Distribution", value: "National (broad)" },
    ],
    limitations: [
      "Hole cleaning is critical — use wire brush and blow-out pump; dust-contaminated holes will reduce bond to published values",
      "Minimum embedment depths must be observed — consult Simpson load tables for tie diameter and masonry substrate",
      "Curing time before loading is temperature-dependent — confirm in TDS before proceeding in hot or cold conditions",
      "SET-XP is a general anchoring product — confirm suitability with Simpson for specific remedial cavity tie applications",
    ],
    procurementSources: [
      "Simpson Strong-Tie Australia — broad national distribution including hardware chains and specialist suppliers",
      "Bunnings (trade desk), Total Tools, and specialist fixings suppliers nationally",
      "Simpson website for local stockist",
    ],
  },
  {
    fullLabel: "Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au/products/anchoring",
    accentColor: "#059669",
    name: "Parchem HIT-RE 500 / Concresive Anchor",
    descriptionLine: "High-performance vinylester or epoxy anchoring systems for remedial masonry tie installation",
    productType: "Vinylester Resin Anchor",
    filterTags: ["Parchem", "Vinylester", "Epoxy", "Resin-anchor", "Stainless-316", "High-load", "National", "AS-3700"],
    techChips: ["Vinylester", "316 SS", "High load", "Parchem", "Distributor", "National"],
    systemDescription: [
      "Parchem Construction Supplies distributes a range of high-performance vinylester and epoxy anchoring systems for structural masonry anchoring including remedial wall tie installation.",
      "Parchem's portfolio includes Hilti HIT-RE 500 (distributed through Parchem) and proprietary Concresive anchor systems for heavy-duty anchoring in concrete and masonry.",
      "Parchem's technical team provides specification support and material selection for remedial practitioners and engineers specifying cavity tie systems.",
      "Available nationally through Parchem's branch network and trade counters.",
    ],
    technicalProperties: [
      { label: "Resin type", value: "Vinylester / epoxy" },
      { label: "Steel grade", value: "316 stainless" },
      { label: "Standard", value: "AS 3700" },
      { label: "Technical support", value: "Yes (Parchem)" },
      { label: "Load data", value: "Supplier published" },
      { label: "Distribution", value: "National branches" },
    ],
    limitations: [
      "Product range varies — confirm current vinylester anchor product availability with local Parchem branch",
      "Some products in Parchem's range are for concrete anchoring — confirm suitability for cavity masonry tie application",
      "Hole cleaning requirements apply to all resin anchor systems — confirm protocol with supplier TDS",
      "Technical support available but specification must be confirmed by structural engineer",
    ],
    procurementSources: [
      "Parchem Construction Supplies — national branch network: Sydney, Melbourne, Brisbane, Perth, Adelaide, Darwin",
      "Parchem online or by phone for technical data and product selection",
    ],
  },
];

const SYSTEM_COMPARISON = [
  { supplier: "Helifix Australia", product: "Vinylester Resin System", resinType: "Vinylester", dampOK: "Yes", loadRating: "High", distribution: "National (authorised)", keyFeature: "Full system with tooling", primaryUse: "High-load cavity tie replacement" },
  { supplier: "Thor Helical Australia", product: "Thor Vinylester Tie", resinType: "Vinylester", dampOK: "Yes", loadRating: "High", distribution: "National (specialist)", keyFeature: "Specialist cavity tie focus", primaryUse: "High-load damp substrate" },
  { supplier: "Simpson Strong-Tie", product: "SET-XP Vinylester", resinType: "Vinylester (SET-XP)", dampOK: "Yes", loadRating: "Very high", distribution: "National (broad)", keyFeature: "ICC-ES / ETA published load data", primaryUse: "Engineer-specified anchoring" },
  { supplier: "Parchem", product: "HIT-RE 500 / Concresive", resinType: "Vinylester / epoxy", dampOK: "Yes", loadRating: "High", distribution: "National branches", keyFeature: "Technical support + broad range", primaryUse: "Specified through distributor" },
];

const TECH_INFO = {
  typicalApplications: ["Cavity wall tie replacement where helical ties cannot achieve required load", "Difficult masonry substrates with poor helical friction engagement", "High-load zones: parapets, lintels, elevated buildings", "Damp masonry where grouted helical ties or epoxy may be unsuitable"],
  selectionCriteria: ["Specify vinylester over polyester for damp or marine conditions", "Match tie diameter and embedment to engineer load requirements", "Confirm pot life for site temperature conditions before ordering", "Hole cleaning is critical — specify procedure in specification"],
  limitations: ["Pot life is temperature-dependent — check TDS for Australian summer conditions", "Hole must be clean — dust or debris reduces bond significantly", "Not suitable in standing water or freezing conditions", "Specialist distributor supply for most products"],
  standardsNotes: ["AS 3700 Masonry Structures — tie structural requirements", "Vinylester anchors with ETA or ICC-ES approvals provide engineer-accessible load tables", "Structural engineer must confirm tie spacing, diameter, and embedment for each project"],
  suitableDefects: ["Failed cavity wall ties in masonry with poor helical engagement", "High-demand zones requiring more than standard helical tie capacity", "Damp masonry substrates where epoxy resin is unsuitable"],
  typicalSubstrates: ["Clay brick masonry (most common)", "Calcium silicate brick", "Concrete block masonry", "Rendered cavity masonry — confirm tie can bridge render coat"],
};

function CollapsibleList({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const visible = open ? items : items.slice(0, 2);
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
            {item}
          </li>
        ))}
      </ul>
      {items.length > 2 && (
        <button onClick={() => setOpen(!open)} className="mt-2 flex items-center gap-1 text-[10px] font-bold text-sky-600 hover:text-sky-800">
          {open ? <><ChevronUp size={11} />Show less</> : <><ChevronDown size={11} />+{items.length - 2} more</>}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: string[] }) {
  const [open, setOpen] = useState(false);
  const visible = open ? sources : sources.slice(0, 2);
  return (
    <div>
      <ul className="space-y-1">
        {visible.map((s, i) => (
          <li key={i} className="text-xs leading-5 text-slate-500">{s}</li>
        ))}
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

export function VinylesterResinAnchorIntroSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-extrabold text-sky-950">Vinylester resin anchor cavity wall ties</h2>
      <p className="max-w-3xl text-sm leading-6 text-slate-600">
        Vinylester resin anchor systems use a Grade 316 stainless tie rod installed into pre-drilled holes with vinylester resin injection for high-load cavity wall tie replacement. Vinylester achieves reliable cure in damp masonry substrates where epoxy is inhibited, and provides higher characteristic bond strengths than grout-in helical systems. They are specified for high-load zones and substrates where helical friction engagement is unreliable. Structural engineer specification is required.
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

export function VinylesterResinAnchorProductSection() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allTags = Array.from(new Set(SUPPLIERS.flatMap((s) => s.filterTags)));
  const toggleFilter = (tag: string) =>
    setActiveFilters((f) => (f.includes(tag) ? f.filter((t) => t !== tag) : [...f, tag]));
  const filtered = activeFilters.length === 0
    ? SUPPLIERS
    : SUPPLIERS.filter((s) => activeFilters.every((t) => s.filterTags.includes(t)));

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
          <button onClick={() => setActiveFilters([])} className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 hover:bg-red-100">
            Clear filters
          </button>
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
                <a href={supplier.brandUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50 transition">
                  Brand site <ExternalLink size={11} />
                </a>
                {supplier.tdsUrl && (
                  <a href={supplier.tdsUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50 transition">
                    TDS <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {supplier.techChips.map((chip) => (
                <span key={chip} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">{chip}</span>
              ))}
            </div>
            <div className="mt-4">
              <CollapsibleDescription lines={supplier.systemDescription} />
            </div>
            <CollapsibleCardDetails supplier={supplier} />
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <div className="min-w-[700px]">
          <div className="border-b border-slate-100 px-5 py-3">
            <span className="text-xs font-extrabold text-sky-950">Supplier comparison — vinylester resin anchor wall ties</span>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Supplier", "Product", "Resin Type", "Damp OK", "Load Rating", "Distribution", "Key Feature", "Primary Use"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-2.5 font-bold text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.product}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.resinType}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.dampOK}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.loadRating}</td>
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
