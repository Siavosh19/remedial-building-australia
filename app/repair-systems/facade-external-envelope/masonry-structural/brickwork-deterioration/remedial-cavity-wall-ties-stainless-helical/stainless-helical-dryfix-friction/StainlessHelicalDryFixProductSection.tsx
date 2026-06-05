"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Helifix"
  | "Thor-Helical"
  | "DryFix"
  | "BowTie"
  | "Friction-fit"
  | "Helical"
  | "Stainless-316"
  | "No-grout"
  | "National"
  | "AS-3700"
  | "Cavity-tie";

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
    fullLabel: "Helifix Australia",
    brandUrl: "https://www.helifix.com.au",
    tdsUrl: "https://www.helifix.com.au/products/dryfix",
    accentColor: "#0369a1",
    name: "Helifix BowTie DryFix",
    descriptionLine: "Grade 316 stainless helical friction-fit tie installed dry without grout or resin — immediate load transfer through friction engagement with the masonry",
    productType: "DryFix Friction Helical",
    filterTags: ["Helifix", "BowTie", "DryFix", "Friction-fit", "Helical", "Stainless-316", "No-grout", "National", "AS-3700", "Cavity-tie"],
    techChips: [
      { label: "DryFix", cls: "bg-sky-100 text-sky-800" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "No grout", cls: "bg-green-50 text-green-700" },
      { label: "BowTie profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Friction-fit", cls: "bg-amber-50 text-amber-700" },
      { label: "National", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Helifix BowTie DryFix is a Grade 316 stainless steel helical friction-fit tie that is driven directly into pre-drilled holes without grout or resin, providing immediate load transfer through friction engagement with the masonry. The BowTie profile creates a positive friction lock against the walls of the drilled hole in both the outer and inner masonry leaves. DryFix ties are faster to install than grout-in ties and are particularly suited to situations where grout injection into the cavity is impractical — for example, in rain or cold weather, or where cavity conditions prevent grout containment. Available in various lengths to suit different cavity widths and masonry configurations.",
    technicalProperties: [
      "Fix type: DryFix friction — Grade 316 stainless steel — no grout or resin required",
      "BowTie helical profile — positive friction lock against walls of drilled hole in both masonry leaves",
      "AS 3700 compliant — immediate load transfer through friction engagement after installation",
      "Faster installation than grout-in ties — no curing time required",
      "National supply through Helifix authorised distributors",
    ],
    limitations: [
      "Lower load capacity than equivalent grout-in ties — confirm with engineer before specifying for heavy-duty zones",
      "Friction capacity depends on masonry hardness — soft or friable brick may not provide adequate friction engagement",
      "Not suitable as a like-for-like substitute for grout-in ties without engineer confirmation",
      "Hole diameter tolerance critical — oversized holes reduce friction engagement significantly",
    ],
    procurementSources: [
      { name: "Helifix Australia — national distribution through authorised remedial distributors", url: "https://www.helifix.com.au" },
      { name: "Remedial building specialist suppliers — national", url: "https://www.helifix.com.au" },
      { name: "Helifix website — find nearest distributor", url: "https://www.helifix.com.au" },
    ],
  },
  {
    fullLabel: "Thor Helical Australia",
    brandUrl: "https://www.thorhelical.com.au",
    tdsUrl: "https://www.thorhelical.com.au/dryfix-ties",
    accentColor: "#b45309",
    name: "Thor Helical DryFix Stainless Wall Tie",
    descriptionLine: "Grade 316 stainless helical DryFix friction tie for rapid no-grout remedial installation — immediate load capacity without curing time",
    productType: "DryFix Friction Helical",
    filterTags: ["Thor-Helical", "DryFix", "Friction-fit", "Helical", "Stainless-316", "No-grout", "National", "AS-3700", "Cavity-tie"],
    techChips: [
      { label: "DryFix", cls: "bg-amber-100 text-amber-800" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "No grout", cls: "bg-green-50 text-green-700" },
      { label: "Friction-fit", cls: "bg-slate-100 text-slate-700" },
      { label: "Thor Helical", cls: "bg-amber-50 text-amber-700" },
      { label: "National", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Thor Helical DryFix is a Grade 316 stainless steel helical friction-fit cavity wall tie that is installed without grout or resin — driven directly into pre-drilled holes for immediate installation and use. The helical profile engages with both masonry leaves to provide friction resistance to tension and shear loads without the curing time required by grouted systems. Thor Helical DryFix ties are suited to remedial installations where rapid completion is required or where site conditions prevent wet grout installation. Available in standard and extended lengths to suit different cavity widths.",
    technicalProperties: [
      "Fix type: DryFix friction — Grade 316 stainless steel — no grout or resin required",
      "Standard helical profile — immediate load capacity through friction engagement with masonry",
      "AS 3700 compliant — rotary hammer driven installation — no curing time",
      "Suited to rapid remedial programmes and conditions where wet grout installation is impractical",
      "National supply through Thor Helical specialist distributors",
    ],
    limitations: [
      "Load capacity is lower than grouted helical ties — engineer confirmation required for parapet and high-load zones",
      "Drilled hole diameter must be precisely matched to tie — obtain hole size specification from Thor Helical before drilling",
      "Soft or honeycombed masonry substrates may not provide adequate friction lock",
      "Available through Thor Helical specialist distributors — not from general hardware suppliers",
    ],
    procurementSources: [
      { name: "Thor Helical Australia — national distribution through remedial specialist network", url: "https://www.thorhelical.com.au" },
      { name: "Remedial building contractors and specialist suppliers", url: "https://www.thorhelical.com.au" },
      { name: "Thor Helical website — find nearest authorised distributor", url: "https://www.thorhelical.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Helifix", label: "Helifix" },
  { id: "Thor-Helical", label: "Thor Helical" },
  { id: "DryFix", label: "DryFix" },
  { id: "BowTie", label: "BowTie" },
  { id: "Friction-fit", label: "Friction-fit" },
  { id: "Helical", label: "Helical" },
  { id: "Stainless-316", label: "Stainless 316" },
  { id: "No-grout", label: "No grout" },
  { id: "National", label: "National supply" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Cavity-tie", label: "Cavity tie" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  profile: string;
  grade: string;
  grout: string;
  installation: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  { supplier: "Helifix Australia", product: "BowTie DryFix", profile: "BowTie helical", grade: "316 SS", grout: "None", installation: "Rotary hammer driven", keyFeature: "BowTie profile friction lock", primaryUse: "Rapid no-grout tie replacement" },
  { supplier: "Thor Helical Australia", product: "Thor Helical DryFix", profile: "Standard helical", grade: "316 SS", grout: "None", installation: "Rotary hammer driven", keyFeature: "Immediate load capacity", primaryUse: "Site conditions unsuitable for grout" },
];

const TECH_INFO = {
  typicalApplications: [
    "Cavity wall tie replacement where wet grout installation is impractical",
    "Cold or wet weather conditions preventing grout use",
    "Cavities where grout containment cannot be guaranteed",
    "Rapid remedial programmes where curing time is unavailable",
  ],
  selectionCriteria: [
    "Confirm DryFix is acceptable to engineer — load capacity is lower than grouted alternatives",
    "Assess masonry hardness — soft or friable brick substrates may not provide adequate friction engagement",
    "Match tie length precisely to cavity width — measure before ordering",
    "Verify hole diameter specification with supplier before drilling",
  ],
  limitations: [
    "Lower load capacity than grout-in ties — not suitable for all heavy-duty applications without engineer confirmation",
    "Friction engagement depends on masonry hardness and hole accuracy",
    "Not suitable as a standard substitute for grouted ties without engineer sign-off",
    "Hole diameter tolerance is critical — oversized holes reduce friction significantly",
  ],
  standardsNotes: [
    "AS 3700 Masonry Structures — tie structural requirements apply",
    "Engineer must confirm DryFix is acceptable for the specific load case",
    "Product-specific load data must be sourced from each supplier",
  ],
  suitableDefects: [
    "Failed or corroded original cavity wall ties where grouting is impractical",
    "Urgent stabilisation where grouted tie curing time cannot be accommodated",
    "Locations where cavity conditions prevent reliable grout containment",
  ],
  typicalSubstrates: [
    "Hard clay brick (most suitable for friction engagement)",
    "Dense calcium silicate brick",
    "Concrete block masonry",
    "Not recommended for soft, friable, or honeycombed masonry without technical confirmation",
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

export function StainlessHelicalDryFixIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are stainless helical DryFix friction-fit cavity wall ties?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          DryFix helical ties are driven directly into pre-drilled holes without grout or resin — the helical profile provides friction engagement with the masonry. They are faster to install than grouted ties and are suited to conditions where wet installation is impractical: cold weather, restricted cavities, or tight programmes.
        </p>
        {expanded && (
          <>
            <p>
              Load capacity is lower than equivalent grout-in ties — structural engineer confirmation is required before substituting DryFix for standard grouted helical ties. The friction engagement depends critically on masonry hardness and on precise drill hole sizing — oversized holes significantly reduce friction performance.
            </p>
            <p>
              Both suppliers listed here supply DryFix ties through specialist remedial distribution networks. Confirm hole diameter specification, tie length, and product-specific load data with each supplier before specifying.
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

export function StainlessHelicalDryFixProductSection() {
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
              <TechCard icon={<BookOpen size={15} />} title="Standards &amp; Notes" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — stainless helical DryFix friction-fit cavity wall ties — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
              Side-by-side comparison of stainless helical DryFix friction-fit cavity wall tie suppliers. Confirm all product selections against current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grout</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Installation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key Feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary Use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grout}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.installation}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyFeature}</td>
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
