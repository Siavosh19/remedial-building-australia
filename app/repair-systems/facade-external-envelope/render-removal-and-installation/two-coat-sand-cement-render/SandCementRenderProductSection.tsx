"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Sand-cement" | "Two-coat" | "OPC" | "AS-3700"
  | "Masonry" | "Concrete" | "Site-batched" | "Scratch-float";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Boral Construction Materials",
    brandUrl: "https://www.boral.com.au",
    tdsUrl: "https://www.boral.com.au/products/cement",
    accentColor: "#E05A1A",
    name: "Boral OPC / Fly Ash Cement + Brickies Sand",
    descriptionLine: "Site-batched sand/cement render — OPC and plasticising sand — two-coat scratch and float — concrete and masonry substrates",
    productType: "Site-batched OPC sand/cement render",
    filterTags: ["Sand-cement", "Two-coat", "OPC", "AS-3700", "Masonry", "Concrete", "Site-batched", "Scratch-float"],
    techChips: [
      { label: "OPC cement", cls: "bg-sky-100 text-sky-800" },
      { label: "Site-batched", cls: "bg-slate-100 text-slate-700" },
      { label: "Two-coat", cls: "bg-green-50 text-green-700" },
      { label: "AS 3700 compliant", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Traditional two-coat sand/cement render uses site-batched OPC (ordinary Portland cement) and clean washed plasticising sand mixed at the required ratio (typically 1:4 OPC to sand for scratch coat, 1:5 for float coat) with a small amount of hydrated lime for workability. Boral OPC and Brickies (plasticising) sand are the most widely used materials for site-batched render in the eastern Australian market.\n\nIn Australian Class 2 strata facade remediation, site-batched sand/cement render is specified where cost is the primary driver and the substrate is suitable for traditional render (rough textured concrete or masonry with adequate absorption). The two-coat system — scratch coat (12–15mm) combed to provide key, then float coat (6–10mm) — provides a structurally adequate render that meets AS 3700 requirements.\n\nHowever, site-batched renders are susceptible to mix ratio variability if batching is not carefully controlled. Inconsistent cement content or excessive water addition produces weak, friable renders that chalk and crack prematurely. Polymer-modified pre-bagged renders are specified where consistent performance is critical. Confirm sand specification (clean, well-graded, free of clay) and cement grade with Boral before ordering.",
    technicalProperties: [
      "Traditional OPC + clean washed sand — proven material combination for render on masonry and concrete",
      "Mix ratio 1:4 OPC:sand (scratch coat) / 1:5 (float coat) per AS 3700 specification",
      "Scratch coat 12–15mm, float coat 6–10mm — total system 18–25mm",
      "Lime addition (0–0.5 parts hydrated lime) improves workability and reduces plastic shrinkage cracking",
      "Widely available materials — Boral and BGC supply cement nationally — sand from local quarry/supplier",
      "Low cost per m² compared to polymer-modified pre-bagged renders",
    ],
    limitations: [
      "Site-batching requires experienced tradespeople — mix ratio variability is a significant quality risk",
      "Lower adhesion than polymer-modified renders on dense, smooth, or low-absorption substrates — bonding agent required",
      "More prone to shrinkage cracking than polymer-modified renders — curing regimen is critical",
      "Not suitable for dense or smooth concrete without bonding primer — adhesion is mechanical only",
      "Lime content must be specified — excessive lime weakens render; insufficient lime reduces workability",
    ],
    procurementSources: [
      { name: "Boral Construction Materials — nationwide", url: "https://www.boral.com.au" },
      { name: "BGC Cement", url: "https://www.bgccement.com.au" },
      { name: "Local quarry/sand supplier — Brickies sand", url: "https://www.boral.com.au" },
    ],
  },
  {
    fullLabel: "BGC Cement (Australia)",
    brandUrl: "https://www.bgccement.com.au",
    tdsUrl: "https://www.bgccement.com.au/products",
    accentColor: "#003F7D",
    name: "BGC General Purpose Cement + Pre-mixed Render",
    descriptionLine: "OPC general purpose cement for site-batched render — or BGC pre-bagged render mixes — two-coat sand/cement system — AS 3700",
    productType: "OPC cement / pre-bagged render mix",
    filterTags: ["Sand-cement", "Two-coat", "OPC", "AS-3700", "Masonry", "Concrete", "Site-batched"],
    techChips: [
      { label: "GP cement", cls: "bg-sky-100 text-sky-800" },
      { label: "Pre-bagged option", cls: "bg-slate-100 text-slate-700" },
      { label: "Western Australia supply", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "BGC Cement is a major supplier of ordinary Portland cement (General Purpose) in Western Australia and nationally. BGC GP cement is used for site-batched sand/cement render mixes in the same 1:4 and 1:5 mix ratios as Boral cement. BGC also produces pre-bagged render and mortar mixes (under the BGC Concrete Products range) that provide factory-controlled mix ratios as an alternative to site batching.\n\nIn Western Australian strata facade remediation, BGC cement is the dominant cement supply source. The pre-bagged BGC render mixes provide consistency advantages over site-batched OPC renders while remaining at a lower cost point than polymer-modified specialist products from Sika or Mapei.\n\nConfirm current product names, mix specifications, and pre-bagged render availability with BGC before ordering.",
    technicalProperties: [
      "General Purpose cement complies with AS 3972 — suitable for render, mortar, and concrete",
      "Pre-bagged render mixes available — factory-controlled mix ratio — reduces site batching variability",
      "Western Australia primary supply — also available nationally through BGC trade network",
      "GP cement suitable for 1:4 OPC:sand render mixes per AS 3700",
    ],
    limitations: [
      "Site-batched render requires careful sand specification — confirm clean, well-graded plasticising sand",
      "Pre-bagged BGC renders may not include polymer modification — confirm performance specification",
      "Confirm current pre-bagged render product range with BGC — range may vary by state",
    ],
    procurementSources: [
      { name: "BGC Cement — Western Australia primary supply", url: "https://www.bgccement.com.au" },
      { name: "BGC trade network — contact BGC for nearest supply", url: "https://www.bgccement.com.au" },
    ],
  },
  {
    fullLabel: "Haymes Paint / Parchem",
    brandUrl: "https://www.haymes.com.au",
    tdsUrl: "https://www.parchem.com.au/products",
    accentColor: "#1C3E6E",
    name: "Parchem Pre-bagged Render / Haymes Render",
    descriptionLine: "Pre-bagged sand/cement render — factory-controlled mix — two-coat system — concrete and masonry facade installation",
    productType: "Pre-bagged sand/cement render",
    filterTags: ["Sand-cement", "Two-coat", "AS-3700", "Masonry", "Concrete"],
    techChips: [
      { label: "Pre-bagged", cls: "bg-sky-100 text-sky-800" },
      { label: "Consistent mix", cls: "bg-slate-100 text-slate-700" },
      { label: "Trade supply", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Pre-bagged sand/cement render mixes available through Parchem Construction Supplies and Haymes trade stores provide factory-blended OPC, sand, and lime in pre-mixed dry bags that require only the addition of water on site. These products eliminate the mix ratio variability of site batching while remaining at a lower cost than polymer-modified specialist renders.\n\nIn Australian Class 2 strata facade remediation, pre-bagged sand/cement renders are used on lower-specification or budget-constrained projects where polymer-modified renders cannot be justified on cost. The pre-bagged format improves QA compared to site batching but does not provide the adhesion or crack resistance improvements of polymer modification.\n\nConfirm current product names, application rates, and substrate suitability with Parchem or Haymes before ordering.",
    technicalProperties: [
      "Factory-blended OPC, sand, and lime — eliminates site batching variability",
      "Add water only — no cement/sand proportioning on site",
      "Suitable for scratch and float coat two-coat render system",
      "Generally meets AS 3700 render mix specification requirements",
    ],
    limitations: [
      "Not polymer-modified — lower adhesion and crack resistance than polymer-modified renders",
      "Requires bonding primer on dense or smooth substrates",
      "Confirm current product name and mix specification with supplier",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — nationwide", url: "https://www.parchem.com.au" },
      { name: "Haymes trade stores", url: "https://www.haymes.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Sand-cement", label: "Sand/cement" },
  { id: "OPC", label: "OPC" },
  { id: "Two-coat", label: "Two-coat" },
  { id: "Scratch-float", label: "Scratch & float" },
  { id: "Site-batched", label: "Site-batched" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
];

const COMPARISON_ROWS: {
  product: string; brand: string; type: string;
  polymerMod: string; mixControl: string; keyFeature: string;
}[] = [
  { product: "Boral OPC + Brickies Sand", brand: "Boral", type: "Site-batched OPC render", polymerMod: "No", mixControl: "Site — variable", keyFeature: "Lowest cost — widely available nationally" },
  { product: "BGC GP Cement / Pre-bagged", brand: "BGC", type: "OPC render / pre-bagged", polymerMod: "No (confirm pre-bagged)", mixControl: "Factory-controlled (pre-bagged)", keyFeature: "WA primary supply — pre-bagged option" },
  { product: "Parchem / Haymes Pre-bagged", brand: "Parchem/Haymes", type: "Pre-bagged OPC render", polymerMod: "No", mixControl: "Factory-controlled", keyFeature: "Consistent mix — trade supply" },
];

const TECH_INFO = {
  typicalApplications: [
    "Full render removal and replacement on masonry brick and block buildings — sand/cement suited to high-absorption masonry substrates",
    "New render installation on masonry new-build or renovation — standard specification for masonry render",
    "Render over concrete blockwork — good surface absorption allows direct render without bonding agent on textured block",
    "Budget-constrained facade remediation where polymer-modified renders cannot be justified",
    "Re-render on older buildings where original sand/cement render is being replaced in-kind",
  ],
  selectionCriteria: [
    "Boral OPC + Brickies Sand: standard site-batched render for masonry — most common specification in eastern Australia",
    "BGC GP cement: Western Australia primary supply — equivalent to Boral nationally",
    "Pre-bagged options: specify where site-batching QA control is a concern — consistent factory mix",
    "For dense concrete substrates: upgrade to polymer-modified render (Sika, Mapei, Fosroc) — sand/cement renders on dense concrete require bonding agent and have higher delamination risk",
    "Always specify clean washed plasticising (brickies) sand — unsuitable sand (dirty, high clay content) is a primary cause of render failure",
  ],
  limitations: [
    "Site-batched renders rely on experienced tradespersons for consistent quality — QA is difficult on large facades",
    "Sand/cement renders have lower adhesion to dense substrates than polymer-modified renders",
    "Higher water:cement ratio in site-batched renders reduces strength — keep w/c ratio as low as workability allows",
    "Sand quality is critical — dirty or clay-contaminated sand causes render failure — specify clean washed sand and test if in doubt",
    "Sand/cement renders require careful curing — prevent rapid drying by misting or covering — failure to cure is a primary cause of chalking and surface dusting",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs render mix ratios, thickness, and application requirements",
    "AS 3972 — General purpose and blended cements — governs OPC specification",
    "CSIRO Technical Report — Defects in building plasterwork — governs render mix, substrate preparation, and curing requirements",
    "Manufacturer TDS (for pre-bagged products) — governs water addition, application thickness, and curing",
  ],
  suitableDefects: [
    "Full render removal required — existing render is delaminated, contaminated, or structurally unsound across large areas",
    "New render installation on renovation — masonry block or brick substrate with good absorption",
    "Render reinstatement on budget-constrained projects — masonry substrate confirmed — polymer modification not required",
  ],
  typicalSubstrates: [
    "Clay brick masonry — high absorption — sand/cement render suits direct application",
    "Concrete block masonry — medium absorption on textured face — bonding agent may be required on smooth face",
    "Concrete (rough-textured surface) — sand-blasted or mechanically prepared — bonding agent required on smooth concrete",
    "Masonry block infill panels — new construction substrate for external wall panels",
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

export function SandCementRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are two-coat sand/cement render systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Two-coat sand/cement render is the traditional Australian render specification — a scratch coat of OPC-and-sand mortar applied to the substrate, combed to provide mechanical key, then a float coat applied after partial curing to achieve the finished surface profile. It is the lowest-cost render system and is well-suited to masonry substrates with good surface absorption and texture.</p>
        {expanded && (<><p>The mix ratio for sand/cement render is governed by AS 3700 — Masonry Structures — which specifies the OPC:sand ratio and minimum thickness for different substrate and exposure conditions. The scratch coat is applied thicker (12–15mm) to provide bulk and key; the float coat (6–10mm) provides the finished surface for texture coat or direct painting.</p><p>Site-batched sand/cement render requires experienced tradespeople to control the water:cement ratio and maintain consistent mix proportions. Excessive water reduces strength; variable cement content produces patches of different colour and texture. In modern strata remediation practice, polymer-modified pre-bagged renders are increasingly specified to reduce this quality risk, reserving site-batched sand/cement render for low-cost masonry applications where polymer modification is not required.</p></>)}
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

export function SandCementRenderProductSection() {
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
          <div><p className="text-base font-extrabold text-sky-950">System Technical Reference</p><p className="mt-0.5 text-xs text-slate-500">Applications, product selection, mix ratios, limitations, standards and substrates</p></div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">{accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}</div>
        </button>
        {accordionOpen && (<div className="border-t border-slate-100 px-7 pb-7 pt-6"><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"><TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" /><TechCard icon={<Ruler size={15} />} title="Product Selection" items={TECH_INFO.selectionCriteria} style="check" /><TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" /><TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" /><TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" /><TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" /></div></div>)}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2><p className="mt-1 text-sm text-slate-500">3 products — Boral / BGC / Parchem-Haymes</p></div></div>
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
        <div className="mb-6 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Sand/cement render material comparison</h2><p className="mt-1 text-sm text-slate-500">All products require AS 3700 mix ratios and clean washed sand. Confirm current product names and availability.</p></div></div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Polymer-mod</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mix control</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th></tr></thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Boral" ? "#E05A1A" : row.brand === "BGC" ? "#003F7D" : "#1C3E6E" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.polymerMod}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.mixControl}</td>
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
