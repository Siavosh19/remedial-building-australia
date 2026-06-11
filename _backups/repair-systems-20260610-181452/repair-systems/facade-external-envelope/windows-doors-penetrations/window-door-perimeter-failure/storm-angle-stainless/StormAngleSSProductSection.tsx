"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag = "Stainless-316" | "Storm-angle" | "Cover-angle" | "Coastal" | "Window" | "Door" | "Facade" | "AS-3700" | "Extruded" | "Custom";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Metal fabricator / steel supplier",
    brandUrl: "https://www.austubemills.com",
    accentColor: "#dc2626",
    name: "316L stainless equal angle — 50×50×3mm storm angle",
    descriptionLine: "316L stainless steel 50×50×3mm equal angle — used as window head, jamb or sill storm angle in coastal and marine-influenced environments where aluminium is not suitable — ex-stock from steel distributors — cut to length on site or in workshop",
    productType: "316L stainless equal angle — coastal window storm angle",
    filterTags: ["Stainless-316", "Storm-angle", "Coastal", "Window", "Door", "Facade", "Extruded"],
    techChips: [
      { label: "316L stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "50×50×3mm", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal OK", cls: "bg-green-50 text-green-700" },
      { label: "AS 3700", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "316L stainless steel 50×50×3mm equal angle is the correct specification for window storm angles in coastal and marine-influenced environments where aluminium angles will corrode at cut edges and fastener points in salt-laden air. The 316L grade (low carbon) provides improved weld corrosion resistance over standard 316. Angles are cut to length from standard bar stock and fixed to masonry or frame with 316 stainless screws — all fixings must also be 316 stainless to prevent bimetallic corrosion. Top and end joints sealed with a compatible neutral cure silicone or low-modulus sealant. 316 stainless has a slightly different appearance to aluminium and will patina over time in coastal environments — confirm the finish requirement with the client. In some locations a brushed or passivated finish is specified. Stainless angles are heavier to handle than aluminium and harder to cut cleanly without appropriate tools — factor this into labour costs. Confirm 316 (not 304) grade with the supplier before ordering — 304 is not suitable for coastal applications. All fixings must be 316 stainless.",
    technicalProperties: [
      "316L stainless steel equal angle — 50×50×3mm standard section — coastal grade",
      "Grade 316L (low carbon) — improved weld and crevice corrosion resistance over 304",
      "Ex-stock from steel distributors — cut to length on site or in workshop",
      "All fixings in 316 stainless — bimetallic corrosion risk if inferior grade fasteners used",
      "Suitable for coastal and marine-influenced environments",
      "Heavier than aluminium — confirm structural implications for lightweight facades",
    ],
    limitations: [
      "Confirm 316L not 304 grade with supplier before ordering — 304 is inadequate for coastal use",
      "Stainless angles are harder to cut than aluminium — angle grinder with stainless-rated disc required",
      "Will patina over time in coastal environments — confirm finish and appearance requirement with client",
      "All fixings must be 316 stainless — do not mix grades",
      "Storm angles supplement primary perimeter sealant — not a substitute for correctly installed sealant",
    ],
    procurementSources: [
      { name: "Austube Mills / InfraBuild — steel sections ex-stock", url: "https://www.austubemills.com" },
      { name: "Midway Metals — stainless section supply", url: "https://www.midwaymetals.com.au" },
      { name: "Atlas Steels — stainless steel sections", url: "https://www.atlassteels.com.au" },
    ],
  },
  {
    fullLabel: "Metal fabricator / steel supplier",
    brandUrl: "https://www.atlassteels.com.au",
    accentColor: "#0369a1",
    name: "316L stainless unequal angle — 75×50×3mm wider coverage storm angle",
    descriptionLine: "316L stainless steel 75×50×3mm unequal angle — used where the standard 50×50 equal angle does not provide sufficient coverage over the window frame or a deeper wall reveal — coastal and marine grade — confirm dimensions required for each project",
    productType: "316L stainless unequal angle — wider coverage coastal storm angle",
    filterTags: ["Stainless-316", "Storm-angle", "Coastal", "Window", "Facade", "Extruded"],
    techChips: [
      { label: "316L stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "75×50×3mm unequal", cls: "bg-sky-100 text-sky-800" },
      { label: "Wider coverage", cls: "bg-green-50 text-green-700" },
      { label: "Coastal OK", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "316L stainless 75×50×3mm or similar unequal leg angles are used where the standard 50×50 equal angle does not provide sufficient coverage over the window frame or where the wall reveal requires a longer horizontal leg. The 75mm horizontal leg provides extended lapping over the frame or render return, improving water shedding coverage at the head or jamb. Fixed with 316 stainless screws, top and end joints sealed with compatible sealant. Specific unequal sizes in stainless may require ordering rather than being available as ex-stock — confirm availability and lead time with the supplier before specifying. Grade 316L (not 304) must be confirmed with the supplier — 304 stainless is not suitable for coastal environments. All fixings must be 316 stainless. Heavier than aluminium equivalents — factor into handling and labour costs for upper-floor work. TODO: owner confirm — confirm appropriate leg dimensions for the specific window reveal and frame geometry on each project.",
    technicalProperties: [
      "316L stainless unequal angle — longer horizontal leg for increased coverage",
      "75×50mm or similar — confirm specific dimensions for each project",
      "Grade 316L — suitable for coastal and marine-influenced environments",
      "All fixings must be 316 stainless — confirm grade before ordering",
      "May require ordering rather than ex-stock — confirm availability and lead time",
      "TODO: owner confirm — confirm specific leg dimensions with project requirements",
    ],
    limitations: [
      "Confirm 316L not 304 grade with supplier — 304 not suitable for coastal use",
      "Specific unequal sizes in stainless may not be ex-stock — confirm availability and lead time",
      "Harder to cut than aluminium — stainless-rated cutting disc required",
      "All fixings must be 316 stainless — no inferior grade fasteners",
      "TODO: owner confirm — confirm leg dimensions for specific project before ordering",
    ],
    procurementSources: [
      { name: "Atlas Steels — stainless sections", url: "https://www.atlassteels.com.au" },
      { name: "Midway Metals — stainless section supply", url: "https://www.midwaymetals.com.au" },
      { name: "Austube Mills / InfraBuild — steel sections", url: "https://www.austubemills.com" },
    ],
  },
  {
    fullLabel: "Proprietary profile — flashings supplier",
    brandUrl: "https://www.atlassteels.com.au",
    accentColor: "#7c3aed",
    name: "Proprietary 316 stainless storm bead / cover angle profile",
    descriptionLine: "Proprietary extruded or roll-formed 316 stainless steel storm bead or cover angle profile — purpose-designed for coastal window storm angle applications — may include integral drip groove, sealant channel or nose profile — confirm AU availability",
    productType: "Proprietary 316 stainless storm bead — coastal window application",
    filterTags: ["Stainless-316", "Storm-angle", "Cover-angle", "Coastal", "Window", "Facade", "Custom"],
    techChips: [
      { label: "316 stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "Proprietary profile", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal OK", cls: "bg-green-50 text-green-700" },
      { label: "TODO: confirm AU stock", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Proprietary 316 stainless storm bead and cover angle profiles are purpose-designed extruded or roll-formed sections for coastal window storm angle applications. Unlike standard angle sections, proprietary profiles may include integral features such as a drip groove on the underside of the horizontal leg to prevent water tracking back, a sealant recess channel on the back leg, or a purpose-formed nose profile. These purpose-designed features improve weatherproofing performance over a simple angle section. Available from stainless fabricators and specialist flashings suppliers — confirm specific product, profile dimensions, grade and Australian availability before specifying. Confirm grade is 316 (not 304) — critical for coastal applications. All fixings must be 316 stainless. TODO: owner confirm — confirm specific proprietary profile, Australian availability and coastal grade before specifying.",
    technicalProperties: [
      "Proprietary 316 stainless profile — purpose-designed for coastal window storm angle applications",
      "May include integral drip groove, sealant channel or nose profile for improved performance",
      "Grade 316 (confirm with supplier) — suitable for coastal and marine environments",
      "Available from stainless fabricators and specialist flashings suppliers",
      "All fixings must be 316 stainless",
      "TODO: owner confirm — confirm profile, availability and grade before specifying",
    ],
    limitations: [
      "Product range varies by supplier — confirm specific profile and Australian availability before specifying",
      "Confirm grade is 316 not 304 — critical for coastal applications",
      "Custom or proprietary profiles may require longer lead times than standard sections",
      "All fixings must be 316 stainless — no inferior grade fasteners",
      "TODO: owner confirm — confirm Australian supplier, profile dimensions and coastal grade",
    ],
    procurementSources: [
      { name: "Atlas Steels — stainless fabrication", url: "https://www.atlassteels.com.au" },
      { name: "Midway Metals — stainless section and profile supply", url: "https://www.midwaymetals.com.au" },
      { name: "TODO: owner confirm — confirm Australian supplier for proprietary 316 storm profile", url: "https://www.atlassteels.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Stainless-316", label: "316 Stainless" },
  { id: "Storm-angle", label: "Storm angle" },
  { id: "Cover-angle", label: "Cover angle" },
  { id: "Coastal", label: "Coastal" },
  { id: "Extruded", label: "Extruded" },
  { id: "Custom", label: "Custom / proprietary" },
  { id: "Window", label: "Window" },
  { id: "Facade", label: "Facade" },
];

const SYSTEM_COMPARISON = [
  { product: "316L stainless equal angle 50×50×3mm", type: "Equal angle", material: "316L stainless", finish: "Mill / passivated", coastal: "Yes", supply: "Ex-stock", primaryUse: "Standard coastal window storm angle at head, jamb or sill — most common coastal specification" },
  { product: "316L stainless unequal angle 75×50×3mm", type: "Unequal angle", material: "316L stainless", finish: "Mill / passivated", coastal: "Yes", supply: "Order req.", primaryUse: "Wider coverage where standard 50×50 angle is insufficient for the reveal or frame depth" },
  { product: "Proprietary 316 stainless storm bead", type: "Proprietary", material: "316 stainless", finish: "Mill / passivated", coastal: "Yes (confirm)", supply: "Supplier stock", primaryUse: "Purpose-designed profiles with integral features for coastal locations — confirm AU availability" },
];

const TECH_INFO = {
  typicalApplications: [
    "Secondary weather barrier at window head, jamb and sill in coastal and marine-influenced locations",
    "Storm angle in locations where aluminium angles would corrode within the design life of the remediation",
    "Head storm angle combined with 316 stainless head flashing for redundant weatherproofing at head in coastal buildings",
    "Sill storm angle over subsill drainage in high-exposure coastal locations",
    "Cover angle at sliding door jamb-to-wall interface on upper floors in exposed coastal locations",
  ],
  selectionCriteria: [
    "Specify 316L (not 304) stainless — critical distinction for coastal and marine environments",
    "Confirm angle leg dimensions accommodate the specific frame and wall reveal geometry",
    "All fixings must be 316 stainless — do not use 304, carbon steel or zinc-plated fasteners",
    "For inland non-coastal locations where aluminium is adequate, aluminium angles are preferred — lighter and easier to work",
    "Top and end joints and all fixing penetrations must be sealed with a compatible sealant after installation",
    "Install primary perimeter sealant correctly — storm angles supplement, not replace, primary sealing",
  ],
  limitations: [
    "Harder to cut than aluminium — stainless-rated angle grinder disc required on site",
    "Heavier than aluminium — factor into upper-floor handling and labour costs",
    "Will patina and develop surface rust streaks on the passivated surface in some coastal environments — confirm acceptable to client",
    "Confirm 316L not 304 with supplier — 304 is not adequate for coastal use",
    "Storm angles do not replace primary perimeter sealant — both must be correctly installed",
  ],
  standardsNotes: [
    "AS 3700 — masonry structures — metal ties and fixings grade requirements for exposure classification",
    "AS/NZS 4284 — testing of building facades — weatherproofing performance",
    "NCC Volume One — facade weatherproofing performance requirements",
    "316L stainless — ASTM A276 / AS 1554.6 or equivalent — confirm grade with supplier",
  ],
  suitableDefects: [
    "Persistent water ingress at window frame perimeter joints in coastal locations where aluminium is not suitable",
    "Perimeter joints in coastal or marine environments that have repeatedly failed due to corrosion of existing metalwork",
    "High-exposure coastal window locations where primary sealant alone is insufficient",
    "Window head locations in coastal buildings where a stainless storm angle replaces a failed or inadequate head flashing",
  ],
  typicalSubstrates: [
    "Masonry — brick and block facades — angle fixed to masonry with 316 stainless plugs and screws",
    "Render — fixed to render return or window frame with 316 stainless fixings through render into substrate",
    "Aluminium window frames — angle fixed to frame with 316 stainless fasteners (avoid bimetallic contact where possible)",
    "Do not use with carbon steel or zinc-plated fasteners — bimetallic corrosion between stainless and inferior grade fixings",
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
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm grade 316L (not 304), dimensions and availability before ordering.</p>
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

export function StormAngleSSIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are 316 stainless storm angle systems for windows?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>316 stainless steel storm angles are the correct specification for window and door frame perimeter protection in coastal and marine-influenced environments where aluminium angles would corrode over the design life of the remediation. Grade 316L stainless provides the corrosion resistance necessary for salt-laden coastal air, saline groundwater splash and high-humidity marine environments where 304 stainless and aluminium are inadequate.</p>
        {expanded && <p>Storm angles (cover angles) are metal angle sections fixed at the perimeter of window and door frames to provide a secondary weather barrier at the frame-to-wall interface. The angle laps over both the frame and the adjacent render or masonry return, creating a physical barrier that deflects wind-driven rain away from the perimeter joint. In coastal environments, all metalwork in the system — the angle, the fixings, and any related flashing — must be 316 stainless. Do not mix 316 stainless angles with 304 or carbon steel fasteners — bimetallic corrosion will occur at the fixing point and undermine the system. Storm angles supplement the primary perimeter sealant — they do not replace it. The primary sealant must still be correctly installed and maintained.</p>}
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

export function StormAngleSSProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 316 stainless storm angle systems — scroll to view all</p>
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
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Supplier</a>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of 316 stainless storm angle systems. Confirm grade 316L (not 304) and dimensions before ordering.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Supply</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.supply}</td>
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
