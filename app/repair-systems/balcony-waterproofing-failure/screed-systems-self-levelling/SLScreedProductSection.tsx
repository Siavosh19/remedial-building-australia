"use client";

import { useState } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, Ruler,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, FileText,
} from "lucide-react";

type Product = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: { name: string; url: string }[];
};

const EXTERNAL_PRODUCTS: Product[] = [
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-k-301-2/",
    accentColor: "#f97316",
    name: "ARDEX K 301",
    descriptionLine: "External self-levelling resurfacing and smoothing compound — 2–20mm single layer, up to 30mm with aggregate — confirmed for external balconies, patios, and courtyards — pre-membrane substrate preparation or exposed external wear surface",
    productType: "External confirmed — self-levelling resurfacing and smoothing compound",
    techChips: [
      { label: "External confirmed", cls: "bg-green-100 text-green-800" },
      { label: "UV and weather resistant", cls: "bg-green-50 text-green-700" },
      { label: "2–20mm single layer", cls: "bg-slate-100 text-slate-700" },
      { label: "Up to 30mm with aggregate", cls: "bg-slate-100 text-slate-700" },
      { label: "Falls possible with aggregate", cls: "bg-amber-50 text-amber-700" },
      { label: "Pre-membrane substrate prep", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription: `ARDEX K 301 is ARDEX Australia's confirmed external self-levelling resurfacing and smoothing compound — the only self-levelling compound in the ARDEX Australian range specifically confirmed for external use on balconies, patios, courtyards, domestic driveways, and garages. Unlike ARDEX K 15 Microtec (which is internal only), K 301 is formulated to resist UV, rain, heat, cold, and the moisture cycling conditions of exposed external concrete surfaces.

In balcony waterproofing remediation, K 301 serves a specific pre-membrane role: smoothing, resurfacing, and filling depressions on damaged, rough, or uneven concrete slabs before primer and waterproofing membrane are applied. It is not applied over a waterproofing membrane — the membrane always goes above K 301, not below.

Applied from 2mm to 20mm in a single application. For thicknesses from 10–30mm, mix with an equal volume of 2–5mm aggregate — the aggregate reduces the self-levelling effect, which means minor falls (minimal grade) can be set into the surface with an aggregate mix. K 301 is not a falls correction screed for significant drainage gradients — for major falls correction, specify ARDEX A 38 or A 48.

For external wet areas (balconies) where tiles will be applied, ARDEX confirms the sequence: K 301 → waterproofing membrane → tile adhesive → tiles. K 301 can also be left as an exposed wear surface on lightly trafficked external areas such as courtyards, footpaths, and domestic garages — in these applications no membrane or tile is required.

Walkable after 2–3 hours at 20°C. Ready for tiling, waterproofing, or coating after 24 hours at 23°C / 50% RH. Ready for light rubber-wheeled traffic after 48 hours.`,
    technicalProperties: [
      "External confirmed — UV and weather resistant — formulated for external concrete surfaces",
      "Applied 2–20mm in a single application — up to 30mm with equal volume aggregate (2–5mm) added to mix",
      "Aggregate mix reduces self-levelling effect — allows minimal fall to be set into surface",
      "Fast setting — walkable 2–3 hours — ready for tiles, waterproofing or coating after 24 hours",
      "Ready for light rubber-wheeled traffic after 48 hours",
      "Can be left as an exposed wear surface on lightly trafficked external areas without tile or membrane",
      "For external balcony tiling: K 301 must be followed by waterproofing membrane then tile adhesive and tiles",
      "Confirmed for use on balconies, patios, courtyards, footpaths, domestic driveways, and garages",
      "Compatible with ARDEX A 38 screed substrates — confirmed for use over A 38 screed surface",
    ],
    limitations: [
      "Not a falls correction screed for significant drainage gradients — use ARDEX A 38, A 48, or Mapecem Pronto for major falls correction",
      "Must not be applied over a waterproofing membrane — always pre-membrane only",
      "Not confirmed for areas of intensive abrasive use in wet conditions (as exposed surface)",
      "Not for heavy-duty industrial floors, public highways, or traffic with solid or metal wheels",
      "For external balcony wet areas: waterproofing membrane and tile finish must be applied above — K 301 alone is not a waterproofing system",
      "Confirm minimum cure time and moisture check before applying primer and membrane above",
      "Confirm current product specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "MJS Floorcoverings", url: "https://mjsfloorcoverings.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-lq-92/",
    accentColor: "#f97316",
    name: "ARDEX LQ 92",
    descriptionLine: "Cement-based self-levelling undertile levelling compound — feather edge to 25mm — external use only with waterproofing membrane and tile finish above — not a standalone external surface",
    productType: "External confirmed — cement-based undertile levelling compound — with membrane and tile system above",
    techChips: [
      { label: "External — with membrane + tile above", cls: "bg-green-100 text-green-800" },
      { label: "Feather edge to 25mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-membrane substrate prep", cls: "bg-sky-50 text-sky-700" },
      { label: "Membrane and tile mandatory above", cls: "bg-amber-100 text-amber-800" },
      { label: "Not an exposed surface", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription: `ARDEX LQ 92 is a cement-based self-levelling and self-smoothing compound for levelling uneven concrete floors prior to tiling. In external balcony applications, ARDEX specifically confirms that LQ 92 MUST be protected with a waterproofing membrane and tile finish installed above it — it cannot be used as an exposed external surface and is not a standalone external levelling compound in the same sense as ARDEX K 301.

This is an important distinction: LQ 92 is appropriate for external balcony use only when the system sequence above it is confirmed — waterproofing membrane and tiles above, concrete substrate below. In this role it is a useful pre-membrane levelling compound for smoothing uneven balcony slabs to a thin, consistent surface before the waterproofing system is applied.

Applied from a feather edge to 25mm in a single application. Greater thicknesses can be achieved with multiple layers or by adding aggregate to the mix. Not recommended for use under vinyl floor coverings. For large area levelling applications, ARDEX references K 301 and LQ 92 as the appropriate external products — not K 15 Microtec or other Ardurapid-based internal compounds.

Applied as a pourable, free-flowing self-smoothing compound. Suitable for concrete substrates. Confirm primer type and minimum cure time before applying waterproofing primer and membrane above.`,
    technicalProperties: [
      "Cement-based self-levelling and self-smoothing compound — pourable and free-flowing",
      "Application: feather edge to 25mm single application — greater thicknesses with multiple layers or aggregate addition",
      "For external balcony use: must be protected with waterproofing membrane and tile finish above — not an exposed external surface",
      "Suitable for levelling concrete substrates prior to waterproofing and tiling on external balconies",
      "Not recommended for use under vinyl floor coverings",
      "Confirmed for external use when full system (membrane + tile) is applied above",
    ],
    limitations: [
      "External use requires waterproofing membrane and tile finish above — LQ 92 alone is not an external wear surface — do not leave exposed",
      "Not a falls correction screed — cannot reliably create drainage falls — use ARDEX A 38 or A 48 where significant falls correction is required",
      "Must not be applied over a waterproofing membrane — pre-membrane substrate preparation only",
      "Not recommended under vinyl floor coverings",
      "Do not confuse with ARDEX K 301 — K 301 can be left as an exposed external surface — LQ 92 cannot",
      "Confirm primer type and curing time with ARDEX technical before applying membrane above",
      "Confirm current product specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
];

const INTERNAL_PRODUCTS: Product[] = [
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-k-15-microtec/",
    accentColor: "#dc2626",
    name: "ARDEX K 15 Microtec",
    descriptionLine: "INTERNAL USE ONLY — not suitable for external balcony or terrace applications — rapid-drying self-levelling and smoothing compound for internal subfloor preparation only",
    productType: "INTERNAL USE ONLY — NOT FOR EXTERNAL BALCONY USE",
    techChips: [
      { label: "INTERNAL ONLY", cls: "bg-red-100 text-red-800 font-extrabold" },
      { label: "Not for external balconies", cls: "bg-red-50 text-red-700" },
      { label: "Ardurapid technology", cls: "bg-slate-100 text-slate-700" },
      { label: "Rapid-drying", cls: "bg-slate-100 text-slate-700" },
      { label: "Floor covering in 16–18 hours", cls: "bg-slate-100 text-slate-700" },
      { label: "Microfibre reinforced", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: `ARDEX K 15 Microtec is ARDEX Australia's primary internal rapid-drying self-levelling smoothing compound, using ARDEX Ardurapid technology for fast strength gain and drying — floor coverings can be installed in as little as 16–18 hours. It is microfibre reinforced for improved crack resistance and flexibility on internal subfloors.

K 15 Microtec is listed here solely to clarify that it must not be used on external balconies. It is an internal product only. Ardurapid technology is not designed for UV exposure, external moisture cycling, or freeze-thaw conditions. Specifying K 15 on an external balcony — even under a waterproofing membrane — risks long-term compound failure as the Ardurapid binder is not formulated for permanently wet or UV-exposed conditions.

For external balcony substrate preparation: use ARDEX K 301 or ARDEX LQ 92 (with membrane and tile above). For internal wet area substrate preparation: K 15 Microtec is appropriate.`,
    technicalProperties: [
      "Internal use only — Ardurapid technology — not confirmed for external use",
      "Rapid-drying — floor coverings in 16–18 hours at any depth",
      "Microfibre reinforced — improved crack resistance on internal subfloors",
      "Self-levelling — high flow — feather edge capability",
      "Suitable for a wide range of internal substrates",
    ],
    limitations: [
      "INTERNAL USE ONLY — must not be used on external balconies or terraces under any circumstances",
      "Do not use under external waterproofing membranes on balcony and terrace applications — Ardurapid binder is not confirmed for permanently wet or UV-exposed conditions",
      "For external balcony use, specify ARDEX K 301 or ARDEX LQ 92 (with full membrane and tile system above) instead",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/ultraplan-eco",
    accentColor: "#dc2626",
    name: "Mapei Ultraplan Eco",
    descriptionLine: "INTERNAL USE ONLY — not suitable for external balcony or terrace applications — ultra-fast hardening self-levelling smoothing compound for interior floor preparation only",
    productType: "INTERNAL USE ONLY — NOT FOR EXTERNAL BALCONY USE",
    techChips: [
      { label: "INTERNAL ONLY", cls: "bg-red-100 text-red-800 font-extrabold" },
      { label: "Not for external balconies", cls: "bg-red-50 text-red-700" },
      { label: "Ultra-fast hardening", cls: "bg-slate-100 text-slate-700" },
      { label: "1–10mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Low VOC", cls: "bg-green-50 text-green-700" },
      { label: "Interior floors only", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: `Mapei Ultraplan Eco is Mapei Australia's ultra-fast hardening self-levelling smoothing compound for interior floor preparation — 1–10mm application depth, pot life 20–30 minutes, light foot traffic after 3 hours, floor coverings after 12 hours. EMICODE EC1 certified — very low VOC.

Ultraplan Eco is listed here solely to clarify that it is for interior use only. The Mapei TDS confirms: interior levelling of new and existing substrates, as long as not subject to moisture. This explicitly excludes external balcony applications where moisture, UV, and drainage are standard conditions.

The broader Mapei Ultraplan range — including Ultraplan, Ultraplan Maxi, Ultraplan Trade, and Ultraplan Contract — are all interior products. None of these should be specified on external balconies. For external balcony substrate preparation, confirm with Mapei Australia which products are approved for external pre-membrane use before specifying.`,
    technicalProperties: [
      "Interior use only — not confirmed for external or moisture-subject applications",
      "Ultra-fast hardening — 1–10mm per layer — pot life 20–30 minutes",
      "Floor coverings after 12 hours — light foot traffic after 3 hours",
      "EMICODE EC1 — very low VOC",
      "Applied by trowel, squeegee, or pump",
    ],
    limitations: [
      "INTERIOR USE ONLY — must not be used on external balconies or terraces — confirmed by Mapei TDS: not subject to moisture",
      "Do not use under external waterproofing membranes on balcony and terrace applications",
      "The entire Ultraplan range (Eco, Maxi, Trade, Contract) is for interior use — do not assume any variant is external-rated without confirming with Mapei Australia",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  externalConfirmed: string;
  isExternal: boolean;
  applicationRange: string;
  fallsPossible: string;
  systemPosition: string;
  keyRestriction: string;
}[] = [
  {
    product: "K 301",
    brand: "ARDEX",
    externalConfirmed: "Yes",
    isExternal: true,
    applicationRange: "2–20mm / up to 30mm with aggregate",
    fallsPossible: "Minimal with aggregate mix",
    systemPosition: "Pre-membrane substrate prep — or exposed external wear surface",
    keyRestriction: "Not over membrane — not a falls correction screed for major gradients",
  },
  {
    product: "LQ 92",
    brand: "ARDEX",
    externalConfirmed: "Yes — with membrane and tile above only",
    isExternal: true,
    applicationRange: "Feather edge to 25mm",
    fallsPossible: "No",
    systemPosition: "Pre-membrane substrate prep — must have membrane and tile above",
    keyRestriction: "Not an exposed external surface — membrane and tiles mandatory above",
  },
  {
    product: "K 15 Microtec",
    brand: "ARDEX",
    externalConfirmed: "NO — internal only",
    isExternal: false,
    applicationRange: "0–30mm",
    fallsPossible: "No",
    systemPosition: "Internal subfloor prep only",
    keyRestriction: "MUST NOT be used on external balconies",
  },
  {
    product: "Ultraplan Eco",
    brand: "Mapei",
    externalConfirmed: "NO — internal only",
    isExternal: false,
    applicationRange: "1–10mm",
    fallsPossible: "No",
    systemPosition: "Internal subfloor prep only",
    keyRestriction: "MUST NOT be used on external balconies",
  },
];

const TECH_INFO = {
  whenToUse: [
    "The existing concrete slab is structurally sound but has a rough, honeycombed, or damaged surface that must be smoothed before the waterproofing membrane is applied",
    "Minor depressions or surface defects need to be filled before priming and membrane application",
    "The slab is close to the required fall level and only a thin smoothing layer (2–20mm) is needed — not a full falls correction screed",
  ],
  whenNotToUse: [
    "When the slab has significant incorrect falls requiring 30mm+ correction across the full area — use A 38, A 48, or Mapecem Pronto instead",
    "When the product is not confirmed for external use — do not use internal compounds (K 15, Ultraplan Eco, Ultraplan Maxi) in any external balcony application",
    "When the self-levelling compound will be applied over a cured waterproofing membrane — this is not an approved system position",
  ],
  systemSequence: [
    "1 — Mechanical preparation of existing concrete slab",
    "2 — Structural crack and defect repair",
    "3 — Self-levelling compound (external grade only) where required for surface smoothing and minor depression fill",
    "4 — Allow screed to cure — moisture check before proceeding",
    "5 — Apply primer — confirm primer type for screed substrate",
    "6 — Apply waterproofing membrane",
    "7 — Apply tile adhesive",
    "8 — Fix tiles",
  ],
  fallsRequirement: [
    "AS 3740 requires minimum 1:100 fall to floor waste — self-levelling compounds cannot reliably create this fall over a full balcony",
    "Where significant falls correction is required, specify a polymer-modified screed system (ARDEX A 38, A 48, Mapecem Pronto) — not a self-levelling compound",
    "ARDEX K 301 mixed with aggregate can achieve a minimal grade — but this is not a substitute for a full falls correction screed where 1:100+ gradients are required across the full area",
    "Confirm falls adequacy by level survey before specifying product type — if the slab already has adequate fall and only surface smoothing is needed, a self-levelling compound is appropriate",
  ],
};

function TechCard({
  icon,
  title,
  items,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn" | "numbered";
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
            {style === "numbered" && <span className="mt-0 shrink-0 text-[10px] font-extrabold text-sky-950" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
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
        <p
          className={`mt-0.5 text-[10px] font-bold uppercase tracking-wider ${
            product.accentColor === "#dc2626" ? "text-red-700" : "text-red-700"
          }`}
        >
          {product.productType}
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{product.descriptionLine}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
        {product.techChips.map((chip) => (
          <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
            {chip.label}
          </span>
        ))}
      </div>

      <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
        <p className="whitespace-pre-line text-xs leading-6 text-slate-700">{product.systemDescription}</p>
      </div>

      <div className="space-y-3 px-5 py-4">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
          <ul className="space-y-1.5">
            {product.technicalProperties.map((prop, i) => (
              <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
                {prop}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
          <ul className="space-y-1.5">
            {product.limitations.map((lim, i) => (
              <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
                {lim}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
        <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <div className="space-y-2">
          {product.procurementSources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
              >
                {src.name}
                <ExternalLink size={9} className="text-slate-300" />
              </a>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] italic text-slate-400">
          Confirm suitability with the current manufacturer TDS before specifying or applying.
        </p>
      </div>
    </div>
  );
}

export function SLScreedProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      {/* ── System Technical Reference Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Internal vs external, system position, falls limitations, approved sequence, substrate requirements
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <TechCard
                icon={<CheckCircle size={15} />}
                title="When to Use a Self-Levelling Screed on a Balcony"
                items={TECH_INFO.whenToUse}
                style="check"
              />
              <TechCard
                icon={<AlertTriangle size={15} />}
                title="When NOT to Use a Self-Levelling Screed on a Balcony"
                items={TECH_INFO.whenNotToUse}
                style="warn"
              />
              <TechCard
                icon={<Layers size={15} />}
                title="Correct System Sequence"
                items={TECH_INFO.systemSequence}
                style="bullet"
              />
              <TechCard
                icon={<Ruler size={15} />}
                title="Falls Requirement — AS 3740"
                items={TECH_INFO.fallsRequirement}
                style="bullet"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Reference — External confirmed ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">
              3 products — 2 brands — external confirmed self-levelling compounds only — internal compounds excluded
            </p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {EXTERNAL_PRODUCTS.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>

      {/* ── Internal-only section ── */}
      <div>
        <div className="mb-5 flex items-center gap-4 rounded-2xl border border-red-300 bg-red-50 px-6 py-4">
          <div className="h-5 w-1 shrink-0 rounded-full bg-red-600" />
          <div>
            <p className="text-sm font-extrabold text-red-800">Internal-only products — not suitable for external balcony use — listed for reference and clarification only</p>
            <p className="mt-0.5 text-xs font-semibold text-red-700">
              These products must not be specified on external balconies under any circumstances — included here to prevent misspecification
            </p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {INTERNAL_PRODUCTS.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Self-levelling screed system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              External confirmed vs internal-only products — confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">External confirmed</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Falls possible</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Position in system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr
                  key={row.product}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} ${!row.isExternal ? "opacity-80" : ""}`}
                >
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.isExternal ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> {row.externalConfirmed}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-extrabold text-red-700">
                        <XCircle size={11} /> {row.externalConfirmed}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.applicationRange}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fallsPossible}</td>
                  <td className="px-4 py-3 text-slate-600">{row.systemPosition}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Critical callout boxes ── */}
      <div className="space-y-4">
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-amber-800">Critical Distinction — Internal vs External</p>
          <p className="text-sm leading-7 text-amber-900">
            Not every self-levelling screed can be used on external balconies. The majority of self-levelling compounds — including ARDEX K 15 Microtec and the Mapei Ultraplan range — are formulated for internal use only. These products use Ardurapid or similar fast-hardening binder technology that is not designed for UV exposure, freeze-thaw cycling, or external moisture conditions. Using an internal self-levelling compound on an external balcony — even under a waterproofing membrane — risks long-term failure of the compound layer.
          </p>
          <p className="mt-3 text-sm leading-7 text-amber-900">
            Only self-levelling compounds specifically confirmed by the manufacturer for external use should be specified on balcony and terrace applications. On this page, only externally confirmed products are listed.
          </p>
        </div>
        <div className="rounded-xl border-l-4 border-red-500 bg-red-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-red-800">Self-Levelling Screeds Cannot Be Applied Over Waterproofing Membranes</p>
          <p className="text-sm leading-7 text-red-900">
            ARDEX Technical Bulletin TB243 (confirmed 2024) states explicitly: self-levelling cements are not suitable for application over waterproofing membranes. They may be applied to prepared concrete substrates and subsequently protected by an applied membrane. This means the sequence is always:
          </p>
          <p className="mt-3 text-sm font-bold leading-7 text-red-900">
            concrete substrate → self-levelling screed (where required) → prime → waterproofing membrane → tile adhesive → tiles.
          </p>
          <p className="mt-3 text-sm leading-7 text-red-900">
            A self-levelling compound placed over a cured liquid-applied membrane is not an approved system in standard ARDEX and Mapei waterproofing specifications.
          </p>
        </div>
        <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-sky-800">Self-Levelling Compounds Cannot Create Significant Falls</p>
          <p className="text-sm leading-7 text-sky-900">
            Standard self-levelling compounds flow to level by design — they do not reliably create drainage falls. Some products (ARDEX K 301) can be mixed with aggregate to reduce the self-levelling effect and achieve a minimal fall, but for significant falls correction across a full balcony, a polymer-modified screed (ARDEX A 38, A 48, Mapecem Pronto) is the correct product — not a self-levelling compound.
          </p>
        </div>
      </div>
    </>
  );
}
