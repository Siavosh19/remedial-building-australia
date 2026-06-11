"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Lead"
  | "Code-4"
  | "Code-5"
  | "Chimney-apron"
  | "Back-gutter"
  | "Saddle-flashing"
  | "Heritage"
  | "Standard";

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
    fullLabel: "Austral Lead",
    brandUrl: "https://www.australlead.com.au",
    accentColor: "#475569",
    name: "Austral Lead Code 4 Sheet (chimney apron)",
    descriptionLine: "Code 4 (1.8mm) lead sheet for chimney front apron, soakers, and step flashing at chimney/roof junction — standard specification for Australian chimney flashings — AS 3703",
    productType: "Code 4 lead sheet — chimney apron, soakers, step flashing — AS 3703",
    filterTags: ["Lead", "Code-4", "Chimney-apron", "Heritage", "Standard"],
    techChips: [
      { label: "Code 4 — 1.8mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Chimney apron", cls: "bg-slate-100 text-slate-700" },
      { label: "Soakers", cls: "bg-green-50 text-green-700" },
      { label: "Heritage approved", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 3703", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Austral Lead Code 4 sheet (1.8mm nominal thickness, 20.41 kg/m²) is the standard specification for chimney front apron flashings, soakers, and step flashings at the chimney-to-roof junction on Australian tiled and slated pitched roofs. Code 4 lead is the minimum weight recommended for external exposed chimney flashing elements that are not in the back gutter position. Lead's inherent malleability allows the licensed roof plumber to dress the flashing tightly into mortar joints, around irregular brick surfaces, and into counter-flashing chases without cutting or mechanical fasteners — when correctly dressed, lead forms a watertight self-sealing joint through its own weight and form. The front apron is laid over the front face of the chimney and laps under the tiles on the front slope, with step soakers interlaced between tiles at the chimney sides. The counter-flashing is inserted into a raked mortar joint or chase in the chimney masonry and dressed down over the step soaker upstands. Austral Lead is Australia's primary lead sheet manufacturer and the benchmark supplier for building and roofing lead applications. Confirm current Code 4 dimensions (width, sheet size), thickness tolerance, and procurement lead time with Austral Lead before ordering for strata and heritage building remediation projects.",
    technicalProperties: [
      "Code 4 lead sheet — 1.8mm nominal thickness — 20.41 kg/m² — standard for chimney apron and soaker flashing",
      "Highly malleable — can be dressed by hand to irregular brick and stone chimney surfaces — self-sealing through weight and form",
      "Lead-to-lead overlaps self-seal under load — no sealant required at correctly designed lap joints",
      "AS 3703 compliant — minimum Code 4 for external chimney apron and soaker applications",
      "Heritage compatible — lead is the traditional and preferred material for chimney flashings on heritage buildings",
      "Durable — lead flashings correctly installed and dressed typically achieve 50–100 year service life",
      "Fixed with lead-headed copper or stainless nails — do not use zinc-plated nails on lead flashing",
    ],
    limitations: [
      "Code 4 is minimum weight for chimney apron and soakers — do not substitute Code 3 or lighter — Code 5 is specified for the back gutter where additional weight resists wind uplift",
      "Lead handling requires PPE per WHS regulations — wash hands after handling — do not handle food or drink in the work area",
      "Installation requires an experienced licensed roof plumber familiar with lead dressing techniques — incorrect installation results in cracking, splitting, or inadequate laps",
      "Galvanic corrosion risk where lead contacts aluminium or zinc — use copper nails, not aluminium or zinc-plated nails",
      "Lead run-off in some council areas may be subject to environmental controls — confirm local requirements before specifying for rainwater-harvesting applications",
      "Confirm current Code 4 availability and lead time with Austral Lead before ordering for large strata remediation projects",
    ],
    procurementSources: [
      { name: "Austral Lead — trade supply", url: "https://www.australlead.com.au" },
      { name: "Roofing trade merchants — confirm stocking with local supplier", url: "https://www.australlead.com.au" },
      { name: "Metroll — roofing supply", url: "https://www.metroll.com.au" },
    ],
  },
  {
    fullLabel: "Austral Lead",
    brandUrl: "https://www.australlead.com.au",
    accentColor: "#334155",
    name: "Austral Lead Code 5 Sheet (chimney back gutter)",
    descriptionLine: "Code 5 (2.24mm) lead sheet for chimney back gutter (saddle flashing) — heavier weight resists wind uplift at back gutter position — AS 3703 — heritage and standard applications",
    productType: "Code 5 lead sheet — chimney back gutter, saddle flashing — AS 3703",
    filterTags: ["Lead", "Code-5", "Back-gutter", "Heritage", "Saddle-flashing"],
    techChips: [
      { label: "Code 5 — 2.24mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Back gutter — saddle flashing", cls: "bg-slate-100 text-slate-700" },
      { label: "Wind uplift resistance", cls: "bg-green-50 text-green-700" },
      { label: "Heritage approved", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 3703", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Austral Lead Code 5 sheet (2.24mm nominal thickness, 25.51 kg/m²) is specified for the chimney back gutter (also called the saddle flashing) at the upslope face of the chimney. The back gutter is the most critical element of a chimney flashing system — it must intercept all water running down the roof slope behind the chimney and discharge it to either side of the chimney without allowing it to pond or back up under the tile courses. The back gutter sits at the base of the chimney's upslope face, wrapping up and over the roof tiles to each side to connect with the step soaker flashings. The heavier Code 5 weight is specified for the back gutter because this element is more exposed to wind uplift than the front apron or soakers — the back gutter must resist being lifted by wind without being mechanically over-fixed, which would prevent thermal movement and lead to cracking. Code 5 lead is typically laid in shorter bays than Code 4 to accommodate thermal movement — confirm maximum bay length with AS 3703 and Austral Lead technical guidance. On steeper roofs with a larger chimney, a purpose-formed saddle or cricket may be required behind the chimney to prevent water ponding — the lead back gutter is dressed over this saddle form.",
    technicalProperties: [
      "Code 5 lead sheet — 2.24mm nominal thickness — 25.51 kg/m² — specified for chimney back gutter and saddle flashing",
      "Heavier weight than Code 4 — greater resistance to wind uplift in the back gutter position",
      "Malleable — can be dressed and formed to the back gutter profile and roof pitch without cutting",
      "AS 3703 compliant — Code 5 recommended for back gutter and saddle flashing at chimney",
      "Laid in bays to accommodate thermal movement — confirm maximum bay length with AS 3703 and Austral Lead technical",
      "Heritage compatible — Code 5 lead back gutter is the traditional specification for chimney back gutters on Australian heritage buildings",
    ],
    limitations: [
      "Must be laid in bays — do not lay as a single sheet over large areas — thermal expansion will cause cracking and splitting over time if bays are too long",
      "Code 5 must not be used in lieu of Code 4 for soakers and aprons as a cost measure — different element, different specification requirement",
      "Back gutter must be designed to discharge freely to the tile lines on each side — inadequate discharge detail will result in ponding and overflow at the chimney junction",
      "Lead handling requires PPE per WHS regulations",
      "Installation requires experienced licensed roof plumber — back gutter dressing at the chimney/roof junction is a technically demanding detail",
      "Confirm bay length limits and thermal movement requirements with AS 3703 and Austral Lead technical before forming",
    ],
    procurementSources: [
      { name: "Austral Lead — trade supply", url: "https://www.australlead.com.au" },
      { name: "Roofing trade merchants — confirm stocking with local supplier", url: "https://www.australlead.com.au" },
    ],
  },
  {
    fullLabel: "Calder Industrial",
    brandUrl: "https://www.calderindustrial.com.au",
    accentColor: "#7c3aed",
    name: "Calder Industrial Lead Sheet (chimney)",
    descriptionLine: "Calder Industrial lead sheet Code 4 and Code 5 — alternative supplier to Austral Lead for chimney flashing applications — front apron, soakers, and back gutter — AS 3703",
    productType: "Code 4 and Code 5 lead sheet — chimney flashing — Calder Industrial — AS 3703",
    filterTags: ["Lead", "Code-4", "Code-5", "Heritage"],
    techChips: [
      { label: "Code 4 and Code 5", cls: "bg-violet-100 text-violet-800" },
      { label: "Calder Industrial", cls: "bg-slate-100 text-slate-700" },
      { label: "Alternative to Austral Lead", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3703", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage applications", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Calder Industrial is an alternative Australian supplier of lead sheet for building and roofing applications, providing Code 4 and Code 5 lead sheet for chimney flashing as an alternative supply channel to Austral Lead. The Code designation, nominal thickness, weight per square metre, and AS 3703 application requirements are identical for Calder Industrial lead sheet as for Austral Lead — Code 4 for chimney apron and soakers, Code 5 for the back gutter. The technical properties, limitations, installation requirements, PPE requirements, and thermal movement requirements for Calder Industrial lead sheet are the same as for Austral Lead Code 4 and Code 5 — the material is lead sheet regardless of the supply source. Calder Industrial may offer competitive pricing or better regional availability depending on project location. Confirm current Code 4 and Code 5 thickness tolerances, width options, and pricing with Calder Industrial before ordering. As with all lead sheet for roofing flashing, installation must be by an experienced licensed roof plumber with demonstrated lead dressing capability.",
    technicalProperties: [
      "Code 4 and Code 5 lead sheet — alternative supplier to Austral Lead — same Code designations and thicknesses",
      "AS 3703 compliant — same application requirements as Austral Lead Code 4 (apron/soakers) and Code 5 (back gutter)",
      "Malleable lead sheet — can be dressed and formed by hand to chimney profile",
      "Heritage compatible — same material specification as Austral Lead for heritage building applications",
      "Available nationally from Calder Industrial — confirm regional stock and lead time before ordering",
      "Same PPE and WHS requirements as Austral Lead — lead handling precautions apply",
    ],
    limitations: [
      "Confirm current thickness tolerances and Code specification with Calder Industrial before ordering — confirm against AS 3703 requirements",
      "Same thermal movement, bay length, and installation requirements as Austral Lead — Code 4 and Code 5 lead sheet behaves identically regardless of supplier",
      "Lead handling requires PPE per WHS regulations",
      "Installation requires experienced licensed roof plumber",
      "Confirm current stock, sizes, and regional availability with Calder Industrial before ordering for large remediation projects",
    ],
    procurementSources: [
      { name: "Calder Industrial — trade supply", url: "https://www.calderindustrial.com.au" },
      { name: "Roofing trade merchants — confirm stocking with local supplier", url: "https://www.calderindustrial.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Lead", label: "Lead" },
  { id: "Code-4", label: "Code 4" },
  { id: "Code-5", label: "Code 5" },
  { id: "Chimney-apron", label: "Chimney apron" },
  { id: "Back-gutter", label: "Back gutter" },
  { id: "Saddle-flashing", label: "Saddle flashing" },
  { id: "Heritage", label: "Heritage" },
  { id: "Standard", label: "Standard" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  code: string;
  thickness: string;
  kgPerM2: string;
  primaryUse: string;
  heritage: string;
}[] = [
  {
    product: "Austral Lead Code 4",
    brand: "Austral",
    code: "Code 4",
    thickness: "1.8mm",
    kgPerM2: "20.41 kg/m²",
    primaryUse: "Chimney apron, soakers, step flashing",
    heritage: "Yes",
  },
  {
    product: "Austral Lead Code 5",
    brand: "Austral",
    code: "Code 5",
    thickness: "2.24mm",
    kgPerM2: "25.51 kg/m²",
    primaryUse: "Chimney back gutter (saddle flashing)",
    heritage: "Yes",
  },
  {
    product: "Calder Lead Code 4",
    brand: "Calder",
    code: "Code 4",
    thickness: "1.8mm",
    kgPerM2: "20.41 kg/m²",
    primaryUse: "Chimney apron, soakers — alternative supply",
    heritage: "Yes",
  },
  {
    product: "Calder Lead Code 5",
    brand: "Calder",
    code: "Code 5",
    thickness: "2.24mm",
    kgPerM2: "25.51 kg/m²",
    primaryUse: "Chimney back gutter — alternative supply",
    heritage: "Yes",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Chimney front apron flashing replacement where original lead apron has cracked, split, or corroded at the chimney/roof junction",
    "Chimney back gutter (saddle flashing) replacement where water ponding or back gutter failure is causing water ingress behind the chimney",
    "Soaker flashing replacement at chimney sides where individual soakers have split or been displaced from mortar joints",
    "Full chimney flashing system replacement on heritage buildings where heritage authority requires lead sheet — not Colorbond or aluminium",
    "Counter-flashing replacement at raked mortar joints in chimney masonry where the inserted counter-flashing has corroded or been dislodged",
  ],
  selectionCriteria: [
    "Code selection — Code 4 for chimney apron and soakers, Code 5 for back gutter — do not substitute Code 3 or lighter for external chimney applications",
    "Bay length — confirm maximum bay length for the Code specified from AS 3703 — longer bays must be split and lapped or joined with an expansion allowance",
    "Chimney construction — brick, stone, or rendered — confirm counter-flashing chase or tuck-pointing method for counter-flashing insert at top of upstand",
    "Heritage requirements — confirm lead sheet Code with heritage authority before specifying — some heritage authorities specify minimum Code and require lead documentation",
    "Copper nails — lead must be fixed with lead-headed copper or stainless steel nails — not zinc-plated or aluminium nails",
    "PPE — confirm WHS requirements for lead handling with the licensed roof plumber before commencing works",
  ],
  limitations: [
    "Not suitable for applications where environmental lead run-off is a concern — confirm local environmental requirements before specifying for rainwater-harvesting systems",
    "Requires experienced licensed roof plumber with lead dressing capability — not all roof plumbers have experience with lead chimney flashings",
    "Lead sheet is not a patch repair material — do not attempt to patch failed lead flashings with sealant — the full flashing element must be replaced",
    "Code 3 and lighter are not suitable for external chimney flashing applications — minimum Code 4",
    "Lead flashings on new buildings may require environmental or planning approval in some local government areas — confirm before specifying",
  ],
  standardsNotes: [
    "AS 3703 — Lead Sheet — properties, thickness codes, and application requirements for lead sheet used in building flashing",
    "Tile manufacturer installation guides — chimney flashing dimensions and minimum upstand requirements",
    "Heritage authority requirements — confirm Code specification and documentation requirements with the relevant heritage authority before specifying",
    "NCC / BCA — roofing and flashing requirements for Class 1 and Class 2 buildings",
    "WHS regulations — lead handling PPE and safe work procedures for licensed roof plumber",
  ],
  suitableDefects: [
    "Flashing failures — chimney flashing at chimney/roof junction — failed, cracked, or missing lead apron, soakers, or back gutter",
    "Chimney leak — water ingress at chimney caused by failed lead flashing elements",
    "Heritage building chimney flashing remediation where lead is specified or required",
  ],
  typicalSubstrates: [
    "Brick chimney — most common chimney construction — counter-flashing inserted into raked mortar joint or cut chase",
    "Stone chimney — heritage construction — confirm counter-flashing fixing method with heritage authority",
    "Rendered chimney — counter-flashing must be sealed at the top edge with a non-hardening sealant to prevent water entry behind the rendering",
    "Tiled pitched roof — all standard tile profiles — terracotta, concrete, and slate",
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
        Confirm suitability with the current supplier data before specifying or applying.
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

export function ChimneyFlashingLeadIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are lead sheet chimney flashing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Lead sheet chimney flashings are the traditional and preferred specification for sealing the junction between a chimney stack and the surrounding tiled or slated pitched roof on Australian residential and heritage buildings. The chimney flashing system comprises four elements: the front apron (laid over the front face of the chimney stack and under the front tile course), step soakers interlaced between tile courses at the chimney sides, a back gutter (saddle flashing) at the upslope face of the chimney, and counter-flashings inserted into raked mortar joints or cut chases in the chimney masonry to cap the upstands of the soakers and apron.
        </p>
        {expanded && (
          <>
            <p>
              Lead is preferred for chimney flashings because of its malleability — it can be hand-dressed tightly to irregular brick and stone chimney faces, worked into mortar joints, and formed around compound curves and angles that would be impossible to replicate in stiffer materials such as Colorbond steel or aluminium. Lead-to-lead overlaps self-seal under the weight of the lead itself, requiring no sealant. Correctly installed lead chimney flashings have a service life of 50 to 100 years.
            </p>
            <p>
              Code selection follows AS 3703: Code 4 (1.8mm) is the minimum for chimney apron and soakers exposed to weather and light traffic; Code 5 (2.24mm) is specified for the back gutter where the increased weight resists wind uplift. Installation must be by an experienced licensed roof plumber with demonstrated lead dressing capability. Lead handling requires PPE in accordance with WHS regulations.
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

export function ChimneyFlashingLeadProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 2 brands — lead sheet chimney flashing systems only — scroll to view all</p>
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
              Side-by-side comparison of lead sheet chimney flashing products. Confirm all selections against current supplier data and AS 3703 before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Code</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">kg/m²</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.code}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.kgPerM2}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                      <CheckCircle size={11} /> {row.heritage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
