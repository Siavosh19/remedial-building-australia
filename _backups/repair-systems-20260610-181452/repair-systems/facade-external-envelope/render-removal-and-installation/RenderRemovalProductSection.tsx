"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Polymer-modified"
  | "Base-coat"
  | "Finish-coat"
  | "Two-coat"
  | "Vertical"
  | "Exterior"
  | "Acrylic"
  | "Spray-applied"
  | "Monocoat"
  | "Texture"
  | "EIFS"
  | "Insulation"
  | "Fine";

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
    fullLabel: "Baumit Australia",
    brandUrl: "https://www.baumit.com.au",
    accentColor: "#ef4444",
    name: "Baumit UniPlan",
    descriptionLine: "Polymer-modified base and finish render system for full render removal and replacement on concrete and masonry facades",
    productType: "Polymer-modified two-coat render system",
    filterTags: ["Polymer-modified", "Base-coat", "Finish-coat", "Two-coat", "Vertical", "Exterior"],
    techChips: [
      { label: "Polymer-modified", cls: "bg-sky-100 text-sky-800" },
      { label: "Two-coat system", cls: "bg-slate-100 text-slate-700" },
      { label: "Base & finish coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Vertical facades", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3700", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Baumit UniPlan is a polymer-modified two-coat render system used for full render removal and replacement on concrete block, brick and concrete facade substrates on Class 2 strata buildings in Australia. The system comprises a base coat applied to the prepared substrate followed by a finish coat to provide a consistent, durable exterior render surface. Polymer modification improves adhesion, flexibility and resistance to cracking compared to plain sand-cement render, making it well suited to the thermal movement demands of multi-storey exterior facades.\n\nIn remedial applications, UniPlan is applied following complete removal of failed or delaminating existing render, substrate repair and priming per Baumit technical recommendations. The system is suitable for hand or machine application and can be finished to a smooth or textured profile. Confirm current product designation and system layers with Baumit Australia technical before specifying — the product range is subject to periodic revision.",
    technicalProperties: [
      "Polymer-modified cementitious base and finish coat system — improved adhesion and crack resistance compared to plain sand-cement render",
      "Suitable for application to concrete, concrete block and clay brick masonry substrates — confirm substrate preparation requirements with Baumit TDS",
      "Two-coat system — base coat provides key and levelling, finish coat provides texture and weathering surface",
      "Machine or hand application — base coat thickness and finish coat profile to be confirmed with Baumit technical for each project",
      "Suitable for vertical exterior facade surfaces on Class 2 multi-storey strata buildings — confirm suitability for specific substrate and exposure conditions",
    ],
    limitations: [
      "Full render removal required prior to application — do not apply over existing failed, hollow or delaminating render",
      "Substrate must be sound, free of dust, oil, laitance and contamination — confirm primer requirements with Baumit technical",
      "Not suitable for application in direct rain or on substrates with active water ingress — resolve all water ingress paths before rendering",
      "Thermal expansion and movement joints must be incorporated per AS 3700 — render system does not replace structural movement joint design",
      "Confirm current product specification and compliance with Baumit Australia before specifying",
    ],
    procurementSources: [
      { name: "Baumit Australia — trade supply — contact for current pricing and technical support", url: "https://www.baumit.com.au" },
      { name: "Render and plastering trade suppliers — nationally — confirm current stock availability", url: "https://www.baumit.com.au" },
    ],
  },
  {
    fullLabel: "Parex Australia",
    brandUrl: "https://www.parex.com.au",
    accentColor: "#f97316",
    name: "Parex Monorex GM",
    descriptionLine: "Single-coat acrylic spray-applied render finish for complete render replacement on concrete and masonry facades",
    productType: "Acrylic spray-applied monocoat render",
    filterTags: ["Acrylic", "Spray-applied", "Monocoat", "Exterior", "Texture"],
    techChips: [
      { label: "Acrylic monocoat", cls: "bg-sky-100 text-sky-800" },
      { label: "Spray-applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Single coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Textured finish", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Parex Monorex GM is a single-coat acrylic spray-applied render finish used for complete render replacement on concrete and masonry facades. As a monocoat system, it combines base and finish function in a single spray application, reducing programme time compared to traditional two-coat systems. It is widely used in Australian facade remediation for Class 2 strata buildings where a consistent spray-textured finish is required over large facade areas.\n\nMonorex GM is applied by specialist spray equipment over a prepared and primed substrate following full removal of the existing render system. The acrylic binder provides good flexibility and weather resistance, and the product is available in a range of factory-coloured finishes to match existing or new colour schemes. Confirm current colour range, primer requirements and application method with Parex Australia technical before specifying.",
    technicalProperties: [
      "Single-coat acrylic spray system — combines levelling and finish in one application layer — reduces programme time",
      "Factory pre-coloured — consistent colour through the full coat depth — confirm available colour range with Parex Australia",
      "Acrylic binder — flexible and weather-resistant — suitable for high-exposure exterior facades on multi-storey Class 2 buildings",
      "Spray application — specialist equipment required — confirm applicator requirements with Parex technical before tendering",
      "Suitable for large-area render replacement on concrete and masonry substrates — confirm substrate preparation and primer requirements per Parex TDS",
    ],
    limitations: [
      "Specialist spray equipment and trained operator required — not suitable for hand application in typical Monorex GM monocoat format",
      "Substrate must be levelled and primed before application — Monorex GM is a finish system, not a structural levelling coat",
      "Large surface undulations and substrate defects must be repaired before application — monocoat cannot mask significant irregularities",
      "Do not apply in rain, high wind or when substrate temperature is outside Parex specified application range",
      "Confirm current product specification and compliance with Parex Australia before specifying",
    ],
    procurementSources: [
      { name: "Parex Australia — trade supply — contact for current pricing and technical support", url: "https://www.parex.com.au" },
      { name: "Facade and render trade suppliers — nationally — confirm current stock with Parex Australia", url: "https://www.parex.com.au" },
    ],
  },
  {
    fullLabel: "Sto Australia",
    brandUrl: "https://www.sto.com.au",
    accentColor: "#3b82f6",
    name: "Sto EPS EIFS System",
    descriptionLine: "EPS board-based external insulation and finish system for thermally upgraded render replacement on Class 2 strata facades",
    productType: "External insulation and finish system",
    filterTags: ["EIFS", "Insulation", "Acrylic", "Exterior"],
    techChips: [
      { label: "EIFS", cls: "bg-sky-100 text-sky-800" },
      { label: "EPS insulation board", cls: "bg-slate-100 text-slate-700" },
      { label: "Acrylic finish coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Thermally upgraded", cls: "bg-green-50 text-green-700" },
      { label: "NCC compliance", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Sto EPS EIFS System is an external insulation and finish system (EIFS) comprising EPS polystyrene insulation boards adhesively fixed to the facade substrate, a reinforced base coat applied over the board, and an acrylic finish coat to provide the final render appearance. In remedial applications on Class 2 strata buildings, EIFS is used where full render removal presents an opportunity to upgrade the thermal performance of the building facade while simultaneously providing a new render finish.\n\nThe Sto system is designed to meet NCC energy efficiency requirements and is particularly relevant for older apartment buildings undergoing full render replacement where the thermal performance of the external fabric is below current NCC DTS provisions. Installation requires specialist applicators approved by Sto and strict compliance with the Sto system specification — EIFS is a composite system where substitution of components voids system certification. Fire performance of EIFS on Class 2 buildings must be assessed against NCC Volume One requirements — confirm compliance with a fire engineer where required.",
    technicalProperties: [
      "Full EIFS system — EPS insulation board, base coat with reinforcing mesh, and acrylic finish coat — engineered composite system",
      "Thermal upgrade function — EPS board provides continuous insulation layer to external facade — suitable for NCC energy efficiency compliance upgrade",
      "Acrylic finish coat — available in a range of textures and factory colours — confirm current range with Sto Australia",
      "System certification — Sto EPS EIFS is a certified system — do not substitute components — confirm current system certification status with Sto technical",
      "Approved applicator required — Sto EIFS must be installed by Sto-approved installers — confirm applicator accreditation before tendering",
    ],
    limitations: [
      "EIFS is a certified composite system — substitution of any component (board, adhesive, mesh, base coat, finish coat) voids system certification and may affect fire compliance",
      "Fire performance on Class 2 buildings must be confirmed against NCC Volume One requirements — engage fire engineer for buildings over certain heights",
      "EIFS adds external thickness to the facade — impacts window and door reveals, flashings, and external architectural details — allow for reveal extension in design",
      "Not suitable for substrates with active water ingress or structural movement — all defects must be resolved before EIFS installation",
      "Confirm current product specification and compliance with Sto Australia before specifying",
    ],
    procurementSources: [
      { name: "Sto Australia — system supply and technical support — contact for current pricing", url: "https://www.sto.com.au" },
      { name: "Sto-approved facade contractors — nationally — confirm applicator accreditation with Sto Australia", url: "https://www.sto.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#22c55e",
    name: "Mapei Planitop XS",
    descriptionLine: "Fine-finish polymer-modified render topcoat for render replacement and smooth finish facades",
    productType: "Polymer-modified fine render finish coat",
    filterTags: ["Polymer-modified", "Finish-coat", "Fine", "Exterior", "Vertical"],
    techChips: [
      { label: "Polymer-modified", cls: "bg-sky-100 text-sky-800" },
      { label: "Fine finish coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Smooth finish", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior vertical", cls: "bg-slate-100 text-slate-700" },
      { label: "Part of Mapei system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Planitop XS is a polymer-modified fine-finish render topcoat used for render replacement and smooth-finish exterior facades on Class 2 strata buildings. It is designed as a finishing coat over a compatible base coat or levelling render, providing a consistent smooth or fine-textured surface suitable for painting or coating. The polymer modification provides improved adhesion, reduced cracking, and good weather resistance compared to plain sand-cement finish coats.\n\nIn remedial render replacement applications, Planitop XS is used as the final coat over a levelling base render to achieve a smooth or fine-textured finish on concrete and masonry facades. It is part of the Mapei repair and protection system and is designed to be compatible with Mapei primers, base coats and protective coatings. Confirm system compatibility and application sequence with Mapei Australia technical before specifying.",
    technicalProperties: [
      "Polymer-modified fine render topcoat — smooth or fine-textured finish over prepared base coat — suitable for painting or coating",
      "Good adhesion to cementitious base coats, concrete and masonry substrates — confirm primer requirements with Mapei TDS",
      "Reduced shrinkage cracking compared to plain sand-cement finish coats — polymer modification improves long-term durability",
      "Hand or machine application — suitable for trowel or spray finish depending on specified texture",
      "Compatible with Mapei protective coating and paint systems — confirm full system compatibility with Mapei Australia technical",
    ],
    limitations: [
      "Finish coat only — not a structural or levelling product — base coat or levelling render required to correct surface profile before application",
      "Smooth finish coats are more sensitive to substrate preparation than textured finishes — surface flatness and uniformity critical",
      "Do not apply to damp substrates or in rain — cure conditions must be within Mapei specified ranges",
      "Confirm current product designation — Mapei product range subject to periodic revision — confirm Planitop XS is the current recommended fine render finish with Mapei Australia",
      "Confirm current product specification and compliance with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply — contact for current pricing and technical support", url: "https://www.mapei.com/au" },
      { name: "Render and construction trade suppliers — nationally — confirm current stock", url: "https://www.mapei.com/au" },
      { name: "Mapei-approved applicators and distributors — nationally", url: "https://www.mapei.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Base-coat", label: "Base-coat" },
  { id: "Finish-coat", label: "Finish-coat" },
  { id: "Two-coat", label: "Two-coat" },
  { id: "Vertical", label: "Vertical" },
  { id: "Exterior", label: "Exterior" },
  { id: "Acrylic", label: "Acrylic" },
  { id: "Spray-applied", label: "Spray-applied" },
  { id: "Monocoat", label: "Monocoat" },
  { id: "Texture", label: "Texture" },
  { id: "EIFS", label: "EIFS" },
  { id: "Insulation", label: "Insulation" },
  { id: "Fine", label: "Fine" },
];

const BRAND_EQUIV: { system: string; baumit: string; parex: string; sto: string; mapei: string }[] = [
  { system: "Two-coat polymer-modified render system", baumit: "UniPlan", parex: "—", sto: "—", mapei: "—" },
  { system: "Single-coat spray render", baumit: "—", parex: "Monorex GM", sto: "—", mapei: "—" },
  { system: "EIFS system", baumit: "—", parex: "—", sto: "EPS EIFS System", mapei: "—" },
  { system: "Fine finish render coat", baumit: "—", parex: "—", sto: "—", mapei: "Planitop XS" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; systemType: string; coats: string; eifsSuitable: string; finishTexture: string; primaryUse: string;
}[] = [
  {
    product: "Baumit UniPlan",
    brand: "Baumit",
    systemType: "Polymer-modified cementitious",
    coats: "Two-coat (base + finish)",
    eifsSuitable: "No",
    finishTexture: "Smooth / textured",
    primaryUse: "Full render removal and replacement — concrete and masonry facades",
  },
  {
    product: "Parex Monorex GM",
    brand: "Parex",
    systemType: "Acrylic monocoat",
    coats: "Single coat",
    eifsSuitable: "No",
    finishTexture: "Spray texture",
    primaryUse: "Full render replacement — large-area spray finish — concrete and masonry",
  },
  {
    product: "Sto EPS EIFS System",
    brand: "Sto",
    systemType: "EIFS — EPS insulation + render",
    coats: "Multi-layer (board, base, mesh, finish)",
    eifsSuitable: "Yes",
    finishTexture: "Acrylic textured finish",
    primaryUse: "Full render replacement with thermal upgrade — Class 2 strata facades",
  },
  {
    product: "Mapei Planitop XS",
    brand: "Mapei",
    systemType: "Polymer-modified fine finish",
    coats: "Finish coat (over base coat)",
    eifsSuitable: "No",
    finishTexture: "Smooth / fine textured",
    primaryUse: "Smooth finish render replacement — concrete and masonry facades",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Full removal of failed, delaminating or asbestos-containing render on Class 2 strata apartment facades — followed by new render installation",
    "Render replacement as part of comprehensive facade remediation following defect investigation and structural assessment",
    "Thermal performance upgrade of older apartment facades — using EIFS system during full render replacement",
    "Facade aesthetic upgrade — consistent colour and texture across a building following full render removal and replacement",
    "Preparation of facade substrate for protective coating or paint system following render replacement",
  ],
  selectionCriteria: [
    "Select a two-coat polymer-modified system (Baumit UniPlan) where a traditional cementitious render finish is required with improved performance over sand-cement",
    "Select a spray-applied monocoat (Parex Monorex GM) where large facade areas require rapid, consistent spray-textured application by specialist applicator",
    "Select EIFS (Sto EPS EIFS System) where the render replacement also needs to address thermal performance compliance under current NCC requirements",
    "Select a fine-finish topcoat (Mapei Planitop XS) where a smooth or fine-textured painted finish is required over a separately applied base or levelling coat",
    "Confirm substrate type, existing render system residue, and surface profile before specifying any render replacement system",
  ],
  limitations: [
    "All render replacement systems require full removal of existing render — partial removal leaves differential substrates that cause cracking and delamination at edges",
    "Asbestos testing of existing render is mandatory on buildings constructed or clad before 1990 — asbestos-containing render must be removed by licensed removalists under SafeWork requirements",
    "Structural cracks and substrate defects must be repaired before render application — render is not a structural repair product",
    "EIFS systems must comply with NCC fire performance requirements — confirm with fire engineer for Class 2 buildings above 3 storeys",
    "Movement and control joints must be incorporated per AS 3700 — render cannot bridge structural movement joints",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs movement joints, control joints and render installation on masonry facades",
    "NCC Volume One — Energy Efficiency and Fire Performance — applicable to EIFS systems on Class 2 buildings",
    "Safe Work Australia — asbestos in render — requires testing and licensed removal for pre-1990 render — confirm state SafeWork requirements",
    "AS 4773 — Masonry in Small Structures — referenced for render on residential and strata buildings in some specifications",
  ],
  suitableDefects: [
    "Render delamination and hollow areas on Class 2 strata building facades requiring full removal and replacement",
    "Extensive render cracking and spalling where partial repair is uneconomic or cosmetically inconsistent",
    "Asbestos-containing render requiring full licensed removal and replacement",
    "Failed or poorly bonded existing render system where the adhesion failure is widespread across the facade",
  ],
  typicalSubstrates: [
    "Concrete masonry block (CMB) — typical for Class 2 strata wall construction — confirm primer requirements per manufacturer TDS",
    "Clay brick masonry — confirm surface preparation and primer for each render system",
    "In-situ concrete — confirm laitance removal and primer requirement before render application",
    "EPS insulation board — applicable for EIFS systems only — confirm adhesive and base coat compatibility per Sto system specification",
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

export function RenderRemovalIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are render removal and installation systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Render removal and installation systems are the products and assemblies used to strip existing failed render from Class 2 strata building facades and replace it with a new render system. Full render removal is required when the existing render is delaminating, extensively cracked, hollow, structurally unsound, or when the existing render contains asbestos. In these cases, partial repair is uneconomic or cosmetically unacceptable, and complete facade strip-and-replace is the appropriate remedial strategy.
        </p>
        <p>
          Render replacement systems range from traditional polymer-modified two-coat cementitious systems to single-coat acrylic spray renders and external insulation and finish systems (EIFS). System selection depends on the substrate type, the required finish, thermal performance requirements, and the extent of substrate repair needed before render installation. On older Class 2 strata buildings, render replacement often coincides with a requirement to upgrade thermal performance to current NCC energy efficiency provisions, making EIFS a viable system option.
        </p>
        <p>
          All render replacement work on pre-1990 Australian buildings must be preceded by asbestos testing of the existing render. Asbestos was commonly used as a reinforcing additive in cement render and fibre cement products until its prohibition in Australia in 2003. Render containing asbestos must be removed by a licensed asbestos removalist under current SafeWork requirements before any new render can be installed. Structural assessment and defect investigation of the substrate should be completed before render removal begins to identify any underlying structural or waterproofing issues that must be resolved before re-rendering.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Render patch and crack repair — partial repair of localised cracking or spalling only — not a full re-render system",
              "External coatings applied over existing render — elastomeric coatings or paint systems applied to existing render surfaces — not a render replacement",
              "Cavity insulation batts — internal insulation systems installed within wall cavities — not external render systems",
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

export function RenderRemovalProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — render and EIFS installation systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of render and EIFS installation systems for facade remediation. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Coats</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">EIFS suitable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Finish texture</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.systemType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.coats}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${row.eifsSuitable === "Yes" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {row.eifsSuitable}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.finishTexture}</td>
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
            <p className="mt-1 text-sm text-slate-500">Render and EIFS system equivalents across brands active in Australian Class 2 strata facade remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Baumit</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>Parex</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Sto</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Mapei</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.baumit, row.parex, row.sto, row.mapei].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callouts — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Full render removal — considerations</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Asbestos testing is mandatory before render removal on all buildings constructed or clad before 1990 — asbestos was used as a reinforcing additive in cement render and fibre cement sheeting and is commonly found in pre-1990 Australian apartment buildings",
            "Asbestos-containing render must be removed by a licensed asbestos removalist — Class A licence required for friable asbestos — confirm current SafeWork Australia and state SafeWork requirements before commencing any render removal",
            "Structural assessment of the underlying substrate and building frame should be completed before render removal begins — removal of render can expose previously concealed structural defects, cracks, or water damage that must be addressed before re-rendering",
            "Notify the strata owners corporation and affected lot owners before commencing render removal — full facade render removal is a high-impact activity that affects building appearance, generates noise and dust, and may require temporary relocation of residents in affected areas",
            "Ensure all waterproofing, flashings, and penetration seals are inspected and repaired after render removal and before new render installation — render removal commonly exposes failed or missing flashings and waterproof membranes at window heads, sills, and wall-roof junctions",
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
