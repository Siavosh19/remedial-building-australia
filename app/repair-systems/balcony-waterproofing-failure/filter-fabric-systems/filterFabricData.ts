// Non-woven geotextile filter fabrics over drainage layers. Hardware → no Class-2/warranty. Lighter treatment.
// appInfo: Type · Material · Format / weight · Use · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";
const KEYS = ["Type", "Material", "Format / weight", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const FILTER_FABRIC_CARDS: RefCard[] = [
  {
    brand: "Geofabrics",
    rangeName: "bidim Geotextile",
    shortType: "Non-woven needle-punched geotextile (filter / separation)",
    badges: [{ label: "Filter fabric", tone: "navy" }],
    appInfo: kp([
      "Non-woven needle-punched geotextile",
      "Continuous-filament polyester / polypropylene",
      "Roll; grade range (A14, A19, A24 etc.) by mass",
      "Filtration and separation over drainage layers",
      "Australian-made; specify the grade for the application",
    ]),
    bestFor: [
      "Filtering soil fines out of a drainage layer while letting water pass",
      "Separation between soil / growing medium and the drainage cell or gravel",
    ],
    avoidWhere: [
      "As a waterproofing or root-barrier layer (it is a filter, not a membrane)",
    ],
    warnings: [
      "Specify the bidim grade (e.g. A14 and up) to suit the soil, flow and protection duty; confirm with Geofabrics",
    ],
    advanced: {
      description:
        "bidim is an Australian-made non-woven needle-punched continuous-filament geotextile used for filtration and separation over drainage layers, available in graded ranges (A14, A19, A24 and up) by mass. Specify the grade for the soil, flow and protection duty with Geofabrics.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Non-woven needle-punched geotextile", source: "Geofabrics" },
        { label: "Use", value: "Filtration / separation over drainage", source: "Geofabrics" },
        { label: "Grades", value: "A14, A19, A24 and up (by mass)", source: "Geofabrics" },
      ],
    },
  },
  {
    brand: "Geofabrics",
    rangeName: "Polyfelt TS Geotextile",
    shortType: "Non-woven geotextile for filtration & separation",
    badges: [{ label: "Filter fabric", tone: "navy" }],
    appInfo: kp([
      "Non-woven geotextile",
      "Polypropylene",
      "Roll; TS grade range by mass (confirm)",
      "Filtration, separation and protection over drainage",
      "Established civil geotextile range",
    ]),
    bestFor: [
      "Filtration and separation over drainage layers in civil and landscape build-ups",
      "Protection of the membrane / drainage layer from the layer above",
    ],
    avoidWhere: [
      "As a waterproofing layer (it is a geotextile filter)",
    ],
    warnings: [
      "Specify the Polyfelt TS grade for the filtration and protection duty; confirm with Geofabrics",
    ],
    advanced: {
      description:
        "Polyfelt TS is a non-woven polypropylene geotextile for filtration, separation and protection over drainage layers, available in graded ranges by mass. Specify the TS grade for the filtration and protection duty with Geofabrics.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Non-woven geotextile", source: "Geofabrics" },
        { label: "Material", value: "Polypropylene", source: "Geofabrics" },
      ],
    },
  },
  {
    brand: "Global Synthetics",
    rangeName: "Global Synthetics Non-Woven Geotextile",
    shortType: "Non-woven geotextile for filter & separation duties",
    badges: [{ label: "Filter fabric", tone: "navy" }],
    appInfo: kp([
      "Non-woven needle-punched geotextile",
      "Polyester / polypropylene (by product)",
      "Roll; grade range by mass (confirm)",
      "Filtration, separation and drainage protection",
      "Broad geosynthetics range; specify the grade",
    ]),
    bestFor: [
      "Filtration and separation over drainage layers and gravels",
    ],
    avoidWhere: [
      "",
    ],
    warnings: [
      "Specify the non-woven grade for the filtration and protection duty; confirm with Global Synthetics",
    ],
    advanced: {
      description:
        "Global Synthetics supplies non-woven needle-punched geotextiles for filtration, separation and drainage protection across civil and landscape applications, in graded ranges by mass. Specify the grade for the duty with Global Synthetics.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Non-woven needle-punched geotextile", source: "Global Synthetics" },
        { label: "Use", value: "Filtration / separation / protection", source: "Global Synthetics" },
      ],
    },
  },
  {
    brand: "Elmich",
    rangeName: "Elmich Filter Fabric",
    shortType: "Non-woven filter fabric for VersiDrain / VersiCell build-ups",
    badges: [{ label: "Filter fabric", tone: "navy" }],
    appInfo: kp([
      "Non-woven geotextile filter fabric",
      "Polypropylene / polyester (confirm)",
      "Roll to suit the drainage layer (confirm)",
      "Filter over Elmich drainage cells in green-roof / podium build-ups",
      "Pairs with VersiDrain / VersiCell drainage cells",
    ]),
    bestFor: [
      "Filter layer over Elmich drainage cells in green-roof and podium build-ups",
      "Keeping growing medium out of the drainage void",
    ],
    avoidWhere: [
      "",
    ],
    warnings: [
      "Confirm the filter fabric specification to match the Elmich drainage cell and growing medium",
    ],
    advanced: {
      description:
        "Elmich filter fabric is a non-woven geotextile used as the filter layer over Elmich VersiDrain / VersiCell drainage cells in green-roof and podium build-ups, keeping growing medium out of the drainage void. Confirm the fabric specification to match the drainage cell and growing medium.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Non-woven geotextile filter fabric", source: "Elmich" },
        { label: "Use", value: "Filter over Elmich drainage cells", source: "Elmich" },
      ],
    },
  },
  {
    brand: "Atlantis",
    rangeName: "Atlantis Geotextile Filter Fabric",
    shortType: "Non-woven filter fabric for Flo-Cell build-ups",
    badges: [{ label: "Filter fabric", tone: "navy" }],
    appInfo: kp([
      "Non-woven geotextile filter fabric",
      "Polypropylene / polyester (confirm)",
      "Roll to suit the drainage cell (confirm)",
      "Filter over Atlantis Flo-Cell drainage in podium / planter build-ups",
      "Pairs with Atlantis Flo-Cell drainage cells",
    ]),
    bestFor: [
      "Filter layer over Atlantis Flo-Cell drainage in podium and planter build-ups",
    ],
    avoidWhere: [
      "",
    ],
    warnings: [
      "Confirm the filter fabric specification to match the Flo-Cell and the soil / growing medium",
    ],
    advanced: {
      description:
        "Atlantis supplies non-woven geotextile filter fabric used as the filter layer over Flo-Cell drainage cells in podium and planter build-ups, separating the soil / growing medium from the drainage void. Confirm the fabric specification to match the Flo-Cell and the soil.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Non-woven geotextile filter fabric", source: "Atlantis" },
        { label: "Use", value: "Filter over Atlantis Flo-Cell", source: "Atlantis" },
      ],
    },
  },
];
