"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Rivet"
  | "Concealed-fix"
  | "Stainless-316"
  | "Aluminium-rivet"
  | "Secret-fix"
  | "Clip-fix"
  | "Coastal"
  | "Non-combustible"
  | "Panel-system"
  | "Terracotta"
  | "FC-panel"
  | "Aluminium-cassette"
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
    fullLabel: "Avdel / Bollhoff",
    brandUrl: "https://www.avdelglobal.com/en-au/",
    tdsUrl: "https://www.avdelglobal.com/en-au/products/",
    accentColor: "#b45309",
    name: "Avdel SS316 Breakstem Rivet — Large-Flange — Aluminium and FC Cladding",
    descriptionLine: "316 stainless large-flange breakstem blind rivet — aluminium cassette and FC panel to subframe — HCR coastal rated — visible fixing",
    productType: "Structural Blind Rivet — SS316 — large-flange breakstem",
    filterTags: ["Rivet", "Stainless-316", "Coastal", "FC-panel", "Aluminium-cassette"],
    techChips: [
      { label: "316 Stainless Body + Mandrel", cls: "bg-amber-100 text-amber-800" },
      { label: "Large Flange — 14 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Breakstem Blind Rivet", cls: "bg-sky-100 text-sky-800" },
      { label: "HCR Corrosion Class", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription:
      "Avdel 316 stainless large-flange breakstem blind rivets are used for cladding panel-to-subframe connections where the fixing is visible on the panel face but must be highly corrosion resistant. The large 14 mm flange distributes load over a wider area on thin FC or aluminium cladding panels, reducing stress concentrations at the fixing hole that can initiate cracking under cyclic thermal and wind loading. The 316 stainless body and mandrel provide HCR corrosion resistance for coastal applications. Suitable for aluminium cassette to subframe fixing and FC sheet to top-hat rail where screw-fix is not practical. Pre-drilled hole required in both panel and subframe before installation.",
    technicalProperties: [
      "Material: 316 stainless steel body and mandrel — HCR rated per AS 3566",
      "Flange diameter: 14 mm large-flange series — distributes load on thin panels",
      "Rivet diameters: 4.8 mm, 6.4 mm — confirm against substrate thickness",
      "Grip range: 1–15 mm (size dependent) — confirm against panel and rail stack",
      "Shear load: 2.2–6.5 kN; Tensile load: 1.8–5.0 kN — size dependent",
      "Installation: pneumatic or manual rivet tool — mandrel breaks cleanly at calibrated load",
    ],
    limitations: [
      "Visible fixing on panel face — not concealed; confirm aesthetic requirement before specifying",
      "Rivet mandrel must break cleanly — check tool calibration before commencing installation",
      "Pre-drilled hole required in both panel and subframe — hole size matched to rivet diameter",
      "Not suitable for structural bracket-to-structure connections — for panel-to-rail only",
      "Drill swarf must be cleaned from panel face immediately after installation to prevent rust staining",
    ],
    procurementSources: [
      { name: "Avdel Global Australia", url: "https://www.avdelglobal.com/en-au/" },
      { name: "Bollhoff Australia", url: "https://www.bollhoff.com/en/australia/" },
    ],
  },
  {
    fullLabel: "Moeding / Shildan",
    brandUrl: "https://www.moeding.de/en/",
    tdsUrl: "https://www.moeding.de/en/products/alphaton/",
    accentColor: "#0369a1",
    name: "Moeding Slip-fit Terracotta Clip — Concealed Aluminium",
    descriptionLine: "Concealed anodised aluminium clip for terracotta slip-fit lath — no visible fixing on panel face — individual panel replacement",
    productType: "Concealed Slip-fit Clip — Terracotta system",
    filterTags: ["Concealed-fix", "Secret-fix", "Clip-fix", "Coastal", "Non-combustible", "Terracotta", "Engineer-required"],
    techChips: [
      { label: "Concealed Clip Fix", cls: "bg-sky-100 text-sky-800" },
      { label: "No Visible Fixings", cls: "bg-green-100 text-green-700" },
      { label: "Anodised Aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Individual Panel Replacement", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Moeding terracotta slip-fit clips are anodised aluminium retention clips that engage the kerf (slot) in the back of extruded terracotta laths without any fixing penetrating the panel face. The clips are screwed to the horizontal aluminium rail, and the terracotta lath slides over the clip from the side — fully concealed when installed. Individual panels can be replaced without disturbing adjacent cladding, which is critical on high-rise facades where scaffold costs dominate remediation budgets. This is the standard installation method for Moeding Alphaton and Shildan Argeton terracotta systems and is mandatory for the system fire test certification to remain valid.",
    technicalProperties: [
      "Material: 6063-T6 aluminium — anodised finish — coastal zone rated",
      "Clip engagement: 8 mm kerf depth in extruded terracotta back — proprietary profile",
      "Panel retention: gravity plus friction in kerf — no adhesive or visible fastener",
      "Individual panel replacement: slide panel out laterally and replace without disturbing neighbours",
      "Rail fixing: 2× self-drilling stainless screws to horizontal aluminium top-hat",
      "Clip spacing: 300–600 mm centres depending on lath length and wind load",
    ],
    limitations: [
      "Proprietary to Moeding and Shildan Argeton terracotta systems — no generic substitution",
      "Clip profile must be factory-matched to specific lath kerf geometry — cannot be modified on site",
      "Installation by Moeding/Shildan trained installer required for system warranty to remain valid",
      "Do not apply adhesive to kerf — compromises individual panel replaceability and system performance",
      "Anodising must not be damaged during installation — scratched anodising will corrode in coastal zones",
    ],
    procurementSources: [
      { name: "Moeding Australia — terracotta systems", url: "https://www.moeding.de/en/" },
      { name: "Shildan Australia — Argeton distributor", url: "https://www.shildan.com.au/" },
    ],
  },
  {
    fullLabel: "Fairview Architectural",
    brandUrl: "https://www.fairviewarchitectural.com.au/",
    tdsUrl: "https://www.fairviewarchitectural.com.au/product-category/solid-aluminium/",
    accentColor: "#7c3aed",
    name: "Fairview Secret-Fix Cassette Clip — Solid Aluminium Replacement",
    descriptionLine: "316 stainless secret-fix cassette clip — solid aluminium panel to Z-section rail — no exposed fasteners — ACP replacement system",
    productType: "Secret-Fix Cassette Clip — solid aluminium ACP replacement",
    filterTags: ["Concealed-fix", "Secret-fix", "Clip-fix", "Coastal", "Non-combustible", "Aluminium-cassette"],
    techChips: [
      { label: "Secret-Fix — No Exposed Fasteners", cls: "bg-purple-100 text-purple-800" },
      { label: "316 Stainless Clip", cls: "bg-slate-100 text-slate-700" },
      { label: "Aluminium Cassette System", cls: "bg-sky-100 text-sky-800" },
      { label: "Full System — Fairview Supply", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Fairview secret-fix cassette clips are 316 stainless clip units that engage the bent-return flange of solid aluminium cassette panels. The clips are fixed to the aluminium Z-section or top-hat rail, and the panel cassette locks onto the clip as it is slid into position — no fasteners penetrate or are visible on the panel face. This system is used as a direct replacement for the Fairview ACP cassette system, providing an aesthetically identical facade with non-combustible solid aluminium panels in compliance with NCC 2022. System must be supplied complete from Fairview — clips are matched to specific panel geometry and cannot be substituted.",
    technicalProperties: [
      "Material: 316 stainless steel clips — coastal and marine zone rated",
      "Panel engagement: 15 mm return flange on cassette panel — positive mechanical lock",
      "Wind load retention: up to 3.0 kN/m² — engineer to confirm per project wind zone",
      "Rail compatibility: Fairview Z-section rail system — proprietary profile",
      "Clip spacing: 450–600 mm centres standard — engineer to confirm for project",
      "System certification: Fairview ETA assessment — accepted by certifiers",
    ],
    limitations: [
      "Proprietary system — clips and panels must be ordered together from Fairview — no substitution",
      "Z-section rail must be the Fairview-specified profile — other rail profiles not compatible",
      "Panel removal requires Fairview specialist tool — not accessible to general installer",
      "System must be engineered per project for wind load — do not assume standard spacing",
      "Lead time: 6–12 weeks for custom panel sizes — include in construction programme",
    ],
    procurementSources: [
      { name: "Fairview Architectural — national", url: "https://www.fairviewarchitectural.com.au/" },
      { name: "Fairview Solid Aluminium Range", url: "https://www.fairviewarchitectural.com.au/product-category/solid-aluminium/" },
    ],
  },
  {
    fullLabel: "Equitone / Cemintel (CSR)",
    brandUrl: "https://www.equitone.com/en-au/",
    tdsUrl: "https://www.cemintel.com.au/products/territory/",
    accentColor: "#b45309",
    name: "Concealed FC Panel Clip SS316 — Groove-Engaged",
    descriptionLine: "316 stainless concealed clip for factory-grooved FC architectural panel — no exposed screws on panel face — Equitone / Cemintel Territory compatible",
    productType: "Concealed Fix Clip — FC architectural panel — groove-engaged",
    filterTags: ["Concealed-fix", "Secret-fix", "Clip-fix", "Stainless-316", "Coastal", "Non-combustible", "FC-panel"],
    techChips: [
      { label: "316 Stainless Concealed Clip", cls: "bg-amber-100 text-amber-800" },
      { label: "No Exposed Screws on Face", cls: "bg-slate-100 text-slate-700" },
      { label: "Factory-Grooved FC Panel", cls: "bg-sky-100 text-sky-800" },
      { label: "NCC-2022 Compliant System", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Concealed fix clips for FC architectural panels (Equitone, Cemintel Territory) engage a factory-routed groove in the panel back face, allowing the panel to lock onto the clip without any visible fastener on the panel face. The 316 stainless clips are screwed to the aluminium rail before panel installation — the panel slides down and clips into position from the top. This system requires factory-grooved panels ordered to specific dimensions — on-site cutting destroys the groove. Suitable for facades where a clean, screw-free face is required, and widely used in residential and commercial FC panel cladding remediation.",
    technicalProperties: [
      "Material: 316 stainless steel clip body — coastal rated",
      "Panel groove: factory-routed — 6 mm depth, 3 mm wide — proprietary to panel brand",
      "Clip engagement force: 800–1,200 N pull-out — confirm against project wind suction load",
      "Rail fixing: 2× 316 self-drilling screws to aluminium top-hat — standard installation",
      "Clip spacing: 400–600 mm centres — confirm against panel size and wind load",
      "Compatible panels: Equitone (Tectiva, Natura), Cemintel Territory — grooved FC panels only",
    ],
    limitations: [
      "Panels must be factory-grooved to correct depth — on-site routing is not acceptable",
      "Panel dimensions are fixed at ordering stage — measure and order carefully before committing",
      "Clip geometry varies between FC panel manufacturers — system is panel-specific",
      "Not suitable for panels with pre-finished faces that cannot be routed from the back face",
      "Minimum panel thickness 8 mm for groove routing without risk of back-face breakout",
    ],
    procurementSources: [
      { name: "Equitone Australia — national", url: "https://www.equitone.com/en-au/" },
      { name: "Cemintel (CSR Building Products)", url: "https://www.cemintel.com.au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Rivet", label: "Rivet" },
  { id: "Concealed-fix", label: "Concealed Fix" },
  { id: "Stainless-316", label: "Stainless-316" },
  { id: "Aluminium-rivet", label: "Aluminium Rivet" },
  { id: "Secret-fix", label: "Secret Fix" },
  { id: "Clip-fix", label: "Clip Fix" },
  { id: "Coastal", label: "Coastal Rated" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "Panel-system", label: "Panel System" },
  { id: "Terracotta", label: "Terracotta" },
  { id: "FC-panel", label: "FC Panel" },
  { id: "Aluminium-cassette", label: "Aluminium Cassette" },
  { id: "Engineer-required", label: "Engineer Required" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  fixingType: string;
  material: string;
  visibleFix: string;
  coastal: string;
  panelType: string;
  primaryUse: string;
}[] = [
  {
    product: "Avdel SS316 Breakstem Rivet",
    brand: "Avdel / Bollhoff",
    fixingType: "Blind rivet — breakstem",
    material: "316 Stainless body + mandrel",
    visibleFix: "Yes — visible on face",
    coastal: "Yes — HCR rated",
    panelType: "Aluminium cassette / FC sheet",
    primaryUse: "Panel to rail — visible face acceptable",
  },
  {
    product: "Moeding Slip-fit Terracotta Clip",
    brand: "Moeding / Shildan",
    fixingType: "Concealed slip-fit clip",
    material: "Anodised 6063-T6 aluminium",
    visibleFix: "No — fully concealed",
    coastal: "Yes — anodised",
    panelType: "Terracotta lath — extruded kerf",
    primaryUse: "Terracotta concealed system — individual replaceability",
  },
  {
    product: "Fairview Secret-Fix Cassette Clip",
    brand: "Fairview Architectural",
    fixingType: "Secret-fix cassette clip",
    material: "316 Stainless Steel",
    visibleFix: "No — fully concealed",
    coastal: "Yes",
    panelType: "Solid aluminium cassette",
    primaryUse: "ACP replacement — non-combustible cassette",
  },
  {
    product: "Concealed FC Panel Clip SS316",
    brand: "Equitone / Cemintel",
    fixingType: "Groove-engaged concealed clip",
    material: "316 Stainless Steel",
    visibleFix: "No — fully concealed",
    coastal: "Yes",
    panelType: "Factory-grooved FC architectural panel",
    primaryUse: "Equitone / Cemintel Territory — clean panel face",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Terracotta slip-fit systems — proprietary concealed clip to horizontal aluminium rail",
    "Solid aluminium cassette cladding — secret-fix cassette clip for ACP replacement",
    "FC architectural panel — concealed groove clip for screw-free panel face",
    "Aluminium composite panel replacement with non-combustible secret-fix system",
    "High-end residential and commercial facades where screw heads are unacceptable",
    "Coastal facades requiring 316 stainless with no visible fixing corrosion",
  ],
  selectionCriteria: [
    "Visible rivet: structural cladding to rail where aesthetics allow visible fix — lower cost",
    "Terracotta slip-fit clip: must use manufacturer-specific system — no generic substitution",
    "Secret-fix cassette: proprietary to panel brand — order complete system including rail",
    "Concealed FC groove clip: factory-grooved panel required — specify at ordering stage before cutting",
    "All coastal zones: 316 stainless or anodised aluminium clips only — no 304 or zinc",
    "Engineer must confirm clip wind load retention per project wind zone before installation",
  ],
  limitations: [
    "Concealed fix systems are predominantly proprietary — cannot mix clips from different brands",
    "Factory-grooved FC panels must be ordered to correct dimensions — no on-site modification",
    "All concealed clip systems require system-specific rail profiles — confirm compatibility before ordering",
    "Installer training may be mandatory for system warranty — confirm with manufacturer",
    "Concealed clips are generally more expensive than standard screw-fix per m²",
    "Engineer must confirm wind load retention for each project — do not assume standard load",
  ],
  standardsNotes: [
    "AS 3566: self-drilling screws — corrosion resistance (HCR minimum for coastal concealed fixings)",
    "AS/NZS 1170.2: wind actions — basis for clip retention design load",
    "AS 4284: testing of building facades — panel retention under dynamic suction load",
    "NCC 2022 Volume One Section C: fixings must maintain required fire-resistance period",
    "Manufacturer ETA / CodeMark certification — confirm available for the specific system",
    "AS 3566 Class 4 / HCR: minimum for all concealed fixings in coastal and marine zones",
  ],
  suitableDefects: [
    "ACP cladding replacement — non-combustible cassette with secret-fix system for NCC 2022",
    "FC cladding remediation requiring clean screw-free panel face for architectural reasons",
    "Terracotta cladding — slip-fit system replacing damaged individual panels on high-rise",
    "Solid aluminium cassette installation over new engineered subframe system",
    "Coastal facade where visible fixing corrosion is a long-term maintenance concern",
    "Heritage or premium facades where screw heads on the face are architecturally unacceptable",
  ],
  typicalSubstrates: [
    "Aluminium top-hat rail: concealed clips screwed to rail flange — SS316 self-drilling screws",
    "Aluminium Z-section rail: cassette secret-fix clips to Z-rail flange — Fairview system",
    "Terracotta aluminium rail: slip-fit clips to horizontal extrusion — Moeding/Shildan system",
    "Steel subframe: 316 stainless rivet through panel and rail where visible fixing is acceptable",
    "All substrates: engineer must confirm clip pull-out and shear capacity per project",
    "Coastal zone: anodised aluminium or SS316 for all clip, rail, and fastener components",
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

export function RivetConcealedIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are rivet and concealed fix systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Rivets and concealed fixing clips provide the cladding panel-to-rail connection in systems where either high corrosion resistance is required (stainless 316 blind rivets) or where no fixing should be visible on the panel face (slip-fit clips, cassette secret-fix clips, groove clips). Selection depends on the panel type, aesthetic requirement, and coastal zone classification.
        </p>
        {expanded && (
          <>
            <p>
              Concealed fix systems represent the premium tier of cladding installation — they require factory-prepared panels with grooves or returns, proprietary clips matched to the panel brand, and often manufacturer-trained installers. The result is a facade with no exposed fastener heads — a smooth, uninterrupted panel face. This is mandatory for terracotta slip-fit systems and common in FC architectural panel systems (Equitone, Cemintel) where exposed screws would detract from the finish.
            </p>
            <p>
              Stainless 316 blind rivets remain a practical option where a visible fixing is acceptable — their large flange spreads load on thin panels, and the 316 grade provides HCR corrosion resistance. They are commonly used for aluminium cassette-to-rail connections, soffit cladding, and applications where access for screw driving is restricted.
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

export function RivetConcealedProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — rivet and concealed fix — scroll to view all</p>
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
              Side-by-side comparison of rivet and concealed fix systems. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Visible fix</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Panel type</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.visibleFix}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600">{row.panelType}</td>
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
