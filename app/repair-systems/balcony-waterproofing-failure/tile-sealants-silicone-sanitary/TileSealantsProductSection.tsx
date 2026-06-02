"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Silicone"
  | "Sanitary"
  | "Neutral-cure"
  | "Wet-area"
  | "Movement-joint"
  | "Internal"
  | "Colourless"
  | "White"
  | "Grey"
  | "Floor-wall-junction"
  | "1C";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/sealing-bonding/joint-sealants/sikaflex-11-fc-plus.html",
    accentColor: "#ef4444",
    name: "Sikaflex-11 FC+",
    descriptionLine: "One-component moisture-curing polyurethane sealant — movement joints in tiled wet areas and balconies",
    productType: "Polyurethane sealant",
    filterTags: ["Wet-area", "Movement-joint", "Internal", "Floor-wall-junction", "1C", "White", "Grey"],
    techChips: [
      { label: "Polyurethane sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture-cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Wet area / balcony", cls: "bg-slate-100 text-slate-700" },
      { label: "Movement joint", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikaflex-11 FC+ is a one-component moisture-curing polyurethane sealant widely used in Australian wet area and balcony tiling for movement joints at internal angles, floor-wall junctions, and around fixtures. Applied by gun from cartridge directly into the prepared joint over a backer rod or bond breaker tape. Available in white, grey, beige and other standard colours. Suitable for movement joints between tiles, at wall-floor junctions, and around penetrations in Class 2 strata balcony and wet area remediation.\n\nDo not use as a structural adhesive or in joints subject to continuous immersion without confirming suitability with Sika technical. Prime joint faces per Sika TDS for best adhesion on porous or contaminated substrates.",
    technicalProperties: [
      "Polyurethane chemistry — good elongation and movement accommodation — suitable for building movement joints in tiled wet areas",
      "One-component moisture-curing — no mixing required on site — reduces application error",
      "Paintable after full cure with compatible paint systems — confirm with Sika technical",
      // TODO: confirm exact elongation at break and movement accommodation class from current Sika TDS
      "Available in multiple standard colours including white and grey — confirm current colour range with Sika",
      "Gun-applied from standard cartridge — toolable after application to form concave profile",
    ],
    limitations: [
      "Not a sanitary silicone — polyurethane chemistry; confirm suitability for continuous wet conditions with Sika technical",
      "Backer rod or bond breaker tape required to prevent three-sided adhesion and maintain sealant depth ratio",
      "Not suitable for joints in direct contact with potable water without specific approval",
      "Do not apply to damp or contaminated joint faces — primer mandatory on porous substrates per Sika TDS",
      "Confirm current product specification and compliance with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    tdsUrl: "https://www.tremcosealants.com.au",
    accentColor: "#22c55e",
    name: "Tremco Spectrem 1",
    descriptionLine: "One-part neutral-cure silicone sealant — wet area movement joints, sanitary and window applications",
    productType: "Neutral-cure silicone",
    filterTags: ["Silicone", "Sanitary", "Neutral-cure", "Wet-area", "Movement-joint", "Internal", "White", "Colourless", "Floor-wall-junction", "1C"],
    techChips: [
      { label: "Neutral-cure silicone", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Sanitary grade", cls: "bg-green-50 text-green-700" },
      { label: "Wet area / movement joint", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3740", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco Spectrem 1 is a one-component neutral-cure silicone sealant used for movement joints in wet areas, bathrooms, sanitary applications and glazing. Neutral-cure chemistry is non-corrosive and suitable for use against metals, aluminium, anodised and polished surfaces, and most substrates without primer. Used at internal angles, floor-wall junctions and around sanitaryware and fixtures in Class 2 strata wet area remediation.\n\n// TODO: Confirm whether Spectrem 1 is still the current active product designation in the Tremco CPG Australia range — product names subject to periodic revision.",
    technicalProperties: [
      "Neutral-cure silicone — non-corrosive — suitable for use on metals, anodised aluminium, and most building substrates",
      "Sanitary-grade formulation — mould-resistance properties suitable for continuously wet bathroom and kitchen environments",
      "One-component — no mixing required",
      // TODO: confirm elongation at break and movement accommodation from current Tremco TDS
      "Available in clear and standard colours — confirm current colour range with Tremco CPG Australia",
      "Gun-applied from cartridge — toolable to form smooth concave or flat joint profile",
    ],
    limitations: [
      "Silicone — not paintable after cure — plan joint colour selection before application",
      "Silicone-to-silicone overlap joints require full removal of old silicone before resealing — silicone will not bond to existing cured silicone",
      "Backer rod or bond breaker tape required for correct joint geometry — three-sided adhesion must be prevented",
      "Confirm primer requirements on non-standard substrates with Tremco technical",
      "Confirm current product specification and availability with Tremco CPG Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply — contact for current pricing", url: "https://www.tremcosealants.com.au" },
    ],
  },
  {
    fullLabel: "Bostik Australia",
    brandUrl: "https://www.bostik.com/en-au",
    tdsUrl: "https://www.bostik.com/en-au",
    accentColor: "#8b5cf6",
    name: "Bostik Seal-N-Flex 1",
    descriptionLine: "One-component polyurethane sealant — flexible movement joints in tiled wet areas and balconies",
    productType: "Polyurethane sealant",
    filterTags: ["Wet-area", "Movement-joint", "Internal", "Floor-wall-junction", "1C", "White", "Grey"],
    techChips: [
      { label: "Polyurethane sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture-cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Wet area / balcony", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Bostik Seal-N-Flex 1 is a one-component moisture-curing polyurethane sealant for movement joints in tiled wet areas and balcony applications. Applied by cartridge gun to prepared joints over backer rod or bond breaker tape. Suitable at internal angles, floor-wall junctions, and around pipe penetrations in Class 2 strata building wet area and balcony remediation. Part of the Bostik system — confirm compatible primer and preparation requirements.\n\n// TODO: Confirm Seal-N-Flex 1 is the correct current Bostik product designation for wet area PU movement joint sealant in the Australian market.",
    technicalProperties: [
      "Polyurethane sealant — good elongation and movement accommodation for building movement joints in tiled assemblies",
      "One-component moisture-curing — no site mixing required",
      "Available in standard colours including white and grey — confirm current colour range with Bostik Australia",
      "Compatible with most common building substrates including concrete, masonry, and ceramic tile edges",
      "Toolable after application — smooth concave joint profile achievable",
    ],
    limitations: [
      "Polyurethane — confirm suitability for continuous immersion or ponding with Bostik technical before specifying in wet conditions",
      "Backer rod or bond breaker tape required — do not allow three-sided adhesion",
      "Do not apply to wet or contaminated joint faces — clean and dry substrate mandatory",
      "Primer required on some substrates — confirm with Bostik technical before application",
      "Confirm current product specification and compliance with Bostik Australia before specifying",
    ],
    procurementSources: [
      { name: "Bostik Australia — trade supply — contact for current pricing", url: "https://www.bostik.com/en-au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Silicone", label: "Silicone" },
  { id: "Sanitary", label: "Sanitary" },
  { id: "Neutral-cure", label: "Neutral-cure" },
  { id: "Wet-area", label: "Wet-area" },
  { id: "Movement-joint", label: "Movement-joint" },
  { id: "Internal", label: "Internal" },
  { id: "Colourless", label: "Colourless" },
  { id: "White", label: "White" },
  { id: "Grey", label: "Grey" },
  { id: "Floor-wall-junction", label: "Floor-wall junction" },
  { id: "1C", label: "One-component" },
];

const BRAND_EQUIV: { system: string; sika: string; tremco: string; bostik: string }[] = [
  { system: "PU sealant — 1C moisture-cure — wet area / balcony", sika: "Sikaflex-11 FC+", tremco: "—", bostik: "Seal-N-Flex 1" },
  { system: "Neutral-cure silicone — sanitary / wet area", sika: "—", tremco: "Spectrem 1", bostik: "—" },
];

const TECH_INFO = {
  typicalApplications: [
    "Movement joints at internal angles (floor-wall junctions) in tiled balcony and wet area waterproofing systems",
    "Perimeter joints around sanitaryware, bath surrounds, and shower fixtures",
    "Joints between tiled surfaces and aluminium window frames, door frames, and sills",
    "Expansion joints within tiled floor and wall surfaces in wet area and balcony remediation",
    "Joints around pipe penetrations through tiled floors and walls",
  ],
  selectionCriteria: [
    "Select neutral-cure silicone for joints in contact with metals, anodised aluminium, natural stone, or sensitive substrates",
    "Select polyurethane sealant where paintability after cure is required — silicone cannot be painted",
    "Confirm backer rod diameter and joint depth ratio before applying — aim for 2:1 width-to-depth ratio with backer rod installed",
    "Confirm colour availability against tile colour before specifying — sealant colour must be agreed with client before application",
    "AS 3740 requires movement joints at all internal angles in wet areas — sealant selection must be confirmed against the membrane system",
  ],
  limitations: [
    "Silicone sealants cannot be painted — use polyurethane where a painted finish is required over the joint",
    "Three-sided adhesion must be prevented — backer rod or bond breaker tape mandatory in all joints",
    "Silicone-to-silicone re-sealing requires full removal of existing silicone — bond of new silicone over cured silicone is unreliable",
    "Joint faces must be clean, dry and free of contamination — adhesion failure is the primary sealant failure mode",
    "Mould growth in wet area silicone joints is a maintenance issue — sanitary-grade products provide better mould resistance but are not immune",
  ],
  standardsNotes: [
    "AS 3740 — Waterproofing of Domestic Wet Areas — requires movement joints at all internal angles and changes of plane in wet areas",
    "AS 4654 — Waterproofing of Wet Areas Within Residential Buildings — movement joint requirements for balcony and wet area assemblies",
    "AS/NZS 4456 — Masonry Units — referenced for tile-related joint requirements in some specifications",
    "Sealant should conform to movement accommodation class appropriate to joint width and expected movement — confirm with manufacturer TDS",
  ],
  suitableDefects: [
    "Failed or cracked movement joints at floor-wall junctions in tiled wet areas and balconies",
    "Mould-contaminated silicone joints requiring full removal and re-sealing",
    "Open perimeter joints around sanitaryware and fixtures allowing water ingress",
    "Cracked or debonded sealant at internal angles in tiled waterproofed balcony surfaces",
  ],
  typicalSubstrates: [
    "Ceramic and porcelain tile edges — internal angle joints at floor-wall junctions",
    "Aluminium window and door frames — perimeter joints against tiled surfaces",
    "Concrete substrates — direct application with confirmed primer",
    "Sanitaryware (ceramic, acrylic, steel) — perimeter joints with neutral-cure silicone",
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

export function TileSealantsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are tile sealants — silicone and sanitary?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Tile sealants in wet areas and waterproofed balconies are flexible joint sealants applied at movement joints, internal angles, floor-wall junctions, and around fixtures and penetrations. These joints cannot be filled with rigid grout — they must accommodate thermal and structural movement without cracking or debonding. The two primary sealant chemistries used in Australian wet area tiling are silicone (neutral-cure) and polyurethane.
        </p>
        <p>
          Neutral-cure silicone is the preferred choice for joints against metals, anodised aluminium, natural stone, and sanitaryware — it is non-corrosive and does not require primer on most substrates. Sanitary-grade silicone formulations include mould-inhibiting additives suited to continuously wet bathroom and kitchen environments. Polyurethane sealants are preferred where the joint requires painting after cure — silicone cannot be overpainted.
        </p>
        <p>
          AS 3740 mandates movement joints at all internal angles and changes of plane in wet area waterproofing systems. Omission of flexible sealant at these joints — substituting rigid grout — is a common non-compliance that leads to cracking, water ingress and membrane failure. All joints must be formed over backer rod or bond breaker tape to prevent three-sided adhesion and maintain the correct sealant profile for movement accommodation.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse tile sealants with:</p>
          <ul className="space-y-1.5">
            {[
              "Tile grout — cementitious or epoxy-based rigid joint filler — not suitable for movement joints",
              "Acetoxy-cure (acid-cure) silicone — corrosive to metals and some substrates — not suitable for aluminium or stone",
              "General purpose silicone sealants not rated for continuous wet conditions — confirm suitability for wet area use",
              "Waterproofing membranes — sealants are movement joint fillers, not membrane replacements",
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

export function TileSealantsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — silicone and PU movement joint sealants — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Tile sealant equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Tremco</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#8b5cf6" }}>Bostik</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.sika, row.tremco, row.bostik].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Critical installation requirements</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Backer rod or bond breaker tape is mandatory in all movement joints — three-sided adhesion prevents proper sealant movement and causes premature failure",
            "AS 3740 requires flexible sealant (not grout) at all internal angles, changes of plane, and junctions between tiled surfaces and dissimilar materials",
            "Do not apply sealant to damp, dusty, or contaminated joint faces — adhesion failure at the substrate interface is the primary sealant failure mode",
            "Silicone to silicone re-sealing requires full removal of all existing silicone — new silicone will not bond reliably to cured silicone",
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
