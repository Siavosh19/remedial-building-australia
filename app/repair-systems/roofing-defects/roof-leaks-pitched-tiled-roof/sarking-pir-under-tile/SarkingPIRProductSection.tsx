"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "PIR"
  | "Phenolic"
  | "High-R-value"
  | "Foil-faced"
  | "Kingspan"
  | "Recticel"
  | "Celotex"
  | "Under-tile";

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
    fullLabel: "Kingspan",
    brandUrl: "https://www.kingspan.com/au",
    tdsUrl: "https://www.kingspan.com/au",
    accentColor: "#78350f",
    name: "Kingspan Kooltherm K107 Pitched Roof Board",
    descriptionLine: "High-performance phenolic rigid foam insulation board for under-tile application — between and under rafters — very high R-value per mm — foil-faced — Australian supply",
    productType: "PIR / phenolic insulation board — under-tile — AS/NZS 4859",
    filterTags: ["PIR", "Phenolic", "High-R-value", "Foil-faced", "Kingspan", "Under-tile"],
    techChips: [
      { label: "Phenolic rigid foam", cls: "bg-amber-100 text-amber-800" },
      { label: "High R-value per mm", cls: "bg-green-100 text-green-800" },
      { label: "Foil-faced", cls: "bg-slate-100 text-slate-700" },
      { label: "Kingspan", cls: "bg-slate-100 text-slate-700" },
      { label: "Under-tile", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Kingspan Kooltherm K107 is Kingspan's high-performance phenolic rigid foam insulation board specifically designed for pitched roof applications including under-tile and between-rafter insulation. Phenolic foam achieves a significantly higher R-value per mm of thickness than PIR (polyisocyanurate), EPS (expanded polystyrene), or glasswool batts — this makes K107 the preferred product where maximum thermal performance is required within a constrained thickness, such as where the rafter depth limits available insulation space. Both faces are foil-faced for radiant heat reflection. The product is available in Australia through Kingspan's local supply chain. Confirm the specific R-value per 50mm (or per nominated thickness), NCC compliance, and current Australian availability from the Kingspan Australia technical team before specifying K107 on a pitched tiled roof project. Confirm whether the nominated thickness is compatible with the available rafter depth and tile batten clearance on the specific roof.",
    technicalProperties: [
      "Phenolic rigid foam — highest R-value per mm of common under-tile insulation board products",
      "Foil-faced both surfaces — reflective radiant heat barrier",
      "Designed for between-rafter and under-tile application on pitched roofs",
      "AS/NZS 4859 compliant — confirm from current Kingspan TDS",
      "Australian supply — confirm current distributor and availability with Kingspan Australia",
      "Kingspan — international insulation board manufacturer with Australian operations",
    ],
    limitations: [
      "Phenolic foam is more expensive per m² than PIR, EPS, or glasswool — confirm cost-benefit against the project's NCC R-value requirement",
      "Rigid board — must be cut to fit between rafters — requires accurate measurement and a clean cutting method — phenolic foam generates dust during cutting — use appropriate respiratory protection",
      "Confirm available rafter depth and tile batten clearance before specifying board thickness — if the board is too thick it will not fit within the available space without modifying the batten height",
      "Confirm ventilation above the PIR/phenolic board and below the tile course — the sarking and batten arrangement must allow adequate air movement to prevent moisture accumulation",
      "Confirm current Kingspan K107 product availability, R-value, and NCC compliance with Kingspan Australia before specifying",
    ],
    procurementSources: [
      { name: "Kingspan Australia — kingspan.com/au", url: "https://www.kingspan.com/au" },
      { name: "Roofing and insulation trade suppliers", url: "https://www.kingspan.com/au" },
    ],
  },
  {
    fullLabel: "Recticel",
    brandUrl: "https://www.recticel.com/en-AU",
    tdsUrl: "https://www.recticel.com/en-AU",
    accentColor: "#0369a1",
    name: "Recticel Eurothane GP",
    descriptionLine: "Polyisocyanurate (PIR) rigid foam board — foil-faced both sides — for under-tile pitched roof upgrade applications — Recticel",
    productType: "PIR insulation board — foil-faced — under-tile — AS/NZS 4859",
    filterTags: ["PIR", "Foil-faced", "Recticel", "Under-tile"],
    techChips: [
      { label: "PIR rigid foam", cls: "bg-sky-100 text-sky-800" },
      { label: "Foil-faced both sides", cls: "bg-slate-100 text-slate-700" },
      { label: "Recticel", cls: "bg-slate-100 text-slate-700" },
      { label: "Under-tile", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Recticel Eurothane GP is a polyisocyanurate (PIR) rigid foam insulation board from Recticel, foil-faced on both sides, used in pitched roof upgrade and thermal improvement applications including under-tile installation between rafters. PIR achieves a higher R-value per mm than EPS or glasswool but is generally lower than phenolic foam (such as Kingspan Kooltherm). Eurothane GP is used where a cost-effective rigid board solution is required for improved thermal performance under a tiled roof, and where the full performance premium of phenolic foam is not required or cannot be justified on cost grounds. Confirm current Recticel Eurothane GP specifications, R-value per nominated thickness, AS/NZS 4859 compliance, NCC climate zone applicability, and Australian distribution availability from Recticel before specifying.",
    technicalProperties: [
      "PIR (polyisocyanurate) rigid foam — foil-faced both sides",
      "Higher R-value per mm than EPS or glasswool — lower than phenolic foam",
      "Suitable for under-tile and between-rafter installation on pitched roofs",
      "AS/NZS 4859 compliant — confirm from current Recticel TDS",
      "Recticel — European rigid insulation board manufacturer with Australian distribution",
    ],
    limitations: [
      "Confirm Australian distribution availability and current stock with Recticel before specifying — Recticel is primarily a European manufacturer and Australian availability may be subject to lead times",
      "Confirm R-value per nominated thickness and NCC compliance from current Recticel Eurothane GP TDS",
      "Rigid board — same cutting and installation constraints as Kingspan K107 — confirm rafter depth and batten clearance",
      "Confirm ventilation above PIR board and below tile course — the installation must maintain adequate air movement",
      "PIR is combustible — confirm fire rating requirements with the building certifier before specifying in a fire-rated roof assembly",
    ],
    procurementSources: [
      { name: "Recticel — recticel.com/en-AU", url: "https://www.recticel.com/en-AU" },
      { name: "Insulation trade suppliers — confirm Australian distribution", url: "https://www.recticel.com/en-AU" },
    ],
  },
  {
    fullLabel: "Celotex",
    brandUrl: "https://www.celotex.co.uk",
    tdsUrl: "https://www.celotex.co.uk",
    accentColor: "#16a34a",
    name: "Celotex RS5000",
    descriptionLine: "PIR insulation board by Celotex — foil-faced — for pitched roof upgrade and sarking applications — TODO: confirm Australian distribution availability",
    productType: "PIR insulation board — foil-faced — under-tile",
    filterTags: ["PIR", "Foil-faced", "Celotex", "Under-tile"],
    techChips: [
      { label: "PIR rigid foam", cls: "bg-green-100 text-green-800" },
      { label: "Foil-faced", cls: "bg-slate-100 text-slate-700" },
      { label: "Celotex", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO — confirm AU distribution", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Celotex RS5000 is a PIR (polyisocyanurate) insulation board from Celotex, a UK-based rigid insulation manufacturer. It is a foil-faced rigid PIR board used in pitched roof upgrade applications including rafter-level insulation. This product is listed as a reference — the owner must confirm whether Celotex RS5000 is currently available through Australian distribution before specifying it on an Australian project. If Australian distribution is confirmed, the RS5000 provides a PIR board alternative to Recticel Eurothane GP in the same application category. If Australian distribution cannot be confirmed, specify Recticel Eurothane GP or Kingspan Kooltherm K107 instead. Do not specify Celotex RS5000 on an Australian project without first confirming current Australian availability, pricing, lead times, and NCC compliance from the Australian distributor.",
    technicalProperties: [
      "PIR rigid foam — foil-faced both sides",
      "Pitched roof upgrade and rafter-level insulation application",
      "Celotex — UK-based rigid insulation manufacturer",
      "TODO — confirm Australian distribution availability, R-value, and NCC compliance before specifying",
    ],
    limitations: [
      "TODO — Australian distribution availability must be confirmed before this product is specified on any Australian project",
      "If Australian distribution cannot be confirmed, use Recticel Eurothane GP or Kingspan Kooltherm K107 instead",
      "UK product — NCC climate zone compliance must be confirmed with the Australian distributor",
      "Confirm R-value per nominated thickness, NCC compliance, and current product specifications from the Australian distributor before specifying",
    ],
    procurementSources: [
      { name: "Celotex — celotex.co.uk — confirm Australian distribution before ordering", url: "https://www.celotex.co.uk" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "PIR", label: "PIR" },
  { id: "Kingspan", label: "Kingspan" },
  { id: "Recticel", label: "Recticel" },
  { id: "High-R-value", label: "High R-value" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Kooltherm K107",
    brand: "Kingspan",
    foamType: "Phenolic",
    rValuePer50mm: "Confirm TDS — highest",
    foilFaced: "Yes — both sides",
    underTile: "Yes",
    australianSupply: "Yes",
  },
  {
    product: "Eurothane GP",
    brand: "Recticel",
    foamType: "PIR",
    rValuePer50mm: "Confirm TDS",
    foilFaced: "Yes — both sides",
    underTile: "Yes",
    australianSupply: "Confirm with Recticel",
  },
  {
    product: "RS5000",
    brand: "Celotex",
    foamType: "PIR",
    rValuePer50mm: "Confirm TDS",
    foilFaced: "Yes — both sides",
    underTile: "Yes",
    australianSupply: "TODO — confirm distribution",
  },
];

const TECH_INFO = [
  {
    title: "PIR vs EPS and Glasswool",
    style: "bullet" as const,
    items: [
      "PIR (polyisocyanurate) rigid foam achieves a higher R-value per mm than EPS (expanded polystyrene) or glasswool batts — at 50mm thickness, PIR typically achieves R2.2–R2.5 depending on product, compared to approximately R1.25 for 50mm EPS and R1.3 for 50mm glasswool",
      "Phenolic foam (Kingspan Kooltherm) achieves an even higher R-value per mm than PIR — at 50mm, Kooltherm K107 typically achieves approximately R2.8–R3.0 — confirm from current TDS",
      "The higher R-value per mm of PIR and phenolic boards is particularly important where rafter depth limits the available insulation thickness",
      "EPS and glasswool are not rigid boards — they are not used in the between-rafter rigid board application described on this page — they are ceiling-level batt products",
    ],
  },
  {
    title: "Thermal Bridging",
    style: "warn" as const,
    items: [
      "Rigid boards installed between rafters only provide insulation between the rafters — the rafter timbers themselves are not insulated and act as thermal bridges — heat flows through the rafter at the full rafter depth without insulation",
      "To reduce thermal bridging, a continuous layer of insulation board can be installed across the rafters (below the battens) as well as between them — this is called a two-layer installation",
      "Thermal bridging through rafters can significantly reduce the effective R-value of the insulation layer — confirm the effective whole-assembly R-value with the insulation manufacturer for the specific installation configuration",
      "NCC R-value requirements are for the whole assembly, not just the insulation product — confirm the required whole-assembly R-value with the building certifier",
    ],
  },
  {
    title: "NCC R-Value Requirements",
    style: "check" as const,
    items: [
      "NCC climate zone R-value requirements for roof assemblies vary by climate zone — confirm the required ceiling or roof R-value for the project climate zone from the current NCC",
      "The required R-value applies to the total insulation assembly — not to the insulation product alone — confirm the installation configuration required to achieve the target R-value",
      "Where existing ceiling insulation (glasswool batts below the ceiling) already contributes to the total R-value, confirm whether additional under-tile board insulation is required to meet the NCC target for the climate zone",
      "Confirm NCC R-value and compliance requirements with the building certifier before specifying PIR board thickness",
    ],
  },
  {
    title: "Ventilation Above PIR Board",
    style: "check" as const,
    items: [
      "When PIR or phenolic boards are installed between or below rafters on a pitched tiled roof, a ventilated air space must be maintained between the top of the insulation board and the underside of the sarking or tile — this air space allows moisture vapour to escape and prevents condensation within the roof assembly",
      "The minimum air space dimension is specified in AS 4200 and in the manufacturer installation guides — confirm from the current TDS and NCC",
      "If the board is installed tight to the sarking without an air space, moisture can accumulate and cause timber decay in the rafters and battens",
      "Confirm the ventilation gap requirement with the insulation board manufacturer and the building certifier before finalising the installation configuration",
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

export function SarkingPIRIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are PIR under-tile insulation board systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          PIR (polyisocyanurate) under-tile insulation board systems are rigid foam boards installed between or below the rafters of a pitched tiled roof to provide high-performance thermal insulation. PIR boards achieve a significantly higher R-value per mm than traditional glasswool or EPS insulation, making them particularly valuable where rafter depth or available roof space limits the insulation thickness that can be installed without modifying the roof structure or tile level. Kingspan Kooltherm K107 (phenolic foam) and Recticel Eurothane GP (PIR) are the primary products in this category.
        </p>
        {expanded && (
          <>
            <p>
              Under-tile PIR board insulation is distinct from reflective foil sarking — sarking is a thin flexible membrane that provides a secondary weather barrier and modest radiant heat benefit, whereas PIR boards provide substantial thermal insulation resistance (R-value) in a rigid board format. PIR boards are also distinct from ceiling-level glasswool batts, which are installed below the ceiling rather than at rafter level and do not address the roof space thermal performance in the same way.
            </p>
            <p>
              Installation of under-tile PIR boards requires removal of the tile course to access the rafters — the boards are installed between the rafters and/or across the rafters before the battens and tiles are re-laid. This makes under-tile PIR board insulation a significant scope item typically combined with full or partial re-tiling, not a standalone retrofit item.
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

export function SarkingPIRProductSection() {
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
              PIR vs EPS/glasswool, thermal bridging, NCC R-value requirements, ventilation above board
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — PIR under-tile insulation boards — scroll to view all</p>
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
              Side-by-side comparison of PIR under-tile insulation board products. Confirm R-value, NCC climate zone requirements, and Australian supply before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Foam type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">R-value per 50mm</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Foil-faced</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Under-tile use</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Australian supply</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.foamType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.rValuePer50mm}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.foilFaced.startsWith("Yes") ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700"><CheckCircle size={11} /> {row.foilFaced}</span>
                    ) : (
                      <span className="text-slate-400">{row.foilFaced}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.underTile === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700"><CheckCircle size={11} /> Yes</span>
                    ) : (
                      <span className="text-slate-400">{row.underTile}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.australianSupply}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
