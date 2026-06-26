"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { MOISTURE_SUPPRESSION_CARDS } from "./moistureSuppressionData";

const TECH_INFO = {
  typicalApplications: [
    "Damp concrete basement walls and slabs where the substrate cannot be fully dried before waterproofing",
    "Primer / moisture-barrier course prior to a cementitious or membrane waterproofing system in basement remediation",
    "Below-grade concrete with residual curing moisture or groundwater dampness",
    "Interior faces of basement walls, floors, tunnels, cellars, retaining walls, lift wells and underground carparks",
  ],
  selectionCriteria: [
    "Specify where substrate moisture prevents application of standard dry-substrate primers — a damp-tolerant epoxy moisture barrier is required",
    "Confirm the compatible waterproofing membrane or tanking system with the manufacturer (Parchem)",
    "Confirm the allowable substrate moisture content from the current TDS before application",
    "Confirm dry film thickness (300 µm for Nitoproof 510) and number of coats for the moisture-barrier function",
  ],
  limitations: [
    "Not a standalone waterproofing product — a primer / moisture-barrier course only, before membrane or tanking application",
    "Confirm moisture-content limits with the manufacturer — not for running water or pooled water substrates",
    "Stop active water (hydraulic plug / injection) before applying",
    "Always confirm from the manufacturer TDS before specifying",
  ],
  standardsNotes: [
    "Confirm the current manufacturer technical data sheet (Parchem / Fosroc) before specifying",
    "Confirm hydrostatic-pressure resistance of the full waterproofing system for the basement environment",
    "Low-VOC / low-odour formulations suit enclosed basements — confirm ventilation and H&S requirements",
  ],
  suitableDefects: [
    "Basement water ingress — moisture on substrate prior to tanking or waterproofing",
    "Damp concrete where standard acrylic primers are not appropriate",
    "Residual construction / curing moisture preventing membrane adhesion",
  ],
  typicalSubstrates: [
    "Damp in-situ concrete basement walls and slabs",
    "Below-grade concrete with residual construction moisture",
    "Brick, block, masonry and stone — confirm preparation and moisture limits",
  ],
};

export function MoistureSupprimerIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are moisture suppression primers?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Moisture suppression primers (moisture-barrier coatings) are damp-tolerant primer courses applied to concrete and masonry that cannot be fully dried before a waterproofing or finish system is installed. They restrict the passage of dampness through the substrate, allowing a subsequent membrane, tanking or floor system to be applied to a substrate that would otherwise have too high a moisture content.
        </p>
        <p>
          They are a primer course only — not a standalone waterproofing product — and do not resist hydrostatic pressure on their own. Active running or pooled water must be stopped first (hydraulic cement plug or injection). Confirm the allowable substrate moisture content, the required dry film thickness, and the compatible waterproofing / tanking system with the manufacturer before specifying.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the substrate is damp (not running / pooled) and that active water is plugged first; the chemistry (damp-tolerant epoxy) and dry film thickness for the moisture-barrier function; that it is a primer course before a membrane / tanking system (not standalone); the allowable substrate moisture content; VOC / odour for enclosed basements; and cure / recoat windows. Confirm every value against the current AU manufacturer TDS.";

export function MoistureSupprimerProductSection() {
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

      <AutoProductReference products={[]} cards={MOISTURE_SUPPRESSION_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Moisture suppression primers" pruneEmptyFacts />
    </>
  );
}
