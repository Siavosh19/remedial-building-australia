"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Copper"
  | "0.6mm"
  | "0.7mm"
  | "Multiple-thickness"
  | "Heritage"
  | "Natural-patina"
  | "Premium";

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
    fullLabel: "Austral Lead & Metals",
    brandUrl: "https://www.australlead.com.au",
    accentColor: "#b45309",
    name: "Austral Lead & Metals Copper Sheet Valley",
    descriptionLine: "0.6mm and 0.7mm copper sheet valley iron — Austral Lead & Metals — Australian supplier of architectural copper — naturally weathers to verde-gris patina — heritage and premium roofing",
    productType: "Copper sheet valley iron — 0.6mm / 0.7mm — heritage and premium",
    filterTags: ["Copper", "0.6mm", "0.7mm", "Heritage", "Natural-patina", "Premium"],
    techChips: [
      { label: "Copper", cls: "bg-amber-100 text-amber-800" },
      { label: "0.6mm available", cls: "bg-slate-100 text-slate-700" },
      { label: "0.7mm available", cls: "bg-slate-100 text-slate-700" },
      { label: "Natural patina", cls: "bg-green-50 text-green-700" },
      { label: "Heritage", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Austral Lead & Metals Copper Sheet Valley is 0.6mm and 0.7mm copper sheet valley iron supplied by Austral Lead & Metals, an Australian specialist supplier of architectural metals including copper, lead, and zinc for roofing, flashing, and heritage applications. Copper sheet valley flashings are the premium choice for heritage building roofing applications, heritage conservation projects, and high-end residential roofing where a naturally weathering metal that develops a characteristic verde-gris (green) patina over time is required or specified. Copper is self-sealing at minor pinholes and cracks through patination, and is extremely long-lived — correctly installed copper valley flashings can have a service life of 50 to 100 years or more. As supplied, copper sheet is a bright mill finish — it will progressively weather through brown to a stable green patina over several years depending on local environment and rainfall exposure. Where the patina is required to be accelerated or matched to existing patinated copper, chemical patination treatment should be discussed with the supplier. Installation requires a specialist metal roofing contractor experienced in copper work. Copper must not be placed in contact with aluminium, zinc-coated steel, or galvanised steel without an isolating layer — galvanic corrosion will occur at the contact point. Confirm fixing material (copper or stainless steel fixings only) and substrate isolation requirements before installation.",
    technicalProperties: [
      "0.6mm and 0.7mm copper sheet — Australian supplier Austral Lead & Metals — confirm current stock thicknesses and sheet sizes",
      "Naturally weathers to a stable verde-gris (green) patina over time — self-sealing at minor defects through patination",
      "Extremely long service life — correctly installed copper flashings can last 50–100 years or more",
      "Suitable for heritage conservation projects, listed buildings, and premium residential roofing where natural patina is specified",
      "Confirm fixing material: copper or stainless steel fixings only — do not use aluminium, zinc, or galvanised steel fixings",
      "Dissimilar metals must be isolated: do not allow copper to contact aluminium, zinc-coated steel, or galvanised gutters without an isolating layer",
    ],
    limitations: [
      "Requires a specialist metal roofing contractor experienced in copper work — copper is a soft metal that requires specific working techniques different from steel or aluminium valley iron",
      "Higher material cost than aluminium or Colorbond valley iron — premium material cost is offset by long service life",
      "Dissimilar metals precautions: copper must not contact aluminium, zinc-coated steel, or galvanised gutters/battens without an isolating layer — galvanic corrosion will occur",
      "Confirm fixing material: copper or stainless steel fixings only — do not use aluminium, zinc, or steel fixings",
      "Mill-fresh copper will not match the colour of existing patinated copper without chemical treatment — confirm patination requirements with supplier",
      "Confirm thickness and fixing method with a roofing engineer for heritage buildings subject to heritage authority conditions",
      "Confirm current product availability, standard sheet sizes, and lead time from Austral Lead & Metals before ordering",
    ],
    procurementSources: [
      { name: "Austral Lead & Metals — specialist supply", url: "https://www.australlead.com.au" },
      { name: "Heritage roofing metal suppliers — enquire locally", url: "https://www.australlead.com.au" },
    ],
  },
  {
    fullLabel: "Calder Industrial",
    brandUrl: "https://www.calderindustrial.com.au",
    accentColor: "#7c2d12",
    name: "Calder Industrial Copper Sheet",
    descriptionLine: "Copper sheet for valley flashings — 0.6mm to 1.0mm thickness range — Calder Industrial specialist architectural metals — heritage and premium residential and commercial roofing",
    productType: "Copper sheet valley flashing — 0.6mm to 1.0mm — architectural metals specialist",
    filterTags: ["Copper", "Multiple-thickness", "Heritage", "Premium", "Natural-patina"],
    techChips: [
      { label: "Copper", cls: "bg-orange-100 text-orange-800" },
      { label: "0.6–1.0mm range", cls: "bg-slate-100 text-slate-700" },
      { label: "Natural patina", cls: "bg-green-50 text-green-700" },
      { label: "Heritage", cls: "bg-amber-50 text-amber-700" },
      { label: "Architectural metals specialist", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Calder Industrial Copper Sheet is architectural copper sheet supplied by Calder Industrial, a specialist architectural metals supplier in Australia. Calder Industrial provides copper sheet in a thickness range from 0.6mm to 1.0mm for use in valley flashings, roof flashings, and heritage roofing and conservation applications. The broader thickness range (up to 1.0mm) gives Calder Industrial an advantage for heritage applications where a heavier-gauge copper is specified by a heritage engineer or conservation architect — heavier-gauge copper provides additional rigidity and service life in high-exposure or structurally demanding locations. As with all copper sheet valley iron, the product naturally develops a verde-gris (green) patina over time, which is characteristic of architectural copper and is part of the aesthetic and performance design. Installation must be by a specialist metal roofing contractor experienced in copper work. Dissimilar metals precautions apply — copper must not contact aluminium, zinc-coated steel, or galvanised materials without an isolating layer. Confirm available thicknesses, sheet sizes, and lead times from Calder Industrial before specifying.",
    technicalProperties: [
      "Copper sheet in the 0.6mm to 1.0mm thickness range — Calder Industrial specialist architectural metals — broader thickness range than standard 0.6/0.7mm offerings",
      "Suitable for valley flashings, roof flashings, and heritage and conservation roofing applications",
      "Naturally weathers to a stable verde-gris patina — long service life — self-sealing at minor defects through patination",
      "Heavier gauge (0.8mm–1.0mm) available for heritage applications where additional rigidity or service life is specified",
      "Confirm fixing material: copper or stainless steel fixings only — dissimilar metal isolation required",
      "Confirm current product availability, standard sheet sizes, thicknesses, and lead time from Calder Industrial before specifying",
    ],
    limitations: [
      "Requires a specialist metal roofing contractor experienced in copper work — heavier gauge copper requires specific forming and fixing techniques",
      "Higher material cost than aluminium or Colorbond valley iron — and heavier gauge copper has a higher material cost than standard 0.6mm — confirm cost with Calder Industrial",
      "Dissimilar metals precautions: copper must not contact aluminium, zinc-coated steel, or galvanised gutters/battens without an isolating layer",
      "Confirm fixing material: copper or stainless steel fixings only — do not use aluminium, zinc, or steel fixings",
      "Mill-fresh copper does not match the colour of existing patinated copper — discuss patination matching with Calder Industrial if matching to existing heritage copper",
      "Confirm thickness requirement with a roofing engineer for heritage buildings subject to heritage authority or engineer specification",
      "Confirm current product availability, available thicknesses, and lead time from Calder Industrial before ordering",
    ],
    procurementSources: [
      { name: "Calder Industrial — specialist architectural metals", url: "https://www.calderindustrial.com.au" },
      { name: "Heritage roofing contractors and specialist metal suppliers", url: "https://www.calderindustrial.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Copper", label: "Copper" },
  { id: "Heritage", label: "Heritage" },
  { id: "Premium", label: "Premium" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  thickness: string;
  finish: string;
  patina: string;
  heritageUse: string;
  leadTime: string;
  cost: string;
}[] = [
  {
    product: "Austral Copper Sheet",
    brand: "Austral Lead & Metals",
    thickness: "0.6mm, 0.7mm",
    finish: "Mill-bright copper (natural)",
    patina: "Natural verde-gris over time",
    heritageUse: "Yes — Australian heritage supplier",
    leadTime: "Confirm with Austral",
    cost: "Premium — confirm with supplier",
  },
  {
    product: "Calder Copper Sheet",
    brand: "Calder Industrial",
    thickness: "0.6mm to 1.0mm range",
    finish: "Mill-bright copper (natural)",
    patina: "Natural verde-gris over time",
    heritageUse: "Yes — broader thickness range",
    leadTime: "Confirm with Calder",
    cost: "Premium — heavier gauge higher cost",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Valley flashing replacement on heritage-listed or conservation residential buildings where the original or specified material is copper",
    "Premium residential roofing where an architecturally distinguished material with a natural patina is specified",
    "Heritage conservation projects where the building consent or heritage authority conditions specify copper flashings",
    "Valley flashing at the junction of copper gutter systems — where the valley material must be compatible with copper gutters (avoid galvanic corrosion with other metals)",
    "High-end commercial or institutional buildings where long service life and minimal maintenance are priorities",
  ],
  selectionCriteria: [
    "Thickness: 0.6mm is standard for residential valley flashings; 0.7mm or heavier is specified for high-exposure, heritage, or engineer-required applications — confirm from specification",
    "Heritage authority conditions: confirm the specified material and thickness from the heritage consent or heritage architect's specification before ordering",
    "Dissimilar metals: copper must not contact aluminium, zinc-coated steel, or galvanised materials — specify isolating layers at all contact points",
    "Fixing material: copper or stainless steel fixings only — confirm with contractor before installation",
    "Patina matching: mill-fresh copper will not initially match existing patinated copper — discuss patination options with the supplier if colour match is required on day one",
    "Lead time: copper sheet is a specialty product with potentially longer lead times than standard valley iron — confirm lead time before ordering",
  ],
  limitations: [
    "Copper is not appropriate for standard residential valley replacement where heritage or premium specification is not required — specify aluminium or Colorbond instead for cost-effectiveness",
    "Dissimilar metals contact must be prevented: copper causes galvanic corrosion of aluminium and zinc-coated steel — isolating layer required at all contact points",
    "Specialist contractor required: do not install with a standard roofing contractor unfamiliar with copper work — incorrect installation may compromise the service life and performance",
    "Higher material cost than aluminium or Colorbond — factor into the budget before specifying",
    "Mill-fresh copper does not match patinated copper aesthetically without chemical treatment — manage client expectations on appearance at installation vs long-term patina",
  ],
  standardsNotes: [
    "AS 1432 — Copper tubes for plumbing, gasfitting and drainage applications — relevant for copper product specification in Australian building applications",
    "AS 1562.1 — Design and Installation of Sheet Roof and Wall Cladding (Metal) — covers valley flashing requirements including minimum width, lap, and fixing",
    "Heritage council and local heritage authority conditions — may specify material type, thickness, fixing method, and patina matching for heritage buildings",
    "Roofing engineer specification — for heavier-gauge copper and heritage applications, confirm all requirements with a roofing engineer before specifying",
  ],
  suitableDefects: [
    "Valley leaks on heritage-listed or conservation residential buildings where copper is the specified or existing flashing material",
    "Failed or deteriorated copper valley flashings on premium or heritage buildings where like-for-like replacement is required",
    "Valley flashing at copper gutter junctions where material compatibility is required to prevent galvanic corrosion",
  ],
  typicalSubstrates: [
    "Roof battens — copper valley iron must be fixed to battens with copper or stainless steel fixings only — do not use steel or aluminium fixings",
    "Sarking and isolating layers — at all points where copper contacts dissimilar metals, an isolating layer of butyl tape, bitumen felt, or similar must be provided",
    "Heritage tile substrate — terracotta and concrete tiles — confirm valley width and lap at eave from tile manufacturer's fixing guide and heritage specification",
    "Copper gutters — copper valley iron should lap into copper gutters where possible to avoid dissimilar metals contact — confirm with roofing engineer if mixing metal types",
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

export function ValleyFlashingCopperIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are copper valley flashings?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Copper valley flashings are formed from pure copper sheet and are installed in the valley of a pitched tiled or slate roof to collect and direct rainwater to the gutters. Copper is the premium-grade material for architectural valley flashings and is the specified material on heritage buildings, conservation projects, and high-end residential roofing where long service life, natural patina development, and material authenticity are required.
        </p>
        {expanded && (
          <>
            <p>
              As-supplied copper sheet is a bright, reddish-brown mill finish. Over time, it weathers through brown to a characteristic stable green (verde-gris) patina that is both protective and aesthetically distinctive. The patination process is natural and self-healing at minor surface defects — it is a feature, not a failure, of copper roofing.
            </p>
            <p>
              Copper is a soft, workable metal that requires a specialist metal roofing contractor for installation. Dissimilar metals precautions are critical — copper must not be placed in direct contact with aluminium, zinc-coated steel, galvanised battens or gutters, or other metals lower in the galvanic series without an isolating layer. Galvanic corrosion at the contact point will accelerate corrosion of the less noble metal. Confirm fixing material (copper or stainless steel only) and all isolation requirements with the specialist contractor and roofing engineer before installation.
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

export function ValleyFlashingCopperProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter as FilterTag));

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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — copper sheet valley flashing suppliers only — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
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
              style={{ width: "calc(50% - 10px)", minWidth: "300px" }}
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
              Side-by-side comparison of copper valley flashing suppliers. Confirm all product selections against the current manufacturer data before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Patina</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage use</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lead time</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cost</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600">{row.patina}</td>
                  <td className="px-4 py-3 text-slate-600">{row.heritageUse}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.leadTime}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
