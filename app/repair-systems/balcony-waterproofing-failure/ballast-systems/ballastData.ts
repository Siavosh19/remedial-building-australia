// Ballast for protected / inverted roofs & podium build-ups. Hardware → no Class-2/warranty. Lighter treatment.
// appInfo: Type · Material · Size / format · Use · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";
const KEYS = ["Type", "Material", "Size / format", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const BALLAST_CARDS: RefCard[] = [
  {
    brand: "Generic / supplier",
    rangeName: "Rounded River Pebble / Smooth Stone",
    shortType: "Rounded washed stone ballast (loose-laid)",
    badges: [{ label: "Loose ballast", tone: "navy" }],
    appInfo: kp([
      "Loose-laid rounded stone ballast",
      "Washed river pebble / smooth stone",
      "Typically 20–40 mm graded (confirm with supplier)",
      "Holds down insulation / membrane on protected & inverted roofs",
      "Rounded, washed stone — avoids sharp edges that damage membrane",
    ]),
    bestFor: [
      "Holding down insulation and membrane on protected / inverted (upside-down) roofs",
      "Rounded, washed stone that will not puncture the membrane below",
    ],
    avoidWhere: [
      "Crushed / sharp-edged aggregate directly on a membrane (use a protection layer or rounded stone)",
    ],
    warnings: [
      "Confirm the ballast weight against wind-uplift design and the roof's structural load capacity with the engineer",
    ],
    advanced: {
      description:
        "Rounded washed river pebble / smooth stone is loose-laid ballast (typically around 20–40 mm graded) that holds down insulation and membrane on protected and inverted roofs. Rounded stone avoids the sharp edges that can damage a membrane. Confirm grading, ballast weight against wind uplift and the structural load with the engineer.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Loose-laid rounded stone ballast", source: "Generic / supplier" },
        { label: "Use", value: "Hold-down on protected / inverted roofs", source: "Generic / supplier" },
      ],
    },
  },
  {
    brand: "Generic / supplier",
    rangeName: "Gravel Ballast (Drainage Aggregate)",
    shortType: "Graded gravel ballast / drainage aggregate",
    badges: [{ label: "Loose ballast", tone: "navy" }],
    appInfo: kp([
      "Loose-laid gravel ballast",
      "Washed graded gravel",
      "Graded aggregate; size to suit (confirm with supplier)",
      "Ballast and drainage layer in podium / roof build-ups",
      "Use washed, rounded gravel over a protection / filter layer",
    ]),
    bestFor: [
      "Combined ballast and drainage / blinding layer in podium and roof build-ups",
    ],
    avoidWhere: [
      "Directly on the membrane without a protection / filter layer",
      "Sharp crushed aggregate against the membrane",
    ],
    warnings: [
      "Lay over a protection / filter layer; confirm the ballast weight against wind uplift and the structural load",
    ],
    advanced: {
      description:
        "Graded washed gravel is loose-laid ballast that can also act as a drainage / blinding layer in podium and roof build-ups. It should be laid over a protection or filter layer and not placed directly on the membrane. Confirm grading, ballast weight against wind uplift and the structural load with the engineer.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Loose-laid gravel ballast", source: "Generic / supplier" },
        { label: "Use", value: "Ballast / drainage layer", source: "Generic / supplier" },
      ],
    },
  },
  {
    brand: "Generic / supplier",
    rangeName: "Concrete Ballast / Paver-on-Pedestal",
    shortType: "Concrete pavers as ballast over a protected membrane",
    badges: [{ label: "Paver ballast", tone: "navy" }],
    appInfo: kp([
      "Concrete pavers used as ballast (often on pedestals)",
      "Precast concrete",
      "Paver units; sizes to suit (confirm)",
      "Ballast + trafficable surface on protected / inverted roofs & podiums",
      "Pedestal-mounted pavers give a level trafficable deck over the membrane",
    ]),
    bestFor: [
      "Ballast that doubles as a level, trafficable surface on protected roofs and podiums",
      "Pedestal-mounted pavers over insulation / membrane with a drainage void beneath",
    ],
    avoidWhere: [
      "Where the structure cannot carry the paver dead load (confirm with the engineer)",
    ],
    warnings: [
      "Confirm the paver dead load, pedestal layout and a protection layer over the membrane with the engineer",
    ],
    advanced: {
      description:
        "Concrete pavers — often on adjustable pedestals — are used as ballast that doubles as a level, trafficable surface on protected / inverted roofs and podiums, with a drainage void beneath the pavers. Confirm the paver dead load, pedestal layout and the membrane protection layer with the engineer.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Concrete pavers as ballast (often on pedestals)", source: "Generic / supplier" },
        { label: "Material", value: "Precast concrete", source: "Generic / supplier" },
      ],
    },
  },
  {
    brand: "Elmich",
    rangeName: "Elmich VersiJack Pedestal (with paver ballast)",
    shortType: "Adjustable pedestal system supporting paver ballast",
    badges: [{ label: "Pedestal system", tone: "navy" }],
    appInfo: kp([
      "Adjustable paver / decking pedestal",
      "Recycled polypropylene pedestal (paver = concrete / stone)",
      "Height-adjustable pedestals; spacing to suit paver (confirm)",
      "Supports paver ballast level over the membrane with a drainage void",
      "Pairs pavers with a pedestal system for a level trafficable deck",
    ]),
    bestFor: [
      "Supporting paver ballast level over the membrane with a free-draining void beneath",
      "Creating falls / level decks over a sloping structural slab",
    ],
    avoidWhere: [
      "Direct loading on the membrane without a protection layer at the pedestal bases",
    ],
    warnings: [
      "Confirm pedestal height range, paver load and a protection layer at the pedestal bases with Elmich",
    ],
    advanced: {
      description:
        "Elmich VersiJack is an adjustable pedestal system that supports concrete or stone paver ballast level over the membrane, leaving a free-draining void beneath and allowing a level deck over a sloping slab. Confirm the pedestal height range, paver load and membrane protection at the pedestal bases with Elmich.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Adjustable paver / decking pedestal", source: "Elmich" },
        { label: "Use", value: "Supports paver ballast over membrane", source: "Elmich" },
      ],
    },
  },
  {
    brand: "Generic / supplier",
    rangeName: "Ballast Protection Layer (Geotextile / Slip Sheet)",
    shortType: "Protection / separation layer beneath stone or paver ballast",
    badges: [{ label: "Protection layer", tone: "navy" }],
    appInfo: kp([
      "Protection / separation layer beneath ballast",
      "Heavy non-woven geotextile / protection mat",
      "Roll / sheet to suit (confirm)",
      "Protects the membrane from ballast above on protected / inverted roofs",
      "Always lay between sharp / heavy ballast and the membrane",
    ]),
    bestFor: [
      "Protecting the membrane from stone or paver ballast above",
      "Separation layer in protected / inverted roof and podium build-ups",
    ],
    avoidWhere: [
      "",
    ],
    warnings: [
      "Confirm the protection layer specification to suit the ballast and the membrane manufacturer's requirement",
    ],
    advanced: {
      description:
        "A ballast protection / separation layer (heavy non-woven geotextile or protection mat) is laid between stone or paver ballast and the membrane to protect it from point loads and abrasion on protected / inverted roofs and podiums. Confirm the protection layer to suit the ballast and the membrane manufacturer's requirement.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Protection / separation layer", source: "Generic / supplier" },
        { label: "Use", value: "Protects membrane beneath ballast", source: "Generic / supplier" },
      ],
    },
  },
];
