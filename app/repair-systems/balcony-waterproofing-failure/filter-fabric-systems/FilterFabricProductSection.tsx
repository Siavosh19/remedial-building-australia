"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Non-woven"
  | "Polypropylene"
  | "Polyester"
  | "Recycled-PET"
  | "Australian-made"
  | "ISO-certified"
  | "Light-duty"
  | "140-gsm"
  | "Civil-grade"
  | "Multiple-GSM"
  | "Hydrophilic"
  | "High-flow"
  | "UV-resistant"
  | "Budget"
  | "Planter-box"
  | "Roof-garden"
  | "Podium";

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
  specifierNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Geofabrics Australasia",
    brandUrl: "https://www.geofabrics.co",
    tdsUrl: "https://www.geofabrics.co/products/filterwrap-non-woven-geotextile",
    accentColor: "#0369a1",
    name: "Geofabrics Filterwrap",
    descriptionLine: "Light-duty non-woven polypropylene geotextile — 140 gsm — confirmed for planter boxes and roof gardens — 2m × 50m rolls — widely distributed through Australian landscape and trade suppliers",
    productType: "Non-woven polypropylene geotextile — 140 gsm — light duty — residential and landscaping",
    filterTags: ["Non-woven", "Polypropylene", "Australian-made", "Light-duty", "140-gsm", "Planter-box", "Roof-garden"],
    techChips: [
      { label: "Non-woven polypropylene", cls: "bg-sky-100 text-sky-800" },
      { label: "140 gsm", cls: "bg-slate-100 text-slate-700" },
      { label: "Light duty — residential", cls: "bg-green-50 text-green-700" },
      { label: "Planter box and roof garden", cls: "bg-amber-50 text-amber-700" },
      { label: "2m × 50m rolls", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Filterwrap is Geofabrics Australasia's light-duty non-woven geotextile for residential and landscaping drainage, filtration, and separation applications. It is confirmed for use in planter boxes and roof gardens — providing separation between the growing medium and the drainage aggregate or drainage cells below, and allowing water to flow freely into the drainage layer while retaining soil particles. Available in 2m × 50m rolls, Filterwrap is widely distributed through Australian landscape and building trade suppliers including Arborgreen, Convic Australia, and similar.\n\nThe three-dimensional non-woven structure allows water to pass freely while preventing fine particle migration — the characteristic of non-woven fabrics that makes them suitable for planter box filter applications where woven fabrics would progressively blind. Highly porous — high flow rate — lightweight and easy to handle and cut in the field.\n\nFilterwrap is appropriate for standard residential and light commercial planter box and podium garden applications on Class 2 strata buildings where a light-duty (140 gsm) non-woven geotextile is the correct specification. For heavier loading, more demanding filtration, or commercial podium garden applications, specify a higher GSM product (Bidim Green, TerraTex PP, or similar).",
    technicalProperties: [
      "Non-woven polypropylene geotextile — 140 gsm",
      "High porosity — high flow rate — three-dimensional fibre structure",
      "Confirmed for planter boxes, roof gardens, retaining wall drainage, subsoil drainage",
      "Available in 2m × 50m rolls — lightweight and easy to handle",
      "Widely distributed through Australian landscape trade suppliers",
    ],
    limitations: [
      "Light duty (140 gsm) — not for heavy loading, commercial podium gardens, or applications requiring higher GSM filter fabric",
      "Confirm required GSM with landscape architect or hydraulic engineer before specifying — 140 gsm may be insufficient for some growing medium types or loading conditions",
      "Must be lapped up planter walls minimum 150mm above drainage cell layer",
      "Adjacent rolls must overlap minimum 300mm — no butt joints",
      "Confirm current availability, roll dimensions, and pricing with Geofabrics Australasia or local stockist before ordering",
    ],
    procurementSources: [
      { name: "Geofabrics Australasia — direct supply", url: "https://www.geofabrics.co" },
      { name: "Arborgreen — confirmed Australian stockist", url: "https://www.arborgreen.com.au" },
      { name: "Convic Australia — confirmed Australian stockist", url: "https://convicaustralia.com.au" },
    ],
    specifierNote: "Confirm required GSM against the growing medium type, loading, and drainage design with the landscape architect before ordering.",
  },
  {
    fullLabel: "Geofabrics Australasia",
    brandUrl: "https://www.geofabrics.co",
    tdsUrl: "https://www.geofabrics.co/products/bidim-green-non-woven-geotextile",
    accentColor: "#15803d",
    name: "Geofabrics Bidim Green",
    descriptionLine: "Premium recycled PET non-woven geotextile — Australian manufactured — equal biaxial strength — ISO certified — confirmed for planter boxes and green roofs — available in multiple GSM weights",
    productType: "Non-woven recycled PET geotextile — equal biaxial strength — ISO 9001 certified — Australian manufactured",
    filterTags: ["Non-woven", "Polyester", "Recycled-PET", "Australian-made", "ISO-certified", "Multiple-GSM", "Planter-box", "Roof-garden", "Podium"],
    techChips: [
      { label: "Non-woven recycled PET", cls: "bg-green-100 text-green-800" },
      { label: "Australian manufactured", cls: "bg-green-50 text-green-700" },
      { label: "ISO 9001 certified", cls: "bg-slate-100 text-slate-700" },
      { label: "Equal biaxial strength", cls: "bg-amber-50 text-amber-700" },
      { label: "Multiple GSM — confirm with Geofabrics", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Bidim Green is Geofabrics Australasia's premium non-woven geotextile made from a combination of recycled PET (polyester) and virgin plastic material — manufactured in Australia in an ISO-certified facility. Bidim Green is confirmed in the Geofabrics Product Selection Guide for preventing water build-up in planter boxes and protecting waterproof membranes in sub-surface foundation applications. It provides excellent filtration, separation, and drainage properties and is the only bi-dimensional geotextile on the market — having equal strength properties in both directions, which simplifies specification and installation as the roll orientation does not affect performance.\n\nBidim Green is available in multiple GSM weights — confirm the correct weight for the specific planter box or podium garden application with Geofabrics Australasia. The recycled PET content makes Bidim Green an appropriate specification for projects with sustainability and recycled content requirements. The Australian manufacturing origin ensures consistent supply without import lead times.",
    technicalProperties: [
      "Non-woven polyester (PET) geotextile — recycled PET + virgin material",
      "Australian manufactured — ISO 9001 certified facility",
      "Equal biaxial strength — same performance in both roll directions",
      "Confirmed for planter boxes and sub-surface drainage protection",
      "Available in multiple GSM weights — confirm required weight with Geofabrics",
      "Excellent filtration, separation, and drainage properties",
    ],
    limitations: [
      "Polyester (PET) material — polypropylene is generally more chemically resistant to soil-borne chemicals and fertilisers — confirm suitability with Geofabrics for the specific growing medium and soil amendment programme",
      "Multiple GSM weights available — confirm the correct weight against the growing medium type and loading with Geofabrics Australasia before ordering",
      "Must be lapped up planter walls minimum 150mm above drainage cell layer",
      "Adjacent rolls overlap minimum 300mm",
      "Confirm current GSM range, roll dimensions, and pricing with Geofabrics Australasia before ordering",
    ],
    procurementSources: [
      { name: "Geofabrics Australasia — direct and via trade distributors", url: "https://www.geofabrics.co" },
      { name: "Perth Irrigation — confirmed Australian stockist", url: "https://www.perthirrigation.com.au" },
      { name: "Aussie Environmental — confirmed Australian stockist", url: "https://aussieenvironmental.com.au" },
    ],
    specifierNote: "Confirm correct GSM weight, polyester vs polypropylene suitability, and current product range with Geofabrics Australasia before ordering.",
  },
  {
    fullLabel: "Polyfabrics Australia",
    brandUrl: "https://polyfabrics.com.au",
    tdsUrl: "https://polyfabrics.com.au/product/terratex-pp-range/",
    accentColor: "#b45309",
    name: "Polyfabrics TerraTex PP",
    descriptionLine: "Non-woven 100% polypropylene staple filament geotextile — 600, 900, and 1200 gsm — ISO 9001 certified — civil engineering grade filtration and separation — same supplier as DRAINmasta DrainCel drainage cells",
    productType: "Non-woven 100% polypropylene staple filament geotextile — 600 / 900 / 1200 gsm — ISO 9001 certified",
    filterTags: ["Non-woven", "Polypropylene", "ISO-certified", "Civil-grade", "Multiple-GSM", "Planter-box", "Podium"],
    techChips: [
      { label: "Non-woven 100% polypropylene", cls: "bg-amber-100 text-amber-800" },
      { label: "600 / 900 / 1200 gsm", cls: "bg-slate-100 text-slate-700" },
      { label: "ISO 9001 certified", cls: "bg-green-50 text-green-700" },
      { label: "Civil engineering grade", cls: "bg-slate-100 text-slate-700" },
      { label: "Same supplier as DRAINmasta DrainCel", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Polyfabrics TerraTex PP is a 100% polypropylene staple filament, highly needle-punched non-woven geotextile available in 600, 900, and 1200 gsm weights, manufactured under ISO 9001 quality management certification. It is confirmed for filtration, separation, and reinforcement applications. In planter box and podium garden applications, TerraTex PP provides a heavier-duty filter fabric option than standard landscape-grade geotextiles — appropriate for commercial podium gardens with heavy growing medium, high loading, or stringent drainage design requirements.\n\nPolyfabrics Australia is a geosynthetics specialist with civil engineering expertise — the same organisation that supplies DRAINmasta DrainCel drainage cells. Specifying TerraTex PP filter fabric alongside DRAINmasta DrainCel drainage cells from a single supplier simplifies procurement and ensures compatibility across the drainage layer system.\n\nThe 600 gsm weight is the lightest in the TerraTex PP range — typically more than sufficient for planter box and podium garden filter applications. The 900 gsm and 1200 gsm weights are civil engineering grades for road, rail, and heavy infrastructure applications — not typically required for standard Class 2 strata planter box or podium garden work. Confirm the correct GSM with Polyfabrics before ordering — over-specifying GSM adds cost without improving filtration performance.",
    technicalProperties: [
      "100% polypropylene staple filament — highly needle-punched non-woven",
      "Available in 600, 900, and 1200 gsm — ISO 9001 certified",
      "Filtration, separation, and reinforcement applications confirmed",
      "High chemical resistance — polypropylene — suitable for soil-borne chemical environments including fertilisers",
      "Civil engineering grade — same supplier as DRAINmasta DrainCel drainage cells — single-supplier procurement",
    ],
    limitations: [
      "Civil engineering grade product — 600 gsm is typically more than sufficient for standard planter box applications — confirm required GSM with Polyfabrics before ordering",
      "Higher cost than standard landscape-grade geotextiles — confirm whether civil engineering grade is specified or required for the project",
      "Must be lapped up planter walls minimum 150mm above drainage cell layer",
      "Adjacent rolls overlap minimum 300mm",
      "Confirm current roll dimensions, GSM range, and pricing with Polyfabrics Australia before ordering",
    ],
    procurementSources: [
      { name: "Polyfabrics Australia — direct supply", url: "https://polyfabrics.com.au" },
    ],
    specifierNote: "Confirm required GSM — 600 gsm is the lightest TerraTex PP weight. For standard planter box applications, a lighter standard-grade geotextile may be the correct specification. Confirm with Polyfabrics.",
  },
  {
    fullLabel: "The Waterproofing Supplier Australia",
    brandUrl: "https://thewaterproofingsupplier.com.au",
    tdsUrl: "https://thewaterproofingsupplier.com.au/products/hydrophilic-non-woven-geo-textile-fabric",
    accentColor: "#6d28d9",
    name: "Hydrophilic Non-Woven Geotextile",
    descriptionLine: "Hydrophilic non-woven needle-punched polypropylene geotextile — specifically marketed for planter box filter fabric and waterproofing membrane protection — 1m × 50m and 2m × 50m rolls — UV resistant",
    productType: "Hydrophilic non-woven polypropylene geotextile — planter box and membrane protection — waterproofing trade supply",
    filterTags: ["Non-woven", "Polypropylene", "Hydrophilic", "High-flow", "UV-resistant", "Planter-box"],
    techChips: [
      { label: "Hydrophilic non-woven PP", cls: "bg-violet-100 text-violet-800" },
      { label: "UV resistant", cls: "bg-slate-100 text-slate-700" },
      { label: "1m × 50m / 2m × 50m rolls", cls: "bg-green-50 text-green-700" },
      { label: "Waterproofing trade supply", cls: "bg-amber-50 text-amber-700" },
      { label: "Planter box and membrane protection", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Waterproofing Supplier Australia stocks a hydrophilic non-woven needle-punched polypropylene geotextile specifically marketed for planter box filter fabric and waterproofing membrane protection applications. The hydrophilic properties ensure rapid water passage from the growing medium into the drainage system while effectively retaining soil particles — the fabric actively draws water through its structure rather than relying on gravity and pressure alone.\n\nThis product is specifically marketed to waterproofing professionals and construction trades rather than landscape supplies — making it a practical procurement source for waterproofing contractors who are supplying and installing both the membrane system and the planter box drainage layers on the same Class 2 strata project. Available in 1m × 50m and 2m × 50m rolls — the 1m wide format is convenient for lapping up planter walls and for narrow planter boxes where cutting a 2m roll would create significant waste.\n\nUV-resistant polypropylene construction provides long-term performance in outdoor planter box conditions. Also described as providing membrane protection during backfilling — acting as a cushion between the growing medium and the waterproofing membrane surface where drainage cells are not used.",
    technicalProperties: [
      "Hydrophilic non-woven needle-punched polypropylene geotextile",
      "High-flow filtration — rapid water passage — soil particle retention",
      "UV-resistant polypropylene — suitable for outdoor planter box conditions",
      "Available in 1m × 50m and 2m × 50m rolls — 1m width convenient for wall laps",
      "Marketed specifically for planter box and waterproofing membrane protection applications",
      "Recyclable materials — lightweight and flexible for complex planter box corners",
    ],
    limitations: [
      "Confirm GSM weight with The Waterproofing Supplier before ordering — product marketed primarily by application rather than GSM specification",
      "Must be lapped up planter walls minimum 150mm above drainage cell layer",
      "Adjacent rolls overlap minimum 300mm",
      "Confirm current product specifications, GSM, and pricing with The Waterproofing Supplier before ordering",
    ],
    procurementSources: [
      { name: "The Waterproofing Supplier Australia — direct supply", url: "https://thewaterproofingsupplier.com.au" },
    ],
    specifierNote: "Confirm GSM weight and confirm the fabric is appropriate for the specific growing medium and loading conditions before ordering.",
  },
  {
    fullLabel: "Various — Atlantis / Eco Sustainable House / Project Material / landscape trade",
    brandUrl: "#",
    tdsUrl: undefined,
    accentColor: "#64748b",
    name: "Generic Non-Woven Geotextile",
    descriptionLine: "Generic non-woven polypropylene geotextile — widely available through landscape and drainage trade suppliers across Australia — standard companion product to drainage cells — confirm GSM and roll dimensions with supplier",
    productType: "Generic non-woven geotextile — landscape and trade supply — various suppliers",
    filterTags: ["Non-woven", "Polypropylene", "Budget", "Planter-box", "Roof-garden"],
    techChips: [
      { label: "Non-woven polypropylene", cls: "bg-slate-100 text-slate-700" },
      { label: "Budget / landscape grade", cls: "bg-slate-100 text-slate-700" },
      { label: "Wide availability", cls: "bg-green-50 text-green-700" },
      { label: "Drainage cell companion product", cls: "bg-amber-50 text-amber-700" },
      { label: "Confirm GSM with supplier", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Generic non-woven polypropylene geotextile filter fabric is widely available through Australian landscape, drainage, and construction trade suppliers, often supplied alongside drainage cells as a companion product. Atlantis Corporation sells geofabric rolls with their Flo-Cell drainage cells. Project Material, Eco Sustainable House, and landscape trade suppliers stock standard non-woven geotextile in 1m and 2m wide rolls.\n\nThese generic geotextile products are appropriate for standard residential and light commercial planter box and podium garden applications on Class 2 strata buildings where a standard landscape-grade filter fabric is the correct specification and brand or specific certification is not required by the project specification. For projects requiring certified geotextile with documented GSM, filtration performance, and quality management certification, specify a branded product (Filterwrap, Bidim Green, or TerraTex PP).\n\nConfirm GSM, roll width, roll length, and material (polypropylene or polyester) with the supplier before ordering — generic geotextile is sold under various specifications and the GSM may not be labelled consistently.",
    technicalProperties: [
      "Non-woven polypropylene (or polyester — confirm with supplier) geotextile",
      "Standard landscape grade — widely available through Australian trade and landscape suppliers",
      "Used as companion product to drainage cells — commonly sold alongside Atlantis Flo-Cell",
      "Available in 1m and 2m wide rolls — confirm roll length with supplier",
      "Appropriate for standard residential and light commercial planter box applications",
    ],
    limitations: [
      "GSM weight may not be clearly documented — confirm with supplier before ordering",
      "For commercial podium gardens, heavy loading, or projects requiring certified geotextile, specify a branded product with confirmed GSM and quality certification",
      "Must be lapped up planter walls minimum 150mm above drainage cell layer",
      "Adjacent rolls overlap minimum 300mm",
      "Do not use woven geotextile as filter fabric in planter box applications — specify non-woven only",
      "Confirm current product specifications, GSM, roll dimensions, and pricing with local supplier before ordering",
    ],
    procurementSources: [
      { name: "Atlantis Corporation — geofabric sold with Flo-Cell drainage cells", url: "https://atlantiscorporation.com.au" },
      { name: "Eco Sustainable House", url: "https://ecosustainablehouse.com.au" },
      { name: "Project Material", url: "https://www.projectmaterial.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
    specifierNote: "For residential planter boxes, generic landscape grade is appropriate. For commercial podium gardens or certified specifications, use a branded product with confirmed GSM and quality documentation.",
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Non-woven", label: "Non-woven geotextile" },
  { id: "Polypropylene", label: "Polypropylene" },
  { id: "Polyester", label: "Polyester" },
  { id: "Recycled-PET", label: "Recycled PET" },
  { id: "Australian-made", label: "Australian manufactured" },
  { id: "ISO-certified", label: "ISO certified" },
  { id: "Light-duty", label: "Light duty" },
  { id: "140-gsm", label: "140 gsm" },
  { id: "Civil-grade", label: "Civil engineering grade" },
  { id: "Multiple-GSM", label: "Multiple GSM available" },
  { id: "Hydrophilic", label: "Hydrophilic" },
  { id: "High-flow", label: "High flow rate" },
  { id: "UV-resistant", label: "UV resistant" },
  { id: "Budget", label: "Budget / landscape grade" },
  { id: "Planter-box", label: "Planter box" },
  { id: "Roof-garden", label: "Roof garden / green roof" },
  { id: "Podium", label: "Podium slab" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  gsmRange: string;
  applicationGrade: string;
  certified: string;
  keyRestriction: string;
}[] = [
  {
    product: "Filterwrap",
    brand: "Geofabrics Australasia",
    material: "Non-woven polypropylene",
    gsmRange: "140 gsm",
    applicationGrade: "Residential and light commercial — planter boxes and roof gardens",
    certified: "Geofabrics Australasia quality",
    keyRestriction: "Light duty — confirm 140 gsm is sufficient for growing medium type and loading — lap walls 150mm — overlap 300mm",
  },
  {
    product: "Bidim Green",
    brand: "Geofabrics Australasia",
    material: "Non-woven recycled PET + virgin polyester",
    gsmRange: "Multiple GSM — confirm with Geofabrics",
    applicationGrade: "Residential to commercial — planter boxes and sub-surface drainage protection",
    certified: "ISO certified — Australian manufactured",
    keyRestriction: "Polyester — confirm chemical resistance for growing medium and soil amendments — confirm correct GSM weight before ordering",
  },
  {
    product: "TerraTex PP",
    brand: "Polyfabrics Australia",
    material: "Non-woven 100% polypropylene staple filament",
    gsmRange: "600, 900, 1200 gsm",
    applicationGrade: "Civil engineering grade — commercial podium gardens and heavy applications",
    certified: "ISO 9001 certified",
    keyRestriction: "Civil grade — 600 gsm typically more than sufficient for planter boxes — over-specifying adds cost — confirm required weight with Polyfabrics",
  },
  {
    product: "Hydrophilic Non-Woven",
    brand: "The Waterproofing Supplier",
    material: "Non-woven polypropylene — hydrophilic",
    gsmRange: "Confirm with supplier",
    applicationGrade: "Planter box and membrane protection — waterproofing trade supply",
    certified: "Confirm with supplier",
    keyRestriction: "Confirm GSM before ordering — hydrophilic formulation for rapid water passage — available 1m and 2m wide rolls",
  },
  {
    product: "Generic Non-Woven",
    brand: "Various — Atlantis / Project Material / landscape supply",
    material: "Non-woven polypropylene (confirm with supplier)",
    gsmRange: "Confirm with supplier",
    applicationGrade: "Residential and light commercial planter box — companion product to drainage cells",
    certified: "No documented certification in most cases",
    keyRestriction: "For commercial or certified specification use a branded product — confirm GSM and non-woven (not woven) before ordering — lap walls 150mm — overlap 300mm",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Planter boxes on Class 2 strata apartment buildings — placed above drainage cells to prevent fine growing medium particles migrating into the drainage void and progressively clogging it",
    "Green roofs and roof gardens — separation layer between growing medium and drainage aggregate or drainage cells below the growing medium",
    "Landscaped podium slabs — between growing medium and drainage layer over the waterproofing membrane",
    "Applications where a drainage cell or aggregate drainage layer is placed below a growing medium and fine particle migration into the drainage void must be prevented",
    "Retaining wall drainage — placed against the wall face before backfill to prevent fines migrating into aggregate drainage layer",
    "Subsoil drainage applications — around drainage pipes and alongside aggregate drainage trenches to prevent fine particle ingress",
  ],
  selectionCriteria: [
    "Always non-woven — not woven — non-woven needle-punched geotextile resists blinding under fine particle loading; woven geotextile does not",
    "Confirm GSM against growing medium particle size distribution, drainage flow rate, and loading with the landscape architect or hydraulic engineer before ordering",
    "100–140 gsm — light duty — residential planter boxes with standard potting mix or sandy growing medium — Filterwrap",
    "150–200 gsm — standard specification — most residential and light commercial planter box and podium garden applications on Class 2 strata",
    "300 gsm and above (TerraTex PP) — civil engineering grade — confirm whether this weight is specified or required before ordering",
    "Polypropylene — standard for planter boxes — higher chemical resistance to fertilisers and soil amendments",
    "Polyester (PET) — appropriate where recycled content is a project requirement (Bidim Green) — confirm chemical resistance for specific growing medium",
    "For projects requiring certified geotextile with documented GSM and quality management certification, specify Filterwrap, Bidim Green, or TerraTex PP over generic landscape grade",
  ],
  limitations: [
    "Do not specify woven geotextile as filter fabric in planter box or growing medium applications — woven fabrics blind under fine particle loading from potting mix and soil",
    "Do not butt-join adjacent rolls — rolls must overlap minimum 300mm — a butt joint creates an unsealed gap that allows soil to bypass the filter",
    "Do not omit the wall lap — filter fabric placed flat without lapping up planter walls will be bypassed at every perimeter edge — minimum 150mm up all walls above drainage cell layer",
    "Do not confuse geotextile filter fabric with reinforcing fabric (ARDEX Deckweb, Mapei Mapenet) — reinforcing fabric reinforces the membrane in a different system position — it does not filter growing medium",
    "Do not place growing medium before all lower layers are inspected and confirmed correct — once growing medium is placed, all layers below are permanently inaccessible",
    "Do not use shade cloth, landscape fabric, or woven products as a substitute for non-woven geotextile filter fabric in drainage cell applications",
  ],
  standardsNotes: [
    "AS 3706 series — Geotextiles — Methods of Test — test methods for tensile strength, elongation, and filtration performance",
    "Manufacturer TDS — confirm GSM, tensile strength, water flow rate, and particle retention performance for the specific product before specifying",
    "NCC Volume One — drainage design requirements for Class 2 buildings — confirm growing medium drainage performance with hydraulic engineer",
    "Landscape architect specification — confirm filter fabric type and GSM against growing medium and planting specification before ordering",
    "Do not rely on generic product descriptions — confirm the specific product is non-woven needle-punched polypropylene or polyester with the supplier before ordering",
  ],
  installationMethod: [
    "Roll filter fabric over the full drainage cell area from one wall to the opposite wall — no gaps across the floor area",
    "Lap up all planter walls to minimum 150mm above the top of the drainage cell layer — secure at the top of the lap with tape, staples, or mechanical fixings before growing medium is placed",
    "Overlap adjacent rolls by minimum 300mm — mark the 300mm overlap line on the first roll before placing the second roll",
    "Cut to fit at penetrations, outlets, and corners — ensure no unsealed gaps around outlet surrounds and drainage wastes",
    "Place growing medium carefully — do not drag material across the fabric surface which can displace or tear it during placement",
    "Confirm all lower layers are complete, inspected, and flood test passed before commencing growing medium placement — once placed, lower layers are permanently inaccessible",
  ],
  systemPosition: [
    "Structural concrete slab",
    "Root-resistant waterproofing membrane — flood-tested and passed before covering",
    "Protection board (where specified by the membrane manufacturer)",
    "Drainage cells or drainage aggregate — covering the full floor area of the planter box",
    "Filter fabric — placed over the full drainage cell area and lapped up all planter walls to minimum 150mm above the drainage cell layer — this is the correct installed position",
    "Growing medium",
    "Mulch and plants",
  ],
};

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

export function FilterFabricProductSection() {
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
              Filter fabric position, GSM selection, non-woven vs woven, lap requirements, installation method, particle retention, polypropylene vs polyester, and pairing with drainage cells
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
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria — GSM and Material" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use / Common Errors" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards and Specification Notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Installation Method" items={TECH_INFO.installationMethod} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="System Position in Build-up" items={TECH_INFO.systemPosition} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">
              5 products — 4 brands — non-woven polypropylene and polyester geotextile filter fabrics — planter box, green roof, and podium slab drainage filtration and separation — always specify with drainage cells below and growing medium above
            </p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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
                      {product.brandUrl !== "#" && (
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
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{product.descriptionLine}</p>
                </div>

                {/* Tech spec chips */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
                  {product.techChips.map((chip) => (
                    <span
                      key={chip.label}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>

                {/* Specifier Note */}
                {product.specifierNote && (
                  <div className="border-b border-amber-100 bg-amber-50 px-5 py-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Specifier Note</p>
                    <p className="text-xs leading-5 text-amber-900">{product.specifierNote}</p>
                  </div>
                )}

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <p className="text-xs leading-6 text-slate-700 whitespace-pre-line">{product.systemDescription}</p>
                </div>

                {/* Technical Properties & Limitations */}
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <ul className="space-y-1.5">
                      {product.technicalProperties.map((prop, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
                          {prop}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <ul className="space-y-1.5">
                      {product.limitations.map((lim, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
                          {lim}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
                  <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
                  <div className="space-y-2">
                    {product.procurementSources.map((src) => (
                      <div
                        key={src.name}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                      >
                        {src.url !== "#" ? (
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
                          <span className="font-semibold text-slate-700">{src.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[10px] italic text-slate-400">
                    Confirm suitability with the current manufacturer TDS before specifying or applying.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter Fabric System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Filter fabric system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of the five geotextile filter fabric systems covered on this page. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">GSM range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Certified</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.gsmRange}</td>
                  <td className="px-4 py-3 text-slate-600">{row.applicationGrade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.certified}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
