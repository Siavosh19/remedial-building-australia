"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Aluminium"
  | "Mill-finish"
  | "Pre-painted"
  | "Step-flashing"
  | "Counter-flashing"
  | "Paintable"
  | "Custom"
  | "Non-standard";

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
    fullLabel: "Capral Aluminium",
    brandUrl: "https://www.capral.com.au",
    tdsUrl: "https://www.capral.com.au/products",
    accentColor: "#0369a1",
    name: "Capral Aluminium Step Flashing",
    descriptionLine: "Site-formed step and counter-flashing from Capral 5000-series mill-finish aluminium sheet (0.7mm, 0.9mm) — lightweight, corrosion resistant, can be painted to match wall or roof colour",
    productType: "Aluminium sheet step and counter-flashing — mill-finish — site-formed",
    filterTags: ["Aluminium", "Mill-finish", "Step-flashing", "Counter-flashing", "Paintable"],
    techChips: [
      { label: "Aluminium — 5000 series", cls: "bg-sky-100 text-sky-800" },
      { label: "Mill-finish", cls: "bg-slate-100 text-slate-700" },
      { label: "0.7mm / 0.9mm gauge", cls: "bg-green-50 text-green-700" },
      { label: "Paintable on site", cls: "bg-slate-100 text-slate-700" },
      { label: "Corrosion resistant", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Capral Aluminium is Australia's largest domestic aluminium extrusion and sheet manufacturer. For roofing step flashing applications, Capral 5000-series aluminium sheet (typically 5005 or 5052 alloy) in 0.7mm or 0.9mm gauge is the standard specification. Mill-finish aluminium has an uncoated, naturally oxidised surface — it is not pre-painted from the factory like Colorbond. Mill-finish aluminium can be painted on site after forming to match the wall render colour, tile colour, or another specified finish. Painting must use a paint system compatible with aluminium — typically an etch primer followed by an acrylic topcoat. Do not apply paint directly to unprepared aluminium without the correct primer. Aluminium is lightweight relative to lead, corrosion resistant in most environments, and can be site-formed using a sheet metal folder in the same way as Colorbond. However, aluminium is not as malleable as lead and cannot be hand-dressed into complex curved or irregular profiles. For step and counter-flashing on standard masonry wall abutments on tiled roofs, site-formed aluminium is a practical and cost-effective choice, particularly where a painted finish to match the wall colour is required. Dissimilar metal precautions apply — do not allow aluminium to come into direct contact with copper or copper-based products — use stainless steel fixings only.",
    technicalProperties: [
      "Capral 5000-series aluminium alloy sheet — 0.7mm or 0.9mm gauge — mill-finish (uncoated) — suitable for site forming",
      "Lightweight — approximately one-third the weight of lead at the same gauge — lower roof loading than lead flashings",
      "Corrosion resistant — aluminium forms a naturally protective oxide layer in most environments — not suitable in highly acidic or alkaline environments without additional protection",
      "Paintable — accept primer and acrylic topcoat after etch priming — allows colour matching to wall render or roof tiles",
      "Site-formed using standard sheet metal folder or brake — same forming method as Colorbond — cannot be hand-dressed like lead",
      "Stainless steel fixings required — do not use copper fixings, copper-based clips, or allow direct contact with copper gutters or flashings",
      "Supplied in flat sheet or coil — cut to size by contractor or sheet metal fabricator — widely available through aluminium distributors",
    ],
    limitations: [
      "Mill-finish aluminium must be painted before installation if colour matching to roof tile or wall colour is required — do not leave mill-finish exposed on a completed roof without an intended finish",
      "Painting requires etch primer — paint applied directly to unprepared aluminium will not adhere — confirm paint system compatibility with Capral or the paint supplier before application",
      "Dissimilar metal contact — galvanic corrosion if aluminium contacts copper, bronze, or copper-based alloys — use stainless steel fixings only and isolate from copper elements with a non-conductive barrier where necessary",
      "Not suitable for complex hand-formed profiles on heritage buildings where lead malleability is required — use lead sheet for those applications",
      "Does not self-seal at overlaps like lead — laps must be correctly dimensioned and directed to shed water — sealant may be used at laps in remedial applications",
      "Confirm current alloy specification, gauge availability, and pricing with Capral or local aluminium distributor before ordering",
    ],
    procurementSources: [
      { name: "Capral Aluminium — trade supply", url: "https://www.capral.com.au" },
      { name: "Metal Supermarkets Australia", url: "https://www.metalsupermarkets.com.au" },
      { name: "Midalia Steel (aluminium sheet)", url: "https://www.midaliasteel.com.au" },
      { name: "Metalcorp — aluminium distributor", url: "https://www.metalcorp.com.au" },
    ],
  },
  {
    fullLabel: "Metalcorp",
    brandUrl: "https://www.metalcorp.com.au",
    tdsUrl: "https://www.metalcorp.com.au",
    accentColor: "#b45309",
    name: "Metalcorp Aluminium Flashing",
    descriptionLine: "Aluminium flashing from Metalcorp sheet in mill-finish and pre-painted — used for step and counter-flashing applications on pitched tiled roofs",
    productType: "Aluminium sheet step and counter-flashing — mill-finish and pre-painted",
    filterTags: ["Aluminium", "Mill-finish", "Pre-painted", "Step-flashing"],
    techChips: [
      { label: "Aluminium sheet", cls: "bg-amber-100 text-amber-800" },
      { label: "Mill-finish and pre-painted", cls: "bg-slate-100 text-slate-700" },
      { label: "Metalcorp supply network", cls: "bg-green-50 text-green-700" },
      { label: "Paintable — mill-finish option", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Metalcorp is a major Australian steel and aluminium distribution business supplying sheet, coil, and section products to trade customers nationally. Metalcorp aluminium sheet in mill-finish and pre-painted finishes is used by roofing contractors and sheet metal fabricators for step and counter-flashing applications on pitched tiled roofs. Metalcorp supplies both mill-finish aluminium sheet (uncoated, natural oxide finish — paintable by contractor) and pre-painted aluminium sheet in a selected colour range. The pre-painted option can reduce on-site painting requirements where the pre-painted colour is close to the required match. Mill-finish Metalcorp aluminium sheet is specified for applications where the contractor will paint the formed flashings on site using an etch primer and acrylic topcoat. Metalcorp's aluminium product is available through their national branch network in standard sheet sizes and thicknesses suited to step flashing fabrication — typically 0.7mm or 0.9mm gauge. Forming method is the same as for Capral — site-formed with a sheet metal folder or supplied pre-formed by a fabricator. Fixings must be stainless steel — same dissimilar metal precautions apply as for all aluminium flashing applications.",
    technicalProperties: [
      "Metalcorp aluminium sheet — mill-finish and pre-painted options — 0.7mm and 0.9mm gauge available — confirm current product range with Metalcorp branch",
      "Pre-painted option available — reduces on-site painting requirement where pre-painted colour matches the project requirement",
      "Mill-finish option — paintable on site with etch primer and compatible topcoat",
      "Site-formed from flat sheet or coil using standard folder or brake — supplied in standard sheet sizes",
      "Distributed through Metalcorp branches nationally — trade supply to roofing contractors and fabricators",
      "Stainless steel fixings required — same dissimilar metal precautions as all aluminium flashing",
    ],
    limitations: [
      "Confirm current aluminium sheet specifications, gauges, pre-painted colour range, and pricing with the local Metalcorp branch before ordering",
      "Mill-finish product requires painting before installation if colour matching is required — etch primer and compatible topcoat essential",
      "Pre-painted colour range is limited compared to Colorbond — confirm colour availability before specifying pre-painted aluminium as a colour-matched option",
      "Dissimilar metal precautions — same galvanic corrosion risk with copper as Capral — stainless steel fixings only",
      "Cannot be hand-dressed — same forming limitations as Capral — not suitable for complex heritage profiles",
      "Confirm current product availability with Metalcorp — product range and availability may vary by branch location",
    ],
    procurementSources: [
      { name: "Metalcorp — trade supply and branch network", url: "https://www.metalcorp.com.au" },
      { name: "Midalia Steel (aluminium sheet)", url: "https://www.midaliasteel.com.au" },
    ],
  },
  {
    fullLabel: "Specialist Fabricator",
    brandUrl: "https://www.masterbuilders.com.au",
    accentColor: "#6d28d9",
    name: "Custom Aluminium (fabricator-supplied)",
    descriptionLine: "Custom-formed aluminium step flashing from sheet by specialist metal fabricator where standard profiles do not suit the application — specify thickness and profile",
    productType: "Custom aluminium step and counter-flashing — fabricator-supplied to specification",
    filterTags: ["Aluminium", "Custom", "Non-standard"],
    techChips: [
      { label: "Custom profile to specification", cls: "bg-violet-100 text-violet-800" },
      { label: "Fabricator-supplied", cls: "bg-slate-100 text-slate-700" },
      { label: "Specify thickness and alloy", cls: "bg-green-50 text-green-700" },
      { label: "Powder coat or mill-finish", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Custom aluminium step and counter-flashing is specified when the standard profiles available from Capral or Metalcorp do not suit the application — for example, where an unusual tile profile, non-standard wall geometry, or an architect-specified custom profile is required. In this case, the contractor engages a specialist sheet metal fabricator who manufactures the step and counter-flashing to a drawn profile and specified aluminium alloy and gauge. The fabricator typically sources aluminium sheet from Capral or Metalcorp and forms, cuts, and folds the flashings to the required profile. Custom fabricator-supplied aluminium flashings can be finished in mill-finish (paintable on site), anodised, or powder-coated to a specified colour in the fabrication process. Powder coating in the fabrication process — before installation — provides the best colour durability and adhesion for colour-matched aluminium flashings. Specify: aluminium alloy (5005 or 5052), gauge (0.7mm or 0.9mm minimum for step flashings), profile (dimensioned drawing), and finish (mill-finish, anodised, or powder coat colour). Confirm the fabricator's lead time before programming the works. Use stainless steel fixings — same dissimilar metal precautions apply.",
    technicalProperties: [
      "Custom-formed aluminium step and counter-flashing — manufactured by specialist sheet metal fabricator to a specified profile and drawing",
      "Specify aluminium alloy: 5005 or 5052 (5000-series) — 0.7mm or 0.9mm gauge minimum for step flashing applications",
      "Finish options: mill-finish (paintable on site), anodised, or powder-coated in a specified colour — powder coat applied in fabrication provides superior colour durability",
      "Fabricator sources aluminium from Capral, Metalcorp, or other approved aluminium distributors — same material, custom profile",
      "Suitable for non-standard profiles: unusual tile geometry, heritage building requirements, architect-specified custom profiles, or complex wall abutments",
      "Stainless steel fixings required — same dissimilar metal precautions as standard aluminium flashing — do not use copper fixings",
    ],
    limitations: [
      "Higher cost and longer lead time than standard site-formed Colorbond or aluminium — confirm fabricator lead time before programming",
      "Specification must include a dimensioned profile drawing — fabricator cannot manufacture to a description alone — a drawn profile is required",
      "Powder-coating requires the fabricator to have in-house or subcontracted powder-coating capability — confirm before ordering",
      "Same dissimilar metal precautions apply as standard aluminium — stainless steel fixings, isolate from copper",
      "Custom profiles cannot be reordered quickly — ensure initial order quantity includes adequate allowance for site wastage and damage",
      "Not suitable for heritage applications requiring hand-dressing into complex curved profiles — lead is the appropriate material for those applications",
    ],
    procurementSources: [
      { name: "Local specialist sheet metal fabricators — engage via trade or builder", url: "https://www.masterbuilders.com.au" },
      { name: "Capral Aluminium — raw material for fabricators", url: "https://www.capral.com.au" },
      { name: "Metalcorp — raw material for fabricators", url: "https://www.metalcorp.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Aluminium", label: "Aluminium" },
  { id: "Mill-finish", label: "Mill-finish" },
  { id: "Pre-painted", label: "Pre-painted" },
  { id: "Step-flashing", label: "Step flashing" },
  { id: "Counter-flashing", label: "Counter-flashing" },
  { id: "Paintable", label: "Paintable on site" },
  { id: "Custom", label: "Custom fabrication" },
  { id: "Non-standard", label: "Non-standard profile" },
];

const SYSTEM_COMPARISON: {
  product: string;
  supplier: string;
  finish: string;
  thickness: string;
  paintable: string;
  corrosionResistance: string;
}[] = [
  {
    product: "Capral Aluminium Step Flashing",
    supplier: "Capral Aluminium",
    finish: "Mill-finish (paintable)",
    thickness: "0.7mm / 0.9mm",
    paintable: "Yes — etch primer required",
    corrosionResistance: "Good — natural oxide layer — isolate from copper",
  },
  {
    product: "Metalcorp Aluminium Flashing",
    supplier: "Metalcorp",
    finish: "Mill-finish and pre-painted options",
    thickness: "0.7mm / 0.9mm — confirm with branch",
    paintable: "Yes (mill-finish) — limited colour range (pre-painted)",
    corrosionResistance: "Good — same as Capral — isolate from copper",
  },
  {
    product: "Custom Aluminium (fabricator-supplied)",
    supplier: "Specialist sheet metal fabricator",
    finish: "Mill-finish, anodised, or powder-coated",
    thickness: "To specification — 0.7mm or 0.9mm minimum",
    paintable: "Yes — or specify powder coat in fabrication",
    corrosionResistance: "Good — same as standard aluminium — isolate from copper",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Step flashings at the junction between a masonry wall and a pitched tiled roof — where aluminium is preferred over Colorbond for its paintability to match wall render colour",
    "Counter-flashings fixed into raked mortar joints at masonry abutments — same application as Colorbond but where a mill-finish or powder-coated aluminium finish is required",
    "Apron flashings at masonry chimneys and parapet wall junctions on tiled roofs — where colour matching to wall render is important",
    "Remedial replacement of corroded or failed step flashings where the original specification used aluminium and matching material is required",
    "Custom non-standard profiles where Colorbond or standard aluminium profiles do not suit the tile or wall geometry",
  ],
  selectionCriteria: [
    "Use aluminium instead of Colorbond where a site-painted or powder-coated finish matching the wall render colour is required — Colorbond colours may not match the render",
    "Mill-finish aluminium requires painting on site after forming — ensure programme allows adequate drying time before tile fixing",
    "Specify 0.7mm minimum gauge for step flashings — 0.9mm for exposed or high-load applications",
    "Use 5000-series aluminium alloy (5005 or 5052) — avoid 1000-series (too soft) or 6000-series extrusion alloys (not suited to sheet forming for flashing)",
    "Painting — etch primer then compatible acrylic topcoat — confirm paint system with the paint supplier before application",
    "Stainless steel fixings — Type 316 stainless preferred in coastal environments — never copper fixings with aluminium",
    "Dissimilar metal precautions — isolate aluminium from copper gutters, copper-based flashings, and copper-based fixings using a non-conductive tape or barrier where necessary",
  ],
  limitations: [
    "Not suitable for complex heritage profiles where lead hand-forming and dressing is required — aluminium cannot be formed by hand into complex curved profiles",
    "Not suitable where direct contact with copper gutters or copper flashings is unavoidable without an isolation barrier",
    "Does not self-seal at overlaps like lead — laps must be correctly dimensioned and directed to shed water",
    "Mill-finish aluminium requires painting before installation — do not leave unpainted mill-finish aluminium on a completed roof",
    "Pre-painted aluminium colour range is limited — Colorbond offers a broader standard colour range for pre-painted step flashings",
  ],
  standardsNotes: [
    "AS 1562.1 — Design and Installation of Sheet Roof and Wall Cladding — Metal — governs step and counter-flashing design and minimum lap requirements",
    "Tile manufacturer installation guides — confirm step flashing geometry and soaker requirements for the specific tile profile",
    "AS/NZS 4680 — Hot-dip galvanised coatings — not directly applicable to aluminium, but confirm dissimilar metal compatibility with all adjacent materials",
    "Painting: Dulux, Haymes, and Wattyl all publish aluminium-compatible paint systems — confirm etch primer requirement before specifying",
  ],
  suitableDefects: [
    "Roof leaks at masonry wall abutments — step flashing failure — replacement with aluminium where colour-matched painted finish is required",
    "Roof leaks at chimney and parapet wall junctions — aluminium step and counter-flashing replacement where a non-standard colour match is required",
    "Heritage building remediation where aluminium (rather than lead) is accepted by the heritage authority and a colour-matched finish is required",
  ],
  typicalSubstrates: [
    "Masonry walls — brick, concrete block, rendered masonry — counter-flashing fixed into raked mortar joint",
    "Tiled roof — terracotta, concrete, or slate tiles — step flashing weaves between tiles or sits under tile course",
    "Timber fascia and barge board at gable ends — apron flashings",
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

export function StepFlashingAluminiumIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are aluminium step and counter-flashings?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Aluminium step and counter-flashings perform the same function as Colorbond step flashings — weatherproofing the junction between a pitched tiled roof and a masonry wall — but are formed from aluminium sheet rather than pre-painted steel. The principal advantage of aluminium over Colorbond for this application is the ability to paint the formed flashing on site to closely match the wall render colour, which may not be achievable with a standard Colorbond colour. Aluminium is also highly corrosion resistant in most environments without a factory-applied paint system.
        </p>
        {expanded && (
          <>
            <p>
              Mill-finish aluminium — the uncoated natural oxide surface from the rolling process — must be primed and painted on site if a colour finish is required. An etch primer is essential before any topcoat is applied to aluminium — paint will not adhere durably to bare aluminium without the correct primer. Pre-painted aluminium sheet (available from Metalcorp and some other suppliers) reduces the on-site painting requirement where the pre-painted colour matches the project requirement, but the pre-painted colour range is limited compared to Colorbond.
            </p>
            <p>
              Dissimilar metal precautions are critical for aluminium step flashings: aluminium must not come into direct contact with copper gutters, copper-based fixings, or copper flashings. The resulting galvanic corrosion will rapidly destroy the aluminium. Use stainless steel fixings (Type 316 in coastal environments), and isolate aluminium from copper elements using a non-conductive barrier tape where direct contact is unavoidable.
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

export function StepFlashingAluminiumProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — aluminium step and counter-flashing — scroll to view all</p>
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
              Side-by-side comparison of aluminium step and counter-flashing options. Confirm all product selections against the current supplier data before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Paintable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Corrosion resistance</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600">{row.paintable}</td>
                  <td className="px-4 py-3 text-slate-600">{row.corrosionResistance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
