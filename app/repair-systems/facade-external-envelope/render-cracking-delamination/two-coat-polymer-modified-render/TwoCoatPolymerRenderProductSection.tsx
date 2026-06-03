"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Polymer-modified" | "Two-coat" | "Concrete-masonry"
  | "Render-repair" | "AS-3700" | "Scratch-float"
  | "Pre-bagged" | "Fibre-reinforced";

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
    tdsUrl: "https://aus.sika.com/en/solutions-products/product-finder.html",
    accentColor: "#cc0000",
    name: "SikaTop Armatec 110 / SikaRenderEM",
    descriptionLine: "Polymer-modified two-coat render system — scratch coat and finish coat — concrete and masonry substrates — Class 2 strata facade repair",
    productType: "Polymer-modified two-coat render",
    filterTags: ["Polymer-modified", "Two-coat", "Concrete-masonry", "Render-repair", "Scratch-float", "Pre-bagged"],
    techChips: [
      { label: "Polymer-modified", cls: "bg-sky-100 text-sky-800" },
      { label: "Two-coat system", cls: "bg-slate-100 text-slate-700" },
      { label: "Scratch + finish", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-bagged powder", cls: "bg-green-50 text-green-700" },
      { label: "AS 3700 render", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika's polymer-modified two-coat render system for facade repair on concrete and masonry substrates uses SikaRenderEM as the base/scratch coat and a compatible Sika finish render as the float coat. SikaRenderEM is a pre-bagged, polymer-modified cementitious render that incorporates acrylic polymer powder to improve adhesion, flexibility, and water resistance compared to traditional sand/cement mixes. The polymer content reduces cracking tendency and improves compatibility with existing painted or previously rendered substrates where bonding conditions are challenging.\n\nIn Australian Class 2 strata facade remediation, the two-coat polymer-modified render system is specified where existing render has delaminated, cracked, or is structurally unsound — replacing the render back to the substrate and reinstating a sound, crack-resistant render profile. The scratch coat (8–12mm) is applied and combed to provide a mechanical key, allowed to partially cure, then the finish coat (6–8mm) is applied to achieve the required profile and texture. For applications over existing render patches or where the substrate is dense concrete, a bonding primer (such as SikaBond or SikaCem Slurry) may be required to achieve adequate bond.\n\nConfirm current product names, mix ratios, primer compatibility, and maximum application thickness per coat with Sika Australia before specifying.",
    technicalProperties: [
      "Polymer-modified — improved flexibility and adhesion over traditional sand/cement render",
      "Scratch coat 8–12mm + finish coat 6–8mm — total system 14–20mm",
      "Pre-bagged powder — consistent mix ratio — no site batching of polymer additives required",
      "Water resistance improved over conventional sand/cement render — reduces moisture ingress",
      "Compatible with Sika bonding slurries and primers for dense or low-absorption substrates",
      "Can be textured or floated to required surface finish before topcoat application",
    ],
    limitations: [
      "Must not be applied thicker than maximum per coat specified in TDS — risk of sag, cracking, and delamination",
      "Requires a suitable bonding primer on dense, low-absorption, or painted substrates — do not apply direct to contaminated surfaces",
      "Do not apply in direct sun or on substrates above 35°C without hot-weather precautions",
      "Minimum ambient temperature 5°C — do not apply in freezing conditions",
      "Confirm current product name and formulation with Sika Australia — range may have changed",
      "Not a structural repair — substrate defects (corroding reinforcement, carbonation) must be addressed before rendering",
    ],
    procurementSources: [
      { name: "Sika Australia — contact for current pricing and trade supply", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Boral Trade (building materials supply)", url: "https://www.boral.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products-catalogue",
    accentColor: "#0055A5",
    name: "Mapei Planitop XS / Planitop Smooth & Repair",
    descriptionLine: "Polymer-modified fine render and smoothing mortar — two-coat repair system — concrete and masonry facades — Class 2 strata buildings",
    productType: "Polymer-modified two-coat render",
    filterTags: ["Polymer-modified", "Two-coat", "Concrete-masonry", "Render-repair", "AS-3700", "Pre-bagged"],
    techChips: [
      { label: "Polymer-modified", cls: "bg-sky-100 text-sky-800" },
      { label: "Fine aggregate", cls: "bg-slate-100 text-slate-700" },
      { label: "Two-coat system", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-bagged", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Mapei's polymer-modified render system for facade repair uses Planitop XS (a polymer-modified, fibre-reinforced repair mortar) as the base layer and Planitop Smooth & Repair as a fine-finish skim or topping coat. The Planitop range is designed for concrete repair and render reinstatement on facades, with the acrylic polymer component providing improved adhesion, reduced shrinkage cracking, and water resistance compared to plain sand/cement mortars.\n\nIn Australian Class 2 strata render remediation, the Mapei Planitop system is used by contractors working within the Mapei supply ecosystem. The polymer-modified chemistry allows application to previously painted or sealed surfaces (with appropriate primer) and provides a base that resists the salt and moisture cycling common in coastal strata buildings. Planitop XS can be applied at 5–30mm depth, making it suitable for both thin patch repairs and full render coat replacement.\n\nConfirm current product names, application thickness, and primer requirements with Mapei Australia before specifying.",
    technicalProperties: [
      "Polymer-modified mortar — improved adhesion, flexibility, and water resistance",
      "Planitop XS: 5–30mm per coat — versatile thickness range for patch and full coat",
      "Fibre-reinforced formulation reduces plastic shrinkage cracking during cure",
      "Pre-bagged — consistent polymer content — no site addition of polymer admixtures",
      "Compatible with Mapei Planitop Slurry bonding agent for dense substrates",
      "Final surface suitable for overcoating with Mapei texture coatings or standard acrylic paint systems",
    ],
    limitations: [
      "Maximum per-coat thickness must not exceed TDS specification — excessive thickness causes sag and cracking",
      "Bonding primer (Planitop Slurry or equivalent) required on dense, glazed, or contaminated substrates",
      "Not suitable for substrates with active moisture ingress — address source of moisture before rendering",
      "Confirm current product name and equivalent in the current Mapei Australia range before ordering",
      "Do not apply below 5°C or in direct sun — follow hot/cold weather application guidelines",
    ],
    procurementSources: [
      { name: "Mapei Australia — contact for current pricing and trade supply", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Haymes Paint (trade supplier)", url: "https://www.haymes.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc Australia",
    brandUrl: "https://www.fosroc.com/en-au",
    tdsUrl: "https://www.fosroc.com/en-au/products",
    accentColor: "#007A33",
    name: "Fosroc Renderoc Classic / Renderoc FC",
    descriptionLine: "Polymer-modified cementitious render mortar — two-coat facade repair system — concrete and masonry substrates — strata and commercial buildings",
    productType: "Polymer-modified two-coat render",
    filterTags: ["Polymer-modified", "Two-coat", "Concrete-masonry", "Render-repair", "AS-3700", "Pre-bagged", "Scratch-float"],
    techChips: [
      { label: "Polymer-modified", cls: "bg-sky-100 text-sky-800" },
      { label: "Renderoc range", cls: "bg-slate-100 text-slate-700" },
      { label: "Two-coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-bagged", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Fosroc's Renderoc range provides polymer-modified render mortars for facade repair and reinstatement. Renderoc Classic is a one-component, polymer-modified, cementitious render mortar suitable for rendering over concrete and masonry substrates as part of a two-coat system, while Renderoc FC (fine coat) is used as a finish render coat over the base Renderoc scratch coat. The acrylic polymer modification improves adhesion over existing dense or painted substrates (with appropriate bonding agent) and provides better crack resistance and water resistance than plain sand/cement mixes.\n\nIn Australian Class 2 strata remediation, the Fosroc Renderoc system is used by remedial contractors who have an established Fosroc supply relationship. The system is particularly valued in commercial and higher-grade strata projects where a documented, engineered render system with consistent product specifications is required for project QA and defect liability purposes. The Renderoc range also integrates with Fosroc Nitobond bonding agents and Conbextra grouting products used in the broader repair specification.\n\nConfirm current product names, system specification (scratch + finish coats), and primer compatibility with Fosroc Australia before specifying.",
    technicalProperties: [
      "Polymer-modified cementitious render — improved adhesion, water resistance, and crack resistance",
      "Renderoc Classic: scratch/base coat 8–15mm; Renderoc FC: finish coat 3–6mm",
      "Single-component pre-bagged powder — consistent formulation — no site batching",
      "Designed for use with Fosroc Nitobond bonding agents on dense or contaminated substrates",
      "Part of an integrated Fosroc repair system — compatible with injection and carbonation protection products",
      "Suitable for application on concrete and masonry walls and columns in strata and commercial facade repair",
    ],
    limitations: [
      "Requires Fosroc Nitobond bonding agent on dense, low-absorption, or previously painted substrates",
      "Not suitable for application over active water leaks or saturated substrates",
      "Maximum per-coat thickness as specified in TDS — do not over-apply in single pass",
      "Confirm current product name and formulation with Fosroc Australia — Renderoc range has multiple grades",
      "Do not apply in ambient temperatures below 5°C without Fosroc technical approval",
    ],
    procurementSources: [
      { name: "Fosroc Australia — contact for current pricing and trade supply", url: "https://www.fosroc.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Two-coat", label: "Two-coat" },
  { id: "Pre-bagged", label: "Pre-bagged" },
  { id: "Scratch-float", label: "Scratch & float" },
  { id: "Concrete-masonry", label: "Concrete/masonry" },
  { id: "Render-repair", label: "Render repair" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Fibre-reinforced", label: "Fibre-reinforced" },
];

const COMPARISON_ROWS: {
  product: string; brand: string; type: string;
  scratchCoat: string; finishCoat: string; polymerContent: string; keyFeature: string;
}[] = [
  { product: "SikaRenderEM", brand: "Sika", type: "Polymer-modified render", scratchCoat: "8–12mm", finishCoat: "6–8mm", polymerContent: "Acrylic polymer", keyFeature: "Part of integrated Sika repair system" },
  { product: "Planitop XS", brand: "Mapei", type: "Polymer-modified repair mortar", scratchCoat: "5–30mm", finishCoat: "Planitop Smooth 2–6mm", polymerContent: "Acrylic polymer + fibre", keyFeature: "Wide thickness range — patch to full coat" },
  { product: "Renderoc Classic / FC", brand: "Fosroc", type: "Polymer-modified render", scratchCoat: "8–15mm", finishCoat: "3–6mm FC", polymerContent: "Acrylic polymer", keyFeature: "Integrated with Nitobond bonding system" },
];

const TECH_INFO = {
  typicalApplications: [
    "Full render replacement over concrete or masonry where existing render has delaminated or is hollow-sounding on test",
    "Patch repair of failed render areas before overcoating the entire facade — match render profile and texture",
    "Re-rendering after concrete repair to column soffits, spandrel beams, and wall panels",
    "Render reinstatement on strata building facades after salt attack or moisture-related render loss",
    "Two-coat render over new masonry infill panels after window replacement or balustrade replacement",
  ],
  selectionCriteria: [
    "Sika SikaRenderEM: first choice where Sika supply chain is preferred — integrates with Sika bonding and injection range",
    "Mapei Planitop XS: use where variable thickness is needed — wide 5–30mm range suits both thick and thin applications",
    "Fosroc Renderoc: use where Fosroc supply relationship is established — integrates with Nitobond bonding agent range",
    "All three systems require bonding primer on dense, low-absorption, or painted substrates — confirm compatibility",
    "For fibre-reinforced render specification, check if product includes fibre or specify FibreReinforced variant",
  ],
  limitations: [
    "Polymer-modified render does not eliminate the need for substrate preparation — all loose, contaminated, and poorly bonded material must be removed before application",
    "Maximum coat thickness must not be exceeded — overly thick single coats sag, crack, and delaminate",
    "Not suitable over active water leaks, carbonated or chloride-contaminated concrete without prior remediation of the defect cause",
    "Render cracking that reflects from the underlying substrate (structural movement) will recur unless movement is controlled",
    "Polymer-modified renders are not breathable in the same way as sand/cement renders — confirm vapour permeability requirements for substrate",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs render thickness, mix specification, and application requirements for masonry substrates",
    "AS 3600 — Concrete Structures — governs concrete repair including render reinstatement over concrete",
    "NCC Section 3 — Building Fabric — performance requirements for external walls including facade render durability",
    "CSIRO cement render guide — specifies mix ratios, substrate preparation and curing requirements for standard render systems",
  ],
  suitableDefects: [
    "Delaminated or hollow-sounding render — loss of bond between render and substrate",
    "Cracked render — map cracking, shrinkage cracking, or structural crack reflection through existing render",
    "Spalled render — render layer physically separated and falling from substrate",
    "Render missing from areas — patches where render has been removed or has fallen away",
    "Re-render required after concrete repair — areas where concrete repair has restored the substrate profile but requires a cosmetic render coat",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete walls, columns, spandrels, and soffits — most common substrate in Class 2 strata facade repair",
    "Masonry brick and block walls — clay brick and concrete block — confirm render mix suitability with manufacturer for masonry",
    "Autoclaved aerated concrete (AAC) — requires specific render formulation — confirm with manufacturer",
    "Previously rendered surfaces after removal of failed render — confirm substrate cleanliness and absorption before re-rendering",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : <span className="font-semibold text-slate-600">{src.name}</span>}
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

export function TwoCoatPolymerRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are two-coat polymer-modified render systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Two-coat polymer-modified render systems are the standard remedial render specification for concrete and masonry facade repair on Class 2 strata buildings. A scratch coat (base coat) of polymer-modified render is applied to the prepared substrate and allowed to partially cure before the finish coat is applied to achieve the required surface profile and texture. The acrylic polymer modification improves adhesion, reduces shrinkage cracking, and increases water resistance compared to traditional sand/cement renders.</p>
        {expanded && (
          <>
            <p>In Australian strata remediation, polymer-modified renders have largely replaced traditional OPC/sand site-batched renders for facade repair because the pre-bagged, factory-controlled formulation provides more consistent results — the polymer content, aggregate grading, and admixture balance are factory-set, eliminating the mix ratio variability that causes premature render failure from the site batching of conventional mixes.</p>
            <p>The two-coat sequence is critical: applying the full render thickness in a single coat risks sagging during application and shrinkage cracking during cure. The scratch coat provides the substrate key and bulk thickness; the finish coat provides the final texture profile that is either left as a float finish or overcoated with a texture coat or paint system. Both coats must be cured appropriately, and the finish coat must be applied before the scratch coat has fully hardened to ensure adequate inter-coat adhesion.</p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
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

export function TwoCoatPolymerRenderProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, product selection, render technique, limitations, standards and substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Product Selection" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — Sika / Mapei / Fosroc</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5"><p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p></div>
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

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Two-coat polymer-modified render system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">All systems require bonding primer on dense substrates. Confirm current product names with manufacturers.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Scratch coat</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish coat</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Polymer</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Sika" ? "#cc0000" : row.brand === "Mapei" ? "#0055A5" : "#007A33" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.scratchCoat}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finishCoat}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.polymerContent}</td>
                  <td className="px-4 py-3 text-slate-500">{row.keyFeature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
