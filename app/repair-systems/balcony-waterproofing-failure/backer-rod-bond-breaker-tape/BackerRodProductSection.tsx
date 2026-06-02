"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Backer-rod"
  | "Bond-breaker"
  | "Closed-cell-PE"
  | "Movement-joint"
  | "Sealant-depth"
  | "External"
  | "Internal"
  | "Round"
  | "Flat";

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
    fullLabel: "Nomaflex / Carpenter Co.",
    brandUrl: "https://www.nomaflex.com.au",
    tdsUrl: "https://www.nomaflex.com.au",
    accentColor: "#0ea5e9",
    name: "Nomaflex Closed-Cell Backer Rod",
    descriptionLine: "Closed-cell polyethylene foam backer rod — controls sealant depth and prevents three-sided adhesion in movement joints",
    productType: "Closed-cell PE backer rod",
    filterTags: ["Backer-rod", "Closed-cell-PE", "Movement-joint", "Sealant-depth", "External", "Internal", "Round"],
    techChips: [
      { label: "Closed-cell PE foam", cls: "bg-sky-100 text-sky-800" },
      { label: "Round profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Movement joint", cls: "bg-slate-100 text-slate-700" },
      { label: "Internal / external", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Nomaflex is a closed-cell polyethylene foam backer rod widely used in Australian construction for sealant joint depth control and prevention of three-sided adhesion. Available in circular cross-section in a range of diameters to suit various joint widths. Installed by compressing slightly and pressing into the joint to the correct depth before sealant application. Closed-cell foam does not absorb sealant chemistry — maintains correct sealant profile and ensures two-sided adhesion only.\n\nUsed in balcony and wet area movement joints, expansion joints in tiled decks, perimeter joints, and any joint requiring a flexible sealant with controlled sealant depth ratio. Select backer rod diameter slightly larger than the joint width (typically 25% oversize) to ensure a snug interference fit. Confirm diameter selection against the joint width and the required sealant depth ratio (typically 1:1 to 2:1 width to depth).\n\n// TODO: confirm current Nomaflex product range and diameter availability in Australia — Carpenter Co. products may be distributed under Nomaflex or related brand names in the Australian market.",
    technicalProperties: [
      "Closed-cell polyethylene foam — does not absorb sealant — maintains correct sealant profile from application through cure",
      "Round cross-section — compresses to fit joint width — provides consistent sealant depth control",
      "Prevents three-sided adhesion — sealant bonds to two joint faces only — allows correct movement accommodation",
      "Compatible with polyurethane, silicone and polysulfide sealant chemistries — confirm with sealant manufacturer",
      // TODO: confirm compressive properties and diameter range from current Nomaflex TDS
    ],
    limitations: [
      "Diameter must be correctly selected — undersized rod will not maintain sealant depth; oversized rod will be difficult to install and may distort the joint",
      "Not suitable for open-cell foam — open-cell backer rod absorbs sealant and compromises joint performance",
      "Do not use in joints that will be subject to continuous immersion without confirming PE compatibility with the sealant system",
      "Confirm current product range and diameter availability with local supplier before specifying",
    ],
    procurementSources: [
      { name: "Nomaflex / Carpenter Co. — trade supply — confirm local distributor", url: "https://www.nomaflex.com.au" },
      { name: "Waterproofing and sealant trade suppliers nationally", url: "https://www.wpdgroup.com.au" },
      { name: "Bunnings — selected diameters may be available in-store", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    tdsUrl: "https://www.tremcosealants.com.au",
    accentColor: "#22c55e",
    name: "Tremco Closed Cell Backer Rod",
    descriptionLine: "Closed-cell polyethylene foam backer rod — Tremco CPG system-compatible — movement joint depth control",
    productType: "Closed-cell PE backer rod",
    filterTags: ["Backer-rod", "Closed-cell-PE", "Movement-joint", "Sealant-depth", "External", "Internal", "Round"],
    techChips: [
      { label: "Closed-cell PE foam", cls: "bg-sky-100 text-sky-800" },
      { label: "Round profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Tremco system compatible", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Tremco CPG supplies closed-cell polyethylene foam backer rod as an accessory for use with Tremco sealant systems (Spectrem silicone, Vulkem polyurethane, and related products). Backer rod is specified as part of the Tremco sealant system specification to ensure correct joint geometry, sealant depth ratio, and prevention of three-sided adhesion. Available in a range of diameters.\n\n// TODO: Confirm current Tremco CPG Australia backer rod product designation and diameter range — consult Tremco CPG Australia for current accessory product list.",
    technicalProperties: [
      "Closed-cell polyethylene foam — does not absorb sealant chemistry — maintains correct sealant profile",
      "Part of the Tremco sealant system specification — use with Tremco-specified sealants for warranted performance",
      "Prevents three-sided adhesion — ensures correct two-sided bond for movement accommodation",
      "Available in multiple diameters — confirm selection against joint width before installation",
    ],
    limitations: [
      "Confirm Tremco product designation and availability before specifying — may vary from European product range",
      "Correct diameter selection is critical — incorrect sizing compromises sealant depth control and joint performance",
      "Confirm current product specification and availability with Tremco CPG Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply — contact for current pricing", url: "https://www.tremcosealants.com.au" },
    ],
  },
  {
    fullLabel: "Various suppliers",
    brandUrl: "https://www.wpdgroup.com.au",
    accentColor: "#64748b",
    name: "Polyethylene Bond Breaker Tape",
    descriptionLine: "Self-adhesive polyethylene tape applied to joint base as alternative to backer rod — prevents three-sided adhesion in shallow joints",
    productType: "Bond breaker tape",
    filterTags: ["Bond-breaker", "Movement-joint", "Sealant-depth", "External", "Internal", "Flat"],
    techChips: [
      { label: "Bond breaker tape", cls: "bg-sky-100 text-sky-800" },
      { label: "Flat / self-adhesive", cls: "bg-slate-100 text-slate-700" },
      { label: "Shallow joints", cls: "bg-slate-100 text-slate-700" },
      { label: "PE film", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Polyethylene bond breaker tape is a self-adhesive PE film tape applied to the base of a sealant joint as an alternative to round backer rod in situations where the joint is too shallow for backer rod or where the joint base is flat and backer rod cannot be installed correctly. The PE film does not bond to the sealant — it allows the sealant to cure with adhesion to only the two joint faces, preventing three-sided adhesion.\n\nTypically used in very shallow rebated joints, saw-cut expansion joints in concrete, and surface-applied joints where depth control with backer rod is not practical. Not suitable as a substitute for backer rod in all situations — confirm the joint geometry and expected movement before selecting tape over rod.\n\n// TODO: Confirm current product availability — PE bond breaker tape is supplied by various sealant system manufacturers and general trade suppliers; no single dominant brand in the Australian market. Confirm with Sika, Tremco, or ARDEX technical for system-specific recommendation.",
    technicalProperties: [
      "Polyethylene film — does not bond to common sealant chemistries (silicone, PU, polysulfide) — provides reliable bond-breaking at joint base",
      "Self-adhesive backing — applied to the joint base before sealant application",
      "Flat profile — suitable for saw-cut and rebated joints where round backer rod cannot be installed",
      "Provides two-sided adhesion of sealant — prevents three-sided adhesion in shallow or flat-bottomed joints",
    ],
    limitations: [
      "Not a substitute for backer rod in deep joints — backer rod provides better sealant depth control in joints wider than approximately 15 mm",
      "Tape must be fully adhered to the joint base without voids or lifted edges — incomplete adhesion allows sealant to bond to the joint base",
      "Do not use in joints subject to significant hydrostatic pressure or continuous immersion without confirming suitability",
      "// TODO: Confirm preferred supplier and product specification with the sealant manufacturer for the specific sealant system being used",
    ],
    procurementSources: [
      { name: "Waterproofing Direct — confirm current stock", url: "https://www.wpdgroup.com.au" },
      { name: "Sika, Tremco, ARDEX — confirm system-compatible tape specification with manufacturer technical", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Backer-rod", label: "Backer rod" },
  { id: "Bond-breaker", label: "Bond breaker" },
  { id: "Closed-cell-PE", label: "Closed-cell PE" },
  { id: "Movement-joint", label: "Movement joint" },
  { id: "Sealant-depth", label: "Sealant depth control" },
  { id: "External", label: "External" },
  { id: "Internal", label: "Internal" },
  { id: "Round", label: "Round profile" },
  { id: "Flat", label: "Flat / tape" },
];

const BRAND_EQUIV: { system: string; nomaflex: string; tremco: string; various: string }[] = [
  { system: "Closed-cell PE backer rod — round", nomaflex: "Nomaflex Backer Rod", tremco: "Closed Cell Backer Rod", various: "Various — confirm with sealant mfr" },
  { system: "Bond breaker tape — flat", nomaflex: "—", tremco: "—", various: "PE tape — confirm with sealant mfr" },
];

const TECH_INFO = {
  typicalApplications: [
    "Movement joints in tiled balcony and wet area surfaces — backer rod installed before sealant application at internal angles and changes of plane",
    "Expansion joints in concrete balcony and podium deck surfaces — backer rod or bond breaker tape before sealant application",
    "Perimeter joints in tiled surfaces — backer rod controls sealant depth in joints at wall perimeters and around fixtures",
    "Saw-cut expansion joints in concrete — bond breaker tape applied to flat joint base before sealant application",
    "Joints around penetrations, door thresholds, and drain surrounds in waterproofed balcony surfaces",
  ],
  selectionCriteria: [
    "Select backer rod diameter approximately 25% larger than joint width — interference fit is required for correct depth control",
    "Target sealant depth-to-width ratio of 1:1 to 1:2 — backer rod position controls this ratio",
    "Select closed-cell foam only — open-cell foam absorbs sealant and compromises joint performance",
    "Select bond breaker tape for saw-cut or rebated joints where backer rod cannot seat correctly due to joint geometry",
    "Confirm backer rod and sealant chemistry compatibility with the sealant manufacturer before specifying",
  ],
  limitations: [
    "Omission of backer rod or bond breaker tape leads to three-sided adhesion — sealant will split at the joint base under movement instead of elongating at the joint faces",
    "Incorrect diameter selection is the most common installation error — undersized rod does not control sealant depth; oversized rod is difficult to seat and may bow the joint faces",
    "Open-cell foam backer rod must not be used — absorbs sealant chemistry and causes adhesion failure at the joint base",
    "Bond breaker tape is not suitable for joints requiring backer rod depth control — confirm joint geometry before substituting tape for rod",
  ],
  standardsNotes: [
    "AS 3740 — Waterproofing of Domestic Wet Areas — requires flexible sealant at all internal angles; backer rod is required to achieve correct sealant profile for movement accommodation",
    "AS 4654 — Waterproofing of Wet Areas Within Residential Buildings — movement joint requirements at all changes of plane",
    "ASTM C1330 — Standard Specification for Cylindrical Sealant Backing for Use with Cold Liquid-Applied Sealants — commonly referenced for backer rod specification",
    "Sealant manufacturers' TDS typically specify backer rod diameter selection criteria and minimum sealant thickness requirements for each sealant product",
  ],
  suitableDefects: [
    "Failed sealant at internal angles — sealant split at joint base due to three-sided adhesion — requires removal, backer rod installation and re-sealing",
    "Cracked or debonded movement joints in tiled balcony and wet area surfaces requiring sealant replacement",
    "Expansion joints in concrete podium and balcony decks requiring correct joint preparation before sealant application",
  ],
  typicalSubstrates: [
    "Ceramic and porcelain tile — joints at internal angles and perimeters",
    "Concrete — saw-cut and cast-in expansion joints",
    "Masonry — perimeter and movement joints at building fabric junctions",
    "Aluminium — perimeter joints against window and door frames",
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

export function BackerRodIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are backer rod and bond breaker tape?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Backer rod is a closed-cell polyethylene foam cylinder installed in a movement joint before sealant application. Its two functions are: controlling the sealant depth (maintaining the correct depth-to-width ratio) and preventing three-sided adhesion. Three-sided adhesion occurs when sealant bonds to both joint faces and the joint base simultaneously — preventing the sealant from elongating freely under movement. When a joint with three-sided adhesion is subjected to cyclic building movement, the sealant tears at the weakest point (the joint base) rather than stretching at the joint faces.
        </p>
        <p>
          Backer rod is specified as closed-cell foam only. Open-cell foam backer rod absorbs sealant chemistry and creates adhesion at the joint base — defeating its purpose. Backer rod diameter should be approximately 25% larger than the joint width to ensure a snug interference fit that maintains position during sealant application.
        </p>
        <p>
          Bond breaker tape is a self-adhesive polyethylene film tape used as an alternative to backer rod in shallow joints, saw-cut expansion joints, and joints where round backer rod cannot be installed correctly due to joint geometry. The PE film does not bond to common sealant chemistries and provides the same bond-breaking function as backer rod in flat-bottomed joints.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse backer rod with:</p>
          <ul className="space-y-1.5">
            {[
              "Open-cell foam — open-cell foam absorbs sealant and causes three-sided adhesion — must not be used as backer rod",
              "Compressible filler board — expansion joint filler (foam or fibreboard) used to form the joint — installed before the structure is cast, not a sealant accessory",
              "Compression seals — pre-compressed cellular foam or EPDM profiles designed to be the sole joint seal — different product from backer rod which is used beneath a liquid sealant",
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

export function BackerRodProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 2 brands — backer rod and bond breaker tape — scroll to view all</p>
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

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">
              Backer rod and bond breaker tape equivalents. Closed-cell PE backer rod is a commodity product — confirm brand and diameter availability through the sealant system manufacturer or local trade supplier.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#0ea5e9" }}>Nomaflex</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Tremco</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Various</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.nomaflex, row.tremco, row.various].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Critical installation requirements — backer rod and bond breaker tape</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Use closed-cell polyethylene foam only — open-cell foam backer rod absorbs sealant chemistry and creates three-sided adhesion, defeating the purpose of the backer rod",
            "Three-sided adhesion failure is the most common sealant joint failure mode — backer rod or bond breaker tape is not optional in any movement joint",
            "Backer rod diameter must be selected to be approximately 25% larger than the joint width — it is installed by compression to ensure a snug fit and correct depth control",
            "Bond breaker tape must be fully adhered to the joint base with no voids — any unbonded section will allow sealant adhesion at that point",
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
