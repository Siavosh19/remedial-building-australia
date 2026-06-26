"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { GUTTER_LINING_CARDS } from "./gutterLiningData";

const TECH_INFO = {
  typicalApplications: [
    "Terminating and protecting the waterproofing membrane edge at a balcony/terrace perimeter",
    "Forming a drip edge at exposed slab edges and soffits to keep water off the facade",
    "Anchoring the tile edge at the slab perimeter to prevent chipping and delamination (tile-anchor profiles)",
    "Concealed-fastener architectural finish to a tiled balcony edge",
    "Coastal / severe-environment edge termination (marine-grade stainless)",
  ],
  selectionCriteria: [
    "Match the profile cover/projection to the designed tile build-up depth",
    "Choose the material/finish for the salt-air exposure — powder coat / anodised aluminium vs 316L stainless",
    "Decide concealed-fix vs simple drip angle vs tile-anchor flange for the detail required",
    "Confirm the membrane terminates correctly under the cover flange / behind the anchor",
    "Confirm end-cap and corner detailing for the chosen profile",
  ],
  limitations: [
    "An edge trim is not the waterproofing seal — membrane continuity and termination is the applicator's job",
    "Standard powder coat / anodising is not adequate within ~1 km of the ocean — specify marine grade or 316L",
    "Wrong cover width gives a proud or recessed finish at the tile face",
    "Unsealed end terminations let water track behind the profile",
    "Must be fixed to a sound substrate — it is not a structural element",
  ],
  standardsNotes: [
    "External above-ground membrane edge / drip-edge detailing per AS 4654.2",
    "Marine-grade material selection (316L stainless) for coastal salt-air exposure",
    "Tile-edge support / anchor detailing per the profile manufacturer",
    "The trim is part of the edge termination detail — confirm against the membrane system",
  ],
  suitableDefects: [
    "Failed or unprotected membrane edge at a balcony perimeter",
    "Water tracking back under the slab edge (no drip edge)",
    "Chipped / delaminating tile edges at the balcony perimeter",
    "Corroded / failed edge trim on a coastal balcony (wrong material grade)",
  ],
  typicalSubstrates: [
    "Concrete balcony / terrace slab edges (waterproofed)",
    "Tiled balcony perimeters over a bonded membrane",
    "Exposed slab edges and soffits (drip-edge termination)",
    "Coastal balconies requiring marine-grade metalwork",
  ],
};

export function GutterLiningIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are balcony edge trims &amp; drip edges?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Balcony edge trims terminate and protect the waterproofing membrane at the slab perimeter and form a drip edge that keeps rainwater off the facade and from tracking back under the slab. They range from a simple commodity anodised drip angle, through proprietary concealed-fix aluminium trims and tile-anchor profiles that lock the tile edge into the adhesive bed, to custom-fabricated 316L stainless trims for coastal buildings. The trim is not the waterproofing seal itself — selection turns on matching the cover/projection to the tile build-up, the material and finish to the salt-air exposure, the fixing/anchor detail, and confirming the membrane terminates correctly under the trim.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Cover/projection matched to the designed tile build-up; material and finish for the salt-air exposure (powder coat / anodised aluminium vs 316L marine-grade stainless); detail type (concealed-fix vs drip angle vs tile-anchor flange); membrane terminated correctly under the cover flange / behind the anchor; end-cap and corner detailing; fixed to a sound substrate. The trim is part of the edge termination detail, not the waterproofing seal — confirm every value against the current AU manufacturer data.";

export function GutterLiningProductSection() {
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

      <AutoProductReference products={[]} cards={GUTTER_LINING_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Balcony edge trims & drip edges" pruneEmptyFacts />
    </>
  );
}
