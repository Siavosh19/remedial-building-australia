"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Pre-formed"
  | "EPDM"
  | "Round-pipe"
  | "Aluminium-base"
  | "Multi-pitch"
  | "Adjustable"
  | "Australian-made"
  | "Lead-lined"
  | "Heritage"
  | "Specialist"
  | "Deks"
  | "Standard-size";

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
    fullLabel: "Deks Industries (Australian)",
    brandUrl: "https://www.deks.com.au",
    accentColor: "#0369a1",
    name: "Deks D-1 Multi Flashing",
    descriptionLine: "Standard pre-formed EPDM collar for round pipe penetrations through tiled roofs — sizes 13mm to 150mm pipe OD — square base plate, round EPDM collar — PVC plumbing and conduit penetrations",
    productType: "Pre-formed EPDM penetration flashing collar",
    filterTags: ["Pre-formed", "EPDM", "Round-pipe", "Deks", "Standard-size", "Australian-made"],
    techChips: [
      { label: "Pre-formed", cls: "bg-sky-100 text-sky-800" },
      { label: "EPDM collar", cls: "bg-slate-100 text-slate-700" },
      { label: "Australian-made", cls: "bg-green-50 text-green-700" },
      { label: "13mm–150mm OD", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Deks D-1 Multi Flashing is the Australian industry standard pre-formed penetration flashing collar for round pipe and conduit penetrations through pitched tiled roofs. Manufactured by Deks Industries in Australia, it consists of a square aluminium or polymer base plate that sits on the roof deck below the tile level, with a flexible EPDM collar that seals around the pipe OD. The base plate is integrated into the roof sarking and tile course — the tile is cut to fit around the flashing base, and the EPDM collar is stretched over the pipe to create a watertight seal. D-1 is the standard Deks product for PVC plumbing vent pipes and electrical conduit penetrations through terracotta and concrete tiled roofs on Class 2 strata apartment buildings. Available in a range of sizes to suit pipe ODs from 13mm to 150mm. Confirm the pipe OD, roof pitch range, and tile profile with Deks technical before ordering to ensure the correct size and base plate configuration is specified.",
    technicalProperties: [
      "Pre-formed EPDM collar — factory-manufactured — no site forming required",
      "Square base plate — aluminium or polymer depending on variant — integrates below tile course",
      "Available for pipe OD 13mm to 150mm — confirm size range with current Deks product range",
      "Australian-manufactured — Deks Industries",
      "Suitable for standard pitched tiled roof applications — terracotta and concrete tile profiles",
      "EPDM collar is replaceable without full flashing replacement where pipe remains",
    ],
    limitations: [
      "Round collar only — not suitable for rectangular or square duct penetrations — use fabricated flashing for non-round penetrations",
      "Pipe OD must be confirmed before ordering — ordering a collar one size too small or too large will not seal correctly",
      "Not suitable for penetrations through flat or near-flat roof areas — use a plinth system for low-slope applications",
      "Minimum and maximum roof pitch range must be confirmed — a base plate that is too flat will not seat correctly on steep pitches",
      "Confirm current product range, sizing, and technical data with Deks Australia before specifying",
    ],
    procurementSources: [
      { name: "Deks Industries — deks.com.au", url: "https://www.deks.com.au" },
      { name: "Roofing trade suppliers and builders merchants", url: "https://www.deks.com.au" },
      { name: "Plumbing trade suppliers", url: "https://www.deks.com.au" },
    ],
  },
  {
    fullLabel: "Deks Industries",
    brandUrl: "https://www.deks.com.au",
    accentColor: "#0369a1",
    name: "Deks 45 Aluminium Flashing",
    descriptionLine: "Aluminium base plate with EPDM collar — for concrete tile profiles, steeper pitches, or installations requiring a metal base plate — higher thermal movement tolerance",
    productType: "Pre-formed aluminium-base EPDM penetration flashing collar",
    filterTags: ["Pre-formed", "Aluminium-base", "EPDM", "Round-pipe", "Deks"],
    techChips: [
      { label: "Pre-formed", cls: "bg-sky-100 text-sky-800" },
      { label: "Aluminium base", cls: "bg-slate-100 text-slate-700" },
      { label: "EPDM collar", cls: "bg-slate-100 text-slate-700" },
      { label: "Metal base plate", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Deks 45 Aluminium Flashing is Deks Industries' penetration collar product incorporating an aluminium base plate rather than the polymer base plate used in the standard D-1 Multi Flashing. The aluminium base plate provides greater resistance to thermal movement on steep pitches and on concrete tile roofs where differential expansion between the tile and the flashing base is a concern. The EPDM collar is the same flexible sealing element as the D-1 range. The Deks 45 is the preferred product on concrete tile roofs, steeper pitched roofs, and on installations where the roof plumber requires a metal base plate for fixing or compatibility reasons. Confirm size, pitch compatibility, and current Deks 45 product range with Deks technical before ordering.",
    technicalProperties: [
      "Aluminium base plate — greater thermal stability than polymer base on concrete tile roofs and steep pitches",
      "EPDM collar — flexible, weather-resistant sealing element around pipe OD",
      "Pre-formed — no site forming required",
      "Suitable for concrete tile profiles and steeper pitched roofs",
      "Installed by licensed roof plumber — base plate integrated below tile course",
    ],
    limitations: [
      "Confirm size range and pipe OD compatibility with Deks technical before ordering",
      "Aluminium base plate is susceptible to dissimilar metal contact corrosion — avoid direct contact with copper or other incompatible metals in the roof assembly",
      "Round collar only — not suitable for non-round penetrations",
      "Confirm current Deks 45 product name, range, and TDS with Deks Australia — product range subject to revision",
    ],
    procurementSources: [
      { name: "Deks Industries — deks.com.au", url: "https://www.deks.com.au" },
      { name: "Roofing trade suppliers", url: "https://www.deks.com.au" },
    ],
  },
  {
    fullLabel: "Deks Industries",
    brandUrl: "https://www.deks.com.au",
    accentColor: "#0369a1",
    name: "Deks Poly Multi-Pitch",
    descriptionLine: "Polypropylene multi-pitch flashing collar — adjustable pitch angle — suitable for pitches 0–45° — round EPDM collar",
    productType: "Pre-formed multi-pitch polypropylene EPDM penetration flashing collar",
    filterTags: ["Pre-formed", "EPDM", "Multi-pitch", "Deks", "Adjustable"],
    techChips: [
      { label: "Pre-formed", cls: "bg-sky-100 text-sky-800" },
      { label: "Multi-pitch adjustable", cls: "bg-green-100 text-green-800" },
      { label: "EPDM collar", cls: "bg-slate-100 text-slate-700" },
      { label: "0–45° pitch range", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Deks Poly Multi-Pitch is Deks Industries' polypropylene multi-pitch penetration flashing collar designed for situations where the roof pitch varies or is not standard, or where a single flashing product must be stocked for use across a range of roof pitches. The base plate is designed to be adjustable or configured at installation to match the roof pitch angle — confirm the adjustment mechanism and range from the current Deks Poly Multi-Pitch installation instructions. The EPDM collar provides the watertight seal around the pipe OD. The 0–45° pitch range makes this product suitable for use on very low-pitch tile roofs through to steep tiles pitches. Confirm pipe OD size range and current product name with Deks technical before specifying.",
    technicalProperties: [
      "Polypropylene base plate — adjustable pitch angle — suits pitches 0–45° (confirm from current TDS)",
      "EPDM collar — flexible round pipe seal",
      "Pre-formed — single product for variable pitch applications",
      "Reduces stocking requirement where roof pitches vary across a project",
    ],
    limitations: [
      "Confirm the actual pitch adjustment mechanism and valid pitch range from the current Deks installation instructions before specifying",
      "Round EPDM collar only — not for non-round penetrations",
      "Confirm pipe OD size range with Deks technical",
      "Confirm current product name and availability with Deks Australia",
    ],
    procurementSources: [
      { name: "Deks Industries — deks.com.au", url: "https://www.deks.com.au" },
      { name: "Roofing and plumbing trade suppliers", url: "https://www.deks.com.au" },
    ],
  },
  {
    fullLabel: "Polyplas",
    brandUrl: "https://www.polyplas.com.au",
    accentColor: "#16a34a",
    name: "Polyplas Poly-I-Flash",
    descriptionLine: "Pre-formed polypropylene and EPDM penetration flashing collar — Australian-made — for round pipe and conduit penetrations through tiled roofs — alternative to Deks",
    productType: "Pre-formed EPDM penetration flashing collar — Australian-made",
    filterTags: ["Pre-formed", "EPDM", "Round-pipe", "Australian-made"],
    techChips: [
      { label: "Pre-formed", cls: "bg-green-100 text-green-800" },
      { label: "EPDM collar", cls: "bg-slate-100 text-slate-700" },
      { label: "Australian-made", cls: "bg-green-50 text-green-700" },
      { label: "Polyplas", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Polyplas Poly-I-Flash is an Australian-manufactured pre-formed polypropylene and EPDM penetration flashing collar, positioned as an alternative to the Deks D-1 range for round pipe and conduit penetrations through pitched tiled roofs. The product incorporates a polypropylene base plate and an EPDM collar element. Used for PVC plumbing vent pipes, electrical conduit, and similar round penetrations through terracotta and concrete tiled roof systems. Confirm pipe OD size range, roof pitch suitability, and installation requirements with Polyplas technical before ordering. Where Deks products are unavailable or where local supply of the Polyplas range is more convenient, Poly-I-Flash provides a comparable pre-formed collar solution.",
    technicalProperties: [
      "Pre-formed polypropylene base plate with EPDM round collar",
      "Australian-manufactured — Polyplas",
      "For round pipe and conduit penetrations through tiled roofs",
      "Alternative supply option to Deks D-1 range",
      "Confirm pipe OD range, pitch range, and current product specifications with Polyplas technical",
    ],
    limitations: [
      "Confirm that the Polyplas Poly-I-Flash is interchangeable in application method and size with Deks products — do not assume equivalence without confirming from both TDS",
      "Round collar only — not suitable for non-round penetrations",
      "Confirm current product availability and distribution nationally with Polyplas before specifying",
    ],
    procurementSources: [
      { name: "Polyplas — polyplas.com.au", url: "https://www.polyplas.com.au" },
      { name: "Roofing trade suppliers", url: "https://www.polyplas.com.au" },
    ],
  },
  {
    fullLabel: "Kempart",
    brandUrl: "https://www.kempart.com.au",
    accentColor: "#78350f",
    name: "Kempart Lead-Lined Collar",
    descriptionLine: "Lead-lined collar for pipe penetrations requiring lead dressing or heritage appearance — lead collar dress-formed over the tile — heritage and specialist applications",
    productType: "Lead-lined penetration flashing collar — heritage / specialist",
    filterTags: ["Lead-lined", "Heritage", "Specialist", "Round-pipe"],
    techChips: [
      { label: "Lead-lined", cls: "bg-amber-100 text-amber-800" },
      { label: "Heritage", cls: "bg-slate-100 text-slate-700" },
      { label: "Specialist", cls: "bg-red-50 text-red-700" },
      { label: "Dress-formed on site", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Kempart lead-lined collar products are used for pipe penetrations through tiled roofs where a lead-dressed appearance is required, where heritage building conservation requirements specify lead flashing, or where the lead collar provides a superior dressing to the tile surface profile that a rigid pre-formed EPDM collar cannot achieve. Lead collars are dress-formed by the roof plumber on site, working the lead around the tile profile and pipe to create a weathertight seal. Lead has the advantage of being malleable and self-forming to complex tile profiles where a factory pre-formed polypropylene or EPDM base cannot sit flush. Used on heritage-listed buildings, high-specification restoration projects, and where a heritage conservation plan requires lead flashings. Confirm lead specification (code weight), minimum thickness, and detailing requirements with the heritage consultant or project specification before ordering.",
    technicalProperties: [
      "Lead-lined collar — malleable, dress-formed on site by roof plumber",
      "Suitable for complex tile profiles where pre-formed EPDM collars cannot seat correctly",
      "Heritage and conservation application — matches traditional lead flashing appearance",
      "Self-forming to pipe and tile profile — watertight seal achieved by dress-forming",
      "Confirm Kempart product range and lead code weight from current Kempart documentation",
    ],
    limitations: [
      "Specialist product — requires skilled roof plumber experienced in lead dress-forming",
      "Lead is a hazardous material — handling, cutting, and waste disposal must comply with safe work method statements and applicable state WHS regulations",
      "Not a standard product for routine tiled roof penetration flashings — use Deks or Polyplas EPDM collar for standard non-heritage applications",
      "Lead must not be installed in contact with copper in wet conditions without appropriate isolation — confirm dissimilar metal requirements with heritage consultant",
      "Confirm current Kempart lead collar product range and availability before specifying",
    ],
    procurementSources: [
      { name: "Kempart — kempart.com.au", url: "https://www.kempart.com.au" },
      { name: "Heritage roofing and plumbing trade suppliers", url: "https://www.kempart.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Pre-formed", label: "Pre-formed" },
  { id: "EPDM", label: "EPDM" },
  { id: "Multi-pitch", label: "Multi-pitch" },
  { id: "Lead-lined", label: "Lead-lined" },
];

const SYSTEM_COMPARISON = [
  {
    product: "D-1 Multi Flashing",
    brand: "Deks",
    baseMaterial: "Polymer",
    collarType: "EPDM round",
    pipeRange: "13mm–150mm OD",
    pitchRange: "Standard — confirm TDS",
    heritage: "No",
    australianMade: "Yes",
  },
  {
    product: "Deks 45 Aluminium",
    brand: "Deks",
    baseMaterial: "Aluminium",
    collarType: "EPDM round",
    pipeRange: "Confirm with Deks",
    pitchRange: "Steeper pitches — confirm TDS",
    heritage: "No",
    australianMade: "Yes",
  },
  {
    product: "Poly Multi-Pitch",
    brand: "Deks",
    baseMaterial: "Polypropylene",
    collarType: "EPDM round",
    pipeRange: "Confirm with Deks",
    pitchRange: "0–45° adjustable",
    heritage: "No",
    australianMade: "Yes",
  },
  {
    product: "Poly-I-Flash",
    brand: "Polyplas",
    baseMaterial: "Polypropylene",
    collarType: "EPDM round",
    pipeRange: "Confirm with Polyplas",
    pitchRange: "Standard — confirm TDS",
    heritage: "No",
    australianMade: "Yes",
  },
  {
    product: "Lead-Lined Collar",
    brand: "Kempart",
    baseMaterial: "Lead",
    collarType: "Lead dress-formed",
    pipeRange: "Any — dress-formed on site",
    pitchRange: "Any — dress-formed on site",
    heritage: "Yes",
    australianMade: "Confirm",
  },
];

const TECH_INFO = [
  {
    title: "Pre-formed vs Site-Formed Collars",
    style: "bullet" as const,
    items: [
      "Pre-formed EPDM collars (Deks, Polyplas) are factory manufactured — the roof plumber installs the base plate under the tile course and stretches the EPDM collar over the pipe — no site forming of the collar is required",
      "Lead collars are site-formed — the roof plumber dresses the lead sheet around the tile profile and pipe by hand — this requires skill and experience but provides a superior fit on complex tile profiles",
      "For standard residential and strata tiled roof penetrations, pre-formed EPDM collars are the standard specification — they are faster to install, require less skill, and provide a reliable weather seal",
      "Lead collars are specified for heritage conservation work, high-specification restoration, and where traditional appearance is required",
    ],
  },
  {
    title: "Pitch Selection",
    style: "check" as const,
    items: [
      "Penetration flashing collar base plates are designed for a defined pitch range — installing a collar with a base plate pitched at the wrong angle will prevent the base plate from sitting flush with the tile plane",
      "The Deks Poly Multi-Pitch is designed to be adjustable across a wider pitch range — use it on variable-pitch roofs or where the pitch is non-standard",
      "Confirm the roof pitch in degrees before specifying the collar product — measure from the roof surface, not from the ceiling",
      "For pitches outside the range of standard pre-formed products, a custom-fabricated lead flashing may be required",
    ],
  },
  {
    title: "Size Selection for Pipe OD",
    style: "check" as const,
    items: [
      "The EPDM collar must be the correct size for the pipe OD — if the collar is too small, the EPDM will be over-stretched and will fail prematurely; if too large, the collar will not grip the pipe and will not seal",
      "Measure the pipe OD on site before ordering — do not assume a nominal pipe size is the same as the OD",
      "Deks D-1 range covers 13mm to 150mm OD — confirm from the current Deks size chart which specific collar product number is correct for the pipe OD being flashed",
      "Where multiple pipes of different ODs penetrate through a single area, each pipe requires its own correctly sized collar",
    ],
  },
  {
    title: "Heritage Applications",
    style: "warn" as const,
    items: [
      "Heritage-listed buildings or buildings subject to a heritage conservation plan may require lead flashings rather than EPDM collars — confirm with the heritage consultant before specifying",
      "Lead flashings require a skilled tradesperson experienced in lead dress-forming — do not substitute a standard tiling contractor for heritage lead flashing work",
      "WHS obligations for lead handling apply — confirm applicable state WHS regulations for lead work before commencing",
      "Lead must be specified to the correct code weight — Code 3 or Code 4 are typical for pipe collars — confirm from the heritage specification or conservation plan",
    ],
  },
];

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

function TechCard({
  title,
  items,
  style,
}: {
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {style === "check" && <CheckCircle size={15} />}
          {style === "warn" && <AlertTriangle size={15} />}
          {style === "bullet" && <BookOpen size={15} />}
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

export function PenetrationFlashingCollarIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are penetration flashing collar systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Penetration flashing collar systems are pre-formed or site-formed weatherproofing elements installed where a round pipe or conduit penetrates through a pitched tiled roof. They provide the weather seal between the pipe OD and the surrounding tile course, preventing water ingress at the penetration point. The most common system in Australian residential and strata construction is the Deks D-1 range — a pre-formed EPDM collar with a polypropylene or aluminium base plate that seats between the tiles below and seals over the pipe above.
        </p>
        {expanded && (
          <>
            <p>
              Penetration collar flashings are used for plumbing vent pipes (PVC), electrical conduit, gas service pipes, and similar round penetrations through the roof plane. The correct product is selected based on the pipe OD, the roof pitch, and the tile profile. For heritage and high-specification work, lead collars may be required in place of EPDM pre-formed products.
            </p>
            <p>
              Penetration flashing collars are distinct from penetration plinth systems — collars are used for round pipes penetrating through the main tile field on a standard pitched roof, while plinths are raised box enclosures used where a pipe penetrates through a flat or low-slope area of the roof where a standard collar cannot be used.
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

export function PenetrationFlashingCollarProductSection() {
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
              Pre-formed vs site-formed, pitch selection, size selection, heritage applications
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
            <div className="grid gap-6 md:grid-cols-2">
              {TECH_INFO.map((card) => (
                <TechCard key={card.title} title={card.title} items={card.items} style={card.style} />
              ))}
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
            <p className="mt-1 text-sm text-slate-500">5 products — 3 brands — penetration flashing collar systems — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of penetration flashing collar systems. Confirm all selections against current manufacturer TDS and confirm pipe OD and pitch before ordering.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Base material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Collar type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pipe range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pitch range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Australian-made</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.baseMaterial}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.collarType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pipeRange}</td>
                  <td className="px-4 py-3 text-slate-600">{row.pitchRange}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.heritage === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> Yes
                      </span>
                    ) : (
                      <span className="text-slate-400">{row.heritage}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.australianMade === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> Yes
                      </span>
                    ) : (
                      <span className="text-slate-400">{row.australianMade}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
