"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Flashing"
  | "Step-flashing"
  | "Counter-flashing"
  | "Colorbond"
  | "Steel"
  | "Lead"
  | "Chimney"
  | "Penetration"
  | "Collar"
  | "EPDM"
  | "Sealant"
  | "PU"
  | "1C"
  | "Exterior";

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
    fullLabel: "Lysaght",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#ef4444",
    name: "Lysaght Colorbond Step Flashing",
    descriptionLine: "Pre-formed Colorbond steel step and counter flashings for tiled pitched roofs abutting walls, parapets and chimneys",
    productType: "Colorbond steel step and counter flashing for pitched roofs",
    filterTags: ["Flashing", "Step-flashing", "Counter-flashing", "Colorbond", "Steel"],
    techChips: [
      { label: "Colorbond steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Step flashing", cls: "bg-slate-100 text-slate-700" },
      { label: "Counter-flashing", cls: "bg-slate-100 text-slate-700" },
      { label: "Pitched roof", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght Colorbond step flashings are pre-formed zinc-aluminised steel components coated in Colorbond finish for use at wall-to-roof abutments, chimneys, parapets and penetrations on pitched tiled roofs. Step flashings are installed course-by-course with roof tiles, interlocking with each tile course and turning up the vertical face of the abutting wall. Counter-flashings are installed over the step flashing upturn and dressed into the mortar joint or fixed to the wall to prevent water tracking behind the flashing assembly.\n\nColorbond step and counter flashings are the standard solution for pitched roof-to-wall abutment on Australian strata buildings. They are pre-coated and require no site painting. Available from Lysaght roofing specialists and steel suppliers. Confirm current colour availability and profile dimensions with Lysaght before specifying.",
    technicalProperties: [
      "Colorbond steel — corrosion-resistant Zincalume substrate with Colorbond paint system — long service life on Australian roofs",
      "Pre-formed step and counter flashing profiles — minimises site fabrication — consistent geometry at tile abutment",
      "Interlocks with each tile course — prevents water tracking behind the flashing at the roof-wall abutment",
      "Counter-flashing pressed into mortar joint or mechanically fixed to wall — weathertight lap over step flashing upturn",
      "Available in range of standard Colorbond colours — confirm colour availability with Lysaght before specifying",
    ],
    limitations: [
      "Galvanic corrosion risk if Colorbond steel contacts lead sheet or uncoated copper — use isolation tape or compatible separation material",
      "Step flashing minimum upstand height of 100mm above tile surface required per AS 4654.2 — confirm on site before installation",
      "Pre-formed profiles may not suit non-standard tile profiles — site fabrication may be required for complex geometry",
      "Counter-flashing mortar joint must be raked clean and repointed after installation — do not rely on sealant alone as the primary water seal",
      "Confirm current product specification and compliance with Lysaght before specifying",
    ],
    procurementSources: [
      { name: "Lysaght — roofing specialists nationally — contact for pricing", url: "https://www.lysaght.com" },
      { name: "Steel and Tube — trade supply nationally", url: "https://www.steelandtube.com.au" },
      { name: "Roofing trade merchants — confirm current stock with local supplier", url: "https://www.lysaght.com" },
    ],
  },
  {
    fullLabel: "Austral Lead",
    brandUrl: "https://www.australlead.com.au",
    accentColor: "#3b82f6",
    name: "Austral Lead Sheet Flashing",
    descriptionLine: "Soft-form pure lead sheet for chimney, parapet and complex roof flashings — workable and durable, resists corrosion and thermal movement",
    productType: "Pure lead sheet for chimney and complex flashing",
    filterTags: ["Flashing", "Chimney", "Lead"],
    techChips: [
      { label: "Lead sheet", cls: "bg-sky-100 text-sky-800" },
      { label: "Chimney flashing", cls: "bg-slate-100 text-slate-700" },
      { label: "Complex geometry", cls: "bg-slate-100 text-slate-700" },
      { label: "Pitched roof", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Austral Lead sheet is soft pure lead supplied in roll form for on-site cutting, bending and forming of complex chimney, parapet and penetration flashings. Lead is the traditional material for chimney step flashings, saddle flashings and soakers on Australian pitched tiled roofs where complex geometry, thermal movement accommodation and long service life are required. Lead is easily worked with hand tools on site — it conforms closely to irregular chimney profiles and can be dressed into mortar joints.\n\nLead flashings must be installed by an experienced roofing tradesperson. Minimum code upstand heights must be confirmed per AS 4654.2. Lead must not be used in direct contact with aluminium or uncoated zinc without isolation tape to prevent galvanic corrosion. Confirm OHS requirements for lead handling with the project safety plan before specifying on site.",
    technicalProperties: [
      "Pure soft lead — easily worked, cut and formed on site — suited to complex chimney and parapet profiles not suited to pre-formed steel",
      "Excellent corrosion resistance — lead oxidises to form a stable patina — long service life on Australian roofs",
      "High ductility — accommodates thermal movement without cracking or splitting at mortar joints",
      "Can be dressed closely into irregular masonry surfaces and mortar joints — superior to steel for complex geometry",
      "Available in standard roll widths and thicknesses — confirm current product range with Austral Lead",
    ],
    limitations: [
      "Galvanic corrosion — lead must not contact aluminium or uncoated steel without separation — use isolation tape or Colorbond separation flashing",
      "OHS requirements apply — lead dust and debris from cutting must be managed per site safety plan — confirm with project safety officer",
      "Heavier than Colorbond steel — additional roof structure load to be confirmed for large lead flashing assemblies",
      "Requires experienced roofing tradesperson for correct installation — poorly formed lead flashings are a common failure mode",
      "Confirm current product specification and compliance with Austral Lead before specifying",
    ],
    procurementSources: [
      { name: "Austral Lead — trade supply nationally — contact for pricing", url: "https://www.australlead.com.au" },
      { name: "Roofing and plumbing trade merchants — confirm current stock locally", url: "https://www.australlead.com.au" },
    ],
  },
  {
    fullLabel: "Deks",
    brandUrl: "https://www.deks.com.au",
    accentColor: "#22c55e",
    name: "Deks D-1 Multi Pipe Flashing",
    descriptionLine: "EPDM rubber self-sealing pipe flashing collar for roof penetrations — accommodates 0–115mm pipe diameter on pitched tiled and metal roofs",
    productType: "EPDM self-sealing pipe penetration flashing collar",
    filterTags: ["Penetration", "Collar", "EPDM", "Flashing"],
    techChips: [
      { label: "EPDM collar", cls: "bg-sky-100 text-sky-800" },
      { label: "Self-sealing", cls: "bg-green-50 text-green-700" },
      { label: "Pipe penetration", cls: "bg-slate-100 text-slate-700" },
      { label: "Pitched roof", cls: "bg-slate-100 text-slate-700" },
      { label: "0–115mm pipe", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Deks D-1 Multi Pipe Flashing is an EPDM rubber self-sealing penetration collar for sealing round pipe penetrations through pitched tiled and metal roofs. The EPDM rubber collar compresses around the pipe as it is pushed onto the pipe, forming a weathertight seal without sealant. The base flange is installed under surrounding tiles or fixed to metal roofing and lapped under the upper tile courses. Accommodates pipe diameters from 0 to 115mm — suited to conduit, soil pipe, exhaust duct and antenna mast penetrations on pitched roofs of Class 2 strata apartment buildings.\n\nEPDM rubber has good UV and ozone resistance and is suited to the Australian climate. Deks also manufacture pipe flashings for metal roofs and larger diameter applications — confirm the correct product code against pipe diameter and roof type before ordering. EPDM collar must be installed correctly — if forced over an oversized pipe the seal will be compromised.",
    technicalProperties: [
      "EPDM rubber — UV and ozone resistant — long service life on Australian pitched roofs",
      "Self-sealing compression collar — no sealant required at collar-to-pipe interface — reduces on-site failure risk",
      "Accommodates 0–115mm pipe diameter — suited to conduit, soil pipe, vent duct and antenna mast penetrations",
      "Base flange integrates with tile profile — installed under surrounding tile courses for weather-tight lap",
      "Available in grey and terracotta colours — confirm current colour range with Deks before specifying",
    ],
    limitations: [
      "Pipe diameter must be confirmed before ordering — EPDM collar forced over oversized pipe will not seal — confirm D-1 Multi accommodates required pipe OD",
      "Base flange profile must match roof tile profile — confirm tile type and pitch with Deks before specifying",
      "Not suitable for pipes that carry fluids above 120°C — confirm thermal suitability with Deks for high-temperature exhaust applications",
      "Tile removal and relay required during installation — allow for tile breakage on aged terracotta roofs",
      "Confirm current product specification and compliance with Deks before specifying",
    ],
    procurementSources: [
      { name: "Deks — roofing trade suppliers nationally — contact for pricing", url: "https://www.deks.com.au" },
      { name: "Roofing trade merchants — confirm current stock locally", url: "https://www.deks.com.au" },
    ],
  },
  {
    fullLabel: "Sika",
    brandUrl: "https://aus.sika.com",
    accentColor: "#f97316",
    name: "Sikaflex-11 FC+",
    descriptionLine: "1-part polyurethane sealant for sealing flashing-to-tile, flashing-to-wall and collar-to-pipe transitions on pitched roofs",
    productType: "1-part PU sealant for roof flashing joints",
    filterTags: ["Sealant", "PU", "1C", "Exterior", "Flashing"],
    techChips: [
      { label: "Polyurethane sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture-cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior / roof", cls: "bg-slate-100 text-slate-700" },
      { label: "Flashing joint", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikaflex-11 FC+ is a one-component moisture-curing polyurethane sealant used for sealing secondary joints in roof flashing assemblies — including flashing-to-tile, flashing-to-wall, counter-flashing lap joints and collar-to-pipe transitions. Applied by gun from cartridge to prepared joints over backer rod where joint depth exceeds 15mm. UV-stable formulation suited to exposed exterior applications on Australian pitched roofs.\n\nSikaflex-11 FC+ is a secondary seal in a correctly installed flashing assembly — it is not a substitute for correctly formed and lapped metal flashings. Do not rely on sealant alone as the primary weather barrier at roof abutments. Prime joint faces per Sika TDS for best adhesion on porous masonry or contaminated substrates. Confirm suitability with Sika technical for continuous ponding or immersion conditions.",
    technicalProperties: [
      "Polyurethane chemistry — good elongation and movement accommodation — suited to building movement joints at flashing transitions",
      "One-component moisture-curing — no site mixing required — reduces application error",
      "UV-stable formulation — suited to exposed exterior applications on Australian pitched roofs",
      "Paintable after full cure with compatible paint systems — confirm with Sika technical before applying paint",
      "Available in multiple standard colours — confirm current colour range with Sika Australia before specifying",
    ],
    limitations: [
      "Sealant is a secondary seal — correctly formed and lapped metal flashings with minimum AS 4654.2 upstand heights are the primary weather barrier",
      "Backer rod required where joint depth exceeds 15mm — three-sided adhesion must be prevented",
      "Do not apply to wet or contaminated joint faces — clean and dry substrate mandatory before application",
      "Not suitable as sole weather seal at roof-to-wall abutments — metal step and counter flashing system required",
      "Confirm current product specification and compliance with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Roofing trade merchants — confirm current stock locally", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Flashing", label: "Flashing" },
  { id: "Step-flashing", label: "Step-flashing" },
  { id: "Counter-flashing", label: "Counter-flashing" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Steel", label: "Steel" },
  { id: "Lead", label: "Lead" },
  { id: "Chimney", label: "Chimney" },
  { id: "Penetration", label: "Penetration" },
  { id: "Collar", label: "Collar" },
  { id: "EPDM", label: "EPDM" },
  { id: "Sealant", label: "Sealant" },
  { id: "PU", label: "PU" },
  { id: "1C", label: "One-component" },
  { id: "Exterior", label: "Exterior" },
];

const BRAND_EQUIV: { system: string; lysaght: string; australlead: string; deks: string; sika: string }[] = [
  { system: "Step/counter flashing (Colorbond)", lysaght: "Colorbond Step Flashing", australlead: "—", deks: "—", sika: "—" },
  { system: "Chimney/complex flashing (lead)", lysaght: "—", australlead: "Lead Sheet", deks: "—", sika: "—" },
  { system: "Pipe penetration collar (EPDM)", lysaght: "—", australlead: "—", deks: "D-1 Multi", sika: "—" },
  { system: "PU sealant (flashing joints)", lysaght: "—", australlead: "—", deks: "—", sika: "Sikaflex-11 FC+" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  application: string;
  movementAccomm: string;
  standard: string;
  primaryUse: string;
}[] = [
  {
    product: "Lysaght Colorbond Step Flashing",
    brand: "Lysaght",
    material: "Colorbond steel",
    application: "Pre-formed, site-fixed",
    movementAccomm: "Lap/overlap joints",
    standard: "AS 4654.2",
    primaryUse: "Wall-to-roof abutment, parapet, chimney",
  },
  {
    product: "Austral Lead Sheet Flashing",
    brand: "Austral Lead",
    material: "Pure lead sheet",
    application: "Site-formed, dressed to shape",
    movementAccomm: "High ductility",
    standard: "AS 4654.2",
    primaryUse: "Chimney, parapet, complex geometry",
  },
  {
    product: "Deks D-1 Multi Pipe Flashing",
    brand: "Deks",
    material: "EPDM rubber",
    application: "Push-fit self-sealing collar",
    movementAccomm: "EPDM compression",
    standard: "AS 4654.2",
    primaryUse: "Round pipe penetrations 0–115mm",
  },
  {
    product: "Sikaflex-11 FC+",
    brand: "Sika",
    material: "Polyurethane sealant",
    application: "Gun-applied cartridge",
    movementAccomm: "Elastic elongation",
    standard: "AS 4654.2",
    primaryUse: "Secondary seal at flashing transitions",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Step and counter flashing at wall-to-roof abutments on pitched tiled roofs of Class 2 strata buildings",
    "Chimney lead flashings — saddle flashing, step flashings and soakers at all four chimney faces",
    "Pipe penetration collar flashings for conduit, soil vent pipe, exhaust duct and antenna mast penetrations through pitched tiled roofs",
    "Secondary PU sealant joints at counter-flashing laps, collar-to-tile transitions and flashing-to-wall junctions",
    "Parapet capping and flashing at parapet walls abutting pitched roof surfaces",
  ],
  selectionCriteria: [
    "Select Colorbond step and counter flashing for standard wall-to-roof abutments where a pre-formed solution is achievable",
    "Select lead sheet for chimney and complex masonry abutments where site forming is required and Colorbond profiles will not suit",
    "Select EPDM collar for round pipe penetrations — confirm pipe OD against D-1 Multi accommodation range before ordering",
    "Select PU sealant as a secondary seal at flashing joints — not as a substitute for correctly formed metal flashings",
    "Confirm minimum upstand height of 100mm above tile surface before specifying any flashing system per AS 4654.2",
  ],
  limitations: [
    "Flashing systems are only as effective as their installation — correct upstand heights, laps and mortar joint sealing are critical",
    "Galvanic contact between lead and aluminium or uncoated steel will cause corrosion — use separation tape or Colorbond barrier",
    "EPDM collar must match pipe OD — incorrect collar size will not seal and will fail prematurely",
    "PU sealant is a secondary seal only — sealant-only flashing repairs without correct metal flashing are a non-compliant solution",
    "Mortar joints at counter-flashing must be properly raked, cleaned and repointed — sealant cannot substitute for correct masonry pointing",
  ],
  standardsNotes: [
    "AS 4654.2 — Waterproofing of Wet Areas Within Residential Buildings — prescribes minimum upstand heights and flashing requirements for pitched roofs",
    "NCC Section F — Resistance to Damp and Water Ingress — requires roofing flashings to prevent water entry at penetrations and abutments",
    "AS 3959 — Construction in Bushfire-Prone Areas — may impose requirements on flashing materials in BAL-rated zones",
    "Manufacturer TDS for all flashing products must be confirmed before specifying — products and profiles are subject to revision",
  ],
  suitableDefects: [
    "Failed step or counter flashing at wall-to-roof abutment — corroded, displaced or missing flashing causing water ingress",
    "Deteriorated chimney lead flashing — cracked, split or lifted lead flashings causing water entry at chimney-roof junction",
    "Leaking pipe penetrations — failed or missing collar flashing causing water tracking around soil vent pipe, conduit or exhaust duct",
    "Failed secondary sealant at flashing joints — cracked or debonded PU sealant at counter-flashing laps and tile junctions",
  ],
  typicalSubstrates: [
    "Concrete tile or terracotta tile roof surfaces — step flashing installed course-by-course under tile overlap",
    "Brick or block masonry chimney and parapet walls — counter-flashing dressed into raked mortar joint",
    "Metal roofing substrates — Deks D-1 collar flange fixed under metal sheet profile at pipe penetration",
    "Rendered masonry and fibre cement abutment walls — secondary PU sealant joint at flashing-to-wall transition",
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

export function FlashingFailuresIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are roof flashing systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Roof flashings are metal or elastomeric components that weatherproof the junctions between a roof surface and adjacent vertical elements — walls, chimneys, parapets, skylights and pipe penetrations. On Australian pitched tiled roofs, flashings are the most common single point of failure. Failure modes include galvanic corrosion of steel flashings, thermal-movement-induced cracking at mortar joints, lead fatigue from inadequate thickness or poor forming, deteriorated secondary sealant, and inadequate upstand height that allows wind-driven rain to track behind the flashing.
        </p>
        <p>
          There are three primary flashing types used on pitched tiled roofs of Class 2 strata apartment buildings. Step and counter flashings in Colorbond steel are the standard solution for wall-to-roof abutments — the step flashing interlocks course-by-course with tiles while the counter-flashing is dressed into the mortar joint above. Lead sheet is used for chimney flashings and complex geometries where Colorbond profiles cannot be pre-formed — lead is worked on site and dressed closely to the masonry profile. EPDM rubber collars provide a self-sealing solution for round pipe penetrations through the tile surface without cutting or reshaping tiles.
        </p>
        <p>
          A secondary PU sealant joint is applied at flashing-to-tile, flashing-to-wall and collar-to-pipe transitions as a supplementary weather seal. Sealant is not a substitute for correctly formed and lapped metal flashings — it seals the secondary gap at the flashing edge where movement or surface irregularity prevents full metal-to-substrate contact. All flashing systems must achieve minimum upstand heights per AS 4654.2 and the NCC, regardless of the flashing material used.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Valley iron — valley iron drains water down the valley between roof planes, not at wall abutments — a separate roofing element",
              "Waterproofing membranes — liquid-applied or sheet membrane systems for flat roofs and podiums, not metal flashings for pitched roof abutments",
              "Tile replacement — replacing cracked or broken tiles addresses tile failure, not flashing failure at wall, chimney or penetration junctions",
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

export function FlashingFailuresProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — roof flashing systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of roof flashing products for pitched tiled roofs. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Movement accommodation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600">{row.movementAccomm}</td>
                  <td className="px-4 py-3 text-slate-600">{row.standard}</td>
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
            <p className="mt-1 text-sm text-slate-500">Roof flashing system equivalents across brands active in Australian Class 2 strata roofing remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Lysaght</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Austral Lead</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Deks</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>Sika</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.lysaght, row.australlead, row.deks, row.sika].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callouts — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Upstand heights and compatibility</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Minimum upstand height of 100mm above tile surface is required for all roof flashings per AS 4654.2 — confirm on site before and after installation",
            "Avoid galvanic contact between lead and aluminium or uncoated steel — use Colorbond separation flashing or purpose-made isolation tape between dissimilar metals",
            "Sealant joints must be supported by backer rod where joint depth exceeds 15mm — unsupported deep joints will not cure correctly and will fail prematurely",
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
