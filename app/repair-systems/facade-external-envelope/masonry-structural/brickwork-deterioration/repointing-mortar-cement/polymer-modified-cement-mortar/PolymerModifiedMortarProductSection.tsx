"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Sika"
  | "Mapei"
  | "Parchem"
  | "Ardex"
  | "National"
  | "Polymer-modified"
  | "High-bond"
  | "Coastal"
  | "Parapet"
  | "AS-3700"
  | "Pre-bagged";

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
    accentColor: "#0369a1",
    name: "Sika Monotop-612 / SikaRep Repointing Mortar — Polymer-Modified",
    descriptionLine: "Sika polymer-modified cementitious repointing mortar — improved bond and reduced shrinkage — for hard exposed masonry joints, parapets, and coastal zones — confirm current Sika AU product designation before specifying",
    productType: "Polymer-modified cement repointing mortar — Sika Australia — national supply",
    filterTags: ["Sika", "National", "Polymer-modified", "High-bond", "Coastal", "Parapet", "AS-3700", "Pre-bagged"],
    techChips: [
      { label: "Sika Australia", cls: "bg-sky-100 text-sky-800" },
      { label: "Polymer-modified", cls: "bg-green-100 text-green-700" },
      { label: "High bond strength", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm AU product code", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Sika Australia supplies polymer-modified cementitious repair and repointing mortars for masonry facade remediation on Class 2 strata buildings. Sika's repointing mortar range includes polymer-modified, pre-bagged products formulated for improved adhesion and reduced shrinkage compared to standard cement mortars. Products in the SikaMonoTop and SikaRep series are typically used for masonry repair and repointing in high-exposure and high-movement locations — parapets, exposed copings, coastal facades, and zones where standard cement mortar has repeatedly failed. The specific current Australian product designation for polymer-modified masonry repointing must be confirmed with Sika Australia technical — Sika product range designations are subject to periodic revision and the current Australian catalogue may differ from international product data. Sika is available nationally through Sika Australia trade branches, Parchem Construction Supplies, and specialist building trade merchants. Confirm mortar class designation (AS 3700), compressive strength, pot life, and colour availability from the current Sika Australia TDS before specifying.",
    technicalProperties: [
      "Polymer modification improves bond strength to existing masonry — reduces debonding and mortar pop-out risk in thermally active joints",
      "Reduced shrinkage versus plain cement mortar — narrower shrinkage crack widths at mortar-to-brick interface",
      "Pre-bagged — add water only on site — consistent proportioning per bag",
      "Sika Australia national distribution — trade branches and Parchem network",
      "Coastal and parapet applications — improved water resistance compared to standard cement mortar",
      "Confirm AS 3700 mortar class, compressive strength and colour range with Sika AU technical before specifying",
    ],
    limitations: [
      "Confirm current Australian product designation with Sika Australia technical — SikaMonoTop/SikaRep range is subject to revision",
      "Higher cost than standard GP cement + lime or pre-mixed masonry cement mortars — justify use only where standard mortar has failed",
      "Polymer-modified cement mortars are still relatively rigid — not suitable for soft, historic, or lime-mortar brickwork",
      "Pot life shorter than plain cement mortar — mix only what can be placed within manufacturer stated pot life",
    ],
    procurementSources: [
      { name: "Sika Australia — trade branches nationally", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies — national (Sika distributor)", url: "https://www.parchem.com.au" },
      { name: "Building trade merchants — confirm local Sika stock", url: "https://aus.sika.com" },
      { name: "Sika direct — confirm current product code and availability before ordering", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#b45309",
    name: "Mapei Mape-Antique MC / Mapegrout BM — Polymer-Modified Repointing Mortar",
    descriptionLine: "Mapei polymer-modified masonry repointing mortars — Mape-Antique MC (conservation masonry) or Mapegrout BM (structural repair base) — improved bond, reduced shrinkage — national supply through Mapei and Bayset",
    productType: "Polymer-modified cement repointing mortar — Mapei Australia — national supply",
    filterTags: ["Mapei", "National", "Polymer-modified", "High-bond", "Coastal", "Parapet", "AS-3700", "Pre-bagged"],
    techChips: [
      { label: "Mapei Australia", cls: "bg-amber-100 text-amber-800" },
      { label: "Mape-Antique MC", cls: "bg-slate-100 text-slate-700" },
      { label: "Polymer-modified", cls: "bg-green-100 text-green-700" },
      { label: "National supply", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Mapei Australia supplies polymer-modified cementitious mortars for masonry repair and repointing including the Mape-Antique MC product — a polymer-modified mortar specifically formulated for conservation masonry work — and the Mapegrout series for structural repair and repointing in high-exposure applications. Mape-Antique MC is a mineral, pre-bagged mortar modified with polymers and natural aggregates for repointing old and heritage masonry where a softer, more breathable polymer-modified option is required over standard cement mortar. Mapegrout BM is a higher-strength polymer-modified base mortar suitable for structural repair and heavily exposed parapet and pier repointing. Confirm the appropriate product with Mapei Australia technical for the specific substrate and exposure classification. Mapei is distributed nationally through the Mapei Australia trade network and Bayset building materials. Confirm current Australian product names, mortar class designation (AS 3700), and colour range from the current Mapei Australia TDS before specifying.",
    technicalProperties: [
      "Mape-Antique MC — polymer-modified conservation mortar — improved breathability and flexibility vs standard cement",
      "Mapegrout BM — higher strength polymer-modified base mortar — suitable for parapet coping and high-exposure facades",
      "Pre-bagged — add water only on site — consistent performance per bag",
      "National distribution through Mapei Australia trade network and Bayset",
      "Multiple product options for different masonry exposure classifications — confirm appropriate grade with Mapei AU",
      "Confirm AS 3700 mortar class designation, compressive strength and colour availability before specifying",
    ],
    limitations: [
      "Confirm appropriate product with Mapei Australia technical — Mape-Antique MC vs Mapegrout BM selection depends on substrate and exposure",
      "Mape-Antique MC is formulated for conservation masonry — confirm suitability for modern Class 2 strata applications with Mapei AU",
      "Higher cost than standard GP cement + lime or pre-mixed masonry cement mortars",
      "Not suitable for soft, historic, or lime-mortar brickwork — confirm polymer mortar is appropriate for substrate with Mapei AU",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply nationally", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
      { name: "Mapei trade merchants — confirm local availability", url: "https://www.mapei.com/au" },
      { name: "Confirm current product designation with Mapei AU technical before ordering", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Parchem Construction Supplies (Fosroc)",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c3aed",
    name: "Fosroc RepaBuild / Renderoc Series — Polymer-Modified Repointing Mortar",
    descriptionLine: "Fosroc polymer-modified cementitious mortars distributed by Parchem Construction Supplies — RepaBuild MF (fine repair) / Renderoc Classic — for masonry repointing and surface repair on Class 2 facades",
    productType: "Polymer-modified cement repointing mortar — Fosroc / Parchem — national supply",
    filterTags: ["Parchem", "National", "Polymer-modified", "High-bond", "Coastal", "Parapet", "AS-3700", "Pre-bagged"],
    techChips: [
      { label: "Fosroc / Parchem", cls: "bg-purple-100 text-purple-800" },
      { label: "RepaBuild MF", cls: "bg-slate-100 text-slate-700" },
      { label: "Polymer-modified", cls: "bg-green-100 text-green-700" },
      { label: "National — Parchem branches", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc polymer-modified cementitious repair mortars distributed nationally by Parchem Construction Supplies (DuluxGroup) are used for masonry repointing and surface repair on Class 2 strata buildings. Fosroc RepaBuild MF is a fine-grade polymer-modified mortar for surface repair and joint filling, while Renderoc Classic is a pre-bagged polymer-modified repair mortar for base coat repair and repointing applications. Both products provide improved adhesion and reduced shrinkage compared to standard cement mortars, making them suitable for high-exposure repointing applications such as parapets, exposed copings, and coastal facades. Parchem Construction Supplies operates trade branches in most Australian metropolitan and regional centres — providing consistent technical support and product availability nationally. Confirm the appropriate Fosroc/Parchem product for masonry repointing (rather than concrete repair) with the local Parchem branch before specifying — the Fosroc range includes both concrete repair and masonry products which are different formulations. Confirm mortar class designation (AS 3700) and colour range from the current Parchem TDS.",
    technicalProperties: [
      "Fosroc RepaBuild MF — fine polymer-modified mortar — suitable for masonry joint repointing and surface repair",
      "Renderoc Classic — polymer-modified base coat mortar — used for thicker masonry repair and exposed joint repointing",
      "Both pre-bagged — add clean water only on site — consistent performance per batch",
      "Parchem Construction Supplies national distribution — branches in all major Australian metropolitan centres",
      "DuluxGroup technical support — Parchem branch technical staff can advise on appropriate product selection",
      "Confirm AS 3700 mortar class, compressive strength and colour availability with Parchem TDS before specifying",
    ],
    limitations: [
      "Confirm appropriate product for masonry repointing with Parchem — RepaBuild MF and Renderoc products cover both masonry and concrete repair; select the correct grade",
      "Nitobond AR bonding primer may be required on low-absorption substrates — confirm current primer specification with Parchem before applying",
      "Higher cost than standard cement mortars — justify use for high-exposure or repeatedly failed applications only",
      "Not suitable for soft historic brick — confirm substrate suitability with Parchem technical",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national branches (Fosroc distributor)", url: "https://www.parchem.com.au" },
      { name: "Dulux Trade Centres — national (Parchem/DuluxGroup)", url: "https://www.dulux.com.au" },
      { name: "Fosroc direct — confirm through Parchem for Australian supply", url: "https://www.parchem.com.au" },
      { name: "Confirm current product name and specification with local Parchem branch before ordering", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#be123c",
    name: "Ardex X 32 / Ardex Endura Repointing Mortar — Polymer-Modified",
    descriptionLine: "Ardex polymer-modified masonry repair and repointing mortar — Ardex X 32 (masonry repair mortar) — improved bond and durability for exposed parapet and coastal repointing — national supply through Ardex distributors",
    productType: "Polymer-modified cement repointing mortar — Ardex Australia — national supply",
    filterTags: ["Ardex", "National", "Polymer-modified", "High-bond", "Coastal", "Parapet", "AS-3700", "Pre-bagged"],
    techChips: [
      { label: "Ardex Australia", cls: "bg-rose-100 text-rose-800" },
      { label: "Ardex X 32", cls: "bg-slate-100 text-slate-700" },
      { label: "Polymer-modified", cls: "bg-green-100 text-green-700" },
      { label: "National distribution", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Ardex Australia supplies polymer-modified cementitious mortars for masonry repair and repointing on Class 2 strata building facades. Ardex X 32 is a single-component polymer-modified repair mortar for masonry and concrete repair that can be used for joint repointing and surface repair in high-exposure applications. The Ardex range for masonry applications includes products with enhanced adhesion, reduced shrinkage and improved durability compared to plain cement mortars — making them suitable for parapet coping repointing, coastal facade joints, and locations where standard cement mortar has failed. Ardex products are available nationally through Ardex Australia trade distributors and hardware merchants. Confirm the specific current product appropriate for masonry joint repointing (versus concrete structural repair) with Ardex Australia technical before specifying — the Ardex range spans both masonry and concrete repair applications with different formulations. Confirm mortar class designation (AS 3700), compressive strength, pot life, and colour range from the current Ardex Australia TDS before specifying.",
    technicalProperties: [
      "Ardex X 32 — polymer-modified repair mortar — suitable for masonry joint repointing and surface repair",
      "Polymer binder improves adhesion and reduces shrinkage — suitable for parapet coping and coastal zone repointing",
      "Pre-bagged — add water only on site — consistent performance per bag",
      "National distribution through Ardex Australia distributors and hardware merchants",
      "Ardex Australia technical support — confirm current appropriate masonry repointing product before specifying",
      "Confirm AS 3700 mortar class designation, compressive strength and colour range with current Ardex TDS",
    ],
    limitations: [
      "Confirm current product appropriate for masonry repointing with Ardex Australia technical — Ardex range covers masonry and concrete repair; different formulations apply",
      "Higher cost than standard cement mortars — justify for high-exposure or repeatedly failed applications",
      "Not suitable for soft historic brick — polymer-modified cement mortars are still relatively rigid and non-breathable",
      "Confirm primer requirements for specific substrates with Ardex Australia before applying",
    ],
    procurementSources: [
      { name: "Ardex Australia — national distributors", url: "https://www.ardex.com.au" },
      { name: "Bunnings Warehouse — Ardex masonry products", url: "https://www.bunnings.com.au" },
      { name: "Building trade merchants — confirm local Ardex stock", url: "https://www.ardex.com.au" },
      { name: "Confirm current product code and specification with Ardex Australia technical before ordering", url: "https://www.ardex.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Sika", label: "Sika" },
  { id: "Mapei", label: "Mapei" },
  { id: "Parchem", label: "Parchem / Fosroc" },
  { id: "Ardex", label: "Ardex" },
  { id: "National", label: "National supply" },
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "High-bond", label: "High bond" },
  { id: "Coastal", label: "Coastal" },
  { id: "Parapet", label: "Parapet / coping" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Pre-bagged", label: "Pre-bagged" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  polymerType: string;
  distribution: string;
  strengthRange: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Sika Australia",
    product: "SikaMonoTop / SikaRep (confirm AU code)",
    polymerType: "Acrylic / SBR modified",
    distribution: "Sika branches + Parchem nationally",
    strengthRange: "20–40 MPa (confirm TDS)",
    keyFeature: "Sika technical support nationally",
    primaryUse: "High-exposure facades — parapets — coastal",
  },
  {
    supplier: "Mapei Australia",
    product: "Mape-Antique MC / Mapegrout BM",
    polymerType: "Acrylic polymer modified",
    distribution: "Mapei AU + Bayset nationally",
    strengthRange: "10–40 MPa (confirm TDS)",
    keyFeature: "Conservation mortar option (Mape-Antique)",
    primaryUse: "High-exposure and conservation masonry",
  },
  {
    supplier: "Parchem (Fosroc)",
    product: "RepaBuild MF / Renderoc Classic",
    polymerType: "Polymer-modified (confirm TDS)",
    distribution: "Parchem branches nationally",
    strengthRange: "20–50 MPa (confirm TDS)",
    keyFeature: "Parchem branch technical support",
    primaryUse: "Class 2 strata high-exposure repointing",
  },
  {
    supplier: "Ardex Australia",
    product: "Ardex X 32 (confirm AU product)",
    polymerType: "Polymer-modified (confirm TDS)",
    distribution: "Ardex distributors + Bunnings",
    strengthRange: "20–40 MPa (confirm TDS)",
    keyFeature: "Widely available through hardware",
    primaryUse: "High-bond masonry repair and repointing",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Repointing in high-movement zones — parapets, exposed piers, and copings where standard cement mortar has failed repeatedly",
    "Coastal facade repointing where improved water resistance and bond strength is required",
    "Repointing where original mortar debonding or pop-out has occurred despite correct standard cement mortar installation",
    "High-wind-load facades and exposed upper level brickwork where thermally active joints degrade standard cement mortar faster",
    "Class 2 strata building remediation where a long-term durability premium is specified by the building owner or engineer",
  ],
  selectionCriteria: [
    "Confirm polymer-modified mortar is required — do not upgrade from standard cement mortar without documented previous failure",
    "Confirm AS 3700 mortar class designation from the specific supplier TDS — polymer-modified products vary in compressive strength",
    "Commission a 28-day cured trial panel before approving colour match — polymer-modified mortars can dry to unexpected colours",
    "Confirm product suitability for masonry repointing specifically — Sika, Mapei, Parchem, and Ardex ranges span both masonry and concrete repair",
    "Confirm primer requirement for specific substrate with each supplier before applying",
    "Not a suitable upgrade for heritage or soft historic brick — polymer-modified cement mortars are still rigid and non-breathable",
  ],
  limitations: [
    "Do not use polymer-modified cement mortar on soft, historic, or lime-mortar brickwork — still rigid and non-breathable vs lime mortars",
    "Higher cost than standard cement mortars — justify use only where standard mortar has documented repeated failure",
    "Pot life shorter than plain cement mortar — mix small batches; do not re-temper mortars that have begun to set",
    "Confirm current Australian product designation with each supplier before specifying — product ranges are revised periodically",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — mortar designations M1–M4; confirm specific mortar class from each supplier TDS",
    "AS 3972 — Portland and blended cements — governs cement component of polymer-modified mortars",
    "Manufacturer TDS — each product has specific mixing ratio, pot life, compressive strength and application requirements",
    "NATSPEC worksection 03 41 00 — Masonry — project specification requirements for repointing",
    "NCC Volume One and Two — masonry and facade performance requirements for Class 2 buildings",
  ],
  suitableDefects: [
    "Mortar pop-out or debonding failure in cement-repointed facades — where standard mortar has failed multiple times",
    "Parapet coping repointing where UV and water exposure has caused repeated standard mortar cracking",
    "Coastal facade joints where high chloride environments have degraded standard cement mortar faster than expected",
    "High-movement joints where differential thermal expansion is causing standard mortar to crack at each thermal cycle",
  ],
  typicalSubstrates: [
    "Modern hard-burnt clay brick — post-1960s construction where cement mortar is appropriate — use polymer-modified for high-exposure",
    "Concrete masonry units in exposed or marine environments — polymer-modified improves bond and water resistance",
    "Calcium silicate brick in coastal exposures — confirm mortar hardness does not exceed brick compressive strength",
    "NOT suitable: soft historic or heritage brick where original mortar was lime-based",
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

export function PolymerModifiedMortarIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What is polymer-modified cement repointing mortar?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Polymer-modified cement repointing mortar is a pre-bagged, add-water-only product in which a polymer dispersion (typically acrylic or SBR) is incorporated into the cementitious binder to improve adhesion, reduce shrinkage, and improve water resistance compared to standard cement mortars. It is used in high-exposure and high-movement applications — parapets, exposed copings, coastal facades, and locations where standard cement-lime or masonry cement mortar has repeatedly failed.
        </p>
        {expanded && (
          <>
            <p>
              The four main suppliers in Australia are Sika, Mapei, Parchem (Fosroc), and Ardex — each offering pre-bagged products through their national trade networks. Selection between suppliers is primarily based on regional availability, technical support preference, and the specific product range that best matches the required mortar class designation per AS 3700. All four suppliers' products require confirmation of the current Australian product designation before specifying — product ranges are subject to periodic revision.
            </p>
            <p>
              Polymer-modified cement mortars are not suitable for soft, historic, or heritage brickwork — they remain relatively rigid and non-breathable compared to lime mortars. For heritage masonry, a natural hydraulic lime (NHL) or lime putty mortar is required. A 28-day cured trial panel is mandatory before approving colour match for any polymer-modified mortar on an existing facade.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function PolymerModifiedMortarProductSection() {
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
            <h2 className="text-2xl font-extrabold text-sky-950">Supplier Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 suppliers — polymer-modified cement repointing mortar — scroll to view all</p>
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
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} supplier{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Supplier Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of polymer-modified cement repointing mortar suppliers. Confirm current product names and specifications with each supplier before ordering.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Polymer type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Strength</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.polymerType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.strengthRange}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyFeature}</td>
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
