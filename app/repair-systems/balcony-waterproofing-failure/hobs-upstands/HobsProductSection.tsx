"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp, AlertTriangle as AT } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { HOBS_CARDS } from "./hobsData";

const TECH_INFO = {
  typicalApplications: [
    "Raised kerb / upstand at balcony and terrace door thresholds and perimeters",
    "Roof hobs and upstands at parapets, plant bases and penetrations",
    "Planter-box and podium-garden walls that contain water and soil",
    "Forming the structural upstand that gives the membrane its termination height",
  ],
  selectionCriteria: [
    "Set the upstand height to the membrane manufacturer's and NCC / AS 4654.2 requirement above the finished surface",
    "Choose the forming method to suit the build sequence — precast, cast-in (lost form), in-situ, masonry-composite or lintel",
    "Confirm reinforcement, dowelling / starter bars and the bond to the slab (per engineer)",
    "Confirm concrete grade (AS 3600) and, for masonry hobs, AS 3700",
    "Coordinate the hob with the membrane upturn, flashing and any drainage at the threshold",
  ],
  limitations: [
    "A hob is a structural kerb — not the waterproofing; the membrane must be dressed up and over it",
    "Insufficient upstand height defeats the waterproofing regardless of the membrane",
    "Cold joints / poor dowelling between hob and slab can crack and leak",
    "Site-fabricated hobs depend entirely on the engineer's detail and workmanship",
    "A lintel hob is only valid where the structural / waterproofing system sanctions it",
  ],
  standardsNotes: [
    "AS 4654.2 — external above-ground waterproofing: upstand heights and threshold detailing",
    "NCC — minimum threshold / upstand and weatherproofing requirements",
    "AS 3600 — concrete (precast, cast-in and in-situ hobs); AS 3700 — masonry hobs",
    "Hobs are structural / build-up components — confirm dimensions and reinforcement with the engineer",
  ],
  suitableDefects: [
    "No / insufficient upstand at thresholds allowing water entry over the sill",
    "Cracked or under-height hobs at balcony perimeters and planters",
    "Failed planter / podium walls leaking into occupied space below",
    "Penetration and parapet upstands needing a proper structural kerb",
  ],
  typicalSubstrates: [
    "Structural concrete balcony, terrace, podium and roof slabs",
    "Thresholds and door junctions (level / stepped)",
    "Parapets, plant bases and penetrations (roofs)",
    "Planter-box and podium-garden bases",
  ],
};

export function HobsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are hobs &amp; upstands?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A hob (upstand) is a raised kerb at thresholds, perimeters and penetrations that provides the waterproofing termination / upstand height and contains water on balconies, terraces, roofs and planter boxes. It is a structural element built off the slab — the membrane is then dressed up and over it — so the hob sets the height the waterproofing can reach. Selection depends on the structural design, the required upstand height (NCC / AS 4654.2 and the membrane manufacturer), the substrate, and whether the hob is precast, cast-in (lost form), formed in-situ, built in masonry and core-filled, or — on some roofs — formed from a precast lintel.
        </p>
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AT size={14} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-xs font-semibold leading-5 text-amber-800">
            Upstand height &amp; NCC: the hob must give the required waterproofing upstand height above the finished surface (per AS 4654.2 / NCC and the membrane manufacturer). Confirm the structural design — concrete to AS 3600 (masonry to AS 3700), reinforcement and dowelling / starter bars to the slab — with the engineer. Several fields below are marked &ldquo;CONFIRM&rdquo; where the dimension is project- or manufacturer-specific.
          </p>
        </div>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Upstand height to the membrane manufacturer's and NCC / AS 4654.2 requirement above the finished surface; forming method to suit the build sequence (precast / cast-in lost form / in-situ / masonry-composite / lintel); reinforcement, dowelling / starter bars and bond to the slab per engineer; concrete to AS 3600 (masonry to AS 3700); coordination with the membrane upturn, flashing and threshold drainage. A hob is a structural kerb — not the waterproofing. Confirm all dimensions and reinforcement with the engineer and the current manufacturer data.";

export function HobsProductSection() {
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

      <AutoProductReference products={[]} cards={HOBS_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Hobs & upstands" />
    </>
  );
}
