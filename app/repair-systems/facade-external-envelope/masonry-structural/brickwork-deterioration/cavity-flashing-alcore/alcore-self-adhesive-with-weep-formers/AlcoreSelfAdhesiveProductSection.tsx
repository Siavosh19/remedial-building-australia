"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Alcore"
  | "Proofex"
  | "Grace-GCP"
  | "Self-adhesive"
  | "Integral-weep-formers"
  | "Bonded-DPC"
  | "Remedial"
  | "AS-3700"
  | "National";

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
    fullLabel: "Alcore Australia",
    brandUrl: "https://www.alcore.com.au",
    accentColor: "#0369a1",
    name: "Alcore Australia — Self-Adhesive Cavity Flashing with Integral Weep Formers",
    descriptionLine: "Alcore's self-adhesive bitumen-aluminium composite with integral weep former geometry — single product provides flashing and weep outlet in one installation step",
    productType: "Self-adhesive bitumen-aluminium composite with integral weep formers",
    filterTags: ["Alcore", "Self-adhesive", "Integral-weep-formers", "Bonded-DPC", "Remedial", "AS-3700", "National"],
    techChips: [
      { label: "Self-adhesive bitumen layer", cls: "bg-sky-100 text-sky-800" },
      { label: "Integral weep formers", cls: "bg-green-50 text-green-700" },
      { label: "Dry substrate required", cls: "bg-red-50 text-red-700" },
      { label: "Primer recommended", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Alcore's self-adhesive range with integral weep formers combines the bitumen-aluminium composite flashing with factory-formed weep outlet geometry. The self-adhesive backing bonds the flashing to the lintel or masonry substrate, eliminating the need for mortar hold-down or separate fixing. Integral weep formers are spaced at 450mm centres in the standard product — complying with AS 3700 in a single installation step. Substrate must be dry, clean, and primed as per Alcore's recommendations before peeling and pressing the backing. Do not install below 5°C or above 35°C ambient temperature. Lap all joints a minimum of 100mm and seal with compatible tape — the self-adhesive layer does not replace lap sealing tape.",
    technicalProperties: [
      "Construction: aluminium foil + bitumen + self-adhesive layer — peel-back backing paper for bonded DPC installation",
      "Integral weep formers at 450mm centres — AS 3700 compliant in one installation step",
      "Available widths: 200mm, 300mm, 450mm — roll lengths 10m, 20m",
      "Install temperature: 5°C to 35°C ambient — substrate must be dry, clean, and primed",
      "Lap requirement: minimum 100mm + compatible tape — self-adhesive layer does not replace lap tape",
      "Eliminates need for separate weep former installation — reduces installation steps in remedial and new construction",
    ],
    limitations: [
      "Substrate must be dry, dust-free, and primed — adhesion will fail on damp, dusty or contaminated surfaces",
      "Do not install below 5°C or above 35°C ambient temperature",
      "Self-adhesive layer does not replace lap sealing tape — all joints must still be lapped 100mm and taped",
      "Shorter shelf life than non-adhesive roll form — confirm manufacture date and storage conditions before use",
      "Primer application to substrate is required per Alcore TDS — do not skip primer on masonry or steel substrates",
    ],
    procurementSources: [
      { name: "Alcore Australia — direct supply and distributors nationally", url: "https://www.alcore.com.au" },
      { name: "Masonry and building products merchants — confirm local Alcore distributor", url: "https://www.alcore.com.au" },
    ],
  },
  {
    fullLabel: "Proofex / Tremco Illbruck",
    brandUrl: "https://www.tremco-illbruck.com",
    accentColor: "#b45309",
    name: "Proofex / Tremco Illbruck — Self-Adhesive Cavity Flashing with Weep Former Provision",
    descriptionLine: "Self-adhesive cavity flashing with weep former provision — an alternative to Alcore for bonded cavity DPC installations — available through waterproofing and building products specialists",
    productType: "Self-adhesive bituminous composite cavity flashing — waterproofing specialist brand",
    filterTags: ["Proofex", "Self-adhesive", "Bonded-DPC", "AS-3700"],
    techChips: [
      { label: "Self-adhesive", cls: "bg-amber-100 text-amber-800" },
      { label: "Waterproofing specialist brand", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm product TDS", cls: "bg-red-50 text-red-700" },
      { label: "Primer required", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Proofex (now Tremco Illbruck) supplies self-adhesive bituminous cavity flashing systems through waterproofing specialists and building products distributors. Confirm current product TDS before specifying — Tremco Illbruck's product range has changed following acquisitions. Weep former provision varies by product — confirm whether weep formers are integral or must be installed separately at ordering stage. Substrate must be dry, clean, and primed per manufacturer's TDS before application.",
    technicalProperties: [
      "Construction: bituminous composite — self-adhesive backing",
      "Weep former provision: confirm with current product TDS — may be integral or separate depending on product variant",
      "Distribution: waterproofing specialists and building products distributors",
      "Install temperature: confirm from current TDS",
      "Lap requirement: minimum 100mm + compatible tape",
      "Confirm current product TDS — Tremco Illbruck range has changed post-acquisition of Proofex brand",
    ],
    limitations: [
      "Confirm current product TDS before specifying — Tremco Illbruck product range has changed following acquisition of Proofex",
      "Waterproofing specialist distribution — not available through standard building materials merchants",
      "Weep formers may not be integral — confirm at time of ordering whether separate installation is required",
      "Substrate preparation is critical — adhesion fails on damp or contaminated surfaces",
    ],
    procurementSources: [
      { name: "Tremco Illbruck distributors — waterproofing specialists", url: "https://www.tremco-illbruck.com" },
      { name: "Waterproofing products specialists — confirm local availability", url: "https://www.tremco-illbruck.com" },
    ],
  },
  {
    fullLabel: "Grace / GCP Applied Technologies",
    brandUrl: "https://www.gcpat.com",
    accentColor: "#7c3aed",
    name: "Grace Construction Products — Perm-A-Barrier Cavity Wall Flashing",
    descriptionLine: "Self-adhesive cavity wall flashing membrane — Grace's Perm-A-Barrier or equivalent self-adhesive sheet product for bonded cavity DPC applications — waterproofing-grade performance",
    productType: "Self-adhesive cavity wall flashing membrane — waterproofing grade — engineer specified",
    filterTags: ["Grace-GCP", "Self-adhesive", "Bonded-DPC", "AS-3700"],
    techChips: [
      { label: "Self-adhesive membrane", cls: "bg-violet-100 text-violet-800" },
      { label: "Waterproofing-grade", cls: "bg-green-50 text-green-700" },
      { label: "Engineer specified", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm AU availability", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Grace Construction Products (now GCP Applied Technologies) supplies self-adhesive cavity wall flashing membranes for bonded DPC and flashing applications. The Perm-A-Barrier range and equivalent products provide waterproofing-grade self-adhesive performance, and are typically specified by engineers for high-specification or complex cavity wall applications. Weep formers are typically separate — not integral to the membrane product — and must be installed at 450mm centres per AS 3700. Confirm current product availability for the Australian market and applicable TDS before specifying.",
    technicalProperties: [
      "Construction: self-adhesive waterproofing membrane — Perm-A-Barrier or GCP equivalent product",
      "Waterproofing-grade self-adhesive performance — higher specification than standard bitumen-composite flashing",
      "Distribution: waterproofing specialists and engineer-specified supply chains",
      "Substrate: dry, clean, and primed per GCP TDS before application",
      "Weep formers: separate installation at 450mm centres per AS 3700 — not integral to the membrane",
      "Confirm Australian product availability with GCP Applied Technologies before specifying",
    ],
    limitations: [
      "Confirm Australian product availability with GCP Applied Technologies before specifying — not all Grace products are stocked locally",
      "Weep formers are typically separate — not integral to the membrane product — install at 450mm centres",
      "Higher cost than Alcore products — justified for high-specification or engineer-specified applications only",
      "Waterproofing specialist distribution — not available through standard building merchants",
      "Confirm current product name and TDS — GCP Applied Technologies product range has changed from the original Grace product naming",
    ],
    procurementSources: [
      { name: "GCP Applied Technologies (Grace) — confirm Australian distributor", url: "https://www.gcpat.com" },
      { name: "Waterproofing products specialists — confirm local availability", url: "https://www.gcpat.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Alcore", label: "Alcore" },
  { id: "Proofex", label: "Proofex / Tremco" },
  { id: "Grace-GCP", label: "Grace / GCP" },
  { id: "Self-adhesive", label: "Self-adhesive" },
  { id: "Integral-weep-formers", label: "Integral weep formers" },
  { id: "Bonded-DPC", label: "Bonded DPC" },
  { id: "Remedial", label: "Remedial" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "National", label: "National supply" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  adhesive: string;
  weepFormers: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Alcore Australia",
    product: "Self-Adhesive + Weep Formers",
    adhesive: "Bitumen self-adhesive",
    weepFormers: "Integral — 450mm ctrs",
    distribution: "National — Alcore distributors",
    keyFeature: "Integral weep formers — one step",
    primaryUse: "Bonded DPC — standard and remedial",
  },
  {
    supplier: "Proofex / Tremco Illbruck",
    product: "Self-Adhesive Cavity Flashing",
    adhesive: "Bituminous self-adhesive",
    weepFormers: "Confirm with TDS",
    distribution: "Waterproofing specialists",
    keyFeature: "Waterproofing specialist brand",
    primaryUse: "Bonded DPC — confirm TDS",
  },
  {
    supplier: "Grace / GCP",
    product: "Perm-A-Barrier / equivalent",
    adhesive: "Self-adhesive membrane",
    weepFormers: "Separate",
    distribution: "Waterproofing specialists",
    keyFeature: "Waterproofing-grade adhesion",
    primaryUse: "Engineer-specified / high-specification",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Fully bonded cavity DPC installations where adhesion to the substrate is required to eliminate movement or displacement during construction",
    "Remedial over-lintel flashings where bonded installation reduces the need for disturbing mortar joints during installation",
    "New construction where improved adhesion and integrated weep formers reduce installation steps and programme time",
    "Applications where displacement of the flashing during masonry construction above is a risk — particularly wide cavities with tall inner leaf",
  ],
  selectionCriteria: [
    "Select self-adhesive Alcore where a bonded DPC is required or where weep former integration reduces installation steps",
    "Particularly suitable for remedial over-lintel applications where bonding to the existing lintel reduces movement and displacement risk",
    "Remove backing paper progressively and press firmly to substrate — do not peel the entire length before pressing",
    "Substrate must be dry, dust-free, and primed as per Alcore TDS before application — adhesion will fail on contaminated surfaces",
    "Lap all joints minimum 100mm and seal with compatible tape regardless of the self-adhesive backing",
  ],
  limitations: [
    "Substrate preparation is critical — adhesion fails on dusty, damp or oily surfaces — do not skip primer",
    "Do not install below 5°C or above 35°C ambient temperature — self-adhesive performance degrades outside this range",
    "The self-adhesive layer does not replace lap sealing tape — all laps must be sealed with compatible tape",
    "Self-adhesive products have a shorter shelf life than roll-form — confirm manufacture date and storage conditions before use",
    "Not suitable for direct application to contaminated or deteriorated substrates — prepare all surfaces before application",
  ],
  standardsNotes: [
    "AS 3700 Masonry Structures — governs flashing installation, upstand dimension, lap requirements, and weep former spacing",
    "Alcore self-adhesive products tested to relevant BS EN and Australian standards for self-adhesive DPC performance",
    "NCC Volume One — facade waterproofing performance requirements for Class 2 buildings",
    "Weep formers at 450mm centres per AS 3700 — integral weep formers in Alcore self-adhesive product satisfy this requirement in one installation step",
  ],
  suitableDefects: [
    "Absent or failed cavity flashing where bonded installation over existing masonry or lintel is required",
    "Remedial over-lintel flashings where displacement of the flashing during masonry reconstruction is a risk",
    "New construction where fully-bonded DPC with integrated weep formers is specified by engineer",
    "Wide-span lintel applications where mechanical bonding of the flashing to the lintel is required to prevent sag",
  ],
  typicalSubstrates: [
    "Clean, primed clay brick and calcium silicate brick masonry — dry substrate mandatory for adhesion",
    "Concrete masonry blocks and in-situ concrete lintels — primed per Alcore TDS",
    "Steel lintels — primed with compatible primer per manufacturer TDS before self-adhesive application",
    "NOT suitable: damp, dusty or contaminated substrates — adhesion will fail without correct substrate preparation",
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

export function AlcoreSelfAdhesiveIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is self-adhesive cavity flashing with integral weep formers?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Self-adhesive cavity flashing with integral weep formers combines a bitumen-aluminium composite cavity flashing with a factory-applied self-adhesive backing and weep outlet geometry. The self-adhesive backing bonds the flashing directly to the substrate, eliminating the need for mortar hold-down, while integral weep formers provide the required AS 3700 drainage outlets in a single installation step.
        </p>
        {expanded && (
          <>
            <p>
              This product is particularly suited to remedial over-lintel applications where bonding the flashing to the existing lintel or masonry substrate reduces movement and displacement risk during masonry reconstruction above. It is also used in new construction to reduce installation steps and programme time.
            </p>
            <p>
              Substrate preparation is critical — the self-adhesive layer will not bond to damp, dusty or contaminated surfaces. Prime all substrates per the manufacturer's TDS before application. Lap all joints a minimum of 100mm and seal with compatible tape — the self-adhesive backing does not replace lap sealing tape.
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

export function AlcoreSelfAdhesiveProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 suppliers — self-adhesive cavity flashing with weep formers — scroll to view all</p>
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
              Side-by-side comparison of self-adhesive cavity flashing with weep former products. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Adhesive type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weep formers</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.adhesive}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.weepFormers}</td>
                  <td className="px-4 py-3 text-slate-600">{row.distribution}</td>
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
