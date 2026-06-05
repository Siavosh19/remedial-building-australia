"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Jamb-flashing"
  | "SS-316"
  | "Aluminium"
  | "Colorbond"
  | "Coastal"
  | "Marine-zone"
  | "Non-combustible"
  | "Factory-folded"
  | "Z-section"
  | "L-section"
  | "EPDM-seal"
  | "Anti-capillary";

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
    fullLabel: "Metroll / Steel & Tube",
    brandUrl: "https://www.metroll.com.au/",
    accentColor: "#b45309",
    name: "SS316 Z-Section Jamb Flashing",
    descriptionLine: "316 stainless Z-section jamb flashing — vertical opening seals, marine zone.",
    productType: "Z-Section Jamb Flashing — SS316",
    filterTags: ["Jamb-flashing", "SS-316", "Coastal", "Marine-zone", "Non-combustible", "Factory-folded", "Z-section"],
    techChips: [
      { label: "316L Stainless — Marine Zone", cls: "bg-amber-100 text-amber-800" },
      { label: "Z-Section Profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Factory CNC Folded", cls: "bg-stone-100 text-stone-700" },
      { label: "Non-combustible", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "316L stainless Z-section jamb flashings are factory-folded to the project-specific profile for window and door side (jamb) reveals in rainscreen cladding systems. The Z-section configuration provides a positive weather seal at the interface between the cladding system edge and the window frame — the outer leg laps over the cladding panel edge while the inner leg is fixed to the structural reveal. At the top, the jamb flashing laps under the head flashing; at the bottom, it laps over the sill flashing end dam. Correct lapping sequence is critical to prevent water ingress at corners.",
    technicalProperties: [
      "Material: 316L stainless — 1.5 mm",
      "Profile: Z-section — 50 mm × 25 mm × 50 mm standard",
      "Factory CNC press-brake folded",
      "Max single length: 3,000 mm (height of typical opening)",
      "Lapping: under head flashing, over sill end dam",
      "Sealant at laps: neutral-cure silicone — Sika 11FC",
      "Fixing: SS316 rivets or screws to subframe",
      "Service life: 50+ years — no maintenance",
    ],
    limitations: [
      "Factory lead time 3–6 weeks — shop drawings required",
      "Lapping sequence critical — head over jamb over sill must be maintained",
      "Jamb must not be installed before sill — sequence error causes water ingress",
      "Stainless must be isolated from aluminium subframe — galvanic corrosion",
      "Sealant at all laps and interfaces must be correctly installed and inspected",
    ],
    procurementSources: [
      { name: "Metroll (stainless custom)", url: "https://www.metroll.com.au/" },
      { name: "Steel & Tube Australia", url: "https://www.steelandtube.com.au/" },
    ],
  },
  {
    fullLabel: "Capral / Ullrich Aluminium",
    brandUrl: "https://www.capral.com.au/",
    accentColor: "#0369a1",
    name: "Anodised Alum L-Section Jamb",
    descriptionLine: "Anodised 6063-T5 L-section jamb flashing — standard coastal application.",
    productType: "L-Section Jamb Flashing — Anodised Aluminium",
    filterTags: ["Jamb-flashing", "Aluminium", "Coastal", "Non-combustible", "Factory-folded", "L-section"],
    techChips: [
      { label: "6063-T5 Anodised", cls: "bg-sky-100 text-sky-800" },
      { label: "L-Section Profile", cls: "bg-green-100 text-green-700" },
      { label: "Coastal Zone Class 2", cls: "bg-slate-100 text-slate-700" },
      { label: "Factory Folded", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Factory-folded 6063-T5 anodised aluminium L-section jamb flashings (also called reveal flashings) are fixed to the structural jamb reveal and lap over the cladding panel edge at the opening side. The outer leg overlaps the cladding panel edge by minimum 20 mm, providing weather protection at the vulnerable vertical joint between cladding and opening. Anodised Class 2 (20 micron) provides corrosion resistance for coastal zones. Sealant (neutral cure silicone) is applied at the interface between the jamb flashing inner leg and the window frame.",
    technicalProperties: [
      "Material: 6063-T5 aluminium",
      "Gauge: 1.6 mm",
      "Anodising: Class 2 — 20 micron",
      "Profile: L-section — 50 mm × 50 mm standard",
      "Outer leg overlap: minimum 20 mm over cladding panel edge",
      "Sealant: at inner leg to window frame interface",
      "Fixing: SS316 self-drilling screws to reveal",
      "Service life: 25–40 years coastal zone",
    ],
    limitations: [
      "Not suitable for marine zone < 200 m — use SS316",
      "Anodising scratches during installation — protect until cladding complete",
      "Sealant at jamb-to-frame interface will fail within 15–20 years — inspect",
      "Must lap correctly with head and sill flashings — sequence matters",
      "Not colour-matched without additional powder-coat over anodise (not advisable)",
    ],
    procurementSources: [
      { name: "Capral Aluminium", url: "https://www.capral.com.au/" },
      { name: "Ullrich Aluminium", url: "https://www.ullrich.com.au/" },
    ],
  },
  {
    fullLabel: "Stratco / Metroll",
    brandUrl: "https://www.stratco.com.au/",
    accentColor: "#7c3aed",
    name: "Colorbond Jamb Reveal Flashing",
    descriptionLine: "Colorbond colour-matched jamb flashing — residential and light commercial.",
    productType: "Colorbond Jamb Flashing",
    filterTags: ["Jamb-flashing", "Colorbond", "Coastal", "Non-combustible", "Factory-folded", "L-section"],
    techChips: [
      { label: "Colorbond Ultra — Colour Matched", cls: "bg-purple-100 text-purple-800" },
      { label: "L-Section Profile", cls: "bg-green-100 text-green-700" },
      { label: "27 Standard Colours", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal (C4) Rated", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Colorbond Ultra jamb reveal flashings are colour-matched to the building's Colorbond or FC panel palette — a key aesthetic requirement in residential facades where the side reveal of windows is prominent. Factory-folded in the same Colorbond colour as the head and sill flashings, these create a consistent, colour-coordinated opening surround. The outer leg overlaps the cladding panel edge by 20–25 mm and is retained with Colorbond-coloured pop rivets. Suitable for coastal zones (C4) up to 1 km from marine water.",
    technicalProperties: [
      "Material: Colorbond Ultra — 0.55 mm BMT",
      "Profile: L-section — 50 × 50 mm or custom",
      "27 standard Colorbond colours",
      "Corrosion zone: C1–C4",
      "Outer leg overlap: 20–25 mm over cladding",
      "Fixing: colour-matched Colorbond pop rivets or SS316 screws",
      "Cut edges: zinc-rich primer within 24 hr",
      "Lead time: custom 3–5 weeks; standard stock 2–5 days",
    ],
    limitations: [
      "Not suitable for marine zone < 1 km — use anodised alum or SS316",
      "Cut edges must be primed — Colorbond corrodes at cut edges",
      "Colour fades: not maintenance-free at 20-year horizon",
      "Not suitable for fire-rated reveal detail — consult fire engineer",
      "Sealant at frame interface will need replacement in 15–20 years",
    ],
    procurementSources: [
      { name: "Stratco", url: "https://www.stratco.com.au/" },
      { name: "Metroll", url: "https://www.metroll.com.au/" },
    ],
  },
  {
    fullLabel: "Ametalin / Capral Aluminium",
    brandUrl: "https://www.ametalin.com/",
    accentColor: "#b45309",
    name: "Alum Jamb Flashing + EPDM",
    descriptionLine: "Aluminium jamb flashing with EPDM seal at window frame interface.",
    productType: "Jamb Flashing with EPDM Compression Seal",
    filterTags: ["Jamb-flashing", "Aluminium", "Coastal", "Non-combustible", "Factory-folded", "EPDM-seal", "Z-section"],
    techChips: [
      { label: "EPDM Seal — No Sealant", cls: "bg-amber-100 text-amber-800" },
      { label: "Anodised Aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Eliminates Joint Sealant Failure", cls: "bg-green-100 text-green-700" },
      { label: "Factory EPDM Bonded", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Aluminium jamb flashings with factory-integrated EPDM compression seal at the window frame interface eliminate the silicone sealant joint that is the most common jamb water ingress failure mode. The EPDM seal is bonded to the inner leg and compresses against the aluminium window frame as the flashing is fixed — accommodating differential thermal movement between the aluminium cladding flashing and the window frame without cracking or debonding. Suitable for high-specification facades where long-term water ingress risk at jambs must be minimised.",
    technicalProperties: [
      "Material: 6063-T5 anodised aluminium",
      "EPDM: 3 mm bulb — 70 Shore A — factory bonded",
      "Profile: Z or L section to suit opening reveal",
      "Eliminates silicone sealant at inner leg to frame",
      "Sealant still required at head/jamb and jamb/sill laps",
      "Temperature range: EPDM −40°C to +120°C",
      "Gauge: 1.6 mm aluminium body",
      "Lead time: custom — 4–6 weeks",
    ],
    limitations: [
      "EPDM requires uniform contact with window frame — gaps > 2 mm will not seal",
      "EPDM cannot be replaced in field if damaged during installation",
      "Window frame must be installed first and plumb before jamb flashing fitted",
      "Higher cost than standard aluminium jamb flashing",
      "Sealant still required at head and sill lap junctions",
    ],
    procurementSources: [
      { name: "Ametalin", url: "https://www.ametalin.com/" },
      { name: "Capral Aluminium (custom)", url: "https://www.capral.com.au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Jamb-flashing", label: "Jamb Flashing" },
  { id: "SS-316", label: "SS-316" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Coastal", label: "Coastal Rated" },
  { id: "Marine-zone", label: "Marine Zone" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "Factory-folded", label: "Factory Folded" },
  { id: "Z-section", label: "Z-Section" },
  { id: "L-section", label: "L-Section" },
  { id: "EPDM-seal", label: "EPDM Seal" },
  { id: "Anti-capillary", label: "Anti-capillary" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  profile: string;
  zone: string;
  epdmSeal: string;
  colourMatch: string;
  primaryUse: string;
}[] = [
  {
    product: "SS316 Z-Section Jamb",
    brand: "Metroll / Steel & Tube",
    material: "316L Stainless — 1.5 mm",
    profile: "Z-section",
    zone: "Marine",
    epdmSeal: "No",
    colourMatch: "Mill/brushed SS",
    primaryUse: "Marine zone — 50+ yr no-maintenance",
  },
  {
    product: "Anodised Alum L-Section",
    brand: "Capral / Ullrich Aluminium",
    material: "6063-T5 Anodised — 1.6 mm",
    profile: "L-section",
    zone: "Coastal",
    epdmSeal: "No",
    colourMatch: "Silver anodised / custom",
    primaryUse: "Standard coastal cladding",
  },
  {
    product: "Colorbond Jamb Reveal",
    brand: "Stratco / Metroll",
    material: "Colorbond Ultra — 0.55 mm BMT",
    profile: "L-section",
    zone: "Coastal (C4)",
    epdmSeal: "No",
    colourMatch: "27 Colorbond colours",
    primaryUse: "Colour-matched residential",
  },
  {
    product: "Alum + EPDM Jamb",
    brand: "Ametalin / Capral Aluminium",
    material: "6063-T5 Anodised — 1.6 mm",
    profile: "Z or L section",
    zone: "Coastal",
    epdmSeal: "Yes",
    colourMatch: "Silver anodised / custom",
    primaryUse: "Eliminates sealant failure at frame",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Window and door jamb (side) reveals in rainscreen cladding systems",
    "Vertical joint between cladding panel edge and opening frame",
    "Marine-zone openings: SS316 Z-section jamb mandatory",
    "Residential facades: Colorbond colour-matched jamb reveal flashing",
    "High-spec facades: EPDM jamb flashing eliminates sealant failure mode",
    "ACP remediation: new jamb flashings at all openings in remediated facade",
  ],
  selectionCriteria: [
    "Marine zone < 200 m: SS316 — only acceptable long-term option",
    "Coastal zone 200 m–1 km: anodised aluminium or Colorbond Ultra",
    "Colour-matching required: Colorbond or powder-coat aluminium",
    "No sealant at frame interface: EPDM compression seal jamb flashing",
    "Lapping sequence: head under, jamb over sill — never reverse",
    "Outer leg minimum 20 mm overlap onto cladding panel edge",
  ],
  limitations: [
    "Jamb flashing lapping sequence is critical — wrong sequence causes ingress",
    "Sealant at all laps must be correctly installed — inspect before cladding panels installed",
    "All flashings must be isolated from dissimilar metals — galvanic corrosion",
    "Colorbond cut edges corrode — prime within 24 hr",
    "EPDM jamb flashings require uniform substrate contact — not for irregular frames",
    "Factory lead times 3–6 weeks for SS316 and custom profiles",
  ],
  standardsNotes: [
    "AS/NZS 2904: damp-proof courses and flashings",
    "AS 2047: windows and external glazed doors — installation requirements",
    "AGWA Window and Door Installation Best Practice Guide",
    "NCC 2022 Part F1: damp and weatherproofing",
    "AS 4654.2: waterproofing membranes — above-ground use",
    "ISO 9223: corrosivity categories — material selection guidance",
  ],
  suitableDefects: [
    "Water ingress at window jamb — missing or failed jamb flashing",
    "Failed silicone at jamb-to-frame interface — replace with EPDM seal flashing",
    "Corroded steel or aluminium jamb flashing in coastal zone",
    "ACP remediation — new jamb flashings required at all openings",
    "Incorrect lapping sequence — reinstall with head over jamb over sill",
    "FC cladding remediation requiring new matching reveal flashings",
  ],
  typicalSubstrates: [
    "Structural concrete reveal: SS316 screws into concrete — wall plugs",
    "Masonry reveal: SS316 screws into block — avoid mortar joints",
    "Steel stud frame reveal: SS316 screws into stud",
    "Aluminium window frame: EPDM seal or sealant — no direct metal contact",
    "FC subframe rail: screw-fix to top-hat with SS316 screws",
    "Existing failed flashing: remove and replace with correctly detailed new flashing",
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

export function JambFlashingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are jamb flashing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Jamb flashings seal the vertical side (jamb) reveals of windows and doors in rainscreen
          cladding systems — bridging the gap between the cladding panel edge and the window frame
          to prevent wind-driven water ingress at this vulnerable joint. Correct lapping sequence
          with head and sill flashings is as important as material selection.
        </p>
        {expanded && (
          <>
            <p>
              The most common error in jamb flashing installation is incorrect lapping sequence.
              The correct sequence, working from bottom to top, is: (1) sill flashing installed
              with end dams; (2) jamb flashing lapped over the sill end dam at the base;
              (3) head flashing lapped over the top of the jamb flashing. This ensures that any
              water running down the inside of the jamb channel is directed into the sill pan,
              not behind it. Reversing any of these laps creates a water trap.
            </p>
            <p>
              The sealant joint between the jamb flashing inner leg and the window frame is the
              most frequently failed sealing joint in Australian facade buildings — typically failing
              by adhesion loss or cohesion cracking within 10–15 years due to differential thermal
              movement. EPDM compression seal jamb flashings eliminate this failure mode by replacing
              the sealant with a mechanical compression seal.
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

export function JambFlashingProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — jamb flashing — scroll to view all</p>
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
              Side-by-side comparison of jamb flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">EPDM seal</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                    {row.epdmSeal === "Yes"
                      ? <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">Yes</span>
                      : <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">No</span>}
                  </td>
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
