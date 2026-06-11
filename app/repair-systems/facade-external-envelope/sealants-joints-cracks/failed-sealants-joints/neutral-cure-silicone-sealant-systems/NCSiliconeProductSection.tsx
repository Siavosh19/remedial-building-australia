"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Silicone" | "Neutral-cure" | "Glazing" | "Aluminium" | "Glass" | "UV-stable" | "Non-paintable" | "Facade" | "ISO-11600" | "Weatherseal" | "Coastal";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dow Australia",
    brandUrl: "https://www.dow.com/au",
    accentColor: "#dc2626",
    name: "Dow 791 Silicone Weatherseal",
    descriptionLine: "One-part neutral cure silicone weatherseal — the most widely specified silicone sealant for aluminium window and curtain wall perimeter sealing in Australian facade remediation — excellent adhesion to glass, aluminium and most facade substrates — UV-stable — not paintable",
    productType: "One-part neutral cure silicone — weatherseal / facade perimeter",
    filterTags: ["Silicone", "Neutral-cure", "Glazing", "Aluminium", "Glass", "UV-stable", "Non-paintable", "Facade", "ISO-11600", "Weatherseal", "Coastal"],
    techChips: [
      { label: "Neutral cure", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-stable", cls: "bg-sky-100 text-sky-800" },
      { label: "Aluminium safe", cls: "bg-green-50 text-green-700" },
      { label: "Not paintable", cls: "bg-red-50 text-red-700" },
      { label: "ISO 11600", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: "Dow 791 Silicone Weatherseal is one of the most widely used silicone sealants in Australian facade remediation and new construction. It is a one-part, neutral cure silicone sealant designed for perimeter sealing around aluminium window and door frames, curtain wall systems, glazing unit perimeters and facade panel joints where UV resistance and long-term weathering performance are critical. Unlike acetic cure silicone, Dow 791 does not release acetic acid on cure and is safe to apply against metals including aluminium, galvanised steel and stainless steel. It bonds to glass, anodised and powder-coated aluminium, most plastics and cleaned masonry. Primer is generally not required on most substrates but a Dow primer (Dow 1200 OS or equivalent) may improve adhesion on some difficult substrates — confirm with Dow technical. Dow 791 is not paintable — where the sealant joint must be overpainted, a polyurethane sealant is required instead.",
    technicalProperties: [
      "Neutral cure — no acetic acid release — safe on metals, aluminium and galvanised substrates",
      "UV-stable — retains elasticity and colour in Australian outdoor conditions",
      "Excellent adhesion to glass, anodised aluminium, powder-coated aluminium and most facade substrates",
      "High movement accommodation — confirm movement class from current Dow TDS",
      "Wide service temperature range — suitable for Australian coastal and tropical exposure",
      "Not paintable — sealant remains visible once cured — not suitable where overpainting is required",
    ],
    limitations: [
      "Not paintable — do not specify where sealant joint will be overpainted (specify polyurethane sealant instead)",
      "Not suitable for structural glazing bonding — Dow 983 or similar structural silicone required for structural glass-to-frame bonding",
      "Not suitable for immersed joints (pool or tank) without confirming suitability from TDS",
      "Not suitable for natural stone without testing — may cause staining on porous stone",
      "Do not apply over existing silicone without removing old sealant — silicone does not bond to cured silicone",
    ],
    procurementSources: [
      { name: "Dow Australia — trade supply", url: "https://www.dow.com/au" },
      { name: "Bunnings Warehouse — retail and trade", url: "https://www.bunnings.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://www.sika.com/au",
    accentColor: "#0369a1",
    name: "Sika SikaSil-WS 305 CT",
    descriptionLine: "One-part neutral cure silicone weatherseal — UV-resistant — suitable for facade panel joints, aluminium frame perimeter sealing and glazing perimeters — widely available in Australia through Sika distribution network",
    productType: "One-part neutral cure silicone — facade weatherseal",
    filterTags: ["Silicone", "Neutral-cure", "Glazing", "Aluminium", "Glass", "UV-stable", "Non-paintable", "Facade", "ISO-11600", "Weatherseal"],
    techChips: [
      { label: "Neutral cure", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-resistant", cls: "bg-sky-100 text-sky-800" },
      { label: "Facade joints", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Sika SikaSil-WS 305 CT is a one-part, neutral cure silicone sealant designed for facade weathersealing, window and door frame perimeter sealing and glazing perimeter sealing applications. As a neutral cure product, it does not release acetic acid on cure and is suitable for application against metals including aluminium. It offers UV resistance and long-term outdoor weathering performance suitable for Australian climate conditions. Primer (Sika Primer-3N or Sika Primer-215) may be required on some substrates — confirm from Sika TDS. Sika SikaSil products are distributed through Sika Australia's national network with local technical support. SikaSil-WS 305 CT is not paintable. TODO: owner confirm — confirm current Australian product designation, movement class, primer requirements and substrate compatibility with Sika Australia technical.",
    technicalProperties: [
      "One-part neutral cure — no acetic acid — safe on metals and aluminium",
      "UV-resistant — suitable for exposed Australian facade and weatherseal applications",
      "Suitable for aluminium frame perimeter sealing and glazing perimeters",
      "Sika national distribution and technical support",
      "TODO: owner confirm — confirm movement class, primer requirements and substrate compatibility from current Sika TDS",
    ],
    limitations: [
      "Not paintable — specify PU sealant where sealant will be overpainted",
      "Not suitable for structural glazing bonding without structural silicone designation",
      "Primer may be required on difficult or contaminated substrates",
      "Do not apply over existing cured silicone — old sealant must be removed",
      "TODO: owner confirm — confirm all application parameters with Sika Australia technical",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://www.sika.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Tremco Australia",
    brandUrl: "https://www.tremcoinc.com.au",
    accentColor: "#7c3aed",
    name: "Tremco Spectrem 1",
    descriptionLine: "One-part neutral cure silicone — designed for facade and curtain wall weatherseal applications — UV-stable — suitable for aluminium, glass and painted metal substrates — widely used in Australian commercial and strata facade work",
    productType: "One-part neutral cure silicone — curtain wall / facade weatherseal",
    filterTags: ["Silicone", "Neutral-cure", "Glazing", "Aluminium", "Glass", "UV-stable", "Non-paintable", "Facade", "ISO-11600", "Weatherseal", "Coastal"],
    techChips: [
      { label: "Neutral cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Curtain wall", cls: "bg-sky-100 text-sky-800" },
      { label: "UV-stable", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Tremco Spectrem 1 is a one-part neutral cure silicone sealant used in facade and curtain wall weatherseal applications. It is suitable for perimeter sealing around aluminium window and door frames, glazing unit perimeters and panel joints in commercial and residential facades. As a neutral cure product it is safe on aluminium, glass and most metals. Tremco Spectrem products are widely used in Australian facade remediation and curtain wall work and are supported by Tremco Australia's technical network. Primer (Tremco 636 or equivalent system primer) may be required on some substrates — confirm with Tremco Australia technical. Spectrem 1 is not paintable. TODO: owner confirm — confirm current Australian product designation, movement class, primer requirements and coastal suitability with Tremco Australia.",
    technicalProperties: [
      "One-part neutral cure — no acetic acid release — suitable for aluminium and metals",
      "UV-stable — suitable for Australian outdoor and coastal facade exposure",
      "Suitable for curtain wall weatherseal and aluminium frame perimeter sealing",
      "Tremco national technical and distribution network in Australia",
      "TODO: owner confirm — confirm movement class, primer requirements and all parameters from current Tremco TDS",
    ],
    limitations: [
      "Not paintable — sealant remains exposed once cured",
      "Primer may be required on some substrates — confirm with Tremco technical",
      "Do not apply over existing cured silicone — removal of old sealant required",
      "Not suitable for structural glazing without confirmed structural designation",
      "TODO: owner confirm — confirm current product designation and all application parameters with Tremco Australia",
    ],
    procurementSources: [
      { name: "Tremco Australia — trade supply", url: "https://www.tremcoinc.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Silicone", label: "Silicone" },
  { id: "Neutral-cure", label: "Neutral cure" },
  { id: "Glazing", label: "Glazing" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Glass", label: "Glass" },
  { id: "UV-stable", label: "UV-stable" },
  { id: "Non-paintable", label: "Non-paintable" },
  { id: "Facade", label: "Facade" },
  { id: "ISO-11600", label: "ISO 11600" },
  { id: "Weatherseal", label: "Weatherseal" },
  { id: "Coastal", label: "Coastal rated" },
];

const SYSTEM_COMPARISON = [
  { product: "Dow 791", brand: "Dow", cure: "Neutral cure", paintable: "No", aluminium: "Yes", movement: "High — confirm TDS", primaryUse: "Aluminium frame perimeter sealing, glazing perimeters, curtain wall weatherseal" },
  { product: "SikaSil-WS 305 CT", brand: "Sika", cure: "Neutral cure", paintable: "No", aluminium: "Yes", movement: "Confirm TDS", primaryUse: "Facade panel joints, aluminium frame perimeter sealing, glazing perimeters" },
  { product: "Spectrem 1", brand: "Tremco", cure: "Neutral cure", paintable: "No", aluminium: "Yes", movement: "Confirm TDS", primaryUse: "Curtain wall weatherseal, facade panel perimeter sealing, aluminium frames" },
];

const TECH_INFO = {
  typicalApplications: [
    "Perimeter sealant replacement around aluminium window and door frames in facade remediation",
    "Glazing unit perimeter sealing in curtain wall and window systems",
    "Facade panel joint sealing where UV resistance and durability are paramount and paintability is not required",
    "Weatherseal replacement in aluminium curtain wall systems",
    "Balcony glazing and screen perimeter sealing",
  ],
  selectionCriteria: [
    "Specify neutral cure (not acetic cure) for all applications to metals — acetic cure attacks aluminium",
    "Paintability — if sealant joint will be overpainted, specify polyurethane sealant not silicone",
    "UV exposure — silicone is superior to PU for long-term UV-exposed facade applications",
    "Substrate — confirm adhesion primer requirement for specific substrates with manufacturer",
    "Structural glazing — if structural bonding is required, specify dedicated structural silicone product",
    "Do not apply over existing cured silicone — all old sealant must be removed before replacement",
  ],
  limitations: [
    "Not paintable — specify PU sealant where sealant joint must be overpainted",
    "Not suitable for structural glazing bonding without specific structural silicone product",
    "Silicone does not bond to cured silicone — old sealant must be fully removed before replacement",
    "Some silicones stain porous stone — test on natural stone and concrete block before use",
    "Acetic cure silicone must never be specified for facade use — always confirm neutral cure",
  ],
  standardsNotes: [
    "ISO 11600 — Building Construction — Jointing products — Classification and requirements for sealants",
    "ASTM C 920 — Standard specification for elastomeric joint sealants",
    "AS/NZS 4858 — Wet area membranes (for compatibility checks where silicone meets membrane systems)",
    "Manufacturer TDS — confirm adhesion primer, movement class and substrate compatibility before specifying",
  ],
  suitableDefects: [
    "Failed or deteriorated silicone perimeter sealant at aluminium window frames",
    "Debonded or cracked weatherseal in curtain wall or glazed facade systems",
    "Failed glazing unit perimeter sealant causing water ingress at window or glazing system",
    "Open or cracking silicone joint at facade panel perimeter",
  ],
  typicalSubstrates: [
    "Anodised aluminium — window frames, curtain wall mullions and transoms",
    "Powder-coated aluminium — window frames and door frames",
    "Glass — glazing unit edges and sealed glass interfaces",
    "UPVC / vinyl — window frame perimeter sealing",
    "Painted steel — confirm compatibility with specific paint system",
    "Concrete and masonry — confirm primer requirement for porous substrates",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
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
        <button onClick={() => setExpanded(e => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${items.length - limit} more ↓`}
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
        <button onClick={() => setExpanded(e => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map(src => (
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
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map(chip => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}</div>}</>)}
      <button onClick={() => setExpanded(e => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded(e => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
    </div>
  );
}

export function NCSiliconeIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are neutral cure silicone sealant systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Neutral cure silicone sealants are one-part, moisture-curing silicone sealants that release neutral by-products (typically oxime, alkoxy or acetamide) on cure — in contrast to acetic cure silicone which releases acetic acid (vinegar). This distinction is critical in facade remediation: acetic cure silicone attacks aluminium, galvanised steel and many metals, while neutral cure silicone is safe on these substrates. All silicone sealants specified for facade use involving metal frames must be neutral cure.</p>
        {expanded && <p>Neutral cure silicone sealants offer superior UV resistance and long-term weathering performance compared to polyurethane sealants, making them the preferred choice for exposed facade perimeter joints, glazing perimeters and aluminium frame weathersealing. The key limitation of silicone sealants in facade remediation is that they are not paintable — once cured, silicone cannot be successfully overpainted with most architectural coatings. Where the sealant joint must be overpainted (as is common in rendered or painted masonry facade remediation), a polyurethane sealant is the correct choice. Additionally, silicone does not bond to cured silicone — when replacing failed silicone sealant, all old sealant material must be completely removed before applying new silicone.</p>}
      </div>
      <button onClick={() => setExpanded(e => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
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

export function NCSiliconeProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter(p => Array.from(activeFilters).every(f => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen(o => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
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
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — neutral cure silicone weatherseal systems — scroll to view all</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map(f => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
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
          {visibleProducts.map(product => (
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
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of neutral cure silicone weatherseal systems. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Cure type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Paintable</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Aluminium safe</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Movement</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.cure}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.paintable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.aluminium}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.movement}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
