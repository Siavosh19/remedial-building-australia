"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { CRACK_PORT_PACKER_CARDS } from "./crackPortPackerData";

const TECH_INFO = {
  typicalApplications: [
    "PU injection delivery — surface ports or drill-in packers deliver hydrophilic PU foam or gel into active basement cracks",
    "Acrylic acrylate injection — surface ports for fine cracks at low pressure",
    "Epoxy injection — drill-in packers for structural crack repair under high injection pressure",
    "Construction joint injection — packers drilled along the construction joint at ~200–250 mm centres for systematic joint sealing",
    "Cold joint treatment — packers installed through the cold joint at staggered depths to ensure full joint-width coverage",
  ],
  selectionCriteria: [
    "Surface ports (LP): for cracks in good concrete where drilling is undesirable — thin sections, reinforcement congestion, or hard-to-access locations",
    "Drill-in packers (HP): for active cracks requiring higher injection pressure, systematic joint sealing, or where surface-port adhesion is unreliable (wet, contaminated or irregular surface)",
    "PU injection (active water): either ports or packers — drill-in packers preferred for active flow where higher pressure is needed to overcome water pressure",
    "Acrylic injection (fine cracks, low pressure): surface ports generally adequate — drill-in packers for inaccessible locations",
    "Epoxy injection (structural, dry crack): drill-in packers required for the high pressure needed to fill tight dry cracks",
    "Sika vs Master Builders port / packer: functionally equivalent — select to match the resin brand being used",
  ],
  limitations: [
    "Rebar scan mandatory before any drilling — hitting reinforcement when drilling for packers is a serious error",
    "Surface-port adhesion requires a dry, clean, sound concrete surface — a wet or release-agent-contaminated surface causes the port to detach during injection",
    "Port and packer spacings are guidance — actual spacing depends on crack width, resin viscosity and concrete porosity (specialist judgment)",
    "Injection is a specialist trade — incorrect pressure, sequence or technique causes incomplete fill, resin bypass or secondary cracking — do not DIY",
    "Drill holes after packer removal must be patched with epoxy mortar before closing up — unpatched holes are future water-ingress paths",
    "A surface seal (epoxy paste) between ports must be applied and cured before injection — an unsealed crack lets resin escape between ports without filling it",
  ],
  standardsNotes: [
    "EN 1504-5 — products and systems for protection and repair of concrete structures (concrete injection) — Sika and Master Builders ports / packers are designed to comply",
    "AS 3600 Concrete Structures — rebar cover requirements — scan before drilling — do not reduce cover below AS 3600 minimums during packer installation",
    "NCC Volume One — no specific standard for injection ports — specify to EN 1504-5 and the manufacturer system requirements",
    "Confirm the current EN 1504-5 compliance for the selected products with the manufacturer before specifying for infrastructure or public projects",
  ],
  suitableDefects: [
    "Basement crack injection — ports and packers deliver PU, acrylic or epoxy resins into active or dormant cracks in concrete walls and slabs",
    "Construction joint injection — systematic packer installation along basement construction joints for PU or acrylic sealing",
    "Cold joint injection — packers at staggered depths through a cold joint for complete joint-width coverage",
    "Pipe penetration injection — packers around pipe penetrations to deliver expanding PU into the annular gap",
  ],
  typicalSubstrates: [
    "Reinforced concrete walls and slabs — in-situ poured — most common substrate for injection port / packer installation",
    "Precast concrete panels — confirm structural engineer approval before drilling for drill-in packers",
    "Masonry — surface ports preferred; drilling for packers in masonry requires care to drill the mortar joint, not the unit",
  ],
};

export function InjectionPortIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are crack injection ports &amp; packers?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Ports and packers are the delivery hardware for crack injection — they connect the injection pump to the crack. Surface ports (low pressure) are bonded over the crack with epoxy paste and suit thin sections, congested reinforcement and hard-to-access cracks where drilling is undesirable. Drill-in packers (high pressure) are drilled into the crack or joint and torqued to seal, delivering higher pressure to overcome water pressure, fill tight cracks, and seal joints systematically — and they hold on wet or contaminated surfaces where surface ports would detach.
        </p>
        <p>
          Selection follows the resin and condition: low-pressure surface ports for acrylic / light PU on sound dry concrete; drill-in packers for active water, joints, epoxy structural repair, or unreliable surfaces. A rebar scan is mandatory before drilling, the crack is surface-sealed between ports before injection, and packer holes are patched with epoxy mortar afterwards. Injection is a specialist trade.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the resin and condition (low-pressure surface ports for acrylic / light PU on sound dry concrete; high-pressure drill-in packers for active water, joints, epoxy, or wet / contaminated surfaces); rebar-scan before any drilling (keep cover above AS 3600); a cured epoxy surface-seal between ports before injection; spacing per crack / joint; EN 1504-5; and epoxy-mortar patching of packer holes afterwards. Confirm every value against the current AU manufacturer system documentation.";

export function InjectionPortProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      {/* ── System Technical Reference ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
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

      <AutoProductReference products={[]} cards={CRACK_PORT_PACKER_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Crack injection ports & packers" pruneEmptyFacts />
    </>
  );
}
