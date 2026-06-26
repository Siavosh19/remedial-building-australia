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
import { CATHODIC_PROTECTION_CARDS } from "./cathodicProtectionData";

type FilterTag =
  | "Galvanic-discrete"
  | "Galvanic-mesh"
  | "ICCP"
  | "Chloride"
  | "Marine"
  | "Carpark"
  | "No-power"
  | "Impressed-current";

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
    fullLabel: "Vector Corrosion Technologies / Local Distributor",
    brandUrl: "https://www.vectorcorrosion.com",
    accentColor: "#0369a1",
    name: "Galvashield XP Discrete Anode",
    descriptionLine: "Embedded discrete zinc galvanic anode installed in drilled pockets adjacent to repaired rebar in patch repairs — no external power required",
    productType: "Discrete embedded zinc galvanic anode",
    dataNote: "Owner to confirm — vectorcorrosion.com returned a TLS certificate error during audit; product name, specifications, and the current Australian distributor could not be verified from the live source. Confirm the product designation and current AU distributor with Vector Corrosion Technologies before publishing.",
    filterTags: ["Galvanic-discrete", "Chloride", "Marine", "Carpark", "No-power"],
    techChips: [
      { label: "Discrete zinc galvanic anode", cls: "bg-sky-100 text-sky-800" },
      { label: "No external power required", cls: "bg-slate-100 text-slate-700" },
      { label: "Installed at patch repair perimeter", cls: "bg-amber-50 text-amber-700" },
      { label: "Vector Corrosion — via distributor", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Galvashield XP is a discrete embedded zinc galvanic anode used in patch repair of reinforced concrete structures affected by chloride-induced corrosion. The anode is installed in drilled pockets in the concrete adjacent to the cleaned rebar at the perimeter of each patch repair — this is specifically intended to address the 'incipient anode' or 'halo effect', where the undisturbed concrete immediately surrounding a patch repair has elevated corrosion risk due to galvanic coupling between the repaired zone and the adjacent contaminated concrete. The zinc anode corrodes sacrificially, providing cathodic protection to the surrounding rebar. Requires no external power supply — entirely galvanic action driven by the electrochemical potential difference between zinc and steel in the concrete electrolyte. Install at the density and spacing specified by the corrosion engineer. Available through Vector Corrosion Technologies Australian distributors — confirm current distributor and supply before specifying.",
    technicalProperties: [
      "Discrete zinc galvanic anode — installed in drilled pockets at patch repair perimeter",
      "No external power required — galvanic (sacrificial) action",
      "Addresses the incipient anode / halo effect at patch repair edges",
      "Available through Vector Corrosion Technologies Australian distributors",
    ],
    limitations: [
      "Galvanic current output is limited — not suitable for heavily contaminated structures where high protective current density is required; ICCP may be needed",
      "Effectiveness depends on concrete resistivity — high-resistivity (dry) concrete reduces galvanic current output; confirm suitability with a corrosion engineer",
      "Installation requires drilling pockets and connecting to the existing rebar — specialist corrosion contractor preferred",
      "Confirm current Australian distributor for Galvashield XP before specifying — availability can vary by state",
    ],
    procurementSources: [
      { name: "Vector Corrosion Technologies — Australian distributors (confirm)", url: "https://www.vectorcorrosion.com" },
    ],
  },
  {
    fullLabel: "Specialist Corrosion Contractor",
    brandUrl: "https://www.corrpro.com.au",
    accentColor: "#7c3aed",
    name: "Impressed Current Cathodic Protection (ICCP) System",
    descriptionLine: "Engineered impressed current cathodic protection system — external power supply drives protective current through embedded anode mesh or ribbon — specialist design and installation",
    productType: "Impressed current cathodic protection (ICCP) system",
    dataNote: "Owner to confirm — corrpro.com.au returned connection refused during audit; CorrPro Australia's current services and contact details could not be verified from the live source. ICCP is an engineered system, not a trade product — engage a NACE/AMPP-accredited corrosion engineer and confirm the specialist contractor before publishing.",
    filterTags: ["ICCP", "Chloride", "Marine", "Carpark", "Impressed-current"],
    techChips: [
      { label: "Impressed current system", cls: "bg-violet-100 text-violet-800" },
      { label: "External power supply required", cls: "bg-amber-100 text-amber-900" },
      { label: "Specialist engineering design", cls: "bg-slate-100 text-slate-700" },
      { label: "Ongoing monitoring required", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Impressed current cathodic protection (ICCP) systems apply a controlled DC current from an external power supply through an anode system installed on or within the concrete structure, driving the reinforcement cathodic and suppressing the anodic corrosion reaction at the steel surface. ICCP is the most powerful and controllable form of cathodic protection for reinforced concrete — capable of protecting large areas with high chloride contamination where galvanic systems are insufficient. The anode system may be titanium mesh, ribbon, or conductive coating embedded in a repair overlay, or installed on the concrete surface. ICCP systems require specialist corrosion engineering design, third-party commissioning, and ongoing monitoring and maintenance — they are not a standard trade product but a complete engineered system. Designers and specifiers should engage a NACE/AMPP-accredited corrosion engineer for ICCP system design. CorrPro Australia is one of several specialist ICCP contractors operating in Australia.",
    technicalProperties: [
      "Impressed current — DC power supply drives protective current through the structure",
      "Can protect large areas and heavily chloride-contaminated structures",
      "Requires specialist engineering design, commissioning, and ongoing monitoring",
      "Multiple anode types — titanium mesh, ribbon, conductive coating overlay",
    ],
    limitations: [
      "Requires a permanent external power supply — loss of power means loss of protection",
      "Requires specialist engineering design by a qualified corrosion engineer — not a trade-supply product",
      "Requires ongoing monitoring and maintenance under a corrosion engineer's program — budget accordingly",
      "Overprotection risk (hydrogen embrittlement in high-strength or prestressed steel) if current output is not controlled — critical to have a qualified design and commissioning team",
    ],
    procurementSources: [
      { name: "CorrPro Australia — ICCP specialist (one of several)", url: "https://www.corrpro.com.au" },
    ],
  },
  {
    fullLabel: "Vector Corrosion Technologies / Sika / Local Distributor",
    brandUrl: "https://www.vectorcorrosion.com",
    accentColor: "#16a34a",
    name: "Galvanic Mesh Anode System",
    descriptionLine: "Zinc or aluminium galvanic mesh anode embedded in repair overlay or bonded to concrete surface — large-area galvanic protection without external power",
    productType: "Embedded galvanic mesh anode system",
    filterTags: ["Galvanic-mesh", "Chloride", "Marine", "No-power"],
    techChips: [
      { label: "Galvanic mesh anode", cls: "bg-green-100 text-green-900" },
      { label: "Embedded in repair overlay", cls: "bg-slate-100 text-slate-700" },
      { label: "No external power required", cls: "bg-amber-50 text-amber-700" },
      { label: "Large-area application", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Galvanic mesh anode systems use expanded zinc or aluminium mesh embedded in a repair overlay or bonded to the concrete surface to provide large-area galvanic cathodic protection without an external power supply. The mesh is installed over the prepared concrete surface, connected to the reinforcing steel, and then overlaid with a cementitious or polymer-modified repair mortar. The galvanic action of the zinc or aluminium mesh in contact with the concrete electrolyte drives a protective current to the reinforcement below. Used on large soffit areas, seawalls, jetty decks, and carpark slabs where discrete anodes are insufficient and ICCP is not feasible. Products include Sika Ferrogard-embedded mesh systems, Vector Corrosion Technologies galvanic mesh, and similar products. Confirm current product availability, installation requirements, and expected service life from the supplier or a corrosion engineer before specifying.",
    technicalProperties: [
      "Expanded zinc or aluminium mesh — embedded in repair overlay or bonded to surface",
      "No external power required — galvanic action",
      "Suitable for large-area soffits, seawalls, jetty decks, carpark slabs",
      "Connected to existing rebar — protective current flows through the concrete electrolyte",
    ],
    limitations: [
      "Protective current output is limited — check with corrosion engineer that the expected current density is sufficient for the chloride contamination level",
      "Requires a competent cementitious or polymer-modified overlay over the mesh — overlay quality is critical to system performance",
      "Service life is finite — zinc anodes consumed over time; design service life should be confirmed from the corrosion engineer's report",
      "Confirm specific mesh product and installation protocol from the supplier — multiple systems available (Vector, Sika, others) with different design life and performance data",
    ],
    procurementSources: [
      { name: "Vector Corrosion Technologies — Australian distributors", url: "https://www.vectorcorrosion.com" },
      { name: "Sika Australia — mesh anode systems", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Vector Galvashield XP2",
    descriptionLine: "Embedded zinc galvanic discrete anode (higher output) — confirm current specification and Australian availability with Fosroc technical before specifying",
    productType: "Embedded zinc galvanic discrete anode (higher output)",
    filterTags: ["Galvanic-discrete", "Chloride", "Marine", "Carpark", "No-power"],
    techChips: [
      { label: "Embedded zinc galvanic discret", cls: "bg-slate-100 text-slate-700" },
      { label: "Fosroc — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Fosroc Vector Galvashield XP2 is a Embedded zinc galvanic discrete anode (higher output). Embedded sacrificial zinc anode for incipient-anode (ring/halo) corrosion control around patch repairs, with higher output than XP. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Fosroc technical before specifying. TODO: verify specific performance figures from the current Fosroc TDS.",
    technicalProperties: [
      "Embedded zinc galvanic discrete anode (higher output)",
      "Embedded sacrificial zinc anode for incipient-anode (ring/halo) corrosion control around patch repairs, with higher output than XP.",
      "Confirm key performance values (strength / coverage / application) from the current Fosroc TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Fosroc",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Fosroc technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Fosroc",
    ],
    procurementSources: [
      { name: "Fosroc — Australian trade supply", url: "https://www.parchem.com.au" },
    ],
  }

];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Galvanic-discrete", label: "Galvanic discrete" },
  { id: "Galvanic-mesh", label: "Galvanic mesh" },
  { id: "ICCP", label: "ICCP" },
  { id: "Chloride", label: "Chloride" },
  { id: "Marine", label: "Marine" },
  { id: "Carpark", label: "Carpark" },
  { id: "No-power", label: "No power required" },
  { id: "Impressed-current", label: "Impressed current" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Galvashield XP Discrete Anode",
    type: "Galvanic discrete",
    power: "None required",
    use: "Patch repair perimeter — halo effect",
    notes: "Simple installation — drilled pocket at repair edge",
  },
  {
    product: "ICCP System",
    type: "Impressed current",
    power: "External DC supply",
    use: "Large area, high chloride contamination",
    notes: "Specialist engineering design and ongoing monitoring required",
  },
  {
    product: "Galvanic Mesh Anode",
    type: "Galvanic mesh",
    power: "None required",
    use: "Large-area overlay — soffits, seawalls, carparks",
    notes: "Embedded in repair overlay — finite service life",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Galvashield XP discrete anodes installed at the perimeter of patch repairs on chloride-affected carparks, balconies, and marine structures — addressing the incipient anode/halo effect",
    "ICCP systems on large chloride-contaminated structures such as multi-storey carparks, wharves, jetties, and bridges where galvanic systems cannot provide sufficient protective current",
    "Galvanic mesh anode systems embedded in repair overlays on seawalls, jetty decks, and carpark slab soffits as a large-area protection strategy",
    "Post-repair cathodic protection where chloride levels in the residual concrete outside the repair zone are above the corrosion threshold",
    "New construction with elevated chloride risk — galvanic or impressed current systems designed into new parking structures or marine infrastructure",
    "Protective treatment combined with MCI surface treatment — where cathodic protection is the primary method and MCI provides supplementary protection",
  ],
  selectionCriteria: [
    "Use discrete galvanic anodes (Galvashield XP) for patch repair applications where the primary concern is the incipient anode effect at the repair boundary — straightforward installation, no ongoing power required",
    "Use ICCP systems where the chloride level in residual concrete is very high, the area is large, or where high protective current density is required to suppress active corrosion in heavily contaminated structures",
    "Use galvanic mesh anode systems for large-area overlay applications on soffits, seawalls, and carpark decks where discrete anodes cannot cover the area efficiently",
    "Engage a NACE/AMPP-accredited corrosion engineer for any cathodic protection design — system design, current density requirements, and monitoring protocols must be engineered for the specific structure",
    "Consider concrete resistivity — low-resistivity (wet) concrete supports galvanic systems better; high-resistivity (dry) concrete may require ICCP to deliver adequate protective current",
    "Confirm service life requirements — ICCP can be adjusted and maintained indefinitely; galvanic systems have a finite service life determined by the anode mass and current output",
  ],
  limitations: [
    "Cathodic protection is not a repair — it does not restore lost concrete section, reinstate bond, or repair spalled areas; physical repair must accompany or precede cathodic protection",
    "All cathodic protection systems require a qualified corrosion engineer for design and commissioning — do not specify or install without specialist involvement",
    "Overprotection of prestressed or post-tensioned steel is a critical risk — hydrogen embrittlement can cause catastrophic failure — never apply cathodic protection to prestressed steel without specialist engineering review",
    "ICCP systems require ongoing maintenance and periodic current adjustment — if the maintenance budget or access for monitoring cannot be sustained, galvanic systems may be more appropriate",
    "Galvanic anodes have a finite service life — the design service life must be confirmed from the corrosion engineer's report and factored into the long-term maintenance plan",
    "Cathodic protection does not chloride-extract the existing concrete — chloride levels in residual concrete remain; continued corrosion management is required over the structure's remaining life",
  ],
  standardsNotes: [
    "AS 2832.5 — Cathodic protection of metals — internal surfaces — referenced for general cathodic protection principles",
    "AS/NZS 2832.1 — Cathodic protection of metals — pipes — for general CP design context",
    "EN 12696 — Cathodic protection of steel in concrete — the primary standard for cathodic protection of reinforced concrete in Europe; widely referenced by Australian corrosion engineers",
    "NACE SP0290 / AMPP SP0290 — corrosion control of reinforcing steel in atmospherically exposed concrete structures — design and application guidance",
    "AS 3600 — structural requirements for any overlay or repair mortar used as part of a cathodic protection system installation",
  ],
  suitableDefects: [
    "Chloride-induced reinforcement corrosion — the primary indication for cathodic protection in reinforced concrete",
    "Structures with residual chloride contamination above the corrosion threshold in the concrete surrounding active patch repairs — where the incipient anode effect is a concern",
    "Large-area chloride contamination on carpark slabs, seawalls, wharves, and jetties — where physical repair of all contaminated concrete is not feasible",
    "Post-repair protection where the cost of removing all chloride-contaminated concrete would be prohibitive",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — carpark decks and soffits, balconies, building facades, seawalls, wharves, jetties, bridges",
    "Precast concrete with embedded reinforcement — piles, beams, panels in marine or coastal environments",
    "Concrete structures with residual chloride contamination above the corrosion threshold (typically 0.4% Cl⁻ by mass of cement)",
    "Do NOT apply to prestressed or post-tensioned concrete without specialist corrosion engineering review — hydrogen embrittlement risk",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["chloride_level", "low / high", "cathodic protection suited to chloride-driven corrosion; low → MCI/coating may suffice"],
    ["power_available", "mains / no_power", "no_power → galvanic (sacrificial); mains → ICCP possible"],
    ["area", "patch_perimeter / large_area", "patch_perimeter → discrete anode (incipient/halo); large_area → mesh or ICCP"],
    ["engineer_designed", "required / not_required", "always engineer-designed — confirm with corrosion engineer"],
  ],
  json: {
    category: "cathodic_protection",
    stage1_gates: {
      chloride_level: { allowed: ["low", "high"], rule: "suited to chloride; low=MCI/coating may suffice" },
      power_available: { allowed: ["mains", "no_power"], rule: "no_power=galvanic; mains=ICCP possible" },
      area: { allowed: ["patch_perimeter", "large_area"], rule: "patch_perimeter=discrete anode; large_area=mesh/ICCP" },
      engineer_designed: { allowed: ["required", "not_required"], rule: "always engineer-designed" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Galvashield XP Discrete Anode": {
    rows: [
      ["protection_type", "gate", "galvanic_discrete"],
      ["power_required", "gate", "no_power"],
      ["application", "gate", "patch_perimeter (incipient/halo)"],
      ["chemistry", "tag", "zinc_galvanic"],
      ["data_status", "meta", "unconfirmed"],
      ["selectable", "meta", "false"],
    ],
    json: { id: "galvashield_xp", gates: { protection_type: "galvanic_discrete", power_required: "no_power", application: "patch_perimeter" }, tag: { chemistry: "zinc_galvanic" }, rank: {}, meta: { data_status: "unconfirmed", selectable: false, source: "vectorcorrosion.com — TLS cert error during audit; product name/specs/AU distributor unverifiable", confirmed_date: null } },
  },
  "Impressed Current Cathodic Protection (ICCP) System": {
    rows: [
      ["protection_type", "gate", "iccp"],
      ["power_required", "gate", "mains"],
      ["application", "gate", "large_area/high_chloride"],
      ["chemistry", "tag", "titanium_anode (engineered)"],
      ["data_status", "meta", "unconfirmed"],
      ["selectable", "meta", "false"],
    ],
    json: { id: "iccp_system", gates: { protection_type: "iccp", power_required: "mains", application: "large_area" }, tag: { chemistry: "titanium_anode" }, rank: {}, meta: { data_status: "unconfirmed", selectable: false, source: "corrpro.com.au — connection refused during audit; engineered system, not a trade product — engage corrosion engineer", confirmed_date: null } },
  },
  "Galvanic Mesh Anode System": {
    rows: [
      ["protection_type", "gate", "galvanic_mesh"],
      ["power_required", "gate", "no_power"],
      ["application", "gate", "large_area (overlay)"],
      ["chemistry", "tag", "zinc/aluminium_mesh"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "galvanic_mesh_anode", gates: { protection_type: "galvanic_mesh", power_required: "no_power", application: "large_area" }, tag: { chemistry: "zinc_aluminium_mesh" }, rank: {}, meta: { data_status: "verified", selectable: true, source: "Vector/Sika galvanic mesh — embedded in overlay; engineer-designed; confirm product + design life", confirmed_date: null } },
  },
};

export function CathodicProtectionIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Cathodic protection systems for reinforced concrete structures</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cathodic protection (CP) is an electrochemical technique that suppresses the anodic oxidation of steel reinforcement by driving a protective current to the rebar surface. It is used where chloride contamination levels in the residual concrete are above the corrosion threshold and physical removal of all contaminated concrete is not feasible or economical. CP does not remove chloride or restore lost section — it arrests ongoing corrosion by keeping the steel in a cathodic (protected) electrochemical state.
        </p>
        {expanded && (
          <>
            <p>
              Two main CP approaches are used in Australian reinforced concrete: galvanic (sacrificial anode) systems, where zinc or aluminium anodes corrode preferentially to drive a protective current without external power; and impressed current cathodic protection (ICCP), where an external DC power supply drives the protective current through an embedded or surface-mounted anode system. Galvanic discrete anodes (Galvashield XP) are widely used in patch repair to address the incipient anode (halo) effect. ICCP is used for large-area, heavily contaminated structures. All CP system design must be carried out by a qualified corrosion engineer — do not specify or install without specialist involvement.
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

const DESIGN_CRITERIA = "System type — galvanic/sacrificial (discrete zinc anode, embedded mesh) vs impressed-current ICCP; driving voltage & protective current density (mA/m² of steel — typ 2–20 for ICCP, lower for galvanic); chloride contamination level & concrete resistivity (governs anode spacing & life); anode capacity / charge (A·h or mass of zinc) & design life (typ 10–30+ yr galvanic, 25–50+ ICCP per ISO 12696); steel continuity & surface area to be protected; depassivation risk / incipient-anode (ring/halo) control around patch repairs; reference electrodes & monitoring (100 mV depolarisation criterion, ISO 12696); cover depth & embedment; power-supply/transformer-rectifier & zoning for ICCP; overlay/encapsulation compatibility with repair mortar; AS 3600 durability context.";

export function CathodicProtectionProductSection() {
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

      <AutoProductReference products={PRODUCTS} cards={CATHODIC_PROTECTION_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Cathodic protection" />
    </>
  );
}
