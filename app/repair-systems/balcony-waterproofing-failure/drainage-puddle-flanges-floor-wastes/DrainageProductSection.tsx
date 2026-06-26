"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { PUDDLE_FLANGE_CARDS } from "./puddleFlangeData";

const TECH_INFO = {
  typicalApplications: [
    "Balcony and terrace floor-waste replacement as part of full membrane strip-out and reinstatement",
    "Tiled balcony drainage with a stainless tile-insert flange for a near-invisible finish",
    "Torch-on sheet systems — stainless or brass flange heat-bonded at the drain junction",
    "Liquid-applied PU / hybrid / cementitious systems — PVC or stainless flange lapped by the membrane",
    "Podium, roof and large terrace decks — adjustable point drains or recessed sump outlets",
  ],
  selectionCriteria: [
    "Match the flange to the membrane — PVC for liquid-applied, stainless/brass for torch-on heat bonding",
    "Confirm the membrane connection (bonded flange flap, clamping ring or heat-bonded lap) and the overlap dimension",
    "Size the outlet and grate open area to the catchment / drainage design",
    "Adjustable-height drains simplify setting the finished level in remediation; fixed-height needs accurate screed control",
    "Grade 316 stainless for coastal / chloride exposure",
  ],
  limitations: [
    "The drain is only as watertight as its connection to the membrane — confirm the seal detail",
    "Flange set too high won't drain; set too low and the membrane laps into the drain body and won't seal",
    "PVC flanges are not for torch-on heat bonding",
    "Sump outlets need a structural slab recess — not a substitute for a standard balcony puddle flange",
    "Falls in the deck must still direct water to the floor waste",
  ],
  standardsNotes: [
    "Stormwater drainage, outlet sizing and falls per AS/NZS 3500.3 / the hydraulic engineer",
    "Membrane continuity and junction detailing at floor wastes per AS 3740 (wet areas) / AS 4654.2 (external)",
    "Minimum 1:100 fall to the floor waste established in the screed before membrane and tile",
    "The flange-to-membrane connection is part of the waterproofing system",
  ],
  suitableDefects: [
    "Leaking or failed drain-to-membrane junctions at the floor waste",
    "Corroded, cracked or wrongly-set existing floor wastes during remediation",
    "Existing flange incompatible with the new membrane system being applied",
    "Ponding because the outlet sits high relative to the finished fall",
  ],
  typicalSubstrates: [
    "Waterproofed concrete balcony, terrace and podium decks",
    "Polymer-modified or self-levelling screeds set to fall to the waste",
    "Tiled floors over a bonded membrane (tile-insert flanges)",
    "Podium slabs and raised-access-floor decks (sump outlets)",
  ],
};

export function DrainageIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are puddle flanges &amp; floor wastes?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A puddle flange is the membrane-integration fitting at every balcony and terrace floor-waste outlet — a flat PVC, stainless or brass flange that the waterproofing membrane is dressed over, bonded to or heat-welded around to create a continuous waterproof junction between the membrane field and the drainage point. Without correct flange integration, the floor waste is usually the first point of waterproofing failure. Selection turns on the membrane connection (PVC bonds to liquid-applied membranes; stainless/brass take a torch-on heat-bonded lap), the outlet size for the drainage design, whether height is fixed or adjustable, and the grate/tile-insert finish — with podium and roof decks instead using adjustable point drains or recessed sump outlets.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Membrane connection (PVC flange bonded by liquid-applied membranes; stainless/brass for torch-on heat-bonded laps); outlet and grate sizing for the catchment / drainage design; fixed vs adjustable height (adjustable simplifies setting the finished level in remediation); grate / tile-insert finish; Grade 316 stainless for coastal exposure; minimum 1:100 fall to the waste set in the screed. The flange-to-membrane connection is part of the waterproofing system — confirm every value against the current AU manufacturer data, the membrane manufacturer and the hydraulic engineer.";

export function DrainageProductSection() {
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

      <AutoProductReference products={[]} cards={PUDDLE_FLANGE_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Puddle flanges & floor wastes" pruneEmptyFacts />
    </>
  );
}
