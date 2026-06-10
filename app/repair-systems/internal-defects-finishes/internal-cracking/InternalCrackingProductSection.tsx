"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Crack-filler"
  | "Flexible"
  | "Acrylic"
  | "PU"
  | "Sealant"
  | "1C"
  | "Paintable"
  | "Plasterboard"
  | "Render"
  | "Interior"
  | "Movement-joint";

type Product = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Selleys",
    brandUrl: "https://www.selleys.com.au",
    tdsUrl: "https://www.selleys.com.au/sealants-adhesives/fillers/no-more-gaps-flexible-filler/",
    accentColor: "#ef4444",
    name: "Selleys No More Gaps Interior Multipurpose",
    descriptionLine:
      "Water-based acrylic gap filler for internal plasterboard and render cracks — paintable over once cured, low odour, suitable for cornices and joints",
    productType: "Acrylic gap filler for internal cracks",
    filterTags: ["Crack-filler", "Flexible", "Acrylic", "Paintable", "Plasterboard", "Interior"],
    techChips: [
      { label: "Flexible acrylic", cls: "bg-sky-100 text-sky-800" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "Interior use", cls: "bg-slate-100 text-slate-700" },
      { label: "Low odour", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Selleys No More Gaps Interior Multipurpose is a water-based acrylic gap filler widely used in Australian residential and strata apartment buildings for filling dormant hairline and fine cracks in plasterboard, render, cornices, and internal joints. Water-based formulation — low odour, easy clean-up with water, and paintable once fully cured with standard interior paint systems. Suitable for movement-related hairline cracks at cornice junctions, butt joints in plasterboard, and fine render surface cracks.\n\nNot suitable for active (moving) cracks, wet area applications, or cracks wider than approximately 5mm without backing. Crack must be dormant — active cracks will re-crack through the filler. For movement joints and wider cracks, use a PU sealant with backer rod.",
    technicalProperties: [
      "Water-based flexible acrylic — low odour, easy water clean-up during application",
      "Paintable once fully cured with standard interior acrylic paint systems",
      "Suitable for hairline to fine cracks in plasterboard, render, and cornices",
      "Flexible formulation — accommodates minor thermal movement in internal building substrates",
      "Readily available at hardware and paint trade suppliers nationally",
    ],
    limitations: [
      "Not suitable for active or moving cracks — filling an active crack will result in re-cracking",
      "Not suitable for wet area applications — use a sanitary silicone or PU sealant in wet areas",
      "Not a structural repair — do not use on structural cracks or cracks with differential displacement",
      "May shrink slightly on drying for deeper fills — allow full cure before painting",
      "Confirm current product specification with Selleys before specifying",
    ],
    procurementSources: [
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Selleys Australia — trade and retail distribution", url: "https://www.selleys.com.au" },
      { name: "Mitre 10 — in-store and online", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "Sika",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/sealing-bonding/joint-sealants/sikaflex-111-stick-and-seal.html",
    accentColor: "#3b82f6",
    name: "Sikaflex-111 Stick & Seal",
    descriptionLine:
      "1-part silane-terminated polymer flexible adhesive-sealant for internal movement joints and crack repair in render and masonry — overpaintable, accommodates thermal movement",
    productType: "1-part flexible STP sealant for internal movement joints",
    filterTags: ["Sealant", "PU", "1C", "Flexible", "Paintable", "Render", "Interior", "Movement-joint"],
    techChips: [
      { label: "1-part STP sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture-cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Overpaintable", cls: "bg-green-50 text-green-700" },
      { label: "Movement joint", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikaflex-111 Stick & Seal is a 1-component moisture-curing flexible adhesive-sealant based on silane-terminated polymer technology used for movement joints and crack repair in internal render and masonry surfaces. Suitable for wider internal cracks and movement joints where a flexible acrylic filler does not provide sufficient movement accommodation — accommodates ongoing thermal movement and is overpaintable once cured with compatible interior paint systems. Bonds to a wide variety of substrates including concrete, masonry, ceramic, wood, metal and plastics without primer in most cases.\n\nFor active movement joints, install backer rod to control sealant depth and prevent three-sided adhesion. Prime joint faces per Sika TDS on porous substrates (Sika Primer-3 N is referenced). Not suitable for continuously wet conditions without specific Sika approval. Confirm current product designation and TDS with Sika Australia before specifying — product names are subject to periodic revision.",
    technicalProperties: [
      "1-part moisture-curing polyurethane — no site mixing required, reduces application error",
      "Overpaintable after full cure with compatible interior paint systems — confirm with Sika TDS",
      "Good elongation and movement accommodation for internal movement joints and wider cracks in render and masonry",
      "Bonds to a broad range of building substrates including render, masonry, concrete, and timber",
      "Gun-applied from standard cartridge — toolable after application to achieve a smooth flush joint profile",
    ],
    limitations: [
      "Not suitable for active cracks without backer rod — three-sided adhesion prevents proper sealant movement",
      "Not a structural repair — do not use on structural cracks or cracks with differential displacement (step cracking)",
      "Do not apply to damp or contaminated joint faces — primer mandatory on porous substrates per Sika TDS",
      "Not suitable for continuous immersion or ponding without specific Sika technical approval",
      "Confirm current product specification, compliance, and availability with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Paint and building trade suppliers nationally", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Crack-filler", label: "Crack-filler" },
  { id: "Flexible", label: "Flexible" },
  { id: "Acrylic", label: "Acrylic" },
  { id: "PU", label: "PU" },
  { id: "Sealant", label: "Sealant" },
  { id: "1C", label: "One-component" },
  { id: "Paintable", label: "Paintable" },
  { id: "Plasterboard", label: "Plasterboard" },
  { id: "Render", label: "Render" },
  { id: "Interior", label: "Interior" },
  { id: "Movement-joint", label: "Movement-joint" },
];

const BRAND_EQUIV: { system: string; selleys: string; sika: string }[] = [
  { system: "Acrylic gap filler", selleys: "No More Gaps Interior Multipurpose", sika: "—" },
  { system: "Flexible STP sealant (movement joints)", selleys: "—", sika: "Sikaflex-111 Stick & Seal" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  chemistry: string;
  paintable: string;
  crackWidth: string;
  movement: string;
  primaryUse: string;
}[] = [
  {
    product: "No More Gaps Interior Multipurpose",
    brand: "Selleys",
    chemistry: "Acrylic",
    paintable: "Yes",
    crackWidth: "Hairline to ~5mm",
    movement: "Minor thermal",
    primaryUse: "Plasterboard and render hairline cracks — cornices and butt joints",
  },
  {
    product: "Sikaflex-111 Stick & Seal",
    brand: "Sika",
    chemistry: "Silane-terminated polymer (1C)",
    paintable: "Yes (confirm TDS)",
    crackWidth: "Fine to wide — with backer rod",
    movement: "Thermal + live load",
    primaryUse: "Movement joints and wider cracks in render and masonry — internal",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Hairline and fine cracks in internal plasterboard ceilings and walls in Class 2 strata apartment buildings",
    "Cornice junction cracks and separation at wall-ceiling junctions — dormant settlement cracks",
    "Butt joint cracking in plasterboard where sheets meet — common in strata apartment ceilings",
    "Fine surface cracks in internal render and paint coatings — cosmetic repair before repainting",
    "Movement joints and wider cracks in internal render and masonry — PU sealant with backer rod",
  ],
  selectionCriteria: [
    "Select flexible acrylic filler for hairline to fine dormant cracks in plasterboard, cornices, and render — quick repair before repainting",
    "Select flexible PU sealant for wider cracks, movement joints in render or masonry, and locations with expected ongoing thermal movement",
    "Confirm crack is dormant before filling — active cracks require movement joint sealant with backer rod, not filler",
    "Cracks wider than 3mm or with step displacement should be assessed by a structural engineer before filling",
    "AS/NZS 4858 and relevant Australian Standards apply — confirm currency of standards before specifying",
  ],
  limitations: [
    "Crack filler and PU sealant are cosmetic repairs only — they do not address the underlying cause of cracking",
    "Active cracks will re-crack through filler — movement joint sealant with backer rod is required for ongoing movement",
    "Never fill cracks in wet areas without confirming waterproofing membrane integrity below — filling hides a potential defect",
    "Structural or step cracks must be referred to a structural engineer — filling is not a structural repair",
    "Paint over filled cracks only after full cure — premature painting can trap moisture and cause paint failure",
  ],
  standardsNotes: [
    "AS/NZS 4858 — Wet Area Installations — referenced for interior wet area applications and sealant use",
    "BCA / NCC — National Construction Code — performance requirements for internal finishes and defect repair in Class 2 buildings",
    "Manufacturer TDS — always confirm product suitability, application method, and cure times with the current TDS before application",
    "AS 3958 — Ceramic tiles — Part 1 — tile installation standard — references joint filler and sealant requirements at movement joints",
  ],
  suitableDefects: [
    "Hairline plasterboard ceiling cracks — cosmetic repair before repainting in strata apartments",
    "Cornice separation cracks at wall-ceiling junction — dormant settlement movement",
    "Fine render surface cracks — cosmetic crack filling before repainting internal walls",
    "Movement joint failures in internal render or masonry — PU sealant replacement",
    "Butt joint cracking in plasterboard — fine crack filler and skim coat before repaint",
  ],
  typicalSubstrates: [
    "Plasterboard (gypsum wallboard) — ceiling and wall sheets — hairline cracks and butt joint repair",
    "Internal render — sand-cement and gypsum render — fine surface crack repair",
    "Cornices — plaster and polystyrene — junction crack and separation filling",
    "Masonry — internal brick and block walls — movement joint and crack repair with PU sealant",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
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
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
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

export function InternalCrackingIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are internal crack repair systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Internal cracks in Class 2 strata apartment buildings form for a range of reasons — long-term building settlement, thermal movement in framing and lining materials, moisture cycling in plasterboard and render, and live load deflection of floor and ceiling systems. The critical distinction before any crack repair is whether a crack is cosmetic (dormant, non-structural) or structural. Structural cracks — typically wider than 3mm, showing step displacement, or associated with movement of building elements — must be assessed by a structural engineer before any filling or concealment is undertaken. Crack filling is appropriate only for dormant cosmetic cracks.
        </p>
        <p>
          Two product types are used for internal crack repair in Australian strata buildings. Acrylic gap fillers — such as Selleys No More Gaps Interior Multipurpose — are water-based, low-odour, and paintable, and are suited to hairline and fine dormant cracks in plasterboard, cornices, and thin render coatings. For wider cracks, active movement joints, or locations in render and masonry where ongoing thermal movement is expected, a 1-part flexible sealant based on silane-terminated polymer technology — such as Sikaflex-111 Stick & Seal — provides greater elongation, better movement accommodation, and is also overpaintable once cured.
        </p>
        <p>
          Painting over repaired cracks requires the filler or sealant to be fully cured before any coating is applied — premature painting over uncured filler can cause paint adhesion failure and visible surface irregularity. The filled crack must be sanded flush with the surrounding surface, primed if required, and finished with a compatible interior paint system. For movement joints filled with PU sealant, backer rod should be installed to control the sealant depth and prevent three-sided adhesion, which would prevent the joint from accommodating movement.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Structural crack repair — crack injection or stitching for structural concrete or masonry — not internal cosmetic filler",
              "Facade crack repair — external crack systems for rendered or masonry facades — not internal cosmetic crack products",
              "Cornice replacement — damaged or severely cracked cornices may require section replacement, not just filling",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-xs leading-5 text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function InternalCrackingProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleProducts =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
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
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — internal crack repair systems — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

                {/* Technical Properties & Limitations */}
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

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of internal crack repair products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Chemistry</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Paintable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Crack width</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Movement</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.chemistry}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${row.paintable.startsWith("Yes") ? "bg-green-50 text-green-700" : row.paintable === "No" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                      {row.paintable}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.crackWidth}</td>
                  <td className="px-4 py-3 text-slate-600">{row.movement}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Internal crack repair equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Selleys</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Sika</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.selleys, row.sika].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callouts — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Structural cracks require engineering assessment</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Cracks wider than 3mm or with differential displacement (step) should be assessed by a structural engineer before filling — crack filling a structural crack conceals a defect and is not a repair",
            "Active cracks (still moving) will re-crack through filler — movement joint sealant with backer rod is required for joints with ongoing thermal or live load movement",
            "Never fill a crack in a wet area without confirming the waterproofing membrane integrity below — filling over a failed waterproof junction hides a defect and allows water ingress to continue",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
