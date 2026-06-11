"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Helping-hand" | "Bracket" | "Aluminium" | "Stainless-316" | "Adjustable"
  | "Thermal-break" | "Engineer-required" | "Coastal" | "Concrete" | "Masonry"
  | "Steel-frame" | "Fixed" | "Swing-bracket";

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
    fullLabel: "Hilti MFT Adjustable Facade Bracket System",
    brandUrl: "https://www.hilti.com.au/",
    accentColor: "#e2003a",
    name: "Hilti MFT Adjustable Bracket",
    descriptionLine: "Three-axis adjustable stainless bracket — eliminates shimming on remediation.",
    productType: "Adjustable Facade Bracket",
    filterTags: ["Helping-hand", "Bracket", "Stainless-316", "Adjustable", "Engineer-required", "Coastal", "Concrete", "Masonry"],
    techChips: [
      { label: "316 Stainless Steel", cls: "bg-green-100 text-green-800" },
      { label: "3-Axis Adjustment", cls: "bg-blue-100 text-blue-800" },
      { label: "Coastal Zone Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "Hilti Engineered System", cls: "bg-purple-100 text-purple-800" },
      { label: "Engineer Required", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "The Hilti MFT modular facade bracket system provides three-axis adjustment (vertical ±30 mm, horizontal ±20 mm, in/out ±30 mm) — critical for remediation projects where the existing substrate is not plumb or level. Manufactured from 316L stainless steel, the bracket is fully corrosion-resistant in coastal and marine environments. Anchor to concrete or masonry using Hilti HIT-Z anchor bolts with PROFIS Anchor software engineering. The system includes thermal break pads under each bracket foot to reduce conductive bridging to the primary structure.",
    technicalProperties: [
      "Material: 316L stainless steel",
      "Adjustment: ±30 mm in/out, ±20 mm lateral",
      "Max design load: engineer to confirm per anchor",
      "Thermal break: neoprene pad supplied",
      "Rail connection: clamped or bolted to top-hat",
      "Anchor: Hilti HIT-Z chemical anchor (not supplied)",
      "PROFIS Anchor software engineering included",
      "Coastal and marine rated — no maintenance",
    ],
    limitations: [
      "Engineer certification required — do not install without PROFIS design",
      "High cost per bracket vs fabricated aluminium alternatives",
      "Three-axis adjustment increases installation time per bracket",
      "Requires Hilti HIT-Z anchors — system must not be mixed with other brands",
      "Thermal break pad must be specified — not always supplied by default",
    ],
    procurementSources: [
      { name: "Hilti Australia", url: "https://www.hilti.com.au/" },
      { name: "Hilti Online Store", url: "https://www.hilti.com.au/store" },
    ],
  },
  {
    fullLabel: "Capral Standard Helping-Hand Bracket — 6063-T6",
    brandUrl: "https://www.capral.com.au/",
    accentColor: "#0369a1",
    name: "Capral Standard Helping-Hand",
    descriptionLine: "Fixed-offset aluminium helping-hand bracket — standard cladding subframe.",
    productType: "Fixed Aluminium Bracket",
    filterTags: ["Helping-hand", "Bracket", "Aluminium", "Engineer-required", "Coastal", "Concrete", "Masonry", "Steel-frame", "Fixed"],
    techChips: [
      { label: "6063-T6 Aluminium", cls: "bg-blue-100 text-blue-800" },
      { label: "Fixed Offset", cls: "bg-purple-100 text-purple-800" },
      { label: "Anodised Finish", cls: "bg-green-100 text-green-800" },
      { label: "Coastal Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "Engineer Required", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Capral standard helping-hand brackets in 6063-T6 aluminium are the most commonly used subframe bracket in Australian cladding construction. Available in fixed offsets of 50, 75, 100, 125, and 150 mm, the brackets are bolted or screwed to the primary structure and receive the top-hat rail in a clamped connection. The anodised finish provides corrosion resistance in coastal zones without the cost premium of stainless steel — acceptable for non-marine zones. Used with stainless 316 fasteners to avoid galvanic corrosion at the fixing interface.",
    technicalProperties: [
      "Material: 6063-T6 aluminium",
      "Fixed offsets: 50, 75, 100, 125, 150 mm",
      "Bracket width: 60 mm standard",
      "Connection: 2× M10 or M12 bolts to structure",
      "Rail connection: 2× self-drilling screws or M8 bolt",
      "Finish: anodised silver or powder-coat",
      "Thermal break: neoprene pad (specify separately)",
      "Weight: 0.3–0.6 kg per bracket",
    ],
    limitations: [
      "Fixed offset requires accurate survey of substrate plumb before ordering",
      "No in-situ adjustment — shimming required if substrate is out of plumb",
      "Aluminium-to-structure connection must use stainless fasteners to avoid galvanic corrosion",
      "Engineer certification required for all high-rise applications",
      "Not rated for marine-zone without anodising confirmation",
    ],
    procurementSources: [
      { name: "Capral Aluminium", url: "https://www.capral.com.au/" },
      { name: "Ullrich Aluminium", url: "https://www.ullrich.com.au/" },
    ],
  },
  {
    fullLabel: "Nvelope NV4 Adjustable Bracket System",
    brandUrl: "https://www.nvelope.com/",
    accentColor: "#7c3aed",
    name: "Nvelope NV4 Adjustable",
    descriptionLine: "Engineered adjustable bracket with integrated thermal break — terracotta and heavy panels.",
    productType: "Thermal-Break Adjustable Bracket",
    filterTags: ["Helping-hand", "Bracket", "Stainless-316", "Adjustable", "Thermal-break", "Engineer-required", "Coastal", "Concrete"],
    techChips: [
      { label: "316 Stainless Steel", cls: "bg-green-100 text-green-800" },
      { label: "Integrated Thermal Break", cls: "bg-blue-100 text-blue-800" },
      { label: "Adjustable ±25 mm", cls: "bg-purple-100 text-purple-800" },
      { label: "Heavy Panel Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "BBA / ETA Assessed", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "The Nvelope NV4 system is a European-engineered adjustable cladding bracket widely used for terracotta, sintered stone, and heavy rainscreen panel systems. It incorporates an integrated polyamide thermal break at the bracket arm, complying with NCC 2022 Section J thermal bridging requirements without additional accessories. Stainless 316 construction provides full coastal and marine zone compatibility. The bracket is ETA-assessed and carries independent certification for wind load performance — accepted by most certifiers without additional engineer testing.",
    technicalProperties: [
      "Material: 316 stainless steel with polyamide break",
      "Adjustment: ±25 mm in/out",
      "Design load: up to 3.5 kN per bracket (varies by configuration)",
      "Integrated thermal break: polyamide 66 GF30",
      "ETA / BBA certification for wind load",
      "Anchor: chemical anchor or mechanical bolt (not supplied)",
      "Bracket depth options: 60–200 mm",
      "Weight: 0.8–1.4 kg per bracket",
    ],
    limitations: [
      "Significantly higher cost than standard aluminium helping-hand",
      "Lead time: specialist importer — 8–16 weeks",
      "System is proprietary — rail must be compatible Nvelope profile",
      "Specialist installer training recommended",
      "Engineer must confirm anchor capacity and bracket spacing",
    ],
    procurementSources: [
      { name: "Nvelope International", url: "https://www.nvelope.com/" },
      { name: "Nvelope Products", url: "https://www.nvelope.com/products/" },
    ],
  },
  {
    fullLabel: "Swing Bracket — Stainless 316 — Thermally Broken",
    brandUrl: "https://www.dorken.de/en/",
    accentColor: "#b45309",
    name: "Swing Bracket SS316",
    descriptionLine: "Pivot-arm swing bracket — accommodates out-of-plane substrate variation.",
    productType: "Swing / Pivot Bracket",
    filterTags: ["Helping-hand", "Bracket", "Stainless-316", "Adjustable", "Thermal-break", "Engineer-required", "Coastal", "Concrete", "Masonry", "Swing-bracket"],
    techChips: [
      { label: "316 Stainless Steel", cls: "bg-green-100 text-green-800" },
      { label: "Pivot-Arm Design", cls: "bg-blue-100 text-blue-800" },
      { label: "Thermal Break Pad", cls: "bg-purple-100 text-purple-800" },
      { label: "Coastal Zone Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "Out-of-Plane Adjustment", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Swing brackets (also called pivot brackets) use a slotted pivot point in the bracket arm that allows the rail-to-structure offset to be set in-situ after the bracket is fixed to the structure. This eliminates the need for precise pre-survey of substrate plumb — the bracket arm swings out and is locked at the required position. Particularly valuable in facade remediation on existing buildings where the substrate surface is irregular or has been repaired. Available in 316 stainless steel with thermal break neoprene pad under the bracket base plate.",
    technicalProperties: [
      "Material: 316 stainless steel",
      "Pivot-arm offset range: 50–200 mm (set in field)",
      "Slotted pivot: locked by M10 bolts after setting",
      "Thermal break: neoprene pad under base plate",
      "Base plate: 100 × 100 mm with 4× fixing holes",
      "Rail connection: bolted clamp to top-hat flange",
      "Design load: engineer to confirm per project",
      "Finish: electropolished or mill stainless",
    ],
    limitations: [
      "Higher installed cost — more components than fixed bracket",
      "Pivot must be torqued correctly after setting — QA inspection required",
      "Not a proprietary system — engineer must assess each project",
      "Specialist fabrication — may require long lead time for custom sizes",
      "Thermal break only at base plate — not at rail interface",
    ],
    procurementSources: [
      { name: "Custom fabrication — local steelwork", url: "https://www.capral.com.au/" },
      { name: "Hilti (bracket anchors)", url: "https://www.hilti.com.au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Helping-hand", label: "Helping-hand" },
  { id: "Bracket", label: "Bracket" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Stainless-316", label: "Stainless-316" },
  { id: "Adjustable", label: "Adjustable" },
  { id: "Thermal-break", label: "Thermal Break" },
  { id: "Engineer-required", label: "Engineer Required" },
  { id: "Coastal", label: "Coastal" },
  { id: "Concrete", label: "Concrete Substrate" },
  { id: "Masonry", label: "Masonry Substrate" },
  { id: "Steel-frame", label: "Steel Frame" },
  { id: "Fixed", label: "Fixed Offset" },
  { id: "Swing-bracket", label: "Swing / Pivot" },
];

const SYSTEM_COMPARISON: {
  product: string;
  material: string;
  adjustment: string;
  thermalBreak: string;
  coastal: string;
  substrate: string;
  primaryUse: string;
}[] = [
  {
    product: "Hilti MFT Adjustable",
    material: "316L Stainless",
    adjustment: "3-axis ±30 mm",
    thermalBreak: "Yes (pad)",
    coastal: "Yes",
    substrate: "Concrete / Masonry",
    primaryUse: "Remediation — irregular substrate",
  },
  {
    product: "Capral Standard Helping-Hand",
    material: "6063-T6 Alum",
    adjustment: "Fixed offset",
    thermalBreak: "Pad (separate)",
    coastal: "Yes (anodised)",
    substrate: "Concrete / Masonry / Steel",
    primaryUse: "Standard FC / panel subframe",
  },
  {
    product: "Nvelope NV4",
    material: "316 Stainless",
    adjustment: "±25 mm",
    thermalBreak: "Yes (integrated)",
    coastal: "Yes",
    substrate: "Concrete",
    primaryUse: "Heavy panels — thermal compliant",
  },
  {
    product: "Swing Bracket SS316",
    material: "316 Stainless",
    adjustment: "Field-set pivot",
    thermalBreak: "Pad (base plate)",
    coastal: "Yes",
    substrate: "Concrete / Masonry",
    primaryUse: "Irregular offset — remediation",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Helping-hand brackets for all aluminium top-hat subframe systems",
    "Facade remediation — overcladding existing substrate with new cavity",
    "Terracotta and heavy ceramic panel bracket — high-load applications",
    "Thermal bridging control — NCC 2022 Section J compliance",
    "Coastal and marine-zone cladding where aluminium is not adequate",
    "Irregular or out-of-plumb substrates requiring adjustable offset",
  ],
  selectionCriteria: [
    "Fixed aluminium: standard applications, substrate plumb confirmed by survey",
    "Adjustable stainless: remediation on irregular substrate, no shimming preferred",
    "Thermal-break bracket: NCC 2022 Section J compliance mandatory",
    "Swing bracket: unknown offset — set in field after substrate survey",
    "Stainless 316: coastal zones within 1 km of marine water",
    "Engineer must confirm bracket capacity and spacing per wind zone",
  ],
  limitations: [
    "All brackets require structural engineer certification for wind load",
    "Aluminium brackets must use stainless fasteners — galvanic corrosion risk",
    "Fixed offsets require precise substrate survey before bracket selection",
    "Thermal break pads must be installed — omission creates thermal bridge",
    "Bracket spacing to be confirmed per panel weight and wind load",
    "Chemical anchors into concrete require minimum embedment — engineer to confirm",
  ],
  standardsNotes: [
    "AS/NZS 1170.2: wind actions — basis for bracket and anchor design",
    "AS 1170.1: dead loads — bracket must carry cladding panel self-weight",
    "NCC 2022 Section J: thermal bridging — thermal break required for compliance",
    "AS 3600: concrete structures — anchor embedment and spacing rules",
    "AS 4100: steel structures — for stainless bracket design",
    "AS/NZS 4600: cold-formed steel structures — if thin stainless bracket",
  ],
  suitableDefects: [
    "ACP remediation — new subframe required for non-combustible cladding",
    "Failed timber batten subframe — replace with aluminium rail on helping-hand",
    "Direct-fixed cladding creating water ingress — install drained cavity with brackets",
    "Out-of-plumb substrate requiring adjustable bracket to achieve level cladding",
    "Thermal bridging through existing subframe — replace with thermal-break brackets",
    "Coastal zone aluminium corrosion — replace with stainless 316 brackets",
  ],
  typicalSubstrates: [
    "Concrete columns and beams — chemical or mechanical anchor",
    "Masonry blockwork — mechanical anchor into mortar joint or block",
    "Steel primary structure — direct bolt or welded plate connection",
    "Steel stud framing — bolted bracket to stud at engineered spacing",
    "Existing FC cladding overcladding — penetrate and anchor to structure behind",
    "Precast concrete panels — anchor to panel face or edge as designed",
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

export function HelpingHandIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are helping-hand bracket and fixing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Helping-hand brackets are the connection between the primary building structure and the aluminium subframe rail — transferring all cladding dead loads and wind forces back to columns, beams, masonry, or steel framing. Selection of the correct bracket type, material, offset, and anchor is as critical as the cladding panel specification itself.
        </p>
        {expanded && (
          <>
            <p>
              On remediation projects, brackets must be anchored to the primary structure — not to the existing facade skin. Anchoring into ageing concrete requires a detailed pull-out test program and PROFIS or equivalent anchor design software to confirm embedment depth and spacing. Chemical anchors are typically preferred over mechanical expansion anchors in post-installed applications due to more predictable load distribution.
            </p>
            <p>
              Thermal bridging at the bracket interface is a significant issue under NCC 2022 Section J. Each aluminium bracket that contacts the primary concrete or masonry structure creates a thermal bridge that degrades the effective wall R-value. Neoprene or EPDM thermal break pads under the bracket base plate are mandatory on thermally-compliant facades. Purpose-built thermal-break brackets (Nvelope, Halfen) provide a more engineered and certifiable solution.
            </p>
            <p>
              In coastal zones within 1 km of marine water, aluminium brackets will pit and corrode without anodising — and even anodised aluminium may be marginal in severe marine environments. Stainless 316L brackets are mandatory for marine-zone applications and are recommended for all coastal high-rise facades where long-term maintenance access is limited.
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

export function HelpingHandProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — helping-hand bracket and fixing systems — scroll to view all</p>
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
              Side-by-side comparison of helping-hand bracket systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Adjustment</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thermal break</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.adjustment}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thermalBreak}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrate}</td>
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
