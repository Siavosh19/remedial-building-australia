"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { CRYSTALLINE_TANKING_CARDS } from "./crystallineTankingData";

const TECH_INFO = {
  typicalApplications: [
    "Negative-side tanking of existing basement walls — applied to dry interior face where positive face is inaccessible",
    "Positive-side tanking of new below-grade concrete walls before backfill — most effective application",
    "Basement slab waterproofing — applied to top or soffit face of slab",
    "Water-retaining structures — water storage tanks, retention basins — confirm potable water approval",
    "Construction joint treatment — applied to joint before pour — complement to polyurethane waterstop",
    "Self-healing crack maintenance — applied over repaired crack zones to provide ongoing sealing protection",
  ],
  selectionCriteria: [
    "Positive-side access available (new construction): specify Xypex Concentrate or Penetron on the positive face before backfill — most effective configuration",
    "Positive-side inaccessible (existing basement, strata remediation): specify Xypex Concentrate or Penetron on the negative (interior) face — stop active water first with a hydraulic cement plug",
    "Xypex vs Penetron: broadly technically equivalent — select on engineer / consultant specification, supply preference, or contractor familiarity",
    "Use Xypex Modified as second coat over Concentrate in the two-coat Xypex system — do not use Modified alone for negative-side tanking",
    "Cracks above 0.4 mm: inject before crystalline tanking — crystalline self-healing does not reliably seal cracks above this width",
  ],
  limitations: [
    "Cannot be applied to masonry, brick, render, or non-cementitious substrates — the reaction requires unhydrated cement particles in concrete",
    "Active running water must be stopped before application — apply a hydraulic cement plug to discrete leak points first",
    "Cracks above 0.4 mm width must be injected before crystalline treatment — crystalline alone is insufficient for large cracks",
    "Moving construction joints require polyurethane sealant or injection — crystalline treatment does not accommodate joint movement",
    "Wet cure essential — drying out during cure impairs crystalline formation — mist with water and cover with hessian for minimum 3–5 days",
    "Not a substitute for a robust structural concrete design — thin or permeable concrete will not respond well to crystalline treatment",
  ],
  standardsNotes: [
    "AS 3600 Concrete Structures — crystalline waterproofing is a concrete protection and repair system — engineer must confirm suitability for structural elements",
    "NCC Volume One — below-grade waterproofing performance requirements — crystalline tanking must achieve the required performance outcome",
    "AS/NZS 4020 — Testing of products for use in contact with drinking water — confirm potable-water approval status with Xypex Australia / Penetron Australia for water-retaining structures",
    "BS 8102 Code of practice for protection of below ground structures against water from the ground — useful reference for negative-side tanking design philosophy",
  ],
  suitableDefects: [
    "Hydrostatic water ingress through concrete basement walls — seeping or weeping concrete without discrete cracks",
    "General moisture permeability of poorly waterproofed basement concrete",
    "Construction joint water ingress — applied over injected construction joints as secondary treatment",
    "New construction waterproofing — positive-side application before backfill in new basement construction",
  ],
  typicalSubstrates: [
    "Reinforced concrete basement walls — in-situ poured — must be sound and free of laitance",
    "Reinforced concrete slabs — basement floors and soffits",
    "Precast concrete — confirm compatibility with Xypex or Penetron Australia for the specific precast mix design",
    "NOT suitable: masonry, brick, block, render, or any non-cementitious substrate",
  ],
};

export function CrystallineTankingIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are crystalline tanking systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cementitious crystalline waterproofing systems are slurry-applied products that penetrate the capillary structure of concrete and react with unhydrated cement particles and water to form insoluble crystalline compounds that fill the capillaries and micro-cracks within the concrete matrix. Unlike surface-applied membranes — which sit on the surface and can delaminate — crystalline waterproofing becomes permanently integrated with the concrete, making the concrete itself less permeable rather than covering it with a separate layer.
        </p>
        <p>
          Their autogenous (self-healing) property — sealing new cracks that form after application as long as water is present — distinguishes crystalline systems from other waterproofing approaches, and suits basement structures subject to post-construction and seasonal movement. The critical limitation is the substrate: crystalline chemistry needs unhydrated cement to react with, so it cannot be applied to masonry, brick or render, and the concrete pores must be opened (grinding / HP water blast) and the surface free of laitance or a previous membrane. Active running water must be stopped with a hydraulic cement plug before application.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the substrate is sound concrete (not masonry / render) with open pores (ground / HP-blasted, laitance-free); the side of application (positive preferred; negative where the outer face is inaccessible); that active water is plugged and cracks >0.4 mm injected first; coverage and number of coats; hydrostatic-pressure rating and self-healing; mandatory wet-cure; and AS/NZS 4020 potable status for water-retaining use. Confirm every value against the current AU manufacturer TDS.";

export function CrystallineTankingProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      {/* ── System Technical Reference ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
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

      <AutoProductReference products={[]} cards={CRYSTALLINE_TANKING_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Cementitious crystalline tanking" pruneEmptyFacts />
    </>
  );
}
