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
    fullLabel: "Dow (formerly Dow Corning)",
    brandUrl: "https://www.dow.com/au",
    tdsUrl: "https://www.dow.com/au",
    accentColor: "#dc2626",
    name: "Dow Corning 791 Silicone Weatherseal",
    descriptionLine: "Neutral cure one-part silicone weatherseal — excellent adhesion to glass, aluminium and metal frames — UV-stable — not paintable — the benchmark neutral cure silicone for window and door perimeter sealing in Australian strata remediation",
    productType: "Neutral cure silicone — window and facade perimeter",
    filterTags: ["Silicone", "Neutral-cure", "Glazing", "Aluminium", "Glass", "UV-stable", "Non-paintable", "Facade", "ISO-11600", "Weatherseal", "Coastal"],
    techChips: [
      { label: "Neutral cure", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-stable", cls: "bg-sky-100 text-sky-800" },
      { label: "Non-paintable", cls: "bg-amber-50 text-amber-700" },
      { label: "±25% movement", cls: "bg-green-50 text-green-700" },
      { label: "ISO 11600 F-25LM", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: "Dow Corning 791 Silicone Weatherseal is a one-part, neutral cure silicone sealant widely used in Australian commercial and strata building facade remediation for window and door perimeter sealing. It bonds to aluminium, glass, metal, most paints and most construction substrates without a primer, and provides excellent weathering and UV resistance. Dow 791 cures without releasing acetic acid (unlike acetoxy cure silicones), making it safe for use on aluminium frames, galvanised steel and anodised surfaces. It is not paintable once cured — where the perimeter joint must be painted over, specify a polyurethane sealant instead. Dow 791 remains flexible, UV-stable and weather-resistant for many years of service in Australian exterior conditions including coastal exposure.",
    technicalProperties: [
      "Neutral cure — safe on aluminium, galvanised steel, glass and metal frames",
      "UV-stable — suitable for exposed facade perimeter joints without UV degradation",
      "Excellent adhesion to glass, aluminium, metal and most painted surfaces without primer",
      "±25% movement accommodation — suitable for window perimeter joints",
      "One-part — no mixing required — ready to use from cartridge",
      "Long-term weathering performance — proven in Australian coastal and high-UV environments",
    ],
    limitations: [
      "Not paintable — where joint must be overpainted, specify polyurethane sealant",
      "Silicone does not bond to cured silicone — all existing silicone must be fully removed before re-application",
      "Not suitable for natural stone (may cause staining — test first)",
      "Not suitable for porous substrates where deep penetration of plasticisers is a risk",
      "TODO: owner confirm — confirm current Australian product designation and primer requirements with Dow technical",
    ],
    procurementSources: [
      { name: "Dow Australia — trade supply", url: "https://www.dow.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Bunnings Warehouse — retail and trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://www.sika.com/au",
    tdsUrl: "https://www.sika.com/au",
    accentColor: "#0369a1",
    name: "Sika SikaSil-WS 305 CT",
    descriptionLine: "Neutral cure one-part construction silicone — suitable for facade weathersealing, window perimeter and metal cladding joints — UV-stable — widely available through Australian trade channels",
    productType: "Neutral cure silicone — construction weatherseal",
    filterTags: ["Silicone", "Neutral-cure", "Aluminium", "Glass", "UV-stable", "Non-paintable", "Facade", "ISO-11600", "Weatherseal"],
    techChips: [
      { label: "Neutral cure", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-stable", cls: "bg-sky-100 text-sky-800" },
      { label: "Non-paintable", cls: "bg-amber-50 text-amber-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Sika SikaSil-WS 305 CT is a one-part neutral cure construction silicone suitable for facade weathersealing, window and door perimeter joints, curtain wall joints and metal cladding panel joints. It releases no acetic acid during cure, making it compatible with aluminium, galvanised steel and most metal frame systems. SikaSil-WS 305 CT bonds to glass, aluminium, metal frames and most construction substrates. It is UV-stable and weather-resistant for long-term exterior exposure. As with all silicone sealants, it is not paintable once cured. Confirm primer requirements on specific substrates and confirm current Australian product designation with Sika technical before specifying. TODO: owner confirm — confirm current product designation, movement class and primer requirements with Sika Australia technical.",
    technicalProperties: [
      "Neutral cure — safe on aluminium, galvanised steel and metal substrates",
      "UV-stable — for exposed facade and window perimeter applications",
      "Bonds to glass, aluminium, metal, concrete and most construction substrates",
      "One-part — no mixing — ready to use from cartridge",
      "Suitable for facade weathersealing, curtain wall joints and window perimeter",
      "TODO: owner confirm — confirm movement class and DFT from current Sika TDS",
    ],
    limitations: [
      "Not paintable — specify polyurethane sealant where paint-over is required",
      "Silicone does not bond to cured silicone — all existing sealant must be removed first",
      "Primer may be required on some substrates — confirm with Sika technical",
      "Not suitable for natural stone — risk of plasticiser staining",
      "TODO: owner confirm — confirm current product code, movement class and primer requirements with Sika Australia",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://www.sika.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Bunnings Warehouse — retail and trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Tremco Australia",
    brandUrl: "https://www.tremcoinc.com.au",
    tdsUrl: "https://www.tremcoinc.com.au",
    accentColor: "#7c3aed",
    name: "Tremco Spectrem 1",
    descriptionLine: "Neutral cure silicone weatherseal — suitable for facade weathersealing and window perimeter joints — UV-stable — widely used in Australian commercial and strata remediation",
    productType: "Neutral cure silicone — facade and window perimeter",
    filterTags: ["Silicone", "Neutral-cure", "Aluminium", "Glass", "UV-stable", "Non-paintable", "Facade", "ISO-11600", "Weatherseal"],
    techChips: [
      { label: "Neutral cure", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-stable", cls: "bg-sky-100 text-sky-800" },
      { label: "Non-paintable", cls: "bg-amber-50 text-amber-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Tremco Spectrem 1 is a neutral cure silicone weatherseal used in Australian commercial and strata building facade weathersealing and window perimeter joint remediation. It cures without releasing acetic acid, making it suitable for aluminium window frames, metal cladding panels and glass perimeter sealing. Spectrem 1 bonds to glass, aluminium and most construction substrates and provides long-term UV and weather resistance in Australian exterior conditions. It is not paintable once cured. Confirm current Australian availability, primer requirements and movement class with Tremco Australia technical before specifying. TODO: owner confirm — confirm current product designation, Australian availability and full application parameters with Tremco Australia.",
    technicalProperties: [
      "Neutral cure — suitable for aluminium, glass and metal substrates",
      "UV-stable — for exposed window and facade perimeter applications",
      "Used in commercial and strata facade weathersealing across Australia",
      "Not paintable — for exposed joints only",
      "TODO: owner confirm — confirm movement class, primer requirements and current TDS from Tremco Australia",
    ],
    limitations: [
      "Not paintable — specify PU sealant where paint-over is required",
      "Silicone does not bond to existing cured silicone — all old sealant must be removed first",
      "Primer may be required on some substrates — confirm with Tremco technical",
      "TODO: owner confirm — confirm current Australian product designation, movement class and primer requirements with Tremco Australia technical",
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
  { id: "Coastal", label: "Coastal" },
];

const SYSTEM_COMPARISON = [
  { product: "Dow 791 Silicone Weatherseal", brand: "Dow", cure: "Neutral", paintable: "No", aluminium: "Yes", movement: "±25%", primaryUse: "Window perimeter, glazing, facade weatherseal — the benchmark product" },
  { product: "SikaSil-WS 305 CT", brand: "Sika", cure: "Neutral", paintable: "No", aluminium: "Yes", movement: "Confirm TDS", primaryUse: "Facade weatherseal, curtain wall joints, window perimeter" },
  { product: "Spectrem 1", brand: "Tremco", cure: "Neutral", paintable: "No", aluminium: "Yes", movement: "Confirm TDS", primaryUse: "Facade weatherseal, window perimeter — confirm Australian availability" },
];

const TECH_INFO = {
  typicalApplications: [
    "Window and door frame perimeter joint sealing at aluminium or metal frames on masonry facades",
    "Glazing perimeter sealing — aluminium frame to glass interface",
    "Facade weatherseal at metal cladding panel joints and interfaces",
    "Perimeter sealing at exposed metal penetrations through the facade",
    "Curtain wall and window wall weatherseal joints",
  ],
  selectionCriteria: [
    "Specify neutral cure — never specify acetoxy (acetic cure) silicone for aluminium, galvanised or metal frames",
    "Where the joint must be painted, specify polyurethane sealant — silicone cannot be painted over",
    "Confirm adhesion to specific substrate — primer may be required on some surfaces",
    "Confirm UV stability and colour retention from the manufacturer TDS for exposed facade locations",
    "Confirm movement accommodation class — ±25% (ISO 11600 F-25LM) is the minimum for facade perimeter joints",
    "Coastal and high-exposure locations — confirm suitability with manufacturer",
  ],
  limitations: [
    "Not paintable — do not specify where the perimeter joint will be overpainted",
    "Silicone does not bond to existing cured silicone — all old sealant must be removed",
    "Never specify acetoxy (acetic) cure silicone on aluminium — acid release causes corrosion",
    "Not suitable for natural stone — risk of staining from plasticiser migration",
    "Not suitable for structural glazing (requires dedicated structural silicone system)",
  ],
  standardsNotes: [
    "ISO 11600 — Building Construction — Jointing products — Classification and requirements for sealants",
    "AS/NZS 4284 — Testing of curtain wall and window wall systems",
    "Manufacturer TDS — confirm all application parameters, primer requirements and movement class",
    "NCC Volume One — facade weatherproofing performance requirements",
  ],
  suitableDefects: [
    "Failed, deteriorated or absent perimeter sealant at aluminium window and door frames",
    "Cracked, debonded or hardened silicone perimeter joints at glazing interfaces",
    "Water ingress at window or door frame perimeter joints on masonry facades",
    "Failed weatherseal at metal cladding panel interfaces and perimeter junctions",
  ],
  typicalSubstrates: [
    "Aluminium — window and door frames (must be neutral cure only)",
    "Glass — glazing perimeter interfaces",
    "Galvanised steel — metal frame and penetration sealing",
    "Masonry and render — frame-to-wall interface",
    "Most painted surfaces — confirm adhesion to specific coating system",
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

export function PerimeterNCSiliconeIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are neutral cure silicone perimeter sealant systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Neutral cure silicone sealants are one-part, moisture-curing elastomeric sealants that cure by releasing a neutral by-product (alcohol or oxime) rather than acetic acid. This makes them safe for use on aluminium, galvanised steel, glass and other metal substrates — a critical distinction from acetoxy (acetic cure) silicones which release acetic acid and corrode these materials. Neutral cure silicone is the standard specification for window and door frame perimeter sealing on Australian Class 2 strata buildings.</p>
        {expanded && <p>Neutral cure silicone provides excellent UV and weathering resistance, remaining elastic and stable in Australian exterior conditions for many years. It bonds without a primer to most glass, aluminium and metal substrates, making it practical for window perimeter sealing on strata buildings. The critical limitation of neutral cure silicone is that it is not paintable once cured — where the perimeter joint must be overpainted with facade paint, a polyurethane sealant must be specified instead. Silicone also does not bond to previously-cured silicone — all existing sealant must be fully removed from the joint before re-application. Leaving traces of old silicone will cause early adhesion failure of the new sealant.</p>}
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

export function PerimeterNCSiliconeProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — neutral cure silicone perimeter sealant systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of neutral cure silicone perimeter sealant systems. Confirm all product selections against the current manufacturer TDS before specifying.</p>
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
