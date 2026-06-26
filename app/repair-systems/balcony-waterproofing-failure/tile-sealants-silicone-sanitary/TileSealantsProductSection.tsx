"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { TILE_SEALANT_CARDS } from "./tileSealantsData";

const TECH_INFO = {
  typicalApplications: [
    "Sealing perimeter, internal-corner and change-of-plane joints in tiled balconies and wet areas",
    "Movement / expansion / control joints in the tiled surface and the deck",
    "Sanitary joints in showers and wet areas (mould-resistant silicones)",
    "High-movement facade and structural joints (low-modulus PU / ultra-low-modulus silicone)",
  ],
  selectionCriteria: [
    "Use a flexible sealant (not rigid grout) at all perimeters, internal corners and movement joints",
    "Match the chemistry to the duty — neutral silicone for sanitary/perimeter, low-modulus PU / ULM silicone for high-movement structural joints",
    "Match the movement capability (% of joint width) to the expected movement",
    "Silicone is not paintable or tileable; PU can be over-coated — choose accordingly",
    "Use a backer rod / bond breaker at the correct depth:width ratio (typically 1:2) in movement joints",
  ],
  limitations: [
    "Sealants are joint components — not the waterproofing membrane",
    "Silicone joints cannot be painted or tiled over",
    "Movement joints need a backer rod / bond breaker — three-sided adhesion fails",
    "Confirm the movement class for the joint design",
    "Sanitary silicones for wet areas should be mould-resistant",
  ],
  standardsNotes: [
    "AS 4654 / AS 3958.1 — movement-joint and perimeter-joint practice in tiled/waterproofed areas",
    "ISO 11600 — sealant classification (modulus and movement capability)",
    "Use the membrane/tile manufacturer's approved sealant at junctions",
    "Greenguard / low-VOC ratings for sensitive indoor environments (e.g. Spectrem 1)",
  ],
  suitableDefects: [
    "Cracked / failed perimeter and internal-corner joints letting water track behind the tile",
    "Failed movement / expansion joints in the deck or tiled surface",
    "Mouldy / failed sanitary silicone in showers and wet areas",
    "High-movement facade joints requiring re-sealing",
  ],
  typicalSubstrates: [
    "Tile, stone and grout (perimeter / sanitary joints)",
    "Concrete and screed (deck movement / expansion joints)",
    "Metal trims, drains and penetrations (perimeter seals)",
    "Cured waterproofing membranes at terminations (within the system detail)",
  ],
};

export function TileSealantsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are tile &amp; movement-joint sealants?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Sealants fill the flexible joints that grout cannot — perimeters, internal corners, changes of plane and movement/expansion joints. Silicones (neutral-cure, mould-resistant) suit sanitary and perimeter joints and are colour-matched to grout; low-modulus polyurethanes and ultra-low-modulus silicones handle high-movement structural and facade joints. Selection turns on chemistry, movement capability (% of joint width), whether it must be paintable/tileable, and correct joint design with a backer rod or bond breaker. Sealants are joint components — not the waterproofing membrane.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Flexible sealant (not grout) at perimeters, corners and movement joints; chemistry by duty (neutral silicone for sanitary/perimeter, low-modulus PU / ULM silicone for high-movement structural); movement capability (% of joint width) matched to expected movement; paintable/tileable requirement (PU vs silicone); backer rod / bond breaker at the correct depth:width ratio; mould-resistance for wet areas. Confirm every value against the current AU TDS.";

export function TileSealantsProductSection() {
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

      <AutoProductReference products={[]} cards={TILE_SEALANT_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Tile & movement-joint sealants" pruneEmptyFacts />
    </>
  );
}
