"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Colorbond"
  | "Head-flashing"
  | "Zincalume"
  | "Steel"
  | "Factory-folded"
  | "Site-folded"
  | "Inland-zone"
  | "Non-combustible"
  | "Drip-edge"
  | "Anti-capillary"
  | "Bluescope"
  | "Low-cost";

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
    fullLabel: "BlueScope / Colorbond",
    brandUrl: "https://www.colorbond.com/",
    tdsUrl: "https://www.colorbond.com/products/colorbond-ultra-steel/",
    accentColor: "#b45309",
    name: "Colorbond Ultra Factory Head Flashing",
    descriptionLine: "Colorbond Ultra factory-folded head flashing — colour-matched to cladding — 27 standard colours — C4 coastal rated — anti-capillary groove",
    productType: "Factory-Folded Colorbond Head Flashing",
    filterTags: ["Colorbond", "Head-flashing", "Steel", "Factory-folded", "Non-combustible", "Anti-capillary", "Bluescope"],
    techChips: [
      { label: "Colorbond Ultra Steel", cls: "bg-amber-100 text-amber-800" },
      { label: "Factory CNC Folded", cls: "bg-slate-100 text-slate-700" },
      { label: "27 Standard Colours", cls: "bg-stone-100 text-stone-700" },
      { label: "Anti-capillary Groove", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Colorbond Ultra factory-folded head flashings are the most common colour-matched flashing in Australian residential and light commercial cladding. Factory-folded on CNC press-brake equipment, the Colorbond Ultra base steel provides improved corrosion resistance over standard Colorbond — rated for zones up to C4 (coastal, non-marine). Available in 27 standard Colorbond colours, allowing exact colour-matching to adjacent Colorbond Walling or Colorbond-coloured FC cladding. Anti-capillary grooves can be factory-formed at the drip nose.",
    technicalProperties: [
      "Material: Colorbond Ultra steel — G550 zinc/aluminium/magnesium alloy coated",
      "Gauge: 0.48 mm or 0.55 mm BMT",
      "Colorbond paint system: polyester topcoat + primer",
      "Corrosion zone: C1–C4 (inland to coastal, non-marine)",
      "Colour range: 27 standard Colorbond colours",
      "Anti-capillary: factory-formed groove at drip nose; max single length: 6,000 mm",
    ],
    limitations: [
      "Not suitable for marine zone < 1 km from ocean — use anodised alum or SS316",
      "Cut edges corrode — factory trim cut edges with zinc-rich primer on site",
      "Colorbond colours are specific — confirm current colour chart before specifying",
      "Cannot be field-folded without damaging paint — factory fold only",
      "Dissimilar metal contact with aluminium subframe — isolate with EPDM tape",
    ],
    procurementSources: [
      { name: "BlueScope Steel / Colorbond — national", url: "https://www.colorbond.com/" },
      { name: "Stratco — Colorbond flashings", url: "https://www.stratco.com.au/" },
    ],
  },
  {
    fullLabel: "BlueScope / Stratco",
    brandUrl: "https://www.bluescope.com.au/",
    tdsUrl: "https://www.bluescope.com.au/our-products/zincalume-steel/",
    accentColor: "#0369a1",
    name: "Zincalume Site-Folded Head Flashing",
    descriptionLine: "Zincalume coil stock — site-folded for remediation — paintable on site — inland zones — C3 zone rated",
    productType: "Site-Folded Zincalume Head Flashing",
    filterTags: ["Zincalume", "Head-flashing", "Steel", "Site-folded", "Inland-zone", "Non-combustible", "Low-cost", "Bluescope"],
    techChips: [
      { label: "Zincalume Coil Stock", cls: "bg-sky-100 text-sky-800" },
      { label: "Site-Folded", cls: "bg-green-100 text-green-700" },
      { label: "Paintable On Site", cls: "bg-slate-100 text-slate-700" },
      { label: "Inland Zones", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription:
      "Zincalume coil stock (Al/Zn alloy coating on steel base) is a cost-effective site-foldable flashing material for inland zones where colour-matching is not required. Site-folded on a portable metal bender, Zincalume provides significantly better corrosion resistance than galvanised steel, with the 55% aluminium / 43.5% zinc / 1.5% silicon coating offering sacrificial protection at cut edges. Can be painted on site with a compatible primer and topcoat — useful when flashings will be visible but colour is required. Not suitable for coastal or marine zones without additional protective coating.",
    technicalProperties: [
      "Material: Zincalume — AZ150 Al/Zn/Si alloy coating",
      "Gauge: 0.55 mm or 0.75 mm coil",
      "Coating weight: AZ150 — 150 g/m² total (both sides)",
      "Paintable: self-etch primer + topcoat on site",
      "Corrosion zone: C1–C3 (inland, general) without coating",
      "Site folder: portable 1,800 mm capacity; cut edges: apply zinc-rich primer within 24 hr of cutting",
    ],
    limitations: [
      "Not suitable for coastal or marine zones — use anodised alum or SS316",
      "Cut edges must be primed within 24 hr — rust staining otherwise",
      "Site folding less precise than factory — inspect each length",
      "Not colour-matched unless painted on site (lower quality than Colorbond factory finish)",
      "Contact with copper or lead will accelerate corrosion — isolate",
    ],
    procurementSources: [
      { name: "BlueScope Steel — national", url: "https://www.bluescope.com.au/" },
      { name: "Stratco — national trade supply", url: "https://www.stratco.com.au/" },
    ],
  },
  {
    fullLabel: "Stratco / Metroll",
    brandUrl: "https://www.stratco.com.au/",
    accentColor: "#7c3aed",
    name: "Colorbond Walling Stock Head Flashing Profile",
    descriptionLine: "Stock Colorbond head flashing profiles — immediate availability — standard sizes — 1–3 day delivery from trade store",
    productType: "Stock Colorbond Head Flashing",
    filterTags: ["Colorbond", "Head-flashing", "Steel", "Factory-folded", "Non-combustible", "Drip-edge", "Bluescope", "Low-cost"],
    techChips: [
      { label: "Stock Profiles — Immediate", cls: "bg-purple-100 text-purple-800" },
      { label: "Colorbond Steel", cls: "bg-green-100 text-green-700" },
      { label: "Standard Sizes", cls: "bg-slate-100 text-slate-700" },
      { label: "Drip Edge Profile", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Stratco and Metroll stock Colorbond head flashing profiles in common sizes (50 mm, 65 mm, 100 mm leg) for immediate availability from trade distribution. These standard drip-angle profiles in popular Colorbond colours (Woodland Grey, Surfmist, Monument) provide a workable solution for urgent remediation work where factory lead times are not available. Standard sizes are pre-folded with drip nose and are suitable for window and door head flashings in standard openings. Custom profiles and non-stock colours require factory order.",
    technicalProperties: [
      "Material: Colorbond steel — standard grade",
      "Gauge: 0.55 mm BMT",
      "Standard profiles: 50 × 50, 65 × 50, 100 × 65 mm",
      "Standard lengths: 2,400 mm and 3,000 mm",
      "Colours in stock: Woodland Grey, Surfmist, Monument (varies by supplier)",
      "Drip nose: 15 mm return at 45°; availability: typically 1–3 day delivery from trade store",
    ],
    limitations: [
      "Stock colours limited — may not match existing cladding colour exactly",
      "Standard sizes only — custom openings require factory-fold order",
      "Not suitable for marine zone",
      "Paint finish is standard Colorbond polyester — lower durability than Colorbond Ultra",
      "Leg dimensions may not suit wide cavity requirements — check before ordering",
    ],
    procurementSources: [
      { name: "Stratco — national trade supply", url: "https://www.stratco.com.au/" },
      { name: "Metroll — national trade supply", url: "https://www.metroll.com.au/" },
    ],
  },
  {
    fullLabel: "Metroll / BlueScope Colorbond",
    brandUrl: "https://www.metroll.com.au/",
    accentColor: "#b45309",
    name: "Colorbond Ultra Anti-Capillary Custom Head Flashing",
    descriptionLine: "Custom Colorbond Ultra with anti-capillary groove and end dams — high-specification — shop drawing — C4 coastal rated",
    productType: "Custom Colorbond Ultra Anti-Capillary Head Flashing",
    filterTags: ["Colorbond", "Head-flashing", "Steel", "Factory-folded", "Non-combustible", "Anti-capillary", "Bluescope"],
    techChips: [
      { label: "Colorbond Ultra — C4 Rated", cls: "bg-amber-100 text-amber-800" },
      { label: "Anti-capillary Groove", cls: "bg-green-100 text-green-700" },
      { label: "Custom Profile — Shop Drawing", cls: "bg-slate-100 text-slate-700" },
      { label: "End Dams Available", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Custom-folded Colorbond Ultra head flashings with anti-capillary groove and optional end dams, manufactured from shop drawings for high-specification residential and commercial cladding remediation. The Colorbond Ultra base material provides the highest corrosion rating in the Colorbond range — suitable for coastal zones (C4) up to 1 km from marine water. The anti-capillary groove at the drip nose prevents water tracking by capillary action back behind the flashing. End dams are factory-folded into the flashing terminations. Lead time 3–5 weeks.",
    technicalProperties: [
      "Material: Colorbond Ultra steel — G550 ZAM alloy",
      "Gauge: 0.55 mm BMT",
      "Anti-capillary groove: 3 mm × 3 mm at drip nose",
      "End dams: 50 mm factory-folded turn-up at each end",
      "Corrosion zone: C1–C4 (coastal, up to 1 km marine)",
      "Colour: any Colorbond colour from current chart; custom profile from shop drawings; lead time: 3–5 weeks",
    ],
    limitations: [
      "Not suitable for marine zone < 1 km ocean — use SS316",
      "Factory lead time 3–5 weeks — plan ahead",
      "Shop drawings must be approved before fabrication — changes add 1–2 weeks",
      "Cut edges must be primed on site — zinc-rich primer within 24 hr",
      "End dams are folded (not welded) — not suitable for pressurised applications",
    ],
    procurementSources: [
      { name: "Metroll — national trade supply", url: "https://www.metroll.com.au/" },
      { name: "BlueScope / Colorbond — national", url: "https://www.colorbond.com/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Colorbond", label: "Colorbond" },
  { id: "Head-flashing", label: "Head flashing" },
  { id: "Zincalume", label: "Zincalume" },
  { id: "Steel", label: "Steel" },
  { id: "Factory-folded", label: "Factory folded" },
  { id: "Site-folded", label: "Site folded" },
  { id: "Inland-zone", label: "Inland zone" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "Drip-edge", label: "Drip edge" },
  { id: "Anti-capillary", label: "Anti-capillary" },
  { id: "Bluescope", label: "BlueScope" },
  { id: "Low-cost", label: "Low cost" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  baseMaterial: string;
  gauge: string;
  folding: string;
  maxZone: string;
  colourMatch: string;
  primaryUse: string;
}[] = [
  {
    product: "Colorbond Ultra Factory",
    brand: "BlueScope / Colorbond",
    baseMaterial: "ZAM alloy steel",
    gauge: "0.55 mm",
    folding: "Factory CNC",
    maxZone: "C4 (coastal)",
    colourMatch: "27 Colorbond colours",
    primaryUse: "Coastal — colour matched",
  },
  {
    product: "Zincalume Site-Folded",
    brand: "BlueScope / Stratco",
    baseMaterial: "AZ150 steel",
    gauge: "0.55–0.75 mm",
    folding: "Site folder",
    maxZone: "C3 (general)",
    colourMatch: "Paintable on site",
    primaryUse: "Inland remediation",
  },
  {
    product: "Colorbond Stock Flashing",
    brand: "Stratco / Metroll",
    baseMaterial: "Standard Colorbond",
    gauge: "0.55 mm",
    folding: "Pre-formed stock",
    maxZone: "C3 (general)",
    colourMatch: "Limited stock colours",
    primaryUse: "Urgent — stock sizes",
  },
  {
    product: "Colorbond Ultra Anti-Cap",
    brand: "Metroll / BlueScope",
    baseMaterial: "ZAM alloy steel",
    gauge: "0.55 mm",
    folding: "Factory CNC custom",
    maxZone: "C4 (coastal)",
    colourMatch: "Any Colorbond colour",
    primaryUse: "High-spec custom — anti-cap",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Window and door head flashings in Colorbond-clad or FC-clad buildings",
    "Colour-matched flashings for residential and light commercial remediation",
    "Parapet cap flashings where Colorbond colour matches the building palette",
    "Cavity base and step flashings in non-coastal zone buildings",
    "Urgent remediation using stock Colorbond profiles — quick availability",
    "Replacement of corroded painted steel head flashings in inland zones",
  ],
  selectionCriteria: [
    "Marine zone < 1 km ocean: SS316 or anodised aluminium — not Colorbond",
    "Coastal zone 200 m–1 km: Colorbond Ultra (C4) or anodised aluminium",
    "General zone > 1 km: standard Colorbond or Zincalume acceptable",
    "Colour-matching required: Colorbond factory-folded (exact colour chart match)",
    "Urgent remediation: stock Colorbond profiles from Stratco / Metroll",
    "Anti-capillary required (critical junction): Colorbond Ultra custom with groove",
  ],
  limitations: [
    "Colorbond paint finish will fade over 10–15 years — not truly maintenance-free",
    "Cut edges of Colorbond corrode — must be primed within 24 hr of cutting",
    "Standard Colorbond not suitable for marine zone — specify Colorbond Ultra at minimum",
    "Dissimilar metal contact: isolate Colorbond from aluminium and copper",
    "End dams must be specified and factory-formed — cannot be added after fabrication",
    "Factory lead times: 3–5 weeks for custom profiles — allow in programme",
  ],
  standardsNotes: [
    "AS/NZS 2904: damp-proof courses and flashings",
    "AS 1562.1: design and installation of sheet roof cladding (flashing details)",
    "BlueScope TechConnect: Colorbond installation and detailing guide",
    "NCC 2022 Part F1: damp and weatherproofing requirements",
    "AS 4654.2: waterproofing membranes — above-ground use",
    "ISO 9223: corrosivity categories — Colorbond zone suitability chart",
  ],
  suitableDefects: [
    "Failed painted steel head flashings — rust staining and water ingress",
    "Colorbond cladding remediation requiring colour-matched flashings",
    "Missing or inadequate head flashings over windows — installing new system",
    "Incorrect non-marine zone flashings corroding — replace with Colorbond Ultra",
    "ACP or FC cladding remediation requiring new head flashing at openings",
    "Parapet caps failing — replace with Colorbond or SS316 cap flashing",
  ],
  typicalSubstrates: [
    "Concrete lintel: screw-fix with SS316 self-drilling screws through flashing",
    "Masonry: SS316 screws into block face (avoid mortar joint — lower pullout)",
    "Steel lintel: Colorbond rivets or SS316 screws to steel",
    "FC subframe: screw-fix to top-hat rail with SS316 self-drilling screws",
    "Window frame: isolate from aluminium frame with EPDM tape",
    "Existing substrate: adhesive + mechanical fix per manufacturer recommendation",
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

export function HeadFlashColorIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are Colorbond steel head flashing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Colorbond steel head flashings are the standard low-to-mid cost option for residential and light commercial cladding in non-marine zones. Available in 27 colours that match the Colorbond Walling range, they provide colour-coordinated facade details without the cost premium of anodised aluminium or stainless steel.
        </p>
        {expanded && (
          <>
            <p>
              Colorbond and Zincalume flashings are a coated steel product — the base steel is susceptible to rust at cut edges where the protective coating is absent. All cut edges must be treated with a zinc-rich primer within 24 hours of cutting. Using an angle grinder to cut Colorbond generates heat that burns the paint coating and contaminates the cut edge — always use guillotine or aviation shears.
            </p>
            <p>
              The Colorbond Ultra range (ZAM alloy substrate — zinc, aluminium, magnesium) provides the best corrosion resistance in the Colorbond product range and is rated for coastal zones up to C4. Standard Colorbond (Zincalume substrate) is rated C3 and should not be used within 1 km of marine water. Neither product is suitable for marine zone (&lt; 200 m ocean) — specify SS316 or Class 3 anodised aluminium for marine exposure.
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

export function HeadFlashColorProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — Colorbond steel head flashings — scroll to view all</p>
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
              Side-by-side comparison of Colorbond steel head flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Base material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Gauge</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Folding</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Max zone</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour match</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.baseMaterial}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.gauge}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.folding}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.maxZone}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colourMatch}</td>
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
