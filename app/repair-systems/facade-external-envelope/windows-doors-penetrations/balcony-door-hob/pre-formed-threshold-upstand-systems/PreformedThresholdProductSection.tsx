"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag = "Aluminium" | "Stainless-316" | "Threshold" | "Upstand" | "Hob" | "Balcony" | "Pre-formed" | "NCC" | "Composite" | "AS-3740";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Aluminium extrusion / flashings supplier",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#dc2626",
    name: "Extruded aluminium pre-formed threshold upstand profile",
    descriptionLine: "Purpose-designed extruded aluminium pre-formed threshold upstand — installed at the balcony door sill to provide a structural hob form and waterproofing termination point — integrates with liquid-applied or sheet membrane systems — confirm profile dimensions with NCC hob height requirements",
    productType: "Pre-formed aluminium threshold upstand — balcony door hob",
    filterTags: ["Aluminium", "Threshold", "Upstand", "Hob", "Balcony", "Pre-formed", "NCC"],
    techChips: [
      { label: "Extruded aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-formed threshold", cls: "bg-sky-100 text-sky-800" },
      { label: "WP integration", cls: "bg-green-50 text-green-700" },
      { label: "Confirm NCC height", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Pre-formed extruded aluminium threshold upstand profiles are purpose-designed sections that are installed at the balcony door sill to form the hob in a single piece rather than casting or building up the hob in cementitious mortar. The aluminium section provides a structural substrate for the waterproofing membrane termination, incorporates a positive waterproofing termination at the top of the upstand, and often includes an integral sill drainage channel or weep outlet feature. The profile is fixed to the concrete slab or substrate with 316 stainless screws in a bed of compatible sealant, and the waterproofing membrane is then applied up and over the upstand to terminate at or above the top of the profile. The profile height must comply with the NCC and the project waterproofing specification for the finished hob height above the waterproofed surface. Anodised or powder-coated finish — confirm colour and coastal requirements with the supplier. All fixings must be 316 stainless. Confirm specific profile dimensions and compatibility with the waterproofing system before specifying. TODO: owner confirm — confirm preferred proprietary aluminium threshold profile and supplier before specifying.",
    technicalProperties: [
      "Pre-formed extruded aluminium threshold profile — provides structural hob form in one section",
      "Integral waterproofing termination detail — membrane terminates at or above the top of the upstand",
      "Fixed with 316 stainless screws in a bed of compatible sealant — all fixings 316 grade",
      "Anodised or powder-coated finish — confirm colour and coastal requirements",
      "Profile height must comply with NCC and project WP specification",
      "TODO: owner confirm — confirm specific profile and compatible waterproofing system",
    ],
    limitations: [
      "Hob height must comply with NCC minimum — confirm profile height before ordering",
      "Not suitable for coastal locations without anodised finish and 316 stainless fixings",
      "Profile must be compatible with the specific waterproofing membrane system — confirm with WP manufacturer",
      "Sealant bed under profile must be continuous — any gap is a water bypass path",
      "TODO: owner confirm — confirm supplier, profile dimensions and NCC compliance before specifying",
    ],
    procurementSources: [
      { name: "Capral Aluminium — extruded threshold profiles and custom sections", url: "https://www.capral.com.au" },
      { name: "Stratco — building threshold and flashing products", url: "https://www.stratco.com.au" },
      { name: "TODO: owner confirm — confirm Australian supplier for specific pre-formed threshold profile", url: "https://www.capral.com.au" },
    ],
  },
  {
    fullLabel: "Metal fabricator / steel supplier",
    brandUrl: "https://www.atlassteels.com.au",
    accentColor: "#0369a1",
    name: "316L stainless steel pre-formed upstand angle / threshold profile",
    descriptionLine: "316L stainless steel pre-formed upstand angle or purpose-fabricated threshold profile — used in coastal or high-exposure balcony door hob applications where aluminium is not suitable — fixed in sealant bed with 316 stainless fixings — confirm dimensions for NCC hob height compliance",
    productType: "316L stainless pre-formed threshold upstand — coastal hob application",
    filterTags: ["Stainless-316", "Threshold", "Upstand", "Hob", "Balcony", "Pre-formed", "NCC", "AS-3740"],
    techChips: [
      { label: "316L stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-formed upstand", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal OK", cls: "bg-green-50 text-green-700" },
      { label: "Confirm NCC height", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "316L stainless steel pre-formed upstand angles or threshold profiles are used in coastal and high-exposure balcony door hob applications where an aluminium threshold profile would corrode over the design life. A 316L stainless equal angle (e.g., 50×50×3mm or similar, depending on the required hob height) is used as a pre-formed upstand, fixed to the slab in a bed of compatible sealant with 316 stainless screws. The waterproofing membrane is taken up and over the upstand and terminates at or above the top of the angle. In some applications, a custom fabricated stainless channel or angle with welded end caps is used to form a continuous waterproof trough at the threshold. Confirm profile height meets NCC minimum hob height requirement for the specific application. All fixings must be 316L stainless (not 304). Confirm membrane-to-stainless adhesion with the waterproofing manufacturer — some membranes require a primer for adhesion to stainless steel. TODO: owner confirm — confirm preferred profile configuration and waterproofing system compatibility before specifying.",
    technicalProperties: [
      "316L stainless steel upstand angle or custom profile — suitable for coastal and high-exposure locations",
      "Fixed in bed of compatible sealant with 316L stainless screws — all fixings 316L grade",
      "Waterproofing membrane taken up and over upstand — confirm membrane adhesion to stainless with WP manufacturer",
      "Profile height must meet NCC minimum hob height — confirm before fabricating",
      "Custom profiles may require end caps and welding — confirm with fabricator",
      "TODO: owner confirm — confirm profile configuration and NCC compliance before specifying",
    ],
    limitations: [
      "Confirm 316L not 304 grade with supplier — 304 not adequate for coastal locations",
      "Membrane adhesion to stainless may require primer — confirm with waterproofing manufacturer before specifying",
      "Custom fabrication required for profile with end caps — allow lead time",
      "Hob height must comply with NCC minimum — confirm profile dimensions before ordering",
      "TODO: owner confirm — confirm profile dimensions, grade and WP compatibility before ordering",
    ],
    procurementSources: [
      { name: "Atlas Steels — stainless sections and fabrication", url: "https://www.atlassteels.com.au" },
      { name: "Midway Metals — stainless section supply", url: "https://www.midwaymetals.com.au" },
      { name: "Local stainless fabricator — custom threshold profiles with end caps", url: "https://www.atlassteels.com.au" },
    ],
  },
  {
    fullLabel: "Proprietary threshold / supplier",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#7c3aed",
    name: "Composite pre-formed threshold upstand system",
    descriptionLine: "Proprietary composite threshold upstand system — combines structural profile, integral drainage and waterproofing termination in a purpose-designed unit — available from specialist waterproofing and threshold suppliers — confirm AU availability and NCC compliance before specifying",
    productType: "Composite threshold upstand system — balcony door hob",
    filterTags: ["Threshold", "Upstand", "Hob", "Balcony", "Pre-formed", "NCC", "Composite"],
    techChips: [
      { label: "Composite system", cls: "bg-slate-100 text-slate-700" },
      { label: "Integral drainage", cls: "bg-sky-100 text-sky-800" },
      { label: "WP termination", cls: "bg-green-50 text-green-700" },
      { label: "TODO: confirm AU stock", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Proprietary composite threshold upstand systems are purpose-designed products that combine a structural threshold profile, integral drainage channel, waterproofing termination rebate and often a door frame sill seal in a single pre-engineered unit. These systems are designed to provide a complete balcony door hob solution without the need for formwork and concrete construction. They are available from specialist waterproofing supply companies and building hardware suppliers. The composite unit is fixed to the slab in a bed of sealant and the waterproofing membrane terminates into a pre-formed rebate in the profile. Drainage is managed through an integral weep channel that exits through the profile to the exterior. Confirm Australian availability, NCC hob height compliance, coastal suitability of materials and compatibility with the specific waterproofing system before specifying. TODO: owner confirm — confirm specific proprietary product, Australian supplier and NCC compliance before specifying.",
    technicalProperties: [
      "Purpose-designed composite threshold unit — integrates structural form, drainage and WP termination",
      "Fixed in sealant bed — confirm compatible sealant with the proprietary system manufacturer",
      "Integral weep drainage — maintains drainage without additional weep hole insertion",
      "Pre-formed WP termination rebate — confirms compatible termination with membrane system",
      "TODO: owner confirm — confirm Australian supplier, NCC compliance and coastal suitability",
    ],
    limitations: [
      "Confirm Australian availability before specifying — some proprietary threshold systems are not stocked in Australia",
      "Confirm NCC hob height compliance for the specific profile before ordering",
      "Confirm coastal suitability of all components — aluminium composite profiles not suitable for marine environments",
      "Confirm compatibility with the specific waterproofing membrane system before specifying",
      "TODO: owner confirm — confirm Australian supplier, product and NCC compliance",
    ],
    procurementSources: [
      { name: "Stratco — building threshold and flashing products", url: "https://www.stratco.com.au" },
      { name: "Parchem Construction Supplies — waterproofing accessories", url: "https://www.parchem.com.au" },
      { name: "TODO: owner confirm — confirm Australian supplier for specific composite threshold system", url: "https://www.stratco.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Aluminium", label: "Aluminium" },
  { id: "Stainless-316", label: "316 Stainless" },
  { id: "Threshold", label: "Threshold" },
  { id: "Upstand", label: "Upstand" },
  { id: "Pre-formed", label: "Pre-formed" },
  { id: "Composite", label: "Composite" },
  { id: "Hob", label: "Hob" },
  { id: "NCC", label: "NCC" },
];

const SYSTEM_COMPARISON = [
  { product: "Extruded aluminium threshold profile", type: "Aluminium extrusion", coastal: "Inland (anodised)", ncc: "Confirm height", wptermination: "At top of upstand", install: "Sealant bed + SS fixings", primaryUse: "Non-coastal balcony door hob — single-piece pre-formed aluminium threshold upstand" },
  { product: "316L stainless upstand angle / profile", type: "316L stainless", coastal: "Yes", ncc: "Confirm height", wptermination: "Up and over angle", install: "Sealant bed + SS fixings", primaryUse: "Coastal balcony door hob — 316L stainless angle or custom profile for marine environments" },
  { product: "Composite threshold upstand system", type: "Composite proprietary", coastal: "Confirm", ncc: "Confirm height", wptermination: "Integral rebate", install: "Sealant bed", primaryUse: "Integrated threshold system with drainage — confirm AU availability and NCC compliance" },
];

const TECH_INFO = {
  typicalApplications: [
    "Pre-formed threshold upstand at balcony door hob in lieu of formed concrete — faster installation and controlled dimensions",
    "Replacement of failed or inadequate concrete hob with a pre-formed metallic upstand in remedial waterproofing programs",
    "Threshold upstand in coastal and high-exposure balcony locations where stainless 316 is required",
    "Hob formation where access constraints prevent conventional concrete forming and curing",
    "Combined hob and waterproofing termination detail in a single pre-engineered unit",
  ],
  selectionCriteria: [
    "Confirm profile height meets NCC minimum hob height above finished waterproofed floor surface",
    "Specify 316L stainless for coastal locations — aluminium profiles are not suitable for marine environments",
    "Confirm compatibility of the threshold profile with the specific waterproofing membrane system",
    "All fixings must be 316 stainless — confirm fixings grade matches the threshold profile material grade",
    "Profile must be installed in a continuous bed of compatible sealant — no gaps at the sealant bed",
    "Confirm drain discharge point is accessible and will remain clear in service",
  ],
  limitations: [
    "Hob height must comply with NCC minimum — confirm profile height before ordering and installing",
    "Pre-formed profiles require correct sizing for the specific door opening — measure before ordering",
    "Aluminium profiles are not suitable for coastal environments — specify 316L stainless for coastal",
    "Waterproofing membrane-to-profile adhesion must be confirmed with the WP manufacturer — may require primer",
    "Composite systems require confirmation of Australian availability before specifying",
  ],
  standardsNotes: [
    "NCC Volume One — balcony and external door threshold height and drainage requirements",
    "AS 3740 — waterproofing of domestic wet areas — hob and threshold height requirements",
    "AS 3700 — masonry structures — metal fixings grade for exposure environment",
    "Manufacturer / supplier TDS — confirm profile dimensions, coastal suitability and installation requirements",
  ],
  suitableDefects: [
    "Absent or inadequate balcony door hob where the threshold upstand height does not comply with NCC",
    "Failed or corroded concrete or masonry hob requiring replacement in remedial waterproofing programs",
    "Hob in coastal or high-exposure location where existing metalwork has corroded and requires replacement with 316 stainless",
    "Hob formation where rapid installation is required and a pre-formed profile reduces programme risk vs. concrete forming",
  ],
  typicalSubstrates: [
    "Concrete balcony slab — profile fixed to slab in sealant bed with 316 stainless screws into rawl plugs",
    "Masonry substrate — confirm fixing anchor type and pull-out capacity before installing",
    "Not suitable for substrates with active water movement at the fixing point — address water before installing",
    "Not suitable for installation over existing waterproofing membrane — remove to bare substrate at fixing locations",
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
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm profile height for NCC compliance, coastal suitability and WP system compatibility before ordering.</p>
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

export function PreformedThresholdIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are pre-formed threshold upstand systems for balcony doors?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Pre-formed threshold upstand systems are metallic or composite profiles installed at the balcony door sill to form the hob without the need for concrete formwork and curing. They provide a controlled, dimensionally accurate hob height and an integral waterproofing termination point, making them particularly suited to remedial programs where programme time is critical and concrete forming is impractical.</p>
        {expanded && <p>In remedial balcony waterproofing work, the balcony door hob is often replaced as part of a complete waterproofing membrane system replacement. Pre-formed threshold profiles allow the hob to be installed rapidly, without the waiting time for concrete to cure, and provide a reliable waterproofing termination detail. The profile height must comply with the NCC minimum threshold height requirement — for external balconies in Class 2 buildings this is typically set out in NCC Volume One. All metalwork in the system — the profile, fixings and adjacent flashings — must be of compatible grade for the exposure environment. In coastal locations, 316L stainless is required; aluminium profiles should be specified for inland locations only unless confirmed otherwise with the supplier.</p>}
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

export function PreformedThresholdProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — pre-formed threshold upstand systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of pre-formed threshold upstand systems. Confirm NCC hob height compliance and coastal suitability before ordering.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">NCC height</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">WP termination</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Install</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.ncc}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.wptermination}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.install}</td>
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
