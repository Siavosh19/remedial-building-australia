"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { SCREED_PM_CARDS } from "./screedPMData";

const TECH_INFO = {
  typicalApplications: [
    "Creating falls to drains on balconies, terraces and podiums before the waterproofing membrane",
    "Bedding/levelling screeds beneath tiles, stone, pavers and pedestal systems",
    "Bonded screeds on prepared concrete, and unbonded screeds over a slip-sheet / insulation",
    "Polymer-modifying a site-batched sand:cement screed with an SBR / acrylic additive for bond and water resistance",
  ],
  selectionCriteria: [
    "Confirm whether falls go UNDER or OVER the membrane — and the membrane manufacturer's screed requirements",
    "Match the set/dry speed to the programme — rapid-set (A 38/A 48, Mapecem) vs normal-set quick-dry (Topcem)",
    "Confirm the minimum/maximum thickness for bonded vs unbonded screeds",
    "Use a polymer modifier (Abacrete / WPM 405) to gain bond, flexibility and water resistance in a site-batched screed",
    "Confirm residual-moisture limits before the membrane or moisture-sensitive finish",
  ],
  limitations: [
    "Screeds create falls and bedding — they are not waterproofing membranes",
    "Observe minimum thicknesses (bonded vs unbonded) — thin screeds debond/crack",
    "Polymer additives (Abacrete / WPM 405) are modifiers, not standalone screeds or membranes",
    "Confirm temperature limits and residual moisture before overlaying",
    "Falls must be set correctly to the drain — ponding defeats the waterproofing",
  ],
  standardsNotes: [
    "Screeds are system components — specified within the membrane/finish system, not certified to AS 4858/AS 4654 themselves",
    "AS 3958 / AS 3740 — tiling and wet-area practice referenced for screed falls and bedding",
    "Falls to drains per the NCC / AS 4654.2 for external above-ground decks",
    "Confirm the membrane manufacturer's nominated screed and falls requirement",
  ],
  suitableDefects: [
    "Inadequate falls / ponding on balconies, terraces and podiums",
    "Uneven or out-of-level substrates before tiling or pedestal systems",
    "Weak/dusty existing screeds requiring replacement before re-waterproofing",
    "Site-batched screeds needing bond and water-resistance improvement (polymer modifier)",
  ],
  typicalSubstrates: [
    "In-situ and precast concrete — primed/prepared for bonded screeds",
    "Slip-sheet / insulation for unbonded screeds",
    "Existing sound screeds — confirm overlay suitability",
    "Heated-screed assemblies (rapid-set screeds)",
  ],
};

export function ScreedIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are polymer-modified screed systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Screeds are the falls-and-bedding layer of a balcony/podium build-up — they set the slope to the drain and provide a sound, level base for the membrane and the tile/paver finish. This category covers rapid-set and quick-dry premixed screeds (just add water) and the SBR/acrylic polymer modifiers used to make a site-batched sand:cement screed bond better and resist water. Screeds are not membranes; selection turns on set/dry speed, thickness (bonded vs unbonded), and the falls and residual-moisture requirements of the chosen membrane and finish.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Falls under vs over the membrane; set/dry speed (rapid-set vs normal-set quick-dry) for the programme; thickness (bonded ≥15 mm vs unbonded ≥35 mm); polymer modifier (SBR/acrylic) for bond and water resistance in site-batched screeds; residual-moisture limit before the membrane/finish; falls to drain per AS 4654.2 / NCC. Screeds are system components — confirm the membrane manufacturer's nominated screed and every value against the current AU TDS.";

export function ScreedProductSection() {
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

      <AutoProductReference products={[]} cards={SCREED_PM_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Polymer-modified screed systems" pruneEmptyFacts />
    </>
  );
}
