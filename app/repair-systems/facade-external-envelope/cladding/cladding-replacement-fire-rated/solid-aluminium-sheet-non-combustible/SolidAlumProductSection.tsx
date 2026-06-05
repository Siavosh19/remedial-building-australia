"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Solid-aluminium"
  | "Non-combustible"
  | "NCC-2022"
  | "3mm"
  | "4mm"
  | "6mm"
  | "PVDF-finish"
  | "Powder-coat"
  | "Mill-finish"
  | "Coastal"
  | "High-rise"
  | "Anodised"
  | "Perforated";

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
    fullLabel: "Capral Aluminium Australia",
    brandUrl: "https://www.capral.com.au",
    tdsUrl: "https://www.capral.com.au/products/aluminium-sheet",
    accentColor: "#e2003a",
    name: "Capral Solid Aluminium Sheet — 3 mm / 4 mm — PVDF Finish",
    descriptionLine: "Solid aluminium sheet 3–4 mm thickness with PVDF fluoropolymer finish — non-combustible — high-rise NCC 2022 compliant — Capral national distribution — AAMA 2605 coating standard",
    productType: "Solid aluminium cladding sheet — PVDF finish — non-combustible",
    filterTags: ["Solid-aluminium", "Non-combustible", "NCC-2022", "3mm", "4mm", "PVDF-finish", "Coastal", "High-rise"],
    techChips: [
      { label: "Non-combustible", cls: "bg-red-100 text-red-800" },
      { label: "PVDF finish", cls: "bg-amber-100 text-amber-700" },
      { label: "NCC 2022 compliant", cls: "bg-green-100 text-green-700" },
      { label: "AAMA 2605", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal rated", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Solid aluminium sheet from Capral Aluminium in 3 mm or 4 mm thickness with a PVDF fluoropolymer coating provides the highest-performance non-combustible cladding option for high-rise Class 2 buildings. Solid aluminium is fully non-combustible — no mineral core, no organic binder, no combustion risk — meeting NCC 2022 for all building heights and Classes without fire engineering assessment. PVDF coating (Kynar 500 or equivalent) meets AAMA 2605 for colour retention and chalk resistance, providing 15–25 year exterior coating service life. Capral is Australia's primary aluminium extrusion and sheet supplier with national distribution. 3 mm sheet is suitable for most facade panel applications; 4 mm provides greater stiffness for larger panel formats or higher wind loads. Confirm PVDF colour and coating specification with Capral's finishing partner.",
    technicalProperties: [
      "Non-combustible — no combustible component — NCC 2022 compliant for all Class and height combinations",
      "Thickness: 3 mm (standard) and 4 mm (heavy-duty / large panel) — confirm from current Capral product guide",
      "PVDF fluoropolymer coating — AAMA 2605 class — 15–25 year colour retention service life",
      "Alloy: typically 5005-H34 or 3003-H24 — confirm from current Capral specification for facade panels",
      "Coastal rated — natural aluminium oxide layer plus PVDF coating — all corrosion zones",
      "National Capral distribution — confirm sheet sizes, colour, and lead time with local distributor",
    ],
    limitations: [
      "Heavier than ACP — 3 mm solid aluminium = approximately 8 kg/m²; 4 mm = approximately 11 kg/m² — subframe engineered for dead load",
      "PVDF finishing requires factory application — site touch-up is with compatible PVDF aerosol only; field-applied coatings will not match",
      "Higher material cost than ACP — cost partially offset by elimination of fire engineering assessment",
      "Larger panel formats require thicker sheet or closer subframe spacing to prevent visible deflection between fixing points",
      "Colour matching to adjacent panels must be from same batch — confirm batch identity and store offcuts for future repairs",
    ],
    procurementSources: [
      { name: "Capral Aluminium — Sheet Products", url: "https://www.capral.com.au" },
      { name: "Capral Distribution Centres — national", url: "https://www.capral.com.au" },
      { name: "Metal supermarkets / trade aluminium suppliers — confirm product and finish availability", url: "https://www.capral.com.au" },
    ],
  },
  {
    fullLabel: "Capral / Metal Distributors Australia",
    brandUrl: "https://www.capral.com.au",
    tdsUrl: "https://www.capral.com.au/products/aluminium-sheet",
    accentColor: "#0369a1",
    name: "Solid Aluminium Sheet — 3 mm / 4 mm — Powder-Coat Finish",
    descriptionLine: "Solid aluminium cladding panel — polyester powder-coat finish — non-combustible NCC 2022 — wide colour range — site-specific powder coating — AAMA 2604 class finish",
    productType: "Solid aluminium cladding sheet — powder-coat finish — non-combustible",
    filterTags: ["Solid-aluminium", "Non-combustible", "NCC-2022", "3mm", "4mm", "Powder-coat", "Coastal", "High-rise"],
    techChips: [
      { label: "Non-combustible", cls: "bg-sky-100 text-sky-800" },
      { label: "Powder-coat", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC 2022 compliant", cls: "bg-green-100 text-green-700" },
      { label: "Wide colour range", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription:
      "Solid aluminium cladding panels with polyester powder-coat finish are a widely used non-combustible cladding option for medium and high-rise Class 2 buildings. Solid aluminium is fully non-combustible — NCC 2022 compliant for all heights without fire engineering. Polyester powder coat is applied by specialist powder-coaters to fabricated panels or raw sheet. Available in any Dulux or Interpon powder-coat colour — effectively unlimited colour palette. Powder coat meets AAMA 2604 (5-year colour retention standard) — not equivalent to PVDF; suitable for buildings in non-extreme UV environments or where a shorter repaint cycle is acceptable. Widely fabricated by local sheet metal shops from Capral or equivalent raw sheet stock. More flexible for unusual panel shapes and sizes than PVDF-finished sheet.",
    technicalProperties: [
      "Non-combustible — solid aluminium, no combustible components — NCC 2022 compliant",
      "Powder-coat finish — AAMA 2604 class — wide colour range via Dulux / Interpon powder-coat palette",
      "Thickness: 3 mm standard — 4 mm for larger panels or higher wind zones — confirm with fabricator",
      "Local fabrication capability — panel sizes and shapes customisable by sheet metal shop",
      "Coastal rated with appropriate primer — confirm coastal specification with powder-coat applicator",
      "More economical than PVDF-finished panels — suitable where colour retention cycle is acceptable",
    ],
    limitations: [
      "Powder coat AAMA 2604 — shorter colour retention than PVDF AAMA 2605 — UV fade after 5–10 years in high-UV environments",
      "Polyester powder coat not suitable for extreme marine or chloride environments — specify PVDF for coastal within 1 km of ocean",
      "Colour matching between batches is difficult — all panels for a facade should be powder-coated in one batch",
      "Site damage repair requires touch-up paint — colour match difficult, sheen variation visible",
      "Heavier than ACP — dead load must be included in subframe structural design",
    ],
    procurementSources: [
      { name: "Capral Aluminium — sheet stock", url: "https://www.capral.com.au" },
      { name: "Local sheet metal fabricators — custom panel fabrication", url: "https://www.capral.com.au" },
      { name: "Powder-coat applicators — Dulux / Interpon approved — confirm local availability", url: "https://www.capral.com.au" },
    ],
  },
  {
    fullLabel: "Fairview Architectural Australia",
    brandUrl: "https://www.fairview.com.au",
    tdsUrl: "https://www.fairview.com.au/products/solid-aluminium",
    accentColor: "#7c3aed",
    name: "Fairview Solid Aluminium Cassette Panel — PVDF",
    descriptionLine: "Fairview solid aluminium cassette panel system — PVDF finish — concealed-fix cassette — non-combustible NCC 2022 — Australian brand — pre-fabricated panels to project sizes",
    productType: "Solid aluminium cassette system — concealed-fix — PVDF finish — Australian brand",
    filterTags: ["Solid-aluminium", "Non-combustible", "NCC-2022", "3mm", "4mm", "PVDF-finish", "Coastal", "High-rise"],
    techChips: [
      { label: "Australian brand", cls: "bg-purple-100 text-purple-800" },
      { label: "Cassette system", cls: "bg-slate-100 text-slate-700" },
      { label: "PVDF finish", cls: "bg-amber-100 text-amber-700" },
      { label: "Concealed-fix", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Fairview Architectural is an Australian facade panel manufacturer offering solid aluminium cassette panels in a concealed-fix system. Panels are pre-fabricated to project-specific sizes with folded returns and concealed fixing flanges, eliminating visible screw heads on the face. PVDF fluoropolymer finish is standard, meeting AAMA 2605 for long-term colour retention in Australian exterior conditions. Solid aluminium is fully non-combustible — NCC 2022 compliant for all Classes and heights. Fairview's Australian manufacturing provides shorter lead times than imported systems and project-specific colour and size flexibility. Suitable for Class 2 cladding replacement projects where a premium concealed-fix non-combustible appearance is required.",
    technicalProperties: [
      "Non-combustible solid aluminium cassette — NCC 2022 compliant for all building heights and Classes",
      "PVDF fluoropolymer finish — AAMA 2605 — 15–25 year colour retention service life",
      "Concealed-fix cassette system — no visible fasteners on panel face",
      "Pre-fabricated to project-specific panel sizes — folded returns and fixing flanges factory-formed",
      "Australian manufacturing — shorter lead times than imported panel systems",
      "Coastal rated — PVDF plus aluminium oxide — all corrosion zones",
    ],
    limitations: [
      "Cassette system requires Fairview-compatible rail and bracket subframe — confirm system compatibility at design stage",
      "Pre-fabrication requires accurate panel sizes from site measurement before fabrication commences",
      "Premium cost compared to site-fabricated powder-coat panels",
      "PVDF colour selection from Fairview palette — confirm available colours with Fairview representative",
      "Lead time longer than off-the-shelf sheet — allow 6–12 weeks for project-specific cassette fabrication",
    ],
    procurementSources: [
      { name: "Fairview Architectural Australia", url: "https://www.fairview.com.au" },
      { name: "Fairview — Project Enquiry", url: "https://www.fairview.com.au" },
      { name: "Facade specialists — Fairview distributors", url: "https://www.fairview.com.au" },
    ],
  },
  {
    fullLabel: "Capral / Metal Distributors Australia",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#b45309",
    name: "Solid Aluminium Sheet — 6 mm — Mill Finish or Anodised",
    descriptionLine: "Solid aluminium 6 mm sheet — mill finish or anodised — non-combustible — structural rigidity for large spans — suitable for perforated or CNC-cut facade screens — NCC 2022 compliant",
    productType: "Solid aluminium sheet — 6 mm — structural grade — mill finish or anodised",
    filterTags: ["Solid-aluminium", "Non-combustible", "NCC-2022", "6mm", "Mill-finish", "Anodised", "Coastal", "High-rise", "Perforated"],
    techChips: [
      { label: "6 mm structural", cls: "bg-orange-100 text-orange-800" },
      { label: "Non-combustible", cls: "bg-amber-100 text-amber-700" },
      { label: "Anodised option", cls: "bg-slate-100 text-slate-700" },
      { label: "CNC-perforated", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Solid aluminium sheet at 6 mm thickness provides the structural rigidity necessary for large-format facade panels, perforated screens, and CNC-cut decorative panels. Available with mill finish (bare aluminium — suitable for anodising), natural anodised, or coloured anodised finish. Anodising provides an electrochemical surface treatment that is part of the aluminium itself — it cannot peel or flake, provides superior abrasion resistance to powder coat or PVDF, and is available in clear, bronze, black, gold, and custom colours. Non-combustible and NCC 2022 compliant for all heights. 6 mm sheet is heavier (approximately 16.2 kg/m²) and more expensive than 3–4 mm, but necessary for long spans, perforated panels where effective load-bearing area is reduced, or where low panel deflection is critical.",
    technicalProperties: [
      "Non-combustible solid aluminium — NCC 2022 compliant — no combustion risk at any thickness",
      "Thickness: 6 mm — greater stiffness and dead load vs 3–4 mm — suitable for large spans and perforated panels",
      "Weight: approximately 16.2 kg/m² — structural design of subframe and connections mandatory",
      "Anodised finish — electrochemical — cannot peel or flake — superior abrasion resistance to organic coatings",
      "Suitable for CNC perforation, laser cutting, and press-brake forming for decorative screen applications",
      "Coastal rated — aluminium oxide plus anodic layer — all corrosion zones including marine",
    ],
    limitations: [
      "Heavy — 16.2 kg/m² dead load must be verified in structural design — subframe and anchors to be engineered",
      "6 mm sheet is more expensive than 3–4 mm — specify only where structural or aesthetic requirements justify the weight",
      "Anodising is a factory process — field repair of scratches or damage is limited to clear lacquer touch-up only",
      "Mill-finish aluminium oxidises and discolours if not anodised or coated — specify finish at purchase order",
      "Long lead times for custom anodised colours — natural clear anodise is typically available ex-stock",
    ],
    procurementSources: [
      { name: "Capral Aluminium — Sheet Products", url: "https://www.capral.com.au" },
      { name: "Metal supermarkets and aluminium distributors — national", url: "https://www.capral.com.au" },
      { name: "Anodising specialists — confirm colour range and lead time", url: "https://www.capral.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Solid-aluminium", label: "Solid aluminium" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "NCC-2022", label: "NCC 2022" },
  { id: "3mm", label: "3 mm" },
  { id: "4mm", label: "4 mm" },
  { id: "6mm", label: "6 mm" },
  { id: "PVDF-finish", label: "PVDF finish" },
  { id: "Powder-coat", label: "Powder-coat" },
  { id: "Anodised", label: "Anodised" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "High-rise", label: "High-rise" },
  { id: "Perforated", label: "Perforated / CNC" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; finish: string; thickness: string;
  ncc2022: string; coastal: string; primaryUse: string;
}[] = [
  { product: "Capral Solid Alum — PVDF", brand: "Capral", finish: "PVDF (AAMA 2605)", thickness: "3–4 mm", ncc2022: "Compliant — all heights", coastal: "Yes", primaryUse: "Premium long-life — high-rise — PVDF coating" },
  { product: "Solid Alum — Powder-coat", brand: "Capral / fabricator", finish: "Powder-coat (AAMA 2604)", thickness: "3–4 mm", ncc2022: "Compliant — all heights", coastal: "Yes (non-marine)", primaryUse: "Cost-effective — wide colour — non-marine" },
  { product: "Fairview Cassette — PVDF", brand: "Fairview", finish: "PVDF (AAMA 2605)", thickness: "3–4 mm", ncc2022: "Compliant — all heights", coastal: "Yes", primaryUse: "Concealed-fix cassette — Australian brand" },
  { product: "6mm Alum — Anodised", brand: "Capral / anodiser", finish: "Anodised", thickness: "6 mm", ncc2022: "Compliant — all heights", coastal: "Yes (marine grade)", primaryUse: "Large spans — perforated — screens — structural" },
];

const TECH_INFO = {
  typicalApplications: [
    "Non-combustible cladding replacement for PE-core ACP on Class 2–9 buildings — no fire engineering required",
    "High-rise facades where NCC 2022 non-combustibility must be confirmed without fire engineering assessment",
    "Concealed-fix cassette cladding systems where no visible fasteners on face are acceptable",
    "Perforated and CNC-cut decorative facade screens — 6 mm sheet provides structural rigidity for perforated area",
    "Architectural feature panels requiring anodised finish with superior abrasion resistance and no repainting",
  ],
  selectionCriteria: [
    "Select 3 mm for standard cladding panel spans; select 4 mm for larger panels or higher wind loads",
    "Select PVDF finish for coastal, high UV, or long-life specifications requiring AAMA 2605 colour retention",
    "Select powder-coat for inland, lower-UV environments where shorter repaint cycle is acceptable",
    "Select anodised finish where abrasion resistance is critical or periodic repainting is not acceptable",
    "Select 6 mm for perforated screens, CNC-cut panels, or large spans where stiffness is critical",
    "Confirm subframe engineering for all solid aluminium panels — dead load is significantly greater than ACP",
  ],
  limitations: [
    "Solid aluminium is significantly heavier than ACP — structural design of the subframe must account for the increased dead load",
    "PVDF finish cannot be field-applied — site damage repair is limited to touch-up aerosol only — visible repair on close inspection",
    "Anodised finish cannot be field-repaired to match original — replacement panel required for damaged sections",
    "Colour batch variation between deliveries — all panels should be ordered and finished in one batch for colour uniformity",
    "Higher material cost than FR-core ACP — cost may be justified by elimination of fire engineering assessment on high-rise buildings",
  ],
  standardsNotes: [
    "NCC 2022 Volume One — C2D3 — solid aluminium is non-combustible at all thicknesses — no fire engineering assessment required",
    "AAMA 2604 — performance requirements for polyester powder-coat finishes — 5-year colour retention",
    "AAMA 2605 — performance requirements for PVDF fluoropolymer finishes — 10-year colour retention minimum",
    "AS 1734 — aluminium and aluminium alloys — wrought products — classification of sheet alloy",
    "Capral / Fairview installation guides — structural load tables, fixing detail, thermal expansion provision",
  ],
  suitableDefects: [
    "Combustible PE-core ACP requiring full removal and replacement with non-combustible cladding on Class 2–9 buildings",
    "Failed FR-core ACP where full replacement (not just PVDF recoating) is required following structural or fire compliance assessment",
    "Buildings above 25 m effective height where non-combustibility confirmation without fire engineering is required",
    "Facades where perforated or CNC-cut decorative screen is required at non-combustible specification",
    "ACP cassette system replacement where like-for-like non-combustible cassette panel is required",
  ],
  typicalSubstrates: [
    "Aluminium top-hat or Z-section subframe on helping-hand brackets — primary subframe for solid aluminium cladding",
    "Proprietary thermal-break bracket and rail systems (Nvelope, Hilti MFT) for high-rise or thermally-sensitive facades",
    "Concrete or masonry primary structure — bracket anchors must be pull-out tested for solid aluminium dead load",
    "Steel primary structure — galvanic isolation between aluminium panels/subframe and steel via EPDM tape mandatory",
    "Fairview cassette rail system — proprietary — panels only compatible with Fairview subframe profile",
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

export function SolidAlumIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is solid aluminium sheet cladding?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Solid aluminium sheet cladding is the highest-certainty non-combustible facade panel option for Class 2–9 buildings. Unlike aluminium composite panel (ACP) where fire compliance depends on core type and fire engineering, solid aluminium contains no combustible components at any thickness — it is non-combustible by definition under NCC 2022.</p>
        {expanded && (
          <>
            <p>Available in 3 mm, 4 mm, and 6 mm thicknesses with PVDF fluoropolymer, polyester powder-coat, anodised, or mill-finish surfaces. Solid aluminium panels are heavier than ACP and require a purpose-engineered subframe. Their structural stiffness makes them suitable for large panel formats, perforated screens, and cassette systems without the deflection risk of thinner composite panels.</p>
            <p>The key trade-off versus FR-core ACP is cost and weight — solid aluminium is more expensive per m² and heavier, but eliminates the need for fire engineering assessment on any building height or Class. Where fire engineering costs and complexity are significant, solid aluminium often represents better value for the project as a whole.</p>
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

export function SolidAlumProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — solid aluminium sheet cladding — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of solid aluminium cladding options. Confirm all selections against the current manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">NCC 2022</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.ncc2022}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
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
