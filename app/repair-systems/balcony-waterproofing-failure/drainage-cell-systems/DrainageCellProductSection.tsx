"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { DRAINAGE_CELL_CARDS } from "./drainageCellData";

const TECH_INFO = {
  typicalApplications: [
    "Sub-surface drainage layer over the membrane in planter boxes and raised beds",
    "Podium decks beneath landscape, paving and soil build-ups",
    "Green / blue roofs (drainage with optional water retention)",
    "Drainage behind retaining walls and below grade",
    "High-void drainage where loose gravel is impractical",
  ],
  selectionCriteria: [
    "Select the cell height for the drainage void and water-storage requirement",
    "Confirm the compressive load capacity for the build-up above (soil, paving, traffic)",
    "Pair with a filter fabric over the cell to keep fines out of the void",
    "Confirm a protection layer between the cell and the membrane",
    "Water-retention cell where irrigation / green-roof storage is wanted",
  ],
  limitations: [
    "Cells are a drainage layer, not a waterproofing membrane",
    "Crushing under load if the cell height / grade is wrong for the build-up",
    "Without a filter fabric, fines clog the drainage void",
    "Must drain to an outlet — a void with no outfall still holds water",
    "Confirm the membrane is protected from the cell above",
  ],
  standardsNotes: [
    "Drainage design and outfall per AS 3500 / the hydraulic & landscape engineer",
    "External above-ground waterproofing build-up per AS 4654.2",
    "Compressive load capacity confirmed against the build-up loads",
    "The cell sits within the build-up over the waterproofing system",
  ],
  suitableDefects: [
    "Waterlogged planters / podium soil with no drainage void",
    "Saturated build-ups overloading the membrane and structure",
    "Fines clogging a gravel drainage layer (replace with a celled void + filter)",
    "Poor drainage behind retaining walls / below grade",
  ],
  typicalSubstrates: [
    "Waterproofed concrete podium and planter slabs",
    "Membrane over structural decks beneath landscape build-ups",
    "Green / blue roof structural slabs",
    "Retaining-wall and below-grade structures",
  ],
};

export function DrainageCellIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are drainage cell systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Drainage cells (and cuspated drainage membranes) create a high-void sub-surface drainage layer over the membrane in planters, podiums, green roofs and behind retaining walls. The modular cells channel water to an outlet while a filter fabric over the top keeps soil fines out of the void; some cells also retain water for green-roof irrigation. They are a drainage layer, not a waterproofing membrane, and need a protection layer between the cell and the membrane below. Selection turns on the cell height (drainage void and any water storage), the compressive load capacity for the build-up above, and the filter / membrane interface.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Cell height for the drainage void and any water-storage requirement; compressive load capacity for the build-up above (soil, paving, traffic); filter fabric over the cell to keep fines out of the void; protection layer between the cell and the membrane; drainage to an outlet / outfall. The cell is a drainage layer within the build-up over the waterproofing system — confirm every value against the current AU manufacturer data and the hydraulic / landscape engineer.";

export function DrainageCellProductSection() {
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

      <AutoProductReference products={[]} cards={DRAINAGE_CELL_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Drainage cell systems" pruneEmptyFacts />
    </>
  );
}
