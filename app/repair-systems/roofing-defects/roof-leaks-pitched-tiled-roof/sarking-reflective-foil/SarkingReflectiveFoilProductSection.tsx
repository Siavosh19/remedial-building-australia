"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Reflective-foil"
  | "Anti-glare"
  | "EHD"
  | "Bradford"
  | "Fletcher"
  | "Kingspan"
  | "NCC-compliant"
  | "AS-4201"
  | "High-performance"
  | "Wide-format";

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
    accentColor: "#0369a1",
    name: "Bradford Anticon",
    descriptionLine: "Extra Heavy Duty anti-glare reflective foil sarking — multi-layer reinforced foil — anti-glare non-reflective upper surface — reflective lower surface — installed below tiles on battens — NCC-compliant — most widely specified brand in Australia",
    productType: "EHD reflective foil sarking — AS 4201 / NCC",
    filterTags: ["Reflective-foil", "Anti-glare", "EHD", "Bradford", "NCC-compliant", "AS-4201"],
    techChips: [
      { label: "EHD reflective foil", cls: "bg-sky-100 text-sky-800" },
      { label: "Anti-glare", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4201", cls: "bg-green-50 text-green-700" },
      { label: "NCC-compliant", cls: "bg-slate-100 text-slate-700" },
      { label: "Bradford — nationally stocked", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Bradford Anticon is the most widely specified extra heavy duty reflective foil sarking product in Australia and the standard reference product for under-tile sarking on pitched tiled roofs in Class 2 strata apartment buildings. Manufactured by CSR Bradford, it is a multi-layer laminated reflective foil product with a non-reflective (anti-glare) upper surface and a reflective lower surface. The anti-glare upper surface reduces radiant glare during installation and prevents blinding reflections through tiles after installation. The reflective lower surface reflects radiant heat back away from the ceiling, reducing summer heat loads in the roof space. Bradford Anticon complies with AS 4201 for reflective insulation and is NCC-compliant for the sarking requirement in the relevant climate zones. It is installed directly below the tile course on the roof battens, lapped and taped at joints, and turned into the gutters at the eaves. The product is available nationally through building trade suppliers. Confirm the current product width, lap requirements, and NCC climate zone applicability from the current Bradford Anticon installation guide before specifying.",
    technicalProperties: [
      "Extra Heavy Duty (EHD) multi-layer reflective foil — AS 4201 compliant",
      "Anti-glare non-reflective upper surface — reflective lower surface",
      "NCC-compliant sarking for pitched tiled roofs in applicable climate zones",
      "Installed below tile course on roof battens — lapped and taped at joints",
      "Suitable for terracotta and concrete tiled roofs — Australian residential and strata standard product",
      "Nationally available through CSR Bradford trade supply network",
    ],
    limitations: [
      "Sarking provides a secondary weather barrier and thermal benefit — it does not replace the primary weather seal provided by the tiles, ridges, valley flashings, and step flashings",
      "NCC sarking requirement varies by climate zone — confirm whether sarking is mandatory in the project climate zone before specifying",
      "Retrofitting sarking under existing tiles requires full or partial removal of the tile course — it cannot be installed without disturbing the tiles — this significantly increases the cost of sarking-only remediation",
      "Laps and penetrations must be taped to maintain weather resistance — untaped laps reduce the effectiveness of the sarking layer",
      "Confirm current product width and lap requirements from the current Bradford Anticon TDS before ordering",
    ],
    procurementSources: [
      { name: "CSR Bradford — bradfordinsulation.com.au", url: "https://www.bradfordinsulation.com.au" },
      { name: "Roofing trade suppliers nationally", url: "https://www.bradfordinsulation.com.au" },
      { name: "Builders merchants — Bowens, Midalia, Stratco", url: "https://www.bradfordinsulation.com.au" },
    ],
  },
  {
    fullLabel: "CSR Bradford",
    brandUrl: "https://www.bradfordinsulation.com.au",
    accentColor: "#0369a1",
    name: "Bradford Anticon Ultra",
    descriptionLine: "Higher-performance variant of Bradford Anticon — improved thermal performance and vapour permeability — EHD anti-glare reflective foil sarking",
    productType: "EHD reflective foil sarking — high-performance — AS 4201",
    filterTags: ["Reflective-foil", "Anti-glare", "EHD", "Bradford", "High-performance"],
    techChips: [
      { label: "EHD reflective foil", cls: "bg-sky-100 text-sky-800" },
      { label: "High performance", cls: "bg-green-100 text-green-800" },
      { label: "Anti-glare", cls: "bg-slate-100 text-slate-700" },
      { label: "Vapour permeable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Bradford Anticon Ultra is CSR Bradford's higher-performance variant of the standard Anticon reflective foil sarking, designed for projects where improved thermal performance or vapour permeability is required compared to the standard Anticon product. Anticon Ultra incorporates a micro-perforated vapour-permeable membrane layer that allows moisture vapour to pass through the sarking while maintaining weather resistance — this is important in humid climate zones where moisture vapour generated within the building can accumulate in the roof space if the sarking is not vapour permeable. Confirm the specific performance differences between Anticon and Anticon Ultra from the current Bradford TDS, including R-value contribution, vapour permeability rating, and climate zone applicability, before specifying Anticon Ultra over the standard Anticon product.",
    technicalProperties: [
      "Higher thermal performance compared to standard Bradford Anticon — confirm R-value contribution from TDS",
      "Vapour permeable — micro-perforated membrane layer allows moisture vapour passage",
      "EHD multi-layer reflective foil — anti-glare upper surface",
      "AS 4201 compliant — NCC-compliant for applicable climate zones",
      "Suitable where standard Anticon vapour permeability is insufficient for the climate zone or roof construction",
    ],
    limitations: [
      "Confirm specific performance differences from standard Anticon before upgrading specification — cost premium over standard Anticon must be justified by performance requirement",
      "Confirm vapour permeability rating and NCC climate zone applicability from current Bradford TDS",
      "Retrofitting under existing tiles requires tile removal — same installation cost constraint as standard Anticon",
      "Confirm current product name, specifications, and availability with CSR Bradford before specifying",
    ],
    procurementSources: [
      { name: "CSR Bradford — bradfordinsulation.com.au", url: "https://www.bradfordinsulation.com.au" },
      { name: "Roofing trade suppliers nationally", url: "https://www.bradfordinsulation.com.au" },
    ],
  },
  {
    fullLabel: "Fletcher Insulation",
    brandUrl: "https://www.fletcherinsulation.com.au",
    accentColor: "#b45309",
    name: "Fletcher Insulation Sisalation 475",
    descriptionLine: "Reflective foil sarking in 475mm width (wide format) — reinforced with woven scrim — Fletcher Insulation — EHD — for roof sarking under tiles",
    productType: "EHD reflective foil sarking — wide format — AS 4201",
    filterTags: ["Reflective-foil", "EHD", "Fletcher", "Wide-format"],
    techChips: [
      { label: "EHD reflective foil", cls: "bg-amber-100 text-amber-800" },
      { label: "Wide format — 475mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Woven scrim reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Fletcher Insulation", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sisalation 475 is a reflective foil sarking product from Fletcher Insulation, one of the two major Australian insulation manufacturers alongside CSR Bradford. Sisalation is a long-established brand name in Australian reflective foil sarking — the 475 designation refers to the 475mm width format. The product is reinforced with woven polypropylene or polyester scrim for tear resistance during installation. Sisalation 475 is used for pitched roof sarking under tiles and is available through roofing trade supply channels nationally. Where Bradford Anticon is the specifier's standard product, Sisalation 475 is the primary alternative from a major Australian manufacturer. Confirm AS 4201 compliance, NCC climate zone applicability, lap and sealing requirements, and current product width from the current Fletcher Insulation Sisalation TDS before specifying.",
    technicalProperties: [
      "EHD reflective foil sarking — reinforced with woven scrim",
      "475mm wide format — confirm current width and roll dimensions from TDS",
      "AS 4201 compliant — NCC-compliant for applicable climate zones",
      "Fletcher Insulation — nationally available",
      "Alternative supply option to Bradford Anticon from major Australian manufacturer",
    ],
    limitations: [
      "Confirm current product width, lap requirements, and NCC applicability from Fletcher Insulation TDS before ordering",
      "Same installation cost constraints as Bradford Anticon — requires tile removal for retrofit installation",
      "Confirm whether Sisalation 475 has an anti-glare upper surface — confirm from current Fletcher TDS",
      "Confirm vapour permeability and any vapour-permeable variant availability with Fletcher Insulation",
    ],
    procurementSources: [
      { name: "Fletcher Insulation — fletcherinsulation.com.au", url: "https://www.fletcherinsulation.com.au" },
      { name: "Roofing trade suppliers nationally", url: "https://www.fletcherinsulation.com.au" },
      { name: "Builders merchants", url: "https://www.fletcherinsulation.com.au" },
    ],
  },
  {
    fullLabel: "Kingspan",
    brandUrl: "https://www.kingspan.com/au",
    accentColor: "#78350f",
    name: "Kingspan Thermofoil",
    descriptionLine: "Kingspan reflective foil underlay and sarking product — for pitched roof applications — EHD reflective foil",
    productType: "EHD reflective foil sarking — Kingspan",
    filterTags: ["Reflective-foil", "EHD", "Kingspan"],
    techChips: [
      { label: "EHD reflective foil", cls: "bg-red-100 text-red-800" },
      { label: "Kingspan", cls: "bg-slate-100 text-slate-700" },
      { label: "Pitched roof sarking", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Kingspan Thermofoil is Kingspan's reflective foil sarking and roof underlay product for pitched roof applications. Kingspan is primarily known in the Australian market for its rigid PIR insulation board products (Kooltherm range), but also offers reflective foil underlay products for sarking and thermal applications under tiles. Confirm the current Kingspan Thermofoil product specifications, AS 4201 compliance, NCC climate zone applicability, product width, and availability in the Australian market before specifying. Where Bradford Anticon or Sisalation 475 are available through local trade supply, they may be more readily accessible than the Kingspan Thermofoil product in some markets.",
    technicalProperties: [
      "Reflective foil sarking and roof underlay — EHD format",
      "Kingspan — internationally recognised insulation manufacturer",
      "For pitched roof applications under tiles",
      "Confirm AS 4201 compliance, NCC climate zone applicability, and current product specifications from Kingspan Australia TDS",
    ],
    limitations: [
      "Confirm current Australian product availability, product width, and distribution with Kingspan Australia before specifying",
      "Confirm AS 4201 compliance and NCC climate zone applicability from current Kingspan Thermofoil TDS",
      "Bradford Anticon and Sisalation 475 are the dominant products in Australian residential trade supply — Kingspan Thermofoil may have more limited availability through some trade channels",
      "Confirm whether Thermofoil has an anti-glare surface from current Kingspan documentation",
    ],
    procurementSources: [
      { name: "Kingspan Australia — kingspan.com/au", url: "https://www.kingspan.com/au" },
      { name: "Roofing and insulation trade suppliers", url: "https://www.kingspan.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Bradford", label: "Bradford" },
  { id: "Fletcher", label: "Fletcher" },
  { id: "Kingspan", label: "Kingspan" },
  { id: "Anti-glare", label: "Anti-glare" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Anticon",
    brand: "Bradford",
    antiGlare: "Yes",
    ehd: "Yes",
    rValue: "Confirm TDS",
    width: "Confirm TDS",
    nccCompliant: "Yes",
  },
  {
    product: "Anticon Ultra",
    brand: "Bradford",
    antiGlare: "Yes",
    ehd: "Yes",
    rValue: "Higher — confirm TDS",
    width: "Confirm TDS",
    nccCompliant: "Yes",
  },
  {
    product: "Sisalation 475",
    brand: "Fletcher",
    antiGlare: "Confirm TDS",
    ehd: "Yes",
    rValue: "Confirm TDS",
    width: "475mm (confirm current)",
    nccCompliant: "Yes",
  },
  {
    product: "Thermofoil",
    brand: "Kingspan",
    antiGlare: "Confirm TDS",
    ehd: "Yes",
    rValue: "Confirm TDS",
    width: "Confirm TDS",
    nccCompliant: "Confirm TDS",
  },
];

const TECH_INFO = [
  {
    title: "What Sarking Does",
    style: "bullet" as const,
    items: [
      "Sarking is a flexible membrane installed directly under the tiles on the roof battens — it provides a secondary weather barrier that catches any water that penetrates through the primary tile, ridge, valley, and flashing system",
      "Reflective foil sarking also provides a thermal benefit — the reflective lower surface reflects radiant heat away from the ceiling space, reducing summer heat load and improving thermal comfort in the building below",
      "Sarking is not a substitute for a properly installed primary tile, ridge, valley, and flashing system — it supplements it",
      "Water that penetrates the primary tile system is collected by the sarking and directed to the gutters, preventing it from entering the ceiling space",
    ],
  },
  {
    title: "NCC Sarking Requirements",
    style: "check" as const,
    items: [
      "NCC Volume Two (residential) specifies sarking requirements for pitched tiled roofs — requirements vary by climate zone",
      "In cyclonic and high-wind regions, sarking is mandatory for all pitched tiled roofs — confirm NCC climate zone classification for the project location",
      "In non-cyclonic regions, sarking requirements depend on climate zone and roof pitch — confirm from the current NCC for the applicable volume and climate zone",
      "Bradford Anticon and Sisalation 475 are both NCC-compliant sarking products — confirm compliance from the current product TDS for the applicable climate zone",
    ],
  },
  {
    title: "Installing Sarking Without Full Re-Tile",
    style: "warn" as const,
    items: [
      "Sarking cannot be installed under existing tiles without removing the tile course — it must be laid on the battens before the tiles are placed",
      "On remediation projects where sarking is absent, adding sarking requires partial or full removal of the tile course, installation of the sarking, then re-laying of the tiles — this is a significant cost impost",
      "Where only isolated tiles are being replaced (cracked or broken tile replacement), sarking cannot typically be added without a full-row removal — discuss this limitation with the building owner before the scope of work is finalised",
      "In some situations, a sarking retrofit is best combined with a full re-tile at end-of-life rather than as a standalone scope item",
    ],
  },
  {
    title: "Lapping and Sealing Requirements",
    style: "check" as const,
    items: [
      "Sarking sheets must be lapped at joints — the minimum lap dimension is specified in AS 4201 and in the product installation guide — confirm from the current Bradford or Fletcher TDS",
      "In cyclonic regions, a greater minimum lap is required — confirm from the NCC and the product installation guide",
      "All laps should be taped with a compatible foil tape to maintain the continuity of the sarking layer — untaped laps reduce weather resistance and allow wind to lift the sarking between tiles",
      "At eaves, the sarking must be dressed into the gutter to drain water that penetrates the tile course — it must not terminate at the eave fascia where water will run down the fascia behind the gutter",
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

export function SarkingReflectiveFoilIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are EHD reflective foil sarking systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Extra Heavy Duty (EHD) reflective foil sarking systems are multi-layer flexible foil membranes installed directly under the tile course on the roof battens of pitched tiled roofs. They act as a secondary weather barrier — collecting any water that penetrates the primary tile and flashing system and directing it to the eaves gutters — and provide a thermal benefit through the reflective lower surface that reduces radiant heat gain into the roof space below. Bradford Anticon is the most widely specified product in Australian residential and strata construction.
        </p>
        {expanded && (
          <>
            <p>
              AS 4201 is the Australian Standard covering reflective insulation and sarking — products must comply with AS 4201 to be specified as compliant sarking under the NCC. NCC sarking requirements for pitched tiled roofs vary by climate zone — sarking is mandatory in cyclonic wind regions and may be required in other climate zones depending on roof pitch and construction.
            </p>
            <p>
              EHD reflective foil sarking is distinct from PIR rigid board sarking (which provides higher thermal insulation per mm of thickness but is more expensive and harder to retrofit) and from ceiling insulation batts (which go below the ceiling, not under the tiles). Sarking is not a standalone solution for roof leaks — it supplements a properly installed primary tile and flashing system.
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

export function SarkingReflectiveFoilProductSection() {
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
              What sarking does, NCC requirements, retrofitting under existing tiles, lapping and sealing
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
            <p className="mt-1 text-sm text-slate-500">4 products — 3 brands — EHD reflective foil sarking — scroll to view all</p>
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
              Side-by-side comparison of EHD reflective foil sarking products. Confirm NCC climate zone requirements and current specifications from manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Anti-glare</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">EHD</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">R-value contribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Width</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">NCC compliance</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.antiGlare === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700"><CheckCircle size={11} /> Yes</span>
                    ) : (
                      <span className="text-slate-400">{row.antiGlare}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.ehd === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700"><CheckCircle size={11} /> Yes</span>
                    ) : (
                      <span className="text-slate-400">{row.ehd}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.rValue}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.width}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.nccCompliant === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700"><CheckCircle size={11} /> Yes</span>
                    ) : (
                      <span className="text-slate-400">{row.nccCompliant}</span>
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
