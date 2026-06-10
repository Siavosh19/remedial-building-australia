"use client";

import { useState, useRef } from "react";
import { CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, XCircle, ChevronLeft, ChevronRight, FileText } from "lucide-react";

type FilterTag = "EIFS" | "EPS-board" | "AR-mesh" | "Base-coat" | "Full-system" | "NCC-C1" | "Insulated" | "Lightweight";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Mapei Australia", brandUrl: "https://www.mapei.com/au", tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products-catalogue", accentColor: "#0055A5",
    name: "Mapei Mapetherm Full EIFS System",
    descriptionLine: "Full EIFS installation system — EPS adhesive, EPS board, base coat, AR mesh, and finish coat — facade insulation and render for Class 2 strata buildings",
    productType: "Full EIFS installation system",
    filterTags: ["EIFS", "EPS-board", "AR-mesh", "Base-coat", "Full-system", "NCC-C1", "Insulated", "Lightweight"],
    techChips: [{ label: "Full EIFS system", cls: "bg-sky-100 text-sky-800" }, { label: "EPS + AR mesh", cls: "bg-slate-100 text-slate-700" }, { label: "NCC C1.1", cls: "bg-amber-50 text-amber-700" }],
    systemDescription: "Mapei's Mapetherm system provides a complete EIFS (Exterior Insulation and Finish System) installation range — adhesive mortar for bonding EPS insulation boards to the substrate, EPS insulation boards (25–100mm), polymer-modified base coat embedded with AR glass mesh, and Silexcolor decorative finish coat. All components are Mapei products designed for system compatibility.\n\nIn Australian Class 2 strata new EIFS installation, the Mapetherm system is specified by facade engineers and remedial builders who require a documented, engineered EIFS system with system-level compliance documentation including NCC Spec C1.1 fire performance. The insulation layer reduces thermal bridging and improves thermal performance of the facade, which is increasingly specified in energy-efficient strata developments.\n\nConfirm current product names, EPS board thickness, and NCC C1.1 fire compliance status with Mapei Australia before specifying.",
    technicalProperties: ["Full system from single manufacturer — EPS adhesive through to finish coat — system compatibility assured", "EPS board thickness 25–100mm — specified by thermal engineer for energy compliance", "160g/m² AR glass mesh embedded in base coat — primary tensile reinforcement", "NCC Spec C1.1 fire compliance available — confirm current status with Mapei Australia", "Silexcolor finish coat — vapour permeable — wide texture and colour range"],
    limitations: ["EIFS installation requires specialist applicators — standard rendering contractors may not have EIFS experience", "NCC fire compliance is system-specific — confirm current documentation with Mapei before specifying on fire-rated walls", "EPS boards must be protected from solvent-based products — confirm primer and adhesive compatibility", "Water management at EIFS perimeters, window heads, and base of wall is critical — sealant joints must be maintained"],
    procurementSources: [{ name: "Mapei Australia — contact for current pricing and trade supply", url: "https://www.mapei.com/au" }, { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" }],
  },
  {
    fullLabel: "Sto Australia", brandUrl: "https://www.sto.com/au", tdsUrl: "https://www.sto.com/au/products", accentColor: "#E2001A",
    name: "Sto Full EIFS System (StoTherm)",
    descriptionLine: "StoTherm full EIFS installation system — adhesive, EPS or mineral wool board, Armat base coat, AR mesh, StoSilco finish — NCC C1.1 tested",
    productType: "Full EIFS installation system — NCC tested",
    filterTags: ["EIFS", "EPS-board", "AR-mesh", "Base-coat", "Full-system", "NCC-C1", "Insulated"],
    techChips: [{ label: "StoTherm system", cls: "bg-sky-100 text-sky-800" }, { label: "NCC C1.1 documented", cls: "bg-red-50 text-red-700" }, { label: "Applicator approval", cls: "bg-green-50 text-green-700" }],
    systemDescription: "Sto's StoTherm EIFS system is a proprietary full-system EIFS for new installation on concrete, masonry, and framed wall substrates. The system uses StoLevell (adhesive mortar), Sto EPS or mineral wool insulation board, Sto Armat Classic (polymer-modified base coat), Sto AR glass mesh, and StoSilco Colour (silicone resin finish coat). Sto has system-level fire testing documentation for StoTherm under NCC Spec C1.1 — one of the most important compliance credentials for EIFS on Class 2 and higher buildings.\n\nIn Australian strata EIFS new installation, Sto is specified on projects where NCC fire compliance documentation is required and the builder or developer requires an applicator-approved, warranted EIFS system. Sto maintains an applicator approval programme ensuring installation quality.\n\nConfirm current NCC C1.1 compliance status, applicable building classes, and Sto applicator availability with Sto Australia before specifying.",
    technicalProperties: ["NCC Spec C1.1 fire compliance documentation available — critical for Class 2+ buildings", "Sto applicator approval programme — quality-controlled installation", "Silicone resin finish coat — superior water repellency and UV durability", "EPS and mineral wool board options available for different fire and thermal requirements", "Full system warranty from Sto when installed by approved applicator"],
    limitations: ["Must be installed by Sto-approved applicators to access warranty — confirm applicator status before engagement", "Fire compliance is system-specific and building-class specific — confirm current NCC documentation with Sto Australia", "Higher cost than non-warranty EIFS systems — justified where compliance documentation and warranty are required"],
    procurementSources: [{ name: "Sto Australia — contact for current pricing and approved applicator list", url: "https://www.sto.com/au" }],
  },
  {
    fullLabel: "Dulux / Acratex (Australia)", brandUrl: "https://www.dulux.com.au", tdsUrl: "https://www.dulux.com.au/trade", accentColor: "#E3051B",
    name: "Dulux Acratex EIFS-Compatible System",
    descriptionLine: "Acratex polymer-modified render and texture system — EIFS-compatible — base coat, AR mesh, texture finish coat — concrete and masonry substrates",
    productType: "Acrylic render system — EIFS compatible",
    filterTags: ["EIFS", "AR-mesh", "Base-coat", "Full-system"],
    techChips: [{ label: "Acratex system", cls: "bg-sky-100 text-sky-800" }, { label: "Widely available", cls: "bg-green-50 text-green-700" }],
    systemDescription: "Dulux Acratex provides polymer-modified render and texture systems that are compatible with EIFS substrates (EPS boards) when used with appropriate Acratex primers and adhesives. The Acratex system does not provide the same system-level EIFS fire compliance documentation as specialist EIFS manufacturers (Sto, Mapei Mapetherm), but is widely used by rendering and painting contractors for EIFS render coat replacement and new EIFS installation where fire compliance documentation is not the primary specification requirement.\n\nFor non-fire-rated EIFS applications or where fire compliance is managed through other means, the Dulux Acratex system provides a cost-effective, widely available EIFS render option. For fire-rated applications, confirm with Dulux Technical whether current Acratex products have any applicable NCC C1.1 fire testing.\n\nConfirm current product names, EPS compatibility, and fire compliance status with Dulux Trade Technical before specifying.",
    technicalProperties: ["Widely available through Dulux Trade stores — consistent supply nationally", "Polymer-modified render base coat compatible with EPS boards with appropriate primer", "Range of finish coat textures available — match existing facade", "Full Dulux Trade Technical support for specification and troubleshooting"],
    limitations: ["Not a full EIFS manufacturer system — limited system-level fire compliance documentation", "For fire-rated facades: confirm NCC C1.1 compliance with Dulux Technical before specifying", "EPS board adhesion requires specific Acratex EPS adhesive — confirm with Dulux before specifying over EPS"],
    procurementSources: [{ name: "Dulux Trade stores — nationwide supply", url: "https://www.dulux.com.au" }],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "EIFS", label: "EIFS" }, { id: "EPS-board", label: "EPS board" }, { id: "AR-mesh", label: "AR mesh" },
  { id: "Base-coat", label: "Base coat" }, { id: "Full-system", label: "Full system" }, { id: "NCC-C1", label: "NCC C1.1" },
  { id: "Insulated", label: "Insulated" }, { id: "Lightweight", label: "Lightweight" },
];

const COMPARISON_ROWS: { product: string; brand: string; fireCompliance: string; applicatorApproval: string; eps: string; keyFeature: string }[] = [
  { product: "Mapetherm System", brand: "Mapei", fireCompliance: "NCC C1.1 — confirm current", applicatorApproval: "No", eps: "Yes", keyFeature: "Full Mapei system — Silexcolor finish" },
  { product: "StoTherm System", brand: "Sto", fireCompliance: "NCC C1.1 documented", applicatorApproval: "Yes — mandatory", eps: "EPS + mineral wool", keyFeature: "Best fire compliance documentation — warranty" },
  { product: "Acratex System", brand: "Dulux", fireCompliance: "Confirm with Dulux Technical", applicatorApproval: "No", eps: "With appropriate primer", keyFeature: "Most widely available — lower cost" },
];

const TECH_INFO = {
  typicalApplications: ["New EIFS installation on concrete or masonry substrate — insulation + render system", "EIFS upgrade on existing building — additional thermal performance with external insulation layer", "EIFS over steel or timber framed wall sheathing — lightweight external wall system", "Replacement of failed EIFS system — full removal and reinstallation with compliant system"],
  selectionCriteria: ["Sto StoTherm: specify where NCC C1.1 fire compliance documentation is required and applicator approval is acceptable", "Mapei Mapetherm: use where Mapei supply chain is preferred and fire compliance documentation is needed", "Dulux Acratex: for non-fire-rated EIFS or where fire compliance managed separately — lower cost option", "All systems: confirm fire compliance requirements with the building certifier before specifying EIFS on any Class 2+ building"],
  limitations: ["EIFS requires specialist installation — not suitable for general rendering contractors without specific EIFS training", "Fire compliance is system-specific — changing any component invalidates fire test data", "Water infiltration into EIFS causes EPS degradation and mould — perimeter detailing and sealants are critical", "EIFS is vulnerable to physical damage at ground floor — protection boards or impact-resistant base coat required at accessible areas"],
  standardsNotes: ["NCC 2022 Volume One Spec C1.1 — EIFS on Class 2+ buildings — system fire testing required", "AS 3700 — masonry substrate preparation", "AIRA (Australian Insulated Render Association) — EIFS installation quality guidelines", "Manufacturer system TDS — governs all component specifications, thicknesses, and primers"],
  suitableDefects: ["Full EIFS installation — new build or full system replacement after failed EIFS removal", "EIFS upgrade to improve thermal performance of existing facade", "Lightweight external wall cladding on framed buildings where EIFS provides cladding and insulation in one system"],
  typicalSubstrates: ["Concrete and masonry — EPS bonded with adhesive mortar", "Steel framed wall with sheathing board (e.g., fibre cement or OSB)", "Timber framed wall with sheathing board — confirm with manufacturer for framing compatibility", "Existing EIFS (where EPS is sound) — re-render over existing EPS after render removal"],
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

export function EIFSSystemsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div><h3 className="text-base font-extrabold text-sky-950">What are EIFS full installation systems?</h3></div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>EIFS (Exterior Insulation and Finish Systems) full installation systems comprise an EPS or mineral wool insulation board bonded to the structural substrate, a polymer-modified cementitious base coat with embedded AR glass mesh over the board, and a decorative finish coat. They are installed as new cladding systems on new buildings or as full replacement systems where failed EIFS is removed and reinstalled.</p>
        {expanded && (<p>In Australia, NCC 2022 Specification C1.1 requires EIFS used as part of an external wall system on Class 2–9 buildings to comply with system-level fire testing. This means that product selection for EIFS on multi-storey strata buildings must be based on documented, tested systems — not improvised combinations of products from different manufacturers. Sto and Mapei are the primary full-system EIFS manufacturers with current Australian NCC fire compliance documentation.</p>)}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-4 flex items-center gap-2.5"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div><h3 className="text-sm font-extrabold text-sky-950">{title}</h3></div><ul className="space-y-2">{items.map((item, i) => (<li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">{style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}{style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}{style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}{item}</li>))}</ul></div>);
}

export function EIFSSystemsProductSection() {
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
          <div><p className="text-base font-extrabold text-sky-950">System Technical Reference</p><p className="mt-0.5 text-xs text-slate-500">Applications, system selection, fire compliance, limitations and substrates</p></div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">{accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}</div>
        </button>
        {accordionOpen && (<div className="border-t border-slate-100 px-7 pb-7 pt-6"><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"><TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" /><TechCard icon={<Ruler size={15} />} title="System Selection" items={TECH_INFO.selectionCriteria} style="check" /><TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" /><TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" /><TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" /><TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" /></div></div>)}
      </div>
      <div>
        <div className="mb-5 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2><p className="mt-1 text-sm text-slate-500">3 products — 3 brands — Mapei / Sto / Dulux Acratex</p></div></div>
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
        <div className="mb-6 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">EIFS full system comparison</h2><p className="mt-1 text-sm text-slate-500">For Class 2+ buildings confirm NCC C1.1 fire compliance before specifying EIFS. System must be installed as complete unit — do not mix components from different manufacturers.</p></div></div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fire compliance</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Applicator approval</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">EPS/mineral wool</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th></tr></thead>
            <tbody>{COMPARISON_ROWS.map((row, i) => (<tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td><td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Mapei" ? "#0055A5" : row.brand === "Sto" ? "#E2001A" : "#E3051B" }}>{row.brand}</td><td className="px-4 py-3 text-slate-600">{row.fireCompliance}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.applicatorApproval}</td><td className="px-4 py-3 text-slate-600">{row.eps}</td><td className="px-4 py-3 text-slate-500">{row.keyFeature}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
