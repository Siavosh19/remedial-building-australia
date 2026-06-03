"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Aluminium"
  | "Standard-duty"
  | "Heavy-duty"
  | "Perforated-flange"
  | "External-corner"
  | "Internal-angle"
  | "Masonry"
  | "AAC"
  | "Render"
  | "Exterior"
  | "Interior"
  | "Galvanised";

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
    fullLabel: "Trim-Tex / Rondo",
    brandUrl: "https://www.rondo.com.au",
    tdsUrl: "https://www.rondo.com.au",
    accentColor: "#0369a1",
    name: "Rondo Aluminium Corner Bead (Standard Duty)",
    descriptionLine: "Standard duty aluminium arris corner bead — 25mm x 25mm or 35mm x 35mm flange — exterior and interior render corners on masonry, AAC, and concrete block substrates",
    productType: "Standard duty aluminium arris corner bead",
    filterTags: ["Aluminium", "Standard-duty", "External-corner", "Masonry", "AAC", "Render", "Exterior", "Interior"],
    techChips: [
      { label: "Standard duty", cls: "bg-sky-100 text-sky-800" },
      { label: "25 or 35mm flange", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior and interior", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Standard duty aluminium arris corner beads provide a clean, sharp edge protection at external render corners on masonry, AAC, and concrete block substrates. The perforated flanges embed in the render base coat to lock the bead in position. Standard duty aluminium beads (typically 0.5–0.6mm aluminium) are suitable for sheltered and semi-exposed facades. In coastal and high-exposure environments, consider stainless steel or PVC alternatives to avoid galvanic corrosion. Confirm bead dimensions, leg length, and material thickness with the supplier for each application. TODO: owner confirm — confirm Rondo aluminium corner bead specification, leg dimensions, and material grade.",
    technicalProperties: [
      "Aluminium alloy — standard duty; Perforated flanges for render key",
      "25mm or 35mm leg — confirm from supplier",
      "Suitable for interior and sheltered exterior applications",
      "Embed flanges fully in render base coat",
      "Confirm material thickness — typically 0.5–0.6mm for standard duty",
    ],
    limitations: [
      "Not suitable for coastal or high-corrosion environments — use stainless steel or PVC in those zones",
      "Aluminium may suffer galvanic corrosion where in contact with dissimilar metals in wet conditions",
      "Confirm flange width and leg dimension for specific render depth",
      "TODO: owner confirm — Rondo aluminium bead specification and dimensions",
    ],
    procurementSources: [
      { name: "Rondo Building Services", url: "https://www.rondo.com.au" },
      { name: "Plasterboard and render supply merchants nationally", url: "https://www.rondo.com.au" },
    ],
  },
  {
    fullLabel: "USG Boral",
    brandUrl: "https://www.usgboral.com.au",
    tdsUrl: "https://www.usgboral.com.au",
    accentColor: "#92400e",
    name: "USG Boral Aluminium Arris Bead (Standard / Heavy Duty)",
    descriptionLine: "Aluminium arris corner bead — standard and heavy duty profiles — exterior and interior render — USG Boral distribution",
    productType: "Aluminium arris corner bead — standard and heavy duty",
    filterTags: ["Aluminium", "Standard-duty", "Heavy-duty", "External-corner", "Masonry", "Render", "Exterior", "Interior"],
    techChips: [
      { label: "Standard and heavy duty", cls: "bg-amber-100 text-amber-800" },
      { label: "USG Boral", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior and interior", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "USG Boral supplies aluminium arris and corner beads in standard and heavy duty profiles for render edge protection at external corners. Heavy duty beads (typically 0.8–1.0mm aluminium) are more resistant to impact at high-traffic corners. Confirm available leg dimensions, duty rating, and material thickness with USG Boral. TODO: owner confirm — USG Boral aluminium arris bead specification, dimensions and current range.",
    technicalProperties: [
      "Aluminium — standard and heavy duty profiles",
      "Perforated flanges for render key",
      "Available in various leg lengths — confirm from supplier",
      "Suitable for exterior and interior render",
      "Confirm material thickness for duty classification",
    ],
    limitations: [
      "TODO: owner confirm — USG Boral aluminium arris bead specification and current range",
      "Not for coastal environments — use stainless or PVC",
      "Confirm leg length for render depth",
    ],
    procurementSources: [
      { name: "USG Boral", url: "https://www.usgboral.com.au" },
      { name: "Plasterboard and render supply merchants", url: "https://www.usgboral.com.au" },
    ],
  },
  {
    fullLabel: "Unifix / Buildex",
    brandUrl: "https://www.unifix.com.au",
    tdsUrl: "https://www.unifix.com.au",
    accentColor: "#0f766e",
    name: "Unifix Aluminium Corner Bead (Perforated Flange)",
    descriptionLine: "Aluminium arris corner bead — perforated flange — exterior and interior masonry and render — Unifix / Buildex national distribution",
    productType: "Aluminium arris corner bead — perforated flange",
    filterTags: ["Aluminium", "Perforated-flange", "External-corner", "Masonry", "Render", "Exterior", "Interior"],
    techChips: [
      { label: "Perforated flange", cls: "bg-teal-100 text-teal-800" },
      { label: "Aluminium alloy", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior and interior", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Unifix / Buildex distributes aluminium corner beads with perforated flanges nationally. Confirm the specific product, leg dimensions, and material specification with Unifix / Buildex. TODO: owner confirm — Unifix/Buildex aluminium corner bead specification and dimensions.",
    technicalProperties: [
      "Perforated flanges for render key",
      "Aluminium alloy — confirm grade",
      "Exterior and interior masonry render",
      "Confirm leg dimensions and material thickness from supplier",
    ],
    limitations: [
      "TODO: owner confirm — Unifix/Buildex aluminium bead specification",
      "Not suitable for coastal environments",
    ],
    procurementSources: [
      { name: "Unifix", url: "https://www.unifix.com.au" },
      { name: "Building trade merchants nationally", url: "https://www.unifix.com.au" },
    ],
  },
  {
    fullLabel: "Beadex / Trade Supply",
    brandUrl: "https://www.tradelink.com.au",
    tdsUrl: "https://www.tradelink.com.au",
    accentColor: "#1e40af",
    name: "Trade-Supply Aluminium Arris Bead",
    descriptionLine: "Trade-supply aluminium arris and corner beads — standard and heavy duty — 25–35mm leg — available through plasterboard and render merchants nationally",
    productType: "Trade-supply aluminium arris corner bead",
    filterTags: ["Aluminium", "Standard-duty", "Heavy-duty", "External-corner", "Masonry", "Render", "Exterior", "Interior", "Galvanised"],
    techChips: [
      { label: "Trade supply", cls: "bg-blue-100 text-blue-800" },
      { label: "Standard and heavy duty", cls: "bg-slate-100 text-slate-700" },
      { label: "National availability", cls: "bg-green-50 text-green-700" },
      { label: "Confirm dimensions", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Aluminium arris and corner beads are widely available as standard stock items through plasterboard merchants, render suppliers, and building trade stores nationally. Confirm leg dimensions (25mm, 35mm, or custom), material thickness (standard 0.5mm, heavy duty 0.8mm+), and whether the supplier's product is suitable for external exposed application before purchasing. Galvanised steel variants are also available — confirm material type when ordering.",
    technicalProperties: [
      "Standard stock item — widely available nationally",
      "Available in 25mm and 35mm leg profiles — confirm from merchant",
      "Standard duty 0.5mm or heavy duty 0.8mm+ aluminium",
      "Perforated flanges for render key",
      "Interior and sheltered exterior use",
    ],
    limitations: [
      "Quality varies between suppliers — confirm material thickness and alloy grade",
      "Not suitable for coastal or high-exposure environments without stainless steel or PVC alternative",
      "Confirm leg dimension for render depth",
    ],
    procurementSources: [
      { name: "Tradelink — nationally", url: "https://www.tradelink.com.au" },
      { name: "Plasterboard merchants and render suppliers nationally", url: "https://www.tradelink.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Aluminium", label: "Aluminium" },
  { id: "Standard-duty", label: "Standard-duty" },
  { id: "Heavy-duty", label: "Heavy-duty" },
  { id: "Perforated-flange", label: "Perforated-flange" },
  { id: "External-corner", label: "External-corner" },
  { id: "Internal-angle", label: "Internal-angle" },
  { id: "Masonry", label: "Masonry" },
  { id: "AAC", label: "AAC" },
  { id: "Render", label: "Render" },
  { id: "Exterior", label: "Exterior" },
  { id: "Interior", label: "Interior" },
  { id: "Galvanised", label: "Galvanised" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  flangeType: string;
  legSize: string;
  dutyRating: string;
  suitableEnvironment: string;
  primaryUse: string;
}[] = [
  {
    product: "Rondo Aluminium Corner Bead (Standard Duty)",
    brand: "Rondo",
    material: "Aluminium alloy",
    flangeType: "Perforated",
    legSize: "25mm or 35mm — confirm",
    dutyRating: "Standard duty",
    suitableEnvironment: "Sheltered and semi-exposed — not coastal",
    primaryUse: "Exterior and interior render corners — masonry, AAC, concrete block",
  },
  {
    product: "USG Boral Aluminium Arris Bead",
    brand: "USG Boral",
    material: "Aluminium alloy",
    flangeType: "Perforated",
    legSize: "Confirm from USG Boral",
    dutyRating: "Standard and heavy duty",
    suitableEnvironment: "Exterior and interior — not coastal",
    primaryUse: "Render edge protection at external corners",
  },
  {
    product: "Unifix Aluminium Corner Bead",
    brand: "Unifix / Buildex",
    material: "Aluminium alloy",
    flangeType: "Perforated",
    legSize: "Confirm from Unifix",
    dutyRating: "Confirm from supplier",
    suitableEnvironment: "Exterior and interior — not coastal",
    primaryUse: "Masonry render corner protection — nationally distributed",
  },
  {
    product: "Trade-Supply Aluminium Arris Bead",
    brand: "Trade supply",
    material: "Aluminium alloy / galvanised steel",
    flangeType: "Perforated",
    legSize: "25mm or 35mm",
    dutyRating: "Standard (0.5mm) or heavy duty (0.8mm+)",
    suitableEnvironment: "Interior and sheltered exterior — not coastal",
    primaryUse: "General render corner protection — widely available",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "External facade render corners — protecting arris from impact and chipping",
    "Window and door reveals — corner bead at head and jamb render terminations",
    "Masonry wall corners — render edge protection at building external corners",
    "Balcony and terrace wall corners — render protection at high-traffic corner locations",
    "Internal render corners on exposed masonry blockwork",
  ],
  selectionCriteria: [
    "Material — aluminium standard or heavy duty for sheltered environments; stainless steel for coastal and high-corrosion environments; PVC where metal beads are not suitable",
    "Leg length — confirm leg length matches render depth (total render thickness including scratch and finish coat)",
    "Duty rating — standard duty for sheltered applications, heavy duty for corners subject to impact",
    "Flange type — perforated flange for render key, mesh wing where fibreglass mesh reinforcement is required at corner",
  ],
  limitations: [
    "Aluminium beads are not suitable for coastal or highly corrosive environments — use grade 316 stainless steel in those applications",
    "Do not install aluminium beads in contact with dissimilar metals in wet conditions (galvanic corrosion risk)",
    "Leg length must suit the render depth — too long a leg will telegraph through the render finish",
    "Cut ends must be clean to prevent snag during render application",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures (render to masonry requirements)",
    "NCC Volume One — facade weatherproofing requirements",
    "Manufacturer product guide — confirm material, duty rating, and leg dimensions",
  ],
  suitableDefects: [
    "Spalled or damaged arris beads at render corners — full removal and replacement",
    "New render installation where beads are absent or corroded",
    "Render cracking and delamination at external corners — remove and replace corner bead as part of render repair",
  ],
  typicalSubstrates: [
    "Masonry — brick and block",
    "AAC (autoclaved aerated concrete) — lightweight block",
    "Concrete — external concrete facades",
    "Existing render substrate (where full removal and replacement of render is included in scope)",
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

export function AluminiumArrisIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are aluminium arris and corner angle beads?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Aluminium arris and corner angle beads are extruded aluminium profiles installed at external render corners to protect the arris (the sharp edge where two render planes meet) from chipping, impact damage, and deterioration.
        </p>
        {expanded && (
          <>
            <p>
              They are embedded in the render base coat with perforated flanges that key into the render to lock the bead in position. Standard duty aluminium beads (0.5–0.6mm alloy) are used in sheltered and semi-exposed interior and exterior locations. Heavy duty beads (0.8mm+) are used at high-traffic corners subject to impact. In coastal and corrosive environments, aluminium beads are not suitable — grade 316 stainless steel or PVC alternatives should be specified.
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

export function AluminiumArrisProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — aluminium arris and corner angle beads — scroll to view all</p>
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
              Side-by-side comparison of aluminium arris and corner angle bead products. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Flange type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Leg size</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Duty rating</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Suitable environment</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.flangeType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.legSize}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.dutyRating}</td>
                  <td className="px-4 py-3 text-slate-600">{row.suitableEnvironment}</td>
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
