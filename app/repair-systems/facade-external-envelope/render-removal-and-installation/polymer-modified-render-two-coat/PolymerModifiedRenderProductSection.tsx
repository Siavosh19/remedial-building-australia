"use client";

import { useState, useRef } from "react";
import { CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, XCircle, ChevronLeft, ChevronRight, FileText } from "lucide-react";

type FilterTag = "Polymer-modified" | "Two-coat" | "Pre-bagged" | "AS-3700" | "Concrete-masonry" | "Render-installation" | "Scratch-float" | "Acrylic-polymer";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia", brandUrl: "https://aus.sika.com", accentColor: "#cc0000",
    name: "SikaRenderEM Two-Coat System",
    descriptionLine: "Polymer-modified two-coat render installation system — scratch and finish coat — concrete and masonry — full render removal and replacement scope",
    productType: "Polymer-modified two-coat render installation",
    filterTags: ["Polymer-modified", "Two-coat", "Pre-bagged", "AS-3700", "Concrete-masonry", "Render-installation", "Scratch-float", "Acrylic-polymer"],
    techChips: [{ label: "Polymer-modified", cls: "bg-sky-100 text-sky-800" }, { label: "Two-coat system", cls: "bg-slate-100 text-slate-700" }, { label: "Pre-bagged", cls: "bg-green-50 text-green-700" }],
    systemDescription: "SikaRenderEM is Sika Australia's polymer-modified render for full-replacement two-coat render installation on concrete and masonry facades. Applied in a scratch coat (8–12mm) followed by a finish coat (6–8mm), it provides improved adhesion, reduced shrinkage cracking, and better water resistance than traditional sand/cement renders. The pre-bagged format provides consistent polymer content and eliminates site batching variability.\n\nIn Class 2 strata render removal and replacement programmes, SikaRenderEM is specified by remedial contractors who work within the Sika supply ecosystem and require a documented, engineered render system with TDS backing for defect liability purposes. The integrated Sika system — SikaCem bonding slurry, SikaRenderEM scratch and finish coats — provides full manufacturer compatibility across the render build.\n\nConfirm current product names, application sequence, and bonding agent requirements with Sika Australia before specifying.",
    technicalProperties: ["Polymer-modified acrylic — improved adhesion, water resistance, and crack resistance over OPC renders", "Pre-bagged powder — consistent factory-controlled polymer content", "Scratch coat 8–12mm + finish coat 6–8mm — total 14–20mm system", "Part of integrated Sika facade repair system — compatible bonding agents and topcoats available"],
    limitations: ["Requires SikaCem bonding slurry on dense or smooth concrete substrates", "Do not exceed maximum coat thickness per coat — risk of sag and cracking", "Confirm current product name with Sika Australia before ordering", "Do not apply below 5°C or in direct sun above 35°C"],
    procurementSources: [{ name: "Sika Australia — contact for current pricing and trade supply", url: "https://aus.sika.com" }, { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" }],
  },
  {
    fullLabel: "Mapei Australia", brandUrl: "https://www.mapei.com/au", accentColor: "#0055A5",
    name: "Mapei Planitop XS / Planitop Smooth",
    descriptionLine: "Polymer-modified repair mortar — two-coat render installation — 5–30mm thickness range — concrete and masonry facade installation",
    productType: "Polymer-modified render installation mortar",
    filterTags: ["Polymer-modified", "Two-coat", "Pre-bagged", "AS-3700", "Concrete-masonry", "Render-installation", "Acrylic-polymer"],
    techChips: [{ label: "5–30mm range", cls: "bg-sky-100 text-sky-800" }, { label: "Fibre-reinforced", cls: "bg-slate-100 text-slate-700" }, { label: "Mapei system", cls: "bg-green-50 text-green-700" }],
    systemDescription: "Mapei Planitop XS is a polymer-modified, fibre-reinforced repair mortar used for full render installation in Class 2 strata facade work. Its wide application thickness range (5–30mm) makes it suitable for both the base/scratch coat and as a finish coat when applied at reduced thickness. The fibre reinforcement provides improved plastic shrinkage cracking resistance compared to non-reinforced polymer renders.\n\nIn Australian strata render installation work, the Mapei system uses Planitop XS for the base coat and Planitop Smooth & Repair for the fine finish coat, with Planicrete bonding slurry on dense concrete substrates. The Mapei approach is widely used by remedial contractors who prefer the Mapei product range and the technical support from Mapei Australia.\n\nConfirm current product names and system specification with Mapei Australia before ordering.",
    technicalProperties: ["Wide thickness range 5–30mm — suits variable substrate profile in full render replacement", "Fibre-reinforced — reduced plastic shrinkage cracking during cure", "Polymer-modified acrylic — improved adhesion and water resistance", "Compatible with Mapei Planicrete bonding slurry for dense substrates"],
    limitations: ["Maximum 30mm per coat — multiple coats required for deeper substrate defects", "Requires bonding agent on dense or painted substrates", "Confirm current product name with Mapei Australia before ordering"],
    procurementSources: [{ name: "Mapei Australia — contact for current pricing", url: "https://www.mapei.com/au" }, { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" }],
  },
  {
    fullLabel: "Fosroc Australia", brandUrl: "https://www.fosroc.com/en-au", accentColor: "#007A33",
    name: "Fosroc Renderoc Classic / Renderoc FC",
    descriptionLine: "Polymer-modified render installation — Renderoc range — scratch and finish coat — concrete and masonry facades — Fosroc supply chain",
    productType: "Polymer-modified render installation system",
    filterTags: ["Polymer-modified", "Two-coat", "Pre-bagged", "AS-3700", "Concrete-masonry", "Render-installation", "Scratch-float"],
    techChips: [{ label: "Renderoc range", cls: "bg-sky-100 text-sky-800" }, { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" }, { label: "Nitobond system", cls: "bg-green-50 text-green-700" }],
    systemDescription: "Fosroc Renderoc Classic is the scratch coat and Renderoc FC is the fine finish coat in the Fosroc render installation system. Both are polymer-modified, pre-bagged products that provide improved performance over site-batched OPC renders. The Fosroc system integrates with Nitobond AR bonding agent for dense concrete substrates, and is widely used by contractors working in the Fosroc supply ecosystem on both strata and commercial facade remediation projects.\n\nIn Australian Class 2 strata render removal and replacement, the Fosroc Renderoc system is specified where project QA requires a documented engineered render system with TDS-backed specifications. The Renderoc range is positioned as a step above generic polymer-modified renders, with product support from Fosroc Australia's technical team.\n\nConfirm current product names and Renderoc grade suitability with Fosroc Australia before specifying.",
    technicalProperties: ["Renderoc Classic: scratch/base coat 8–15mm; Renderoc FC: finish coat 3–6mm", "Polymer-modified — improved adhesion and crack resistance", "Compatible with Fosroc Nitobond AR bonding agent system", "Single-component pre-bagged — consistent formulation"],
    limitations: ["Requires Nitobond AR on dense, low-absorption substrates", "Confirm current Renderoc product name with Fosroc Australia — multiple grades in range", "Do not exceed maximum coat thickness per TDS"],
    procurementSources: [{ name: "Fosroc Australia — contact for current pricing", url: "https://www.fosroc.com/en-au" }, { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" }],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Polymer-modified", label: "Polymer-modified" }, { id: "Two-coat", label: "Two-coat" }, { id: "Pre-bagged", label: "Pre-bagged" },
  { id: "Scratch-float", label: "Scratch & float" }, { id: "AS-3700", label: "AS 3700" }, { id: "Concrete-masonry", label: "Concrete/masonry" },
  { id: "Render-installation", label: "Render installation" }, { id: "Acrylic-polymer", label: "Acrylic polymer" },
];

const COMPARISON_ROWS: { product: string; brand: string; scratchCoat: string; finishCoat: string; fibre: string; keyFeature: string }[] = [
  { product: "SikaRenderEM", brand: "Sika", scratchCoat: "8–12mm", finishCoat: "6–8mm", fibre: "Optional variant", keyFeature: "Integrated Sika facade system" },
  { product: "Planitop XS / Smooth", brand: "Mapei", scratchCoat: "5–30mm", finishCoat: "2–6mm Smooth", fibre: "Yes — included", keyFeature: "Wide thickness range — fibre-reinforced" },
  { product: "Renderoc Classic / FC", brand: "Fosroc", scratchCoat: "8–15mm", finishCoat: "3–6mm FC", fibre: "No (confirm variant)", keyFeature: "Documented Fosroc system with Nitobond" },
];

const TECH_INFO = {
  typicalApplications: ["Full render removal and replacement — concrete and masonry facades in Class 2 strata buildings", "New render installation over repaired concrete substrate after concrete repair works", "Render installation on new masonry infill panels after window or balustrade replacement", "Render over concrete frame buildings — concrete column and wall surface rendering"],
  selectionCriteria: ["Sika SikaRenderEM: preferred within Sika supply chain — integrates with Sika bonding and topcoat systems", "Mapei Planitop XS: use where variable thickness range is needed and fibre reinforcement is specified", "Fosroc Renderoc: use within Fosroc supply chain — integrates with Nitobond bonding agent range", "All systems require bonding agent on dense or smooth concrete — confirm with manufacturer"],
  limitations: ["Maximum coat thickness must not be exceeded — overly thick single coats sag and crack", "Not suitable over active moisture — address source before rendering", "Polymer-modified renders require compatible bonding primer on dense substrates", "Curing required — prevent rapid drying in hot or windy conditions"],
  standardsNotes: ["AS 3700 — Masonry Structures — render mix, thickness, and application requirements", "AS 3600 — Concrete Structures — render reinstatement over concrete", "NCC Section 3 — Building Fabric — external wall performance requirements", "Manufacturer TDS — governs mix ratios, thickness, and primer compatibility"],
  suitableDefects: ["Full render delamination — full removal and replacement required", "Structurally unsound render with widespread hollow-sounding areas", "Render contaminated with salt, carbonation products, or biological growth requiring full removal"],
  typicalSubstrates: ["In-situ reinforced concrete walls, columns, and spandrels", "Masonry brick and block construction", "Previously rendered surfaces after full render removal", "Concrete frame buildings with infill masonry panels"],
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

export function PolymerModifiedRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div><h3 className="text-base font-extrabold text-sky-950">Polymer-modified render installation systems</h3></div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Polymer-modified two-coat render systems are the preferred render specification for full removal and replacement of failed render on Class 2 strata concrete and masonry facades. The incorporation of acrylic polymer into the cementitious render matrix improves adhesion to substrates, reduces shrinkage cracking, and increases water resistance — all critical performance improvements for render on multi-storey facade elements subject to weathering, thermal cycling, and ongoing maintenance access constraints.</p>
        {expanded && (<p>In full render removal and replacement programmes, the scope involves mechanical removal of all failed render to the substrate, substrate preparation (concrete repair where necessary, bonding agent application on dense substrates), application of scratch coat, allow to partially cure, then application of finish coat. The polymer-modified system is recommended over site-batched OPC renders for all but the lowest-cost masonry applications, because the factory-controlled polymer content ensures consistent performance across the facade.</p>)}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-4 flex items-center gap-2.5"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div><h3 className="text-sm font-extrabold text-sky-950">{title}</h3></div><ul className="space-y-2">{items.map((item, i) => (<li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">{style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}{style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}{style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}{item}</li>))}</ul></div>);
}

export function PolymerModifiedRenderProductSection() {
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
          <div><p className="text-base font-extrabold text-sky-950">System Technical Reference</p><p className="mt-0.5 text-xs text-slate-500">Applications, product selection, render sequence, limitations, standards and substrates</p></div>
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
        <div className="mb-6 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Polymer-modified render installation comparison</h2><p className="mt-1 text-sm text-slate-500">All systems require bonding agent on dense substrates. Confirm current product names with manufacturers.</p></div></div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Scratch coat</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish coat</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fibre</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th></tr></thead>
            <tbody>{COMPARISON_ROWS.map((row, i) => (<tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td><td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Sika" ? "#cc0000" : row.brand === "Mapei" ? "#0055A5" : "#007A33" }}>{row.brand}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.scratchCoat}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finishCoat}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fibre}</td><td className="px-4 py-3 text-slate-500">{row.keyFeature}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
