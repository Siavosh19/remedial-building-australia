"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Stainless-rod"
  | "Epoxy-grout"
  | "316-SS"
  | "Threaded-rod"
  | "Deformed-bar"
  | "Crack-stitching"
  | "AS-3700"
  | "Structural"
  | "Engineer-required"
  | "Bore-hole";

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
    accentColor: "#b45309",
    name: "316 SS M10 threaded rod + Sika AnchorFix-3+ two-part epoxy",
    descriptionLine: "316 SS M10 threaded rod bonded in drilled bore holes with Sika AnchorFix-3+ high-strength epoxy — high pull-out capacity — damp-tolerant — engineer specification mandatory",
    productType: "Epoxy-bonded stainless threaded rod crack stitching — Sika AnchorFix-3+ — solid masonry — AS 3700",
    filterTags: ["Stainless-rod", "Epoxy-grout", "316-SS", "Threaded-rod", "Crack-stitching", "AS-3700", "Structural", "Engineer-required", "Bore-hole"],
    techChips: [
      { label: "M10 threaded rod", cls: "bg-amber-100 text-amber-800" },
      { label: "Epoxy AnchorFix-3+", cls: "bg-slate-100 text-slate-700" },
      { label: "Damp tolerant", cls: "bg-green-100 text-green-700" },
      { label: "Engineer req.", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "316 SS M10 threaded rod bonded into drilled holes on each side of a masonry crack using Sika AnchorFix-3+ high-strength two-part epoxy adhesive. The threaded profile maximises mechanical interlock with the epoxy — higher pull-out capacity than smooth or deformed bar for the same bore diameter. Used for higher-capacity crack stitching in solid masonry where helical bar stitching is insufficient for the engineer's design load. Installation: bore holes drilled perpendicular to the crack face at specified depth, epoxy injected from the base of the bore upward, rod inserted with slight rotation to distribute epoxy, excess removed before gel. Pot life approximately 8–10 minutes at 20°C — work must be completed within pot life. Full cure 24 hours at 20°C; extended in cold conditions. Damp-tolerant formulation — Sika AnchorFix-3+ performs in slightly damp bore holes. Engineer specification mandatory. Bore hole cleaning is the most critical installation step.",
    technicalProperties: [
      "Threaded rod profile provides maximum mechanical interlock with epoxy — high pull-out capacity per unit anchorage depth",
      "Sika AnchorFix-3+ is a proven, widely used two-part high-strength epoxy with excellent bond to masonry",
      "316 SS — suitable for all exposure zones including coastal and marine environments",
      "Damp-tolerant formulation — performs in slightly damp bore holes within product moisture tolerance",
      "Sika technical support and published design data available for engineering specification and certification",
      "Widely available through Sika and Parchem national distribution networks",
    ],
    limitations: [
      "Structural work — engineer specification mandatory; pull-out design values must be verified for the specific masonry",
      "Crack must be stable before stitching — epoxy rod is rigid and does not accommodate ongoing movement",
      "Bore hole cleaning is critical — dust and loose material prevent epoxy bond; blow, wire brush, blow again",
      "Pot life approximately 8–10 minutes at 20°C — all work must be completed within pot life; waste risk on large installations",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply and technical support", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies — Sika national distributor", url: "https://www.parchem.com.au" },
      { name: "316 SS M10 threaded rod — stainless steel suppliers nationally (cut to length)", url: "https://www.parchem.com.au" },
      { name: "Total Fasteners / Bossong — stainless rod and epoxy supply nationally", url: "https://www.totalfasteners.com.au" },
    ],
  },
  {
    fullLabel: "Hilti Australia",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#0369a1",
    name: "316 SS deformed bar + Hilti HIT-RE 500 V4 ETA-approved epoxy",
    descriptionLine: "316 SS deformed reinforcing bar bonded with Hilti HIT-RE 500 V4 — ETA-approved epoxy acrylate — full design resistance tables for masonry — preferred where documented engineer certification is required",
    productType: "ETA-approved epoxy-bonded stainless deformed bar crack stitching — Hilti HIT-RE 500 V4 — masonry — AS 3700",
    filterTags: ["Stainless-rod", "Epoxy-grout", "316-SS", "Deformed-bar", "Crack-stitching", "AS-3700", "Structural", "Engineer-required", "Bore-hole"],
    techChips: [
      { label: "Deformed bar", cls: "bg-sky-100 text-sky-800" },
      { label: "ETA approved", cls: "bg-green-100 text-green-700" },
      { label: "Design tables", cls: "bg-slate-100 text-slate-700" },
      { label: "Engineer req.", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "316 SS deformed reinforcing bar bonded with Hilti HIT-RE 500 V4 — a premium two-part epoxy acrylate with European Technical Assessment (ETA) approval and full published design resistance tables for masonry and concrete substrates. Preferred for crack stitching where the structural engineer requires documented anchor design values for certification. ETA option 7 rated — suitable for cracked concrete and masonry anchoring. Deformed bar profile enhances mechanical interlock within the epoxy column — higher bond than smooth bar for the same epoxy volume. Damp and underwater installation capability — expanded application window compared to standard epoxy. Hilti HIT-RE 500 V4 requires Hilti manual or battery dispenser — not compatible with standard caulk gun for larger cartridges. Full cure 24–48 hours at 20°C. Hilti technical representative support available for specification and installation review. Confirm current ETA approval number with Hilti Australia before using for certification purposes.",
    technicalProperties: [
      "Hilti HIT-RE 500 V4 has European Technical Assessment (ETA) — full design resistance tables for masonry substrates",
      "Preferred by structural engineers requiring documented anchor design values for project certification",
      "Deformed bar profile enhances mechanical interlock within epoxy column — higher bond than smooth bar",
      "Damp and underwater installation capability — expanded application window for partially damp substrates",
      "Hilti technical representative support for specification and installation review available nationally",
      "316 SS deformed bar — full corrosion resistance for all Australian exposure zones",
    ],
    limitations: [
      "Structural work — engineer mandatory for all crack stitching installations",
      "Hilti HIT-RE 500 V4 is higher cost than general-purpose epoxy — justify by ETA certification requirement",
      "Deformed 316 SS bar may have longer lead time than standard threaded rod — confirm availability before specifying",
      "Requires Hilti manual or battery dispenser — not compatible with standard caulk gun for larger cartridges",
    ],
    procurementSources: [
      { name: "Hilti Australia — national trade supply, technical support, and tool hire", url: "https://www.hilti.com.au" },
      { name: "Hilti Store — major cities nationally", url: "https://www.hilti.com.au" },
      { name: "316 SS deformed bar — specialist stainless steel suppliers (cut to length)", url: "https://www.hilti.com.au" },
      { name: "Confirm current ETA approval number with Hilti Australia before specification for certification", url: "https://www.hilti.com.au" },
    ],
  },
  {
    fullLabel: "Fischer Fixings Australia",
    brandUrl: "https://www.fischer.com.au",
    accentColor: "#7c3aed",
    name: "316 SS smooth bar + Fischer FIS V 360 S vinylester injection mortar",
    descriptionLine: "316 SS smooth bar bonded with Fischer FIS V 360 S vinylester — medium-load option — moisture tolerant — lower cost than full epoxy — for moderate crack stitching or heritage masonry",
    productType: "Vinylester-bonded stainless smooth bar crack stitching — Fischer FIS V 360 S — solid masonry — AS 3700",
    filterTags: ["Stainless-rod", "316-SS", "Crack-stitching", "AS-3700", "Structural", "Engineer-required", "Bore-hole"],
    techChips: [
      { label: "Smooth bar", cls: "bg-purple-100 text-purple-800" },
      { label: "Vinylester", cls: "bg-amber-100 text-amber-800" },
      { label: "Moisture tolerant", cls: "bg-green-100 text-green-700" },
      { label: "Medium load", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "316 SS smooth bar bonded with Fischer FIS V 360 S vinylester injection mortar. A medium-strength option positioned between cementitious grout systems and full epoxy — vinylester provides good bond to masonry and concrete at lower cost than full epoxy, with improved moisture tolerance. Used for moderate-load crack stitching applications where the engineer determines full epoxy capacity is not required, or in heritage and soft masonry where the lower stiffness of vinylester reduces stress concentration compared to rigid epoxy. Fischer FIS V products widely available through Fischer Australia national distribution. Lower stiffness than pure epoxy — reduces the risk of stress concentration at the bar termination in soft or heritage masonry. Full cure approximately 60 minutes at 20°C — faster than epoxy. Pot life approximately 10 minutes at 20°C — shorter at high ambient temperatures; check pot life carefully in hot weather. 316 SS smooth bar has lower interlock with resin than threaded or deformed bar — longer anchorage length required to achieve the same pull-out capacity.",
    technicalProperties: [
      "Vinylester cost lower than full epoxy — economical for moderate-load crack stitching applications",
      "Moisture tolerant — Fischer FIS V 360 S can be injected into damp bore holes within product tolerance",
      "Lower stiffness than pure epoxy — reduces stress concentration in soft or heritage masonry at bar termination",
      "Fischer FIS products widely available through Fischer Australia national distribution network",
      "Fast cure — approximately 60 minutes at 20°C — allows faster site progression than epoxy alternatives",
      "Good bond to masonry, concrete, and stone substrates per Fischer published design resistance data",
    ],
    limitations: [
      "Structural work — engineer mandatory for all crack stitching; vinylester load capacity must be confirmed as sufficient for the design load",
      "Lower load capacity than pure epoxy — not suitable for high-load stitching where full epoxy system is required",
      "Vinylester fumes during cure — higher VOC than epoxy; adequate ventilation and PPE required during installation",
      "316 SS smooth bar has lower mechanical interlock with resin than threaded or deformed bar — longer anchorage length required",
    ],
    procurementSources: [
      { name: "Fischer Fixings Australia — national distribution network", url: "https://www.fischer.com.au" },
      { name: "Total Fasteners — Fischer distributor nationally", url: "https://www.totalfasteners.com.au" },
      { name: "Parchem Construction Supplies — resin injection systems nationally", url: "https://www.parchem.com.au" },
      { name: "316 SS smooth bar — stainless steel suppliers nationally (cut to length from rod stock)", url: "https://www.fischer.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Stainless-rod", label: "Stainless rod" },
  { id: "Epoxy-grout", label: "Epoxy grout" },
  { id: "316-SS", label: "316 SS" },
  { id: "Threaded-rod", label: "Threaded rod" },
  { id: "Deformed-bar", label: "Deformed bar" },
  { id: "Crack-stitching", label: "Crack stitching" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Structural", label: "Structural" },
  { id: "Engineer-required", label: "Engineer required" },
  { id: "Bore-hole", label: "Bore hole" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  rodType: string;
  resin: string;
  capacity: string;
  dampBore: string;
  etaApproved: string;
  cost: string;
  primaryUse: string;
}[] = [
  {
    product: "316 M10 + Sika AnchorFix-3+",
    brand: "Sika Australia",
    rodType: "Threaded rod",
    resin: "Epoxy",
    capacity: "High",
    dampBore: "Yes",
    etaApproved: "No (MPII class)",
    cost: "$$",
    primaryUse: "High-capacity crack stitching — residential and commercial facades",
  },
  {
    product: "316 deformed + Hilti HIT-RE 500 V4",
    brand: "Hilti Australia",
    rodType: "Deformed bar",
    resin: "Epoxy acrylate",
    capacity: "High",
    dampBore: "Yes",
    etaApproved: "Yes",
    cost: "$$$",
    primaryUse: "Engineer certification required — ETA design tables for masonry",
  },
  {
    product: "316 smooth + Fischer FIS V 360 S",
    brand: "Fischer Fixings",
    rodType: "Smooth bar",
    resin: "Vinylester",
    capacity: "Medium",
    dampBore: "Good",
    etaApproved: "Yes",
    cost: "$",
    primaryUse: "Moderate load — heritage masonry or where full epoxy capacity not required",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Higher-capacity crack stitching in solid masonry where helical bar stitching is insufficient for the engineer's design load",
    "Crack stitching at heavily loaded wall junctions, corbels, or beam bearings in masonry facades",
    "Stitching of wide or through-wall cracks in solid concrete masonry block construction",
    "Structural crack repair in heritage masonry where bore-hole installation through mortar joints is preferred over slot cutting",
    "Post-settlement crack repair in solid masonry facades where engineer confirms crack is stable and cause is eliminated",
  ],
  selectionCriteria: [
    "Engineer specification is mandatory — rod type, epoxy or vinylester system, bore diameter, embedment depth, and stitch spacing must be engineer-designed",
    "Crack must be confirmed stable — monitor with crack gauges for minimum 3–6 months before stitching proceeds",
    "Specify epoxy (Sika AnchorFix-3+ or Hilti HIT-RE 500 V4) for high-load applications — specify vinylester (Fischer FIS V) for moderate load or heritage masonry",
    "Where engineer certification with published design tables is required, specify Hilti HIT-RE 500 V4 (ETA-approved) and confirm current ETA approval number",
    "316 SS only — do not accept galvanised or mild steel bar substitution regardless of cost pressure",
    "Bore hole cleaning is the most critical installation step — blow, wire brush, blow again; no oil-lubricated compressed air",
  ],
  limitations: [
    "Structural work — engineer specification and inspection mandatory; do not proceed without engineer involvement",
    "Epoxy and vinylester rod stitching is rigid — does not accommodate ongoing movement; crack must be fully stable before stitching",
    "Bore hole cleaning is critical — any dust layer in the bore prevents epoxy bond and causes pull-out failure",
    "Do not load or cut the rod before full cure — 24 hours minimum at 20°C; extended at lower temperatures",
    "Vinylester fumes during cure — adequate ventilation and PPE required; not suitable for confined spaces without forced ventilation",
    "316 SS only — galvanised or mild steel substitution is not acceptable regardless of cost pressure",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — structural requirements for crack repair and reinforcement in masonry",
    "European Technical Assessment (ETA) — Hilti HIT-RE 500 V4 — confirmed design resistance tables for masonry substrates",
    "Structural engineer's specification — all stainless rod epoxy stitching is structural work requiring documented engineer assessment",
    "Manufacturer TDS — confirm bore diameter, mixing ratio, pot life, and minimum cure time at site temperature before specifying",
    "NATSPEC — Masonry repair worksection — project specification requirements for structural masonry crack repair",
  ],
  suitableDefects: [
    "Through-wall or face cracks in solid masonry requiring higher tensile capacity than helical bar provides",
    "Cracks at structural wall junctions, corbels, or openings where engineer determines bore-hole stitching is appropriate",
    "Wide crack zones in solid masonry block construction where multiple stitching rods are required across the crack plane",
    "Post-settlement structural cracks confirmed stable after minimum 3–6 months of crack gauge monitoring",
    "Cracks in heritage or soft masonry where lower-stiffness vinylester system is preferred over rigid epoxy",
  ],
  typicalSubstrates: [
    "Solid dense fired clay brick — bore holes drilled perpendicular to crack face at engineer-specified depth and spacing",
    "Solid concrete masonry block — confirm block compressive strength supports required pull-out load before specifying",
    "Natural stone (solid coursed masonry) — confirm stone hardness allows clean bore hole without fracturing",
    "Heritage masonry — vinylester (Fischer FIS V) preferred over rigid epoxy to reduce stress concentration in softer masonry",
    "NOT suitable: hollow or perforated masonry without mesh sleeve — bore hole voids prevent epoxy confinement",
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

export function StainlessRodEpoxyIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are stainless rod epoxy-grouted crack stitching systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Stainless rod epoxy-grouted crack stitching systems bond grade 316 stainless steel rods — threaded, deformed, or smooth — into drilled bore holes using two-part epoxy or vinylester injection adhesive. They are a higher-capacity alternative to helical bar crack stitching, used where the engineer requires greater tensile or shear capacity across the crack plane than helical bars can provide.
        </p>
        {expanded && (
          <>
            <p>
              The rod type, adhesive system, bore hole diameter, embedment depth, and stitch spacing must all be specified by a structural engineer — pull-out capacity depends on the bore hole geometry, adhesive bond, and substrate compressive strength. Bore hole cleanliness is the most critical installation variable: any dust layer remaining in the bore prevents the adhesive from bonding to the masonry surface. The bore must be blown clean with dry compressed air, wire-brushed, and blown again before injection. Oil-lubricated compressor air contaminating the bore is a common site error that causes complete bond failure.
            </p>
            <p>
              Epoxy systems (Sika AnchorFix-3+ and Hilti HIT-RE 500 V4) provide higher bond strength. Vinylester (Fischer FIS V) provides a lower-stiffness alternative for moderate-load or heritage masonry applications. The crack must be confirmed stable before stitching — epoxy-bonded rods are rigid and will fail if the underlying cause of cracking is still active. Minimum crack monitoring period of 3–6 months is recommended before stitching proceeds.
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

export function StainlessRodEpoxyProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — stainless rod epoxy-grouted crack stitching — scroll to view all</p>
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
              Side-by-side comparison of stainless rod epoxy-grouted crack stitching systems. Engineer specification mandatory for all installations. Confirm product selections against current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Rod type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Resin</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Capacity</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Damp bore</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">ETA approved</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.rodType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.resin}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.capacity}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.dampBore}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.etaApproved}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.cost}</td>
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
