"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Vitreous-enamel"
  | "Porcelain"
  | "Non-combustible"
  | "NCC-2022"
  | "AS-1530.1"
  | "Glass-ceramic"
  | "No-maintenance"
  | "Coastal"
  | "Back-ventilated"
  | "Concealed-fix"
  | "High-rise"
  | "Colour-stable";

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
    fullLabel: "ArcelorMittal / Prisma Architectural",
    brandUrl: "https://www.arcelormittal.com",
    tdsUrl: "https://www.arcelormittal.com/industeel/products/stainless-steels-and-special-alloys/prisma",
    accentColor: "#e2003a",
    name: "Vitreous Enamel on Steel Panel — Baked Enamel",
    descriptionLine: "Vitreous enamel on galvanised or stainless steel substrate — baked at 800°C — glass-ceramic coating — non-combustible — permanent colour stability — concealed-fix rainscreen — high-rise NCC 2022",
    productType: "Vitreous enamel steel panel — baked ceramic coating — non-combustible",
    filterTags: ["Vitreous-enamel", "Non-combustible", "NCC-2022", "AS-1530.1", "Glass-ceramic", "No-maintenance", "Coastal", "Back-ventilated", "Concealed-fix", "High-rise", "Colour-stable"],
    techChips: [
      { label: "Glass-ceramic coat", cls: "bg-red-100 text-red-800" },
      { label: "Non-combustible", cls: "bg-amber-100 text-amber-700" },
      { label: "No maintenance", cls: "bg-green-100 text-green-700" },
      { label: "NCC 2022 compliant", cls: "bg-sky-100 text-sky-800" },
      { label: "Colour stable 50yr+", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Vitreous enamel (VE) panels consist of a steel or aluminium substrate coated with a glass-ceramic powder that is fused at approximately 800°C in a kiln. The resulting coating is chemically inert, UV-stable, scratch-resistant, and permanent — VE does not fade, chalk, peel, or require repainting in the lifespan of the building. Non-combustible and NCC 2022 compliant. VE panels are the benchmark specification for facades where minimum maintenance, 50-year colour permanence, and premium appearance are required. Used on major public buildings, transport infrastructure, and premium Class 2 remediation projects. Specified for facades where heritage or urban design controls require a permanent, maintenance-free facade finish. Custom colours are available — specify at project initiation as VE colour matching is a bespoke process.",
    technicalProperties: [
      "Glass-ceramic coating fused at ~800°C — chemically bonded to substrate — cannot peel, chalk, or fade",
      "Non-combustible — AS 1530.1 Group 1 — NCC 2022 compliant for all Class and height combinations",
      "Colour stability: 50+ years proven service life — colour guaranteed against UV fade",
      "Chemical resistance: resistant to acid rain, industrial pollutants, graffiti, and most cleaning chemicals",
      "Thickness: typically 0.1–0.15 mm enamel on 1.2–2.0 mm steel substrate",
      "Coastal rated — glass-ceramic impervious to salt spray, chlorides, and marine atmosphere",
    ],
    limitations: [
      "Premium cost — significantly more expensive than paint-finish panels, PVDF, or FC panels",
      "Custom colour requires full kiln batch minimum — specify colour at project initiation, not post-tender",
      "Mechanical impact can chip glass-ceramic coating — chips are cosmetically obvious but structurally benign",
      "Long lead times — panels manufactured offshore (typically Europe) with 12–20 week lead time",
      "Concealed-fix subframe required — system engineering is project-specific and adds cost",
    ],
    procurementSources: [
      { name: "Prisma Architectural — VE panel systems", url: "https://www.arcelormittal.com" },
      { name: "Architectural facade specialists — Australian import", url: "https://www.arcelormittal.com" },
      { name: "Confirm local Australian distributor with manufacturer", url: "https://www.arcelormittal.com" },
    ],
  },
  {
    fullLabel: "Agrob Buchtal / PGH Bricks & Pavers",
    brandUrl: "https://www.agrob-buchtal.de",
    tdsUrl: "https://www.agrob-buchtal.de/en/facade-systems",
    accentColor: "#0369a1",
    name: "Porcelain Facade Panel — Back-Ventilated Rainscreen",
    descriptionLine: "Full-body porcelain facade panel — 13–20 mm — non-combustible — UV-stable glazed or natural finish — back-ventilated rainscreen system — concealed-fix — NCC 2022 compliant",
    productType: "Porcelain facade panel — rainscreen — concealed-fix — non-combustible",
    filterTags: ["Porcelain", "Non-combustible", "NCC-2022", "AS-1530.1", "Glass-ceramic", "No-maintenance", "Coastal", "Back-ventilated", "Concealed-fix", "High-rise", "Colour-stable"],
    techChips: [
      { label: "Full-body porcelain", cls: "bg-sky-100 text-sky-800" },
      { label: "Non-combustible", cls: "bg-amber-100 text-amber-700" },
      { label: "No repainting", cls: "bg-green-100 text-green-700" },
      { label: "NCC 2022 compliant", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Large-format porcelain panels for back-ventilated rainscreen cladding systems are fired full-body ceramic tiles in large format sizes (typically 600–1200 mm in both dimensions, up to 3000 mm in some systems) with concealed mechanical fixing to an aluminium or steel subframe. The porcelain body is dense, impervious, and UV-stable — colour is integral to the full ceramic body, not a surface coating, providing permanent colour stability without repainting. Non-combustible and NCC 2022 compliant. Available in glazed, natural stone-look, concrete-look, and full-body colour finishes. The back-ventilated cavity behind the panel dries any penetrating moisture and provides thermal insulation separation. Agrob Buchtal, Laminam, Fibre-X, and similar systems are used in Australian Class 2 remediation and new construction.",
    technicalProperties: [
      "Full-body porcelain — fired ceramic — colour integral to body depth, not a surface coating",
      "Non-combustible — AS 1530.1 Group 1 — NCC 2022 compliant for all Class and height combinations",
      "Large format: 600 × 600 mm to 1200 × 3600 mm — fewer joints, cleaner facade appearance",
      "Thickness: 13–20 mm depending on panel size and fixing system — confirm from manufacturer TDS",
      "Impervious to water, UV, salt, pollutants, graffiti — zero maintenance cleaning only",
      "Concealed mechanical fixing — no visible fasteners, no adhesive, no grouted joints on rainscreen system",
    ],
    limitations: [
      "Heavy: 13 mm porcelain = approximately 32 kg/m² — subframe structural engineering mandatory",
      "Ceramic panels are brittle — handling and installation requires skilled facade installers — breakage risk on site",
      "Limited fixing options — only mechanical concealed clip systems; adhesive bonding not acceptable for facade panels",
      "Premium cost — comparable to or higher than vitreous enamel for large-format panels",
      "Long lead times for non-stock colours and large-format sizes — typically 10–16 weeks from European manufacturers",
    ],
    procurementSources: [
      { name: "Agrob Buchtal — facade systems", url: "https://www.agrob-buchtal.de" },
      { name: "PGH Bricks & Pavers — Australian distributor", url: "https://www.pgh.com.au" },
      { name: "Architectural facade distributors — confirm local availability", url: "https://www.agrob-buchtal.de" },
    ],
  },
  {
    fullLabel: "Laminam / Architectural Ceramics Australia",
    brandUrl: "https://www.laminam.com",
    tdsUrl: "https://www.laminam.com/en/products/",
    accentColor: "#7c3aed",
    name: "Laminam Large-Format Sintered Stone Panel",
    descriptionLine: "Laminam sintered stone panel — 3 mm to 12 mm — large format up to 3000 × 1500 mm — non-combustible — full-body colour — UV-stable — facade rainscreen and interior — Italian manufacture",
    productType: "Sintered stone panel — large-format — non-combustible — Italian manufacture",
    filterTags: ["Porcelain", "Non-combustible", "NCC-2022", "Glass-ceramic", "No-maintenance", "Coastal", "Back-ventilated", "Concealed-fix", "Colour-stable"],
    techChips: [
      { label: "Sintered stone", cls: "bg-purple-100 text-purple-800" },
      { label: "3–12 mm range", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-combustible", cls: "bg-amber-100 text-amber-700" },
      { label: "Large format", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Laminam sintered stone panels are large-format ceramic slabs produced by sintering (high-pressure high-temperature firing) of natural raw materials without resins or organic binders. Available in thicknesses from 3 mm (interior and lightweight applications) to 12 mm (facade rainscreen) and in large-format sizes up to 3000 × 1500 mm. Non-combustible. Full-body colour and pattern — available in stone, marble, concrete, and solid-colour looks. The 3 mm panels are used for ventilated facade systems with proprietary concealed-fix over aluminium subframe. The 12 mm panels are used for direct-fix or structured facade applications. Laminam is distributed in Australia through specialist architectural tile and facade suppliers.",
    technicalProperties: [
      "Sintered ceramic — no organic binders — non-combustible — NCC 2022 compliant",
      "Thickness range: 3 mm, 5.6 mm, 12 mm — select by application (ventilated facade, structured, interior)",
      "Large format: up to 3000 × 1500 mm — very few joints for premium facade appearance",
      "Full-body design — stone, marble, concrete, and solid colour looks — integral through full depth",
      "Zero water absorption — impervious to salt, UV, pollutants, and biological growth",
      "Coastal rated — sintered ceramic impervious to chloride and marine atmosphere",
    ],
    limitations: [
      "3 mm and 5.6 mm panels are fragile — specialist handling and installation with suction-cup lifting equipment required",
      "12 mm facade panels are heavy — approximately 30 kg/m² — structural subframe design mandatory",
      "Proprietary concealed-fix systems required — not all subframe systems are compatible with thin-panel Laminam",
      "Lead time: 8–14 weeks for non-standard finishes — confirm with local distributor",
      "Premium cost — higher than FC panel options at equivalent facade area",
    ],
    procurementSources: [
      { name: "Laminam — Product Range", url: "https://www.laminam.com" },
      { name: "Architectural tile specialists — Australian Laminam distributors", url: "https://www.laminam.com" },
      { name: "Confirm local distributor with Laminam Australia", url: "https://www.laminam.com" },
    ],
  },
  {
    fullLabel: "Fibre-X / Cotto d'Este — Architectural Systems",
    brandUrl: "https://www.cottodeste.it",
    accentColor: "#b45309",
    name: "Kerlite — Ultra-Thin Porcelain Cladding Panel",
    descriptionLine: "Kerlite ultra-thin porcelain cladding panel — 3.5 mm thickness — 3000 × 1000 mm — non-combustible — lightweight facade — ventilated rainscreen with concealed-fix clip — Italian manufacture",
    productType: "Ultra-thin porcelain cladding — lightweight ventilated facade — non-combustible",
    filterTags: ["Porcelain", "Non-combustible", "NCC-2022", "Glass-ceramic", "No-maintenance", "Coastal", "Back-ventilated", "Concealed-fix", "Colour-stable"],
    techChips: [
      { label: "Ultra-thin 3.5 mm", cls: "bg-orange-100 text-orange-800" },
      { label: "Lightweight", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-combustible", cls: "bg-amber-100 text-amber-700" },
      { label: "Large format", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Kerlite ultra-thin porcelain panels (3.5 mm) from Cotto d'Este are one of the lightest non-combustible large-format facade panels available. At approximately 8 kg/m², Kerlite is comparable in weight to ACP but is fully non-combustible. Available in sizes up to 3000 × 1000 mm. The ventilated facade system uses a proprietary concealed clip profile attached to aluminium subframe rails. Kerlite is manufactured by sintering without organic binders — non-combustible, UV-stable, zero-maintenance ceramic surface. Available in concrete, stone, and colour looks. The lightweight and large-format combination makes Kerlite suitable for high-rise retro-fit cladding where subframe load capacity is constrained by existing structure.",
    technicalProperties: [
      "Ultra-thin sintered ceramic — 3.5 mm — non-combustible — NCC 2022 compliant",
      "Lightweight: approximately 8 kg/m² — similar to ACP, significantly lighter than 12 mm porcelain",
      "Large format: up to 3000 × 1000 mm — long thin panels for distinctive horizontal facade expression",
      "Ventilated facade concealed-clip fixing — proprietary Kerlite clip system on aluminium subframe",
      "Zero water absorption — UV stable — resistant to pollutants, graffiti, and biological growth",
      "Coastal rated — sintered ceramic impervious to salt spray",
    ],
    limitations: [
      "Ultra-thin panels are fragile — specialist installation team and suction-cup handling equipment mandatory",
      "Proprietary Kerlite clip system required — cannot be fixed with standard mechanical cladding fixings",
      "Premium cost — Kerlite is among the more expensive non-combustible cladding options",
      "Colour and size range is fixed — no custom sizing or colour matching outside Cotto d'Este range",
      "Imported from Italy — 10–16 week lead time — confirm stock availability with local distributor before specifying",
    ],
    procurementSources: [
      { name: "Cotto d'Este — Kerlite", url: "https://www.cottodeste.it" },
      { name: "Architectural tile suppliers — Australian Kerlite distributors", url: "https://www.cottodeste.it" },
      { name: "Confirm Australian distributor with Cotto d'Este", url: "https://www.cottodeste.it" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Vitreous-enamel", label: "Vitreous enamel" },
  { id: "Porcelain", label: "Porcelain / ceramic" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "NCC-2022", label: "NCC 2022" },
  { id: "Glass-ceramic", label: "Glass-ceramic" },
  { id: "No-maintenance", label: "No maintenance" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "Back-ventilated", label: "Back-ventilated" },
  { id: "Concealed-fix", label: "Concealed-fix" },
  { id: "High-rise", label: "High-rise" },
  { id: "Colour-stable", label: "Colour stable" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; material: string; thickness: string;
  ncc2022: string; coastal: string; maintenance: string; primaryUse: string;
}[] = [
  { product: "Vitreous Enamel Panel", brand: "ArcelorMittal/Prisma", material: "Glass-ceramic on steel", thickness: "0.15 mm enamel on 1.2–2 mm steel", ncc2022: "Compliant", coastal: "Yes", maintenance: "None — 50yr+", primaryUse: "Premium — public buildings — 50yr colour guarantee" },
  { product: "Porcelain Rainscreen", brand: "Agrob Buchtal/PGH", material: "Full-body porcelain", thickness: "13–20 mm", ncc2022: "Compliant", coastal: "Yes", maintenance: "None", primaryUse: "Heavy — premium — stone/concrete look" },
  { product: "Laminam Sintered Stone", brand: "Laminam", material: "Sintered ceramic", thickness: "3–12 mm", ncc2022: "Compliant", coastal: "Yes", maintenance: "None", primaryUse: "Large format — thin — design-led facades" },
  { product: "Kerlite Ultra-Thin", brand: "Cotto d'Este", material: "Sintered ceramic", thickness: "3.5 mm", ncc2022: "Compliant", coastal: "Yes", maintenance: "None", primaryUse: "Lightweight — large format — high-rise retro-fit" },
];

const TECH_INFO = {
  typicalApplications: [
    "Premium NCC 2022 compliant cladding replacement where no-maintenance facade finish is required for 50+ year service life",
    "High-rise Class 2 buildings where subframe dead load capacity is constrained — ultra-thin panels reduce weight",
    "Public buildings, transport infrastructure, and mixed-use facades where heritage or design controls require permanent materials",
    "Back-ventilated rainscreen cladding on Class 2 buildings where drained cavity and non-combustible outer panel are specified",
    "Facades where graffiti resistance and cleanability without re-painting are operational requirements",
  ],
  selectionCriteria: [
    "Select vitreous enamel where a bespoke colour guaranteed for 50 years is required and budget allows",
    "Select full-body porcelain (13–20 mm) for heavyweight architectural stone-look facades on structurally sound subframe",
    "Select Laminam (3–12 mm) or Kerlite (3.5 mm) where lightweight large-format non-combustible panels are required",
    "Always confirm concealed-fix system compatibility between panel product and subframe rail before committing",
    "Confirm dead load with structural engineer before selecting panel thickness — heavy porcelain panels require engineered subframe and connections",
    "Confirm lead time before committing to project programme — all these systems have long factory lead times",
  ],
  limitations: [
    "All ceramic and glass-ceramic panels are brittle — mechanical impact causes chipping and cracking not present in metal or FC panel systems",
    "Heavy panels (porcelain 13–20 mm) require structurally engineered subframe — not suitable for lightweight or constrained subframe",
    "All ceramic panels have long lead times from offshore manufacture — not suitable for urgent replacement programmes",
    "Custom colours in vitreous enamel and porcelain require full kiln-batch minimum order — uneconomical for small projects",
    "Specialist facade installation contractors required — standard cladding installers are not trained in ceramic concealed-fix systems",
  ],
  standardsNotes: [
    "AS 1530.1 — Non-combustibility test — all glass-ceramic, porcelain, and vitreous enamel panels are Group 1",
    "NCC 2022 Volume One — C2D3 — non-combustible external cladding requirement for Class 2–9 buildings",
    "AS 3700 — masonry structures — relevant to flashing and weatherproofing details at head, sill, and jamb",
    "Manufacturer installation and engineering guides — structural load tables, concealed-fix compatibility, pull-out capacity",
    "AS/NZS 4858 — wet area membranes — not directly applicable but useful reference for cavity waterproofing detailing",
  ],
  suitableDefects: [
    "Combustible PE-core ACP replacement on high-rise Class 2 buildings where premium maintenance-free appearance is the brief",
    "End-of-life painted cladding where the building owner wishes to eliminate future repainting maintenance costs",
    "Facades subject to graffiti where a non-porous, easily-cleaned ceramic surface is operationally superior",
    "Heritage or urban design controlled facades requiring a permanent, non-painted masonry or ceramic appearance",
    "Premium remediation projects where design-led ceramic or stone-look appearance is required at non-combustible specification",
  ],
  typicalSubstrates: [
    "Aluminium subframe (top-hat or Z-section) on helping-hand brackets — primary subframe system for all ceramic facade panels",
    "Proprietary thermal-break bracket and rail system (Nvelope, Hilti MFT) for high-rise energy-compliant facades",
    "Concrete or masonry primary structure — bracket anchors designed for ceramic panel dead load — pull-out test mandatory",
    "Steel primary structure — galvanic isolation between aluminium subframe and steel — EPDM tape mandatory",
    "Proprietary manufacturer rail system — some ceramic panel systems require the manufacturer's own rail profile for clip compatibility",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : <span className="font-semibold text-slate-600">{src.name}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function VitreousIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are vitreous enamel and porcelain facade panels?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Vitreous enamel (VE) and porcelain facade panels are glass-ceramic non-combustible cladding systems offering permanent colour stability, zero maintenance, and full NCC 2022 compliance. They represent the premium end of the non-combustible cladding spectrum — specified where no repainting is acceptable and 50-year colour guarantee is the design intent.</p>
        {expanded && (
          <>
            <p>Vitreous enamel consists of a glass-ceramic powder fused to a steel or aluminium substrate at ~800°C. The result is chemically inert, UV-proof, scratch-resistant, and impervious to all known atmospheric pollutants. Porcelain panels are large-format fired ceramic slabs — full-body colour, zero water absorption, and non-combustible without any organic binder.</p>
            <p>Both systems use concealed mechanical fixing to an aluminium subframe with a drained back-ventilated cavity. The principal limitation is cost, weight, brittleness, and long lead times from European manufacture. They are specified for prominent public buildings, infrastructure, and premium Class 2 remediation projects where the lifecycle cost of no-maintenance facade finish justifies the higher initial cost.</p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
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

export function VitreousProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
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

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 products — vitreous enamel and porcelain facade panels — scroll to view all</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>
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
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of vitreous enamel and porcelain cladding systems. Confirm all selections with the manufacturer before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">NCC 2022</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Maintenance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.ncc2022}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.maintenance}</td>
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
