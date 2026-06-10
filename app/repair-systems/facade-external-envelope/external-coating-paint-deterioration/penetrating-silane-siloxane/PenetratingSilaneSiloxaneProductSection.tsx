"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Silane"
  | "Siloxane"
  | "Penetrating"
  | "Water-repellent"
  | "Colourless"
  | "Concrete"
  | "Masonry"
  | "Render"
  | "Breathable"
  | "Coastal"
  | "Anti-carbonation"
  | "Pre-coat";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/solutions_products/02/02a015/02a015sa01/sika-impregnation-h.html",
    accentColor: "#e2003a",
    name: "Sika Impregnation H",
    descriptionLine: "Silane-siloxane penetrating water repellent for concrete and masonry — colourless, breathable, deep penetrating — professional remedial system for reducing water ingress and carbonation on building facades",
    productType: "Silane-siloxane penetrating water repellent — Sika professional system",
    filterTags: ["Silane", "Siloxane", "Penetrating", "Water-repellent", "Colourless", "Concrete", "Masonry", "Breathable", "Coastal", "Anti-carbonation"],
    techChips: [
      { label: "Sika professional", cls: "bg-red-100 text-red-800" },
      { label: "Deep penetrating", cls: "bg-amber-100 text-amber-700" },
      { label: "Colourless", cls: "bg-blue-100 text-blue-700" },
      { label: "Anti-carbonation", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Sika Impregnation H is a penetrating silane-siloxane water repellent for concrete and masonry facades in the Sika professional remedial product range. Applied by brush, roller or low-pressure spray to the dry facade surface, it penetrates deep into the substrate pore structure and reacts with the substrate minerals to form a hydrophobic lining within the pores — repelling liquid water ingress while remaining vapour permeable (breathable). It significantly reduces chloride ion penetration and carbonation rate — making it particularly suitable for coastal concrete facades where chloride-induced corrosion of reinforcement is a design consideration. Sika Impregnation H is colourless and does not alter the visual appearance of the treated surface. Available through Sika's national trade and contractor supply network. Confirm current product name, application rate, substrate requirements, and surface dryness conditions from the current Sika Impregnation H TDS before specifying.",
    technicalProperties: [
      "Silane-siloxane penetrating water repellent — deep penetration into concrete and masonry pore structure",
      "Breathable — vapour permeable — does not trap moisture in the substrate",
      "Colourless — does not alter the visual appearance of the treated facade surface",
      "Reduces chloride ion penetration — anti-carbonation protection — suited to coastal concrete facades",
      "Available through Sika national trade and contractor supply network",
      "Confirm application rate, coverage, substrate dryness requirements from current Sika TDS before specifying",
    ],
    limitations: [
      "Substrate must be dry before application — confirm substrate moisture content per TDS before applying",
      "Does not bridge or seal cracks — specify crack sealant or repair system for cracked substrates before impregnation",
      "Not a surface coating — does not provide colour or topcoat protection — specify over coating separately if required",
      "Confirm current product name and TDS with Sika Australia — product range may be updated",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Sika distributors — national trade network", url: "https://aus.sika.com" },
      { name: "Confirm local distributor with Sika Australia", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions",
    accentColor: "#0369a1",
    name: "Mapei Antipluviol W",
    descriptionLine: "Siloxane water repellent impregnation for concrete, masonry and render — colourless breathable penetrating treatment — Mapei specialist product for facade water repellency and chloride protection",
    productType: "Siloxane penetrating water repellent impregnation — Mapei specialist system",
    filterTags: ["Siloxane", "Penetrating", "Water-repellent", "Colourless", "Concrete", "Masonry", "Render", "Breathable", "Coastal", "Anti-carbonation"],
    techChips: [
      { label: "Mapei specialist", cls: "bg-sky-100 text-sky-800" },
      { label: "Breathable", cls: "bg-green-100 text-green-700" },
      { label: "Colourless", cls: "bg-blue-100 text-blue-700" },
      { label: "Water-repellent", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription:
      "Mapei Antipluviol W is a siloxane penetrating water repellent impregnation for concrete, masonry, and render facades in the Mapei professional product range. Applied to dry substrate surfaces, it penetrates into the pore structure and reacts to form a hydrophobic surface within the pores, reducing liquid water absorption while remaining breathable. It reduces chloride ion penetration and slows carbonation on concrete facades — particularly relevant for buildings in coastal environments where chloride ingress is a corrosion risk factor. Antipluviol W is colourless and does not change the visual appearance of the treated facade. It can be used on its own as a protective impregnation or as a pre-treatment prior to protective coating. Available through Mapei's national trade and contractor supply network. Confirm current product name, application method, coverage, and substrate requirements from the current Mapei Antipluviol W TDS before specifying.",
    technicalProperties: [
      "Siloxane penetrating water repellent — reduces water absorption in concrete, masonry and render",
      "Breathable — vapour permeable — allows substrate to dry while repelling liquid water ingress",
      "Colourless — does not alter visual appearance of the treated facade surface",
      "Reduces chloride penetration and carbonation — relevant for coastal concrete facade protection",
      "Can be used as pre-treatment prior to protective coating application — confirm system from Mapei technical",
      "Confirm application rate, coverage, and substrate dryness from current Mapei Antipluviol W TDS",
    ],
    limitations: [
      "Substrate must be dry — confirm moisture content per TDS before applying penetrating impregnation",
      "Does not seal or bridge cracks — repair cracks before applying water repellent treatment",
      "Not a topcoat — provides no colour or decorative finish — specify coating separately if required",
      "Confirm current product name and system from Mapei Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Mapei distributors — national building trade network", url: "https://www.mapei.com/au" },
      { name: "Confirm local availability with Mapei Australia", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au/products",
    accentColor: "#7c3aed",
    name: "Parchem Nitocote Sealer 30",
    descriptionLine: "Silane penetrating water repellent sealer for concrete and masonry facades — deep penetrating colourless treatment — Parchem/Fosroc specialist product for water repellency and chloride protection",
    productType: "Silane penetrating sealer — concrete and masonry — Parchem/Fosroc specialist",
    filterTags: ["Silane", "Penetrating", "Water-repellent", "Colourless", "Concrete", "Masonry", "Breathable", "Coastal", "Anti-carbonation"],
    techChips: [
      { label: "Parchem specialist", cls: "bg-purple-100 text-purple-800" },
      { label: "Silane penetrating", cls: "bg-amber-100 text-amber-700" },
      { label: "Colourless", cls: "bg-blue-100 text-blue-700" },
      { label: "Chloride protection", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Parchem Nitocote Sealer 30 is a silane penetrating water repellent sealer for concrete and masonry facades in the Parchem/Fosroc professional construction products range. It penetrates deep into the substrate pore structure and reacts to form a hydrophobic lining within the pores — significantly reducing water absorption and chloride ion penetration while remaining breathable. It is primarily specified for concrete and masonry facades on commercial, multi-storey, and strata buildings in coastal and high-humidity environments where chloride-induced reinforcement corrosion is a long-term durability consideration. Colourless — does not change the visual appearance of the treated surface. Parchem has strong national distribution through trade supply to the remedial building contractor market. Confirm current product name, application method, coverage, and substrate requirements from the current Parchem Nitocote Sealer 30 TDS before specifying.",
    technicalProperties: [
      "Deep penetrating silane water repellent — penetrates into concrete and masonry pore structure",
      "Breathable — vapour permeable — substrate can dry while liquid water ingress is repelled",
      "Colourless — does not change the visual appearance of the treated facade",
      "Significantly reduces chloride ion penetration — anti-carbonation protection — suited to coastal concrete",
      "Available through Parchem national trade supply — strong remedial building market distribution",
      "Confirm application method, coverage rate, and substrate requirements from Parchem TDS before specifying",
    ],
    limitations: [
      "Substrate must be dry at time of application — confirm moisture content per TDS",
      "Does not fill or seal cracks — repair cracking before applying penetrating water repellent",
      "Not a surface topcoat — no colour or decorative protection — specify coating over if required",
      "Confirm current product name with Parchem Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national", url: "https://www.parchem.com.au" },
      { name: "Parchem — trade supply to remedial contractors", url: "https://www.parchem.com.au" },
      { name: "Confirm local branch with Parchem Australia", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Dry-Treat Australia",
    brandUrl: "https://www.drytreat.com",
    tdsUrl: "https://www.drytreat.com/products",
    accentColor: "#b45309",
    name: "Dry-Treat STAIN-PROOF Original",
    descriptionLine: "Premium fluoropolymer impregnating sealer for concrete, masonry and stone — deep penetrating water and oil repellent — long-lasting protection for Australian building facades and paved surfaces",
    productType: "Fluoropolymer penetrating impregnating sealer — concrete, masonry and stone",
    filterTags: ["Penetrating", "Water-repellent", "Colourless", "Concrete", "Masonry", "Breathable", "Coastal"],
    techChips: [
      { label: "Fluoropolymer", cls: "bg-amber-100 text-amber-800" },
      { label: "Water + oil repellent", cls: "bg-blue-100 text-blue-700" },
      { label: "Deep penetrating", cls: "bg-green-100 text-green-700" },
      { label: "Long-lasting", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Dry-Treat STAIN-PROOF Original is a premium fluoropolymer impregnating sealer for concrete, masonry, stone, and grout surfaces. Unlike silane-siloxane products which are organosilicon-based, STAIN-PROOF Original uses a fluoropolymer chemistry that provides both water and oil repellency deep within the substrate — making it particularly effective for surfaces exposed to both water ingress and oil or grease staining. It is breathable, colourless, and does not alter the visual appearance of the treated surface. Dry-Treat is an Australian company with a specialist focus on penetrating sealers and impregnating treatments for stone, concrete, masonry, and grout in both building facade and paving applications. STAIN-PROOF Original is positioned as a premium, long-lasting product with an extended service life compared to standard silane-siloxane products. Available through Dry-Treat's national trade and tile/stone supply network. Confirm current product name, application method, and substrate suitability from the current Dry-Treat STAIN-PROOF TDS before specifying.",
    technicalProperties: [
      "Fluoropolymer penetrating sealer — water and oil repellency within the substrate pore structure",
      "Breathable — vapour permeable — does not trap moisture in treated substrates",
      "Colourless — does not alter the appearance of treated concrete, masonry or stone",
      "Premium long-lasting treatment — extended service life compared to standard silane-siloxane products",
      "Australian company — specialist penetrating sealer range — national trade and tile/stone supply network",
      "Confirm application method, coverage, and substrate suitability from current Dry-Treat TDS before specifying",
    ],
    limitations: [
      "Premium pricing compared to standard silane-siloxane products — specify where water and oil repellency and long service life are required",
      "Substrate must be dry and clean before application — confirm surface preparation from TDS",
      "Does not seal cracks or fill defects — repair substrate before applying impregnating sealer",
      "Confirm current product name and suitability for facade concrete and masonry from Dry-Treat technical",
    ],
    procurementSources: [
      { name: "Dry-Treat Australia — trade supply", url: "https://www.drytreat.com" },
      { name: "Tile and stone trade suppliers — national", url: "https://www.drytreat.com" },
      { name: "Confirm local distributor with Dry-Treat Australia", url: "https://www.drytreat.com" },
    ],
  },
  {
    fullLabel: "Dulux / Dulux Acratex Australia",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/exterior",
    accentColor: "#059669",
    name: "Dulux Aquashield Exterior Concrete Sealer",
    descriptionLine: "Penetrating water repellent sealer for concrete, render and masonry — colourless breathable treatment as pre-coat preparation or standalone facade water repellency system",
    productType: "Penetrating concrete and masonry sealer — water repellent — Dulux system",
    filterTags: ["Penetrating", "Water-repellent", "Colourless", "Concrete", "Masonry", "Render", "Breathable", "Pre-coat"],
    techChips: [
      { label: "Water repellent", cls: "bg-green-100 text-green-800" },
      { label: "Colourless", cls: "bg-blue-100 text-blue-700" },
      { label: "Pre-coat prep", cls: "bg-amber-100 text-amber-700" },
      { label: "Breathable", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Dulux Aquashield Exterior Concrete Sealer is a penetrating water repellent sealer for concrete, render, and masonry surfaces in the Dulux exterior system. Applied to dry exterior surfaces, it penetrates into the substrate and forms a water-repellent treatment within the pore structure — reducing liquid water absorption while remaining vapour permeable. It can be used as a standalone water repellency treatment on concrete and render facades, or as a pre-coat preparation treatment before applying Dulux exterior coatings. Colourless — does not change the visual appearance of the treated surface. Dulux Aquashield is available through Dulux Trade Centres and trade retail channels nationally. Confirm current product name, application method, coverage rates, and substrate requirements from the current Dulux Aquashield product TDS before specifying. The Dulux Aquashield range includes products for different substrates — confirm the correct grade for concrete and render facade applications.",
    technicalProperties: [
      "Penetrating water repellent for concrete, render and masonry — reduces water absorption without film formation",
      "Breathable — vapour permeable — does not trap moisture in the substrate",
      "Colourless — does not alter visual appearance of treated facade surfaces",
      "Can be used as standalone treatment or pre-coat preparation before Dulux exterior coating systems",
      "Wide national availability through Dulux Trade Centres and trade retail",
      "Confirm current product grade, application rate, and coverage from Dulux Aquashield TDS before specifying",
    ],
    limitations: [
      "Substrate must be dry at time of application — moisture content requirements per TDS",
      "Does not seal or bridge cracks — repair cracking before applying sealer",
      "Confirm correct Aquashield product grade for concrete and render facade applications — range includes multiple grades",
      "Touch-up or reapplication after a period of service may require full surface reapplication",
    ],
    procurementSources: [
      { name: "Dulux Trade Centres — national", url: "https://www.dulux.com.au" },
      { name: "Bunnings — trade and retail", url: "https://www.bunnings.com.au" },
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au/products",
    accentColor: "#dc2626",
    name: "Ardex AR 990 Silane Siloxane Sealer",
    descriptionLine: "Silane-siloxane penetrating water repellent for concrete and masonry — colourless breathable deep penetrating treatment — Ardex specialist product for water repellency and facade protection",
    productType: "Silane-siloxane penetrating water repellent — Ardex specialist system",
    filterTags: ["Silane", "Siloxane", "Penetrating", "Water-repellent", "Colourless", "Concrete", "Masonry", "Render", "Breathable", "Coastal", "Anti-carbonation"],
    techChips: [
      { label: "Ardex specialist", cls: "bg-red-100 text-red-800" },
      { label: "Silane-siloxane", cls: "bg-amber-100 text-amber-700" },
      { label: "Colourless", cls: "bg-blue-100 text-blue-700" },
      { label: "Breathable", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Ardex AR 990 is a silane-siloxane penetrating water repellent for concrete and masonry facades in the Ardex specialist remedial product range. Applied to dry facade surfaces, it penetrates into the substrate pore structure and reacts to form a hydrophobic lining within the pores — reducing water absorption and chloride ion penetration while remaining breathable and colourless. It is suitable for concrete, masonry, and render facades on residential and commercial strata buildings where water repellency and anti-carbonation protection are required without altering the visual appearance of the facade. Ardex has a strong national distribution network through trade supply to the remedial building and waterproofing contractor market. Confirm current product name, application method, coverage, and substrate requirements from the current Ardex AR 990 product TDS and Ardex Australia technical before specifying.",
    technicalProperties: [
      "Silane-siloxane penetrating water repellent — deep penetration into concrete and masonry pore structure",
      "Breathable — vapour permeable — substrate can dry while liquid water ingress is repelled",
      "Colourless — does not change the visual appearance of treated concrete, masonry or render",
      "Reduces chloride penetration and carbonation rate — suited to coastal and high-humidity exposures",
      "Ardex specialist remedial product — strong national trade supply distribution",
      "Confirm application method, coverage rate, and substrate requirements from Ardex AR 990 TDS",
    ],
    limitations: [
      "Substrate must be dry at time of application — confirm moisture content requirements from TDS",
      "Does not bridge or seal cracks — repair cracking before applying penetrating water repellent",
      "Not a surface topcoat — no decorative or colour protection — specify coating over if required",
      "Confirm current product name with Ardex Australia technical — product range may be updated",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Ardex distributors — national remedial trade network", url: "https://www.ardex.com.au" },
      { name: "Confirm local availability with Ardex Australia", url: "https://www.ardex.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Silane", label: "Silane" },
  { id: "Siloxane", label: "Siloxane" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Water-repellent", label: "Water-repellent" },
  { id: "Colourless", label: "Colourless" },
  { id: "Concrete", label: "Concrete" },
  { id: "Masonry", label: "Masonry" },
  { id: "Render", label: "Render" },
  { id: "Breathable", label: "Breathable" },
  { id: "Coastal", label: "Coastal" },
  { id: "Anti-carbonation", label: "Anti-carbonation" },
  { id: "Pre-coat", label: "Pre-coat" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  chemistry: string;
  colourless: string;
  breathable: string;
  antiCarb: string;
  coastal: string;
  primaryUse: string;
}[] = [
  { product: "Impregnation H", brand: "Sika", chemistry: "Silane-siloxane", colourless: "Yes", breathable: "Yes", antiCarb: "Yes", coastal: "Yes", primaryUse: "Sika professional — concrete facades — chloride protection" },
  { product: "Antipluviol W", brand: "Mapei", chemistry: "Siloxane", colourless: "Yes", breathable: "Yes", antiCarb: "Yes", coastal: "Yes", primaryUse: "Mapei specialist — concrete, masonry and render — anti-carbonation" },
  { product: "Nitocote Sealer 30", brand: "Parchem/Fosroc", chemistry: "Silane", colourless: "Yes", breathable: "Yes", antiCarb: "Yes", coastal: "Yes", primaryUse: "Parchem specialist — commercial and strata — chloride protection" },
  { product: "STAIN-PROOF Original", brand: "Dry-Treat", chemistry: "Fluoropolymer", colourless: "Yes", breathable: "Yes", antiCarb: "Confirm TDS", coastal: "Yes", primaryUse: "Premium — water and oil repellent — long-lasting — Australian specialist" },
  { product: "Aquashield Concrete Sealer", brand: "Dulux", chemistry: "Penetrating sealer", colourless: "Yes", breathable: "Yes", antiCarb: "Confirm TDS", coastal: "Confirm TDS", primaryUse: "Dulux system — standalone or pre-coat — wide national availability" },
  { product: "AR 990 Silane Siloxane", brand: "Ardex", chemistry: "Silane-siloxane", colourless: "Yes", breathable: "Yes", antiCarb: "Yes", coastal: "Yes", primaryUse: "Ardex specialist remedial — concrete and masonry — national" },
];

const TECH_INFO = {
  typicalApplications: [
    "Water repellency treatment on concrete and masonry facades to reduce water ingress without altering visual appearance",
    "Chloride protection on coastal concrete building facades — reduces chloride ion penetration and carbonation",
    "Pre-coat treatment on porous masonry and render before protective coating to improve system durability",
    "Anti-carbonation protection on concrete panel facades to protect reinforcement from CO₂-induced corrosion",
    "Water repellency treatment on heritage and exposed masonry where surface coating would alter the visual appearance",
  ],
  selectionCriteria: [
    "Select silane-siloxane where both deep penetration and broad-spectrum water repellency are required",
    "Select silane where the substrate has small pore structure (dense concrete) — silane molecules are smaller and penetrate deeper",
    "Select siloxane or silane-siloxane blend for porous masonry, brick and render substrates",
    "Select fluoropolymer product (Dry-Treat) where oil repellency is also required alongside water repellency",
    "Always apply to a dry substrate — confirm moisture content from TDS before application",
    "Repair all cracks before applying penetrating water repellent — penetrating sealers do not bridge or seal cracks",
  ],
  limitations: [
    "Penetrating water repellents do NOT seal or bridge cracks — crack repair must precede application",
    "Substrate must be dry at time of application — penetrating sealers applied to wet substrates will not bond correctly",
    "Not a substitute for structural waterproofing — do not specify as the sole waterproofing system for below-ground or wet areas",
    "Not a surface coating — provides no decorative finish, colour, or UV protection — specify coating separately if required",
    "Service life is limited — retreatment will be required over the building lifecycle — confirm expected service life from TDS",
  ],
  standardsNotes: [
    "AS 4548 — Guide to long-life coatings for concrete and masonry — relevant for penetrating sealer specification",
    "AS 3600 — Concrete structures — durability provisions — chloride and carbonation protection reference",
    "NATSPEC — Section 0233 — Exterior painting and protective coating specification",
    "Manufacturer TDS — confirm application rate, coverage, substrate moisture content, and service life before specifying",
    "Engage a remedial or structural engineer to confirm the appropriate protection system for concrete facades with corrosion risk",
  ],
  suitableDefects: [
    "Moisture ingress through porous render and masonry facades — water absorption reducing with penetrating water repellent treatment",
    "Carbonation-affected concrete facades where anti-carbonation protection is required to slow further carbonation depth",
    "Coastal concrete facades with chloride exposure risk — silane-siloxane impregnation as first line of protection",
    "Porous masonry and render facades where surface coating is not appropriate — heritage or architectural concrete",
    "Concrete and masonry facades with recurring moisture staining from rain absorption — water repellency treatment",
  ],
  typicalSubstrates: [
    "Concrete — dense and porous — commercial and strata building facade panels — silane or silane-siloxane penetrant",
    "Brick masonry — porous fired clay brick — siloxane or silane-siloxane penetrant for water repellency",
    "Cement render — porous render on masonry backgrounds — penetrating water repellent pre-coat or standalone treatment",
    "Stone and sandstone masonry — heritage and exposed stone facades — confirm product suitability with manufacturer",
    "Concrete block masonry — medium porosity — silane-siloxane penetrant for water repellency and chloride protection",
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
      {items.length > limit && (<button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Show less ↑" : `+${extra} more ↓`}</button>)}
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
              {src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}
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
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && (<div className="mt-2 flex flex-wrap gap-1.5">{chips.map((chip) => (<span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>))}</div>)}</>)}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
    </div>
  );
}

export function PenetratingSilaneSiloxaneIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are penetrating silane-siloxane systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Penetrating silane-siloxane water repellents are invisible, breathable treatments applied to concrete and masonry facades that penetrate into the substrate pore structure and chemically bond to form a hydrophobic lining within the pores. They significantly reduce liquid water absorption while remaining vapour permeable — allowing the substrate to breathe — and do not alter the visual appearance of the treated surface.
        </p>
        {expanded && (
          <>
            <p>
              The key distinction from surface coatings is that penetrating water repellents work within the substrate rather than forming a film on the surface. This makes them suitable for facades where surface coatings would be inappropriate — heritage masonry, architectural concrete, exposed brick — and for substrates where breathability is essential to avoid moisture entrapment. They also provide anti-carbonation protection and reduce chloride ion penetration, making them particularly valuable on coastal concrete facades where chloride-induced corrosion of reinforcement is a durability concern.
            </p>
            <p>
              The three main chemistry types are: silane (smaller molecule, deeper penetration, better for dense concrete), siloxane (larger molecule, better for porous masonry and brick), and silane-siloxane blends (compromise between penetration depth and broad substrate suitability). Fluoropolymer-based penetrating sealers (e.g. Dry-Treat) provide both water and oil repellency. All require dry substrate at time of application and do not bridge or seal cracks — crack repair must precede application.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
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

export function PenetratingSilaneSiloxaneProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">6 products — 6 brands — penetrating silane-siloxane systems — scroll to view all</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (<button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>);
          })}
          {activeFilters.size > 0 && (<button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>)}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more</span>
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
                      {product.tdsUrl && (<a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>)}
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
                  <div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p><CollapsibleList items={product.technicalProperties} icon="check" limit={3} /></div>
                  <div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p><CollapsibleList items={product.limitations} icon="x" limit={3} /></div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3"><CollapsibleSources sources={product.procurementSources} /></div>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of penetrating silane-siloxane systems. Confirm all selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Chemistry</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colourless</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Breathable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Anti-carbonation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.chemistry}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.colourless}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.breathable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.antiCarb}</td>
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
