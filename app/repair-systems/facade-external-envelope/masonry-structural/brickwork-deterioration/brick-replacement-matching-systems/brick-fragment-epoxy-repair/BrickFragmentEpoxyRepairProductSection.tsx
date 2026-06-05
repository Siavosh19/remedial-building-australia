"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Sika"
  | "Mapei"
  | "Ardex"
  | "Epoxy-repair"
  | "Cosmetic-only"
  | "Colour-match"
  | "National"
  | "Facade"
  | "AS-3700";

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
    accentColor: "#0369a1",
    name: "Sika SikaCem Mortar / SikaRep Brick Repair Compound",
    descriptionLine: "Sika cementitious brick repair compound — tinted on site — for restoring spalled or damaged brick faces on Class 2 facades — cosmetic only, not structural",
    productType: "Cementitious brick face repair compound — site-tinted",
    filterTags: ["Sika", "Epoxy-repair", "Cosmetic-only", "Colour-match", "National", "Facade", "AS-3700"],
    techChips: [
      { label: "Cementitious repair", cls: "bg-sky-100 text-sky-800" },
      { label: "Cosmetic only", cls: "bg-amber-50 text-amber-700" },
      { label: "Site-tinted", cls: "bg-green-50 text-green-700" },
      { label: "National supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Australia supplies a range of cementitious repair mortars suitable for brick face spall repair, including SikaCem Mortar and related facade repair products. The compound is site-tinted with pigments to match the adjacent brick colour, applied to the prepared spall void in layers, and sculpted to restore the original brick profile and texture while plastic. Confirm the specific Sika product range and current TDS with Sika Australia before specifying — the repair mortar range is updated regularly. Not a structural repair — for cosmetic face restoration of mechanically sound brick only where the brick body and bedding mortar are structurally intact.",
    technicalProperties: [
      "Avoids the cost and disruption of full brick replacement where the brick is structurally sound but cosmetically damaged",
      "Can be site-tinted to approach the colour of adjacent brick using mineral pigments",
      "Sika national distribution network — product available through building products trade suppliers nationally",
      "Good adhesion to prepared cementitious substrates — follow Sika TDS for primer and substrate preparation requirements",
      "Suitable for isolated spalls on otherwise sound brick where a matching replacement brick cannot be sourced",
    ],
    limitations: [
      "Cosmetic repair only — does not restore structural capacity; confirm with engineer that brick is structurally sound",
      "Durability in exposed facades — patch repairs subject to differential thermal movement may de-bond over 5–15 years",
      "Colour match deteriorates with weathering — repair compound and original brick weather at different rates",
      "Not suitable for large-area damage — patch repairs covering more than approximately 30% of the brick face should be reviewed for full brick replacement",
      "Not suitable for heritage-listed buildings where a full reclaimed brick replacement is required by heritage authority",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
      { name: "Sika technical support — confirm product and TDS", url: "https://aus.sika.com/en/construction/contact.html" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#b45309",
    name: "Mapei Mape-Antique Restoration Mortar / Mapegrout BM",
    descriptionLine: "Mapei cementitious facade repair mortar — tinted for brick face spall repair — for Class 2 strata building facade restoration — cosmetic only, not structural",
    productType: "Cementitious facade repair mortar — heritage-compatible range",
    filterTags: ["Mapei", "Epoxy-repair", "Cosmetic-only", "Colour-match", "National", "Facade", "AS-3700"],
    techChips: [
      { label: "Cementitious mortar", cls: "bg-amber-100 text-amber-800" },
      { label: "Cosmetic only", cls: "bg-amber-50 text-amber-700" },
      { label: "Heritage-compatible range", cls: "bg-green-50 text-green-700" },
      { label: "National supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Australia offers a specialist range of cementitious restoration mortars for masonry and facade repair, including Mape-Antique series mortars suitable for brick face spall repair and restoration. Mapei's restoration mortar range is specifically formulated for compatibility with historic and heritage masonry materials, including options suitable for use on soft brick where a standard Portland cement mortar would be too rigid. Site-tint the compound to match the adjacent brick colour using Mapei mineral pigments. Confirm the specific product and current TDS with Mapei Australia before specifying. Cosmetic repair only — not a structural repair.",
    technicalProperties: [
      "Heritage-compatible cementitious mortar range — Mape-Antique series includes NHL-compatible formulations for soft historic brick",
      "Mineral pigment tinting system — allows site colour-matching to adjacent brick",
      "Mapei national distribution network — available through building products trade suppliers nationally",
      "Specialist restoration range — formulated for lower rigidity and higher vapour permeability than standard cement mortars",
      "Technical support available — Mapei technical team can advise on product selection and application for specific substrates",
    ],
    limitations: [
      "Cosmetic repair only — does not restore structural capacity; confirm with engineer that brick is structurally sound",
      "Colour match deteriorates with weathering — Mapei compound and original brick weather at different rates",
      "Not suitable for large-area damage — confirm with engineer for damage covering more than 30% of the brick face",
      "Confirm specific product TDS with Mapei — the restoration mortar range is broad; confirm the right product for the substrate",
      "Not suitable for heritage buildings where a full reclaimed brick replacement is required by heritage authority",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
      { name: "Mapei technical support — confirm product and application", url: "https://www.mapei.com/au/en-au/contacts" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#7c3aed",
    name: "Ardex FC Facade Repair Compound / Ardex FG Facade Grout",
    descriptionLine: "Ardex cementitious facade repair and pointing compound — tinted for brick face spall repair and joint restoration — for Class 2 strata building facades — cosmetic only, not structural",
    productType: "Cementitious facade repair compound — colour pigment system",
    filterTags: ["Ardex", "Epoxy-repair", "Cosmetic-only", "Colour-match", "National", "Facade", "AS-3700"],
    techChips: [
      { label: "Cementitious repair", cls: "bg-violet-100 text-violet-800" },
      { label: "Cosmetic only", cls: "bg-amber-50 text-amber-700" },
      { label: "Colour pigment system", cls: "bg-green-50 text-green-700" },
      { label: "National supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex Australia offers a range of cementitious facade repair compounds suitable for brick face spall repair including Ardex FC and related facade repair products. Ardex products are available nationally through trade supply chains and provide good adhesion to prepared cementitious substrates. Site-tint using Ardex mineral colour pigments to match the adjacent brick colour as closely as possible. Confirm the specific Ardex product range and current TDS with Ardex Australia before specifying. Cosmetic repair only — not a structural repair — confirm with engineer that the brick body is structurally sound before proceeding.",
    technicalProperties: [
      "Ardex national distribution network — available through trade supply chains in all states",
      "Compatible mineral pigment system — allows site colour-matching to adjacent brick colour",
      "Good adhesion to prepared cementitious substrates — follow Ardex TDS for substrate preparation and primer requirements",
      "Technical support available — Ardex technical team can advise on product selection for specific substrates and applications",
      "Suitable for isolated brick face spall repair where full replacement is not practicable and a matching replacement brick is not available",
    ],
    limitations: [
      "Cosmetic repair only — does not restore structural capacity; confirm with engineer that brick is structurally sound",
      "Colour match deteriorates with weathering — Ardex compound and original brick weather at different rates",
      "Not suitable for large-area damage — confirm with engineer for damage covering more than 30% of the brick face",
      "Confirm specific product TDS with Ardex — product range changes; confirm current product code before ordering",
      "Not suitable for heritage buildings where a full reclaimed brick replacement is required by heritage authority",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://www.ardex.com.au" },
      { name: "Ardex technical support — confirm product and application", url: "https://www.ardex.com.au/contact" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Sika", label: "Sika" },
  { id: "Mapei", label: "Mapei" },
  { id: "Ardex", label: "Ardex" },
  { id: "Epoxy-repair", label: "Epoxy / face repair" },
  { id: "Cosmetic-only", label: "Cosmetic only" },
  { id: "Colour-match", label: "Colour match" },
  { id: "National", label: "National supply" },
  { id: "Facade", label: "Facade" },
  { id: "AS-3700", label: "AS 3700" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  type: string;
  distribution: string;
  tinting: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  { supplier: "Sika Australia", product: "SikaCem Mortar / SikaRep", type: "Cementitious", distribution: "National", tinting: "Site mineral pigment", keyFeature: "Wide trade supply network", primaryUse: "General brick spall repair" },
  { supplier: "Mapei Australia", product: "Mape-Antique / Mapegrout BM", type: "Cementitious (heritage range)", distribution: "National", tinting: "Mapei mineral pigments", keyFeature: "Heritage-compatible range", primaryUse: "Heritage-compatible spall repair" },
  { supplier: "Ardex Australia", product: "Ardex FC / Ardex FG", type: "Cementitious", distribution: "National", tinting: "Ardex colour pigments", keyFeature: "Broad trade availability", primaryUse: "General brick spall repair" },
];

const TECH_INFO = {
  typicalApplications: [
    "Cosmetic face restoration of isolated brick spalls on Class 2 strata building facades where the brick body is structurally intact and a matching replacement brick cannot be sourced",
    "Restoration of chipped brick arrises following impact damage or construction activity where full brick replacement would be disproportionate",
    "Temporary face repair pending future full brick replacement works where programme and budget do not allow immediate replacement",
  ],
  selectionCriteria: [
    "Confirm with the structural engineer that the brick body is structurally sound before accepting a cosmetic face repair",
    "Confirm the spall void is less than approximately 30% of the brick face — larger spalls should be reviewed for full brick replacement",
    "Site-tint the repair compound in good light conditions on a dry day and compare to the adjacent wet and dry brick before applying the full repair",
    "Apply in multiple thin layers — do not apply more than 10–15mm per pass to prevent shrinkage cracking",
    "Advise the building owner that the colour match will deteriorate as the repair compound and surrounding brick weather at different rates",
  ],
  limitations: [
    "Not a structural repair — must not be used to restore a brick with compromised structural capacity or bond to surrounding masonry",
    "Colour match will deteriorate over time — the repair compound and surrounding brick weather at different rates; this is a known limitation of all face repair compounds",
    "Not suitable for large-area damage — epoxy or cementitious face patching covering more than approximately 30% of the brick face is not durable",
    "Not acceptable as a permanent repair on heritage-listed buildings where a heritage authority requires full brick replacement",
    "Do not apply over contaminated surfaces — remove all loose material, salts, oil contamination and mortar residue before application",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs mortar designations and brick grades — face repair compounds are not classified as masonry repair mortar under AS 3700",
    "Manufacturer TDS — confirm specific product, substrate preparation, primer, mixing, application, tinting and curing requirements before specifying",
    "Structural engineer confirmation required that the brick is structurally sound before accepting a cosmetic face repair",
  ],
  suitableDefects: [
    "Isolated brick face spalls where the brick body is structurally intact — surface damage only",
    "Chipped brick arrises following impact or construction damage — cosmetic restoration only",
    "Partial face spalling where the spall void is less than approximately 30% of the brick face",
    "NOT suitable: structurally cracked or delaminated brick — full brick replacement required",
  ],
  typicalSubstrates: [
    "Modern post-1960s fired clay brick — where the brick body is structurally sound and only the face has spalled",
    "Pre-1980s fired clay brick — confirm compatibility of repair compound with existing mortar type before applying",
    "NOT suitable: heritage-listed brick where full reclaimed brick replacement is required",
    "NOT suitable: brick with evidence of ongoing salt attack or moisture-related deterioration — treat the cause before applying face repair",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x";
  limit?: number;
}) {
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
            >
              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                >
                  {src.name}
                  <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
    </div>
  );
}

function CollapsibleCardDetails({
  text,
  chips,
}: {
  text: string;
  chips: { label: string; cls: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function BrickFragmentEpoxyRepairIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is brick fragment epoxy / cementitious face repair?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Brick fragment epoxy or cementitious face repair is a site-tinted mortar compound applied to spalled or chipped brick faces to restore the cosmetic appearance of the facade without full brick replacement. It is a cosmetic repair only — it does not restore structural capacity to a damaged brick.
        </p>
        {expanded && (
          <>
            <p>
              Structural engineer confirmation that the brick body is intact is required before this approach is accepted in lieu of full brick replacement. The repair compound is mixed, tinted with mineral pigments to match the adjacent brick, applied in thin layers to the prepared spall void, and sculpted to restore the original brick profile while plastic.
            </p>
            <p>
              Colour matching is imprecise and will deteriorate as the repair compound and surrounding brick weather at different rates. Patch repairs covering more than approximately 30% of the brick face are not appropriate for cosmetic treatment — full brick replacement should be specified instead.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

function TechCard({
  icon,
  title,
  items,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {icon}
        </div>
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

export function BrickFragmentEpoxyRepairProductSection() {
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
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

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
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable substrates
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (
              <>Hide detail <ChevronUp size={14} /></>
            ) : (
              <>Show detail <ChevronDown size={14} /></>
            )}
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

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — brick face repair compounds — scroll to view all</p>
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
                  active
                    ? "border-sky-950 bg-sky-950 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
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
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
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
            <div
              key={product.name}
              className="flex-none"
              style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
            >
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}
              >
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a
                          href={product.tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a
                        href={product.brandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      >
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips}
                  />
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of brick face repair compound suppliers. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Tinting</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600">{row.tinting}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.keyFeature}</td>
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
