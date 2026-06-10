"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Bonding-agent" | "Polymer-slurry" | "Concrete-masonry"
  | "Render-adhesion" | "Low-absorption" | "Dense-substrate"
  | "Acrylic-primer" | "Cementitious";

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
    name: "SikaCem Cementitious Bonding Slurry",
    descriptionLine: "Polymer-modified cementitious bonding slurry — applied wet-on-wet before render coat — improves render adhesion to dense or low-absorption substrates",
    productType: "Cementitious polymer-modified bonding slurry",
    filterTags: ["Bonding-agent", "Polymer-slurry", "Concrete-masonry", "Render-adhesion", "Low-absorption", "Dense-substrate", "Cementitious"],
    techChips: [
      { label: "Cementitious slurry", cls: "bg-sky-100 text-sky-800" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Wet-on-wet application", cls: "bg-green-50 text-green-700" },
      { label: "Sika system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "SikaCem Cementitious Bonding Slurry is a polymer-modified, two-component bonding slurry in the Sika construction range. Applied by brush or roller to the prepared substrate immediately before the render coat, it provides a bonding layer that mechanically and chemically keys the render to substrates that would otherwise have insufficient absorption for direct render application — including dense concrete, smooth blockwork, and previously painted surfaces where the paint film has been removed but the surface remains sealed.\n\nThe slurry is mixed from a cementitious powder and a liquid polymer component, applied as a textured coating to the substrate, and the render coat is applied into the wet slurry before it sets ('wet-on-wet'). This wet-on-wet application is critical — if the slurry is allowed to dry before the render is applied, it acts as a debonding layer rather than a bonding agent.\n\nConfirm current product name and wet-on-wet application timing with Sika Australia before specifying.",
    technicalProperties: [
      "Two-component polymer-modified cementitious slurry — provides mechanical and chemical bond to dense substrates",
      "Wet-on-wet application — render coat must be applied before bonding slurry dries",
      "Suitable for dense concrete, smooth masonry block, and de-painted substrate preparation",
      "Part of integrated Sika render repair system — compatible with SikaRenderEM render products",
      "Provides textured surface profile to improve render mechanical adhesion",
      "Bond strength >1.0 MPa on prepared dense concrete substrates (confirm with current TDS)",
    ],
    limitations: [
      "Must not be allowed to dry before render application — dry slurry debonds render — always apply wet-on-wet",
      "Not suitable for application over oil-contaminated, efflorescent, or friable substrates — full preparation required first",
      "Confirm current two-component mix ratio and open time with Sika Australia — formulation may have changed",
      "Not a substitute for surface preparation — all loose, contaminated material must be removed before slurry application",
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
    name: "Mapei Planicrete / Primer 3296",
    descriptionLine: "Acrylic polymer bonding primer and cementitious bonding agent — improves render adhesion — dense and low-absorption concrete and masonry substrates",
    productType: "Acrylic bonding primer / cementitious bonding agent",
    filterTags: ["Bonding-agent", "Polymer-slurry", "Concrete-masonry", "Render-adhesion", "Low-absorption", "Acrylic-primer"],
    techChips: [
      { label: "Acrylic primer option", cls: "bg-sky-100 text-sky-800" },
      { label: "Cementitious slurry option", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei system", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Mapei provides two bonding agent options for render adhesion improvement: Planicrete (a liquid acrylic copolymer added to the cement/sand mix as a bonding admixture) and Primer 3296 (an acrylic primer applied to the substrate surface before render). Planicrete is mixed with water and OPC to form a cementitious slurry that is applied to the substrate and allowed to become tacky before the render is applied ('tacky-on-tacky' or dry-to-touch depending on substrate). Primer 3296 is an acrylic primer applied and allowed to dry before render.\n\nIn Australian strata render remediation, Mapei Planicrete is used by contractors working within the Mapei supply chain for bonding agent applications where a cementitious slurry approach is preferred. Primer 3296 suits applications where a dried acrylic primer is preferred over a wet-on-wet slurry approach.\n\nConfirm current product names, application method, and open time with Mapei Australia before specifying.",
    technicalProperties: [
      "Two product options: Planicrete (cementitious slurry) and Primer 3296 (acrylic primer) — select based on application requirements",
      "Planicrete: improves bond strength of render to dense substrates when applied as wet slurry or used as admixture",
      "Primer 3296: acrylic primer that can be applied and allowed to dry before render — more flexible site scheduling",
      "Compatible with Mapei Planitop render range — full system compatibility",
      "Reduces risk of render delamination on dense, low-absorption concrete and masonry",
    ],
    limitations: [
      "Planicrete wet slurry application: render must be applied before slurry fully dries — confirm open time with Mapei",
      "Primer 3296: confirm recoat window — render must be applied within specified time after primer application",
      "Neither product substitutes for physical surface preparation — substrate must be clean and free of contamination",
      "Confirm current product names and equivalents in current Mapei range with Mapei Australia",
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
    name: "Fosroc Nitobond AR / Nitobond EP",
    descriptionLine: "Acrylic and epoxy bonding agents — improves render and mortar adhesion to concrete and masonry substrates — Fosroc Renderoc system",
    productType: "Acrylic / epoxy bonding agent",
    filterTags: ["Bonding-agent", "Concrete-masonry", "Render-adhesion", "Low-absorption", "Dense-substrate", "Acrylic-primer"],
    techChips: [
      { label: "Acrylic or epoxy options", cls: "bg-sky-100 text-sky-800" },
      { label: "Nitobond range", cls: "bg-slate-100 text-slate-700" },
      { label: "Fosroc system", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Fosroc's bonding agent range for render and mortar adhesion comprises Nitobond AR (acrylic bonding agent) and Nitobond EP (epoxy bonding agent for higher-performance applications). Nitobond AR is the standard bonding agent used with the Renderoc render and repair mortar range — applied to the substrate surface to improve adhesion of Renderoc mortars to dense, smooth, or low-absorption concrete and masonry. Nitobond EP is a two-component epoxy bonding agent specified for more demanding applications where a higher bond strength is required, or where the substrate is smooth hard concrete with very low absorption.\n\nIn Australian Class 2 strata facade remediation, Fosroc Nitobond AR is specified as the bonding agent for Renderoc render systems. The integrated Fosroc system — Nitobond AR bonding agent plus Renderoc render — is the preferred approach for contractors who work within the Fosroc supply ecosystem and require documented system compatibility and warranty support.\n\nConfirm current product names, application method, and compatibility with the Renderoc render grade being used with Fosroc Australia before specifying.",
    technicalProperties: [
      "Nitobond AR: acrylic bonding agent — applied and allowed to become tacky before render application",
      "Nitobond EP: two-component epoxy — higher bond strength for demanding dense concrete applications",
      "Part of integrated Fosroc Renderoc system — confirmed compatibility with Renderoc render mortars",
      "Reduces render delamination risk on smooth and low-absorption substrates",
      "Good open time with Nitobond AR — allows reasonable scheduling of bonding agent and render operations",
    ],
    limitations: [
      "Nitobond AR must be applied within the specified open time — render applied after dry-out will not achieve bond improvement",
      "Nitobond EP is a two-component epoxy — requires accurate mix ratio and has limited pot life",
      "Not a substitute for surface preparation — all contamination, laitance, and loose material must be removed before bonding agent",
      "Confirm current product name and render compatibility with Fosroc Australia — Renderoc range has multiple grades",
    ],
    procurementSources: [
      { name: "Fosroc Australia — contact for current pricing and trade supply", url: "https://www.fosroc.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Bonding-agent", label: "Bonding agent" },
  { id: "Polymer-slurry", label: "Polymer slurry" },
  { id: "Acrylic-primer", label: "Acrylic primer" },
  { id: "Cementitious", label: "Cementitious" },
  { id: "Dense-substrate", label: "Dense substrate" },
  { id: "Low-absorption", label: "Low absorption" },
  { id: "Concrete-masonry", label: "Concrete/masonry" },
  { id: "Render-adhesion", label: "Render adhesion" },
];

const COMPARISON_ROWS: {
  product: string; brand: string; type: string;
  application: string; openTime: string; keyFeature: string;
}[] = [
  { product: "SikaCem Bonding Slurry", brand: "Sika", type: "Cementitious slurry", application: "Wet-on-wet", openTime: "Short — apply render before dry", keyFeature: "Sika system integration" },
  { product: "Planicrete / Primer 3296", brand: "Mapei", type: "Acrylic slurry / acrylic primer", application: "Tacky-on-tacky or dry primer", openTime: "Varies by product", keyFeature: "Two product options — flexible application" },
  { product: "Nitobond AR / EP", brand: "Fosroc", type: "Acrylic / epoxy bonding agent", application: "Tacky-on-tacky", openTime: "Reasonable open time (AR)", keyFeature: "Epoxy option for high bond strength requirement" },
];

const TECH_INFO = {
  typicalApplications: [
    "Dense, smooth, or low-absorption concrete substrate before polymer-modified render application",
    "Smooth masonry block (face-grade block) before render — low surface absorption requires bonding agent",
    "Previously painted substrate after paint removal — residual glaze reduces absorption — bonding agent improves render bond",
    "Repair patches at interface between new and existing render — bonding agent at patch boundary reduces delamination",
    "Re-render after water blasting of facade — high-pressure cleaning can polish the substrate — bonding agent improves bond",
  ],
  selectionCriteria: [
    "Sika SikaCem Slurry: use within Sika render system — wet-on-wet application required",
    "Mapei Planicrete: use within Mapei Planitop render system — tacky-on-tacky or dry primer option",
    "Fosroc Nitobond AR: standard Fosroc system bonding agent — use with Renderoc renders",
    "Fosroc Nitobond EP: for very smooth dense concrete where higher bond strength is required — two-component epoxy",
    "For all products: apply bonding agent to the entire substrate area including at patch edges — do not skip edges",
  ],
  limitations: [
    "Wet-on-wet bonding slurries require careful timing — render must go on before slurry dries — poor timing is the primary failure mode",
    "Bonding agents do not compensate for poor substrate preparation — all loose, friable, and contaminated material must be removed first",
    "Dried bonding slurry acts as a debonding layer — never allow slurry to fully dry and then apply render over it",
    "Epoxy bonding agents have limited pot life — mix only what can be applied within the pot life",
    "Confirm current product name and open time with the manufacturer before site application",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — render adhesion requirements",
    "AS 3600 — Concrete Structures — concrete repair mortar adhesion requirements",
    "Manufacturer current TDS — governs bonding agent application method, open time, and render compatibility",
    "ICRI (International Concrete Repair Institute) guidelines — substrate preparation and bonding agent application for concrete repair",
  ],
  suitableDefects: [
    "Delaminated render from dense concrete substrate — inadequate original bond — bonding agent required in re-render",
    "Render patch adhesion failure — render falling from patch boundary — bonding agent at patch perimeter required",
    "Re-render after paint removal — residual low-absorption surface requires bonding agent",
    "New render over smooth masonry block — low surface absorption on block face requires bonding agent",
  ],
  typicalSubstrates: [
    "Dense smooth in-situ concrete — low absorption — requires bonding agent before render",
    "Smooth face-grade masonry block — low absorption — bonding agent required",
    "Previously painted substrate after paint removal — residual glazed surface — bonding agent required",
    "Smooth precast concrete panels — very low absorption — bonding agent or mechanical preparation required",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">{visible.map((item, i) => (<li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">{icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}{item}</li>))}</ul>
      {items.length > limit && (<button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Show less ↑" : `+${extra} more ↓`}</button>)}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between"><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p><button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button></div>
      {expanded && (<div className="mt-2 space-y-1.5">{sources.map((src) => (<div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">{src.url ? (<a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a>) : <span className="font-semibold text-slate-600">{src.name}</span>}</div>))}</div>)}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && (<div className="mt-2 flex flex-wrap gap-1.5">{chips.map((chip) => (<span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>))}</div>)}</>)}
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

export function BondingAgentIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are bonding agent and primer systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Bonding agents and polymer slurry primers are preparatory treatments applied to concrete or masonry substrates before render application to improve adhesion where the substrate has insufficient absorption or surface profile to mechanically key the render in place. On dense, smooth, or previously painted substrates, render applied direct would have insufficient bond strength and would delaminate under thermal cycling and moisture movement.</p>
        {expanded && (<><p>There are two broad types: cementitious bonding slurries (polymer-modified OPC slurries applied wet and rendered wet-on-wet) and acrylic primer bonding agents (applied and allowed to dry or become tacky before rendering). The cementitious slurry approach provides a mechanical and chemical bond; the acrylic primer approach provides an adhesive tack layer that the render bonds to. Both require precise application timing — applying render too late (after slurry has dried or primer has passed its open time) converts the bonding agent from an adhesive to a debonding layer.</p><p>In Australian strata facade remediation, bonding agents are essential on any re-render scope where the substrate was originally smooth dense concrete (cast-in-situ or precast), face-grade masonry block, or has been de-painted. Without bonding agent, the failure mode is predictable — render delamination within 2–5 years of application.</p></>)}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div><h3 className="text-sm font-extrabold text-sky-950">{title}</h3></div>
      <ul className="space-y-2">{items.map((item, i) => (<li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">{style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}{style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}{style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}{item}</li>))}</ul>
    </div>
  );
}

export function BondingAgentProductSection() {
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
          <div><p className="text-base font-extrabold text-sky-950">System Technical Reference</p><p className="mt-0.5 text-xs text-slate-500">Applications, product selection, timing, limitations, standards and substrates</p></div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">{accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}</div>
        </button>
        {accordionOpen && (<div className="border-t border-slate-100 px-7 pb-7 pt-6"><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"><TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" /><TechCard icon={<Ruler size={15} />} title="Product Selection" items={TECH_INFO.selectionCriteria} style="check" /><TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" /><TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" /><TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" /><TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" /></div></div>)}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2><p className="mt-1 text-sm text-slate-500">3 products — 3 brands — Sika / Mapei / Fosroc</p></div></div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => { const active = activeFilters.has(f.id); return (<button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>); })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more</span>
          <div className="flex items-center gap-2"><button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button><button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button></div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2"><span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span><div className="flex shrink-0 items-center gap-1">{product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}<a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a></div></div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5"><p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p></div>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4"><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p><CollapsibleDescription text={product.systemDescription} /></div>
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
        <div className="mb-6 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Bonding agent system comparison</h2><p className="mt-1 text-sm text-slate-500">Timing of render application relative to bonding agent is critical — confirm open time with manufacturer before site application.</p></div></div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application method</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Open time</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th></tr></thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Sika" ? "#cc0000" : row.brand === "Mapei" ? "#0055A5" : "#007A33" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.openTime}</td>
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
