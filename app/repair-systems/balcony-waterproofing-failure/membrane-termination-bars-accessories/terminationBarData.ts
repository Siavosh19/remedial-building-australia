// Membrane termination bars & accessories. Commodity hardware → no Class-2/warranty, no invented numbers.
// appInfo: Type · Material · Format · Use · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Material", "Format", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const TERMINATION_BAR_CARDS: RefCard[] = [
  {
    brand: "Schlüter-Systems Australia",
    rangeName: "Schlüter BARA-RK",
    shortType: "Aluminium membrane termination profile",
    badges: [{ label: "Termination bar", tone: "navy" }],
    appInfo: kp([
      "Termination bar",
      "Aluminium",
      "Pre-punched bar — screw & plug at regular centres",
      "Top-edge termination of membrane at upstands",
      "Schlüter + compatible liquid membranes; sealant bead at the top is a maintenance joint",
    ]),
    bestFor: [
      "Mechanically terminating a membrane turn-up at upstand and parapet walls in Schlüter and compatible systems",
    ],
    avoidWhere: ["Where the membrane system specifies its own dedicated termination detail"],
    warnings: ["The top-edge sealant is a maintenance joint — confirm membrane compatibility with Schlüter"],
    advanced: {
      description:
        "Schlüter BARA-RK is a pre-punched aluminium termination profile fixed with screw and plug at regular centres to mechanically secure a membrane turn-up at upstands, with a sealant bead at the top edge as a maintenance joint.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Aluminium", source: "Schlüter-Systems Australia" },
        { label: "Fixing", value: "Screw & plug at regular centres", source: "Schlüter-Systems Australia" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX Membrane Termination Profile",
    shortType: "Aluminium membrane termination profile",
    badges: [{ label: "Termination bar", tone: "navy" }],
    appInfo: kp([
      "Termination bar",
      "Aluminium",
      "Pre-punched bar — screw & plug at regular centres",
      "Top-edge termination of ARDEX membrane turn-ups at upstands",
      "ARDEX WPM systems; sealant bead at the top is a maintenance joint",
    ]),
    bestFor: [
      "Mechanically terminating an ARDEX liquid-membrane turn-up at upstand and parapet walls",
    ],
    avoidWhere: ["Highly corrosive marine/industrial settings where stainless is preferred"],
    warnings: ["Confirm the exact ARDEX AU product designation with ARDEX technical"],
    advanced: {
      description:
        "The ARDEX membrane termination profile is an aluminium bar fixed with screw and plug at regular centres to mechanically secure an ARDEX membrane turn-up at upstands, with a top-edge sealant maintenance joint. Confirm the exact AU designation with ARDEX.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Aluminium", source: "ARDEX Australia" },
        { label: "System", value: "ARDEX WPM waterproofing systems", source: "ARDEX Australia" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Termination Bar Profile",
    shortType: "Aluminium membrane termination profile",
    badges: [{ label: "Termination bar", tone: "navy" }],
    appInfo: kp([
      "Termination bar",
      "Aluminium",
      "Pre-punched bar — screw & plug at regular centres",
      "Top-edge termination of membrane turn-ups at upstands",
      "Mapelastic / Mapegum WPS systems; sealant bead at the top is a maintenance joint",
    ]),
    bestFor: [
      "Mechanically terminating a Mapei membrane turn-up at upstand walls",
    ],
    avoidWhere: ["Highly corrosive marine/industrial settings where stainless is preferred"],
    warnings: ["Confirm the exact Mapei AU product designation with Mapei technical"],
    advanced: {
      description:
        "The Mapei termination bar profile is an aluminium bar fixed with screw and plug at regular centres to mechanically secure a membrane turn-up at upstands in Mapelastic / Mapegum WPS systems, with a top-edge sealant maintenance joint. Confirm the AU designation with Mapei.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Aluminium", source: "Mapei Australia" },
        { label: "System", value: "Mapelastic / Mapegum WPS systems", source: "Mapei Australia" },
      ],
    },
  },
  {
    brand: "Generic",
    rangeName: "Stainless Steel Termination Bar",
    shortType: "Stainless termination / counter-flashing bar",
    badges: [{ label: "Termination bar", tone: "slate" }],
    appInfo: kp([
      "Termination bar (stainless)",
      "Stainless steel",
      "Pre-punched bar — screw & plug at regular centres",
      "Top-edge termination in corrosive environments",
      "Confirm grade and membrane compatibility; top-edge sealant is a maintenance joint",
    ]),
    bestFor: [
      "Mechanical membrane termination in marine, coastal or industrial environments where aluminium is unsuitable",
    ],
    avoidWhere: ["Standard sheltered balconies where an aluminium bar suffices (cost)"],
    warnings: ["Confirm the stainless grade and fixing/sealant compatibility for the environment"],
    advanced: {
      description:
        "A stainless-steel termination bar mechanically secures a membrane turn-up at upstands in corrosive marine, coastal or industrial environments where aluminium is unsuitable. Confirm the stainless grade and the fixing and sealant compatibility.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Stainless steel", source: "Generic" },
        { label: "Use", value: "Corrosive marine / coastal / industrial environments", source: "Generic" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX STB / STA Self-Adhesive Butynol Tape",
    shortType: "Self-adhesive butynol detailing tape",
    badges: [{ label: "Accessory", tone: "blue" }],
    appInfo: kp([
      "Self-adhesive detailing tape",
      "Butynol (butyl rubber)",
      "Roll — self-adhesive",
      "Sealing/detailing at terminations and junctions",
      "Accessory tape — confirm the specific use with ARDEX technical",
    ]),
    bestFor: [
      "Self-adhesive sealing and detailing at terminations and junctions within ARDEX systems",
    ],
    avoidWhere: ["As a standalone membrane (it is a detailing accessory)"],
    warnings: ["Confirm the specific application and compatibility with ARDEX technical"],
    advanced: {
      description:
        "ARDEX STB / STA is a self-adhesive butynol (butyl rubber) tape used for sealing and detailing at terminations and junctions within ARDEX systems. It is a detailing accessory, not a standalone membrane.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Butynol (butyl rubber), self-adhesive", source: "ARDEX Australia" },
      ],
    },
  },
];
