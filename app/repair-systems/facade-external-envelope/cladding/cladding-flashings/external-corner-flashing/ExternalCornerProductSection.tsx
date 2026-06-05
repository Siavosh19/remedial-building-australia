"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "External-corner"
  | "SS-316"
  | "Aluminium"
  | "Colorbond"
  | "L-section"
  | "Square-corner"
  | "Mitred-corner"
  | "Coastal"
  | "Marine-zone"
  | "Non-combustible"
  | "Factory-folded"
  | "Radius-corner";

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
    name: "Anodised Aluminium Square External Corner Flashing",
    descriptionLine: "Anodised 6063-T5 aluminium square L-section corner — standard 90° external corner — FC and rainscreen cladding — coastal zone rated",
    productType: "Square External Corner Flashing — Anodised Aluminium",
    filterTags: ["External-corner", "Aluminium", "L-section", "Square-corner", "Coastal", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "Anodised 6063-T5", cls: "bg-amber-100 text-amber-800" },
      { label: "Square L-Section Corner", cls: "bg-slate-100 text-slate-700" },
      { label: "Factory CNC Folded", cls: "bg-stone-100 text-stone-700" },
      { label: "Coastal Zone Rated", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Anodised 6063-T5 aluminium square external corner flashings (L-section corner) are installed at all external building corners where two cladding panel runs meet at 90°. The flashing overlaps both panel edges by minimum 25 mm, protecting the vulnerable corner edge of each panel from direct rain exposure and impact. The square 90° fold is factory CNC press-brake formed for consistent geometry. Available in anodised silver or custom powder-coat colour to match adjacent panels. Fixings: SS316 self-drilling screws through the flashing into the subframe rail at 450 mm centres.",
    technicalProperties: [
      "Material: 6063-T5 aluminium",
      "Gauge: 1.6 mm; anodising: Class 2 — 20 micron",
      "Profile: L-section — 50 × 50 mm standard; custom widths to order",
      "Panel overlap: 25 mm minimum each side",
      "Fixing: SS316 self-drilling screws at 450 mm centres",
      "Finish: anodised silver or custom powder-coat; service life: 25–40 years coastal zone",
    ],
    limitations: [
      "Not suitable for marine zone < 200 m — use SS316",
      "Panel edges must be cut square and accurately — gap visible at corner overlap",
      "Anodising scratches on site — protect during installation",
      "Gap between panel edge and corner flashing web must be filled with neutral-cure silicone",
      "Powder-coat must be applied over chromate pre-treatment — not bare aluminium",
    ],
    procurementSources: [
      { name: "Capral Aluminium — national", url: "https://www.capral.com.au/" },
      { name: "Ullrich Aluminium — national", url: "https://www.ullrich.com.au/" },
    ],
  },
  {
    fullLabel: "Metroll / Steel & Tube",
    brandUrl: "https://www.metroll.com.au/",
    accentColor: "#0369a1",
    name: "SS316 External Corner Flashing",
    descriptionLine: "316L stainless corner flashing — marine zone, long-life corner protection — 50+ year service — factory CNC folded",
    productType: "External Corner Flashing — SS316",
    filterTags: ["External-corner", "SS-316", "L-section", "Square-corner", "Coastal", "Marine-zone", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "316L Stainless — Marine Zone", cls: "bg-sky-100 text-sky-800" },
      { label: "Square 90° Corner", cls: "bg-green-100 text-green-700" },
      { label: "Factory CNC Folded", cls: "bg-slate-100 text-slate-700" },
      { label: "50+ Year Service", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription:
      "316L stainless external corner flashings are specified for marine-zone facades (< 200 m from ocean) and severe coastal environments where aluminium flashings will corrode. Factory CNC press-brake folded to the exact project profile, 316L stainless corner flashings provide a 50+ year maintenance-free corner detail. The stainless finish (mill or brushed 2B) is compatible with architectural expressions where a metallic corner detail is an acceptable aesthetic. The corner flashing laps 25–30 mm over each panel edge and is fixed with SS316 rivets or screws.",
    technicalProperties: [
      "Material: 316L stainless steel — 1.5 mm",
      "Profile: L-section — 50 × 50 mm or custom",
      "Factory CNC press-brake folded",
      "Surface: mill finish 2B or brushed",
      "Panel overlap: 25–30 mm each side",
      "Fixing: SS316 rivets or self-drilling screws; max single length: 3,000 mm; service life: 50+ years",
    ],
    limitations: [
      "Higher cost than aluminium — specify only where marine exposure confirmed",
      "Factory lead time: 3–6 weeks",
      "Stainless must be isolated from aluminium subframe — galvanic corrosion",
      "Mill finish will show fingerprints and surface marks — brushed finish preferred",
      "Gap between panel edge and corner flashing must be sealed with neutral-cure silicone",
    ],
    procurementSources: [
      { name: "Metroll — stainless custom fabrication", url: "https://www.metroll.com.au/" },
      { name: "Steel & Tube Australia — national", url: "https://www.steelandtube.com.au/" },
    ],
  },
  {
    fullLabel: "Stratco / Metroll",
    brandUrl: "https://www.stratco.com.au/",
    accentColor: "#7c3aed",
    name: "Colorbond External Corner Flashing",
    descriptionLine: "Colorbond Ultra colour-matched corner flashing — 27 standard colours — C4 coastal rated — residential and light commercial",
    productType: "External Corner Flashing — Colorbond Steel",
    filterTags: ["External-corner", "Colorbond", "L-section", "Square-corner", "Coastal", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "Colorbond Ultra — Colour Matched", cls: "bg-purple-100 text-purple-800" },
      { label: "27 Standard Colours", cls: "bg-green-100 text-green-700" },
      { label: "Factory Folded", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal (C4) Rated", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Colorbond Ultra external corner flashings are colour-matched to the building's Colorbond palette — the most common corner flashing in Australian residential cladding. Factory-folded in matching Colorbond colour, these flashings create an architectural corner detail that integrates with the Colorbond Walling colour scheme. Suitable for coastal zones (C4) up to 1 km from marine water. Colorbond-coloured pop rivets maintain the colour consistency at fixing points. Used as part of a coordinated set with matching head, sill, jamb, and base weep flashings.",
    technicalProperties: [
      "Material: Colorbond Ultra — 0.55 mm BMT",
      "27 standard Colorbond colours",
      "Profile: L-section — 50 × 50 mm standard",
      "Panel overlap: 25 mm each side",
      "Corrosion zone: C1–C4 (up to 1 km marine)",
      "Fixing: colour-matched Colorbond rivets or SS316 screws; cut edges: zinc-rich primer within 24 hr",
    ],
    limitations: [
      "Not suitable for marine zone < 1 km — use SS316 or anodised aluminium",
      "Cut edges corrode — prime within 24 hr",
      "Colour fades over 10–15 years — not maintenance-free",
      "Cannot be used at 45° mitred corner — only 90° square corner",
      "Gap at panel edge must be sealed with matching silicone sealant",
    ],
    procurementSources: [
      { name: "Stratco — national trade supply", url: "https://www.stratco.com.au/" },
      { name: "Metroll — national trade supply", url: "https://www.metroll.com.au/" },
    ],
  },
  {
    fullLabel: "Capral / Metroll",
    brandUrl: "https://www.capral.com.au/",
    accentColor: "#b45309",
    name: "Aluminium Mitred Corner Trim — Custom Angle",
    descriptionLine: "Precision-folded aluminium corner trim — acute or obtuse corners, custom fold angle — anodised or powder-coat — coastal rated",
    productType: "Mitred Corner Trim — Custom Angle Aluminium",
    filterTags: ["External-corner", "Aluminium", "Mitred-corner", "Coastal", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "Custom Fold Angle", cls: "bg-amber-100 text-amber-800" },
      { label: "Mitred or Radius Corner", cls: "bg-green-100 text-green-700" },
      { label: "Anodised or Powder-Coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal Zone Rated", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Custom-folded aluminium corner trims for non-standard angles (acute < 90° or obtuse > 90°) in angular facade designs and radius corners. CNC press-brake folding can produce any angle to the project-specific geometry — shop drawings required. The mitred corner trim is typically anodised or powder-coated to match the adjacent cladding panels. Radius corners require a different forming process (roll forming) and must be confirmed with the manufacturer. Used in contemporary architectural facades where the building corner is a design feature.",
    technicalProperties: [
      "Material: 6063-T5 aluminium",
      "Gauge: 1.6 mm or 2.0 mm",
      "Custom fold angle: any angle from shop drawing",
      "Radius corners: roll-formed — confirm capability with manufacturer",
      "Finish: anodised Class 2 or powder-coat",
      "Panel overlap: 25 mm minimum each side; lead time: 4–6 weeks — custom shop drawing fabrication",
    ],
    limitations: [
      "Shop drawings required — changes add 1–2 weeks to lead time",
      "Radius corners require roll forming — not all fabricators have this capability",
      "Obtuse corners (> 135°) are difficult to fold with consistent radius",
      "Lead time 4–6 weeks — must be in programme",
      "Higher cost than standard 90° square corner flashing",
    ],
    procurementSources: [
      { name: "Capral Aluminium — custom fold", url: "https://www.capral.com.au/" },
      { name: "Metroll — custom profiles", url: "https://www.metroll.com.au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "External-corner", label: "External corner" },
  { id: "SS-316", label: "SS-316" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "L-section", label: "L-section" },
  { id: "Square-corner", label: "Square corner" },
  { id: "Mitred-corner", label: "Mitred corner" },
  { id: "Coastal", label: "Coastal" },
  { id: "Marine-zone", label: "Marine zone" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "Factory-folded", label: "Factory folded" },
  { id: "Radius-corner", label: "Radius corner" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  profile: string;
  zone: string;
  customAngle: string;
  colourMatch: string;
  primaryUse: string;
}[] = [
  {
    product: "Anodised Alum Square Corner",
    brand: "Capral / Ullrich",
    material: "6063-T5 Anodised",
    profile: "90° L-section",
    zone: "Coastal",
    customAngle: "No",
    colourMatch: "Silver / custom anodise",
    primaryUse: "Standard coastal 90° corner",
  },
  {
    product: "SS316 Corner Flashing",
    brand: "Metroll / Steel & Tube",
    material: "316L Stainless",
    profile: "90° L-section",
    zone: "Marine",
    customAngle: "No",
    colourMatch: "Mill / brushed SS",
    primaryUse: "Marine zone 50+ yr",
  },
  {
    product: "Colorbond Corner Flashing",
    brand: "Stratco / Metroll",
    material: "Colorbond Ultra",
    profile: "90° L-section",
    zone: "Coastal (C4)",
    customAngle: "No",
    colourMatch: "27 Colorbond colours",
    primaryUse: "Colour-matched residential",
  },
  {
    product: "Mitred Custom Trim",
    brand: "Capral / Metroll",
    material: "6063-T5 Anodised",
    profile: "Any angle",
    zone: "Coastal",
    customAngle: "Yes",
    colourMatch: "Any RAL powder-coat",
    primaryUse: "Acute / obtuse / radius corners",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "All external corners of cladded buildings — standard 90° corner",
    "Marine-zone corners: SS316 — mandatory long-life material",
    "Residential Colorbond cladding: colour-matched Colorbond corner set",
    "Contemporary angular facades: custom-angle mitred corner trim",
    "ACP remediation: corner flashings at all external corners of remediated facade",
    "Radius corners in architectural facades: roll-formed aluminium trim",
  ],
  selectionCriteria: [
    "Marine zone < 200 m: SS316 — only acceptable material",
    "Coastal zone 200 m–1 km: anodised aluminium or Colorbond Ultra",
    "General zone > 1 km: Colorbond or mill-finish aluminium",
    "Custom angle: specify exact angle from survey — CNC folded to order",
    "Radius corner: confirm roll-forming capability with fabricator",
    "Colour-matching: Colorbond colour set for residential; powder-coat for custom",
  ],
  limitations: [
    "All corner flashings must be isolated from dissimilar metals",
    "Colorbond cut edges corrode — prime within 24 hr",
    "Gap between panel edge and corner flashing must be sealed — neutral-cure silicone",
    "Marine zone: aluminium will corrode — SS316 is the only long-term option",
    "Custom angles require shop drawings — allow 4–6 weeks lead time",
    "Corner flashing fixings must be SS316 in all coastal and marine zones",
  ],
  standardsNotes: [
    "AS/NZS 2904: damp-proof courses and flashings",
    "NCC 2022 Part F1: weatherproofing — corner detail requirements",
    "AS 1562.1: sheet cladding — corner and edge detail",
    "ISO 9223: corrosivity categories — material selection at corners",
    "AS 3715: powder coating for architectural applications",
    "AS 1231: anodic oxidation coatings for aluminium",
  ],
  suitableDefects: [
    "Missing corner flashings — water ingress at exposed panel corners",
    "Corroded aluminium corner flashing in coastal/marine zone",
    "Failed sealant at corner flashing-to-panel gap",
    "ACP remediation — new corner flashings at all external corners",
    "FC cladding remediation requiring new matching corner trim",
    "Non-standard angle corners requiring custom fabrication",
  ],
  typicalSubstrates: [
    "Aluminium top-hat rail at corner: fix corner flashing through rail",
    "Steel corner stud: self-drilling SS316 screw through corner flashing into stud",
    "Concrete column corner: SS316 anchors through corner flashing into concrete",
    "Masonry corner: SS316 screws into block — avoid mortar joint",
    "FC panel edges: 25 mm minimum overlap — seal gap with silicone",
    "Steel subframe corner: bolt or screw through corner flashing to structural steel",
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

export function ExternalCornerIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are external corner flashing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          External corner flashings protect the most exposed elements of any cladded facade — the building corners, where wind-driven rain is most intense, panel edges are most vulnerable to impact damage, and water can enter from two directions simultaneously. Correct material selection and sealant detailing at corners is as important as at windows.
        </p>
        {expanded && (
          <>
            <p>
              Building corners experience the highest wind pressures on the facade — typically 1.5–2× the pressures applied to the central wall panels. Corner flashings must be fixed at closer centres than panel fixings, and must be isolated from the substrate where differential thermal movement occurs. The gap between the panel edge and the corner flashing web is a potential water ingress path and must be sealed with a flexible, movement-capable silicone sealant.
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

export function ExternalCornerProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — external corner flashings — scroll to view all</p>
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
              Side-by-side comparison of external corner flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Zone</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Custom angle</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour match</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.zone}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.customAngle}</td>
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
