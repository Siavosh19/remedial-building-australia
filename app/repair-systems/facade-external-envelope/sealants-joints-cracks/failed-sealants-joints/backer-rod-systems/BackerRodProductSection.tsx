"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Closed-cell" | "Open-cell" | "PE-foam" | "Bond-breaker" | "Shallow-joint" | "Deep-joint" | "Vertical" | "Horizontal" | "ASTM-C1330";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Closed-cell PE foam — type A",
    brandUrl: "https://www.bayset.com.au",
    tdsUrl: undefined,
    accentColor: "#dc2626",
    name: "Closed-cell polyethylene foam backer rod",
    descriptionLine: "Closed-cell cross-linked polyethylene foam backer rod — Type A per ASTM C 1330 — for most facade movement joints — provides two-sided sealant bond and controls sealant depth — recommended for outdoor weatherseal, facade and perimeter joint applications — most commonly specified backer rod type in Australian facade remediation",
    productType: "Closed-cell PE foam backer rod — Type A",
    filterTags: ["Closed-cell", "PE-foam", "Deep-joint", "Vertical", "Horizontal", "ASTM-C1330"],
    techChips: [
      { label: "Closed-cell", cls: "bg-slate-100 text-slate-700" },
      { label: "Type A", cls: "bg-sky-100 text-sky-800" },
      { label: "Two-sided bond", cls: "bg-green-50 text-green-700" },
      { label: "Outdoor rated", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Closed-cell cross-linked polyethylene (PE) foam backer rod is the most commonly specified backer rod type in Australian facade sealant remediation. It is classified as Type A per ASTM C 1330. The closed-cell structure means it does not absorb water and does not off-gas when compressed, making it suitable for outdoor facade applications. Backer rod is inserted into the joint before sealant application to: (1) control sealant depth so the sealant depth is approximately 50–70% of the joint width; (2) prevent three-sided adhesion (the sealant bonding to the back of the joint cavity, which prevents free movement and causes premature failure); and (3) act as a backing for the sealant application tool. Backer rod should be selected 25–30% larger than the joint width to ensure a snug friction fit without compressing it more than 30% — over-compressed backer rod can cause out-gassing issues with some sealants. Closed-cell PE foam backer rod is supplied in circular cross-section in a range of diameters — common sizes for facade work: 10mm, 12mm, 15mm, 20mm, 25mm.",
    technicalProperties: [
      "Closed-cell — no water absorption — suitable for outdoor and weatherseal applications",
      "Non-reactive — compatible with polyurethane and silicone sealants",
      "Available in range of diameters: 6mm to 50mm — select 25–30% larger than joint width",
      "Type A per ASTM C 1330 — closed-cell cross-linked PE foam",
      "Provides two-sided sealant bond — prevents three-sided adhesion failure",
      "Controls sealant depth — sealant depth should be approximately 50–70% of joint width",
    ],
    limitations: [
      "Do not use open-cell backer rod outdoors — open-cell absorbs water and can cause sealant bubbling",
      "Do not over-compress — select rod 25–30% larger than joint, do not compress more than 30%",
      "Do not use backer rod as a substitute for sealant — backer rod is a backing system only",
      "Some closed-cell PE foams can cause out-gassing with certain solvent-based sealants — confirm compatibility with sealant manufacturer",
      "For joints shallower than 6mm, bond-breaker tape is required instead of backer rod",
    ],
    procurementSources: [
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Bunnings Warehouse — retail and trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Open-cell PU foam — type B",
    brandUrl: "https://www.bayset.com.au",
    tdsUrl: undefined,
    accentColor: "#0369a1",
    name: "Open-cell polyurethane foam backer rod",
    descriptionLine: "Open-cell polyurethane foam backer rod — Type B per ASTM C 1330 — for interior and dry applications only — NOT suitable for outdoor or weatherseal facade joints — compresses more easily than closed-cell rod — used for interior partition joints and interior applications",
    productType: "Open-cell PU foam backer rod — Type B — interior only",
    filterTags: ["Open-cell", "PE-foam", "ASTM-C1330"],
    techChips: [
      { label: "Open-cell", cls: "bg-slate-100 text-slate-700" },
      { label: "Type B", cls: "bg-sky-100 text-sky-800" },
      { label: "Interior only", cls: "bg-red-50 text-red-700" },
      { label: "NOT outdoor", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Open-cell polyurethane foam backer rod is classified as Type B per ASTM C 1330. Unlike closed-cell backer rod, open-cell rod absorbs water, making it unsuitable for outdoor or weatherseal facade joint applications. Open-cell backer rod is included here for reference and to highlight the distinction from closed-cell — do not specify open-cell backer rod for facade, perimeter or weatherseal joints exposed to weather. Open-cell backer rod compresses more easily and is typically used for interior applications — interior partition joints, interior skirting and cornice junctions and other unexposed interior joint applications. Always specify closed-cell PE foam (Type A) for any outdoor, weatherseal or facade joint application. For Australian facade remediation, the default backer rod specification is closed-cell Type A.",
    technicalProperties: [
      "Open-cell — absorbs water — NOT suitable for outdoor applications",
      "Type B per ASTM C 1330",
      "Compresses more easily than closed-cell Type A",
      "Lower resistance to moisture penetration",
      "Suitable for interior applications only",
    ],
    limitations: [
      "NOT suitable for outdoor, weatherseal or facade joint applications — absorbs water",
      "Water absorption can cause sealant bubbling and failure in outdoor joints",
      "Do not substitute for closed-cell Type A rod in facade remediation",
      "For all facade and weatherseal applications specify closed-cell PE foam Type A",
    ],
    procurementSources: [
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Bond-breaker tape — for shallow joints",
    brandUrl: "https://www.bayset.com.au",
    tdsUrl: undefined,
    accentColor: "#7c3aed",
    name: "Bond-breaker tape",
    descriptionLine: "Polyethylene bond-breaker tape — for shallow joints where backer rod cannot fit — applied to back face of joint to prevent three-sided adhesion — used when joint depth is less than 6mm or joint is too shallow for circular backer rod",
    productType: "PE bond-breaker tape — shallow joint backing",
    filterTags: ["Bond-breaker", "Shallow-joint", "PE-foam", "Vertical", "Horizontal"],
    techChips: [
      { label: "Bond-breaker", cls: "bg-slate-100 text-slate-700" },
      { label: "Shallow joints", cls: "bg-sky-100 text-sky-800" },
      { label: "Prevents 3-sided bond", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription: "Bond-breaker tape is a polyethylene (PE) or PTFE-faced tape applied to the back wall of a joint cavity to prevent sealant from bonding to the back face of the joint — preventing three-sided adhesion. Bond-breaker tape is used when joint depth is too shallow to accommodate a circular backer rod — typically joints shallower than 6mm, or where the joint geometry prevents insertion of a round rod. Three-sided adhesion is a critical defect mode in sealant joints: if the sealant bonds to both side faces AND the back of the joint, it cannot deform under movement and fails prematurely. Bond-breaker tape prevents bonding to the back face while still allowing the applicator to form the correct sealant profile. Bond-breaker tape is not a sealant and does not provide waterproofing. It must be applied cleanly to the back of the joint and the sealant applied over it without the tape lifting. Always confirm bond-breaker tape compatibility with the specified sealant manufacturer.",
    technicalProperties: [
      "Polyethylene or PTFE-faced — prevents sealant bonding to back face of joint",
      "Used when joint depth is less than 6mm or round backer rod cannot be inserted",
      "Prevents three-sided sealant adhesion — allows correct sealant movement response",
      "Applied to back wall of joint before sealant application",
      "Available in various widths — select to match joint width",
    ],
    limitations: [
      "Not a sealant — does not waterproof or seal the joint on its own",
      "Must be applied cleanly — if tape lifts or folds during application it loses effectiveness",
      "Confirm compatibility with specified sealant manufacturer before use",
      "For joints deeper than 6mm, closed-cell round backer rod is preferred over bond-breaker tape",
    ],
    procurementSources: [
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Sika Australia — accessory supply", url: "https://www.sika.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Closed-cell", label: "Closed-cell" },
  { id: "Open-cell", label: "Open-cell" },
  { id: "PE-foam", label: "PE foam" },
  { id: "Bond-breaker", label: "Bond-breaker tape" },
  { id: "Shallow-joint", label: "Shallow joints" },
  { id: "Deep-joint", label: "Deep joints" },
  { id: "Vertical", label: "Vertical joints" },
  { id: "Horizontal", label: "Horizontal joints" },
  { id: "ASTM-C1330", label: "ASTM C 1330" },
];

const SYSTEM_COMPARISON = [
  { product: "Closed-cell PE foam rod", type: "Type A", outdoor: "Yes", waterAbsorb: "No", application: "Standard — 25–30% larger than joint width", primaryUse: "All outdoor facade, weatherseal and perimeter sealant joints — default specification" },
  { product: "Open-cell PU foam rod", type: "Type B", outdoor: "No — interior only", waterAbsorb: "Yes", application: "Interior applications only", primaryUse: "Interior partition and cornice joints only — NOT for facade or outdoor applications" },
  { product: "Bond-breaker tape", type: "PE / PTFE tape", outdoor: "Yes (confirm)", waterAbsorb: "No", application: "Shallow joints under 6mm depth", primaryUse: "Shallow joints where round rod cannot be inserted — prevents three-sided adhesion" },
];

const TECH_INFO = {
  typicalApplications: [
    "Closed-cell backer rod: all facade movement joints before sealant application — horizontal and vertical",
    "Closed-cell backer rod: perimeter joints around window and door frames before sealant application",
    "Bond-breaker tape: shallow facade joints where round backer rod cannot be inserted",
    "Correct joint geometry: sealant depth = 50–70% of joint width — backer rod controls this",
    "Prevention of three-sided adhesion — critical for long-term sealant joint performance",
  ],
  selectionCriteria: [
    "Always specify closed-cell Type A for outdoor and weatherseal facade joints — never open-cell outdoors",
    "Select backer rod diameter 25–30% larger than joint width for correct friction fit",
    "For joints shallower than 6mm, use bond-breaker tape instead of round backer rod",
    "Confirm backer rod and sealant compatibility — some sealants react with specific foam types",
    "Correct sealant depth is achieved by backer rod position: depth = 50–70% of joint width",
  ],
  limitations: [
    "Backer rod is not a sealant — it does not waterproof the joint by itself",
    "Open-cell backer rod absorbs water and is not suitable for outdoor facade joints",
    "Over-compressed backer rod may out-gas and cause bubbling in solvent-based sealants",
    "Under-sized backer rod falls into the joint and cannot be positioned correctly",
    "Bond-breaker tape must be compatible with the sealant — confirm with sealant manufacturer",
  ],
  standardsNotes: [
    "ASTM C 1330 — Specification for cylindrical sealant backing for use with cold liquid-applied sealants",
    "ISO 11600 — Building Construction — Jointing products — sealant classifications (references backer requirements)",
    "Sealant manufacturer TDS — confirm backer rod type and compatibility requirements",
    "AS 3600 — Concrete structures — movement joint requirements (indirectly referenced)",
  ],
  suitableDefects: [
    "New or replacement facade sealant joints requiring depth control and prevention of three-sided adhesion",
    "Perimeter sealant replacement at window and door frames where joint is deep enough for backer rod",
    "Facade movement joint replacement where joint depth requires backer rod positioning",
    "Shallow control joints in render or masonry requiring bond-breaker tape",
  ],
  typicalSubstrates: [
    "Concrete — facade joint back face",
    "Masonry — perimeter joint back face",
    "Render — control joint back face",
    "Aluminium — frame perimeter joint back face",
    "Any joint back face where sealant is applied — backer rod or bond-breaker tape required",
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
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the sealant manufacturer before use.</p>
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

export function BackerRodIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is backer rod and why is it critical?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Backer rod is a foam or tape backing material installed at the back of a joint cavity before sealant application. Its purpose is to control sealant depth (so the sealant forms an hourglass-shaped profile with the correct depth-to-width ratio) and to prevent three-sided adhesion — one of the most common causes of premature sealant failure in facade remediation. Without backer rod, the sealant bonds to both side faces of the joint AND the back face, forming a rigid three-sided bond that cannot accommodate joint movement and fails quickly.</p>
        {expanded && <p>The correct sealant profile achieved with backer rod has the sealant depth equal to approximately 50–70% of the joint width. This hourglass profile allows the sealant to deform freely as the joint opens and closes under thermal movement. Closed-cell polyethylene foam backer rod (Type A per ASTM C 1330) is the default specification for all outdoor facade sealant joints in Australian remediation. Open-cell foam (Type B) absorbs water and must never be used outdoors. For joints shallower than approximately 6mm where round backer rod cannot be inserted, polyethylene bond-breaker tape applied to the back of the joint achieves the same two-sided bond geometry. Backer rod is a critical part of every facade sealant joint — not an optional accessory.</p>}
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

export function BackerRodProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 types — backer rod and bond-breaker tape systems — scroll to view all</p>
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
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} type{visibleProducts.length !== 1 ? "s" : ""}</span>
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
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Source</a>
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
            <p className="mt-1 text-sm text-slate-500">Backer rod and bond-breaker tape comparison. Always confirm compatibility with the specified sealant manufacturer.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Classification</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Outdoor rated</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Water absorption</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Application</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.outdoor}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.waterAbsorb}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.application}</td>
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
