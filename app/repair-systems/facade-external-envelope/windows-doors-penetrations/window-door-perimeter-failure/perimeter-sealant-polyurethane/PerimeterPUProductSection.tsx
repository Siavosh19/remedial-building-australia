"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "PU" | "One-part" | "Paintable" | "Facade" | "Masonry" | "Concrete" | "Aluminium" | "ISO-11600" | "Perimeter" | "Render";

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
    brandUrl: "https://www.sika.com/au",
    tdsUrl: "https://www.sika.com/au/solutions_products/02/020101/02010101_sikaflex11fc/Sikaflex-11FC.html",
    accentColor: "#dc2626",
    name: "Sika Sikaflex-11FC+",
    descriptionLine: "One-part moisture-curing polyurethane sealant — paintable — excellent adhesion to masonry, concrete, render and aluminium — ±25% movement accommodation — widely used for window perimeter joints where the sealant will be overpainted with facade paint",
    productType: "One-part PU sealant — paintable — window and door perimeter",
    filterTags: ["PU", "One-part", "Paintable", "Facade", "Masonry", "Concrete", "Aluminium", "ISO-11600", "Perimeter", "Render"],
    techChips: [
      { label: "One-part PU", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "±25% movement", cls: "bg-sky-100 text-sky-800" },
      { label: "No mixing", cls: "bg-amber-50 text-amber-700" },
      { label: "ISO 11600 F-25LM", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: "Sikaflex-11FC+ is the most widely specified one-part polyurethane sealant for window and door perimeter joint remediation on Australian Class 2 strata buildings where the sealant will be overpainted with facade paint or coating. Unlike silicone sealants, Sikaflex-11FC+ can be painted over once cured, making it the preferred choice when the perimeter sealant profile must be concealed by facade paint rather than left exposed. It bonds well to concrete, masonry, render and aluminium without a primer on most clean, dry substrates. It accommodates ±25% joint movement and has proven UV stability in Australian exterior conditions. For window perimeter joints, apply a backer rod behind the sealant where the joint is deeper than 8mm to maintain correct sealant geometry.",
    technicalProperties: [
      "Paintable after cure with most architectural paints — the primary advantage over silicone for perimeter joints",
      "One-part — no mixing required — ready to use from cartridge",
      "±25% movement accommodation (ISO 11600 Class F-25LM)",
      "Good adhesion to concrete, masonry, render and aluminium without primer on most surfaces",
      "UV-resistant — suitable for exposed facade perimeter applications",
      "Skin time approx. 40–60 minutes at 23°C / 50% RH — confirm from current TDS",
    ],
    limitations: [
      "Not suitable for glazing perimeter where sealant remains exposed to UV — specify neutral cure silicone instead",
      "Not suitable for permanently submerged joints",
      "Moisture-curing — do not apply on wet substrates or in rain",
      "Not suitable for natural stone without prior testing",
      "Primer may be required on anodised or powder-coated aluminium — confirm with Sika technical",
      "TODO: owner confirm — confirm primer requirement for specific substrates with Sika technical",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://www.sika.com/au" },
      { name: "Bunnings Warehouse — retail and trade", url: "https://www.bunnings.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Tremco Australia",
    brandUrl: "https://www.tremcoinc.com.au",
    tdsUrl: "https://www.tremcoinc.com.au",
    accentColor: "#0369a1",
    name: "Tremco Vulkem 116",
    descriptionLine: "One-part moisture-curing polyurethane sealant — suitable for facade movement joints, perimeter sealing and window and door frames — paintable — primer may be required on some substrates",
    productType: "One-part PU sealant — paintable — facade and perimeter",
    filterTags: ["PU", "One-part", "Paintable", "Facade", "Masonry", "Concrete", "ISO-11600", "Perimeter"],
    techChips: [
      { label: "One-part PU", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "Facade joints", cls: "bg-sky-100 text-sky-800" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Tremco Vulkem 116 is a one-part moisture-curing polyurethane sealant used for building facade joints, perimeter sealing and window and door frame perimeter applications in Australian commercial and strata remediation. It is paintable once cured, making it suitable for window perimeter joints that will be overpainted with facade coating. Primer (Tremco 636 or equivalent) may be required on some porous substrates for optimal adhesion — confirm substrate-specific primer requirements with Tremco technical. Confirm current Australian product designation, primer requirements and movement class with Tremco Australia technical before specifying. TODO: owner confirm — confirm all application parameters, movement class and primer requirements with Tremco Australia.",
    technicalProperties: [
      "One-part moisture-curing PU — no mixing required",
      "Paintable after cure — suitable for perimeter joints that will be overpainted",
      "Suitable for facade movement joints, expansion joints and window perimeter sealing",
      "Primer may be required on porous substrates — confirm with Tremco technical",
      "TODO: owner confirm — confirm movement class and application parameters from current Tremco TDS",
    ],
    limitations: [
      "Primer may be required on some substrates — confirm with Tremco technical before applying",
      "Not suitable for permanently submerged applications",
      "Do not apply on wet or frozen substrates",
      "Not suitable for structural glazing bonding",
      "TODO: owner confirm — confirm movement class, primer requirements and current product code with Tremco Australia",
    ],
    procurementSources: [
      { name: "Tremco Australia — trade supply", url: "https://www.tremcoinc.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Bostik Australia",
    brandUrl: "https://www.bostik.com/au",
    tdsUrl: "https://www.bostik.com/au",
    accentColor: "#7c3aed",
    name: "Bostik Seal N Flex FC",
    descriptionLine: "One-part polyurethane facade sealant — paintable — suitable for masonry, concrete and render window perimeter joints and movement joints — widely available through Australian trade channels",
    productType: "One-part PU sealant — paintable — facade and perimeter",
    filterTags: ["PU", "One-part", "Paintable", "Facade", "Masonry", "Concrete", "Render", "ISO-11600", "Perimeter"],
    techChips: [
      { label: "One-part PU", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "Facade grade", cls: "bg-sky-100 text-sky-800" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Bostik Seal N Flex FC (or equivalent Bostik one-part polyurethane facade sealant — confirm current product code with Bostik Australia) is a one-part polyurethane sealant suitable for perimeter sealing around window and door frames in masonry and rendered facades where the sealant will be overpainted. It is paintable once cured and suitable for movement joints and perimeter joints in masonry, concrete and rendered substrates. Widely available through Bunnings and hardware trade channels in Australia. Confirm movement accommodation class, primer requirements and suitability for Class 2 strata window perimeter applications with Bostik Australia technical before specifying. TODO: owner confirm — confirm product code, movement class and full application requirements with Bostik Australia.",
    technicalProperties: [
      "One-part — no mixing — ready to use",
      "Paintable after cure — suitable for window perimeter joints to be overpainted",
      "Suitable for masonry, concrete and render substrates",
      "Widely available — Bunnings, Mitre 10, trade hardware",
      "TODO: owner confirm — confirm movement class and primer requirements from current TDS",
    ],
    limitations: [
      "TODO: owner confirm — confirm movement accommodation class with Bostik Australia technical",
      "Not suitable for structural glazing",
      "Not suitable for permanently submerged applications",
      "Primer may be required on non-porous or coated substrates — confirm with Bostik",
    ],
    procurementSources: [
      { name: "Bostik Australia — trade supply", url: "https://www.bostik.com/au" },
      { name: "Bunnings Warehouse — retail and trade", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 — hardware trade", url: "https://www.mitre10.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "PU", label: "Polyurethane" },
  { id: "One-part", label: "One-part" },
  { id: "Paintable", label: "Paintable" },
  { id: "Facade", label: "Facade" },
  { id: "Perimeter", label: "Perimeter" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Render", label: "Render" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "ISO-11600", label: "ISO 11600" },
];

const SYSTEM_COMPARISON = [
  { product: "Sikaflex-11FC+", brand: "Sika", parts: "One", paintable: "Yes", primer: "Usually not required", movement: "±25%", primaryUse: "Window perimeter joints — paintable — the benchmark product for this application" },
  { product: "Vulkem 116", brand: "Tremco", parts: "One", paintable: "Yes — confirm", primer: "May be required — confirm", movement: "High — confirm TDS", primaryUse: "Window perimeter and facade movement joints — confirm AU availability" },
  { product: "Seal N Flex FC", brand: "Bostik", parts: "One", paintable: "Yes", primer: "Confirm TDS", movement: "Confirm TDS", primaryUse: "Window perimeter and masonry joints — confirm product code with Bostik" },
];

const TECH_INFO = {
  typicalApplications: [
    "Window and door frame perimeter joint sealing where the sealant joint will be overpainted with facade paint",
    "Perimeter joint replacement in rendered masonry facades — masonry-to-aluminium interface",
    "Facade movement joint replacement in masonry, concrete and rendered facades",
    "Parapet and coping joint sealing in masonry construction",
    "General perimeter sealing at masonry penetrations where paint-over is required",
  ],
  selectionCriteria: [
    "Specify PU when the perimeter joint will be overpainted — PU is paintable, silicone is not",
    "Specify neutral cure silicone when the joint will remain exposed — silicone has superior UV stability",
    "Confirm primer requirement for aluminium frames — some PU sealants require primer on anodised or powder-coated surfaces",
    "Confirm movement accommodation class — ±25% minimum for facade perimeter joints",
    "Confirm compatibility with facade coating system before applying paint over cured sealant",
  ],
  limitations: [
    "PU sealant is not suitable for structural glazing — use structural silicone for glass bonding",
    "Not suitable for permanently submerged joints — use polysulfide or dedicated pool sealant",
    "Do not apply on wet substrates — moisture-curing requires dry substrate for correct cure",
    "Not suitable for natural stone without prior testing — risk of staining",
    "PU sealant has lower UV stability than silicone — if left unpainted, check UV resistance with manufacturer",
  ],
  standardsNotes: [
    "ISO 11600 — Building Construction — Jointing products — Classification and requirements for sealants",
    "AS/NZS 4284 — Testing of curtain wall and window wall systems",
    "NCC Volume One — facade weatherproofing performance requirements",
    "Manufacturer TDS — confirm all application parameters, primer requirements and movement class",
  ],
  suitableDefects: [
    "Failed or absent perimeter sealant at window and door frames in masonry or rendered facades where paint-over is required",
    "Cracked, debonded or hardened PU perimeter joints around window frames",
    "Water ingress at window frame perimeter where the joint must be reinstated and painted",
    "Failed facade movement joints in rendered masonry that require paintable replacement sealant",
  ],
  typicalSubstrates: [
    "Masonry — brick and block facades, frame-to-wall perimeter joints",
    "Render — acrylic and cement render facades where perimeter must match the render finish colour",
    "Concrete — concrete facade panels and surrounds",
    "Aluminium frames — confirm primer requirement for specific frame finish",
    "Painted surfaces — confirm paint compatibility with specific coating system",
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

export function PerimeterPUIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are polyurethane perimeter sealant systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Polyurethane (PU) sealants for window and door perimeter joints are one-part, moisture-curing elastomeric sealants that cure to a flexible, paintable joint. The key advantage of PU over silicone for window perimeter joints is paintability — once cured, PU sealant can be overpainted with facade paint, allowing the sealant profile to be concealed within the rendered or painted facade finish. Silicone cannot be painted, leaving the sealant bead visible in the finished facade.</p>
        {expanded && <p>In Australian Class 2 strata remediation, PU sealant is the standard specification for window perimeter joints in rendered masonry facades where the entire facade is to be repainted after remediation works. The PU sealant is applied to the cleaned and prepared perimeter joint before priming and painting — the paint system bridges over the sealant profile for a seamless facade appearance. PU sealants must be selected with appropriate movement accommodation (±25% minimum for facade perimeter joints to ISO 11600 Class F-25LM) and confirmed for UV stability if there is any risk the joint will be left exposed for a period before painting. Never use acetic cure silicone on aluminium frames — the acetic acid released during cure corrodes the aluminium.</p>}
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

export function PerimeterPUProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — polyurethane perimeter sealant systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of polyurethane perimeter sealant systems. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Components</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Paintable</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primer</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Movement</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.parts}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.paintable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.primer}</td>
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
