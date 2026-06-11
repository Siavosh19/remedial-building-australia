"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Structural-Bond" | "Dormant-Crack" | "Fine-Crack" | "Concrete" | "Load-Bearing" | "Below-Grade";

type Product = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia — Sika Injection-451",
    brandUrl: "https://aus.sika.com",
    accentColor: "#0369a1",
    name: "Sika Injection-451 — Ultra-Low Viscosity Structural Epoxy Injection Resin",
    descriptionLine: "2-component ultra-low viscosity epoxy — penetrates fine cracks — structural bond reinstatement in dormant concrete cracks",
    productType: "Two-component low-viscosity structural epoxy injection resin",
    filterTags: ["Structural-Bond", "Dormant-Crack", "Fine-Crack", "Concrete", "Load-Bearing"],
    techChips: [
      { label: "Ultra-low viscosity", cls: "bg-sky-100 text-sky-800" },
      { label: "15–20 MPa bond", cls: "bg-slate-100 text-slate-700" },
      { label: "Dormant cracks only", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription: "Sika Injection-451 is a two-component ultra-low viscosity epoxy injection resin used to structurally reinstate dormant settlement cracks in concrete elements — foundations, retaining walls, and structural concrete frames. Very low viscosity (~100 mPa·s at +23°C; ~350 mPa·s at +8°C) allows the resin to penetrate hairline cracks (≥ 0.05 mm width) under very low pressure. When cured, the epoxy forms a structural bond across the crack plane. Compressive strength 70–80 N/mm²; tensile strength ~50 N/mm². Bond on water-saturated concrete is 2.6 N/mm² (failure in concrete). Dry crack is mandatory — epoxy will not cure or bond in the presence of free water.",
    technicalProperties: [
      "Ultra-low viscosity (~100 mPa·s at +23°C; ~350 mPa·s at +8°C) — penetrates cracks ≥ 0.05 mm",
      "Compressive strength 70–80 N/mm²; tensile strength ~50 N/mm² — bond on water-saturated concrete 2.6 N/mm²",
      "Two-component — A:B mixed at fixed ratio through static nozzle",
      "Sika Australia — national direct and distributor supply",
    ],
    limitations: [
      "Dry crack mandatory — epoxy will not cure or bond in the presence of free water; pre-dry crack before injection",
      "Dormant crack only — do not inject epoxy into an actively moving settlement crack",
      "Do not inject in PT concrete without GPR scan confirming tendon positions",
      "Pot life shortens significantly at high ambient temperature — plan injection in cool conditions where possible",
    ],
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Parchem — Conplex-301",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#15803d",
    name: "Parchem Conplex-301 — Structural Epoxy Injection Resin",
    descriptionLine: "2-component low-viscosity structural epoxy — structural reinstatement of dormant concrete cracks — Parchem national supply",
    productType: "Two-component structural epoxy injection resin",
    filterTags: ["Structural-Bond", "Dormant-Crack", "Concrete", "Load-Bearing", "Below-Grade"],
    techChips: [
      { label: "2-component epoxy", cls: "bg-green-100 text-green-800" },
      { label: "Low viscosity", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural reinstatement", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription: "Parchem Conplex-301 is a two-component low-viscosity structural epoxy injection resin for reinstatement of dormant settlement cracks in concrete. The Parchem distribution network provides broad Australian availability through their national branch network. Conplex-301 is compatible with standard single-component low-pressure injection pumps and twin-cartridge dispensing guns. The cured epoxy restores structural continuity across the crack plane. Parchem also supplies crack injection ports, injection pumps, and ancillary materials, making them a single-source supplier for the complete crack injection system including technical support.",
    technicalProperties: [
      "Two-component low-viscosity epoxy — structural reinstatement",
      "Compatible with standard low-pressure injection equipment",
      "Parchem national branch network — broad availability",
      "Technical support from Parchem engineering team",
    ],
    limitations: [
      "Dry crack mandatory — no free water at crack surfaces before injection",
      "Settlement must be confirmed dormant before epoxy injection",
      "Dispense waste shot from each new nozzle before injecting into crack — first material may be incompletely mixed",
      "Allow full cure per Parchem TDS before loading the repaired element",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "BASF / Master Builders Solutions — MasterInject 1315",
    brandUrl: "https://www.master-builders-solutions.com/en-au",
    accentColor: "#be123c",
    name: "BASF MasterInject 1315 — Low-Viscosity Structural Epoxy Injection",
    descriptionLine: "2-component low-viscosity epoxy injection resin — structural crack reinstatement — BASF Master Builders Solutions",
    productType: "Two-component structural epoxy injection resin",
    filterTags: ["Structural-Bond", "Dormant-Crack", "Fine-Crack", "Concrete", "Load-Bearing"],
    techChips: [
      { label: "BASF / MBS", cls: "bg-red-100 text-red-800" },
      { label: "Low viscosity", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural bond", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription: "BASF MasterInject 1315 is a low-viscosity two-component structural epoxy injection resin for reinstatement of dormant settlement cracks in concrete foundations, walls, and structural frames. Part of the Master Builders Solutions MasterInject range, which spans PU flexible resins and epoxy rigid resins, allowing the specifier to source both water-stop and structural products from the same BASF technical representative. Technical data and application guidance available from BASF Master Builders Solutions engineering team nationally. Used in settlement crack repair for dry, dormant structural cracks in concrete where full structural bond reinstatement is required.",
    technicalProperties: [
      "Two-component low-viscosity structural epoxy — MasterInject range",
      "Structural bond reinstatement in dormant, dry concrete cracks",
      "Compatible with standard low-pressure crack injection equipment",
      "BASF Master Builders Solutions — national technical support",
    ],
    limitations: [
      "Dormant, dry cracks only — no water in crack at time of injection",
      "Engineer confirmation of settlement dormancy required before injection",
      "Not suitable for cracks with ongoing movement — the rigid epoxy bond will re-crack if movement continues",
      "Full cure required before element is returned to structural load",
    ],
    procurementSources: [
      { name: "BASF Master Builders Solutions", url: "https://www.master-builders-solutions.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc Australia — Nitofill EP",
    brandUrl: "https://www.fosroc.com/en-au",
    accentColor: "#78716c",
    name: "Fosroc Nitofill EP — Epoxy Injection Resin for Structural Crack Repair",
    descriptionLine: "2-component low-viscosity epoxy — structural crack reinstatement — Fosroc national supply through Parchem",
    productType: "Two-component structural epoxy injection resin",
    filterTags: ["Structural-Bond", "Dormant-Crack", "Concrete", "Load-Bearing", "Below-Grade"],
    techChips: [
      { label: "Fosroc / Nitofill", cls: "bg-stone-200 text-stone-800" },
      { label: "Low viscosity", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural bond", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Fosroc Nitofill EP is a two-component low-viscosity epoxy injection resin for structural reinstatement of dormant cracks in concrete in settlement crack repair. Fosroc products are distributed in Australia primarily through Parchem Construction Supplies, which maintains the technical data library and provides application support. Nitofill EP is suitable for structural crack repair where a recognised manufacturer system with documented performance data is required by the engineer's specification. Used in concrete foundations, retaining walls, and structural elements where settlement has ceased and the crack requires structural reinstatement.",
    technicalProperties: [
      "Two-component low-viscosity epoxy — Fosroc Nitofill range",
      "Structural bond reinstatement in dormant dry concrete cracks",
      "Fosroc technical data library available through Parchem",
      "Suitable where named-manufacturer systems are required by specification",
    ],
    limitations: [
      "Dry crack required — epoxy does not bond to wet surfaces",
      "Settlement dormancy confirmation required before epoxy injection",
      "Rigid bond will re-crack if settlement movement continues — confirm settlement status with engineer",
      "Available through Parchem — direct Fosroc supply not standard in all markets",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies (Fosroc distributor)", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Structural-Bond", label: "Structural bond reinstatement" },
  { tag: "Dormant-Crack", label: "Dormant / static crack" },
  { tag: "Fine-Crack", label: "Fine hairline crack" },
  { tag: "Concrete", label: "Concrete substrate" },
  { tag: "Load-Bearing", label: "Load-bearing element" },
  { tag: "Below-Grade", label: "Below-grade / foundation" },
];

const TECH_INFO = {
  typicalApplications: [
    "Structural reinstatement of dormant settlement cracks in concrete foundations",
    "Epoxy injection of dry dormant cracks in concrete retaining walls after settlement has ceased",
    "Structural crack repair in concrete frames and walls following post-underpinning settlement stabilisation",
    "Fine crack injection (≥ 0.05 mm) in reinforced concrete elements where structural continuity must be restored",
    "Crack reinstatement in below-grade concrete walls before external waterproofing installation",
  ],
  selectionCriteria: [
    "Epoxy rigid injection is appropriate only for dormant, dry cracks where structural bond reinstatement is the goal",
    "All four products perform the same basic function — differentiation is by brand preference, engineer specification, and supply chain",
    "For hairline cracks (< 0.1 mm), select ultra-low viscosity products such as Sika Injection-451 (~100 mPa·s at 23°C) for best penetration",
    "For wider cracks (> 0.5 mm), use standard low-viscosity epoxy — Parchem, BASF, or Fosroc products are all suitable",
    "Crack must be dry — if wet, use PU flexible injection to stop water ingress first, dry out, then proceed with epoxy",
  ],
  whenNotToUse: [
    "Never inject epoxy into a wet or damp crack — the resin will not bond to wet surfaces and the injection will fail",
    "Do not inject epoxy into an actively moving settlement crack — the rigid bond will re-crack under continued movement",
    "Not for masonry cracks (brick, stone) — epoxy injection creates a bond harder than the masonry unit and can cause spalling; use lime mortar for masonry",
    "Do not inject in PT concrete without GPR scan confirming tendon positions",
    "Epoxy rigid injection is not a waterproofing treatment — a separate membrane or waterproofing system is required for below-grade water exclusion",
  ],
  standardsNotes: [
    "ICRI Technical Guideline 310.3 — Guide for the Selection of Polymer Materials for Crack Repair",
    "ACI 224.1R — Causes, Evaluation, and Repair of Cracks in Concrete Structures",
    "AS 3600 — Concrete Structures — crack repair requirements for structural concrete",
    "Engineer sign-off required for structural crack reinstatement in load-bearing elements",
    "Manufacturer TDS must be confirmed for current product specifications — viscosity, pot life, cure time",
  ],
  suitableDefects: [
    "Dormant settlement cracks in concrete foundations and footings",
    "Fine structural cracks in reinforced concrete walls from differential settlement",
    "Structural cracks in concrete retaining walls after underpinning or ground treatment",
    "Crack reinstatement in post-tensioned concrete slabs (GPR scan required before drilling)",
    "Structural concrete crack repair in basement walls and below-slab elements",
  ],
  typicalSubstrates: [
    "Reinforced concrete foundations — strip footings, pad footings, raft slabs",
    "Concrete retaining walls — both reinforced and unreinforced",
    "Concrete structural frames — columns, beams, walls",
    "Below-grade concrete structures — basements, pits, tanks",
    "Concrete block walls (dense solid block only) — hollow block requires different approach",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Sika Injection-451", viscosity: "Ultra-low (~100 mPa·s at 23°C)", minCrack: "≥ 0.05 mm", bond: "2.6 N/mm² (wet concrete); ~50 N/mm² tensile", supply: "Sika / Parchem" },
  { product: "Parchem Conplex-301", viscosity: "Low", minCrack: "≥ 0.1 mm", bond: "~15 MPa", supply: "Parchem (national)" },
  { product: "BASF MasterInject 1315", viscosity: "Low", minCrack: "≥ 0.1 mm", bond: "~15 MPa", supply: "BASF / Parchem" },
  { product: "Fosroc Nitofill EP", viscosity: "Low", minCrack: "≥ 0.1 mm", bond: "~15 MPa", supply: "Parchem (Fosroc distributor)" },
];

export function InjectionResinsEpoxyRigidIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Epoxy rigid injection — structural reinstatement in dormant concrete settlement cracks</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">When to use epoxy vs PU, dry crack requirement, and dormancy confirmation</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>Epoxy rigid injection is the correct treatment for structural reinstatement of dormant, dry settlement cracks in concrete elements. The low-viscosity epoxy penetrates the crack by capillary action and low-pressure injection, then cures to form a bond across the crack plane with strength that typically exceeds the parent concrete. The structural crack effectively disappears as a mechanical discontinuity — restoring full load transfer.</p>
          <p>The two non-negotiable preconditions are: (1) The crack must be dry — epoxy will not cure or bond in the presence of free water. If the crack is wet, treat with PU flexible injection first, allow to dry, then proceed with epoxy. (2) The settlement must be dormant — an epoxy bond in a still-moving crack will re-fracture. Engineer confirmation of settlement dormancy is required before specifying epoxy injection in settlement crack repair.</p>
        </div>
      )}
    </div>
  );
}

export function InjectionResinsEpoxyRigidProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (tag: FilterTag) =>
    setActiveFilters((prev) => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : n.add(tag); return n; });

  const filtered = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.some((t) => activeFilters.has(t)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter:</span>
        {FILTER_DEFS.map(({ tag, label }) => (
          <button key={tag} onClick={() => toggleFilter(tag)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${activeFilters.has(tag) ? "border-red-700 bg-red-700 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-sky-400"}`}>{label}</button>
        ))}
        {activeFilters.size > 0 && <button onClick={() => setActiveFilters(new Set())} className="text-xs font-bold text-red-700 underline">Clear</button>}
      </div>

      <div className="relative">
        <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronLeft size={16} /></button>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none]">
          {filtered.map((p) => (
            <div key={p.name} className="w-[380px] shrink-0 rounded-2xl border border-slate-200 bg-white overflow-hidden" style={{ borderTop: `4px solid ${p.accentColor}` }}>
              <div className="p-5">
                <a href={p.brandUrl} target="_blank" rel="noopener noreferrer" className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-sky-700">{p.fullLabel} ↗</a>
                {p.tdsUrl && <a href={p.tdsUrl} target="_blank" rel="noopener noreferrer" className="mb-2 flex items-center gap-1 text-[10px] font-semibold text-sky-600 hover:text-sky-800">TDS ↗</a>}
                <h3 className="text-sm font-extrabold leading-snug text-sky-950">{p.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{p.descriptionLine}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{p.productType}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.techChips.map((c) => <span key={c.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>)}
                </div>
                <CollapsibleDescription text={p.systemDescription} />
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <CollapsibleCardDetails
                    text=""
                    chips={p.filterTags.map((t) => ({ label: t.replace(/-/g, " "), cls: "bg-sky-50 text-sky-700" }))}
                  />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Technical properties</p>
                  <CollapsibleList items={p.technicalProperties} icon="check" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Limitations</p>
                  <CollapsibleList items={p.limitations} icon="x" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Procurement</p>
                  <CollapsibleSources sources={p.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronRight size={16} /></button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><Layers size={16} /></div>
            <span className="text-sm font-extrabold text-sky-950">Epoxy rigid injection technical reference</span>
          </div>
          <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-6 pb-6 pt-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <TechCard icon={<Layers size={14} />} title="Typical applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<CheckCircle size={14} />} title="Selection criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={14} />} title="When NOT to use" items={TECH_INFO.whenNotToUse} style="warn" />
              <TechCard icon={<FileText size={14} />} title="Standards & notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<SquareStack size={14} />} title="Suitable defects" items={TECH_INFO.suitableDefects} style="bullet" />
              <TechCard icon={<Ruler size={14} />} title="Typical substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-extrabold text-sky-950">Epoxy rigid injection — product comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Product", "Viscosity", "Min crack width", "Bond strength", "Supply"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SYSTEM_COMPARISON.map((row) => (
                <tr key={row.product} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-semibold text-sky-950">{row.product}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.viscosity}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.minCrack}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.bond}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.supply}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
