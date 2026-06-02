"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "20mm"
  | "30mm"
  | "50mm"
  | "Water-retention-cups"
  | "Passive-irrigation"
  | "Australian-made"
  | "Machine-access"
  | "Vertical-drainage"
  | "Budget-specification"
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
    fullLabel: "Atlantis Corporation Australia",
    brandUrl: "https://atlantiscorporation.com.au",
    tdsUrl: "https://atlantiscorporation.com.au/flo-cell-20-mm-versatile-drainage-solution/",
    accentColor: "#0369a1",
    name: "Atlantis Flo-Cell",
    descriptionLine: "Modular polypropylene drainage cell — 20mm, 30mm, and 50mm depths — diamond cup water retention structure for passive irrigation — 85% recycled polypropylene — void ratio >90% — widely available nationally — planter boxes, green roofs, and podium slabs",
    productType: "Modular polypropylene drainage cell — 20mm / 30mm / 50mm — Atlantis Corporation Australia",
    filterTags: ["20mm", "30mm", "50mm", "Water-retention-cups", "Passive-irrigation", "Planter-box", "Roof-garden", "Podium"],
    techChips: [
      { label: "20mm / 30mm / 50mm depths", cls: "bg-sky-100 text-sky-800" },
      { label: "85% recycled PP", cls: "bg-green-50 text-green-700" },
      { label: "Void ratio >90%", cls: "bg-slate-100 text-slate-700" },
      { label: "Diamond cup — passive irrigation", cls: "bg-amber-50 text-amber-700" },
      { label: "Widely distributed nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Atlantis Flo-Cell is one of the most widely distributed modular polypropylene drainage cell systems in Australia, available in 20mm, 30mm, and 50mm depths through multiple national suppliers. Manufactured from 85% recycled polypropylene (15% proprietary materials), Flo-Cell is inert to soil-borne chemicals and bacteria, resistant to biological attack, and does not deteriorate under the permanently moist conditions of a planter box or podium garden. Void ratio exceeds 90% across all three depths.\n\nThe distinctive diamond cup structure on the base of each Flo-Cell panel creates small water retention cups that hold a modest water volume below the main drainage void — providing a perched water table for passive irrigation of the growing medium above during dry periods. This passive irrigation feature reduces irrigation frequency and supports plant health in Australian summer conditions. Excess water above the cup level drains freely through the cell void to the outlets.\n\nModular panels interlock in the same plane or at right angles, allowing rapid installation across the planter base with minimal cutting at edges. Confirmed specifications: 20mm — 400mm × 620mm × 20mm, 4 per m², compressive strength 90 t/m², flow rate 0.65 L/m² at 1% gradient; 30mm — 575mm × 575mm × 30mm, 3 per m², compressive strength 105 t/m², flow rate 1.41 L/m² at 1% gradient; 50mm — 575mm × 575mm × 50mm, 3 per m², compressive strength 155 t/m², flow rate 2.65 L/m² at 1% gradient.",
    technicalProperties: [
      "Modular interlocking polypropylene drainage cell — 20mm, 30mm, and 50mm depths",
      "85% recycled polypropylene — 15% proprietary materials — black",
      "Void ratio >90% — high drainage efficiency across all depths",
      "Diamond cup structure — passive irrigation water retention — perched water table below growing medium",
      "Compressive strength 90 t/m² (20mm) — 105 t/m² (30mm) — 155 t/m² (50mm)",
      "Inert to soil-borne chemicals and bacteria — biologically resistant",
      "Panels interlock in same plane or at right angles — cut to fit at edges",
      "Always specify with geotextile filter fabric above",
    ],
    limitations: [
      "Filter fabric is mandatory above — do not install without geotextile filter fabric covering the full cell area and lapping up planter walls",
      "Confirm required depth (20mm, 30mm, or 50mm) against drainage design flow rate, loading, and available build-up height before ordering",
      "Not a membrane protection product — protection board is separately specified below the drainage cells if required",
      "Confirm compressive strength against machinery access loads if bobcat or small tractor access is required during planting or maintenance",
      "Confirm current pricing and availability with local supplier before ordering",
    ],
    procurementSources: [
      { name: "The WaterStop Shop — confirmed Australian stockist", url: "https://waterstop.com.au" },
      { name: "Eco Sustainable House (QLD)", url: "https://ecosustainablehouse.com.au" },
      { name: "Atlantis Corporation Australia", url: "https://atlantiscorporation.com.au" },
      { name: "The Landscape Store", url: "https://www.thelandscapestore.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
    specifierNote:
      "Confirm drainage cell depth against hydraulic design flow rate, planting load, and available build-up height before ordering. Always specify with filter fabric above.",
  },
  {
    fullLabel: "Elmich Australia",
    brandUrl: "https://elmich.com.au",
    tdsUrl: "https://elmich.com.au/products/versicell-subsoil-drainage/",
    accentColor: "#15803d",
    name: "Elmich VersiCell",
    descriptionLine: "Australian Made high-strength polypropylene subsoil drainage cell — 30mm — designed to withstand bobcat and mechanical equipment loads — interlocking modular panels — pre-assembled large panels for rapid installation — planter boxes, roof gardens, plaza decks, and podium slabs",
    productType: "Australian Made high-strength subsoil drainage cell — 30mm — Elmich Australia",
    filterTags: ["30mm", "Australian-made", "Machine-access", "Planter-box", "Roof-garden", "Podium"],
    techChips: [
      { label: "Australian Made", cls: "bg-green-100 text-green-800" },
      { label: "30mm depth", cls: "bg-slate-100 text-slate-700" },
      { label: "Bobcat load capacity", cls: "bg-amber-50 text-amber-700" },
      { label: "Pre-assembled panels", cls: "bg-slate-100 text-slate-700" },
      { label: "Elmich Australia", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Elmich VersiCell is an Australian Made high-strength polypropylene modular drainage cell used in the construction of roof gardens, plaza decks, basements, pond filtration systems, concealed drains, and planter boxes on Class 2 strata buildings. Its manufacture in Australia by Elmich ensures consistent supply without the import lead times of overseas-sourced products.\n\nVersiCell is specifically noted for its structural strength — designed to withstand loads imposed by mechanical equipment such as bobcats during planting and maintenance operations on large podium gardens and roof decks. This is a distinct advantage on commercial and large residential strata podium applications where bobcat access for spreading growing medium is required.\n\nAvailable in 30mm depth modules. Modules interlock in the same plane, at right angles to one another, or may be butted together — providing flexibility in layout across irregular planter floor areas. Large pre-assembled panels allow rapid installation and minimise on-site disruption — an advantage on strata remediation projects where access is limited and installation time is constrained.\n\nVersiCell does not incorporate the same diamond cup water retention structure as Atlantis Flo-Cell. It is primarily a structural drainage void product — focused on drainage efficiency and load capacity rather than passive irrigation. Where passive irrigation is a design requirement, confirm with Elmich whether VersiCell is appropriate or whether a cup-structured cell should be specified.",
    technicalProperties: [
      "Australian Made — high-strength polypropylene — consistent domestic supply",
      "30mm depth — interlocking modular panels",
      "Designed to withstand mechanical equipment loads (bobcats) — confirm load capacity with Elmich for specific machinery",
      "Interlock in same plane, at right angles, or butted together — flexible layout",
      "Large pre-assembled panels — rapid installation — reduced on-site disruption",
      "High surface void area — efficient water capture and discharge",
      "Resistance to biological attack and soil-borne chemicals",
      "Wide applications: planter boxes, roof gardens, plaza decks, basements",
      "Always specify with geotextile filter fabric above",
    ],
    limitations: [
      "Filter fabric is mandatory above — do not install without geotextile filter fabric",
      "30mm depth only — where 20mm or 50mm is required, specify Atlantis Flo-Cell or Ausdrain instead",
      "No water retention cup structure — confirm with landscape architect if passive irrigation is a design requirement",
      "Confirm current product specifications, compressive strength, and pricing with Elmich Australia before specifying",
    ],
    procurementSources: [
      { name: "Elmich Australia — direct supply", url: "https://elmich.com.au" },
      { name: "KHD Landscape Solutions — Australian distributor", url: "https://khdlandscapesolutions.com.au" },
    ],
    specifierNote:
      "Confirm drainage depth requirement, mechanical access loads, and passive irrigation requirement with Elmich Australia before specifying.",
  },
  {
    fullLabel: "Ausdrain Australia",
    brandUrl: "https://ausdrain.com",
    tdsUrl: "https://ausdrain.com/drainage-cell/",
    accentColor: "#b45309",
    name: "Ausdrain Drainage Cell",
    descriptionLine: "Australian drainage cell — 30mm and 50mm depths — creates permanent non-clogging void between slab and growing medium — 98% weight saving over gravel — high compressive strength allows truck delivery of growing medium once 300mm placed above — planter boxes, roof gardens, and podium slabs",
    productType: "Modular polypropylene drainage cell — 30mm / 50mm — Ausdrain Australia",
    filterTags: ["30mm", "50mm", "Machine-access", "Planter-box", "Roof-garden", "Podium"],
    techChips: [
      { label: "30mm / 50mm depths", cls: "bg-amber-100 text-amber-800" },
      { label: "98% weight saving over gravel", cls: "bg-green-50 text-green-700" },
      { label: "High compressive strength", cls: "bg-slate-100 text-slate-700" },
      { label: "Truck access once 300mm soil above", cls: "bg-amber-50 text-amber-700" },
      { label: "Australian supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ausdrain produces Australian drainage cells in 30mm and 50mm depths, specifically marketed for planter boxes, roof gardens, and landscaped podiums on Class 2 strata and commercial building projects. Ausdrain drainage cells create a permanent, non-clogging void between the concrete slab and the growing medium above — the large surface and internal void space enables superior drainage efficiency compared to coarse gravel, with approximately 98% weight saving over the equivalent gravel drainage layer.\n\nA key practical advantage noted by Ausdrain is that once a minimum of 300mm of growing medium has been placed over the drainage cell and filter fabric, the structural strength of the cell layer is sufficient to allow trucks and machinery to drive over the growing medium surface for further soil delivery — significantly simplifying growing medium installation on large podium garden projects. Confirm the required growing medium depth for machinery access with Ausdrain before specifying.\n\nThe 50mm depth cells provide the highest flow rate in the Ausdrain range — appropriate for large podium gardens with heavy planting, extensive irrigation systems, or high-rainfall exposure where a greater drainage reserve capacity is needed.",
    technicalProperties: [
      "30mm and 50mm depths — confirm depth against drainage design and build-up height",
      "Permanent non-clogging drainage void — will not collapse or distort under load",
      "98% weight saving over equivalent gravel drainage layer",
      "High compressive strength — allows machinery and truck access once 300mm growing medium placed above",
      "Suitable for planter boxes, roof gardens, landscaped podiums, and retaining wall drainage",
      "Australian supply — confirm current availability with Ausdrain",
      "Always specify with geotextile filter fabric above",
    ],
    limitations: [
      "Filter fabric is mandatory above — do not install without geotextile filter fabric",
      "30mm and 50mm only — where 20mm is required, specify Atlantis Flo-Cell or DRAINmasta DrainCel instead",
      "Confirm compressive strength and machinery access growing medium depth with Ausdrain for the specific project loading",
      "Confirm current product specifications and pricing with Ausdrain before specifying",
    ],
    procurementSources: [
      { name: "Ausdrain — direct supply and delivery", url: "https://ausdrain.com" },
    ],
    specifierNote:
      "Confirm drainage depth, compressive strength, and machinery access requirements with Ausdrain before specifying.",
  },
  {
    fullLabel: "DRAINmasta / Polyfabrics Australia",
    brandUrl: "https://polyfabrics.com.au",
    tdsUrl: "https://polyfabrics.com.au/product/drainmasta-draincel-30mm-x-1-2m%C2%B2-panel/",
    accentColor: "#6d28d9",
    name: "DRAINmasta DrainCel",
    descriptionLine: "Modular drainage cell — 20mm and 30mm — water retention cups for passive irrigation — suitable for horizontal planter box and roof garden drainage and vertical retaining wall drainage — geosynthetics specialist supply through Polyfabrics Australia",
    productType: "Modular drainage cell — 20mm / 30mm — horizontal and vertical applications — Polyfabrics Australia",
    filterTags: ["20mm", "30mm", "Water-retention-cups", "Passive-irrigation", "Vertical-drainage", "Planter-box", "Roof-garden"],
    techChips: [
      { label: "20mm / 30mm depths", cls: "bg-violet-100 text-violet-800" },
      { label: "Water retention cups", cls: "bg-green-50 text-green-700" },
      { label: "Passive irrigation", cls: "bg-amber-50 text-amber-700" },
      { label: "Vertical wall drainage", cls: "bg-slate-100 text-slate-700" },
      { label: "Geosynthetics specialist supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "DRAINmasta DrainCel is a modular drainage cell produced and distributed by Polyfabrics Australia — a geosynthetics specialist with civil engineering expertise in retaining wall design, drainage design, and geotechnical applications. Available in 20mm and 30mm depths as 1.2m² panels. DrainCel features water retention cups in the base of each cell that provide passive irrigation by creating a perched water table below the growing medium — retaining a small water volume during dry periods while allowing excess irrigation and rainfall to drain freely.\n\nA distinguishing feature of the DRAINmasta range is its confirmed suitability for vertical retaining wall drainage applications as well as horizontal planter box and roof garden use — the high void ratio and flow rate combined with excellent compressive strength make it effective when installed vertically behind retaining walls within planter box and podium garden structures. This is relevant on strata planter boxes where the vertical planter walls may require drainage as well as the horizontal floor.\n\nAs a geosynthetics specialist, Polyfabrics Australia can provide technical advice on drainage cell selection, filter fabric pairing, and full subsurface drainage system design — a useful resource for complex or large-scale strata podium garden remediation projects.",
    technicalProperties: [
      "20mm and 30mm depths — 1.2m² panels",
      "Water retention cups — passive irrigation — perched water table below growing medium",
      "High void ratio — high flow rate — efficient water capture and discharge",
      "Confirmed suitable for horizontal and vertical drainage applications",
      "Geosynthetics specialist supply — technical drainage design advice available from Polyfabrics",
      "Available through Polyfabrics Australia — direct supply",
      "Always specify with geotextile filter fabric above (horizontal) and adjacent (vertical)",
    ],
    limitations: [
      "Filter fabric is mandatory above for horizontal applications and adjacent to the cell for vertical wall applications — do not omit",
      "Confirm 20mm vs 30mm depth against drainage design flow rate and available build-up height",
      "Confirm compressive strength against loading for the specific application",
      "Confirm current product specifications, panel sizes, and pricing with Polyfabrics Australia before specifying",
    ],
    procurementSources: [
      { name: "Polyfabrics Australia — direct supply", url: "https://polyfabrics.com.au" },
    ],
    specifierNote:
      "Confirm drainage depth, application type (horizontal or vertical), and filter fabric pairing with Polyfabrics Australia before specifying.",
  },
  {
    fullLabel: "Various — Project Material, Defined Style, trade supply",
    brandUrl: "https://www.projectmaterial.com.au",
    tdsUrl: "https://www.projectmaterial.com.au/drainage-cell-system-30mm/",
    accentColor: "#64748b",
    name: "Generic Modular Drainage Cell",
    descriptionLine: "Generic modular polypropylene drainage cell — 20mm and 30mm — widely available through landscape and drainage trade suppliers nationally — diamond cup water retention structure — budget specification for residential and light commercial planter box and roof garden applications",
    productType: "Generic modular polypropylene drainage cell — 20mm / 30mm — trade supply",
    filterTags: ["20mm", "30mm", "Water-retention-cups", "Passive-irrigation", "Budget-specification", "Planter-box", "Roof-garden", "Podium"],
    techChips: [
      { label: "20mm / 30mm depths", cls: "bg-slate-100 text-slate-700" },
      { label: "Diamond cup water retention", cls: "bg-amber-50 text-amber-700" },
      { label: "Widely available nationally", cls: "bg-green-50 text-green-700" },
      { label: "Budget specification", cls: "bg-slate-100 text-slate-700" },
      { label: "Residential and light commercial", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Generic modular polypropylene drainage cells in 20mm and 30mm depths are widely available through landscape, drainage, and construction trade suppliers across Australia under multiple brand names. These panels are dimensionally and functionally similar to branded products — high-strength polypropylene, interlocking modular panels, diamond cup water retention structure, high void ratio, and biological resistance. They are manufactured to consistent specifications and have been used successfully across large-scale projects in Australia.\n\nGeneric drainage cells are the standard budget specification for residential and light commercial planter boxes and roof garden applications on Class 2 strata buildings where the specific brand of drainage cell is not critical to the project specification. Project Material supplies both 20mm and 30mm cells in 1.21m² panels (1100mm × 1100mm) at competitive pricing nationally. Defined Style supplies similar products in Queensland and nationally.\n\nFor high-specification commercial podium garden projects, heavy machine-access applications, or projects requiring documented brand and compressive strength certification, specify a branded product (Atlantis Flo-Cell, Elmich VersiCell, Ausdrain, or DRAINmasta DrainCel) with a confirmed TDS rather than a generic trade cell.",
    technicalProperties: [
      "Modular interlocking polypropylene drainage cell — 20mm and 30mm depths",
      "Diamond cup water retention structure — passive irrigation",
      "High void ratio — biological and chemical resistance",
      "Panel size typically 1100mm × 1100mm — 1.21m² per panel",
      "Widely stocked through landscape and drainage trade suppliers Australia-wide",
      "Always specify with geotextile filter fabric above",
    ],
    limitations: [
      "Filter fabric is mandatory above — do not install without geotextile filter fabric",
      "Confirm compressive strength with supplier before specifying where machinery access or heavy loading is required — generic products may not have independently tested compressive strength documentation",
      "For high-specification or commercial applications, specify a branded product with a confirmed TDS",
      "Confirm current product availability, panel dimensions, and pricing with local supplier before ordering",
    ],
    procurementSources: [
      { name: "Project Material", url: "https://www.projectmaterial.com.au" },
      { name: "Defined Style", url: "https://www.definedstyle.com.au" },
      { name: "Landscape and drainage trade suppliers — confirm stocking with local supplier", url: "#" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
    specifierNote:
      "For residential and light commercial planter box applications, widely available generic cells are appropriate. For commercial podium gardens, heavy loading, or machine access, specify a branded product with confirmed compressive strength.",
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "20mm", label: "20mm depth" },
  { id: "30mm", label: "30mm depth" },
  { id: "50mm", label: "50mm depth" },
  { id: "Water-retention-cups", label: "Water retention cups" },
  { id: "Passive-irrigation", label: "Passive irrigation" },
  { id: "Australian-made", label: "Australian Made" },
  { id: "Machine-access", label: "Machine access capable" },
  { id: "Vertical-drainage", label: "Vertical wall drainage" },
  { id: "Budget-specification", label: "Budget specification" },
  { id: "Planter-box", label: "Planter boxes" },
  { id: "Roof-garden", label: "Roof gardens" },
  { id: "Podium", label: "Podium slabs" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  depths: string;
  compressiveStrength: string;
  retentionCups: string;
  machineAccess: string;
  australianMade: string;
  keyRestriction: string;
}[] = [
  {
    product: "Atlantis Flo-Cell",
    brand: "Atlantis Corporation",
    depths: "20mm, 30mm, 50mm",
    compressiveStrength: "90–155 t/m² by depth",
    retentionCups: "Yes — diamond cup passive irrigation",
    machineAccess: "Confirm with supplier for specific depth",
    australianMade: "No — 85% recycled PP",
    keyRestriction: "Most widely distributed — confirm depth against flow rate and build-up height — filter fabric mandatory above",
  },
  {
    product: "Elmich VersiCell",
    brand: "Elmich Australia",
    depths: "30mm",
    compressiveStrength: "Confirm with Elmich — designed for bobcat loads",
    retentionCups: "No — structural drainage void, no cup structure",
    machineAccess: "Yes — specifically designed for mechanical equipment loads",
    australianMade: "Yes — Australian Made",
    keyRestriction: "30mm only — no passive irrigation cup — confirm with landscape architect if passive irrigation is required — filter fabric mandatory above",
  },
  {
    product: "Ausdrain",
    brand: "Ausdrain Australia",
    depths: "30mm, 50mm",
    compressiveStrength: "Confirm with Ausdrain — high compressive strength",
    retentionCups: "Confirm with Ausdrain",
    machineAccess: "Yes — truck access once 300mm growing medium placed above",
    australianMade: "Australian supply",
    keyRestriction: "30mm and 50mm only — confirm machinery access growing medium depth with Ausdrain — filter fabric mandatory above",
  },
  {
    product: "DRAINmasta DrainCel",
    brand: "Polyfabrics Australia",
    depths: "20mm, 30mm",
    compressiveStrength: "Confirm with Polyfabrics",
    retentionCups: "Yes — water retention cups",
    machineAccess: "Confirm with Polyfabrics",
    australianMade: "Australian supply",
    keyRestriction: "Horizontal and vertical wall drainage — geosynthetics specialist supply — filter fabric mandatory above and adjacent for vertical use",
  },
  {
    product: "Generic Drainage Cell",
    brand: "Project Material / various",
    depths: "20mm, 30mm",
    compressiveStrength: "Confirm with supplier — may not be independently tested",
    retentionCups: "Yes — diamond cup in most formats",
    machineAccess: "Confirm with supplier",
    australianMade: "Various — confirm with supplier",
    keyRestriction: "Budget specification — residential and light commercial — for commercial or heavy loading specify branded product with confirmed TDS — filter fabric mandatory above",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Planter boxes on podium slabs and roof decks where gravel drainage layers would exceed the structural dead load capacity — drainage cells replace 150mm of gravel with 30mm of cell at 2% of the gravel weight",
    "Green roofs and landscaped roof gardens where a lightweight drainage void is required between the waterproofing membrane and growing medium",
    "Podium garden drainage on Class 2 strata buildings — 30mm cells are the standard specification for most residential strata planter box applications",
    "Retaining wall drainage behind planter box walls — vertical drainage cell installation (DRAINmasta DrainCel confirmed for vertical use)",
    "Replacement of failed or clogged coarse aggregate drainage layers in existing planter boxes where dead load reduction is required",
    "Roof garden and terrace garden drainage where depth savings over gravel allow greater growing medium depth and expanded plant species range",
  ],
  selectionCriteria: [
    "Drainage cell depth (20mm, 30mm, or 50mm) — confirm against hydraulic design flow rate, available build-up height within the planter, and loading conditions — the deepest available cell is not always the correct specification",
    "Water retention cups — required where passive irrigation is a design requirement for the planting type — Elmich VersiCell does not have the cup structure",
    "Compressive strength — must exceed combined loading of growing medium, plants, installation machinery, and maintenance vehicle access",
    "Australian made — Elmich VersiCell offers domestic manufacture and confirmed mechanical equipment load capacity",
    "Generic vs branded — generic cells appropriate for residential and light commercial; specify branded product with confirmed TDS for commercial podium gardens, heavy loading, or machine access applications",
    "Void ratio and flow rate — confirm drainage cell flow rate against the hydraulic design flow rate before specifying",
    "Always confirm filter fabric specification separately — drainage cells are always specified with geotextile filter fabric above",
  ],
  limitations: [
    "Do not install without geotextile filter fabric above — drainage cells without filter fabric will permanently clog with fine particles migrating from the growing medium and cannot be restored",
    "Do not install over an uninspected, defective, or non-root-resistant waterproofing membrane — drainage cells are not waterproofing products",
    "Do not specify drainage cells on existing podium slabs without structural engineering confirmation of the slab's capacity for the combined planting system dead load",
    "Do not use generic drainage cells without confirmed compressive strength data for machine-access or commercial podium garden applications",
    "Do not use 20mm cells where the hydraulic design flow rate requires 30mm or 50mm — undersized cells will cause waterlogging above the drainage layer",
    "Do not rely on drainage cells to manage structural drainage failures — defective outlets, ponding slab geometry, or damaged membranes must be corrected before drainage cells are specified",
  ],
  standardsNotes: [
    "No specific Australian Standard governs drainage cell products — specify based on manufacturer TDS, void ratio, compressive strength certification, and documented flow rate data",
    "Filter fabric above drainage cells must comply with AS 3706 (Geotextiles — Methods of Test) — confirm geotextile specification with filter fabric supplier",
    "NCC Volume One — performance requirements for drainage in Class 2 building planter boxes and podium slabs",
    "Structural loading calculations must be confirmed by a structural engineer against the design dead load capacity of the podium slab or roof deck",
    "Drainage design for large podium gardens must be confirmed by a hydraulic engineer — drainage cell flow rate must meet design rainfall intensity requirements",
  ],
  suitableDefects: [
    "Failed or waterlogged planter box — existing growing medium sitting directly on membrane with no drainage void, causing membrane degradation, root zone waterlogging, and plant death",
    "Clogged coarse aggregate drainage layer — original gravel drainage layer has silted up over time and can no longer pass water to the outlet",
    "New planter box or podium garden installation over a waterproofed slab — drainage cell system required before growing medium placement",
    "Podium slab drainage upgrade — increasing drainage capacity over an existing podium garden where the original drainage layer was undersized for the design rainfall",
  ],
  typicalSubstrates: [
    "System build-up from bottom: structural slab — root-resistant waterproofing membrane — protection board (where specified) — drainage cells — geotextile filter fabric — growing medium — mulch and plants",
    "Above waterproofing membrane on the floor of a planter box or podium garden — drainage cells cover the full floor area",
    "Above a protection board where specified — protection board prevents drainage cell point loads from damaging the membrane during installation",
    "Behind vertical planter box retaining walls (vertical installation) — some formats confirmed for vertical retaining wall drainage as well as horizontal floor drainage",
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

export function DrainageCellProductSection() {
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
              Depth selection, void ratio, compressive strength, water retention cups, filter fabric pairing, gravel replacement, structural loading, drainage flow rate, system position
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
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="System Position" items={TECH_INFO.typicalSubstrates} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">5 products — 5 brands — 20mm, 30mm, and 50mm modular polypropylene drainage cells — planter boxes, green roofs, and landscaped podium slabs — always specify with filter fabric above</p>
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

      {/* ── Drainage Cell System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Drainage cell system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of drainage cell systems covered on this page. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Available depths</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Compressive strength</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Water retention cups</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Machine access confirmed</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Australian made</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.depths}</td>
                  <td className="px-4 py-3 text-slate-600">{row.compressiveStrength}</td>
                  <td className="px-4 py-3 text-slate-600">{row.retentionCups}</td>
                  <td className="px-4 py-3 text-slate-600">{row.machineAccess}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.australianMade}</td>
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
