"use client";

import { useState, useRef } from "react";
import { CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, XCircle, ChevronLeft, ChevronRight, FileText } from "lucide-react";

type FilterTag = "Spray-applied" | "Acrylic" | "Thin-coat" | "Texture-finish" | "Render-installation" | "Masonry" | "Concrete" | "Machine-applied";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux / Acratex (Australia)", brandUrl: "https://www.dulux.com.au", accentColor: "#E3051B",
    name: "Dulux Acratex Spray Render",
    descriptionLine: "Acrylic spray-applied render — machine or hopper spray — thin coat 4–6mm — concrete and masonry facade installation",
    productType: "Acrylic spray-applied render",
    filterTags: ["Spray-applied", "Acrylic", "Thin-coat", "Texture-finish", "Render-installation", "Masonry", "Concrete", "Machine-applied"],
    techChips: [{ label: "Spray applied", cls: "bg-sky-100 text-sky-800" }, { label: "100% acrylic", cls: "bg-slate-100 text-slate-700" }, { label: "Thin coat", cls: "bg-green-50 text-green-700" }],
    systemDescription: "Dulux Acratex spray-applied render systems are machine-applied acrylic renders used for new render installation and re-render on concrete and masonry facades in a single or two-pass spray application. The spray application method provides faster coverage and more consistent texture than hand-applied render on large facade areas — particularly important on multi-storey strata buildings where access is by scaffolding and speed of application reduces access costs.\n\nIn Australian Class 2 strata facade remediation, spray-applied acrylic render is used where the entire facade is being re-rendered and the project specification calls for an acrylic render system. The spray application method requires machine equipment (hopper spray or spray pump) and experienced operators — overspray control in occupied strata buildings requires careful management.\n\nConfirm current product names, spray equipment requirements, and priming requirements with Dulux Trade Technical before specifying.",
    technicalProperties: ["Spray application — faster coverage than hand-applied render on large facade areas", "100% acrylic binder — UV resistance, colour retention, and weather resistance in Australian exterior exposure", "Applied 4–6mm thickness — thin coat system — suitable as finish render over base coat", "Wide range of textures achievable with different spray tips and techniques", "Applied over suitable primer — confirm primer with Dulux Trade Technical"],
    limitations: ["Spray application requires machine equipment and experienced spray operators", "Overspray management critical in occupied strata buildings — protect surrounding areas", "Not suitable as sole render system over rough or uneven substrates — requires level base coat", "Minimum application temperature 10°C — do not apply in rain or high winds", "Confirm current product name and spray specification with Dulux"],
    procurementSources: [{ name: "Dulux Trade stores — nationwide supply", url: "https://www.dulux.com.au" }, { name: "Dulux Acratex trade supply network", url: "https://www.dulux.com.au" }],
  },
  {
    fullLabel: "Rockcote (Australia)", brandUrl: "https://www.rockcote.com.au", accentColor: "#5C4033",
    name: "Rockcote Spray Render / ArchiStone",
    descriptionLine: "Spray-applied acrylic and polymer render systems — range of textures — concrete, masonry, and EIFS substrates",
    productType: "Spray-applied acrylic render and texture system",
    filterTags: ["Spray-applied", "Acrylic", "Thin-coat", "Texture-finish", "Render-installation", "Machine-applied"],
    techChips: [{ label: "Spray applied", cls: "bg-sky-100 text-sky-800" }, { label: "Multiple textures", cls: "bg-slate-100 text-slate-700" }, { label: "EIFS compatible", cls: "bg-green-50 text-green-700" }],
    systemDescription: "Rockcote provides a range of spray-applied acrylic render and texture systems for commercial and residential facade installation. The Rockcote spray render range includes fine, medium, and coarse aggregated options achieving different texture profiles, and the ArchiStone and similar products provide stone-effect finishes achievable by spray application.\n\nIn Australian strata facade installation, Rockcote spray renders are specified on projects where an architectural texture finish is required beyond standard Dulux Acratex options, or where the facade consultant has specified Rockcote products for compatibility with an existing Rockcote render system on the building.\n\nConfirm current product names, substrate compatibility, and spray equipment requirements with Rockcote before specifying.",
    technicalProperties: ["Range of texture profiles — fine, medium, coarse, and stone-effect by spray application", "Acrylic and polymer-modified options available", "EIFS-compatible finish coat options within Rockcote system", "Good UV and weather resistance in Australian exterior exposure"],
    limitations: ["Specialist spray applicators required for some Rockcote products", "Texture matching for repair work may be difficult on aged facades", "Confirm current product name and spray system with Rockcote before specifying"],
    procurementSources: [{ name: "Rockcote — contact for current pricing and trade supply", url: "https://www.rockcote.com.au" }],
  },
  {
    fullLabel: "Solver Paints (Australia)", brandUrl: "https://www.solverpaints.com.au", accentColor: "#004B87",
    name: "Solver Spray Texture / Machine Render",
    descriptionLine: "Spray-applied acrylic texture render — eastern Australia supply — concrete and masonry facade installation",
    productType: "Spray-applied acrylic render",
    filterTags: ["Spray-applied", "Acrylic", "Thin-coat", "Texture-finish", "Render-installation", "Masonry", "Concrete"],
    techChips: [{ label: "Solver supply chain", cls: "bg-sky-100 text-sky-800" }, { label: "Spray applied", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Solver provides spray-applied acrylic texture render products through the Solver/DuluxGroup supply chain. These products are used by painting and facade contractors who work within the Solver trade network in eastern Australia. Equivalent in performance to Dulux Acratex spray renders as both are within the DuluxGroup portfolio, they provide a consistent supply option for contractors with established Solver trade accounts.\n\nConfirm current product names, spray specification, and primer compatibility with Solver/DuluxGroup Trade before specifying.",
    technicalProperties: ["Acrylic spray-applied render — DuluxGroup supply chain", "Range of textures — fine, medium, coarse available", "Compatible with Solver primer system for substrate preparation"],
    limitations: ["Spray equipment and experienced operator required", "Confirm current product name with Solver/DuluxGroup Trade", "Overspray management required in occupied buildings"],
    procurementSources: [{ name: "Solver trade stores — eastern Australia", url: "https://www.solverpaints.com.au" }],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Spray-applied", label: "Spray applied" }, { id: "Acrylic", label: "Acrylic" }, { id: "Thin-coat", label: "Thin coat" },
  { id: "Machine-applied", label: "Machine applied" }, { id: "Texture-finish", label: "Texture finish" },
  { id: "Render-installation", label: "Render installation" }, { id: "Masonry", label: "Masonry" }, { id: "Concrete", label: "Concrete" },
];

const COMPARISON_ROWS: { product: string; brand: string; thickness: string; eifs: string; texture: string; keyFeature: string }[] = [
  { product: "Acratex Spray Render", brand: "Dulux", thickness: "4–6mm", eifs: "Yes", texture: "Fine/medium/coarse", keyFeature: "Most widely available nationally" },
  { product: "Rockcote Spray Render", brand: "Rockcote", thickness: "4–8mm", eifs: "System-compatible", texture: "Fine/coarse/stone-effect", keyFeature: "Specialty architectural textures" },
  { product: "Solver Spray Texture", brand: "Solver", thickness: "4–6mm", eifs: "Confirm with Solver", texture: "Fine/medium/coarse", keyFeature: "Solver/DuluxGroup supply chain" },
];

const TECH_INFO = {
  typicalApplications: ["Full facade re-render — spray application over large facade areas reduces labour time", "New render installation on masonry and concrete — single-pass spray over primed substrate", "Re-render after full removal of failed render — spray over repaired and primed substrate", "Texture coat on EIFS systems — spray-applied finish over EIFS base coat"],
  selectionCriteria: ["Dulux Acratex: first choice for most projects — widest availability and contractor familiarity", "Rockcote: specify where architectural texture or EIFS-specific system is required", "Solver: use where contractor has established Solver supply account — equivalent to Acratex performance", "All systems: overspray management plan required before starting on occupied strata buildings"],
  limitations: ["Spray application requires machine equipment and experienced operators — not suitable for hand-applied substitution", "Overspray is difficult to control in wind — schedule spray work in still conditions only", "Texture matching for partial repair work requires test panel before full application", "Thin-coat spray renders are not structural render replacements — they are finish coat systems over a base coat"],
  standardsNotes: ["No specific Australian Standard for spray-applied acrylic renders — manufacturer TDS governs application", "AS 3700 — masonry substrate preparation requirements apply to base coat", "Manufacturer TDS — governs primer, DFT, application method, and texture profile"],
  suitableDefects: ["Full facade re-render where spray application is preferred for speed and access efficiency", "New render on renovations and extensions where consistent texture coat is required", "EIFS finish coat replacement over sound EIFS base coat"],
  typicalSubstrates: ["Concrete — primed substrate", "Masonry block/brick — primed substrate", "EIFS base coat — as finish system", "Polymer-modified render base coat — as finish system over cured base coat"],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false); const visible = expanded ? items : items.slice(0, limit); const extra = items.length - limit;
  return (<div><ul className="space-y-1.5">{visible.map((item, i) => (<li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">{icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}{item}</li>))}</ul>{items.length > limit && (<button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Show less ↑" : `+${extra} more ↓`}</button>)}</div>);
}
function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (<div><div className="flex items-center justify-between"><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p><button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button></div>{expanded && (<div className="mt-2 space-y-1.5">{sources.map((src) => (<div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">{src.url ? (<a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a>) : <span className="font-semibold text-slate-600">{src.name}</span>}</div>))}</div>)}<p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p></div>);
}
function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (<div>{expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && (<div className="mt-2 flex flex-wrap gap-1.5">{chips.map((chip) => (<span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>))}</div>)}</>)}<button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button></div>);
}
function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (<div><p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p><button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button></div>);
}

export function AcrylicSprayRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div><h3 className="text-base font-extrabold text-sky-950">What are acrylic spray-applied render systems?</h3></div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Acrylic spray-applied renders are thin-coat finish systems applied by hopper spray or spray pump equipment to prepared and primed concrete and masonry substrates. They provide a decorative textured finish coat at 4–6mm thickness — faster and more uniform in coverage than hand-applied render on large facade areas — and are widely used on strata facade re-render programmes where spray access on scaffolding allows economical large-area application.</p>
        {expanded && (<p>Spray-applied acrylic renders are finish systems, not structural renders. They are applied over a sound base coat (polymer-modified render or existing render) and are used to provide the decorative texture and weatherproofing of the outermost facade layer. They are not suitable as a sole render system over rough or irregular substrates — the substrate must be smooth, sound, and primed before spray application.</p>)}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-4 flex items-center gap-2.5"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div><h3 className="text-sm font-extrabold text-sky-950">{title}</h3></div><ul className="space-y-2">{items.map((item, i) => (<li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">{style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}{style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}{style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}{item}</li>))}</ul></div>);
}

export function AcrylicSprayRenderProductSection() {
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
          <div><p className="text-base font-extrabold text-sky-950">System Technical Reference</p><p className="mt-0.5 text-xs text-slate-500">Applications, spray equipment, texture selection, limitations and substrates</p></div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">{accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}</div>
        </button>
        {accordionOpen && (<div className="border-t border-slate-100 px-7 pb-7 pt-6"><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"><TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" /><TechCard icon={<Ruler size={15} />} title="Product Selection" items={TECH_INFO.selectionCriteria} style="check" /><TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" /><TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" /><TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" /><TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" /></div></div>)}
      </div>
      <div>
        <div className="mb-5 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2><p className="mt-1 text-sm text-slate-500">3 products — 3 brands — Dulux Acratex / Rockcote / Solver</p></div></div>
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
        <div className="mb-6 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Acrylic spray render comparison</h2><p className="mt-1 text-sm text-slate-500">All systems require primed substrate — texture matching requires test panel. Confirm current products with manufacturers.</p></div></div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">EIFS suitable</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Texture range</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th></tr></thead>
            <tbody>{COMPARISON_ROWS.map((row, i) => (<tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td><td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Dulux" ? "#E3051B" : row.brand === "Rockcote" ? "#5C4033" : "#004B87" }}>{row.brand}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.eifs}</td><td className="px-4 py-3 text-slate-600">{row.texture}</td><td className="px-4 py-3 text-slate-500">{row.keyFeature}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
