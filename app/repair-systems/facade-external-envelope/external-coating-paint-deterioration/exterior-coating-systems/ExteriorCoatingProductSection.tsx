"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Acrylic"
  | "Two-coat"
  | "Exterior-topcoat"
  | "Masonry"
  | "Render"
  | "UV-resistant"
  | "Water-based"
  | "Weatherproof"
  | "Anti-fungal"
  | "Low-sheen";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string; filterTags: FilterTag[];
  techChips: { label: string; cls: string }[]; systemDescription: string;
  technicalProperties: string[]; limitations: string[];
  procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Wattyl Australia",
    brandUrl: "https://www.wattyl.com.au",
    accentColor: "#16a34a",
    name: "Wattyl Duraguard",
    descriptionLine: "Premium exterior acrylic coating with enhanced durability for masonry and render facades — UV-resistant, weatherproof, anti-fungal — confirm current specifications with Wattyl technical",
    productType: "Premium exterior acrylic coating — masonry and render facades",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "UV-resistant", "Water-based", "Weatherproof", "Anti-fungal"],
    techChips: [
      { label: "Acrylic", cls: "bg-green-100 text-green-800" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Anti-fungal", cls: "bg-green-100 text-green-700" },
      { label: "Premium grade", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Wattyl Duraguard is a premium exterior acrylic coating for masonry and render facades, positioned in the Wattyl range for projects requiring enhanced durability and extended service life. It provides UV resistance, weather resistance, and anti-fungal properties suitable for Australian exterior facade conditions.\n\nApply as a two-coat system over a compatible Wattyl exterior primer or alkali-resistant primer on cement render. Confirm current product technical data sheet, coverage, DFT, primer specification, and system requirements with Wattyl technical before specifying.",
    technicalProperties: [
      "Premium exterior acrylic coating — enhanced durability for extended service life on masonry and render",
      "UV-resistant, weatherproof, and anti-fungal formulation for Australian exterior conditions",
      "Apply as a two-coat system over compatible Wattyl exterior primer",
      "Confirm coverage rate, DFT per coat, and primer specification from current Wattyl Duraguard TDS",
    ],
    limitations: [
      "Alkali-resistant primer mandatory on new or unpainted cement render — confirm primer with Wattyl",
      "Not a crack-bridging coating — specify elastomeric system for facades with active cracking",
      "Confirm current product name and formulation with Wattyl before specifying",
      "Do not apply below 10°C or when rain is expected within 4 hours",
    ],
    procurementSources: [
      { name: "Wattyl Trade — Product Finder", url: "https://www.wattyl.com.au" },
      { name: "Wattyl Trade Centres — national", url: "https://www.wattyl.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl Australia",
    brandUrl: "https://www.wattyl.com.au",
    accentColor: "#16a34a",
    name: "Wattyl Solagard Low Sheen",
    descriptionLine: "Low-sheen exterior acrylic coating for masonry and render facades — UV-resistant, anti-fungal, designed for Australian conditions — confirm current specifications with Wattyl technical",
    productType: "Low-sheen exterior acrylic coating — masonry and render facades",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "UV-resistant", "Water-based", "Weatherproof", "Anti-fungal", "Low-sheen"],
    techChips: [
      { label: "Low sheen", cls: "bg-green-100 text-green-800" },
      { label: "Acrylic", cls: "bg-green-100 text-green-800" },
      { label: "UV stabilised", cls: "bg-amber-100 text-amber-700" },
      { label: "Anti-fungal", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Wattyl Solagard Low Sheen is the low-sheen finish variant of the Solagard exterior acrylic range — one of Australia's most established exterior coating systems for masonry and rendered facades. Low-sheen finish is the most commonly specified exterior sheen level for residential and Class 2 strata facade repainting, providing a flat to low-reflective surface that minimises the appearance of substrate imperfections.\n\nSolagard incorporates advanced UV stabilisers formulated for Australian conditions and anti-fungal additives for humid and shaded exposures. Apply as a two-coat system over a compatible Wattyl exterior primer or alkali-resistant primer on cement render. Confirm current product technical data sheet, coverage, DFT, and primer specification with Wattyl technical before specifying.",
    technicalProperties: [
      "Low-sheen exterior acrylic topcoat — most commonly specified finish level for residential and strata facade repainting",
      "Advanced UV stabilisers formulated for Australian high-UV and coastal conditions",
      "Anti-fungal additives — suitable for humid, shaded, and south-facing facade exposures",
      "Confirm coverage rate, DFT per coat, and primer specification from current Wattyl Solagard Low Sheen TDS",
    ],
    limitations: [
      "Alkali-resistant primer mandatory on new or unpainted cement render — confirm primer with Wattyl",
      "Not a crack-bridging coating — specify elastomeric system for facades with active cracking",
      "Low-sheen finish may show uneven substrate more readily than higher-build coatings on rough surfaces",
      "Confirm current product name and formulation with Wattyl before specifying",
    ],
    procurementSources: [
      { name: "Wattyl Trade — Product Finder", url: "https://www.wattyl.com.au" },
      { name: "Wattyl Trade Centres — national", url: "https://www.wattyl.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acrylic", label: "Acrylic" },
  { id: "Two-coat", label: "Two-coat" },
  { id: "UV-resistant", label: "UV-resistant" },
  { id: "Anti-fungal", label: "Anti-fungal" },
  { id: "Low-sheen", label: "Low sheen" },
  { id: "Masonry", label: "Masonry" },
  { id: "Render", label: "Render" },
];

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">{visible.map((item, i) => <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">{icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}{item}</li>)}</ul>
      {items.length > limit && <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Show less ↑" : `+${extra} more ↓`}</button>}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between"><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p><button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button></div>
      {expanded && <div className="mt-2 space-y-1.5">{sources.map((src) => <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">{src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}</div>)}</div>}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && <><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}</div>}</>}
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

export function ExteriorCoatingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div><h3 className="text-base font-extrabold text-sky-950">Wattyl exterior coating systems</h3></div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Wattyl Duraguard and Solagard are exterior acrylic coating systems for masonry and rendered facades. Solagard is one of Australia's most established exterior acrylic ranges, available in low-sheen and other finishes. Duraguard provides enhanced durability for demanding exterior applications.</p>
        {expanded && <p>Both products require alkali-resistant primer on new or unpainted cement render and are applied as two-coat systems. Confirm current product formulation, coverage, DFT, and primer specification from current Wattyl technical data sheets before specifying. Wattyl products are available nationally through Wattyl Trade Centres and major hardware trade channels.</p>}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
    </div>
  );
}

export function ExteriorCoatingProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggleFilter = (id: FilterTag) => { setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };
  return (
    <div>
      <div className="mb-5 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2><p className="mt-1 text-sm text-slate-500">2 products — Wattyl — exterior coating systems</p></div></div>
      <div className="mb-5 flex flex-wrap items-center gap-2"><span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>{FILTER_DEFS.map((f) => { const active = activeFilters.has(f.id); return <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>; })}{activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}</div>
      <div className="mb-4 flex items-center justify-between"><span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}</span><div className="flex items-center gap-2"><button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button><button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button></div></div>
      <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
        {visibleProducts.map((product) => (
          <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
              <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                <div className="flex items-center justify-between gap-2"><span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span><div className="flex shrink-0 items-center gap-1">{product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}<a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a></div></div>
                <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
              </div>
              <div className="border-b border-sky-100 bg-sky-50 px-5 py-4"><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p><CollapsibleDescription text={product.systemDescription} /></div>
              <div className="space-y-3 px-5 py-4"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p><CollapsibleList items={product.technicalProperties} icon="check" limit={3} /></div><div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p><CollapsibleList items={product.limitations} icon="x" limit={3} /></div></div>
              <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3"><CollapsibleSources sources={product.procurementSources} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
