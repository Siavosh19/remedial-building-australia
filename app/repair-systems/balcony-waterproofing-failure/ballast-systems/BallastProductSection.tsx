"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { BALLAST_CARDS } from "./ballastData";

const TECH_INFO = {
  typicalApplications: [
    "Holding down insulation and membrane on protected / inverted (upside-down) roofs",
    "Loose stone or gravel ballast over a protection layer on flat roofs",
    "Concrete pavers on pedestals as ballast plus a trafficable deck",
    "Podium build-ups where ballast resists wind uplift and floatation",
    "Drainage / blinding gravel within a roof or podium build-up",
  ],
  selectionCriteria: [
    "Confirm the ballast weight against the wind-uplift design",
    "Confirm the structure can carry the ballast dead load (engineer)",
    "Use rounded, washed stone — not sharp crushed aggregate — over the membrane",
    "Always lay a protection / separation layer between ballast and the membrane",
    "Pedestal-mounted pavers where a level, trafficable deck is wanted",
  ],
  limitations: [
    "Ballast is not waterproofing — it protects and holds down the membrane",
    "Sharp / crushed aggregate placed directly on a membrane can puncture it",
    "Under-weight ballast can be lifted by wind uplift",
    "Over-weight ballast can overload the structure — confirm the dead load",
    "Loose ballast can scour / migrate around outlets without restraint",
  ],
  standardsNotes: [
    "Wind-uplift / ballast design per the structural engineer and AS 1170.2 (wind)",
    "External above-ground waterproofing build-up per AS 4654.2",
    "Membrane manufacturer's protection-layer requirement beneath ballast",
    "Ballast sits within the build-up over the waterproofing system",
  ],
  suitableDefects: [
    "Wind-lifted / displaced membrane on an exposed flat roof",
    "Membrane punctured by sharp aggregate laid without protection",
    "Floating / uplifted insulation on an inverted roof",
    "Uneven, non-trafficable ballasted deck (convert to pavers on pedestals)",
  ],
  typicalSubstrates: [
    "Protected / inverted roof membranes (ballast over insulation)",
    "Flat-roof membranes over a protection layer",
    "Podium decks beneath paving / landscape build-ups",
    "Structural slabs carrying the ballast dead load",
  ],
};

export function BallastIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are ballast systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Ballast is the weight laid over the membrane on a protected / inverted roof or podium to hold down the insulation and membrane and resist wind uplift. It ranges from loose rounded stone and gravel, through concrete ballast pavers, to pavers mounted on adjustable pedestals that give a level, trafficable deck. Ballast is not waterproofing — it protects and restrains the membrane — and rounded, washed stone (not sharp crushed aggregate) should be used over a protection / separation layer so the membrane is not punctured. Selection turns on the ballast weight against wind uplift, the structural dead-load capacity, and the protection layer beneath.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Ballast weight against the wind-uplift design; structural dead-load capacity for the ballast; rounded, washed stone (not sharp crushed aggregate) over the membrane; a protection / separation layer between ballast and the membrane; pedestal-mounted pavers where a level trafficable deck is wanted; restraint of loose ballast around outlets. Ballast is a protective / hold-down layer within the build-up over the waterproofing system — confirm every value against the current AU manufacturer data and the structural engineer.";

export function BallastProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

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
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable defects and substrates
            </p>
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

      <AutoProductReference products={[]} cards={BALLAST_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Ballast systems" pruneEmptyFacts />
    </>
  );
}
