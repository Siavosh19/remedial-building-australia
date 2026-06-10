"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Glasswool"
  | "Polyester"
  | "R4.0"
  | "R4.1"
  | "Ceiling-batt"
  | "Bradford"
  | "Knauf"
  | "Fletcher"
  | "NCC-compliant"
  | "Itch-free"
  | "Formaldehyde-free";

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
    fullLabel: "CSR Bradford",
    brandUrl: "https://www.bradfordinsulation.com.au",
    tdsUrl: "https://www.bradfordinsulation.com.au",
    accentColor: "#b45309",
    name: "Bradford Gold R4.1 Ceiling Batts",
    descriptionLine: "CSR Bradford Gold glasswool ceiling insulation batts — R4.1 — exceeds NCC R4.0 requirement for climate zones 4–6 — 430mm and 580mm widths — standard residential ceiling batt",
    productType: "R4.1 glasswool ceiling batt — AS/NZS 4859 — NCC compliant",
    filterTags: ["Glasswool", "R4.1", "Ceiling-batt", "Bradford", "NCC-compliant"],
    techChips: [
      { label: "Glasswool", cls: "bg-amber-100 text-amber-800" },
      { label: "R4.1", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC compliant", cls: "bg-green-50 text-green-700" },
      { label: "Bradford Gold", cls: "bg-slate-100 text-slate-700" },
      { label: "430mm and 580mm widths", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Bradford Gold R4.1 Ceiling Batts are CSR Bradford's standard glasswool ceiling insulation product and one of the most widely specified ceiling batt systems in Australian residential and Class 2 strata construction. The R4.1 value slightly exceeds the NCC minimum R4.0 requirement for ceiling insulation in climate zones 4–6 — providing a margin above the minimum and making Bradford Gold a compliant product for all NCC climate zones that require R4.0 or higher. Available in 430mm width for 450mm joist spacing and 580mm width for 600mm joist spacing. Both widths are available in standard lengths for ease of installation between ceiling joists. Bradford Gold is a glasswool product — it contains glass fibres that can cause skin and respiratory irritation during installation and require PPE (long sleeves, gloves, P2 dust mask). Installation is at ceiling joist level — between and over ceiling joists where required — not in the roof space under tiles. Bradford Gold R4.1 is the benchmark ceiling batt product against which alternative brands are commonly compared. Confirm current product R-value, dimensions, and NCC compliance with Bradford before specifying — the product designation (Gold) and R-value have been consistent but confirm the current TDS before ordering.",
    technicalProperties: [
      "Glasswool ceiling insulation batt — R4.1 — AS/NZS 4859 classified",
      "Exceeds NCC minimum R4.0 ceiling insulation requirement for climate zones 4–6",
      "430mm width for 450mm joist spacing — 580mm width for 600mm joist spacing",
      "Standard residential ceiling batt — most widely distributed ceiling insulation product in Australia",
      "Install between ceiling joists at ceiling level — not under roof tiles",
      "Confirm current product R-value, dimensions, and NCC compliance with Bradford before ordering",
    ],
    limitations: [
      "Glasswool product — causes skin and respiratory irritation — wear long sleeves, gloves, and P2 dust mask during installation",
      "Ceiling-level installation only — do not confuse with under-tile PIR sarking or reflective foil sarking which are installed under the tiles",
      "Must not block eave ventilation — do not pack batts into eave space without anti-ponding board and insulation stop",
      "Confirm NCC minimum R-value for the specific climate zone with certifier before ordering — R4.0/R4.1 may not be sufficient for all climate zones",
      "Exhaust fan surrounds and downlight covers must be installed before insulation — confirm with electrician before installation",
      "Confirm current product dimensions with Bradford before ordering — joist spacings and batt widths must match",
    ],
    procurementSources: [
      { name: "CSR Bradford — trade supply", url: "https://www.bradfordinsulation.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10", url: "https://www.mitre10.com.au" },
      { name: "Insulation suppliers nationally", url: "https://www.bradfordinsulation.com.au" },
    ],
  },
  {
    fullLabel: "CSR Bradford",
    brandUrl: "https://www.bradfordinsulation.com.au",
    tdsUrl: "https://www.bradfordinsulation.com.au",
    accentColor: "#b45309",
    name: "Bradford Polymax R4.0",
    descriptionLine: "Bradford polyester/recycled fibre ceiling batt — R4.0 — no glass fibres — itch-free handling — alternative to Bradford Gold glasswool",
    productType: "R4.0 polyester ceiling batt — itch-free — AS/NZS 4859",
    filterTags: ["Polyester", "R4.0", "Ceiling-batt", "Bradford", "Itch-free"],
    techChips: [
      { label: "Polyester / recycled fibre", cls: "bg-amber-100 text-amber-800" },
      { label: "R4.0", cls: "bg-slate-100 text-slate-700" },
      { label: "Itch-free", cls: "bg-green-50 text-green-700" },
      { label: "Bradford", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC R4.0 compliant", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Bradford Polymax R4.0 is Bradford's polyester/recycled fibre ceiling insulation batt — an alternative to the Bradford Gold glasswool product. The primary practical difference is that Polymax is an itch-free product — it does not contain glass fibres and does not cause skin or respiratory irritation during handling and installation. This makes it a preferred product for installers who handle large volumes of insulation batts, and for homeowners who wish to top up or rearrange ceiling insulation themselves after installation. The R4.0 value meets the NCC minimum for climate zones requiring R4.0 at ceiling level. Polymax is not as widely distributed as Bradford Gold and may carry a small price premium — confirm current availability and pricing with Bradford or a local insulation supplier. The product is manufactured from recycled polyester fibres and is marketed as an environmentally preferable alternative within the Bradford range. Install at ceiling joist level between joists — not in the roof space under tiles. Confirm current product dimensions, R-value, and availability with Bradford before specifying.",
    technicalProperties: [
      "Polyester/recycled fibre ceiling batt — R4.0 — AS/NZS 4859 classified",
      "Itch-free — no glass fibres — can be handled without long sleeves or respiratory protection",
      "Meets NCC minimum R4.0 ceiling insulation requirement for applicable climate zones",
      "Manufactured from recycled polyester fibres — marketed as environmentally preferable within Bradford range",
      "Install between ceiling joists at ceiling level — not under roof tiles",
      "Confirm current dimensions, availability, and pricing with Bradford before ordering",
    ],
    limitations: [
      "R4.0 — does not exceed NCC minimum — if specifying above minimum for energy performance, specify Bradford Gold R4.1 or R6 product",
      "May not be as widely stocked as Bradford Gold — confirm availability with local supplier before specifying",
      "Ceiling-level installation only — do not confuse with under-tile PIR sarking or reflective foil sarking",
      "Must not block eave ventilation — insulation stops and anti-ponding boards required at eave",
      "Confirm NCC minimum R-value for the specific climate zone with certifier before ordering",
      "Higher unit cost than Bradford Gold glasswool in some markets — confirm pricing before specifying",
    ],
    procurementSources: [
      { name: "CSR Bradford — trade supply", url: "https://www.bradfordinsulation.com.au" },
      { name: "Bunnings — in-store nationally (availability varies)", url: "https://www.bunnings.com.au" },
      { name: "Insulation suppliers nationally", url: "https://www.bradfordinsulation.com.au" },
    ],
  },
  {
    fullLabel: "Knauf Insulation",
    brandUrl: "https://www.knaufinsulation.com.au",
    tdsUrl: "https://www.knaufinsulation.com.au",
    accentColor: "#15803d",
    name: "Knauf Earthwool R4.0 Ceiling Batts",
    descriptionLine: "Knauf glasswool ceiling insulation — R4.0 — formaldehyde-free ECOSE binder — alternative to Bradford Gold — AS/NZS 4859 classified",
    productType: "R4.0 glasswool ceiling batt — formaldehyde-free — Knauf ECOSE",
    filterTags: ["Glasswool", "R4.0", "Ceiling-batt", "Knauf", "Formaldehyde-free"],
    techChips: [
      { label: "Glasswool — ECOSE binder", cls: "bg-green-100 text-green-800" },
      { label: "R4.0", cls: "bg-slate-100 text-slate-700" },
      { label: "Formaldehyde-free", cls: "bg-green-50 text-green-700" },
      { label: "Knauf Earthwool", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 4859", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Knauf Earthwool R4.0 Ceiling Batts are Knauf Insulation's glasswool ceiling insulation product for the Australian market. The Earthwool product range uses Knauf's proprietary ECOSE binder technology, which is a bio-based binder derived from natural rapidly renewable materials — specifically, it is formaldehyde-free. This distinguishes Earthwool from traditional glasswool products that use formaldehyde-containing resole binders. The ECOSE binder gives Earthwool its distinctive brown colour (rather than the pink or yellow of traditional glasswool). Knauf Earthwool R4.0 is classified to AS/NZS 4859 and meets the NCC minimum R4.0 ceiling insulation requirement for applicable climate zones. It is available through major hardware chains and insulation suppliers nationally as an alternative brand to Bradford Gold. Like all glasswool products, Earthwool can cause skin and respiratory irritation during installation — PPE is required. Install at ceiling joist level between joists — not under roof tiles. Confirm current product dimensions, R-value, and NCC compliance with Knauf Insulation before specifying.",
    technicalProperties: [
      "Glasswool ceiling insulation batt with ECOSE bio-based binder — formaldehyde-free",
      "R4.0 — AS/NZS 4859 classified — meets NCC minimum R4.0 ceiling insulation requirement",
      "Distinctive brown colour from ECOSE binder — readily identifiable in the ceiling space",
      "Available nationally through major hardware chains and insulation suppliers",
      "Install between ceiling joists at ceiling level — not under roof tiles",
      "Confirm current product R-value, dimensions, and NCC compliance with Knauf before ordering",
    ],
    limitations: [
      "Glasswool product — formaldehyde-free binder but glass fibres still present — PPE required during installation",
      "R4.0 — does not exceed NCC minimum — specify R4.1 or higher if margin above minimum is required",
      "Ceiling-level installation only — do not confuse with under-tile PIR sarking or reflective foil sarking",
      "Confirm NCC minimum R-value for the specific climate zone with certifier before ordering",
      "Must not block eave ventilation — insulation stops required at eaves",
      "Confirm current product specification and availability with Knauf Insulation before ordering",
    ],
    procurementSources: [
      { name: "Knauf Insulation — trade supply", url: "https://www.knaufinsulation.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Total Tools", url: "https://www.totaltools.com.au" },
      { name: "Insulation suppliers nationally", url: "https://www.knaufinsulation.com.au" },
    ],
  },
  {
    fullLabel: "Fletcher Insulation",
    brandUrl: "https://www.fletcherinsulation.com.au",
    tdsUrl: "https://www.fletcherinsulation.com.au",
    accentColor: "#1d4ed8",
    name: "Fletcher Insulation Optimo R4.0",
    descriptionLine: "Fletcher Insulation glasswool ceiling batts R4.0 — AS/NZS 4859 — alternative brand option to Bradford and Knauf",
    productType: "R4.0 glasswool ceiling batt — Fletcher Insulation — AS/NZS 4859",
    filterTags: ["Glasswool", "R4.0", "Ceiling-batt", "Fletcher"],
    techChips: [
      { label: "Glasswool", cls: "bg-blue-100 text-blue-800" },
      { label: "R4.0", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 4859", cls: "bg-green-50 text-green-700" },
      { label: "Fletcher Insulation", cls: "bg-slate-100 text-slate-700" },
      { label: "Alternative brand", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fletcher Insulation Optimo R4.0 is Fletcher Insulation's glasswool ceiling insulation batt product for the Australian market. Fletcher Insulation is part of the Fletcher Building group and distributes insulation products nationally through timber merchants, hardware suppliers, and insulation specialists. The Optimo R4.0 ceiling batt is classified to AS/NZS 4859 and meets the NCC minimum R4.0 ceiling insulation requirement for applicable climate zones. It is positioned as an alternative brand option to Bradford Gold and Knauf Earthwool — all three products deliver comparable R4.0 glasswool ceiling insulation performance and meet NCC requirements. The primary differentiation between brands in this category is product availability through local suppliers, pricing at the time of ordering, and any specific installation features or dimensions that may suit the joist layout. Like all glasswool ceiling batts, Optimo requires PPE during installation — skin and respiratory irritation from glass fibres is expected without protection. Install at ceiling joist level — not under roof tiles. Confirm current product dimensions, R-value, NCC compliance, and pricing with Fletcher Insulation before specifying.",
    technicalProperties: [
      "Glasswool ceiling insulation batt — R4.0 — AS/NZS 4859 classified",
      "Meets NCC minimum R4.0 ceiling insulation requirement for applicable climate zones",
      "Distributed nationally through timber merchants, hardware suppliers, and insulation specialists",
      "Part of the Fletcher Building group — consistent national availability",
      "Install between ceiling joists at ceiling level — not under roof tiles",
      "Confirm current product dimensions, R-value, and NCC compliance with Fletcher before ordering",
    ],
    limitations: [
      "Glasswool product — glass fibres present — PPE required during installation (long sleeves, gloves, P2 mask)",
      "R4.0 — does not exceed NCC minimum — specify Bradford Gold R4.1 if margin above minimum is required",
      "Ceiling-level installation only — do not confuse with under-tile PIR sarking or reflective foil sarking",
      "Confirm NCC minimum R-value for the specific climate zone with certifier before ordering",
      "Confirm availability through local suppliers — distribution network may vary by region",
      "Confirm current product specification with Fletcher Insulation before ordering",
    ],
    procurementSources: [
      { name: "Fletcher Insulation — trade supply", url: "https://www.fletcherinsulation.com.au" },
      { name: "Bunnings — in-store nationally (availability varies)", url: "https://www.bunnings.com.au" },
      { name: "Insulation suppliers nationally", url: "https://www.fletcherinsulation.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Glasswool", label: "Glasswool" },
  { id: "Polyester", label: "Polyester" },
  { id: "Bradford", label: "Bradford" },
  { id: "Knauf", label: "Knauf" },
  { id: "Fletcher", label: "Fletcher" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Bradford Gold R4.1",
    brand: "Bradford",
    material: "Glasswool",
    rValue: "R4.1",
    itchFree: "No",
    formaldehydeFree: "No",
    widths: "430mm, 580mm",
  },
  {
    product: "Bradford Polymax R4.0",
    brand: "Bradford",
    material: "Polyester / recycled fibre",
    rValue: "R4.0",
    itchFree: "Yes",
    formaldehydeFree: "Yes",
    widths: "Confirm with Bradford",
  },
  {
    product: "Knauf Earthwool R4.0",
    brand: "Knauf",
    material: "Glasswool — ECOSE binder",
    rValue: "R4.0",
    itchFree: "No",
    formaldehydeFree: "Yes — ECOSE binder",
    widths: "Confirm with Knauf",
  },
  {
    product: "Fletcher Optimo R4.0",
    brand: "Fletcher",
    material: "Glasswool",
    rValue: "R4.0",
    itchFree: "No",
    formaldehydeFree: "Confirm with Fletcher",
    widths: "Confirm with Fletcher",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "New ceiling insulation installation in Class 2 strata buildings as part of roof tile replacement or sarking upgrade works",
    "Top-up or replacement of existing degraded or missing ceiling insulation during a roofing remediation programme",
    "NCC Section J energy efficiency compliance — ceiling insulation upgrade to meet minimum R-value requirements",
    "Strata buildings in climate zones 4–6 where NCC requires R4.0 ceiling insulation minimum",
    "Residential buildings where ceiling insulation has been disturbed or removed during prior building works",
  ],
  selectionCriteria: [
    "NCC minimum R-value for the climate zone — confirm with building certifier before specifying — R4.0 may not be sufficient for all zones",
    "Glasswool vs polyester — glasswool is more widely available at lower cost — polyester is itch-free and preferred by some installers",
    "Formaldehyde-free preference — specify Knauf Earthwool ECOSE if formaldehyde-free binder is required",
    "Joist spacing — confirm batt width against actual joist spacing before ordering — 430mm for 450mm spacing, 580mm for 600mm spacing",
    "Availability — confirm local stock availability before specifying — all brands may not be readily available in all regions",
    "Brand preference — all R4.0/R4.1 products from major brands are comparable in thermal performance — differentiation is in handling, binder type, and availability",
  ],
  limitations: [
    "Ceiling batts are installed at ceiling level — not in the roof space under tiles — do not confuse with under-tile sarking or PIR board insulation",
    "Ceiling batts must not block eave ventilation — insulation stops must be installed at the eave batten to prevent batts entering the eave space",
    "All exhaust fans, downlights, and penetrations must be properly treated before insulation is installed — confirm with electrician",
    "Do not lay insulation over existing batts without first confirming there is no moisture damage, pest infestation, or contamination in the existing insulation",
    "R4.0/R4.1 may not be the minimum for all NCC climate zones — confirm the specific minimum with a building certifier or energy assessor",
  ],
  standardsNotes: [
    "AS/NZS 4859.1 — Materials for the thermal insulation of buildings — product classification standard for insulation batts",
    "NCC Section J — Energy Efficiency — minimum R-values by climate zone and building element",
    "NCC Climate Zone map — confirm the climate zone for the specific building location before specifying R-value",
    "Bradford, Knauf, and Fletcher product installation guides — joist spacing, installation direction, eave treatment",
    "AS 3999 — Thermal insulation of dwellings — bulk insulation installation requirements",
  ],
  typicalSubstrates: [
    "Timber ceiling joists — standard 450mm or 600mm spacing — confirm actual joist spacing before ordering batts",
    "Steel ceiling joists — confirm batt width and compression fit against steel joist flange width",
    "Plasterboard ceiling lining — batts installed above plasterboard ceiling — confirm plasterboard is intact and load capacity is not exceeded",
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
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>
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

export function RoofInsulationR4IntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are R4 ceiling insulation batt systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          R4 ceiling batts are bulk insulation batts installed between ceiling joists at the ceiling level of a building — not in the roof space under the tiles. The R-value (thermal resistance) measures the insulation's ability to resist heat flow — R4.0 is the NCC minimum for ceiling insulation in climate zones 4–6. Ceiling batts are installed horizontally, resting in the ceiling joist bays above the plasterboard ceiling lining. They are entirely separate from under-tile sarking systems (reflective foil or PIR board) which are installed in the roof space under the roof tiles.
        </p>
        {expanded && (
          <>
            <p>
              The primary brands in the Australian market for R4.0 ceiling batts are Bradford (Gold glasswool and Polymax polyester), Knauf (Earthwool with ECOSE binder), and Fletcher Insulation (Optimo). All deliver comparable thermal performance at R4.0 — brand selection is generally driven by local availability, pricing, handling preference (glasswool vs polyester itch-free), and any specific project requirements for formaldehyde-free binders.
            </p>
            <p>
              Ceiling batt installation must not block eave ventilation. Insulation stops must be installed at the eave batten before batts are placed — the stop prevents batts from entering the eave space and blocking the gutter airspace. All exhaust fans, downlights, and electrical penetrations in the ceiling must be treated with appropriate covers and surrounds before insulation is installed.
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

export function RoofInsulationR4ProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter as FilterTag));

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
              Applications, selection criteria, limitations, standards, substrates
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
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      {/* ── Brand Equivalency ── */}
      <div>
        <div className="mb-4 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalency</h2>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">R value</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
              </tr>
            </thead>
            <tbody>
              {[
                { brand: "Bradford Gold", rValue: "R4.1", material: "Glasswool" },
                { brand: "Bradford Polymax", rValue: "R4.0", material: "Polyester" },
                { brand: "Knauf Earthwool", rValue: "R4.0", material: "Glasswool" },
                { brand: "Fletcher Optimo", rValue: "R4.0", material: "Glasswool" },
              ].map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-5 py-3 font-semibold text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.rValue}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 products — 3 brands — glasswool and polyester ceiling batt systems — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of R4 ceiling batt systems. Confirm all product selections against the current manufacturer TDS and NCC climate zone requirements before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">R-value</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Itch-free</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Formaldehyde-free</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Width options</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.rValue}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.itchFree === "Yes" ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                        <CheckCircle size={11} /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                        <XCircle size={11} /> No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.formaldehydeFree}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px]">{row.widths}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
