"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Pre-formed"
  | "Site-formed"
  | "PVC"
  | "Stainless-steel"
  | "EPDM-rubber"
  | "ARDEX-system"
  | "Mapei-system"
  | "Torch-on-compatible"
  | "Liquid-applied-compatible"
  | "Standard-diameter"
  | "Non-standard-diameter";

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
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#0369a1",
    name: "ARDEX Pre-formed PVC Pipe Collar",
    descriptionLine: "Pre-formed PVC flanged pipe collar — standard pipe diameters — compatible with ARDEX liquid-applied membrane systems — membrane laps over collar flange — external balcony and terrace penetration sealing",
    productType: "Pre-formed PVC pipe collar — ARDEX liquid-applied membrane systems",
    filterTags: ["Pre-formed", "PVC", "ARDEX-system", "Liquid-applied-compatible", "Standard-diameter"],
    techChips: [
      { label: "Pre-formed PVC", cls: "bg-sky-100 text-sky-800" },
      { label: "Standard pipe diameters", cls: "bg-slate-100 text-slate-700" },
      { label: "ARDEX membrane compatible", cls: "bg-green-100 text-green-800" },
      { label: "Liquid-applied systems", cls: "bg-green-50 text-green-700" },
      { label: "Flanged — membrane lap", cls: "bg-slate-100 text-slate-700" },
      { label: "Hold point", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `ARDEX pre-formed PVC pipe collars are factory-manufactured flanged collars for sealing standard pipe penetrations through the waterproofing membrane on balconies and terraces. The PVC collar is installed over the pipe before membrane application — the flat PVC flange provides a bonding surface for the ARDEX liquid-applied membrane, which is lapped onto and over the flange to create a continuous watertight seal at the penetration.

Available in a range of sizes to suit standard nominal pipe diameters. Confirm the outside diameter of the pipe before ordering — the collar must fit the pipe correctly. PVC collar material is compatible with ARDEX liquid-applied PU, hybrid, and cementitious membrane systems. Confirm the specific membrane and collar combination with ARDEX Australia or the current ARDEX system specification before applying.

The collar flange must be set at the correct height relative to the membrane application plane — the membrane laps up and over the flange, not below it. Prime the flange perimeter per the ARDEX primer specification before applying membrane. The membrane overlap onto the collar flange must meet the minimum overlap dimension specified by ARDEX — typically minimum 50mm onto the flange. Inspect before tiling — this is a hold point.`,
    technicalProperties: [
      "Pre-formed PVC flanged collar — factory-manufactured — consistent flange geometry",
      "Available in standard nominal pipe diameter sizes — confirm sizing against pipe OD before ordering",
      "Compatible with ARDEX liquid-applied PU, hybrid, and cementitious membrane systems",
      "Flat flange provides membrane bonding surface — membrane laps onto and over the flange",
      "External balcony and terrace penetration sealing",
      "Primer required on flange perimeter before membrane application",
    ],
    limitations: [
      "Not for torch-on sheet membrane systems — torch-on requires stainless or brass collar for heat bonding",
      "Confirm pipe OD against available collar sizes before ordering — do not assume standard nominal size matches actual pipe OD on remediation projects",
      "Flange height must be set correctly — if the flange sits below the membrane plane, the lap detail will not seal correctly",
      "Confirm minimum membrane overlap dimension onto the collar flange with ARDEX technical before applying",
      "Confirm current product range, available sizes, and pricing with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#16a34a",
    name: "Mapei Pre-formed Pipe Collar",
    descriptionLine: "Pre-formed PVC flanged pipe collar — standard pipe diameters — compatible with Mapei liquid-applied membrane systems — membrane laps over collar flange — external balcony and terrace penetration sealing",
    productType: "Pre-formed PVC pipe collar — Mapei liquid-applied membrane systems",
    filterTags: ["Pre-formed", "PVC", "Mapei-system", "Liquid-applied-compatible", "Standard-diameter"],
    techChips: [
      { label: "Pre-formed PVC", cls: "bg-green-100 text-green-800" },
      { label: "Standard pipe diameters", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei membrane compatible", cls: "bg-green-50 text-green-700" },
      { label: "Liquid-applied systems", cls: "bg-slate-100 text-slate-700" },
      { label: "Flanged — membrane lap", cls: "bg-slate-100 text-slate-700" },
      { label: "Hold point", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `Mapei pre-formed pipe collars are factory-manufactured PVC flanged collars for sealing standard pipe penetrations through the waterproofing membrane within Mapei waterproofing system specifications. Used with Mapei liquid-applied membrane systems including Mapelastic, Mapelastic Foundation, and Mapelastic AquaDefense. The PVC collar is installed over the pipe before membrane application — the Mapei membrane is lapped over the collar flange to maintain continuity of the waterproofing system at the penetration.

Confirm the available size range and specific collar product with Mapei Australia before specifying — Mapei collar products are specified within the Mapei system and must be confirmed against the current Mapei system specification for the membrane being applied. Collar flange height, primer requirements, and minimum membrane overlap dimensions are the same hold point requirements as ARDEX collars — confirm all with Mapei technical before applying.`,
    technicalProperties: [
      "Pre-formed PVC flanged collar — factory-manufactured",
      "Compatible with Mapei liquid-applied membrane systems — confirm specific membrane with Mapei technical",
      "Available in standard nominal pipe diameter sizes — confirm sizing against actual pipe OD before ordering",
      "Primer required on flange perimeter before membrane application — confirm primer type with Mapei technical",
      "External balcony and terrace penetration sealing",
    ],
    limitations: [
      "Confirm pipe OD against available collar sizes before ordering",
      "Confirm Mapei membrane compatibility with current Mapei system specification before applying",
      "Not for torch-on sheet membrane systems",
      "Flange height must be correctly set relative to the membrane application plane",
      "Confirm current product range, available sizes, and pricing with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Various — confirm with supplier",
    brandUrl: "",
    accentColor: "#475569",
    name: "Stainless Steel Pipe Collar — Torch-on Compatible",
    descriptionLine: "Pre-formed stainless steel flanged pipe collar — compatible with torch-on sheet and liquid-applied membrane systems — Grade 304 or 316 — external balcony and terrace penetration sealing",
    productType: "Pre-formed stainless steel pipe collar — torch-on and liquid-applied compatible",
    filterTags: ["Pre-formed", "Stainless-steel", "Torch-on-compatible", "Liquid-applied-compatible", "Standard-diameter"],
    techChips: [
      { label: "Grade 304 / 316 stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "Torch-on compatible", cls: "bg-green-100 text-green-800" },
      { label: "Liquid-applied compatible", cls: "bg-green-50 text-green-700" },
      { label: "Standard pipe diameters", cls: "bg-slate-100 text-slate-700" },
      { label: "Grade 316 for coastal", cls: "bg-amber-50 text-amber-700" },
      { label: "Flanged — heat bonded", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: `Pre-formed stainless steel pipe collars are required where torch-on modified bitumen sheet membranes are being applied — the sheet membrane must be heat-bonded to a metal flange and cannot be torch-bonded to a PVC collar. The stainless steel collar is installed over the pipe before membrane application — the torch-on sheet is heat-bonded to the stainless flange to create the watertight junction at the penetration.

Stainless steel collars are also compatible with liquid-applied PU and hybrid membrane systems where stainless is specified or preferred. Grade 316 stainless is recommended for coastal and marine-exposed locations where chloride exposure is a risk. Grade 304 is appropriate for standard inland residential balcony applications.

Confirm the specific collar product, available sizes, and membrane bonding method with both the collar supplier and the membrane manufacturer before specifying. On torch-on sheet systems, the heat-bonding method at the collar flange is a critical detail — confirm the bonding method with the torch-on membrane manufacturer before applying.`,
    technicalProperties: [
      "Pre-formed stainless steel flanged collar — Grade 304 or 316 — confirm grade for exposure level",
      "Compatible with torch-on modified bitumen sheet membrane systems — heat-bonded to stainless flange",
      "Compatible with liquid-applied PU and hybrid membrane systems",
      "Available in standard nominal pipe diameter sizes — confirm sizing against actual pipe OD before ordering",
      "Grade 316 recommended for coastal locations",
    ],
    limitations: [
      "Confirm pipe OD against available collar sizes before ordering",
      "Confirm heat-bonding method for torch-on sheet systems with membrane manufacturer — specific detailing is required at the collar flange for torch-on systems",
      "Confirm liquid-applied membrane bonding method with membrane manufacturer where stainless collar is used with a liquid-applied system",
      "Confirm current product availability, sizes, and Grade 304 vs 316 stocking with supplier before specifying",
    ],
    procurementSources: [
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "Dektite / various — confirm with supplier",
    brandUrl: "",
    accentColor: "#f97316",
    name: "EPDM Rubber Flexible Pipe Collar (Dektite)",
    descriptionLine: "Pre-formed EPDM rubber flexible pipe collar — adjustable to a range of pipe diameters — round and square pipe sections — confirm membrane compatibility before applying — roof, terrace, and balcony penetration sealing",
    productType: "Pre-formed EPDM rubber flexible collar — round and square pipe — confirm membrane compatibility",
    filterTags: ["Pre-formed", "EPDM-rubber", "Liquid-applied-compatible", "Standard-diameter", "Non-standard-diameter"],
    techChips: [
      { label: "EPDM rubber — flexible", cls: "bg-orange-100 text-orange-800" },
      { label: "Round and square pipe", cls: "bg-slate-100 text-slate-700" },
      { label: "Range of diameters", cls: "bg-slate-100 text-slate-700" },
      { label: "Compression fit to pipe", cls: "bg-sky-50 text-sky-700" },
      { label: "Confirm membrane compatibility", cls: "bg-amber-100 text-amber-800" },
      { label: "Roof / terrace / balcony", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: `EPDM rubber flexible pipe collars (commonly available under the Dektite brand and similar) are pre-formed flexible collars that can accommodate a range of pipe diameters and both round and square pipe sections. The flexible EPDM body stretches over the pipe and compresses to form a seal — they do not require heat or adhesive to seal to the pipe itself, relying on compression fit. A separate sealant or membrane lap is required at the base flange to integrate the collar with the waterproofing membrane.

On balconies and terraces, EPDM flexible collars are used where a standard rigid PVC or stainless collar does not fit the pipe — for example, on square downpipes, non-standard pipe diameters, or pipes with irregular cross-sections. They are also used on roof and terrace applications where the penetration geometry makes a rigid pre-formed collar impractical.

Membrane compatibility must be confirmed before applying — the collar base flange must be bonded to or lapped by the waterproofing membrane, and not all membrane systems bond adequately to EPDM rubber. Confirm the bonding method with both the collar supplier and the membrane manufacturer before applying.`,
    technicalProperties: [
      "Pre-formed EPDM rubber flexible collar — accommodates a range of pipe diameters",
      "Suitable for round and square pipe sections",
      "Compression fit to pipe — no heat or adhesive required to seal to the pipe",
      "Membrane bonding at the base flange required — confirm bonding method with membrane manufacturer",
      "External balcony, terrace, and roof penetration sealing",
    ],
    limitations: [
      "Membrane compatibility at the base flange must be confirmed with both the collar supplier and the membrane manufacturer — EPDM is not compatible with all liquid-applied membranes without an intermediate bonding primer",
      "Not for torch-on sheet membrane systems without specific detailing from the membrane manufacturer",
      "Compression fit to pipe is not a substitute for a bonded membrane lap at the collar base — the membrane integration at the flange is the critical seal",
      "Confirm current product availability and sizing range with supplier before specifying",
    ],
    procurementSources: [
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Roofing and drainage trade suppliers — confirm stocking with local supplier", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#0284c7",
    name: "Site-formed Collar — ARDEX System Components",
    descriptionLine: "Site-formed penetration collar using ARDEX liquid-applied membrane and reinforcing fabric — for non-standard pipe diameters, existing penetrations, and irregular sections — ARDEX membrane system only — applicator skill required",
    productType: "Site-formed penetration collar — ARDEX liquid membrane + reinforcing fabric",
    filterTags: ["Site-formed", "ARDEX-system", "Liquid-applied-compatible", "Non-standard-diameter"],
    techChips: [
      { label: "Site-formed", cls: "bg-red-100 text-red-800" },
      { label: "ARDEX liquid membrane + fabric", cls: "bg-sky-100 text-sky-800" },
      { label: "Non-standard penetrations", cls: "bg-slate-100 text-slate-700" },
      { label: "Existing penetrations", cls: "bg-slate-100 text-slate-700" },
      { label: "Applicator skill required", cls: "bg-amber-100 text-amber-800" },
      { label: "Hold point", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `Where no pre-formed collar is available to suit the pipe diameter, section shape, or existing penetration geometry, a site-formed collar is built up in-situ using liquid-applied membrane material and reinforcing fabric. In ARDEX waterproofing systems, the site-formed collar uses ARDEX liquid-applied membrane (WPM 300 series or equivalent), ARDEX reinforcing fabric, and where required a compatible sealant at the pipe-to-substrate junction.

The site-formed collar is built in layers: a first coat of membrane is applied to the prepared substrate and pipe perimeter, reinforcing fabric is embedded into the wet membrane, a second coat of membrane is applied to fully encapsulate the fabric, and the membrane is built up to the required dry film thickness at the collar location. The collar must extend a minimum of 50mm onto the pipe and a minimum of 100mm onto the surrounding substrate — confirm exact dimensions with the current ARDEX system specification.

Site-formed collars require greater applicator skill than pre-formed collars and must be inspected carefully before the surrounding membrane field is applied over them. They are an accepted system in ARDEX specifications for non-standard penetrations — they are not a cost-saving shortcut on penetrations where a pre-formed collar is available.`,
    technicalProperties: [
      "Site-formed using ARDEX liquid-applied membrane and ARDEX reinforcing fabric",
      "For non-standard pipe diameters, existing penetrations, and irregular pipe sections",
      "Membrane built up in layers — reinforcing fabric embedded — full encapsulation of penetration perimeter",
      "Minimum 50mm membrane lap onto pipe — minimum 100mm onto surrounding substrate — confirm with ARDEX system specification",
      "External balcony and terrace penetration sealing within ARDEX system",
    ],
    limitations: [
      "Greater applicator skill required than pre-formed collars — must be inspected as a hold point before covering",
      "Not a substitute for a pre-formed collar where a pre-formed collar is available and fits the pipe",
      "Membrane lap dimensions onto the pipe and surrounding substrate must be confirmed with the current ARDEX system specification before applying",
      "Confirm primer requirements at the pipe and substrate perimeter with ARDEX technical before applying",
      "ARDEX system only — do not use ARDEX membrane to form a site collar over a Mapei or other brand membrane system without cross-brand compatibility confirmation",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#15803d",
    name: "Site-formed Collar — Mapei System Components",
    descriptionLine: "Site-formed penetration collar using Mapei liquid-applied membrane and reinforcing fabric — for non-standard pipe diameters, existing penetrations, and irregular sections — Mapei membrane system only — applicator skill required",
    productType: "Site-formed penetration collar — Mapei liquid membrane + reinforcing fabric",
    filterTags: ["Site-formed", "Mapei-system", "Liquid-applied-compatible", "Non-standard-diameter"],
    techChips: [
      { label: "Site-formed", cls: "bg-red-100 text-red-800" },
      { label: "Mapei liquid membrane + fabric", cls: "bg-green-100 text-green-800" },
      { label: "Non-standard penetrations", cls: "bg-slate-100 text-slate-700" },
      { label: "Existing penetrations", cls: "bg-slate-100 text-slate-700" },
      { label: "Applicator skill required", cls: "bg-amber-100 text-amber-800" },
      { label: "Hold point", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `Within Mapei waterproofing system specifications, site-formed penetration collars are built up using Mapei liquid-applied membrane (Mapelastic, Mapelastic Foundation, or Mapelastic AquaDefense) and Mapei reinforcing fabric (Mapenet 150 or equivalent), applied in layers to form a continuous waterproof collar around non-standard pipe penetrations that cannot accommodate a pre-formed collar.

The site-formed collar method, membrane product selection, reinforcing fabric type, lap dimensions, and primer requirements must all be confirmed against the current Mapei system specification for the specific membrane being applied on the project. The Mapei site-formed collar detail is not identical across all Mapei membrane systems — confirm the correct method with Mapei Australia or the current Mapei system specification before applying.

As with all site-formed details, applicator skill is critical and the finished collar must be inspected as a hold point before the surrounding membrane field is applied over it.`,
    technicalProperties: [
      "Site-formed using Mapei liquid-applied membrane and Mapei reinforcing fabric",
      "For non-standard pipe diameters, existing penetrations, and irregular pipe sections",
      "Membrane built up in layers — reinforcing fabric embedded — full encapsulation of penetration perimeter",
      "Lap dimensions and primer requirements must be confirmed against current Mapei system specification",
      "External balcony and terrace penetration sealing within Mapei system",
    ],
    limitations: [
      "Greater applicator skill required than pre-formed collars — must be inspected as a hold point before covering",
      "Not a substitute for a pre-formed collar where a pre-formed collar is available",
      "Method, lap dimensions, and primer requirements vary across Mapei membrane systems — confirm with current Mapei system specification before applying",
      "Mapei system only — do not use Mapei membrane to site-form a collar over an ARDEX or other brand membrane system without cross-brand compatibility confirmation",
      "Confirm current product and system specification with Mapei Australia before applying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Pre-formed", label: "Pre-formed" },
  { id: "Site-formed", label: "Site-formed" },
  { id: "PVC", label: "PVC" },
  { id: "Stainless-steel", label: "Stainless steel" },
  { id: "EPDM-rubber", label: "EPDM rubber" },
  { id: "ARDEX-system", label: "ARDEX system" },
  { id: "Mapei-system", label: "Mapei system" },
  { id: "Torch-on-compatible", label: "Torch-on compatible" },
  { id: "Liquid-applied-compatible", label: "Liquid-applied compatible" },
  { id: "Standard-diameter", label: "Standard diameter" },
  { id: "Non-standard-diameter", label: "Non-standard / existing" },
];

const COMPARISON_ROWS: {
  product: string;
  brand: string;
  type: string;
  material: string;
  membraneCompatibility: string;
  pipeSection: string;
  keyRestriction: string;
}[] = [
  {
    product: "Pre-formed PVC Collar",
    brand: "ARDEX",
    type: "Pre-formed",
    material: "PVC",
    membraneCompatibility: "ARDEX liquid-applied systems",
    pipeSection: "Round — standard diameters",
    keyRestriction: "Not for torch-on — confirm pipe OD before ordering — confirm ARDEX membrane system",
  },
  {
    product: "Pre-formed PVC Collar",
    brand: "Mapei",
    type: "Pre-formed",
    material: "PVC",
    membraneCompatibility: "Mapei liquid-applied systems",
    pipeSection: "Round — standard diameters",
    keyRestriction: "Not for torch-on — confirm pipe OD before ordering — confirm Mapei membrane system",
  },
  {
    product: "Stainless Steel Collar",
    brand: "Various",
    type: "Pre-formed",
    material: "Stainless 304 / 316",
    membraneCompatibility: "Torch-on sheet and liquid-applied",
    pipeSection: "Round — standard diameters",
    keyRestriction: "Grade 316 for coastal — confirm heat-bonding method for torch-on with membrane manufacturer",
  },
  {
    product: "EPDM Rubber Collar (Dektite)",
    brand: "Various",
    type: "Pre-formed — flexible",
    material: "EPDM rubber",
    membraneCompatibility: "Confirm with membrane manufacturer",
    pipeSection: "Round and square — range of diameters",
    keyRestriction: "Membrane bonding at base flange must be confirmed — not all membranes bond to EPDM without primer",
  },
  {
    product: "Site-formed Collar",
    brand: "ARDEX",
    type: "Site-formed",
    material: "Liquid membrane + fabric",
    membraneCompatibility: "ARDEX membrane systems only",
    pipeSection: "Any — non-standard and existing",
    keyRestriction: "Applicator skill required — hold point — not a shortcut where pre-formed collar is available",
  },
  {
    product: "Site-formed Collar",
    brand: "Mapei",
    type: "Site-formed",
    material: "Liquid membrane + fabric",
    membraneCompatibility: "Mapei membrane systems only",
    pipeSection: "Any — non-standard and existing",
    keyRestriction: "Applicator skill required — hold point — confirm method against specific Mapei membrane system specification",
  },
];

const TECH_INFO = {
  preFormedVsSiteFormed: [
    "Pre-formed collars: use where the pipe diameter matches an available pre-formed collar size, the pipe is a standard round section, and the collar material is compatible with the membrane system being applied — pre-formed collars provide a factory-controlled, consistent flange geometry that is easier to membrane-lap correctly than a site-formed detail",
    "Site-formed collars: use where no pre-formed collar is available to suit the pipe diameter or section shape, where an existing penetration cannot be removed or repositioned to allow pre-formed collar installation, or where the membrane manufacturer specifies a site-formed detail for the specific penetration type — site-formed details require greater applicator skill and must be inspected carefully before covering",
  ],
  diameterSizing: [
    "Pre-formed collars are manufactured to suit specific nominal pipe diameters — the collar must fit snugly over the pipe — a loose fit cannot be adequately sealed and will fail",
    "Measure the outside diameter of the pipe accurately before ordering pre-formed collars — on remediation projects, existing pipe diameters may not match standard nominal sizes — measure physically, do not assume",
    "Where the pipe OD does not match any available pre-formed collar size, a site-formed collar is the correct solution",
  ],
  membraneCompatibility: [
    "The collar material must be compatible with the waterproofing membrane system being applied — ARDEX pre-formed collars are specified with ARDEX membrane systems — Mapei collars are specified with Mapei systems",
    "The membrane is lapped over the collar flange and bonded — if the collar material and the membrane are not chemically compatible, adhesion at the collar flange will fail",
    "Confirm collar and membrane compatibility with the membrane manufacturer before specifying — cross-brand collar and membrane combinations must be confirmed with both manufacturers",
    "EPDM rubber collars require specific primer confirmation with the membrane manufacturer before membrane bonding will be reliable — EPDM is not universally compatible with liquid-applied membranes",
  ],
  installationSequence: [
    "1 — Cut and core the pipe penetration through the slab if required",
    "2 — Install the pipe and confirm its position and height relative to the membrane plane",
    "3 — Install the pre-formed collar over the pipe — set the collar flange at the correct height to be lapped by the membrane",
    "4 — Prime the collar flange perimeter and the surrounding substrate per the membrane manufacturer's requirements",
    "5 — Apply membrane — lap the membrane onto and over the collar flange per the manufacturer's specified overlap dimension (typically minimum 50mm onto the collar flange)",
    "6 — HOLD POINT — inspect the collar-to-membrane lap for full adhesion and correct overlap before tiling",
    "7 — Do not proceed to tiling until the collar installation is inspected and approved",
  ],
  heightSetting: [
    "The collar flange must be set at a height that allows the membrane to lap up and over the flange — not below it",
    "If the collar flange sits below the membrane application plane, water will pond at the collar base and track under the membrane lap",
    "Confirm collar flange height against the proposed membrane and screed level before setting",
    "On remediation projects where the screed depth may vary, confirm the collar height relative to the finished screed surface — not just the raw concrete level",
  ],
  standards: [
    "AS 3740:2021 requires that all pipe penetrations through a waterproofing membrane in a wet area are sealed with a purpose-designed collar or equivalent detail that maintains membrane continuity at the penetration",
    "A collar is not optional — every penetration through the membrane plane must be sealed",
    "The collar installation is a mandatory hold point — it must be inspected and confirmed before covering",
    "Document the collar installation and membrane lap as part of the quality record for Class 2 strata remediation projects",
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

export function PenetrationCollarIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are penetration collars — balcony waterproofing?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Penetration collars are purpose-manufactured waterproofing elements that seal the junction between a pipe or conduit and a waterproofing membrane on a balcony or terrace slab. Where a drainage pipe, electrical conduit, irrigation line, or structural post passes through the membrane plane, the membrane cannot simply be lapped against the penetration — the junction must be formed using a collar that provides a continuous, bonded waterproof seal around the full perimeter of the pipe at membrane level. Penetration collar failure is one of the most common causes of localised waterproofing failure in balcony and terrace remediation because the junction is mechanically vulnerable and thermally active.
        </p>
        {expanded && (
          <>
            <p>
              Penetration collars are available in two forms: pre-formed collars and site-formed collars. Pre-formed collars are factory-manufactured in fixed pipe diameters from PVC, stainless steel, or EPDM rubber, and are bedded into the membrane before the membrane field coat is applied. The membrane is then lapped onto the collar flange and bonded to create the waterproof seal. Site-formed collars are built using proprietary bandage fabric, membrane, and detail compound — they are formed on the pipe in situ and are used where no pre-formed collar is available for the pipe size, pipe material, or pipe position, or where access constraints prevent pre-formed collar installation.
            </p>
            <p>
              Collar selection is determined by the membrane system being applied, the pipe diameter, the pipe material, and the structural position of the penetration within the slab. Pre-formed PVC collars are compatible with liquid-applied membrane systems and not suitable for torch-on applications. Stainless steel collars are compatible with torch-on sheet membrane systems. EPDM rubber sleeve collars (Dektite type) are used for irregular pipe profiles, multiple-pipe clusters, and applications where the pipe protrudes at an angle. Site-formed collars are not a cost-saving shortcut — they require the same system discipline and inspection hold point as pre-formed collars, and are only used where pre-formed options are genuinely unsuitable.
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

export function PenetrationCollarProductSection() {
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

  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Pre-formed vs site-formed, pipe diameter sizing, membrane compatibility, installation sequence, hold points, AS 3740 requirements</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<SquareStack size={15} />} title="Pre-formed vs Site-formed — When to Use Each" items={TECH_INFO.preFormedVsSiteFormed} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Pipe Diameter — Confirm Before Ordering" items={TECH_INFO.diameterSizing} style="warn" />
              <TechCard icon={<CheckCircle size={15} />} title="Membrane Compatibility — Mandatory" items={TECH_INFO.membraneCompatibility} style="warn" />
              <TechCard icon={<Layers size={15} />} title="Correct Installation Sequence" items={TECH_INFO.installationSequence} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="Height Setting — Collar Flange" items={TECH_INFO.heightSetting} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="AS 3740:2021 Requirements" items={TECH_INFO.standards} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">6 products — 3 brands — pre-formed PVC, rubber, and stainless steel collars, and site-formed system components — pipe penetration waterproofing for external balconies and terraces</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      {product.brandUrl && (
                        <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{product.descriptionLine}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
                  {product.techChips.map((chip) => (
                    <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
                  ))}
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <p className="whitespace-pre-line text-xs leading-6 text-slate-700">{product.systemDescription}</p>
                </div>
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <ul className="space-y-1.5">
                      {product.technicalProperties.map((prop, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> {prop}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <ul className="space-y-1.5">
                      {product.limitations.map((lim, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" /> {lim}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
                  <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
                  <div className="space-y-2">
                    {product.procurementSources.map((src) => (
                      <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                          {src.name} <ExternalLink size={9} className="text-slate-300" />
                        </a>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS and membrane manufacturer before specifying or applying.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Comparison Table ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Penetration collar system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of pre-formed and site-formed collar types. Confirm all product selections against the current manufacturer TDS and membrane manufacturer before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Membrane compatibility</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pipe section</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={`${row.product}-${row.brand}`} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.membraneCompatibility}</td>
                  <td className="px-4 py-3 text-slate-600">{row.pipeSection}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── All warning and callout boxes — below comparison table only ── */}
      <div className="space-y-4">
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-amber-800">Membrane Compatibility at the Collar Flange Must Be Confirmed for Every Combination</p>
          <p className="text-sm leading-7 text-amber-900">
            The collar material and the waterproofing membrane must be chemically compatible at the bonding interface. PVC collars bond to ARDEX and Mapei liquid-applied membranes within their respective system specifications. Stainless steel collars are required for torch-on sheet membrane systems. EPDM collars require specific primer confirmation with the membrane manufacturer before membrane bonding will be reliable. Do not assume any collar and membrane combination is compatible without checking the membrane manufacturer's current system specification. Cross-brand collar and membrane combinations — for example, a Mapei collar used under an ARDEX membrane — must be confirmed with both manufacturers before applying.
          </p>
        </div>
        <div className="rounded-xl border-l-4 border-red-500 bg-red-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-red-800">Penetration Collar Installation Is a Mandatory Hold Point</p>
          <p className="text-sm leading-7 text-red-900">
            Penetration collar installation must be treated as a hold point in the waterproofing scope. The collar must be installed, the membrane lapped over the collar flange with the correct overlap, and the lap inspected and confirmed watertight before tile adhesive or any covering is applied over the collar area. A collar that is not correctly inspected before covering cannot be re-inspected or repaired without removing tiles and membrane. On Class 2 strata remediation projects, the waterproofing applicator must document the collar installation and membrane lap as part of the quality hold point record for the project.
          </p>
        </div>
        <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-sky-800">Do Not Confuse Penetration Collars with Puddle Flanges</p>
          <p className="text-sm leading-7 text-sky-900">
            Penetration collars seal the waterproofing membrane around pipe and service penetrations — downpipes, overflow pipes, conduits, and gas lines. They do not collect or discharge water. Puddle flanges and floor wastes are drainage components — they collect surface water and convey it into the stormwater system, and the waterproofing membrane is integrated to the puddle flange at the drain point. These are different products serving different functions. Both must be correctly specified and installed in a compliant balcony waterproofing system — a penetration collar is not a drainage product and a puddle flange is not a penetration seal.
          </p>
        </div>
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-amber-800">Site-formed Collars Require Applicator Skill and Must Not Be Used as a Cost Shortcut</p>
          <p className="text-sm leading-7 text-amber-900">
            Site-formed penetration collars are the correct solution for non-standard penetrations, irregular pipe sections, and existing penetrations that cannot be removed or repositioned. They are not a cost-saving alternative to pre-formed collars on standard pipe sizes. A site-formed collar on a standard round pipe that could have accepted a pre-formed collar introduces unnecessary risk — the pre-formed collar provides a factory-controlled flange geometry that is more reliable than a site-formed detail in most applicator hands. If a pre-formed collar is available in the correct size for the pipe, specify the pre-formed collar.
          </p>
        </div>
      </div>
    </>
  );
}
