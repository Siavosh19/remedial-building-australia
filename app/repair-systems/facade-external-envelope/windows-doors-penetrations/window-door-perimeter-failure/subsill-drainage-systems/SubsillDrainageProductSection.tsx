"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag = "Aluminium" | "Subsill" | "Drainage" | "Weep-hole" | "Channel" | "Window" | "Sill" | "NCC" | "Coastal" | "Stainless-316";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Aluminium extrusion supplier / fabricator",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#dc2626",
    name: "Extruded aluminium subsill drainage channel",
    descriptionLine: "Purpose-designed extruded aluminium subsill drainage channel — installed at the underside of the window frame sill to collect and redirect water that passes through the frame-to-wall interface — incorporates weep outlets at the base — ex-stock or custom fabricated",
    productType: "Extruded aluminium subsill drainage channel — window sill",
    filterTags: ["Aluminium", "Subsill", "Drainage", "Channel", "Window", "Sill"],
    techChips: [
      { label: "Extruded aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Subsill channel", cls: "bg-sky-100 text-sky-800" },
      { label: "Weep outlets", cls: "bg-green-50 text-green-700" },
      { label: "Custom / ex-stock", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Extruded aluminium subsill drainage channels are installed at the underside of the window frame sill, between the sill and the wall opening, to capture water that penetrates through or around the frame sill and redirect it to the exterior through weep outlets at the base of the channel. The channel prevents water that has passed through the first line of defence from tracking back into the wall cavity or into the building interior. Channel profiles vary by manufacturer and supplier — some are purpose-designed with integral sill dams, weep outlet positions and sealant recesses; others are simple U-channel sections. Weep outlets must be drilled or punched at regular centres (typically 150–200mm) and must remain clear of blockage. The channel is set in a bed of compatible sealant and fixed with 316 stainless fasteners. All joints at ends, corners and at the frame seat must be sealed to prevent bypass. Anodised or powder-coated finish. Confirm channel dimensions suit the specific window sill width and frame geometry. TODO: owner confirm — confirm proprietary channel availability and preferred supplier before specifying.",
    technicalProperties: [
      "Purpose-designed extruded aluminium channel — installed under window frame sill",
      "Incorporates weep outlets at channel base — confirm outlet centres and clear from blockage",
      "Anodised or powder-coated finish — confirm colour match with frame or facade",
      "Fixed with 316 stainless fasteners — confirm all fixings are 316 grade",
      "Seals at channel ends and frame seat — all joints must be fully sealed",
      "Custom profiles and ex-stock sections available from aluminium extrusion suppliers",
    ],
    limitations: [
      "Weep outlets must remain clear — debris blockage will cause water ponding in the channel and bypass to the interior",
      "Not suitable for coastal locations without stainless 316 fixings and anodised (not powder-coat) finish",
      "Channel must be correctly sized for the sill width — undersized channel will not capture all water from the frame",
      "All joints at ends and corners must be sealed — any gap is a water bypass path",
      "Subsill drainage manages water that gets in — it does not replace primary perimeter sealant",
    ],
    procurementSources: [
      { name: "Capral Aluminium — extruded sections and custom profiles", url: "https://www.capral.com.au" },
      { name: "Stratco — building products and window flashings", url: "https://www.stratco.com.au" },
      { name: "TODO: owner confirm — confirm preferred supplier for subsill channel profiles", url: "https://www.capral.com.au" },
    ],
  },
  {
    fullLabel: "Building hardware supplier",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#0369a1",
    name: "Plastic / stainless weep hole inserts and drainage inserts",
    descriptionLine: "Purpose-designed weep hole inserts — plastic or stainless — installed in the mortar bed joint at the base of the window opening or in the sill course to allow water collected in the cavity or at the sill to escape — prevents mortar blockage of weep holes",
    productType: "Weep hole inserts — plastic or stainless — window sill drainage",
    filterTags: ["Subsill", "Drainage", "Weep-hole", "Window", "Sill", "Stainless-316"],
    techChips: [
      { label: "Weep inserts", cls: "bg-slate-100 text-slate-700" },
      { label: "Plastic / stainless", cls: "bg-sky-100 text-sky-800" },
      { label: "Mortar joint", cls: "bg-green-50 text-green-700" },
      { label: "Coastal: use SS type", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Weep hole inserts are small purpose-designed drainage devices installed in the mortar bed joint at the base of the window opening, in the sill course brickwork, or in the subsill zone to allow water that collects at the sill or in the cavity to escape to the exterior. Without weep hole inserts, mortar joints are often blocked by mortar squeeze-out during construction, preventing water from draining. Plastic weep hole inserts (typically HDPE or PVC) are suitable for inland and protected locations. Stainless 316 mesh or tube weep inserts should be specified for coastal locations. Weep hole inserts are commonly specified at 1 per half-brick course spacing (approximately 450mm centres) in the bed joint at the base of the window opening. They must be kept clear of mortar and debris — check and clean during maintenance inspections. Weep hole inserts are a simple and cost-effective solution for improving drainage at the window sill zone and are often used alongside a subsill drainage channel in windows with persistent water ingress problems.",
    technicalProperties: [
      "Purpose-designed weep inserts installed in mortar bed joint at sill course",
      "Plastic (HDPE/PVC) for inland locations — 316 stainless mesh or tube for coastal",
      "Spacing typically 450mm centres or 1 per half-brick module — confirm with project requirements",
      "Prevents mortar blocking of the weep hole — maintains clear drainage path",
      "Compatible with standard brick coursing and mortar joint widths",
      "Low-cost, simple installation — can be retrofitted by removing mortar and reinstating",
    ],
    limitations: [
      "Must be kept clear of mortar and debris — block weeps are a common maintenance failure",
      "Plastic inserts not suitable for coastal locations — specify 316 stainless mesh type for coastal",
      "Weep inserts drain water at the sill course — they do not prevent water penetrating through the perimeter joint",
      "Retrof itting into existing walls requires raking out mortar — confirm this is practicable before specifying",
      "Weep inserts at sill course must align with any subsill drainage channel if installed together",
    ],
    procurementSources: [
      { name: "Stratco — building products and hardware", url: "https://www.stratco.com.au" },
      { name: "Midway Metals — stainless weep mesh inserts", url: "https://www.midwaymetals.com.au" },
      { name: "Building hardware suppliers — plastic weep inserts ex-stock", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Drainage sock / geotextile supplier",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#7c3aed",
    name: "Drainage tube / sock drainage system at subsill",
    descriptionLine: "Slotted drainage tube or geotextile drainage sock installed at the window subsill zone — collects water from the frame-to-wall interface and directs it to a discharge point — used in concealed or cavity wall applications where a conventional channel is not accessible",
    productType: "Drainage tube / sock system — subsill window drainage",
    filterTags: ["Subsill", "Drainage", "Channel", "Window", "Sill", "NCC"],
    techChips: [
      { label: "Drainage sock / tube", cls: "bg-slate-100 text-slate-700" },
      { label: "Cavity drainage", cls: "bg-sky-100 text-sky-800" },
      { label: "Concealed install", cls: "bg-green-50 text-green-700" },
      { label: "TODO: confirm AU availability", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Slotted drainage tubes (perforated flexible tube wrapped in geotextile sock) are used in subsill drainage applications where a conventional aluminium channel cannot be installed due to access constraints or where the drainage needs to collect water from a wider area than a simple channel allows. The tube is installed at the base of the window reveal or at the sill zone and connected to a discharge point that exits to the exterior through a weep hole or drainage outlet. The geotextile sock prevents fine debris from entering the tube and blocking the drainage path. This type of drainage system is more commonly used in new-build cavity wall construction but can be adapted for remedial applications where access exists to the sill zone during window replacement or reveal opening. TODO: owner confirm — confirm applicability and preferred product for this application in Australian remedial practice before specifying.",
    technicalProperties: [
      "Slotted flexible drainage tube with geotextile sock — collects and redirects water from subsill zone",
      "Connected to exterior weep hole or drainage outlet — confirms clear discharge path",
      "Geotextile sock prevents fine debris from blocking the tube",
      "Suitable for concealed applications where conventional aluminium channel is not accessible",
      "Used in cavity wall construction — adaption for remedial sill applications requires access to sill zone",
      "TODO: owner confirm — confirm preferred product and applicability for Australian remedial practice",
    ],
    limitations: [
      "Requires access to the subsill zone for installation — typically during window replacement or reveal opening",
      "Discharge point must be clear and accessible — blocked discharge will cause water backup into the wall",
      "Less common in Australian remedial practice for windows — confirm applicability with design team",
      "Geotextile sock will block over time if not maintained — check and replace if drainage performance degrades",
      "TODO: owner confirm — confirm applicability, preferred product and Australian supplier before specifying",
    ],
    procurementSources: [
      { name: "Stratco — drainage and building products", url: "https://www.stratco.com.au" },
      { name: "TODO: owner confirm — confirm Australian supplier for subsill drainage tube/sock systems", url: "https://www.stratco.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Aluminium", label: "Aluminium" },
  { id: "Stainless-316", label: "316 Stainless" },
  { id: "Subsill", label: "Subsill" },
  { id: "Drainage", label: "Drainage" },
  { id: "Weep-hole", label: "Weep hole" },
  { id: "Channel", label: "Channel" },
  { id: "Window", label: "Window" },
  { id: "Sill", label: "Sill" },
];

const SYSTEM_COMPARISON = [
  { product: "Extruded aluminium subsill drainage channel", type: "Channel", material: "Aluminium extrusion", coastal: "Inland (anodised for coastal)", weep: "Drilled outlets", install: "At frame base", primaryUse: "Primary subsill drainage collection — most common remedial specification for window sill water ingress" },
  { product: "Weep hole inserts — plastic or stainless", type: "Weep inserts", material: "Plastic / SS 316", coastal: "SS type for coastal", weep: "Integral insert", install: "Mortar bed joint", primaryUse: "Drain collected water at sill course brickwork — simple and cost-effective retrofit for blocked weep holes" },
  { product: "Drainage tube / sock system", type: "Drainage tube", material: "PVC / geotextile", coastal: "Confirm", weep: "To discharge point", install: "Concealed at sill", primaryUse: "Cavity or concealed drainage where conventional channel cannot be installed — confirm AU applicability" },
];

const TECH_INFO = {
  typicalApplications: [
    "Collection and redirection of water penetrating through the window frame-to-wall sill interface",
    "Subsill drainage below aluminium sliding or awning window sills in masonry facades on strata buildings",
    "Secondary drainage measure used in combination with storm angles and head flashings for redundant weatherproofing",
    "Drainage of water at the sill zone where weep holes in the brickwork have become blocked by mortar or debris",
    "Water management at the base of window reveals where persistent sill-level water ingress has been identified",
  ],
  selectionCriteria: [
    "Select aluminium channel for accessible sill zones where the channel can be fitted under the frame",
    "Select stainless weep inserts for coastal locations — plastic inserts will degrade in salt-laden air over time",
    "Confirm the channel profile dimensions suit the specific window frame sill and opening geometry",
    "Weep outlets in any channel or insert system must be sized and spaced to drain the anticipated water volume",
    "All fixings must be 316 stainless — do not use carbon steel or zinc-plated fasteners at sill zones",
    "Weep outlets and discharge points must be visible and accessible for ongoing inspection and maintenance",
  ],
  limitations: [
    "Subsill drainage manages water that has penetrated the primary barrier — it is not a substitute for a correctly sealed perimeter joint",
    "Weep holes and outlets must be kept clear — maintenance is essential for continued drainage performance",
    "The discharge point must exit to the exterior — do not allow collected water to drain into the wall cavity",
    "Channel sizing must accommodate the anticipated water flow — an undersized channel will overflow",
    "Not effective if the water ingress is occurring above the sill — confirm the source of the defect before specifying",
  ],
  standardsNotes: [
    "NCC Volume One — facade water management and drainage performance requirements",
    "AS/NZS 4284 — testing of building facades — water penetration performance",
    "AS 3700 — masonry structures — weep holes and cavity drainage requirements",
    "Manufacturer / supplier TDS — confirm channel dimensions, outlet spacing and installation requirements",
  ],
  suitableDefects: [
    "Water ingress at the window sill zone where the primary perimeter sealant has been repaired but water continues to enter",
    "Sill-level water ponding in the window reveal or frame due to blocked or absent weep holes in the brickwork",
    "Persistent water staining or damp patches at or below window sill level on the interior",
    "Window sill joint failure in high-exposure locations where a secondary drainage system is required",
  ],
  typicalSubstrates: [
    "Masonry — brick and block facades — channel installed in sill reveal or at frame base in masonry opening",
    "Rendered masonry — channel installed under frame sill in render return zone",
    "Aluminium window frame sill — channel fitted below frame and sealed at frame-to-channel junction",
    "Not suitable as a standalone measure where structural defects are causing water ingress — address structural cause first",
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
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm channel dimensions, coastal suitability and weep outlet spacing before ordering.</p>
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

export function SubsillDrainageIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are subsill drainage systems for windows?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Subsill drainage systems collect and redirect water that has penetrated through or around the window frame sill joint, preventing it from tracking back into the wall cavity or into the building interior. They are a secondary drainage measure — not a substitute for a correctly installed primary perimeter sealant — and are used where the volume or persistence of sill-level water ingress requires a managed drainage path.</p>
        {expanded && <p>In masonry facade buildings, water at the window sill zone can accumulate from several sources: wind-driven rain penetrating through the frame-to-wall perimeter joint; condensation draining from the frame; or water tracking in from above that is not fully intercepted by the head flashing or storm angle. Subsill drainage systems — whether aluminium channels, weep hole inserts in the brickwork, or drainage tubes — capture this water and direct it to the exterior through weep outlets. The weep outlets must be kept clear of mortar, debris and paint — blocked weeps are a common maintenance failure that undermines the drainage system. Subsill drainage is most effective when combined with correctly maintained primary perimeter sealant and appropriate head protection (flashings or storm angles) above the window.</p>}
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

export function SubsillDrainageProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — subsill drainage systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of subsill drainage systems. Confirm channel dimensions and weep outlet spacing before ordering.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Weep</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Install</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.weep}</td>
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
