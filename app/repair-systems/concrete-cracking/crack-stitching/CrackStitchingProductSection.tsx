"use client";

import { useState, useRef } from "react";
import { Layers, SquareStack, Ruler, ChevronDown, ChevronUp, BookOpen, AlertTriangle } from "lucide-react";
import { TechCard, CheckCircle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { CRACK_STITCH_CARDS } from "./crackStitchingData";

type FilterTag = "Carbon-fibre" | "Stainless-steel" | "Proprietary" | "Custom-fabricated" | "Structural" | "Dormant-Only";

type Product = {
  fullLabel: string;
  brandUrl: string;
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
    fullLabel: "Ardex Australia (Rhino)",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#64748b",
    name: "Ardex Concrete Crack Lock (CCL)",
    descriptionLine: "Carbon-fibre crack-bridging stitch — re-establishes tensile continuity across dormant cracks — CONFIRM against current Ardex Australia TDS",
    productType: "Carbon-fibre crack-bridging stitch — proprietary — Ardex Australia (Rhino)",
    filterTags: ["Carbon-fibre", "Proprietary", "Structural", "Dormant-Only"],
    techChips: [
      { label: "Carbon-fibre stitch", cls: "bg-slate-100 text-slate-700" },
      { label: "Bonded with structural epoxy — CONFIRM TDS", cls: "bg-amber-50 text-amber-700" },
      { label: "Engineer-designed (ACI 224.1R / AS 3600)", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Ardex Concrete Crack Lock (CCL) is a carbon-fibre crack-bridging stitch that re-establishes tensile continuity across dormant cracks in concrete. The stitch is bedded into a prepared route/slot and bonded with a structural epoxy. Stitch spacing and number follow the manufacturer detail within an engineer's design; all structural cases are designed to ACI 224.1R / AS 3600. CONFIRM the bonding adhesive, slot detail and installation method against the current Ardex Australia TDS.",
    technicalProperties: [
      "Carbon-fibre crack-bridging stitch — non-corroding",
      "Bonded into a prepared slot with a structural epoxy — CONFIRM adhesive from current Ardex Australia TDS",
      "Stitch spacing and number per manufacturer detail within an engineer's design",
      "Ardex Australia — national trade supply",
    ],
    limitations: [
      "Dormant cracks only — confirm the cause of movement is arrested before stitching",
      "Structural cases require an engineer's stitch design — no crack-width → size lookup",
      "CONFIRM substrate preparation, slot detail and embedment against the current Ardex Australia TDS",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Fortress (imported)",
    brandUrl: "#",
    accentColor: "#0369a1",
    name: "Fortress Crack Stitch / StitchDog",
    descriptionLine: "Imported carbon-fibre crack stitch — confirm Australian availability and current TDS before specifying",
    productType: "Carbon-fibre crack stitch — imported",
    filterTags: ["Carbon-fibre", "Proprietary", "Structural", "Dormant-Only"],
    techChips: [
      { label: "Carbon-fibre stitch", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm AU availability + TDS", cls: "bg-amber-50 text-amber-700" },
      { label: "Engineer-designed (ACI 224.1R / AS 3600)", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Fortress Crack Stitch / StitchDog is an imported carbon-fibre crack-stitching system for re-establishing tensile continuity across dormant cracks. The stitch is bonded into a prepared slot with a structural epoxy. Confirm current Australian availability and all installation and performance detail against the manufacturer TDS. All structural stitching is designed to ACI 224.1R / AS 3600.",
    technicalProperties: [
      "Carbon-fibre crack stitch — non-corroding",
      "Bonded into a prepared slot with a structural epoxy — confirm from manufacturer TDS",
      "Imported system — confirm Australian availability before specifying",
    ],
    limitations: [
      "Confirm Australian availability and the current TDS before specifying",
      "Dormant cracks only; structural cases require an engineer's stitch design",
      "Stitch size, number, spacing and embedment are engineer-determined",
    ],
    procurementSources: [
      { name: "Imported — confirm Australian distributor", url: "#" },
    ],
  },
  {
    fullLabel: "Custom-fabricated (no proprietary brand)",
    brandUrl: "#",
    accentColor: "#334155",
    name: "Steel stitching dog / dowel (custom-fabricated)",
    descriptionLine: "Austenitic stainless (304 / 316) staple or dowel fabricated to the engineer's detail — bonded with a structural epoxy anchoring adhesive",
    productType: "Stitching staple / dowel — custom-fabricated stainless steel",
    filterTags: ["Stainless-steel", "Custom-fabricated", "Structural", "Dormant-Only"],
    techChips: [
      { label: "Austenitic stainless 304 / 316", cls: "bg-slate-100 text-slate-700" },
      { label: "Bonded with epoxy anchoring adhesive", cls: "bg-amber-50 text-amber-700" },
      { label: "Sizing engineer-specified", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "A custom-fabricated steel stitching dog or dowel is an austenitic stainless (304 / 316) staple or dowel fabricated to the engineer's detail and bonded across a dormant crack with a structural epoxy anchoring adhesive to re-establish tensile continuity. There is no proprietary product and no size table — staple/dowel size, number, spacing and embedment are subject to engineer specification to ACI 224.1R / AS 3600. The bonding adhesive is selected and installed per its own TDS (see the Epoxy anchoring adhesives page).",
    technicalProperties: [
      "Austenitic stainless steel staple / dowel (304 / 316) — fabricated to the engineer's detail",
      "Bonded with a structural epoxy anchoring adhesive — see the Epoxy anchoring adhesives page",
      "Size, number, spacing and embedment subject to engineer specification (ACI 224.1R / AS 3600)",
    ],
    limitations: [
      "No size table — all dimensions are engineer-specified",
      "Use austenitic stainless (304 / 316) — not plain carbon steel — in exposed or chloride environments",
      "Dormant cracks only; arrest the cause of movement before stitching",
    ],
    procurementSources: [
      { name: "Custom fabrication to engineer's detail", url: "#" },
    ],
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Re-establishing tensile continuity across a dormant structural crack in a beam, slab, wall or column",
    "Stitching dormant cracks where a non-corroding carbon-fibre stitch is preferred over a steel staple",
    "Engineer-detailed stainless steel staple/dowel stitching where a fully fabricated solution is specified",
    "Companion to epoxy injection — the crack is re-bonded by injection and stitched to carry tension across the plane",
  ],
  selectionCriteria: [
    "Confirm the crack is dormant — stitching does not arrest ongoing movement; the cause must be diagnosed and addressed first",
    "Carbon-fibre proprietary stitch (Ardex CCL, Fortress) where a low-profile non-corroding stitch suits the detail",
    "Custom-fabricated stainless staple/dowel where the engineer specifies a fabricated solution and embedment",
    "All sizing — stitch size, number, spacing and embedment — is engineer-determined; there is no crack-width → size lookup",
    "Bonding medium is a structural epoxy / epoxy anchoring adhesive — confirm against the relevant TDS",
  ],
  limitations: [
    "Not for live or moving cracks — stitching a moving crack without arresting movement will not hold",
    "Stitching is a structural intervention — all cases require structural engineer design to ACI 224.1R / AS 3600",
    "No generic size tables — do not specify stitch dimensions or spacing without a site-specific engineer design",
    "Confirm proprietary product detail, bonding adhesive and installation against the current manufacturer TDS",
  ],
  standardsNotes: [
    "ACI 224.1R — Causes, Evaluation, and Repair of Cracks in Concrete Structures — the primary reference for crack stitching design",
    "AS 3600 — Concrete Structures — the structural engineer confirms the stitched element meets design capacity",
    "Manufacturer TDS — proprietary stitch detail, bonding adhesive and installation must be confirmed for each product",
    "Bonding adhesive — see the Epoxy anchoring adhesives reference for the structural adhesive used to bond steel stitches/dowels",
  ],
  suitableDefects: [
    "Dormant structural cracks where tensile continuity across the crack plane must be restored",
    "Through-section cracks in beams, slabs, walls and columns confirmed dormant by crack-width monitoring",
    "Cracks requiring combined injection (re-bonding) and stitching (tensile continuity)",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — beams, slabs, walls, columns",
    "Precast concrete elements — confirm fixing/embedment detail with the engineer",
    "Masonry stitching is a related but separate application — confirm the proprietary system is rated for the substrate",
  ],
};

export function CrackStitchingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">When crack stitching is the right choice</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Crack stitching re-establishes tensile continuity across a dormant structural crack by anchoring stitches — proprietary carbon-fibre stitches or custom-fabricated austenitic stainless staples/dowels — across the crack plane, bonded with a structural epoxy. It is specified where the loss of tensile continuity across the crack reduces the element capacity and the crack is confirmed dormant. Stitching is frequently paired with epoxy injection: injection re-bonds the crack faces, and the stitches carry tension across the plane.
        </p>
        {expanded && (
          <>
            <p>
              Stitching does not arrest ongoing movement — confirm the crack is dormant and that the underlying cause has been diagnosed and addressed before stitching. For live or moving cracks, the movement must first be arrested, or a flexible treatment used.
            </p>
            <p>
              There is no crack-width → stitch-size lookup. Stitch size, number, spacing and embedment are determined by the structural engineer to ACI 224.1R / AS 3600. Proprietary carbon-fibre stitches follow the manufacturer detail within that design; custom stainless staples/dowels are fabricated and bonded with a structural epoxy anchoring adhesive entirely to the engineer's specification.
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

const DESIGN_CRITERIA = "Crack must be DORMANT (movement arrested) — stitching restores tensile continuity, it does not accommodate movement; stitch material (non-corroding carbon fibre vs austenitic stainless 304/316); stitch size, number, spacing and embedment ENGINEER-DETERMINED to ACI 224.1R / AS 3600 (no crack-width→size lookup); bonding medium (structural epoxy / epoxy anchoring adhesive) and embedment per adhesive TDS; substrate slot/route preparation; confirm proprietary product detail and Australian availability against current manufacturer TDS.";

export function CrackStitchingProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
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

      {/* Prominent sizing note — there is NO crack-width → size lookup */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white"><Ruler size={15} /></div>
          <h3 className="text-base font-extrabold text-sky-950">Sizing is engineer-determined — there is no crack-width → size table</h3>
        </div>
        <p className="text-sm leading-7 text-sky-900">
          Crack stitching is not specified from a crack-width lookup. Proprietary carbon-fibre stitch spacing follows the manufacturer detail within an engineer&rsquo;s design; custom stainless staples/dowels are fabricated and bonded entirely to the engineer&rsquo;s specification. In all structural cases the stitch size, number, spacing and embedment are designed by a structural engineer to ACI 224.1R / AS 3600. Steel stitches/dowels are bonded with a structural epoxy anchoring adhesive — see the{" "}
          <a href="/repair-systems/concrete-cracking/epoxy-anchoring-adhesives" className="font-bold text-sky-700 underline hover:text-sky-900">Epoxy anchoring adhesives</a>{" "}reference.
        </p>
      </div>

      <AutoProductReference products={PRODUCTS} cards={CRACK_STITCH_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete crack stitching" />
    </>
  );
}
