"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard,
  AISelectionStage1, AISelectionStage2,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";

type FilterTag =
  | "MGP10"
  | "Hardwood"
  | "Adjustable-prop"
  | "DAR"
  | "Bearer"
  | "Soldier"
  | "Prop"
  | "AS-1748"
  | "AS-1577";

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

export const PRODUCTS: Product[] = [
  {
    fullLabel: "BGC Timber / Bowens / Bunnings",
    brandUrl: "https://www.bowens.com.au",
    accentColor: "#0369a1",
    name: "MGP10 Pine — 70x45 / 90x45 mm Formwork Framing",
    descriptionLine: "MGP10 stress-graded pine framing for formwork bearers, stringers, and walers in concrete spalling repair — the standard structural timber for formwork framing in Australia",
    productType: "MGP10 stress-graded pine — concrete formwork framing and bearers",
    filterTags: ["MGP10", "Bearer", "Soldier", "AS-1748"],
    techChips: [
      { label: "MGP10 stress grade", cls: "bg-sky-100 text-sky-800" },
      { label: "70x45 / 90x45 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1748 certified", cls: "bg-green-50 text-green-700" },
      { label: "Bearer spacing: 400–600 mm", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "MGP10 stress-graded pine framing in 70x45 mm (3x2) and 90x45 mm (4x2) sections is the standard structural timber for concrete formwork in Australian residential and remedial construction. MGP10 (Machine Graded Pine to 10 MPa) is stress-graded to AS 1748 and provides reliable, consistent structural performance for formwork bearers, stringers, and walers. In concrete spalling repair, MGP10 framing is used to support F11 plywood form faces — as bearers spanning between props, as soldiers on the back of ply panels to stiffen against lateral mortar pressure, and as ledger boards for soffit forms. 70x45 mm is the most commonly used size in remedial formwork — light enough to handle easily in confined areas and strong enough for typical repair pour heads. 90x45 mm is used where longer bearer spans are required or where additional strength is needed for higher pour heads. Available from Bowens, Bunnings Trade, and timber merchants nationally. Specify MGP10 (not F-grade or ungraded pine) for all structural formwork framing to ensure consistent bending performance.",
    technicalProperties: [
      "MGP10 (Machine Graded Pine) — AS 1748 stress-graded — minimum 10 MPa MOR",
      "70x45 mm and 90x45 mm sections — standard formwork bearer and soldier sizes",
      "Suitable for bearers, stringers, soldiers, and walers behind F11 plywood form panels",
      "Widely available nationally from trade timber merchants and hardware suppliers",
    ],
    limitations: [
      "Do not use non-graded or non-structural pine as formwork framing — ungraded timber has unpredictable bending strength and may fail under fresh concrete pressure",
      "Wet timber (green or freshly treated) has significantly lower strength than dry timber — check moisture content before use as formwork framing in high-load applications",
      "MGP10 pine is not suitable for props or vertical supports carrying significant load — use Acrow props or hardwood props for vertical support",
      "Notching or boring of MGP10 framing members reduces their bending strength — use full-depth bearers without notches at mid-span",
    ],
    procurementSources: [
      { name: "Bowens Timber — MGP10 framing nationally", url: "https://www.bowens.com.au" },
      { name: "Bunnings Trade — MGP10 pine framing nationally", url: "https://www.bunnings.com.au/trade" },
      { name: "Trade timber merchants nationally", url: "https://www.bowens.com.au" },
    ],
  },
  {
    fullLabel: "Bowens / Independent Timber",
    brandUrl: "https://www.bowens.com.au",
    accentColor: "#7c3aed",
    name: "DAR Pine — 90x35 mm Soldierboard",
    descriptionLine: "Dressed all round (DAR) pine in 90x35 mm for soldiers and fine-joinery boxing in concrete repair — cleaner faces for fair-faced mortar work",
    productType: "DAR pine 90x35 mm — soldierboard and fine-boxing in concrete repair",
    filterTags: ["DAR", "Soldier", "AS-1577"],
    techChips: [
      { label: "DAR dressed finish", cls: "bg-purple-100 text-purple-800" },
      { label: "90x35 mm standard", cls: "bg-slate-100 text-slate-700" },
      { label: "Soldiers behind ply", cls: "bg-amber-50 text-amber-700" },
      { label: "Fine boxing applications", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Dressed all round (DAR) pine in 90x35 mm is used in concrete spalling repair formwork for soldier framing behind plywood panels, as the vertical stiffening members in column boxing and wall forms, and for fine-joinery boxing where a smooth, consistent-dimension timber is required. DAR pine is finished to consistent dimensions with smooth faces — unlike rough-sawn framing pine, DAR members provide consistent contact with the back face of plywood panels and do not cause local point loading that can indent or deflect thin plywood. In Australian remedial repair practice, 90x35 mm DAR pine is the standard section for soldiers in column boxing and slab edge side forms — fixed to the back of F11 plywood panels using clouts or screws at 150–200 mm centres. The soldier stiffens the ply panel against lateral mortar pressure and provides fixings for tie wires or form clamps. Available from Bowens, independent timber merchants, and some large hardware stores. Confirm that the section is stress-graded if it will be used in a structural framing role — DAR pine may be structural (MGP10 grade) or non-structural (appearance grade) — check with supplier.",
    technicalProperties: [
      "Dressed all round (DAR) — smooth, consistent dimensions — 90x35 mm standard section",
      "Used as soldiers behind plywood panels — stiffens ply against lateral mortar pressure",
      "Fix to back of ply with clouts or screws at 150–200 mm centres for column and wall forms",
      "Available from trade timber merchants — confirm structural grade if used in structural framing role",
    ],
    limitations: [
      "DAR pine may be appearance grade (non-structural) — if structural strength is required, specify MGP10 DAR pine — confirm with supplier",
      "35 mm depth gives lower bending stiffness than 45 mm framing in the same depth — limit soldier spacing on tall pour forms",
      "DAR pine absorbs moisture and can swell if left in contact with wet concrete for extended periods — strip formwork at earliest safe time",
      "Nailing or screwing DAR pine close to ends can split the timber — pre-drill or nail at minimum 15 mm from end",
    ],
    procurementSources: [
      { name: "Bowens Timber — DAR pine nationally", url: "https://www.bowens.com.au" },
      { name: "Independent timber merchants nationally", url: "https://www.bowens.com.au" },
      { name: "Bunnings — DAR pine sections", url: "https://www.bunnings.com.au/trade" },
    ],
  },
  {
    fullLabel: "Bowens / Timber Merchants",
    brandUrl: "https://www.bowens.com.au",
    accentColor: "#16a34a",
    name: "100x50 mm Hardwood Timber Props",
    descriptionLine: "Hardwood timber props in 100x50 mm sections — traditional adjustable timber shoring for beam soffit and overhead form support in remedial repair",
    productType: "100x50 mm hardwood timber — adjustable props and vertical support",
    filterTags: ["Hardwood", "Prop", "Bearer"],
    techChips: [
      { label: "100x50 mm hardwood", cls: "bg-green-100 text-green-800" },
      { label: "Vertical soffit support", cls: "bg-slate-100 text-slate-700" },
      { label: "Wedge adjustment", cls: "bg-amber-50 text-amber-700" },
      { label: "Traditional shoring", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Hardwood timber props in 100x50 mm section are traditional adjustable shoring members used in remedial concrete repair to support formwork for beam soffits, overhead slabs, and other overhead forms during repair mortar placement and curing. Hardwood props are used in pairs with timber wedges at the base — the wedges are driven to adjust prop height and pre-tension the support system against the form. Typical Australian hardwood species used for props include spotted gum, messmate, and box — these are available from timber merchants in the eastern states. Hardwood props are preferred for confined spaces and short-term shoring where Acrow props are difficult to use — for example, inside a tight beam soffit repair where there is insufficient room for the Acrow prop foot and adjustment mechanism. The props must be cut plumb-square at both ends and placed on solid footing — a timber sole plate under the base distributes the load to the floor or ground surface. For longer spans or higher loads, consult a structural engineer for prop design.",
    technicalProperties: [
      "100x50 mm hardwood — spotted gum, messmate, or similar — high bending and compression strength",
      "Used as vertical props supporting soffit and overhead forms — adjusted with timber wedges",
      "Pairs of props with wedge adjustment — allows fine height tuning and pre-tensioning of form support",
      "Available from hardwood timber merchants in eastern states — cut to length on site",
    ],
    limitations: [
      "Do not use softwood (pine) as timber props — pine does not have the compression strength of hardwood and can buckle under load in prop applications",
      "Check props for splits, checks, and end defects before use — hardwood timber can have drying splits that reduce compression strength",
      "Timber props do not have a calibrated load rating — for high-load or engineered shoring, use Acrow props rated to AS 3610 or engineer-specified steel shoring",
      "Ensure base sole plate is on solid, level substrate — props on soft soil or debris will settle and cause form deflection or collapse during mortar placement",
    ],
    procurementSources: [
      { name: "Hardwood timber merchants — eastern states", url: "https://www.bowens.com.au" },
      { name: "Bowens and independent timber merchants nationally", url: "https://www.bowens.com.au" },
      { name: "Hire companies — steel Acrow props preferred for rated shoring", url: "https://www.coates.com.au" },
    ],
  },
  {
    fullLabel: "Coates Hire / Kennards Hire",
    brandUrl: "https://www.coates.com.au",
    accentColor: "#374151",
    name: "Acrow Props — Adjustable Steel Formwork Props",
    descriptionLine: "Adjustable steel Acrow props (fork-head props) for supporting horizontal formwork in beam soffit and slab repair — load-rated to AS 3610",
    productType: "Adjustable steel Acrow prop — rated vertical formwork support",
    filterTags: ["Adjustable-prop", "Prop", "AS-1748"],
    techChips: [
      { label: "Load rated — AS 3610", cls: "bg-slate-700 text-white" },
      { label: "Adjustable 1.8–3.8 m", cls: "bg-slate-100 text-slate-700" },
      { label: "Hire from Coates / Kennards", cls: "bg-slate-100 text-slate-700" },
      { label: "Fork-head or flat-plate", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Adjustable steel Acrow props (also called forkhead props or adjustable steel props) are the standard vertical shoring element for supporting overhead formwork in remedial concrete repair — beam soffit boxing, slab soffit forms, and any overhead formwork system where a rated vertical support is required. Acrow props consist of an outer and inner steel tube with an adjustment pin and nut system that allows continuous height adjustment over a range of typically 1.8 m to 3.8 m, depending on size. The top of the prop terminates in a fork head (U-head) that accepts a bearer or ledger board. Acrow props are designed, tested, and load-rated to AS 3610 — this provides a known safe working load that timber props cannot provide. In remedial repair practice, Acrow props are hired from Coates Hire, Kennards Hire, and other equipment hire companies nationally. The number and spacing of props is determined by the design of the formwork system and the load imposed by fresh mortar or concrete. For structural engineering sign-off, the prop load rating and spacing must be confirmed against the calculated design load.",
    technicalProperties: [
      "Adjustable steel prop — height range 1.8–3.8 m (varies by size) — continuous screw adjustment",
      "Load-rated to AS 3610 — known safe working load — required for engineered shoring",
      "Fork-head (U-head) top — accepts timber bearer or ledger board",
      "Available on hire from Coates Hire and Kennards Hire nationally",
    ],
    limitations: [
      "Do not exceed the safe working load stamped on the prop — overloading Acrow props causes buckling — check prop size and load rating against the design load before use",
      "Props must be set plumb — a prop out of plumb loses load capacity rapidly — use a level when setting each prop",
      "Do not use bent, damaged, or corroded Acrow props — damaged pins and nuts can fail suddenly — inspect props on receipt from hire company",
      "Acrow props are not stable without lateral bracing in tall configurations — brace props to each other and to the structure when prop height exceeds 2.5 m",
    ],
    procurementSources: [
      { name: "Coates Hire — Acrow props hire nationally", url: "https://www.coates.com.au" },
      { name: "Kennards Hire — adjustable steel props nationally", url: "https://www.kennards.com.au" },
      { name: "Formwork equipment hire companies nationally", url: "https://www.coates.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "MGP10", label: "MGP10 pine" },
  { id: "Hardwood", label: "Hardwood" },
  { id: "Adjustable-prop", label: "Acrow prop" },
  { id: "DAR", label: "DAR pine" },
  { id: "Bearer", label: "Bearer" },
  { id: "Soldier", label: "Soldier" },
  { id: "Prop", label: "Prop" },
  { id: "AS-1748", label: "AS 1748" },
  { id: "AS-1577", label: "AS 1577" },
];

const SYSTEM_COMPARISON = [
  {
    product: "MGP10 Pine 70x45 / 90x45",
    use: "Bearers, stringers, walers",
    grade: "MGP10 — AS 1748",
    availability: "Bowens, Bunnings Trade nationally",
    notes: "Standard structural formwork framing — use for all bearer and stringer applications",
  },
  {
    product: "DAR Pine 90x35",
    use: "Soldiers behind plywood panels",
    grade: "DAR — confirm grade",
    availability: "Timber merchants nationally",
    notes: "Smooth face — consistent dimensions — for column boxing soldiers",
  },
  {
    product: "100x50 Hardwood Props",
    use: "Vertical soffit and overhead prop",
    grade: "Hardwood — no rated load",
    availability: "Hardwood merchants — eastern states",
    notes: "Traditional — use with wedge base — confined access where Acrow props impractical",
  },
  {
    product: "Acrow Props — Steel",
    use: "Rated vertical formwork support",
    grade: "Rated — AS 3610",
    availability: "Coates Hire, Kennards Hire",
    notes: "Preferred for engineered shoring — known load rating — hire nationally",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Beam soffit formwork — MGP10 bearers and Acrow props supporting F11 plywood soffit form for cast repair mortar application",
    "Column base boxing framing — MGP10 soldiers behind F11 ply panels forming column base repairs",
    "Slab edge side form framing — MGP10 ledger boards supporting F11 ply side forms at slab edge repairs",
    "Overhead shoring for slab spalling repairs — Acrow props providing temporary support during repair mortar placement and curing",
    "Parapet cap formwork framing — MGP10 and DAR pine for formwork on parapet cap repair boxing",
    "Adjustable prop support for temporary works — Acrow props as temporary support for damaged structural elements during investigation and repair",
  ],
  selectionCriteria: [
    "MGP10 pine (70x45 or 90x45) — standard selection for all formwork bearers, stringers, and framing — always specify structural grade, not ungraded pine",
    "DAR pine 90x35 mm — select for soldiers and stiffening members where consistent dimensions and smooth back face contact with plywood is required",
    "Hardwood timber props — select for confined spaces where Acrow props cannot be used — pair with timber wedge bases for height adjustment",
    "Acrow props — select for all overhead form support where a rated load is required — hire from Coates Hire or Kennards Hire nationally",
    "Bearer spacing: 17 mm F11 plywood spans maximum 400–600 mm between bearers under standard repair mortar pressure — calculate based on pour head",
    "For engineered or high-load shoring, engage a structural engineer to specify prop size, spacing, and bracing requirements",
  ],
  limitations: [
    "Do NOT use non-graded or non-structural timber as formwork framing — ungraded timber has unpredictable bending strength and may fail under fresh concrete pressure",
    "Do not use pine as vertical props — pine is not rated for compression prop duty — use hardwood props or Acrow steel props for vertical support",
    "Do not exceed Acrow prop load ratings — overloaded Acrow props buckle suddenly — always check the stamped safe working load against the design load",
    "Timber props without a sole plate on soft ground will settle during mortar placement — place a sole plate (minimum 200x50 mm timber board) under the base of all timber and Acrow props",
    "All overhead form systems must be braced laterally — unbraced tall prop arrays are unstable under lateral loads from wind or mortar placement vibration",
    "WHS — formwork erection and stripping is hazardous — comply with state WHS regulations for formwork work — ensure a licensed scaffolder or formwork carpenter manages all overhead formwork",
  ],
  standardsNotes: [
    "AS 3610 — Formwork for Concrete — the primary design and specification standard for concrete formwork in Australia — governs timber framing, bearer design, prop selection, and tie requirements",
    "AS 1748 — Machine Stress Graded Structural Timber — MGP10 stress grade is certified under this standard",
    "AS 1577 — Structural Plywood — the plywood structural standard referenced in formwork design (see also AS/NZS 6669 for formwork plywood specifically)",
    "AS 4100 — Steel Structures — governs design of steel formwork and shoring elements including Acrow prop design",
    "SafeWork Australia — formwork code of practice — references erection, bracing, inspection, and safe stripping of concrete formwork systems",
  ],
  suitableDefects: [
    "Concrete spalling — any repair requiring cast repair mortar in formwork — beam soffits, column bases, slab edges, walls",
    "Slab edge deterioration — side form boxing and framing for slab edge profile reinstatement",
    "Settlement cracks — temporary shoring to support cracked structural elements during repair",
    "Reinforcement corrosion — overhead formwork for mortar placed around corroded and repaired reinforcement",
    "Precast element reinstatement — formwork framing and propping for casting replacement precast details",
  ],
  typicalSubstrates: [
    "Floor slabs — sole plate bearing surface for Acrow and timber props — place sole plate on clean, level floor surface",
    "Existing concrete soffits and beams — form faces contact the underside of existing elements — form edges sealed to prevent mortar blowout",
    "F11 structural plywood form faces — MGP10 and DAR timber supports the back of F11 ply panels — fix with clouts, screws, or form ties",
    "Steel reinforcement and existing concrete substrate — form edges are sealed against the existing concrete at all joints to prevent mortar loss",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["role", "framing_bearer / soldier / vertical_prop", "match member to its formwork-framing role"],
    ["load", "structural_rated_shoring / light", "structural_rated_shoring → AS 3610 rated steel prop (not timber)"],
    ["grade", "stress_graded / appearance", "structural framing → stress_graded (MGP10) only; appearance grade not_suitable"],
    ["application", "horizontal_form_support / vertical_support / boxing", "gate against member capability"],
    ["access", "confined / open", "confined → timber props / smaller sections may be needed"],
  ],
  json: {
    category: "formwork_timber",
    stage1_gates: {
      role: { allowed: ["framing_bearer", "soldier", "vertical_prop"], rule: "match member to framing role" },
      load: { allowed: ["structural_rated_shoring", "light"], rule: "structural_rated_shoring=AS3610 steel prop" },
      grade: { allowed: ["stress_graded", "appearance"], rule: "structural framing=stress_graded (MGP10) only" },
      application: { allowed: ["horizontal_form_support", "vertical_support", "boxing"], rule: "gate against member capability" },
      access: { allowed: ["confined", "open"], rule: "confined=timber props/smaller sections" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "MGP10 Pine — 70x45 / 90x45 mm Formwork Framing": {
    rows: [
      ["role", "gate", "framing_bearer/soldier"],
      ["load_rated", "gate", "not_rated (framing)"],
      ["grade", "gate", "stress_graded (MGP10/AS1748)"],
      ["application", "gate", "bearers/soldiers/walers"],
      ["material", "tag", "mgp10_pine"],
      ["section_mm", "rank", "70x45 / 90x45"],
      ["supply", "meta", "bowens/bunnings/merchants"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "mgp10_pine_framing",
      gates: { role: "framing_bearer/soldier", load_rated: "not_rated", grade: "stress_graded_MGP10", application: "bearers/soldiers/walers" },
      tag: { material: "mgp10_pine" },
      rank: { section_mm: "70x45/90x45" },
      meta: { supply: "bowens/bunnings/merchants", alternative_product: "Acrow props (vertical load)", data_status: "verified", selectable: true, source: "MGP10 AS 1748 stress-graded pine — not for vertical props", confirmed_date: null },
    },
  },
  "DAR Pine — 90x35 mm Soldierboard": {
    rows: [
      ["role", "gate", "soldier"],
      ["load_rated", "gate", "not_rated"],
      ["grade", "gate", "appearance_or_stress (confirm)"],
      ["application", "gate", "soldiers_behind_ply"],
      ["material", "tag", "dar_pine"],
      ["section_mm", "rank", "90x35"],
      ["supply", "meta", "bowens/bunnings/merchants"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "dar_pine_soldierboard",
      gates: { role: "soldier", load_rated: "not_rated", grade: "appearance_or_stress_confirm", application: "soldiers_behind_ply" },
      tag: { material: "dar_pine" },
      rank: { section_mm: "90x35" },
      meta: { supply: "bowens/bunnings/merchants", alternative_product: "MGP10 DAR if structural role", data_status: "verified", selectable: true, source: "DAR pine 90x35 — confirm MGP10 grade if structural", confirmed_date: null },
    },
  },
  "100x50 mm Hardwood Timber Props": {
    rows: [
      ["role", "gate", "vertical_prop"],
      ["load_rated", "gate", "not_rated (no calibrated rating)"],
      ["grade", "gate", "hardwood"],
      ["application", "gate", "vertical_support_confined"],
      ["material", "tag", "hardwood"],
      ["section_mm", "rank", "100x50"],
      ["supply", "meta", "hardwood_merchants_eastern"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "hardwood_timber_props",
      gates: { role: "vertical_prop", load_rated: "not_rated", grade: "hardwood", application: "vertical_support_confined" },
      tag: { material: "hardwood" },
      rank: { section_mm: "100x50" },
      meta: { supply: "hardwood_merchants_eastern", alternative_product: "Acrow props (rated/engineered shoring)", data_status: "verified", selectable: true, source: "hardwood props (spotted gum/messmate) — no calibrated load rating; engineer for high load", confirmed_date: null },
    },
  },
  "Acrow Props — Adjustable Steel Formwork Props": {
    rows: [
      ["role", "gate", "vertical_prop"],
      ["load_rated", "gate", "AS3610_rated"],
      ["grade", "gate", "n/a (steel)"],
      ["application", "gate", "vertical_support_rated_shoring"],
      ["material", "tag", "steel"],
      ["section_mm", "rank", "adjustable 1.8-3.8m"],
      ["supply", "meta", "coates/kennards (hire)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "acrow_steel_props",
      gates: { role: "vertical_prop", load_rated: "AS3610_rated", grade: "n/a", application: "vertical_support_rated_shoring" },
      tag: { material: "steel" },
      rank: { section_mm: "adjustable_1.8-3.8m" },
      meta: { supply: "coates/kennards_hire", alternative_product: null, data_status: "verified", selectable: true, source: "Acrow adjustable steel props — AS 3610 load-rated; brace above 2.5m", confirmed_date: null },
    },
  },
};

export function FormworkTimberIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Formwork timber in concrete spalling repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Structural timber framing is the backbone of concrete formwork in remedial repair — MGP10 stress-graded pine bearers support the plywood form face, soldiers stiffen the ply panels against lateral mortar pressure, and Acrow or timber props provide vertical support for overhead soffit and beam formwork. The timber framing must be rated for structural use — MGP10 (Machine Graded Pine to AS 1748) is the minimum grade for all concrete formwork framing in Australia. Non-graded or appearance-grade timber must not be used as structural formwork framing.
        </p>
        {expanded && (
          <>
            <p>
              For vertical support, Acrow adjustable steel props are the preferred option for all overhead formwork — they provide a known load rating under AS 3610, are adjustable over a wide height range, and are available on hire nationally. Hardwood timber props are an acceptable alternative in confined spaces where Acrow props cannot be used, but they must be used with timber wedge bases for height adjustment and placed on sole plates on solid flooring. All overhead formwork must comply with AS 3610 and applicable state WHS formwork codes — engage a licensed formwork carpenter or structural engineer for complex or high-load overhead repair formwork.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

const DESIGN_CRITERIA = "Member function (framing/bearer, soldier/boxing, prop) & required load capacity; timber stress grade (e.g. MGP10) & species/durability to AS 1720.1 / AS 1684; section size (e.g. 90x35, 100x50) & span/spacing to resist concrete pressure; reusability & form-face finish class (off-form vs structural); for props: rated working load, adjustable height range & buckling capacity (AS 3610 formwork, working platform/temporary works); moisture/treatment for contact; deflection limit for surface tolerance; strike/strip time compatibility with repair-mortar gain; release agent compatibility.";

export function FormworkTimberProductSection() {
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
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
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

      <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete spalling" />
    </>
  );
}
