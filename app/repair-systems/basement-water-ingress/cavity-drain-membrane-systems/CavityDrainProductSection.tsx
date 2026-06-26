"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { CAVITY_DRAIN_CARDS } from "./cavityDrainData";

const TECH_INFO = {
  typicalApplications: [
    "Basement wall water management — intercept and drain water penetrating structural walls in Class 2 strata basements",
    "Basement floor water management — manage water penetrating the structural floor slab in occupied below-grade spaces",
    "Occupied basement remediation where positive-side access is unavailable — cavity drain is the interior solution",
    "High water table sites where tanking or injection is impractical due to continuous hydrostatic pressure",
    "Basement conversions — converting existing unoccupied basement or car park to Grade 3 habitable space",
    "Below-grade car park water management — Grade 1 or Grade 2 performance for non-habitable below-grade spaces",
  ],
  selectionCriteria: [
    "Habitable space (Grade 3): specify the complete Delta system — wall membrane (Delta MS 500 / MS 20), perimeter channel, floor drainage mat (Delta Geo-Drain), and active sump pump with backup",
    "Non-habitable below-grade space (Grade 1–2): cavity drain may be simplified — confirm with the BS 8102 grade table",
    "Delta MS 500 (standard): for wall applications where hydrostatic pressure is moderate (>250 kN/m², 2.25 L/s·m)",
    "Delta MS 20 (high-drainage): for high water pressure, a high groundwater table, or floor applications in high-flow conditions",
    "Delta Geo-Drain: always specify for floor applications under a concrete topping — provides geotextile filtration to prevent long-term blockage",
    "Always design the complete system with a perimeter drainage channel and sump — the membrane alone is not a functioning cavity drain system",
  ],
  limitations: [
    "Cavity drain is water management — NOT waterproofing — water continues to enter through the wall and is managed, not stopped",
    "Sump pump failure results in cavity flooding and water entering the habitable space — a backup pump and alarm are mandatory for Grade 3 applications",
    "Loss of habitable space — the cavity drain system, furring wall and drainage channel reduce basement floor area and headroom",
    "Ongoing maintenance obligation — sump pump, float switch and drainage channels require periodic inspection and maintenance — a strata maintenance plan is required",
    "Not appropriate for Grade 3 habitable space without a backup pump and overflow provision — single pump failure is an unacceptable risk for an occupied basement",
    "Not a structural repair — cavity drain does not address the cause of water ingress — structural assessment and cause investigation are required",
  ],
  standardsNotes: [
    "BS 8102:2022 Code of practice for protection of below-ground structures against water from the ground — the primary design reference for cavity drain systems",
    "BS 8102 Grade 1 (basic utility), Grade 2 (better utility), Grade 3 (habitable space — no water percolation) — specify the performance grade before selecting the system",
    "AS 3600 Concrete Structures — the structural engineer to confirm the floor slab design over the drainage mat",
    "NCC Volume One — habitability requirements for below-grade spaces in Class 2 buildings — Grade 3 performance is typically required for an occupied basement",
    "Confirm the applicable Australian reference with the design engineer — BS 8102 is widely referenced in Australia but is a British Standard",
  ],
  suitableDefects: [
    "Persistent water ingress through basement walls where injection and tanking have failed or are impractical",
    "Basement conversion — converting existing garaging or storage below-grade to habitable Class 2 space",
    "High water table — continuous hydrostatic pressure exceeds practical tanking capacity — cavity drain manages the ongoing water flow",
    "Complex basement geometry — many penetrations and changes of direction make membrane tanking impractical — cavity drain accommodates complexity",
  ],
  typicalSubstrates: [
    "Reinforced concrete basement walls — installed on the interior face — no adhesion to substrate — dimple projection provides stand-off",
    "Masonry or brick basement walls — cavity drain is the preferred system for masonry basements where crystalline tanking is not applicable",
    "Reinforced concrete basement floor slabs — floor drainage mat installed over the structural slab before the topping",
    "Mixed-substrate basement — cavity drain suits basements with concrete walls and masonry areas combined",
  ],
};

export function CavityDrainIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are cavity drain membrane systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cavity drain (BS 8102 Type C) membranes are studded HDPE sheets fixed to the interior face of basement walls and floors. They do not stop water — they <em>manage</em> it: water penetrating the structure runs down the cavity behind the studs to a perimeter drainage channel and is removed by a sump pump. This makes them the interior solution where positive-side waterproofing is inaccessible or the water table is too high for tanking.
        </p>
        <p>
          Because the system relies on continuous drainage and pumping, a sump pump with backup and a high-level alarm are mandatory for habitable (BS 8102 Grade 3) spaces, and the membrane is only one part of a designed system (membrane + perimeter channel + sump). It carries an ongoing maintenance obligation, reduces floor area / headroom, and does not address the cause of ingress — a structural assessment is still required.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the BS 8102 performance grade required (Grade 3 = habitable, needs backup pump + alarm); that cavity drain manages — not stops — water; the membrane duty (standard MS 500 vs high-drainage MS 20; Geo-Drain for floors under a topping); compressive strength and drainage capacity vs the water load; the complete system (membrane + perimeter channel + sump); and the maintenance plan. Confirm every value against the current manufacturer TDS.";

export function CavityDrainProductSection() {
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

      <AutoProductReference products={[]} cards={CAVITY_DRAIN_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Cavity drain membrane systems" pruneEmptyFacts />
    </>
  );
}
