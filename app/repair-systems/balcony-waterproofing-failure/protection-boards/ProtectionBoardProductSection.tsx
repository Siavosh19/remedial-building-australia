"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { PROTECTION_BOARD_CARDS } from "./protectionBoardData";

const TECH_INFO = {
  typicalApplications: [
    "Protecting a cured membrane from screed, backfill or paver loads before the finish is placed",
    "Podium and roof decks under ballast, pavers or growing medium",
    "Planter boxes and green roofs needing root-penetration resistance over the membrane",
    "Temporary protection of the membrane from foot traffic and material handling during construction",
  ],
  selectionCriteria: [
    "Flat protection board (XPS / fluted polyethylene) where only protection under screed or pavers is needed",
    "Dimpled HDPE or geocomposite mat where a drainage void over the membrane is required",
    "Composite root-barrier board on planted build-ups for root-penetration resistance",
    "Match the board's compressive performance to the screed/paver/ballast loading",
    "Pair drainage mats with a filter geotextile above to keep the void clear",
  ],
  limitations: [
    "A protection board is not a structural or load-spreading element",
    "Solid foam/fluted boards provide no drainage void — use a dimpled or geocomposite mat for that",
    "Drainage mats clog without a filter geotextile above on planted build-ups",
    "Once covered, the membrane below cannot be inspected without removing all layers above",
    "Under-graded boards transmit point loads through to the membrane",
  ],
  standardsNotes: [
    "The board is laid only over a cured, inspected (and flood-tested where required) membrane",
    "Most boards sit loose, held by the weight above — confirm if bonding is required",
    "Compressive grade confirmed against the applied loading with the manufacturer / engineer",
    "Filter geotextile is a mandatory companion to drainage mats on planted applications",
  ],
  suitableDefects: [
    "Membrane damaged by screed, backfill or paver placement without protection",
    "Root penetration of a membrane under planters or green roofs",
    "Poorly drained overburden build-ups ponding on the membrane",
    "Membrane damaged by site traffic before the finish was placed",
  ],
  typicalSubstrates: [
    "Cured waterproofing membrane on balcony, terrace and podium decks",
    "Sheet membranes under planted / green-roof build-ups",
    "Roof decks under ballast or pavers",
    "Membrane under a screed or paver build-up",
  ],
};

export function ProtectionBoardIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are protection boards?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Protection boards are laid over a cured waterproofing membrane to shield it from screed, backfill, pavers, ballast or site traffic before the final finish is placed. They range from flat XPS foam and fluted-polyethylene boards that simply protect, through dimpled HDPE and geocomposite mats that also create a drainage void, to composite root-barrier boards for planted build-ups. They are protection — not structural or load-spreading — layers, and most sit loose over the membrane. Selection turns on whether a drainage void or root barrier is needed, the compressive grade for the loading, and pairing drainage mats with a filter geotextile.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Board type for the role (flat XPS / fluted board for protection only; dimpled HDPE or geocomposite mat where a drainage void is needed; composite root-barrier board on planted build-ups); compressive grade matched to the screed/paver/ballast loading; filter geotextile above drainage mats on planted applications; laid over a cured, inspected membrane (loose unless bonding is confirmed). A protection board is not a structural layer — confirm every value against the current AU manufacturer data.";

export function ProtectionBoardProductSection() {
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

      <AutoProductReference products={[]} cards={PROTECTION_BOARD_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Protection boards" pruneEmptyFacts />
    </>
  );
}
