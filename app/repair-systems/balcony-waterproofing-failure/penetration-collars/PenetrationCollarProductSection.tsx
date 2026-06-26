"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { PENETRATION_COLLAR_CARDS } from "./penetrationCollarData";

const TECH_INFO = {
  typicalApplications: [
    "Sealing the membrane around drainage pipes, downpipes and overflow pipes through a balcony/terrace slab",
    "Conduit, irrigation line and gas-line penetrations through the membrane plane",
    "Square downpipes and irregular sections — flexible EPDM compression collars",
    "Non-standard and existing penetrations that cannot be removed — site-formed collars",
    "Pre-formed PVC collars within ARDEX / Mapei liquid-applied membrane systems",
  ],
  selectionCriteria: [
    "Match the collar to the membrane — PVC for liquid-applied, stainless for torch-on heat bonding",
    "Measure the actual pipe OD before ordering a pre-formed collar — do not assume nominal size",
    "Use a flexible EPDM collar for square / irregular sections a rigid collar won't fit",
    "Use a site-formed collar only where no pre-formed collar fits — not as a cost shortcut",
    "Grade 316 stainless for coastal / chloride exposure",
  ],
  limitations: [
    "The collar is only as watertight as its bond to the membrane at the flange — confirm the lap detail",
    "A loose-fitting pre-formed collar cannot be sealed and will fail",
    "PVC collars are not for torch-on heat bonding",
    "EPDM is not compatible with all liquid-applied membranes without the right primer",
    "Compression fit to the pipe is not the seal — the membrane bond at the base flange is the critical seal",
  ],
  standardsNotes: [
    "Every pipe penetration through the membrane must be sealed with a purpose-designed collar or equivalent per AS 3740 (wet areas) / AS 4654.2 (external)",
    "Membrane continuity at the penetration is maintained by lapping the membrane over the collar flange",
    "Collar installation and the membrane lap are a mandatory hold point — inspect before covering",
    "Cross-brand collar / membrane combinations must be confirmed with both manufacturers",
  ],
  suitableDefects: [
    "Leaking pipe and conduit penetrations through balcony / terrace membranes",
    "Penetrations with no collar or a failed / debonded collar detail",
    "Irregular or square penetrations a rigid collar cannot seal",
    "Existing penetrations that cannot be removed, needing a site-formed collar",
  ],
  typicalSubstrates: [
    "Waterproofed concrete balcony, terrace and podium decks at pipe penetrations",
    "PVC, copper and steel pipes and conduits through the membrane plane",
    "Tiled floors over a bonded membrane at the penetration",
    "ARDEX / Mapei membrane systems (pre-formed and site-formed collars)",
  ],
};

export function PenetrationCollarIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are penetration collars?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Penetration collars seal the junction between a pipe, conduit or service and the waterproofing membrane where it passes through a balcony or terrace slab. The membrane cannot simply be lapped against the pipe — the junction is formed with a collar that gives a continuous, bonded seal around the full perimeter at membrane level, and collar failure is one of the most common causes of localised waterproofing failure. They come as pre-formed collars (PVC, stainless or flexible EPDM rubber, in fixed pipe diameters) and site-formed collars (built in situ from membrane and reinforcing fabric for non-standard or existing penetrations). Selection turns on the membrane system, the pipe diameter and section, and the bond at the collar flange — PVC suits liquid-applied membranes, stainless takes a torch-on heat-bonded lap, EPDM suits irregular sections, and site-formed collars are used only where no pre-formed collar fits.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Membrane connection at the collar flange (PVC bonded by liquid-applied membranes; stainless for torch-on heat-bonded laps; EPDM base flange bonded with the right primer); actual pipe OD and section (round vs square / irregular) measured before ordering; pre-formed where a collar fits, site-formed only where none does; Grade 316 stainless for coastal exposure. Every penetration must be sealed and the membrane lap is a mandatory hold point. Confirm every value against the current AU manufacturer data and the membrane manufacturer.";

export function PenetrationCollarProductSection() {
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

      <AutoProductReference products={[]} cards={PENETRATION_COLLAR_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Penetration collars" pruneEmptyFacts />
    </>
  );
}
