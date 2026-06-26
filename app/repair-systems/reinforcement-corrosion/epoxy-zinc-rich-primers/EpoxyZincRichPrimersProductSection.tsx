"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard, DataNote,
  AISelectionStage1, AISelectionStage2,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";

type FilterTag =
  | "2-part-epoxy"
  | "1-part-cementitious"
  | "3-component"
  | "Zinc-rich"
  | "Chloride"
  | "Carbonation"
  | "Brush-applied"
  | "High-build";

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
  dataNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Nitoprime Zincrich",
    descriptionLine: "2-part epoxy zinc-rich rebar primer — solvent-based — brush applied directly to cleaned rebar before repair mortar",
    productType: "2-part epoxy zinc-rich rebar primer",
    dataNote: "Owner to confirm — the Parchem Australia site is JS-rendered; product name, components, and chemistry could not be verified from the live source. Confirm the current product name and chemistry against the current Parchem/Fosroc TDS before specifying.",
    filterTags: ["2-part-epoxy", "Zinc-rich", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "2-part epoxy zinc-rich", cls: "bg-red-100 text-red-900" },
      { label: "St 2 / St 3 rebar prep", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem — nationally available", cls: "bg-amber-50 text-amber-700" },
      { label: "Solvent-based — ventilation required", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitoprime Zincrich is a 2-part epoxy zinc-rich primer applied by brush directly to cleaned reinforcing steel before the application of repair mortar in concrete spalling and reinforcement corrosion repair. Zinc particles in the coating provide sacrificial galvanic protection to the steel, while the epoxy binder provides chemical resistance and adhesion. Applied to rebar cleaned to St 2 minimum (wire brush or needle gun). The primer must be fully cured and within the overcoat window before repair mortar is applied — confirm open time and overcoat window from the current Parchem/Fosroc TDS. Solvent-based formulation — ensure adequate ventilation in confined or enclosed repair areas. Available through Parchem Construction Supplies nationally (DuluxGroup).",
    technicalProperties: [
      "2-part epoxy zinc-rich — sacrificial galvanic protection to cleaned rebar",
      "Applied to rebar cleaned to St 2 minimum by wire brush or needle gun",
      "Solvent-based — ensure adequate ventilation in enclosed repair areas",
      "Parchem — DuluxGroup — national trade supply",
    ],
    limitations: [
      "Rebar must be cleaned to St 2 minimum — product will not bond to loose scale or active rust",
      "Solvent-based — not suitable in confined spaces without mechanical ventilation and appropriate respiratory PPE",
      "Repair mortar must be applied within the overcoat window — if the primer fully cures before mortar is placed, re-prime the surface",
      "Not a migrating corrosion inhibitor — only provides protection where rebar is physically exposed and primed",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://ardexaustralia.com",
    accentColor: "#0369a1",
    name: "Ardex BR 10 ZP",
    descriptionLine: "Single-component zinc-rich rebar primer — brush applied directly to cleaned rebar — compatible with Ardex repair mortars",
    productType: "Single-component zinc-rich rebar primer",
    dataNote: "Owner to confirm — the 'zinc-rich epoxy' binder descriptor could not be confirmed from the live ardexaustralia.com source, which describes the product as a zinc-rich primer only without stating the binder chemistry. Confirm the binder chemistry with Ardex Australia before publishing.",
    filterTags: ["Zinc-rich", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "Single-component zinc-rich", cls: "bg-sky-100 text-sky-800" },
      { label: "Brush applied to cleaned rebar", cls: "bg-slate-100 text-slate-700" },
      { label: "Compatible with Ardex repair mortars", cls: "bg-amber-50 text-amber-700" },
      { label: "Ardex Australia — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex BR 10 ZP is a single-component zinc-rich primer applied by brush to cleaned reinforcing steel before the placement of Ardex polymer-modified repair mortars. The zinc content provides sacrificial protection while the polymer binder ensures adhesion and compatibility with Ardex BR-series repair systems. Single-component formulation — no on-site mixing required, which reduces application errors. Apply to rebar cleaned to St 2 or better; allow to reach the required surface tack or curing stage as specified in the current Ardex TDS before applying repair mortar. Ardex Australia supplies nationally through its trade distribution network. Confirm current product availability and TDS from Ardex directly — product naming in the Ardex BR series has been subject to revision.",
    technicalProperties: [
      "Single-component zinc-rich primer — no on-site mixing required",
      "Applied by brush directly to cleaned rebar (St 2 minimum)",
      "Compatible with Ardex BR-series polymer-modified repair mortars",
      "Ardex Australia — national trade supply",
    ],
    limitations: [
      "Clean rebar to St 2 minimum — do not apply over loose scale or chloride-contaminated mill scale",
      "Apply repair mortar within the specified overcoat window — confirm from Ardex TDS",
      "Verify current product name and TDS from Ardex — BR series naming subject to revision",
      "Single-component zinc-rich does not provide the same electrochemical protection level as 2-part epoxy zinc-rich in high-chloride environments — confirm selection with the engineer of record",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://ardexaustralia.com" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Armatec-10 ZR",
    descriptionLine: "1-component zinc-rich rebar primer — brush applied directly to cleaned rebar — sacrificial galvanic corrosion protection — Sika Australia nationally",
    productType: "1-component zinc-rich rebar primer",
    dataNote: "Owner to confirm — confirm current product availability, zinc content, dry film thickness, and overcoat window with Sika technical before specifying. Sika Australia's chemical range and product naming should be verified against the current Sika Australia TDS for this product.",
    filterTags: ["Zinc-rich", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "1-component zinc-rich", cls: "bg-rose-100 text-rose-800" },
      { label: "Brush applied to cleaned rebar", cls: "bg-slate-100 text-slate-700" },
      { label: "Sacrificial galvanic protection", cls: "bg-amber-50 text-amber-700" },
      { label: "Sika Australia nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Armatec-10 ZR is a single-component zinc-rich primer applied by brush directly to cleaned reinforcing steel before repair mortar placement. The high zinc loading provides sacrificial galvanic protection to the steel — the zinc corrodes preferentially, protecting the rebar below. As a 1-component product it requires no on-site mixing of separate components, which reduces application error compared with multi-part systems. Apply to rebar cleaned to the minimum surface preparation standard specified (typically St 2 by wire brush or needle gun); confirm the number of coats, dry film thickness, and overcoat window before repair mortar placement from the current Sika Australia TDS. TODO: confirm current zinc content (% dry film), DFT per coat, and recoat/overcoat window with Sika technical. Available through Sika Australia distributors nationally.",
    technicalProperties: [
      "1-component zinc-rich primer — sacrificial galvanic protection to cleaned rebar",
      "Applied by brush directly to cleaned rebar (St 2 minimum) — no on-site mixing required",
      "TODO: confirm zinc content (% dry film) and DFT per coat with Sika technical",
      "Sika Australia — trade supply nationally",
    ],
    limitations: [
      "Rebar must be cleaned to St 2 minimum — zinc-rich primer will not bond to loose scale or active rust",
      "Apply repair mortar within the overcoat window — if the primer fully cures before mortar is placed, re-prime",
      "Confirm current product availability and TDS with Sika technical before specifying",
      "Do not apply over galvanised reinforcement without confirming compatibility with Sika — galvanic coupling risk",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "2-part-epoxy", label: "2-part epoxy" },
  { id: "1-part-cementitious", label: "1-part cementitious" },
  { id: "3-component", label: "3-component" },
  { id: "Zinc-rich", label: "Zinc-rich" },
  { id: "Chloride", label: "Chloride" },
  { id: "Carbonation", label: "Carbonation" },
  { id: "Brush-applied", label: "Brush applied" },
  { id: "High-build", label: "High-build" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Fosroc Nitoprime Zincrich",
    parts: "2-part epoxy",
    zinc: "Yes — galvanic",
    chloride: "High resistance",
    notes: "Solvent-based — ventilation required",
  },
  {
    product: "Ardex BR 10 ZP",
    parts: "1-component zinc-rich",
    zinc: "Yes — galvanic",
    chloride: "Good resistance",
    notes: "No on-site mixing — simpler application",
  },
  {
    product: "Sika Armatec-10 ZR",
    parts: "1-component zinc-rich",
    zinc: "Yes — galvanic",
    chloride: "High resistance",
    notes: "No on-site mixing — Sika system",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Applied by brush to cleaned reinforcing steel exposed during concrete spalling repair before placement of polymer-modified repair mortar",
    "Used in active repair zones on carparks, balconies, facades, and civil structures where rebar is exposed and corrosion is active",
    "Applied to new dowels and starter bars immediately after drilling and before grouting or mortar encapsulation",
    "Used on bridge and overpass structure repair where rebar is exposed and corrosion protection is required before repair mortar is placed",
    "Applied as part of a complete Sika, Ardex, Fosroc, or Mapei repair system to maintain system warranty",
    "High-chloride coastal and marine structure repair where galvanic zinc-rich protection (Fosroc Nitoprime Zincrich, Ardex BR 10 ZP) is specified",
  ],
  selectionCriteria: [
    "2-part epoxy zinc-rich (Fosroc Nitoprime Zincrich) for high-chloride exposure where galvanic sacrificial protection is required — bridges, marine structures, exposed coastal carparks",
    "3-component epoxy cement (SikaTop Armatec 110 EpoCem) when the product also functions as a concrete bonding agent — eliminates the need for a separate bonding agent application",
    "Single-component cementitious (Mapei Mapefer 1K) where solvent-free handling is required — enclosed spaces, low-VOC specifications",
    "Match the primer brand to the repair mortar brand to ensure system warranty coverage — confirm compatibility from the mortar supplier's TDS",
    "Confirm the rebar preparation standard required (St 2, St 3, or Sa 2.5) from the engineer of record and select the primer appropriate for that prep standard",
    "For high-chloride environments, prefer zinc-rich epoxy products over cementitious primers — the galvanic protection is more effective where chloride contamination will continue to migrate to the repair zone",
  ],
  limitations: [
    "All rebar primers require rebar to be cleaned to the minimum standard specified — no primer provides protection over loose scale, active rust flakes, or chloride-contaminated mill scale",
    "Primers must be applied within the overcoat window before repair mortar is placed — if the window is missed, re-prime the surface",
    "Rebar primers do not provide long-term protection in heavily chloride-contaminated concrete without additional protection measures such as cathodic protection or MCI surface treatment",
    "Solvent-based products (Fosroc Nitoprime Zincrich) require mechanical ventilation and appropriate respiratory PPE in enclosed repair areas",
    "3-component products (SikaTop Armatec 110 EpoCem) require accurate on-site mixing — incorrect ratios will compromise both corrosion protection and bond strength",
    "Do not substitute primers between systems without written approval from both the primer and mortar suppliers — bond failure and warranty voidance risk",
  ],
  standardsNotes: [
    "EN 1504-7 — Reinforcement Corrosion Protection — product performance requirements for rebar coating products applied in EN 1504 repair systems",
    "AS 3600 — minimum cover requirements for the exposure classification — rebar preparation standard and primer selection should be consistent with the specified exposure class",
    "AS 1627.4 — Metal finishing — preparation of surfaces — cleaning of rebar by hand tool (St 2) and power tool (St 3) methods",
    "Manufacturer system certificates — Sika MonoTop / Armatec, Ardex BR / ZP, Fosroc Renderoc / Nitoprime, Mapei Mapegrout / Mapefer — confirm the current system compatibility certificate from the supplier",
    "Project specification — the engineer of record or remedial building consultant specification takes precedence over general guidance on this page",
  ],
  suitableDefects: [
    "Chloride-induced reinforcement corrosion — active repair zones where rebar is exposed and corrosion is active",
    "Carbonation-induced reinforcement corrosion — rebar exposed after concrete removal requires priming before mortar replacement",
    "Concrete spalling — rebar exposed during break-out requires cleaning and priming before repair mortar is placed",
    "Dowel and starter bar installation in repair pours — new rebar requires priming before concrete or mortar encapsulation where corrosion protection is specified",
  ],
  typicalSubstrates: [
    "Cleaned reinforcing steel (Rx deformed bar, Rx round bar) after wire brush, needle gun, or angle grinder cleaning to St 2 or better",
    "New deformed bar (D500N) or round bar immediately after fabrication and before concrete cover is placed",
    "Stainless steel bar — confirm primer compatibility with the manufacturer for stainless substrates",
    "Galvanised reinforcement — do not apply zinc-rich epoxy primers over galvanised bar without confirming compatibility — galvanic coupling risk",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["application_target", "bare_rebar / concrete_surface", "applied to cleaned bare rebar before repair mortar"],
    ["environment", "carbonation / chloride_coastal_marine", "chloride_marine → 2-part epoxy zinc-rich preferred"],
    ["surface_prep", "St2 / Sa2", "gate against product minimum cleanliness"],
    ["chemistry", "epoxy_zinc / cementitious_zinc / epoxy_cement", "match environment + repair mortar system"],
    ["mortar_compatibility", "system_match / mismatch", "confirm compatible primer from repair mortar manufacturer"],
  ],
  json: {
    category: "epoxy_zinc_rich_primers",
    stage1_gates: {
      application_target: { allowed: ["bare_rebar", "concrete_surface"], rule: "bare_rebar=zinc-rich primer" },
      environment: { allowed: ["carbonation", "chloride_coastal_marine"], rule: "chloride_marine=epoxy zinc-rich preferred" },
      surface_prep: { allowed: ["St2", "Sa2"], rule: "match product minimum cleanliness" },
      chemistry: { allowed: ["epoxy_zinc", "cementitious_zinc", "epoxy_cement"], rule: "match environment + mortar system" },
      mortar_compatibility: { allowed: ["system_match", "mismatch"], rule: "confirm compatible primer from mortar manufacturer" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Fosroc Nitoprime Zincrich": {
    rows: [
      ["application_target", "gate", "bare_rebar"],
      ["environment_max", "gate", "chloride_marine"],
      ["surface_prep_min", "gate", "St2/St3"],
      ["chemistry", "tag", "epoxy_zinc_2part"],
      ["pot_life_min", "rank", "null (unconfirmed)"],
      ["compatible_system", "meta", "fosroc_renderoc"],
      ["data_status", "meta", "unconfirmed"],
      ["selectable", "meta", "false"],
    ],
    json: { id: "fosroc_nitoprime_zincrich", gates: { application_target: "bare_rebar", environment_max: "chloride_marine", surface_prep_min: "St2/St3" }, tag: { chemistry: "epoxy_zinc_2part" }, rank: { pot_life_min: null }, meta: { compatible_system: "fosroc_renderoc", data_status: "unconfirmed", selectable: false, source: "parchem.com.au JS-rendered during audit — product name/components/chemistry unverifiable on this page", confirmed_date: null } },
  },
  "Ardex BR 10 ZP": {
    rows: [
      ["application_target", "gate", "bare_rebar"],
      ["environment_max", "gate", "chloride/carbonation"],
      ["surface_prep_min", "gate", "St2"],
      ["chemistry", "tag", "zinc_rich (binder to confirm)"],
      ["pot_life_min", "rank", "null (single component)"],
      ["compatible_system", "meta", "ardex_br_mortars"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "ardex_br_10_zp", gates: { application_target: "bare_rebar", environment_max: "chloride_carbonation", surface_prep_min: "St2" }, tag: { chemistry: "zinc_rich" }, rank: { pot_life_min: null }, meta: { compatible_system: "ardex_br_mortars", data_status: "verified", selectable: true, source: "ardexaustralia.com Ardex BR 10 ZP — confirmed single-component zinc-rich; binder chemistry (epoxy?) not stated", confirmed_date: null } },
  },
  "Sika Armatec-10 ZR": {
    rows: [
      ["application_target", "gate", "bare_rebar"],
      ["environment_max", "gate", "chloride_marine"],
      ["surface_prep_min", "gate", "St2"],
      ["chemistry", "tag", "zinc_rich_1comp"],
      ["pot_life_min", "rank", "null (single component)"],
      ["compatible_system", "meta", "sika_repair_mortars"],
      ["data_status", "meta", "unconfirmed"],
      ["selectable", "meta", "false"],
    ],
    json: { id: "sika_armatec_10_zr", gates: { application_target: "bare_rebar", environment_max: "chloride_marine", surface_prep_min: "St2" }, tag: { chemistry: "zinc_rich_1comp" }, rank: { pot_life_min: null }, meta: { compatible_system: "sika_repair_mortars", data_status: "unconfirmed", selectable: false, source: "Sika Armatec-10 ZR — 1-component zinc-rich rebar primer; confirm current AU availability, zinc content, DFT and overcoat window with Sika technical", confirmed_date: null } },
  },
};

export function EpoxyZincRichPrimersIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Epoxy zinc-rich and cementitious rebar primers in reinforcement corrosion repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Rebar primers are applied directly to cleaned reinforcing steel exposed during concrete break-out repair to provide corrosion protection and, in some systems, to act as a bonding agent between the existing concrete and the repair mortar. Zinc-rich primers (Fosroc Nitoprime Zincrich, Ardex BR 10 ZP) provide sacrificial galvanic protection — the zinc corrodes preferentially, protecting the steel below. Cementitious and epoxy-cement products (SikaTop Armatec 110 EpoCem, Mapei Mapefer 1K) provide alkaline passivation of the steel surface.
        </p>
        {expanded && (
          <>
            <p>
              In high-chloride environments — coastal and marine structures, carparks with de-icing salts, industrial structures — zinc-rich epoxy primers are typically preferred for active repair zones. Cementitious primers are appropriate for carbonation-induced repair and for enclosed areas where solvent exposure is a concern. All primers must be applied to rebar cleaned to the minimum standard specified by the engineer — typically St 2 (wire brush / needle gun) — and repair mortar must be placed within the primer's overcoat window. Confirm primer-to-mortar compatibility within the same manufacturer's system to maintain warranty.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

const DESIGN_CRITERIA = "Zinc content in dry film (>80% for galvanic/cathodic protection vs lower for barrier); binder chemistry (2-part epoxy vs cementitious/active-pigment vs 1-part); DFT per coat & total (typ. 40–80 µm) and number of coats; rebar surface prep standard (St 3 wire-brush / Sa 2.5 abrasive blast, remove all corrosion); overcoat window before repair mortar & compatibility/bond to that mortar; chloride-contamination tolerance & re-passivation function; pot life, touch-dry & full-cure times; application temperature/humidity & dew-point limits; conformity with EN 1504-7 (reinforcement corrosion protection); thickness consistency on ribbed bar.";

export function EpoxyZincRichPrimersProductSection() {
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

  const visibleProducts = activeFilters.size === 0
    ? PRODUCTS
    : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Reinforcement corrosion" criteriaKey="reinforcement-corrosion/epoxy-zinc-rich-primers" />
    </>
  );
}
