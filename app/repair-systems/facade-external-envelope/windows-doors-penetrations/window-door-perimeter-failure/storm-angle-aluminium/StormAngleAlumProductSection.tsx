"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Aluminium" | "Storm-angle" | "Cover-angle" | "Anodised" | "Powder-coat" | "Window" | "Door" | "Facade" | "Non-coastal" | "Extruded";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Extrusion supplier — standard section",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#dc2626",
    name: "Extruded aluminium storm angle — standard 50×50×3mm",
    descriptionLine: "Standard 50×50×3mm extruded aluminium equal angle — anodised or powder-coated — used as window head, jamb or sill storm angle to provide a secondary weather barrier at the frame-to-wall interface — cut to length from standard bar stock",
    productType: "Extruded aluminium equal angle — window storm angle",
    filterTags: ["Aluminium", "Storm-angle", "Anodised", "Powder-coat", "Window", "Door", "Facade", "Extruded"],
    techChips: [
      { label: "Extruded aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "50×50×3mm", cls: "bg-sky-100 text-sky-800" },
      { label: "Anodised / PC", cls: "bg-green-50 text-green-700" },
      { label: "Non-coastal", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Standard 50×50×3mm extruded aluminium equal angle sections are cut to length and used as storm angles (cover angles) at window head, jamb and sill locations to provide a secondary weather barrier at the frame-to-wall interface. The angle is fixed to the masonry or frame with 316 stainless screws, the top and end joints sealed with a compatible neutral cure silicone or PU sealant, and the angle can be powder-coated or anodised to match the facade or window frame colour. Aluminium storm angles are appropriate for non-coastal and low-to-moderate exposure environments — specify stainless 316 angles for coastal and marine-influenced locations. All fixings must be 316 stainless. Confirm that the 50×50mm leg dimensions accommodate the specific window frame and wall reveal geometry. Other angle sizes (40×40, 50×25, 75×50 etc.) are available for different applications — confirm dimensions required before ordering.",
    technicalProperties: [
      "50×50×3mm extruded aluminium equal angle — standard ex-stock section",
      "Anodised or powder-coated finish — confirm colour match with frame or facade before ordering",
      "Cut to length from standard 6m bar stock — simple site or workshop operation",
      "All fixings in 316 stainless — compatible with aluminium in exterior applications",
      "Suitable for non-coastal, low-to-moderate exposure environments",
      "Lightweight and easy to handle — minimal structural impact on facade",
    ],
    limitations: [
      "Not suitable for coastal environments within approx. 1 km of the ocean — specify stainless 316 angles instead",
      "Aluminium does not render well without surface preparation — key or coat the surface before rendering over",
      "All fixings must be 316 stainless — do not use carbon steel or zinc-plated fasteners with aluminium",
      "Storm angles provide a secondary barrier only — primary perimeter sealant must be installed correctly first",
      "Confirm leg dimensions suit the specific window frame geometry before ordering",
    ],
    procurementSources: [
      { name: "Capral Aluminium — extruded sections and distribution", url: "https://www.capral.com.au" },
      { name: "OneSteel Metalcentre — aluminium angles ex-stock", url: "https://www.infrabuild.com" },
      { name: "Midway Metals — aluminium section supply", url: "https://www.midwaymetals.com.au" },
    ],
  },
  {
    fullLabel: "Extrusion supplier / local fabricator",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#0369a1",
    name: "Extruded aluminium storm angle — unequal leg 75×50×3mm",
    descriptionLine: "75×50×3mm extruded aluminium unequal angle — used where a longer horizontal leg is required for coverage over the window frame or a deeper wall reveal — anodised or powder-coated — suitable for non-coastal and low-to-moderate exposure environments",
    productType: "Extruded aluminium unequal angle — wider coverage storm angle",
    filterTags: ["Aluminium", "Storm-angle", "Anodised", "Powder-coat", "Window", "Facade", "Extruded"],
    techChips: [
      { label: "Aluminium unequal", cls: "bg-slate-100 text-slate-700" },
      { label: "75×50×3mm", cls: "bg-sky-100 text-sky-800" },
      { label: "Wider coverage", cls: "bg-green-50 text-green-700" },
      { label: "Non-coastal", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "75×50×3mm or similar unequal leg extruded aluminium angles are used where the standard 50×50 equal angle does not provide sufficient coverage over the window frame or where the wall reveal depth requires a longer horizontal leg. The longer horizontal leg (75mm) laps further over the frame or render return, providing improved water shedding coverage. Fixed with 316 stainless screws, top and end joints sealed with compatible sealant. Anodised or powder-coated finish to suit the project. Confirm the specific leg dimensions required for the project before ordering — unequal angles in specific sizes may require ordering from a distributor rather than being available as ex-stock. All fixings must be 316 stainless. Suitable for non-coastal, low-to-moderate exposure environments. Specify stainless 316 angles for coastal locations. TODO: owner confirm — confirm appropriate leg dimensions for the specific window reveal and frame geometry.",
    technicalProperties: [
      "Unequal leg aluminium angle — longer horizontal leg for increased coverage",
      "75×50mm or similar dimensions — confirm specific size required for each project",
      "Anodised or powder-coated finish — confirm colour match before ordering",
      "All fixings in 316 stainless",
      "Suitable for non-coastal, low-to-moderate exposure locations",
      "TODO: owner confirm — confirm specific leg dimensions with the project requirements",
    ],
    limitations: [
      "Not suitable for coastal environments — specify stainless 316 unequal angles for coastal locations",
      "Specific unequal sizes may require ordering (not ex-stock) — confirm availability and lead time",
      "All fixings must be 316 stainless — no carbon steel or zinc-plated fasteners",
      "Storm angles supplement primary perimeter sealant — not a replacement for it",
      "TODO: owner confirm — confirm leg dimensions for specific project before ordering",
    ],
    procurementSources: [
      { name: "Capral Aluminium — extruded sections and distribution", url: "https://www.capral.com.au" },
      { name: "OneSteel Metalcentre — aluminium sections ex-stock", url: "https://www.infrabuild.com" },
      { name: "Midway Metals — aluminium section supply", url: "https://www.midwaymetals.com.au" },
    ],
  },
  {
    fullLabel: "Proprietary cover angle / flashings supplier",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#7c3aed",
    name: "Proprietary aluminium cover angle / storm bead profile",
    descriptionLine: "Proprietary extruded aluminium cover angle or storm bead profile — purpose-designed for window storm angle applications — includes integral drip groove or sealant channel depending on product — available from flashings and building products suppliers",
    productType: "Proprietary aluminium storm angle / cover bead",
    filterTags: ["Aluminium", "Storm-angle", "Cover-angle", "Powder-coat", "Window", "Door", "Facade"],
    techChips: [
      { label: "Proprietary profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Integral drip groove", cls: "bg-sky-100 text-sky-800" },
      { label: "Purpose-designed", cls: "bg-green-50 text-green-700" },
      { label: "TODO: confirm AU stock", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Proprietary aluminium cover angle and storm bead profiles are purpose-designed extruded profiles for window storm angle applications. Unlike standard angle sections, proprietary profiles may include integral features such as a drip groove on the underside of the horizontal leg (to prevent water tracking back under the angle), a sealant recess channel on the back leg, or a pre-formed nose profile. These purpose-designed features improve the weatherproofing performance of the storm angle system. Available from flashings and building hardware suppliers — confirm specific product, profile dimensions and Australian availability with the supplier. All fixings must be 316 stainless. Confirm whether the specific proprietary profile is suitable for coastal or high-exposure environments — most aluminium profiles are not suitable for coastal locations. TODO: owner confirm — confirm specific proprietary profile, Australian availability and coastal suitability before specifying.",
    technicalProperties: [
      "Purpose-designed extrusion — may include integral drip groove, sealant channel or nose profile",
      "Better weatherproofing performance than standard angle section in some configurations",
      "Available from flashings and building products suppliers",
      "Confirm 316 stainless fixings — do not mix fastener grades",
      "TODO: owner confirm — confirm specific profile, availability and coastal suitability",
    ],
    limitations: [
      "Product range varies by supplier — confirm specific profile dimensions and availability before specifying",
      "Generally not suitable for coastal environments without specific corrosion-resistant coating",
      "Confirm coastal suitability with the specific product manufacturer before specifying for coastal locations",
      "TODO: owner confirm — confirm Australian supplier, profile dimensions and coastal suitability before specifying",
    ],
    procurementSources: [
      { name: "Stratco — building products and flashings", url: "https://www.stratco.com.au" },
      { name: "Capral Aluminium — purpose-designed extrusions", url: "https://www.capral.com.au" },
      { name: "TODO: owner confirm — confirm Australian supplier for specific proprietary profile", url: "https://www.stratco.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Aluminium", label: "Aluminium" },
  { id: "Storm-angle", label: "Storm angle" },
  { id: "Cover-angle", label: "Cover angle" },
  { id: "Anodised", label: "Anodised" },
  { id: "Powder-coat", label: "Powder coated" },
  { id: "Extruded", label: "Extruded" },
  { id: "Window", label: "Window" },
  { id: "Facade", label: "Facade" },
  { id: "Non-coastal", label: "Non-coastal" },
];

const SYSTEM_COMPARISON = [
  { product: "Extruded alum. 50×50×3mm equal angle", type: "Equal angle", material: "Alum. extrusion", finish: "Anodised / PC", coastal: "No", supply: "Ex-stock", primaryUse: "Standard window storm angle at head, jamb or sill — most common specification" },
  { product: "Extruded alum. 75×50×3mm unequal angle", type: "Unequal angle", material: "Alum. extrusion", finish: "Anodised / PC", coastal: "No", supply: "Order req.", primaryUse: "Wider coverage where standard 50×50 angle is insufficient for the reveal depth" },
  { product: "Proprietary cover angle / storm bead", type: "Proprietary", material: "Alum. extrusion", finish: "Powder coat", coastal: "Confirm", supply: "Supplier stock", primaryUse: "Purpose-designed profiles with integral features — confirm AU availability" },
];

const TECH_INFO = {
  typicalApplications: [
    "Secondary weather barrier at window head, jamb and sill frame-to-wall interfaces on masonry facades",
    "Storm angle installation where existing perimeter sealant failure is persistent and a more durable solution is required",
    "Head storm angle combined with head flashing replacement for redundant weatherproofing at head",
    "Sill storm angle over subsill drainage to capture water from the frame and direct it to the drainage outlet",
    "Cover angle at sliding door jamb-to-wall interface on upper floors in exposed locations",
  ],
  selectionCriteria: [
    "Specify stainless 316 angles for coastal or marine-influenced environments — aluminium angles are not suitable",
    "Confirm the angle leg dimensions accommodate the specific frame and wall reveal geometry",
    "Confirm anodised or powder-coated finish matches the frame or facade colour scheme",
    "All fixings must be 316 stainless — do not use carbon steel or zinc-plated fasteners with aluminium",
    "Install primary perimeter sealant correctly first — storm angles supplement, not replace, primary sealing",
    "All joints at the top, ends and all fixing penetrations must be sealed with a compatible sealant",
  ],
  limitations: [
    "Not suitable for coastal environments — specify stainless 316 for coastal locations",
    "Storm angles do not replace primary perimeter sealant — both must be correctly installed",
    "Aluminium does not bond to render without surface preparation — key or prime before rendering over",
    "Fixing penetrations through the angle must be sealed — unsealed fixing holes are water paths",
    "Not suitable for structurally failed perimeter joints — underlying cause must be addressed first",
  ],
  standardsNotes: [
    "No specific Australian Standard governs window storm angles — specify to project weatherproofing requirements",
    "AS/NZS 4284 — Testing of building facades (weatherproofing performance)",
    "NCC Volume One — facade weatherproofing performance requirements",
    "Manufacturer / supplier TDS — confirm material grade, finish and corrosion resistance",
  ],
  suitableDefects: [
    "Persistent water ingress at window frame perimeter joints despite sealant replacement",
    "Window frame perimeter joints that have repeatedly failed due to joint movement or substrate instability",
    "High-exposure window locations where primary sealant alone is insufficient for the wind-driven rain load",
    "Window head locations where head flashings cannot be installed and a storm angle is used instead",
  ],
  typicalSubstrates: [
    "Masonry — brick and block facades — angle fixed to masonry with stainless plugs and screws",
    "Render — fixed to render return or window frame with stainless fixings through render into substrate",
    "Aluminium window frames — angle fixed to frame with compatible stainless fasteners",
    "Not suitable for use with carbon steel or zinc-plated fasteners — bimetallic corrosion risk",
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
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm dimensions, finish and coastal suitability before ordering.</p>
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

export function StormAngleAlumIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are aluminium storm angle systems for windows?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Aluminium storm angles (also called cover angles or cover beads) are metal angle sections fixed at the perimeter of window and door frames to provide a secondary weather barrier at the frame-to-wall interface. They are installed over the top of the primary perimeter sealant and are used where the perimeter joint is persistently failing or where the building exposure requires a more robust weatherproofing detail than sealant alone.</p>
        {expanded && <p>A storm angle works by lapping over both the window frame and the adjacent render or masonry return, creating a physical barrier that deflects wind-driven rain away from the perimeter joint. The angle is sealed at its top and ends to the wall, with the open face of the angle protecting the sealant joint below. Aluminium storm angles are appropriate for non-coastal and low-to-moderate exposure environments — for coastal locations, specify stainless 316 angles as aluminium will corrode at cut edges and fastener points in salt-laden air over time. Storm angles are a supplementary measure — the primary perimeter sealant must still be correctly installed behind the angle. An angle installed over a failed, open perimeter joint will not prevent water entry through the joint at the open bottom of the angle.</p>}
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

export function StormAngleAlumProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — aluminium storm angle systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of aluminium storm angle systems. Confirm dimensions, finish and coastal suitability before specifying.</p>
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
