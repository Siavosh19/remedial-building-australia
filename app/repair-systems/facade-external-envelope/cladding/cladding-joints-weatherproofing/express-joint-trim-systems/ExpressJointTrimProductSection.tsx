"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Express-joint"
  | "Trim"
  | "Aluminium"
  | "PVC"
  | "Anodised"
  | "Powder-coat"
  | "H-section"
  | "T-section"
  | "Shadow-line"
  | "Coastal"
  | "Non-combustible"
  | "FC-panel"
  | "FC-sheet"
  | "Movement-joint";

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
    fullLabel: "Capral / Ullrich",
    brandUrl: "https://www.capral.com.au/",
    accentColor: "#b45309",
    name: "Anodised Aluminium H-Section Express Joint Trim",
    descriptionLine: "Anodised aluminium H-section express joint — architectural shadow line between FC panels — coastal zone rated — non-combustible",
    productType: "H-Section Express Joint Trim — anodised aluminium",
    filterTags: ["Express-joint", "Trim", "Aluminium", "Anodised", "H-section", "Shadow-line", "Coastal", "Non-combustible", "FC-panel"],
    techChips: [
      { label: "Anodised Aluminium", cls: "bg-amber-100 text-amber-800" },
      { label: "H-Section Profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Architectural Shadow Line", cls: "bg-sky-100 text-sky-800" },
      { label: "Non-combustible", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Anodised aluminium H-section express joint trims create a positive expressed joint between FC sheet or FC panel cladding panels — producing an architectural shadow line that defines each panel module on the facade. The H-section grips both panel edges (typically 15 mm each side) and creates a visible joint of 10–25 mm depth. A sealant-filled or open version is available — the open back channel allows ventilation of the joint while the H-section excludes direct rain entry. Commonly used in contemporary FC panel facades to replace unsightly sealant-only joints with a durable, architecturally expressed detail. Panel edges must be cut straight and square — the H-section profile exposes any variation in edge quality.",
    technicalProperties: [
      "Material: 6063-T5 aluminium extrusion — Class 2 anodising 20 micron",
      "H-section web depth: 10–25 mm — confirm against required shadow line depth",
      "Flange grip: 15 mm each side — panel edge must be cut consistently",
      "Standard lengths: 3,000 mm and 6,000 mm — join with 20 mm lap minimum",
      "Fixing: screw through web into subframe at 400 mm centres — SS316 screws",
      "Colour: anodised silver standard — custom powder-coat available on order",
    ],
    limitations: [
      "Panel edges must be cut to consistent dimension — H-section reveals poor edge quality",
      "Not a watertight joint — water can enter behind the H-section web — Z-flashing backup required",
      "Anodising scratches during site handling — protect with peel-off film until installation complete",
      "H-section must be continuous — joints at lengths must be lapped 20 mm minimum",
      "Not suitable for movement joints — standard H-section is rigid — use movement trim for large panels",
    ],
    procurementSources: [
      { name: "Capral Aluminium — national", url: "https://www.capral.com.au/" },
      { name: "Ullrich Aluminium — national", url: "https://www.ullrich.com.au/" },
    ],
  },
  {
    fullLabel: "Ullrich / Capral",
    brandUrl: "https://www.ullrich.com.au/",
    accentColor: "#0369a1",
    name: "Powder-Coat T-Section Reveal Trim — Colour Matched",
    descriptionLine: "Custom colour powder-coat T-section reveal trim for FC panel facade — wide flange overlap — any RAL colour",
    productType: "T-Section Reveal Trim — powder-coat aluminium — colour matched",
    filterTags: ["Express-joint", "Trim", "Aluminium", "Powder-coat", "T-section", "Shadow-line", "Coastal", "Non-combustible", "FC-panel"],
    techChips: [
      { label: "Custom Powder-Coat — Any RAL", cls: "bg-sky-100 text-sky-800" },
      { label: "T-Section Profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Colour-Matched Reveal", cls: "bg-amber-100 text-amber-800" },
      { label: "Non-combustible", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Powder-coated aluminium T-section reveal trims are installed at FC panel joints where a colour-matched architectural reveal is required. The T-section stem is fixed to the subframe and the two flanges overlap the adjacent panel faces — producing a reveal joint with a shadow line on both sides of the stem. Used in high-specification residential and commercial facades where the FC panel joints must be defined but the trim must match the building colour palette. Available in any RAL powder-coat colour over chromate pre-treatment per AS 3715. Lead time 4–6 weeks for custom colour — include in procurement programme.",
    technicalProperties: [
      "Material: 6063-T5 aluminium extrusion — powder-coat per AS 3715 Class B",
      "Powder-coat colour: any RAL — chromate pre-treatment required — no bare aluminium",
      "T-section stem width: 20 mm — flange: 25 mm each side",
      "Standard lengths: 3,000 mm and 6,000 mm",
      "Fixing: screw through stem into subframe — flanges are not fixed",
      "Lead time: 4–6 weeks for custom colour — confirm before ordering",
    ],
    limitations: [
      "Powder coat chips if impacted — do not use in high-traffic areas without protection",
      "Must be specified in correct colour before order — colour changes add 4–6 weeks to programme",
      "T-section is highly visible — any misalignment in panel run is amplified by the trim",
      "Not suitable for movement joints — flanges are rigid, no movement accommodation",
      "Powder coat must be applied over chromate pre-treatment — not bare aluminium extrusion",
    ],
    procurementSources: [
      { name: "Ullrich Aluminium — national", url: "https://www.ullrich.com.au/" },
      { name: "Capral Aluminium — national", url: "https://www.capral.com.au/" },
    ],
  },
  {
    fullLabel: "James Hardie / trade suppliers",
    brandUrl: "https://www.jhardie.com.au/",
    tdsUrl: "https://www.jhardie.com.au/products/accessories/",
    accentColor: "#7c3aed",
    name: "PVC H-Section Express Joint Trim — FC Sheet Residential",
    descriptionLine: "UV-stabilised PVC H-section trim for FC sheet expressed joints — residential inland applications — paintable — low cost",
    productType: "PVC H-Section Express Joint Trim — FC sheet residential",
    filterTags: ["Express-joint", "Trim", "PVC", "H-section", "Non-combustible", "FC-sheet"],
    techChips: [
      { label: "UV-Stabilised PVC", cls: "bg-purple-100 text-purple-800" },
      { label: "FC Sheet Compatible", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable On Site", cls: "bg-sky-100 text-sky-800" },
      { label: "Low Cost", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "UV-stabilised PVC H-section express joint trims are a low-cost alternative to aluminium for FC sheet vertical joints in residential cladding applications. PVC trims grip the FC sheet edge on each side of the joint, producing a defined expressed joint between sheet runs. Paintable on site with water-based exterior paint to match adjacent FC sheet. PVC trims are flexible and can accommodate minor substrate irregularity. Not suitable for multi-storey or commercial applications where dimensional stability and UV resistance of aluminium are required. Not suitable for NCC Class 2 buildings where non-combustible materials are mandated for the cladding system.",
    technicalProperties: [
      "Material: UV-stabilised PVC — white standard colour — paintable",
      "Profile: H-section — 10 mm web depth — 12 mm flange grip each side",
      "Standard lengths: 2,400 mm and 3,600 mm — snap fit over FC sheet edge",
      "Temperature range: −10°C to +70°C — thermal creep above 70°C",
      "UV stabiliser: adequate for inland zone — degrades in salt-air coastal environment",
      "Cost: significantly lower than aluminium — wide trade distribution",
    ],
    limitations: [
      "Not suitable for high-rise or multi-storey — specify aluminium in these applications",
      "PVC creeps under sustained thermal load — dimensional change in extreme heat zones",
      "UV stabiliser degrades over 10–15 years — chalking and brittleness in aged product",
      "Not suitable for coastal zone without painting — UV degradation accelerated by salt air",
      "PVC is combustible — do not use in NCC Class 2 buildings where non-combustible is required",
    ],
    procurementSources: [
      { name: "James Hardie — FC accessories", url: "https://www.jhardie.com.au/" },
      { name: "Bunnings / trade suppliers", url: "https://www.bunnings.com.au/" },
    ],
  },
  {
    fullLabel: "Capral / Metroll",
    brandUrl: "https://www.capral.com.au/",
    accentColor: "#b45309",
    name: "Movement Express Joint Trim — Slip Connection — Thermal Movement",
    descriptionLine: "Aluminium H-section express joint trim with slip connection — accommodates in-plane thermal movement of large-format panels",
    productType: "Movement Express Joint Trim — slip connection — thermal movement",
    filterTags: ["Express-joint", "Trim", "Aluminium", "H-section", "Shadow-line", "Coastal", "Non-combustible", "FC-panel", "Movement-joint"],
    techChips: [
      { label: "Slip Connection at Joint", cls: "bg-amber-100 text-amber-800" },
      { label: "Thermal Movement ±5 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Anodised Aluminium", cls: "bg-sky-100 text-sky-800" },
      { label: "Non-combustible", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Movement express joint trims incorporate a slip connection between the H-section trim and the panel edge — one flange is fixed to the panel face while the opposing flange is free to slide in the H-channel. This allows the trim to accommodate in-plane thermal movement of the cladding panel without distorting the visible joint width. Critical in large-format FC panels and aluminium panels where thermal expansion across a 1,200 mm panel width can exceed 3 mm in Australian summer conditions. The movement trim maintains a consistent joint width appearance while the panel expands and contracts seasonally. Sealant-filled with backer rod at the back of the H-channel.",
    technicalProperties: [
      "Material: 6063-T5 anodised aluminium — Class 2 anodising 20 micron",
      "H-section with slip-fit flange on one side — movement accommodation: ±5 mm in-plane",
      "Fixed flange: bonded or screwed to panel face before installation",
      "Slip flange: free in H-channel groove — must not be fixed to substrate",
      "Standard lengths: 3,000 mm — custom slip configuration on order",
      "Sealant detail: backer rod plus movement-grade silicone at back of H-channel",
    ],
    limitations: [
      "More complex installation than fixed H-section — installer training required",
      "Slip flange must be kept free — do not fix both flanges — defeats movement purpose",
      "Movement of ±5 mm only — panels with greater movement require engineer design",
      "Sealant at back of H-channel must be movement-grade silicone — not standard caulk",
      "Lead time: 4–6 weeks for custom slip configuration — include in programme",
    ],
    procurementSources: [
      { name: "Capral Aluminium — custom extrusion", url: "https://www.capral.com.au/" },
      { name: "Metroll — custom aluminium profiles", url: "https://www.metroll.com.au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Express-joint", label: "Express Joint" },
  { id: "Trim", label: "Trim" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "PVC", label: "PVC" },
  { id: "Anodised", label: "Anodised" },
  { id: "Powder-coat", label: "Powder-Coat" },
  { id: "H-section", label: "H-Section" },
  { id: "T-section", label: "T-Section" },
  { id: "Shadow-line", label: "Shadow Line" },
  { id: "Coastal", label: "Coastal Rated" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "FC-panel", label: "FC Panel" },
  { id: "FC-sheet", label: "FC Sheet" },
  { id: "Movement-joint", label: "Movement Joint" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  profile: string;
  coastal: string;
  nonCombustible: string;
  movementAccom: string;
  primaryUse: string;
}[] = [
  {
    product: "H-Section Anodised",
    brand: "Capral / Ullrich",
    material: "6063-T5 anodised aluminium",
    profile: "H-section",
    coastal: "Yes",
    nonCombustible: "Yes",
    movementAccom: "None",
    primaryUse: "Standard FC panel architectural shadow line",
  },
  {
    product: "T-Section Powder-Coat",
    brand: "Ullrich / Capral",
    material: "6063-T5 powder-coat aluminium",
    profile: "T-section",
    coastal: "Yes",
    nonCombustible: "Yes",
    movementAccom: "None",
    primaryUse: "Colour-matched reveal trim — any RAL",
  },
  {
    product: "PVC H-Section",
    brand: "James Hardie / trade",
    material: "UV-stabilised PVC",
    profile: "H-section",
    coastal: "Inland only",
    nonCombustible: "No",
    movementAccom: "None",
    primaryUse: "Residential FC sheet — inland zone only",
  },
  {
    product: "Movement Trim",
    brand: "Capral / Metroll",
    material: "6063-T5 anodised aluminium",
    profile: "H-section + slip",
    coastal: "Yes",
    nonCombustible: "Yes",
    movementAccom: "±5 mm in-plane",
    primaryUse: "Large-panel thermal movement accommodation",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "FC panel facade joints — expressed architectural shadow line replacing sealant-only joint",
    "FC sheet vertical joints in residential weatherboard expressed joint detail",
    "Aluminium panel joints — colour-matched powder-coat reveal trim",
    "Large-panel facades requiring thermal movement accommodation at joint",
    "ACP replacement facades — new expressed joint trims at all panel-to-panel joints",
    "Commercial facades requiring precise, repeatable joint profile across the building",
  ],
  selectionCriteria: [
    "H-section expressed joint: primary choice for FC panel architectural facade — anodised",
    "T-section reveal trim: where a wider flange on each panel face is desired",
    "PVC trim: residential FC sheet only — low cost, paintable — inland zone only",
    "Movement trim: large-format panels where in-plane thermal movement exceeds 2 mm",
    "Anodised aluminium: coastal zone — Class 2 anodising minimum for marine environment",
    "Powder-coat: where colour matching to cladding panel or building colour palette is required",
  ],
  limitations: [
    "PVC trims are combustible — not for NCC Class 2 or higher classification buildings",
    "Express joint trims are not watertight — Z-flashing backup at substrate level is required",
    "Panel edges must be cut consistently — H-section profile reveals poor edge quality",
    "Standard H-section has no movement accommodation — specify movement trim for large panels",
    "All aluminium trims must be isolated from steel fixings in coastal zone — galvanic risk",
    "Custom powder-coat lead times are 4–6 weeks — include in construction programme",
  ],
  standardsNotes: [
    "AS 3715: powder coating for architectural aluminium applications — Class B minimum",
    "AS 1231: anodic oxidation coatings for aluminium — Class 2, 20 micron minimum",
    "NCC 2022 Part C: fire resistance — combustible trim materials in Class 2+ buildings",
    "AS 4284: testing of building facades — joint performance under wind and water",
    "Capral / Ullrich / James Hardie installation guides — FC joint details and overlap requirements",
    "NCC 2022 Part F1: weatherproofing — joint details at panel-to-panel interfaces",
  ],
  suitableDefects: [
    "Unsightly sealant-only joints at FC panel interfaces — replace with H-section express joint trim",
    "Cracked or failed sealant at panel joints — install H-section express joint with Z-flashing backup",
    "ACP cladding replacement — new express joint trim required at all panel-to-panel joints",
    "Corroded PVC trims in coastal zone — replace with anodised aluminium H-section",
    "Distorted H-section trims due to panel thermal movement — replace with slip-connection movement trim",
    "Colour mismatch at joint trim — replace with custom powder-coat matched trim",
  ],
  typicalSubstrates: [
    "FC sheet (primed): H-section trim screwed through web to aluminium top-hat rail — SS316 screws",
    "FC panel (prefinished): powder-coat trim screwed to rail — fix through trim web not flange",
    "Aluminium panel (cassette): H-section trim in matching anodise or powder-coat",
    "Solid aluminium sheet: movement trim with slip connection — thermal movement accommodation",
    "HPL panel: H-section trim to subframe — HPL panel edge must be sealed before trim installation",
    "Aluminium subframe rail: all trim fixing screws must be 316 stainless",
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

export function ExpressJointTrimIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are express joint trim systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Express joint trims replace the unsightly sealant-only joint at FC panel and sheet interfaces with a precision aluminium or PVC profile that creates an architectural shadow line and defines the panel module grid. The trim also serves as a weatherproofing secondary barrier at the joint — superior to exposed sealant alone.
        </p>
        {expanded && (
          <>
            <p>
              The H-section express joint is the most common trim in contemporary Australian FC facade design — replacing the painted sealant joint of the 1990s with a durable, dimensionally consistent aluminium extrusion. The trim must be backed by a Z-flashing behind the joint to prevent water ingress — the H-section itself is not watertight. Used with a backer rod and sealant in the H-channel back for maximum waterproofing performance at the joint.
            </p>
            <p>
              Movement express joint trims incorporate a slip connection that allows the trim to accommodate in-plane thermal movement of large-format panels without distorting the visible joint width. This is critical in 1,200+ mm format FC panels and aluminium panels where seasonal thermal expansion can exceed 3 mm across the panel width. Specifying a rigid H-section on a large-format panel will result in either trim distortion or panel cracking at the fixing points.
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

export function ExpressJointTrimProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — express joint trim — scroll to view all</p>
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
              Side-by-side comparison of express joint trim systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Non-combustible</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Movement</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.nonCombustible}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.movementAccom}</td>
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
