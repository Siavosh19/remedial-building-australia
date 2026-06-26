"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard,
  AISelectionStage1, AISelectionStage2,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { REBAR_PRIMER_CARDS } from "../../concrete-spalling/rebar-primers-inhibitors/rebarPrimersData";

type FilterTag =
  | "3-component"
  | "1-part-cementitious"
  | "2-part-epoxy"
  | "Bonding-agent"
  | "Rebar-primer"
  | "Zinc-rich"
  | "Chloride"
  | "Carbonation"
  | "Brush-applied";

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
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#0369a1",
    name: "Ardex BR 10 ZP",
    descriptionLine: "Single-component zinc-rich rebar primer — brush applied directly to cleaned rebar — compatible with Ardex BR repair mortar systems",
    productType: "Single-component zinc-rich rebar primer",
    filterTags: ["1-part-cementitious", "Rebar-primer", "Zinc-rich", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "Single-component zinc-rich", cls: "bg-sky-100 text-sky-800" },
      { label: "Brush applied to cleaned rebar", cls: "bg-slate-100 text-slate-700" },
      { label: "Compatible with Ardex BR mortars", cls: "bg-amber-50 text-amber-700" },
      { label: "Ardex Australia — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex BR 10 ZP is a single-component zinc-rich primer applied by brush directly to cleaned reinforcing steel in concrete repair. The zinc provides sacrificial galvanic protection to the steel beneath, while the polymer binder provides adhesion and chemical resistance. No on-site mixing required — pre-formulated single component reduces application error risk. Apply to rebar cleaned to St 2 minimum; allow to reach the required tack stage before applying repair mortar. Used as part of the Ardex BR repair mortar system. Ardex Australia supplies nationally through its trade distribution network. Confirm current TDS from Ardex for current product naming, coverage rate, and application instructions — the BR product range has been subject to revision.",
    technicalProperties: [
      "Single-component zinc-rich primer — no on-site mixing required",
      "Applied by brush directly to cleaned rebar (St 2 minimum)",
      "Zinc provides sacrificial galvanic corrosion protection",
      "Ardex Australia — national trade supply",
    ],
    limitations: [
      "Apply repair mortar within the overcoat window — confirm from current Ardex TDS",
      "Confirm current product name and TDS from Ardex — BR series naming subject to revision",
      "Rebar must be cleaned to St 2 minimum — zinc-rich primer will not bond to loose scale or active rust",
      "Single-component zinc-rich primers may not provide the same protection level as 2-part epoxy zinc-rich in very high chloride environments — confirm selection with engineer of record",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Nitoprime Zincrich",
    descriptionLine: "2-part epoxy zinc-rich rebar primer — solvent-based — brush applied to cleaned rebar as part of Fosroc Renderoc repair system",
    productType: "2-part epoxy zinc-rich rebar primer",
    filterTags: ["2-part-epoxy", "Rebar-primer", "Zinc-rich", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "2-part epoxy zinc-rich", cls: "bg-red-100 text-red-900" },
      { label: "Solvent-based — ventilation required", cls: "bg-amber-100 text-amber-900" },
      { label: "Fosroc Renderoc system", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem — nationally available", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitoprime Zincrich is a 2-part epoxy zinc-rich primer mixed on site and applied by brush to reinforcing steel cleaned to St 2 or St 3 before application of Fosroc Renderoc polymer-modified repair mortars. The epoxy binder provides chemical and water resistance; the zinc pigment provides sacrificial galvanic protection. The 2-part formulation gives a higher zinc content and more durable protection than single-component zinc-rich products — preferred for high-chloride and marine exposure structures. Solvent-based — ensure adequate mechanical ventilation and use appropriate respiratory PPE in enclosed repair areas. Apply within pot life after mixing; repair mortar must be placed within the overcoat window. Available through Parchem Construction Supplies (DuluxGroup) nationally.",
    technicalProperties: [
      "2-part epoxy zinc-rich — mix on site — high zinc content for galvanic protection",
      "Applied to rebar cleaned to St 2 or St 3 by brush",
      "Preferred for high-chloride and marine exposure structures",
      "Parchem — DuluxGroup — national trade supply",
    ],
    limitations: [
      "Solvent-based — mechanical ventilation and respiratory PPE required in enclosed repair areas",
      "Mix on site within pot life — discard any mixed product that exceeds pot life",
      "Repair mortar must be placed within the overcoat window — if missed, re-prime",
      "Rebar must be cleaned to St 2 minimum — do not apply to scale or contaminated steel",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Armatec 1C",
    descriptionLine: "1-component cementitious bonding primer and rebar corrosion protection — confirm current specification and Australian availability with Sika technical before specifying",
    productType: "1-component cementitious bonding primer and rebar corrosion protection",
    filterTags: ["1-part-cementitious", "Bonding-agent", "Rebar-primer", "Brush-applied", "Carbonation", "Chloride"],
    techChips: [
      { label: "1-component cementitious bondi", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Sika Armatec 1C is a 1-component cementitious bonding primer and rebar corrosion protection. Single-component cementitious coat providing reinforcement corrosion protection and a bonding bridge for the repair mortar. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Sika technical before specifying. TODO: verify specific performance figures from the current Sika TDS.",
    technicalProperties: [
      "1-component cementitious bonding primer and rebar corrosion protection",
      "Single-component cementitious coat providing reinforcement corrosion protection and a bonding bridge for the repair mortar.",
      "Confirm key performance values (strength / coverage / application) from the current Sika TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Sika",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Sika technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Sika",
    ],
    procurementSources: [
      { name: "Sika — Australian trade supply", url: "https://aus.sika.com" },
    ],
  }

];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "3-component", label: "3-component" },
  { id: "1-part-cementitious", label: "1-part cementitious" },
  { id: "2-part-epoxy", label: "2-part epoxy" },
  { id: "Bonding-agent", label: "Bonding agent" },
  { id: "Rebar-primer", label: "Rebar primer" },
  { id: "Zinc-rich", label: "Zinc-rich" },
  { id: "Chloride", label: "Chloride" },
  { id: "Carbonation", label: "Carbonation" },
  { id: "Brush-applied", label: "Brush applied" },
];

const SYSTEM_COMPARISON = [
  {
    product: "SikaTop Armatec 110 EpoCem",
    parts: "3-component",
    function: "Rebar primer + bonding agent",
    chloride: "High resistance",
    notes: "Wet-on-wet mortar placement — eliminates separate bonding agent",
  },
  {
    product: "Ardex BR 10 ZP",
    parts: "1-component zinc-rich",
    function: "Rebar primer only",
    chloride: "Good resistance",
    notes: "No mixing — simplest site application",
  },
  {
    product: "Fosroc Nitoprime Zincrich",
    parts: "2-part epoxy zinc-rich",
    function: "Rebar primer only",
    chloride: "High resistance",
    notes: "Solvent-based — preferred for high-chloride / marine",
  },
  {
    product: "Mapei Mapefer 1K",
    parts: "1-component cementitious",
    function: "Rebar primer only",
    chloride: "Moderate resistance",
    notes: "No solvent — suitable for enclosed spaces",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Applied to reinforcing steel exposed after concrete break-out in spalling repair — before repair mortar is placed",
    "Applied to rebar in reinforcement corrosion repair where the active repair zone includes full concrete removal to expose the corroded bar",
    "Applied to new dowels and starter bars installed in drilled holes before mortar or grout encapsulation",
    "Used as part of a complete EN 1504-compliant repair system — Sika, Ardex, Fosroc, or Mapei — to maintain system warranty",
    "Applied to rebar in elevated carpark repairs, balcony underside spalling repairs, and marine/coastal structure repairs",
    "Specified by remedial engineers as a mandatory step in concrete spalling and reinforcement corrosion repair specifications",
  ],
  selectionCriteria: [
    "Match the primer to the repair mortar brand and system to ensure warranty coverage — confirm from the mortar supplier TDS",
    "Use 2-part epoxy zinc-rich (Fosroc Nitoprime Zincrich) in high-chloride or marine structures where maximum galvanic protection is required",
    "Use 3-component product (SikaTop Armatec 110 EpoCem) when a combined primer and bonding agent is required — eliminates a separate bonding agent step and reduces application error",
    "Use single-component cementitious (Mapei Mapefer 1K) in enclosed or poorly ventilated areas where solvents are not permitted",
    "Confirm the rebar cleaning standard required (St 2, St 3, or Sa 2.5) from the engineer — the cleaning standard drives the product selection in some specifications",
    "For post-tensioned or prestressed concrete repair, confirm primer suitability with the engineer — hydrogen embrittlement risk in high-strength steel substrates",
  ],
  limitations: [
    "Rebar primers do not provide protection in areas where rebar is not physically exposed and primed — they are an active repair zone product only",
    "All primers require minimum rebar cleaning standard — confirm from engineer; do not reduce prep standard to save time",
    "Primers must be applied within the stated coverage rate — over-application can crack or delaminate; under-application provides inadequate protection",
    "Repair mortar must be placed within the overcoat window — do not leave primed rebar exposed to weather or chloride ingress after priming",
    "Do not mix primers or use incompatible primer-mortar combinations — bond failure and warranty voidance risk",
    "Solvent-based primers (Fosroc Nitoprime Zincrich) require PPE, ventilation, and safe storage — check SDS before site delivery",
  ],
  standardsNotes: [
    "EN 1504-7 — Reinforcement corrosion protection — product requirements for primers and coatings applied to reinforcement in EN 1504 repair systems",
    "AS 3600 — concrete structures — minimum cover requirements — rebar primer does not substitute for minimum cover, it supplements it",
    "AS 1627.4 — surface preparation of steel — cleaning standards St 2 (hand tool), St 3 (power tool), Sa 2.5 (abrasive blast) — confirms the cleaning method appropriate for each primer",
    "AS 1210 / AS 4100 — not directly applicable to rebar primers, but the engineer of record specification is the controlling document for primer selection",
    "Manufacturer system certificates — Sika, Ardex, Fosroc, Mapei — confirm current system certificate and compatibility scope from the supplier",
  ],
  suitableDefects: [
    "Chloride-induced reinforcement corrosion — active repair zones where rebar is exposed after concrete break-out",
    "Carbonation-induced reinforcement corrosion — exposed rebar after carbonated concrete removal",
    "Concrete spalling — any repair requiring full concrete removal and re-mortaring over exposed rebar",
    "Delaminated concrete — where rebar is exposed after removing the delaminated layer",
  ],
  typicalSubstrates: [
    "Deformed bar (D500N, D500L) cleaned to St 2 or St 3 by needle gun, wire brush, or angle grinder",
    "Round bar and mesh cleaned to St 2 minimum in the repair zone",
    "New dowel bar immediately after fabrication and before grouting into drilled holes",
    "Post-tensioned duct bar — confirm primer compatibility with the engineer for high-strength steel substrates",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["application_target", "bare_rebar / concrete_surface", "corrosion repair primes bare rebar; surface treatment → MCI category"],
    ["environment", "carbonation / chloride_coastal_marine", "chloride_marine → 2-part epoxy zinc-rich preferred"],
    ["surface_prep", "St2 / Sa2", "gate against product minimum cleanliness (AS 1627.4 / ISO 8501-1)"],
    ["chemistry", "cementitious_zinc / single_part_zinc / epoxy_zinc / epoxy_cement", "match environment + repair mortar system"],
    ["mortar_compatibility", "system_match / mismatch", "confirm compatible primer from repair mortar manufacturer"],
  ],
  json: {
    category: "rebar_primers_inhibitors",
    stage1_gates: {
      application_target: { allowed: ["bare_rebar", "concrete_surface"], rule: "bare_rebar=zinc-rich primer; concrete_surface=MCI" },
      environment: { allowed: ["carbonation", "chloride_coastal_marine"], rule: "chloride_marine=epoxy zinc-rich preferred" },
      surface_prep: { allowed: ["St2", "Sa2"], rule: "match product minimum cleanliness" },
      chemistry: { allowed: ["cementitious_zinc", "single_part_zinc", "epoxy_zinc", "epoxy_cement"], rule: "match environment + mortar system" },
      mortar_compatibility: { allowed: ["system_match", "mismatch"], rule: "confirm compatible primer from mortar manufacturer" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "SikaTop Armatec 110 EpoCem": {
    rows: [
      ["application_target", "gate", "bare_rebar (+ bonding agent)"],
      ["environment_max", "gate", "chloride/carbonation"],
      ["surface_prep_min", "gate", "St2"],
      ["coats", "gate", "unconfirmed"],
      ["chemistry", "tag", "epoxy_cement_3comp"],
      ["pot_life_min", "rank", "null (unconfirmed)"],
      ["compatible_system", "meta", "sika_monotop/sikatop"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "sikatop_armatec_110_epocem", gates: { application_target: "bare_rebar", environment_max: "chloride_carbonation", surface_prep_min: "St2", coats: "unconfirmed" }, tag: { chemistry: "epoxy_cement_3comp" }, rank: { pot_life_min: null }, meta: { compatible_system: "sika_monotop/sikatop", alternative_product: null, data_status: "verified", selectable: true, source: "aus.sika.com SikaTop Armatec 110 EpoCem — wet-on-wet; rebar primer + bonding agent", confirmed_date: null } },
  },
  "Ardex BR 10 ZP": {
    rows: [
      ["application_target", "gate", "bare_rebar"],
      ["environment_max", "gate", "chloride/carbonation"],
      ["surface_prep_min", "gate", "St2"],
      ["coats", "gate", "unconfirmed"],
      ["chemistry", "tag", "single_part_zinc"],
      ["pot_life_min", "rank", "null (single component)"],
      ["compatible_system", "meta", "ardex_br_mortars"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "ardex_br_10_zp", gates: { application_target: "bare_rebar", environment_max: "chloride_carbonation", surface_prep_min: "St2", coats: "unconfirmed" }, tag: { chemistry: "single_part_zinc" }, rank: { pot_life_min: null }, meta: { compatible_system: "ardex_br_mortars", alternative_product: null, data_status: "verified", selectable: true, source: "ardex.com.au Ardex BR 10 ZP — single-component zinc-rich; BR series naming subject to revision", confirmed_date: null } },
  },
  "Fosroc Nitoprime Zincrich": {
    rows: [
      ["application_target", "gate", "bare_rebar"],
      ["environment_max", "gate", "chloride_marine"],
      ["surface_prep_min", "gate", "St2/St3"],
      ["coats", "gate", "unconfirmed"],
      ["chemistry", "tag", "epoxy_zinc_2part"],
      ["pot_life_min", "rank", "null (unconfirmed)"],
      ["compatible_system", "meta", "fosroc_renderoc"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "fosroc_nitoprime_zincrich", gates: { application_target: "bare_rebar", environment_max: "chloride_marine", surface_prep_min: "St2/St3", coats: "unconfirmed" }, tag: { chemistry: "epoxy_zinc_2part" }, rank: { pot_life_min: null }, meta: { compatible_system: "fosroc_renderoc", alternative_product: null, data_status: "verified", selectable: true, source: "parchem.com.au Fosroc Nitoprime Zincrich — solvent-based; preferred high-chloride/marine", confirmed_date: null } },
  },
  "Mapei Mapefer 1K": {
    rows: [
      ["application_target", "gate", "bare_rebar"],
      ["environment_max", "gate", "chloride/carbonation"],
      ["surface_prep_min", "gate", "St2"],
      ["coats", "gate", "2 (typical)"],
      ["chemistry", "tag", "cementitious_zinc_1comp"],
      ["pot_life_min", "rank", "null (unconfirmed)"],
      ["compatible_system", "meta", "mapei_mapegrout"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "mapei_mapefer_1k", gates: { application_target: "bare_rebar", environment_max: "chloride_carbonation", surface_prep_min: "St2", coats: "2" }, tag: { chemistry: "cementitious_zinc_1comp" }, rank: { pot_life_min: null }, meta: { compatible_system: "mapei_mapegrout", alternative_product: null, data_status: "verified", selectable: true, source: "mapei.com/au Mapefer 1K — single-component cementitious rebar coating", confirmed_date: null } },
  },
};

export function RebarPrimersInhibitorsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Rebar primers and inhibitors in concrete repair and reinforcement corrosion management</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Rebar primers are applied directly to cleaned reinforcing steel exposed during concrete repair to provide an immediate corrosion protection layer before repair mortar is placed. They are a mandatory component of EN 1504-compliant repair systems and are specified by remedial engineers for all active repair zones in concrete spalling and reinforcement corrosion repair. The primer passivates the cleaned rebar surface and, in some products, acts as a bonding agent between the concrete and repair mortar.
        </p>
        {expanded && (
          <>
            <p>
              Three main primer types are in use in Australian remedial repair: 2-part epoxy zinc-rich (Fosroc Nitoprime Zincrich), 3-component epoxy cement acting as combined primer and bonding agent (SikaTop Armatec 110 EpoCem), and single-component cementitious (Ardex BR 10 ZP, Mapei Mapefer 1K). Primer selection should be matched to the repair mortar brand and the specific exposure environment. All primers require the rebar to be cleaned to St 2 minimum before application. Confirm application technique — wet-on-wet vs. allow-to-cure — from the specific product TDS.
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

const DESIGN_CRITERIA = "Type: active zinc-rich sacrificial (galvanic) vs epoxy barrier vs cementitious polymer-modified vs surface-applied migrating corrosion inhibitor (MCI); zinc content (% by wt, e.g. >80% in dry film) for sacrificial action; number of coats & DFT; recoat/overcoat window before mortar application; compatibility/bond with chosen repair mortar; chloride-contaminated vs carbonation-only environment suitability; incipient-anode (ring/halo) mitigation capability; pot life & application temp; single vs two-component; coverage per kg/m of bar; conformance to EN 1504-7 (reinforcement protection) concept.";

export function RebarPrimersInhibitorsProductSection() {
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

      <AutoProductReference products={PRODUCTS} cards={REBAR_PRIMER_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Rebar primers & inhibitors" />
    </>
  );
}
