"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Colorbond"
  | "Pre-painted"
  | "Standard-profile"
  | "Custom-profile"
  | "BlueScope"
  | "Stramit"
  | "AS-1562"
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
    fullLabel: "Lysaght / BlueScope Steel",
    brandUrl: "https://www.lysaght.com",
    tdsUrl: "https://www.lysaght.com/products/valley",
    accentColor: "#0369a1",
    name: "BlueScope Colorbond Ultra Valley Iron",
    descriptionLine: "Standard Colorbond Ultra roll valley iron — pre-painted Colorbond steel in the standard Colorbond colour range — factory-formed valley profile — most widely installed valley flashing in Australia",
    productType: "Pre-painted Colorbond Ultra steel valley iron — standard profile — AS 1562.1",
    filterTags: ["Colorbond", "Pre-painted", "Standard-profile", "BlueScope", "AS-1562"],
    techChips: [
      { label: "Colorbond Ultra", cls: "bg-sky-100 text-sky-800" },
      { label: "Pre-painted", cls: "bg-slate-100 text-slate-700" },
      { label: "Standard profile", cls: "bg-green-50 text-green-700" },
      { label: "BlueScope / Lysaght", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 1562.1", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "BlueScope Colorbond Ultra Valley Iron is the Lysaght/BlueScope standard Colorbond Ultra roll valley iron — the most widely specified and installed valley flashing product in Australia for residential and Class 2 strata building pitched tiled roofs. It is a pre-painted Colorbond steel valley iron factory-formed to the standard valley profile, available in the full standard BlueScope Colorbond colour range. The Colorbond Ultra substrate provides enhanced corrosion resistance compared to standard Colorbond — relevant for coastal and high-humidity environments. As the most widely available and stock-held valley iron product in Australia, lead times are generally short and the product is readily available through roofing trade supply nationally. For colour match on existing roofs, confirm the current Colorbond colour name against the BlueScope colour chart — Colorbond colours are discontinued periodically and an older original colour may no longer be available in new product. Where an exact colour match cannot be achieved with current Colorbond valley iron, the new valley iron may be visually close but not exact — manage client expectations before installation. Valley width, minimum lap at the gutter outlet, and fixing to battens must comply with AS 1562.1 and the tile manufacturer's fixing guide for the specific tile type.",
    technicalProperties: [
      "Pre-painted Colorbond Ultra steel — factory colour coating in the full standard BlueScope Colorbond colour range",
      "Factory-formed standard valley profile — most widely installed valley flashing product in Australian residential roofing",
      "Colorbond Ultra substrate — enhanced corrosion resistance — suitable for coastal and high-humidity environments",
      "AS 1562.1 compliant — confirm valley width, minimum lap, and fixing requirements from current standard and tile manufacturer's fixing guide",
      "Short lead times — widely stocked nationally through Lysaght and roofing trade supply",
      "Available through Lysaght and all major roofing trade suppliers — confirm current colour range from BlueScope/Lysaght before specifying",
    ],
    limitations: [
      "Colour match: Colorbond colours are periodically discontinued — an existing colour may no longer be available — confirm colour match from the current BlueScope Colorbond colour chart before specifying",
      "Standard profile only: the standard factory-formed profile may not suit all tile types or non-standard valley geometries — specify custom profile from Lysaght where the standard profile does not suit",
      "Confirm valley width is compatible with the tile profile and tile manufacturer's minimum valley width requirement before installing",
      "Confirm minimum lap at the gutter outlet from AS 1562.1 and the tile manufacturer's fixing guide — inadequate lap at the eave is a common installation defect",
      "Do not use on roofs where Colorbond steel will contact copper or lead flashings directly without isolation — galvanic corrosion will occur at the contact",
      "Confirm current product name, colour range, and standard widths from Lysaght/BlueScope before specifying",
    ],
    procurementSources: [
      { name: "Lysaght — roofing trade supply", url: "https://www.lysaght.com" },
      { name: "Stratco — roofing trade supply", url: "https://www.stratco.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Metal Roofing Online", url: "https://www.metalroofonline.com.au" },
    ],
  },
  {
    fullLabel: "Lysaght / BlueScope Steel",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#0369a1",
    name: "Lysaght Custom-Formed Colorbond Valley",
    descriptionLine: "Custom-formed Colorbond steel valley from Lysaght — non-standard profiles or widths — for tile profiles where standard valley iron does not suit",
    productType: "Custom-profile Colorbond steel valley flashing — BlueScope — non-standard",
    filterTags: ["Colorbond", "Custom-profile", "BlueScope", "Non-standard"],
    techChips: [
      { label: "Colorbond", cls: "bg-sky-100 text-sky-800" },
      { label: "Custom profile", cls: "bg-slate-100 text-slate-700" },
      { label: "BlueScope / Lysaght", cls: "bg-green-50 text-green-700" },
      { label: "Non-standard", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght Custom-Formed Colorbond Valley is a custom-formed Colorbond steel valley iron fabricated by Lysaght to a non-standard profile or width where the standard Lysaght valley iron profile does not suit the tile profile, valley geometry, or heritage/conservation specification on a specific project. Custom Colorbond valley iron from Lysaght retains the factory Colorbond colour coating from BlueScope Colorbond steel and can be fabricated in the standard Colorbond colour range. Custom fabrication is ordered through Lysaght's fabrication service — a profile drawing or site template is required for accurate fabrication. Lead times for custom-profile valley iron are longer than for standard stocked valley iron — confirm lead time with Lysaght before ordering for time-critical programmes. Custom valley iron is appropriate where a non-standard tile profile, an unusual valley width, or a heritage tile requires a valley profile that cannot be achieved with standard roll-formed valley iron. Confirm the profile requirement with the roofing contractor and the tile manufacturer before ordering from Lysaght.",
    technicalProperties: [
      "Custom-profile Colorbond steel valley iron fabricated by Lysaght — non-standard profile or width to specification",
      "Colorbond steel substrate — factory pre-painted in the standard BlueScope Colorbond colour range — confirm available colours with Lysaght",
      "Suitable for non-standard tile profiles, unusual valley widths, or heritage and conservation applications where standard profile does not suit",
      "BlueScope Colorbond factory colour coating — same corrosion resistance as standard Colorbond valley iron",
      "Confirm AS 1562.1 compliance, minimum lap, and fixing requirements with Lysaght and the tile manufacturer before installation",
    ],
    limitations: [
      "Longer lead time than standard valley iron — confirm fabrication and delivery time with Lysaght before ordering for time-critical programmes",
      "Higher cost than standard valley iron — custom fabrication involves additional cost — obtain quotation from Lysaght before specifying",
      "Profile drawing or site template required for accurate custom fabrication — do not order without a confirmed profile specification",
      "Colour match: confirm required Colorbond colour is available from Lysaght before ordering — not all colours may be available for custom fabrication at all times",
      "Confirm the custom profile is compatible with the tile manufacturer's fixing requirements before ordering",
      "Confirm current Lysaght fabrication capability, lead time, and colour availability before specifying",
    ],
    procurementSources: [
      { name: "Lysaght — custom fabrication order", url: "https://www.lysaght.com" },
      { name: "BlueScope Steel — product information", url: "https://www.bluescopesteel.com.au" },
    ],
  },
  {
    fullLabel: "Stramit Building Products",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#16a34a",
    name: "Stramit Colorbond Valley",
    descriptionLine: "Stramit pre-formed Colorbond valley iron — alternative to Lysaght — standard Colorbond colour range — standard profile",
    productType: "Pre-painted Colorbond steel valley iron — standard profile — Stramit",
    filterTags: ["Colorbond", "Pre-painted", "Standard-profile", "Stramit"],
    techChips: [
      { label: "Colorbond", cls: "bg-green-100 text-green-800" },
      { label: "Pre-painted", cls: "bg-slate-100 text-slate-700" },
      { label: "Standard profile", cls: "bg-green-50 text-green-700" },
      { label: "Stramit", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stramit Colorbond Valley is Stramit Building Products' pre-formed Colorbond valley iron, providing an alternative source of pre-painted Colorbond valley iron to the Lysaght/BlueScope product. Stramit is an established Australian roofing and building products manufacturer with national trade supply. The Stramit Colorbond Valley is formed from BlueScope Colorbond steel in the standard Colorbond colour range and is available in standard valley widths. It provides a competitive alternative to Lysaght valley iron where Stramit is the preferred supplier or where Stramit stock and lead time suits the programme. Specification and installation requirements are the same as for Lysaght Colorbond valley iron — valley width, minimum lap at the gutter outlet, and fixing to battens must comply with AS 1562.1 and the tile manufacturer's fixing guide. Confirm available colours and standard widths from Stramit Building Products before specifying — confirm that the required colour is current and in stock before ordering.",
    technicalProperties: [
      "Pre-painted Colorbond steel valley iron — Stramit Building Products — alternative source to Lysaght/BlueScope",
      "BlueScope Colorbond steel substrate — factory colour coating in the standard Colorbond colour range",
      "Standard valley profile and widths — confirm available widths and colours from Stramit before specifying",
      "AS 1562.1 compliant — confirm valley width, minimum lap, and fixing requirements from current standard and tile manufacturer's fixing guide",
      "National trade supply through Stramit Building Products branches",
    ],
    limitations: [
      "Colour match: confirm the required Colorbond colour is currently available from Stramit before specifying — confirm it matches the existing roof colour before installing",
      "Confirm valley width is compatible with the tile profile and tile manufacturer's minimum valley width requirement before installing",
      "Confirm minimum lap at the gutter outlet from AS 1562.1 — inadequate lap at the eave is a common installation defect",
      "Do not use where Colorbond steel will contact copper or lead flashings directly without isolation — galvanic corrosion will occur",
      "Confirm current product name, colour range, standard widths, and availability from Stramit Building Products before specifying",
    ],
    procurementSources: [
      { name: "Stramit Building Products — trade supply", url: "https://www.stramit.com.au" },
      { name: "Metal Roofing Online", url: "https://www.metalroofonline.com.au" },
      { name: "Local roofing trade suppliers — confirm via Stramit", url: "https://www.stramit.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Standard-profile", label: "Standard-profile" },
  { id: "Custom-profile", label: "Custom-profile" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  colourOptions: string;
  profile: string;
  customAvailable: string;
  corrosionResistance: string;
  warranty: string;
}[] = [
  {
    product: "Colorbond Ultra Valley Iron",
    brand: "Lysaght / BlueScope",
    colourOptions: "Full standard Colorbond colour range",
    profile: "Standard factory profile",
    customAvailable: "Yes — via custom order",
    corrosionResistance: "Colorbond Ultra — enhanced corrosion resistance",
    warranty: "Confirm with BlueScope/Lysaght",
  },
  {
    product: "Custom-Formed Colorbond Valley",
    brand: "Lysaght / BlueScope",
    colourOptions: "Standard Colorbond range (confirm availability)",
    profile: "Custom — to profile drawing",
    customAvailable: "Yes — this product is custom",
    corrosionResistance: "Colorbond — confirm substrate grade with Lysaght",
    warranty: "Confirm with Lysaght",
  },
  {
    product: "Stramit Colorbond Valley",
    brand: "Stramit",
    colourOptions: "Standard Colorbond colour range",
    profile: "Standard factory profile",
    customAvailable: "Confirm with Stramit",
    corrosionResistance: "Colorbond — confirm with Stramit",
    warranty: "Confirm with Stramit",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Valley flashing replacement on residential and Class 2 strata pitched tiled roofs — most common valley flashing replacement in Australia",
    "Replacement of failed, corroded, or undersized valley iron with Colorbond valley iron to comply with current AS 1562.1 requirements",
    "Colour-matched valley flashing replacement where the existing valley iron is Colorbond and an as-close-as-possible colour match is required",
    "New valley flashing installation where no valley iron exists — older roofs may have been constructed without valley iron",
    "Class 2 strata apartment buildings with pitched tiled roof valleys where roof leaks are traced to failed or undersized valley flashing",
  ],
  selectionCriteria: [
    "Colour match: confirm the required Colorbond colour from the current BlueScope Colorbond colour chart — discontinued colours may no longer be available — manage client expectations before ordering",
    "Valley width: confirm the minimum valley width required for the specific tile type and roof pitch from the tile manufacturer's fixing guide — do not install undersized valley iron",
    "Standard vs custom profile: standard roll-formed valley iron suits most tile types — custom profile is required for non-standard tile profiles or valley geometries",
    "Brand preference: Lysaght and Stramit both provide pre-painted Colorbond valley iron — confirm availability and lead time from the preferred supplier before specifying",
    "Minimum lap at gutter outlet: confirm minimum lap from AS 1562.1 — inadequate lap is a common cause of valley leaks at the eave",
    "Colorbond Ultra vs standard Colorbond: Ultra provides enhanced corrosion resistance — specify Ultra in coastal or high-humidity environments",
  ],
  limitations: [
    "Colour match to existing Colorbond is not guaranteed — Colorbond colours are periodically discontinued — an exact match to weathered, faded, or discontinued colours is not always possible",
    "Colorbond steel must not contact copper or lead flashings directly without an isolating layer — galvanic corrosion will occur at the contact",
    "Galvanised steel fixings must not be used with Colorbond valley iron in marine environments — use stainless steel or hot-dip galvanised fixings as specified",
    "Do not reuse old or damaged Colorbond valley iron — if the existing valley iron has failed, full replacement is required — do not patch",
    "Standard profile may not suit all tile types — confirm profile compatibility with the tile manufacturer before installing",
  ],
  standardsNotes: [
    "AS 1562.1 — Design and Installation of Sheet Roof and Wall Cladding (Metal) — covers valley flashing requirements including minimum width, lap, and fixing method",
    "BlueScope Colorbond colour range — confirm current colour availability from BlueScope before specifying for colour match applications",
    "Tile manufacturer's fixing guides — minimum valley width, lap at eave, and fixing requirements vary by tile brand and type — confirm before specifying",
    "NCC Volume One — performance requirements for roof construction in Class 2 buildings",
  ],
  suitableDefects: [
    "Valley leaks on residential and Class 2 strata pitched tiled roofs — most commonly caused by undersized, incorrectly lapped, corroded, or missing valley iron",
    "Corroded Zincalume or galvanised steel valley iron at end of service life — replace with Colorbond valley iron for improved corrosion resistance and service life",
    "Missing valley iron — older roof constructions with mortar valleys that have cracked and failed",
    "Incorrectly installed valley iron — inadequate lap at eave, insufficient width for the tile type, or not fixed to battens",
  ],
  typicalSubstrates: [
    "Roof battens — valley iron is fixed to roof battens with appropriate fixing type — battens must be sound and correctly fixed before new valley iron is installed",
    "Sarking — where sarking is present, confirm that the valley iron correctly laps over the sarking to prevent water bypassing the valley",
    "Gutter — valley iron must correctly lap into or over the gutter to prevent water running behind the gutter at the eave — confirm minimum lap from AS 1562.1",
    "Tile substrate — terracotta and concrete tiles bedded against and over the valley iron — confirm tile-to-valley clearance from tile manufacturer's fixing guide",
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

export function ValleyFlashingColorbondIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is Colorbond valley iron?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Colorbond valley iron is a pre-painted BlueScope Colorbond steel valley flashing factory-formed to the standard valley profile and supplied in the standard Colorbond colour range. It is the most widely installed valley flashing in Australia for residential and Class 2 strata pitched tiled roofs. The factory Colorbond colour coating eliminates the need for on-site painting and provides a factory-warranted finished appearance that matches the BlueScope Colorbond colour range used on most Australian roofing and fascia systems.
        </p>
        {expanded && (
          <>
            <p>
              The valley is one of the highest-risk water entry points on a pitched tiled roof. An undersized, incorrectly lapped, failed, or missing valley iron is one of the most common causes of roof leaks on residential and Class 2 strata buildings. Colorbond valley iron is the standard-of-care replacement product for corroded Zincalume or galvanised steel valley iron, and is the default specification for new valley flashing installation in standard Australian residential roofing.
            </p>
            <p>
              Valley width, minimum lap at the gutter outlet, and fixing method must all comply with AS 1562.1 and the tile manufacturer's fixing guide for the specific tile type. Colour match to existing Colorbond roofing must be verified against the current BlueScope Colorbond colour chart — colours are periodically discontinued and an exact match to faded or discontinued colours cannot always be guaranteed.
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

export function ValleyFlashingColorbondProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 2 brands — Colorbond valley flashing systems only — scroll to view all</p>
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
              Side-by-side comparison of Colorbond valley flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour options</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Custom available</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Corrosion resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Warranty</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colourOptions}</td>
                  <td className="px-4 py-3 text-slate-600">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600">{row.customAvailable}</td>
                  <td className="px-4 py-3 text-slate-600">{row.corrosionResistance}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.warranty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
