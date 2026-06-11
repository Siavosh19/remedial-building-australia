"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Anti-ponding"
  | "Aluminium"
  | "Steel"
  | "Bradford"
  | "Eaves"
  | "Ventilation"
  | "Ventilated"
  | "Custom"
  | "Zincalume";

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
    accentColor: "#b45309",
    name: "Bradford Thermoseal Anti-Ponding Board",
    descriptionLine: "Aluminium anti-ponding board — installed at eaves — bridges fascia to first batten — prevents sarking and insulation sagging into gutter — standard product for all pitched roof insulation/sarking installations",
    productType: "Aluminium anti-ponding board — eaves — NCC / BCA",
    filterTags: ["Anti-ponding", "Aluminium", "Bradford", "Eaves", "Ventilation"],
    techChips: [
      { label: "Aluminium", cls: "bg-amber-100 text-amber-800" },
      { label: "Bradford", cls: "bg-slate-100 text-slate-700" },
      { label: "Eaves installation", cls: "bg-green-50 text-green-700" },
      { label: "Gutter airspace maintained", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC compliant", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Bradford Thermoseal Anti-Ponding Board is CSR Bradford's proprietary aluminium anti-ponding board system, installed at the eaves to bridge the gap between the fascia board and the first roof batten. The purpose of the anti-ponding board is to prevent the sarking membrane and any insulation installed above it from sagging into the gutter space at the eaves — a condition that blocks gutter ventilation, traps moisture, and can cause water ponding at the eave with resulting gutter overflow or water entry beneath tiles. Under the NCC and Bradford's own installation requirements for Anticon and similar reflective foil sarking products, the anti-ponding board is a mandatory accessory when sarking is installed on a pitched tiled roof. It ensures the required airspace between the sarking and the gutter lining is maintained to allow vapour and moisture to escape from the roof space via the eaves. The Bradford Thermoseal product is a proprietary aluminium profile designed to be compatible with Bradford sarking and insulation product systems. Install at the first batten line across the full eaves width. Confirm current product dimensions, compatibility with the sarking product specified, and NCC compliance requirements with Bradford before specifying.",
    technicalProperties: [
      "Aluminium anti-ponding board — installed at eaves between fascia and first batten",
      "Prevents sarking and insulation from sagging into the gutter — maintains required eaves airspace",
      "Required by NCC and Bradford installation guides for all pitched roof sarking and insulation installations",
      "Compatible with Bradford Anticon and Thermoseal sarking product systems",
      "Proprietary aluminium profile — confirm current dimensions with Bradford before ordering",
      "Installed across full eaves width — confirm fixing method and overlap details with Bradford installation guide",
    ],
    limitations: [
      "Not a gutter guard — does not prevent leaf and debris entry into the gutter — do not confuse the two products",
      "Proprietary Bradford product — confirm compatibility if using non-Bradford sarking products",
      "Confirm current product dimensions and NCC compliance with Bradford before ordering — product specifications subject to revision",
      "Does not substitute for correct fascia board installation — anti-ponding board bridges the gap, does not correct a structural fascia defect",
      "Confirm NCC eaves ventilation requirements for the relevant climate zone with certifier before specifying",
    ],
    procurementSources: [
      { name: "CSR Bradford — trade supply", url: "https://www.bradfordinsulation.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Roofing trade suppliers nationally", url: "https://www.bradfordinsulation.com.au" },
    ],
  },
  {
    fullLabel: "CSR Bradford",
    brandUrl: "https://www.bradfordinsulation.com.au",
    accentColor: "#b45309",
    name: "CSR Bradford Thermoseal AP Strip",
    descriptionLine: "Ventilated aluminium anti-ponding/airflow strip — installed at eaves batten — maintains gutter airspace — variant of the Thermoseal anti-ponding board range",
    productType: "Ventilated aluminium anti-ponding/airflow strip — eaves — Bradford",
    filterTags: ["Anti-ponding", "Aluminium", "Bradford", "Ventilated"],
    techChips: [
      { label: "Aluminium", cls: "bg-amber-100 text-amber-800" },
      { label: "Ventilated profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Bradford", cls: "bg-green-50 text-green-700" },
      { label: "Airspace maintained", cls: "bg-slate-100 text-slate-700" },
      { label: "AP Strip variant", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The CSR Bradford Thermoseal AP Strip is a ventilated aluminium profile installed at the eaves batten to maintain the airspace between the gutter and the sarking membrane on a pitched tiled roof. It is a variant of the Bradford anti-ponding board range, with a ventilated profile that allows air movement through the strip itself at the eaves line. This design allows the eave to remain ventilated — complying with NCC requirements for eaves ventilation in pitched roofs — while still preventing the sarking from drooping into the gutter. The AP Strip is installed on the face of the first batten (the eave batten), bridging from the batten to the fascia top, and the sarking is laid over the top of the strip profile. This variant is used where the installer or specifier requires a ventilated profile rather than a solid anti-ponding board — confirm the difference between the AP Strip and the Thermoseal Anti-Ponding Board with Bradford technical to determine which is appropriate for the specific sarking and roof geometry. As with all Bradford anti-ponding products, confirm current product dimensions, NCC compliance, and compatibility with the sarking product used.",
    technicalProperties: [
      "Ventilated aluminium anti-ponding/airflow strip — installed at the eaves batten",
      "Ventilated profile maintains airflow through the eave while supporting sarking above the gutter",
      "NCC eaves ventilation compliance — confirm ventilation area requirements with certifier for the climate zone",
      "Compatible with Bradford Thermoseal and Anticon sarking product range",
      "Variant within the Bradford Thermoseal anti-ponding product range — confirm product selection with Bradford technical",
      "Confirm current dimensions and installation detail with Bradford before ordering",
    ],
    limitations: [
      "Confirm the difference between AP Strip and Thermoseal Anti-Ponding Board with Bradford before ordering — different profiles for different applications",
      "Not a gutter guard — does not prevent leaf entry into gutter",
      "Confirm NCC eaves ventilation area compliance for the specific climate zone with certifier",
      "Proprietary product — confirm compatibility with non-Bradford sarking products before specifying",
      "Confirm current product specification with CSR Bradford before ordering — range subject to revision",
    ],
    procurementSources: [
      { name: "CSR Bradford — trade supply", url: "https://www.bradfordinsulation.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Custom Fabricator / Site Supply",
    brandUrl: "https://www.lysaght.com.au",
    accentColor: "#1d4ed8",
    name: "Custom Steel Anti-Ponding Board",
    descriptionLine: "Site-formed or fabricator-supplied Zincalume or Colorbond anti-ponding board — used where Bradford proprietary product does not suit roof geometry — steel profile bridging eave batten to fascia",
    productType: "Custom steel anti-ponding board — Zincalume or Colorbond — site-formed",
    filterTags: ["Anti-ponding", "Steel", "Custom", "Zincalume"],
    techChips: [
      { label: "Zincalume / Colorbond steel", cls: "bg-blue-100 text-blue-800" },
      { label: "Custom / site-formed", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-proprietary", cls: "bg-green-50 text-green-700" },
      { label: "Fabricator supply", cls: "bg-slate-100 text-slate-700" },
      { label: "Where Bradford doesn't fit", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "A custom steel anti-ponding board is a site-formed or fabricator-supplied Zincalume or Colorbond steel profile used where the proprietary Bradford Thermoseal product does not suit the roof geometry — for example, where the eave overhang, rafter depth, or fascia profile creates a gap that cannot be bridged by the standard Bradford product widths and profiles. Custom steel anti-ponding boards are formed by a roofing sheet metal fabricator or a roll-former to the specific width and profile required for the eave condition. Zincalume (BlueScope AZ150) is the standard material for unexposed positions — Colorbond is used where colour matching to the fascia or roof is required or where the anti-ponding board may be visible from below the eave. The steel anti-ponding board performs the same function as the Bradford proprietary product — it bridges the gap between the fascia top and the first batten, supporting the sarking membrane to prevent it sagging into the gutter. Confirm material gauge, profile, and fixing method with the roofing contractor. Confirm that the custom profile achieves the required airspace and complies with NCC eaves ventilation requirements for the specific climate zone.",
    technicalProperties: [
      "Custom steel anti-ponding board — Zincalume (BlueScope AZ150) or Colorbond — site-formed or fabricator-supplied",
      "Bridges gap between fascia top and first batten — supports sarking to prevent gutter blockage",
      "Suitable where Bradford proprietary product dimensions do not match the eave geometry",
      "Zincalume for concealed positions — Colorbond for visible or colour-matched applications",
      "Formed to specific width and profile by a roofing sheet metal fabricator or on-site roll-former",
      "Confirm material gauge, profile depth, and fixing method with roofing contractor before fabricating",
    ],
    limitations: [
      "Custom fabrication required — higher cost and lead time than proprietary Bradford product",
      "Confirm NCC eaves ventilation compliance with certifier — custom profile must achieve required ventilation area",
      "Not a standard stocked product — lead time for custom fabrication must be allowed in the programme",
      "Confirm Zincalume or Colorbond material is appropriate for the specific exposure and climate zone",
      "Do not confuse with gutter guard — different product, different function",
      "Confirm sarking product compatibility with roofing contractor — custom profile must support the specific sarking membrane used",
    ],
    procurementSources: [
      { name: "Lysaght — Colorbond and Zincalume sheet material", url: "https://www.lysaght.com.au" },
      { name: "BlueScope Steel — bulk material supply", url: "https://www.bluescopesteel.com.au" },
      { name: "Local roofing sheet metal fabricator — custom forming", url: "https://www.lysaght.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Steel", label: "Steel" },
  { id: "Bradford", label: "Bradford" },
  { id: "Ventilated", label: "Ventilated" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Thermoseal Anti-Ponding Board",
    brand: "Bradford",
    material: "Aluminium",
    ventilated: "No (solid profile)",
    customSizing: "No — standard widths",
    installation: "Fixed at eaves — fascia to first batten",
  },
  {
    product: "Thermoseal AP Strip",
    brand: "Bradford",
    material: "Aluminium",
    ventilated: "Yes — ventilated profile",
    customSizing: "No — standard widths",
    installation: "Fixed at eaves batten face",
  },
  {
    product: "Custom Steel Anti-Ponding Board",
    brand: "Custom / fabricator",
    material: "Zincalume or Colorbond steel",
    ventilated: "Confirm with fabricator",
    customSizing: "Yes — custom to eave geometry",
    installation: "Fabricated to suit — fixed at fascia to first batten",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Any pitched tiled roof receiving new sarking (reflective foil or PIR board) or insulation upgrade — anti-ponding board is mandatory",
    "Roof tile replacement where existing sarking is being replaced and the eave anti-ponding strip is missing or damaged",
    "New sarking installation on existing tiled roof where no anti-ponding board was previously installed",
    "Class 2 strata buildings undergoing sarking upgrade during a rolling tile replacement programme",
    "Any installation where Bradford Anticon, Thermoseal, or equivalent sarking is specified — anti-ponding board is a required accessory",
  ],
  selectionCriteria: [
    "Eave geometry — measure the gap between the fascia top and the first batten to confirm which product width fits",
    "NCC eaves ventilation requirements — confirm whether the climate zone requires ventilated or solid anti-ponding profile",
    "Sarking product compatibility — confirm the anti-ponding board suits the sarking product installed",
    "Visibility — Zincalume (steel) for concealed positions, Colorbond for visible eaves where colour matching is required",
    "Proprietary vs custom — use Bradford proprietary product where dimensions match; specify custom steel only where they do not",
  ],
  limitations: [
    "Do not install sarking on a pitched tiled roof without an anti-ponding board — sagging sarking blocks gutter drainage and causes water entry",
    "Anti-ponding boards do not replace gutter guards — they serve a different purpose and must not be confused",
    "Do not omit the anti-ponding board in the interests of programme or cost — it is a mandatory accessory under Bradford installation requirements and the NCC",
    "Confirm NCC eaves ventilation area compliance for the climate zone with certifier before specifying a solid (non-ventilated) anti-ponding board",
  ],
  standardsNotes: [
    "NCC Volume Two — eaves ventilation requirements for pitched roofs — climate zone specific",
    "Bradford Anticon and Thermoseal sarking installation guides — anti-ponding board is specified as a mandatory accessory",
    "AS 4200.2 — Pliable building membranes — installation requirements — references eaves treatment at the gutter line",
    "BCA Section J — energy efficiency — sarking and insulation installation requirements including eave treatment",
  ],
  typicalSubstrates: [
    "Standard timber fascia board — anti-ponding board fixed to the top of the fascia with screws or clips",
    "Steel fascia — confirm fixing method with fabricator and roofing contractor",
    "PVC fascia — confirm fixing compatibility — standard screw fixings may not suit all PVC fascia profiles",
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

export function AntiPondingBoardIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are anti-ponding board systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          An anti-ponding board is an aluminium or steel profile installed at the eave of a pitched roof, spanning from the top of the fascia board to the first roof batten. Its purpose is to support the sarking membrane and insulation at the eave so that they do not sag into the gutter space. When sarking sags into the gutter, it blocks gutter drainage and ventilation, causing water ponding at the eave and potential water entry under tiles. Anti-ponding boards are a mandatory accessory under Bradford's installation requirements for all Anticon and Thermoseal sarking systems, and are required under the NCC where sarking is installed on a pitched tiled roof.
        </p>
        {expanded && (
          <>
            <p>
              The anti-ponding board also plays a role in maintaining the required eaves ventilation airspace under the NCC — allowing vapour and moisture to escape from the roof space through the eaves. In some climate zones, a ventilated anti-ponding profile (such as the Bradford AP Strip) is required to achieve the minimum ventilation area. Confirm the NCC ventilation requirements with the building certifier for the specific climate zone and roof type before specifying.
            </p>
            <p>
              Anti-ponding boards should not be confused with gutter guards (leaf protection products) or fascia boards (structural elements). They are separate roofing accessories specifically for sarking management at the eave.
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

export function AntiPondingBoardProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 2 brands — aluminium and steel anti-ponding board systems</p>
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
              Side-by-side comparison of anti-ponding board systems. Confirm all product selections against the current manufacturer documentation before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Ventilated</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Custom sizing</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Installation method</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ventilated}</td>
                  <td className="px-4 py-3 text-slate-600">{row.customSizing}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.installation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
