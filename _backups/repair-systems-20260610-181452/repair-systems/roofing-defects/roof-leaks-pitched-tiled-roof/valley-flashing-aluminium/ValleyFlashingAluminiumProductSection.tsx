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
  | "Roll-formed"
  | "Standard-valley"
  | "Custom"
  | "Non-standard-profile"
  | "Heavy-gauge"
  | "AS-1562";

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
    accentColor: "#0369a1",
    name: "Capral Aluminium Valley Iron",
    descriptionLine: "Mill-finish aluminium valley iron roll-formed from Capral 5000-series aluminium alloy — 150mm, 200mm, 250mm valley width — all roof types — lighter than Colorbond, will not rust",
    productType: "Mill-finish roll-formed aluminium valley iron — AS 1562.1",
    filterTags: ["Aluminium", "Mill-finish", "Roll-formed", "Standard-valley", "AS-1562"],
    techChips: [
      { label: "Aluminium", cls: "bg-sky-100 text-sky-800" },
      { label: "Mill-finish", cls: "bg-slate-100 text-slate-700" },
      { label: "Roll-formed", cls: "bg-green-50 text-green-700" },
      { label: "AS 1562.1", cls: "bg-amber-50 text-amber-700" },
      { label: "Standard widths", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Capral Aluminium Valley Iron is a mill-finish aluminium valley flashing roll-formed from Capral 5000-series aluminium alloy. Available in standard valley widths of 150mm, 200mm, and 250mm in standard lengths, the product is suitable for standard tile valley replacement on all common Australian roof types including terracotta and concrete tiled roofs. Aluminium valley iron is lighter than Colorbond steel and will not rust, making it a practical alternative where corrosion resistance is a priority and colour matching is not critical. Mill-finish aluminium is uncoated and will not match the colour of Colorbond or terracotta tiles without painting — where colour match is required, the cured aluminium can be painted with an appropriate metal primer and compatible roof tile paint. Confirm compatibility with the tile manufacturer's valley width requirements and minimum lap at gutter outlets from the current Capral technical documentation and the tile manufacturer's fixing guide. Valley iron must be fixed to roof battens in accordance with AS 1562.1 and the tile manufacturer's installation requirements.",
    technicalProperties: [
      "Roll-formed from Capral 5000-series aluminium alloy — corrosion-resistant — will not rust in exposed external roofing environments",
      "Mill-finish (uncoated) — lighter than Colorbond steel valley iron — standard widths: 150mm, 200mm, 250mm",
      "Suitable for standard tile valley replacement on terracotta and concrete tiled roofs — all common Australian roof types",
      "AS 1562.1 compliant — confirm valley width, lap, and fixing requirements from current standard and tile manufacturer's fixing guide",
      "Paintable after installation — confirm metal primer and paint compatibility for colour match applications",
      "Confirm standard lengths and availability from Capral Aluminium trade supply before ordering",
    ],
    limitations: [
      "Mill-finish (uncoated) — will not match the colour of Colorbond or terracotta tiles without painting — colour match requires metal primer and compatible roof tile paint",
      "Not a factory pre-painted product — where an aesthetically matched factory finish is required, specify Colorbond valley iron instead",
      "Confirm valley width is compatible with the tile profile and tile manufacturer's fixing requirements — do not specify a width that is narrower than the minimum required by the tile manufacturer",
      "Minimum lap at gutter outlet must comply with AS 1562.1 and the tile manufacturer's fixing guide — confirm before installation",
      "Do not use dissimilar fixings — confirm fixing material compatibility (aluminium or stainless steel fixings only) — do not use steel fixings that will cause galvanic corrosion",
      "Confirm current product availability and standard lengths from Capral trade supply before specifying",
    ],
    procurementSources: [
      { name: "Capral Aluminium — trade supply", url: "https://www.capral.com.au" },
      { name: "Metal Roofing Online", url: "https://www.metalroofonline.com.au" },
      { name: "Roofing trade suppliers — enquire locally", url: "https://www.capral.com.au" },
    ],
  },
  {
    fullLabel: "Metalcorp Steel",
    brandUrl: "https://www.metalcorp.com.au",
    accentColor: "#16a34a",
    name: "Metalcorp Aluminium Valley Flashing",
    descriptionLine: "Aluminium valley flashing from Metalcorp — available in mill-finish and pre-painted — terracotta and concrete tile valley replacement",
    productType: "Roll-formed aluminium valley flashing — mill-finish and pre-painted",
    filterTags: ["Aluminium", "Pre-painted", "Roll-formed", "Standard-valley"],
    techChips: [
      { label: "Aluminium", cls: "bg-green-100 text-green-800" },
      { label: "Pre-painted available", cls: "bg-slate-100 text-slate-700" },
      { label: "Mill-finish available", cls: "bg-green-50 text-green-700" },
      { label: "Roll-formed", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Metalcorp Aluminium Valley Flashing is an aluminium valley flashing formed from Metalcorp aluminium sheet, available in both mill-finish and pre-painted finishes. The availability of a pre-painted finish makes Metalcorp aluminium valley flashing a practical option where a colour-matched valley flashing is required without the cost or lead time of custom fabrication. Pre-painted options are available in a range of standard colours — confirm available colours from Metalcorp trade supply before specifying for colour match applications. Suitable for terracotta and concrete tile valley replacement. As with all aluminium valley flashings, fixing to roof battens must be in accordance with AS 1562.1 and the tile manufacturer's valley installation requirements. Confirm standard widths, available colours, and lead times from Metalcorp trade supply before ordering.",
    technicalProperties: [
      "Aluminium valley flashing formed from Metalcorp aluminium sheet — available in mill-finish and pre-painted finishes",
      "Pre-painted finish available — eliminates the need for on-site painting for colour match applications — confirm available colour range from Metalcorp",
      "Suitable for terracotta and concrete tile valley replacement — standard valley widths — confirm from Metalcorp trade supply",
      "Roll-formed aluminium — corrosion-resistant — will not rust in exposed external roofing environments",
      "Confirm AS 1562.1 compliance, standard widths, available colours, and standard lengths from current Metalcorp product data",
    ],
    limitations: [
      "Confirm pre-painted colour range from Metalcorp trade supply before specifying for colour match applications — limited colour range compared to Colorbond",
      "Pre-painted finish may not match existing Colorbond or terracotta tile colours exactly — confirm colour match before installing",
      "Confirm valley width is compatible with the tile profile and tile manufacturer's fixing requirements — confirm minimum lap at gutter outlet from AS 1562.1",
      "Do not use dissimilar fixings — confirm fixing material compatibility (aluminium or stainless steel only) — steel fixings will cause galvanic corrosion",
      "Confirm current product availability, standard widths, and lead times from Metalcorp trade supply before specifying",
    ],
    procurementSources: [
      { name: "Metalcorp Steel — trade supply", url: "https://www.metalcorp.com.au" },
      { name: "Local roofing trade suppliers — enquire via Metalcorp", url: "https://www.metalcorp.com.au" },
    ],
  },
  {
    fullLabel: "Custom metal fabricator",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#7c2d12",
    name: "Custom Roll-Formed Aluminium Valley",
    descriptionLine: "Custom-formed aluminium valley from 3mm aluminium alloy sheet by roofing metal fabricator — non-standard valley width or profile — specify profile and width with fabricator",
    productType: "Custom-formed heavy-gauge aluminium valley flashing — non-standard profile",
    filterTags: ["Aluminium", "Custom", "Non-standard-profile", "Heavy-gauge"],
    techChips: [
      { label: "Aluminium", cls: "bg-orange-100 text-orange-800" },
      { label: "Custom profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Heavy-gauge", cls: "bg-green-50 text-green-700" },
      { label: "Non-standard width", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Custom Roll-Formed Aluminium Valley is a custom-formed aluminium valley iron fabricated from 3mm aluminium alloy sheet by a specialist roofing metal fabricator. This option is used where the valley width, profile, or depth required on the specific project does not match any standard off-the-shelf aluminium valley iron product. Custom fabrication allows the valley profile to be matched to a specific tile profile, to a heritage building requirement, or to a non-standard roof geometry. Specify profile, width, and length with the fabricator — a profile drawing or site template is typically required for accurate fabrication. Lead times for custom fabrication are longer than for standard products — allow adequate lead time in the programme. Lysaght and other roofing metal fabricators can provide custom fabrication from aluminium sheet — confirm capability and lead time with the selected fabricator before specifying. Confirm that the fabricated valley complies with AS 1562.1 valley flashing requirements for the specific roof type, tile manufacturer fixing requirements, and minimum lap at the gutter outlet.",
    technicalProperties: [
      "Custom-formed from 3mm aluminium alloy sheet by specialist roofing metal fabricator — suited to non-standard valley width, profile, or depth requirements",
      "Heavy-gauge aluminium — greater rigidity than standard roll-formed valley iron — suited to wide valleys and high-load applications",
      "Fabricated to profile drawing or site template — allows exact match to tile profile, heritage requirement, or non-standard roof geometry",
      "Corrosion-resistant aluminium — will not rust in exposed external roofing environments",
      "Confirm AS 1562.1 compliance, minimum lap, and fixing requirements from the fabricator and the tile manufacturer before installation",
    ],
    limitations: [
      "Longer lead time than standard off-the-shelf valley iron — confirm fabrication and delivery lead time with fabricator before specifying for time-critical programmes",
      "Higher cost than standard valley iron — custom fabrication involves additional labour and material cost — obtain a quotation from fabricator before specifying",
      "Profile drawing or site template required for accurate fabrication — do not order without a confirmed profile specification",
      "Mill-finish (uncoated) unless specified otherwise — confirm finish requirement (mill-finish or painted) with fabricator at time of order",
      "Do not use dissimilar fixings — confirm fixing material compatibility (aluminium or stainless steel only) with the fabricator",
      "Confirm that the fabricator is a registered or experienced roofing metal fabricator — custom valley iron must comply with AS 1562.1",
    ],
    procurementSources: [
      { name: "Lysaght — roofing metal fabrication", url: "https://www.lysaght.com" },
      { name: "Local specialist roofing metal fabricators — enquire locally", url: "https://www.lysaght.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Mill-finish", label: "Mill-finish" },
  { id: "Pre-painted", label: "Pre-painted" },
  { id: "Custom", label: "Custom" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  finish: string;
  widthOptions: string;
  corrosionResistance: string;
  colourMatch: string;
  fabrication: string;
}[] = [
  {
    product: "Capral Valley Iron",
    brand: "Capral",
    material: "5000-series aluminium alloy",
    finish: "Mill-finish (uncoated)",
    widthOptions: "150mm, 200mm, 250mm standard",
    corrosionResistance: "Excellent — will not rust",
    colourMatch: "Paint on site — not factory colour",
    fabrication: "Standard roll-formed",
  },
  {
    product: "Metalcorp Valley Flashing",
    brand: "Metalcorp",
    material: "Aluminium sheet",
    finish: "Mill-finish or pre-painted",
    widthOptions: "Standard — confirm with Metalcorp",
    corrosionResistance: "Excellent — will not rust",
    colourMatch: "Pre-painted options available",
    fabrication: "Roll-formed",
  },
  {
    product: "Custom Aluminium Valley",
    brand: "Custom fabricator",
    material: "3mm aluminium alloy sheet",
    finish: "Mill-finish (painted on order)",
    widthOptions: "Any — custom to specification",
    corrosionResistance: "Excellent — will not rust",
    colourMatch: "Paint on site or order painted",
    fabrication: "Custom — profile and width to drawing",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Valley flashing replacement on pitched terracotta or concrete tiled roofs where the existing valley iron has corroded, failed, or been installed incorrectly",
    "New valley flashing installation where no valley iron exists — older roofs may have been constructed with mortar valleys or no valley iron",
    "Replacement of corroded or undersized valley iron with correctly-sized aluminium valley iron to comply with current AS 1562.1 requirements",
    "Heritage or conservation building roof repairs where a non-standard valley profile is required to match the original construction",
    "Class 2 strata apartment buildings with pitched tiled roof valleys where leaks are traced to failed or undersized valley flashing",
  ],
  selectionCriteria: [
    "Valley width: must be confirmed against the tile manufacturer's fixing guide for the specific tile type — minimum width varies by tile profile and roof pitch",
    "Finish: mill-finish vs pre-painted — mill-finish requires on-site painting for colour match; pre-painted is more aesthetically complete but limits colour choice",
    "Standard vs custom: standard roll-formed valley iron suits most applications; custom fabrication is required for non-standard profiles, widths, or heritage requirements",
    "Minimum lap at gutter outlet: confirm from AS 1562.1 and the tile manufacturer's fixing guide — inadequate lap is a common cause of valley leaks at the eave",
    "Fixing: aluminium or stainless steel fixings only — do not use steel fixings that will cause galvanic corrosion of the aluminium valley iron",
    "Colour match: confirm available pre-painted colours from supplier before specifying — mill-finish aluminium can be painted on site to match existing tile colour",
  ],
  limitations: [
    "Aluminium valley iron requires compatible fixings — steel screws will cause galvanic corrosion — aluminium or stainless steel fixings only",
    "Mill-finish aluminium does not colour-match existing Colorbond or tile colour without on-site painting — factor painting into the scope of works where colour match is required",
    "Valley width narrower than the tile manufacturer's minimum will cause water to run behind the valley under wind-driven rain conditions",
    "Inadequate lap at the gutter outlet is a common installation defect — confirm minimum lap from AS 1562.1 before installation",
    "Do not specify aluminium valley iron where dissimilar metals (copper gutters, lead flashings) are in contact — galvanic corrosion will occur",
  ],
  standardsNotes: [
    "AS 1562.1 — Design and Installation of Sheet Roof and Wall Cladding (Metal) — covers valley flashing requirements including minimum width, lap, and fixing",
    "Tile manufacturer's fixing guides — valley width minimum, lap at eave, and fixing method requirements vary by tile brand and type — confirm before specifying",
    "NCC Volume One — performance requirements for roof construction in Class 2 buildings",
    "Confirm AS 1562.1 compliance and current technical requirements with the product manufacturer or fabricator before specifying",
  ],
  suitableDefects: [
    "Valley leaks on pitched tiled roofs — primary cause is undersized, failed, or incorrectly lapped valley iron",
    "Corroded or rusted valley iron — common on older homes with Zincalume or galvanised steel valley iron that has reached end of service life",
    "Missing valley iron — older roof constructions using mortar valleys that have cracked, failed, and allowed water ingress",
    "Incorrectly installed valley iron — inadequate lap at eave, insufficient valley width for the tile type, or valley iron not properly fixed to battens",
  ],
  typicalSubstrates: [
    "Roof battens — valley iron is fixed to roof battens — battens must be sound and correctly fixed before new valley iron is installed",
    "Sarking — where sarking is present below the tiles, confirm that the valley iron is correctly lapped over the sarking to prevent water bypassing the valley",
    "Gutter — valley iron must be correctly lapped into or over the gutter to prevent water running behind the gutter at the eave",
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

export function ValleyFlashingAluminiumIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are aluminium valley flashings?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Aluminium valley flashings are roll-formed or custom-formed metal sheets installed in the valley of a pitched tiled roof to collect and direct rainwater running off both sides of the valley down to the gutter. The valley is one of the highest-risk water entry points on a pitched tiled roof — an undersized, incorrectly lapped, or failed valley iron is one of the most common causes of roof leaks on residential and Class 2 strata buildings in Australia.
        </p>
        {expanded && (
          <>
            <p>
              Aluminium valley iron is a corrosion-resistant alternative to Colorbond steel valley iron. It will not rust, is lighter than Colorbond, and is suitable for all common Australian tile types. Mill-finish aluminium does not have a factory colour coating and will typically require painting to match the existing tile or roof colour if aesthetics are a consideration.
            </p>
            <p>
              Valley flashing width, profile, lap at the gutter outlet, and fixing method must all comply with AS 1562.1 and the tile manufacturer's fixing guide for the specific tile type. Inadequate valley width or insufficient lap at the eave are the two most common installation defects that lead to repeat valley leaks after replacement.
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

export function ValleyFlashingAluminiumProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — aluminium valley flashing systems only — scroll to view all</p>
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
              Side-by-side comparison of aluminium valley flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Width options</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Corrosion resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour match</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fabrication</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600">{row.widthOptions}</td>
                  <td className="px-4 py-3 text-slate-600">{row.corrosionResistance}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colourMatch}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.fabrication}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
