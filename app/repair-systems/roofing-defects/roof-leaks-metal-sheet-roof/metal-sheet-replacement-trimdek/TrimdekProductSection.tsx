"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag =
  | "Lysaght"
  | "Stramit"
  | "Colorbond"
  | "Trapezoidal"
  | "0.42mm-BMT";

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
    tdsUrl: "https://www.lysaght.com/profiles/trimdek",
    accentColor: "#0369a1",
    name: "Lysaght Trimdek",
    descriptionLine:
      "High-rib trapezoidal Colorbond steel sheet; 29mm rib height; 762mm cover width; pan-fixed; AS 1562.1 compliant",
    productType: "Trapezoidal Colorbond steel sheet — 762mm cover — AS 1562.1",
    filterTags: ["Lysaght", "Colorbond", "Trapezoidal", "0.42mm-BMT"],
    techChips: [
      { label: "Lysaght", cls: "bg-sky-100 text-sky-800" },
      { label: "Colorbond steel", cls: "bg-sky-50 text-sky-700" },
      { label: "762mm cover", cls: "bg-green-50 text-green-700" },
      { label: "29mm rib", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1562.1", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght Trimdek is the Australian market's primary high-rib trapezoidal steel roofing sheet. The profile features a distinctive flat pan flanked by high ribs at 200mm centres, producing a strong structural profile suited to longer purlin spans than corrugated sheet at equivalent BMT. Trimdek is through-fixed via screws driven through the pan (not the rib) into the purlin below, with an EPDM or neoprene sealing washer compressing against the pan face to maintain weathertightness. The full Colorbond colour range is available. It is the most widely specified trapezoidal product on Australian Class 2 strata and commercial flat-to-low-pitch roofs.",
    technicalProperties: [
      "Profile: trapezoidal (high-rib), 29mm rib height, 200mm rib pitch",
      "Cover width: 762mm per sheet (5 pans per sheet)",
      "BMT: 0.42mm (standard residential), 0.48mm (Class 2/commercial), 0.60mm, 0.70mm",
      "Substrate: BlueScope Colorbond steel — full Colorbond colour range",
      "AS 1562.1 compliant — design wind pressures confirmed against span tables",
      "Pan-fixed: screws through pan (not rib) into purlins; EPDM sealing washers required",
      "Minimum pitch: 5° (Lysaght recommended); consult TDS for low-pitch applications",
      "Not suitable for walking without duckboards — pan deformation risk",
    ],
    limitations: [
      "Profile is NOT interchangeable with corrugated sheet — different rib spacing, fixing and span tables",
      "Pan-fixed screw holes must align with purlin spacings — existing purlin layout must be checked before specifying",
      "Colorbond colour must match existing or obtain strata committee approval for variation",
      "BMT must be confirmed against AS 1562.1 wind pressure tables by a structural engineer for Class 2 buildings",
      "Not designed for traffic without duckboards or temporary protection",
    ],
    procurementSources:
      "Lysaght branches and authorised Lysaght distributors nationally. BlueScope Steel distribution centres. Available to trade through major roofing merchants.",
  },
  {
    fullLabel: "Stramit — Fletcher Building",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#15803d",
    name: "Stramit TrimClad",
    descriptionLine:
      "High-rib trapezoidal Colorbond steel sheet; equivalent profile to Trimdek; 762mm cover; pan-fixed; AS 1562.1 compliant",
    productType: "Trapezoidal Colorbond steel sheet — 762mm cover — AS 1562.1",
    filterTags: ["Stramit", "Colorbond", "Trapezoidal", "0.42mm-BMT"],
    techChips: [
      { label: "Stramit", cls: "bg-green-100 text-green-800" },
      { label: "Colorbond steel", cls: "bg-sky-50 text-sky-700" },
      { label: "762mm cover", cls: "bg-green-50 text-green-700" },
      { label: "29mm rib", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1562.1", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stramit TrimClad is Stramit's high-rib trapezoidal steel roofing sheet, dimensionally equivalent to Lysaght Trimdek at 762mm cover width and 29mm rib height. Manufactured from BlueScope Colorbond steel and available in the full Colorbond colour range. Pan-fixed via screw through pan into purlin. Stramit's national branch network provides supply in all major Australian markets and the product is widely used as a like-for-like replacement for Trimdek on existing trapezoidal metal roofs. Confirm current product specifications and span tables against the current Stramit TDS.",
    technicalProperties: [
      "Profile: trapezoidal (high-rib), 29mm rib height, 762mm cover width",
      "BMT: 0.42mm, 0.48mm standard; confirm availability for 0.60mm and 0.70mm with Stramit",
      "Substrate: BlueScope Colorbond steel — full Colorbond colour range",
      "AS 1562.1 compliant — Stramit span tables published in current TDS",
      "Pan-fixed: screws through pan into purlins with EPDM sealing washers",
      "Dimensionally interchangeable with Lysaght Trimdek for replacement work",
    ],
    limitations: [
      "Confirm current product name and specs from Stramit TDS — product names subject to change",
      "Span and load tables are Stramit-specific — do not cross-reference with Lysaght tables",
      "Local branch availability should be confirmed before specifying as replacement",
    ],
    procurementSources:
      "Stramit branches nationally (Adelaide, Brisbane, Melbourne, Perth, Sydney and regional). Major roofing steel distributors and merchants.",
  },
  {
    fullLabel: "Stratco — Stratco Pty Ltd",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#7c3aed",
    name: "Stratco Coverline",
    descriptionLine:
      "Trapezoidal Colorbond steel roofing sheet; equivalent high-rib profile; 762mm cover; pan-fixed; AS 1562.1 compliant",
    productType: "Trapezoidal Colorbond steel sheet — 762mm cover — AS 1562.1",
    filterTags: ["Colorbond", "Trapezoidal", "0.42mm-BMT"],
    techChips: [
      { label: "Stratco", cls: "bg-violet-100 text-violet-800" },
      { label: "Colorbond steel", cls: "bg-sky-50 text-sky-700" },
      { label: "762mm cover", cls: "bg-green-50 text-green-700" },
      { label: "AS 1562.1", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stratco supplies trapezoidal Colorbond steel roofing sheets through their branch network as a supply alternative to Lysaght and Stramit. Products are manufactured from BlueScope Colorbond steel and are dimensionally compatible with the standard high-rib trapezoidal profile for replacement work. Confirm the current Stratco product name, cover width, BMT options and span tables from the Stratco technical data sheet before specifying — product naming conventions may differ from Lysaght and Stramit.",
    technicalProperties: [
      "Profile: high-rib trapezoidal — confirm exact rib height and pitch from Stratco TDS",
      "Cover width: 762mm — confirm with current Stratco TDS",
      "Substrate: BlueScope Colorbond steel — full Colorbond colour range",
      "BMT: 0.42mm standard — confirm additional BMT options from Stratco",
      "AS 1562.1 compliant",
    ],
    limitations: [
      "Confirm current product name from Stratco — naming convention differs from Lysaght and Stramit",
      "Stratco span tables must be used for Stratco product; do not cross-reference with Lysaght tables",
      "Less widely distributed than Lysaght and Stramit in some states — confirm local branch availability",
    ],
    procurementSources:
      "Stratco branches nationally (major capital cities and regional centres). Direct supply to trade.",
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All products" },
  { id: "Lysaght", label: "Lysaght" },
  { id: "Stramit", label: "Stramit" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Trapezoidal", label: "Trapezoidal" },
  { id: "0.42mm-BMT", label: "0.42mm BMT" },
];

const BRAND_EQUIV = [
  {
    a: "Lysaght Trimdek",
    b: "Stramit TrimClad",
    note: "Dimensionally equivalent — same 762mm cover, 29mm rib height, BlueScope Colorbond substrate. Pan-fixed with same screw pattern. Product name differs; span tables are manufacturer-specific.",
  },
  {
    a: "Lysaght Trimdek",
    b: "Stratco (trapezoidal)",
    note: "Dimensionally compatible for replacement work on existing trapezoidal roofs. Confirm current Stratco product name and TDS before specifying — naming may differ from Lysaght.",
  },
  {
    a: "Stramit TrimClad",
    b: "Stratco (trapezoidal)",
    note: "All three products use BlueScope Colorbond steel and the same colour range. Selection is driven by supply channel and local branch availability.",
  },
];

const SYSTEM_COMPARISON = [
  {
    attribute: "Profile",
    lysaght: "High-rib trapezoidal",
    stramit: "High-rib trapezoidal",
    stratco: "High-rib trapezoidal",
  },
  {
    attribute: "Cover width",
    lysaght: "762mm",
    stramit: "762mm",
    stratco: "762mm (confirm TDS)",
  },
  {
    attribute: "Rib height",
    lysaght: "29mm",
    stramit: "29mm",
    stratco: "Confirm TDS",
  },
  {
    attribute: "BMT standard",
    lysaght: "0.42mm / 0.48mm",
    stramit: "0.42mm / 0.48mm",
    stratco: "0.42mm (confirm options)",
  },
  {
    attribute: "Substrate",
    lysaght: "BlueScope Colorbond",
    stramit: "BlueScope Colorbond",
    stratco: "BlueScope Colorbond",
  },
  {
    attribute: "Fixing type",
    lysaght: "Pan-fixed (screw/washer)",
    stramit: "Pan-fixed (screw/washer)",
    stratco: "Pan-fixed (confirm)",
  },
  {
    attribute: "Colour range",
    lysaght: "Full Colorbond range",
    stramit: "Full Colorbond range",
    stratco: "Full Colorbond range",
  },
  {
    attribute: "AS 1562.1",
    lysaght: "Compliant",
    stramit: "Compliant",
    stratco: "Compliant",
  },
];

type TechInfoItem = {
  title: string;
  icon: "check" | "warn" | "bullet";
  content: string;
};

const TECH_INFO: TechInfoItem[] = [
  {
    title: "BMT selection for Class 2 strata buildings",
    icon: "check",
    content:
      "0.42mm BMT is the minimum standard gauge for Trimdek used in residential applications. For Class 2 strata buildings, 0.48mm BMT is commonly specified for higher wind uplift resistance and to accommodate longer purlin spans without increasing purlin frequency. For buildings in high wind regions (N3+, C1+) or buildings over two storeys, a structural engineer must confirm BMT and purlin spacing against AS 1562.1 wind pressure tables before ordering material.",
  },
  {
    title: "Pan-fixing vs rib-fixing — critical distinction",
    icon: "warn",
    content:
      "Trimdek is pan-fixed: self-drilling roofing screws penetrate the flat pan of the sheet (the low point between ribs), not the rib crest. This is the opposite of some other profiles and must be understood before installation. Screws installed through the rib will cause sheet distortion and compromise the weathertightness of the profile. Each screw location must align with the purlin below — existing purlin spacings must be measured before specifying sheet length and fixing layout.",
  },
  {
    title: "Minimum pitch and low-pitch applications",
    icon: "bullet",
    content:
      "Lysaght recommends a minimum pitch of 5° for Trimdek. Below 5°, additional detailing at end laps, ridge cappings and penetrations is required and the TDS must be consulted. At pitches below 3°, Trimdek is generally not suitable and a concealed-fix profile such as Klip-Lok should be considered instead. The minimum pitch must be confirmed with the structural engineer and the roofing installer.",
  },
  {
    title: "Colour matching on partial replacements",
    icon: "warn",
    content:
      "Colorbond colours fade over time. Replacing only a section of a Trimdek roof will result in a visible colour difference between old and new sheets even when the same colour is ordered. For Class 2 strata buildings, strata committee approval may be required for any colour variation. On heritage-listed buildings, the local council and heritage adviser must be consulted before replacing Trimdek sheets with any variation in colour or profile.",
  },
];

function ExpandableSection({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
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

export function TrimdekIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is Trimdek sheet replacement?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Trimdek is a high-rib trapezoidal steel roofing sheet with a 29mm rib height and 762mm cover width, specified for its strong structural performance and clean flat-pan appearance. Unlike the sinusoidal corrugated profile, Trimdek&apos;s wider flat pans and high ribs at 200mm centres allow greater purlin spacing and span capability at equivalent BMT. Sheet replacement requires matching the profile exactly — Trimdek is not interchangeable with corrugated sheet or concealed-fix profiles.
        </p>
        {expanded && (
          <>
            <p>
              Trimdek is pan-fixed: self-drilling roofing screws penetrate the flat pan (the low point between ribs) and anchor directly into the purlin below. Each screw must align with a purlin. Before ordering replacement sheets, the existing purlin layout must be measured to confirm alignment and screw positions.
            </p>
            <p>
              Colorbond colour must be matched to the existing roof when replacing partial sections. Because Colorbond colours fade over time, a visible colour difference is common on partial replacements even when the same colour is ordered new. For Class 2 strata buildings, strata committee approval is typically required for any change in colour or profile.
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

export function TrimdekProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">BMT selection, pan-fixing requirements, minimum pitch and colour matching guidance</p>
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — trapezoidal Colorbond steel sheet systems</p>
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
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
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
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalence</h2>
            <p className="mt-1 text-sm text-slate-500">
              All three products share the same trapezoidal profile and BlueScope Colorbond substrate. Selection is driven by supply channel and local availability.
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
              Side-by-side comparison of trapezoidal Colorbond sheet products. Confirm all selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lysaght Trimdek</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Stramit TrimClad</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Stratco (trapezoidal)</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.lysaght}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.stramit}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.stratco}</td>
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
          <h3 className="text-base font-extrabold text-amber-900">Do not confuse Trimdek with:</h3>
        </div>
        <ul className="space-y-2.5">
          {[
            "Corrugated sheet (Custom Orb / Stramit Corrugated) — a sinusoidal profile with 76mm corrugation pitch and 762mm cover. Not interchangeable with Trimdek — different profile, different fixing pattern, different span tables.",
            "Klip-Lok (concealed fix) — a concealed clip system with no through-fasteners in the field. Completely different fixing mechanism to Trimdek. Requires different substructure, installer competency and minimum pitch.",
            "Zincalume Trimdek — the same trapezoidal profile but with an unpainted AZ150 zinc-aluminium substrate rather than a Colorbond painted finish. Not a like-for-like substitute where a painted finish is required or specified.",
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
