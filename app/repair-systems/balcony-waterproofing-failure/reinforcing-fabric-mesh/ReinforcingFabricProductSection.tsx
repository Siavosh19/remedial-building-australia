"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { REINFORCING_FABRIC_CARDS } from "./reinforcingFabricData";

const TECH_INFO = {
  typicalApplications: [
    "Reinforcing liquid membranes at internal and external corners and wall-floor junctions",
    "Detailing around pipe penetrations, floor wastes and puddle flanges",
    "Bridging construction joints, control joints and repaired cracks under the membrane",
    "Reinforcing changes of plane — steps, rebates, upstands and thresholds",
  ],
  selectionCriteria: [
    "Match the fabric to the membrane system — woven polyester, fibreglass mesh or non-woven by manufacturer",
    "Use the alkali-resistant fibreglass grade in cementitious membrane systems",
    "Embedded (in-coat) fabric vs pre-formed/self-adhesive junction tapes per the detail",
    "Confirm the required width at the junction — typically lapping onto each face",
    "Confirm which exact product the membrane system specifies — they are not interchangeable",
  ],
  limitations: [
    "Reinforcing fabric is not a waterproofing product on its own — the membrane coats waterproof",
    "Dry edges or exposed threads create wicking paths — the fabric must be fully encapsulated",
    "Standard (non-alkali-resistant) fibreglass mesh is not for cementitious systems",
    "Fabrics are not universally interchangeable across systems",
    "Full membrane dry-film thickness must still be achieved over the fabric at junctions",
  ],
  standardsNotes: [
    "Fabric is embedded between membrane coats per the manufacturer's junction detail",
    "First coat must fully wet through the fabric before the second coat is applied",
    "Reinforcement is part of the membrane system — match the manufacturer's specified product",
    "The membrane, not the fabric, is the waterproofing layer",
  ],
  suitableDefects: [
    "Cracked or split membrane at corners and junctions from movement",
    "Membrane failure at penetrations, floor wastes and changes of plane",
    "Unreinforced construction / control joints under a membrane",
    "Detail areas reinforced with the wrong or no fabric",
  ],
  typicalSubstrates: [
    "Concrete and screed substrates under liquid membranes",
    "Internal/external corners and wall-floor junctions",
    "Pipe penetrations, floor wastes and puddle flanges",
    "Construction joints, control joints and repaired cracks",
  ],
};

export function ReinforcingFabricIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are reinforcing fabric &amp; mesh?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Reinforcing fabric, fleece and mesh are embedded between coats of a liquid membrane at corners, junctions, penetrations and joints to reinforce the membrane where it is most likely to crack or split. They range from woven and non-woven polyester fabrics to alkali-resistant fibreglass mesh and pre-formed self-adhesive junction tapes — each matched to a particular membrane system. The fabric is not a waterproofing product on its own; the membrane coats above and below it do the waterproofing, and the fabric must be fully encapsulated. Selection turns on the membrane system, the fabric type it specifies, and the junction detail.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Fabric matched to the membrane system (woven polyester, alkali-resistant fibreglass mesh, non-woven, or pre-formed self-adhesive tape per manufacturer); embedded between coats and fully saturated/encapsulated with no dry edges; required width lapping onto each face of the junction; alkali-resistant grade in cementitious systems. The fabric is not the waterproofing layer — the membrane is. Fabrics are not interchangeable — confirm the exact specified product against the current AU manufacturer data.";

export function ReinforcingFabricProductSection() {
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

      <AutoProductReference products={[]} cards={REINFORCING_FABRIC_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Reinforcing fabric & mesh" pruneEmptyFacts />
    </>
  );
}
