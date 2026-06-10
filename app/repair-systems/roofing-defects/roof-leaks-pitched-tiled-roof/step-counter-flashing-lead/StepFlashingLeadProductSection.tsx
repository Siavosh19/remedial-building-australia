"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Lead"
  | "Code-3"
  | "Code-4"
  | "Code-5"
  | "Soaker"
  | "Step-flashing"
  | "Counter-flashing"
  | "Heritage"
  | "Standard";

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
    fullLabel: "Austral Lead & Metals",
    brandUrl: "https://www.australlead.com.au",
    tdsUrl: "https://www.australlead.com.au/products",
    accentColor: "#475569",
    name: "Austral Lead Code 3 Sheet (1.32mm / 14.97 kg/m²)",
    descriptionLine: "Code 3 lead sheet from Austral Lead & Metals — minimum standard for step flashings where small soakers are used — less commonly used than Code 4 for step flashings",
    productType: "Lead sheet — Code 3 — 1.32mm — AS 3703 / BS EN 12588",
    filterTags: ["Lead", "Code-3", "Soaker", "Step-flashing", "Heritage"],
    techChips: [
      { label: "Lead sheet — Code 3", cls: "bg-slate-200 text-slate-800" },
      { label: "1.32mm / 14.97 kg/m²", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3703 / BS EN 12588", cls: "bg-green-50 text-green-700" },
      { label: "Small soakers — minimum code", cls: "bg-amber-50 text-amber-700" },
      { label: "Heritage", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Austral Lead Code 3 sheet is the lightest lead sheet commonly used in roofing applications in Australia. At 1.32mm thickness and 14.97 kg/m², Code 3 is the minimum standard for small soaker-type step flashings where the individual soaker pieces are kept to a short length and limited plan area. For Code 3 lead sheet, the BS EN 12588 and AS 3703 lead code system specifies a maximum soaker size to limit the weight of lead on any single fixing point and to prevent thermal expansion fatigue at the fixing — Code 3 soakers should generally not exceed 150mm in length. In practice, Code 3 lead is less commonly specified for step and counter-flashing on Australian pitched tiled roofs than Code 4, which provides better durability and greater forming weight for standard-size step flashings. Code 3 may be specified by a heritage consultant or roof plumber where the original specification used Code 3 and the remediation requires matching the original material, or where a very lightweight lead soaker is required for a specific tile profile with minimal bearing area. For standard step and counter-flashing on heritage tiled roofs, specify Code 4. Confirm with Austral Lead & Metals before ordering.",
    technicalProperties: [
      "Austral Lead Code 3 sheet — 1.32mm nominal thickness — 14.97 kg/m² — AS 3703 compliant — BS EN 12588 Code 3",
      "Minimum code for roofing step flashings — appropriate for small individual soakers with a short maximum length (generally 150mm maximum)",
      "Malleable and ductile — can be dressed by hand onto irregular profiles and around corners without cracking — no sheet metal folder required",
      "Self-sealing at overlaps — lead compresses and conforms under the weight of tiles and overlying materials — naturally seals at lap joints",
      "Supplied in sheet and coil from Austral Lead & Metals — cut to size by roof plumber on site",
      "Fixings must be copper or stainless steel — do not use galvanised or plain steel fixings with lead — galvanic corrosion will destroy the fixing",
      "Do not paint — lead develops a natural oxide patina that is chemically stable — painting lead is counterproductive and not standard practice",
    ],
    limitations: [
      "Code 3 is the minimum code for step flashings — where soakers exceed 150mm in length or where the step flashing has significant plan area, specify Code 4 instead",
      "Heavier than Colorbond or aluminium — additional roof load must be considered in structural assessment, particularly on heritage buildings with existing loading constraints",
      "Lead handling requires appropriate PPE — wear gloves, do not eat, drink, or smoke when handling lead — wash hands after work — refer to manufacturer MSDS",
      "Lead waste must be disposed of according to local state/territory regulations — lead is a hazardous waste material — do not dispose of lead offcuts in general waste",
      "Installed by an experienced roof plumber — lead forming and dressing requires specific trade experience — not a general roofing contractor material",
      "Do not use in contact with freshly set cement or concrete — alkalis in fresh cement attack lead — use a bituminous paint or felt separator where lead contacts fresh concrete",
    ],
    procurementSources: [
      { name: "Austral Lead & Metals — trade supply", url: "https://www.australlead.com.au" },
      { name: "Roofing and plumbing trade merchants nationally", url: "https://www.reece.com.au" },
      { name: "Tradelink — plumbing trade supply", url: "https://www.tradelink.com.au" },
    ],
  },
  {
    fullLabel: "Austral Lead & Metals",
    brandUrl: "https://www.australlead.com.au",
    tdsUrl: "https://www.australlead.com.au/products",
    accentColor: "#1e293b",
    name: "Austral Lead Code 4 Sheet (1.80mm / 20.41 kg/m²)",
    descriptionLine: "Code 4 lead sheet — Australian standard for most step flashing and chimney flashing applications — most commonly specified code for step and counter-flashing on heritage and high-specification tiled roofs",
    productType: "Lead sheet — Code 4 — 1.80mm — AS 3703 / BS EN 12588 — standard specification",
    filterTags: ["Lead", "Code-4", "Step-flashing", "Counter-flashing", "Heritage", "Standard"],
    techChips: [
      { label: "Lead sheet — Code 4", cls: "bg-slate-800 text-white" },
      { label: "1.80mm / 20.41 kg/m²", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3703 / BS EN 12588", cls: "bg-green-50 text-green-700" },
      { label: "Most commonly specified code", cls: "bg-amber-50 text-amber-700" },
      { label: "Heritage — standard spec", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Austral Lead Code 4 sheet is the standard specification for step and counter-flashing, chimney flashings, and saddle flashings on pitched tiled roofs in Australia where lead is specified. At 1.80mm thickness and 20.41 kg/m², Code 4 provides the durability and forming weight required for standard step flashings on both soaker and continuous step flashing designs. Code 4 is the most commonly specified lead sheet code for this application in Australian heritage building specifications and by experienced roof plumbers working on heritage-listed and high-specification residential tiled roofs. Code 4 is appropriate for step flashing soakers up to 250mm length, for continuous step flashings, and for counter-flashings into mortar joints at masonry chimney and wall abutments. Lead is specified for these applications primarily on heritage buildings where the original material was lead and the heritage authority requires matching material to be used in the remediation, and on high-specification new and remediation projects where the roof plumber or specifier considers lead to be the optimal material for durability and self-sealing at overlaps. Austral Lead & Metals is the primary Australian manufacturer of lead sheet to AS 3703 and BS EN 12588. Fixings must be copper or stainless steel. Lead must not be painted. Installed by an experienced roof plumber.",
    technicalProperties: [
      "Austral Lead Code 4 sheet — 1.80mm nominal thickness — 20.41 kg/m² — AS 3703 compliant — BS EN 12588 Code 4",
      "Standard code for step flashings, counter-flashings, chimney flashings, and saddle flashings on Australian tiled roofs",
      "Suitable for soakers up to 250mm length and for continuous step flashing installations",
      "Malleable and ductile — hand-dressed to profile — conforms to irregular wall and tile surfaces — no power tools or sheet metal folder required for forming",
      "Self-sealing at overlaps — conforms under load — preferred for complex three-dimensional junctions where a rigid material would gap",
      "Fixings: copper or stainless steel nails and clips — never galvanised or plain steel — galvanic corrosion of fixing is rapid in the presence of lead",
      "Do not paint — natural oxide patina (lead carbonate) is chemically stable and aesthetically appropriate for heritage applications",
    ],
    limitations: [
      "Heavier than Colorbond or aluminium — Code 4 lead at 20.41 kg/m² imposes a significantly higher roof load than steel or aluminium flashings — confirm with structural engineer on heritage buildings with existing loading constraints",
      "Lead handling requires appropriate PPE — gloves mandatory — do not eat, drink, or smoke when handling lead — wash hands thoroughly after handling — refer to Austral Lead MSDS",
      "Lead waste must be disposed of according to local state/territory hazardous waste regulations — do not place lead offcuts in general skip bins or waste",
      "Installed by an experienced roof plumber — forming, dressing, and fixing lead sheet correctly requires specific trade training and experience",
      "Do not allow lead to contact fresh cement, concrete, or lime mortar without an isolation layer — alkalis attack and corrode lead — use bituminous paint or felt separator at contact points",
      "Do not paint — painting lead will trap moisture, interfere with the patina, and is not standard practice — specify unpainted lead for all standard applications",
    ],
    procurementSources: [
      { name: "Austral Lead & Metals — trade supply", url: "https://www.australlead.com.au" },
      { name: "Reece — plumbing trade supply", url: "https://www.reece.com.au" },
      { name: "Tradelink — plumbing trade supply", url: "https://www.tradelink.com.au" },
      { name: "Roofing and building supplies — trade merchants nationally", url: "https://www.roofmaster.com.au" },
    ],
  },
  {
    fullLabel: "Calder Industrial Materials",
    brandUrl: "https://www.calderindustrial.com.au",
    tdsUrl: "https://www.calderindustrial.com.au",
    accentColor: "#7c3aed",
    name: "Calder Industrial Lead Sheet",
    descriptionLine: "Calder Industrial lead sheet in Code 3, 4 and 5 gauges — alternative to Austral Lead — used for all lead flashing applications on pitched tiled roofs",
    productType: "Lead sheet — Code 3, 4 and 5 — alternative supplier — AS 3703 / BS EN 12588",
    filterTags: ["Lead", "Code-3", "Code-4", "Code-5", "Step-flashing", "Counter-flashing", "Heritage"],
    techChips: [
      { label: "Code 3, 4 and 5 available", cls: "bg-violet-100 text-violet-800" },
      { label: "AS 3703 / BS EN 12588", cls: "bg-green-50 text-green-700" },
      { label: "Alternative to Austral Lead", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage — all lead flashing applications", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Calder Industrial Materials is an alternative supplier of lead sheet in Australia, supplying Code 3, Code 4, and Code 5 gauges to AS 3703 and BS EN 12588. Calder Industrial is commonly used as an alternative to Austral Lead where trade pricing, stock availability, or local supply chain factors make Calder the preferred source. The product performs identically to Austral Lead sheet at each code designation — the lead code system (Code 3, 4, 5) defines thickness and weight per square metre regardless of manufacturer, and both Austral and Calder manufacture to the same BS EN 12588 and AS 3703 standards. Code 5 lead sheet (2.24mm, 25.40 kg/m²) is available from Calder and is used for chimney back gutters, complex chimney flashings, and other applications where a heavier gauge is required — Code 5 is not typically used for standard step flashings but is listed here because Calder supplies the full range. For standard step and counter-flashing on pitched tiled roofs, specify Code 4 from either Austral or Calder. The choice between Austral and Calder for a given project is typically made on the basis of local trade pricing and stock availability. All lead sheet handling, forming, fixing, and disposal requirements are the same regardless of manufacturer — refer to the Code 3 and Code 4 product entries above for handling and installation notes.",
    technicalProperties: [
      "Calder Industrial lead sheet — Code 3 (1.32mm / 14.97 kg/m²), Code 4 (1.80mm / 20.41 kg/m²), Code 5 (2.24mm / 25.40 kg/m²) — AS 3703 / BS EN 12588",
      "Alternative to Austral Lead & Metals — same code system, same thickness and weight per code designation, same material properties",
      "Code 5 available for chimney back gutters, complex chimney and hip flashings where heavier gauge is required",
      "Malleable and ductile — same hand-forming and dressing properties as Austral Lead at each code",
      "Self-sealing at overlaps — same behaviour as Austral Lead — conforms under tile and structure load",
      "Fixings: copper or stainless steel — never galvanised or plain steel — same fixing requirements as Austral Lead",
      "Supplied through Calder Industrial trade network — confirm current stock availability and pricing before ordering",
    ],
    limitations: [
      "All lead handling, forming, fixing, and disposal requirements apply equally to Calder lead as to Austral Lead — refer to Code 3 and Code 4 product entries for full limitations",
      "Code 5 is heavier than Code 4 and increases roof loading further — confirm structural capacity before specifying Code 5 in remediation of existing heritage roofs",
      "Confirm current product availability, code range, and pricing with Calder Industrial before ordering — product range and stock vary by state",
      "Do not paint — same restriction applies as Austral Lead — natural lead patina must be retained",
      "Lead waste disposal — same hazardous waste regulations apply as Austral Lead — state/territory regulations govern disposal",
      "Installed by an experienced roof plumber — same qualification and experience requirement as Austral Lead",
    ],
    procurementSources: [
      { name: "Calder Industrial Materials — trade supply", url: "https://www.calderindustrial.com.au" },
      { name: "Reece — plumbing trade supply (lead sheet)", url: "https://www.reece.com.au" },
      { name: "Roofing and building supplies — trade merchants", url: "https://www.roofmaster.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Lead", label: "Lead" },
  { id: "Code-3", label: "Code 3" },
  { id: "Code-4", label: "Code 4" },
  { id: "Code-5", label: "Code 5" },
  { id: "Heritage", label: "Heritage" },
];

const BRAND_EQUIV_ROWS = [
  { code: "Code 3 (1.32mm / 14.97 kg/m²)", austral: "Yes", calder: "Yes", notes: "Minimum code for small soakers" },
  { code: "Code 4 (1.80mm / 20.41 kg/m²)", austral: "Yes", calder: "Yes", notes: "Standard code for step and counter-flashing" },
  { code: "Code 5 (2.24mm / 25.40 kg/m²)", austral: "Confirm", calder: "Yes", notes: "For chimney back gutters and complex chimney work" },
];

const SYSTEM_COMPARISON: {
  product: string;
  code: string;
  thickness: string;
  kgm2: string;
  applications: string;
  heritage: string;
  forming: string;
}[] = [
  {
    product: "Austral Lead Code 3",
    code: "Code 3",
    thickness: "1.32mm",
    kgm2: "14.97 kg/m²",
    applications: "Small soakers — step flashings (minimum code)",
    heritage: "Yes",
    forming: "Hand-formed and dressed by roof plumber",
  },
  {
    product: "Austral Lead Code 4",
    code: "Code 4",
    thickness: "1.80mm",
    kgm2: "20.41 kg/m²",
    applications: "Step flashings, counter-flashings, chimney flashings — standard specification",
    heritage: "Yes",
    forming: "Hand-formed and dressed by roof plumber",
  },
  {
    product: "Calder Industrial (Code 3, 4, 5)",
    code: "Code 3, 4, 5",
    thickness: "1.32mm / 1.80mm / 2.24mm",
    kgm2: "14.97 / 20.41 / 25.40 kg/m²",
    applications: "All lead flashing applications — same scope as Austral — Code 5 for chimney back gutters",
    heritage: "Yes",
    forming: "Hand-formed and dressed by roof plumber — same method as Austral",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Step and counter-flashing on heritage-listed pitched tiled roofs where the heritage authority requires matching original lead material",
    "High-specification residential and institutional tiled roof remediation where lead is specified for its malleability and self-sealing properties",
    "Chimney back gutters, soakers, and flashings on complex masonry chimneys — Code 4 or Code 5 depending on size",
    "Remedial replacement of original lead flashings on older Australian homes (pre-1960s construction) where lead was the standard material",
    "Applications where a rigid material (Colorbond, aluminium) cannot be hand-dressed to conform to an irregular or curved masonry profile",
  ],
  selectionCriteria: [
    "Specify Code 4 for standard step flashings, counter-flashings, and chimney flashings — Code 3 for small soakers only — Code 5 for chimney back gutters and large chimney flashings",
    "Heritage authority requirements — confirm with the relevant state/territory heritage body whether lead is required or whether Colorbond or aluminium is acceptable as a substitute",
    "Soaker length — maximum soaker length for Code 3 is approximately 150mm — for longer soakers, specify Code 4",
    "Fixings: copper or stainless steel nails and clips — do not use galvanised steel or any copper-based alloy other than pure copper with lead",
    "Isolation from cement: use bituminous paint or a lead-compatible separator wherever lead contacts fresh or green cement, concrete, or lime mortar",
    "Do not paint — natural lead oxide patina must be retained — painting is not standard practice and is counterproductive",
  ],
  limitations: [
    "Lead is significantly heavier than Colorbond or aluminium — increased roof load must be assessed before specifying lead in place of a lighter original flashing material",
    "Health and safety — lead is a hazardous material — appropriate PPE, safe work practices, and correct waste disposal are mandatory — refer to state/territory WorkSafe regulations and the manufacturer MSDS",
    "Lead contact with fresh cement or lime mortar will cause chemical attack — always isolate with a bituminous paint or felt separator at contact surfaces",
    "Lead is not appropriate for all heritage applications — confirm with the heritage authority before specifying — some heritage authorities accept Colorbond or aluminium as substitute materials",
    "Do not use where cost is the primary driver — lead is significantly more expensive per metre than Colorbond or aluminium — reserve lead for applications where its unique forming and sealing properties are required",
  ],
  standardsNotes: [
    "AS 3703 — Lead and Lead Alloy Sheet and Strip — Australian standard governing lead sheet specification for building applications",
    "BS EN 12588 — Lead and Lead Alloys — Rolled Lead Sheet for Building Purposes — the lead code system (Code 3, 4, 5) derives from this British/European standard, widely adopted in Australian practice",
    "AS 1562.1 — Design and Installation of Sheet Roof and Wall Cladding — Metal — governs step flashing design requirements regardless of material",
    "Tile manufacturer installation guides — confirm step flashing soaker and lap requirements for the specific tile profile",
    "State/territory WorkSafe and EPA regulations — govern lead handling, PPE requirements, and lead waste disposal — confirm current requirements for your state before commencing work",
  ],
  suitableDefects: [
    "Roof leaks at masonry wall abutments on heritage buildings where original lead step flashings have failed — replacement in matching Code 4 lead sheet",
    "Chimney flashing failure on heritage tiled roofs — Code 4 or Code 5 lead replacement depending on chimney geometry and heritage requirements",
    "Roof leaks at complex masonry profiles where a rigid flashing material cannot be formed to conform — hand-dressed lead is the preferred solution",
  ],
  typicalSubstrates: [
    "Masonry walls — brick and rendered masonry — counter-flashing into raked mortar joint — must be isolated from fresh lime or Portland cement with bituminous paint or felt",
    "Tiled roof — terracotta, slate, or concrete tiles — lead soakers weave between tile and wall — heavier than Colorbond on the tile battens",
    "Masonry chimneys — complex three-dimensional profiles around chimney stacks — the primary heritage application for Code 4 and Code 5 lead",
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

export function StepFlashingLeadIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are lead sheet step and counter-flashings?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Lead sheet step and counter-flashings are the traditional roofing flashing material for pitched tiled roofs, used in Australia from early colonial construction through to the mid-twentieth century when Colorbond and aluminium alternatives became dominant. Lead is valued for its malleability — it can be hand-dressed by an experienced roof plumber into complex three-dimensional profiles around chimneys, irregular masonry walls, and other abutments without requiring a sheet metal folder or power tools. Critically, lead is self-sealing at overlaps — it compresses and conforms under the weight of overlying tiles and materials, creating a naturally weathertight joint at lap locations without sealant.
        </p>
        {expanded && (
          <>
            <p>
              The lead code system — derived from BS EN 12588 and adopted into Australian practice via AS 3703 — classifies lead sheet by thickness and weight per square metre. Code 3 (1.32mm, 14.97 kg/m²) is the minimum for small soakers. Code 4 (1.80mm, 20.41 kg/m²) is the standard for step and counter-flashing and chimney flashings. Code 5 (2.24mm, 25.40 kg/m²) is used for chimney back gutters and complex chimney flashing work where a heavier gauge is required. The code designation is a property of the material, not the manufacturer — Code 4 lead from Austral Lead and Code 4 lead from Calder Industrial perform identically.
            </p>
            <p>
              Lead must not be painted — the natural lead carbonate oxide patina that forms on the surface of exposed lead is chemically stable, aesthetically appropriate for heritage buildings, and protective. Lead also requires copper or stainless steel fixings — galvanised steel fixings will be rapidly corroded by galvanic action in the presence of lead. Lead handling requires appropriate PPE and lead waste must be disposed of as hazardous material in accordance with state/territory regulations.
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

export function StepFlashingLeadProductSection() {
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

      {/* ── Brand Equivalence Table ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalence — Lead Code System</h2>
            <p className="mt-1 text-sm text-slate-500">
              Code designation is a material property — Code 4 from Austral and Code 4 from Calder are the same material thickness and weight. Select by supplier availability and trade pricing.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Code</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Austral Lead</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Calder Industrial</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV_ROWS.map((row, i) => (
                <tr key={row.code} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.code}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.austral === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> {row.austral}
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">{row.austral}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.calder === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> {row.calder}
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">{row.calder}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 2 brands — lead sheet step and counter-flashing — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
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
                {/* Card header */}
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

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

                {/* Technical Properties & Limitations */}
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

                {/* Procurement Sources */}
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
              Side-by-side comparison of lead sheet step and counter-flashing options by code. Confirm all product selections against the current supplier data before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Code</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">kg/m²</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Applications</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Forming method</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.code}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.kgm2}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.applications}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                      <CheckCircle size={11} /> {row.heritage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.forming}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
