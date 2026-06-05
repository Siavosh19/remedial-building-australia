"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Enamel"
  | "Timber"
  | "Exterior"
  | "Gloss"
  | "Semi-gloss"
  | "UV-resistant"
  | "Water-based"
  | "Oil-based"
  | "Trim"
  | "Door"
  | "Window-frame"
  | "Coastal";

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
    fullLabel: "Dulux Australia",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/exterior",
    accentColor: "#e2003a",
    name: "Dulux Weathershield Exterior Gloss",
    descriptionLine: "Premium UV-resistant exterior gloss enamel for timber and primed surfaces — benchmark exterior trim topcoat for doors, window frames and fascias on Australian buildings",
    productType: "UV-resistant exterior gloss enamel — timber trim and doors",
    filterTags: ["Enamel", "Timber", "Exterior", "Gloss", "UV-resistant", "Water-based", "Trim", "Door", "Window-frame", "Coastal"],
    techChips: [
      { label: "UV-resistant", cls: "bg-red-100 text-red-800" },
      { label: "Gloss enamel", cls: "bg-amber-100 text-amber-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Coastal rated", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Dulux Weathershield Exterior Gloss is a premium UV-resistant exterior gloss enamel for timber and primed surfaces — the benchmark exterior trim topcoat for doors, timber window frames, fascias, and architraves on residential and commercial strata buildings in Australia. Applied over Dulux exterior primer or undercoat on bare timber, it provides a hard durable gloss film with excellent UV resistance, colour retention, and moisture resistance. The Dulux Weathershield exterior system is widely specified for exterior timber repainting on strata buildings, providing system compatibility from primer through undercoat to gloss topcoat. Available as a water-based formula providing low VOC, low odour, and easy clean-up — suitable for use on occupied buildings. Confirm current product range, primer and undercoat specification, and DFT from the current Dulux Weathershield Exterior Gloss TDS before specifying. Dulux Weathershield Exterior Gloss is also suitable as a topcoat over compatible Dulux primers on primed metal trim elements.",
    technicalProperties: [
      "Premium UV-resistant gloss enamel — strong colour and gloss retention on exterior timber facade elements",
      "Water-based formula — low VOC and low odour — suitable for use on occupied strata buildings",
      "Applied over Dulux exterior primer and undercoat on bare timber — or over existing sound enamel",
      "Suitable for timber doors, window frames, fascias, architraves and exterior trim elements",
      "Coastal rated — confirm coastal grade suitability with Dulux trade before specifying near saltwater",
      "Confirm primer and undercoat specification, DFT, and coverage from current Dulux Weathershield TDS",
    ],
    limitations: [
      "Exterior primer and undercoat mandatory on bare timber — do not apply gloss enamel directly to bare unprimed timber",
      "Not suitable for bare or decking timber floors — specify a penetrating oil or deck coating for horizontal timber",
      "Touch-up repainting over existing enamel may exhibit gloss variation — full panel application recommended",
      "Confirm application temperature and humidity limits from TDS — do not apply below 10°C or in wet conditions",
    ],
    procurementSources: [
      { name: "Dulux Trade Centres — national", url: "https://www.dulux.com.au" },
      { name: "Bunnings — trade and retail", url: "https://www.bunnings.com.au" },
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl Australia",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en_AU/products",
    accentColor: "#0369a1",
    name: "Wattyl Solagard Exterior Gloss",
    descriptionLine: "High-durability UV-resistant exterior gloss enamel for timber trim — advanced UV stabilisers for Australian conditions — suitable for doors, window frames and exterior timber on strata facades",
    productType: "High-durability exterior gloss enamel — timber trim — UV-resistant",
    filterTags: ["Enamel", "Timber", "Exterior", "Gloss", "UV-resistant", "Water-based", "Trim", "Door", "Window-frame", "Coastal"],
    techChips: [
      { label: "UV-stabilised", cls: "bg-sky-100 text-sky-800" },
      { label: "High-durability", cls: "bg-amber-100 text-amber-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Gloss enamel", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Wattyl Solagard Exterior Gloss is a high-durability UV-resistant exterior gloss enamel for timber and primed surfaces, incorporating advanced UV stabilisers specifically formulated for Australian exterior conditions. It is part of the Wattyl Solagard exterior system designed for high UV intensity environments including Queensland, tropical, and subtropical climates where colour and gloss retention are critical over a long repaint cycle. Applied over Wattyl exterior primer and undercoat on bare timber, it provides a durable gloss film on exterior timber trim, doors, window frames, fascias, and architraves. Suitable for residential and commercial strata building exterior repainting where UV fade and chalk resistance are specification priorities. Confirm current product range, primer specification, and DFT from the current Wattyl Solagard Exterior Gloss TDS before specifying.",
    technicalProperties: [
      "Advanced UV stabilisers — formulated for high UV intensity Australian conditions — superior colour and gloss retention",
      "Water-based gloss enamel — low VOC — suitable for exterior timber trim on occupied strata buildings",
      "Applied over Wattyl exterior primer and undercoat on bare timber",
      "Suitable for timber doors, window frames, fascias, and exterior trim elements",
      "Confirm coastal grade suitability with Wattyl before specifying within 1 km of saltwater",
      "Confirm primer specification, DFT, and coverage from current Wattyl Solagard Exterior Gloss TDS",
    ],
    limitations: [
      "Primer and undercoat mandatory on bare timber — do not apply directly to unprimed or bare timber",
      "Not for horizontal timber decking — specify penetrating oil or deck coating for decks",
      "Touch-up over existing enamel may exhibit gloss variation — prime bare areas and feather edges",
      "Confirm current product name and formulation from Wattyl technical before specifying",
    ],
    procurementSources: [
      { name: "Wattyl Trade Centres — national", url: "https://www.wattyl.com.au" },
      { name: "Bunnings — trade and retail", url: "https://www.bunnings.com.au" },
      { name: "Wattyl Trade — Product Finder", url: "https://www.wattyl.com.au" },
    ],
  },
  {
    fullLabel: "Cabot's Australia",
    brandUrl: "https://www.cabots.com.au",
    tdsUrl: "https://www.cabots.com.au/products",
    accentColor: "#7c3aed",
    name: "Cabot's Exterior Enamel Gloss",
    descriptionLine: "Exterior gloss enamel for timber — UV-resistant protective finish for doors, window frames and exterior timber trim — Cabot's exterior wood coating system for Australian conditions",
    productType: "Exterior gloss enamel — timber doors and trim — Cabot's system",
    filterTags: ["Enamel", "Timber", "Exterior", "Gloss", "UV-resistant", "Trim", "Door", "Window-frame"],
    techChips: [
      { label: "Cabot's timber specialist", cls: "bg-purple-100 text-purple-800" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Gloss enamel", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Cabot's Exterior Enamel Gloss is an exterior gloss enamel for timber surfaces, forming part of the Cabot's exterior timber coating system. Cabot's is a specialist timber coating brand in Australia with strong recognition in the timber staining, oiling, and finishing market. Their exterior enamel provides a UV-resistant gloss finish on exterior timber trim including doors, window frames, fascias, and architraves. Applied over Cabot's compatible exterior timber primer or undercoat on bare timber surfaces. Cabot's has strong national retail availability through Bunnings and independent paint retailers. Confirm current product name, primer and undercoat specification, DFT, and system documentation from the current Cabot's product TDS before specifying on a remedial project. Product range and naming within the Cabot's exterior enamel range may vary — confirm current formulation with Cabot's trade or retail before specifying.",
    technicalProperties: [
      "Exterior gloss enamel for timber — UV-resistant finish for doors, window frames, fascias, and exterior trim",
      "Part of the Cabot's exterior timber coating system — system compatibility from primer through topcoat",
      "Applied over Cabot's compatible exterior primer or undercoat on bare timber",
      "Cabot's specialist timber brand — strong national retail distribution through Bunnings",
      "Confirm current product name, primer, and DFT from current Cabot's TDS before specifying",
    ],
    limitations: [
      "Confirm current product name and range — Cabot's exterior enamel product range may be updated",
      "Primer mandatory on bare timber — do not apply directly to unprimed timber surfaces",
      "Not for horizontal timber decking — specify Cabot's decking oil or coating for deck surfaces",
      "Confirm system compatibility — use Cabot's primer and undercoat with Cabot's gloss topcoat for system warranty",
    ],
    procurementSources: [
      { name: "Cabot's — Bunnings (national)", url: "https://www.bunnings.com.au" },
      { name: "Cabot's — independent paint retailers", url: "https://www.cabots.com.au" },
      { name: "Cabot's — Product Finder", url: "https://www.cabots.com.au" },
    ],
  },
  {
    fullLabel: "Haymes Paint Australia",
    brandUrl: "https://www.haymespaint.com.au",
    tdsUrl: "https://www.haymespaint.com.au/products",
    accentColor: "#b45309",
    name: "Haymes Ultra Trim Exterior Gloss",
    descriptionLine: "Australian-made premium exterior gloss enamel for timber trim — UV-resistant hard gloss finish for doors, window frames and exterior timber elements — Haymes exterior system",
    productType: "Premium exterior gloss enamel — timber trim — Australian-made",
    filterTags: ["Enamel", "Timber", "Exterior", "Gloss", "UV-resistant", "Water-based", "Trim", "Door", "Window-frame"],
    techChips: [
      { label: "Australian-made", cls: "bg-amber-100 text-amber-800" },
      { label: "UV-resistant", cls: "bg-red-100 text-red-800" },
      { label: "Hard gloss", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Haymes Ultra Trim Exterior Gloss is an Australian-manufactured premium exterior gloss enamel for timber trim on building facades. It provides a hard, durable UV-resistant gloss finish on exterior timber elements including doors, window frames, fascias, and architraves. Applied as part of the Haymes exterior painting system over Haymes exterior timber primer and undercoat, it delivers a premium finish with strong adhesion and colour retention suited to Australian exterior conditions. Haymes is an Australian paint manufacturer with strong trade distribution in Victoria and regional Australia. Confirm current product name, primer and undercoat specification, DFT, and system from the current Haymes Ultra Trim TDS before specifying on a remedial project.",
    technicalProperties: [
      "Australian-manufactured premium exterior gloss enamel — part of the Haymes exterior system",
      "UV-resistant hard gloss finish — suitable for exterior timber trim in Australian exterior conditions",
      "Applied over Haymes exterior primer and undercoat on bare timber surfaces",
      "Suitable for timber doors, window frames, fascias, and exterior architraves",
      "Confirm primer specification, DFT, and coverage from current Haymes Ultra Trim TDS",
      "Haymes distribution strongest in Victoria and regional Australia — confirm national availability",
    ],
    limitations: [
      "Haymes distribution strongest in Victoria and regional — confirm national availability with local supplier",
      "Primer and undercoat mandatory on bare timber — do not apply gloss enamel directly to bare timber",
      "Confirm current product name and formulation from Haymes TDS before specifying",
      "Not for horizontal timber decking — specify penetrating oil or deck coating for deck applications",
    ],
    procurementSources: [
      { name: "Haymes Paint Trade — Where to Buy", url: "https://www.haymespaint.com.au" },
      { name: "Haymes Trade Centres — VIC/NSW", url: "https://www.haymespaint.com.au" },
      { name: "Independent paint retailers — confirm local availability", url: "https://www.haymespaint.com.au" },
    ],
  },
  {
    fullLabel: "Solver Paints Australia",
    brandUrl: "https://www.solverpaints.com.au",
    tdsUrl: "https://www.solverpaints.com.au/products",
    accentColor: "#059669",
    name: "Solver Super Trim Exterior Gloss",
    descriptionLine: "Exterior gloss enamel for timber trim — UV-resistant durable finish for doors, window frames and exterior timber elements — Solver exterior system for strata repainting",
    productType: "Exterior gloss enamel — timber trim and doors — Solver system",
    filterTags: ["Enamel", "Timber", "Exterior", "Gloss", "UV-resistant", "Water-based", "Trim", "Door", "Window-frame"],
    techChips: [
      { label: "UV-resistant", cls: "bg-green-100 text-green-800" },
      { label: "Gloss enamel", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior trim", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription:
      "Solver Super Trim Exterior Gloss is an exterior gloss enamel for timber trim forming part of the Solver exterior painting system. It provides a UV-resistant durable gloss finish on exterior timber elements including doors, window frames, fascias, and architraves on strata and residential building facades. Applied over Solver exterior primer and undercoat on bare timber, it delivers a durable gloss film suited to Australian exterior conditions. Solver has strong trade distribution in Victoria and eastern Australia, making Super Trim a practical specification for strata repainting projects in those markets. Confirm current product name, primer and undercoat specification, DFT, and coverage from the current Solver Super Trim TDS before specifying on a remedial project.",
    technicalProperties: [
      "UV-resistant exterior gloss enamel — suitable for timber doors, window frames, fascias and exterior trim",
      "Part of the Solver exterior painting system — compatible primer and undercoat from Solver",
      "Applied over Solver exterior primer and undercoat on bare timber",
      "Solver trade distribution — strongest in Victoria and eastern Australia",
      "Confirm current product name, primer, and DFT from current Solver TDS before specifying",
    ],
    limitations: [
      "Confirm current product name and formulation with Solver trade before specifying",
      "Primer mandatory on bare timber — do not apply directly to unprimed timber",
      "Solver distribution strongest in eastern Australia — confirm national availability",
      "Not for horizontal timber decking — specify deck coating for outdoor deck applications",
    ],
    procurementSources: [
      { name: "Solver Paints Trade — Product Finder", url: "https://www.solverpaints.com.au" },
      { name: "Solver Trade Centres — VIC and eastern Australia", url: "https://www.solverpaints.com.au" },
      { name: "Independent paint retailers — confirm local availability", url: "https://www.solverpaints.com.au" },
    ],
  },
  {
    fullLabel: "British Paints Australia",
    brandUrl: "https://www.britishpaints.com.au",
    tdsUrl: "https://www.britishpaints.com.au/products",
    accentColor: "#dc2626",
    name: "British Paints Classic Exterior Gloss",
    descriptionLine: "Exterior gloss enamel for timber and primed surfaces — UV-resistant classic gloss finish for doors, window frames and exterior trim — widely available through hardware and trade channels",
    productType: "Exterior gloss enamel — timber and primed surfaces — classic gloss",
    filterTags: ["Enamel", "Timber", "Exterior", "Gloss", "UV-resistant", "Trim", "Door", "Window-frame"],
    techChips: [
      { label: "Classic gloss", cls: "bg-red-100 text-red-800" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Exterior trim", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "British Paints Classic Exterior Gloss is an exterior gloss enamel for timber and primed surfaces, providing a UV-resistant classic gloss finish on exterior trim elements including doors, window frames, fascias, and architraves. British Paints is a well-established Australian paint brand with wide retail and trade distribution nationally, making their exterior gloss a practical and accessible specification for strata repainting projects. Applied over compatible exterior primer and undercoat on bare timber, British Paints Classic Exterior Gloss provides a durable exterior enamel finish. Confirm current product name, primer specification, and DFT from the current British Paints product TDS before specifying. British Paints is distributed through Bunnings and independent retailers nationally.",
    technicalProperties: [
      "UV-resistant exterior gloss enamel — suitable for timber doors, window frames, and exterior trim",
      "Classic gloss finish — durable exterior enamel film on primed timber and primed surfaces",
      "Applied over compatible exterior primer and undercoat on bare timber",
      "Wide national availability through Bunnings and independent paint retailers",
      "Confirm current product name, primer, and DFT from British Paints TDS before specifying",
    ],
    limitations: [
      "Confirm current product name and formulation from current British Paints TDS before specifying",
      "Primer mandatory on bare timber — do not apply directly to unprimed timber surfaces",
      "Confirm coastal grade suitability for buildings within 1 km of saltwater",
      "Not for horizontal decking — specify a penetrating or decking finish for deck applications",
    ],
    procurementSources: [
      { name: "British Paints — Bunnings (national)", url: "https://www.bunnings.com.au" },
      { name: "British Paints — independent paint retailers", url: "https://www.britishpaints.com.au" },
      { name: "British Paints — Product Finder", url: "https://www.britishpaints.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Enamel", label: "Enamel" },
  { id: "Timber", label: "Timber" },
  { id: "Exterior", label: "Exterior" },
  { id: "Gloss", label: "Gloss" },
  { id: "Semi-gloss", label: "Semi-gloss" },
  { id: "UV-resistant", label: "UV-resistant" },
  { id: "Water-based", label: "Water-based" },
  { id: "Oil-based", label: "Oil-based" },
  { id: "Trim", label: "Trim" },
  { id: "Door", label: "Door" },
  { id: "Window-frame", label: "Window frame" },
  { id: "Coastal", label: "Coastal rated" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  binder: string;
  finish: string;
  uvSystem: string;
  coastal: string;
  primer: string;
  primaryUse: string;
}[] = [
  { product: "Weathershield Exterior Gloss", brand: "Dulux", binder: "Acrylic — water-based", finish: "Gloss", uvSystem: "UV stabilisers", coastal: "Yes", primer: "Dulux exterior primer + undercoat", primaryUse: "Benchmark exterior trim enamel — wide national availability" },
  { product: "Solagard Exterior Gloss", brand: "Wattyl", binder: "Acrylic — water-based", finish: "Gloss", uvSystem: "Advanced UV stabilisers", coastal: "Yes", primer: "Wattyl exterior primer + undercoat", primaryUse: "High UV — QLD/tropical — advanced UV stability" },
  { product: "Exterior Enamel Gloss", brand: "Cabot's", binder: "Confirm TDS", finish: "Gloss", uvSystem: "UV stabilisers", coastal: "Confirm TDS", primer: "Cabot's timber primer", primaryUse: "Timber specialist brand — strong Bunnings distribution" },
  { product: "Ultra Trim Exterior Gloss", brand: "Haymes", binder: "Acrylic — water-based", finish: "Gloss", uvSystem: "UV stabilisers", coastal: "Confirm TDS", primer: "Haymes exterior primer + undercoat", primaryUse: "Australian-made — Haymes system — VIC/regional" },
  { product: "Super Trim Exterior Gloss", brand: "Solver", binder: "Acrylic — water-based", finish: "Gloss", uvSystem: "UV stabilisers", coastal: "Confirm TDS", primer: "Solver exterior primer + undercoat", primaryUse: "Solver system — VIC and eastern Australia" },
  { product: "Classic Exterior Gloss", brand: "British Paints", binder: "Confirm TDS", finish: "Gloss", uvSystem: "UV stabilisers", coastal: "Confirm TDS", primer: "Compatible exterior primer", primaryUse: "Wide retail availability — accessible specification — Bunnings" },
];

const TECH_INFO = {
  typicalApplications: [
    "Repainting of exterior timber doors and window frames on strata building facades — two-coat gloss enamel over primer and undercoat",
    "Repainting of timber fascias, architraves, and exterior trim elements on residential and commercial strata buildings",
    "First-time coating of new bare timber exterior trim elements — primer, undercoat, and two coats of exterior gloss enamel",
    "Colour change repainting of existing sound exterior enamel on timber trim — wash, lightly sand, prime bare areas, two coats topcoat",
    "Exterior trim repainting as part of a full strata facade restoration painting project",
  ],
  selectionCriteria: [
    "Always apply exterior primer and undercoat on bare timber before exterior gloss enamel topcoat",
    "Select UV-stabilised premium grade exterior gloss for Queensland, tropical and coastal high-UV environments",
    "Specify water-based exterior gloss enamel for occupied strata buildings where low VOC and low odour are required",
    "Confirm coastal grade suitability with manufacturer for buildings within 1 km of saltwater",
    "Use a single manufacturer system — primer, undercoat and topcoat from the same brand for system compatibility",
    "Confirm current product range and primers from the manufacturer TDS — exterior gloss enamel ranges are regularly updated",
  ],
  limitations: [
    "Exterior gloss enamel on timber does not protect against structural timber decay — treat and repair damaged timber before painting",
    "Not suitable for horizontal timber decking — specify penetrating oil, semi-transparent stain, or deck coating for deck surfaces",
    "Touch-up repainting over existing enamel requires priming of bare areas and feathering — gloss variation is common without full panel application",
    "Exterior enamel on softwood timber in high moisture environments will blister if moisture content is too high before painting — confirm MC < 18% before coating",
    "Do not apply below 10°C or in wet or very humid conditions — allow 4 hours before rain after application",
  ],
  standardsNotes: [
    "AS 3730 — Guide to properties of paints for buildings — paint classification reference for exterior enamel",
    "NATSPEC — Section 0233 — Exterior painting specification — exterior timber trim painting specification",
    "AS 1684 — Residential timber framing — confirms moisture content requirements before coating timber",
    "Manufacturer TDS — confirm primer and undercoat specification, DFT, overcoat intervals, and coverage rates",
    "Australian Paint Manufacturers' Federation (APMF) — guidance on VOC content and low-odour exterior paint products",
  ],
  suitableDefects: [
    "Peeling, cracking or chalking of existing exterior enamel on timber doors and window frames",
    "UV-faded and oxidised exterior enamel on timber trim — colour loss and gloss loss on south or west-facing facades",
    "Bare or partially stripped timber trim following paint removal — ready for primer, undercoat and two-coat gloss system",
    "Biological growth (mould, algae) on existing enamel — treat with biocide wash then repaint with anti-fungal enamel system",
    "Timber trim elements with hairline or fine surface cracks in existing enamel — fill, sand, prime and repaint",
  ],
  typicalSubstrates: [
    "Timber doors — external doors on strata buildings — hardwood and softwood — primer, undercoat and gloss topcoat",
    "Timber window frames — exterior timber frames — prime bare areas, undercoat and gloss topcoat",
    "Timber fascias and soffits — exterior horizontal and vertical trim — full system over bare or existing painted timber",
    "Timber architraves and exterior mouldings — decorative exterior timber elements",
    "MDF and fibre cement trim — confirm primer and undercoat suitability for non-timber substrates before applying exterior gloss",
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

export function ExteriorEnamelTimberIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are exterior enamel systems for timber?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Exterior enamel systems for timber are three-coat protective coating systems — primer, undercoat, and gloss topcoat — applied to exterior timber trim elements including doors, window frames, fascias, and architraves on building facades. They provide UV resistance, moisture protection, and a durable gloss finish on exposed timber.
        </p>
        {expanded && (
          <>
            <p>
              The three-coat system is the key principle: primer provides adhesion and sealing of the timber surface, undercoat provides build and a uniform base for the topcoat, and the exterior gloss enamel provides UV protection, colour, and the final weather-resistant film. Skipping primer or undercoat on bare timber will result in premature failure — the topcoat enamel alone cannot provide the required adhesion and build on porous timber surfaces.
            </p>
            <p>
              Timber moisture content must be checked before painting — softwood and hardwood timber should be at or below 18% moisture content before primer is applied. Painting wet timber traps moisture and causes rapid blistering and delamination. In humid environments, allow adequate drying time after any wet weather before commencing repainting. For coastal buildings within 1 km of saltwater, confirm the coastal grade of the enamel system with the manufacturer before specifying.
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

export function ExteriorEnamelTimberProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">6 products — 6 brands — exterior enamel systems for timber — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of exterior enamel systems for timber. Confirm all selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Binder</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">UV system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primer</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.binder}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.uvSystem}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.primer}</td>
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
