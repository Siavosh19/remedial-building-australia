"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { POSITIVE_NEGATIVE_TANKING_CARDS } from "./positiveNegativeTankingData";

const TECH_INFO = {
  typicalApplications: [
    "Positive-side tanking of basement walls and slabs where waterproofing is applied to the water-facing face",
    "Negative-side tanking of basement walls where positive-side access is not available — applied to the interior face",
    "Below-grade concrete and masonry walls and floor slabs in Class 2 strata basements and commercial buildings",
    "Tanking in conjunction with cavity drain systems where the cementitious coat provides the primary water barrier",
  ],
  selectionCriteria: [
    "Positive-side application preferred where access to the external face allows — higher performance and avoids hydrostatic pressure acting to debond the coating",
    "Negative-side application where positive-side access is not available — confirm the hydrostatic-pressure resistance rating with Westox",
    "Stop active water entry with hydraulic cement plugging before applying the cementitious tanking coating",
    "Confirm compatible primer and surface preparation requirements from the Westox TDS",
  ],
  limitations: [
    "Active running water must be stopped before applying cementitious tanking — hydraulic cement plugging required first",
    "Negative-side tanking is subject to hydrostatic pressure from behind — confirm the pressure rating with the manufacturer",
    "Cementitious tanking is not suitable for structures subject to significant structural movement",
    "Always confirm current specification and hydrostatic-pressure resistance from the manufacturer TDS",
  ],
  standardsNotes: [
    "Confirm the current Westox technical data sheet before specifying — product specifications are subject to change",
    "AS/NZS 4020 — confirm potable-water contact compliance if the tanking is to a water-retaining structure",
    "Basement waterproofing system selection should consider BS 8102 (or equivalent) guidance on performance grades",
  ],
  suitableDefects: [
    "Basement water ingress — positive- or negative-side tanking of walls and slabs",
    "Below-grade concrete and masonry requiring a waterproofing treatment",
    "Sealed-surface bond coat under a sheet membrane or render",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete basement walls and floor slabs",
    "Masonry basement walls — brick, blockwork and stone",
    "Concrete blockwork below grade",
  ],
};

export function PositiveNegativeTankingIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are positive / negative tanking coatings?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Positive / negative tanking coatings are cementitious (often latex-modified) slurry coatings applied to below-grade concrete and masonry to form a water barrier. "Positive side" means the coating is on the water-facing (external) face — the preferred configuration; "negative side" means it is on the dry interior face, used where the external face is inaccessible. Negative-side coatings must resist hydrostatic pressure trying to push them off the substrate, so the manufacturer's pressure rating must be confirmed.
        </p>
        <p>
          They are applied to a clean, prepared substrate after any active running water has been stopped with a hydraulic cement plug, and are not suitable for structures with significant ongoing movement. Confirm the side of application, the negative-side pressure rating, primer and surface preparation from the manufacturer TDS.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the side of application (positive preferred; negative where the outer face is inaccessible) and the negative-side hydrostatic-pressure rating; that active water is plugged first; the chemistry (latex-modified cementitious) and mix ratio / coverage; surface preparation and primer; that the structure is not subject to significant movement; and AS/NZS 4020 if water-retaining. Confirm every value against the current AU manufacturer TDS.";

export function PositiveNegativeTankingProductSection() {
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

      <AutoProductReference products={[]} cards={POSITIVE_NEGATIVE_TANKING_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Positive / negative tanking coatings" pruneEmptyFacts />
    </>
  );
}
