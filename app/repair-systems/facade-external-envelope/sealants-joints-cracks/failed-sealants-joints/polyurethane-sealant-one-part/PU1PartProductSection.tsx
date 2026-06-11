"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "One-part" | "PU" | "Facade" | "Movement-joint" | "Paintable" | "Masonry" | "Concrete" | "Aluminium" | "ISO-11600" | "Coastal";

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
    accentColor: "#dc2626",
    name: "Sika Sikaflex-11FC+",
    descriptionLine: "One-part moisture-curing polyurethane facade sealant — paintable — excellent adhesion to masonry, concrete, render and aluminium — ±25% movement accommodation — most widely specified one-part PU sealant in Australian facade remediation",
    productType: "One-part moisture-curing polyurethane sealant — facade",
    filterTags: ["One-part", "PU", "Facade", "Movement-joint", "Paintable", "Masonry", "Concrete", "Aluminium", "ISO-11600"],
    techChips: [
      { label: "One-part", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture-curing", cls: "bg-sky-100 text-sky-800" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "±25% movement", cls: "bg-amber-50 text-amber-700" },
      { label: "ISO 11600 F-25LM", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: "Sikaflex-11FC+ is a one-part, moisture-curing polyurethane construction sealant suitable for facade movement joints, control joints, perimeter joints and general sealing in Australian Class 2 strata remediation. It cures without mixing, directly from the cartridge, making it practical for on-site application by a trades team. Sikaflex-11FC+ bonds to most construction substrates including concrete, masonry, render, aluminium, and most paints without a primer on clean and dry surfaces. It accommodates ±25% joint movement, is UV-resistant, and can be painted over with most architectural paints once cured. For best results, ensure joint is clean, dry and free of existing sealant residue, and apply with a backer rod behind the sealant for joints deeper than 8mm to ensure correct sealant profile and prevent three-sided adhesion.",
    technicalProperties: [
      "One-part — no mixing required — ready to use from cartridge",
      "±25% movement accommodation (ISO 11600 Class F-25LM)",
      "Paintable after cure with most architectural paints",
      "Good adhesion to concrete, masonry, render and aluminium without primer on most surfaces",
      "Skin time approx. 40–60 minutes at 23°C / 50% RH — confirm from current TDS",
      "Shore A hardness approx. 40 when cured — flexible, not brittle",
      "Suitable for joints 5–40mm width — confirm from TDS",
    ],
    limitations: [
      "Not suitable for structural glazing (use structural silicone for glass-to-frame structural bonding)",
      "Not suitable for permanently submerged joints (use polysulfide or dedicated pool sealant)",
      "Moisture-curing — do not apply in wet conditions or on wet substrates",
      "Not suitable for natural stone (may cause staining — test first)",
      "Movement accommodation lower than two-part PU systems — confirm for high-movement joints",
      "TODO: owner confirm — confirm primer requirement for specific substrates (anodised aluminium, some coatings) with Sika technical",
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
    accentColor: "#0369a1",
    name: "Tremco Vulkem 116",
    descriptionLine: "One-part moisture-curing polyurethane facade sealant — high movement accommodation — suitable for facade movement joints, expansion joints and perimeter sealing — primer may be required on some substrates",
    productType: "One-part moisture-curing polyurethane sealant — high-movement facade",
    filterTags: ["One-part", "PU", "Facade", "Movement-joint", "Masonry", "Concrete", "ISO-11600"],
    techChips: [
      { label: "One-part", cls: "bg-slate-100 text-slate-700" },
      { label: "High movement", cls: "bg-sky-100 text-sky-800" },
      { label: "Facade joints", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Tremco Vulkem 116 is a one-part moisture-curing polyurethane sealant designed for building facade joints, expansion joints and perimeter sealing. Vulkem 116 is widely used in commercial and strata facade remediation in Australia. It offers higher movement accommodation than many one-part PU systems and is suitable for wide movement joints. Primer (Tremco 636 or equivalent) may be required on porous substrates for optimal adhesion — confirm substrate-specific primer requirements with Tremco Australia technical. Ensure backer rod is installed behind sealant for proper joint geometry and to prevent three-sided adhesion. TODO: owner confirm — confirm current Australian product designation, primer requirements and movement class with Tremco Australia technical.",
    technicalProperties: [
      "One-part moisture-curing — no mixing required",
      "High movement accommodation — confirm rating from current TDS with Tremco technical",
      "Suitable for facade movement joints, expansion joints and perimeter seals",
      "Primer may be required on porous substrates — confirm with Tremco technical",
      "Paintable after cure — confirm paint compatibility with Tremco",
      "TODO: owner confirm — confirm all application parameters from current Tremco TDS",
    ],
    limitations: [
      "Primer may be required on some substrates — check with Tremco technical",
      "Not suitable for permanently submerged applications",
      "Do not apply on wet or frozen substrates",
      "Not suitable for structural glazing bonding",
      "TODO: owner confirm — confirm movement class, primer requirements and current product range with Tremco Australia",
    ],
    procurementSources: [
      { name: "Tremco Australia — trade supply", url: "https://www.tremcoinc.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Bostik Australia",
    brandUrl: "https://www.bostik.com/au",
    accentColor: "#7c3aed",
    name: "Bostik Seal N Flex 1",
    descriptionLine: "One-part polyurethane sealant — suitable for masonry, concrete and render movement joints — UV-stable — paintable — widely available through Australian trade and hardware channels",
    productType: "One-part polyurethane sealant — construction facade",
    filterTags: ["One-part", "PU", "Facade", "Movement-joint", "Paintable", "Masonry", "Concrete", "ISO-11600"],
    techChips: [
      { label: "One-part PU", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-stable", cls: "bg-sky-100 text-sky-800" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Bostik Seal N Flex 1 is a one-part polyurethane construction sealant suitable for sealing movement joints in masonry, concrete, render and similar substrates. It is UV-stable and can be overpainted once cured. Bostik Seal N Flex 1 is widely available through hardware and trade channels in Australia. Confirm movement accommodation class, primer requirements and specific substrate compatibility from the current Bostik TDS before specifying. Confirm suitability for facade-grade movement joints in Class 2 strata with Bostik Australia technical. TODO: owner confirm — confirm movement accommodation class, primer requirements and suitability for Class 2 strata facade joints with Bostik Australia.",
    technicalProperties: [
      "One-part — no mixing — ready to use",
      "UV-stable — suitable for exposed facade joints",
      "Paintable after cure with most architectural paints — confirm with Bostik",
      "Suitable for masonry, concrete and render substrates",
      "Widely available — Bunnings, Mitre 10, trade hardware",
      "TODO: owner confirm — confirm movement class and primer requirements from current TDS",
    ],
    limitations: [
      "TODO: owner confirm — confirm movement accommodation class (±15% vs ±25%) with Bostik Australia technical",
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
  { id: "One-part", label: "One-part" },
  { id: "PU", label: "Polyurethane" },
  { id: "Facade", label: "Facade" },
  { id: "Movement-joint", label: "Movement joint" },
  { id: "Paintable", label: "Paintable" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "ISO-11600", label: "ISO 11600" },
  { id: "Coastal", label: "Coastal rated" },
];

const SYSTEM_COMPARISON = [
  { product: "Sikaflex-11FC+", brand: "Sika", parts: "One", movement: "±25%", paintable: "Yes", primer: "Usually not required", primaryUse: "Facade movement joints, perimeter sealing, masonry and concrete" },
  { product: "Vulkem 116", brand: "Tremco", parts: "One", movement: "High — confirm TDS", paintable: "Yes — confirm", primer: "May be required — confirm", primaryUse: "Facade movement joints, expansion joints — higher movement applications" },
  { product: "Seal N Flex 1", brand: "Bostik", parts: "One", movement: "Confirm TDS", paintable: "Yes", primer: "Confirm TDS", primaryUse: "Masonry and concrete facade joints — general sealing" },
];

const TECH_INFO = {
  typicalApplications: [
    "Facade movement joint replacement — horizontal and vertical control joints in masonry, render and concrete facades",
    "Perimeter joint sealing — around window and door frames in masonry facades",
    "Expansion joint replacement in rendered facades where thermal movement is significant",
    "Facade panel joint sealing where polyurethane is specified in lieu of silicone",
    "Parapet and coping joint sealing on masonry construction",
  ],
  selectionCriteria: [
    "Movement accommodation — confirm ±25% minimum for facade movement joints (ISO 11600 Class F-25LM)",
    "Paintability — required if sealant will be painted over with facade coating",
    "Substrate — confirm primer requirement for specific substrate type with manufacturer",
    "UV exposure — confirm UV stability from manufacturer TDS for exposed facade joints",
    "Joint width and depth — ensure correct sealant profile: depth = 50–70% of width, backer rod required for depth control",
    "Temperature range — confirm application temperature range from TDS for Australian climate",
  ],
  limitations: [
    "One-part PU has lower movement accommodation than two-part PU for very wide movement joints",
    "Not suitable for structural glazing — structural silicone required for glass bonding applications",
    "Not suitable for permanently submerged joints — polysulfide or dedicated underwater sealant required",
    "Moisture-curing — do not apply on wet substrates or in rain",
    "Not suitable for natural stone without testing — possible staining",
  ],
  standardsNotes: [
    "ISO 11600 — Building Construction — Jointing products — Classification and requirements for sealants",
    "AS/NZS 4858 — Wet area membranes (for compatibility with waterproofing)",
    "ASTM C 920 — Standard specification for elastomeric joint sealants",
    "Manufacturer TDS — confirm all application parameters, primer requirements and movement class before specifying",
  ],
  suitableDefects: [
    "Failed or deteriorated polyurethane sealant in facade movement joints",
    "Failed perimeter sealant at window and door frames in masonry facades",
    "Cracked, debonded or open facade expansion joints",
    "Failed parapet coping joint sealant on masonry construction",
  ],
  typicalSubstrates: [
    "Concrete — external concrete facades and panel joints",
    "Masonry — brick and block facades, perimeter joints",
    "Render — acrylic and cement render facades",
    "Aluminium — window and door frames (confirm primer requirement)",
    "Painted surfaces — confirm compatibility with specific paint system",
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

export function PU1PartIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are one-part polyurethane sealant systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>One-part polyurethane (PU) sealants are single-component, moisture-curing elastomeric sealants widely used in Australian facade remediation for movement joints, perimeter joints and control joints. Unlike two-part PU systems, they require no mixing and cure on contact with atmospheric moisture. They are flexible when cured, accommodating thermal and structural movement, and most one-part PU sealants are paintable — an important advantage over silicone sealants where the sealant joint must be over-painted.</p>
        {expanded && <p>One-part PU sealants typically achieve ±25% movement accommodation (ISO 11600 Class F-25LM), making them suitable for most facade movement joint applications. They bond well to concrete, masonry, render and aluminium without requiring a primer on most substrates. In Australian Class 2 strata remediation, one-part PU sealants are frequently used for perimeter sealant replacement around windows and doors in masonry facades, for control joint replacement in rendered facades, and for expansion joint replacement in concrete facades. Backer rod must be installed behind the sealant to control joint depth and prevent three-sided adhesion — without a backer rod, the sealant will bond to three faces of the joint and fail prematurely.</p>}
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

export function PU1PartProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — one-part polyurethane facade sealant systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of one-part PU sealant systems. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Components</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Movement</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Paintable</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primer</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.parts}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.movement}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.paintable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.primer}</td>
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
