"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import { DataNote } from "@/app/repair-systems/_components/ProductPageShared";

type FilterTag =
  | "Crack-bridging"
  | "Elastomeric"
  | "High-elongation"
  | "Waterproof"
  | "Active-crack"
  | "Concrete"
  | "Render"
  | "Masonry"
  | "Water-based"
  | "Coastal"
  | "Reinforced"
  | "Specialist";

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
  dataNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-protection/protective-coatingslinings/sikagard-550-w-elastic.html",
    accentColor: "#e2003a",
    name: "Sika Sikagard 550 W Elastic",
    descriptionLine: "Specialist high-elongation elastomeric crack-bridging coating for concrete and masonry facades — Sika professional system for active crack accommodation, waterproofing and carbonation protection",
    productType: "High-elongation elastomeric crack-bridging coating — Sika professional system",
    filterTags: ["Crack-bridging", "Elastomeric", "High-elongation", "Waterproof", "Active-crack", "Concrete", "Masonry", "Water-based", "Coastal", "Specialist"],
    techChips: [
      { label: "Sika professional", cls: "bg-red-100 text-red-800" },
      { label: "High elongation", cls: "bg-amber-100 text-amber-700" },
      { label: "Crack-bridging", cls: "bg-blue-100 text-blue-700" },
      { label: "Anti-carbonation", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Sika Sikagard 550 W Elastic is a specialist high-elongation elastomeric crack-bridging coating in the Sika professional facade protection range. It is specifically designed to bridge active and dynamic cracks in concrete and masonry facades — providing a continuous flexible waterproof membrane that accommodates crack movement over the service life without splitting or delaminating. Sikagard 550 W Elastic provides anti-carbonation protection, UV resistance, and is suitable for coastal environments. It is applied as part of a complete Sika system — including Sika primer, reinforcement fabric at crack locations, and Sikagard 550 W Elastic topcoat — to achieve the required crack-bridging performance class. It is primarily specified on commercial and multi-storey strata concrete and masonry facades where crack movement is an ongoing design consideration. Confirm current system specification, primer requirements, fabric reinforcement details, DFT, and performance class from the current Sika Sikagard 550 W Elastic TDS and Sika technical before specifying.",
    technicalProperties: [
      "Very high elongation at break — designed to bridge active and dynamic cracks in concrete and masonry",
      "Anti-carbonation protection — reduces CO₂ diffusion into concrete — relevant for reinforcement corrosion protection",
      "Waterproof — continuous flexible waterproof membrane over the facade surface",
      "UV-resistant and coastal rated — suitable for demanding Australian exterior exposures",
      "System application — primer + fabric reinforcement at cracks + Sikagard 550 W Elastic — confirm from Sika technical",
      "Confirm crack-bridging performance class and system specification from current Sika TDS before specifying",
    ],
    limitations: [
      "Structural crack investigation required before application — confirm cause of cracking before specifying crack-bridging coating",
      "System application mandatory — do not apply crack-bridging coating without primer and reinforcement fabric at active cracks",
      "Not a structural repair system — crack-bridging coating does not restore structural capacity — specify engineer-designed repair first",
      "Specialist product — confirm current system specification and performance class with Sika Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Sika distributors — national building trade network", url: "https://aus.sika.com" },
      { name: "Confirm local distributor with Sika Australia", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#0369a1",
    name: "Mapei Elastocolor W",
    descriptionLine: "Elastomeric crack-bridging waterproof coating for concrete and masonry facades — Mapei specialist system with high elongation, anti-carbonation protection and UV resistance",
    productType: "Elastomeric crack-bridging coating — Mapei specialist system — concrete and masonry",
    dataNote: "Owner to confirm — product name variation unconfirmed: the Mapei product confirmed in the Elastomeric Coating Systems file is 'Mapei Elastocolor Paint', and 'Elastocolor W' may be a separate crack-bridging grade or a European variant. Confirm whether 'Elastocolor W' is the correct current AU crack-bridging product name, distinct from 'Elastocolor Paint', with Mapei Australia technical before publishing.",
    filterTags: ["Crack-bridging", "Elastomeric", "High-elongation", "Waterproof", "Active-crack", "Concrete", "Masonry", "Water-based", "Coastal", "Specialist"],
    techChips: [
      { label: "Mapei specialist", cls: "bg-sky-100 text-sky-800" },
      { label: "Crack-bridging", cls: "bg-amber-100 text-amber-700" },
      { label: "Anti-carbonation", cls: "bg-green-100 text-green-700" },
      { label: "Waterproof", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription:
      "Mapei Elastocolor W is a specialist elastomeric crack-bridging waterproof coating for concrete and masonry facades in the Mapei professional remedial product range. It provides high elongation at break enabling the coating to bridge active cracks in the substrate — combined with waterproofing, UV resistance, anti-fungal properties, and anti-carbonation protection. Applied as part of a Mapei system — primer, reinforcement fabric at active crack locations, and Elastocolor W topcoat — it forms a continuous flexible waterproof membrane on the facade surface. It is primarily specified on concrete and masonry strata building facades where active crack movement is a design consideration alongside waterproofing and carbonation protection. Confirm current system specification, reinforcement fabric requirements, primer details, DFT, and performance class from the current Mapei Elastocolor W TDS and Mapei Australia technical before specifying.",
    technicalProperties: [
      "High elongation at break — bridges active cracks in concrete and masonry facades",
      "Anti-carbonation protection — reduces CO₂ diffusion — relevant for reinforcement corrosion protection in concrete",
      "Waterproof — continuous flexible waterproof membrane — reduces water ingress through cracks and render",
      "UV-resistant and anti-fungal — suitable for Australian exterior exposure including coastal environments",
      "System application — primer + fabric reinforcement + Elastocolor W — confirm from Mapei technical",
      "Confirm crack-bridging performance class and system from current Mapei TDS before specifying",
    ],
    limitations: [
      "Structural crack investigation required before application — confirm cause of cracking with engineer before specifying",
      "System application mandatory — primer and fabric reinforcement at active cracks required — not a direct-apply coating",
      "Not a structural repair — crack-bridging membrane does not restore structural capacity",
      "Confirm current system specification and TDS with Mapei Australia technical before specifying",
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
    accentColor: "#7c3aed",
    name: "Parchem Nitocote EP402",
    descriptionLine: "High-performance elastomeric waterproof facade coating with crack-bridging capability — Fosroc/Parchem specialist system for concrete and masonry facades with active crack movement",
    productType: "High-performance elastomeric crack-bridging facade coating — Parchem/Fosroc system",
    filterTags: ["Crack-bridging", "Elastomeric", "High-elongation", "Waterproof", "Active-crack", "Concrete", "Masonry", "Coastal", "Reinforced", "Specialist"],
    techChips: [
      { label: "Parchem specialist", cls: "bg-purple-100 text-purple-800" },
      { label: "High-performance", cls: "bg-amber-100 text-amber-700" },
      { label: "Crack-bridging", cls: "bg-blue-100 text-blue-700" },
      { label: "Waterproof", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Parchem Nitocote EP402 is a high-performance elastomeric waterproof facade coating with crack-bridging capability in the Parchem/Fosroc professional construction products range. It is a specialist product for concrete and masonry facades requiring a durable, flexible waterproof membrane with the capacity to bridge active cracks over the service life. Nitocote EP402 is applied as part of a Parchem system — including primer and reinforcement fabric at active crack locations — to achieve the required crack-bridging performance. It is particularly suited to commercial, multi-storey and industrial building facades in demanding coastal and high-UV Australian environments. Parchem has a strong national distribution network through trade supply to the remedial building contractor market. Confirm current product specification, system documentation, reinforcement fabric requirements, primer details, and DFT from the current Parchem Nitocote EP402 TDS and Parchem technical before specifying.",
    technicalProperties: [
      "High elongation at break — specialist crack-bridging capability for active cracks in concrete and masonry",
      "Waterproof — flexible waterproof membrane suitable for facades with ongoing crack movement",
      "UV-resistant — suitable for demanding Australian exterior exposures including coastal environments",
      "System application — primer + fabric reinforcement at cracks + Nitocote EP402 — confirm from Parchem technical",
      "Available through Parchem national trade supply network — strong remedial building market distribution",
      "Confirm current product specification and performance class from Parchem TDS before specifying",
    ],
    limitations: [
      "Structural investigation required before specification — confirm cause and rate of cracking with structural engineer",
      "System application mandatory — do not apply without primer and fabric reinforcement at active crack locations",
      "Not a structural repair system — membrane does not restore structural capacity of cracked concrete",
      "Confirm current product name and system specification with Parchem Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national", url: "https://www.parchem.com.au" },
      { name: "Parchem — trade supply to remedial contractors", url: "https://www.parchem.com.au" },
      { name: "Confirm local branch with Parchem Australia", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Dulux Acratex Australia",
    brandUrl: "https://www.dulux.com.au",
    accentColor: "#b45309",
    name: "Dulux Acratex Permaflex",
    descriptionLine: "High-elongation elastomeric crack-bridging exterior coating for masonry and render facades — Dulux Acratex specialist system for facades with active crack movement and waterproofing requirements",
    productType: "High-elongation elastomeric crack-bridging coating — Dulux Acratex system",
    dataNote: "Owner to confirm — product name not found: 'Dulux Acratex Permaflex' does not appear in the current Dulux Acratex range on dulux.com.au; the confirmed Acratex crack-bridging/high-elongation product is likely 'Acraskin' or 'AcraShield Advance'. Also note the referenced primer 'Acratex Prep Coat' has been superseded by 'AcraPrime 501' (render cured 28+ days) and 'Green Render Sealer' (render cured under 28 days). Confirm the correct current crack-bridging product name and primer with Dulux Acratex technical before publishing.",
    filterTags: ["Crack-bridging", "Elastomeric", "High-elongation", "Waterproof", "Active-crack", "Render", "Masonry", "Water-based", "Coastal", "Reinforced", "Specialist"],
    techChips: [
      { label: "Dulux Acratex", cls: "bg-amber-100 text-amber-800" },
      { label: "High-elongation", cls: "bg-red-100 text-red-800" },
      { label: "Crack-bridging", cls: "bg-blue-100 text-blue-700" },
      { label: "Waterproof", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "TODO: owner confirm — PRODUCT NAME NOT CONFIRMED. 'Dulux Acratex Permaflex' was not found in the current Dulux Acratex product range as of verification date. The Dulux Acratex crack-bridging product is likely 'Acraskin' or 'AcraShield Advance' — the correct current product must be confirmed with Dulux Acratex technical. Note also: the primer 'Dulux Acratex Prep Coat' referenced in this card has been superseded — the current Acratex primers are 'AcraPrime 501' (for render cured 28+ days) and 'Green Render Sealer' (for render cured less than 28 days). All system specifications, DFT, and primer requirements must be sourced from the current Dulux Acratex TDS for the confirmed product before specifying.",
    technicalProperties: [
      "Very high elongation at break — designed for facades with active crack movement requiring ongoing accommodation",
      "Crack-bridging system — applied with fabric reinforcement at active crack locations as part of the Acratex system",
      "Waterproof — continuous flexible waterproof membrane over the entire facade surface",
      "UV-resistant and suitable for coastal environments — confirm coastal grade performance from TDS",
      "System application — Acratex Prep Coat + reinforcement fabric + Permaflex — confirm from Dulux Acratex technical",
      "Wide national availability through Dulux Trade Centres and Dulux Acratex trade supply network",
    ],
    limitations: [
      "Structural crack investigation required before specification — confirm cause of cracking with structural engineer",
      "System application mandatory — primer and fabric reinforcement at active cracks required for full performance",
      "Not a structural repair system — membrane does not restore structural capacity of cracked render or masonry",
      "Confirm current product name, performance class, and system from current Dulux Acratex TDS before specifying",
    ],
    procurementSources: [
      { name: "Dulux Acratex — trade supply", url: "https://www.dulux.com.au" },
      { name: "Dulux Trade Centres — national", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade — trade account", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#059669",
    name: "Ardex WPM 300 / Ardiflex",
    descriptionLine: "Elastomeric waterproof crack-bridging membrane system for concrete and masonry facades — Ardex specialist remedial product range for facades with active cracking and moisture ingress",
    productType: "Elastomeric waterproof crack-bridging membrane — Ardex specialist system",
    filterTags: ["Crack-bridging", "Elastomeric", "High-elongation", "Waterproof", "Active-crack", "Concrete", "Masonry", "Water-based", "Coastal", "Reinforced", "Specialist"],
    techChips: [
      { label: "Ardex specialist", cls: "bg-green-100 text-green-800" },
      { label: "WPM system", cls: "bg-teal-100 text-teal-700" },
      { label: "Crack-bridging", cls: "bg-blue-100 text-blue-700" },
      { label: "Waterproof", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription:
      "Ardex WPM 300 (Waterproofing Membrane) and Ardiflex are specialist elastomeric waterproof crack-bridging membrane systems in the Ardex professional remedial product range for concrete and masonry facades with active cracking and moisture ingress. Ardex positions these products as part of complete facade waterproofing and protection systems for the remedial building market, providing high-elongation crack-bridging combined with waterproof membrane continuity over the full facade surface. Applied with Ardex primer and reinforcement fabric at active crack locations, the system provides a durable flexible waterproof barrier suitable for demanding coastal and high-UV Australian exposures. Ardex has a strong national distribution network through trade supply to remedial building contractors and waterproofing specialists. Confirm current product name, system specification, reinforcement details, and DFT from Ardex Australia technical and the current product TDS before specifying.",
    technicalProperties: [
      "Elastomeric waterproof membrane — high elongation crack-bridging performance for active cracks in concrete and masonry",
      "Waterproof membrane system — suitable for facades with significant moisture ingress through cracking",
      "UV-resistant — suitable for Australian exterior exposures including demanding coastal environments",
      "System application — Ardex primer + reinforcement fabric + WPM 300/Ardiflex — confirm from Ardex technical",
      "Strong Ardex national distribution — trade supply to remedial building and waterproofing contractors",
      "Confirm current product name, system specification, and DFT from Ardex TDS before specifying",
    ],
    limitations: [
      "Structural investigation required — confirm cause of cracking and structural adequacy before applying membrane",
      "System application mandatory — primer and fabric reinforcement required — not a direct-apply product",
      "Not a structural repair system — membrane does not restore structural capacity of cracked substrate",
      "Confirm current product name and system — Ardex WPM range may be updated — confirm with Ardex technical",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Ardex distributors — national remedial trade network", url: "https://www.ardex.com.au" },
      { name: "Confirm local availability with Ardex Australia", url: "https://www.ardex.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Crack-bridging", label: "Crack-bridging" },
  { id: "Elastomeric", label: "Elastomeric" },
  { id: "High-elongation", label: "High-elongation" },
  { id: "Waterproof", label: "Waterproof" },
  { id: "Active-crack", label: "Active crack" },
  { id: "Concrete", label: "Concrete" },
  { id: "Render", label: "Render" },
  { id: "Masonry", label: "Masonry" },
  { id: "Water-based", label: "Water-based" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "Reinforced", label: "Reinforced system" },
  { id: "Specialist", label: "Specialist" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  elongation: string;
  crackBridging: string;
  antiCarb: string;
  coastal: string;
  system: string;
  primaryUse: string;
}[] = [
  {
    product: "Sikagard 550 W Elastic",
    brand: "Sika",
    elongation: "Very high",
    crackBridging: "Yes — active cracks",
    antiCarb: "Yes",
    coastal: "Yes",
    system: "Sika primer + fabric + topcoat",
    primaryUse: "Sika professional — concrete facades — commercial and strata",
  },
  {
    product: "Elastocolor W",
    brand: "Mapei",
    elongation: "Very high",
    crackBridging: "Yes — active cracks",
    antiCarb: "Yes",
    coastal: "Yes",
    system: "Mapei primer + fabric + topcoat",
    primaryUse: "Mapei remedial — concrete and masonry — anti-carbonation",
  },
  {
    product: "Nitocote EP402",
    brand: "Parchem/Fosroc",
    elongation: "High",
    crackBridging: "Yes — active cracks",
    antiCarb: "Confirm TDS",
    coastal: "Yes",
    system: "Parchem primer + fabric + topcoat",
    primaryUse: "Parchem specialist — commercial and industrial facades — national",
  },
  {
    product: "Acratex Permaflex",
    brand: "Dulux",
    elongation: "Very high",
    crackBridging: "Yes — active cracks",
    antiCarb: "Confirm TDS",
    coastal: "Yes",
    system: "Acratex Prep Coat + fabric + Permaflex",
    primaryUse: "Dulux Acratex — masonry and render — wide national availability",
  },
  {
    product: "WPM 300 / Ardiflex",
    brand: "Ardex",
    elongation: "High",
    crackBridging: "Yes — active cracks",
    antiCarb: "Confirm TDS",
    coastal: "Yes",
    system: "Ardex primer + fabric + WPM",
    primaryUse: "Ardex specialist — waterproofing system — remedial contractors",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Crack-bridging membrane system on concrete and masonry facades where active crack movement is an ongoing design consideration",
    "Waterproof and crack-bridging protection on multi-storey strata building facades with recurring crack formation",
    "Anti-carbonation and waterproof protection on concrete facades where reinforcement corrosion is a design consideration",
    "Remedial coating on facades where standard elastomeric coating DFT is insufficient to accommodate the crack width change",
    "Specialist system application by remedial building contractors on commercial and Class 2 strata building facades",
  ],
  selectionCriteria: [
    "Specify crack-bridging coating system only after structural investigation — confirm cause of cracking and structural adequacy",
    "Select crack-bridging system where crack width change over the annual thermal cycle exceeds what standard elastomeric coating can accommodate",
    "Specify complete system — primer, fabric reinforcement at active cracks, and crack-bridging topcoat — never apply topcoat alone",
    "Confirm performance class (crack-bridging class per AS 4548 or manufacturer classification) against the design requirement",
    "Engage specialist facade or remedial engineer to specify the crack-bridging system for complex or multi-storey facades",
    "Confirm anti-carbonation performance if specifying on concrete facades with reinforcement corrosion as a design consideration",
  ],
  limitations: [
    "Crack-bridging coatings do NOT restore structural capacity — structural investigation and repair must precede coating application",
    "System application is mandatory — applying topcoat without primer and fabric reinforcement at active cracks will not achieve crack-bridging performance",
    "Higher cost than standard elastomeric coating — specify only where crack movement exceeds standard elastomeric coating capability",
    "Not suitable for cracks caused by structural deficiency — structural repair required before coating",
    "Application requires experienced remedial building contractor — confirm installer competency before specifying",
  ],
  standardsNotes: [
    "AS 4548 — Guide to long-life coatings for concrete and masonry — crack-bridging performance classification reference",
    "AS 3600 — Concrete structures — confirms investigation requirements before coating actively cracked concrete",
    "NATSPEC — Section 0233 — Exterior painting and protective coating specification",
    "Manufacturer TDS — confirm crack-bridging performance class, system specification, and DFT before specifying",
    "Engage a remedial or structural engineer to specify crack-bridging coating systems on multi-storey or complex facades",
  ],
  suitableDefects: [
    "Active fine and hairline cracking in concrete and masonry facades — moisture ingress through actively moving cracks",
    "Recurring crack formation on facades with significant thermal cycling — where standard elastomeric coating has failed to bridge",
    "Concrete facades with carbonation-induced cracking requiring anti-carbonation crack-bridging membrane",
    "Masonry and render facades with structural movement cracking — after structural investigation confirms coating is appropriate",
    "Facades where previous elastomeric coating has split at crack locations due to insufficient elongation capacity",
  ],
  typicalSubstrates: [
    "Concrete panel facades — commercial and multi-storey strata — primary substrate for specialist crack-bridging systems",
    "Cement render over masonry — facades with thermal cycling crack formation requiring high-elongation membrane",
    "Brick and block masonry — crack-bridging system for facade walls with recurring mortar joint cracking",
    "Precast concrete elements — confirm system suitability for precast substrate surface preparation",
    "Existing sound elastomeric coating — confirm compatibility before applying new crack-bridging system over old",
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
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a>
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
              {chips.map((chip) => (<span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>))}
            </div>
          )}
        </>
      )}
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

export function ElastomericCrackBridgingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are elastomeric crack-bridging coating systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Elastomeric crack-bridging coatings are specialist high-elongation membrane systems for concrete and masonry facades where active crack movement requires a coating capable of accommodating crack width change over the service life without splitting. They are significantly more sophisticated than standard elastomeric coatings and are applied as complete systems with primer, reinforcement fabric, and topcoat.
        </p>
        {expanded && (
          <>
            <p>
              The distinction between an elastomeric coating and a crack-bridging system is elongation at break and system design. Standard elastomeric coatings accommodate fine and hairline cracks in a quiescent or slow-moving state. Crack-bridging systems are engineered to bridge actively moving cracks — cracks where the width changes seasonally due to thermal cycling or structural movement — without the membrane splitting or losing waterproof continuity. The reinforcement fabric embedded in the membrane at active crack locations is a critical component of the system.
            </p>
            <p>
              Crack-bridging coating systems are specialist products typically available through remedial building trade supply rather than general retail. They should be specified after a thorough structural investigation has confirmed the cause of cracking and established that structural repair alone is not sufficient — or that coating is the appropriate surface protection after structural repair. Engaging a remedial or facade engineer to specify the system is strongly recommended for multi-storey or complex facade applications.
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

export function ElastomericCrackBridgingProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">5 products — 5 brands — elastomeric crack-bridging coating systems — scroll to view all</p>
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
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <CollapsibleList items={product.technicalProperties} icon="check" limit={3} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList items={product.limitations} icon="x" limit={3} />
                  </div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3 space-y-2">
                  {product.dataNote && <DataNote text={product.dataNote} />}
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of elastomeric crack-bridging coating systems. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Elongation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Crack-bridging</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Anti-carbonation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.elongation}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.crackBridging}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.antiCarb}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.system}</td>
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
