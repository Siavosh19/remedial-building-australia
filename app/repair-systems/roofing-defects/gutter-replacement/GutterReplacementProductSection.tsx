"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Gutter"
  | "Fascia-gutter"
  | "Quad"
  | "Half-round"
  | "Colorbond"
  | "Steel"
  | "Leaf-guard"
  | "Mesh"
  | "Replacement";

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
    fullLabel: "Lysaght",
    brandUrl: "https://www.lysaght.com",
    tdsUrl: "https://www.lysaght.com",
    accentColor: "#ef4444",
    name: "Lysaght Quad Fascia Gutter",
    descriptionLine: "Pre-formed Colorbond steel quad profile fascia gutter — most common external gutter profile for pitched roof replacement on Class 2 strata buildings",
    productType: "Colorbond steel quad profile fascia gutter",
    filterTags: ["Gutter", "Fascia-gutter", "Quad", "Colorbond", "Steel", "Replacement"],
    techChips: [
      { label: "Colorbond steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Quad profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Fascia-mounted", cls: "bg-slate-100 text-slate-700" },
      { label: "Pitched roof", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 2179", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght Quad Fascia Gutter is a pre-formed Colorbond steel quad profile fascia gutter — the most widely used external gutter profile on Australian Class 2 strata pitched-roof buildings. The quad profile (D-section with flat back) is bracket-mounted to the fascia board and provides a generous cross-section for roof drainage. Available in the full BlueScope Colorbond colour range to match existing roof and fascia trim. Used in full gutter replacement where existing gutters have failed through corrosion, joint failure, inadequate fall, or undersizing.\n\nSize selection must be confirmed by hydraulic design against the roof catchment area and local design rainfall intensity (AS/NZS 3500.3). Common residential sizes are 115 mm and 150 mm — confirm with the installed fascia board dimension and roof pitch. Confirm current colour availability with BlueScope/Lysaght before specification.",
    technicalProperties: [
      "Colorbond steel — ZINCALUME core with Colorbond paint system — corrosion-resistant for Australian coastal and inland environments",
      "Quad (D) profile — traditional and widely stocked profile — brackets and fittings readily available nationally",
      "Full BlueScope Colorbond colour range — colour-match to existing roof sheeting and fascia trim",
      "Pre-formed lengths — butt-jointed in-situ with gutter sealant and union clips — confirm joint detail with installer",
      "Compatible with standard Lysaght quad gutter brackets, stop ends, outlet holes and union pieces",
    ],
    limitations: [
      "Gutter cross-section must be confirmed by hydraulic design to AS/NZS 3500.3 — do not rely on matching existing undersized profile",
      "Colorbond colour must be confirmed against BlueScope current colour chart — discontinued colours require approval from building manager and owners corporation",
      "Gutter fall toward outlet must be a minimum 1:500 — confirm fascia board level is satisfactory before installation",
      "Butt joints and union pieces require correct gutter sealant application — omission causes leak-back to fascia and soffit",
      "Confirm current product specification and availability with Lysaght / BlueScope before specifying",
    ],
    procurementSources: [
      { name: "Lysaght / BlueScope — trade supply nationally — contact for current pricing", url: "https://www.lysaght.com" },
      { name: "Stratco — trade and retail nationally", url: "https://www.stratco.com.au" },
      { name: "Roofing trade distributors — confirm current stock and colour availability", url: "https://www.lysaght.com" },
    ],
  },
  {
    fullLabel: "Lysaght",
    brandUrl: "https://www.lysaght.com",
    tdsUrl: "https://www.lysaght.com",
    accentColor: "#3b82f6",
    name: "Lysaght Half-Round Fascia Gutter",
    descriptionLine: "Pre-formed Colorbond steel half-round profile fascia gutter — traditional profile suited to heritage or period-style buildings",
    productType: "Colorbond steel half-round profile fascia gutter",
    filterTags: ["Gutter", "Fascia-gutter", "Half-round", "Colorbond", "Steel", "Replacement"],
    techChips: [
      { label: "Colorbond steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Half-round profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Fascia-mounted", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage profile", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 2179", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght Half-Round Fascia Gutter is a pre-formed Colorbond steel half-round profile gutter for pitched-roof buildings. The half-round profile is a traditional form suited to heritage, period-style and older Class 2 strata buildings where the round profile matches the existing architectural character. Available in the BlueScope Colorbond colour range. Used as a like-for-like replacement of existing half-round gutters where the original profile must be retained for aesthetic or heritage reasons.\n\nHalf-round gutters have a smaller cross-sectional area than a quad gutter of the same nominal width — confirm hydraulic adequacy against roof catchment and design rainfall. Confirm bracket type and spacing with the installer — half-round gutter requires a full-length bracket supporting the curved base rather than a fascia-mount hook type. Confirm current colour availability and fittings range with Lysaght before specification.",
    technicalProperties: [
      "Colorbond steel — ZINCALUME core — corrosion-resistant in coastal and inland Australian environments",
      "Half-round (semicircular) profile — traditional form suited to heritage and period-style strata buildings",
      "Full BlueScope Colorbond colour range — confirm current range against existing fascia and trim colours",
      "Compatible with half-round gutter fittings — stop ends, outlets, union pieces — confirm current fittings range with Lysaght",
      "Pre-formed lengths — jointed in-situ with gutter sealant and union fittings",
    ],
    limitations: [
      "Half-round profile has a smaller hydraulic cross-section than an equivalent-width quad gutter — confirm sizing by hydraulic design",
      "Less widely stocked than quad profile — confirm availability with supplier before specifying for large gutter replacement projects",
      "Colorbond colour must be matched to existing roof and trim — confirm against current BlueScope colour chart",
      "Gutter fall toward outlet minimum 1:500 — confirm fascia board level before installation",
      "Confirm current product specification and availability with Lysaght / BlueScope before specifying",
    ],
    procurementSources: [
      { name: "Lysaght / BlueScope — trade supply nationally — contact for current pricing and availability", url: "https://www.lysaght.com" },
      { name: "Stratco — trade and retail nationally", url: "https://www.stratco.com.au" },
      { name: "Roofing trade distributors — confirm stock and lead time for half-round profile", url: "https://www.lysaght.com" },
    ],
  },
  {
    fullLabel: "Leaf Stopper",
    brandUrl: "https://www.leafstopper.com.au",
    tdsUrl: "https://www.leafstopper.com.au",
    accentColor: "#22c55e",
    name: "Leaf Stopper Stainless Mesh Gutter Guard",
    descriptionLine: "Fine-weave stainless steel mesh leaf guard fitted over replacement fascia gutters — reduces blockage frequency and maintenance interval",
    productType: "Stainless steel mesh leaf guard for fascia gutters",
    filterTags: ["Leaf-guard", "Mesh", "Steel", "Gutter"],
    techChips: [
      { label: "Stainless steel mesh", cls: "bg-sky-100 text-sky-800" },
      { label: "Leaf guard", cls: "bg-green-50 text-green-700" },
      { label: "Fascia gutter fit", cls: "bg-slate-100 text-slate-700" },
      { label: "Corrosion-resistant", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Leaf Stopper Stainless Mesh Gutter Guard is a fine-weave stainless steel mesh leaf guard system fitted over fascia gutters following gutter replacement. The mesh is formed and secured to the gutter lip and fascia, allowing water to enter while preventing leaf litter, debris and nesting materials from blocking gutters and downpipes. Widely specified on Class 2 strata buildings in tree-lined suburban locations where gutter blockage is a recurring maintenance issue.\n\nLeaf guard reduces the frequency of gutter cleaning maintenance — a meaningful cost reduction for strata buildings with significant tree canopy over the roof. The stainless steel mesh is corrosion-resistant and compatible with Colorbond steel gutters. Leaf Stopper supplies multiple mesh grades — confirm the appropriate mesh aperture for the surrounding vegetation type with Leaf Stopper technical before specification. Installation is typically by Leaf Stopper-trained installers.",
    technicalProperties: [
      "Fine-weave stainless steel mesh — corrosion-resistant — compatible with Colorbond steel fascia gutters",
      "Formed to suit quad and half-round fascia gutter profiles — confirm profile compatibility with Leaf Stopper",
      "Reduces gutter blockage frequency — reduces maintenance call-out cost for strata buildings in tree-lined locations",
      "Multiple mesh grades available — confirm aperture against surrounding vegetation type with Leaf Stopper technical",
      "Installation by Leaf Stopper-trained licensed installers — confirm installer accreditation before engagement",
    ],
    limitations: [
      "Leaf guard does not eliminate gutter maintenance — fine organic debris and moss can still accumulate on mesh surface over time",
      "Mesh aperture must be selected against vegetation type — coarse mesh may not prevent fine debris in areas with needle-leaf species",
      "Installation must not compromise gutter fall or create uplift risk under wind — confirm fixing detail with installer",
      "Not suitable as a substitute for hydraulic upsizing where gutters are undersized — address gutter capacity separately",
      "Confirm current product range, mesh grades and installation requirements with Leaf Stopper before specifying",
    ],
    procurementSources: [
      { name: "Leaf Stopper — supply and install nationally — contact for current pricing", url: "https://www.leafstopper.com.au" },
      { name: "Confirm installer accreditation with Leaf Stopper Australia before engagement", url: "https://www.leafstopper.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Gutter", label: "Gutter" },
  { id: "Fascia-gutter", label: "Fascia-gutter" },
  { id: "Quad", label: "Quad" },
  { id: "Half-round", label: "Half-round" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Steel", label: "Steel" },
  { id: "Leaf-guard", label: "Leaf-guard" },
  { id: "Mesh", label: "Mesh" },
  { id: "Replacement", label: "Replacement" },
];

const BRAND_EQUIV: { system: string; lysaght: string; leafstopper: string }[] = [
  { system: "Quad fascia gutter (Colorbond)", lysaght: "Quad Fascia Gutter", leafstopper: "—" },
  { system: "Half-round fascia gutter (Colorbond)", lysaght: "Half-Round Fascia Gutter", leafstopper: "—" },
  { system: "Stainless mesh leaf guard", lysaght: "—", leafstopper: "Stainless Mesh Guard" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; profile: string; material: string; colorbondAvailable: string; leafGuard: string; primaryUse: string;
}[] = [
  {
    product: "Lysaght Quad Fascia Gutter",
    brand: "Lysaght",
    profile: "Quad (D-section)",
    material: "Colorbond steel",
    colorbondAvailable: "Yes — full range",
    leafGuard: "Compatible",
    primaryUse: "External fascia gutter replacement — pitched roofs — most common profile",
  },
  {
    product: "Lysaght Half-Round Fascia Gutter",
    brand: "Lysaght",
    profile: "Half-round",
    material: "Colorbond steel",
    colorbondAvailable: "Yes — full range",
    leafGuard: "Compatible",
    primaryUse: "External fascia gutter replacement — heritage / period-style buildings",
  },
  {
    product: "Leaf Stopper Stainless Mesh Guard",
    brand: "Leaf Stopper",
    profile: "Mesh over gutter",
    material: "Stainless steel mesh",
    colorbondAvailable: "N/A",
    leafGuard: "Product is leaf guard",
    primaryUse: "Leaf and debris exclusion over replacement fascia gutters",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Full replacement of corroded or joint-failed external fascia gutters on Class 2 strata pitched-roof buildings",
    "Upsizing of undersized fascia gutters confirmed by hydraulic design to AS/NZS 3500.3",
    "Like-for-like quad profile gutter replacement for contemporary strata buildings",
    "Half-round profile replacement for heritage or period-style strata buildings requiring profile match",
    "Installation of leaf guard mesh following gutter replacement on tree-affected strata buildings",
  ],
  selectionCriteria: [
    "Confirm gutter cross-section by hydraulic design against roof catchment area and design rainfall intensity — oversizing preferred for Class 2 strata",
    "Confirm Colorbond colour match against existing roof sheeting and fascia trim — check against current BlueScope colour chart",
    "Select quad profile for contemporary strata buildings — half-round for heritage or period-style buildings requiring profile match",
    "Include leaf guard in scope where surrounding vegetation makes blockage a recurring maintenance issue",
    "Confirm gutter fall (minimum 1:500) toward outlet — check fascia board level before gutter installation",
  ],
  limitations: [
    "Fascia gutter replacement does not address internal box gutter failure — box gutters require a separate lining system",
    "Gutter fall cannot be achieved if fascia board is out of level — rectify fascia before gutter installation",
    "Colorbond colour matching to aged existing material is imprecise — document agreed colour match in writing before ordering",
    "Leaf guard mesh reduces but does not eliminate gutter maintenance requirements over time",
    "Gutter outlet connection to downpipe must be confirmed — do not assume existing downpipe is correctly sized or positioned for replacement gutter",
  ],
  standardsNotes: [
    "AS/NZS 2179 — Gutters and Downpipes — profiles, dimensions and performance for rainwater gutters",
    "AS/NZS 3500.3 — Plumbing and Drainage — Stormwater Drainage — hydraulic sizing of gutters and downpipes",
    "BlueScope Colorbond technical data — current colour range, substrate and coating specification",
    "BCA/NCC — stormwater drainage requirements for Class 2 buildings — confirm applicable section with certifier",
  ],
  suitableDefects: [
    "Corroded or perforated external fascia gutters on pitched-roof Class 2 strata buildings",
    "Failed or leaking butt joints between gutter lengths causing water damage to fascia and soffit",
    "Undersized gutters causing overflow at design rainfall events — confirmed by hydraulic assessment",
    "Gutters with inadequate fall causing ponding, silt accumulation and overflow",
    "Blocked gutters with recurring maintenance issues in tree-affected locations — leaf guard indicated",
  ],
  typicalSubstrates: [
    "Timber fascia board — confirm structural adequacy and level before bracket installation",
    "Aluminium fascia — confirm bracket and screw fixing compatibility with roofing contractor",
    "Existing Colorbond fascia trim — confirm colour match before ordering replacement gutter",
    "Existing downpipe connection — confirm outlet position and pipe size for replacement gutter",
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

export function GutterReplacementIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are fascia gutter replacement systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          External fascia gutters on pitched-roof Class 2 strata buildings fail through corrosion of the steel substrate, failure of butt joints between gutter lengths, undersizing relative to the roof catchment area and design rainfall intensity, and inadequate fall toward the outlet causing ponding and silt accumulation. Replacement is required when repair of the existing gutter is no longer practical — typically where corrosion is widespread, where joints have failed along multiple runs, or where hydraulic assessment confirms the installed profile is undersized.
        </p>
        <p>
          Profile selection is the primary decision in gutter replacement: quad profile is the standard choice for contemporary Class 2 strata buildings and is the most widely stocked profile nationally; half-round profile is selected for heritage or period-style buildings where the traditional rounded form must be retained. Both profiles are available in the full BlueScope Colorbond colour range — colour matching to the existing roof sheeting and fascia trim is a critical project management step and must be agreed in writing with the owners corporation before ordering. Gutter cross-section must be confirmed by hydraulic design against the roof catchment area and local design rainfall intensity (AS/NZS 3500.3) — simply matching the existing profile is not sufficient where undersizing is a suspected cause of overflow.
        </p>
        <p>
          Leaf guard mesh is frequently included in gutter replacement scopes for strata buildings in tree-lined locations where gutter blockage is a recurring maintenance cost. Stainless steel mesh leaf guards fitted over replacement fascia gutters reduce blockage frequency and extend the maintenance interval — a meaningful operational cost reduction for the owners corporation over the building lifecycle. Leaf guard does not eliminate maintenance but materially reduces its frequency.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Box gutters — internal box gutters built into the roof structure require a lining system (not fascia replacement) — a separate repair category",
              "Downpipes — vertical discharge pipes are a separate element; replacement does not address gutter failure",
              "Valley iron — roof valley drainage element at the junction of two roof planes, not an eave gutter",
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

export function GutterReplacementProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 2 brands — gutter replacement systems — scroll to view all</p>
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

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of gutter replacement products for pitched-roof Class 2 strata buildings. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Colorbond available</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Leaf guard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colorbondAvailable}</td>
                  <td className="px-4 py-3 text-slate-600">{row.leafGuard}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Gutter replacement product equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Lysaght</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Leaf Stopper</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.lysaght, row.leafstopper].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Hydraulic sizing and colour matching</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Gutter cross-section must be confirmed against design rainfall intensity (AS/NZS 3500.3) — oversizing is preferred for Class 2 strata; do not simply match the existing profile without hydraulic confirmation",
            "Colorbond colour must match existing roof and trim — check BlueScope colour chart against existing sheeting and fascia before ordering; agree colour match in writing with the owners corporation",
            "Gutter fall toward outlet must be a minimum 1:500 — confirm fascia board level before installation; inadequate fall causes ponding, silt accumulation and overflow at design rainfall events",
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
