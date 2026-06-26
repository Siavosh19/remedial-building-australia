"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { PEDESTAL_CARDS } from "./pedestalData";

const TECH_INFO = {
  typicalApplications: [
    "Raised paver / tile floors over a falls-to-drain podium or roof membrane",
    "Raised timber and composite decking over membranes",
    "Levelling a finished floor over a sloped structural deck (slope correctors)",
    "Free-draining 'floating floor' build-ups that protect the membrane and let water drain beneath",
  ],
  selectionCriteria: [
    "Match the height range to the build-up (membrane to finished floor level)",
    "Confirm the load rating for the paver/decking and the imposed loads",
    "Use a slope corrector where the deck falls but the finished floor must be level",
    "Place a membrane protection / slip pad under each pedestal — never point-load the membrane",
    "Confirm spacer tabs (paver joints) or joist adaptors (decking) for the finish",
  ],
  limitations: [
    "Pedestals are a support system — not waterproofing; the membrane below does the waterproofing",
    "Point loading without a protection pad can damage the membrane",
    "Height range and load rating vary by series — confirm against the current data",
    "Wind uplift and edge restraint must be considered on exposed roofs/podiums",
    "Not a substitute for correct falls and drainage in the membrane build-up",
  ],
  standardsNotes: [
    "Pedestals are build-up components — they sit above the waterproofing membrane",
    "Confirm height range, load rating and slope-correction range against the manufacturer data",
    "A membrane protection layer / slip pad is required beneath the pedestals",
    "Wind-uplift and edge-restraint design per the project engineer for exposed decks",
  ],
  suitableDefects: [
    "Ponding / poor drainage on a tiled or decked balcony (raised free-draining floor)",
    "Membrane damaged by pavers bedded directly on it (raised floor protects the membrane)",
    "Uneven / out-of-level finished floor over a sloped deck",
    "Access needed below the floor for maintenance / inspection of the membrane",
  ],
  typicalSubstrates: [
    "Waterproofed concrete podium and roof decks (membrane below the pedestals)",
    "Falls-to-drain decks needing a level finished floor",
    "Protected-membrane / inverted-roof build-ups",
    "Pavers, tiles, timber and composite decking (above the pedestals)",
  ],
};

export function PedestalIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are adjustable-height pedestal systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Adjustable pedestals create a raised, free-draining 'floating floor' of pavers, tiles or decking over a podium or roof membrane. They screw-adjust to a level finished floor over a falls-to-drain deck (some with a built-in slope corrector), protect the membrane, and let water drain freely beneath to the membrane and outlets. Pedestals are a support system — not waterproofing — so the membrane below still does the waterproofing. Selection turns on the height range, the load rating, slope correction, and a membrane protection pad under every pedestal.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Height range matched to the build-up (membrane to finished floor); load rating for the paver/decking and imposed loads; slope corrector where the deck falls but the floor must be level; a membrane protection / slip pad under every pedestal (never point-load the membrane); spacer tabs or joist adaptors for the finish; wind-uplift / edge restraint on exposed decks. Pedestals are a support system above the membrane — confirm every value against the current AU manufacturer data.";

export function PedestalProductSection() {
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

      <AutoProductReference products={[]} cards={PEDESTAL_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Adjustable pedestal systems" pruneEmptyFacts />
    </>
  );
}
