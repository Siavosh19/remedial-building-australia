"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "H2"
  | "H3"
  | "LOSP"
  | "Pine"
  | "Standard-batten"
  | "Termite-zone"
  | "AS-1604"
  | "AS-3660"
  | "Engineered"
  | "Metal-batten"
  | "Rot-resistant"
  | "Termite-resistant";

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
    fullLabel: "Big River Group",
    brandUrl: "https://www.bigrivergroup.com.au",
    tdsUrl: "https://www.bigrivergroup.com.au",
    accentColor: "#b45309",
    name: "Big River Group H2 Treated Pine Battens",
    descriptionLine: "H2 LOSP treated pine roof battens — standard batten for non-termite-hazard areas — AS 1604 H2 treatment — 38×38, 50×38 and 75×50 standard sizes",
    productType: "H2 LOSP treated pine roof batten — AS 1604",
    filterTags: ["H2", "LOSP", "Pine", "Standard-batten", "AS-1604"],
    techChips: [
      { label: "H2 LOSP", cls: "bg-amber-100 text-amber-800" },
      { label: "Pine", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1604", cls: "bg-green-50 text-green-700" },
      { label: "Standard batten", cls: "bg-slate-100 text-slate-700" },
      { label: "38×38, 50×38, 75×50", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Big River Group H2 Treated Pine Battens are light organic solvent preservative (LOSP) treated pine roof battens, manufactured and distributed for all roof tile replacement and re-battening work in non-termite-hazard areas across Australia. H2 hazard class treatment under AS 1604 is appropriate for timber used above-ground, exposed to weather but not in contact with the ground, in areas not classified as termite hazard zones under AS 3660. This is the standard product specified for the majority of residential and Class 2 strata pitched tiled roof re-battening projects in low to moderate hazard regions. Available in 38×38, 50×38 and 75×50 standard sizes — exact sizing requirement is determined by the tile manufacturer's installation guide and the batten span based on rafter centres. Big River Group distributes through timber merchants and building supply companies nationally. Always confirm the current H2 treatment grade and product specification directly with Big River Group before specifying — confirm that the LOSP treatment complies with AS 1604 for the required hazard class.",
    technicalProperties: [
      "H2 LOSP (light organic solvent preservative) treatment — compliant with AS 1604 — above-ground, weather-exposed applications",
      "Suitable for non-termite-hazard areas — not for use in AS 3660 termite hazard zones without upgrading to H3",
      "Standard sizes: 38×38, 50×38 and 75×50 — confirm sizing against tile manufacturer specification and rafter span",
      "Treated pine — lighter weight than hardwood alternatives — suitable for all standard tiled roof batten applications",
      "Nationally distributed through timber merchants and building supply companies",
      "Confirm current AS 1604 H2 compliance and LOSP treatment retention level with Big River Group before specifying",
    ],
    limitations: [
      "H2 only — not suitable for termite hazard areas classified under AS 3660 — specify H3 for termite risk areas",
      "Not suitable for ground contact, embedded in concrete, or in contact with soil — H4 or H5 required for those applications",
      "Confirm batten size against the tile manufacturer's specification — incorrect gauge results in tile fixing failures",
      "LOSP treatment may have a slight solvent odour on fresh product — allow adequate ventilation during installation",
      "Confirm availability of required sizes with local supplier before specifying — not all sizes stocked at all branches",
      "Do not substitute H2 for H3 in AS 3660 termite hazard areas — this is a NCC compliance failure",
    ],
    procurementSources: [
      { name: "Big River Group — trade supply", url: "https://www.bigrivergroup.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Hardware & General", url: "https://www.hardwareandgeneral.com.au" },
    ],
  },
  {
    fullLabel: "Carter Holt Harvey",
    brandUrl: "https://www.chh.com.au",
    tdsUrl: "https://www.chh.com.au",
    accentColor: "#15803d",
    name: "Carter Holt Harvey H2/H3 Treated Battens",
    descriptionLine: "H2 and H3 preservative-treated pine roof battens — H3 required in termite hazard areas (AS 3660) and high moisture zones — AS 1604 compliant",
    productType: "H2 and H3 preservative-treated pine roof batten — AS 1604 / AS 3660",
    filterTags: ["H2", "H3", "Pine", "Termite-zone", "AS-1604", "AS-3660"],
    techChips: [
      { label: "H2 and H3", cls: "bg-green-100 text-green-800" },
      { label: "Pine — preservative treated", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1604 compliant", cls: "bg-green-50 text-green-700" },
      { label: "Termite hazard zone", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 3660", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Carter Holt Harvey supplies both H2 and H3 preservative-treated pine roof battens for Australian residential and strata building applications. The H3 hazard class treatment is required under AS 1604 where the batten will be used in areas classified as termite hazard zones under AS 3660, in high moisture environments where the timber is subject to repeated wetting, or where the tile manufacturer's installation guide requires H3. H3 treatment uses a higher concentration of preservative and provides greater resistance to decay and termite attack than H2 LOSP treatment. In Australian coastal zones, tropical regions, and areas identified in AS 3660 maps as requiring termite protection, H3 is the minimum treatment class for roof battens. Carter Holt Harvey (CHH) is one of Australia's largest timber processors and distributors — products available through major timber merchants, hardware chains and builders' merchants nationally. Confirm the specific treatment retention level, AS 1604 hazard class certification, and available sizes with the local CHH distributor before specifying. Confirm with the tile manufacturer whether H3 is required for the specific tile profile and batten gauge specified.",
    technicalProperties: [
      "H2 and H3 preservative-treated pine — manufactured to AS 1604 requirements",
      "H3 treatment provides enhanced resistance to decay and termite attack — required in AS 3660 termite hazard zones",
      "Suitable for above-ground, weather-exposed applications where repeated wetting is expected (H3)",
      "Available through Carter Holt Harvey distribution network nationally — major timber merchants and hardware chains",
      "Confirm AS 1604 hazard class and preservative retention level with local CHH distributor before ordering",
      "Both H2 and H3 grades available — specify correct hazard class based on AS 3660 site classification",
    ],
    limitations: [
      "Confirm the termite hazard classification for the project site under AS 3660 before specifying H2 vs H3",
      "H3 is not a substitute for H4 or H5 in-ground contact applications — do not use H3 battens in ground contact",
      "Confirm batten gauge requirement with tile manufacturer — incorrect sizing invalidates the tile manufacturer's warranty",
      "Treated pine battens must be cut with appropriate PPE — wear dust mask and gloves when cutting preservative-treated timber",
      "All cut ends exposed during installation must be treated with an approved end-grain preservative sealer",
      "Confirm current product specification, sizes, and AS 1604 compliance status with Carter Holt Harvey before specifying",
    ],
    procurementSources: [
      { name: "Carter Holt Harvey — trade supply", url: "https://www.chh.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Bowens Timber & Hardware", url: "https://www.bowens.com.au" },
      { name: "Mitre 10", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "SUPALOC",
    brandUrl: "https://www.supaloc.com.au",
    tdsUrl: "https://www.supaloc.com.au",
    accentColor: "#1d4ed8",
    name: "SUPALOC Engineered Roof Batten",
    descriptionLine: "Proprietary engineered metal/composite batten — rot and termite resistant — used where timber battens have repeatedly failed — alternative to treated timber",
    productType: "Engineered metal/composite roof batten — rot-resistant — termite-resistant",
    filterTags: ["Engineered", "Metal-batten", "Rot-resistant", "Termite-resistant"],
    techChips: [
      { label: "Engineered batten", cls: "bg-blue-100 text-blue-800" },
      { label: "Metal/composite", cls: "bg-slate-100 text-slate-700" },
      { label: "Rot resistant", cls: "bg-green-50 text-green-700" },
      { label: "Termite resistant", cls: "bg-green-50 text-green-700" },
      { label: "Remediation use", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "SUPALOC Engineered Roof Battens are a proprietary alternative to treated timber roof battens, manufactured from metal or composite materials that are inherently resistant to rot, decay, and termite attack — without reliance on chemical preservative treatment. This product type is less commonly specified than treated pine in standard roofing projects but becomes the appropriate choice where timber battens have repeatedly failed — for example, in coastal environments where LOSP or H3 treated timber has a poor track record, in buildings where ongoing termite pressure has caused repeated batten failures, or where a client or specifier has determined that a non-timber batten system is required for long-term performance. Engineered battens must be confirmed for compatibility with the specific tile profile and tile manufacturer's fixing requirements — not all engineered batten systems are compatible with all tile fixing clips, screws, and accessory systems. Confirm structural spanning capability, tile manufacturer compatibility, NCC compliance, and fixing method with SUPALOC before specifying. Confirm procurement and availability with a local roofing trade supplier before including in specification.",
    technicalProperties: [
      "Metal or composite engineered roof batten — inherently rot-resistant and termite-resistant without preservative treatment",
      "Designed as an alternative to treated pine in conditions where timber battens have repeatedly failed",
      "Not reliant on LOSP or H3 chemical preservative — long-term performance independent of preservative retention",
      "Confirm spanning capability, tile manufacturer compatibility, and fixing method with SUPALOC before specifying",
      "Confirm NCC compliance and structural adequacy with SUPALOC technical for the specific application",
      "Confirm availability with local roofing trade supplier — less widely stocked than treated pine alternatives",
    ],
    limitations: [
      "Less commonly available than treated pine battens — confirm availability with local supplier before specifying",
      "Not all tile profiles and tile fixing systems are compatible with engineered battens — confirm with SUPALOC and tile manufacturer",
      "May require specialist fixing screws or clips — confirm with SUPALOC and tile manufacturer before ordering",
      "Higher unit cost than treated pine — confirm cost-benefit for the specific project before specifying",
      "Not suitable as a substitute for structural roof framing members — batten only, not a rafter or structural element",
      "Confirm current product range, spanning data, and compatibility with SUPALOC technical before specifying",
    ],
    procurementSources: [
      { name: "SUPALOC — product information", url: "https://www.supaloc.com.au" },
      { name: "Confirm local availability with SUPALOC distributor network", url: "https://www.supaloc.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "H2", label: "H2" },
  { id: "H3", label: "H3" },
  { id: "Engineered", label: "Engineered" },
];

const SYSTEM_COMPARISON = [
  {
    product: "H2 Pine Battens",
    brand: "Big River Group",
    treatment: "H2 LOSP",
    hazardClass: "H2",
    termiteResistance: "No — H2 only",
    rotResistance: "Yes (above-ground)",
    sizes: "38×38, 50×38, 75×50",
  },
  {
    product: "H2/H3 Treated Battens",
    brand: "Carter Holt Harvey",
    treatment: "H2 and H3 preservative",
    hazardClass: "H2 or H3",
    termiteResistance: "H3 grade — AS 3660 termite zones",
    rotResistance: "Yes — H3 above-ground",
    sizes: "Confirm with supplier",
  },
  {
    product: "Engineered Batten",
    brand: "SUPALOC",
    treatment: "None — inherent resistance",
    hazardClass: "N/A — not timber",
    termiteResistance: "Yes — inherent",
    rotResistance: "Yes — inherent",
    sizes: "Confirm with SUPALOC",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Full roof re-battening during tile replacement or sarking upgrade on pitched tiled roofs",
    "Partial re-battening where existing battens are split, rotted, or termite-damaged during a tile replacement programme",
    "Batten replacement in coastal and tropical regions where preservative-treated timber longevity is a concern",
    "Re-battening in termite hazard zones (AS 3660) where H3 or engineered battens are required",
    "Class 2 strata buildings undergoing scheduled roof tile replacement where batten condition is assessed during works",
  ],
  selectionCriteria: [
    "AS 1604 hazard class — H2 for non-termite areas, H3 for termite hazard zones under AS 3660",
    "AS 3660 termite hazard classification — confirm the site's hazard zone before specifying H2 or H3",
    "Batten gauge and size — confirm against tile manufacturer installation guide and rafter spacing",
    "Tile manufacturer fixing compatibility — screw or clip fixing — confirm batten gauge required for fixing method",
    "NCC compliance — minimum treatment class under the NCC for the climate zone and hazard level",
    "Engineered batten vs timber — consider long-term performance in high-humidity, coastal, or repeated termite-attack scenarios",
  ],
  limitations: [
    "H2 is not compliant in AS 3660 termite hazard zones — do not specify H2 in these areas",
    "H3 is not suitable for ground contact — do not use H3 battens in positions that contact soil or are embedded in concrete",
    "Engineered battens are not compatible with all tile systems — confirm with tile manufacturer before specifying",
    "Do not use undersized battens — incorrect gauge causes tile slippage and tile manufacturer warranty voidance",
    "All cut ends of treated timber must be sealed with an approved end-grain timber preservative on site",
  ],
  standardsNotes: [
    "AS 1604 — Specification for Preservative Treatment — timber hazard class definitions H1 to H6",
    "AS 3660 — Protection of Buildings from Subterranean Termites — site classification and treatment requirements",
    "NCC Volume Two — minimum batten treatment class requirements for different climate zones and termite hazard levels",
    "Tile manufacturer installation guides — required batten gauge, fixing method, and spacing for each tile profile",
    "AS 1562.4 — Design and installation of roof tiles — references batten requirements for tiled roof systems",
  ],
  typicalSubstrates: [
    "Hardwood or softwood timber rafters — confirm structural adequacy of existing rafters before re-battening",
    "Engineered timber rafters (LVL, GL) — confirm fixing screw requirements and structural capacity with engineer if in doubt",
    "Steel purlins — engineered metal battens or treated timber battens — confirm compatibility with tile fixing method",
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

export function RoofBattensIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are roof batten systems — H2 and H3 treated?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Roof battens are the horizontal timber or engineered members fixed across the rafters that support and fix the roof tiles. On a pitched tiled roof, battens run parallel to the eaves at spacings determined by the tile profile and the tile manufacturer's installation guide. AS 1604 defines the preservative treatment hazard classes — H2 (above-ground, non-termite area) and H3 (above-ground, moderate decay hazard and termite area) — that must be applied to battens depending on the site's termite hazard classification under AS 3660.
        </p>
        {expanded && (
          <>
            <p>
              During roof tile replacement or sarking installation on a pitched tiled roof, it is standard practice to assess batten condition and replace deteriorated, split, or undersized battens. The NCC and tile manufacturer installation guides both specify minimum batten gauge and treatment class. Specifying the wrong hazard class — for example, H2 in an AS 3660 termite hazard zone — is a non-compliance with the NCC and can result in warranty voidance and structural failure.
            </p>
            <p>
              Where timber battens have repeatedly failed due to rot or termite attack in a specific building or location, engineered metal or composite battens may be specified as an alternative. These are inherently rot-resistant and termite-resistant without reliance on chemical treatment retention.
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

export function RoofBattensProductSection() {
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

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — treated timber and engineered batten systems</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}
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
              Side-by-side comparison of roof batten systems. Confirm all product selections against the current manufacturer TDS and AS 1604 before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Treatment</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Hazard class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Termite resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Rot resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sizes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.treatment}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.hazardClass}</td>
                  <td className="px-4 py-3 text-slate-600">{row.termiteResistance}</td>
                  <td className="px-4 py-3 text-slate-600">{row.rotResistance}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px]">{row.sizes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
