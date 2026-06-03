"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Pre-formed"
  | "EPDM"
  | "Silicone"
  | "Multi-pitch"
  | "Standard-diameter"
  | "Deks"
  | "Polyplas"
  | "Round-pipe"
  | "Square-pipe"
  | "Metal-roof"
  | "Tiled-roof";

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
    fullLabel: "Deks Industries",
    brandUrl: "https://deks.com.au",
    tdsUrl: "https://deks.com.au",
    accentColor: "#0369a1",
    name: "Deks D-1 Multi Flashing",
    descriptionLine: "Deks D-1 Multi pre-formed EPDM rubber penetration flashing collar — multi-pitch — adjustable to a range of pipe diameters — tiled and metal roofs — standard specification for vent and soil pipe penetration flashing on Australian pitched roofs",
    productType: "Pre-formed EPDM penetration flashing collar — multi-pitch — Deks D-1 Multi",
    filterTags: ["Pre-formed", "EPDM", "Multi-pitch", "Standard-diameter", "Deks", "Round-pipe", "Tiled-roof", "Metal-roof"],
    techChips: [
      { label: "EPDM rubber", cls: "bg-sky-100 text-sky-800" },
      { label: "Multi-pitch", cls: "bg-slate-100 text-slate-700" },
      { label: "Range of pipe diameters", cls: "bg-green-50 text-green-700" },
      { label: "Tiled and metal roofs", cls: "bg-slate-100 text-slate-700" },
      { label: "Australian standard", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Deks D-1 Multi is Deks Industries' primary penetration flashing collar for vent and soil pipe penetrations through pitched tiled and metal roofs. It is the most widely specified penetration collar for standard residential and strata roofing penetrations in Australia. The D-1 Multi features an EPDM rubber flexible body that accommodates a range of roof pitches without requiring the collar to be pitch-specific — the flexible skirt conforms to the roof surface at installation. The EPDM collar body fits over the pipe and is compressed to form a watertight seal at the pipe — no sealant is required at the pipe-to-collar junction. The lead-free aluminium base flange laps under the surrounding roof tiles or sheets and is fixed to the roof deck through the flange. Available in a range of sizes to suit standard nominal soil pipe and vent pipe diameters. The D-1 Multi is suitable for both tiled and metal (corrugated iron and trapezoidal profile) roofs. On tiled roofs, the base flange seats under the surrounding tile courses. On metal roofs, the flange is sealed to the roof sheet with the appropriate sealant. Confirm the correct size against the pipe's outside diameter before ordering — do not assume nominal diameter matches actual pipe OD. Confirm suitability with the current Deks TDS before specifying.",
    technicalProperties: [
      "Pre-formed EPDM rubber collar — flexible body conforms to roof surface — multi-pitch — no pitch-specific variant required",
      "Aluminium base flange — lead-free — laps under tiles or metal roof sheet",
      "EPDM compression fit to pipe — no sealant required at the pipe-to-collar junction",
      "Available in a range of sizes for standard nominal soil pipe and vent pipe diameters",
      "Suitable for tiled roofs (concrete and terracotta) and corrugated and trapezoidal metal roofs",
      "Australian standard specification for penetration flashing on residential and strata pitched roofs",
      "UV-resistant EPDM rubber body — long service life in Australian climate",
    ],
    limitations: [
      "Confirm actual pipe OD against available collar sizes before ordering — nominal pipe diameter may not match actual OD",
      "Compression fit to pipe is not a substitute for correctly seating the collar flange under tiles or onto the metal sheet — the flange seal is the primary waterproofing element",
      "Not suitable for square or rectangular duct penetrations — D-1 Multi is a round pipe collar only",
      "On metal roofs, the flange must be sealed to the roof sheet with an appropriate sealant — confirm sealant compatibility with Deks before applying",
      "Confirm current product range, sizes, and TDS with Deks Industries before ordering",
    ],
    procurementSources: [
      { name: "Deks Industries — trade supply", url: "https://deks.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Plumbing trade suppliers nationally", url: "https://deks.com.au" },
      { name: "Roofing trade suppliers nationally", url: "https://deks.com.au" },
    ],
  },
  {
    fullLabel: "Deks Industries",
    brandUrl: "https://deks.com.au",
    tdsUrl: "https://deks.com.au",
    accentColor: "#0284c7",
    name: "Deks 45 Flashing",
    descriptionLine: "Deks 45 pre-formed EPDM penetration flashing collar — optimised for roof pitches up to 45 degrees — round pipe penetrations — tiled and metal roofs — rigid aluminium base flange",
    productType: "Pre-formed EPDM penetration flashing collar — up to 45° pitch — Deks 45",
    filterTags: ["Pre-formed", "EPDM", "Standard-diameter", "Deks", "Round-pipe", "Tiled-roof", "Metal-roof"],
    techChips: [
      { label: "EPDM rubber", cls: "bg-sky-100 text-sky-800" },
      { label: "Up to 45° pitch", cls: "bg-slate-100 text-slate-700" },
      { label: "Round pipe", cls: "bg-green-50 text-green-700" },
      { label: "Rigid aluminium flange", cls: "bg-slate-100 text-slate-700" },
      { label: "Tiled and metal roofs", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Deks 45 is a penetration flashing collar from Deks Industries designed for pitched roofs with angles up to 45 degrees. Unlike the D-1 Multi which uses a flexible EPDM skirt that conforms to the roof surface, the Deks 45 has a rigid aluminium base flange that is angle-formed at manufacture to suit the specific roof pitch. The rigid flange seats flush against the roof surface on steeper pitches, providing a more stable base than a flexible collar on high-pitch roofs. The Deks 45 is appropriate for roofs that are steeper than the recommended range of the D-1 Multi or where a rigid flange base is preferred for the roof profile. The EPDM body provides the compression seal at the pipe — no sealant is required at the pipe-to-collar junction. Available in a range of sizes for standard nominal pipe diameters. Suitable for tiled and metal roofs. On metal roofs, confirm sealant compatibility at the flange-to-roof interface with Deks before ordering. Confirm the correct size against the pipe's actual OD before ordering.",
    technicalProperties: [
      "Pre-formed EPDM rubber collar — rigid aluminium base flange — angle-formed for pitches up to 45 degrees",
      "Suitable for steep-pitch tiled and metal roofs up to 45 degree pitch",
      "EPDM compression fit to pipe — no sealant required at pipe-to-collar junction",
      "Available in a range of sizes for standard nominal pipe diameters",
      "Rigid flange provides stable base on steep-pitch roofs compared to flexible-skirt collars",
    ],
    limitations: [
      "Not multi-pitch — the Deks 45 is optimised for pitches up to 45 degrees — for lower pitch ranges the D-1 Multi may be more appropriate",
      "Confirm actual pipe OD against available collar sizes before ordering",
      "On metal roofs, confirm sealant requirement and compatibility at the flange-to-roof interface with Deks",
      "Not suitable for square or rectangular duct penetrations",
      "Confirm current product range, pitch range, and TDS with Deks Industries before ordering",
    ],
    procurementSources: [
      { name: "Deks Industries — trade supply", url: "https://deks.com.au" },
      { name: "Roofing trade suppliers nationally", url: "https://deks.com.au" },
      { name: "Plumbing trade suppliers nationally", url: "https://deks.com.au" },
    ],
  },
  {
    fullLabel: "Deks Industries",
    brandUrl: "https://deks.com.au",
    tdsUrl: "https://deks.com.au",
    accentColor: "#075985",
    name: "Deks Poly Multi-Pitch Flashing",
    descriptionLine: "Deks Poly Multi-Pitch pre-formed polypropylene penetration flashing collar — multi-pitch — round pipe — UV-resistant polypropylene body — lightweight — tiled and metal roofs",
    productType: "Pre-formed polypropylene penetration flashing collar — multi-pitch — Deks Poly",
    filterTags: ["Pre-formed", "Multi-pitch", "Standard-diameter", "Deks", "Round-pipe", "Tiled-roof", "Metal-roof"],
    techChips: [
      { label: "Polypropylene body", cls: "bg-sky-100 text-sky-800" },
      { label: "Multi-pitch", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-resistant", cls: "bg-green-50 text-green-700" },
      { label: "Lightweight", cls: "bg-slate-100 text-slate-700" },
      { label: "Tiled and metal roofs", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Deks Poly Multi-Pitch is a penetration flashing collar from Deks Industries with a UV-resistant polypropylene body rather than EPDM rubber. The polypropylene collar is flexible across a range of roof pitches, provides a lighter-weight alternative to EPDM collars, and is UV-stabilised for long-term exposure in the Australian climate. The Poly Multi-Pitch is suitable for standard round pipe penetrations on tiled and metal roofs. The collar seals to the pipe by compression and the base flange laps under tiles or seals to metal roof sheets. On tiled roofs, the collar is installed in the same manner as the D-1 Multi — flange under tiles, collar over pipe, no sealant at pipe-to-collar junction. On metal roofs, confirm sealant compatibility at the flange-to-sheet interface with Deks before installing. Available in a range of sizes for standard nominal pipe diameters. Confirm actual pipe OD against available collar sizes before ordering. The Poly Multi-Pitch is a practical alternative to EPDM collars where a lighter-weight polypropylene collar is preferred by the roof plumber or specified by the contractor.",
    technicalProperties: [
      "Pre-formed polypropylene collar — UV-resistant — lighter weight than EPDM collar",
      "Multi-pitch — flexible body conforms to a range of roof pitches",
      "Compression fit to pipe — no sealant required at pipe-to-collar junction",
      "Available in a range of sizes for standard nominal pipe diameters",
      "Suitable for tiled and corrugated/trapezoidal metal roofs",
      "UV-stabilised polypropylene for long-term Australian climate exposure",
    ],
    limitations: [
      "Confirm actual pipe OD against available collar sizes before ordering",
      "Polypropylene has different thermal expansion characteristics to EPDM — confirm suitability for the specific application with Deks if the pipe is a high-temperature exhaust stack",
      "Not suitable for square or rectangular duct penetrations",
      "On metal roofs, confirm sealant compatibility at flange-to-sheet interface with Deks",
      "Confirm current product range, sizes, and TDS with Deks Industries before ordering",
    ],
    procurementSources: [
      { name: "Deks Industries — trade supply", url: "https://deks.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Roofing trade suppliers nationally", url: "https://deks.com.au" },
    ],
  },
  {
    fullLabel: "Polyplas Industries",
    brandUrl: "https://www.polyplas.com.au",
    tdsUrl: "https://www.polyplas.com.au",
    accentColor: "#b45309",
    name: "Polyplas Poly-I-Flash",
    descriptionLine: "Polyplas Poly-I-Flash pre-formed EPDM and polypropylene penetration flashing collar — Australian manufacturer — multi-pitch — round pipe — tiled and corrugated metal roofs — alternative to Deks range",
    productType: "Pre-formed EPDM/polypropylene penetration flashing collar — Polyplas Poly-I-Flash",
    filterTags: ["Pre-formed", "EPDM", "Multi-pitch", "Standard-diameter", "Polyplas", "Round-pipe", "Tiled-roof", "Metal-roof"],
    techChips: [
      { label: "EPDM / polypropylene", cls: "bg-amber-100 text-amber-800" },
      { label: "Polyplas — Australian made", cls: "bg-slate-100 text-slate-700" },
      { label: "Multi-pitch", cls: "bg-green-50 text-green-700" },
      { label: "Alternative to Deks", cls: "bg-slate-100 text-slate-700" },
      { label: "Tiled and metal roofs", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Polyplas Industries is an Australian manufacturer of pre-formed penetration flashing collars and the Poly-I-Flash is their primary roofing penetration collar product — an alternative to the Deks range for standard round pipe penetrations through pitched tiled and corrugated metal roofs. The Poly-I-Flash uses an EPDM rubber seal at the pipe interface and a polypropylene base body, providing a combined rubber-seal-and-polypropylene-base collar that offers the UV resistance and rigidity of polypropylene with the watertight pipe compression seal of EPDM. The multi-pitch collar body is flexible across a range of roof pitches without requiring a pitch-specific product. The base flange seats under the surrounding tile courses on tiled roofs, or is sealed to the roof sheet on corrugated metal roofs. Available in a range of sizes for standard nominal pipe diameters. Confirm actual pipe OD against available collar sizes before ordering. Polyplas product may offer better regional pricing or availability in some markets compared to Deks — confirm current availability and pricing with Polyplas before specifying as the alternative to Deks for a project.",
    technicalProperties: [
      "Pre-formed penetration collar — EPDM rubber seal at pipe interface — polypropylene base body",
      "Multi-pitch — flexible body across a range of roof pitches",
      "Australian manufacturer — Polyplas Industries — alternative supply channel to Deks",
      "Available in a range of sizes for standard nominal pipe diameters",
      "Suitable for tiled and corrugated metal roofs",
      "UV-resistant polypropylene body for long-term Australian climate exposure",
    ],
    limitations: [
      "Confirm actual pipe OD against available collar sizes before ordering",
      "Confirm current product range, pitch rating, and TDS with Polyplas before ordering",
      "On metal roofs, confirm sealant compatibility at flange-to-sheet interface with Polyplas",
      "Not suitable for square or rectangular duct penetrations",
      "Confirm regional availability and pricing with Polyplas Industries before specifying as the alternative to Deks",
    ],
    procurementSources: [
      { name: "Polyplas Industries — trade supply", url: "https://www.polyplas.com.au" },
      { name: "Roofing trade suppliers — confirm stocking with local supplier", url: "https://www.polyplas.com.au" },
      { name: "Plumbing trade suppliers — confirm stocking with local supplier", url: "https://www.polyplas.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Pre-formed", label: "Pre-formed" },
  { id: "EPDM", label: "EPDM" },
  { id: "Multi-pitch", label: "Multi-pitch" },
  { id: "Deks", label: "Deks" },
  { id: "Polyplas", label: "Polyplas" },
  { id: "Standard-diameter", label: "Standard diameter" },
  { id: "Tiled-roof", label: "Tiled roof" },
  { id: "Metal-roof", label: "Metal roof" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  body: string;
  pitchRange: string;
  pipeSection: string;
  roofType: string;
  primaryUse: string;
}[] = [
  {
    product: "D-1 Multi",
    brand: "Deks",
    body: "EPDM — flexible skirt",
    pitchRange: "Multi-pitch",
    pipeSection: "Round",
    roofType: "Tiled + metal",
    primaryUse: "Standard residential and strata vent/soil pipe penetration — most common specification",
  },
  {
    product: "Deks 45",
    brand: "Deks",
    body: "EPDM — rigid aluminium flange",
    pitchRange: "Up to 45°",
    pipeSection: "Round",
    roofType: "Tiled + metal",
    primaryUse: "Steep pitch roofs — rigid flange preferred on high-pitch applications",
  },
  {
    product: "Poly Multi-Pitch",
    brand: "Deks",
    body: "Polypropylene — UV-resistant",
    pitchRange: "Multi-pitch",
    pipeSection: "Round",
    roofType: "Tiled + metal",
    primaryUse: "Lightweight polypropylene alternative to EPDM collar — same multi-pitch application",
  },
  {
    product: "Poly-I-Flash",
    brand: "Polyplas",
    body: "EPDM seal + polypropylene base",
    pitchRange: "Multi-pitch",
    pipeSection: "Round",
    roofType: "Tiled + corrugated metal",
    primaryUse: "Alternative Australian-made collar to Deks D-1 Multi — same application scope",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of failed or perished EPDM penetration collars at soil pipe and vent pipe penetrations through pitched tiled roofs on strata apartment buildings",
    "Replacement of failed metal pipe boots or improvised collar flashings at service penetrations on residential and strata roofs",
    "New penetration collar installation where a penetration has been cut through the roof without a properly formed collar",
    "Replacement of failed collars at hot water exhaust or flue penetrations — confirm temperature rating of the collar before installing on high-temperature flues",
    "Penetration collar installation on corrugated or trapezoidal metal roofs at soil pipe, vent pipe, and service penetration locations",
  ],
  selectionCriteria: [
    "Pipe diameter — measure the actual outside diameter of the pipe — do not assume nominal diameter matches actual OD — select collar size accordingly",
    "Roof type — tiled or metal — confirm the collar base flange is appropriate for the roof type (under-tile for tiled, flange-seal for metal)",
    "Roof pitch — select multi-pitch collar for standard pitches — Deks 45 for steep pitches above the D-1 Multi's rated range",
    "Pipe material — confirm EPDM compatibility with the pipe material — on hot water or gas flue exhausts, confirm high-temperature rating of the collar",
    "Brand preference — Deks and Polyplas are both acceptable Australian-market products — confirm local availability before specifying",
  ],
  limitations: [
    "Not suitable for square or rectangular duct penetrations — round pipe collars only on this page — square duct penetrations require a site-formed collar or a custom flashing",
    "Not for balcony and terrace waterproofing penetrations — different product category — listed on the Balcony Waterproofing Failure penetration collars page",
    "Do not apply sealant to the pipe-to-collar junction as a substitute for correctly selecting and sizing the collar — the compression fit is the seal, not sealant",
    "Perished or cracked EPDM collars cannot be repaired with sealant — the collar must be replaced",
    "High-temperature flue penetrations may require a collar rated for elevated temperatures — standard EPDM collars are not rated for continuous high-temperature exposure",
  ],
  standardsNotes: [
    "AS 1562.1 — Design and Installation of Sheet Roof and Wall Cladding — Metal — penetration flashing requirements for metal roofs",
    "AS 1562.3 — Design and Installation of Sheet Roof and Wall Cladding — Plastic — relevant for some roof types",
    "NCC / BCA — weather resistance requirements for roof penetrations in Class 1 and Class 2 buildings",
    "Tile manufacturer installation guides — penetration collar requirements for tiled roofs — confirm minimum flange dimensions and tile lap requirements",
  ],
  suitableDefects: [
    "Flashing failures — pipe penetration collar failure at soil pipe, vent pipe, or service penetrations through pitched tiled or metal roofs",
    "Roof leaks — pitched tiled roof — water ingress at penetration collar caused by perished EPDM, deformed collar, or incorrectly installed flashing",
    "Strata building roof remediation — penetration collar replacement as part of roof-wide flashing remediation works",
  ],
  typicalSubstrates: [
    "Concrete roof tiles — collar base flange laps under surrounding tile courses",
    "Terracotta roof tiles — collar base flange laps under surrounding tile courses",
    "Corrugated metal roof (Colorbond, Zincalume) — collar flange sealed to roof sheet",
    "Trapezoidal metal roof profiles — collar flange sealed to roof sheet — confirm collar compatibility with profile",
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

export function PenetrationCollarFFIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are penetration flashing collar systems for roofing?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Penetration flashing collar systems for roofing are pre-formed collars that seal the junction between a pipe, vent, or service element passing through a pitched tiled or metal roof and the surrounding roof surface. They are the standard method for waterproofing round pipe penetrations — soil pipes, vent pipes, and service conduits — through residential and strata pitched roofs in Australia.
        </p>
        {expanded && (
          <>
            <p>
              The most common roofing penetration collar systems in Australian use are manufactured by Deks Industries (D-1 Multi, Deks 45, Poly Multi-Pitch) and Polyplas Industries (Poly-I-Flash). These products consist of a pre-formed EPDM rubber or polypropylene body that compresses over the pipe to form the watertight pipe seal, attached to a base flange that laps under the surrounding tile courses or is sealed to a metal roof sheet. The multi-pitch versions accommodate a range of roof pitches without requiring a pitch-specific product.
            </p>
            <p>
              Product selection depends on the pipe's actual outside diameter (measure — do not assume nominal matches OD), the roof type (tiled or metal), and the roof pitch. On high-temperature exhaust or flue penetrations, confirm the collar is rated for elevated temperatures — standard EPDM collars are not rated for continuous high-temperature flue gas exposure.
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

export function PenetrationCollarFFProductSection() {
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
              Applications, selection criteria, limitations, standards, suitable substrates
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
            <p className="mt-1 text-sm text-slate-500">4 products — 3 brands — pre-formed roofing penetration collar systems — scroll to view all</p>
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
                      <a
                        href={product.brandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      >
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips}
                  />
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

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of pre-formed penetration flashing collar systems. Confirm all selections against current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Body material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pitch range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pipe section</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Roof type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product + row.brand} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.body}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pitchRange}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pipeSection}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.roofType}</td>
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
