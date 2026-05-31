"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Acrylic"
  | "SBR"
  | "Water-based"
  | "Fibre-reinforced"
  | "1C"
  | "Rapid-dry"
  | "Undertile"
  | "Under-screed"
  | "Covered-system"
  | "Exposed"
  | "Trafficable"
  | "UV-stable"
  | "Wet-area"
  | "Balcony-terrace"
  | "Facade-wall"
  | "Roof-deck"
  | "AS-3740"
  | "AS-4858";

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
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au",
    accentColor: "#f97316",
    name: "ARDEX WPM 909",
    descriptionLine: "Water-based single-component acrylic membrane — exposed pedestrian trafficable use",
    productType: "Acrylic — trafficable / exposed",
    filterTags: ["Acrylic", "Water-based", "1C", "Exposed", "Trafficable", "UV-stable", "Balcony-terrace"],
    techChips: [
      { label: "Acrylic", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Trafficable — pedestrian", cls: "bg-green-50 text-green-700" },
      { label: "UV stable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX WPM 909 is a water-based single-component acrylic waterproofing membrane designed for exposed pedestrian trafficable balcony, terrace, and deck surfaces. Unlike under-tile SBR systems, WPM 909 is formulated for direct exposure — UV resistance, anti-slip surface texture, abrasion resistance, and cleanability are key differentiators. Apply by roller in multiple coats on primed, prepared concrete or substrate. The finish coat provides the trafficable and weatherproof surface without a tile or screed overlay. Confirm primer selection, application rate, number of coats, and anti-slip grade requirements with ARDEX technical before specifying.",
    technicalProperties: [
      "UV-resistant acrylic formulation — designed for prolonged direct sun and weather exposure on horizontal surfaces",
      "Trafficable pedestrian finish — anti-slip surface — no tile or screed overlay required",
      "Abrasion resistant — suitable for balcony and podium foot traffic areas",
      "Water-based — low VOC — suitable for occupied strata environments during application",
      "One-component — no mixing — straightforward site application in multiple coats",
    ],
    limitations: [
      "Not for vehicular traffic — pedestrian use only — confirm load and traffic conditions before specifying",
      "Anti-slip grade must be confirmed against NCC and project requirements — confirm with ARDEX technical",
      "Primer mandatory — confirm ARDEX-compatible primer for the specific substrate before application",
      "Not a substitute for a classified membrane system under tiles or screed — this is an exposed finish product",
      "Confirm current product name, specification, and exact trafficable classification with ARDEX Australia before specifying — product range subject to revision",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au",
    accentColor: "#f97316",
    name: "ARDEX WPM 310",
    descriptionLine: "Water-based acrylic protective coating and waterproofing membrane — facades, roofs, external surfaces",
    productType: "Acrylic — exposed protective coating",
    filterTags: ["Acrylic", "Water-based", "1C", "Exposed", "UV-stable", "Facade-wall", "Roof-deck"],
    techChips: [
      { label: "Acrylic", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Facade / roof / wall", cls: "bg-slate-100 text-slate-700" },
      { label: "UV stable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX WPM 310 is a water-based acrylic membrane positioned primarily for exposed walls, facades, roof decks, and external protective coating applications rather than as a standard under-tile balcony membrane. It forms a flexible, UV-stable waterproof barrier on vertical and horizontal substrates. Typical uses include external wall waterproofing, facade protection, parapet capping, and areas requiring a painted or coated finish rather than a tiled or screed-covered surface. Do not treat as equivalent to an under-tile polyurethane balcony membrane — the purpose, application rate, and detailing requirements are different. Confirm traffic, load, and finish requirements with the current ARDEX WPM 310 TDS before specifying.",
    technicalProperties: [
      "UV-stable acrylic — suitable for exposed vertical and horizontal external surfaces including facades and roof decks",
      "Flexible — accommodates minor substrate movement and thermal expansion on external building elements",
      "Breathable formulation — allows vapour transmission — suitable for substrates that may have residual moisture",
      "Water-based — safe for application near occupied spaces — low odour",
      "Suitable for concrete, masonry, and render substrates where primer is correctly applied",
    ],
    limitations: [
      "Not a standard under-tile balcony membrane — do not substitute for a classified AS 4858 system in under-tile balcony applications without confirming suitability with ARDEX technical",
      "Foot traffic and load limits apply — confirm with current TDS before specifying in any trafficable application",
      "Primer mandatory — substrate condition and priming sequence directly affects adhesion and performance",
      "Colour range limited — typically supplied in standard colours — confirm colour options with ARDEX Australia",
      "Confirm current product name and full specification with ARDEX Australia — product descriptions subject to periodic revision",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Crommelin",
    brandUrl: "https://crommelin.com.au",
    tdsUrl: "https://crommelin.com.au",
    accentColor: "#0d9488",
    name: "Crommelin Wetite",
    descriptionLine: "Single-component SBR polymer waterproofing membrane — under-tile and wet area use",
    productType: "SBR polymer — under-tile / wet area",
    filterTags: ["SBR", "Water-based", "1C", "Undertile", "Wet-area", "Covered-system", "Balcony-terrace", "AS-3740"],
    techChips: [
      { label: "SBR polymer", cls: "bg-teal-100 text-teal-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Under-tile / wet area", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3740", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Crommelin Wetite is a single-component SBR (styrene-butadiene rubber) polymer waterproofing membrane widely used in Australian residential wet area and under-tile balcony applications. It is applied by brush or roller in two coats directly to primed substrates, with reinforcing bandage embedded at all corners, coves, penetrations, and wall-to-floor junctions. Wetite is a covered membrane system — it is designed to be overlaid with tiles, screed, or a protective topping. It is not formulated as an exposed or trafficable finish. The SBR chemistry provides good adhesion to standard substrates and flexibility adequate for residential-grade wet area and light balcony applications.",
    technicalProperties: [
      "SBR polymer chemistry — reliable adhesion to concrete, masonry, and fibre cement substrates with correct primer",
      "Complies with AS 3740 for domestic wet area waterproofing when correctly applied at specified DFT",
      "Widely available nationally — familiar product with established application trade knowledge",
      "Water-based — safe for use in enclosed bathroom and wet area environments",
      "Suitable for use under ceramic and porcelain tile systems after full cure with compatible tile adhesive",
    ],
    limitations: [
      "Not an exposed trafficable membrane — must be covered by tiles, screed, or an approved protection system",
      "Not formulated for prolonged direct UV exposure — do not leave uncovered in external sun-exposed locations",
      "SBR polymer provides less elongation than polyurethane — confirm suitability for substrates with active movement or significant thermal cycling",
      "Primer required on most substrates — confirm Crommelin-compatible primer selection before application",
      "Confirm current product specification and AS 3740 compliance status with Crommelin before specifying — product TDS is the definitive reference",
    ],
    procurementSources: [
      { name: "Crommelin — trade supply and hardware stores", url: "https://crommelin.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 / ITM — trade branches", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "Crommelin",
    brandUrl: "https://crommelin.com.au",
    tdsUrl: "https://crommelin.com.au",
    accentColor: "#0d9488",
    name: "Crommelin Wetite Rapid",
    descriptionLine: "Water-based SBR polymer membrane — rapid dry — faster tile-over times",
    productType: "SBR polymer — rapid dry — under-tile / wet area",
    filterTags: ["SBR", "Water-based", "1C", "Rapid-dry", "Undertile", "Wet-area", "Covered-system", "Balcony-terrace"],
    techChips: [
      { label: "SBR polymer", cls: "bg-teal-100 text-teal-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Rapid dry", cls: "bg-green-50 text-green-700" },
      { label: "Under-tile / wet area", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Crommelin Wetite Rapid is the rapid-dry version of Crommelin Wetite — formulated to reduce drying time between coats and accelerate the time to tile. The principal advantage over standard Wetite is programme efficiency: faster recoat windows and a reduced wait before tile adhesive can be applied. It is the same class of product — a single-component SBR polymer under-tile and wet area membrane — applied in the same manner. It is a covered system: it must be overlaid with tiles, screed, or an approved protective topping. Do not select Wetite Rapid where the programme does not benefit from faster dry times — standard Wetite provides the same performance at a lower cost where time is not critical.",
    technicalProperties: [
      "Rapid dry — significantly faster recoat and tile-over times compared to standard Wetite — reduces installation programme",
      "SBR polymer chemistry — same adhesion characteristics as standard Wetite on primed concrete and masonry substrates",
      "Water-based — low odour — safe for enclosed wet area and balcony environments",
      "One-component — no site mixing — same straightforward application as standard Wetite",
      "Suitable under ceramic and porcelain tile systems after full cure",
    ],
    limitations: [
      "Same system limitations as standard Wetite — must be covered by tiles, screed, or an approved protection layer",
      "Not suitable for exposed or UV-exposed use — not a trafficable finished surface",
      "Faster dry time reduces working window — plan application sequence carefully in hot or dry conditions to avoid surface skinning before the coat is spread",
      "Confirm rapid dry advantage is actually needed before specifying — standard Wetite at lower cost performs the same where programme is not the driver",
      "Confirm current product specification with Crommelin — product naming and TDS are the definitive reference",
    ],
    procurementSources: [
      { name: "Crommelin — trade supply and hardware stores", url: "https://crommelin.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Gripset Industries",
    brandUrl: "https://www.gripset.com",
    tdsUrl: "https://www.gripset.com",
    accentColor: "#f59e0b",
    name: "Gripset 38FC",
    descriptionLine: "Water-based fast-curing fibre-reinforced SBR latex membrane — under toppings, tiles, or overlay finishes",
    productType: "SBR latex — fibre-reinforced — covered membrane",
    filterTags: ["SBR", "Water-based", "1C", "Fibre-reinforced", "Rapid-dry", "Undertile", "Under-screed", "Covered-system", "Balcony-terrace", "Roof-deck"],
    techChips: [
      { label: "SBR latex", cls: "bg-teal-100 text-teal-800" },
      { label: "Fibre-reinforced", cls: "bg-violet-100 text-violet-800" },
      { label: "Fast-curing", cls: "bg-green-50 text-green-700" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Covered systems only", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Gripset 38FC is an Australian-manufactured water-based fast-curing fibre-reinforced SBR latex membrane by Gripset Industries. The fibre reinforcement is integrated into the membrane itself — reducing the need for separate reinforcing bandage in some applications, although corner and junction detailing requirements should still be confirmed with Gripset technical. It is used in internal and external wet areas, balconies, decks, terraces, and roof applications where the membrane will be covered with toppings, tile beds, screed, or overlay finishes. Gripset 38FC is a covered membrane system — it is not designed as an exposed trafficable finish. Apply by roller or brush in the required number of coats with Gripset-compatible primer on prepared substrates.",
    technicalProperties: [
      "Fibre-reinforced SBR latex — integrated reinforcement reduces risk of tearing at thin sections and improves membrane continuity",
      "Fast-curing — reduced drying time between coats — improved programme efficiency on balcony and deck remediation",
      "Australian manufactured — Gripset technical support available — applicable in Class 2 strata remediation",
      "Water-based — suitable for enclosed balcony and wet area environments",
      "Suitable for a range of covered finish systems including tile beds, screed toppings, and overlay membranes",
    ],
    limitations: [
      "Covered membrane system — must be protected by tiles, screed, a topping, or an approved overlay — not a finished exposed trafficable surface",
      "Confirm with Gripset whether separate reinforcing bandage is required at corners and junctions for this product — do not assume fibre-reinforcement eliminates junction detailing",
      "Not formulated for direct UV or weather exposure as a finished surface",
      "Primer required on most substrates — confirm Gripset primer selection before application",
      "Confirm current product name, specification, and applicable standards compliance with Gripset Industries before specifying",
    ],
    procurementSources: [
      { name: "Gripset Industries — trade supply — contact for current pricing", url: "https://www.gripset.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Gripset Industries",
    brandUrl: "https://www.gripset.com",
    tdsUrl: "https://www.gripset.com",
    accentColor: "#f59e0b",
    name: "Gripset RD",
    descriptionLine: "Flexible acrylic weatherproof membrane — roofs, walls, facades, parapets, gutters — confirm current product TDS",
    productType: "Acrylic weatherproof — exposed / facade / roof — confirm with manufacturer",
    filterTags: ["Acrylic", "Water-based", "1C", "Exposed", "UV-stable", "Facade-wall", "Roof-deck"],
    techChips: [
      { label: "Acrylic weatherproof", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Roof / wall / facade", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm with Gripset TDS", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Gripset RD is understood to be a flexible acrylic waterproof and weatherproof membrane for use on roofs, external walls, facades, parapets, gutters, and weather-exposed surfaces. It is positioned as a protective coating and waterproofing membrane for elements that will be directly exposed to weather rather than covered by tiles or screed. Important: the product name, formulation, and confirmed suitability for specific applications must be verified against the current Gripset RD technical data sheet before specifying. Gripset's product range is Australian-manufactured and subject to ongoing revision. If Gripset RD does not match your project requirements, confirm the current recommended Gripset product for exposed acrylic weatherproofing with Gripset Industries directly.",
    technicalProperties: [
      "Flexible acrylic formulation — designed for weather-exposed surfaces that require flexibility under thermal movement",
      "Water-based — environmentally preferable — suitable for application near occupied or sensitive areas",
      "Suited to roof, parapet, gutter, and facade waterproofing and weatherproofing applications",
      "Australian manufactured product — Gripset Industries technical support",
      "Confirm UV resistance, elongation, and DFT requirements against current product TDS before specifying",
    ],
    limitations: [
      "Product name and exact formulation must be confirmed with the current Gripset RD TDS — do not specify from this reference alone",
      "If this product does not match the project requirement, contact Gripset Industries to confirm the correct current product for exposed acrylic weatherproofing",
      "Not confirmed as equivalent to a classified AS 4858 or Class III waterproofing membrane — confirm compliance status with Gripset before use in applications where a classified membrane is required",
      "Primer and application requirements must be confirmed with Gripset technical — do not apply without reviewing the current manufacturer instructions",
      "Traffic and load limits apply — confirm suitability for any trafficable application with Gripset before specifying",
    ],
    procurementSources: [
      { name: "Gripset Industries — trade supply — contact for current pricing and product confirmation", url: "https://www.gripset.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acrylic", label: "Acrylic" },
  { id: "SBR", label: "SBR polymer" },
  { id: "Water-based", label: "Water-based" },
  { id: "Fibre-reinforced", label: "Fibre-reinforced" },
  { id: "1C", label: "One-component" },
  { id: "Rapid-dry", label: "Rapid dry" },
  { id: "Undertile", label: "Under-tile" },
  { id: "Under-screed", label: "Under screed" },
  { id: "Covered-system", label: "Covered system" },
  { id: "Exposed", label: "Exposed" },
  { id: "Trafficable", label: "Trafficable" },
  { id: "UV-stable", label: "UV stable" },
  { id: "Wet-area", label: "Wet area" },
  { id: "Balcony-terrace", label: "Balcony / terrace" },
  { id: "Facade-wall", label: "Facade / wall" },
  { id: "Roof-deck", label: "Roof / deck" },
  { id: "AS-3740", label: "AS 3740" },
  { id: "AS-4858", label: "AS 4858" },
];

const BRAND_EQUIV: {
  system: string;
  ardex: string;
  crommelin: string;
  gripset: string;
  note?: string;
}[] = [
  {
    system: "Exposed trafficable — pedestrian — acrylic",
    ardex: "WPM 909",
    crommelin: "—",
    gripset: "—",
    note: "Confirm trafficable rating with ARDEX technical",
  },
  {
    system: "Exposed protective coating — facade / roof / wall",
    ardex: "WPM 310",
    crommelin: "—",
    gripset: "RD (confirm with manufacturer)",
    note: "For external weather-exposed surfaces, not under-tile systems",
  },
  {
    system: "SBR under-tile — standard dry time",
    ardex: "—",
    crommelin: "Wetite",
    gripset: "—",
    note: "Covered systems only — must be protected by tiles or screed",
  },
  {
    system: "SBR under-tile — rapid dry / tile-over",
    ardex: "—",
    crommelin: "Wetite Rapid",
    gripset: "—",
    note: "Faster programme — same system limitations as standard Wetite",
  },
  {
    system: "SBR fibre-reinforced — covered membrane",
    ardex: "—",
    crommelin: "—",
    gripset: "38FC",
    note: "Confirm junction detailing and primer with Gripset technical",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Internal wet area waterproofing — bathrooms, laundries, ensuites under tiles",
    "Under-tile balcony and terrace waterproofing where a covered finish is confirmed",
    "External wall, facade, and parapet waterproofing and weather protection",
    "Exposed pedestrian deck and balcony surfaces where the specific product is rated for trafficable use",
    "Roof deck waterproofing and protective coating where product suitability is confirmed",
    "Remedial waterproofing overlays where substrate condition, adhesion testing, and detailing are properly controlled",
  ],
  selectionCriteria: [
    "Confirm whether the application is a covered system (under tiles/screed) or an exposed finish — this drives product selection",
    "Exposed trafficable applications require a specifically rated trafficable product — not all acrylic or SBR membranes qualify",
    "Confirm UV resistance requirements — SBR systems not formulated for prolonged UV exposure if left uncovered",
    "Confirm the required Australian Standard — AS 3740 (wet areas), AS 4858 (membranes), or project specification",
    "Confirm primer compatibility — missing or incorrect primer is the primary cause of membrane adhesion failure",
    "Confirm tile adhesive and screed compatibility after membrane cure — not all acrylic and SBR systems accept all tile adhesives",
    "Confirm dry film thickness requirements and minimum number of coats — single-coat application is typically insufficient",
  ],
  limitations: [
    "Acrylic and SBR membranes are not automatically equivalent to polyurethane membranes — elongation and crack-bridging performance differs significantly",
    "SBR under-tile membranes must be covered — they are not finished exposed trafficable surfaces",
    "Not all products in this group are suitable for Class III external balcony waterproofing — confirm AS 4858 compliance with the manufacturer",
    "Primer mandatory on all substrates — membrane delamination from unprepared or unprimed substrates is the primary failure mode",
    "Two-coat minimum to achieve required dry film thickness — single coat is insufficient across this entire product group",
    "Substrate moisture content must be within manufacturer limits — applying over wet or green concrete will compromise adhesion",
    "Flood test to AS 3740 or project specification mandatory before covering with tiles or screed — minimum 24 hours",
  ],
  standardsNotes: [
    "AS 3740 — Waterproofing of Domestic Wet Areas — flood test requirements, minimum DFT and detailing for wet areas",
    "AS 4858 — Wet Area Membranes — product compliance standard for liquid-applied membranes in wet areas and balconies",
    "AS 4654 — Waterproofing of Wet Areas Within Residential Buildings — referenced on some project specifications",
    "NCC Volume One — performance requirements for waterproofing in Class 2 apartment buildings",
    "Manufacturer ITP hold points — primer, first coat, second coat, flood test, and tile-over confirmation are all typically hold points",
  ],
  suitableDefects: [
    "Wet area waterproofing failure — under-tile membrane deterioration, delamination, or failure at junctions",
    "Balcony waterproofing failure — covered membrane systems under tiles or screed where polyurethane is not required",
    "Facade and wall waterproofing — water ingress through external walls or parapets where acrylic coating is appropriate",
    "Roof deck waterproofing — flat or low-slope roof areas requiring a flexible, UV-stable waterproof coating",
  ],
  typicalSubstrates: [
    "In-situ concrete — primed per manufacturer requirements — confirm surface condition and moisture content",
    "Masonry and render — confirm primer compatibility and surface hardness before applying",
    "Fibre cement — confirm adhesion primer and coating compatibility with manufacturer",
    "Previously waterproofed substrates — adhesion test mandatory — confirm overlay compatibility with manufacturer before application",
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

export function AcrylicProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleProducts =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

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
              Applications, selection criteria, limitations, standards, suitable defects and substrates
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
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
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
            <p className="mt-1 text-sm text-slate-500">6 products — 3 brands — acrylic, SBR and water-based membranes — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
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
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
              Clear filters
            </button>
          )}
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
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{product.descriptionLine}</p>
                </div>

                {/* Tech spec chips */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
                  {product.techChips.map((chip) => (
                    <span
                      key={chip.label}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <p className="text-xs leading-6 text-slate-700">{product.systemDescription}</p>
                </div>

                {/* Technical Properties & Limitations */}
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

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
                  <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
                  <div className="space-y-2">
                    {product.procurementSources.map((src) => (
                      <div
                        key={src.name}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                      >
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side view of acrylic and SBR membrane equivalents by system type and brand. Confirm all product selections against the current manufacturer TDS.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">
                  System type
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>ARDEX</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#0d9488" }}>Crommelin</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f59e0b" }}>Gripset</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-500">Notes</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.system}
                  </td>
                  {[row.ardex, row.crommelin, row.gripset].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {val === "—" ? <span className="text-slate-300">—</span> : val}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-slate-400 text-[11px] italic">{row.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
