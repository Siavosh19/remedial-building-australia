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
    tdsUrl: "https://www.helifix.com.au/products/remedial-wall-ties",
    accentColor: "#0369a1",
    name: "Helifix SockFix Resin Injection Kit",
    descriptionLine: "Complete proprietary kit: 316 stainless tie + resin cartridge + installation tool in one system",
    productType: "Proprietary Kit System",
    filterTags: ["Helifix", "Proprietary-kit", "Resin-anchor", "Stainless-316", "Complete-system", "National", "AS-3700", "Cavity-tie"],
    techChips: ["SockFix kit", "316 SS", "Complete system", "Resin-inject", "National", "AS 3700"],
    systemDescription: [
      "Helifix SockFix is a complete proprietary remedial cavity wall tie kit combining a Grade 316 stainless helical tie, resin cartridge, and installation driver in a single coordinated system.",
      "The SockFix system uses a proprietary woven sock sleeve that draws resin into the bore hole as the tie is driven, providing consistent grout distribution without the need for separate grout injection.",
      "The kit format reduces the risk of component incompatibility and simplifies procurement for contractors — all components are sourced from a single supplier with published load data.",
      "Specified by engineers and specified in Australian remedial building scopes as a complete resin tie kit system.",
    ],
    technicalProperties: [
      { label: "Kit type", value: "Complete (tie + resin + tool)" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Standard", value: "AS 3700" },
      { label: "Resin type", value: "Proprietary (vinylester/resin)" },
      { label: "Load data", value: "Helifix published" },
      { label: "Distribution", value: "National (authorised)" },
    ],
    limitations: [
      "Must be purchased from Helifix authorised distributor — components are not interchangeable with other brands",
      "Resin shelf life applies — confirm expiry date of resin cartridge components before installation",
      "Installation requires Helifix-specific driver tool — confirm tool availability before scheduling work",
      "Structural engineer must confirm tie specification and spacing for each project",
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
    tdsUrl: "https://www.thorhelical.com.au/cavity-tie-kits",
    accentColor: "#b45309",
    name: "Thor Helical Remedial Tie Kit System",
    descriptionLine: "Complete Thor remedial cavity wall tie kit with tie, ThixoFix grout, and installation driver",
    productType: "Proprietary Kit System",
    filterTags: ["Thor-Helical", "Proprietary-kit", "Resin-anchor", "Stainless-316", "Complete-system", "National", "AS-3700", "Cavity-tie"],
    techChips: ["Thor kit", "316 SS", "ThixoFix", "Complete system", "National", "AS 3700"],
    systemDescription: [
      "Thor Helical supplies a complete remedial cavity wall tie kit system including Grade 316 stainless helical tie, ThixoFix thixotropic grout cartridge, and installation driver.",
      "The kit system ensures component compatibility and simplifies procurement — all components are from a single supplier with a coordinated installation method.",
      "ThixoFix thixotropic grout minimises migration into the cavity during installation, providing consistent grout distribution around the tie.",
      "Thor Helical provides published load data and installation guides for engineer specification.",
    ],
    technicalProperties: [
      { label: "Kit type", value: "Complete (tie + grout + tool)" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Standard", value: "AS 3700" },
      { label: "Grout type", value: "ThixoFix thixotropic" },
      { label: "Load data", value: "Thor Helical published" },
      { label: "Distribution", value: "National (specialist)" },
    ],
    limitations: [
      "Available through Thor Helical specialist distributors — not from general hardware",
      "Grout shelf life applies — confirm expiry before installation",
      "Components are not cross-compatible with other proprietary systems without confirmation",
      "Engineer confirmation required for tie diameter and spacing",
    ],
    procurementSources: [
      "Thor Helical Australia — national distribution through specialist network",
      "Remedial building specialist suppliers",
      "Thor Helical website for nearest authorised distributor",
    ],
  },
  {
    fullLabel: "Simpson Strong-Tie Australia",
    brandUrl: "https://www.strongtie.com.au",
    tdsUrl: "https://www.strongtie.com.au/products/masonry-anchors",
    accentColor: "#7c3aed",
    name: "Simpson Strong-Tie Remedial Cavity Tie Kit",
    descriptionLine: "Complete Simpson remedial cavity tie kit with 316 stainless tie, resin, and driver tool",
    productType: "Proprietary Kit System",
    filterTags: ["Simpson", "Proprietary-kit", "Resin-anchor", "Stainless-316", "Complete-system", "National", "AS-3700", "Cavity-tie"],
    techChips: ["Simpson kit", "316 SS", "Resin anchor", "Complete system", "National", "AS 3700"],
    systemDescription: [
      "Simpson Strong-Tie offers a complete remedial cavity wall tie kit combining Grade 316 stainless tie rods, resin anchor adhesive (SET-XP or equivalent), and installation tooling in a coordinated system.",
      "Simpson's broad national distribution makes kit components accessible through hardware and trade suppliers beyond specialist remedial distributors.",
      "The Simpson system is supported by published load data and Profis Anchor design software for engineer specification in compliance with AS 3700.",
      "Technical support is available through Simpson's national sales and engineering team.",
    ],
    technicalProperties: [
      { label: "Kit type", value: "Tie + resin + tool" },
      { label: "Steel grade", value: "Grade 316 stainless" },
      { label: "Standard", value: "AS 3700 / ETA" },
      { label: "Load data", value: "ETA + PROFIS" },
      { label: "Distribution", value: "National (broad)" },
      { label: "Technical support", value: "Yes" },
    ],
    limitations: [
      "Confirm the specific Simpson remedial tie kit configuration with Simpson before ordering — product range may change",
      "Hole cleaning is critical for all resin components — follow Simpson installation method",
      "Resin pot life is temperature-dependent — confirm open time for Australian summer conditions",
      "Structural engineer confirmation required for tie configuration and spacing",
    ],
    procurementSources: [
      "Simpson Strong-Tie Australia — national distribution including Bunnings trade desk and specialist fixings suppliers",
      "Trade hardware suppliers nationally — confirm Simpson remedial tie kit availability",
      "Simpson website for local stockist and technical data",
    ],
  },
];

const SYSTEM_COMPARISON = [
  { supplier: "Helifix Australia", product: "SockFix Resin Kit", kitType: "Tie + resin + tool", resin: "Proprietary vinylester", distribution: "National (authorised)", loadData: "Helifix published", keyFeature: "Sock sleeve — consistent grout distribution", primaryUse: "Standard proprietary kit system" },
  { supplier: "Thor Helical Australia", product: "Thor Remedial Tie Kit", kitType: "Tie + ThixoFix + tool", resin: "ThixoFix thixotropic", distribution: "National (specialist)", loadData: "Thor published", keyFeature: "Thixotropic grout — minimal cavity migration", primaryUse: "Standard proprietary kit system" },
  { supplier: "Simpson Strong-Tie", product: "Simpson Remedial Cavity Kit", kitType: "Tie + SET-XP + tool", resin: "Vinylester/epoxy (SET-XP)", distribution: "National (broad)", loadData: "ETA + PROFIS", keyFeature: "Broad distribution + ETA load data", primaryUse: "Engineer-specified with broad availability" },
];

const TECH_INFO = {
  typicalApplications: ["Cavity wall tie replacement using a single-supplier coordinated kit system", "Situations where component compatibility must be guaranteed", "Contractor preference for simple kit procurement", "Engineer-specified proprietary tie systems with published load data"],
  selectionCriteria: ["Select proprietary kit over separate components where installation consistency is a priority", "Confirm kit includes the required tie diameter and length for the specific project cavity width", "Match grout/resin type to substrate moisture conditions — confirm with kit supplier", "Verify load data is available in the form required by the engineer"],
  limitations: ["Kit components are not interchangeable between brands without confirmation", "Resin/grout shelf life applies — check expiry before scheduling work", "Some kits require brand-specific driver tools — confirm tool availability", "Structural engineer specification required for tie configuration"],
  standardsNotes: ["AS 3700 Masonry Structures — structural tie requirements", "Published load data (ETA, ICC-ES, or supplier test data) required for engineer calculation", "Engineer confirmation of tie spacing and pattern required for each project"],
  suitableDefects: ["Failed cavity wall ties where a complete coordinated system is preferred over specifying components separately", "Contractor-procured cavity tie replacement programmes"],
  typicalSubstrates: ["Clay brick masonry (most common)", "Calcium silicate brick", "Concrete block masonry", "Confirm tie length for actual cavity width on site"],
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

export function ProprietaryKitSystemIntroSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-extrabold text-sky-950">Proprietary resin anchor cavity wall tie kit systems</h2>
      <p className="max-w-3xl text-sm leading-6 text-slate-600">
        Proprietary kit systems integrate the tie rod, resin/grout, and installation driver in a single-supplier coordinated package. Kit systems simplify procurement, guarantee component compatibility, and reduce the risk of field substitutions. The trade-off is that components are brand-specific and must be sourced from the same supplier. Structural engineer specification of tie configuration is still required regardless of which kit is selected.
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

export function ProprietaryKitSystemProductSection() {
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
            <span className="text-xs font-extrabold text-sky-950">Supplier comparison — proprietary resin anchor kit systems</span>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Supplier", "Product", "Kit Type", "Resin", "Distribution", "Load Data", "Key Feature", "Primary Use"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-2.5 font-bold text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.product}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.kitType}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.resin}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.distribution}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.loadData}</td>
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
