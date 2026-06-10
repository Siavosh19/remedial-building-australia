"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "WTA-renovation-plaster"
  | "Salt-resistant"
  | "Rising-damp"
  | "Undercoat"
  | "Finish-coat"
  | "System"
  | "Breathable"
  | "Internal"
  | "External";

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
  procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    tdsUrl: "https://www.remmers.com.au",
    accentColor: "#1a5276",
    name: "Remmers SP Renovation Plaster System",
    descriptionLine: "WTA 2-9-04 compliant two-coat renovation plaster system — salt-resistant undercoat and finish plaster for rising damp remediation",
    productType: "WTA renovation plaster system",
    filterTags: ["WTA-renovation-plaster", "Salt-resistant", "Rising-damp", "Undercoat", "Finish-coat", "System", "Breathable", "Internal"],
    techChips: [
      { label: "WTA 2-9-04 compliant", cls: "bg-amber-50 text-amber-700" },
      { label: "Two-coat system", cls: "bg-sky-100 text-sky-800" },
      { label: "Salt-resistant", cls: "bg-green-50 text-green-700" },
      { label: "Breathable", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Remmers SP Renovation Plaster System is a WTA 2-9-04 compliant two-coat renovation plastering system designed for replastering masonry walls after chemical DPC injection or in areas affected by rising damp and salt contamination. The system comprises SP I (renovation undercoat) and SP II (renovation finish plaster) — both formulated to tolerate the high levels of hygroscopic salts (nitrates, chlorides, sulphates) present in masonry walls drying out after rising damp treatment.\n\nWTA renovation plasters work by providing an enlarged pore structure within the plaster body — creating a reservoir volume within the plaster matrix that accommodates salt crystallisation without surface spalling or cracking. The plaster remains vapour-permeable (breathable), allowing the wall to continue drying while the salts crystallise harmlessly within the plaster body rather than at the surface. Standard gypsum or Portland cement plasters do not have this pore structure and will fail rapidly when applied to rising damp walls.\n\nRemmers is the most established WTA renovation plaster supplier in Australia. Confirm current SP product names, the full system sequence (including pre-spray if required), and technical support availability with Remmers Australia before specifying on a project.",
    technicalProperties: [
      "WTA 2-9-04 compliant — renovating plaster standard — enlarged pore structure accommodates salt crystallisation without surface failure",
      "Vapour-permeable (breathable) — wall continues to dry through the plaster layer during the drying-out period",
      "High salt tolerance — formulated to resist hygroscopic salts including nitrates, chlorides and sulphates present in rising damp walls",
      "Two-coat system: SP I undercoat (6–10mm) + SP II finish coat (10–15mm) — total system thickness conforms to WTA minimum requirements",
      "Internal application — for replastering ground-floor masonry walls after DPC injection treatment",
      "Coordinated Remmers system — SP plasters designed to be used in conjunction with Remmers Kiesol or Kiesol C injection",
    ],
    limitations: [
      "WTA renovation plaster must not be applied until after chemical DPC injection has been completed and the injection product has cured",
      "Old plaster must be stripped to a minimum of 300mm above the visible salt tide mark before applying renovation plaster — salt damage in the substrate extends beyond the visible stain",
      "Gypsum-containing backgrounds and gypsum undercoats are not compatible — remove all existing gypsum plaster before applying renovation plaster",
      "Renovation plaster is a temporary salt management strategy during the drying-out period — the wall must eventually dry fully for the treatment to be considered complete",
      "Do not apply non-breathable surface finishes (ceramic tile, impermeable paint) until the wall has fully dried — confirm drying period with building pathologist",
      "Confirm current product names, full system specification and technical support with Remmers Australia before specifying",
    ],
    procurementSources: [
      { name: "Remmers Australia — trade supply — contact for current pricing", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au",
    accentColor: "#e63a22",
    name: "Mapei Mape-Antique Renovation Plaster System",
    descriptionLine: "Salt-tolerant renovation plaster system for rising damp remediation — Mapei brand — internal masonry wall replastering",
    productType: "Salt-resistant renovation plaster system",
    filterTags: ["WTA-renovation-plaster", "Salt-resistant", "Rising-damp", "System", "Breathable", "Internal"],
    techChips: [
      { label: "Salt-resistant", cls: "bg-green-50 text-green-700" },
      { label: "Breathable", cls: "bg-sky-100 text-sky-800" },
      { label: "Mapei brand", cls: "bg-slate-100 text-slate-700" },
      { label: "Internal walls", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei's Mape-Antique renovation plaster range provides salt-resistant renovation plastering products for replastering masonry walls in rising damp remediation. The Mape-Antique range is specifically formulated for restoration and remediation of historic and existing masonry buildings, offering salt tolerance and vapour permeability suited to the drying-out phase after DPC treatment.\n\nMapei's national distribution network across Australia means that Mape-Antique renovation plaster products are accessible through Mapei trade supply channels in most Australian states. For strata building managers and remediation contractors who already use Mapei products for other remediation work, specifying Mapei for the renovation plaster stage offers supply chain consistency.\n\nConfirm the current Mape-Antique product names and system documentation with Mapei Australia before specifying — the Mape-Antique range has multiple products and the correct product selection depends on the application substrate, salt load and finish requirements. Confirm whether the product meets WTA 2-9-04 renovation plaster requirements with Mapei technical before specifying on a project with WTA compliance requirements.",
    technicalProperties: [
      "Salt-tolerant formulation — designed to manage hygroscopic salts in rising damp walls during the drying-out period",
      "Vapour-permeable — allows the treated masonry wall to continue drying through the plaster layer",
      "Mapei national distribution — available through Mapei trade supply channels across Australian states",
      "Suitable for replastering after chemical DPC injection on internal masonry walls",
    ],
    limitations: [
      "Confirm WTA 2-9-04 compliance with Mapei Australia technical before specifying where WTA-certified renovation plaster is required",
      "Old plaster must be stripped before application — do not apply over existing salt-contaminated plaster",
      "Confirm full system sequence with Mapei technical — including required undercoat, system thickness and drying intervals between coats",
      "Do not apply non-breathable surface finishes until the wall has fully dried — confirm drying period with Mapei technical",
      "Confirm current product names, system documentation and technical support availability with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply — contact for current pricing", url: "https://www.mapei.com/au" },
      { name: "Mapei national distribution network — confirm regional availability", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com",
    accentColor: "#cc0000",
    name: "Sika Vandex Cementitious Render Systems",
    descriptionLine: "Cementitious salt-tolerant render and slurry products for masonry walls with moisture and salt issues — positive-side application",
    productType: "Cementitious salt-tolerant render / slurry",
    filterTags: ["Salt-resistant", "Rising-damp", "Breathable", "Internal", "External"],
    techChips: [
      { label: "Cementitious system", cls: "bg-sky-100 text-sky-800" },
      { label: "Salt tolerant", cls: "bg-green-50 text-green-700" },
      { label: "Sika Vandex brand", cls: "bg-red-50 text-red-700" },
      { label: "Internal / external", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika's Vandex range includes cementitious slurry and render products with salt tolerance for application to masonry walls with moisture and salt contamination. While the core Vandex Super product is a crystalline waterproofing slurry applied to stop water ingress under pressure, Sika also supplies cementitious render products in the Vandex range that can provide salt tolerance in rising damp remediation contexts.\n\nFor rising damp walls, cementitious salt-tolerant renders may be specified where a harder, more robust surface finish is required compared to WTA renovation plasters, or where external render application is required. However, the pore structure and vapour permeability characteristics of standard cementitious renders differ from WTA-compliant renovation plasters — confirm that the selected Vandex product is appropriate for the specific rising damp remediation application with Sika Australia technical.\n\nSika's national presence in Australia and comprehensive technical support make Sika products straightforward to specify and supply on larger strata remediation projects. Confirm current product range, application requirements and suitability for WTA-referenced renovation plaster applications with Sika Australia before specifying.",
    technicalProperties: [
      "Cementitious formulation — harder and more abrasion-resistant than WTA renovation plasters — suited to areas with physical wear exposure",
      "Vandex crystalline technology may provide additional active waterproofing benefit in the render layer",
      "Available for both positive-side (internal face) and external render applications",
      "Sika national distribution and technical support across Australian states",
    ],
    limitations: [
      "Standard cementitious renders may have lower vapour permeability than WTA renovation plasters — confirm breathability with Sika technical for rising damp applications",
      "Confirm whether the product meets WTA 2-9-04 renovation plaster requirements before specifying in a WTA-referenced rising damp treatment system",
      "Old contaminated plaster must be stripped before application — do not apply over existing failing plaster",
      "Confirm surface preparation requirements (mechanical key, bonding agent) with Sika technical before applying to smooth masonry",
      "Confirm current product names and the most appropriate product selection for rising damp renovation plaster applications with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Sika national distribution network", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "WTA-renovation-plaster", label: "WTA renovation plaster" },
  { id: "Salt-resistant", label: "Salt resistant" },
  { id: "Rising-damp", label: "Rising damp" },
  { id: "Undercoat", label: "Undercoat" },
  { id: "Finish-coat", label: "Finish coat" },
  { id: "System", label: "Two-coat system" },
  { id: "Breathable", label: "Breathable" },
  { id: "Internal", label: "Internal" },
  { id: "External", label: "External" },
];

const BRAND_EQUIV: { system: string; remmers: string; mapei: string; sika: string }[] = [
  { system: "WTA 2-9-04 compliant renovation plaster — undercoat", remmers: "SP I Renovation Undercoat", mapei: "Mape-Antique*", sika: "—" },
  { system: "WTA 2-9-04 compliant renovation plaster — finish", remmers: "SP II Renovation Plaster", mapei: "Mape-Antique*", sika: "—" },
  { system: "Cementitious salt-tolerant render / slurry", remmers: "—", mapei: "—", sika: "Vandex range*" },
];

const TECH_INFO = {
  typicalApplications: [
    "Replastering internal ground-floor masonry walls after chemical DPC injection in Class 2 strata buildings and residential properties",
    "Managing ongoing salt crystallisation during the wall drying-out period after rising damp treatment",
    "Replastering after stripping existing salt-contaminated plaster on walls with a history of rising damp",
    "External render replacement on masonry walls with rising damp affecting the external face",
  ],
  selectionCriteria: [
    "WTA 2-9-04 certified renovation plaster is the correct specification where a formal rising damp treatment system is required — confirm WTA compliance with Remmers or Mapei technical",
    "Standard cementitious renders are not suitable as renovation plasters — they do not have the pore structure to tolerate salt crystallisation",
    "Gypsum plasters are not suitable over rising damp walls — gypsum dissolves in the presence of moisture and salts",
    "Confirm vapour permeability of the selected product — the renovation plaster must be breathable to allow the wall to dry during the post-treatment period",
    "Total renovation plaster system thickness matters — WTA specifies minimum thicknesses — confirm the system achieves minimum 20mm total plaster depth",
  ],
  limitations: [
    "Renovation plaster manages salt crystallisation during drying but does not permanently waterproof the wall — the underlying DPC injection must be correctly carried out",
    "Pre-wetting the substrate before application is typically required — confirm substrate preparation with manufacturer",
    "Renovation plaster will be wasted if applied without first stripping old contaminated plaster — old plaster must be removed before new plaster is applied",
    "Walls must be allowed to dry fully after treatment — drying can take 6–24 months depending on wall thickness, porosity and environmental conditions",
  ],
  standardsNotes: [
    "WTA 2-9-04 — WTA Institute standard for renovation plasters for masonry affected by rising damp and salts — the primary product classification standard for renovation plasters",
    "WTA 2-6-99 — companion standard for chemical DPC injection — defines the complete rising damp treatment system",
    "BS 8102 — Guide to Protection of Below Ground Structures Against Water from the Ground — referenced for treatment of below-ground damp",
    "CSIRO technical publications on rising damp treatment — confirm current guidance with building pathologist",
  ],
  suitableDefects: [
    "Internal plaster failure at low level after rising damp treatment — blistering, spalling, loss of adhesion of existing plaster",
    "Replastering after rising damp treatment (DPC injection) — new plaster must be salt-resistant to manage residual salts during drying",
    "Salt efflorescence and white staining on lower internal walls — symptom of hygroscopic salt movement from rising damp",
  ],
  typicalSubstrates: [
    "Solid brick masonry — internal face — after stripping to masonry surface",
    "Calcium silicate brick — confirm surface preparation requirements with manufacturer",
    "Concrete blockwork — confirm compatibility and mechanical key requirements",
    "Sandstone masonry — confirm suitability and preparation requirements with manufacturer for soft substrates",
  ],
};

/* ── Shared collapsible helpers ── */

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
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
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map((c) => <span key={c.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>)}</div>}</>)}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
    </div>
  );
}

export function SaltResistantPlasterIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are renovating salt-resistant plaster systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Renovating salt-resistant plaster systems (also called WTA renovation plasters) are specialist replastering products designed for masonry walls drying out after rising damp treatment. They differ fundamentally from standard plasters in their pore structure — WTA renovation plasters are formulated with an enlarged pore matrix that accommodates salt crystallisation within the plaster body without surface spalling or failure.</p>
        <p>When a wall has been subject to rising damp over many years, the masonry and existing plaster become loaded with hygroscopic salts — primarily nitrates, chlorides and sulphates leached from the ground. Even after DPC injection stops further capillary rise, these salts remain in the wall fabric and continue to crystallise as the wall dries. Standard gypsum or Portland cement plasters cannot tolerate this salt environment and will fail rapidly through spalling, blistering and loss of adhesion.</p>
        <p>The WTA 2-9-04 renovation plaster standard defines the minimum pore volume, mechanical properties and salt tolerance required. Remmers SP renovation plasters are the most established WTA-compliant products in Australia, used as the follow-on plastering system after Remmers Kiesol or Kiesol C DPC injection.</p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Standard gypsum plaster or cement render — not salt-resistant — will fail on rising damp walls",
            "Crystalline waterproofing slurries (Xypex, Vandex Super) — active waterproofing against hydrostatic pressure — not a renovation plaster",
            "Breathable renders (NHL lime, silicate render) — for exterior application — different product category",
            "Waterproof cementitious coatings — a surface barrier coating — not the same as a salt-tolerant renovation plaster with enlarged pore structure",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-xs leading-5 text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
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

export function SaltResistantPlasterProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggleFilter = (id: FilterTag) => { setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">WTA 2-9-04 standard, pore structure, system sequence, salt tolerance and substrate requirements</p>
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
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — WTA renovation plasters and salt-resistant render systems for rising damp remediation</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => { const active = activeFilters.has(f.id); return (<button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>); })}
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
          {visibleProducts.map((product) => (
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
                  <div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p><CollapsibleList items={product.technicalProperties} icon="check" limit={3} /></div>
                  <div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p><CollapsibleList items={product.limitations} icon="x" limit={3} /></div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3"><CollapsibleSources sources={product.procurementSources} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Salt-resistant renovation plaster equivalents. * Confirm WTA 2-9-04 compliance with manufacturer before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1a5276" }}>Remmers</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#e63a22" }}>Mapei</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#cc0000" }}>Sika</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.remmers, row.mapei, row.sika].map((val, j) => (<td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white"><AlertTriangle size={15} /></div>
          <h3 className="text-base font-extrabold text-red-900">Do not apply standard gypsum or cement plaster to rising damp walls — it will fail</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Gypsum plaster is soluble in the presence of moisture and salts — it will dissolve, swell and delaminate rapidly on a rising damp wall",
            "Standard Portland cement render is not salt-tolerant — it has insufficient pore volume to accommodate salt crystallisation and will spall and delaminate",
            "Only WTA 2-9-04 compliant renovation plasters (Remmers SP series or equivalent) have the confirmed pore structure to manage hygroscopic salt crystallisation during the wall drying-out period",
            "Stripping old plaster to masonry and replastering with standard materials without a WTA renovation plaster is the most common failure in rising damp remediation",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-red-900"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
