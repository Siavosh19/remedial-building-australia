"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Acid-wash"
  | "Sulphamic"
  | "Efflorescence"
  | "Masonry-cleaning"
  | "Brick"
  | "Concrete"
  | "PPE-required"
  | "Solid-form"
  | "Low-fuming";

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
    fullLabel: "Chemist / Hardware Suppliers",
    brandUrl: "#",
    accentColor: "#0369a1",
    name: "Crystalline sulphamic acid — site-mixed 5–10% solution",
    descriptionLine: "Crystalline sulphamic acid (amidosulfonic acid) — dissolve in water to 5–10% solution on site — milder than HCl — for brick and concrete masonry efflorescence — safer to handle and transport than liquid acid",
    productType: "Sulphamic acid efflorescence remover — crystalline solid — site-mixed — external masonry",
    filterTags: ["Acid-wash", "Sulphamic", "Efflorescence", "Masonry-cleaning", "Brick", "Concrete", "PPE-required", "Solid-form", "Low-fuming"],
    techChips: [
      { label: "Sulphamic acid", cls: "bg-purple-100 text-purple-800" },
      { label: "Crystalline solid", cls: "bg-slate-100 text-slate-700" },
      { label: "Very low fuming", cls: "bg-green-100 text-green-700" },
      { label: "PPE required", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Crystalline sulphamic acid (amidosulfonic acid) is a mild, low-fuming solid acid dissolved in clean water at working concentration (5–10% w/v) for removal of light to moderate efflorescence from brick, concrete, and ceramic tile facades on Class 2 strata buildings. Available from pharmacies, pool supply, and chemical suppliers as crystalline powder or granules. The solid form is significantly safer to transport and store than liquid HCl or phosphoric acid — no liquid acid spill risk during transit. Dissolve in cold water on site at the required concentration before use. Very low fuming — suitable for use in partially occupied buildings or semi-enclosed areas where HCl fuming would be unacceptable. Biodegradable — lower environmental burden in waste water disposal than HCl. Pre-wet the masonry before application; apply with brush or sponge; allow 2–5 minutes dwell; scrub and flush thoroughly with clean water. Do not mix with bleach-based cleaners — chlorine gas can be generated. Prohibited on sandstone, limestone, and calcium silicate brick where acid dissolves the substrate.",
    technicalProperties: [
      "Acid type: Sulphamic acid (amidosulfonic acid) — mild, low-fuming organic acid in crystalline solid form",
      "Site preparation: Dissolve crystals in cold water at 5–10% w/v before use — do not add water to crystals in a sealed container",
      "Very low fuming — suitable for occupied buildings and semi-enclosed courtyards where HCl fuming is not acceptable",
      "Effective for efflorescence and calcium carbonate deposits on fired clay brick, concrete block, and ceramic tile",
      "Solid form — safe to transport and store with no liquid acid spill risk; available from pharmacies and chemical suppliers",
      "Biodegradable — lower environmental burden than HCl in waste water; dilute with large water volume before drain disposal",
      "Standards: AS/NZS 1715 for confined space work; manufacturer SDS must be on site during chemical cleaning operations",
    ],
    limitations: [
      "Less effective than HCl for heavy Portland cement mortar smear — specify HCl or phosphoric acid for thick mortar deposits",
      "Still prohibited on sandstone, limestone, and calcium silicate brick — sulphamic acid dissolves calcium-based substrates",
      "Do not mix with bleach or chlorine-containing cleaners — chlorine gas generation is a risk if products are combined",
      "Multiple applications may be required for severe or deep efflorescence — allow 24-hour drying between application cycles",
      "Higher cost per unit area than HCl for large-scale facade cleaning where HCl is technically appropriate",
      "PPE mandatory — acid-resistant gloves, safety glasses, rubber apron — despite low fuming, the dissolved acid is still corrosive",
    ],
    procurementSources: [
      { name: "Pharmacy / pool supply — sulphamic acid crystals, 500 g to 2 kg packs", url: "https://www.bunnings.com.au" },
      { name: "Chem Supply Australia — bulk sulphamic acid crystals, trade quantities", url: "https://www.chemsupply.com.au" },
      { name: "Blackwoods — sulphamic acid crystals in 5 kg and 25 kg bags for commercial work", url: "https://www.blackwoods.com.au" },
      { name: "Bunnings / Mitre 10 — small packs for residential efflorescence treatment", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "RLA Polymers / Bondall",
    brandUrl: "https://www.bondall.com.au",
    accentColor: "#b45309",
    name: "Pre-mixed sulphamic acid efflorescence remover",
    descriptionLine: "Pre-mixed sulphamic acid efflorescence remover — ready-to-use formulation — for brick and concrete masonry efflorescence — low fuming — hardware and trade supply — PPE required",
    productType: "Sulphamic acid efflorescence remover — pre-mixed RTU — external masonry",
    filterTags: ["Acid-wash", "Sulphamic", "Efflorescence", "Masonry-cleaning", "Brick", "Concrete", "PPE-required", "Low-fuming"],
    techChips: [
      { label: "Sulphamic acid", cls: "bg-purple-100 text-purple-800" },
      { label: "Pre-mixed RTU", cls: "bg-green-100 text-green-700" },
      { label: "Low fuming", cls: "bg-slate-100 text-slate-700" },
      { label: "PPE required", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "RLA Polymers and Bondall manufacture pre-mixed sulphamic acid efflorescence removers distributed through hardware merchants and trade supply outlets for removal of efflorescence and calcium carbonate deposits from brick and concrete masonry on Class 2 strata buildings and residential structures. The pre-mixed formulation provides a consistent working concentration without on-site dissolution of crystals — reducing handling error and ensuring correct acid strength at the point of application. Available in 1 L, 2 L, and 5 L containers from Bunnings, Mitre 10, and trade supply outlets nationally. Low fuming — more suitable than HCl for partially occupied buildings or semi-enclosed areas. Pre-wet the masonry surface before application; apply with brush or sponge; allow dwell time per manufacturer directions; scrub and flush thoroughly. PPE required for all acid cleaning operations. The same substrate prohibitions apply: not for use on sandstone, limestone, or reconstituted stone.",
    technicalProperties: [
      "Pre-mixed at working concentration — no site dissolution step; consistent acid strength at point of application",
      "Sulphamic acid with surfactant — improved wetting and contact on masonry surfaces compared to straight crystal solution",
      "Available in 1 L, 2 L, and 5 L containers — hardware and trade merchant distribution nationally",
      "Low fuming — suitable for partially occupied buildings and semi-enclosed outdoor areas",
      "Effective for light to moderate efflorescence on fired clay brick, concrete block, and concrete surfaces",
      "PPE required: acid-resistant gloves, safety glasses, rubber apron — mandatory regardless of acid concentration",
    ],
    limitations: [
      "Not for heavy mortar smear — specify HCl for thick Portland cement mortar deposits that resist sulphamic acid",
      "Prohibited on sandstone, limestone, marble, or reconstituted stone — acid cleaning damages calcium-based substrates",
      "May require repeat applications for deep or longstanding efflorescence — allow 24 hours drying between cycles",
      "Higher unit cost than site-mixed sulphamic acid crystals for large area cleaning jobs",
      "Confirm compatibility with existing surface treatments or coatings before applying — test inconspicuous area first",
    ],
    procurementSources: [
      { name: "RLA Polymers — specialist masonry care and cleaning products, trade distribution", url: "https://www.rla.com.au" },
      { name: "Bondall — national hardware and trade distribution", url: "https://www.bondall.com.au" },
      { name: "Bunnings / Mitre 10 — pre-mixed efflorescence removers in store nationally", url: "https://www.bunnings.com.au" },
      { name: "Blackwoods / Tradelink — trade quantities for commercial masonry cleaning", url: "https://www.blackwoods.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acid-wash", label: "Acid wash" },
  { id: "Sulphamic", label: "Sulphamic acid" },
  { id: "Efflorescence", label: "Efflorescence" },
  { id: "Masonry-cleaning", label: "Masonry cleaning" },
  { id: "Brick", label: "Clay brick" },
  { id: "Concrete", label: "Concrete" },
  { id: "Solid-form", label: "Solid crystals" },
  { id: "Low-fuming", label: "Low fuming" },
  { id: "PPE-required", label: "PPE required" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  concentration: string;
  compatible: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Chemist / Hardware",
    product: "Crystalline sulphamic acid",
    concentration: "5–10% site-mixed",
    compatible: "Clay brick + concrete",
    distribution: "Chemist / pool supply / hardware",
    keyFeature: "Solid form — safe storage + transport",
    primaryUse: "Efflorescence — occupied areas",
  },
  {
    supplier: "RLA Polymers / Bondall",
    product: "Pre-mixed efflorescence remover",
    concentration: "Pre-mixed RTU",
    compatible: "Clay brick + concrete",
    distribution: "Hardware merchants nationally",
    keyFeature: "Pre-mixed consistent strength",
    primaryUse: "Efflorescence — general use",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Removal of efflorescence (white calcium carbonate salt deposits) from fired clay brick and concrete masonry facades on Class 2 strata buildings",
    "Spot treatment of mild calcium deposits at weep holes and at the base of masonry piers in occupied or semi-enclosed areas",
    "Surface preparation of brick and tile surfaces in occupied residential buildings where HCl fuming is not acceptable",
    "Removal of lime bloom from clay brick or concrete masonry following recent construction or repair work",
    "Cleaning of ceramic tile and grout joints in external paving where sulphamic acid is preferred over HCl to avoid tile glaze etching",
  ],
  selectionCriteria: [
    "Select sulphamic acid where HCl fuming is unacceptable — occupied buildings, semi-enclosed areas, or areas adjacent to sensitive materials",
    "Sulphamic acid is appropriate for light to moderate efflorescence — specify HCl or phosphoric acid for heavy mortar smear",
    "Solid form crystals can be mixed on site to the required working concentration (5–10% w/v) — do not exceed recommended concentration",
    "Pre-wet the masonry surface before any acid application — the same mandatory pre-wetting requirement applies as HCl and phosphoric",
    "Commission a trial area before full-facade treatment — confirm effectiveness on the specific efflorescence type and confirm no substrate damage",
    "PPE mandatory for all acid cleaning work regardless of acid type — acid-resistant gloves, safety glasses, and rubber apron as minimum",
  ],
  limitations: [
    "NEVER use on sandstone, limestone, calcium silicate brick, marble, or reconstituted stone — acid dissolves these calcium-based substrates",
    "Not effective for heavy Portland cement mortar smear — use HCl or phosphoric acid for thick mortar deposits",
    "Do not mix with bleach-based or chlorine-containing cleaners — chlorine gas can be generated when sulphamic acid contacts bleach",
    "Multiple applications may be required for severe or deep-seated efflorescence — allow 24 hours drying between cycles",
    "PPE required despite low fuming — acid-resistant gloves, safety glasses, and rubber apron mandatory for all application work",
  ],
  standardsNotes: [
    "Safe Work Australia Model Code of Practice — hazardous chemicals on construction sites; SDS must be on site",
    "State WHS regulations — handling and storage of corrosive substances; PPE requirements for acid cleaning operations",
    "NATSPEC worksection 03 30 00 — masonry cleaning and pre-treatment specifications",
    "AS 3700 Masonry Structures — masonry surface preparation and cleaning requirements",
    "EPA state regulations — acid waste and rinse water disposal; confirm local requirements before stormwater disposal",
  ],
  suitableDefects: [
    "Efflorescence (white salt deposits) on fired clay brick and concrete masonry facades — light to moderate severity",
    "Lime bloom on new brick or concrete masonry surfaces following recent construction or repair",
    "Calcium deposits on ceramic tile and grout joints in external paving where acid resistance of the tile glaze is confirmed",
    "Surface soiling with calcium-based deposits from water runoff over concrete parapets or sills onto brick or tile below",
    "Mild staining on masonry in occupied buildings or areas where low-fuming acid cleaning is required",
  ],
  typicalSubstrates: [
    "Fired clay face brick and engineering brick — same applications as HCl and phosphoric but gentler; suitable for partially occupied areas",
    "Concrete masonry units (block) and concrete surfaces — sulphamic acid preferred for tile and concrete compared to HCl",
    "Ceramic floor and wall tile and grout joints — sulphamic acid preferred where HCl may etch the tile glaze",
    "NOT suitable: sandstone, limestone, calcium silicate brick (Hebel/Siporex), marble, or reconstituted stone",
    "NOT suitable: surfaces with existing paint or sealant without confirmed compatibility testing",
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
              {src.url && src.url !== "#" ? (
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

export function SulphamicAcidCleanerIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is sulphamic acid efflorescence remover?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Sulphamic acid (amidosulfonic acid) is the mildest of the three common masonry acid cleaners — gentler than both hydrochloric and phosphoric acid. Available as a crystalline solid dissolved on site to 5–10% working solution, or as a pre-mixed ready-to-use formulation. Very low fuming compared to HCl, making it the preferred choice for efflorescence removal in occupied buildings, semi-enclosed courtyards, or areas where HCl fuming is a health or safety concern. The solid crystal form is significantly safer to transport and store than liquid acid cleaners.
        </p>
        {expanded && (
          <>
            <p>
              Sulphamic acid is effective for light to moderate efflorescence on fired clay brick, concrete block, and ceramic tile. It is not a substitute for HCl or phosphoric acid where heavy Portland cement mortar smear is the defect — those require a more aggressive acid cleaner. The same substrate prohibition applies: sulphamic acid must never be used on sandstone, limestone, calcium silicate brick, or reconstituted stone — the acid reacts with calcium compounds in these substrates and causes irreversible damage. Do not mix with bleach or chlorine-based cleaners — chlorine gas can be generated.
            </p>
            <p>
              Pre-wetting is still mandatory before application. Allow the recommended dwell time (usually 2–5 minutes), scrub with a stiff brush, then flush with clean water. For deep or longstanding efflorescence, multiple applications at the recommended concentration are more effective than increasing the acid strength beyond the manufacturer guidance. PPE is mandatory regardless of acid type — acid-resistant gloves, safety glasses, and rubber apron for all sulphamic acid cleaning operations.
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

export function SulphamicAcidCleanerProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 product systems — sulphamic acid efflorescence remover — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
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
                style={{ borderLeftWidth: 4, borderLeftColor: product.accentColor }}
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
                      {product.brandUrl !== "#" && (
                        <a
                          href={product.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
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
              Side-by-side comparison of sulphamic acid efflorescence remover options. Confirm substrate suitability and do not mix with bleach or chlorine-based cleaners.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Concentration</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Compatible</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.concentration}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.compatible}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
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
