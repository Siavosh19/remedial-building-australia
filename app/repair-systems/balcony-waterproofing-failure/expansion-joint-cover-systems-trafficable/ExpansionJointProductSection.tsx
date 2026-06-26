"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { EXPANSION_JOINT_CARDS } from "./expansionJointData";

const TECH_INFO = {
  typicalApplications: [
    "Structural expansion joints in concrete balcony and podium deck slabs needing a trafficable, waterproofed cover",
    "Movement joints in tiled balcony, terrace and podium surfaces where grout joints can't accommodate the movement",
    "Movement joints in podium decks subject to thermal expansion/contraction where sealant-only joints are short-lived",
    "Remediation of failed or open expansion joints in trafficable decks letting water into the membrane",
  ],
  selectionCriteria: [
    "Select for the joint width and expected movement magnitude — confirm the product accommodates the design movement",
    "Tile-embedded profiles (e.g. Schlüter DILEX) where the cover must sit flush in a tiled deck",
    "EPDM dual-flange systems (e.g. Tremco Emshield) for wider joints / higher movement and a maintainable cover",
    "Trafficable sealant systems (e.g. Sikaflex) for narrow joints where a profile isn't practical",
    "Confirm the traffic rating against the use — foot traffic only, or light vehicular on podium decks",
  ],
  limitations: [
    "No cover system removes the need for correct membrane detailing at the joint faces below the cover",
    "EPDM/sealant infills have a finite service life — replacement may be needed during the building's life",
    "Sealant-only joints in high-traffic areas wear faster than metal-covered systems — plan maintenance",
    "Insufficient movement range leads to profile failure under thermal cycling — confirm with the manufacturer",
    "Flange fixings need a sound substrate — hollow/delaminated concrete won't hold them under traffic",
  ],
  standardsNotes: [
    "Waterproofing continuity must be maintained across the movement joint (membrane detailing per AS 4654.2)",
    "Movement joint detailing for balcony/deck assemblies per AS 4654.2 / the designer",
    "Movement accommodation and traffic rating confirmed against the manufacturer's data",
    "The cover is part of the joint detail — the membrane below it does the waterproofing",
  ],
  suitableDefects: [
    "Failed or open structural expansion joints allowing water ingress through/around the existing cover",
    "Cracked or debonded sealant in expansion joints of tiled trafficable decks",
    "Missing or inadequate expansion joint covers in remediated balcony/podium waterproofing",
    "Profile or infill that has failed under thermal cycling or traffic",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — structural expansion joints cast into the slab",
    "Tiled deck surfaces — profiles embedded in tile adhesive each side of the joint",
    "Waterproofed concrete decks — flanged profiles fixed each side of the joint",
    "Balcony, terrace and podium trafficable surfaces",
  ],
};

export function ExpansionJointIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are trafficable expansion-joint cover systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Trafficable expansion-joint cover systems bridge a structural or thermal movement joint in a balcony, terrace or podium deck while keeping the surface walkable and maintaining waterproofing continuity. They range from tile-embedded PVC/elastomeric profiles that sit flush in a tiled deck, through trafficable PU sealant joints, to EPDM dual-flange covers mechanically fixed each side for wider joints and a maintainable, replaceable seal. The cover is part of the joint detail — it does not replace correct membrane detailing at the joint faces beneath it. Selection turns on the joint width and movement magnitude, the finish (tiled vs flush), the traffic rating, and confirming the movement accommodation with the manufacturer.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Joint width and design movement magnitude (confirm the product accommodates it); finish/format (tile-embedded flush profile, trafficable sealant, or EPDM dual-flange cover); traffic rating (foot only vs light vehicular); a sound substrate for flange fixings; and correct membrane detailing at the joint faces beneath the cover. The cover is part of the joint detail, not the waterproofing seal — confirm every value against the current AU manufacturer data.";

export function ExpansionJointProductSection() {
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

      <AutoProductReference products={[]} cards={EXPANSION_JOINT_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Trafficable expansion-joint cover systems" pruneEmptyFacts />
    </>
  );
}
