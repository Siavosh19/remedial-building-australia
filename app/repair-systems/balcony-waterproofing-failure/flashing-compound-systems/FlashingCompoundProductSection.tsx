"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { FLASHING_CARDS } from "./flashingData";

const TECH_INFO = {
  typicalApplications: [
    "Detailing penetrations, upstands, internal corners, drains and changes of plane in a waterproofing system",
    "Liquid-applied fleece-reinforced flashing of complex details (PMMA / PU resins)",
    "Reinforcing field membranes and details with stitch-bonded fabric",
    "Patching and localised sealing/repair with brush-applied bituminous compounds and tapes",
  ],
  selectionCriteria: [
    "Match the flashing chemistry to the field membrane and the detail (PMMA/PU liquid resin, bituminous compound, or tape)",
    "Use a root-resistant flashing resin at green-roof / planter details",
    "Reinforce liquid details with the matched fabric (e.g. PermAFab) fully embedded",
    "Confirm primer and compatibility with the field membrane — flashings are part of the membrane system",
    "Use tapes for fast, simple junctions; liquid resins for complex 3-D details",
  ],
  limitations: [
    "Flashings are detail products — not the field membrane",
    "Liquid/fabric details must be fully embedded — dry fabric or voids fail",
    "Reactive resins (PMMA/PU) have temperature and mix/catalyst limits",
    "Generic tapes must be confirmed compatible with the membrane and substrate",
    "Confirm root-resistance where planters/green roofs are involved",
  ],
  standardsNotes: [
    "Flashings/details are specified within the membrane manufacturer's system and warranty",
    "ETAG 005 — liquid-applied roof waterproofing kits (e.g. Alsan flashing resins)",
    "AS 4654.2 — design/installation including terminations and upstands",
    "Use the membrane manufacturer's matched flashing and reinforcing fabric",
  ],
  suitableDefects: [
    "Leaks at penetrations, upstands, drains and internal corners",
    "Failed terminations and changes of plane",
    "Cracked/aged flashing details requiring re-detailing",
    "Localised membrane damage requiring patching/reinforcement",
  ],
  typicalSubstrates: [
    "Cured field waterproofing membranes (at details and terminations)",
    "Concrete and masonry upstands and kerbs",
    "Metal penetrations, drains and flashings",
    "Existing bituminous details (compatible compounds/tapes)",
  ],
};

export function FlashingCompoundIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are flashing compounds &amp; detailing products?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Most balcony and roof leaks start at the details — penetrations, upstands, drains, internal corners and changes of plane. Flashing compounds and detailing products waterproof those junctions: liquid-applied fleece-reinforced PMMA/PU resins for complex 3-D details (some root-resistant for planters), brush-applied bituminous compounds for patching, stitch-bonded reinforcing fabric, and self-adhesive flashing tapes. They are detail components within the membrane system — selection turns on compatibility with the field membrane, the detail geometry, and root-resistance where planters/green roofs are involved.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Flashing chemistry matched to the field membrane and detail (PMMA/PU liquid resin vs bituminous compound vs tape); root-resistant flashing at green-roof/planter details; matched reinforcing fabric fully embedded; primer and membrane compatibility; tapes for simple junctions, liquid resins for complex 3-D details. Flashings are detail components within the membrane system — confirm every value against the current AU TDS.";

export function FlashingCompoundProductSection() {
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

      <AutoProductReference products={[]} cards={FLASHING_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Flashing compounds & detailing" pruneEmptyFacts />
    </>
  );
}
