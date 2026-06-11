"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "HPL"
  | "FR-core"
  | "Non-combustible"
  | "NCC-2022"
  | "EN-438-7"
  | "Compact-HPL"
  | "Coastal"
  | "Concealed-fix"
  | "Through-colour"
  | "Prefinished"
  | "Phenolic";

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
    fullLabel: "Formica Group / Abet Laminati",
    brandUrl: "https://www.formica.com/en-au",
    accentColor: "#e2003a",
    name: "Formica Exterior Grade Compact HPL — FR Class",
    descriptionLine: "High-pressure laminate exterior grade compact panel — phenolic resin core with FR additives — through-colour or decorative face — non-combustible grade — EN 438-7 compliant — concealed-fix facade",
    productType: "Compact HPL — exterior facade grade — FR phenolic core — non-combustible",
    filterTags: ["HPL", "FR-core", "Non-combustible", "NCC-2022", "EN-438-7", "Compact-HPL", "Coastal", "Concealed-fix", "Through-colour", "Prefinished", "Phenolic"],
    techChips: [
      { label: "FR phenolic core", cls: "bg-red-100 text-red-800" },
      { label: "Non-combustible grade", cls: "bg-amber-100 text-amber-700" },
      { label: "EN 438-7", cls: "bg-green-100 text-green-700" },
      { label: "Concealed-fix", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal rated", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "High-pressure laminate (HPL) is manufactured by pressing layers of resin-impregnated kraft paper and a decorative face sheet under high heat and pressure. Compact HPL for external facades uses a phenolic resin core (not melamine) with FR (fire-retardant) additives and a protective outer surface layer. The NCC 2022-compliant grade must meet EN 438-7 Class 1 or Class 2 fire performance — confirm the specific product's AS/NZS or EN fire classification before specifying on Class 2 buildings. Standard HPL (without FR-core) is combustible and NOT acceptable on NCC 2022 external walls — always confirm fire classification. Formica and Abet Laminati offer extensive colour and texture ranges including wood-look, stone-look, and solid colours. Panels are fixed with concealed clips or screws to aluminium subframe.",
    technicalProperties: [
      "FR-core compact HPL — EN 438-7 fire classification — confirm AS/NZS equivalent classification before NCC 2022 specification",
      "Thickness: typically 6 mm, 8 mm, 10 mm, or 13 mm — select by span and structural requirement",
      "Panel sizes: up to 3650 × 1850 mm — project-cut to size with standard woodworking tools",
      "Wide decorative range: solid colours, wood-look, stone-look, concrete-look",
      "UV-stable surface — colour retention tested to EN 438-7 exterior weathering requirements",
      "Coastal: confirm specific product coastal classification with Formica technical — not all HPL grades are marine-rated",
    ],
    limitations: [
      "Fire classification must be confirmed for each specific HPL product — standard HPL without FR-core is combustible",
      "HPL is a combustible material class in standard form — only FR-core grades meeting EN 438-7 Class 1/2 are NCC 2022 compliant",
      "Fire engineering assessment may be required for use on buildings above 25 m — confirm with BCA certifier before specifying",
      "Edges must be sealed — unprotected HPL edge absorbs moisture and can delaminate over time",
      "Colour matching between batches is difficult — order all panels in one production run for colour uniformity",
    ],
    procurementSources: [
      { name: "Formica Group — Exterior HPL", url: "https://www.formica.com/en-au" },
      { name: "Abet Laminati — Abet HPL", url: "https://www.abetlaminati.com" },
      { name: "Architectural material suppliers — confirm FR classification and availability", url: "https://www.formica.com/en-au" },
    ],
  },
  {
    fullLabel: "Trespa International",
    brandUrl: "https://www.trespa.com",
    tdsUrl: "https://www.trespa.com/en/products/meteon",
    accentColor: "#0369a1",
    name: "Trespa Meteon — Exterior HPL Panel",
    descriptionLine: "Trespa Meteon exterior HPL panel — own-manufactured HPL with mineral-filled phenolic core — 6 mm and 8 mm — non-combustible B1 classification — concealed-fix facade — wide design range",
    productType: "Trespa Meteon HPL — mineral-filled phenolic core — fire-rated facade panel",
    filterTags: ["HPL", "FR-core", "Non-combustible", "NCC-2022", "EN-438-7", "Compact-HPL", "Coastal", "Concealed-fix", "Prefinished", "Phenolic"],
    techChips: [
      { label: "Trespa Meteon", cls: "bg-sky-100 text-sky-800" },
      { label: "Mineral-filled core", cls: "bg-slate-100 text-slate-700" },
      { label: "B1 fire class", cls: "bg-amber-100 text-amber-700" },
      { label: "Concealed-fix", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Trespa Meteon is the premium exterior HPL panel system from Trespa International (Netherlands). Meteon uses Trespa's own-manufactured HPL with a mineral-filled phenolic core (EBC — Electron Beam Cured) that provides a fire classification of B1 (barely flammable) under EN 13501-1, and has been assessed under NCC 2022 for specific building applications. Available in 6 mm and 8 mm thicknesses in a wide range of colours and textures from the Meteon design range. Concealed-fix panel system using Trespa's proprietary fixing system onto aluminium subframe. Trespa Meteon is widely used on schools, hospitals, and commercial facades in Australia — strongly specified by architects for its colour range, warranty, and sustainability credentials (FSC-certified cellulose fibre core). Confirm NCC 2022 compliance for the specific building height and Class with Trespa Australia technical before specifying.",
    technicalProperties: [
      "Mineral-filled phenolic HPL core — B1 fire classification under EN 13501-1 — confirm NCC 2022 compliance for specific application",
      "Thickness: 6 mm and 8 mm — available in 3050 × 1310 mm and other standard sheet sizes",
      "EBC (Electron Beam Cured) surface — superior UV resistance and colour retention vs standard HPL surfaces",
      "Wide design range: 200+ colours and textures including wood, stone, concrete, and solid colour looks",
      "Coastal rated — Trespa confirms C5-M marine corrosion environment suitability for Meteon panels",
      "FSC-certified cellulose fibre core — sustainability credentials for Green Star rated projects",
    ],
    limitations: [
      "B1 fire classification (EN 13501-1) — confirm equivalence to AS/NZS classification and NCC 2022 acceptability with certifier",
      "Proprietary fixing system — Trespa Meteon requires Trespa-compatible fixing hardware — not interchangeable with generic HPL clips",
      "Premium cost — Trespa Meteon is the most expensive HPL panel option",
      "Lead time: 4–8 weeks for non-stock colours — confirm availability with Trespa Australia before specifying",
      "Panel sizes fixed in Trespa range — cannot be ordered in custom sizes beyond the Trespa standard sheet dimensions",
    ],
    procurementSources: [
      { name: "Trespa Australia — Meteon Product Range", url: "https://www.trespa.com" },
      { name: "Trespa — Find a Dealer (Australia)", url: "https://www.trespa.com" },
      { name: "Architectural cladding specialists — Trespa authorised installers", url: "https://www.trespa.com" },
    ],
  },
  {
    fullLabel: "Fundermax / Abet Laminati",
    brandUrl: "https://www.fundermax.at",
    tdsUrl: "https://www.fundermax.at/en/products/max-exterior",
    accentColor: "#7c3aed",
    name: "Fundermax Max Exterior — HPL Compact Panel",
    descriptionLine: "Fundermax Max Exterior HPL compact panel — phenolic HPL with UV-stable outer surface — 6–10 mm — fire-rated facade grade — 200+ colours — Austrian manufacture",
    productType: "Compact HPL facade panel — fire-rated — Austrian manufacture — wide colour range",
    filterTags: ["HPL", "FR-core", "Non-combustible", "NCC-2022", "EN-438-7", "Compact-HPL", "Coastal", "Concealed-fix", "Prefinished", "Phenolic"],
    techChips: [
      { label: "Fundermax brand", cls: "bg-purple-100 text-purple-800" },
      { label: "200+ colours", cls: "bg-slate-100 text-slate-700" },
      { label: "Fire-rated grade", cls: "bg-amber-100 text-amber-700" },
      { label: "Austrian manufacture", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Fundermax Max Exterior is a compact HPL facade panel system from Fundermax (Austria). The phenolic HPL core includes fire-retardant additives and is available in fire-rated grades under EN 13501-1. The UV-stable outer surface is designed specifically for exterior exposure — colour retention exceeds EN 438-7 requirements. Available in 6 mm, 8 mm, and 10 mm thicknesses in 200+ colours and textures. Concealed or face-fixed to aluminium subframe. Fundermax has a growing Australian distribution network through architectural cladding specialists. The panel range includes wood-decor, concrete-look, metal-look, and solid-colour finishes. Confirm fire classification and NCC 2022 compliance for the specific product and building application with Fundermax Australia technical before specifying.",
    technicalProperties: [
      "Compact HPL with FR additives — fire-rated grades available under EN 13501-1 — confirm NCC 2022 classification",
      "Thickness: 6 mm, 8 mm, 10 mm — sizes up to 3050 × 1300 mm — confirm current Fundermax range",
      "UV-stable outer surface — EN 438-7 tested — suitable for Australian exterior exposure",
      "200+ colour and texture options — wood, concrete, metal, stone, and solid-colour looks",
      "Concealed or face-fixed to aluminium subframe — confirm fixing detail with Fundermax installation guide",
      "Coastal: confirm specific product coastal classification with Fundermax Australia",
    ],
    limitations: [
      "Fire classification must be confirmed for specific Max Exterior product being specified — not all grades have the same fire class",
      "NCC 2022 compliance for Class 2–9 buildings must be verified with Australian certifier — fire engineering may be required for high-rise",
      "Lead time: 6–10 weeks for non-standard colours — growing but not yet full national distribution in Australia",
      "Edges require sealing — confirm edge treatment with Fundermax installation guide",
      "Proprietary fixing compatible with most HPL clips but confirm specific clip compatibility with Fundermax technical",
    ],
    procurementSources: [
      { name: "Fundermax — Max Exterior", url: "https://www.fundermax.at" },
      { name: "Fundermax Australia — authorised distributors", url: "https://www.fundermax.at" },
      { name: "Architectural cladding specialists — confirm local availability", url: "https://www.fundermax.at" },
    ],
  },
  {
    fullLabel: "Abet Laminati / Architectural Systems",
    brandUrl: "https://www.abetlaminati.com",
    accentColor: "#b45309",
    name: "Abet HPL Exterior — Compact Decorative Phenolic Panel",
    descriptionLine: "Abet Laminati compact HPL exterior panel — fire-rated phenolic core — EN 438-7 — wide colour and texture range — Italian manufacture — concealed or face-fixed facade system",
    productType: "Abet HPL exterior facade panel — Italian manufacture — decorative range",
    filterTags: ["HPL", "FR-core", "Non-combustible", "NCC-2022", "EN-438-7", "Compact-HPL", "Coastal", "Concealed-fix", "Prefinished", "Phenolic"],
    techChips: [
      { label: "Italian manufacture", cls: "bg-orange-100 text-orange-800" },
      { label: "EN 438-7", cls: "bg-slate-100 text-slate-700" },
      { label: "FR phenolic core", cls: "bg-amber-100 text-amber-700" },
      { label: "Wide texture range", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Abet Laminati is a leading Italian HPL manufacturer with an extensive exterior compact HPL range. Abet HPL exterior panels use phenolic resin impregnated kraft paper cores with fire-retardant additives, tested to EN 438-7 for exterior exposure. Available in a wide range of colours and surface textures including smooth, matte, textured, and wood-reproduction finishes. Suitable for concealed-fix or face-fixed facade systems on aluminium subframe. Abet is distributed in Australia through architectural laminate and facade specialists. The FR-grade compact HPL must meet the specific fire classification required for the building type and height — confirm with the Australian certifier before specifying on Class 2 buildings. The broad decorative range makes Abet HPL a popular choice for aged care, education, and multi-residential Class 2 facade remediation.",
    technicalProperties: [
      "Compact HPL — phenolic core with FR additives — EN 438-7 exterior test compliance",
      "Available thicknesses: 6 mm, 8 mm, 10 mm, 13 mm — confirm from current Abet product guide",
      "Large format: up to 4200 × 1300 mm in some products — confirm available sizes with Australian distributor",
      "Extensive colour and texture range — smooth, matte, textured, wood, stone, and concrete looks",
      "UV-stable surface layer — suitable for Australian exterior exposure",
      "Compatible with standard HPL concealed-clip fixing systems on aluminium subframe",
    ],
    limitations: [
      "Fire classification varies by Abet product — confirm specific EN 13501-1 classification before specifying",
      "NCC 2022 compliance for specific building height and Class must be confirmed with Australian certifier",
      "Lead time: 6–12 weeks from Italian factory — limited stock held in Australia for non-standard products",
      "Edge sealing required — confirm edge treatment requirements with Abet distributor",
      "Colour consistency between deliveries requires careful batch management — order all panels in one production run",
    ],
    procurementSources: [
      { name: "Abet Laminati — Exterior Products", url: "https://www.abetlaminati.com" },
      { name: "Architectural laminate specialists — Australian Abet distributors", url: "https://www.abetlaminati.com" },
      { name: "Confirm local Australian distributor with Abet Laminati", url: "https://www.abetlaminati.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "HPL", label: "HPL" },
  { id: "FR-core", label: "FR core" },
  { id: "Non-combustible", label: "Non-combustible grade" },
  { id: "NCC-2022", label: "NCC 2022" },
  { id: "EN-438-7", label: "EN 438-7" },
  { id: "Compact-HPL", label: "Compact HPL" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "Concealed-fix", label: "Concealed-fix" },
  { id: "Through-colour", label: "Through-colour" },
  { id: "Prefinished", label: "Prefinished" },
  { id: "Phenolic", label: "Phenolic core" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; fireClass: string; thickness: string;
  ncc2022: string; coastal: string; primaryUse: string;
}[] = [
  { product: "Formica Exterior HPL FR", brand: "Formica / Abet", fireClass: "EN 438-7 Class 1/2", thickness: "6–13 mm", ncc2022: "Confirm with certifier", coastal: "Confirm with Formica", primaryUse: "Wide colour range — economic — fire-rated grade" },
  { product: "Trespa Meteon", brand: "Trespa", fireClass: "B1 (EN 13501-1)", thickness: "6–8 mm", ncc2022: "Confirm with certifier", coastal: "Yes — C5-M rated", primaryUse: "Premium — EBC surface — architect-favoured" },
  { product: "Fundermax Max Exterior", brand: "Fundermax", fireClass: "EN 13501-1 FR grade", thickness: "6–10 mm", ncc2022: "Confirm with certifier", coastal: "Confirm with Fundermax", primaryUse: "200+ colours — Austrian — growing AU distribution" },
  { product: "Abet HPL Exterior", brand: "Abet Laminati", fireClass: "EN 438-7 / EN 13501-1", thickness: "6–13 mm", ncc2022: "Confirm with certifier", coastal: "Confirm with Abet", primaryUse: "Wide texture range — aged care / education" },
];

const TECH_INFO = {
  typicalApplications: [
    "NCC 2022 compliant facade cladding on Class 2 buildings where decorative surface appearance is required — confirm fire classification",
    "Education, aged care, and commercial Class 2 facade systems where wide colour range and visual appearance are design drivers",
    "Concealed-fix rainscreen facade panel systems on aluminium subframe over drained cavity",
    "Feature cladding panels in wood-look, concrete-look, and solid colour finishes requiring exterior durability",
    "Low-to-mid-rise Class 2 buildings where HPL fire classification is accepted by the building certifier",
  ],
  selectionCriteria: [
    "ALWAYS confirm the fire classification of the specific HPL product before specifying on Class 2 buildings — standard HPL is combustible",
    "Select FR-core compact HPL only — standard interior or furniture-grade HPL is not acceptable for external facades",
    "Confirm NCC 2022 compliance with the Australian building certifier — European fire classes do not translate directly to NCC",
    "Select Trespa Meteon for the most established NCC compliance evidence base in Australia",
    "Confirm coastal classification with the specific manufacturer — not all HPL products are rated for marine environments",
    "Order all panels in a single production run for colour uniformity — batch variation between runs is visible",
  ],
  limitations: [
    "Standard HPL (without FR-core) is a Group 3–4 combustible material — NEVER specify standard HPL for external facades of Class 2 buildings",
    "European fire classifications (B1, Class 2 etc.) must be translated to NCC requirements by the building certifier — this is not automatic",
    "HPL is a combustible material class — it may require a complete fire engineering assessment for use on high-rise Class 2 buildings",
    "Edge sealing is mandatory — unsealed HPL edges absorb moisture and can delaminate within 5 years of exterior exposure",
    "Colour consistency requires careful batch management — all panels for a project should be manufactured in one production run",
  ],
  standardsNotes: [
    "EN 438-7 — high-pressure laminates — exterior-grade HPL fire classification system",
    "EN 13501-1 — fire classification of construction products — B1 = barely flammable (European standard)",
    "NCC 2022 Volume One — C2D3 — confirm acceptable product classification with Australian building certifier",
    "AS 1530 series — fire tests for building materials — confirm product testing under Australian standards where required",
    "Manufacturer installation guides — fixing pattern, edge treatment, thermal expansion, cavity ventilation requirements",
  ],
  suitableDefects: [
    "Combustible cladding replacement on low-to-mid-rise Class 2 buildings where HPL is confirmed NCC 2022 compliant",
    "Failed or deteriorated facade panels on education, aged care, or mixed-use Class 2 buildings requiring decorative replacement",
    "Facades where wood-look or concrete-look non-combustible appearance is required and ceramics or through-colour FC are not acceptable",
    "Partial facade panel replacement where matching the existing Trespa or HPL system is required",
    "New Class 2 construction where architects specify Trespa Meteon or equivalent HPL facade system",
  ],
  typicalSubstrates: [
    "Aluminium top-hat or Z-section subframe on helping-hand brackets — standard HPL facade subframe",
    "Proprietary thermal-break subframe systems — confirm HPL clip compatibility with proprietary rail profile",
    "Steel subframe — galvanic isolation from aluminium clips mandatory — check compatibility with HPL fixing hardware",
    "Minimum 25 mm drained and ventilated cavity behind HPL panel — do not close off cavity at top or base",
    "Over existing masonry with cavity — bracket anchors into masonry must be pull-out tested for HPL panel dead load",
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

export function HPLIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are fire-rated HPL facade panels?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>High-pressure laminate (HPL) facade panels are compact phenolic-resin-core panels used for decorative non-combustible or fire-rated external cladding. They offer a wide range of colours, textures, and surface finishes unavailable in other non-combustible panel types. Fire-rated (FR) grades use modified phenolic cores and are classified under EN 438-7 or EN 13501-1.</p>
        {expanded && (
          <>
            <p>Standard HPL (interior and furniture grade) is a combustible material and is NOT acceptable for NCC 2022 external wall cladding on Class 2–9 buildings. Only compact HPL exterior grades with confirmed fire classification — meeting EN 438-7 Class 1 or 2, or EN 13501-1 Class B or C — may be considered for external facade use, subject to Australian certifier confirmation.</p>
            <p>The key risk with HPL specification is inadvertently using an interior-grade or standard HPL product on an exterior facade where a fire-rated grade is required. This is a material non-compliance. The specifier must confirm the exact fire classification of the product and its NCC 2022 acceptability for the specific building height and class before committing to HPL as a facade material.</p>
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

export function HPLProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — fire-rated HPL facade panels — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of fire-rated HPL facade panels. Confirm fire classification and NCC 2022 compliance with certifier before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fire class</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fireClass}</td>
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
