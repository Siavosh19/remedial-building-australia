"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Enamel"
  | "Metal"
  | "Steel"
  | "Aluminium"
  | "UV-resistant"
  | "Gloss"
  | "Semi-gloss"
  | "Exterior"
  | "Corrosion-resistant"
  | "Water-based"
  | "Solvent-based"
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
    accentColor: "#e2003a",
    name: "Dulux Metalshield Gloss",
    descriptionLine: "Premium UV-resistant exterior enamel for metal substrates — gloss finish with corrosion inhibiting primers — suitable for steel, aluminium and iron facade elements on Australian buildings",
    productType: "UV-resistant exterior enamel — metal substrates — steel and aluminium",
    filterTags: ["Enamel", "Metal", "Steel", "Aluminium", "UV-resistant", "Gloss", "Exterior", "Corrosion-resistant", "Coastal"],
    techChips: [
      { label: "UV-resistant", cls: "bg-red-100 text-red-800" },
      { label: "Gloss enamel", cls: "bg-amber-100 text-amber-700" },
      { label: "Metal topcoat", cls: "bg-blue-100 text-blue-700" },
      { label: "Coastal rated", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Dulux Metalshield Gloss is a premium UV-resistant exterior enamel topcoat for metal substrates on building facades. It provides a durable gloss finish with strong UV resistance, colour retention, and corrosion protection on steel, aluminium, and iron facade elements — including window frames, balustrades, fascias, gutters, and decorative metal panels. Applied as a topcoat over compatible Dulux Metalshield rust-inhibiting primer (zinc phosphate or etch primer depending on substrate), it forms a hard, durable enamel film resistant to the combined weathering stresses of UV, moisture, and atmospheric pollutants. Dulux Metalshield is the benchmark exterior metal enamel system in Australia with wide national trade availability. Confirm current product range, primer specification, substrate preparation requirements, and coastal grade suitability from the current Dulux Metalshield product TDS before specifying. Abrasive blasting or mechanical preparation to the required standard (Sa 2½ or St 3) is mandatory for steel before primer application.",
    technicalProperties: [
      "UV-resistant gloss enamel — strong colour retention and chalk resistance on exterior metal facade elements",
      "Applied over compatible Dulux Metalshield rust-inhibiting primer — zinc phosphate or etch primer depending on substrate",
      "Suitable for steel, aluminium, iron and galvanised metal facade elements — confirm substrate suitability from TDS",
      "Coastal-rated — confirm coastal grade variant with Dulux trade before specifying within 1 km of saltwater",
      "Hard durable film — resistant to UV, moisture and atmospheric pollutants in Australian exterior conditions",
      "Confirm surface preparation standard, primer type, and DFT from current Dulux Metalshield TDS before specifying",
    ],
    limitations: [
      "Steel preparation to Sa 2½ or St 3 mandatory before primer — do not apply primer or topcoat over mill scale or rust",
      "Not for immersion or prolonged water contact — specify anti-corrosion coating system for submerged or wet service",
      "Colour and gloss retention will be lower for solvent-based enamel in high-UV environments — confirm UV grade from TDS",
      "Touch-up repainting over existing enamel may exhibit gloss variation — feather edges and prime bare areas",
      "TODO: owner confirm — product may be named 'Metalshield Epoxy Enamel Gloss' on current Dulux AU site — verify exact current product name before specifying",
    ],
    procurementSources: [
      { name: "Dulux Trade Centres — national", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade — trade account", url: "https://www.bunnings.com.au" },
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl Australia",
    brandUrl: "https://www.wattyl.com.au",
    accentColor: "#0369a1",
    name: "Wattyl Killrust Enamel",
    descriptionLine: "High-durability exterior enamel with rust-inhibiting technology for steel, iron and metal surfaces — gloss and semi-gloss — corrosion-resistant exterior metal topcoat for Australian conditions",
    productType: "High-durability exterior enamel with rust inhibitor — steel and iron",
    filterTags: ["Enamel", "Metal", "Steel", "UV-resistant", "Gloss", "Semi-gloss", "Exterior", "Corrosion-resistant", "Coastal"],
    techChips: [
      { label: "Rust-inhibiting", cls: "bg-sky-100 text-sky-800" },
      { label: "High-durability", cls: "bg-amber-100 text-amber-700" },
      { label: "Gloss enamel", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal rated", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Wattyl Killrust Enamel is a high-durability exterior enamel with rust-inhibiting technology for steel, iron, and other metal substrates on building facades. The Killrust system is Wattyl's established platform for metal corrosion protection, available in gloss and semi-gloss finishes suitable for exterior exposure on facade elements including window frames, balustrades, gates, fascias, and structural steel elements. Applied over the appropriate Wattyl Killrust primer system — including etch primer for non-ferrous metals and rust-inhibiting primer for steel — it forms a durable corrosion-resistant enamel topcoat resistant to UV, moisture, and coastal salt air. Wattyl Killrust is widely available nationally and is particularly strong in trade and industrial supply channels. Confirm current product range, primer specification, and coastal grade suitability from the current Wattyl Killrust TDS before specifying.",
    technicalProperties: [
      "Rust-inhibiting enamel technology — high-durability corrosion protection for steel and iron facade elements",
      "Gloss and semi-gloss finishes — UV-resistant — suitable for exterior metal facade elements in Australian conditions",
      "Applied over Wattyl Killrust primer system — etch primer for aluminium, rust-inhibiting primer for steel",
      "Coastal rated — suitable for buildings within salt air exposure — confirm coastal grade with Wattyl trade",
      "Wide national availability — strong trade and industrial supply network",
      "Confirm current product range, primer type, and DFT from current Wattyl Killrust TDS before specifying",
    ],
    limitations: [
      "Steel substrate preparation mandatory — remove rust, mill scale and contamination to St 3 minimum before primer",
      "Not a two-pack system — for heavily corrosive or industrial environments specify two-pack epoxy primer and polyurethane topcoat",
      "Gloss can fade in high UV exposures over long service life — confirm UV performance with Wattyl for demanding coastal exposures",
      "Colour touch-up requires matching batch and full panel application to avoid visible gloss variation",
    ],
    procurementSources: [
      { name: "Wattyl Trade Centres — national", url: "https://www.wattyl.com.au" },
      { name: "Bunnings — trade and retail", url: "https://www.bunnings.com.au" },
      { name: "Wattyl Killrust — industrial and trade supply", url: "https://www.wattyl.com.au" },
    ],
  },
  {
    fullLabel: "Haymes Paint Australia",
    brandUrl: "https://www.haymespaint.com.au",
    accentColor: "#7c3aed",
    name: "Haymes Metal Guard Enamel",
    descriptionLine: "Australian-made exterior enamel for metal surfaces — UV-resistant gloss and semi-gloss for steel, aluminium and iron facade elements — part of the Haymes Metal Guard protective coating system",
    productType: "Exterior enamel for metal — UV-resistant — Australian-made — Haymes Metal Guard system",
    filterTags: ["Enamel", "Metal", "Steel", "Aluminium", "UV-resistant", "Gloss", "Semi-gloss", "Exterior", "Corrosion-resistant"],
    techChips: [
      { label: "Australian-made", cls: "bg-purple-100 text-purple-800" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Metal Guard system", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Haymes Metal Guard Enamel is an Australian-manufactured exterior enamel topcoat for metal substrates on building facades, forming part of the Haymes Metal Guard protective coating system. It provides UV resistance, colour retention, and corrosion protection on steel, aluminium, and iron facade elements including window frames, balustrades, fascias, and decorative metal details. Applied as a topcoat over the appropriate Haymes Metal Guard primer system — etch primer for aluminium and non-ferrous metals, and rust-inhibiting primer for steel — it forms a durable enamel film suitable for Australian exterior conditions. Haymes has strong trade distribution in Victoria and regional Australia. Confirm current product name, primer specification, substrate preparation requirements, and DFT from the current Haymes Metal Guard product documentation before specifying.",
    technicalProperties: [
      "Australian-manufactured — part of the Haymes Metal Guard protective coating system",
      "UV-resistant exterior enamel — suitable for steel, aluminium and iron facade elements in Australian conditions",
      "Applied over Haymes Metal Guard primer — etch primer for aluminium, rust-inhibiting primer for steel",
      "Gloss and semi-gloss finishes available — confirm current range with Haymes trade",
      "Confirm current product name, primer specification, and DFT from Haymes Metal Guard TDS before specifying",
      "Haymes trade distribution strongest in Victoria and regional Australia",
    ],
    limitations: [
      "Steel substrate must be mechanically prepared to St 3 minimum — remove rust and contamination before primer",
      "Haymes distribution strongest in Victoria and regional — confirm national availability with local supplier",
      "Confirm current product name and system from Haymes TDS before specifying on a remedial project",
      "Not a two-pack system — for aggressive industrial or marine environments, specify two-pack polyurethane topcoat",
      "TODO: owner confirm — Haymes website shows MetalPlus range; Metal Guard Enamel not confirmed in current Haymes AU product range — verify current product name with Haymes technical before specifying",
    ],
    procurementSources: [
      { name: "Haymes Paint Trade — Where to Buy", url: "https://www.haymespaint.com.au" },
      { name: "Haymes Trade Centres — VIC/NSW", url: "https://www.haymespaint.com.au" },
      { name: "Independent paint retailers — confirm local availability", url: "https://www.haymespaint.com.au" },
    ],
  },
  {
    fullLabel: "Taubmans Australia",
    brandUrl: "https://www.taubmans.com.au",
    accentColor: "#b45309",
    name: "Taubmans All Weather Metal Enamel",
    descriptionLine: "Exterior metal enamel with UV resistance for steel, aluminium and iron facade elements — gloss finish — corrosion-resistant exterior topcoat for Australian building facade applications",
    productType: "UV-resistant exterior metal enamel — steel and aluminium facade elements",
    filterTags: ["Enamel", "Metal", "Steel", "Aluminium", "UV-resistant", "Gloss", "Exterior", "Corrosion-resistant"],
    techChips: [
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-800" },
      { label: "Gloss finish", cls: "bg-slate-100 text-slate-700" },
      { label: "Metal topcoat", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription:
      "Taubmans All Weather Metal Enamel is a UV-resistant exterior enamel topcoat for metal substrates on building facades. It provides a durable gloss finish on steel, aluminium, and iron facade elements including window frames, balustrades, fascias, and decorative metal details, with UV resistance and corrosion protection suitable for Australian exterior conditions. Applied as a topcoat over compatible Taubmans metal primer — etch primer for aluminium and rust-inhibiting primer for steel — it forms a hard, durable enamel film resistant to weathering. Taubmans has strong national trade and retail availability through Bunnings and trade channels. Confirm current product name, primer specification, substrate preparation requirements, and DFT from the current Taubmans All Weather Metal Enamel TDS before specifying.",
    technicalProperties: [
      "UV-resistant exterior metal enamel — suitable for steel, aluminium and iron facade elements",
      "Gloss finish — hard durable film — corrosion protection for exterior metal facade elements",
      "Applied over Taubmans metal primer — etch primer for aluminium, rust-inhibiting primer for steel",
      "Wide national availability through Bunnings and Taubmans trade supply",
      "Confirm substrate preparation, primer specification, and DFT from current Taubmans TDS before specifying",
    ],
    limitations: [
      "Steel preparation mandatory — remove rust and mill scale to St 3 before primer — do not apply over contaminated steel",
      "Not a two-pack system — for marine or industrial aggressive environments specify two-pack polyurethane topcoat",
      "Confirm coastal grade suitability with Taubmans before specifying on buildings within 1 km of saltwater",
      "Confirm current product name and formulation from current Taubmans TDS before specifying",
    ],
    procurementSources: [
      { name: "Taubmans Trade — Product Finder", url: "https://www.taubmans.com.au" },
      { name: "Bunnings — trade and retail", url: "https://www.bunnings.com.au" },
      { name: "Independent paint trade suppliers", url: "https://www.taubmans.com.au" },
    ],
  },
  {
    fullLabel: "Solver Paints Australia",
    brandUrl: "https://www.solverpaints.com.au",
    accentColor: "#059669",
    name: "Solver Tough Metal Enamel",
    descriptionLine: "Tough exterior enamel for metal facade elements — UV-resistant gloss for steel, aluminium and iron — part of the Solver exterior metal coating system for strata and commercial buildings",
    productType: "Tough exterior enamel — metal facade elements — Solver system",
    filterTags: ["Enamel", "Metal", "Steel", "Aluminium", "UV-resistant", "Gloss", "Exterior", "Corrosion-resistant"],
    techChips: [
      { label: "Tough enamel", cls: "bg-green-100 text-green-800" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Metal topcoat", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Solver Tough Metal Enamel is an exterior enamel topcoat for metal substrates on building facades, forming part of the Solver exterior metal coating system. It provides a tough, durable gloss finish with UV resistance on steel, aluminium, and iron facade elements. Applied as a topcoat over compatible Solver metal primer — etch primer for aluminium and rust-inhibiting primer for steel — it forms a durable enamel film suitable for Australian exterior conditions. Solver has strong trade distribution in Victoria and eastern Australia. Confirm current product name, primer specification, and DFT from the current Solver Tough Metal Enamel TDS and Solver technical before specifying on a remedial project.",
    technicalProperties: [
      "Tough durable exterior enamel for metal facade elements — UV-resistant gloss finish",
      "Suitable for steel, aluminium and iron facade elements — applied over compatible Solver metal primer",
      "Part of the Solver exterior metal coating system — system compatibility confirmed",
      "Confirm current product name, primer, and DFT from current Solver TDS before specifying",
      "Solver trade distribution strongest in Victoria and eastern Australia",
    ],
    limitations: [
      "Steel substrate preparation mandatory — remove rust and contamination before primer application",
      "Confirm current product name and formulation with Solver trade before specifying",
      "Not a two-pack system — confirm suitability for coastal and aggressive environments with Solver",
      "Solver distribution strongest in eastern Australia — confirm national availability before specifying",
    ],
    procurementSources: [
      { name: "Solver Paints Trade — Product Finder", url: "https://www.solverpaints.com.au" },
      { name: "Solver Trade Centres — VIC and eastern Australia", url: "https://www.solverpaints.com.au" },
      { name: "Independent paint retailers — confirm local availability", url: "https://www.solverpaints.com.au" },
    ],
  },
  {
    fullLabel: "Jotun Paints Australia",
    brandUrl: "https://www.jotun.com/au",
    accentColor: "#dc2626",
    name: "Jotun Fenomastic Weathershield Enamel",
    descriptionLine: "Premium UV-resistant exterior enamel for metal and wood facade elements — Jotun's high-durability exterior topcoat with advanced UV stabilisers for extended colour retention on commercial buildings",
    productType: "Premium UV-resistant exterior enamel — metal and wood — Jotun commercial grade",
    filterTags: ["Enamel", "Metal", "Steel", "Aluminium", "UV-resistant", "Gloss", "Exterior", "Corrosion-resistant", "Coastal"],
    techChips: [
      { label: "Jotun premium", cls: "bg-red-100 text-red-800" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Commercial grade", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal rated", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Jotun Fenomastic Weathershield Enamel is a premium UV-resistant exterior enamel for metal and wood facade elements in the Jotun decorative range. It provides advanced UV stabilisers for extended colour retention and gloss retention over a long service life — making it particularly suited to commercial and high-profile strata building facades where colour consistency over an extended repaint cycle is a specification priority. Applied over compatible Jotun exterior primer or metal primer, it forms a durable enamel topcoat resistant to the combined weathering stresses of UV, moisture, and coastal salt air. Jotun has a strong commercial market presence in Australia through trade supply channels and is particularly well positioned for multi-storey commercial and premium strata facade applications. Confirm current product range, primer specification, and performance data from the current Jotun Fenomastic product TDS and Jotun Australia technical before specifying.",
    technicalProperties: [
      "Premium UV-resistant enamel with advanced UV stabilisers — superior colour and gloss retention for extended repaint cycles",
      "Suitable for metal (steel, aluminium, iron) and wood facade elements — confirm substrate from TDS",
      "Coastal rated — suitable for buildings in salt air environments — confirm coastal grade with Jotun Australia",
      "Commercial grade — appropriate for multi-storey commercial and premium strata facade applications",
      "Applied over compatible Jotun exterior or metal primer — confirm system specification from Jotun technical",
      "Confirm current Australian product range and TDS from Jotun Australia before specifying",
    ],
    limitations: [
      "Higher cost than standard exterior enamel — specify where extended colour retention and UV performance justify premium",
      "Confirm current Australian product availability — Jotun Australia range may differ from international catalogues",
      "Steel substrate preparation mandatory — Sa 2½ or St 3 minimum before primer",
      "Confirm primer specification with Jotun technical before applying over existing enamel or new substrate",
      "TODO: owner confirm — Fenomastic Weathershield Enamel not confirmed on current Jotun AU site — verify product name and availability before specifying",
    ],
    procurementSources: [
      { name: "Jotun Australia — trade supply", url: "https://www.jotun.com/au" },
      { name: "Jotun Decorative — Australia", url: "https://www.jotun.com/au" },
      { name: "Commercial paint trade suppliers — confirm local availability", url: "https://www.jotun.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Enamel", label: "Enamel" },
  { id: "Metal", label: "Metal" },
  { id: "Steel", label: "Steel" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "UV-resistant", label: "UV-resistant" },
  { id: "Gloss", label: "Gloss" },
  { id: "Semi-gloss", label: "Semi-gloss" },
  { id: "Exterior", label: "Exterior" },
  { id: "Corrosion-resistant", label: "Corrosion-resistant" },
  { id: "Water-based", label: "Water-based" },
  { id: "Solvent-based", label: "Solvent-based" },
  { id: "Coastal", label: "Coastal rated" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  substrate: string;
  finish: string;
  uvSystem: string;
  coastal: string;
  primer: string;
  primaryUse: string;
}[] = [
  { product: "Metalshield Gloss", brand: "Dulux", substrate: "Steel, aluminium, iron", finish: "Gloss", uvSystem: "UV stabilisers", coastal: "Yes", primer: "Dulux Metalshield primer", primaryUse: "Benchmark metal enamel — Dulux system — wide national availability" },
  { product: "Killrust Enamel", brand: "Wattyl", substrate: "Steel, iron", finish: "Gloss / semi-gloss", uvSystem: "UV stabilisers + rust inhibitor", coastal: "Yes", primer: "Wattyl Killrust primer", primaryUse: "Rust-inhibiting enamel — steel and iron — strong trade availability" },
  { product: "Metal Guard Enamel", brand: "Haymes", substrate: "Steel, aluminium, iron", finish: "Gloss / semi-gloss", uvSystem: "UV stabilisers", coastal: "Confirm TDS", primer: "Haymes Metal Guard primer", primaryUse: "Australian-made — Haymes system — VIC/regional" },
  { product: "All Weather Metal Enamel", brand: "Taubmans", substrate: "Steel, aluminium, iron", finish: "Gloss", uvSystem: "UV stabilisers", coastal: "Confirm TDS", primer: "Taubmans metal primer", primaryUse: "Taubmans system — wide retail and trade availability" },
  { product: "Tough Metal Enamel", brand: "Solver", substrate: "Steel, aluminium, iron", finish: "Gloss", uvSystem: "UV stabilisers", coastal: "Confirm TDS", primer: "Solver metal primer", primaryUse: "Solver system — VIC and eastern Australia" },
  { product: "Fenomastic Weathershield", brand: "Jotun", substrate: "Metal and wood", finish: "Gloss", uvSystem: "Advanced UV stabilisers", coastal: "Yes", primer: "Jotun metal primer", primaryUse: "Premium — commercial and strata — extended colour retention" },
];

const TECH_INFO = {
  typicalApplications: [
    "Repainting of steel window frames, balustrades, and metal facade elements on strata and commercial buildings",
    "Protective topcoat on aluminium facade elements, fascias, and trim after surface preparation and priming",
    "Repainting of iron gates, balustrades, and decorative metal facade details — full system over rust-inhibiting primer",
    "Finish coat on galvanised steel fascias, gutters, and downpipes after etching and priming",
    "Two-coat exterior metal enamel system — primer then topcoat — on steel and aluminium facade elements",
  ],
  selectionCriteria: [
    "Always apply a rust-inhibiting primer before exterior metal enamel — never apply topcoat directly to bare steel or aluminium",
    "Select etch primer for aluminium and non-ferrous metals — select rust-inhibiting primer for ferrous (steel and iron) substrates",
    "Specify coastal-grade enamel system for buildings within 1 km of saltwater — confirm with manufacturer",
    "For commercial or high-profile facades specify premium UV-stabilised enamel to achieve extended colour retention",
    "Steel preparation to Sa 2½ (blast) or St 3 (mechanical) mandatory before primer application",
    "Confirm system from a single manufacturer — primer and topcoat compatibility must be confirmed from TDS",
  ],
  limitations: [
    "Standard exterior enamel is not a two-pack coating — for severe corrosive environments specify two-pack epoxy primer + two-pack polyurethane topcoat",
    "Not suitable for submerged or water-immersed metal elements — specify marine-grade or anti-corrosion system",
    "Touch-up repainting over existing enamel requires full panel application to avoid gloss variation — feather and prime all bare areas",
    "Surface contamination (oil, salt, mill scale) on steel will cause premature delamination — thorough surface prep is mandatory",
    "Confirm coastal suitability — standard exterior enamel may not be appropriate within 200 m of breaking surf without marine-grade system",
  ],
  standardsNotes: [
    "AS 1627 — Metal finishing — preparation and pretreatment of surfaces — surface cleanliness standards for steel",
    "AS 4548 — Guide to long-life coatings for concrete and masonry — relevant for metal coating specification context",
    "NATSPEC — Section 0238 — Protective painting — metal surface preparation and coating specification",
    "Manufacturer TDS — confirm surface preparation standard, primer type, DFT, and overcoat intervals for each system",
    "AS 3715 — Metal finishing — powder coating for architectural applications — relevant for new aluminium",
  ],
  suitableDefects: [
    "Peeling, cracking or chalking of existing exterior enamel on steel window frames, balustrades and metal facade elements",
    "Rust bleed and corrosion of steel facade elements — after mechanical rust removal and before rust-inhibiting primer",
    "UV-faded or chalked exterior enamel on aluminium or steel facade elements — colour restoration repainting",
    "Failed or delaminated enamel on galvanised steel fascias and gutters — after surface preparation and etching",
    "First-time painting of new uncoated steel or aluminium facade elements after construction",
  ],
  typicalSubstrates: [
    "Mild steel — window frames, balustrades, gates, structural steel facade elements — prepare to St 3 or Sa 2½",
    "Aluminium — window frames, fascias, louvres, architectural elements — etch and prime before enamel topcoat",
    "Galvanised steel — fascias, gutters, downpipes — etch primer mandatory before enamel topcoat",
    "Cast iron — decorative balustrades and heritage facade elements — mechanical rust removal and rust-inhibiting primer",
    "Wrought iron — balustrades, fences, decorative details — wire brush, prime and topcoat",
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

export function UVResistantEnamelMetalIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are UV-resistant enamel systems for metal?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          UV-resistant exterior enamels for metal are protective topcoat coatings applied to steel, aluminium, iron, and galvanised metal facade elements on buildings. They provide UV resistance, colour retention, and corrosion protection — always applied as a two-coat system over a compatible rust-inhibiting or etch primer depending on the substrate.
        </p>
        {expanded && (
          <>
            <p>
              The critical distinction in exterior metal enamel specification is the primer system. Ferrous metals (steel and iron) require a rust-inhibiting zinc phosphate primer. Aluminium and non-ferrous metals require an etch primer to provide adhesion on the smooth oxide surface. Galvanised steel requires etch primer to prevent delamination. The topcoat enamel provides UV protection and colour, but the primer system is the corrosion-control component — missing or incorrect primer is the primary cause of premature enamel failure on metal facade elements.
            </p>
            <p>
              For coastal buildings within 1 km of saltwater, a coastal-grade or marine-grade enamel system is required — standard exterior enamel will fail prematurely in salt air environments without appropriate primer and topcoat specification. For highly aggressive environments (within 200 m of breaking surf, industrial pollution), a two-pack epoxy primer and two-pack polyurethane topcoat system should be specified rather than a single-pack exterior enamel.
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

export function UVResistantEnamelMetalProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">6 products — 6 brands — UV-resistant enamel systems for metal — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of UV-resistant enamel systems for metal. Confirm all selections against current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrate}</td>
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
