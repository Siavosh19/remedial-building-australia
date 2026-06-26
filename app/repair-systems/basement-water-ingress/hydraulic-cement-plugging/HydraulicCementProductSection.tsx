"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { HYDRAULIC_CEMENT_CARDS } from "./hydraulicCementData";

const TECH_INFO = {
  typicalApplications: [
    "Actively leaking cracks in basement walls — water running through the crack at time of repair",
    "Construction joint active leaks — horizontal construction joint between wall and slab pour showing active flow",
    "Pipe penetration annular leaks — water running around service pipes through basement walls",
    "Tie-rod hole leaks — water gushing through form tie-rod voids in concrete walls",
    "First-stage repair before injection or tanking — plugging stops the flow to allow subsequent dry-condition repair work",
  ],
  selectionCriteria: [
    "Sika Plug: first-choice dedicated hydraulic plug — very short working time (~60–90 s) — confirmed for running water",
    "Fosroc Renderoc Plug: equivalent function with two set grades (Plug 1 ~1 min, Plug 20 ~20 min) — EN 1504 R1",
    "Master Builders rapid plug: confirm the correct product (MasterSeal 590) — the listed MasterEmaco S 488 is a structural repair mortar, not a plug",
    "After plugging: follow with PU injection, acrylic injection, or crystalline tanking depending on defect type and water pressure",
    "For multiple active leaks: stage the work — plug each leak in sequence, allowing each to harden before moving to the next",
  ],
  limitations: [
    "Temporary repair only — a hydraulic cement plug stops immediate flow but does not waterproof the substrate — a permanent repair is required",
    "Very short working time (1–3 min) — prepare only what can be applied in one operation; mix individually for each plug",
    "Must be held under sustained hand pressure until initial set — training required — poor technique is the primary failure mode",
    "Large voids or irregular surfaces must be pre-formed (chased to a clean conical shape) before plugging",
    "Not effective against very high hydrostatic pressure without an engineering assessment of plug adequacy",
    "Do not rely on a hydraulic cement plug as the sole waterproofing measure — always combine with a permanent waterproofing system",
  ],
  standardsNotes: [
    "EN 1504 — Renderoc Plug is classified EN 1504 Class R1 — confirm classification for the other products",
    "AS 3972 — General purpose and blended cements — governs the cement component of these products",
    "AS 3600 — Concrete Structures — the engineer must confirm structural adequacy of the plugged area",
    "NCC Volume One — performance requirements for below-grade waterproofing — hydraulic plugging is a preparatory step, not a standalone system",
  ],
  suitableDefects: [
    "Active water ingress through cracks in basement concrete walls — water running or gushing at time of repair",
    "Active leaking construction joints — horizontal or vertical joints showing active water flow",
    "Active leaking pipe penetrations — water running around services through basement walls",
    "Active tie-rod hole leaks — water gushing through form hardware paths in poured concrete",
  ],
  typicalSubstrates: [
    "Reinforced concrete basement walls — in-situ poured — active crack and joint plugging",
    "Reinforced concrete slabs (floor and soffit) — active crack plugging in basement floor slabs",
    "Masonry brick basement walls — apply to a chased-out void in the mortar joint or brick face — confirm adhesion with the manufacturer",
    "Precast concrete panels — confirm with the structural engineer before plugging in precast elements",
  ],
};

export function HydraulicCementIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is hydraulic cement plugging?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Hydraulic (rapid-setting) cement plugs are fast-setting Portland-cement mortars that set in seconds to a few minutes — fast enough to stop actively running water in a crack, joint or hole. They are the first step in basement leak repair: plug the flow so the permanent system (injection, crystalline tanking, or membrane) can be applied in dry conditions.
        </p>
        <p>
          They are a preparatory, temporary measure — not a standalone waterproofing system, and not effective against very high hydrostatic pressure without engineering assessment. Working time is extremely short (often 1–3 minutes), so each plug is mixed individually, pressed in from the edges of the leak, and held under hand pressure until set; irregular voids are chased to a clean conical shape first.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the leak is active running water (a hydraulic plug stops the flow only); the set grade for the flow (gushing = ~1 min, larger patch = longer); mix ratio and stiff consistency; that voids are chased to a clean conical shape; that it is a preparatory step before a permanent injection / crystalline / tanking system; and structural adequacy of the plugged area. Confirm every value against the current AU manufacturer TDS.";

export function HydraulicCementProductSection() {
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

      <AutoProductReference products={[]} cards={HYDRAULIC_CEMENT_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Hydraulic cement plugging" pruneEmptyFacts />
    </>
  );
}
