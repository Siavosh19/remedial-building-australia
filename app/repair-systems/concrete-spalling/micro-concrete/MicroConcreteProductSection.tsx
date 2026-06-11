"use client";
import { useState, useRef } from "react";
import { CheckCircle, BookOpen, ExternalLink, ChevronLeft, ChevronRight, XCircle } from "lucide-react";

type FilterTag = "Micro-concrete" | "High-strength" | "Free-flow" | "Pre-bagged" | "Mapei" | "Structural" | "Deep-section";
type Product = { fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string; name: string; descriptionLine: string; productType: string; filterTags: FilterTag[]; techChips: { label: string; cls: string }[]; systemDescription: string; technicalProperties: string[]; limitations: string[]; procurementSources: { name: string; url: string }[] };

const PRODUCTS: Product[] = [
  {
    fullLabel: "Mapei",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#0284c7",
    name: "Mapei Mapefill MC 06",
    descriptionLine: "Micro-concrete for deep-section structural concrete reinstatement — self-compacting, high-strength cementitious system for heavily-damaged columns, beams, and slabs — confirm current formulation and system design with Mapei Australia technical",
    productType: "Micro-concrete — deep-section structural concrete reinstatement",
    filterTags: ["Micro-concrete", "High-strength", "Free-flow", "Pre-bagged", "Mapei", "Structural", "Deep-section"],
    techChips: [{ label: "Micro-concrete", cls: "bg-blue-100 text-blue-700" }, { label: "Self-compacting", cls: "bg-slate-100 text-slate-700" }, { label: "Deep-section", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Mapei Mapefill MC 06 is a micro-concrete (fine-aggregate concrete) product for deep-section structural reinstatement of heavily-damaged or section-deficient concrete elements such as columns, beams, and slabs. Micro-concrete products are designed to flow into formed sections without vibration, providing high-strength structural reinstatement.\n\nMC 06 (or equivalent current product designation) is part of the Mapei structural repair range. Confirm current product technical data sheet, compressive strength class, aggregate size, flow consistency, formwork requirements, and system design with Mapei Australia technical before specifying. Confirm current Australian product name and availability with Mapei Australia or Bayset.",
    technicalProperties: [
      "Micro-concrete for deep-section structural reinstatement — suitable for columns, beams, and slabs",
      "Self-compacting formulation — flows into formed sections without vibration for deep-section applications",
      "Confirm compressive strength, aggregate size, flow, formwork requirements from current Mapei Mapefill MC 06 TDS",
    ],
    limitations: [
      "Confirm current product formulation and system design with Mapei Australia technical before specifying",
      "Structural engineer sign-off on repair design is required for structural micro-concrete applications",
      "Formwork must be adequate to contain the free-flow material during placement and curing",
      "Confirm current Australian product name and availability with Mapei Australia or Bayset before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [{ id: "Micro-concrete", label: "Micro-concrete" }, { id: "High-strength", label: "High-strength" }, { id: "Structural", label: "Structural" }, { id: "Deep-section", label: "Deep-section" }, { id: "Free-flow", label: "Free-flow" }];

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  return (<div><ul className="space-y-1.5">{visible.map((item, i) => <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">{icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}{item}</li>)}</ul>{items.length > limit && <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Show less ↑" : `+${items.length - limit} more ↓`}</button>}</div>);
}
function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (<div><div className="flex items-center justify-between"><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p><button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button></div>{expanded && <div className="mt-2 space-y-1.5">{sources.map((src) => <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">{src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}</div>)}</div>}<p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p></div>);
}
function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (<div>{expanded && <><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}</div>}</>}<button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button></div>);
}
function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (<div><p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p><button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button></div>);
}

export function MicroConcreteIntroSection() {
  return (<div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="mb-4 flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div><h3 className="text-base font-extrabold text-sky-950">Micro-concrete</h3></div><p className="text-sm leading-7 text-slate-600">Micro-concrete products are fine-aggregate, self-compacting cementitious systems for deep-section structural reinstatement of heavily-damaged concrete elements such as columns, beams, and slabs. Unlike trowel-grade repair mortars, micro-concrete flows into formed sections without vibration. Mapei Mapefill MC 06 is a structural micro-concrete for this application. Confirm current specifications with Mapei Australia or Bayset before specifying.</p></div>);
}

export function MicroConcreteProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggleFilter = (id: FilterTag) => { setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };
  return (
    <div>
      <div className="mb-5 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2><p className="mt-1 text-sm text-slate-500">1 product — Mapei — micro-concrete systems</p></div></div>
      <div className="mb-5 flex flex-wrap items-center gap-2"><span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>{FILTER_DEFS.map((f) => { const active = activeFilters.has(f.id); return <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>; })}{activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}</div>
      <div className="mb-4 flex items-center justify-between"><span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}</span><div className="flex items-center gap-2"><button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button><button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button></div></div>
      <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
        {visibleProducts.map((product) => (
          <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
              <div className="border-b border-slate-100 bg-slate-50 px-5 py-4"><div className="flex items-center justify-between gap-2"><span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span><div className="flex shrink-0 items-center gap-1"><a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a></div></div><h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3><p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p><CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} /></div>
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
