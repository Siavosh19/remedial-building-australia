"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag = "Liquid-membrane" | "Waterproofing" | "Hob" | "Balcony" | "AS-3740" | "Polyurethane" | "Acrylic" | "Two-part" | "One-part" | "NCC";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#dc2626",
    name: "Sika® Sikalastic®-560 / SikaMembrane®-720 liquid-applied membrane",
    descriptionLine: "Sika liquid-applied polyurethane or hybrid waterproofing membrane — used for balcony hob and threshold waterproofing termination — applied up and over the hob upstand and terminated at the top — requires primer and reinforcement mesh at changes of direction — confirm current product with Sika Australia",
    productType: "Liquid-applied waterproofing membrane — balcony hob termination — Sika",
    filterTags: ["Liquid-membrane", "Waterproofing", "Hob", "Balcony", "AS-3740", "Polyurethane", "Two-part", "NCC"],
    techChips: [
      { label: "Sika liquid WP", cls: "bg-slate-100 text-slate-700" },
      { label: "PU / hybrid", cls: "bg-sky-100 text-sky-800" },
      { label: "AS 3740", cls: "bg-green-50 text-green-700" },
      { label: "Confirm current product", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Sika liquid-applied waterproofing membranes (Sikalastic-560, SikaMembrane-720 or current equivalent) are used for balcony waterproofing including the hob and threshold termination detail. The membrane is applied in multiple coats to the prepared hob substrate, with reinforcement mesh (e.g., Sika® Reemat or equivalent) embedded in the first coat at all internal angles and changes of direction. The membrane is taken up and over the hob upstand and terminated at or above the top of the hob with a sealant termination bead or under a metal termination bar. The substrate must be primed with the compatible Sika primer (e.g., SikaPrimer MB or current equivalent) — confirm the correct primer for the substrate type. Minimum dry film thickness (DFT) must be confirmed in the TDS — typically 1.0–2.0mm depending on the product and application class. Confirm the current product name and TDS with Sika Australia before specifying — product ranges change periodically. All waterproofing at the hob must comply with AS 3740 and the project specification. TODO: owner confirm — confirm current Sika membrane product and primer selection for hob application.",
    technicalProperties: [
      "Liquid-applied PU or hybrid membrane — applied in multiple coats to achieve minimum DFT",
      "Reinforcement mesh required at all internal angles and changes of direction — embedded in first coat",
      "Compatible Sika primer required — confirm correct primer for concrete or masonry substrate",
      "Membrane terminates at or above top of hob — sealant bead or metal termination bar at top",
      "Complies with AS 3740 — confirm DFT and application requirements with current Sika TDS",
      "TODO: owner confirm — confirm current Sika membrane product and primer for hob application",
    ],
    limitations: [
      "Substrate must be clean, sound, primed and dry — wet or contaminated substrate will cause adhesion failure",
      "Minimum DFT must be achieved — confirm number of coats and application rate with TDS",
      "Reinforcement mesh must be installed at all internal angles — omission is a common waterproofing failure mode",
      "Membrane termination at top of hob must be sealed — open termination is a water entry point",
      "TODO: owner confirm — confirm current product name and TDS with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — direct or through distributors", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies — Sika waterproofing products", url: "https://www.parchem.com.au" },
      { name: "Building trade suppliers — Sika membrane products", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/mapelastic-aquadefense",
    accentColor: "#0369a1",
    name: "Mapei Mapelastic® AquaDefense / Mapelastic® Smart liquid membrane",
    descriptionLine: "Mapei liquid-applied waterproofing membrane — used for balcony hob and threshold waterproofing termination — one-part or two-part formulations available — reinforcement mesh at angles — requires compatible Mapei primer — confirm current product and DFT with Mapei Australia",
    productType: "Liquid-applied waterproofing membrane — balcony hob termination — Mapei",
    filterTags: ["Liquid-membrane", "Waterproofing", "Hob", "Balcony", "AS-3740", "One-part", "Two-part", "NCC"],
    techChips: [
      { label: "Mapei liquid WP", cls: "bg-slate-100 text-slate-700" },
      { label: "1-part or 2-part", cls: "bg-sky-100 text-sky-800" },
      { label: "AS 3740", cls: "bg-green-50 text-green-700" },
      { label: "Confirm current product", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Mapei liquid-applied waterproofing membranes including Mapelastic AquaDefense (one-part ready-to-use) and Mapelastic Smart (two-part) are used for balcony waterproofing including the hob and threshold termination. AquaDefense is a one-part product suitable for internal and external wet areas, while Mapelastic Smart is a two-part flexible cementitious membrane for more demanding external balcony applications. Both require reinforcement mesh (Mapei Mapenet 150 or equivalent) embedded in the first coat at all internal angles and changes of direction at the hob. The membrane is taken up and over the hob upstand and terminated at or above the top. Prime with compatible Mapei primer — confirm correct primer for the substrate type (concrete, masonry, mortar) with Mapei TDS. Minimum DFT must be achieved — confirm with current TDS. Confirm current product name and TDS with Mapei Australia before specifying. TODO: owner confirm — confirm Mapei membrane product selection for balcony hob application.",
    technicalProperties: [
      "One-part (AquaDefense) or two-part (Mapelastic Smart) liquid membrane — select grade for application",
      "Mapei Mapenet reinforcement mesh at all internal angles — embedded in first coat",
      "Compatible Mapei primer required — confirm for concrete or masonry substrate",
      "Membrane terminates at or above hob upstand — confirm termination detail with project WP spec",
      "Complies with AS 3740 — confirm DFT and number of coats with current Mapei TDS",
      "TODO: owner confirm — confirm Mapei product selection for hob application",
    ],
    limitations: [
      "Substrate must be primed and dry — wet substrate prevents adhesion",
      "Two-part Mapelastic Smart has a mixing and pot life requirement — confirm for site temperature",
      "Reinforcement mesh at angles is mandatory — omission leads to cracking at changes of direction",
      "Minimum DFT must be verified by wet film thickness gauge during application",
      "TODO: owner confirm — confirm current Mapei product name and TDS before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — direct or through distributors", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies — Mapei waterproofing products", url: "https://www.parchem.com.au" },
      { name: "Building trade suppliers — Mapei membrane products", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au/products/ardex-8-9/",
    accentColor: "#7c3aed",
    name: "Ardex 8+9™ rapid waterproofing compound / Ardex WPM liquid membrane",
    descriptionLine: "Ardex rapid-set waterproofing compound or liquid-applied membrane — two-component cementitious or polyurethane membrane — used for balcony hob and threshold waterproofing termination — fast-track return to service — confirm current product and DFT with Ardex Australia",
    productType: "Rapid liquid-applied waterproofing membrane — balcony hob — Ardex",
    filterTags: ["Liquid-membrane", "Waterproofing", "Hob", "Balcony", "AS-3740", "Two-part", "NCC"],
    techChips: [
      { label: "Ardex WP", cls: "bg-slate-100 text-slate-700" },
      { label: "Rapid-set option", cls: "bg-sky-100 text-sky-800" },
      { label: "2-component", cls: "bg-green-50 text-green-700" },
      { label: "TODO: confirm product", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Ardex waterproofing products for balcony hob applications include Ardex 8+9 Rapid Waterproofing Compound (a two-component rapid-set cementitious membrane) and the Ardex WPM range of liquid-applied membranes. Ardex 8+9 is particularly suited to remedial balcony programs where a fast return to service is needed — its rapid-set formulation allows tiling or surface treatment to commence within hours rather than days. The membrane is mixed (2:1 liquid to powder by volume) and applied in two coats with Ardex Fibreglass Tape embedded in the first coat at all internal angles and changes of direction including the hob base and top. The membrane is taken up and over the hob upstand and terminated at or above the top. Priming requirements confirm with current Ardex TDS. All balcony WP must comply with AS 3740. Confirm the most appropriate current Ardex product for the specific hob application with Ardex Australia before specifying. TODO: owner confirm — confirm Ardex product selection for hob application.",
    technicalProperties: [
      "Ardex 8+9 rapid-set two-component cementitious membrane — fast track for early return to service",
      "Ardex Fibreglass Tape at all internal angles and changes of direction — including hob base and top",
      "Priming requirements per current Ardex TDS — confirm for specific substrate",
      "Rapid-set — tiles or surface treatment can commence within hours of application",
      "Complies with AS 3740 — confirm DFT and application requirements with current Ardex TDS",
      "TODO: owner confirm — confirm Ardex product selection for hob application with Ardex Australia",
    ],
    limitations: [
      "Mixing ratio is critical — 2:1 liquid to powder by volume — incorrect ratio affects waterproofing performance",
      "Reinforcement tape at all angles is mandatory — omission is a common failure mode",
      "Substrate must be primed and in SSD condition — confirm with current Ardex TDS",
      "Rapid-set — plan work carefully to avoid premature set in hot weather",
      "TODO: owner confirm — confirm current Ardex product and TDS before specifying",
    ],
    procurementSources: [
      { name: "Ardex Australia — direct or through distributors", url: "https://www.ardex.com.au" },
      { name: "Parchem Construction Supplies — Ardex waterproofing products", url: "https://www.parchem.com.au" },
      { name: "Building trade suppliers — Ardex membrane products", url: "https://www.ardex.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Liquid-membrane", label: "Liquid membrane" },
  { id: "Waterproofing", label: "Waterproofing" },
  { id: "Polyurethane", label: "Polyurethane" },
  { id: "One-part", label: "One-part" },
  { id: "Two-part", label: "Two-part" },
  { id: "Hob", label: "Hob" },
  { id: "Balcony", label: "Balcony" },
  { id: "AS-3740", label: "AS 3740" },
];

const SYSTEM_COMPARISON = [
  { product: "Sika Sikalastic-560 / SikaMembrane-720", brand: "Sika", parts: "Two-part", set: "Standard", mesh: "Sika Reemat", dft: "Per TDS", primaryUse: "Sika liquid PU/hybrid membrane for balcony hob waterproofing — confirm current product name" },
  { product: "Mapei Mapelastic AquaDefense / Smart", brand: "Mapei", parts: "1 or 2-part", set: "Standard", mesh: "Mapenet 150", dft: "Per TDS", primaryUse: "Mapei one-part or two-part membrane for hob — select grade for internal vs external exposure" },
  { product: "Ardex 8+9 / Ardex WPM", brand: "Ardex", parts: "Two-part", set: "Rapid", mesh: "Ardex fibreglass tape", dft: "Per TDS", primaryUse: "Ardex rapid-set cementitious membrane — fast return to service for remedial balcony programs" },
];

const TECH_INFO = {
  typicalApplications: [
    "Waterproofing of balcony door hob upstands — membrane applied up and over the hob and terminated at the top",
    "Full balcony waterproofing membrane system including hob, slab field, perimeter upstands and drain surround",
    "Remedial waterproofing of balconies where the existing membrane has failed or reached end of service life",
    "Liquid membrane termination at the base and top of the hob where a pre-formed threshold profile is not installed",
    "Waterproofing of concrete hob formed with rapid-set mortar — liquid membrane applied after mortar cures",
  ],
  selectionCriteria: [
    "Confirm the membrane product is appropriate for external balcony exposure — not all liquid membranes are suitable for external applications",
    "Confirm DFT requirements in the TDS — measure wet film thickness during application to verify DFT is being achieved",
    "Reinforcement mesh must be embedded in the first coat at all internal angles — including hob base, top and corners",
    "Prime with the correct primer for the substrate — wrong primer or no primer is the most common cause of adhesion failure",
    "Confirm the membrane termination detail at the top of the hob — an open or poorly sealed termination is a water entry point",
    "Confirm current product name and TDS with the manufacturer before specifying — membrane product ranges are updated periodically",
  ],
  limitations: [
    "Liquid membranes are not suitable for application on substrates with active water pressure from behind",
    "Cannot be applied over oil contamination, release agents, or existing failed membranes — remove to bare substrate",
    "DFT must be verified during application — post-application DFT testing is the only way to confirm compliance",
    "Reinforcement mesh omission at internal angles is a common and critical failure mode — enforce strictly on site",
    "Some liquid membranes require a second applicator coat — confirm number of coats with the TDS",
  ],
  standardsNotes: [
    "AS 3740 — waterproofing of domestic wet areas — minimum membrane DFT and hob height requirements",
    "NCC Volume One — balcony waterproofing and threshold performance requirements for Class 2 buildings",
    "AS/NZS 4858 — wet area membranes — product classification and performance requirements",
    "Manufacturer TDS — confirm DFT, number of coats, primer, reinforcement mesh and curing time before specifying",
  ],
  suitableDefects: [
    "Failed or aged balcony waterproofing membrane at hob and threshold requiring complete replacement",
    "Water ingress at balcony door threshold due to failed membrane termination at the hob upstand",
    "Hob waterproofing that has delaminated, cracked or been damaged by building movement or traffic",
    "Balcony hob that has been re-formed in mortar and now requires a new waterproofing membrane applied over the repair",
  ],
  typicalSubstrates: [
    "Concrete balcony slab and hob — most common substrate — confirm primer selection for concrete with manufacturer TDS",
    "Cementitious repair mortar hob — confirm compatibility of membrane with the specific repair mortar product",
    "Pre-formed aluminium or stainless threshold profile — confirm membrane adhesion to metallic substrate with manufacturer — may require primer",
    "Not suitable for application over existing failed membrane — remove to bare substrate before applying new membrane",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded(e => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${items.length - limit} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button onClick={() => setExpanded(e => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map(src => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm current product name, DFT requirements and primer selection before ordering.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map(chip => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}</div>}</>)}
      <button onClick={() => setExpanded(e => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded(e => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
    </div>
  );
}

export function WPTermLiquidIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are liquid-applied membrane systems for balcony hob waterproofing termination?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Liquid-applied waterproofing membranes are the most common membrane type used for balcony hob and threshold waterproofing in Australian Class 2 strata buildings. They are applied as a liquid that cures to form a seamless, flexible membrane that conforms to the substrate geometry — including the hob upstand — without the need for prefabricated sheet or torch-on products at complex junctions.</p>
        {expanded && <p>At the balcony door hob, the liquid membrane is applied up and over the hob upstand and terminated at or above the top of the hob, where it is protected from UV and physical damage by a sealant termination bead or a metal termination bar. Reinforcement mesh (fibreglass mesh or non-woven fabric, depending on the product system) must be embedded in the membrane at all internal angles — including the base and top of the hob — where differential movement and stress concentration can cause cracking of an unreinforced membrane. The membrane must achieve the minimum dry film thickness (DFT) specified in the TDS — DFT is verified using a wet film thickness gauge during application. AS 3740 and AS/NZS 4858 govern waterproofing membrane performance requirements for wet areas and balconies in Australia.</p>}
      </div>
      <button onClick={() => setExpanded(e => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
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

export function WPTermLiquidProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter(p => Array.from(activeFilters).every(f => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen(o => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — liquid-applied waterproofing membrane systems — scroll to view all</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map(f => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map(product => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Supplier</a>
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> TDS</a>}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <CollapsibleList items={product.technicalProperties} icon="check" limit={3} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList items={product.limitations} icon="x" limit={3} />
                  </div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of liquid-applied membrane systems for hob waterproofing termination. Confirm current product names and DFT before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Parts</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Set speed</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Mesh type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">DFT</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.parts}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.set}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.mesh}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.dft}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
