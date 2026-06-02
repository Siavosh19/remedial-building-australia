"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Penetration"
  | "Collar"
  | "Lead"
  | "EPDM"
  | "Aluminium"
  | "Self-sealing"
  | "Pipe-flashing"
  | "Roof"
  | "Wall"
  | "Sealant"
  | "PU"
  | "1C";

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
    fullLabel: "Austral Lead",
    brandUrl: "https://www.australlead.com.au",
    accentColor: "#ef4444",
    name: "Austral Lead Pre-Formed Pipe Collar",
    descriptionLine: "Pre-formed pure lead collar for pipe penetrations through pitched roofs and parapets — malleable, workable around irregular shapes, long service life",
    productType: "Pre-formed pure lead pipe penetration collar",
    filterTags: ["Penetration", "Collar", "Lead", "Pipe-flashing", "Roof"],
    techChips: [
      { label: "Pre-formed lead collar", cls: "bg-sky-100 text-sky-800" },
      { label: "Pure lead", cls: "bg-slate-100 text-slate-700" },
      { label: "Malleable", cls: "bg-slate-100 text-slate-700" },
      { label: "Roof penetration", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Austral Lead Pre-Formed Pipe Collars are manufactured from pure lead sheet and supplied in a range of pipe diameters for pipe penetrations through pitched tile and metal roofs and masonry parapets. Lead is the traditional material of choice for complex pipe penetration profiles — it is malleable and can be worked and dressed by hand around irregular shapes, including existing tile profiles, penetrations close to ridges or hips, and pipes with non-standard angles.\n\nLead collars are dressed onto the pipe and lapped under adjacent tiles or over metal flashings to form a watertight seal. The lap joint at the collar-to-flashing interface is sealed with PU sealant. Lead has a long service life when correctly installed and protected from galvanic contact with incompatible metals. Confirm collar sizing against pipe OD and roof pitch with Austral Lead before specifying.",
    technicalProperties: [
      "Pure lead construction — highly malleable — workable around complex roof profiles, irregular pipe angles, and heritage tile profiles",
      "Long service life — lead is inherently resistant to UV degradation and atmospheric weathering in Australian conditions",
      "Supplied in a range of pipe diameters — confirm correct size against pipe OD before ordering",
      "Compatible with most common pipe materials including PVC, copper, and cast iron — confirm galvanic compatibility with adjacent metals",
      "Lapped and dressed installation — no adhesive required at tile interface — mechanical seal formed by dressing collar under tile course",
    ],
    limitations: [
      "Lead is a heavy metal — handle in accordance with safe work method statements and relevant Australian WHS requirements",
      "Do not use in direct contact with aluminium, zinc, or galvanised steel without isolation — galvanic corrosion risk",
      "Installation requires a skilled tradesperson — lead dressing and shaping requires experience and correct tools",
      "Not suitable as a retrofit without tile or metal sheet removal to allow proper installation and lapping",
      "Confirm current product specification and compliance with Austral Lead before specifying",
    ],
    procurementSources: [
      { name: "Austral Lead — trade supply — contact for current pricing and sizing range", url: "https://www.australlead.com.au" },
      { name: "Roofing trade suppliers — nationally — confirm current stock and sizing", url: "https://www.australlead.com.au" },
    ],
  },
  {
    fullLabel: "Deks",
    brandUrl: "https://www.deks.com.au",
    accentColor: "#3b82f6",
    name: "Deks D-1 Multi EPDM Collar",
    descriptionLine: "Self-sealing EPDM rubber collar for pipe penetrations 0–115mm diameter — compresses to seal against pipe, suitable for tiled, metal and flat roofs",
    productType: "Self-sealing EPDM pipe penetration collar",
    filterTags: ["Penetration", "Collar", "EPDM", "Self-sealing", "Pipe-flashing", "Roof"],
    techChips: [
      { label: "EPDM collar", cls: "bg-sky-100 text-sky-800" },
      { label: "Self-sealing", cls: "bg-green-50 text-green-700" },
      { label: "0–115mm diameter", cls: "bg-slate-100 text-slate-700" },
      { label: "Tiled / metal / flat roof", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Deks D-1 Multi EPDM Collar is a self-sealing rubber pipe penetration collar accommodating pipe diameters from 0mm to 115mm within a single collar. The EPDM rubber cone seals against the pipe by compression — the installer cuts the collar at the correct diameter mark and the rubber compresses around the pipe to form a watertight seal without additional sealant at the pipe-collar interface. The flange is secured to the roof substrate and lapped under tile or metal sheet courses.\n\nEPDM collars are widely used on new construction and remediation of standard residential and Class 2 strata roof penetrations including plumbing vent pipes, soil stacks, and electrical conduits. The D-1 Multi is compatible with tiled, corrugated metal, and low-slope roofs within its pitch range. Confirm pitch compatibility and pipe diameter against the current Deks product specification before ordering.",
    technicalProperties: [
      "Self-sealing EPDM rubber compression seal at pipe interface — no sealant required at collar-to-pipe joint",
      "Single collar accommodates 0–115mm diameter pipe range — cut to suit pipe OD at marked diameter",
      "EPDM rubber — UV and ozone resistant — suitable for Australian exterior roofing conditions",
      "Compatible with tiled, metal corrugated and low-slope roof substrates — confirm pitch compatibility with Deks",
      "Aluminium or galvanised steel flange base — confirm material against roof substrate for galvanic compatibility",
    ],
    limitations: [
      "EPDM collars must be installed before the final roof sheet or tile course — retrofitting requires tile or sheet removal",
      "Collar must be cut at the correct diameter mark — under-cutting reduces compression seal effectiveness — over-cutting creates gap",
      "Confirm roof pitch compatibility against current Deks D-1 Multi specification — not all pitch ranges are suitable",
      "Flange base must be sealed and lapped correctly — collar flange is not self-sealing at the roof substrate interface",
      "Confirm current product specification and compliance with Deks before specifying",
    ],
    procurementSources: [
      { name: "Deks Australia — trade supply — contact for current pricing", url: "https://www.deks.com.au" },
      { name: "Roofing trade suppliers — nationally — confirm current stock", url: "https://www.deks.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Deks",
    brandUrl: "https://www.deks.com.au",
    accentColor: "#22c55e",
    name: "Deks 45 Aluminium Pipe Collar",
    descriptionLine: "Pressed aluminium pipe collar for pipe penetrations on 45-degree pitched roofs — available in range of pipe diameters, Colorbond-compatible",
    productType: "Pressed aluminium pipe collar for 45-degree roof pitches",
    filterTags: ["Penetration", "Collar", "Aluminium", "Pipe-flashing", "Roof"],
    techChips: [
      { label: "Aluminium collar", cls: "bg-sky-100 text-sky-800" },
      { label: "45-degree pitch", cls: "bg-slate-100 text-slate-700" },
      { label: "Pressed aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Colorbond-compatible", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "The Deks 45 Aluminium Pipe Collar is a pressed aluminium pipe penetration collar designed for 45-degree pitched metal roofs, including Colorbond corrugated and custom orb profiles. The collar is formed to sit flush against the roof sheet profile, with a EPDM or neoprene compression seal at the pipe interface and an aluminium flange that laps under the adjacent roof sheet course.\n\nAluminium collars are preferred on metal roofing where lead collars would introduce galvanic contact risk with the Colorbond substrate. Available in a range of pipe diameters — confirm correct diameter against pipe OD. The flange is compatible with standard Colorbond profiles. Confirm profile compatibility against the current Deks 45 product specification before ordering. Lap joints between collar flange and roof sheet should be sealed with a compatible PU sealant at the upslope lap.",
    technicalProperties: [
      "Pressed aluminium construction — galvanically compatible with Colorbond steel roofing — reduces corrosion risk at collar-to-roof interface",
      "Designed for 45-degree pitched metal roof profiles — flange formed to suit corrugated and custom orb Colorbond profiles",
      "EPDM or neoprene compression seal at pipe interface — confirm seal material against pipe type with Deks",
      "Available in a range of standard pipe diameters — confirm correct size against pipe OD before ordering",
      "Colorbond powder-coat colour options available — confirm current colour range with Deks",
    ],
    limitations: [
      "Designed specifically for 45-degree pitched roofs — not suitable for flat or low-slope roofs without confirming alternate product with Deks",
      "Must be installed before final roof sheet is fixed — retrofitting requires sheet removal and re-fixing",
      "Confirm profile compatibility against specific Colorbond or metal roof profile — not all corrugated profiles are identical",
      "Lap sealant at upslope flange edge required — collar flange alone does not provide a watertight seal at the upslope lap",
      "Confirm current product specification and compliance with Deks before specifying",
    ],
    procurementSources: [
      { name: "Deks Australia — trade supply — contact for current pricing", url: "https://www.deks.com.au" },
      { name: "Roofing trade suppliers — nationally — confirm current stock and profile compatibility", url: "https://www.deks.com.au" },
    ],
  },
  {
    fullLabel: "Sika",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/sealing-bonding/joint-sealants/sikaflex-11-fc-plus.html",
    accentColor: "#f97316",
    name: "Sikaflex-11 FC+",
    descriptionLine: "1-part polyurethane sealant for sealing collar-to-pipe and collar-to-flashing lap joints at roof and wall penetrations",
    productType: "1-part PU sealant for collar-to-pipe and collar-to-flashing joints",
    filterTags: ["Sealant", "PU", "1C", "Penetration", "Roof", "Wall"],
    techChips: [
      { label: "Polyurethane sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture-cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Roof / wall penetration", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikaflex-11 FC+ is a one-component moisture-curing polyurethane sealant used to seal collar-to-pipe and collar-to-flashing lap joints at roof and wall pipe penetrations. It is applied by cartridge gun to the prepared joint interface between the pipe collar flange and the adjacent roof sheet, tile, or flashing. Suitable for use over aluminium, lead, EPDM-flanged collars and Colorbond steel roofing substrates — confirm primer requirements for each substrate combination with Sika.\n\nAt pipe penetration collar joints, Sikaflex-11 FC+ is applied as a secondary seal at the upslope flange lap to prevent wind-driven rain entry behind the collar. It is not a substitute for correct collar installation and lapping — the mechanical collar assembly must be correctly installed first. Confirm compatibility of Sikaflex-11 FC+ with the specific collar material and roof substrate before application.",
    technicalProperties: [
      "One-component moisture-curing polyurethane — no mixing required on site — reduces application error",
      "Good adhesion to aluminium, lead, EPDM-flange, Colorbond steel, and most common roofing substrates — confirm primer requirement with Sika TDS",
      "Paintable after full cure with compatible paint systems — suitable for collar lap joints on painted metal roofs",
      "Gun-applied from standard cartridge — toolable after application to form a neat, concave lap joint profile",
      "Available in grey and standard colours — confirm current colour range with Sika Australia",
    ],
    limitations: [
      "Sealant at collar lap joint is a secondary seal — it does not substitute for correct collar installation, sizing, and mechanical lapping",
      "Do not apply to damp, dirty, or contaminated joint faces — adhesion failure is the primary sealant failure mode at collar lap joints",
      "Primer required on some substrates — confirm primer compatibility with collar material before application per Sika TDS",
      "Not suitable for continuous immersion — lap joint sealant application only — confirm suitability for submerged conditions with Sika technical",
      "Confirm current product specification and compliance with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Roofing trade suppliers — nationally — confirm current stock", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Penetration", label: "Penetration" },
  { id: "Collar", label: "Collar" },
  { id: "Lead", label: "Lead" },
  { id: "EPDM", label: "EPDM" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Self-sealing", label: "Self-sealing" },
  { id: "Pipe-flashing", label: "Pipe-flashing" },
  { id: "Roof", label: "Roof" },
  { id: "Wall", label: "Wall" },
  { id: "Sealant", label: "Sealant" },
  { id: "PU", label: "PU" },
  { id: "1C", label: "One-component" },
];

const BRAND_EQUIV: { system: string; australlead: string; deks: string; sika: string }[] = [
  { system: "Lead pipe collar", australlead: "Pre-Formed Lead Collar", deks: "—", sika: "—" },
  { system: "EPDM self-sealing collar", australlead: "—", deks: "D-1 Multi", sika: "—" },
  { system: "Aluminium pressed collar", australlead: "—", deks: "Deks 45", sika: "—" },
  { system: "PU sealant (collar joints)", australlead: "—", deks: "—", sika: "Sikaflex-11 FC+" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; material: string; pipeRangeMm: string; roofPitch: string; standard: string; primaryUse: string;
}[] = [
  {
    product: "Austral Lead Pre-Formed Pipe Collar",
    brand: "Austral Lead",
    material: "Pure lead",
    pipeRangeMm: "Various — confirm with Austral Lead",
    roofPitch: "All pitches — hand-dressed to profile",
    standard: "AS 4654",
    primaryUse: "Complex roof profiles, heritage tiles, irregular pipe angles",
  },
  {
    product: "Deks D-1 Multi EPDM Collar",
    brand: "Deks",
    material: "EPDM rubber / aluminium or galvanised base",
    pipeRangeMm: "0–115 mm",
    roofPitch: "Confirm with Deks — tiled, metal and flat",
    standard: "AS 4654",
    primaryUse: "Standard residential vent pipe penetrations — tiled and metal roofs",
  },
  {
    product: "Deks 45 Aluminium Pipe Collar",
    brand: "Deks",
    material: "Pressed aluminium / EPDM or neoprene seal",
    pipeRangeMm: "Range — confirm with Deks",
    roofPitch: "45-degree pitched metal roofs",
    standard: "AS 4654",
    primaryUse: "Colorbond corrugated metal roof pipe penetrations",
  },
  {
    product: "Sikaflex-11 FC+",
    brand: "Sika",
    material: "Polyurethane (1C moisture-cure)",
    pipeRangeMm: "N/A — sealant",
    roofPitch: "All — collar lap joint sealant",
    standard: "AS 4654",
    primaryUse: "Collar-to-pipe and collar-to-flashing lap joint sealing",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Pipe penetrations for plumbing vent pipes and soil stacks through tiled pitched roofs on Class 2 strata buildings",
    "Pipe penetrations through Colorbond corrugated and custom orb metal roofing profiles",
    "Pipe and conduit penetrations through masonry parapet walls and concrete roof slabs",
    "Re-flashing failed or deteriorated pipe collars on existing roofs as part of a remediation scope",
    "Sealing collar-to-flashing lap joints with PU sealant after collar installation",
  ],
  selectionCriteria: [
    "Select lead collar for complex roof profiles, heritage tiles, or pipes at non-standard angles — lead is workable around irregular shapes",
    "Select EPDM self-sealing collar (D-1 Multi) for standard residential vent pipe penetrations on tiled or metal roofs within pitch range",
    "Select aluminium pressed collar (Deks 45) for Colorbond metal roofing at 45-degree pitch — avoids galvanic contact with lead",
    "Select PU sealant (Sikaflex-11 FC+) for secondary sealing at all collar-to-flashing and collar-to-pipe lap joints",
    "Confirm collar diameter against pipe OD — incorrect sizing will not create a watertight compression seal",
  ],
  limitations: [
    "Pipe collars must be installed before final tile course or roof sheet is fixed — retrofitting requires tile or sheet removal",
    "Lead collars must not be in direct contact with aluminium, zinc, or galvanised steel — galvanic corrosion risk",
    "EPDM self-sealing collars rely on compression at the pipe interface — do not over-cut or under-cut the collar diameter",
    "PU sealant at collar lap joints is a secondary seal — it does not substitute for correct collar installation and lapping",
    "All collar types require clean, dry substrate at the lap joint before sealant application — contaminated surfaces will not seal",
  ],
  standardsNotes: [
    "AS 4654.1 — Waterproofing of external above-ground structures — general requirements including penetration flashing",
    "AS 4654.2 — Waterproofing of external above-ground structures — design requirements for pipe penetration collar sizing and installation",
    "NCC / BCA Volume Two — residential building weatherproofing requirements for pipe penetrations through roofs and walls",
    "Confirm collar installation method against current manufacturer installation guide and relevant state-based plumbing regulations",
  ],
  suitableDefects: [
    "Failed or corroded pipe collars allowing water ingress around roof pipe penetrations — particularly on ageing strata buildings",
    "Cracked or debonded PU sealant at collar-to-flashing lap joints on metal and tiled roofs",
    "Missing or inadequate pipe collars on existing penetrations identified during roof condition assessment",
    "Wind-driven rain entry behind poorly installed or undersized pipe collars",
  ],
  typicalSubstrates: [
    "Concrete and masonry parapet walls — pipe penetration through wall — lead or EPDM collar with PU lap sealant",
    "Colorbond corrugated and custom orb metal roof sheet — aluminium collar (Deks 45) to avoid galvanic contact",
    "Terracotta and concrete roof tiles — lead or EPDM collar dressed under tile course",
    "Flat concrete roof slabs — EPDM collar or puddle flange — confirm product suitability with manufacturer",
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

export function PipePenetrationIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are pipe penetration flashing systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Pipe penetrations through roofs and external walls are among the most common sources of water ingress in Class 2 strata apartment buildings. Failure occurs when the collar or flashing around the pipe deteriorates or was incorrectly installed — common causes include inadequate sealing at the collar-to-pipe interface, UV degradation of rubber seals, thermal movement cracking the sealant at collar lap joints, and improper installation where the collar was not correctly lapped under adjacent tile or metal sheet courses.
        </p>
        <p>
          Three collar types are in common use in Australian remediation practice. Lead collars are the traditional choice for complex profiles, heritage tile types, and pipes at non-standard angles — lead is highly malleable and can be hand-dressed to conform to irregular shapes and tile profiles. EPDM self-sealing collars (such as the Deks D-1 Multi) are widely used for standard residential vent pipe penetrations — a single collar accommodates a range of pipe diameters and seals by rubber compression. Pressed aluminium collars (such as the Deks 45) are used on Colorbond metal roofing where lead would introduce galvanic contact with the steel substrate.
        </p>
        <p>
          PU sealant (such as Sikaflex-11 FC+) plays a secondary but critical role at collar lap joints — sealing the upslope flange lap to the adjacent roof sheet or flashing to prevent wind-driven rain entry. The sealant must be applied to a clean, dry, primed surface, and is not a substitute for correct collar sizing, positioning, and lapping.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Puddle flanges — balcony waterproofing penetrations through concrete slabs, not roof or wall pipe collars",
              "Roof valley flashings — valley drainage flashings are not pipe penetration collars and require different products",
              "Duct penetrations — HVAC duct collars may require different products to standard pipe collars — confirm with manufacturer",
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

export function PipePenetrationProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — 3 brands — pipe penetration flashing systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of pipe penetration collar products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Pipe range (mm)</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Roof pitch</th>
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
                  <td className="px-4 py-3 text-slate-600">{row.pipeRangeMm}</td>
                  <td className="px-4 py-3 text-slate-600">{row.roofPitch}</td>
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
            <p className="mt-1 text-sm text-slate-500">Pipe penetration collar equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Austral Lead</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Deks</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>Sika</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.australlead, row.deks, row.sika].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Collar sizing and installation sequence</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Collar diameter must be selected to match pipe OD — incorrect sizing will not create a watertight seal",
            "EPDM collars must be installed before final roof sheet or tile course — retrofitting requires tile or sheet removal",
            "PU sealant at collar lap joints must be applied over a clean, dry, primed surface — confirm primer compatibility with collar material",
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
