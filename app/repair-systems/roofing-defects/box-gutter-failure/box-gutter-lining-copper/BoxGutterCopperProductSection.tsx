"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Copper"
  | "Austral"
  | "Calder"
  | "Heritage"
  | "Premium"
  | "Natural-patina";

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
    accentColor: "#7c2d12",
    name: "Austral Lead & Metals Copper Sheet (box gutter)",
    descriptionLine: "Austral copper sheet 0.6mm to 1.0mm for custom-formed box gutter lining. Naturally forms verde-gris patina. Premium material — used for heritage and high-specification Class 2 strata buildings.",
    productType: "Copper sheet — 0.6mm to 1.0mm — custom-formed box gutter lining — heritage and premium",
    filterTags: ["Copper", "Austral", "Heritage", "Premium", "Natural-patina"],
    techChips: [
      { label: "Austral Lead & Metals", cls: "bg-orange-100 text-orange-800" },
      { label: "0.6mm to 1.0mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Natural patina", cls: "bg-green-50 text-green-700" },
      { label: "Heritage / premium", cls: "bg-amber-50 text-amber-700" },
      { label: "Specialist contractor required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Austral Lead & Metals is an Australian specialist supplier of copper sheet, lead sheet, and architectural metals for roofing and heritage applications. Their copper sheet range in 0.6mm to 1.0mm thickness is the standard material for custom-formed copper box gutter lining on heritage buildings and high-specification Class 2 strata buildings in Australia. Copper box gutter lining is a premium product — it is significantly more expensive than Colorbond steel or aluminium lining — and is specified primarily where the building's heritage status, owner preference, or architect specification requires copper. Over time, copper naturally develops a verde-gris (verdigris) patina — a blue-green oxide layer — which is considered aesthetically desirable in heritage and premium contexts. The patina also provides an additional protective layer for the underlying copper. Copper box gutter lining fabrication requires a specialist copper plumber or roofer with experience in copper work. Joints can be soldered (preferred for watertight integrity) or mechanically formed — soldered joints provide the most reliable waterproof connection. Copper must never be in direct contact with aluminium, zinc, or zinc-coated steel (galvanised or Zincalume) — galvanic corrosion will occur. Copper runoff in stormwater can also cause staining and corrosion of downstream aluminium and zinc surfaces. Confirm heritage requirements and specialist contractor availability before specifying.",
    technicalProperties: [
      "Electrolytic copper sheet — 99.9% pure copper — 0.6mm to 1.0mm thickness",
      "Naturally forms verde-gris patina over time — protective oxide layer — aesthetically valued in heritage and premium applications",
      "Soldered joints — tin-lead or lead-free solder — provide monolithic, watertight connection — preferred joint method",
      "Long service life — correctly installed copper box gutter linings can last in excess of 50 years",
      "Premium material — highest cost of the three lining materials (copper, aluminium, Colorbond) — confirm budget before specifying",
      "Requires specialist copper plumber or roofer — not installed by a general roofing contractor",
      "Suitable for heritage buildings, architect-specified projects, and premium Class 2 strata applications",
    ],
    limitations: [
      "Must NOT contact aluminium, zinc, zinc-coated steel (galvanised), or Zincalume — rapid galvanic corrosion will occur — install isolation between copper and incompatible metals",
      "Copper stormwater runoff will stain and corrode downstream aluminium and zinc surfaces — consider downstream material compatibility before specifying",
      "Requires a specialist copper plumber or roofer — not installed by general roofing contractors — confirm contractor availability before specifying",
      "Highest cost lining material — confirm budget and cost comparison with aluminium and Colorbond alternatives",
      "Soldering requires skill and specialist equipment — poor solder joints are a primary failure mode in copper gutter work",
      "Copper is a soft metal — susceptible to physical damage from foot traffic, debris impact, and careless maintenance access",
      "Thermal expansion must be accommodated in the design — copper expands significantly with temperature — expansion joints and sliding details required",
    ],
    procurementSources: [
      { name: "Austral Lead & Metals — trade supply", url: "https://www.australlead.com.au" },
      { name: "Local copper plumbing and roofing specialists", url: "https://www.plumber.com.au" },
    ],
  },
  {
    fullLabel: "Calder Industrial Metals",
    brandUrl: "https://www.calderindustrial.com.au",
    accentColor: "#0369a1",
    name: "Calder Industrial Copper Sheet (box gutter)",
    descriptionLine: "Calder Industrial copper sheet in standard architectural thicknesses for box gutter lining fabrication. Alternative supplier to Austral Lead & Metals.",
    productType: "Copper sheet — architectural thickness — custom-formed box gutter lining — alternative supplier",
    filterTags: ["Copper", "Calder", "Heritage", "Premium"],
    techChips: [
      { label: "Calder Industrial", cls: "bg-sky-100 text-sky-800" },
      { label: "Architectural thickness", cls: "bg-slate-100 text-slate-700" },
      { label: "Alternative to Austral", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage / premium", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Calder Industrial Metals supplies copper sheet in standard architectural thicknesses for box gutter lining fabrication as an alternative to Austral Lead & Metals. For projects where Austral Lead & Metals is not the preferred supplier or where competitive pricing is required, Calder Industrial provides an alternative source of copper sheet for specialist fabricators and copper plumbers. The fabrication, jointing, installation, dissimilar metal precautions, and specialist contractor requirements are identical to those for Austral-supplied copper sheet — the material specification is the same regardless of which supplier provides the copper coil or sheet. When obtaining copper sheet from Calder Industrial, confirm the required thickness, temper (half-hard is standard for box gutter work), and any certification requirements. Obtain competitive quotations from both Austral Lead & Metals and Calder Industrial for copper sheet supply on larger projects.",
    technicalProperties: [
      "Copper sheet in standard architectural thicknesses — confirm required thickness (typically 0.6mm to 1.0mm) at time of order",
      "Alternative supplier to Austral Lead & Metals — competitive sourcing option for copper sheet",
      "Same fabrication, jointing, and installation requirements as Austral-supplied copper sheet",
      "Confirm temper (half-hard standard for box gutter work) and certification requirements at time of order",
    ],
    limitations: [
      "All standard copper box gutter precautions apply — no contact with aluminium, zinc, or zinc-coated steel",
      "Specialist copper plumber or roofer required — same as for Austral-supplied copper sheet",
      "Confirm alloy specification, temper, and available thickness with Calder Industrial before specifying",
      "Confirm current stock availability and lead time before programming works",
      "All thermal expansion and joint design requirements are identical to Austral copper sheet — the supplier does not change the design requirements",
    ],
    procurementSources: [
      { name: "Calder Industrial Metals — trade supply", url: "https://www.calderindustrial.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Copper", label: "Copper" },
  { id: "Austral", label: "Austral Lead & Metals" },
  { id: "Calder", label: "Calder Industrial" },
  { id: "Heritage", label: "Heritage" },
  { id: "Premium", label: "Premium" },
  { id: "Natural-patina", label: "Natural patina" },
];

const SYSTEM_COMPARISON: {
  product: string;
  supplier: string;
  thickness: string;
  patina: string;
  heritage: string;
  cost: string;
  specialistContractor: string;
}[] = [
  {
    product: "Austral Copper Sheet",
    supplier: "Austral Lead & Metals",
    thickness: "0.6mm to 1.0mm",
    patina: "Yes — natural verde-gris over time",
    heritage: "Yes — primary heritage and premium specification",
    cost: "Premium — highest cost of all lining materials",
    specialistContractor: "Yes — specialist copper plumber/roofer required",
  },
  {
    product: "Calder Industrial Copper Sheet",
    supplier: "Calder Industrial Metals",
    thickness: "Confirm at order — standard architectural thicknesses",
    patina: "Yes — same as Austral copper",
    heritage: "Yes — equivalent material, alternative supplier",
    cost: "Premium — confirm pricing vs Austral at time of order",
    specialistContractor: "Yes — specialist copper plumber/roofer required",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Heritage building box gutter lining where heritage authority or heritage architect requires copper to match the original building specification",
    "High-specification Class 2 strata buildings where the owner, architect, or building manager requires copper for long service life and patina aesthetics",
    "Replacement of failed original copper box gutter lining on older strata buildings — like-for-like replacement",
    "Architect-specified premium residential or mixed-use buildings where copper is specified for aesthetic reasons",
  ],
  selectionCriteria: [
    "Heritage requirement — confirm with the heritage authority or heritage architect whether copper is mandatory or whether alternatives are acceptable",
    "Budget — copper is the most expensive lining material — confirm budget and compare with aluminium and Colorbond alternatives",
    "Specialist contractor — confirm availability of a specialist copper plumber or roofer in the project area before specifying",
    "Thickness — 0.6mm to 1.0mm — confirm required thickness with the roofing engineer based on gutter width and design loads",
    "Joint method — soldered joints preferred — confirm fabricator has soldering capability",
    "Dissimilar metals — survey the existing roof assembly for aluminium, zinc, and zinc-coated steel that will contact copper drainage water",
    "Downstream materials — consider stormwater runoff path and downstream material compatibility before specifying copper",
  ],
  limitations: [
    "Copper must NOT contact aluminium, zinc, or zinc-coated steel (galvanised or Zincalume) without appropriate isolation — galvanic corrosion will destroy the less noble metal",
    "Copper stormwater runoff is corrosive to aluminium and zinc — assess downstream material impacts before specifying",
    "Requires specialist copper plumber or roofer — not installed by general roofing contractors",
    "Most expensive lining option — cost must be justified by heritage requirement, owner preference, or long-term value argument",
    "Soft material — susceptible to damage from foot traffic, tools, and debris — post-installation maintenance access must be carefully managed",
    "Do not specify copper if the existing roof assembly includes aluminium or zinc flashings or downpipes that cannot be replaced or isolated",
  ],
  standardsNotes: [
    "AS 1562.3 — Design and Installation of Sheet Metal Roof and Wall Cladding — Part 3: Aluminium — note: copper is typically specified under AS 1562.1 (Part 1: Steel) or separate heritage authority guidelines",
    "Heritage authority requirements — confirm local heritage authority requirements for copper specification on heritage-listed buildings",
    "AS 3500.3 — Plumbing and Drainage — Stormwater Drainage — hydraulic design requirements for box gutters",
    "Galvanic series — copper is highly noble in the galvanic series — all adjacent metals must be compatible or isolated",
    "Specialist contractor requirements — confirm that the appointed contractor has demonstrated copper roofing and soldering capability",
  ],
  suitableDefects: [
    "Heritage building copper box gutter failure — like-for-like replacement of failed original copper lining",
    "Corroded copper lining requiring full replacement on heritage or premium strata buildings",
    "New copper box gutter lining specified by heritage architect or owner for a premium strata project",
  ],
  typicalSubstrates: [
    "Existing timber box gutter structure — must be structurally sound before copper lining is installed",
    "All substrate types must be checked for incompatible metals before installing copper lining — no aluminium or zinc contact",
    "Install isolation membrane or separator between copper lining and any incompatible substrate or structure",
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
      <p
        className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}
      >
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

export function BoxGutterCopperIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are copper box gutter lining systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Copper box gutter lining systems use custom-fabricated electrolytic copper sheet, soldered or mechanically formed by a specialist copper plumber or roofer, to line an existing box gutter structure. Copper is specified as the premium and heritage lining material for box gutters — it is significantly more expensive than Colorbond steel or aluminium, but offers the longest service life and develops a distinctive verde-gris patina over time that is valued in heritage and high-specification contexts.
        </p>
        {expanded && (
          <>
            <p>
              Copper box gutter work is a specialist trade requiring a qualified copper plumber or roofer with experience in copper forming and soldering. Soldered joints are the standard joint method for copper box gutter linings — they provide a monolithic, watertight connection that is more reliable than mechanical lap joints sealed with mastic. Copper must never contact aluminium, zinc, or zinc-coated steel (galvanised or Zincalume) without appropriate isolation — the galvanic potential between copper and these metals is sufficient to cause rapid corrosion of the less noble metal.
            </p>
            <p>
              Heritage authorities in most Australian states require like-for-like replacement of original copper gutters on heritage-listed buildings. On non-heritage buildings, copper is specified by choice — it must be justified on the basis of long-term value, aesthetics, or owner preference given its significantly higher cost compared to steel or aluminium alternatives.
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

export function BoxGutterCopperProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 suppliers — copper sheet box gutter lining — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} shown
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
                  <div className="mt-0.5">
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

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of copper sheet box gutter lining suppliers. Confirm all product selections against the current supplier specification before ordering.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Patina</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Specialist contractor</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600">{row.patina}</td>
                  <td className="px-4 py-3 text-slate-600">{row.heritage}</td>
                  <td className="px-4 py-3 text-slate-600">{row.cost}</td>
                  <td className="px-4 py-3 text-slate-600">{row.specialistContractor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
