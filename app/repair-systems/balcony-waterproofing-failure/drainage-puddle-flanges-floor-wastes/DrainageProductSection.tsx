"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "PVC"
  | "Stainless"
  | "PVC-Stainless"
  | "Adjustable-height"
  | "Fixed-height"
  | "Torch-on-compatible"
  | "Liquid-applied-compatible"
  | "Standard-balcony"
  | "Podium-roof-deck"
  | "Tile-insert"
  | "Sump-type";

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
    fullLabel: "Hydraloc / Waterproofing Direct",
    brandUrl: "https://www.wpdgroup.com.au",
    tdsUrl: "https://www.wpdgroup.com.au",
    accentColor: "#0369a1",
    name: "Hydraloc PVC Puddle Flange",
    descriptionLine: "PVC puddle flange — 100mm round outlet — compatible with liquid-applied PU, hybrid, and cementitious membrane systems — standard specification for balcony and terrace waterproofing remediation",
    productType: "PVC puddle flange — liquid-applied membrane systems",
    filterTags: ["PVC", "Fixed-height", "Liquid-applied-compatible", "Standard-balcony"],
    techChips: [
      { label: "PVC construction", cls: "bg-sky-100 text-sky-800" },
      { label: "100mm round outlet", cls: "bg-slate-100 text-slate-700" },
      { label: "Liquid-applied compatible", cls: "bg-green-100 text-green-800" },
      { label: "Fixed height", cls: "bg-amber-50 text-amber-700" },
      { label: "Standard balcony floor waste", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: `Hydraloc PVC puddle flanges are a standard specification for balcony and terrace waterproofing remediation in Australia, particularly where liquid-applied polyurethane, hybrid, or cementitious waterproofing membranes are being applied. The flat PVC flange body is set into the screed at the low point of the drainage fall, and the liquid membrane is applied directly over the flange surface and lapped into the drain opening, creating a continuous, bonded membrane-to-drain junction.

PVC puddle flanges are compatible with the majority of liquid-applied membrane systems used in Australian strata remediation — confirm chemical compatibility with the specific membrane product being applied before specifying. The flange is set at the correct height relative to the finished screed surface before priming and membrane application. The membrane manufacturer's specified overlap dimension onto the flange (typically 50–75mm) must be maintained to achieve a compliant junction detail.

The 100mm round outlet is the standard sizing for single balcony floor wastes. A grate or tile insert cover is fitted over the drain body after tile installation. Confirm grate compatibility and tile insert dimensions with the supplier before specifying.`,
    technicalProperties: [
      "PVC construction — compatible with liquid-applied PU, hybrid, and cementitious waterproofing membranes",
      "100mm round outlet — standard sizing for single balcony floor waste",
      "Flat flange body — membrane laps over flange surface and bonds into drain opening",
      "Set into screed at correct height before membrane application",
      "Internal and external balcony and terrace applications",
      "Available in multiple outlet configurations — confirm stocking with supplier",
    ],
    limitations: [
      "Not suitable for torch-on sheet membrane systems — torch-on sheet requires stainless or brass flange for heat bonding",
      "Height must be set correctly before screed cures — fixed-height flange requires accurate screed depth control",
      "Confirm membrane overlap dimension and bonding method with membrane manufacturer before applying",
      "Confirm chemical compatibility between PVC flange and specific membrane product before specifying",
      "Confirm current product availability with supplier before specifying",
    ],
    procurementSources: [
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "Various — confirm with supplier",
    brandUrl: "",
    accentColor: "#475569",
    name: "Stainless Steel Square Puddle Flange — Tile Insert",
    descriptionLine: "Stainless steel square puddle flange with tile insert grate — 100mm or 80mm outlet — compatible with torch-on sheet and liquid-applied membrane systems — architectural finish for tiled balcony and terrace applications",
    productType: "Stainless steel puddle flange — tile insert — torch-on and liquid-applied compatible",
    filterTags: ["Stainless", "Fixed-height", "Torch-on-compatible", "Liquid-applied-compatible", "Standard-balcony", "Tile-insert"],
    techChips: [
      { label: "Grade 304 / 316 stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "Square — tile insert grate", cls: "bg-slate-100 text-slate-700" },
      { label: "Torch-on compatible", cls: "bg-green-100 text-green-800" },
      { label: "Liquid-applied compatible", cls: "bg-green-50 text-green-700" },
      { label: "100mm / 80mm outlet", cls: "bg-slate-100 text-slate-700" },
      { label: "Grade 316 for coastal", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `Stainless steel square puddle flanges with tile insert grates are the standard architectural drain specification for tiled balcony and terrace applications in Australian Class 2 strata buildings. The stainless body and flat flange allow torch-on modified bitumen sheet membranes to be heat-bonded directly to the flange surface, and are also compatible with liquid-applied PU and hybrid membranes. The tile insert grate allows a cut tile to be placed in the centre of the grate, creating a near-invisible drain finish in the tiled floor.

The stainless puddle flange is set into the screed at the low point of the drainage fall. For torch-on sheet systems, the base sheet and cap sheet are lapped over the stainless flange and torch-bonded to create the waterproof junction. For liquid-applied systems, the membrane is applied over the flange surface with the specified overlap. The tile insert cover is installed after tile fixing is complete.

Stainless steel construction provides corrosion resistance appropriate for permanently wet external balcony conditions. Grade 316 stainless is preferred for coastal and marine-exposed locations. Confirm grade with the supplier for the specific project location and exposure level.`,
    technicalProperties: [
      "Grade 304 or 316 stainless steel construction — confirm grade for exposure level and location",
      "Square body with tile insert grate — near-invisible finish in tiled floor",
      "Compatible with torch-on sheet membrane systems — heat-bonded lap to flange surface",
      "Compatible with liquid-applied PU, hybrid, and cementitious membrane systems",
      "100mm or 80mm outlet — confirm sizing against drainage design",
      "External balcony and terrace applications — corrosion resistant in permanently wet conditions",
      "Grade 316 preferred for coastal locations",
    ],
    limitations: [
      "Tile insert grate requires accurate tile cutting — confirm tile insert dimensions match tile format before ordering",
      "Height setting is critical — confirm flange height against screed depth and finished tile level before setting",
      "Confirm torch-on bonding method with membrane manufacturer — some systems require additional sealant at the flange perimeter",
      "Grade 304 is not recommended for marine or coastal exposure — specify Grade 316 where chloride exposure is a risk",
      "Confirm current product availability, sizing, and grate options with supplier before specifying",
    ],
    procurementSources: [
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "MJS Floorcoverings", url: "https://mjsfloorcoverings.com.au" },
    ],
  },
  {
    fullLabel: "Schlüter-Systems Australia",
    brandUrl: "https://www.schlueter.com.au",
    tdsUrl: "https://www.schlueter.com.au/products/drains/kerdi-drain",
    accentColor: "#16a34a",
    name: "Schlüter KERDI-DRAIN",
    descriptionLine: "Adjustable-height stainless steel puddle flange and drain body — tile insert grate — compatible with Schlüter KERDI fabric-reinforced membrane and liquid-applied systems — adjustable height simplifies screed depth management in remediation",
    productType: "Adjustable-height stainless drain — KERDI membrane and liquid-applied compatible",
    filterTags: ["Stainless", "Adjustable-height", "Liquid-applied-compatible", "Standard-balcony", "Tile-insert"],
    techChips: [
      { label: "Adjustable height", cls: "bg-green-100 text-green-800" },
      { label: "Stainless steel", cls: "bg-slate-100 text-slate-700" },
      { label: "Tile insert grate", cls: "bg-slate-100 text-slate-700" },
      { label: "KERDI membrane compatible", cls: "bg-green-50 text-green-700" },
      { label: "Modular system", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription: `The Schlüter KERDI-DRAIN is an adjustable-height stainless steel point drain system designed to integrate with the Schlüter KERDI bonded waterproofing membrane system, and is also compatible with liquid-applied waterproofing systems when the membrane manufacturer confirms compatibility. The adjustable-height drain body allows the drain to be set to the correct finished floor level after the screed has been applied and the membrane installed, eliminating the height-setting accuracy required with fixed-height flanges. This is a significant advantage in remediation projects where existing screed surfaces may be uneven.

The KERDI-DRAIN is available with a stainless steel tile insert grate or a standard stainless grate. The KERDI fabric membrane (or liquid-applied membrane) is lapped and bonded into the drain body at the flange collar, creating a continuous waterproof junction. The adjustable upper section allows the grate to be brought to the correct finished tile height after tiles are laid.

KERDI-DRAIN is widely used in both internal wet area and external balcony applications in Australia. For external balcony remediation on Class 2 strata, confirm with the Schlüter technical representative that the selected KERDI-DRAIN variant is rated for external exposure and is compatible with the membrane system being applied.`,
    technicalProperties: [
      "Adjustable-height stainless steel drain body — height adjustable after screed application",
      "Tile insert grate or standard stainless grate — confirm grate format and tile insert sizing",
      "Compatible with Schlüter KERDI fabric-reinforced waterproofing membrane system",
      "Compatible with liquid-applied waterproofing systems — confirm compatibility with membrane manufacturer",
      "100mm outlet — confirm sizing against drainage design",
      "Internal and external applications — confirm external exposure rating with Schlüter technical",
      "Modular system — multiple grate formats and drain body configurations available",
    ],
    limitations: [
      "Primary design intent is integration with Schlüter KERDI membrane — confirm compatibility with non-KERDI liquid-applied systems with membrane manufacturer before specifying",
      "Not confirmed for use with torch-on modified bitumen sheet membranes without specific detailing advice from Schlüter technical",
      "Adjustable height range must be confirmed against the proposed screed depth and tile system build-up before specifying",
      "Confirm current grate sizing, tile insert dimensions, and product availability with Schlüter Australia before specifying",
      "Confirm external exposure rating with Schlüter Australia for balcony applications",
    ],
    procurementSources: [
      { name: "Schlüter-Systems Australia", url: "https://www.schlueter.com.au" },
      { name: "Confirm trade distributor with Schlüter Australia", url: "https://www.schlueter.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "Alwitra (confirm Australian distributor)",
    brandUrl: "https://www.alwitra.de/en",
    accentColor: "#f97316",
    name: "Alwitra Evalon Drain / Turbo Drain",
    descriptionLine: "Adjustable-height point drain — PVC or stainless — compatible with torch-on and cold-applied sheet membrane systems — podium slab, roof, and balcony drainage",
    productType: "Adjustable-height drain — torch-on and sheet membrane compatible — podium and roof",
    filterTags: ["PVC-Stainless", "Adjustable-height", "Torch-on-compatible", "Podium-roof-deck"],
    techChips: [
      { label: "Adjustable height", cls: "bg-orange-100 text-orange-800" },
      { label: "PVC or stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "Torch-on and sheet compatible", cls: "bg-green-50 text-green-700" },
      { label: "Controlled-flow outlet", cls: "bg-sky-50 text-sky-700" },
      { label: "Podium / roof / large terrace", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `Alwitra manufactures adjustable-height point drains designed for use with modified bitumen sheet membrane systems on flat roofs, podium slabs, and large balcony and terrace decks. The Alwitra Turbo Drain and Evalon Drain systems feature an adjustable-height drain body with a bitumen sheet membrane-compatible flange and a controlled-flow outlet designed to regulate stormwater discharge rates in large roof and podium applications. The drain body is available in PVC or stainless steel configurations.

For balcony waterproofing remediation on Class 2 strata, the Alwitra drain system is most commonly specified on larger podium slabs, communal terraces, and roof decks where torch-on or cold-applied sheet membrane systems are being used, and where controlled outlet flow is specified to manage stormwater discharge into the building drainage system. Confirm with the Alwitra Australian distributor which product variant is appropriate for the project membrane system and drainage design before specifying.`,
    technicalProperties: [
      "Adjustable-height drain body — PVC or stainless steel construction",
      "Compatible with torch-on and cold-applied sheet membrane systems",
      "Controlled-flow outlet option available — manages stormwater discharge rate",
      "Suitable for roof, podium slab, and large balcony and terrace applications",
      "Available in 100mm outlet — confirm sizing against drainage design",
    ],
    limitations: [
      "Primarily designed for sheet membrane systems — confirm compatibility with liquid-applied membranes before specifying",
      "Confirm Australian availability and current product range with Alwitra Australian distributor before specifying",
      "Controlled-flow outlet is not appropriate for standard balcony applications where unrestricted drainage is required — confirm drainage design intent before specifying",
      "Confirm current product name, specification, and AS compliance with distributor before specifying",
    ],
    procurementSources: [
      { name: "Alwitra — confirm Australian distributor via alwitra.de/en", url: "https://www.alwitra.de/en" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Various — confirm with supplier",
    brandUrl: "",
    accentColor: "#64748b",
    name: "Sump Outlet — Raised Deck and Podium Slab",
    descriptionLine: "Sump-type drainage outlet for raised access floor and podium slab applications — not a standard puddle flange — confirm requirement against project drainage design before specifying",
    productType: "Sump-type drainage outlet — podium and raised deck applications only",
    filterTags: ["Stainless", "Podium-roof-deck", "Sump-type"],
    techChips: [
      { label: "Sump-type outlet", cls: "bg-slate-200 text-slate-800" },
      { label: "Podium / raised deck only", cls: "bg-amber-100 text-amber-800" },
      { label: "Not a standard balcony drain", cls: "bg-red-50 text-red-700" },
      { label: "Hydraulic engineer required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription: `Sump outlets are recessed, large-format drainage components used on podium slabs, raised access floor systems, and large external deck areas where the drainage volume, drainage geometry, or structural slab configuration requires a purpose-designed drainage sump rather than a standard puddle flange floor waste. The sump body is recessed into the structural slab, and the membrane is lapped into the sump body rather than bonded to a surface-mounted puddle flange.

This product card is included to distinguish sump outlets from standard puddle flanges and to flag that the correct drain type must be confirmed against the project drainage design before specifying. A standard puddle flange is not appropriate for podium slab or raised deck applications where a sump is required — and conversely, specifying a sump-type outlet on a standard residential balcony is unnecessary and adds complexity without benefit.

For standard residential balcony applications (single balcony, single floor waste, liquid-applied or sheet membrane system), specify a PVC or stainless puddle flange as listed in Cards 1–4 above. For podium slabs, large communal terraces, or raised access floor systems, confirm the correct drain type with the project waterproofing consultant or hydraulic engineer before specifying.`,
    technicalProperties: [
      "Recessed sump body — stainless steel or PVC — set into structural slab",
      "Large-format drainage capacity — suited to podium slabs and large deck areas",
      "Compatible with sheet membrane systems where sump detailing is specified",
      "Adjustable height in some configurations — confirm with supplier",
      "Not a standard balcony puddle flange — different installation method and structural requirements",
    ],
    limitations: [
      "Requires structural slab penetration for sump body — not suitable for standard balcony remediation without engineering confirmation",
      "Installation is significantly more complex than a standard puddle flange — confirm with hydraulic engineer and structural engineer before specifying",
      "Confirm product range, sizing, and compatibility with the membrane system being specified with the supplier",
      "Do not substitute a sump outlet for a standard puddle flange on residential balcony applications without specific design direction",
    ],
    procurementSources: [
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Confirm with hydraulic engineer or waterproofing consultant for project-specific specification", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "PVC", label: "PVC flange" },
  { id: "Stainless", label: "Stainless steel" },
  { id: "PVC-Stainless", label: "PVC or stainless" },
  { id: "Adjustable-height", label: "Adjustable height" },
  { id: "Fixed-height", label: "Fixed height" },
  { id: "Torch-on-compatible", label: "Torch-on sheet compatible" },
  { id: "Liquid-applied-compatible", label: "Liquid-applied compatible" },
  { id: "Standard-balcony", label: "Standard balcony / terrace" },
  { id: "Podium-roof-deck", label: "Podium / roof deck" },
  { id: "Tile-insert", label: "Tile insert grate" },
  { id: "Sump-type", label: "Sump-type outlet" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  membraneCompatibility: string;
  heightAdjustable: string;
  primaryApplication: string;
  keyRestriction: string;
}[] = [
  {
    product: "PVC Puddle Flange",
    brand: "Hydraloc / various",
    material: "PVC",
    membraneCompatibility: "Liquid-applied PU, hybrid, cementitious",
    heightAdjustable: "No — fixed height",
    primaryApplication: "Standard balcony floor waste — liquid-applied systems",
    keyRestriction: "Not suitable for torch-on sheet systems",
  },
  {
    product: "Stainless Square — Tile Insert",
    brand: "Various",
    material: "Stainless 304 / 316",
    membraneCompatibility: "Torch-on sheet, liquid-applied",
    heightAdjustable: "No — fixed height",
    primaryApplication: "Tiled balcony and terrace — architectural finish",
    keyRestriction: "Grade 316 required for coastal exposure — tile insert sizing must match tile format",
  },
  {
    product: "Schlüter KERDI-DRAIN",
    brand: "Schlüter-Systems",
    material: "Stainless steel",
    membraneCompatibility: "KERDI membrane — liquid-applied (confirm)",
    heightAdjustable: "Yes — adjustable after screed",
    primaryApplication: "Internal wet areas and external balconies — tiled finish",
    keyRestriction: "Primary design intent is KERDI membrane system — confirm compatibility with other liquid-applied systems",
  },
  {
    product: "Alwitra Turbo / Evalon Drain",
    brand: "Alwitra",
    material: "PVC / stainless",
    membraneCompatibility: "Torch-on and cold-applied sheet",
    heightAdjustable: "Yes — adjustable",
    primaryApplication: "Podium slabs, roof decks, large terraces — sheet membrane systems",
    keyRestriction: "Primarily for sheet membrane and large-area applications — confirm Australian availability",
  },
  {
    product: "Sump Outlet — Podium / Raised Deck",
    brand: "Various",
    material: "Stainless steel",
    membraneCompatibility: "Sheet membrane (sump detail)",
    heightAdjustable: "Confirm with supplier",
    primaryApplication: "Podium slab and raised access floor — not standard balcony",
    keyRestriction: "Not suitable for standard residential balcony — requires structural slab penetration and hydraulic engineer confirmation",
  },
];

const TECH_INFO = {
  whenToReplace: [
    "The existing drain body is corroded, cracked, or structurally compromised",
    "The existing flange is not compatible with the new membrane system being applied — e.g., existing PVC flange and new torch-on sheet system requiring stainless",
    "The existing drain is set at the wrong height relative to the proposed screed and tile system",
    "The existing drain has no puddle flange — or has a flange that cannot be effectively integrated with the new membrane",
    "The existing drain location is incorrect relative to the proposed drainage falls",
    "The strata or building manager requires a full upgrade of drainage components as part of the remediation scope",
  ],
  materialSelection: [
    "PVC puddle flanges — standard for liquid-applied PU, hybrid, and cementitious membrane systems — low cost — membrane bonds directly to PVC flange surface — confirm chemical compatibility with the specific membrane product",
    "Stainless steel puddle flanges — appropriate for torch-on sheet membrane systems and where longevity and corrosion resistance are required — torch-on sheet is heat-bonded to stainless flange — also used with liquid-applied membranes where stainless is specified or preferred",
    "Brass puddle flanges — traditional specification in older Australian strata buildings — still used in some heritage and high-specification projects — confirm membrane compatibility before specifying brass with liquid-applied systems",
    "Do not mix incompatible materials — galvanic corrosion can occur where dissimilar metals (brass flange, stainless grate, steel fixings) are in contact in a wet environment — confirm material compatibility across the full drain assembly",
  ],
  installationSequence: [
    "1 — Remove existing tiles, adhesive, and existing membrane back to concrete substrate",
    "2 — Assess existing floor waste — replace or retain based on condition, compatibility, and height assessment",
    "3 — Establish correct falls in polymer-modified or self-levelling screed — drain positioned at the low point of the drainage fall",
    "4 — Set puddle flange at correct height relative to finished screed surface",
    "5 — Apply primer to screed substrate including puddle flange perimeter",
    "6 — Apply waterproofing membrane — lap onto puddle flange per manufacturer's requirements — use sealing collar, bonding agent, or clamping ring as required by the specific flange and membrane combination",
    "7 — Apply tile adhesive over cured membrane",
    "8 — Fix tiles — confirm tile fall continues to the drain grate at the centre of the floor waste",
  ],
  heightSetting: [
    "Top of puddle flange should be set flush with or slightly below the waterproofing membrane surface — not above it",
    "For tiled finishes, drain grate height must be set flush with, or a maximum 5mm below, the finished tile surface",
    "Adjustable-height drain systems allow drain body height to be adjusted after the screed has been laid — preferred approach for remediation where existing screed surface may be uneven",
    "Fixed-height flanges require correct screed depth and fall to be established before the flange is set — height errors cannot be corrected after screed placement",
  ],
  standards: [
    "AS/NZS 3500.3 — Stormwater drainage — governs design, sizing, and installation of floor wastes and stormwater drainage outlets on balconies — confirm drain sizing against the drainage design for the floor area being drained",
    "AS 3740:2021 — Waterproofing of domestic wet areas — governs membrane continuity, falls, and junction detailing at floor wastes — floor waste integration must comply with this standard on Class 2 strata balcony applications",
    "Confirm that the specified floor waste and puddle flange comply with both standards — and confirm drain sizing with the hydraulic engineer where a drainage design has been prepared",
  ],
  typicalApplications: [
    "Balcony waterproofing remediation — replacement of existing floor waste as part of full membrane replacement scope",
    "Tiled balcony and terrace drainage — stainless square flange with tile insert grate as architectural drain specification",
    "Torch-on sheet membrane systems — stainless puddle flange heat-bonded to modified bitumen base and cap sheets at drain junction",
    "Liquid-applied PU and hybrid membrane systems — PVC or stainless puddle flange with membrane lapped and bonded over flange surface",
    "Adjustable-height drain installation in remediation where existing screed surface is uneven or screed depth is uncertain",
    "Podium slab and roof deck drainage — Alwitra or sump-type configurations for communal terrace and large deck areas",
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

function CollapsibleSources({ sources }: { sources: { name: string; url: string }[] }) {
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
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
              >
                {src.name}
                <ExternalLink size={9} className="text-slate-300" />
              </a>
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS and membrane manufacturer before specifying or applying.
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
      <p
        className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}
      >
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

export function DrainageIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are puddle flanges and floor wastes — balcony waterproofing?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A puddle flange (also called a puddle collar, floor waste flange, or membrane clamp flange) is the
          membrane-integration fitting installed at every balcony and terrace floor waste outlet. The flange consists
          of a flat horizontal plate — PVC, stainless steel, or brass — that the waterproofing membrane is dressed
          over, bonded to, and mechanically clamped or heat-welded around, creating a continuous waterproof junction
          between the membrane field and the drainage point. Without correct puddle flange integration, the floor
          waste is invariably the first point of waterproofing failure on a balcony.
        </p>
        {expanded && (
          <>
            <p>
              In balcony waterproofing remediation, puddle flanges and floor wastes are almost always replaced as
              part of the waterproofing system strip-out and reinstatement — the existing waste is removed, the pipe
              stub is prepared, the new flange is set to the correct finished floor level to allow for screed and
              tile build-up, the membrane is dressed over the flange flap, and the strainer or grate is installed
              over the membrane to complete the assembly. Height-adjustable flanges — such as the Schlüter
              KERDI-DRAIN system — allow the outlet height to be set precisely before the membrane is applied,
              which is critical when tile build-up thickness varies across a project.
            </p>
            <p>
              Floor waste selection must be coordinated with both the waterproofing membrane type (torch-on
              membranes require torch-compatible PVC or stainless flanges; liquid-applied membranes require a
              bondable flange face) and the hydraulic drainage design — the waste size, outlet diameter, and grate
              open area must be sufficient to drain the balcony area in a code-compliant storm event. AS/NZS 3500.3
              governs sanitary plumbing and drainage, and hydraulic engineer input is required on any project where
              drainage capacity, gradient, or outlet size is in question.
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

/* ── TechCard ── */

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

/* ── Main export ── */

export function DrainageProductSection() {
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
              Membrane integration, material selection, height setting, installation sequence, AS/NZS 3500 and AS 3740 requirements
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
              <TechCard icon={<CheckCircle size={15} />} title="When to Replace the Floor Waste" items={TECH_INFO.whenToReplace} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Material Selection" items={TECH_INFO.materialSelection} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Correct Installation Sequence" items={TECH_INFO.installationSequence} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="Height Setting Requirements" items={TECH_INFO.heightSetting} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="AS/NZS 3500.3 and AS 3740 Requirements" items={TECH_INFO.standards} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">5 products — 3 brands — PVC, stainless steel, and adjustable-height puddle flange and floor waste systems — scroll to view all</p>
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
                      {product.brandUrl && (
                        <a
                          href={product.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                    {product.techChips.filter((c) => c.label.toLowerCase().includes("warranty")).map((chip) => (
                      <span key={chip.label} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips.filter((c) => !c.label.toLowerCase().includes("warranty"))}
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

      {/* ── System Comparison Table ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Puddle flange and floor waste system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of puddle flange and drain types. Confirm all product selections against the current manufacturer TDS and membrane manufacturer before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Membrane compatibility</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Height adjustable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.membraneCompatibility}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.heightAdjustable.startsWith("Yes") ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> {row.heightAdjustable}
                      </span>
                    ) : row.heightAdjustable.startsWith("No") ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-500">
                        <XCircle size={11} /> {row.heightAdjustable}
                      </span>
                    ) : (
                      <span className="text-slate-500">{row.heightAdjustable}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryApplication}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Critical callout boxes ── */}
      <div className="space-y-4">
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-amber-800">Membrane Compatibility Is Non-Negotiable</p>
          <p className="text-sm leading-7 text-amber-900">
            The puddle flange material and design must be compatible with the waterproofing membrane system being applied. Liquid-applied PU and hybrid membranes bond directly to PVC or stainless puddle flanges using the membrane material itself or a compatible sealant. Torch-on sheet membranes use heat-bonded overlaps to stainless or brass flanges. Cold-applied sheet membranes use adhesive bonding or clamping rings. Specifying the wrong puddle flange type for the membrane system — or failing to integrate the membrane correctly at the flange — produces a detail that will fail regardless of the quality of the membrane application across the field.
          </p>
        </div>
        <div className="rounded-xl border-l-4 border-red-500 bg-red-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-red-800">Height Setting Is a Common Failure Point</p>
          <p className="text-sm leading-7 text-red-900">
            The puddle flange must be set at the correct height relative to the finished screed and tile surface. If the flange is set too high, surface water cannot drain into it. If it is set too low, the membrane laps into the drain body and the transition between membrane and drain is not properly sealed. Adjustable-height puddle flanges — which allow the drain body height to be set during installation and fine-tuned during screed application — significantly reduce the risk of height-setting errors. Fixed-height flanges require correct screed depth and fall to be established before the flange is set.
          </p>
        </div>
        <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-sky-800">Falls Must Be to the Drain — AS 3740 Requirement</p>
          <p className="text-sm leading-7 text-sky-900">
            AS 3740:2021 requires a minimum 1:100 fall to floor waste across the entire balcony or wet area floor. This fall must be established in the screed before the membrane and tile are applied. A correctly positioned puddle flange at the low point of the drainage fall is a prerequisite for a compliant system. Confirm drainage design and fall direction before specifying or positioning floor waste locations.
          </p>
        </div>
      </div>
    </>
  );
}
