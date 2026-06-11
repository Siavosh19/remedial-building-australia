"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Epoxy" | "Timber" | "Consolidant" | "Hardener" | "Filler" | "Two-part" | "Paintable" | "Exterior" | "Rot-repair" | "Non-structural";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Selleys Australia",
    brandUrl: "https://www.selleys.com.au",
    accentColor: "#dc2626",
    name: "Selleys Rot Doctor Timber Hardener",
    descriptionLine: "Low-viscosity timber consolidant and hardener — penetrates and stabilises soft, punky or partially decayed timber — applied before epoxy filler to create a sound substrate for filler application — widely available in Australia",
    productType: "Timber consolidant / hardener — pre-filler treatment",
    filterTags: ["Timber", "Consolidant", "Hardener", "Exterior", "Rot-repair", "Non-structural"],
    techChips: [
      { label: "Consolidant", cls: "bg-slate-100 text-slate-700" },
      { label: "Penetrating", cls: "bg-sky-100 text-sky-800" },
      { label: "Pre-filler", cls: "bg-green-50 text-green-700" },
      { label: "Non-structural", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Selleys Rot Doctor Timber Hardener is a low-viscosity, penetrating timber consolidant used to stabilise soft, punky or partially decayed timber before applying epoxy filler. It soaks into damaged timber fibres and hardens them, restoring a firm, bondable substrate for the subsequent filler application. In window frame remediation on Australian strata buildings, the hardener is brushed or poured onto the affected area, allowed to penetrate and cure, and then the softened material is removed and epoxy filler applied. The hardener alone does not restore the profile of the timber — it must be used as a system with a compatible epoxy filler. Confirm compatibility with the intended epoxy filler system before use. TODO: owner confirm — confirm current product formulation, application method and compatibility with intended filler system from the current Selleys TDS.",
    technicalProperties: [
      "Low-viscosity — penetrates and consolidates soft, decayed timber fibres",
      "Creates a firm, bondable substrate for subsequent epoxy filler application",
      "Applied by brush, roller or pour depending on site access and area size",
      "Widely available through Bunnings and hardware trade channels in Australia",
      "Cure time before filler application — confirm from current TDS",
      "TODO: owner confirm — confirm full application instructions from current Selleys TDS",
    ],
    limitations: [
      "Not a structural repair — does not restore load-bearing capacity of decayed timber",
      "Must be used with compatible epoxy filler — does not restore timber profile alone",
      "Do not apply on wet or saturated timber — moisture must be removed and substrate dried first",
      "Identify and eliminate the moisture source before applying — hardener does not prevent future decay if moisture ingress continues",
      "TODO: owner confirm — confirm all application parameters from current Selleys TDS",
    ],
    procurementSources: [
      { name: "Selleys Australia", url: "https://www.selleys.com.au" },
      { name: "Bunnings Warehouse — retail and trade", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 — hardware trade", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "Selleys Australia",
    brandUrl: "https://www.selleys.com.au",
    accentColor: "#0369a1",
    name: "Selleys Knead It Wood",
    descriptionLine: "Two-part epoxy putty filler for timber — knead to activate — used to restore the profile of localised rot areas in timber window frames — sandable and paintable when cured — widely available in Australia",
    productType: "Two-part epoxy putty filler — timber profile restoration",
    filterTags: ["Epoxy", "Timber", "Filler", "Two-part", "Paintable", "Exterior", "Rot-repair", "Non-structural"],
    techChips: [
      { label: "Two-part epoxy", cls: "bg-slate-100 text-slate-700" },
      { label: "Knead to mix", cls: "bg-sky-100 text-sky-800" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "Non-structural", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Selleys Knead It Wood is a two-part epoxy putty used to restore the profile of localised rot damage and voids in timber window and door frames. Unlike conventional wood fillers, Knead It Wood uses a two-part epoxy system that is activated by kneading the two components together — no mixing equipment required. Once applied, it can be shaped and tooled before it sets, and when cured it can be sanded, drilled and painted like timber. It is suitable for exterior use and is compatible with most architectural paints. Apply to timber that has been treated with a timber hardener/consolidant first. Knead It Wood is non-structural — it restores surface profile only and is not suitable for load-bearing timber repair. Remove all decayed material before application and apply to clean, dry, stable timber. TODO: owner confirm — confirm exterior suitability, working time and cure time from current Selleys TDS.",
    technicalProperties: [
      "Two-part epoxy — activated by hand-kneading — no mixing tools required",
      "Restores the profile of localised rot areas in timber window and door frames",
      "Sandable, drillable and paintable when cured — can be finished to match surrounding timber",
      "Suitable for exterior use with most architectural paint systems",
      "Relatively short working time — work quickly and shape before the pot life expires",
      "TODO: owner confirm — confirm working time, cure time and exterior suitability from current TDS",
    ],
    limitations: [
      "Not a structural repair — does not restore load-bearing capacity or structural integrity of timber",
      "Apply to treated, stable substrate only — will not arrest or prevent ongoing decay",
      "Remove all soft, punky or decayed material before application — do not fill over active rot",
      "Not suitable for large voids (>25mm depth without backing) without formwork or backer",
      "TODO: owner confirm — confirm maximum repair volume, working time and full application instructions from TDS",
    ],
    procurementSources: [
      { name: "Selleys Australia", url: "https://www.selleys.com.au" },
      { name: "Bunnings Warehouse — retail and trade", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 — hardware trade", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "PC Products (via Australian distributors)",
    brandUrl: "https://www.pcepoxy.com",
    accentColor: "#7c3aed",
    name: "PC Products PC-Woody Epoxy Paste",
    descriptionLine: "Two-part epoxy wood filler paste — trowel-applied — suitable for larger timber repair voids and window frame profile restoration — sandable and paintable — used in commercial and strata timber frame remediation",
    productType: "Two-part epoxy paste filler — timber profile restoration",
    filterTags: ["Epoxy", "Timber", "Filler", "Two-part", "Paintable", "Exterior", "Rot-repair", "Non-structural"],
    techChips: [
      { label: "Two-part epoxy", cls: "bg-slate-100 text-slate-700" },
      { label: "Trowel applied", cls: "bg-sky-100 text-sky-800" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "Non-structural", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "PC-Woody by PC Products is a two-part epoxy paste used to restore the profile of localised rot damage in timber window and door frames. It is trowel-applied, allowing larger repair areas to be filled and profiled than is practical with hand-mixed putty systems. When cured, it can be sanded, planed, drilled, nailed and painted. PC-Woody is compatible with PC-Petrifier timber hardener as a system — apply the hardener to stabilise the decayed area first, then fill with PC-Woody. Confirm Australian distribution availability before specifying — PC Products is a US manufacturer and Australian distributor coverage should be verified. Confirm the specific repair requirements, working time and cure time from the current PC Products TDS. TODO: owner confirm — confirm Australian distribution availability and confirm all application parameters from the current TDS before specifying.",
    technicalProperties: [
      "Two-part epoxy paste — trowel or spatula applied — suitable for larger repair areas",
      "Sandable, planeable, drillable and paintable when cured",
      "Compatible with PC-Petrifier timber hardener as a system",
      "Suitable for exterior timber applications — confirm UV and moisture resistance from TDS",
      "Can be applied in multiple coats for deep repairs — confirm from TDS",
      "TODO: owner confirm — confirm working time, cure time and application requirements from current TDS",
    ],
    limitations: [
      "Not a structural repair — restores surface profile only",
      "Confirm Australian distribution before specifying — PC Products is a US manufacturer",
      "Remove all decayed material and apply to clean, treated, dry timber only",
      "Not suitable for permanently submerged or continuously wet applications",
      "TODO: owner confirm — confirm Australian availability and all application parameters with the local distributor",
    ],
    procurementSources: [
      { name: "PC Products — US manufacturer (confirm AU distributor)", url: "https://www.pcepoxy.com" },
      { name: "Bauset — check AU availability", url: "https://www.bayset.com.au" },
      { name: "TODO: owner confirm — confirm Australian distributor before specifying", url: "https://www.pcepoxy.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Epoxy", label: "Epoxy" },
  { id: "Timber", label: "Timber" },
  { id: "Consolidant", label: "Consolidant" },
  { id: "Hardener", label: "Hardener" },
  { id: "Filler", label: "Filler" },
  { id: "Two-part", label: "Two-part" },
  { id: "Paintable", label: "Paintable" },
  { id: "Exterior", label: "Exterior" },
  { id: "Rot-repair", label: "Rot repair" },
  { id: "Non-structural", label: "Non-structural" },
];

const SYSTEM_COMPARISON = [
  { product: "Rot Doctor Timber Hardener", brand: "Selleys", type: "Consolidant", mixing: "Ready to apply", paintable: "N/A (pre-treatment)", repair: "Pre-filler only", primaryUse: "Stabilise and harden decayed timber before filler application" },
  { product: "Knead It Wood", brand: "Selleys", type: "Epoxy putty", mixing: "Hand knead", paintable: "Yes", repair: "Small localised voids", primaryUse: "Small to medium timber frame void filling — knead-to-activate system" },
  { product: "PC-Woody Epoxy Paste", brand: "PC Products", type: "Epoxy paste", mixing: "Two-part mix", paintable: "Yes", repair: "Medium to larger voids", primaryUse: "Larger timber repair areas — confirm AU distributor before specifying" },
];

const TECH_INFO = {
  typicalApplications: [
    "Localised rot repair at window sill corners and frame base sections on timber-framed windows",
    "Profile restoration at decayed or weathered timber window and door head and jamb sections",
    "Repair of localised soft spots in timber door frames before perimeter sealant replacement",
    "Filling voids created by removal of decayed or insect-affected timber in window frames",
    "Pre-paint repair of timber window frames where localised decay is confirmed to be non-structural",
  ],
  selectionCriteria: [
    "Always apply timber hardener/consolidant first to stabilise soft or punky timber before applying filler",
    "Select a filler appropriate to the repair volume — putty systems for small areas, paste systems for larger fills",
    "Confirm the repair is non-structural before specifying epoxy filler — load-bearing members require timber replacement",
    "Eliminate the moisture source before applying — filler will not prevent decay from continuing if water ingress is unresolved",
    "Confirm paintability with the intended paint system from the filler manufacturer TDS",
  ],
  limitations: [
    "Epoxy wood filler is not a structural repair — does not restore load-bearing capacity or stiffness",
    "Not suitable as a permanent repair where the moisture source is not identified and eliminated",
    "Not suitable for large structural voids — full timber section replacement required",
    "Not suitable for timber species with high oil content without specific primer — test first",
    "Not suitable for permanently submerged or continuously wet applications",
  ],
  standardsNotes: [
    "No specific Australian Standard governs epoxy timber repair — confirm suitability from manufacturer TDS",
    "NCC Volume One — structural adequacy of load-bearing members must be independently assessed",
    "AS 1604 — Specification for preservative treatment of timber (relevant to underlying decay assessment)",
    "Manufacturer TDS — confirm all application parameters, working time and cure time before use",
  ],
  suitableDefects: [
    "Localised rot damage at window frame sills, corners and base sections — confirmed non-structural",
    "Small voids and decay pockets in timber door frames not affecting structural capacity",
    "Soft, punky timber that has lost surface integrity but retains structural cross-section",
    "Weathered and eroded timber frame profiles requiring surface reinstatement before painting",
  ],
  typicalSubstrates: [
    "Hardwood and softwood timber window and door frames — confirm species compatibility from TDS",
    "Painted or primed timber — remove paint from repair area before applying consolidant and filler",
    "Partially decayed timber — stabilise with consolidant before applying filler",
    "Not suitable for metal, concrete or masonry — these products are timber-specific only",
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

export function EpoxyWoodIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are epoxy wood filler and timber hardener systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Epoxy wood filler and timber hardener systems are used in window and door frame remediation to repair localised rot damage in timber frames where the extent of decay is limited and does not compromise the structural integrity of the frame. These systems consist of two components: a penetrating timber hardener (consolidant) that stabilises soft or decayed timber, and an epoxy filler that restores the surface profile of the repaired area.</p>
        {expanded && <p>The standard application sequence is: remove all loose and decayed material by chiselling or scraping back to sound timber, apply timber hardener to the exposed area and allow it to penetrate and cure, then apply epoxy filler to restore the profile of the missing material. Once cured, the filler can be sanded, planed and painted to match the surrounding timber. Epoxy timber repair is a surface and profile repair — it is not a structural repair. Before specifying epoxy filler, the extent and cause of decay must be investigated. If the decay extends to load-bearing sections of the frame, the frame requires replacement. If the moisture source causing the decay is not eliminated, decay will continue beneath and around the repair. These systems are suitable for localised, non-structural decay in window sills, jamb corners and frame ends — not for widespread or deep structural decay.</p>}
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

export function EpoxyWoodProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — epoxy timber hardener and filler systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of epoxy timber repair systems. Confirm all product selections against current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Mixing</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Paintable</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Repair size</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.mixing}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.paintable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.repair}</td>
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
