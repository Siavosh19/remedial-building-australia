"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Screed"
  | "Lightweight"
  | "Polymer-modified"
  | "Fall-correction"
  | "Insulation"
  | "Tapered"
  | "PIR"
  | "Warm-roof"
  | "Drainage"
  | "Outlet"
  | "Stainless"
  | "Membrane"
  | "PVC"
  | "Single-ply";

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
    fullLabel: "Ardex",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au/products/ardex-k-15",
    accentColor: "#ef4444",
    name: "Ardex K 15 Lightweight Screed",
    descriptionLine: "Perlite-aggregate polymer-modified screed for creating or correcting drainage falls on flat roofs — feather-edge application possible",
    productType: "Polymer-modified lightweight screed for fall correction",
    filterTags: ["Screed", "Lightweight", "Polymer-modified", "Fall-correction"],
    techChips: [
      { label: "Polymer-modified screed", cls: "bg-sky-100 text-sky-800" },
      { label: "Lightweight (perlite)", cls: "bg-slate-100 text-slate-700" },
      { label: "Feather-edge capable", cls: "bg-slate-100 text-slate-700" },
      { label: "Fall correction", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Ardex K 15 is a perlite-aggregate polymer-modified cementitious screed designed for lightweight fall correction on flat roofs and podium decks. Its low density reduces dead load on existing structures compared with conventional sand-cement screeds, making it suitable for application on existing concrete flat roof slabs where structural headroom for additional load is limited. Feather-edge application is achievable, allowing falls to be corrected to drainage outlets across large flat areas.\n\nPrior to application, the substrate must be confirmed sound, clean, and free of contamination. A compatible primer is required on porous concrete substrates — confirm with Ardex technical. The product must be overlaid with a compatible waterproofing membrane after application and curing. Confirm current product designation, application rate, and primer requirements with Ardex Australia technical before specifying.",
    technicalProperties: [
      "Perlite aggregate — lightweight formulation — reduced dead load compared with standard sand-cement screed",
      "Polymer-modified cementitious chemistry — good adhesion to prepared concrete substrates",
      "Feather-edge application possible — suitable for creating or correcting falls to drainage outlets without minimum thickness constraints at the outlet end",
      "Compatible with a wide range of liquid-applied and sheet waterproofing membranes after curing — confirm system compatibility with Ardex",
      "Confirm current compressive strength, application thickness range and drying time from current Ardex K 15 TDS",
    ],
    limitations: [
      "Substrate must be structurally sound — additional screed loading must be confirmed by structural engineer before application on existing roofs",
      "Not a waterproofing product — must be overlaid with a compatible waterproofing membrane before exposure to water",
      "Minimum 1:100 fall to drainage outlets must be achieved — confirm outlet positions and levels before screed application",
      "Prime all porous concrete substrates before application — confirm primer and primer application rate with Ardex technical",
      "Confirm current product specification and compliance with Ardex Australia before specifying",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Waterproofing and tiling trade suppliers nationally", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Kingspan",
    brandUrl: "https://www.kingspan.com/au",
    tdsUrl: "https://www.kingspan.com/au/en-au/products/insulation-boards/thermaroof-tr27",
    accentColor: "#3b82f6",
    name: "Kingspan Thermaroof TR27 Tapered Insulation",
    descriptionLine: "Tapered PIR foam insulation board system for creating drainage falls on warm-roof flat roof assemblies — eliminates need for screed where falls are absent",
    productType: "PIR tapered insulation board for flat roof fall creation",
    filterTags: ["Insulation", "Tapered", "PIR", "Warm-roof", "Fall-correction"],
    techChips: [
      { label: "PIR insulation", cls: "bg-sky-100 text-sky-800" },
      { label: "Tapered system", cls: "bg-slate-100 text-slate-700" },
      { label: "Warm-roof assembly", cls: "bg-slate-100 text-slate-700" },
      { label: "Fall creation", cls: "bg-amber-50 text-amber-700" },
      { label: "No screed needed", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Kingspan Thermaroof TR27 is a tapered PIR (polyisocyanurate) rigid foam insulation board system designed for flat roof warm-roof assemblies. The tapered board configuration creates drainage falls across the roof surface without the addition of screed material, reducing structural loading and construction time. Boards are factory-cut to a specified slope, supplied as a designed system with layout drawings, and installed beneath a single-ply or other waterproofing membrane.\n\nTapered insulation is particularly suited to new-build flat roofing and to remediation of existing flat roofs where screed application is precluded by structural loading constraints or where warm-roof thermal performance is a project requirement. Confirm the board layout design, minimum thickness at outlets, and membrane compatibility with Kingspan technical before specifying.",
    technicalProperties: [
      "PIR foam core — high thermal resistance (low lambda value) — provides thermal insulation and fall creation in a single product layer",
      "Tapered board profile — factory-specified slope — creates 1:80 or 1:100 falls or as specified by hydraulic design",
      "Lightweight — significantly lower dead load than screed-based fall correction systems",
      "Mechanically fastened or fully adhered — installation method depends on roof deck substrate and membrane system",
      "Confirm current board thickness range, slope options, compressive strength and BBA or CodeMark certification with Kingspan before specifying",
    ],
    limitations: [
      "Warm-roof assembly only — vapour control layer required on the warm side of insulation — confirm assembly design with building physicist or engineer",
      "Membrane compatibility must be confirmed — not all single-ply membranes are compatible with all PIR board facers",
      "Minimum fall at lowest point (drain outlet) must comply with hydraulic design — confirm minimum board thickness at outlet with Kingspan layout drawings",
      "Not suitable as a standalone product — requires waterproofing membrane overlay and correct warm-roof assembly sequence",
      "Confirm current product specification and compliance with Kingspan before specifying",
    ],
    procurementSources: [
      { name: "Kingspan Australia — contact for current pricing and layout design service", url: "https://www.kingspan.com/au" },
      { name: "Roofing and insulation trade suppliers nationally", url: "https://www.kingspan.com/au" },
    ],
  },
  {
    fullLabel: "Blucher",
    brandUrl: "https://www.blucher.com.au",
    accentColor: "#22c55e",
    name: "Blucher Compact Floor Drain",
    descriptionLine: "Stainless steel drain outlet for flat roof drainage — adjustable height, siphonic or gravity drainage configuration, suitable for membrane upstand detailing",
    productType: "Stainless steel flat roof drain with siphonic outlet",
    filterTags: ["Drainage", "Outlet", "Stainless"],
    techChips: [
      { label: "Stainless steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Flat roof drain", cls: "bg-slate-100 text-slate-700" },
      { label: "Adjustable height", cls: "bg-slate-100 text-slate-700" },
      { label: "Siphonic / gravity", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Blucher Compact Floor Drain is a stainless steel drainage outlet for flat roof and podium deck applications. The adjustable height body allows the outlet level to be set to accommodate the existing or corrected fall profile, and the drain body is designed to integrate with waterproofing membrane upstand detailing. Available in siphonic and gravity drainage configurations — siphonic outlets allow smaller-diameter pipework and are commonly specified on large flat roof areas where pipe sizing is constrained.\n\nThe drain body is typically installed before screed or membrane application, with the membrane dressed into the drain body flange at the outlet position. Confirm outlet sizing, pipe diameter, and overflow requirements with the hydraulic engineer before specifying. The Compact Floor Drain range includes various strainer and grating options — confirm appropriate grating for the roof application with Blucher technical.",
    technicalProperties: [
      "Stainless steel construction — corrosion resistant — suitable for exposed flat roof drainage applications",
      "Adjustable height body — accommodates varying screed or board thickness without requiring separate height adaptors in most applications",
      "Siphonic and gravity configurations available — siphonic outlet allows reduced pipe diameter on large catchment areas",
      "Membrane integration flange — designed for waterproofing membrane upstand or collar detail at the outlet",
      "Confirm flow rate, grating load class, and certification with Blucher technical for the specific roof application",
    ],
    limitations: [
      "Outlet position must be confirmed at lowest point of corrected fall profile — drain relocation after screed application is not practical",
      "Overflow relief must be installed independently — do not rely on a single drain as the sole drainage point for the roof area",
      "Pipe sizing and siphonic system design must be confirmed by a hydraulic engineer — do not size pipes without hydraulic calculation",
      "Membrane-to-drain interface must be installed per membrane manufacturer's requirement — confirm with both Blucher and the membrane supplier",
      "Confirm current product specification and compliance with Blucher before specifying",
    ],
    procurementSources: [
      { name: "Blucher Australia — trade supply — contact for current pricing", url: "https://www.blucher.com.au" },
      { name: "Plumbing and roofing trade suppliers nationally", url: "https://www.blucher.com.au" },
    ],
  },
  {
    fullLabel: "Sika",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/roofing/pvc-tpo-waterproofing/sika-sarnafil-ts-77.html",
    accentColor: "#f97316",
    name: "Sika Sarnafil TS 77-15 PVC Membrane",
    descriptionLine: "Mechanically fastened or fully adhered PVC single-ply waterproofing membrane for flat roof waterproofing after fall correction",
    productType: "PVC single-ply waterproofing membrane for flat roofs",
    filterTags: ["Membrane", "PVC", "Single-ply"],
    techChips: [
      { label: "PVC single-ply", cls: "bg-sky-100 text-sky-800" },
      { label: "Mechanically fastened / adhered", cls: "bg-slate-100 text-slate-700" },
      { label: "Flat roof waterproofing", cls: "bg-slate-100 text-slate-700" },
      { label: "1.5 mm thick", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Sarnafil TS 77-15 is a 1.5 mm reinforced PVC single-ply waterproofing membrane for flat roof waterproofing applications. It can be installed by mechanical fastening or fully adhered to the substrate, depending on the roof assembly. Hot-air welded seams provide a continuous watertight lap joint. Sarnafil TS 77-15 is suitable for installation over corrected or tapered roof substrates, including over Ardex screed or Kingspan tapered insulation systems, and is compatible with a range of detailing accessories for upstands, outlets, and penetrations.\n\nThe membrane is UV-resistant and suitable for exposed flat roof applications without ballast. Confirm the fastening pattern, minimum upstand height, overlap weld width, and compatibility with the underlying screed or insulation system with Sika technical before specifying. The Sarnafil system includes factory-fabricated detailing sheets for complex junctions — confirm availability and use of factory-fabricated details with Sika.",
    technicalProperties: [
      "PVC single-ply — reinforced — 1.5 mm nominal thickness — suitable for exposed flat roof waterproofing",
      "Hot-air welded seams — continuous watertight lap joint — field-verified by hot-air weld testing",
      "Mechanically fastened or fully adhered installation — method determined by roof deck substrate and wind uplift design",
      "UV-resistant formulation — suitable for exposed unballasted flat roof application without additional protection layer",
      "Confirm current root resistance, fire classification, and wind uplift certification with Sika Sarnafil Australia before specifying",
    ],
    limitations: [
      "Bituminous substrates (existing torch-on or hot-melt membranes) require a separation layer before Sarnafil installation — direct contact with bituminous materials may cause PVC plasticiser migration",
      "Hot-air welding requires trained and certified Sika Sarnafil applicators — do not specify without confirming installer accreditation",
      "Upstand height minimum must be confirmed per AS 3740 and Sika technical — typically minimum 150 mm above finished roof level",
      "Puncture resistance of single-ply membrane requires careful workmanship on site — confirm access and protection requirements during and after installation",
      "Confirm current product specification and compliance with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact Sika Sarnafil division for current pricing", url: "https://aus.sika.com" },
      { name: "Accredited Sika Sarnafil installers — contact Sika Australia for current approved installer list", url: "https://aus.sika.com" },
      { name: "Roofing trade suppliers nationally — confirm stock with Sika Australia", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Screed", label: "Screed" },
  { id: "Lightweight", label: "Lightweight" },
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Fall-correction", label: "Fall-correction" },
  { id: "Insulation", label: "Insulation" },
  { id: "Tapered", label: "Tapered" },
  { id: "PIR", label: "PIR" },
  { id: "Warm-roof", label: "Warm-roof" },
  { id: "Drainage", label: "Drainage" },
  { id: "Outlet", label: "Outlet" },
  { id: "Stainless", label: "Stainless" },
  { id: "Membrane", label: "Membrane" },
  { id: "PVC", label: "PVC" },
  { id: "Single-ply", label: "Single-ply" },
];

const BRAND_EQUIV: { system: string; ardex: string; kingspan: string; blucher: string; sika: string }[] = [
  { system: "Lightweight fall screed", ardex: "K 15", kingspan: "—", blucher: "—", sika: "—" },
  { system: "Tapered insulation (PIR)", ardex: "—", kingspan: "Thermaroof TR27", blucher: "—", sika: "—" },
  { system: "Flat roof drain outlet", ardex: "—", kingspan: "—", blucher: "Compact Floor Drain", sika: "—" },
  { system: "PVC single-ply membrane", ardex: "—", kingspan: "—", blucher: "—", sika: "Sarnafil TS 77-15" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  application: string;
  minThickness: string;
  suitedForWarmRoof: string;
  primaryUse: string;
}[] = [
  {
    product: "Ardex K 15",
    brand: "Ardex",
    type: "Polymer-modified screed",
    application: "Trowel-applied over prepared slab",
    minThickness: "Feather-edge — confirm TDS",
    suitedForWarmRoof: "N/A",
    primaryUse: "Fall correction overlay on concrete flat roof slab",
  },
  {
    product: "Thermaroof TR27",
    brand: "Kingspan",
    type: "PIR tapered insulation board",
    application: "Mechanically fastened / adhered to deck",
    minThickness: "Min at outlet — confirm layout drawings",
    suitedForWarmRoof: "Yes",
    primaryUse: "Warm-roof fall creation — no screed required",
  },
  {
    product: "Compact Floor Drain",
    brand: "Blucher",
    type: "Stainless steel drain outlet",
    application: "Installed before screed / membrane",
    minThickness: "N/A — adjustable height body",
    suitedForWarmRoof: "Yes",
    primaryUse: "Flat roof drainage outlet — siphonic or gravity",
  },
  {
    product: "Sarnafil TS 77-15",
    brand: "Sika",
    type: "PVC single-ply membrane",
    application: "Mechanically fastened or fully adhered",
    minThickness: "1.5 mm nominal",
    suitedForWarmRoof: "Yes",
    primaryUse: "Exposed flat roof waterproofing after fall correction",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Fall correction screed overlay on existing concrete flat roof slabs with inadequate original falls",
    "Tapered insulation board installation on warm-roof flat roof assemblies to create drainage falls without screed",
    "Drain outlet installation and level adjustment to suit corrected or new fall profile",
    "PVC single-ply membrane waterproofing over corrected fall substrates on flat roofs of Class 2 strata apartment buildings",
    "Podium deck and basement roof slab fall correction where ponding has been identified by hydraulic inspection",
  ],
  selectionCriteria: [
    "Confirm whether the existing structural slab can carry additional screed load before specifying screed-based fall correction — engage structural engineer",
    "Select tapered insulation where screed loading is not achievable or where warm-roof thermal performance is a project requirement",
    "Confirm drain outlet type and pipe sizing with hydraulic engineer before specifying siphonic or gravity drainage",
    "Select PVC single-ply membrane only where accredited Sarnafil installers are available — hot-air welded seams require trained applicators",
    "Minimum 1:100 fall to drainage outlets is required — confirm that corrected falls achieve this across the full catchment area",
  ],
  limitations: [
    "Additional screed on an existing roof slab requires structural engineer confirmation of load capacity before application",
    "Tapered insulation systems require full warm-roof assembly design — vapour control layer and correct sequence mandatory",
    "A single drain outlet is insufficient for most flat roof areas — overflow relief must be provided at all low-fall zones",
    "PVC single-ply membranes are incompatible with bituminous substrates without a separation layer — confirm substrate with Sika before specifying",
    "Fall correction does not address blocked or undersized outlets — confirm drainage system is functional before applying screed or membrane",
  ],
  standardsNotes: [
    "AS 3740 — Waterproofing of Domestic Wet Areas — referenced for upstand heights and waterproofing requirements at roof penetrations",
    "AS/NZS 3500.3 — Plumbing and Drainage — referenced for overflow relief sizing and drainage system design on flat roofs",
    "NCC Volume One — Class 2 buildings — referenced for roof drainage performance requirements applicable to strata apartment flat roofs",
    "BCA/NCC roof drainage provisions — minimum 1:100 fall to outlets required for flat roofs — confirm current applicable provisions",
  ],
  suitableDefects: [
    "Flat roof ponding water caused by inadequate original falls — identified by post-rain inspection or hydraulic survey",
    "Blocked or undersized drainage outlets contributing to ponding — confirm outlet condition and size before fall correction",
    "Deteriorated flat roof waterproofing membrane associated with long-term ponding — replace after fall correction",
    "Flat roof substrate settlement or deflection creating low-fall zones — confirm structural cause before specifying screed overlay",
  ],
  typicalSubstrates: [
    "In-situ concrete flat roof slabs — Class 2 strata apartment building roofs and podium decks",
    "Existing failed flat roof membrane substrates — after full membrane removal and substrate preparation",
    "Precast concrete roof panels — confirm structural capacity and joint treatment before screed application",
    "Existing screeded substrates with inadequate falls — confirm adhesion and substrate condition before overlay",
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

export function PoorFallsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are flat roof fall correction systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Flat roofs on Class 2 strata apartment buildings pond water when original drainage falls are inadequate, when the structure has deflected or settled over time, or when drainage outlets have become blocked or are positioned at an incorrect level. Ponding water accelerates waterproofing membrane deterioration, increases dead load on the structure, and creates risk of catastrophic water ingress if the membrane fails. A minimum 1:100 (1%) fall to all drainage outlets is required — falls less than this result in standing water across the roof surface.
        </p>
        <p>
          Fall correction approaches include screed overlay (applying a polymer-modified lightweight screed such as Ardex K 15 over the existing slab to build up falls to outlets), tapered insulation (replacing or supplementing the insulation layer in warm-roof assemblies with factory-tapered PIR boards to create falls without screed), and outlet raising (adjusting drain outlet heights to suit the existing slab profile where falls are present but outlets are set too high). Each approach requires hydraulic analysis to confirm outlet positions, catchment areas, and pipe sizing before any works proceed.
        </p>
        <p>
          Once falls are corrected, a compatible waterproofing membrane must be applied over the full roof surface. PVC single-ply membranes such as Sika Sarnafil TS 77-15 are commonly specified for exposed flat roof applications after fall correction, as they can be hot-air welded at laps and detailed at upstands and penetrations with factory-fabricated accessories. Membrane selection must be confirmed against the substrate (screed or insulation board), the roof assembly design, and the applicable NCC provisions for the building class.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Pitched roof tiling — tile repair and replacement is not applicable to flat roof fall correction",
              "Box gutter lining — box gutter systems are separate drainage elements, not flat roof surface corrections",
              "Balcony screed — wet area screed systems are designed for domestic wet areas, not flat roof fall correction loading",
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

export function PoorFallsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — flat roof fall correction systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of flat roof fall correction products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Min thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Warm-roof suited</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600">{row.minThickness}</td>
                  <td className="px-4 py-3">
                    {row.suitedForWarmRoof === "Yes" ? (
                      <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold bg-green-50 text-green-700">Yes</span>
                    ) : (
                      <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-500">N/A</span>
                    )}
                  </td>
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
            <p className="mt-1 text-sm text-slate-500">Flat roof fall correction system equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Ardex</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Kingspan</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Blucher</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>Sika</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.ardex, row.kingspan, row.blucher, row.sika].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Structural loading and outlet sizing</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Additional screed loading on the existing structure must be confirmed by a structural engineer before application — do not apply fall correction screed without load confirmation",
            "Minimum 1:100 (1%) fall to drainage outlets is required — confirm outlet positions and existing slab levels before screed application to ensure the required fall is achievable",
            "Overflow relief must be installed at any low-fall area — do not rely on a single drain as the only drainage point for any catchment area on the roof",
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
