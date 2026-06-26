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

type FilterTag =
  | "Welded-mesh"
  | "Deformed-bar"
  | "Trench-mesh"
  | "D500L"
  | "D500N"
  | "Overlay-reinforcement"
  | "Slab-reinforcement"
  | "Structural";

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
    fullLabel: "InfraBuild / OneSteel / Lysaght — Steel Distributor",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#374151",
    name: "SL62 Welded Mesh — 6 mm D500L",
    descriptionLine: "6 mm diameter D500L ductility class welded mesh — 200 × 200 mm grid — for thin overlays, topping slabs, and slab repair reinforcement",
    productType: "Welded reinforcing mesh — D500L — 6 mm diameter",
    filterTags: ["Welded-mesh", "D500L", "Overlay-reinforcement", "Slab-reinforcement"],
    techChips: [
      { label: "SL62 — 6 mm @ 200 × 200", cls: "bg-slate-100 text-slate-700" },
      { label: "D500L ductility class", cls: "bg-slate-100 text-slate-700" },
      { label: "Overlay and topping slab use", cls: "bg-amber-50 text-amber-700" },
      { label: "Steel distributor — state by state", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "SL62 is a standard welded reinforcing mesh in 6 mm diameter D500L (low ductility) bars at 200 × 200 mm centres. Used in thin concrete overlays, topping slabs, and slab repair reinforcement where a light reinforcing mat is required. D500L ductility class limits its use to applications where the engineer has specified low-ductility mesh — not suitable for applications requiring D500N (normal ductility) or seismic-rated ductility class. Supplied in standard sheet form (usually 6.0 m × 2.4 m). Available from InfraBuild (formerly OneSteel), Lysaght, and steel reinforcing distributors nationally — confirm availability and cut-to-size options with the local distributor. Confirm the specification grade (SL or RL) and bar diameter from the project structural drawings before ordering.",
    technicalProperties: [
      "6 mm D500L deformed bar — 200 × 200 mm weld pattern",
      "D500L — low ductility class — suitable for slab overlays and topping slabs as specified",
      "Standard sheet 6.0 m × 2.4 m — cut to size on site or by distributor",
      "InfraBuild / Lysaght / local steel distributor",
    ],
    limitations: [
      "D500L ductility class — not suitable where D500N or seismic ductility class is specified",
      "Confirm the mesh grade (SL62, SL72, SL82) from the structural drawings — do not substitute grades without engineer's approval",
      "Minimum concrete cover over mesh must be maintained — confirm from AS 3600 for the exposure classification",
      "Not suitable for primary structural reinforcement in beams, columns, or slabs where normal ductility (D500N) is required",
    ],
    procurementSources: [
      { name: "InfraBuild — nationally (state distributors)", url: "https://www.infrabuild.com" },
    ],
  },
  {
    fullLabel: "InfraBuild / OneSteel / Steel Distributor",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#0369a1",
    name: "SL81 Welded Mesh — 8 mm D500L",
    descriptionLine: "8 mm diameter D500L welded mesh — 200 × 200 mm grid — for thicker overlays, repair pours, and slab-on-grade reinforcement in repair",
    productType: "Welded reinforcing mesh — D500L — 8 mm diameter",
    filterTags: ["Welded-mesh", "D500L", "Overlay-reinforcement", "Slab-reinforcement"],
    techChips: [
      { label: "SL81 — 8 mm @ 200 × 200", cls: "bg-sky-100 text-sky-800" },
      { label: "D500L ductility class", cls: "bg-slate-100 text-slate-700" },
      { label: "Thicker overlays and repair pours", cls: "bg-amber-50 text-amber-700" },
      { label: "Steel distributor — state by state", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "SL81 is a standard welded reinforcing mesh in 8 mm diameter D500L bars at 200 × 200 mm centres. Heavier than SL62, it is used in thicker concrete repair overlays, slab-on-ground repairs, and repair pours where additional reinforcing weight is specified. D500L ductility class — same ductility limitation as SL62. Supplied in standard sheet form. Available from InfraBuild, Lysaght, and steel reinforcing distributors nationally — confirm availability and any fabrication requirements with the local distributor. For repair applications, the structural engineer of record will specify the mesh grade on the repair drawings — do not substitute without written approval.",
    technicalProperties: [
      "8 mm D500L deformed bar — 200 × 200 mm weld pattern",
      "D500L — low ductility class",
      "Heavier reinforcement than SL62 — for thicker overlays and repair pours",
      "InfraBuild / Lysaght / local steel distributor",
    ],
    limitations: [
      "D500L ductility class — not suitable where D500N or seismic ductility is specified",
      "Confirm mesh grade from structural drawings — SL81 vs SL82 vs RL81 — do not substitute without engineer approval",
      "Maintain minimum concrete cover from AS 3600 for the specified exposure classification",
      "Heavier sheet weight than SL62 — confirm site handling and placement requirements with the contractor",
    ],
    procurementSources: [
      { name: "InfraBuild — nationally (state distributors)", url: "https://www.infrabuild.com" },
    ],
  },
  {
    fullLabel: "InfraBuild / Steel Distributor",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#7c3aed",
    name: "N12 / N16 Deformed Bar — D500N",
    descriptionLine: "12 mm or 16 mm diameter D500N deformed reinforcing bar — for structural repair starter bars, dowels, and repair pour reinforcement requiring normal ductility",
    productType: "Deformed reinforcing bar — D500N — N12 or N16",
    filterTags: ["Deformed-bar", "D500N", "Structural", "Overlay-reinforcement"],
    techChips: [
      { label: "D500N — normal ductility", cls: "bg-violet-100 text-violet-800" },
      { label: "N12 or N16 — 12 mm or 16 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Starter bars and structural repair", cls: "bg-amber-50 text-amber-700" },
      { label: "Steel distributor — state by state", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "N12 and N16 deformed reinforcing bars in D500N (normal ductility) are used in structural repair applications where normal ductility class is required — including starter bars grouted or epoxy-anchored into existing concrete, structural repair pour reinforcement, and supplementary reinforcement in repair overlays where D500N is specified. D500N bars meet the full ductility and strength requirements of AS 3600 for primary structural reinforcement. N12 (12 mm) and N16 (16 mm) are the most common diameters used in remedial repair work — N10 and N20 are also available. Bars supplied in standard 12 m lengths, cut and bent to order by the steel distributor. Available from InfraBuild and reinforcing steel distributors nationally — confirm lead time for fabricated bar and bent items.",
    technicalProperties: [
      "D500N — 500 MPa yield strength — normal ductility class — suitable for primary structural reinforcement",
      "N12 (12 mm) or N16 (16 mm) — most common repair diameters",
      "Suitable for starter bar installation, structural repair pours, and dowels",
      "InfraBuild — national supply — confirm lead time for cut and bent",
    ],
    limitations: [
      "Do not substitute D500N bar with D500L mesh where D500N ductility is specified by the engineer",
      "Confirm bar diameter and grade from the structural repair drawings — N12 and N16 are different in cross-sectional area and load capacity",
      "Minimum concrete cover must be maintained per AS 3600 for the exposure classification",
      "Fabricated (cut and bent) bar requires lead time — confirm with steel distributor before programming the repair works",
    ],
    procurementSources: [
      { name: "InfraBuild — nationally (state distributors)", url: "https://www.infrabuild.com" },
    ],
  },
  {
    fullLabel: "InfraBuild / Steel Distributor",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#16a34a",
    name: "Trench Mesh L8TM / L11TM",
    descriptionLine: "Trench mesh (3-bar ladder mesh) — L8TM or L11TM — for strip footing repairs, repair pours to narrow sections, and edge repair reinforcement",
    productType: "Trench mesh — L8TM or L11TM — 3-bar D500L",
    filterTags: ["Welded-mesh", "D500L", "Overlay-reinforcement", "Structural"],
    techChips: [
      { label: "Trench mesh — 3 bar", cls: "bg-green-100 text-green-900" },
      { label: "L8TM or L11TM", cls: "bg-slate-100 text-slate-700" },
      { label: "Strip footings and narrow repair pours", cls: "bg-amber-50 text-amber-700" },
      { label: "Steel distributor — state by state", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Trench mesh (L8TM and L11TM) is a 3-bar ladder-style welded mesh product used for strip footing repair, narrow repair pours, retaining wall repairs, and situations where a full sheet mesh is not practical. L8TM uses 8 mm D500L bars; L11TM uses 11 mm D500L bars. The 3-bar configuration fits into narrow trench or strip footing excavations where full-width mesh sheets cannot be placed. Used in remedial repair for footing crack repairs, edge beam rebuild, and strip footing reinforcement. Supplied in lengths by the steel distributor — confirm standard length availability and cut-to-size options with the local distributor. Confirm the trench mesh specification from the structural repair drawings before ordering.",
    technicalProperties: [
      "3-bar D500L ladder mesh — L8TM (8 mm) or L11TM (11 mm)",
      "Suited to narrow trench, strip footing, and edge repair sections",
      "D500L ductility class — confirm suitability with the engineer of record",
      "InfraBuild / local steel distributor",
    ],
    limitations: [
      "D500L ductility — not suitable where D500N or seismic class is specified for the repair element",
      "3-bar configuration limits the width of the reinforced section — confirm suitability for the repair geometry with the engineer",
      "Confirm L8TM vs L11TM specification from the drawings — the two grades are different in bar diameter and cross-sectional area",
      "Minimum concrete cover requirements under AS 3600 apply — confirm cover achievable with the repair section geometry",
    ],
    procurementSources: [
      { name: "InfraBuild — nationally (state distributors)", url: "https://www.infrabuild.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Welded-mesh", label: "Welded mesh" },
  { id: "Deformed-bar", label: "Deformed bar" },
  { id: "Trench-mesh", label: "Trench mesh" },
  { id: "D500L", label: "D500L" },
  { id: "D500N", label: "D500N" },
  { id: "Overlay-reinforcement", label: "Overlay reinforcement" },
  { id: "Slab-reinforcement", label: "Slab reinforcement" },
  { id: "Structural", label: "Structural" },
];

const SYSTEM_COMPARISON = [
  {
    product: "SL62 Welded Mesh",
    bar: "6 mm @ 200 × 200",
    grade: "D500L",
    spacing: "200 × 200 mm",
    notes: "Thin overlays and topping slabs — lightest mesh option",
  },
  {
    product: "SL81 Welded Mesh",
    bar: "8 mm @ 200 × 200",
    grade: "D500L",
    spacing: "200 × 200 mm",
    notes: "Thicker overlays and repair pours — heavier than SL62",
  },
  {
    product: "N12 / N16 Deformed Bar",
    bar: "12 mm or 16 mm",
    grade: "D500N",
    spacing: "As per structural drawings",
    notes: "Primary structural repair — starter bars and repair pours",
  },
  {
    product: "Trench Mesh L8TM / L11TM",
    bar: "8 mm or 11 mm — 3 bar",
    grade: "D500L",
    spacing: "3-bar ladder",
    notes: "Strip footings and narrow repair sections",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Concrete overlay reinforcement on existing carpark slabs and slab-on-ground repairs where a reinforcing mat is specified over the existing substrate",
    "Repair pour reinforcement in structural concrete repair where the engineer has specified a reinforced repair",
    "Starter bar installation (N12 / N16 D500N) into existing concrete using chemical anchor adhesives — for new construction joints, repair pour connections, and structural continuity",
    "Strip footing repair reinforcement using trench mesh (L8TM / L11TM) in footing crack or spalling repair",
    "Supplementary reinforcement in seismic or structural upgrade works where the engineer specifies additional reinforcement over or adjacent to existing reinforcement",
    "Edge beam rebuild and balcony repair where the existing reinforcement is removed and replaced with new bar after break-out",
  ],
  selectionCriteria: [
    "Mesh grade (SL62, SL81) — selected by the structural engineer based on the repair load case and AS 3600 requirements — do not substitute grades without engineer approval",
    "D500L vs D500N — D500L is specified for non-structural overlays and topping slabs; D500N (deformed bar) is specified for primary structural reinforcement and where seismic ductility is required",
    "Deformed bar (N12, N16) for starter bars and structural repair pours where mesh cannot physically fit or where the engineer requires individual bars at specific centres",
    "Trench mesh for narrow strip footing repairs and edge sections where full-width mesh sheet placement is not possible",
    "Confirm bar diameter and spacing from the structural repair drawings — the structural engineer specifies the reinforcement; the contractor sources and places it",
    "Minimum concrete cover — confirm from AS 3600 Table 4.10.3 for the specified exposure classification — this drives the formwork and spacer selection",
  ],
  limitations: [
    "Reinforcement is a structural element — selection of grade, diameter, spacing, and cover is the responsibility of the structural engineer of record — do not vary from the specification without written approval",
    "D500L mesh is not suitable for use in seismic design or where normal ductility class (D500N) is required — check the structural specification",
    "Corroded or section-loss-damaged existing reinforcement must be assessed by the structural engineer before a repair strategy is determined — the engineer may specify full bar replacement rather than repair mortar only",
    "Minimum lap length, development length, and connection details for new-to-existing reinforcement must be designed by the structural engineer — do not assume standard lap lengths apply",
    "Bar chairs and cover spacers must be of appropriate type and size — plastic bar chairs prevent staining; mortar spacers can become corrosion initiation points in exposed environments",
    "Tie wire is used for positioning only — it provides no structural load transfer between bars",
  ],
  standardsNotes: [
    "AS/NZS 4671 — Steel reinforcing materials — bar and mesh grade designations, ductility classes, and minimum tensile and yield strength requirements",
    "AS 3600 — Concrete Structures — cover requirements for the exposure classification, reinforcement spacing, and development length requirements",
    "AS 3600 Table 4.10.3 — minimum cover for reinforcement for each exposure class — critical for selecting the correct bar chair height",
    "AS/NZS 4671 D500L — low ductility mesh — suitable for slabs on ground, topping slabs, and overlays as specified by the engineer",
    "AS/NZS 4671 D500N — normal ductility — suitable for all primary structural reinforcement including beams, columns, and slabs where ductility is required",
  ],
  suitableDefects: [
    "Structural concrete repair where the engineer specifies a reinforced repair pour",
    "Carpark slab overlay where a reinforced bonded overlay is specified to restore structural slab depth and load capacity",
    "Balcony and edge beam rebuild requiring new reinforcement after full break-out and removal of the existing corroded or structurally inadequate section",
    "Strip footing repair where the footing depth or width is reinstated with reinforced concrete after break-out and clean-up",
  ],
  typicalSubstrates: [
    "New repair pour concrete — the mesh or bar is placed within the formwork or repair pour and encapsulated in the new concrete",
    "Existing concrete slab surface — overlay mesh placed on bar chairs above the prepared existing slab surface before overlay pour",
    "Existing concrete where starter bars are epoxy-anchored or grouted into drilled holes",
    "Strip footing excavation — trench mesh placed in the trench before fresh concrete pour in strip footing repair",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["need", "section_loss_replacement / overlay_reinforcement / not_required", "only where reinforcement is lost or supplementary reinforcement is specified"],
    ["ductility", "D500L / D500N", "primary structural → D500N; light overlay/topping → D500L (as specified)"],
    ["form", "mesh / bar", "mesh for overlays/slabs; bar for starter bars/dowels/structural"],
    ["engineer_specified", "required / not_required", "grade/diameter taken from structural drawings — engineer-specified"],
  ],
  json: {
    category: "reinforcement_mesh",
    stage1_gates: {
      need: { allowed: ["section_loss_replacement", "overlay_reinforcement", "not_required"], rule: "only where reinforcement lost/supplementary specified" },
      ductility: { allowed: ["D500L", "D500N"], rule: "primary structural=D500N; light overlay=D500L" },
      form: { allowed: ["mesh", "bar"], rule: "mesh=overlays/slabs; bar=starter/dowels/structural" },
      engineer_specified: { allowed: ["required", "not_required"], rule: "grade/diameter from structural drawings" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "SL62 Welded Mesh — 6 mm D500L": {
    rows: [
      ["form", "gate", "mesh"],
      ["ductility", "gate", "D500L"],
      ["application", "gate", "overlay_reinforcement (thin overlays/toppings)"],
      ["diameter", "meta", "6 mm @ 200×200"],
      ["sheet_size", "meta", "6.0 × 2.4 m"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "sl62_welded_mesh", gates: { form: "mesh", ductility: "D500L", application: "overlay_reinforcement" }, tag: {}, rank: {}, meta: { diameter: "6mm@200x200", sheet_size: "6.0x2.4m", data_status: "verified", selectable: true, source: "InfraBuild SL62 — D500L low-ductility; not for D500N applications", confirmed_date: null } },
  },
  "SL81 Welded Mesh — 8 mm D500L": {
    rows: [
      ["form", "gate", "mesh"],
      ["ductility", "gate", "D500L"],
      ["application", "gate", "overlay_reinforcement (thicker overlays/pours)"],
      ["diameter", "meta", "8 mm @ 200×200"],
      ["sheet_size", "meta", "standard sheet"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "sl81_welded_mesh", gates: { form: "mesh", ductility: "D500L", application: "overlay_reinforcement" }, tag: {}, rank: {}, meta: { diameter: "8mm@200x200", sheet_size: "standard", data_status: "verified", selectable: true, source: "InfraBuild SL81 — D500L; heavier than SL62 for thicker overlays/repair pours", confirmed_date: null } },
  },
  "N12 / N16 Deformed Bar — D500N": {
    rows: [
      ["form", "gate", "bar"],
      ["ductility", "gate", "D500N"],
      ["application", "gate", "section_loss_replacement / starter_bars / dowels"],
      ["diameter", "meta", "12 mm or 16 mm"],
      ["sheet_size", "meta", "12 m lengths (cut/bent to order)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "n12_n16_deformed_bar", gates: { form: "bar", ductility: "D500N", application: "section_loss_replacement" }, tag: {}, rank: {}, meta: { diameter: "12mm/16mm", sheet_size: "12m_cut_bent", data_status: "verified", selectable: true, source: "InfraBuild N12/N16 D500N — normal ductility; starter bars, dowels, structural repair pours", confirmed_date: null } },
  },
  "Trench Mesh L8TM / L11TM": {
    rows: [
      ["form", "gate", "mesh (strip)"],
      ["ductility", "gate", "D500L"],
      ["application", "gate", "overlay_reinforcement (strip/edge beams)"],
      ["diameter", "meta", "L8TM / L11TM — 3-bar"],
      ["sheet_size", "meta", "trench mesh strip"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "trench_mesh_l8tm_l11tm", gates: { form: "mesh", ductility: "D500L", application: "overlay_reinforcement" }, tag: {}, rank: {}, meta: { diameter: "L8TM/L11TM_3bar", sheet_size: "trench_strip", data_status: "verified", selectable: true, source: "InfraBuild trench mesh L8TM/L11TM — D500L 3-bar strip", confirmed_date: null } },
  },
};

export function ReinforcementMeshIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Reinforcing mesh and bar in concrete repair and structural reinforcement corrosion remediation</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Reinforcing mesh and bar are specified by the structural engineer in repair applications where new or supplementary reinforcement is required — for example, in structural repair pours, reinforced overlays, and edge beam or balcony rebuilds. In reinforcement corrosion repair, new bar replaces corroded bars that are assessed as having insufficient remaining section after break-out and cleaning. The reinforcement grade, diameter, and spacing are determined by the engineer of record from AS 3600 requirements.
        </p>
        {expanded && (
          <>
            <p>
              The most common grades in Australian reinforced concrete repair are D500L (low ductility) welded mesh (SL62, SL81) for overlays and topping slabs, and D500N deformed bar (N12, N16) for structural repair pours and starter bar installation. Trench mesh (L8TM, L11TM) is used in narrow repair sections and strip footing repair. Sourcing is from InfraBuild (formerly OneSteel/Smorgon Steel) and regional steel distributors. Confirm the specific grade and cut requirements from the structural repair drawings before ordering.
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

const DESIGN_CRITERIA = "Steel type & corrosion duty — carbon D500 (welded mesh / deformed bar) vs 316 stainless (chloride-exposed, splash/coastal supplementary reinforcement); grade & ductility class to AS/NZS 4671 (D500L mesh / D500N bar, L vs N ductility); bar diameter & pitch (6/8 mm mesh, N12/N16 bar, trench mesh L8/L11TM); cross-sectional steel area (mm²/m) to engineer design (AS 3600); cover requirement & exposure classification (AS 3600 Table — A1–C2 / cover for durability); lap/development length & tie/weld detailing; compatibility/galvanic isolation when stainless adjacent to carbon steel; chloride & carbonation environment; bend/fabrication & sheet/bar size; concrete cover vs repair depth in patch repairs.";

export function ReinforcementMeshProductSection() {
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

      <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Reinforcement corrosion" criteriaKey="reinforcement-corrosion/reinforcement-mesh" />
    </>
  );
}
