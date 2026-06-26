"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { FILTER_FABRIC_CARDS } from "./filterFabricData";

const TECH_INFO = {
  typicalApplications: [
    "Filter layer over drainage cells in planters, podiums and green roofs",
    "Separation between soil / growing medium and a gravel or celled drainage layer",
    "Protection of the membrane / drainage layer from the layer above",
    "Filtration over sub-soil and sub-surface drains",
    "Wrapping aggregate drains to stop fines migrating in",
  ],
  selectionCriteria: [
    "Specify the geotextile grade (by mass) for the soil, flow and protection duty",
    "Match the fabric to the drainage cell / aggregate it sits over",
    "Non-woven needle-punched for filtration + cushioning protection",
    "Confirm overlaps at joints so fines cannot bypass the filter",
    "Heavier grade where it also acts as membrane protection beneath ballast",
  ],
  limitations: [
    "A filter fabric is not a waterproofing layer or a root barrier",
    "Too fine / wrong grade blinds and clogs, reducing drainage",
    "Inadequate overlaps let fines bypass the filter into the drainage void",
    "UV exposure degrades exposed geotextile — keep it covered",
    "Does not replace a dedicated protection layer where heavy ballast is used",
  ],
  standardsNotes: [
    "Geotextile filtration / separation design per the geotechnical & landscape engineer",
    "External above-ground waterproofing build-up per AS 4654.2",
    "Grade selected against the soil grading and flow requirement",
    "The fabric sits within the build-up over the waterproofing system",
  ],
  suitableDefects: [
    "Drainage voids / gravel clogged with migrated soil fines",
    "Growing medium washing into the drainage layer",
    "Membrane / drainage layer damaged by the build-up above (use a heavier grade)",
    "Sub-soil drains silting up without a filter wrap",
  ],
  typicalSubstrates: [
    "Drainage cells in podium and planter build-ups",
    "Gravel / aggregate drainage layers over the membrane",
    "Green / blue roof build-ups beneath the growing medium",
    "Sub-soil and sub-surface drains",
  ],
};

export function FilterFabricIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are filter fabric systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Non-woven geotextile filter fabrics sit over a drainage cell or gravel layer to let water through while holding back the soil fines that would otherwise clog the drainage void. They also separate the growing medium from the drainage layer and can cushion / protect the membrane and drainage layer from the build-up above. A filter fabric is a geotextile, not a waterproofing membrane or a root barrier. Selection turns on the geotextile grade (by mass) for the soil, flow and protection duty, matching the fabric to the drainage layer it sits over, and adequate overlaps at the joints.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Geotextile grade (by mass) for the soil, flow and protection duty; match to the drainage cell / aggregate it sits over; non-woven needle-punched for filtration plus cushioning; adequate overlaps at joints so fines cannot bypass; heavier grade where it also protects the membrane beneath ballast; keep covered from UV. The fabric is a filter / separation layer within the build-up over the waterproofing system — confirm every value against the current AU manufacturer data and the geotechnical / landscape engineer.";

export function FilterFabricProductSection() {
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

      <AutoProductReference products={[]} cards={FILTER_FABRIC_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Filter fabric systems" pruneEmptyFacts />
    </>
  );
}
