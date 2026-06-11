"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Movement-joint" | "Paintable" | "Facade" | "Render" | "Masonry" | "Concrete" | "PU" | "ISO-11600" | "Horizontal" | "Vertical" | "Crack-accommodation";

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
    brandUrl: "https://www.sika.com/au",
    tdsUrl: "https://www.sika.com/au",
    accentColor: "#dc2626",
    name: "Sikaflex-11FC+ (movement joint formation)",
    descriptionLine: "One-part PU sealant applied into a formed movement joint to accommodate ongoing facade movement and prevent recurring cracking — applied into a chased-out joint with backer rod and Sika Primer-3N — the most commonly specified movement joint sealant in Australian Class 2 strata facade remediation",
    productType: "One-part PU movement joint sealant — formed facade joints — paintable",
    filterTags: ["Movement-joint", "Paintable", "Facade", "Render", "Masonry", "Concrete", "PU", "ISO-11600", "Vertical", "Horizontal", "Crack-accommodation"],
    techChips: [
      { label: "One-part PU", cls: "bg-slate-100 text-slate-700" },
      { label: "±25% movement", cls: "bg-sky-100 text-sky-800" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "ISO 11600 F-25LM", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Sikaflex-11FC+ applied into a properly formed movement joint is the most commonly specified movement joint sealant system in Australian Class 2 strata facade remediation where facade cracking has occurred due to inadequate or absent movement joint provision. The process involves: (1) chasing out the crack location to form a parallel-sided joint of adequate width (typically 10–20mm) and depth; (2) cleaning the joint faces; (3) applying Sika Primer-3N to joint faces and allowing to flash off; (4) installing a closed-cell PE foam backer rod at the correct depth; (5) applying Sikaflex-11FC+ by gun and tooling flush or slightly concave. The formed joint accommodates ±25% movement — the crack cannot recur because the joint has replaced the rigid crack location with a flexible sealant. After cure, the joint can be overpainted. The joint width must be designed for the expected movement — typical facade movement joints are 10–20mm wide. Confirm joint dimensions and primer from the current Sika system guide.",
    technicalProperties: [
      "One-part moisture-curing — no mixing — applied from cartridge",
      "±25% movement accommodation (ISO 11600 F-25LM)",
      "Paintable after cure — suitable for overcoating with facade paint",
      "Suitable for render, masonry and concrete facade movement joints",
      "Primer (Sika Primer-3N) required on most substrates — confirm from TDS",
      "Backer rod required — closed-cell PE foam, 25–30% larger than joint width",
    ],
    limitations: [
      "Joint must be properly formed (chased) to correct width and parallel faces — cannot be applied into V-shaped crack without forming",
      "Primer flash-off must be observed before applying sealant",
      "Backer rod must be installed before sealant application — no three-sided adhesion",
      "Joint width must accommodate expected movement — undersized joints will fail",
      "Not suitable for wide structural expansion joints — engineering design required",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://www.sika.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Tremco Australia",
    brandUrl: "https://www.tremcoinc.com.au",
    tdsUrl: "https://www.tremcoinc.com.au",
    accentColor: "#0369a1",
    name: "Tremco Vulkem 116 (movement joint formation)",
    descriptionLine: "One-part PU sealant applied into a formed facade movement joint — high movement accommodation — suitable for facade crack remediation where a movement joint is formed at the crack location — Tremco primer may be required on substrates",
    productType: "One-part PU movement joint sealant — high-movement facade joints",
    filterTags: ["Movement-joint", "Paintable", "Facade", "Render", "Masonry", "Concrete", "PU", "ISO-11600", "Vertical", "Horizontal", "Crack-accommodation"],
    techChips: [
      { label: "One-part PU", cls: "bg-slate-100 text-slate-700" },
      { label: "High movement", cls: "bg-sky-100 text-sky-800" },
      { label: "Facade joints", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Tremco Vulkem 116 applied into a properly formed movement joint is a high-movement facade crack remediation system. Where facade cracking has occurred at a location subject to significant ongoing thermal movement, a movement joint wider than a standard control joint may be required to accommodate the movement demand without sealant failure. Tremco Vulkem 116 offers high movement accommodation suitable for these applications. The crack must be chased to form a parallel-sided joint of adequate width, joint faces cleaned, primer (Tremco 636 or equivalent) applied and flashed off, closed-cell backer rod installed, and sealant applied and tooled. The formed movement joint prevents recurring cracking by providing a controlled flexible zone at the expected movement location. Confirm joint dimensions, primer requirements and movement class with Tremco Australia technical. TODO: owner confirm — confirm primer requirements, movement class and current product designation with Tremco Australia.",
    technicalProperties: [
      "One-part moisture-curing — applied from cartridge",
      "High movement accommodation — suitable for wider or more active facade joints",
      "Paintable after cure — confirm with Tremco Australia",
      "Primer (Tremco 636 or system primer) may be required — confirm substrate primer",
      "Suitable for render, masonry and concrete substrates",
      "TODO: owner confirm — confirm movement class, primer and parameters from current Tremco TDS",
    ],
    limitations: [
      "Joint must be properly formed — parallel-sided, adequate width, correct depth",
      "Primer must flash off before sealant application",
      "Backer rod required — prevents three-sided adhesion failure",
      "Not suitable for structurally active or structural expansion joints without engineering input",
      "TODO: owner confirm — confirm all parameters with Tremco Australia technical",
    ],
    procurementSources: [
      { name: "Tremco Australia — trade supply", url: "https://www.tremcoinc.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au",
    accentColor: "#7c3aed",
    name: "Ardex FS-40 (facade movement joint)",
    descriptionLine: "One-part polyurethane facade joint sealant — suitable for movement joint formation at facade crack locations — paintable — compatible with Ardex render and coating systems — used in Australian strata facade crack remediation where Ardex system is specified",
    productType: "One-part PU sealant — facade movement joints — Ardex system compatible",
    filterTags: ["Movement-joint", "Paintable", "Facade", "Render", "Masonry", "PU", "ISO-11600", "Vertical", "Horizontal"],
    techChips: [
      { label: "One-part PU", cls: "bg-slate-100 text-slate-700" },
      { label: "Ardex system", cls: "bg-sky-100 text-sky-800" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Ardex FS-40 is a one-part polyurethane facade joint sealant from Ardex Australia, used for movement joint sealing in facade remediation and new construction. Where an Ardex render or coating system is being applied as part of the facade remediation scope, Ardex FS-40 provides a compatible sealant for movement joint formation at crack locations within the same manufacturer system. Using products from the same system manufacturer ensures technical compatibility and warranty continuity. Apply into a properly formed joint with Ardex primer (if required — confirm from TDS), closed-cell backer rod and sealant application by gun. Ardex has a national technical and distribution network in Australia. Confirm the current product designation, primer requirement and system compatibility with Ardex Australia technical before specifying. TODO: owner confirm — confirm current product designation, system compatibility, primer requirements and movement class with Ardex Australia.",
    technicalProperties: [
      "One-part polyurethane — applied from cartridge — no mixing required",
      "Paintable after cure — compatible with Ardex topcoat systems",
      "Compatible with Ardex render and coating facade systems",
      "Ardex national technical and distribution support",
      "TODO: owner confirm — confirm movement class, primer and parameters from current Ardex TDS",
    ],
    limitations: [
      "Joint must be properly formed before application — chase crack to parallel-sided joint",
      "Primer may be required — confirm substrate-specific primer with Ardex Australia",
      "Backer rod required — confirm closed-cell PE foam before applying sealant",
      "Not suitable for structural expansion joints without engineering design",
      "TODO: owner confirm — confirm current product designation and all application parameters with Ardex Australia",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Movement-joint", label: "Movement joint" },
  { id: "Paintable", label: "Paintable" },
  { id: "Facade", label: "Facade" },
  { id: "Render", label: "Render" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "PU", label: "Polyurethane" },
  { id: "ISO-11600", label: "ISO 11600" },
  { id: "Horizontal", label: "Horizontal" },
  { id: "Vertical", label: "Vertical" },
  { id: "Crack-accommodation", label: "Crack accommodation" },
];

const SYSTEM_COMPARISON = [
  { product: "Sikaflex-11FC+", brand: "Sika", movement: "±25%", paintable: "Yes", primer: "Sika Primer-3N on porous", system: "Universal — any facade system", primaryUse: "Most common movement joint sealant in Australian Class 2 strata facade crack remediation" },
  { product: "Vulkem 116", brand: "Tremco", movement: "High — confirm TDS", paintable: "Yes — confirm", primer: "Tremco 636 may be required", system: "Tremco sealant system", primaryUse: "High-movement facade joints — where ±25% is insufficient — confirm with Tremco technical" },
  { product: "Ardex FS-40", brand: "Ardex", movement: "Confirm TDS", paintable: "Yes", primer: "Confirm Ardex TDS", system: "Ardex render / coating system", primaryUse: "Movement joint sealing where Ardex render or coating system is part of the scope" },
];

const TECH_INFO = {
  typicalApplications: [
    "Forming movement joints at facade crack locations to prevent recurring cracking — chase crack, form joint, apply sealant",
    "Installing missing control joints in rendered facades where cracking has occurred from lack of joint provision",
    "Reinstating failed movement joints in concrete facades at regular joint spacing intervals",
    "Creating flexible discontinuities in render coats at storey-height intervals to accommodate interstory movement",
    "Movement joint formation where facade is being fully recoated as part of a remediation program",
  ],
  selectionCriteria: [
    "Confirm crack is non-structural and caused by lack of movement joint provision — not by structural or waterproofing failure",
    "Joint width must be designed for the expected movement — minimum 10mm for facade control joints",
    "Joint depth must allow correct backer rod and sealant profile — depth = 50–70% of width",
    "Paintability is almost always required in facade movement joint work — confirm before specifying silicone",
    "Match sealant to the facade system if Ardex or other system manufacturer product is being used",
    "Confirm primer requirement for specific substrate from sealant manufacturer TDS",
  ],
  limitations: [
    "Movement joints cannot repair structurally active cracks — engineering assessment required first",
    "Joint must be properly formed (chased) to correct width and parallel faces — sealant applied into a V-shaped crack will fail",
    "Joint spacing must be designed correctly — too-wide spacing between joints means movement accumulates at wrong locations",
    "Backer rod is mandatory — never apply sealant into a formed joint without backer rod",
    "Primer must flash off completely before sealant application — premature application causes adhesion failure",
  ],
  standardsNotes: [
    "ISO 11600 — Building Construction — Jointing products — Classification and requirements for sealants",
    "AS 3700 — Masonry structures — movement joint design and spacing requirements",
    "AS 3600 — Concrete structures — movement joint design requirements",
    "BCA / NCC — provisions for movement joint provision in facade construction",
    "Manufacturer TDS and system guide — confirm joint dimensions, primer and movement class",
  ],
  suitableDefects: [
    "Recurring facade cracking at the same location due to absence of movement joint provision",
    "Cracking at control joint locations where sealant has failed and crack has re-opened",
    "Regular pattern cracking in rendered facades consistent with thermal movement without joint provision",
    "Facade cracking at storey heights, construction joints or substrate changes where joints were not installed",
  ],
  typicalSubstrates: [
    "Cement render — sand-and-cement and polymer-modified render facades",
    "Masonry — brick and block facades where joint provision is absent",
    "Concrete — external concrete facades and spandrel panels",
    "Render over masonry or concrete — composite facade systems",
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
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with current manufacturer TDS. Movement joint design requires professional assessment.</p>
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

export function MJSealantIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are movement joint sealant systems in facade crack remediation?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Movement joint sealant systems for facade crack remediation address cracking that has occurred because the facade lacks adequate movement joint provision — no control joints, inadequate joint spacing, or failed existing joints. Unlike flexible crack fillers applied directly into a crack, movement joint systems involve deliberately forming a joint at the crack location: the crack is chased (cut or routed) to create a wider, parallel-sided slot of designed dimensions, then a sealant-backed joint system is installed to accommodate the ongoing movement that caused the crack.</p>
        {expanded && <p>The critical advantage of a formed movement joint over a simple crack filler is movement capacity: a properly sized movement joint with a one-part PU sealant and backer rod can accommodate ±25% or more of its width in movement — enough to handle Australian thermal cycling in rendered and masonry facades without re-cracking. A crack filler applied into the original crack width has far less capacity. The formed joint also prevents three-sided adhesion failure because a backer rod controls sealant depth. After the movement joint sealant has cured, it can be overpainted. Movement joint formation is one of the most effective long-term remedies for recurring facade cracking from inadequate joint provision — but it requires professional assessment of crack cause, joint spacing design and sealant specification before work commences.</p>}
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

export function MJSealantProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — movement joint sealant systems for facade crack remediation — scroll to view all</p>
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
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
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
            <p className="mt-1 text-sm text-slate-500">Movement joint sealant comparison for facade crack remediation. Always obtain professional assessment before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Movement</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Paintable</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primer</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">System</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.movement}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.paintable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.primer}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.system}</td>
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
