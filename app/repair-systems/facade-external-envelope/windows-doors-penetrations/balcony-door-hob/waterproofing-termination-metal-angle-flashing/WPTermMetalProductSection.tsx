"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag = "Stainless-316" | "Aluminium" | "Termination-bar" | "Flashing" | "Hob" | "Balcony" | "AS-3740" | "Coastal" | "Waterproofing" | "Metal-angle";

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
    brandUrl: "https://www.atlassteels.com.au",
    accentColor: "#dc2626",
    name: "316L stainless steel waterproofing termination bar",
    descriptionLine: "316L stainless steel purpose-made termination bar — fixed at the top of the hob upstand to cap and protect the waterproofing membrane termination — used in coastal and high-exposure balcony locations — drilled for screws at typically 150mm centres and sealed with compatible sealant",
    productType: "316L stainless termination bar — waterproofing membrane termination",
    filterTags: ["Stainless-316", "Termination-bar", "Flashing", "Hob", "Balcony", "AS-3740", "Coastal", "Waterproofing", "Metal-angle"],
    techChips: [
      { label: "316L stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "Termination bar", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal OK", cls: "bg-green-50 text-green-700" },
      { label: "AS 3740", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "316L stainless steel termination bars are flat or angle section metal bars fixed along the top of the hob upstand to clamp and protect the waterproofing membrane termination edge. The membrane is taken up the face of the hob and turned over the top, and the termination bar is fixed over the membrane at the top of the hob with 316 stainless screws at typically 150mm centres. A compatible sealant is applied along the top edge of the termination bar to prevent water from tracking back under the bar and membrane. 316L stainless is specified for coastal and high-exposure locations — aluminium termination bars are used for inland locations. Termination bars are available as extruded aluminium or flat stainless bar from metal suppliers and building hardware suppliers — purpose-made termination profiles may also be available from waterproofing accessory suppliers. Confirm that the top of the bar is at or above the required NCC hob height above the waterproofed finished floor. All fixings must be 316 stainless. TODO: owner confirm — confirm preferred stainless termination bar profile and fixing centres before specifying.",
    technicalProperties: [
      "316L stainless flat bar or angle — termination bar for waterproofing membrane at hob top",
      "Fixed with 316L stainless screws at 150mm centres — confirm spacing with waterproofing spec",
      "Compatible sealant applied along top edge — prevents water tracking under the bar",
      "Membrane is taken up and over the hob and clamped under the bar — provides secure mechanical termination",
      "Suitable for coastal and high-exposure balcony locations — confirm 316L grade with supplier",
      "TODO: owner confirm — confirm preferred profile, fixing centres and sealant type",
    ],
    limitations: [
      "Confirm 316L not 304 grade with supplier — 304 not suitable for coastal locations",
      "Fixings must be 316 stainless — do not mix grades at coastal locations",
      "Sealant at top of bar must be continuous — any gap is a water entry point",
      "Bar must be at or above required NCC hob height — confirm height before installing",
      "TODO: owner confirm — confirm preferred termination bar profile and supplier",
    ],
    procurementSources: [
      { name: "Atlas Steels — stainless flat bar and sections", url: "https://www.atlassteels.com.au" },
      { name: "Midway Metals — stainless steel section supply", url: "https://www.midwaymetals.com.au" },
      { name: "Parchem Construction Supplies — waterproofing accessories", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Aluminium section / building hardware supplier",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#0369a1",
    name: "Aluminium waterproofing termination bar / angle flashing",
    descriptionLine: "Extruded aluminium termination bar or angle flashing — fixed at the top of the hob upstand to cap and protect the waterproofing membrane termination at inland balcony locations — anodised or powder-coated — fixed with 316 stainless screws and sealed with compatible sealant",
    productType: "Aluminium termination bar — waterproofing membrane termination — inland",
    filterTags: ["Aluminium", "Termination-bar", "Flashing", "Hob", "Balcony", "AS-3740", "Waterproofing", "Metal-angle"],
    techChips: [
      { label: "Extruded aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Termination bar", cls: "bg-sky-100 text-sky-800" },
      { label: "Inland only", cls: "bg-green-50 text-green-700" },
      { label: "Anodised / PC", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Extruded aluminium termination bars and angle flashings are used at the top of the hob upstand to clamp and protect the waterproofing membrane termination at inland, non-coastal balcony locations. Aluminium termination bars are available from aluminium extrusion suppliers and building hardware suppliers as flat bar, angle or purpose-designed profiles. The membrane is taken up and over the hob and the bar is fixed over the membrane termination with 316 stainless screws (all fixings must be 316 stainless even with aluminium profiles — to prevent corrosion at the fixing point). A compatible sealant is applied along the top edge of the bar. Anodised or powder-coated finish — confirm colour match with the balcony door frame or sill trim. Not suitable for coastal or marine-influenced locations — specify 316L stainless termination bars for coastal applications. Confirm profile dimensions suit the specific hob geometry. TODO: owner confirm — confirm preferred aluminium termination bar profile and supplier.",
    technicalProperties: [
      "Extruded aluminium termination bar or angle — for inland balcony hob waterproofing termination",
      "All fixings must be 316 stainless screws — even with aluminium profile, to prevent corrosion at the fixing",
      "Compatible sealant along top edge — prevents water tracking under the bar",
      "Anodised or powder-coated finish — confirm colour match",
      "Not suitable for coastal locations — specify 316L stainless for coastal",
      "TODO: owner confirm — confirm profile, supplier and coastal suitability before specifying",
    ],
    limitations: [
      "Not suitable for coastal or marine-influenced locations — corrodes at cut edges and fixing points in salt air",
      "All fixings must be 316 stainless — aluminium profile with inferior grade fixings will corrode at the fixing point",
      "Sealant along top of bar must be continuous — gaps allow water ingress under the termination",
      "Confirm colour match for anodised or powder-coated finish before ordering",
      "TODO: owner confirm — confirm supplier, profile and coastal suitability",
    ],
    procurementSources: [
      { name: "Capral Aluminium — extruded termination profiles and flat bar", url: "https://www.capral.com.au" },
      { name: "Stratco — building hardware and waterproofing accessories", url: "https://www.stratco.com.au" },
      { name: "Parchem Construction Supplies — waterproofing accessories", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Waterproofing accessories supplier",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c3aed",
    name: "Proprietary membrane termination profile — purpose-designed",
    descriptionLine: "Proprietary purpose-designed waterproofing membrane termination profile — includes integral sealant channel, screw fixing flange and drip nose — available from waterproofing accessory suppliers — confirm material grade for coastal suitability and compatibility with the membrane system before specifying",
    productType: "Proprietary WP termination profile — balcony hob — purpose-designed",
    filterTags: ["Termination-bar", "Flashing", "Hob", "Balcony", "AS-3740", "Waterproofing", "Metal-angle"],
    techChips: [
      { label: "Proprietary profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Integral sealant channel", cls: "bg-sky-100 text-sky-800" },
      { label: "Drip nose", cls: "bg-green-50 text-green-700" },
      { label: "TODO: confirm AU stock", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Proprietary waterproofing membrane termination profiles are purpose-designed extruded sections that provide an engineered termination detail at the top of the hob upstand. Unlike a simple flat bar, proprietary profiles typically include an integral sealant recess channel on the back leg (to lock in the top of the membrane), a screw fixing flange with pre-punched or pre-drilled fixing holes, and a drip nose on the front leg to prevent water tracking under the profile. These purpose-designed features provide a more reliable membrane termination than a simple flat bar, and reduce the risk of membrane peel or delamination at the top of the hob. Available from waterproofing accessory suppliers and specialised flashing manufacturers — confirm material grade (aluminium for inland, stainless 316 for coastal), Australian availability, compatibility with the specific membrane system and NCC hob height compliance before specifying. All fixings must be 316 stainless regardless of profile material. TODO: owner confirm — confirm specific proprietary profile, Australian supplier and material grade before specifying.",
    technicalProperties: [
      "Purpose-designed termination profile — integral sealant channel, fixing flange and drip nose",
      "Provides engineered membrane termination — reduces peel and delamination risk at hob top",
      "Available in aluminium (inland) or stainless 316 (coastal) — confirm material grade for exposure",
      "All fixings must be 316 stainless regardless of profile material",
      "Confirm compatibility with specific membrane system — some profiles require compatible sealant primer",
      "TODO: owner confirm — confirm profile, Australian supplier and material grade",
    ],
    limitations: [
      "Confirm Australian availability before specifying — not all proprietary termination profiles are stocked in Australia",
      "Confirm material grade for coastal suitability — aluminium profiles not suitable for coastal locations",
      "Confirm compatibility with the specific waterproofing membrane product before specifying",
      "Confirm NCC hob height compliance for the profile installed position",
      "TODO: owner confirm — confirm Australian supplier, material grade and membrane compatibility",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — waterproofing accessories and termination profiles", url: "https://www.parchem.com.au" },
      { name: "Atlas Steels — stainless termination profiles", url: "https://www.atlassteels.com.au" },
      { name: "TODO: owner confirm — confirm Australian supplier for specific proprietary termination profile", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Stainless-316", label: "316 Stainless" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Termination-bar", label: "Termination bar" },
  { id: "Coastal", label: "Coastal" },
  { id: "Metal-angle", label: "Metal angle" },
  { id: "Hob", label: "Hob" },
  { id: "Balcony", label: "Balcony" },
  { id: "AS-3740", label: "AS 3740" },
];

const SYSTEM_COMPARISON = [
  { product: "316L stainless termination bar", type: "Stainless bar", coastal: "Yes", ncc: "Confirm height", fixing: "316L SS screws @ 150mm", sealant: "Top edge sealed", primaryUse: "Coastal balcony hob WP membrane termination — 316L grade for marine environments" },
  { product: "Aluminium termination bar / angle", type: "Aluminium bar", coastal: "Inland only", ncc: "Confirm height", fixing: "316 SS screws @ 150mm", sealant: "Top edge sealed", primaryUse: "Inland balcony hob WP termination — anodised or PC finish — not coastal" },
  { product: "Proprietary termination profile", type: "Proprietary", coastal: "Confirm grade", ncc: "Confirm height", fixing: "316 SS screws", sealant: "Integral channel", primaryUse: "Purpose-designed profile with integral sealant channel and drip nose — confirm AU availability" },
];

const TECH_INFO = {
  typicalApplications: [
    "Capping and protecting the waterproofing membrane termination at the top of the balcony door hob upstand",
    "Mechanical clamping of the liquid-applied or sheet membrane termination edge to prevent peel or delamination",
    "Combined termination bar and drip detail at the hob top to prevent water tracking under the membrane",
    "Replacement of corroded or failed existing metal termination at the hob top as part of a waterproofing membrane replacement program",
    "Termination detail where the membrane cannot be tucked into a purpose-formed rebate in a pre-formed threshold profile",
  ],
  selectionCriteria: [
    "Specify 316L stainless for coastal and marine-influenced locations — aluminium termination bars corrode in salt air",
    "All fixings must be 316 stainless regardless of the termination bar material — no carbon steel or zinc-plated screws",
    "Sealant along the top of the bar must be compatible with the membrane and continuous — no gaps",
    "Bar position must place the top of the membrane at or above the NCC minimum hob height",
    "Confirm bar profile dimensions suit the specific hob geometry — both the leg that clamps the membrane and the fixing flange",
    "Confirm that the membrane product is compatible with the sealant used at the termination bar top edge",
  ],
  limitations: [
    "Termination bar alone does not make the membrane waterproof — the membrane system must be correctly installed beneath it",
    "Fixing holes through the bar are potential water paths — confirm each fixing is sealed at installation",
    "Bar must be continuous along the full hob length — any gaps in the bar leave the membrane termination exposed",
    "Aluminium bars are not suitable for coastal locations — must specify 316L stainless for coastal environments",
    "Confirm that the membrane is fully adhered behind the bar before fixing — a delaminated membrane behind the bar will allow water to bypass the termination",
  ],
  standardsNotes: [
    "AS 3740 — waterproofing of domestic wet areas — membrane termination requirements at hob upstands",
    "NCC Volume One — balcony waterproofing membrane termination height requirements",
    "AS 3700 — masonry structures — metal fixings grade for exposure environment",
    "Manufacturer TDS — confirm bar profile compatibility with specific membrane system and sealant",
  ],
  suitableDefects: [
    "Failed or absent membrane termination at the top of the balcony door hob where water is tracking under the membrane edge",
    "Corroded existing aluminium termination bar at coastal location requiring replacement with 316L stainless",
    "Membrane peel or delamination at the top of the hob due to missing or failed mechanical termination clamping",
    "Hob waterproofing termination installed as a sealant bead only (no bar) that has failed and requires upgrade to a mechanical termination",
  ],
  typicalSubstrates: [
    "Concrete hob — bar fixed to concrete hob face or top with 316 stainless screws into rawl plugs",
    "Cementitious repair mortar hob — confirm fixing pull-out in repair mortar before specifying standard screw centres",
    "Pre-formed aluminium or stainless threshold profile — bar fixed to profile with stainless screws or pop rivets of compatible grade",
    "Not suitable for use as the sole waterproofing measure — must be used in combination with a correctly installed membrane system",
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
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm material grade for coastal suitability and fixing centres before ordering.</p>
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

export function WPTermMetalIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are metal angle flashing systems for balcony hob waterproofing termination?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Metal termination bars and angle flashings are used at the top of the balcony door hob to mechanically clamp and protect the waterproofing membrane termination edge. They prevent the membrane from peeling back from the hob face due to UV exposure, thermal cycling and physical damage, and provide a defined and sealed termination point for the waterproofing system.</p>
        {expanded && <p>The termination bar is fixed over the membrane at the top of the hob upstand with screws at 150mm centres, and a compatible sealant is applied along the top edge of the bar to prevent water from tracking behind the bar and under the membrane. In coastal locations, 316L stainless steel termination bars are specified — aluminium bars corrode at cut edges and fixing points in salt-laden coastal air and should not be used in marine-influenced environments. The fixing points through the bar are potential water paths — each fixing must be sealed. The bar must be continuous along the full length of the hob — any gap in the bar exposes the membrane termination edge to UV and physical damage.</p>}
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

export function WPTermMetalProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — metal angle flashing termination systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of metal termination bar systems. Confirm material grade for coastal suitability before ordering.</p>
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
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Fixing</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Sealant</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fixing}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sealant}</td>
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
