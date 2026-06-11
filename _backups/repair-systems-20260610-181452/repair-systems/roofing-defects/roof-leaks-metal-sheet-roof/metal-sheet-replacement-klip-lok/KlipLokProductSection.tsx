"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag =
  | "Lysaght"
  | "Colorbond"
  | "Concealed-fix"
  | "Low-pitch"
  | "700mm-cover";

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
  procurementSources: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Lysaght — BlueScope Steel",
    brandUrl: "https://www.lysaght.com",
    tdsUrl: "https://www.lysaght.com/products/roofing-and-walling/klip-lok-700",
    accentColor: "#0369a1",
    name: "Lysaght Klip-Lok 700",
    descriptionLine:
      "Concealed-fix standing seam Colorbond steel sheet; 700mm cover width; clip-fixed; minimum 1° pitch; AS 1562.1 compliant",
    productType: "Concealed-fix steel sheet — 700mm cover — AS 1562.1",
    filterTags: ["Lysaght", "Colorbond", "Concealed-fix", "Low-pitch", "700mm-cover"],
    techChips: [
      { label: "Lysaght", cls: "bg-sky-100 text-sky-800" },
      { label: "Colorbond steel", cls: "bg-sky-50 text-sky-700" },
      { label: "700mm cover", cls: "bg-green-50 text-green-700" },
      { label: "Concealed fix", cls: "bg-purple-50 text-purple-700" },
      { label: "Min pitch 1°", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght Klip-Lok 700 is Australia's most widely used concealed-fix steel roofing sheet on Class 2 strata and commercial buildings. The 700mm cover width profile is fixed using Lysaght-supplied concealed clips that slide over the standing rib and are screwed into the purlin — no through-fasteners penetrate the face of the sheet in the field. This eliminates screw hole leak paths and enables the sheet to accommodate thermal movement along its length. The 1° minimum pitch makes Klip-Lok 700 suitable for near-flat commercial roof applications where through-fixed profiles cannot be used. The full Colorbond colour range is available.",
    technicalProperties: [
      "Cover width: 700mm per sheet",
      "Fixing: concealed clip system — no through-fasteners in sheet field",
      "Minimum pitch: 1° (confirmed against AS 1562.1 and Lysaght TDS)",
      "BMT: 0.42mm, 0.48mm standard; 0.60mm and 0.70mm available",
      "Substrate: BlueScope Colorbond steel — full Colorbond colour range",
      "Clips: Lysaght-supplied concealed clips; clip type selected to suit purlin spacing and wind classification",
      "Thermal movement: sheet floats on clips — provision for expansion/contraction over long runs required",
      "AS 1562.1 compliant — span and wind uplift tables in Lysaght TDS",
    ],
    limitations: [
      "Concealed-fix system requires trained installer — incorrect clip installation is a common defect source",
      "Cannot be walked on without duckboards — rib deformation compromises clip engagement",
      "Clip and sheet must be Lysaght-supplied and matched — third-party clips are not warranted",
      "Existing purlin spacing must suit the Klip-Lok clip pattern — confirm before specifying replacement",
      "End laps require specific Lysaght-approved detailing — not same as through-fixed profiles",
      "Not interchangeable with Klip-Lok 406 (different cover width and clip system)",
    ],
    procurementSources:
      "Lysaght branches and authorised Lysaght distributors nationally. Clips and accessories must be ordered as a matched system through Lysaght.",
  },
  {
    fullLabel: "Lysaght — BlueScope Steel (legacy profile)",
    brandUrl: "https://www.lysaght.com",
    tdsUrl: "https://www.lysaght.com/products/roofing-and-walling",
    accentColor: "#64748b",
    name: "Lysaght Klip-Lok 406",
    descriptionLine:
      "Legacy concealed-fix Colorbond steel sheet; 406mm cover width; earlier generation clip system; available for replacement of existing 406 roofs",
    productType: "Concealed-fix steel sheet (legacy) — 406mm cover — AS 1562.1",
    filterTags: ["Lysaght", "Colorbond", "Concealed-fix"],
    techChips: [
      { label: "Lysaght", cls: "bg-sky-100 text-sky-800" },
      { label: "Colorbond steel", cls: "bg-sky-50 text-sky-700" },
      { label: "406mm cover", cls: "bg-slate-100 text-slate-700" },
      { label: "Legacy profile", cls: "bg-slate-50 text-slate-600" },
      { label: "Concealed fix", cls: "bg-purple-50 text-purple-700" },
    ],
    systemDescription:
      "Lysaght Klip-Lok 406 is the earlier-generation 406mm cover width concealed-fix profile that predates the Klip-Lok 700. It is found on Class 2 strata buildings constructed from the 1980s through early 2000s and is still available for replacement of existing 406 roofs. The narrower cover width means more sheets (and more clips) per roof area than Klip-Lok 700. Confirm current availability of Klip-Lok 406 sheet and compatible clips with Lysaght before specifying — the clip system differs from the 700 series and sheets are not interchangeable.",
    technicalProperties: [
      "Cover width: 406mm per sheet",
      "Fixing: concealed clip system — clips differ from Klip-Lok 700 series",
      "Substrate: BlueScope Colorbond steel — full Colorbond colour range",
      "BMT: 0.42mm standard; confirm additional options from Lysaght",
      "AS 1562.1 compliant — span tables in Lysaght TDS for 406 profile",
      "Suitable for replacement/matching work on existing 406 roofs only",
    ],
    limitations: [
      "Not interchangeable with Klip-Lok 700 — different cover width and clip system",
      "Confirm current availability with Lysaght before specifying — less commonly stocked than 700 series",
      "Clips for the 406 system must be sourced from Lysaght — legacy clip supply can be limited",
      "Where full roof replacement is required, transition to Klip-Lok 700 may be preferable — consult structural engineer and Lysaght",
    ],
    procurementSources:
      "Lysaght branches — confirm availability of 406 profile and compatible clips before ordering. Not all branches stock the 406 profile as standard.",
  },
  {
    fullLabel: "Stramit — Fletcher Building",
    brandUrl: "https://www.stramit.com.au",
    tdsUrl: "https://www.stramit.com.au/products/roofing",
    accentColor: "#15803d",
    name: "Stramit (concealed-fix equivalent)",
    descriptionLine:
      "Stramit concealed-fix standing seam Colorbond steel sheet — confirm current product name and clip system with Stramit before specifying",
    productType: "Concealed-fix steel sheet — confirm cover width from TDS",
    filterTags: ["Colorbond", "Concealed-fix"],
    techChips: [
      { label: "Stramit", cls: "bg-green-100 text-green-800" },
      { label: "Colorbond steel", cls: "bg-sky-50 text-sky-700" },
      { label: "Concealed fix", cls: "bg-purple-50 text-purple-700" },
      { label: "Confirm TDS", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stramit produces concealed-fix steel roofing sheets in Colorbond and Zincalume substrates. The product range and specific clip systems differ from Lysaght Klip-Lok and are not cross-compatible — confirm the current Stramit concealed-fix product name, cover width, clip system and span tables directly from the current Stramit TDS before specifying as a replacement. Stramit-supplied clips must be used with Stramit concealed-fix profiles.",
    technicalProperties: [
      "Substrate: BlueScope Colorbond steel — full Colorbond colour range",
      "Fixing: concealed clip system — Stramit-specific clips required",
      "AS 1562.1 compliant — confirm via current Stramit TDS",
      "Confirm cover width, rib height and minimum pitch from current Stramit TDS",
    ],
    limitations: [
      "Stramit concealed-fix clips are NOT compatible with Lysaght Klip-Lok clips — systems must not be mixed",
      "Confirm current product name and specifications from Stramit TDS — product naming subject to change",
      "Only suitable for replacement of existing Stramit concealed-fix roofs or new installations — not for replacing Lysaght Klip-Lok roofs",
    ],
    procurementSources:
      "Stramit branches nationally. Confirm concealed-fix product availability and clip supply at the local Stramit branch before specifying.",
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All products" },
  { id: "Lysaght", label: "Lysaght" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Concealed-fix", label: "Concealed fix" },
  { id: "Low-pitch", label: "Low pitch (1°)" },
  { id: "700mm-cover", label: "700mm cover" },
];

const BRAND_EQUIV = [
  {
    a: "Lysaght Klip-Lok 700",
    b: "Lysaght Klip-Lok 406",
    note: "Both are Lysaght concealed-fix profiles but with different cover widths (700mm vs 406mm) and different clip systems. NOT interchangeable — a 406 roof must be replaced with 406 or fully replaced with 700 (structural review required).",
  },
  {
    a: "Lysaght Klip-Lok 700",
    b: "Stramit (concealed-fix)",
    note: "Not directly interchangeable. Both are concealed-fix profiles using Colorbond steel, but clip systems are manufacturer-specific. Stramit concealed-fix products are for new or like-for-like replacement of Stramit concealed-fix roofs only.",
  },
];

const SYSTEM_COMPARISON = [
  {
    attribute: "Cover width",
    kliplok700: "700mm",
    kliplok406: "406mm",
    stramit: "Confirm from TDS",
  },
  {
    attribute: "Fixing type",
    kliplok700: "Concealed clip",
    kliplok406: "Concealed clip",
    stramit: "Concealed clip",
  },
  {
    attribute: "Clip compatibility",
    kliplok700: "Lysaght 700 clips only",
    kliplok406: "Lysaght 406 clips only",
    stramit: "Stramit clips only",
  },
  {
    attribute: "Min pitch",
    kliplok700: "1°",
    kliplok406: "1° (confirm TDS)",
    stramit: "Confirm TDS",
  },
  {
    attribute: "BMT standard",
    kliplok700: "0.42mm / 0.48mm",
    kliplok406: "0.42mm (confirm)",
    stramit: "Confirm TDS",
  },
  {
    attribute: "Substrate",
    kliplok700: "BlueScope Colorbond",
    kliplok406: "BlueScope Colorbond",
    stramit: "BlueScope Colorbond",
  },
  {
    attribute: "Through-fasteners",
    kliplok700: "None in field",
    kliplok406: "None in field",
    stramit: "None in field",
  },
  {
    attribute: "AS 1562.1",
    kliplok700: "Compliant",
    kliplok406: "Compliant",
    stramit: "Compliant",
  },
];

type TechInfoItem = {
  title: string;
  icon: "check" | "warn" | "bullet";
  content: string;
};

const TECH_INFO: TechInfoItem[] = [
  {
    title: "Concealed-fix system — how clips work",
    icon: "check",
    content:
      "Lysaght Klip-Lok uses a clip that slides over the standing rib of the sheet and is then screwed into the purlin below. The next sheet locks over the clip, completely hiding the fixing from above. Because no screws penetrate the face of the sheet in the field, there are no screw hole leak paths — the only penetrations are at the perimeter and ridgeline. The clip system also allows the sheet to slide along its length under thermal expansion, preventing the buckling and distortion that can occur with through-fixed long runs.",
  },
  {
    title: "Minimum pitch — why Klip-Lok suits low-pitch roofs",
    icon: "check",
    content:
      "Lysaght Klip-Lok 700 has a rated minimum pitch of 1°, which makes it the standard specification for near-flat commercial and Class 2 strata rooftops where through-fixed profiles such as Trimdek (minimum 5°) or corrugated sheet cannot be used. At low pitches, end-lap design and perimeter flashing detailing are critical — the Lysaght TDS and roofing consultant must be consulted for all low-pitch applications. Do not assume 1° is achievable on existing structure without confirming actual falls across the roof area.",
  },
  {
    title: "Installer competency — critical for concealed-fix",
    icon: "warn",
    content:
      "Incorrect installation of Klip-Lok is a common defect source on Class 2 strata roofs. Clips installed at incorrect spacing, clips not fully engaged on the rib, or screws missing the purlin all result in uplift failure under wind load. Lysaght publishes installer competency requirements and some clip types require installation by Lysaght-registered installers. Confirm installer competency and clip installation method before commencing works on Class 2 buildings.",
  },
  {
    title: "Replacing 406 vs 700 — full vs partial replacement",
    icon: "bullet",
    content:
      "Class 2 strata buildings constructed from the 1980s through early 2000s commonly have Klip-Lok 406 (406mm cover) rather than the current 700 series. Partial replacement must use matching 406 profile and 406-specific clips. Where full roof replacement is undertaken, the structural engineer and Lysaght should be consulted about whether a change to Klip-Lok 700 is appropriate — this may require review of purlin spacings and perimeter detailing. The two profiles are not interchangeable.",
  },
];

function TechAccordionItem({ item }: { item: TechInfoItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
            {item.icon === "check" && <CheckCircle size={12} />}
            {item.icon === "warn" && <AlertTriangle size={12} />}
            {item.icon === "bullet" && <Layers size={12} />}
          </div>
          <span className="text-sm font-extrabold text-sky-950">{item.title}</span>
        </div>
        {open ? <ChevronUp size={14} className="shrink-0 text-slate-400" /> : <ChevronDown size={14} className="shrink-0 text-slate-400" />}
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4">
          <p className="text-xs leading-6 text-slate-600">{item.content}</p>
        </div>
      )}
    </div>
  );
}

export function KlipLokIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is Klip-Lok sheet replacement?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Klip-Lok is Lysaght&apos;s concealed-fix standing seam steel roofing profile, widely used on Class 2 strata and commercial buildings across Australia. Unlike corrugated or Trimdek through-fixed profiles, Klip-Lok uses a concealed clip that slides over the standing rib and is fixed to the purlin below — no screws penetrate the face of the sheet in the field. This eliminates screw hole leak paths and enables thermal movement along the sheet length.
        </p>
        {expanded && (
          <>
            <p>
              The two main Klip-Lok profiles are the Klip-Lok 700 (700mm cover, current standard) and the older Klip-Lok 406 (406mm cover, commonly found on buildings from the 1980s–2000s). The two systems use different clips and are not interchangeable. Replacement of an existing Klip-Lok roof must use the same profile and manufacturer-supplied clips.
            </p>
            <p>
              The Klip-Lok 700 has a rated minimum pitch of 1°, making it the standard specification for near-flat commercial and strata rooftops. At low pitches, end-lap detailing, perimeter flashings and falls across the roof surface are critical — a roofing consultant and structural engineer should be engaged for all Klip-Lok replacement works on Class 2 buildings.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-5 text-xs font-semibold text-sky-700 hover:text-red-700 transition"
      >
        {expanded ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function KlipLokProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleProducts = activeFilter === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter as FilterTag));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="space-y-3">
        <div className="mb-2 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Technical Reference</h2>
            <p className="mt-1 text-sm text-slate-500">Clip system, minimum pitch, installer competency and 406 vs 700 profile guidance</p>
          </div>
        </div>
        {TECH_INFO.map((item) => (
          <TechAccordionItem key={item.title} item={item} />
        ))}
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — Klip-Lok 700, Klip-Lok 406 (legacy), and Stramit concealed-fix equivalent</p>
          </div>
        </div>

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

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div
              key={product.name}
              className="w-[340px] shrink-0 rounded-2xl border border-slate-200 bg-white shadow-sm"
              style={{ borderTopColor: product.accentColor, borderTopWidth: 3 }}
            >
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{product.fullLabel}</span>
                  <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-700">
                    <ExternalLink size={12} />
                  </a>
                </div>
                <h3 className="text-base font-extrabold text-sky-950">{product.name}</h3>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">{product.descriptionLine}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {product.techChips.map((chip) => (
                    <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-100 px-5 pb-2 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Product type</p>
                <p className="mt-0.5 text-xs font-semibold text-sky-950">{product.productType}</p>
              </div>
              <div className="border-t border-slate-100 px-5 pb-4 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">System description</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{product.systemDescription}</p>
              </div>
              <div className="border-t border-slate-100 px-5 pb-4 pt-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Technical properties</p>
                <ul className="space-y-1.5">
                  {product.technicalProperties.map((prop) => (
                    <li key={prop} className="flex items-start gap-2 text-[11px] leading-4 text-slate-600">
                      <CheckCircle size={10} className="mt-0.5 shrink-0 text-green-500" />
                      {prop}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-slate-100 px-5 pb-4 pt-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Limitations</p>
                <ul className="space-y-1.5">
                  {product.limitations.map((lim) => (
                    <li key={lim} className="flex items-start gap-2 text-[11px] leading-4 text-slate-600">
                      <XCircle size={10} className="mt-0.5 shrink-0 text-red-400" />
                      {lim}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Procurement</p>
                <p className="mt-1 text-[11px] leading-4 text-slate-600">{product.procurementSources}</p>
                {product.tdsUrl && (
                  <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-sky-700 hover:text-red-700 transition">
                    View TDS / product page <ExternalLink size={9} />
                  </a>
                )}
                <p className="mt-2 text-[10px] italic text-slate-400">
                  Confirm suitability with the current manufacturer TDS before specifying or applying.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Brand Equivalence ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Profile & Brand Equivalence</h2>
            <p className="mt-1 text-sm text-slate-500">
              Klip-Lok profiles are NOT interchangeable between manufacturers or between the 406 and 700 series. Clip systems are manufacturer-specific.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product A</th>
                <th className="px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product B</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-slate-700">Equivalence note</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.a}</td>
                  <td className="px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.b}</td>
                  <td className="px-5 py-3 text-slate-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Klip-Lok 700 vs Klip-Lok 406 vs Stramit concealed-fix. Confirm all details against the current manufacturer TDS.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lysaght Klip-Lok 700</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lysaght Klip-Lok 406</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Stramit (concealed-fix)</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.kliplok700}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.kliplok406}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.stramit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Do not confuse ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Do not confuse Klip-Lok with:</h3>
        </div>
        <ul className="space-y-2.5">
          {[
            "Trimdek (through-fixed trapezoidal) — screws penetrate through the pan. Completely different fixing mechanism to Klip-Lok. Cannot be used on pitches below 5° and is not a substitute for Klip-Lok on low-pitch applications.",
            "Corrugated sheet (Custom Orb) — a sinusoidal through-fixed profile. Not suitable for low pitches. Cannot be substituted for Klip-Lok on existing Klip-Lok roofs.",
            "Klip-Lok 406 vs Klip-Lok 700 — the two Lysaght Klip-Lok series. Different cover widths (406mm vs 700mm) and incompatible clip systems. Never mix clips or sheets between the two series.",
            "Stramit concealed-fix products — Stramit's clips are NOT compatible with Lysaght Klip-Lok clips. Never mix clips or sheets between manufacturers.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
