// ──────────────────────────────────────────────────────────────────────────────
// Crack injection ports & packers (basement water ingress — injection delivery).
// Hand-authored selection cards. Values from the manufacturer / AU source (cited
// per field). Values not stated → "CONFIRM — <field> not stated on <url>".
//
// appInfo comparison columns: Type · Pressure · Fixing · Use with resin ·
// Substrate · Spacing · Standard · Pairing.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Pressure", "Fixing", "Use with resin", "Substrate", "Spacing", "Standard", "Pairing"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const CRACK_PORT_PACKER_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika Injection Port (LP — surface port)",
    shortType: "Surface-mounted injection port — low pressure",
    badges: [{ label: "Surface port", tone: "navy" }, { label: "Low pressure", tone: "blue" }, { label: "No drilling", tone: "amber" }],
    appInfo: kp([
      "Surface-mounted injection port (low pressure)",
      "Low pressure",
      "Bonded to the surface with epoxy paste over the crack",
      "PU / acrylic (low-pressure)",
      "Dry, clean, sound concrete; thin sections; reinforcement congestion",
      "Per crack (specialist judgment)",
      "EN 1504-5 (injection system)",
      "Use with Sika injection resins",
    ]),
    bestFor: [
      "Surface ports bonded over the crack — no drilling; ideal for thin sections, congested reinforcement, or hard-to-access cracks, at low injection pressure",
      "Faster install where drilling is undesirable; pair with Sika low-pressure PU / acrylic resins",
    ],
    avoidWhere: [
      "Wet / contaminated / irregular surfaces — the port detaches under pressure; use drill-in packers",
      "High-pressure epoxy injection of tight dry cracks — use packers",
    ],
    warnings: [
      "Surface ports need a dry, clean, sound surface and a cured epoxy surface-seal between ports before injection — an unsealed crack lets resin escape without filling it",
      "Port / packer spacing is guidance only — actual spacing depends on crack width, resin viscosity and concrete porosity (specialist judgment)",
    ],
    advanced: {
      description:
        "Sika surface injection ports are bonded over the crack with epoxy paste for low-pressure delivery of PU or acrylic resins — used where drilling is undesirable (thin sections, congested reinforcement, hard-to-access cracks). They require a dry, clean, sound surface and a cured epoxy surface-seal applied between the ports before injection. They are part of an EN 1504-5 injection system; pair with the Sika resin being injected. Confirm port type, spacing and surface-seal product from the Sika system documentation.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Surface-mounted injection port (low pressure)", source: "Sika injection systems" },
        { label: "Fixing", value: "Bonded with epoxy paste over the crack", source: "Sika injection systems" },
        { label: "Use", value: "Low-pressure PU / acrylic; thin sections / congested rebar", source: "Sika injection systems" },
        { label: "Standard", value: "EN 1504-5 (injection system)", source: "Sika injection systems" },
        { label: "Spacing / surface-seal", value: "CONFIRM — per crack and Sika system documentation" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika Injection Packer (HP — drill-in packer)",
    shortType: "Drill-in mechanical packer — high pressure",
    badges: [{ label: "Drill-in packer", tone: "navy" }, { label: "High pressure", tone: "blue" }, { label: "Wet surfaces", tone: "amber" }],
    appInfo: kp([
      "Drill-in mechanical packer (high pressure)",
      "High pressure",
      "Drilled into the crack / joint and torqued to seal",
      "PU / epoxy (high-pressure)",
      "Active cracks needing higher pressure; joints; wet / contaminated surfaces",
      "Joints ~200–250 mm centres; staggered through cold joints",
      "EN 1504-5 (injection system)",
      "Use with Sika injection resins",
    ]),
    bestFor: [
      "Drill-in packers torqued into the crack / joint — deliver higher injection pressure to overcome water pressure and fill tight cracks; reliable on wet / contaminated surfaces",
      "Systematic joint sealing — packers along the joint at ~200–250 mm centres (staggered depths for cold joints)",
    ],
    avoidWhere: [
      "Thin sections / congested reinforcement where drilling risks the rebar — use surface ports",
    ],
    warnings: [
      "Rebar-scan before drilling — do not reduce cover below AS 3600 minimums; hitting reinforcement is a serious error",
      "Patch packer holes with epoxy mortar after packer removal — unpatched holes are future water-ingress paths",
    ],
    advanced: {
      description:
        "Sika drill-in mechanical packers are drilled into the crack or joint and torqued to seal, for high-pressure delivery of PU or epoxy resins — used for active cracks needing higher pressure to overcome water pressure, systematic joint sealing (~200–250 mm centres; staggered depths for cold joints), and where surface-port adhesion is unreliable (wet / contaminated / irregular surfaces). Rebar-scan before drilling and keep cover above AS 3600 minimums; patch packer holes with epoxy mortar after removal. EN 1504-5 injection system; pair with the Sika resin being injected.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Drill-in mechanical packer (high pressure)", source: "Sika injection systems" },
        { label: "Use", value: "High-pressure PU / epoxy; active cracks; joints; wet surfaces", source: "Sika injection systems" },
        { label: "Joint spacing", value: "~200–250 mm centres (staggered for cold joints)", source: "page / Sika system" },
        { label: "Standard", value: "EN 1504-5 (injection system)", source: "Sika injection systems" },
        { label: "Hole patching", value: "Epoxy mortar after packer removal", source: "page" },
      ],
    },
  },
  {
    brand: "Master Builders Solutions",
    rangeName: "Master Builders surface injection port (ex-BASF MasterInject)",
    shortType: "Surface-mounted injection port — low pressure",
    badges: [{ label: "Surface port", tone: "navy" }, { label: "Low pressure", tone: "blue" }, { label: "ex-BASF", tone: "slate" }],
    appInfo: kp([
      "Surface-mounted injection port (low pressure)",
      "Low pressure",
      "Bonded to the surface with epoxy paste over the crack",
      "PU / acrylic (low-pressure)",
      "Dry, clean, sound concrete; thin sections; reinforcement congestion",
      "Per crack (specialist judgment)",
      "EN 1504-5 (injection system) — CONFIRM",
      "Use with Master Builders injection resins",
    ]),
    bestFor: [
      "Master Builders Solutions (formerly BASF) surface injection port — functionally equivalent to the Sika LP port; select to match the resin brand in use",
    ],
    avoidWhere: [
      "Wet / contaminated / irregular surfaces — use drill-in packers",
      "High-pressure epoxy injection of tight dry cracks — use packers",
    ],
    warnings: [
      "Same as any surface port — dry, clean, sound surface and a cured epoxy surface-seal between ports before injection",
      "Confirm the current Master Builders Solutions (ex-BASF MasterInject) port product and EN 1504-5 status with Master Builders Solutions Australia",
    ],
    advanced: {
      description:
        "Master Builders Solutions (the former BASF Construction Chemicals business) supplies surface injection ports functionally equivalent to the Sika LP port — bonded over the crack with epoxy paste for low-pressure PU / acrylic injection. Select the port/packer brand to match the resin being injected. Confirm the current AU product name and EN 1504-5 status with Master Builders Solutions Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Surface-mounted injection port (low pressure)", source: "Master Builders Solutions (ex-BASF MasterInject)" },
        { label: "Brand", value: "Master Builders Solutions (formerly BASF)", source: "master-builders-solutions.basf.com.au" },
        { label: "Product / EN 1504-5", value: "CONFIRM — current AU port product and standard with Master Builders Solutions Australia" },
      ],
    },
  },
  {
    brand: "Master Builders Solutions",
    rangeName: "Master Builders drill-in packer (ex-BASF MasterInject)",
    shortType: "Drill-in mechanical packer — high pressure",
    badges: [{ label: "Drill-in packer", tone: "navy" }, { label: "High pressure", tone: "blue" }, { label: "ex-BASF", tone: "slate" }],
    appInfo: kp([
      "Drill-in mechanical packer (high pressure)",
      "High pressure",
      "Drilled into the crack / joint and torqued to seal",
      "PU / epoxy (high-pressure)",
      "Active cracks needing higher pressure; joints; wet / contaminated surfaces",
      "Joints ~200–250 mm centres; staggered through cold joints",
      "EN 1504-5 (injection system) — CONFIRM",
      "Use with Master Builders injection resins",
    ]),
    bestFor: [
      "Master Builders Solutions (formerly BASF) drill-in packer — functionally equivalent to the Sika HP packer; select to match the resin brand in use",
    ],
    avoidWhere: [
      "Thin sections / congested reinforcement where drilling risks the rebar — use surface ports",
    ],
    warnings: [
      "Rebar-scan before drilling; keep cover above AS 3600 minimums; patch packer holes with epoxy mortar after removal",
      "Confirm the current Master Builders Solutions (ex-BASF MasterInject) packer product and EN 1504-5 status with Master Builders Solutions Australia",
    ],
    advanced: {
      description:
        "Master Builders Solutions (the former BASF Construction Chemicals business) supplies drill-in mechanical packers functionally equivalent to the Sika HP packer — drilled into the crack/joint and torqued for high-pressure PU / epoxy injection. Select the port/packer brand to match the resin being injected; rebar-scan before drilling and patch holes after removal. Confirm the current AU product name and EN 1504-5 status with Master Builders Solutions Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Drill-in mechanical packer (high pressure)", source: "Master Builders Solutions (ex-BASF MasterInject)" },
        { label: "Brand", value: "Master Builders Solutions (formerly BASF)", source: "master-builders-solutions.basf.com.au" },
        { label: "Product / EN 1504-5", value: "CONFIRM — current AU packer product and standard with Master Builders Solutions Australia" },
      ],
    },
  },
];

export const CRACK_PORT_PACKER_SELECTORS = [
  { product_id: "sika_injection_port_lp", category: "crack-injection-port-packer", type: "surface_port", pressure: "low", fixing: "epoxy_bonded", resin: ["pu", "acrylic"], standard: ["EN_1504-5"], pairing: "sika", au_distributor: "Sika Australia", source_tds_url: "https://aus.sika.com/", confidence: "confirmed" },
  { product_id: "sika_injection_packer_hp", category: "crack-injection-port-packer", type: "drill_in_packer", pressure: "high", fixing: "drilled_torqued", resin: ["pu", "epoxy"], joint_spacing_mm: { min: 200, max: 250 }, standard: ["EN_1504-5"], pairing: "sika", au_distributor: "Sika Australia", source_tds_url: "https://aus.sika.com/", confidence: "confirmed" },
  { product_id: "master_builders_surface_port", category: "crack-injection-port-packer", type: "surface_port", pressure: "low", fixing: "epoxy_bonded", resin: ["pu", "acrylic"], standard: [], pairing: "master_builders", product_name_confirmed: false, au_distributor: "Master Builders Solutions Australia", source_tds_url: "https://www.master-builders-solutions.basf.com.au/", confidence: "needs_confirmation" },
  { product_id: "master_builders_packer", category: "crack-injection-port-packer", type: "drill_in_packer", pressure: "high", fixing: "drilled_torqued", resin: ["pu", "epoxy"], standard: [], pairing: "master_builders", product_name_confirmed: false, au_distributor: "Master Builders Solutions Australia", source_tds_url: "https://www.master-builders-solutions.basf.com.au/", confidence: "needs_confirmation" },
];
