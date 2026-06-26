"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { PODIUM_OUTLET_CARDS } from "./podiumOutletData";

const TECH_INFO = {
  typicalApplications: [
    "Collecting balcony, terrace and podium deck water to a downpipe (rainwater outlets)",
    "Flat-roof and podium drainage with a flanged outlet sealed to the membrane",
    "Through-parapet / upstand overflow drainage (scuppers and overflow boxes)",
    "Secondary / overflow protection alongside the primary deck drainage",
    "Large catchments drained syphonically (engineered Pluvia-type systems)",
  ],
  selectionCriteria: [
    "Confirm the membrane connection — an integral clamp flange or sealed puddle-flange to the field membrane",
    "Size the outlet to the catchment / flow and the downpipe (hydraulic capacity)",
    "Provide overflow / secondary drainage (scupper or overflow outlet) per the design",
    "Material for the duty — stainless for durability, PVC for light-duty balconies",
    "Leaf guard / dome grate where blockage by debris is a risk",
  ],
  limitations: [
    "The outlet is only as watertight as its flange connection to the membrane — confirm the seal detail",
    "Under-sized outlets pond and overflow; provide overflow protection",
    "Fabricated scuppers depend on the apron seal to the membrane",
    "Syphonic systems must be engineered as a whole (outlet + pipework + hydraulics)",
    "Outlets must sit at the low point with the deck falling to them",
  ],
  standardsNotes: [
    "Roof and deck drainage design and falls per AS 3500 / the hydraulic engineer",
    "Overflow provisions per the drainage design",
    "External above-ground drainage detailing per AS 4654.2",
    "The membrane-to-outlet connection is part of the waterproofing system",
  ],
  suitableDefects: [
    "Water ponding on a balcony / podium with no low-point outlet",
    "Failed / leaking outlet-to-membrane junctions",
    "No overflow path — water backing up over thresholds",
    "Under-drained roofs / podiums needing engineered outlet capacity",
  ],
  typicalSubstrates: [
    "Waterproofed concrete balcony, terrace and podium decks",
    "Flat-roof membranes (clamp-flange outlets)",
    "Parapet / upstand walls (through-wall scuppers and overflow boxes)",
    "Podium decks beneath landscape / paving build-ups",
  ],
};

export function DrainagePodiumOutletsScuppersIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are drainage outlets &amp; overflow scuppers?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Rainwater outlets and overflow scuppers take water off a balcony, roof or podium deck and connect it to the downpipe or overflow path. They range from PVC and stainless flanged outlets that clamp to the field membrane, through engineered syphonic roof systems for large catchments, to fabricated through-parapet scupper and overflow boxes. The outlet is only as watertight as its connection to the membrane (an integral clamp flange or a sealed puddle-flange detail). Selection turns on that membrane connection, the outlet capacity for the catchment, the overflow provision, and the material for the duty.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Membrane connection (integral clamp flange or sealed puddle-flange to the field membrane); outlet sizing for the catchment / flow and the downpipe; overflow / secondary drainage provision (scupper or overflow outlet); material for the duty (PVC light-duty, stainless for durability); engineered hydraulics for syphonic systems; outlets at the low point with the deck falling to them. The outlet-to-membrane connection is part of the waterproofing system — confirm every value against the current AU manufacturer data and the hydraulic engineer.";

export function DrainagePodiumOutletsScuppersProductSection() {
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

      <AutoProductReference products={[]} cards={PODIUM_OUTLET_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Drainage outlets & overflow scuppers" pruneEmptyFacts />
    </>
  );
}
