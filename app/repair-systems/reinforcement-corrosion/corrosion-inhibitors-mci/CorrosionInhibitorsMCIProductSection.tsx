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
import { CORROSION_INHIBITOR_CARDS } from "./corrosionInhibitorsData";

type FilterTag =
  | "Surface-applied"
  | "Admixture"
  | "Rebar-coating"
  | "Amine-alcohol"
  | "Carbonation"
  | "Chloride"
  | "Brush-applied"
  | "Spray-applied"
  | "Large-area";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Ferrogard-903+",
    descriptionLine: "Surface-applied migrating corrosion inhibitor (MCI) — amine alcohol — brush, roller, or spray to concrete surface",
    productType: "Surface-applied MCI — amine alcohol chemistry",
    filterTags: ["Surface-applied", "Amine-alcohol", "Carbonation", "Chloride", "Brush-applied", "Spray-applied", "Large-area"],
    techChips: [
      { label: "Amine alcohol MCI", cls: "bg-rose-100 text-rose-800" },
      { label: "Brush / roller / spray", cls: "bg-slate-100 text-slate-700" },
      { label: "5 L, 10 L, 20 L", cls: "bg-amber-50 text-amber-700" },
      { label: "Sika Australia nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Ferrogard-903+ is a surface-applied migrating corrosion inhibitor (MCI) based on amine alcohol technology. Applied to the concrete surface by brush, roller, or spray, the active inhibitor migrates through the concrete matrix to the reinforcement surface where it forms a monomolecular film that reduces the rate of corrosion by limiting anodic and cathodic activity. Primarily used on structures where carbonation or chloride-induced corrosion is active or at risk but where full concrete removal is not practical — for example, large soffit areas, elevated structures, or bridges where full spalling repair would be prohibitively expensive. Ferrogard-903+ is a corrosion management strategy to slow the rate of existing corrosion and extend the time to next intervention — not a structural repair. Applied at the Sika Australia specified coverage rate; multiple coats may be specified for high-chloride exposure. Confirm current application rate, coverage, and re-application interval from the current Sika Australia TDS.",
    technicalProperties: [
      "Amine alcohol MCI — migrates through concrete matrix to reinforcement surface",
      "Applied to concrete surface — brush, roller, or spray — not applied directly to rebar",
      "Reduces anodic and cathodic activity at the rebar surface",
      "Available in 5 L, 10 L, and 20 L containers — Sika Australia trade supply nationally",
    ],
    limitations: [
      "MCI is not a repair — it slows corrosion rate, it does not arrest active corrosion or reinstate structural capacity",
      "Effectiveness is reduced in very dense, low-permeability concrete where migration to the rebar surface is slow",
      "Not suitable as a substitute for physical rebar cleaning and priming in active repair zones",
      "Confirm coverage rate and re-application frequency for the specific chloride exposure from Sika Australia TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Cortec Corporation / Local Distributor",
    brandUrl: "https://www.cortecvci.com",
    accentColor: "#0369a1",
    name: "Cortec MCI-2020 — Surface-Applied MCI",
    descriptionLine: "Surface-applied migrating corrosion inhibitor — amino carboxylate / amine alcohol — 1–2 coats brush or spray to concrete surface",
    productType: "Surface-applied MCI — organic amino carboxylate chemistry",
    filterTags: ["Surface-applied", "Amine-alcohol", "Carbonation", "Chloride", "Brush-applied", "Large-area"],
    techChips: [
      { label: "Amino carboxylate / amine alcohol", cls: "bg-sky-100 text-sky-800" },
      { label: "1–2 coats — brush or spray", cls: "bg-slate-100 text-slate-700" },
      { label: "Admixture forms also available", cls: "bg-amber-50 text-amber-700" },
      { label: "Local distributors — confirm", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Cortec MCI-2020 is a surface-applied migrating corrosion inhibitor (MCI) that penetrates the concrete surface and migrates to the reinforcement level. The Cortec MCI technology is based on amino carboxylate and amine alcohol chemistry that forms a molecular barrier layer on the steel surface. Applied by brush, roller, or spray in 1–2 coats at the Cortec-specified coverage rate. Used on structures where full repair is not feasible and slowing the rate of corrosion advance is the primary objective — same application as Sika Ferrogard-903+. Cortec products are distributed through local construction chemicals suppliers in Australia — confirm current distributor and availability before specifying. The MCI product range also includes concrete admixture forms (MCI-2005, MCI-2006) for addition to new concrete pours during repair.",
    technicalProperties: [
      "Amino carboxylate / amine alcohol MCI — surface applied to concrete",
      "Applied in 1–2 coats — brush, roller, or spray",
      "MCI admixture forms also available for new concrete in repair pours",
      "Distributed through local construction chemicals suppliers in Australia",
    ],
    limitations: [
      "Confirm current Australian distributor before specifying — Cortec is not universally stocked",
      "Same limitations as all MCIs — corrosion rate reduction, not arrest — not a substitute for physical repair",
      "Confirm coverage rate and application protocol from current Cortec TDS — do not estimate",
    ],
    procurementSources: [
      { name: "Cortec Australian distributors — confirm availability before specifying", url: "https://www.cortecvci.com" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Nitocor MCI",
    descriptionLine: "Corrosion inhibitor — available as concrete admixture (in repair mortar) and surface treatment — Parchem national supply",
    productType: "Corrosion inhibitor — surface treatment and concrete admixture",
    filterTags: ["Surface-applied", "Admixture", "Carbonation", "Chloride", "Brush-applied"],
    techChips: [
      { label: "Surface treatment + admixture", cls: "bg-red-100 text-red-900" },
      { label: "Added to repair mortar", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem — nationally available", cls: "bg-amber-50 text-amber-700" },
      { label: "Confirm current TDS", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitocor is a corrosion inhibitor product available through Parchem in surface-applied and concrete admixture forms for use in reinforcement corrosion management. The admixture form is added to fresh repair mortar during mixing to provide corrosion protection at the repair mortar–rebar interface after repair. The surface treatment form is applied to the prepared concrete surface before repair mortar placement as an additional corrosion protection measure. Confirm the current Fosroc/Parchem Nitocor product range, application form, dosage, and compatibility with the selected repair mortar from the current Parchem TDS — the Nitocor product range and naming convention has been subject to revision. Available through Parchem Construction Supplies nationally.",
    technicalProperties: [
      "Available as admixture (added to repair mortar) and surface treatment",
      "Provides corrosion protection at rebar–mortar interface in repair",
      "Compatible with Fosroc Renderoc and Parchem repair mortar systems (confirm from TDS)",
      "Parchem — DuluxGroup — national trade supply",
    ],
    limitations: [
      "Confirm current product name and form from Parchem — Nitocor range subject to revision",
      "Admixture must be compatible with the selected repair mortar — confirm from Parchem TDS",
      "Corrosion inhibitor admixture does not eliminate the need for rebar cleaning and priming in active repair zones",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika FerroGard-901",
    descriptionLine: "Corrosion-inhibiting concrete admixture (integral MCI) — confirm current specification and Australian availability with Sika technical before specifying",
    productType: "Corrosion-inhibiting concrete admixture (integral MCI)",
    filterTags: ["Admixture", "Amine-alcohol", "Carbonation", "Chloride"],
    techChips: [
      { label: "Corrosion-inhibiting concrete ", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Sika FerroGard-901 is a Corrosion-inhibiting concrete admixture (integral MCI). Integral amino-alcohol corrosion-inhibiting admixture added to repair mortar or concrete to slow reinforcement corrosion. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Sika technical before specifying. TODO: verify specific performance figures from the current Sika TDS.",
    technicalProperties: [
      "Corrosion-inhibiting concrete admixture (integral MCI)",
      "Integral amino-alcohol corrosion-inhibiting admixture added to repair mortar or concrete to slow reinforcement corrosion.",
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
  { id: "Surface-applied", label: "Surface applied" },
  { id: "Admixture", label: "Admixture" },
  { id: "Rebar-coating", label: "Rebar coating" },
  { id: "Amine-alcohol", label: "Amine alcohol" },
  { id: "Carbonation", label: "Carbonation" },
  { id: "Chloride", label: "Chloride" },
  { id: "Brush-applied", label: "Brush applied" },
  { id: "Spray-applied", label: "Spray applied" },
  { id: "Large-area", label: "Large area" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Sika Ferrogard-903+",
    type: "Surface-applied MCI",
    applied: "Concrete surface",
    mechanism: "Amine alcohol — migrates to rebar",
    use: "Large-area prophylactic protection",
  },
  {
    product: "Cortec MCI-2020",
    type: "Surface-applied MCI",
    applied: "Concrete surface",
    mechanism: "Amino carboxylate — migrates to rebar",
    use: "Prophylactic protection — admixture forms available",
  },
  {
    product: "Fosroc Nitocor MCI",
    type: "Surface treatment / admixture",
    applied: "Concrete surface / in repair mortar",
    mechanism: "Inhibitor at repair mortar interface",
    use: "Surface treatment or admixture in repair mortar",
  },
  {
    product: "Mapei Mapefer",
    type: "2-component rebar coating",
    applied: "Directly to cleaned rebar",
    mechanism: "Alkaline cementitious passivation",
    use: "Active repair zones — rebar passivation",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Surface-applied MCI on elevated carpark soffits and balcony undersides where full spalling repair is not practical or economical",
    "Large-area bridge and overpass soffit protection where chloride contamination is present but structural capacity is not yet compromised",
    "MCI admixture added to repair mortar during mixing to protect the rebar–mortar interface in patch repairs",
    "Mapei Mapefer applied directly to cleaned rebar in active repair zones before repair mortar placement",
    "Prophylactic treatment of chloride-contaminated facades and external walls to slow the rate of carbonation-front advance",
    "Post-repair surface treatment over repaired and adjacent concrete to provide additional corrosion protection across the halo effect zone",
  ],
  selectionCriteria: [
    "Surface-applied MCI (Ferrogard-903+, Cortec MCI-2020) when full repair is not feasible — large area, access constraints, or cost — and the primary objective is extending the time to next intervention",
    "MCI admixture (Fosroc Nitocor) when the repair mortar itself needs enhanced corrosion inhibition at the rebar–mortar interface — particularly in chloride-affected structures with ongoing salt migration",
    "Mapei Mapefer when rebar is exposed in an active repair zone and a direct rebar coating (rather than a migrating inhibitor) is specified",
    "Sika Ferrogard-903+ when a nationally stocked, widely tested amine-alcohol MCI is required — default choice for most Australian consulting engineers",
    "Cortec MCI-2020 when the admixture form is also required — Cortec's MCI-2005 and MCI-2006 admixtures provide a consistent combined surface and mortar inhibitor strategy",
    "Confirm migration efficiency from the manufacturer for the specific concrete type and cover depth — high-strength or dense concrete significantly reduces MCI migration to the rebar level",
  ],
  limitations: [
    "MCIs do not arrest active corrosion — they reduce the corrosion rate; structural capacity assessment is required if section loss has already occurred",
    "Surface-applied MCIs are ineffective if the concrete cover is too dense for migration — confirm expected migration depth from the manufacturer for the specific mix design",
    "MCIs are not a substitute for physical repair of active spalling — they are a complementary protection measure for areas adjacent to or outside active repair zones",
    "All MCIs require periodic re-application — if the maintenance specification does not include re-application at the manufacturer's recommended interval, long-term protection will be lost",
    "Cathodic protection (galvanic or ICCP) is required where MCI migration efficiency is insufficient for high-chloride contamination — confirm with a corrosion engineer",
    "Mapei Mapefer must not be substituted for a surface-applied MCI — it is a direct rebar coating, not a migrating inhibitor, and cannot be applied without exposing the rebar",
  ],
  standardsNotes: [
    "EN 1504-9 — Products and Systems for the Protection and Repair of Concrete Structures — Principles for the use of corrosion inhibitors, including surface applied (principle 11) and control of anodic areas (principle 7)",
    "AS 2832.5 — Cathodic Protection of Internal Surfaces — referenced for electrochemical protection context where MCI is insufficient",
    "Manufacturer TDS — coverage rate, number of coats, re-application interval, and minimum/maximum temperature range are all TDS-specific",
    "Corrosion engineer's specification — for any MCI application on a classified structure, the selection and application protocol should be confirmed by a corrosion engineer",
    "SafeWork Australia SDS — Ferrogard-903+ and similar amine-based MCIs require PPE (gloves, eye protection) during application — confirm from SDS",
  ],
  suitableDefects: [
    "Chloride-induced reinforcement corrosion — active or at-risk — as a prophylactic or complementary treatment where full repair is not practical",
    "Carbonation-induced reinforcement corrosion — large-area facade or structural soffit treatment",
    "Post-repair protection — surface treatment over the repaired and adjacent concrete zone after active patch repair is complete",
    "Structures approaching end of serviceable life — MCI as a time-extension measure before major capital works",
    "Elevated carparks and coastal structures — high ongoing chloride exposure where long-term corrosion management is required",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — standard substrate for surface-applied MCI — any age or exposure class",
    "Precast concrete — same as in-situ, but confirm concrete density and permeability with manufacturer — high-density precast may have limited MCI migration",
    "Post-tensioned and prestressed concrete — surface MCI treatment is applicable but ICCP or cathodic protection may also be required; confirm with a corrosion engineer",
    "Masonry walls with embedded steel ties — surface-applied MCI can be used to slow corrosion of embedded metal ties",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["application_mode", "surface_concrete / rebar_coating / admixture", "match to where the inhibitor is applied"],
    ["corrosion_cause", "carbonation / chloride", "both addressed; chloride benefits most from MCI management"],
    ["repair_extent", "localized_patch / large_area", "large_area where full removal impractical → surface MCI suited"],
    ["function", "corrosion_management / structural", "structural → not_suitable (inhibitor manages corrosion, is not a structural repair)"],
  ],
  json: {
    category: "corrosion_inhibitors_mci",
    stage1_gates: {
      application_mode: { allowed: ["surface_concrete", "rebar_coating", "admixture"], rule: "match application location" },
      corrosion_cause: { allowed: ["carbonation", "chloride"], rule: "both; chloride benefits most" },
      repair_extent: { allowed: ["localized_patch", "large_area"], rule: "large_area where full removal impractical=surface MCI" },
      function: { allowed: ["corrosion_management", "structural"], rule: "structural=not_suitable (management not repair)" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Sika Ferrogard-903+": {
    rows: [
      ["application_mode", "gate", "surface_concrete"],
      ["corrosion_cause_max", "gate", "chloride"],
      ["repair_extent", "gate", "large_area"],
      ["chemistry", "tag", "amine_alcohol_mci"],
      ["form", "meta", "liquid (5/10/20 L)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "sika_ferrogard_903plus", gates: { application_mode: "surface_concrete", corrosion_cause_max: "chloride", repair_extent: "large_area" }, tag: { chemistry: "amine_alcohol_mci" }, rank: {}, meta: { form: "liquid_5_10_20L", data_status: "verified", selectable: true, source: "aus.sika.com Ferrogard-903+ — surface MCI, migrates to rebar; management not repair", confirmed_date: null } },
  },
  "Cortec MCI-2020 — Surface-Applied MCI": {
    rows: [
      ["application_mode", "gate", "surface_concrete"],
      ["corrosion_cause_max", "gate", "chloride"],
      ["repair_extent", "gate", "large_area"],
      ["chemistry", "tag", "amino_carboxylate_mci"],
      ["form", "meta", "liquid (1-2 coats); admixture forms exist"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "cortec_mci_2020", gates: { application_mode: "surface_concrete", corrosion_cause_max: "chloride", repair_extent: "large_area" }, tag: { chemistry: "amino_carboxylate_mci" }, rank: {}, meta: { form: "liquid_brush_spray", data_status: "verified", selectable: true, source: "cortecvci.com MCI-2020 — confirm current AU distributor", confirmed_date: null } },
  },
  "Fosroc Nitocor MCI": {
    rows: [
      ["application_mode", "gate", "surface_concrete/admixture"],
      ["corrosion_cause_max", "gate", "chloride"],
      ["repair_extent", "gate", "localized_patch/large_area"],
      ["chemistry", "tag", "mci (confirm chemistry)"],
      ["form", "meta", "surface + admixture"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "fosroc_nitocor_mci", gates: { application_mode: "surface_concrete/admixture", corrosion_cause_max: "chloride", repair_extent: "localized_patch/large_area" }, tag: { chemistry: "mci" }, rank: {}, meta: { form: "surface+admixture", data_status: "verified", selectable: true, source: "parchem.com.au Fosroc Nitocor — confirm current name/form (range revised)", confirmed_date: null } },
  },
  "Mapei Mapefer — Rebar Corrosion Protection Coating": {
    rows: [
      ["application_mode", "gate", "rebar_coating"],
      ["corrosion_cause_max", "gate", "chloride"],
      ["repair_extent", "gate", "localized_patch"],
      ["chemistry", "tag", "cementitious_2comp"],
      ["form", "meta", "2-component coating (to rebar)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "mapei_mapefer", gates: { application_mode: "rebar_coating", corrosion_cause_max: "chloride", repair_extent: "localized_patch" }, tag: { chemistry: "cementitious_2comp" }, rank: {}, meta: { form: "2comp_rebar_coating", data_status: "verified", selectable: true, source: "mapei.com/au Mapefer — applied direct to cleaned rebar, NOT a surface MCI", confirmed_date: null } },
  },
};

export function CorrosionInhibitorsMCIIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Migrating corrosion inhibitors (MCI) in reinforcement corrosion management</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Migrating corrosion inhibitors (MCIs) are used in reinforcement corrosion management where full concrete removal and rebar cleaning is not feasible — typically on large-area structures such as elevated carparks, bridges, multi-storey building facades, and balconies. MCIs are applied to the concrete surface and migrate through the concrete matrix to the reinforcement, where they form a passivating molecular film that slows the rate of corrosion.
        </p>
        {expanded && (
          <>
            <p>
              MCIs are not a repair in the structural sense — they do not restore section loss, remove chloride contamination, or re-alkalize carbonated concrete. They are a corrosion management tool that extends the time between repair interventions. For active repair zones where the rebar is exposed and cleaned, direct rebar coating products (such as Mapei Mapefer) or epoxy zinc-rich primers are applied in preference to MCIs. Cathodic protection is the electrochemical alternative for structures where MCI alone is insufficient.
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

const DESIGN_CRITERIA = "Chemistry — amino-alcohol/amine vapour-phase migrating type vs amino-carboxylate adsorption type; application method — surface-applied migrating (MCI) vs admixed (new repair mortar/concrete) vs 2C cementitious carrier coating; migration/penetration depth required to reach and passivate the reinforcement at the actual concrete cover; chloride contamination level / threshold the inhibitor is rated to manage (% chloride by mass of cement); adjunct only — used WITH concrete repair, patch repair or realkalisation/cathodic methods, does not replace removal of contaminated/spalled concrete; coverage (m²/L) and number of coats/applications; dwell/cure time before overcoating or membrane; compatibility with subsequent coatings, membranes and repair mortars (bond effect if film-forming); efficacy verification and monitoring (half-cell potential per ASTM C876, corrosion-rate); alignment with EN 1504-7 (rebar protection) / EN 1504-9 principles; service-life expectation and re-application interval";

export function CorrosionInhibitorsMCIProductSection() {
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

      <AutoProductReference products={PRODUCTS} cards={CORROSION_INHIBITOR_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Corrosion inhibitors (MCI)" />
    </>
  );
}
