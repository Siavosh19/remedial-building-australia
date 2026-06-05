"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Helical-bar"
  | "Stainless-316"
  | "6mm"
  | "8mm"
  | "Grout-in"
  | "Bed-joint"
  | "Crack-stitching"
  | "AS-3700"
  | "Structural"
  | "Engineer-required";

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
    fullLabel: "Helifix",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#b45309",
    name: "Helifix 6 mm 316 SS helical crack-stitching bar",
    descriptionLine: "Industry-standard 6 mm helical stainless bar — grout-in bed joint installation — for crack stitching in masonry facades — engineer specification mandatory",
    productType: "Helical grout-in crack stitching bar — 6 mm 316 SS — bed joint — AS 3700",
    filterTags: ["Helical-bar", "Stainless-316", "6mm", "Grout-in", "Bed-joint", "Crack-stitching", "AS-3700", "Structural", "Engineer-required"],
    techChips: [
      { label: "6 mm helical", cls: "bg-amber-100 text-amber-800" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Grout-in", cls: "bg-green-100 text-green-700" },
      { label: "Engineer req.", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Helifix 6 mm 316 stainless steel helical bar is the industry-standard product for crack stitching in masonry. The helical profile creates mechanical interlock with the grout and masonry. Installed into a slot cut or routed in the bed joint immediately above (and often below) the crack. Used to stitch horizontal cracks in brickwork caused by differential settlement, thermal movement, lintel failure, or cavity tie failure. Available in 1 m lengths — cut to suit on site. The 6 mm diameter fits standard 10 mm bed joint slot without disrupting surrounding masonry. Grout must fully encapsulate the bar — voids in the grout reduce tensile capacity and allow moisture and corrosion access to the bar. Engineer specification and inspection mandatory for all structural crack stitching work. Crack cause must be identified and eliminated before stitching commences — stitching an active crack will cause new cracking adjacent to the stitched zone. Stainless steel only — galvanised or mild steel bars must not be substituted regardless of cost pressure.",
    technicalProperties: [
      "316 SS — suitable for all exposure zones including coastal and marine environments",
      "Helical profile provides mechanical interlock in grout — bond is not reliant on adhesion alone",
      "Helifix is the most widely specified brand in Australian remedial masonry — high contractor familiarity",
      "6 mm diameter fits standard 10 mm bed joint slot without disrupting surrounding masonry",
      "Available in 1 m standard lengths — cut to suit on site with angle grinder or bolt cutters",
      "Widely distributed in Australia through masonry remediation suppliers — short supply chain",
    ],
    limitations: [
      "Structural work — engineer specification and inspection mandatory before and during installation",
      "Crack cause must be identified and eliminated before stitching — active cracks will cause new cracking adjacent to stitched zone",
      "Slot cutting creates dust — manage for owners and occupants in occupied strata buildings",
      "Grout must fully encapsulate bar — voids reduce load capacity and allow moisture ingress",
    ],
    procurementSources: [
      { name: "Helifix Australia — national specialist supply", url: "https://www.helifix.com.au" },
      { name: "Parchem Construction Supplies — national distribution", url: "https://www.parchem.com.au" },
      { name: "Simpson Strong-Tie Australia — alternative national supply", url: "https://www.strongtie.com.au" },
      { name: "Confirm current distributor stock and lead time before ordering", url: "https://www.helifix.com.au" },
    ],
  },
  {
    fullLabel: "Thor Helical Australia",
    brandUrl: "https://www.thorhelical.com.au",
    accentColor: "#0369a1",
    name: "Thor Helical 8 mm 316 SS heavy-duty stitching bar",
    descriptionLine: "8 mm heavy-gauge 316 SS helical bar — higher tensile and shear capacity than 6 mm — for heavily loaded masonry, wide crack zones, or engineer-specified high-capacity stitching",
    productType: "Heavy-duty helical grout-in crack stitching bar — 8 mm 316 SS — bed joint — AS 3700",
    filterTags: ["Helical-bar", "Stainless-316", "8mm", "Grout-in", "Bed-joint", "Crack-stitching", "AS-3700", "Structural", "Engineer-required"],
    techChips: [
      { label: "8 mm helical", cls: "bg-sky-100 text-sky-800" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Higher capacity", cls: "bg-green-100 text-green-700" },
      { label: "Engineer req.", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Thor Helical 8 mm 316 SS bar is a heavier gauge stitching bar for greater load capacity requirements — heavily loaded masonry, wide crack zones, or where the engineer specifies higher tensile capacity than the 6 mm bar provides. The larger diameter requires a wider bed joint slot and is typically used in heavy masonry or heritage stone coursed construction. The 8 mm bar has greater anchorage length in grout due to the larger helical cross-section, providing higher characteristic tensile and shear resistance per unit length. Thor Helical is well-established in the UK and Australian heritage and commercial remedial masonry market. Australian distributor: Thor Helical Australia — confirm current stock and lead time before specifying. Both 1 m and 2 m lengths available. The 8 mm bar is heavier to cut and place than 6 mm — slightly slower installation rate. Engineer specification mandatory for all structural crack stitching work.",
    technicalProperties: [
      "Higher tensile and shear capacity than 6 mm bar — specified by engineers for heavy masonry or high-load crack stitching",
      "316 SS — suitable for all Australian exposure zones including coastal and marine",
      "Greater anchorage length per unit length in grout due to larger helical cross-section",
      "Available in 1 m and 2 m lengths — reduces cutting waste on long stitching zones",
      "Thor Helical well-established in Australian heritage and commercial remedial masonry market",
      "Published load data available from Thor Helical Australia technical specification",
    ],
    limitations: [
      "Structural work — engineer specification mandatory for all crack stitching installations",
      "Requires wider bed joint slot than 6 mm bar — more invasive; may not fit all thin-joint masonry construction types",
      "Less commonly stocked in Australia than Helifix — confirm current distributor and lead time before specifying",
      "8 mm bar is heavier to cut and place than 6 mm — slightly slower installation rate on high-volume programmes",
    ],
    procurementSources: [
      { name: "Thor Helical Australia — national specialist supply", url: "https://www.thorhelical.com.au" },
      { name: "Helifix Australia — may supply equivalent 8 mm bar if Thor Helical unavailable", url: "https://www.helifix.com.au" },
      { name: "Parchem Construction Supplies — national distribution", url: "https://www.parchem.com.au" },
      { name: "Confirm current AU distributor, stock, and lead time before ordering", url: "https://www.thorhelical.com.au" },
    ],
  },
  {
    fullLabel: "Simpson Strong-Tie Australia",
    brandUrl: "https://www.strongtie.com.au",
    accentColor: "#7c3aed",
    name: "Simpson Strong-Tie helical masonry stitching bar — 6 mm 316 SS",
    descriptionLine: "6 mm 316 SS helical bar — Simpson Strong-Tie alternative to Helifix — broad Australian distribution — same structural application as Helifix 6 mm",
    productType: "Helical grout-in crack stitching bar — 6 mm 316 SS — Simpson Strong-Tie — bed joint — AS 3700",
    filterTags: ["Helical-bar", "Stainless-316", "6mm", "Grout-in", "Bed-joint", "Crack-stitching", "AS-3700", "Structural", "Engineer-required"],
    techChips: [
      { label: "6 mm helical", cls: "bg-purple-100 text-purple-800" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Broad AU supply", cls: "bg-green-100 text-green-700" },
      { label: "Engineer req.", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Simpson Strong-Tie 6 mm 316 SS helical bar — an alternative supply source to Helifix from a supplier with extensive Australian distribution through building products merchants and timber frame connector supply chains. Useful when Helifix is unavailable from local distributors or on back-order. Simpson's masonry remediation range is growing in Australia and their technical support is well-developed. Same structural application as Helifix 6 mm bar — identical helical profile principle and equivalent performance in grout-in applications. Engineers should specify by performance requirement (316 SS helical bar to manufacturer's specification) rather than by brand alone where multiple suppliers are acceptable. Confirm with engineer that Simpson Strong-Tie bar is an approved equivalent to the specified brand before ordering. Engineer specification mandatory for all structural crack stitching work. Available in 1 m lengths through Simpson Strong-Tie Australian distribution network.",
    technicalProperties: [
      "Simpson Strong-Tie has broad Australian distribution — often available where Helifix is on back-order or unavailable",
      "Consistent manufacturing quality — 316 SS for all Australian exposure zones",
      "Simpson technical support well-established in the Australian construction industry",
      "Same helical profile principle as Helifix — equivalent structural performance in grout-in applications",
      "Available in 1 m lengths through standard Simpson Strong-Tie Australian distribution network",
      "Widely recognised by engineers as an acceptable equivalent to Helifix — confirm substitution before ordering",
    ],
    limitations: [
      "Structural work — engineer specification mandatory for all crack stitching installations",
      "Some engineers may specifically require Helifix — confirm substitution is acceptable before ordering",
      "Less contractor familiarity than Helifix in Australian remedial masonry trade",
      "Crack cause must be eliminated before stitching — identical requirement to all helical bar products",
    ],
    procurementSources: [
      { name: "Simpson Strong-Tie Australia — national distribution network", url: "https://www.strongtie.com.au" },
      { name: "Mitre 10 Trade / Hardware & General — Simpson distributor nationally", url: "https://www.strongtie.com.au" },
      { name: "Parchem Construction Supplies — national", url: "https://www.parchem.com.au" },
      { name: "Confirm engineer approval of Simpson Strong-Tie as approved equivalent to specified brand", url: "https://www.strongtie.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Helical-bar", label: "Helical bar" },
  { id: "Stainless-316", label: "Stainless 316" },
  { id: "6mm", label: "6 mm" },
  { id: "8mm", label: "8 mm" },
  { id: "Grout-in", label: "Grout-in" },
  { id: "Bed-joint", label: "Bed joint" },
  { id: "Crack-stitching", label: "Crack stitching" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Structural", label: "Structural" },
  { id: "Engineer-required", label: "Engineer required" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  diameter: string;
  auDistribution: string;
  tensileCapacity: string;
  coastalOk: string;
  engineerReq: string;
  primaryUse: string;
}[] = [
  {
    product: "Helifix 6 mm 316 SS",
    brand: "Helifix",
    diameter: "6 mm",
    auDistribution: "Good — national",
    tensileCapacity: "Standard — per Helifix data sheet",
    coastalOk: "Yes — 316 SS",
    engineerReq: "Yes — mandatory",
    primaryUse: "Standard crack stitching — residential and commercial masonry facades",
  },
  {
    product: "Thor Helical 8 mm 316 SS",
    brand: "Thor Helical",
    diameter: "8 mm",
    auDistribution: "Confirm lead time",
    tensileCapacity: "Higher — per Thor Helical data sheet",
    coastalOk: "Yes — 316 SS",
    engineerReq: "Yes — mandatory",
    primaryUse: "Heavy masonry or high-load crack stitching — engineer-specified",
  },
  {
    product: "Simpson Strong-Tie 6 mm 316 SS",
    brand: "Simpson Strong-Tie",
    diameter: "6 mm",
    auDistribution: "Broad — national",
    tensileCapacity: "Standard — per Simpson data sheet",
    coastalOk: "Yes — 316 SS",
    engineerReq: "Yes — mandatory",
    primaryUse: "Alternative supply source to Helifix — confirm engineer approval",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Stitching horizontal cracks in brick masonry facades caused by differential settlement, thermal movement, or lintel failure",
    "Reinforcing masonry at window and door openings where stepped cracking indicates lintel deflection or inadequate lintels",
    "Crack stitching at parapet and coping junctions in exposed masonry facades",
    "Supplementary reinforcement of masonry in zones adjacent to previous cavity tie failures",
    "Heritage and heritage-adjacent masonry crack repair where drilling through the brick face must be minimised",
  ],
  selectionCriteria: [
    "Engineer specification is mandatory — bar diameter, stitch spacing, anchorage depth, and grout type must be engineer-designed",
    "Identify and eliminate the crack cause before stitching — stitching an active crack will not prevent future cracking",
    "Monitor cracks with crack gauges for minimum 3–6 months to confirm stability before stitching proceeds",
    "Specify 316 SS bars only — do not accept galvanised or mild steel substitution regardless of cost pressure",
    "Select 6 mm bar for standard masonry facade work; 8 mm only where engineer specifies higher tensile capacity",
    "For heritage masonry, confirm grout type with engineer — lime-compatible grout may be required to avoid stress concentration",
  ],
  limitations: [
    "Structural work — engineer specification and site inspection mandatory; do not proceed without engineer involvement",
    "Stitching an active crack without eliminating the cause will cause new cracking adjacent to the stitched zone",
    "316 SS bars only — galvanised or mild steel bars must not be substituted regardless of cost pressure",
    "Bore holes and slots must be clean and dust-free before grout injection — contamination prevents grout bond",
    "Grout must fully encapsulate the bar — voids reduce tensile capacity and allow moisture and corrosion access",
    "Wait for grout initial set before repointing the slot face — typically 24–48 hours",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — structural requirements for crack repair and reinforcement in masonry",
    "Helifix / Thor Helical technical specification — published installation guidance and load data for helical bars",
    "Structural engineer's specification — all crack stitching is structural work requiring documented engineer assessment",
    "NATSPEC worksection — Masonry repair — project specification for structural masonry crack repair",
    "Manufacturer TDS — confirm bar material grade, dimensional tolerances, and compatible grout products before specifying",
  ],
  suitableDefects: [
    "Horizontal stepped cracks in brickwork above lintels or below sills where lintel deflection or failure is the cause",
    "Diagonal cracking at window and door corners indicating differential settlement or inadequate support",
    "Horizontal cracking in parapet masonry caused by thermal movement or inadequate movement joint provision",
    "Through-wall cracking in cavity masonry outer leaf where crack is confirmed stable and cause has been addressed",
    "Post-settlement cracking in older masonry facades where foundation movement has ceased and crack is confirmed stable",
  ],
  typicalSubstrates: [
    "Modern fired clay brick — standard residential and commercial masonry facade construction",
    "Concrete masonry block — confirm bed joint dimensions allow 6 mm or 8 mm bar slot without compromising block integrity",
    "Natural stone masonry (coursed) — confirm stone hardness allows slot cutting without fracturing adjacent stone",
    "Heritage brick — confirm lime mortar compatibility of grout before specifying on heritage fabric",
    "NOT suitable: masonry with active cracking where the cause has not been identified and eliminated",
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

export function HelicalBarsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are helical bed joint reinforcement bars?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Helical bed joint reinforcement bars are grade 316 stainless steel bars with a continuous helical twist profile, installed into slots routed in the mortar bed joints of masonry facades. The helical profile creates mechanical interlock with the surrounding grout, providing tensile reinforcement across crack planes in brickwork without requiring through-drilling of the brick units. They are the standard method for crack stitching in Australian remedial masonry practice.
        </p>
        {expanded && (
          <>
            <p>
              The critical requirements for successful helical bar crack stitching are: engineer specification (crack stitching is structural work — the cause of cracking must be identified, eliminated, and the crack confirmed as stable before stitching); correct slot preparation (clean, dust-free, appropriate depth); full grout encapsulation of the bar (voids in the grout reduce tensile capacity and allow moisture access); and a matching mortar repoint of the slot face after grout set. The repair must be invisible from the facade face.
            </p>
            <p>
              Helifix is the most widely specified brand in Australian remedial masonry. Thor Helical provides a heavier 8 mm bar for higher-load applications. Simpson Strong-Tie provides an alternative supply source with broad national distribution when Helifix is on back-order. All three are grade 316 stainless and provide equivalent structural performance — engineers should specify by performance rather than brand where multiple suppliers are acceptable.
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

export function HelicalBarsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — helical bed joint crack stitching bars — scroll to view all</p>
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
              Side-by-side comparison of helical bed joint crack stitching bar systems. All are 316 SS and require engineer specification. Confirm product availability with supplier before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Diameter</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">AU distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Tensile capacity</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal OK</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Engineer req.</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.diameter}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.auDistribution}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.tensileCapacity}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastalOk}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.engineerReq}</td>
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
