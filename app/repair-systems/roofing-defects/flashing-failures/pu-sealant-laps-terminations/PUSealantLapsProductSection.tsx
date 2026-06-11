"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "PU-sealant"
  | "Hybrid-PU"
  | "1-component"
  | "Sika"
  | "Bostik"
  | "Tremco"
  | "Mapei"
  | "Metal-adhesion"
  | "UV-stable"
  | "Paintable"
  | "Roofing-joint"
  | "Facade-joint"
  | "ISO-11600";

type Product = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sikaflex-11FC+",
    descriptionLine: "Sika one-component PU sealant — primary product for sealing flashing lap joints, upstand terminations, counter-flashing joints, and all roof flashing interfaces — excellent adhesion to metal, masonry, and Colorbond",
    productType: "1-component polyurethane sealant — ISO 11600 — metal adhesion — UV stable",
    filterTags: ["PU-sealant", "1-component", "Sika", "Metal-adhesion", "UV-stable", "Paintable", "Roofing-joint", "ISO-11600"],
    techChips: [
      { label: "1-component PU", cls: "bg-rose-100 text-rose-800" },
      { label: "Metal — masonry — Colorbond", cls: "bg-slate-100 text-slate-700" },
      { label: "UV stable", cls: "bg-green-50 text-green-700" },
      { label: "Paintable", cls: "bg-slate-100 text-slate-700" },
      { label: "ISO 11600", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikaflex-11FC+ is Sika Australia's primary one-component polyurethane sealant for general construction, facade, and roofing joint applications. It is the most widely specified PU sealant for sealing flashing lap joints, upstand terminations, counter-flashing joints, and all roof flashing interfaces in Australian building remediation. The product cures by reaction with atmospheric moisture to form a durable elastic sealant that accommodates significant joint movement — critical for flashing lap joints that are subject to thermal movement. Sikaflex-11FC+ provides excellent adhesion to painted and unpainted metals including Colorbond steel, aluminium, and stainless steel, as well as to masonry, brick, render, and fibre cement — the range of substrates typically encountered at flashing terminations in Australian building remediation. The cured sealant is paintable — an important practical advantage on strata remediation projects where colour-matching of exposed sealant is required by the strata committee or heritage authority. UV stable — suitable for exposed roofing and facade applications without significant colour shift or surface deterioration. Classified to ISO 11600. Confirm primer requirements for the specific substrate before applying — Sika Primer-3 N or equivalent may be required on some substrates. Confirm the current product TDS with Sika Australia before specifying.",
    technicalProperties: [
      "1-component polyurethane sealant — moisture-curing — no mixing required on site",
      "Excellent adhesion to Colorbond steel, aluminium, stainless steel, masonry, brick, render, and fibre cement",
      "UV stable — suitable for exposed roofing and facade joint sealing without cover",
      "Paintable after cure — compatible with standard construction paints",
      "High movement accommodation — suitable for flashing lap joints subject to thermal movement",
      "ISO 11600 classified — confirm classification letter for the specific application from the current TDS",
      "Widely available through Sika Australia trade supply and construction suppliers nationally",
    ],
    limitations: [
      "Confirm primer requirements for the specific substrate before applying — Sika Primer-3 N or equivalent may be required on some substrates",
      "Old sealant must be fully removed before applying new sealant — do not apply over failed sealant",
      "Application temperature range — confirm from current TDS — do not apply below minimum temperature",
      "Not suitable for immersed or submerged joint applications — confirm exposure conditions with Sika Australia",
      "Not a silicone sealant — do not use where silicone is specified — PU and silicone are not interchangeable",
      "Confirm current product name (FC+ vs earlier FC formulation), TDS, and primer requirements with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Construction supply trade merchants", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Bostik Australia",
    brandUrl: "https://www.bostik.com/au",
    accentColor: "#0369a1",
    name: "Bostik Seal-N-Flex 1",
    descriptionLine: "Bostik 1-component polyurethane sealant for general construction and roofing joints — suitable for flashing lap sealing and termination sealing — Australian construction market standard",
    productType: "1-component polyurethane sealant — Bostik — roofing and construction joints",
    filterTags: ["PU-sealant", "1-component", "Bostik", "Roofing-joint", "Paintable"],
    techChips: [
      { label: "1-component PU", cls: "bg-sky-100 text-sky-800" },
      { label: "Bostik", cls: "bg-slate-100 text-slate-700" },
      { label: "Roofing joints", cls: "bg-green-50 text-green-700" },
      { label: "Paintable", cls: "bg-slate-100 text-slate-700" },
      { label: "General construction", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Bostik Seal-N-Flex 1 is a one-component polyurethane sealant from Bostik Australia for general construction and roofing joint sealing applications. It is a practical and widely distributed alternative to Sikaflex-11FC+ for flashing lap sealing and termination sealing in Australian building remediation. Bostik is a major Australian construction sealant supplier with broad national distribution through trade merchants and hardware retailers. Seal-N-Flex 1 provides good adhesion to metal, masonry, and other construction substrates and accommodates joint movement through its elastic PU chemistry. The cured sealant is paintable — a practical advantage for strata remediation where exposed sealant must be painted to match surrounding finishes. Confirm primer requirements for the specific substrate with Bostik Australia before applying. As with all PU sealants, the substrate must be clean, dry, and free of oil, dust, and old sealant residue before application. Old sealant must be fully removed before applying new sealant — do not apply Seal-N-Flex 1 over failed sealant. Confirm current product formulation, TDS, and primer requirements with Bostik Australia before specifying for a remediation project.",
    technicalProperties: [
      "1-component polyurethane sealant — moisture-curing",
      "Suitable for flashing lap sealing, upstand termination sealing, and counter-flashing joint sealing",
      "Good adhesion to metal, masonry, and general construction substrates",
      "Paintable after cure",
      "Movement accommodation — elastic PU chemistry accommodates thermal movement at flashing joints",
      "National distribution through Bostik Australia trade supply and hardware retailers",
    ],
    limitations: [
      "Confirm primer requirements for the specific substrate with Bostik Australia before applying",
      "Old sealant must be fully removed before applying new sealant",
      "Confirm current UV stability rating from the current TDS before specifying for exposed roofing joint applications",
      "Not a silicone sealant — do not use where silicone is specified",
      "Confirm current product name, formulation, and TDS with Bostik Australia before specifying",
    ],
    procurementSources: [
      { name: "Bostik Australia — trade supply", url: "https://www.bostik.com/au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Construction supply trade merchants", url: "https://www.bostik.com/au" },
    ],
  },
  {
    fullLabel: "Tremco / RPM Building Solutions",
    brandUrl: "https://www.tremcosealants.com",
    accentColor: "#16a34a",
    name: "Tremco Dymonic FC",
    descriptionLine: "Tremco 1-component PU/hybrid facade sealant for flashing joints and lap sealing on roofing applications — UV stable — paintable — suitable for metal-to-masonry and metal-to-metal flashing joints",
    productType: "1-component PU/hybrid facade and roofing sealant — Tremco Dymonic FC",
    filterTags: ["PU-sealant", "Hybrid-PU", "1-component", "Tremco", "Facade-joint", "UV-stable", "Paintable", "Roofing-joint"],
    techChips: [
      { label: "PU/hybrid — 1-component", cls: "bg-green-100 text-green-800" },
      { label: "Tremco Dymonic FC", cls: "bg-slate-100 text-slate-700" },
      { label: "UV stable", cls: "bg-green-50 text-green-700" },
      { label: "Paintable", cls: "bg-slate-100 text-slate-700" },
      { label: "Facade and roofing joints", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco Dymonic FC is a one-component polyurethane/hybrid facade sealant from Tremco (RPM Building Solutions) used for flashing joints and lap sealing on roofing and facade applications. Dymonic FC is a high-performance facade sealant with UV stability and paintability — it is suitable for metal-to-masonry and metal-to-metal flashing joints, including Colorbond steel to brick, aluminium to masonry, and counter-flashing joints at chimney masonry. As a hybrid PU formulation, Dymonic FC may have different application characteristics to a standard PU sealant — confirm the specific application method and primer requirements with Tremco Australia or the current TDS before applying. Dymonic FC is distributed through Tremco's RPM Building Solutions trade supply network. It is positioned as a premium sealant for facade and roofing applications where UV stability and paintability are critical performance requirements. Confirm current product name, formulation, and availability in Australia with Tremco / RPM Building Solutions before specifying — confirm against the current Australian TDS, not a US or European TDS.",
    technicalProperties: [
      "1-component PU/hybrid sealant — moisture-curing — no mixing required",
      "UV stable — suitable for exposed roofing and facade joint applications",
      "Paintable after cure — compatible with construction paints",
      "Suitable for metal-to-masonry and metal-to-metal flashing joints",
      "High movement accommodation — suitable for thermal movement at flashing lap joints",
      "Tremco / RPM Building Solutions trade supply — confirm regional availability",
    ],
    limitations: [
      "Confirm primer requirements for the specific substrate with Tremco before applying — hybrid PU formulations may have different primer requirements to standard PU sealants",
      "Confirm current Australian product formulation and TDS with Tremco / RPM Building Solutions — do not use US or European TDS for Australian projects",
      "Old sealant must be fully removed before applying new sealant",
      "Not a silicone sealant",
      "Confirm current product name and availability with Tremco / RPM Building Solutions before specifying — product names and formulations may change between regions",
    ],
    procurementSources: [
      { name: "Tremco / RPM Building Solutions — trade supply", url: "https://www.tremcosealants.com" },
      { name: "Construction sealant trade merchants — confirm stocking with local supplier", url: "https://www.tremcosealants.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/mapeflex-pu45",
    accentColor: "#7c3aed",
    name: "Mapei Mapeflex PU45",
    descriptionLine: "Mapei 1-component polyurethane sealant for metal-to-masonry, metal-to-metal, and general construction joints — ISO 11600 classified — suitable for flashing lap and termination sealing in Australian remedial building",
    productType: "1-component polyurethane sealant — Mapei Mapeflex PU45 — ISO 11600",
    filterTags: ["PU-sealant", "1-component", "Mapei", "ISO-11600", "Paintable", "Roofing-joint"],
    techChips: [
      { label: "1-component PU", cls: "bg-violet-100 text-violet-800" },
      { label: "ISO 11600 classified", cls: "bg-green-50 text-green-700" },
      { label: "Mapei", cls: "bg-slate-100 text-slate-700" },
      { label: "Metal-to-masonry", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapeflex PU45 is Mapei Australia's one-component polyurethane sealant for metal-to-masonry, metal-to-metal, and general construction joint sealing. It is ISO 11600 classified — a standardised performance classification for construction sealants that confirms movement accommodation capacity and adhesion performance in accordance with the international standard. Mapeflex PU45 is suitable for sealing flashing lap joints, upstand terminations, and counter-flashing joints in roofing remediation applications where a tested and classified PU sealant is required. The product is paintable — an advantage for strata remediation where exposed sealant must be painted to match surrounding finishes. Confirm primer requirements for the specific substrate with Mapei Australia before applying. As a Mapei product, Mapeflex PU45 is available through the Mapei Australia trade supply network and is a suitable PU sealant alternative to Sikaflex-11FC+ where Mapei is the preferred or specified brand for the project. Confirm current product name, formulation, ISO 11600 classification letter, and primer requirements with Mapei Australia before specifying.",
    technicalProperties: [
      "1-component polyurethane sealant — moisture-curing — ISO 11600 classified",
      "Suitable for metal-to-masonry and metal-to-metal joint sealing including flashing laps and terminations",
      "Paintable after cure",
      "Movement accommodation per ISO 11600 classification — confirm classification letter from current TDS",
      "Mapei Australia trade supply — available through Mapei distributors nationally",
      "Confirm primer requirements with Mapei Australia for the specific substrate before applying",
    ],
    limitations: [
      "Confirm ISO 11600 classification letter and movement accommodation class from current Mapei Australia TDS before specifying",
      "Confirm primer requirements with Mapei Australia before applying — primer may be required on some substrates for adequate adhesion",
      "Old sealant must be fully removed before applying new sealant",
      "Confirm UV stability rating from current TDS for exposed roofing joint applications",
      "Not a silicone sealant",
      "Confirm current product name, formulation, and availability with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Construction supply trade merchants", url: "https://www.mapei.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "PU-sealant", label: "PU sealant" },
  { id: "Hybrid-PU", label: "Hybrid PU" },
  { id: "1-component", label: "1-component" },
  { id: "Sika", label: "Sika" },
  { id: "Bostik", label: "Bostik" },
  { id: "Tremco", label: "Tremco" },
  { id: "Mapei", label: "Mapei" },
  { id: "UV-stable", label: "UV stable" },
  { id: "Metal-adhesion", label: "Metal adhesion" },
  { id: "ISO-11600", label: "ISO 11600" },
];

const SYSTEM_COMPARISON: {
  brand: string;
  product: string;
  chemistry: string;
  components: string;
  movement: string;
  uvStable: string;
  paintable: string;
  iso11600: string;
}[] = [
  {
    brand: "Sika",
    product: "Sikaflex-11FC+",
    chemistry: "1-component PU",
    components: "1",
    movement: "High — confirm from TDS",
    uvStable: "Yes",
    paintable: "Yes",
    iso11600: "Yes — confirm class from TDS",
  },
  {
    brand: "Bostik",
    product: "Seal-N-Flex 1",
    chemistry: "1-component PU",
    components: "1",
    movement: "Confirm from TDS",
    uvStable: "Confirm from TDS",
    paintable: "Yes",
    iso11600: "Confirm with Bostik",
  },
  {
    brand: "Tremco",
    product: "Dymonic FC",
    chemistry: "1-component PU/hybrid",
    components: "1",
    movement: "High — confirm from TDS",
    uvStable: "Yes",
    paintable: "Yes",
    iso11600: "Confirm with Tremco",
  },
  {
    brand: "Mapei",
    product: "Mapeflex PU45",
    chemistry: "1-component PU",
    components: "1",
    movement: "Confirm from TDS",
    uvStable: "Confirm from TDS",
    paintable: "Yes",
    iso11600: "Yes — confirm class from TDS",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Sealing flashing lap joints where two metal flashing elements overlap — the sealant is applied in the lap before the upper flashing is pressed into position",
    "Sealing upstand termination joints where a flashing upstand terminates at a wall face, counter-flashing groove, or cap flashing — the PU sealant seals the top edge of the upstand against water entry",
    "Counter-flashing joints where the counter-flashing has been inserted into a raked mortar joint or chase in chimney or parapet masonry — the joint between the counter-flashing and the masonry is sealed with PU sealant",
    "Sealing flashing-to-ridge-cap joints on metal ridge capping where the flashing laps under the ridge capping",
    "General roofing flashing lap and joint sealing as part of a comprehensive flashing failure remediation on Class 2 strata apartment buildings",
  ],
  selectionCriteria: [
    "PU vs silicone — specify PU sealant (not silicone) for flashing lap joints where the sealant must be painted or where movement joints require a paintable sealant",
    "UV stability — for exposed joints, specify a UV-stable PU sealant — confirm UV stability class from current TDS",
    "Primer — confirm primer requirement for the specific substrate (metal, masonry, render, Colorbond) with the sealant manufacturer before applying",
    "Movement accommodation — confirm movement class from ISO 11600 classification or TDS — joint design must match the sealant's rated movement capacity",
    "Joint design — clean parallel joint faces, minimum 6mm width, backed by backer rod where required — do not apply to feathered or tapered joints",
    "Old sealant removal — all old sealant must be fully removed before applying new sealant — mechanical removal then solvent wipe",
  ],
  limitations: [
    "PU sealant is not a substitute for a correctly formed metal flashing — sealant-only repairs at failed flashing joints without replacing the metal flashing element are temporary measures only",
    "Do not apply PU sealant over silicone — PU will not adhere to cured silicone — all silicone must be completely removed before applying PU sealant",
    "Do not apply to wet substrates — substrate must be clean, dry, and free of oil, grease, and dust before application",
    "PU sealants have a limited service life in UV-exposed conditions — confirm UV stability and expected service life with the manufacturer for the specific application",
    "Not suitable for immersed or permanently wet joint applications without specific confirmation from the manufacturer",
  ],
  standardsNotes: [
    "ISO 11600 — Glazing in Building — Sealants — Classification and Requirements — international sealant performance classification standard",
    "AS 4055 — Wind Loads for Housing — relevant for understanding joint movement requirements in wind-loaded roof and facade applications",
    "Manufacturer TDS — confirm application temperature range, pot life (where applicable), primer requirements, and substrate preparation from the current TDS",
    "NCC / BCA — weather resistance requirements for joints and sealing in Class 1 and Class 2 buildings",
  ],
  suitableDefects: [
    "Flashing failures — flashing lap joint failure — sealant in lap joint has failed, allowing water entry at the flashing lap",
    "Flashing failures — upstand termination joint failure — water entry at the top edge of a flashing upstand where the termination joint has opened",
    "Flashing failures — counter-flashing joint failure — failed sealant at raked mortar joint or chase where counter-flashing is inserted into chimney or parapet masonry",
    "Roofing defects — general joint sealing as part of comprehensive flashing remediation works on strata apartment buildings",
  ],
  typicalSubstrates: [
    "Colorbond steel flashing — metal-to-metal and metal-to-masonry joints — confirm primer requirement with sealant manufacturer",
    "Aluminium flashing — metal-to-metal and metal-to-masonry joints — confirm primer requirement — anodised aluminium may require specific primer",
    "Lead flashing — metal-to-masonry joints — confirm primer compatibility with lead substrate",
    "Brick masonry — at counter-flashing chase and upstand termination joints — prime porous masonry surface before applying sealant",
    "Rendered masonry — at upstand termination and counter-flashing joints — confirm primer for rendered surfaces",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x";
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
            >
              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                >
                  {src.name}
                  <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
    </div>
  );
}

function CollapsibleCardDetails({
  text,
  chips,
}: {
  text: string;
  chips: { label: string; cls: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p
        className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}
      >
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function PUSealantLapsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are polyurethane sealants for flashing laps and terminations?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Polyurethane (PU) sealants are elastic, one-component, moisture-curing construction sealants specified for sealing movement joints, lap joints, and termination joints in metal flashing systems. They are the preferred sealant chemistry for flashing lap joints in Australian roofing and facade remediation because they accommodate joint movement (thermal expansion and contraction of metal flashings), adhere well to metal, masonry, and Colorbond steel, and are paintable after cure — unlike silicone sealants.
        </p>
        {expanded && (
          <>
            <p>
              The critical distinction between PU sealant and silicone sealant is paintability and chemistry. PU sealant is paintable — silicone is not. For roofing flashing lap joints that may require painting to match surrounding finishes, PU sealant must be specified, not silicone. PU sealant also bonds better to metal substrates than silicone in many applications — confirm primer requirements with the manufacturer for the specific substrate before applying.
            </p>
            <p>
              Old sealant must be completely removed before applying new PU sealant. Applying new PU sealant over old failed sealant — including silicone — will result in adhesion failure of the new sealant. Mechanical removal followed by solvent wiping of the substrate is the standard substrate preparation method. Confirm the solvent and primer from the manufacturer's current TDS before applying.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

function TechCard({
  icon,
  title,
  items,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {icon}
        </div>
        <h3 className="text-sm font-extrabold text-sky-950">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">
            {style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}
            {style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}
            {style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PUSealantLapsProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleProducts =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable substrates
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (
              <>Hide detail <ChevronUp size={14} /></>
            ) : (
              <>Show detail <ChevronDown size={14} /></>
            )}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — 1-component PU sealant systems — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active
                    ? "border-sky-950 bg-sky-950 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div
              key={product.name}
              className="flex-none"
              style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
            >
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}
              >
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a
                          href={product.tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a
                        href={product.brandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      >
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips}
                  />
                </div>

                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <CollapsibleList items={product.technicalProperties} icon="check" limit={3} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList items={product.limitations} icon="x" limit={3} />
                  </div>
                </div>

                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of 1-component PU sealant systems for flashing laps and terminations. Confirm all selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Chemistry</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Components</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Movement</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">UV stable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Paintable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">ISO 11600</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.chemistry}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.components}</td>
                  <td className="px-4 py-3 text-slate-600">{row.movement}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.uvStable === "Yes" ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                        <CheckCircle size={11} /> Yes
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">{row.uvStable}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.paintable === "Yes" ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                        <CheckCircle size={11} /> Yes
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">{row.paintable}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.iso11600}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
