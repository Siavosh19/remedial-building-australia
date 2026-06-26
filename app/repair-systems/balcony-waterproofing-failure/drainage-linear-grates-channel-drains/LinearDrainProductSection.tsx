"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { LINEAR_DRAIN_CARDS } from "./linearDrainData";

const TECH_INFO = {
  typicalApplications: [
    "Threshold and full-width drainage at balcony/door junctions (level-threshold detailing)",
    "Tiled balcony, terrace and wet-area floors (tile-insert and slot grates)",
    "Podium and trafficable decks (heavy-duty channel drains)",
    "Collecting and channelling surface water to outlets across a deck",
  ],
  selectionCriteria: [
    "Confirm the membrane connection — a bonded flange (e.g. KERDI-LINE) or puddle-flange detail sealed to the field membrane",
    "Size the channel and outlets to the catchment / flow (hydraulic capacity)",
    "Match the grate load class to the use (pedestrian vs trafficable / vehicular)",
    "Choose the finish — tile-insert for a near-seamless tiled floor, or a patterned grate",
    "Stainless / HDPE for podium and heavy-duty; PVC for light-duty domestic",
  ],
  limitations: [
    "The drain is only as watertight as its connection to the membrane — confirm the seal detail",
    "Under-sized channels/outlets pond and overflow",
    "Light-duty PVC channels are not for trafficable/vehicular loads",
    "Grates must be removable for cleaning — blocked channels back water up under the threshold",
    "Falls in the deck must still direct water to the channel",
  ],
  standardsNotes: [
    "Drainage design and falls per AS 3500 / the hydraulic engineer",
    "Level-threshold and drainage detailing per AS 4654.2 (external above-ground)",
    "Grate load class to suit the traffic (pedestrian to vehicular)",
    "The membrane-to-drain connection is part of the waterproofing system",
  ],
  suitableDefects: [
    "Water backing up over a balcony threshold into the building",
    "Ponding on a tiled balcony / terrace with no linear collection",
    "Failed / leaking drain-to-membrane junctions",
    "Under-drained podium decks needing engineered channel capacity",
  ],
  typicalSubstrates: [
    "Waterproofed concrete balcony, terrace and podium decks",
    "Tiled floors over a bonded membrane (tile-insert drains)",
    "Threshold / door junctions (level-threshold detailing)",
    "Trafficable podium decks (heavy-duty channels)",
  ],
};

export function LinearDrainIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are linear grates &amp; channel drains?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Linear grates and channel drains collect and channel surface water to outlets across a balcony, terrace or podium deck — and are the key to level-threshold detailing at door junctions. They range from slimline tile-insert drains for a near-seamless tiled floor, through stainless channels with engineered hydraulic capacity, to heavy-duty HDPE channels for trafficable podiums. The drain is only as watertight as its connection to the field membrane (a bonded flange or sealed puddle-flange detail). Selection turns on that membrane connection, the channel/outlet capacity for the catchment, the grate load class, and the finish.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Membrane connection (bonded flange or sealed puddle-flange detail to the field membrane); channel and outlet sizing for the catchment / flow; grate load class for the traffic (pedestrian to vehicular); finish (tile-insert vs patterned grate); material for the duty (PVC light-duty, stainless / HDPE for podium and heavy-duty); deck falls directing water to the channel. The drain-to-membrane connection is part of the waterproofing system — confirm every value against the current AU manufacturer data and the hydraulic engineer.";

export function LinearDrainProductSection() {
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

      <AutoProductReference products={[]} cards={LINEAR_DRAIN_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Linear grates & channel drains" pruneEmptyFacts />
    </>
  );
}
