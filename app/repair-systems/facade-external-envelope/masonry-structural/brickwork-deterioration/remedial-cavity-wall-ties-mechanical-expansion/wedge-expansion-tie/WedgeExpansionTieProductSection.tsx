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
    tdsUrl: "https://www.helifix.com.au/products/mechanical-ties",
    accentColor: "#0369a1",
    name: "Helifix CemTie Mechanical Expansion Tie",
    descriptionLine: "Stainless steel wedge expansion tie for solid masonry — no grout or resin required",
    productType: "Wedge Expansion Tie",
    filterTags: ["Helifix", "Wedge-expansion", "Mechanical", "Stainless-316", "Solid-masonry", "No-resin", "National", "AS-3700"],
    techChips: ["Wedge expansion", "316 SS", "No resin", "Solid masonry", "National", "AS 3700"],
    systemDescription: [
      "Helifix CemTie (or equivalent mechanical expansion tie) uses a wedge expansion mechanism — the tie is driven into a pre-drilled hole and tightened by torque to expand against the hole walls, creating a mechanical lock without resin or grout.",
      "Suitable for solid masonry substrates (dense clay brick, calcium silicate brick, dense concrete block) where the masonry can bear the expansion load without spalling.",
      "No resin or grout means immediate load transfer after installation — no curing time required.",
      "Available in Grade 316 stainless steel for corrosion resistance in remedial applications.",
    ],
    technicalProperties: [
      { label: "Fix type", value: "Wedge expansion" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Resin required", value: "None" },
      { label: "Masonry type", value: "Solid only" },
      { label: "Load transfer", value: "Immediate (no cure)" },
      { label: "Distribution", value: "National (authorised)" },
    ],
    limitations: [
      "Solid masonry only — wedge expansion in hollow, perforated, or soft brick will cause spalling or pull-out failure",
      "Requires correct torque during installation — under or over-torquing reduces pull-out resistance significantly",
      "Cannot be used in masonry with pre-existing cracks through the bore zone — expansion may worsen cracking",
      "Structural engineer confirmation required for tie spacing and load capacity",
    ],
    procurementSources: [
      "Helifix Australia — national distribution through authorised remedial distributors",
      "Remedial building specialist suppliers — Sydney, Melbourne, Brisbane, Perth, Adelaide",
      "Helifix website for nearest distributor",
    ],
  },
  {
    fullLabel: "Ancon Building Products Australia",
    brandUrl: "https://www.ancon.com.au",
    tdsUrl: "https://www.ancon.com.au/mechanical-ties",
    accentColor: "#b45309",
    name: "Ancon Mechanical Expansion Remedial Wall Tie",
    descriptionLine: "316 stainless mechanical expansion cavity tie for solid masonry — torque-set installation",
    productType: "Wedge Expansion Tie",
    filterTags: ["Ancon", "Wedge-expansion", "Mechanical", "Stainless-316", "Solid-masonry", "No-resin", "National", "AS-3700"],
    techChips: ["Wedge expansion", "316 SS", "Torque-set", "Ancon", "Solid masonry", "National"],
    systemDescription: [
      "Ancon mechanical expansion remedial wall tie uses a wedge or sleeve expansion anchor principle — installed by drilling, inserting, and torquing to a specified value to achieve load-bearing mechanical engagement.",
      "Ancon's mechanical tie systems are widely referenced in Australian remedial engineering specifications and are supported by published pull-out resistance data for engineer load calculations.",
      "No resin or grout required — the expansion mechanism provides immediate load transfer on installation.",
      "Available through Ancon's national specialist distribution network with technical support for specification.",
    ],
    technicalProperties: [
      { label: "Fix type", value: "Mechanical expansion" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Standard", value: "AS 3700" },
      { label: "Resin required", value: "None" },
      { label: "Load data", value: "Ancon published" },
      { label: "Distribution", value: "National (specialist)" },
    ],
    limitations: [
      "Solid masonry substrates only — do not use in hollow, perforated, or soft brick",
      "Installation torque is critical — confirm correct torque with Ancon TDS before installation",
      "Cannot be used where masonry is cracked or friable in the bore zone",
      "Specialist distribution — confirm local availability with Ancon before specifying",
    ],
    procurementSources: [
      "Ancon Building Products Australia — national distribution through specialist suppliers",
      "Masonry and fixings distributors — confirm local Ancon availability",
      "Ancon website for technical data and distributor network",
    ],
  },
  {
    fullLabel: "Simpson Strong-Tie Australia",
    brandUrl: "https://www.strongtie.com.au",
    tdsUrl: "https://www.strongtie.com.au/products/masonry-anchors",
    accentColor: "#7c3aed",
    name: "Simpson Strong-Tie Wedge-All / Titen HD Masonry Anchor",
    descriptionLine: "Stainless steel wedge expansion anchor for structural masonry anchoring and cavity tie installation",
    productType: "Wedge Expansion Tie",
    filterTags: ["Simpson", "Wedge-expansion", "Wedge-All", "Mechanical", "Stainless-316", "High-load", "National", "AS-3700", "ETA-approved"],
    techChips: ["Wedge-All", "316 SS", "ETA approved", "High load", "National", "Broad dist."],
    systemDescription: [
      "Simpson Strong-Tie Wedge-All and Titen HD are mechanical expansion anchors widely used for structural masonry anchoring including remedial cavity wall tie installation in solid masonry.",
      "Wedge-All is a stainless steel wedge anchor with ETA and ICC-ES approvals and published characteristic resistance values for engineer calculation using Profis Anchor design software.",
      "Available nationally through Simpson's broad distribution network including hardware chains — wider availability than specialist cavity tie suppliers.",
      "Engineers can reference Simpson's published load tables for AS 3700 compliant specifications.",
    ],
    technicalProperties: [
      { label: "Fix type", value: "Wedge expansion" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Standard", value: "AS 3700 / ETA" },
      { label: "Load data", value: "ETA + PROFIS" },
      { label: "Distribution", value: "National (broad)" },
      { label: "Hollow masonry", value: "No" },
    ],
    limitations: [
      "Solid masonry only — wedge expansion in hollow or soft brick will cause pull-out failure",
      "Installation torque must match Simpson published installation procedure — do not deviate",
      "Minimum edge distance and spacing requirements apply — consult Simpson load tables",
      "Confirm the Wedge-All configuration is appropriate for the specific cavity tie application with Simpson technical support",
    ],
    procurementSources: [
      "Simpson Strong-Tie Australia — broad national distribution including Bunnings trade and specialist fixings suppliers",
      "Trade fixings suppliers nationally",
      "Simpson website for local stockist and load tables",
    ],
  },
];

const SYSTEM_COMPARISON = [
  { supplier: "Helifix Australia", product: "CemTie Mechanical Expansion", mechanism: "Wedge expansion", grade: "316 SS", resin: "None", distribution: "National (authorised)", loadData: "Helifix published", primaryUse: "Solid masonry remedial tie" },
  { supplier: "Ancon Building Products", product: "Ancon Mechanical Tie", mechanism: "Wedge/sleeve expansion", grade: "316 SS", resin: "None", distribution: "National (specialist)", loadData: "Ancon published", primaryUse: "Solid masonry — engineer-specified" },
  { supplier: "Simpson Strong-Tie", product: "Wedge-All / Titen HD", mechanism: "Wedge expansion", grade: "316 SS", resin: "None", distribution: "National (broad)", loadData: "ETA + PROFIS", primaryUse: "Structural masonry anchoring" },
];

const TECH_INFO = {
  typicalApplications: ["Cavity wall tie replacement in solid dense masonry where grout or resin installation is impractical", "High-load applications requiring immediate load transfer without resin curing time", "Dense clay brick or calcium silicate brick outer leaf", "Situations where access for resin injection is restricted"],
  selectionCriteria: ["Confirm solid masonry substrate — never use wedge expansion in hollow, perforated, or soft brick", "Match anchor diameter and embedment to engineer load requirements", "Correct installation torque is critical — obtain and follow manufacturer's torque specifications", "Confirm minimum edge and spacing requirements before drilling layout"],
  limitations: ["Solid masonry substrates only — failure mode in hollow or soft brick is immediate and unpredictable", "Over-torquing can split brick faces — follow torque specification precisely", "Cannot be used in masonry with existing cracks through the bore zone", "Higher cost than helical grout-in ties for equivalent load — confirm with engineer"],
  standardsNotes: ["AS 3700 Masonry Structures — structural tie requirements", "ETA or ICC-ES approval provides engineer-accessible load tables (Simpson Wedge-All)", "Engineer confirmation of tie spacing and pattern required for each project"],
  suitableDefects: ["Failed cavity ties in dense solid masonry where resin installation is not practical", "High-demand zones needing immediate load transfer without cure time"],
  typicalSubstrates: ["Dense hard-fired clay brick (essential — soft brick will fail)", "Dense calcium silicate brick", "Dense concrete block", "Not suitable for hollow masonry, perforated brick, or soft heritage brick"],
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

export function WedgeExpansionTieIntroSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-extrabold text-sky-950">Wedge expansion mechanical wall ties</h2>
      <p className="max-w-3xl text-sm leading-6 text-slate-600">
        Wedge expansion cavity wall ties are installed by drilling, inserting, and torquing to a specified value — the wedge expands against the masonry bore hole walls to create a mechanical lock without resin or grout. Immediate load transfer is the key advantage over chemical anchor systems. Wedge expansion ties are only suitable for solid, dense masonry — never for hollow, perforated, or soft brick. Structural engineer confirmation is required.
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

export function WedgeExpansionTieProductSection() {
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
                <a href={supplier.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50 transition">
                  Brand site <ExternalLink size={11} />
                </a>
                {supplier.tdsUrl && (
                  <a href={supplier.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50 transition">
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
            <div className="mt-4"><CollapsibleDescription lines={supplier.systemDescription} /></div>
            <CollapsibleCardDetails supplier={supplier} />
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <div className="min-w-[700px]">
          <div className="border-b border-slate-100 px-5 py-3">
            <span className="text-xs font-extrabold text-sky-950">Supplier comparison — wedge expansion mechanical wall ties</span>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Supplier", "Product", "Mechanism", "Grade", "Resin", "Distribution", "Load Data", "Primary Use"].map((h) => (
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
                  <td className="px-4 py-2.5 text-slate-600">{row.resin}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.distribution}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.loadData}</td>
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
