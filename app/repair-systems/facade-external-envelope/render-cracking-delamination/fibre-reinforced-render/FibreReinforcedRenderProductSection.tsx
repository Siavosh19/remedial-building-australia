"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Fibre-reinforced" | "AR-glass" | "Render-repair"
  | "Concrete-masonry" | "AS-3700" | "Two-coat"
  | "Polymer-modified" | "Crack-resistant";

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
    tdsUrl: "https://aus.sika.com/en/solutions-products/product-finder.html",
    accentColor: "#cc0000",
    name: "SikaRenderEM Fibre",
    descriptionLine: "Fibre-reinforced polymer-modified render — alkali-resistant glass fibre — improved crack resistance — concrete and masonry facades",
    productType: "Fibre-reinforced polymer-modified render",
    filterTags: ["Fibre-reinforced", "AR-glass", "Render-repair", "Concrete-masonry", "Two-coat", "Polymer-modified", "Crack-resistant"],
    techChips: [
      { label: "AR glass fibre", cls: "bg-sky-100 text-sky-800" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Crack-resistant", cls: "bg-green-50 text-green-700" },
      { label: "Pre-bagged", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "SikaRenderEM Fibre is a polymer-modified, fibre-reinforced render incorporating alkali-resistant (AR) glass fibres dispersed through the render matrix. The AR glass fibres provide a secondary crack-arresting mechanism — if a shrinkage crack initiates in the render, the fibres bridge the crack and limit its propagation and width, resulting in a finer crack pattern with reduced water ingress risk compared to unreinforced renders.\n\nIn Australian Class 2 strata facade remediation, fibre-reinforced render is specified where the underlying substrate has a history of render cracking — either from thermal movement, carbonation-induced render debonding, or structural micro-movement — and where a standard polymer-modified render is considered insufficient to resist crack recurrence. The fibre content (nominally ≥0.9 kg/m² equivalent in fibre volume) provides a statistically distributed reinforcement through the render cross-section that conventional polymer modification alone cannot replicate.\n\nConfirm current product name, fibre content specification, and application method with Sika Australia before specifying.",
    technicalProperties: [
      "Alkali-resistant (AR) glass fibre reinforcement — bridges micro-cracks and limits crack propagation",
      "Polymer-modified cementitious binder — improved adhesion and water resistance over unreinforced render",
      "Pre-bagged — factory-controlled fibre and polymer content — no site addition of fibres required",
      "Suitable for scratch and finish coat application in two-coat render system",
      "Reduced plastic shrinkage cracking risk during cure compared to unreinforced renders",
      "Compatible with Sika bonding agents and topcoat systems",
    ],
    limitations: [
      "AR glass fibres reduce but do not eliminate render cracking — structural movement must be controlled separately",
      "Maximum coat thickness per TDS — do not overapply in single pass",
      "Requires bonding primer on dense or painted substrates",
      "Confirm fibre content (kg/m²) is adequate for the specified crack-bridging performance — consult Sika Australia",
      "Do not apply in freezing conditions or direct sun",
    ],
    procurementSources: [
      { name: "Sika Australia — contact for current pricing and trade supply", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products-catalogue",
    accentColor: "#0055A5",
    name: "Mapei Planitop Fast 330",
    descriptionLine: "Fibre-reinforced, rapid-setting polymer-modified repair mortar — glass fibre reinforcement — facade patch and render repair",
    productType: "Fibre-reinforced polymer-modified render mortar",
    filterTags: ["Fibre-reinforced", "AR-glass", "Render-repair", "Concrete-masonry", "Polymer-modified", "Crack-resistant"],
    techChips: [
      { label: "Fibre-reinforced", cls: "bg-sky-100 text-sky-800" },
      { label: "Rapid-setting option", cls: "bg-slate-100 text-slate-700" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-bagged", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Mapei Planitop Fast 330 is a rapid-setting, polymer-modified, fibre-reinforced repair mortar in the Mapei Planitop range. The incorporated fibre reinforcement provides improved crack resistance during application and cure, and the rapid-setting chemistry allows overcoating in shorter intervals — valuable on strata facade repair projects where access periods are limited and faster return to service is required.\n\nIn Australian Class 2 strata remediation, Planitop Fast 330 is used where fibre-reinforced render performance is required but the standard Planitop XS formulation is specified without fibre — contractors select the Fast 330 variant where project scheduling requires faster overcoating. The fibre reinforcement reduces plastic shrinkage cracking during the initial cure period, which is particularly valuable in hot, dry, or windy conditions common to Australian coastal strata sites.\n\nConfirm current product name, rapid-set working time, and fibre content with Mapei Australia before specifying.",
    technicalProperties: [
      "Rapid-setting — faster overcoating interval than standard mortars — improves site schedule",
      "Fibre-reinforced — reduced plastic shrinkage cracking — improved crack resistance",
      "Polymer-modified — improved adhesion and water resistance",
      "Pre-bagged — consistent fibre and polymer content",
      "Compatible with Mapei bonding agents and topcoat systems",
      "Suitable for patch and full-coat render reinstatement",
    ],
    limitations: [
      "Rapid-setting chemistry reduces working time — do not mix more than can be applied before initial set",
      "Confirm fibre volume fraction and crack-bridging capacity with Mapei Australia for critical applications",
      "Requires bonding primer on dense, low-absorption, or previously painted substrates",
      "Do not apply in temperatures below 5°C or in direct sun above 35°C",
      "Confirm current product name and equivalent in current Mapei range before ordering",
    ],
    procurementSources: [
      { name: "Mapei Australia — contact for current pricing and trade supply", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc Australia",
    brandUrl: "https://www.fosroc.com/en-au",
    tdsUrl: "https://www.fosroc.com/en-au/products",
    accentColor: "#007A33",
    name: "Fosroc Renderoc LA",
    descriptionLine: "Lightweight, fibre-reinforced polymer-modified render mortar — low-alkalinity AR glass fibre — facade and soffit render repair",
    productType: "Fibre-reinforced polymer-modified render",
    filterTags: ["Fibre-reinforced", "AR-glass", "Render-repair", "Concrete-masonry", "AS-3700", "Polymer-modified"],
    techChips: [
      { label: "Lightweight aggregate", cls: "bg-sky-100 text-sky-800" },
      { label: "Fibre-reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Overhead application", cls: "bg-green-50 text-green-700" },
      { label: "Pre-bagged", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Renderoc LA is a lightweight, fibre-reinforced, polymer-modified render mortar in the Renderoc range, formulated with lightweight aggregate for improved sag resistance in overhead and soffit applications. The lightweight aggregate reduces the dead weight of the render coat, reducing the risk of sagging on vertical and overhead surfaces during application before the mortar achieves initial set. The incorporated fibre reinforcement reduces plastic shrinkage cracking and improves crack resistance in the cured render.\n\nIn Australian Class 2 strata facade remediation, Renderoc LA is specified for soffits, fascias, and overhead beam surfaces where a standard render mortar would be prone to sag during application. The combination of lightweight aggregate and fibre reinforcement makes it particularly suitable for overhead render reinstatement on balcony soffits and underside spandrel beams where render replacement is commonly required as part of a balcony remediation scope.\n\nConfirm current product name and lightweight aggregate specification with Fosroc Australia before specifying.",
    technicalProperties: [
      "Lightweight aggregate — reduced density — improved sag resistance for vertical and overhead application",
      "Fibre-reinforced — reduced plastic shrinkage cracking — improved crack resistance",
      "Polymer-modified — improved adhesion and water resistance",
      "Pre-bagged — consistent formulation — no site additions required",
      "Suitable for soffit and overhead render reinstatement where standard renders would sag",
      "Compatible with Fosroc Nitobond bonding agents and topcoat systems",
    ],
    limitations: [
      "Lightweight aggregate reduces compressive strength compared to standard Renderoc mortars — confirm strength requirement for the application",
      "Requires Fosroc Nitobond bonding agent on dense, low-absorption, or painted substrates",
      "Confirm fibre content is adequate for specified crack resistance with Fosroc Australia",
      "Maximum coat thickness per TDS — do not apply beyond maximum in single pass on overhead surfaces",
      "Do not apply in temperatures below 5°C",
    ],
    procurementSources: [
      { name: "Fosroc Australia — contact for current pricing and trade supply", url: "https://www.fosroc.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Fibre-reinforced", label: "Fibre-reinforced" },
  { id: "AR-glass", label: "AR glass fibre" },
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Crack-resistant", label: "Crack-resistant" },
  { id: "Two-coat", label: "Two-coat" },
  { id: "Concrete-masonry", label: "Concrete/masonry" },
  { id: "Render-repair", label: "Render repair" },
  { id: "AS-3700", label: "AS 3700" },
];

const COMPARISON_ROWS: {
  product: string; brand: string; fibreType: string;
  coatThickness: string; overhead: string; keyFeature: string;
}[] = [
  { product: "SikaRenderEM Fibre", brand: "Sika", fibreType: "AR glass fibre", coatThickness: "8–12mm per coat", overhead: "Standard", keyFeature: "Integrated Sika repair system compatibility" },
  { product: "Planitop Fast 330", brand: "Mapei", fibreType: "Glass fibre", coatThickness: "5–30mm", overhead: "Standard", keyFeature: "Rapid-setting — faster overcoating schedule" },
  { product: "Renderoc LA", brand: "Fosroc", fibreType: "Glass fibre", coatThickness: "6–12mm per coat", overhead: "Yes — lightweight", keyFeature: "Lightweight aggregate — suited for soffit application" },
];

const TECH_INFO = {
  typicalApplications: [
    "Render reinstatement on facades with history of map-cracking — fibre content reduces recurrence of cracking pattern",
    "Soffit and overhead render on balcony underside and spandrel beams — select lightweight variant (Renderoc LA)",
    "Render repair on facades subject to thermal cycling — fibre provides secondary crack arrest",
    "Two-coat system for render over concrete after carbonation repair — as topcoat over epoxy-coated repair areas",
    "Render over masonry block infill panels — where block shrinkage can cause render cracking through its face",
  ],
  selectionCriteria: [
    "Sika SikaRenderEM Fibre: preferred where Sika supply chain is established — standard vertical wall application",
    "Mapei Planitop Fast 330: where faster programme is required — rapid set allows quicker overcoating",
    "Fosroc Renderoc LA: for soffit and overhead applications — lightweight aggregate reduces sag risk",
    "All three systems require AR glass fibre — confirm fibre is AR grade (alkali-resistant) as standard glass fibres degrade rapidly in alkaline cementitious environment",
    "For critical applications, request independent test data for crack-bridging capacity and fibre durability from manufacturer",
  ],
  limitations: [
    "Fibre reinforcement reduces but does not eliminate render cracking — ongoing structural movement will defeat the fibre system over time",
    "Standard glass fibre (non-AR) degrades in alkaline cement matrix — always confirm product contains AR (alkali-resistant) glass",
    "Fibre does not contribute to structural load-carrying capacity — not a substitute for structural reinforcement",
    "Overhead applications require lightweight render variant — standard render will sag on soffits before achieving initial set",
    "All fibre-reinforced renders require bonding primer on dense or painted substrates — do not apply direct to contaminated surfaces",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs render specification for masonry substrates",
    "AS 3600 — Concrete Structures — governs render reinstatement over concrete repair",
    "ETAG 004 — EIFS systems — referenced for fibre mesh requirements in render systems with reinforcing mesh",
    "Manufacturer's current TDS — governs application rate, fibre content, and performance claims",
  ],
  suitableDefects: [
    "Render with map-cracking (crazing) — fibre reinforcement reduces crack width and frequency in new render",
    "Failed render over block/masonry substrates subject to block shrinkage cracking",
    "Render reinstatement on soffit and overhead surfaces after delamination — select lightweight fibre variant",
    "Render over repair patches with differential substrate stiffness — fibre bridges transition zones",
  ],
  typicalSubstrates: [
    "In-situ concrete walls, spandrels, columns, and soffits",
    "Masonry brick and concrete block walls",
    "Overhead and soffit concrete — use lightweight fibre variant (Renderoc LA) to resist sag",
    "Previously rendered surfaces after removal of failed render",
  ],
};

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
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : <span className="font-semibold text-slate-600">{src.name}</span>}
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
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function FibreReinforcedRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are fibre-reinforced render systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Fibre-reinforced render systems incorporate alkali-resistant (AR) glass fibres dispersed through the render matrix to arrest crack propagation. Where plain polymer-modified renders rely solely on polymer binder flexibility to resist cracking, fibre-reinforced renders have a secondary crack-arresting mechanism — the fibres bridge micro-cracks and limit their width and propagation, reducing the frequency and severity of cracking in the cured render under thermal cycling, shrinkage, and minor substrate movement.</p>
        {expanded && (
          <>
            <p>Alkali-resistance of the glass fibre is critical — standard E-glass fibres degrade rapidly in the alkaline pH environment of cementitious mortars, losing tensile strength within months. Only AR glass fibres, manufactured with a zirconia (ZrO₂) content that resists alkali attack, provide durable long-term reinforcement in cement-based renders. Specify and verify AR glass fibre content before accepting product.</p>
            <p>In Australian strata remediation, fibre-reinforced render is increasingly specified on facades with a demonstrated history of render cracking — map cracking from shrinkage, thermal cracking from unrestrained large render areas, and block or brick substrate movement. The fibre reinforcement does not prevent cracking but changes the cracking mode from wide, open cracks to fine, distributed hair cracks that present a lower water ingress risk and a better cosmetic outcome.</p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
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

export function FibreReinforcedRenderProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, product selection, fibre content, limitations, standards and substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Product Selection" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — Sika / Mapei / Fosroc</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more</span>
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
                  <div className="mt-0.5"><p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p></div>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Fibre-reinforced render system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">All systems require AR (alkali-resistant) glass fibre — verify fibre grade with manufacturer before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fibre type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coat thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Overhead</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Sika" ? "#cc0000" : row.brand === "Mapei" ? "#0055A5" : "#007A33" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fibreType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coatThickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.overhead}</td>
                  <td className="px-4 py-3 text-slate-500">{row.keyFeature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
