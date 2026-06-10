"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "ACP"
  | "FR-core"
  | "Fire-rated"
  | "Cladding"
  | "Aluminium"
  | "NCC-compliant"
  | "Fibre-cement"
  | "Non-combustible"
  | "Exterior"
  | "Powder-coat"
  | "Recoating"
  | "UV-stable"
  | "Panel"
  | "Anchor"
  | "316-stainless"
  | "Cladding-fixing"
  | "Structural"
  | "Facade";

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
    fullLabel: "3A Composites",
    brandUrl: "https://www.alucobond.com",
    accentColor: "#ef4444",
    name: "Alucobond FR",
    descriptionLine: "Fire-retardant mineral-core aluminium composite panel for cladding replacement on Class 2 buildings — NCC compliant",
    productType: "FR-core aluminium composite panel",
    filterTags: ["ACP", "FR-core", "Fire-rated", "Cladding", "Aluminium", "NCC-compliant"],
    techChips: [
      { label: "FR-core ACP", cls: "bg-sky-100 text-sky-800" },
      { label: "Fire-retardant mineral core", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC 2022 compliant", cls: "bg-green-50 text-green-700" },
      { label: "Class 2 buildings", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-combustible facade", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Alucobond FR is a fire-retardant mineral-core aluminium composite panel (ACP) manufactured by 3A Composites and widely used for cladding replacement on Class 2 strata buildings in Australia. The FR designation refers to the fire-retardant mineral-filled core, distinguishing it from combustible PE-core ACP panels that are non-compliant on Class 2 buildings above certain heights under NCC 2022. Alucobond FR is one of the benchmark FR-core ACP products for facade remediation following the post-Grenfell regulatory tightening of cladding requirements in Australia.\n\nAlucobond FR panels are typically mechanically fixed to a sub-frame system using compliant facade fixings. The panel system requires engagement of a facade engineer to design the structural sub-frame, panel layout, joint design, and fixing specification. All cladding replacement on Class 2 buildings must comply with NCC 2022 C-requirements for external wall fire performance. Confirm current product compliance against the specific NCC 2022 deemed-to-satisfy provisions applicable to the building height and construction type with a fire engineer before specifying.",
    technicalProperties: [
      "FR-core (fire-retardant mineral-filled core) — substantially reduced combustibility compared to PE-core ACP — confirm NCC 2022 compliance with fire engineer",
      "Aluminium skins both faces — typically 0.5 mm aluminium — available in a wide range of anodised and PVDF paint finishes",
      "Standard panel thickness 4 mm — available in larger sheet sizes for facade cladding applications — confirm with 3A Composites for current product range",
      "PVDF and polyester paint finishes available — confirm current finish options and fire test data with 3A Composites",
      "Lightweight panel system — facade engineer required to design fixing sub-frame system and structural connection to building structure",
    ],
    limitations: [
      "FR-core ACP is not A2 non-combustible — confirm compliance against NCC 2022 C-requirements for the specific building height and construction type with a fire engineer before specifying",
      "All cladding replacement on Class 2 buildings requires fire engineering assessment and facade engineering input — do not specify without professional engineering advice",
      "Panel joint design, sealant selection, and sub-frame design must be confirmed by a facade engineer — not a DIY or non-specialist application",
      "Confirm current NCC 2022 deemed-to-satisfy provisions against the specific product fire test data before specifying — regulations subject to update",
      "Confirm current product specification, fire test data, and availability with 3A Composites Australia before specifying",
    ],
    procurementSources: [
      { name: "3A Composites — trade supply — contact for current pricing and availability", url: "https://www.alucobond.com" },
      { name: "Facade cladding distributors nationally — confirm current stock and supply", url: "https://www.alucobond.com" },
    ],
  },
  {
    fullLabel: "James Hardie",
    brandUrl: "https://www.jameshardie.com.au",
    accentColor: "#f97316",
    name: "Scyon Axon Panel",
    descriptionLine: "Factory-primed fibre cement compressed sheet cladding panel for non-combustible facade replacement",
    productType: "Fibre cement compressed sheet cladding",
    filterTags: ["Fibre-cement", "Cladding", "Fire-rated", "Non-combustible", "Exterior"],
    techChips: [
      { label: "Fibre cement cladding", cls: "bg-sky-100 text-sky-800" },
      { label: "Non-combustible", cls: "bg-green-50 text-green-700" },
      { label: "Factory-primed", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC 2022", cls: "bg-amber-50 text-amber-700" },
      { label: "Class 2 buildings", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Scyon Axon Panel by James Hardie is a factory-primed fibre cement compressed sheet cladding panel used for non-combustible facade replacement on Class 2 strata buildings. Fibre cement is a non-combustible material and meets Group 1 classification under AS 1530.1, making it compliant for use on Class 2 buildings under NCC 2022 external wall fire performance provisions. Scyon Axon Panel features a vertical grooved profile and is available in a range of widths, making it suitable for contemporary facade aesthetics in cladding replacement projects.\n\nScyon Axon Panel is factory-primed and requires a topcoat applied on-site after installation. Joint design, fixing specification, and sub-frame design must be confirmed by a facade engineer. James Hardie provides detailed installation guides for the Scyon range — confirm current installation requirements and fixing specifications with James Hardie technical before specifying. All cladding replacement on Class 2 buildings must be confirmed against NCC 2022 C-requirements with a fire engineer.",
    technicalProperties: [
      "Non-combustible fibre cement substrate — Group 1 classification under AS 1530.1 — suitable for use on Class 2 buildings under NCC 2022 external wall provisions",
      "Factory-primed — two-coat topcoat system applied on-site over primer — paint finish selection must comply with James Hardie Scyon coating requirements",
      "Vertical grooved profile — 133 mm, 200 mm and other groove spacings available — confirm current range with James Hardie",
      "Mechanically fixed to timber or steel sub-frame — fixing specification must comply with James Hardie installation guide and facade engineer design",
      "Suitable for direct fix and rainscreen cavity installation — confirm installation method with facade engineer",
    ],
    limitations: [
      "Requires on-site painting — paint system must comply with James Hardie Scyon coating requirements — confirm with James Hardie technical",
      "All cut edges, drilled holes, and joints must be sealed per James Hardie installation guide to prevent moisture ingress and deterioration",
      "Sub-frame design, fixing specification, and joint design must be confirmed by a facade engineer — not a self-specified system",
      "Confirm compliance with NCC 2022 C-requirements for the specific building height and construction type with a fire engineer before specifying",
      "Confirm current product specification, installation requirements, and availability with James Hardie before specifying",
    ],
    procurementSources: [
      { name: "James Hardie Australia — trade supply — contact for current pricing", url: "https://www.jameshardie.com.au" },
      { name: "Cladding and facade distributors nationally — confirm current stock", url: "https://www.jameshardie.com.au" },
      { name: "Stratco and major building supply chains — confirm current availability", url: "https://www.jameshardie.com.au" },
    ],
  },
  {
    fullLabel: "AkzoNobel",
    brandUrl: "https://www.interpon.com",
    accentColor: "#3b82f6",
    name: "Interpon D2525",
    descriptionLine: "AAMA 2605-rated super-durable powder coating for aluminium cladding panel recoating and colour change",
    productType: "Architectural powder coating for aluminium panels",
    filterTags: ["Powder-coat", "Recoating", "Aluminium", "UV-stable", "Panel"],
    techChips: [
      { label: "Powder coating", cls: "bg-sky-100 text-sky-800" },
      { label: "AAMA 2605", cls: "bg-green-50 text-green-700" },
      { label: "Super-durable", cls: "bg-slate-100 text-slate-700" },
      { label: "Aluminium panel recoating", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-stable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Interpon D2525 by AkzoNobel is an AAMA 2605-rated super-durable architectural powder coating used for aluminium cladding panel recoating, colour change, and panel refurbishment on building facades. AAMA 2605 is the highest durability specification for organic coatings on architectural aluminium and requires proven performance in Florida weathering and UV exposure testing. Interpon D2525 is applied by powder coating applicators under controlled factory conditions and is not a site-applied product.\n\nPanel recoating with Interpon D2525 or equivalent AAMA 2605-rated powder coating is an alternative to full cladding panel replacement where the structural substrate of existing aluminium panels is sound. This approach requires removal of panels from the building facade, strip and recoat in a powder coating facility, and reinstallation. The decision between panel recoating and full replacement must be made by a facade engineer. Confirm current product availability, colour range, and specification with AkzoNobel Interpon Australia before specifying.",
    technicalProperties: [
      "AAMA 2605-rated — highest durability specification for organic coatings on architectural aluminium — proven UV and weathering resistance",
      "Super-durable powder coating — minimum 70% gloss retention after 10 years Florida weathering per AAMA 2605 requirements",
      "Applied by approved powder coating applicators under controlled factory conditions — not a site-applied product",
      "Available in a wide colour range — RAL and custom colours available — confirm current colour range with AkzoNobel Interpon",
      "Suitable for recoating of aluminium composite panel skins and solid aluminium cladding panels after surface preparation and strip of existing coating",
    ],
    limitations: [
      "Factory-applied only — panels must be removed from the building, stripped and recoated in a powder coating facility — site application is not possible",
      "Surface preparation is critical — existing coating must be fully stripped and aluminium pre-treated before recoating — confirm pretreatment specification with AkzoNobel Interpon",
      "Panel condition must be assessed by a facade engineer before specifying recoating — panels with structural damage or delamination are not suitable for recoating",
      "Colour matching to existing adjacent cladding requires careful coordination — confirm colour match capability with the powder coating applicator",
      "Confirm current product specification, approved applicator list, and availability with AkzoNobel Interpon Australia before specifying",
    ],
    procurementSources: [
      { name: "AkzoNobel Interpon Australia — contact for approved applicator list and current pricing", url: "https://www.interpon.com" },
      { name: "Approved architectural powder coating applicators — contact AkzoNobel Interpon for current approved applicator list", url: "https://www.interpon.com" },
    ],
  },
  {
    fullLabel: "Hilti Australia",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#22c55e",
    name: "Hilti MFT Facade Fixing",
    descriptionLine: "Stainless 316 mechanical facade panel fixing anchor for cladding replacement on Class 2 strata buildings",
    productType: "316 stainless cladding panel anchor",
    filterTags: ["Anchor", "316-stainless", "Cladding-fixing", "Facade", "Structural"],
    techChips: [
      { label: "316 stainless steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Facade panel fixing", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural anchor", cls: "bg-green-50 text-green-700" },
      { label: "Cladding replacement", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4284", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Hilti MFT (Multi-Function Track) Facade Fixing is a stainless 316 mechanical panel fixing anchor system used for cladding replacement on Class 2 strata buildings. The MFT system provides adjustable, concealed panel fixing to the building structure via an aluminium sub-frame, accommodating facade tolerance and thermal movement. 316 stainless steel fasteners are specified in coastal and corrosive environments to resist long-term corrosion.\n\nAll cladding fixing systems for Class 2 buildings require structural engineering design and sign-off. The facade engineer is responsible for designing the fixing system, sub-frame, and structural connection to the building to comply with NCC 2022 structural and fire performance requirements. Hilti provides load data and installation guidance for the MFT system — confirm current product specification, design data, and availability with Hilti Australia before specifying. Do not specify facade fixing systems without facade engineering input.",
    technicalProperties: [
      "316 stainless steel fasteners — suitable for coastal and corrosive environments on Class 2 strata buildings",
      "Adjustable concealed fixing system — accommodates facade tolerance and thermal movement of cladding panels",
      "Designed for use with aluminium sub-frame systems in ventilated rainscreen cladding assemblies",
      "Hilti provides structural load data for design — facade engineer must confirm fixing design for the specific building and loading conditions",
      "Compatible with a range of cladding panel types including ACP, solid aluminium, fibre cement and other facade materials",
    ],
    limitations: [
      "Structural design by a facade engineer is mandatory — do not specify or install cladding fixing systems without engineering input and sign-off",
      "Fixing capacity must be confirmed against facade engineer design loads — generic load data is not a substitute for project-specific structural design",
      "Substrate must be assessed for anchoring capacity before specifying — concrete, masonry, and steel structure have different anchoring requirements",
      "Confirm fixing compatibility with the specific cladding panel system and sub-frame specification — not all fixing systems are compatible with all panel types",
      "Confirm current product specification, design data, and availability with Hilti Australia before specifying",
    ],
    procurementSources: [
      { name: "Hilti Australia — trade supply and technical support — contact for current pricing", url: "https://www.hilti.com.au" },
      { name: "Hilti Online Store — direct order for trade accounts", url: "https://www.hilti.com.au" },
      { name: "Facade and cladding contractors — Hilti distributor network nationally", url: "https://www.hilti.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "ACP", label: "ACP" },
  { id: "FR-core", label: "FR-core" },
  { id: "Fire-rated", label: "Fire-rated" },
  { id: "Cladding", label: "Cladding" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "NCC-compliant", label: "NCC-compliant" },
  { id: "Fibre-cement", label: "Fibre-cement" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "Exterior", label: "Exterior" },
  { id: "Powder-coat", label: "Powder-coat" },
  { id: "Recoating", label: "Recoating" },
  { id: "UV-stable", label: "UV-stable" },
  { id: "Panel", label: "Panel" },
  { id: "Anchor", label: "Anchor" },
  { id: "316-stainless", label: "316-stainless" },
  { id: "Cladding-fixing", label: "Cladding-fixing" },
  { id: "Structural", label: "Structural" },
];

const BRAND_EQUIV: { system: string; alucobond: string; hardie: string; akzonobel: string; hilti: string }[] = [
  { system: "FR-core ACP cladding", alucobond: "Alucobond FR", hardie: "—", akzonobel: "—", hilti: "—" },
  { system: "Fibre cement cladding", alucobond: "—", hardie: "Scyon Axon Panel", akzonobel: "—", hilti: "—" },
  { system: "Panel recoating system", alucobond: "—", hardie: "—", akzonobel: "Interpon D2525", hilti: "—" },
  { system: "Stainless cladding anchor", alucobond: "—", hardie: "—", akzonobel: "—", hilti: "MFT Facade Fixing" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; material: string; fireRating: string; application: string; fixingSystem: string; primaryUse: string;
}[] = [
  {
    product: "Alucobond FR",
    brand: "3A Composites",
    material: "Aluminium composite (FR-core)",
    fireRating: "FR-core — confirm NCC 2022 with FE",
    application: "Mechanically fixed to sub-frame",
    fixingSystem: "Concealed panel anchor system",
    primaryUse: "FR-core ACP cladding replacement — Class 2 buildings",
  },
  {
    product: "Scyon Axon Panel",
    brand: "James Hardie",
    material: "Fibre cement compressed sheet",
    fireRating: "Non-combustible — Group 1 AS 1530.1",
    application: "Mechanically fixed to sub-frame",
    fixingSystem: "Nail / screw fixed per Hardie guide",
    primaryUse: "Non-combustible fibre cement cladding replacement",
  },
  {
    product: "Interpon D2525",
    brand: "AkzoNobel",
    material: "Powder coating (aluminium panels)",
    fireRating: "N/A — coating system",
    application: "Factory-applied — panels removed",
    fixingSystem: "N/A — coating only",
    primaryUse: "Panel recoating and colour change — AAMA 2605",
  },
  {
    product: "Hilti MFT Facade Fixing",
    brand: "Hilti Australia",
    material: "316 stainless steel anchor",
    fireRating: "N/A — structural fixing",
    application: "Mechanical fixing to structure",
    fixingSystem: "Adjustable concealed panel anchor",
    primaryUse: "Stainless 316 cladding panel fixing — Class 2 buildings",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Full cladding panel replacement with FR-core ACP or non-combustible alternatives on Class 2 strata buildings following NCC 2022 cladding audit",
    "Non-combustible fibre cement cladding installation as a PE-core ACP replacement on mid-rise and high-rise Class 2 buildings",
    "Aluminium cladding panel recoating and colour change where structural panel substrate is confirmed sound by facade engineer",
    "Stainless 316 cladding panel fixing replacement in corrosive coastal environments on Class 2 strata buildings",
    "Facade joint sealant replacement as part of a comprehensive cladding remediation scope — coordinate with sealant subcategory",
  ],
  selectionCriteria: [
    "Confirm NCC 2022 C-requirements for the specific building height and construction type with a fire engineer before selecting cladding system",
    "FR-core ACP is not A2 non-combustible — confirm whether FR-core or A2 non-combustible is required for the specific building under NCC 2022",
    "Fibre cement is non-combustible and generally the lower-risk material selection under NCC 2022 for cladding replacement on Class 2 buildings",
    "Panel recoating is only appropriate where the existing panel structural substrate is confirmed sound — facade engineer assessment required",
    "316 stainless steel fasteners are required in coastal environments — confirm corrosion zone with facade engineer",
  ],
  limitations: [
    "All cladding replacement on Class 2 buildings requires fire engineering and facade engineering input — do not specify without professional engineering advice",
    "PE-core ACP is non-compliant on Class 2 buildings above certain heights under NCC 2022 — confirm compliance before specifying any ACP product",
    "Panel recoating does not address non-compliance of combustible panels — a PE-core ACP panel with new powder coating is still non-compliant",
    "Sub-frame design, fixing specification, and panel joint design must be confirmed by a facade engineer — not a self-specified system",
    "NCC 2022 cladding requirements are subject to update — confirm current deemed-to-satisfy provisions with fire engineer before specifying",
  ],
  standardsNotes: [
    "NCC 2022 Section C — Fire resistance — external wall cladding fire performance requirements for Class 2 buildings",
    "AS 1530.1 — Methods for fire tests on building materials — Group 1 classification for non-combustible materials",
    "AS 4284 — Testing of building facades — wind resistance and water penetration testing for cladding systems",
    "AAMA 2605 — Voluntary Specification for Superior Performing Organic Coatings on Architectural Aluminium Extrusions and Panels",
  ],
  suitableDefects: [
    "Non-compliant PE-core ACP cladding identified in NCC 2022 cladding audit on Class 2 strata buildings",
    "Delaminated, corroded, or impact-damaged cladding panels requiring full panel replacement",
    "Faded, chalking, or UV-degraded cladding panel coatings suitable for recoating where structural substrate is sound",
    "Corroded or failed cladding panel fixings in coastal environments requiring 316 stainless replacement",
    "Facade joint sealant failure at cladding panel joints requiring removal and replacement",
  ],
  typicalSubstrates: [
    "Reinforced concrete external walls — primary structural substrate for cladding sub-frame anchoring on Class 2 strata buildings",
    "Masonry block external walls — confirm anchoring capacity with facade engineer before specifying fixing system",
    "Steel structure — facade engineer must confirm fixing design for steel substrate connection",
    "Existing aluminium sub-frame — confirm structural capacity and corrosion condition before reusing sub-frame in cladding replacement",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
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
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
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

export function CladdingFailureIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are cladding failure repair systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cladding failure on Class 2 strata buildings encompasses non-compliant, delaminated, corroded, or impact-damaged external wall cladding panels requiring remediation. The primary driver of cladding remediation in Australia since 2017 has been the identification of non-compliant polyethylene-core (PE-core) aluminium composite panel (ACP) cladding — a combustible material that was prohibited or restricted on Class 2 buildings above certain heights under NCC 2022 and preceding building codes following the 2017 Grenfell Tower fire in London.
        </p>
        <p>
          NCC 2022 Section C imposes fire performance requirements for external walls of Class 2 buildings. The key distinction is between FR-core ACP (fire-retardant mineral-filled core — reduced combustibility), A2 non-combustible materials (such as solid aluminium, fibre cement, or steel), and non-compliant PE-core ACP (combustible polyethylene core — prohibited on Class 2 buildings above certain heights). All cladding replacement on Class 2 buildings requires fire engineering assessment to confirm compliance with the current NCC 2022 deemed-to-satisfy provisions applicable to the building height and construction type.
        </p>
        <p>
          Repair systems for cladding failure include full panel replacement with FR-core ACP or non-combustible alternatives, recoating of structurally sound panels where the substrate is confirmed compliant, stainless 316 cladding anchor replacement in coastal environments, and facade joint sealant replacement. All cladding replacement requires a facade engineer to design the sub-frame system, fixing specification, and panel joint design, and a fire engineer to confirm NCC 2022 compliance.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse cladding replacement systems with:</p>
          <ul className="space-y-1.5">
            {[
              "PE-core ACP (polyethylene core) — non-compliant — combustible core — banned on Class 2 buildings above certain heights under NCC 2022",
              "Lightweight render coatings — not structural cladding — different product category — see render systems subcategories",
              "Timber cladding — combustible — NCC 2022 restrictions apply to use on Class 2 buildings — confirm compliance with fire engineer",
              "Facade paint and coating systems — surface coating only — not a structural cladding replacement system",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-xs leading-5 text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function CladdingFailureProductSection() {
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
      : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

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
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
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
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — cladding replacement and fixing systems — scroll to view all</p>
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
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
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
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of cladding replacement and fixing products for Class 2 strata buildings. Confirm current product specifications with manufacturer TDS and fire engineering advice.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Fire rating</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Fixing system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.fireRating}</td>
                  <td className="px-4 py-3 text-slate-600">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600">{row.fixingSystem}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Cladding system equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>3A Composites</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>James Hardie</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>AkzoNobel</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Hilti</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.alucobond, row.hardie, row.akzonobel, row.hilti].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callout — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">NCC 2022 fire compliance</h3>
        </div>
        <ul className="space-y-2">
          {[
            "PE-core ACP (polyethylene core aluminium composite panel) is non-compliant on Class 2 buildings above certain heights under NCC 2022 — recoating a PE-core panel does not make it compliant — full panel replacement is required",
            "NCC 2022 Section C requires that external walls of Class 2 buildings meet fire performance requirements — only FR-core or A2 non-combustible cladding materials are acceptable depending on building height and construction type",
            "FR-core ACP is not the same as A2 non-combustible — confirm which classification is required for the specific building with a fire engineer before specifying",
            "All cladding replacement on Class 2 buildings requires fire engineering assessment — do not specify cladding systems without fire engineer and facade engineer input",
            "NCC 2022 deemed-to-satisfy provisions for cladding are subject to update — confirm current requirements with a fire engineer before specifying any cladding system",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
