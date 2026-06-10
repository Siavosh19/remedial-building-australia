"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Expressed-joint"
  | "Vertical-joint"
  | "SS-316"
  | "Aluminium"
  | "Z-flashing"
  | "H-section"
  | "Coastal"
  | "Non-combustible"
  | "Factory-folded"
  | "Movement-joint"
  | "Sealant-joint"
  | "Open-joint";

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
    fullLabel: "Capral / Ullrich Aluminium",
    brandUrl: "https://www.capral.com.au/",
    accentColor: "#b45309",
    name: "Aluminium H-Section Expressed Joint Flashing",
    descriptionLine: "Extruded aluminium H-section — expressed vertical joint between cladding panels — anodised or powder-coat finish — coastal zone rated",
    productType: "H-Section Expressed Joint Flashing — Aluminium",
    filterTags: ["Expressed-joint", "Vertical-joint", "Aluminium", "H-section", "Coastal", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "Extruded Aluminium H-Section", cls: "bg-amber-100 text-amber-800" },
      { label: "Visible Expressed Joint", cls: "bg-slate-100 text-slate-700" },
      { label: "Anodised or Powder-Coat", cls: "bg-stone-100 text-stone-700" },
      { label: "Coastal Zone Rated", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Extruded aluminium H-section expressed joint flashings create a distinct architectural shadow line at panel-to-panel joints in FC sheet and FC architectural panel cladding systems. The H-section grips both panel edges and forms the visible expressed joint — typically 10–20 mm wide — that is a deliberate design feature in contemporary facade architecture. Available in anodised silver or custom powder-coat colour. The H-section includes a small back channel that provides a path for any water penetrating the joint to drain — not a fully sealed joint. A backer rod and sealant is applied in the back channel in moisture-critical applications.",
    technicalProperties: [
      "Material: 6063-T5 aluminium extrusion",
      "Profile: H-section — web depth 10–20 mm",
      "Flange width: 15–25 mm each side (grips panel edge)",
      "Finish: anodised Class 2 or powder-coat",
      "Standard lengths: 3,000 mm and 6,000 mm",
      "Fixing: screw through web into substrate; sealant: optional backer rod + neutral cure silicone in back channel",
    ],
    limitations: [
      "H-section is a design element — not a watertight seal; water can enter at joint",
      "Panel edges must be cut accurately — uneven edges visible in H-section",
      "Anodising scratches during site handling — protect until installed",
      "Not suitable for marine zone without SS316 fixings and anodised alum",
      "Movement joints cannot use H-section — use sealant or open joint at movement locations",
    ],
    procurementSources: [
      { name: "Capral Aluminium — national", url: "https://www.capral.com.au/" },
      { name: "Ullrich Aluminium — national", url: "https://www.ullrich.com.au/" },
    ],
  },
  {
    fullLabel: "Capral / Ullrich Aluminium",
    brandUrl: "https://www.capral.com.au/",
    accentColor: "#0369a1",
    name: "Aluminium Z-Flashing Vertical Joint — Rain Deflecting",
    descriptionLine: "Aluminium Z-flashing at vertical panel joint — deflects rain — concealed behind panel — coastal rated",
    productType: "Z-Flashing Vertical Joint — Concealed Aluminium",
    filterTags: ["Expressed-joint", "Vertical-joint", "Aluminium", "Z-flashing", "Coastal", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "Z-Profile — Concealed", cls: "bg-sky-100 text-sky-800" },
      { label: "Rain Deflecting at Joint", cls: "bg-green-100 text-green-700" },
      { label: "Anodised Aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal Rated", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription:
      "Z-section aluminium flashings at vertical panel joints are installed behind the cladding panel edge, spanning the gap between adjacent panels and deflecting wind-driven rain back to the outer face. The Z-flashing is not visible from the exterior — it is a concealed backup to prevent water passing through the open joint between panels. The front leg of the Z-flashing faces out and laps over the inner edge of the panel behind it; the back leg is fixed to the subframe. Used in open-joint and large-gap panel systems where a sealant joint at the vertical edge is not practical or desired.",
    technicalProperties: [
      "Material: 6063-T5 aluminium — anodised",
      "Profile: Z-section — 50 × 20 × 50 mm standard",
      "Front leg: 50 mm minimum overlap past panel edge",
      "Back leg: fixed to aluminium top-hat or Z-rail",
      "Gauge: 1.6 mm; anodising: Class 2 — 20 micron",
      "Fixing: SS316 self-drilling screws to rail; concealed — not visible from exterior",
    ],
    limitations: [
      "Not visible — relies on accurate installation to function",
      "Front leg overlap must be maintained — if panel is cut short, Z-flashing is exposed",
      "Does not prevent all water penetration in extreme wind-driven rain events",
      "Not suitable for applications requiring completely sealed vertical joint",
      "Length must be continuous — gaps between Z-flashings allow water through",
    ],
    procurementSources: [
      { name: "Capral Aluminium — national", url: "https://www.capral.com.au/" },
      { name: "Ullrich Aluminium — national", url: "https://www.ullrich.com.au/" },
    ],
  },
  {
    fullLabel: "Metroll / Sika Australia",
    brandUrl: "https://www.metroll.com.au/",
    accentColor: "#7c3aed",
    name: "SS316 Expressed Joint Flashing — Movement Joint",
    descriptionLine: "316 stainless expressed joint flashing — accommodates structural movement — engineer-defined — marine and coastal zone",
    productType: "Movement Joint Flashing — SS316",
    filterTags: ["Expressed-joint", "Vertical-joint", "SS-316", "Movement-joint", "Coastal", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "316 Stainless — Marine Zone", cls: "bg-purple-100 text-purple-800" },
      { label: "Movement Joint Accommodation", cls: "bg-green-100 text-green-700" },
      { label: "Structural Engineer Required", cls: "bg-slate-100 text-slate-700" },
      { label: "Factory Folded", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Stainless 316 expressed joint flashings at structural movement joints must accommodate both expected movement and maintain weatherproofing throughout. Movement joints in concrete-framed buildings typically occur at expansion joints, construction joints, and at the junction between different structural elements (e.g., tower-to-podium). The flashing profile must provide a minimum 25 mm free movement each side of the joint centreline, with a flexible backing — typically a closed-cell polyethylene foam backer — to prevent the flashing profile from collapsing into the joint. Structural engineer must define the expected movement before the flashing is designed.",
    technicalProperties: [
      "Material: 316L stainless — 1.5 mm",
      "Movement accommodation: ±25 mm minimum each side",
      "Backer: closed-cell PE foam — 50 mm diameter",
      "Sealant: polyurethane or silicone — movement-grade (minimum Class 25LM)",
      "Factory folded — custom profile per movement joint type",
      "Fixing: floating bracket each side of joint — not fixed across joint; weep at base",
    ],
    limitations: [
      "Structural engineer must define movement magnitude before flashing is designed",
      "Flashing must not bridge movement joint rigidly — floating bracket required",
      "Sealant at movement joints must be movement-grade — minimum Class 25LM",
      "Backer rod size must match joint width — over-compression fails sealant",
      "Factory lead time: 4–6 weeks — custom profile",
    ],
    procurementSources: [
      { name: "Metroll — stainless custom fabrication", url: "https://www.metroll.com.au/" },
      { name: "Sika Australia — movement sealant", url: "https://www.sika.com.au/" },
    ],
  },
  {
    fullLabel: "Capral Aluminium / Moeding Terracotta",
    brandUrl: "https://www.capral.com.au/",
    accentColor: "#b45309",
    name: "Open-Joint Vertical Z-Flashing — Back-Ventilated System",
    descriptionLine: "Concealed Z-flashing for open-joint rainscreen — no sealant in vertical joint — terracotta, FC panel, sintered stone systems",
    productType: "Open-Joint Concealed Z-Flashing — Aluminium",
    filterTags: ["Expressed-joint", "Vertical-joint", "Aluminium", "Z-flashing", "Open-joint", "Coastal", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "Open-Joint — No Sealant", cls: "bg-amber-100 text-amber-800" },
      { label: "Back-Ventilated Rainscreen", cls: "bg-green-100 text-green-700" },
      { label: "Concealed Z-Flashing", cls: "bg-slate-100 text-slate-700" },
      { label: "Terracotta / FC Panel System", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Open-joint rainscreen systems (terracotta, large-format FC panels, sintered stone) rely on a concealed Z-flashing behind all vertical and horizontal panel joints — no sealant is used at the panel edges. The Z-flashing intercepts wind-driven rain that enters the open joint and directs it back to the face through the cavity below. The open joint allows the cavity to be fully ventilated — a key advantage over sealed systems. The Z-flashing must be continuous and without gaps; it is typically a lightweight anodised aluminium extrusion fixed to the horizontal rail or a dedicated vertical rail behind the panel joints.",
    technicalProperties: [
      "Material: 6063-T5 anodised aluminium",
      "Profile: Z-section or asymmetric T-section",
      "Front leg: 50–75 mm — extends behind adjacent panel",
      "Fixing: to horizontal rail or dedicated vertical rail",
      "Gauge: 1.2–1.6 mm; joint width: 8–20 mm open joint (design dependent)",
      "No sealant in vertical joint — open joint system; continuous: no gaps — full panel height",
    ],
    limitations: [
      "Open-joint system relies entirely on Z-flashing continuity — any gap fails the system",
      "Wind pressure drives water further into joint in extreme events — cavity depth critical",
      "Not suitable where airtightness is required across the cladding plane",
      "Cavity depth must be minimum 25 mm to allow wind-driven water to drain",
      "Must be coordinated with insulation to prevent wetting of mineral wool",
    ],
    procurementSources: [
      { name: "Capral Aluminium — national", url: "https://www.capral.com.au/" },
      { name: "Moeding Terracotta — system-specific supply", url: "https://www.moeding.de/en/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Expressed-joint", label: "Expressed joint" },
  { id: "Vertical-joint", label: "Vertical joint" },
  { id: "SS-316", label: "SS-316" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Z-flashing", label: "Z-flashing" },
  { id: "H-section", label: "H-section" },
  { id: "Coastal", label: "Coastal" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "Factory-folded", label: "Factory folded" },
  { id: "Movement-joint", label: "Movement joint" },
  { id: "Sealant-joint", label: "Sealant joint" },
  { id: "Open-joint", label: "Open joint" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  profile: string;
  visible: string;
  movement: string;
  coastal: string;
  sealant: string;
  primaryUse: string;
}[] = [
  {
    product: "Alum H-Section Expressed Joint",
    brand: "Capral / Ullrich",
    profile: "H-section extrusion",
    visible: "Yes — design feature",
    movement: "None",
    coastal: "Yes",
    sealant: "Optional in back channel",
    primaryUse: "Expressed architectural shadow line at panel joints",
  },
  {
    product: "Z-Flashing Vertical Joint",
    brand: "Capral / Ullrich",
    profile: "Z-section",
    visible: "No — concealed",
    movement: "None",
    coastal: "Yes",
    sealant: "Optional",
    primaryUse: "Concealed backup — sealed or open joint systems",
  },
  {
    product: "SS316 Movement Joint Flashing",
    brand: "Metroll / Sika",
    profile: "Custom factory profile",
    visible: "Yes",
    movement: "±25 mm minimum",
    coastal: "Yes",
    sealant: "Yes — movement grade",
    primaryUse: "Structural expansion joint — engineer defined",
  },
  {
    product: "Open-Joint Z-Flashing",
    brand: "Capral / Moeding",
    profile: "Z-section or T-section",
    visible: "No — concealed",
    movement: "None",
    coastal: "Yes",
    sealant: "No — open joint",
    primaryUse: "Open-joint terracotta / ceramic / sintered stone",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Expressed architectural joint between FC panels — H-section profile",
    "Concealed backup flashing at vertical joint — Z-flashing behind panels",
    "Open-joint rainscreen systems — Z-flashing as primary water management",
    "Structural movement joints in concrete-framed buildings",
    "Terracotta and sintered stone open-joint systems",
    "Marine-zone movement joints: SS316 — 50+ year performance",
  ],
  selectionCriteria: [
    "H-section expressed joint: architectural shadow line — design feature visible",
    "Z-flashing concealed: backup waterproofing behind open or sealed panel joints",
    "Movement joint SS316: structural expansion joint — engineer defined movement",
    "Open-joint Z-flashing: no sealant — terracotta, sintered stone, large-format FC",
    "Marine zone: SS316 for all expressed joint and movement joint flashings",
    "Coastal zone: anodised aluminium minimum — Class 2 / 20 micron",
  ],
  limitations: [
    "H-section is not watertight — backed by Z-flashing in moisture-critical applications",
    "Z-flashing must be continuous — gaps are water ingress pathways",
    "Movement joint flashings must not be rigidly fixed across the joint",
    "Open-joint systems cannot be used where airtightness compliance is required",
    "Sealant at movement joints must be movement-grade — standard silicone will fail",
    "Engineer must define movement magnitude for structural movement joints",
  ],
  standardsNotes: [
    "AS 4284: testing of building facades — joint weatherproofing",
    "AS/NZS 1170.2: wind actions — basis for joint flashing design",
    "NCC 2022 Part F1: weatherproofing — vertical joint requirements",
    "AS 4654.2: waterproofing — above-ground external joints",
    "Sika Movement Joint Design Guide: sealant selection for movement joints",
    "ASTM C1193: guide for use of joint sealants",
  ],
  suitableDefects: [
    "Water ingress at vertical panel-to-panel joints — Z-flashing missing or failed",
    "Cracked sealant in expressed joints — install Z-flashing backup or replace sealant",
    "Structural movement joint failure — reinstall with correctly designed flashing",
    "Open-joint system water ingress — Z-flashing gaps identified and repaired",
    "ACP remediation — expressed joint flashings at new cladding panel joins",
    "Terracotta system — open-joint flashing inspection and repair",
  ],
  typicalSubstrates: [
    "Aluminium top-hat rail: Z-flashing screwed to rail web",
    "Z-section subframe rail: Z-flashing clipped or screwed to rail",
    "Dedicated vertical rail: Z-flashing fixed to vertical rail at panel joint centres",
    "Concrete structure: H-section or movement joint flashing anchored to structure",
    "Steel stud framing: Z-flashing screwed to stud or nogging at joint",
    "Terracotta aluminium rail: open-joint Z-flashing to terracotta rail system",
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

export function ExpressedJointFlashIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are expressed and vertical joint flashing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Vertical joints between cladding panels are a critical water ingress pathway in all facade systems. Expressed joints use visible metal profiles (H-section) as an architectural feature, while concealed Z-flashings provide a backup water-deflecting layer behind open or expressed panel joints. Structural movement joints require purpose-designed flashings that accommodate defined movement without cracking.
        </p>
        {expanded && (
          <>
            <p>
              In open-joint rainscreen systems — terracotta, sintered stone, large-format FC panels — the entire vertical joint between panels is intentionally open. Water management relies entirely on the concealed Z-flashing behind the joint and the drainage function of the back-ventilated cavity. This is actually a more durable solution than sealed joints because there is no sealant to fail — but it requires the Z-flashing to be absolutely continuous, correctly positioned, and maintained over the building's life.
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

export function ExpressedJointFlashProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — expressed and vertical joint flashings — scroll to view all</p>
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
              Side-by-side comparison of expressed and vertical joint flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Visible</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Movement</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sealant needed</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.visible}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.movement}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600">{row.sealant}</td>
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
