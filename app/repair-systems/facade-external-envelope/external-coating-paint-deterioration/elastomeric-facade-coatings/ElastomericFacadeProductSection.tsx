"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Elastomeric"
  | "Facade-coating"
  | "Acrylic"
  | "Crack-bridging"
  | "Masonry"
  | "Render"
  | "UV-resistant"
  | "Water-based"
  | "Weatherproof";

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
    fullLabel: "Dulux / Acratex Australia",
    brandUrl: "https://www.acratex.com.au",
    tdsUrl: "https://www.acratex.com.au/products/acrashield-advance",
    accentColor: "#7c3aed",
    name: "Dulux Acratex AcraShield Advance",
    descriptionLine: "Premium elastomeric facade coating with high elongation and crack-bridging capability — waterproof membrane coating for exterior masonry and render facades — UV-resistant and weather-resistant — confirm current specifications with Acratex technical",
    productType: "Premium elastomeric facade waterproof coating — crack-bridging",
    filterTags: ["Elastomeric", "Facade-coating", "Acrylic", "Crack-bridging", "Masonry", "Render", "UV-resistant", "Water-based", "Weatherproof"],
    techChips: [
      { label: "Elastomeric", cls: "bg-purple-100 text-purple-800" },
      { label: "Crack-bridging", cls: "bg-purple-100 text-purple-800" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Waterproof membrane", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Dulux Acratex AcraShield Advance is a premium elastomeric facade coating designed to provide a waterproof membrane barrier over exterior masonry and render facades. The high elongation elastomeric formulation bridges fine facade cracks and accommodates the thermal movement typical in Australian external facades, preventing water ingress through micro-cracks in the substrate.\n\nAcraShield Advance is positioned above standard elastomeric coatings in the Acratex range, with enhanced durability and weathering resistance for demanding Australian coastal and high-UV environments. Applied as a multi-coat system over a compatible primer, it forms a continuous elastomeric film across the facade surface.\n\nConfirm current product technical data sheet, elongation value, DFT requirements, primer specification, and system design with Acratex technical before specifying. Acratex is the Dulux Group facade specialist brand — confirm current product name and formulation from the Acratex website before specifying.",
    technicalProperties: [
      "Premium elastomeric coating — high elongation formulation for crack-bridging on exterior facades",
      "Waterproof membrane barrier — resists water ingress through micro-cracks in masonry and render",
      "UV-resistant and weatherproof formulation for Australian exterior facade conditions",
      "Confirm elongation value, DFT requirements, coverage, and primer specification from current Acratex AcraShield Advance TDS",
      "Available through Dulux Trade and Acratex trade supply nationally",
    ],
    limitations: [
      "Not suitable for bridging active structural cracks or significant movement joints — specify a movement joint sealant system for active cracks",
      "Alkali-resistant primer required on new or unpainted cement render — confirm primer specification with Acratex",
      "Confirm current product name and formulation from current Acratex technical documentation — Acratex range is subject to periodic update",
      "Do not apply over surfaces with active moisture transmission or rising damp — address waterproofing or DPC issues before coating",
    ],
    procurementSources: [
      { name: "Acratex — product information and technical", url: "https://www.acratex.com.au" },
      { name: "Dulux Trade Centres — national", url: "https://www.dulux.com.au" },
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Elastomeric", label: "Elastomeric" },
  { id: "Facade-coating", label: "Facade coating" },
  { id: "Crack-bridging", label: "Crack-bridging" },
  { id: "Masonry", label: "Masonry" },
  { id: "Render", label: "Render" },
  { id: "UV-resistant", label: "UV-resistant" },
  { id: "Water-based", label: "Water-based" },
];

const TECH_INFO = {
  typicalApplications: [
    "Waterproof membrane coating on exterior masonry and render facades with micro-cracking",
    "Facade remediation where substrate has fine cracks requiring a crack-bridging elastomeric coating",
    "Premium facade coating specification for coastal or high-UV buildings requiring extended durability",
    "Over-coating of existing sound substrate after surface preparation and priming",
  ],
  selectionCriteria: [
    "Select elastomeric facade coating where substrate has fine hairline cracks requiring crack-bridging capability",
    "Specify AcraShield Advance for premium applications, coastal environments, or long-cycle maintenance programmes",
    "Confirm elongation value from TDS is suitable for the crack widths present on the facade",
    "Always complete substrate preparation — biocide wash, crack repair, and priming before application",
    "Confirm primer specification with Acratex for the specific substrate type",
  ],
  limitations: [
    "Not suitable for active or moving structural cracks — movement joints require sealant not elastomeric coating",
    "Elastomeric coatings require correct DFT — underapplication reduces crack-bridging effectiveness",
    "Touch-up or patch repairs require priming and may result in sheen variation if not feathered",
    "Not suitable where substrate has water ingress — address waterproofing before coating application",
  ],
  standardsNotes: [
    "AS 4548 — Guide to long-life coatings for concrete and masonry — relevant for commercial facade coating",
    "Confirm current Acratex system documentation and application guide before specifying",
    "Confirm alkali-resistant primer requirement for new or unpainted cement render substrates",
  ],
  suitableDefects: [
    "Fine hairline cracking on rendered facades — where crack-bridging elastomeric coating is required",
    "Weathered and UV-degraded facade coatings requiring replacement with premium elastomeric system",
    "Facades in coastal or high-UV environments requiring durable waterproof membrane coating",
  ],
  typicalSubstrates: [
    "Cement render — new (primed) and existing in sound condition",
    "Masonry — brick and blockwork — confirm primer specification for porous surfaces",
    "Concrete panel facades — confirm system compatibility with Acratex Australia",
    "Existing sound elastomeric or acrylic coatings — wash, prime, and overcoat",
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
      {items.length > limit && <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Show less ↑" : `+${extra} more ↓`}</button>}
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
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}</div>}</>)}
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

export function ElastomericFacadeIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are elastomeric facade coatings?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Elastomeric facade coatings are high-elongation waterproof membrane coatings applied to exterior masonry and render facades. Unlike standard acrylic topcoats, elastomeric coatings have sufficient elongation to bridge fine hairline cracks in the substrate, providing a waterproof barrier even where the facade surface has minor cracking.</p>
        {expanded && (
          <p>They are used where standard acrylic coatings are insufficient — particularly on facades with fine cracking from thermal movement, shrinkage, or minor substrate distress. Acratex is the Dulux Group specialist facade coating brand, with a range of elastomeric coatings from standard to premium grades. Confirm system design, elongation requirements, DFT, primer specification, and current product documentation with Acratex technical before specifying.</p>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
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

export function ElastomericFacadeProductSection() {
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
          <div><p className="text-base font-extrabold text-sky-950">System Technical Reference</p><p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p></div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">{accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}</div>
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
          <div><h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2><p className="mt-1 text-sm text-slate-500">1 product — Dulux Acratex — elastomeric facade coating systems</p></div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => { const active = activeFilters.has(f.id); return <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>; })}
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
    </>
  );
}
