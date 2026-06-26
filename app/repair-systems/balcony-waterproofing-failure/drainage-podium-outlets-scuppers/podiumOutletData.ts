// Podium / roof rainwater outlets & overflow scuppers. Hardware → no Class-2/warranty. Lighter treatment.
// appInfo: Type · Material · Outlet size / format · Membrane connection · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";
const KEYS = ["Type", "Material", "Outlet size / format", "Membrane connection", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const PODIUM_OUTLET_CARDS: RefCard[] = [
  {
    brand: "ACO Australia",
    rangeName: "ACO Rainwater / Podium Outlet",
    shortType: "Roof & podium rainwater outlet with integral flange",
    badges: [{ label: "Rainwater outlet", tone: "navy" }],
    appInfo: kp([
      "Vertical / side rainwater outlet",
      "Stainless steel / plastic body (range)",
      "Outlet sizes to suit downpipe (confirm)",
      "Integral clamp flange — sealed to the field membrane",
      "Leaf guard / dome grate options; balcony, roof and podium",
    ]),
    bestFor: [
      "Collecting deck water to a downpipe with an integral clamp flange sealed to the field membrane",
      "Balcony, flat-roof and podium drainage where a flanged outlet is required",
    ],
    avoidWhere: [
      "Linear threshold drainage (use a channel drain)",
    ],
    warnings: [
      "Confirm the outlet size, flow rate and the membrane clamp-flange detail with ACO Australia / the hydraulic engineer",
    ],
    advanced: {
      description:
        "ACO supplies rainwater and podium outlets with integral clamp flanges that seal to the field membrane, plus leaf-guard and dome-grate options for balcony, roof and podium drainage. Confirm outlet size, flow rate and the membrane connection with ACO Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Vertical / side rainwater outlet", source: "ACO Australia" },
        { label: "Membrane connection", value: "Integral clamp flange to field membrane", source: "ACO Australia" },
      ],
    },
  },
  {
    brand: "Geberit Australia",
    rangeName: "Geberit Pluvia",
    shortType: "Syphonic roof drainage outlet system",
    badges: [{ label: "Syphonic outlet", tone: "navy" }, { label: "Engineered system", tone: "blue" }],
    appInfo: kp([
      "Syphonic roof drainage outlet",
      "Outlet body with clamp ring",
      "Engineered to the calculated catchment (confirm)",
      "Clamp ring to roof membrane / sheet",
      "Syphonic system — engineered as a whole; available via Reece",
    ]),
    bestFor: [
      "Large roof / podium catchments drained syphonically with smaller, fewer pipes than gravity systems",
      "Engineered roof drainage designed as a complete Pluvia system",
    ],
    avoidWhere: [
      "Small balcony catchments where a simple gravity outlet suffices",
    ],
    warnings: [
      "Pluvia is an engineered syphonic system — the outlet, pipework and hydraulics must be designed together; confirm with Geberit / Reece and the hydraulic engineer",
    ],
    advanced: {
      description:
        "Geberit Pluvia is a syphonic roof drainage system whose outlets run pipework full-bore, allowing smaller and fewer pipes than a gravity system for large catchments. It is engineered as a complete system and supplied in Australia via Reece. Confirm the design with Geberit / the hydraulic engineer.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Syphonic roof drainage outlet", source: "Geberit Australia" },
        { label: "Membrane connection", value: "Clamp ring to roof membrane / sheet", source: "Geberit Australia" },
        { label: "Availability", value: "Geberit Australia / Reece", source: "Geberit Australia" },
      ],
    },
  },
  {
    brand: "Blücher (Watts)",
    rangeName: "Blücher Stainless Roof / Floor Outlet",
    shortType: "Stainless steel roof & floor drainage outlet",
    badges: [{ label: "Stainless outlet", tone: "navy" }],
    appInfo: kp([
      "Vertical / side stainless drainage outlet",
      "Stainless steel",
      "Outlet sizes to suit pipework (confirm)",
      "Clamp / membrane flange (confirm detail)",
      "Hygienic stainless range; roof, balcony and wet-area outlets",
    ]),
    bestFor: [
      "Durable stainless roof, balcony and floor outlets where corrosion resistance is required",
      "Clamp-flange connection to the field membrane",
    ],
    avoidWhere: [
      "",
    ],
    warnings: [
      "Confirm the outlet size, flange detail and current Australian distributor (Watts / Blücher) for the application",
    ],
    advanced: {
      description:
        "Blücher (Watts) stainless steel roof and floor outlets provide durable, corrosion-resistant drainage with clamp / membrane flange options for roof, balcony and wet-area applications. Confirm outlet size and the membrane flange detail with the Australian distributor.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Stainless roof / floor drainage outlet", source: "Blücher (Watts)" },
        { label: "Material", value: "Stainless steel", source: "Blücher (Watts)" },
      ],
    },
  },
  {
    brand: "Stormtech",
    rangeName: "Stormtech Overflow / Rainwater Outlet",
    shortType: "Overflow & rainwater outlet for balconies & decks",
    badges: [{ label: "Overflow outlet", tone: "navy" }],
    appInfo: kp([
      "Overflow / rainwater outlet",
      "Stainless steel / aluminium (range)",
      "Outlet formats to suit (confirm)",
      "Membrane / puddle-flange connection (confirm detail)",
      "Pairs with Stormtech linear drainage; overflow protection",
    ]),
    bestFor: [
      "Overflow / secondary drainage protection on balconies and decks",
      "Matching outlets where Stormtech linear drainage is used",
    ],
    avoidWhere: [
      "Primary high-flow podium drainage (size to the hydraulic design)",
    ],
    warnings: [
      "Confirm the outlet format, flow rate and membrane connection with Stormtech for the application",
    ],
    advanced: {
      description:
        "Stormtech supplies overflow and rainwater outlets that complement its linear drainage range, providing secondary / overflow protection on balconies and decks. Confirm the outlet format, flow rate and the membrane connection with Stormtech.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Overflow / rainwater outlet", source: "Stormtech" },
        { label: "Use", value: "Overflow / secondary drainage protection", source: "Stormtech" },
      ],
    },
  },
  {
    brand: "Generic / fabricated",
    rangeName: "Stainless Scupper / Overflow Box",
    shortType: "Fabricated stainless scupper / overflow through-wall box",
    badges: [{ label: "Scupper / overflow", tone: "navy" }],
    appInfo: kp([
      "Through-wall scupper / overflow box",
      "Fabricated stainless steel",
      "Fabricated to suit the opening (confirm)",
      "Clamped / sealed apron to the field membrane (confirm detail)",
      "Through-parapet / upstand overflow drainage",
    ]),
    bestFor: [
      "Through-parapet or upstand overflow drainage where a flush face / box outlet is required",
      "Custom openings where a stocked outlet does not fit",
    ],
    avoidWhere: [
      "Where a stocked flanged outlet meets the design (fabrication adds cost / lead time)",
    ],
    warnings: [
      "A fabricated scupper is only as watertight as its apron seal to the membrane — confirm the detail and falls to the scupper",
    ],
    advanced: {
      description:
        "A fabricated stainless scupper / overflow box is a through-wall or through-parapet outlet made to suit the opening, with a clamped or sealed apron to the field membrane for overflow and upstand drainage. The apron-to-membrane seal is part of the waterproofing — confirm the detail and the falls to the scupper.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Through-wall scupper / overflow box", source: "Generic / fabricated" },
        { label: "Material", value: "Fabricated stainless steel", source: "Generic / fabricated" },
      ],
    },
  },
  {
    brand: "Nicoll / Smartstream",
    rangeName: "PVC Rainwater Outlet / Spreader",
    shortType: "PVC rainwater outlet for balconies & light-duty decks",
    badges: [{ label: "Rainwater outlet", tone: "navy" }],
    appInfo: kp([
      "PVC rainwater outlet / spreader",
      "PVC",
      "Outlet sizes to suit PVC downpipe (confirm)",
      "Flange / puddle-flange connection (confirm detail)",
      "Light-duty balcony / light-commercial drainage",
    ]),
    bestFor: [
      "Economical light-duty PVC rainwater outlets for balconies and light-commercial decks",
    ],
    avoidWhere: [
      "Heavy-duty podium or high-flow drainage (use stainless / engineered outlets)",
    ],
    warnings: [
      "Confirm the outlet size, flange detail and the membrane connection for the application",
    ],
    advanced: {
      description:
        "PVC rainwater outlets (e.g. Nicoll / Smartstream ranges) are economical light-duty outlets for balcony and light-commercial deck drainage, with flange / puddle-flange connection options. Confirm the outlet size and the membrane connection for the application.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "PVC rainwater outlet / spreader", source: "Nicoll / Smartstream" },
        { label: "Material", value: "PVC", source: "Nicoll / Smartstream" },
      ],
    },
  },
  {
    brand: "SPS — Speciality Plumbing Supplies",
    rangeName: "SPS Suspended Paver / Deck Balcony RWO (side outlet)",
    shortType: "Balcony rainwater outlet with a side outlet for suspended paver / deck build-ups",
    badges: [{ label: "Rainwater outlet", tone: "navy" }, { label: "Side outlet", tone: "blue" }],
    appInfo: kp([
      "Balcony rainwater outlet — side outlet",
      "Stainless steel (confirm grade)",
      "65 mm side outlet (product C50/90AD)",
      "Flange sealed to the field membrane; drains the membrane plane below the pavers",
      "Suspended paver / pedestal / deck build-ups where vertical outlet depth is limited",
    ]),
    bestFor: [
      "Draining the membrane plane beneath a suspended paver / pedestal or deck build-up via a side outlet where vertical depth is limited",
      "Balcony / podium edge drainage to a downpipe",
    ],
    avoidWhere: [
      "Deep through-slab vertical outlets (use a vertical rainwater outlet)",
    ],
    warnings: [
      "Confirm the outlet size, the membrane flange / seal detail and the build-up depth with SPS / the hydraulic engineer",
    ],
    advanced: {
      description:
        "The SPS suspended paver / deck balcony rainwater outlet (side outlet, 65 mm, product C50/90AD) drains the membrane plane beneath a suspended paver, pedestal or deck build-up via a side outlet where vertical depth is limited, with a flange sealed to the field membrane. Speciality Plumbing Supplies (spsdrains.com.au).",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Balcony RWO — side outlet", source: "spsdrains.com.au" },
        { label: "Outlet", value: "65 mm side outlet (C50/90AD)", source: "spsdrains.com.au" },
      ],
    },
  },
];
