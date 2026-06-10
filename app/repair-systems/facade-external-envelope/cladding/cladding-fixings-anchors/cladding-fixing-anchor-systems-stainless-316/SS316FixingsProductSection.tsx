"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "SS-316"
  | "Self-drilling"
  | "Hex-bolt"
  | "Chemical-anchor"
  | "Coastal"
  | "Concrete"
  | "Masonry"
  | "Steel"
  | "Pull-out-test"
  | "HCR"
  | "Engineer-required"
  | "Torx-drive"
  | "Bi-metal";

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
    fullLabel: "Buildex / ITW",
    brandUrl: "https://www.itsco.com.au/buildex",
    tdsUrl: "https://www.itsco.com.au/buildex/products/",
    accentColor: "#b45309",
    name: "Buildex SS316 Self-Drilling Screw — FC-to-Aluminium",
    descriptionLine: "316 stainless self-drilling screw — FC sheet and panel to aluminium top-hat — HCR class, no pre-drilling required through rail",
    productType: "Self-Drilling Screw — SS316 — FC-to-aluminium fixing",
    filterTags: ["SS-316", "Self-drilling", "Coastal", "Steel", "HCR"],
    techChips: [
      { label: "316 Stainless Steel", cls: "bg-amber-100 text-amber-800" },
      { label: "Self-Drilling — No Pre-drill", cls: "bg-slate-100 text-slate-700" },
      { label: "HCR Corrosion Class", cls: "bg-sky-100 text-sky-800" },
      { label: "AS 3566 Compliant", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription:
      "Buildex 316 stainless self-drilling screws are the standard fixing for FC sheet and FC panel to aluminium top-hat subframe in Australian cladding construction. The self-drilling tip eliminates pre-drilling through the FC panel — reducing installation time and risk of panel cracking near fixing points. The 316 stainless shank provides HCR (high corrosion resistance) class rating per AS 3566, suitable for coastal and marine-adjacent applications. Available in Torx drive to reduce cam-out and drive force at depth. The FC panel must be pre-drilled to the correct clearance hole size so the screw passes freely through the panel and threads only into the aluminium rail.",
    technicalProperties: [
      "Material: 316 stainless steel — AISI 316 — HCR class per AS 3566",
      "Drive: Torx (TX25 or TX30) or hex head — reduces cam-out at depth",
      "Thread: Hi-Lo thread optimised for FC and fibre substrate grip in aluminium",
      "Drill tip: No.3 for ≤1.6 mm aluminium; No.5 for up to 4 mm rail thickness",
      "Standard sizes: 8g × 45 mm, 8g × 65 mm, 10g × 65 mm",
      "Pull-out: 650–900 N per screw (substrate dependent) — confirm against panel weight and wind load",
    ],
    limitations: [
      "Not suitable for fixing into concrete or masonry — self-drilling only into steel and aluminium",
      "FC panel must be pre-drilled to correct clearance hole size — screw passes through, threads into rail only",
      "Overtorquing cracks FC panel — use torque-limited driver and follow manufacturer's installation instructions",
      "Do not mix 316 and 304 stainless on the same facade — galvanic corrosion risk in coastal zones",
      "Not rated for structural bracket-to-structure connections — use chemical or mechanical anchor for those applications",
    ],
    procurementSources: [
      { name: "ITS Buildex Australia — national", url: "https://www.itsco.com.au/buildex" },
      { name: "ITW Buildex — national trade", url: "https://www.buildex.com.au/" },
    ],
  },
  {
    fullLabel: "Hilti Australia",
    brandUrl: "https://www.hilti.com.au/",
    tdsUrl: "https://www.hilti.com.au/content/hilti/A_AU/en/products/anchor-systems/adhesive-anchors.html",
    accentColor: "#0369a1",
    name: "Hilti HIT-Z SS316 Chemical Anchor — Cladding Bracket to Concrete",
    descriptionLine: "316 stainless threaded rod chemical anchor — post-installed bracket to concrete or masonry — PROFIS Anchor engineered — pull-out test required",
    productType: "Chemical Anchor — SS316 — post-installed bracket to concrete",
    filterTags: ["SS-316", "Chemical-anchor", "Coastal", "Concrete", "Masonry", "Pull-out-test", "Engineer-required"],
    techChips: [
      { label: "316 Stainless Threaded Rod", cls: "bg-sky-100 text-sky-800" },
      { label: "Chemical Injection Anchor", cls: "bg-slate-100 text-slate-700" },
      { label: "PROFIS Anchor Engineered", cls: "bg-amber-100 text-amber-800" },
      { label: "Engineer Required", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Hilti HIT-Z 316 stainless chemical anchors are the preferred post-installed anchor for cladding bracket connections to concrete and masonry in remediation projects. The chemical injection capsule system provides predictable load transfer and can be installed in both cracked and uncracked concrete. All designs must be carried out using Hilti PROFIS Anchor software and verified by a structural engineer — the software generates an anchor design report accepted by certifiers. Pull-out testing of representative installed anchors is required on all high-rise remediation projects per AS 3600. Adhesive: Hilti HIT-RE 500 V4 or HIT-HY 270 depending on substrate condition and design load.",
    technicalProperties: [
      "Material: 316 stainless threaded rod — ISO metric — corrosion resistant in coastal and marine zones",
      "Rod diameters: M10, M12, M16 standard — embedment engineered per PROFIS Anchor output",
      "Adhesive: Hilti HIT-RE 500 V4 or HIT-HY 270 — confirmed per substrate and load requirement",
      "Design load: 5–40 kN tension depending on substrate, embedment and anchor diameter",
      "Cracked and uncracked concrete: both options available — confirm with PROFIS design",
      "Curing time before loading: minimum 24 hr at 15°C — temperature-dependent cure chart applies",
    ],
    limitations: [
      "Engineer must produce PROFIS Anchor design report — no rule-of-thumb spacing or embedment",
      "Hole must be core-drilled and cleaned — dust blown twice — adhesive failure if dusty or wet",
      "Full cure required before bracket loading — minimum 24 hr at 15°C — cannot be rushed",
      "Concrete must be structurally sound — no chemical anchors into crumbling, contaminated or carbonated substrate",
      "SS316 rod must not contact dissimilar metals (aluminium bracket) without neoprene isolation pad",
    ],
    procurementSources: [
      { name: "Hilti Australia — national branches and online", url: "https://www.hilti.com.au/" },
      { name: "Hilti Anchor Systems — product range", url: "https://www.hilti.com.au/content/hilti/A_AU/en/products/anchor-systems.html" },
    ],
  },
  {
    fullLabel: "Buildex / ITW",
    brandUrl: "https://www.buildex.com.au/",
    tdsUrl: "https://www.buildex.com.au/products/",
    accentColor: "#7c3aed",
    name: "Bi-Metal Drill Screw SS316 — FC Panel to Thick Steel Subframe",
    descriptionLine: "316 stainless shank with hardened carbon steel drill tip — drills FC panel to steel subframe 4–8 mm without pre-drilling",
    productType: "Bi-Metal Self-Drilling Screw — SS316 shank / carbon tip",
    filterTags: ["SS-316", "Self-drilling", "Coastal", "Steel", "HCR", "Bi-metal"],
    techChips: [
      { label: "316 SS Shank", cls: "bg-purple-100 text-purple-800" },
      { label: "Hardened Carbon Tip", cls: "bg-slate-100 text-slate-700" },
      { label: "Drills 4–8 mm Steel", cls: "bg-sky-100 text-sky-800" },
      { label: "HCR Corrosion Class", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription:
      "Bi-metal self-drilling screws combine a 316 stainless steel shank (for corrosion resistance) with a hardened carbon steel drill tip (for drilling capacity through thick steel subframe members). Standard 316 self-drilling screws cannot penetrate steel gauge above approximately 1.6 mm — bi-metal fasteners extend this to 4–8 mm steel, covering RHS, SHS, and heavy-gauge steel stud framing used in commercial cladding subframes. The carbon steel tip is enclosed within the stainless shank geometry and does not contact the exterior environment after full installation. A pilot clearance hole through the FC panel is required before applying the screw — the drill tip is for penetrating the steel rail only.",
    technicalProperties: [
      "Shank: 316 stainless steel — HCR rated per AS 3566 — corrosion resistant",
      "Tip: hardened carbon steel — self-sacrificing during drill-through of steel",
      "Drilling capacity: up to 8 mm steel in single pass — suits RHS and SHS subframe",
      "Drive: hex washer head — 1/4\" hex drive — suitable for standard power driver",
      "Standard sizes: 14g × 50 mm, 14g × 75 mm — confirm size against panel and rail thickness",
      "Shear load: 1.5–3.2 kN depending on diameter — confirm against panel weight and wind load",
    ],
    limitations: [
      "Carbon steel tip will corrode if exposed — ensure tip is fully embedded in steel after installation",
      "Bi-metal tip is consumed during drilling — cannot re-use or re-drive the same fastener",
      "Not suitable for fixing into concrete or masonry — for steel subframe only",
      "Pilot clearance hole through FC panel required before driving screw",
      "More expensive per fastener than standard 316 self-drilling — justify against drilling capacity requirement",
    ],
    procurementSources: [
      { name: "Buildex Australia — trade supply", url: "https://www.buildex.com.au/" },
      { name: "ITS Buildex — national", url: "https://www.itsco.com.au/buildex" },
    ],
  },
  {
    fullLabel: "Hilti Australia",
    brandUrl: "https://www.hilti.com.au/",
    tdsUrl: "https://www.hilti.com.au/content/hilti/A_AU/en/products/anchor-systems/mechanical-anchors/KB-TZ2.html",
    accentColor: "#b45309",
    name: "Hilti KB-TZ2 SS316 Mechanical Expansion Anchor — Post-Installed Concrete",
    descriptionLine: "SS316 torque-controlled expansion anchor — post-installed into uncracked concrete — no cure time — PROFIS Anchor engineered",
    productType: "Mechanical Expansion Anchor — SS316 — uncracked concrete",
    filterTags: ["SS-316", "Coastal", "Concrete", "Pull-out-test", "Engineer-required"],
    techChips: [
      { label: "316 Stainless — Torque Controlled", cls: "bg-amber-100 text-amber-800" },
      { label: "No Cure Time", cls: "bg-green-100 text-green-700" },
      { label: "PROFIS Anchor Engineered", cls: "bg-slate-100 text-slate-700" },
      { label: "Engineer Required", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "The Hilti KB-TZ2 is a torque-controlled expansion anchor in 316 stainless steel, used for post-installed anchor connections into uncracked concrete where chemical adhesive anchors are impractical — for example in tight overhead spaces, wet holes, or applications requiring immediate load after installation. The anchor expands mechanically as it is torqued to the specified installation torque — no adhesive cure time required. Full Hilti PROFIS Anchor design is required for all structural connections. Pull-out testing of representative installed anchors is mandatory on high-rise cladding remediation projects. Suitable only for uncracked concrete — use HIT-Z chemical anchor for cracked zones.",
    technicalProperties: [
      "Material: 316 stainless steel — coastal and marine zone rated",
      "Type: torque-controlled expansion (TCE) anchor — immediate load after torquing",
      "Diameters: M8, M10, M12, M16 — embedment per PROFIS Anchor design output",
      "Concrete: uncracked C20–C50 minimum — not suitable for cracked concrete zones",
      "Installation: dry core drill — no adhesive flush required — suitable for wet holes",
      "Design load: PROFIS Anchor output only — no rule-of-thumb allowable load",
    ],
    limitations: [
      "Not suitable for cracked concrete — use Hilti HIT-Z chemical anchor for cracked zones",
      "Concrete must be structurally sound and uncracked — confirm with survey before specifying",
      "Minimum edge and spacing distances are large — check layout against anchor plan before drilling",
      "Installation torque must be verified with calibrated torque wrench — undertorquing = anchor failure",
      "Engineer certification required for all structural connections — no exceptions on high-rise",
    ],
    procurementSources: [
      { name: "Hilti Australia — national branches and online", url: "https://www.hilti.com.au/" },
      { name: "Hilti KB-TZ2 Product Page", url: "https://www.hilti.com.au/content/hilti/A_AU/en/products/anchor-systems/mechanical-anchors/KB-TZ2.html" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "SS-316", label: "SS-316" },
  { id: "Self-drilling", label: "Self-Drilling" },
  { id: "Hex-bolt", label: "Hex Bolt" },
  { id: "Chemical-anchor", label: "Chemical Anchor" },
  { id: "Coastal", label: "Coastal Rated" },
  { id: "Concrete", label: "Concrete" },
  { id: "Masonry", label: "Masonry" },
  { id: "Steel", label: "Steel" },
  { id: "Pull-out-test", label: "Pull-out Test" },
  { id: "HCR", label: "HCR Rated" },
  { id: "Engineer-required", label: "Engineer Required" },
  { id: "Torx-drive", label: "Torx Drive" },
  { id: "Bi-metal", label: "Bi-metal" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  fixingType: string;
  material: string;
  substrate: string;
  coastal: string;
  engineerRequired: string;
  primaryUse: string;
}[] = [
  {
    product: "Buildex SS316 Self-Drilling",
    brand: "Buildex / ITW",
    fixingType: "Self-drilling screw",
    material: "316 Stainless Steel",
    substrate: "Aluminium / light steel rail",
    coastal: "Yes — HCR rated",
    engineerRequired: "No",
    primaryUse: "FC panel to aluminium top-hat rail",
  },
  {
    product: "Hilti HIT-Z Chemical Anchor",
    brand: "Hilti Australia",
    fixingType: "Chemical injection anchor",
    material: "316 Stainless threaded rod",
    substrate: "Concrete / masonry",
    coastal: "Yes",
    engineerRequired: "Yes — PROFIS Anchor",
    primaryUse: "Cladding bracket to existing concrete",
  },
  {
    product: "Bi-Metal SS316 Drill Screw",
    brand: "Buildex / ITW",
    fixingType: "Bi-metal self-drilling",
    material: "316 SS shank / carbon tip",
    substrate: "Steel 4–8 mm",
    coastal: "Yes — HCR rated",
    engineerRequired: "No",
    primaryUse: "FC panel to thick steel subframe",
  },
  {
    product: "Hilti KB-TZ2 Mechanical",
    brand: "Hilti Australia",
    fixingType: "Torque-controlled expansion",
    material: "316 Stainless Steel",
    substrate: "Uncracked concrete",
    coastal: "Yes",
    engineerRequired: "Yes — PROFIS Anchor",
    primaryUse: "Bracket to concrete — no cure time required",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "FC sheet and FC panel to aluminium top-hat rail — 316 self-drilling screw standard fixing",
    "Helping-hand bracket to concrete column or beam — chemical anchor HIT-Z SS316",
    "Steel RHS/SHS subframe member connections — bi-metal self-drilling 316 SS",
    "Bracket to concrete soffit or overhead position — mechanical expansion anchor KB-TZ2",
    "Marine-zone cladding facades — all fixings to be 316 stainless or HCR rated throughout",
    "Pull-out testing program for remediation works on high-rise buildings",
  ],
  selectionCriteria: [
    "Self-drilling SS316: FC panel to aluminium rail — most common cladding panel fixing",
    "Bi-metal SS316: FC or panel to steel subframe 4–8 mm gauge — where standard tip cannot penetrate",
    "Chemical anchor SS316: bracket to existing concrete — preferred method for remediation projects",
    "Mechanical anchor SS316: bracket to uncracked concrete — no cure time, immediate loading",
    "All coastal zone fixings: specify HCR / 316 stainless minimum — 304 or carbon steel not acceptable",
    "Engineer must design bracket anchor pattern using PROFIS or equivalent — no rule-of-thumb",
  ],
  limitations: [
    "All structural bracket anchors require engineer certification — no exceptions on Class 2+ buildings",
    "Chemical anchors must be installed in clean dry holes — hole must be dust-blown twice after drilling",
    "FC panel screws must pass through panel with clearance hole — thread engagement in rail flange only",
    "Overtorquing FC screws cracks panels — torque-limited drivers mandatory for panel fixing",
    "Do not mix 304 and 316 stainless fasteners — use consistent grade throughout the entire fixing schedule",
    "Pull-out testing of representative installed anchors required on all high-rise remediation projects",
  ],
  standardsNotes: [
    "AS 3566: self-drilling screws — corrosion resistance classes (Class 3, 4, HCR) — Class 4 / HCR for coastal",
    "AS 3600: concrete structures — post-installed anchor design requirements and testing",
    "AS/NZS 1170.2: wind actions — basis for anchor and fixing design loads",
    "Hilti PROFIS Anchor: software accepted by most Australian certifiers for anchor design reports",
    "NCC 2022: fixings in cladding system must maintain required fire-resistance period",
    "AS 4284: facade testing — fixing failure modes to be addressed in facade design documentation",
  ],
  suitableDefects: [
    "ACP cladding remediation — all new fixings in replacement cladding system to be SS316",
    "Corroded fasteners in coastal zone — replace with SS316 throughout the entire fixing schedule",
    "Loose cladding panels — investigate fixing failure and replace anchor if pull-out occurred",
    "Water ingress at fixing points — re-fix with correctly sized clearance hole and sealant cap",
    "Anchor failure in aged concrete — pull-out test program and chemical anchor replacement scheme",
    "New cladding installation requiring full corrosion-resistant fixing schedule",
  ],
  typicalSubstrates: [
    "Aluminium top-hat rail: self-drilling screw 316 SS — standard FC panel fixing",
    "Steel RHS/SHS subframe: bi-metal self-drilling 316 SS shank — thicker steel penetration",
    "Concrete column/beam: chemical anchor Hilti HIT-Z SS316 — PROFIS Anchor design required",
    "Concrete soffit: mechanical expansion anchor Hilti KB-TZ2 SS316 — no cure time",
    "Masonry blockwork: chemical anchor — embedment into block body (not mortar joint)",
    "Steel stud framing: self-drilling screw 316 SS — penetrate stud at engineered spacing",
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

export function SS316FixingsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are stainless 316 cladding fixing and anchor systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Stainless steel 316 fixing and anchor systems are the fastener schedule for Australian cladding construction in coastal, marine-adjacent, and high-corrosion environments. They encompass self-drilling screws for panel-to-rail connections, chemical anchors for post-installed bracket-to-concrete connections, and mechanical expansion anchors for uncracked concrete. All are required to be HCR class per AS 3566 or equivalent in coastal zones.
        </p>
        {expanded && (
          <>
            <p>
              The distinction between cladding panel fixings (FC screw to rail) and structural anchors (bracket to primary structure) is critical. Cladding panel fixings carry only the panel weight and wind pressure on a single panel — relatively low loads. Structural anchors at the helping-hand bracket carry the combined load of all panels tributary to that bracket plus wind uplift — potentially 5–15 kN per anchor in high-rise wind zones. These must be designed by a structural engineer using PROFIS Anchor or equivalent software.
            </p>
            <p>
              In coastal and marine zones, fastener material selection is paramount. AS 3566 classifies fasteners from Class 1 (indoor) to Class 4 / HCR (coastal). 304 stainless may be adequate for inland applications but will pit and lose tensile strength in marine environments. 316L stainless is mandatory within 1 km of marine water and recommended for all facade applications. Galvanic corrosion between dissimilar metals is a common cause of cladding fixing failure — all multi-metal interfaces must be isolated with neoprene pads or PTFE washers.
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

export function SS316FixingsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — SS316 fixings and anchors — scroll to view all</p>
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
              Side-by-side comparison of SS316 cladding fixing and anchor systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fixing type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Engineer req.</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fixingType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrate}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.engineerRequired}</td>
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
