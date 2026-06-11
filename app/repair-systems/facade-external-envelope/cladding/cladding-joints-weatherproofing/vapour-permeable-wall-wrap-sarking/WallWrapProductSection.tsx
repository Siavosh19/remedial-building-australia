"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Wall-wrap"
  | "Sarking"
  | "Vapour-permeable"
  | "Vapour-barrier"
  | "Breather-membrane"
  | "Reflective"
  | "Non-reflective"
  | "Self-adhesive"
  | "Coastal"
  | "Non-combustible"
  | "NCC-2022"
  | "AS-4200"
  | "Airtight";

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
    fullLabel: "Ametalin / CSR",
    brandUrl: "https://www.ametalin.com/",
    tdsUrl: "https://www.ametalin.com/products/thermawall/",
    accentColor: "#b45309",
    name: "Ametalin ThermaWall Vapour-Permeable Wall Wrap",
    descriptionLine: "Vapour-permeable Class A breather membrane — Sd < 0.1 m — AS 4200.1 compliant — coastal zone rated — 6-month UV exposure",
    productType: "Vapour-permeable wall wrap — Class A breather membrane",
    filterTags: ["Wall-wrap", "Sarking", "Vapour-permeable", "Breather-membrane", "Coastal", "Non-combustible", "NCC-2022", "AS-4200"],
    techChips: [
      { label: "Vapour-Permeable — Breather", cls: "bg-amber-100 text-amber-800" },
      { label: "Sd < 0.1 m — Class A", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC 2022 Compliant", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal Zone Rated", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Ametalin ThermaWall is a vapour-permeable wall wrap (breather membrane) installed directly over the structural sheathing or stud wall before the cladding subframe and panels are installed. The membrane allows water vapour generated inside the building to pass outward through the wall (preventing interstitial condensation), while blocking liquid water driven inward by rain from reaching the primary structure. Class A per AS 4200.1 — UV stable for up to 6 months prior to cladding installation. The key distinction from vapour barriers: ThermaWall allows vapour to pass (Sd < 0.1 m) — it does not trap moisture inside the wall. Laps and penetrations must be sealed with compatible self-adhesive tape.",
    technicalProperties: [
      "Type: vapour-permeable breather membrane — Class A per AS 4200.1",
      "Sd value: < 0.1 m — high vapour permeance — allows interstitial drying",
      "Water entry pressure: > 500 mm water column — resists liquid water ingress",
      "UV exposure: 6 months maximum before cladding is installed",
      "Tensile strength: > 50 N/50 mm (MD and CD) — resistant to handling tears",
      "Width: 1,350 mm standard roll — overlap: 150 mm at horizontal and vertical laps",
    ],
    limitations: [
      "Must not be used as a vapour barrier — it is permeable and will not prevent vapour ingress",
      "UV exposure limited to 6 months — must be covered by cladding within this period",
      "Laps and penetrations must be sealed with compatible self-adhesive tape — unsealed laps allow water ingress",
      "Not a waterproofing membrane — does not replace flashings at all window and door openings",
      "Wrinkles in the membrane create water traps — install taut and neat without sagging",
      "TODO: owner confirm — ThermaWall not found in current Ametalin product range; current confirmed AU range is VapourTech, ThermalBreak, ThermalLiner, SilverWrap, SilverSark, FireSark — verify product name and availability with Ametalin before specifying",
    ],
    procurementSources: [
      { name: "Ametalin Australia — national", url: "https://www.ametalin.com/" },
      { name: "CSR Building Products — national", url: "https://www.csr.com.au/" },
    ],
  },
  {
    fullLabel: "Kingspan / Bradford",
    brandUrl: "https://www.kingspan.com/au/",
    accentColor: "#0369a1",
    name: "Kingspan Kooltherm W1 Reflective Vapour Barrier",
    descriptionLine: "Reflective foil vapour barrier — Class B — Sd > 20 m — thermal and vapour control — NCC 2022 Section J contribution",
    productType: "Reflective foil vapour barrier — Class B — NCC 2022 Section J",
    filterTags: ["Wall-wrap", "Sarking", "Vapour-barrier", "Reflective", "Coastal", "NCC-2022", "AS-4200"],
    techChips: [
      { label: "Reflective Foil — Radiant Barrier", cls: "bg-sky-100 text-sky-800" },
      { label: "Vapour Barrier — Class B", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC 2022 Section J", cls: "bg-amber-100 text-amber-800" },
      { label: "Thermal + Vapour Control", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Kingspan Kooltherm W1 reflective foil provides both a vapour barrier (Class B per AS 4200.1 — low vapour permeance, Sd > 20 m) and a radiant heat barrier in wall cavities. The reflective foil surface reflects radiant heat back into the building in winter and reflects incoming solar radiant heat in summer — contributing to NCC 2022 Section J thermal performance compliance. Unlike vapour-permeable membranes, Class B foil barriers have high resistance to vapour passage — they are used where it is specifically required to prevent moisture vapour moving from a high-humidity interior. A minimum 25 mm air gap must be maintained between the reflective surface and the adjacent material for the thermal barrier function to operate.",
    technicalProperties: [
      "Type: reflective foil vapour barrier — Class B per AS 4200.1",
      "Sd value: > 20 m — high vapour resistance — blocks vapour movement",
      "Emissivity: ε < 0.05 — highly reflective — contributes to Section J Rf value",
      "Water penetration resistance: > 500 mm water column",
      "UV exposure: 3 months maximum before cladding must be installed",
      "Width: 1,350 mm standard roll — laps sealed with foil tape",
    ],
    limitations: [
      "Class B vapour barrier must only be used where vapour control is the design intent — use Class A in most cladding",
      "Traps moisture if installed incorrectly — consult building physicist for climate zone analysis before specifying",
      "Reflective surfaces require 25 mm air gap to function as radiant thermal barrier",
      "Laps must be sealed with foil tape — standard masking tape is not compatible",
      "UV exposure 3 months maximum — must be covered by cladding before this period expires",
    ],
    procurementSources: [
      { name: "Kingspan Australia — national", url: "https://www.kingspan.com/au/" },
      { name: "CSR Bradford Insulation (reflective foil)", url: "https://www.bradfordinsulation.com.au/" },
    ],
  },
  {
    fullLabel: "Pro Clima Australia",
    brandUrl: "https://www.proclimaaustralia.com.au/",
    tdsUrl: "https://www.proclimaaustralia.com.au/products/solitex-extasana/",
    accentColor: "#7c3aed",
    name: "Pro Clima SOLITEX EXTASANA Premium Facade Membrane",
    descriptionLine: "Premium vapour-permeable facade membrane — Sd < 0.02 m — airtight lap tape system — 12-month UV rating — passive house compatible",
    productType: "Premium vapour-permeable facade membrane — airtight laps — passive house",
    filterTags: ["Wall-wrap", "Sarking", "Vapour-permeable", "Breather-membrane", "Airtight", "Non-combustible", "NCC-2022", "AS-4200"],
    techChips: [
      { label: "Sd < 0.02 m — Ultra Permeable", cls: "bg-purple-100 text-purple-800" },
      { label: "Airtight Lap Tape System", cls: "bg-slate-100 text-slate-700" },
      { label: "Passive House Compatible", cls: "bg-sky-100 text-sky-800" },
      { label: "12-Month UV Exposure", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Pro Clima SOLITEX EXTASANA is a premium German-engineered vapour-permeable facade membrane (Sd < 0.02 m — ultra-high permeance) with an airtight lap tape system for use in high-performance building envelopes. Where standard wall wraps rely on overlapped laps for watertightness, the EXTASANA system uses a compatible self-adhesive Tescon tape to create airtight joints between sheet runs — contributing to the building's air leakage performance (NCC 2022 requires < 10 m³/h/m² at 50 Pa for Class 2 buildings). The 12-month UV exposure rating (versus 3–6 months for standard wraps) provides greater construction programme flexibility.",
    technicalProperties: [
      "Type: vapour-permeable facade membrane — Class A per AS 4200.1",
      "Sd value: < 0.02 m — ultra-high permeance — passive house and NCC 2022 compatible",
      "Airtight lap tape: Tescon Vana — site-applied — creates airtight joint at laps",
      "UV exposure: 12 months — extended construction programme flexibility",
      "Water entry pressure: > 1,000 mm water column — higher than standard wraps",
      "Tensile strength: > 120 N/50 mm — resistant to wind and installation loads",
    ],
    limitations: [
      "Higher cost than standard wall wraps — justify in high-performance envelopes only",
      "Airtight tape system requires trained installer — not suitable for general labour",
      "Specialist importer — lead times can be 4–8 weeks — include in programme",
      "Airtight lap system requires Tescon tape from Pro Clima — do not use generic tape",
      "Wind-washing must be prevented — install cladding before extended exposure to prevailing winds",
    ],
    procurementSources: [
      { name: "Pro Clima Australia — specialist distributor", url: "https://www.proclimaaustralia.com.au/" },
      { name: "Passive House Australia (distributor)", url: "https://www.passivehouseaustralia.org/" },
    ],
  },
  {
    fullLabel: "CSR Bradford",
    brandUrl: "https://www.bradfordinsulation.com.au/",
    tdsUrl: "https://www.bradfordinsulation.com.au/products/sisalation/",
    accentColor: "#b45309",
    name: "CSR Sisalation 450 Reflective Wall Sarking",
    descriptionLine: "Standard reflective foil/kraft wall sarking — Class B — residential cladding — lowest cost — wide trade distribution",
    productType: "Reflective wall sarking — Class B — standard residential",
    filterTags: ["Wall-wrap", "Sarking", "Reflective", "Vapour-barrier", "Coastal", "NCC-2022", "AS-4200"],
    techChips: [
      { label: "Reflective Foil Sarking", cls: "bg-amber-100 text-amber-800" },
      { label: "Class B — AS 4200.1", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC 2022 Section J", cls: "bg-sky-100 text-sky-800" },
      { label: "Low Cost — Wide Distribution", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "CSR Bradford Sisalation 450 is the most widely used reflective wall sarking in Australian residential construction — a low-cost foil/kraft laminate wall wrap installed behind timber-framed cladding. Class B per AS 4200.1 — acts as both a vapour barrier and a radiant heat reflector. Used behind Colorbond Walling, FC sheet, and timber weatherboard cladding in standard residential construction. For NCC 2022 Section J compliance contribution, a 25 mm air gap must be maintained between the reflective surface and the adjacent material. Laps are stapled — not airtight — not suitable for airtight building envelope targets.",
    technicalProperties: [
      "Type: reflective foil/kraft sarking — Class B per AS 4200.1",
      "Emissivity: ε < 0.05 — reflective — contributes to Section J Rf value",
      "Width: 1,350 mm and 1,200 mm — length: 30 m per roll standard",
      "Lapping: 75 mm minimum — fixed with staples or cap-head nails",
      "UV exposure: 3 months maximum — must be covered before this period",
      "Cost: lowest cost option — widest trade distribution nationally",
    ],
    limitations: [
      "Class B vapour barrier — not suitable where vapour permeance is the design intent — use Class A",
      "Not suitable for passive house or high-performance envelopes — use Pro Clima EXTASANA",
      "Must have 25 mm air gap to reflective surface for thermal barrier function",
      "UV exposure 3 months only — must be covered before this period expires",
      "Laps stapled — not airtight — not suitable for airtight building envelope performance target",
    ],
    procurementSources: [
      { name: "CSR Bradford Insulation — national", url: "https://www.bradfordinsulation.com.au/" },
      { name: "Bunnings / trade suppliers", url: "https://www.bunnings.com.au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Wall-wrap", label: "Wall Wrap" },
  { id: "Sarking", label: "Sarking" },
  { id: "Vapour-permeable", label: "Vapour-Permeable" },
  { id: "Vapour-barrier", label: "Vapour Barrier" },
  { id: "Breather-membrane", label: "Breather Membrane" },
  { id: "Reflective", label: "Reflective" },
  { id: "Non-reflective", label: "Non-Reflective" },
  { id: "Self-adhesive", label: "Self-Adhesive" },
  { id: "Coastal", label: "Coastal Rated" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "NCC-2022", label: "NCC-2022" },
  { id: "AS-4200", label: "AS-4200" },
  { id: "Airtight", label: "Airtight" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  membraneType: string;
  class: string;
  sdValue: string;
  reflective: string;
  airtightLaps: string;
  primaryUse: string;
}[] = [
  {
    product: "Ametalin ThermaWall",
    brand: "Ametalin / CSR",
    membraneType: "Breather membrane",
    class: "Class A (permeable)",
    sdValue: "< 0.1 m",
    reflective: "No",
    airtightLaps: "No",
    primaryUse: "Standard coastal cladding — vapour-permeable",
  },
  {
    product: "Kingspan Kooltherm W1",
    brand: "Kingspan / Bradford",
    membraneType: "Reflective vapour barrier",
    class: "Class B (barrier)",
    sdValue: "> 20 m",
    reflective: "Yes",
    airtightLaps: "No",
    primaryUse: "Thermal + vapour control — Section J",
  },
  {
    product: "Pro Clima EXTASANA",
    brand: "Pro Clima Australia",
    membraneType: "Breather membrane",
    class: "Class A (permeable)",
    sdValue: "< 0.02 m",
    reflective: "No",
    airtightLaps: "Yes — Tescon tape",
    primaryUse: "Passive house / airtight envelope",
  },
  {
    product: "CSR Sisalation 450",
    brand: "CSR Bradford",
    membraneType: "Reflective sarking",
    class: "Class B (barrier)",
    sdValue: "> 20 m",
    reflective: "Yes",
    airtightLaps: "No",
    primaryUse: "Standard residential cladding",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "All new rainscreen cladding installations — wall wrap behind subframe and panels",
    "FC sheet and FC panel systems — breather membrane over stud framing and sheathing",
    "Colorbond Walling — reflective sarking behind cladding panels for thermal performance",
    "High-performance building envelopes — airtight membrane system for NCC 2022 compliance",
    "Cladding remediation — new wall wrap where original sarking is absent or has degraded",
    "NCC 2022 Section J compliance — thermal contribution from reflective foil wall sarking",
  ],
  selectionCriteria: [
    "Standard residential cladding inland: Sisalation 450 — lowest cost, wide distribution",
    "Coastal zone cladding: Ametalin ThermaWall — vapour-permeable Class A breather",
    "High-performance envelope target: Pro Clima EXTASANA — airtight laps for air leakage",
    "Where reflective thermal contribution is required: Class B reflective foil barrier",
    "Where vapour permeance is required: Class A permeable membrane — not Class B barrier",
    "Climate zone analysis required — warm-humid zones differ from cold-climate zones",
  ],
  limitations: [
    "Vapour-permeable (Class A) and vapour barrier (Class B) are opposite functions — specify correctly",
    "In hot humid climates (Qld, NT): Class A permeable membrane typically the correct specification",
    "In cold climates (Vic highlands, ACT): vapour barrier on warm side of insulation may be specified",
    "All laps and penetrations must be sealed with compatible tape — unsealed laps allow water ingress",
    "UV exposure limits are mandatory — unprotected membranes degrade rapidly in Australian sun",
    "Wall wraps do not replace flashings — flashings at all openings are mandatory regardless of membrane type",
  ],
  standardsNotes: [
    "AS 4200.1: pliable building membranes and underlays — classification (Class A permeable / Class B barrier)",
    "AS 4200.2: pliable building membranes — installation requirements — lapping and sealing",
    "NCC 2022 Section J: thermal performance — sarking and reflective foil Rf value contribution",
    "ABCB Condensation Handbook: guidance on vapour control in Australian climate zones",
    "ISO 9346: hygrothermal performance — vapour transfer characterisation — Sd value",
    "NCC 2022 Volume One Part F6: energy efficiency — sarking requirements for Class 2 buildings",
  ],
  suitableDefects: [
    "Cladding remediation where original wall wrap is absent — install new breather membrane over sheathing",
    "Condensation in wall cavity — assess climate zone and replace with appropriate Class A or B membrane",
    "Degraded UV-exposed sarking — replace before installing new cladding panels",
    "ACP remediation — new wall wrap required over new sheathing where primary structure is exposed",
    "Passive house retrofits requiring airtight membrane — replace standard wrap with Pro Clima EXTASANA",
    "Failed reflective sarking — replace with new sarking and re-establish required 25 mm air gap",
  ],
  typicalSubstrates: [
    "Steel stud framing: wall wrap installed over studs and sheathing board — stapled at 300 mm centres",
    "Timber stud framing: wall wrap stapled to studs with 75 mm overlap at horizontal and vertical joints",
    "Concrete or masonry: wall wrap adhered or mechanically fixed — confirm compatibility with adhesive",
    "FC sheet sheathing (Pronto board): wall wrap over sheathing — sealed at edges with compatible tape",
    "Insulated substrate (PIR boards): wall wrap over insulation — airtight tape at all laps",
    "Existing degraded wall wrap: remove entirely and replace — do not install over degraded membrane",
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

export function WallWrapIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are vapour-permeable wall wrap and sarking systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Wall wraps and sarking are the second line of defence in a rainscreen cladding system — installed directly over the structural framing or sheathing, behind the subframe and cladding panels. They prevent any water that passes through the outer cladding from reaching the primary structure, while also controlling vapour movement through the wall assembly.
        </p>
        {expanded && (
          <>
            <p>
              The most important decision in wall wrap selection is Class A (vapour-permeable) versus Class B (vapour barrier). These are opposite functions. In most Australian climate zones, particularly warm-humid coastal environments, a Class A permeable membrane (breather membrane) is correct — it allows moisture vapour that enters the wall cavity to escape outward, preventing interstitial condensation. A Class B vapour barrier in this situation would trap moisture in the wall cavity.
            </p>
            <p>
              Consult the ABCB Condensation Handbook and NCC 2022 Section J before specifying membrane type. The correct product depends on climate zone, wall assembly configuration, and whether heating or cooling is the dominant energy load. Getting this wrong leads to mould, condensation, and structural damage — none of which is visible until significant damage has occurred.
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

export function WallWrapProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — wall wrap and sarking — scroll to view all</p>
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
              Side-by-side comparison of wall wrap and sarking systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sd value</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Reflective</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Airtight laps</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.membraneType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.class}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sdValue}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.reflective}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.airtightLaps}</td>
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
