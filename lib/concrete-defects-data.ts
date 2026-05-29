// Auto-generated from Concrete_Structural_Defects_v2.xlsx — do not edit manually.

export interface MaterialRow {
  materialName: string;
  productType: string | null;
  brandArdex: string | null;
  brandSika: string | null;
  brandFosroc: string | null;
  brandTremco: string | null;
  brandParchem: string | null;
  unitOfMeasure: string | null;
  packSize: string | null;
  notes: string | null;
}
export interface ProductCategoryData {
  slug: string;
  label: string;
  materials: MaterialRow[];
}
export interface SubcategoryData {
  slug: string;
  label: string;
  productCategories: ProductCategoryData[];
}
export const CONCRETE_DEFECTS_DATA: SubcategoryData[] = [
  {
    "slug": "concrete-spalling",
    "label": "Concrete spalling",
    "productCategories": [
      {
        "slug": "repair-mortars-polymer-modified",
        "label": "Repair mortars (polymer-modified)",
        "materials": [
          {
            "materialName": "Structural repair mortar — general use",
            "productType": "Polymer-modified structural repair mortar",
            "brandSika": "Sika MonoTop-352NFG – structural repair mortar, EN 1504-3 Class R3, 20 kg bag — available at Bunnings",
            "brandArdex": "Ardex BR 340 – polymer-modified structural repair mortar, 20 kg bag",
            "brandFosroc": "Fosroc Renderoc HB – structural repair mortar (hand applied, bulk), 25 kg bag",
            "brandParchem": "Mapei Mapegrout Thixotropic – thixotropic polymer repair mortar, 25 kg bag",
            "brandTremco": "Tremco Eucocrete HBM – polymer-modified structural repair mortar, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20–25 kg",
            "notes": "Commonly specified polymer-modified repair mortar in Australian remedial practice. Apply in layers up to 30–40 mm. Bond coat primer mandatory. Suitable for Class 2 strata, carparks and civil structures."
          },
          {
            "materialName": "High-build structural repair mortar — deep patches and large areas",
            "productType": "High-build polymer repair mortar for repairs 30–100 mm depth",
            "brandSika": "Sika MonoTop-620 – high-build structural repair mortar, 25 kg bag",
            "brandArdex": "Ardex BR 345 – high-build polymer repair mortar, 20 kg bag",
            "brandFosroc": "Fosroc Renderoc LA – large area structural repair mortar, 25 kg bag",
            "brandParchem": "Mapei Mapegrout SFR – steel fibre reinforced repair mortar, 25 kg bag",
            "brandTremco": null,
            "unitOfMeasure": "bag",
            "packSize": "20–25 kg",
            "notes": "High-build formulation for deep spall repairs and large areas. Single layer application up to 50–100 mm. Reduced shrinkage compared to standard grades. Reinforce with stainless mesh in repairs exceeding 50 mm depth."
          },
          {
            "materialName": "Fine polymer repair mortar — cosmetic, thin-section and profiling",
            "productType": "Fine-aggregate polymer repair mortar for cosmetic surface repairs",
            "brandSika": "Sika MonoTop-412N – normal-setting fine repair mortar, 25 kg bag",
            "brandArdex": "Ardex Feather Finish – polymer-modified feather-edge patching compound, 10 kg bag",
            "brandFosroc": "Fosroc Renderoc FC – fine concrete repair mortar, 25 kg bag",
            "brandParchem": "Mapei Mapegrout Fine Fibre – fine fibre-reinforced repair mortar, 25 kg bag",
            "brandTremco": null,
            "unitOfMeasure": "bag",
            "packSize": "5–25 kg",
            "notes": "Fine aggregate for cosmetic repairs, profiling, honeycombing and surface blemishes. Can be feathered to 2–3 mm at edges. Suitable for architecturally exposed concrete where surface match is required."
          }
        ]
      },
      {
        "slug": "cementitious-repair-mortars",
        "label": "Cementitious repair mortars",
        "materials": [
          {
            "materialName": "Cementitious repair mortar",
            "productType": "Cementitious polymer repair mortar",
            "brandArdex": "Ardex BR 340 – cementitious polymer repair mortar, 20 kg bag",
            "brandSika": "Sika MonoTop-436N – general purpose cementitious repair mortar, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc GP – general purpose cementitious repair mortar, 25 kg bag",
            "brandTremco": "Tremco Eucocrete RM – cementitious repair mortar, 25 kg bag",
            "brandParchem": "Mapei Mapegrout Fast-Set – cementitious repair mortar, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20-25 kg",
            "notes": "General spall repairs where epoxy not required. Apply in layers max 50 mm. Use SBR bonding agent."
          }
        ]
      },
      {
        "slug": "epoxy-repair-mortars",
        "label": "Epoxy repair mortars",
        "materials": [
          {
            "materialName": "Epoxy repair mortar",
            "productType": "2-part / 3-part epoxy repair mortar",
            "brandArdex": "Ardex RA 88 Plus – 2-part structural epoxy repair mortar, 4.5 kg kit",
            "brandSika": "Sika Sikadur-42 / Sika MonoTop Epoxy – 2-part epoxy repair mortar, 5 kg kit",
            "brandFosroc": "Fosroc Nitomortar 50 – 3-part epoxy repair mortar, 5 kg kit",
            "brandTremco": "Tremco Eucocrete HBM – polymer-modified structural repair mortar, 25 kg bag",
            "brandParchem": "Fosroc Nitomortar AP – 3-part structural epoxy repair mortar, 4.5 kg kit",
            "unitOfMeasure": "bag/kit",
            "packSize": "5-25 kg",
            "notes": "Use where high early strength or chemical resistance required. Max layer 10 mm. Priming essential."
          }
        ]
      },
      {
        "slug": "bonding-agents-sbr-latex",
        "label": "Bonding agents & SBR latex",
        "materials": [
          {
            "materialName": "Bonding agent / SBR latex",
            "productType": "SBR polymer bonding agent and primer",
            "brandArdex": "Ardex P 51 – water-based acrylic bonding primer, 5 L",
            "brandSika": "Sika Latex SBR – SBR latex bonding admixture, 5 L; Sika Icosit EP Primer – epoxy bond coat, 5 L kit",
            "brandFosroc": "Fosroc Nitobond SBR – SBR latex bonding agent, 5 L; Fosroc Nitobond EP – epoxy bond coat, 5 L",
            "brandTremco": "Tremco THC Bonding Agent – acrylic bonding primer, 5 L",
            "brandParchem": "Fosroc Nitobond SBR – SBR latex bonding agent and admixture, 5 L",
            "unitOfMeasure": "litre",
            "packSize": "5-20 L",
            "notes": "Brush onto prepared substrate before mortar. Also added to mortar mix at 10% by weight of water."
          }
        ]
      },
      {
        "slug": "rebar-primers-inhibitors",
        "label": "Rebar primers & inhibitors",
        "materials": [
          {
            "materialName": "Reinforcement primer (epoxy/zinc-rich)",
            "productType": "2-part epoxy zinc-rich rebar primer",
            "brandArdex": "Ardex BR 10 ZP – single-component zinc-rich rebar primer, 1 L",
            "brandSika": "Sika Ferrogard-903+ – migrating corrosion inhibitor applied to concrete surface, 5-20 L",
            "brandFosroc": "Fosroc Nitoprime Zincrich – 2-part epoxy zinc-rich rebar primer, 1 L kit",
            "brandTremco": "Tremco TREMcrete Zinc Rich Primer – epoxy zinc-rich rebar primer, 1 L kit",
            "brandParchem": "Parchem Zinc Primer – 2-part epoxy zinc-rich rebar primer, 1 L kit",
            "unitOfMeasure": "litre",
            "packSize": "1-5 L",
            "notes": "Apply to cleaned, rust-free rebar before repair mortar. Critical in chloride-affected structures."
          }
        ]
      },
      {
        "slug": "curing-compounds",
        "label": "Curing compounds",
        "materials": [
          {
            "materialName": "Curing compound (acrylic)",
            "productType": "Water-based acrylic concrete curing compound",
            "brandArdex": null,
            "brandSika": "Sika Antisol E – acrylic resin curing compound, 5 L",
            "brandFosroc": "Fosroc Concure WB30 – water-based wax emulsion curing compound, 5 L",
            "brandTremco": "Tremco Eucocrete WB Cure – water-based acrylic curing compound, 5 L",
            "brandParchem": "Mapei Mapecure S – acrylic curing compound, 5 L",
            "unitOfMeasure": "litre",
            "packSize": "5-20 L",
            "notes": "Apply immediately after finishing. Forms moisture-retaining film. Min 7 days curing per AS 3600."
          }
        ]
      },
      {
        "slug": "curing-sheeting",
        "label": "Curing sheeting",
        "materials": [
          {
            "materialName": "Polythene sheeting (curing)",
            "productType": "200 micron LDPE polyethylene curing sheet",
            "brandArdex": "Tuff Wrap – 200 micron polyethylene curing sheet, roll",
            "brandSika": "Visqueen – 250 micron heavy-duty poly sheeting, roll",
            "brandFosroc": "Bunnings Builders Plastic – 200 micron LDPE sheeting, roll",
            "brandTremco": "Packline Australia – 200 micron curing plastic, roll",
            "brandParchem": "Generic – 200 micron polyethylene curing sheeting, roll",
            "unitOfMeasure": "roll",
            "packSize": "various",
            "notes": "Lap joints 300 mm min. Tape all edges. Keep moist underneath for wet curing. Min 7 days."
          }
        ]
      },
      {
        "slug": "formwork-timber",
        "label": "Formwork timber",
        "materials": [
          {
            "materialName": "Formwork timber (DAR pine)",
            "productType": "H3 treated DAR structural pine framing",
            "brandArdex": "Hyne Timber – MGP10 DAR pine 90x35 mm, m length",
            "brandSika": "Timberlink – structural pine 90x35 mm DAR, m length",
            "brandFosroc": "Carter Holt Harvey – DAR pine framing 90x35 mm, m",
            "brandTremco": "Bowens Timber – 90x35 mm DAR pine dressed timber, m",
            "brandParchem": "Local timber merchant – DAR pine 90x35 or 140x35 mm, m",
            "unitOfMeasure": "m",
            "packSize": "various",
            "notes": "H3 CCA treated per AS 1604. DAR for smooth form faces. Typical 90x35 or 140x35 mm."
          }
        ]
      },
      {
        "slug": "formwork-plywood",
        "label": "Formwork plywood",
        "materials": [
          {
            "materialName": "Formwork plywood (17 mm)",
            "productType": "Phenolic-faced structural form ply",
            "brandArdex": "Austral Ply – 17 mm phenolic-faced form ply, 2400x1200 mm sheet",
            "brandSika": "Carter Holt Harvey Structaply – 17 mm structural form ply, 2400x1200 mm",
            "brandFosroc": "Big River Plywood – 17 mm form ply, 2400x1200 mm sheet",
            "brandTremco": "Weyerhaeuser Structaply – 17 mm form ply, 2400x1200 mm",
            "brandParchem": "Local merchant – 17 mm AS/NZS 6669 structural form ply, 2400x1200 mm",
            "unitOfMeasure": "sheet",
            "packSize": "2400x1200 mm",
            "notes": "Phenolic-faced to AS/NZS 6669. Apply release agent before each pour. Limit reuse per face condition."
          }
        ]
      },
      {
        "slug": "form-release-agents",
        "label": "Form release agents",
        "materials": [
          {
            "materialName": "Form release oil",
            "productType": "Petroleum or water-based form release agent",
            "brandArdex": "Sika Rugasol-F – chemical form release agent, 20 L drum",
            "brandSika": "Sika Rugasol-S – surface retarder and release agent, 20 L drum",
            "brandFosroc": "Fosroc Mould Oil – petroleum-based form release, 20 L drum",
            "brandTremco": "Condor Release Agent – petroleum-based form oil, 20 L drum",
            "brandParchem": "Parchem Release Agent – biodegradable form release, 20 L drum",
            "unitOfMeasure": "litre",
            "packSize": "5-20 L",
            "notes": "Apply thin even coat to form face before each pour. Prevents concrete bond. Clean residue after stripping."
          }
        ]
      },
      {
        "slug": "tie-wire-fixings",
        "label": "Tie wire & fixings",
        "materials": [
          {
            "materialName": "Tie wire (1.6 mm)",
            "productType": "Annealed mild steel tie wire",
            "brandArdex": "Hy-Ten – 1.6 mm annealed mild steel tie wire, 1 kg coil",
            "brandSika": "Midalia Steel – 1.6 mm tie wire, 1 kg roll",
            "brandFosroc": "OneSteel – mild steel tie wire 1.6 mm, 1 kg coil",
            "brandTremco": "Lysaght – 1.6 mm tie wire, 1 kg reel",
            "brandParchem": "Generic – 1.6 mm annealed mild steel tie wire, 1 kg coil",
            "unitOfMeasure": "roll",
            "packSize": "1 kg",
            "notes": "Standard 1.6 mm annealed wire for tying rebar. Use 316 stainless in marine/chloride environments."
          }
        ]
      },
      {
        "slug": "cement-aggregates",
        "label": "Cement & aggregates",
        "materials": [
          {
            "materialName": "Portland cement",
            "productType": "General Purpose (GP) Portland cement",
            "brandArdex": "Boral GP Cement – General Purpose Portland cement, 20 kg bag",
            "brandSika": "Hanson OPC – Ordinary Portland cement GP grade, 20 kg bag",
            "brandFosroc": "Cockburn Cement – GP Portland cement, 20 kg bag",
            "brandTremco": "Cement Australia GP – General Purpose cement, 20 kg bag",
            "brandParchem": "Independent Cement & Lime – GP Portland cement, 20 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "Used in site-batched mortar mixes. Do not use alone for structural repairs. Add polymer admix."
          },
          {
            "materialName": "Sand (washed river sand)",
            "productType": "Concrete/mortar grade washed sand",
            "brandArdex": "Boral Washed River Sand – screened, 20 kg bag or bulk tonne",
            "brandSika": "Hanson Washed River Sand – concrete/mortar grade, bulk tonne",
            "brandFosroc": "Independent Quarry – washed river sand to AS 2758.1, bulk tonne",
            "brandTremco": "Quarry Direct – washed river sand, 20 kg bag or bulk tonne",
            "brandParchem": "Local quarry – washed river sand to AS 2758.1, bulk tonne",
            "unitOfMeasure": "bag/bulk",
            "packSize": "20 kg / tonne",
            "notes": "To AS 2758.1. Max 4.75 mm particle size. Must be clean, salt-free, no organic matter."
          },
          {
            "materialName": "Coarse aggregate (10 mm)",
            "productType": "10 mm crushed rock concrete aggregate",
            "brandArdex": "Boral 10 mm Crushed Rock – washed concrete aggregate, bulk tonne",
            "brandSika": "Hanson 10 mm Aggregate – crushed basalt / granite, bulk tonne",
            "brandFosroc": "Independent Quarry – 10 mm washed aggregate to AS 2758.1, bulk tonne",
            "brandTremco": "Quarry Direct – 10 mm aggregate to AS 2758.1, bulk tonne",
            "brandParchem": "Local quarry – 10 mm nominal size aggregate, bulk tonne",
            "unitOfMeasure": "bag/bulk",
            "packSize": "20 kg / tonne",
            "notes": "To AS 2758.1. Washed, graded 10 mm nominal. For site-mixed encasement or patch concrete."
          }
        ]
      },
      {
        "slug": "abrasives-blades-tools",
        "label": "Abrasives, blades & tools",
        "materials": [
          {
            "materialName": "Saw-cut crack chaser blade (diamond)",
            "productType": "Diamond crack chaser and grooving blade",
            "brandArdex": "Husqvarna Vari-Cut – diamond crack chaser blade, 125 mm dia",
            "brandSika": "Norton Clipper – diamond crack chaser disc, 115/125 mm dia",
            "brandFosroc": "Makita Diamond – segmented crack chaser blade, 125 mm dia",
            "brandTremco": "Bosch Expert – diamond crack chasing blade, 125 mm dia",
            "brandParchem": "Lackmond Rock Master – crack chaser grooving blade, 125 mm",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Creates consistent V-joint or square groove for repair or sealant. Min 10 mm wide x 10 mm deep."
          },
          {
            "materialName": "Angle grinder disc (grinding)",
            "productType": "Diamond and abrasive concrete grinding disc",
            "brandArdex": "Husqvarna Vari-Cut – diamond grinding disc, 100/125 mm",
            "brandSika": "Norton Bear-Tex – abrasive concrete grinding disc, 100/125 mm",
            "brandFosroc": "Metabo – abrasive grinding wheel, 125 mm",
            "brandTremco": "Makita – abrasive/diamond grinding disc, 125 mm",
            "brandParchem": "Bosch Expert – concrete surface grinding disc, 125 mm",
            "unitOfMeasure": "each",
            "packSize": "100/125 mm",
            "notes": "For scarifying concrete surfaces pre-repair. Achieve min CSP 3 profile per ICRI 310.2. Use with vacuum."
          },
          {
            "materialName": "Masking tape",
            "productType": "General purpose painters masking tape",
            "brandArdex": "3M 2090 – painters masking tape, 48 mm roll",
            "brandSika": "Tesa 4323 – general purpose masking tape, 48 mm roll",
            "brandFosroc": "Intertape PG21 – professional masking tape, 48 mm roll",
            "brandTremco": "Shurtape CP 66 – painter grade masking tape, 48 mm roll",
            "brandParchem": "Selleys – masking tape, 48 mm roll",
            "unitOfMeasure": "roll",
            "packSize": "48 mm",
            "notes": "Mask adjacent surfaces before sealant or coating. Remove while product still wet or uncured."
          }
        ]
      }
    ]
  },
  {
    "slug": "reinforcement-corrosion",
    "label": "Reinforcement corrosion",
    "productCategories": [
      {
        "slug": "corrosion-inhibitors-mci",
        "label": "Corrosion inhibitors (MCI)",
        "materials": [
          {
            "materialName": "Rust inhibitor / corrosion inhibitor (migrating)",
            "productType": "Migrating corrosion inhibitor (MCI)",
            "brandArdex": "Ardex – specify Sika Ferrogard-903+ (complementary system)",
            "brandSika": "Sika Ferrogard-903+ – migrating corrosion inhibitor, surface-applied, 5-20 L",
            "brandFosroc": "Fosroc Renderoc TS-IC – structural repair mortar with integral corrosion inhibitor, 25 kg bag",
            "brandTremco": "Tremco Ferroguard – migrating amino alcohol corrosion inhibitor, 5 L",
            "brandParchem": "Parchem Nitocor – corrosion inhibitor admixture for repair mortar, 5 L",
            "unitOfMeasure": "litre",
            "packSize": "5-20 L",
            "notes": "Applied to concrete surface; migrates to rebar. Use as part of full repair system per engineer spec."
          }
        ]
      },
      {
        "slug": "epoxy-zinc-rich-primers",
        "label": "Epoxy zinc-rich primers",
        "materials": [
          {
            "materialName": "Epoxy zinc-rich primer",
            "productType": "2-part epoxy zinc-rich rebar primer",
            "brandArdex": "Ardex BR 10 ZP – single-component zinc-rich rebar primer, 1 L",
            "brandSika": "Sika Ferrogard-903+ – corrosion inhibitor and primer coat for cleaned rebar, 5 L",
            "brandFosroc": "Fosroc Nitoprime Zincrich – 2-part epoxy zinc-rich rebar primer, 1 L kit",
            "brandTremco": "Tremco TREMcrete Zinc Rich Primer – epoxy zinc-rich rebar primer, 1 L kit",
            "brandParchem": "Fosroc Nitoprime Zincrich – 2-part epoxy zinc-rich rebar primer, 1 L kit",
            "unitOfMeasure": "litre",
            "packSize": "1-5 L",
            "notes": "Apply to blast-cleaned rebar (Sa 2.5) before repair mortar. Zinc content min 85% dry film. Two coats."
          }
        ]
      },
      {
        "slug": "rebar-primers-inhibitors",
        "label": "Rebar primers & inhibitors",
        "materials": [
          {
            "materialName": "Reinforcement primer (2-part epoxy)",
            "productType": "2-part epoxy rebar primer and bond coat",
            "brandArdex": "Ardex – specify Fosroc Nitoprime Zincrich (complementary)",
            "brandSika": "Sika MonoTop-610 – 2-part epoxy-modified rebar primer, 1 L kit",
            "brandFosroc": "Fosroc Nitoprime Zincrich – 2-part epoxy zinc-rich rebar primer, 1 L kit",
            "brandTremco": "Tremco TREMcrete Zinc Rich Primer – epoxy zinc-rich rebar primer, 1 L kit",
            "brandParchem": "Parchem Zinc Primer – 2-part epoxy rebar primer, 1 L kit",
            "unitOfMeasure": "kit",
            "packSize": "2 L",
            "notes": "2-part system; mix A+B per ratio. Apply to clean metal within 30 min of mixing. Overcoat within pot life."
          }
        ]
      },
      {
        "slug": "cathodic-protection",
        "label": "Cathodic protection",
        "materials": [
          {
            "materialName": "Cathodic protection anodes (zinc/titanium)",
            "productType": "Embedded sacrificial zinc and impressed current anodes",
            "brandArdex": "Ardex BRX 60 LO – sacrificial zinc anode for concrete repair",
            "brandSika": null,
            "brandFosroc": "Fosroc/Vector Galvashield CC – discrete galvanic zinc anode for concrete repair, each",
            "brandTremco": null,
            "brandParchem": "CPT (Cathodic Protection Technologies) – zinc / MMO titanium anodes",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Sacrificial zinc or impressed-current titanium. Design by corrosion engineer per AS 2832. Ongoing monitoring required."
          }
        ]
      },
      {
        "slug": "repair-mortars-polymer-modified",
        "label": "Repair mortars (polymer-modified)",
        "materials": [
          {
            "materialName": "Concrete repair mortar (polymer-modified)",
            "productType": "Polymer-modified structural repair mortar",
            "brandArdex": "Ardex BR 340 – polymer-modified structural repair mortar, 20 kg bag",
            "brandSika": "Sika MonoTop-612 / MonoTop-620 – polymer repair mortar, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc HB / Renderoc LA – structural repair mortar, 25 kg bag",
            "brandTremco": "Tremco Eucocrete HBM – polymer-modified structural repair mortar, 25 kg bag",
            "brandParchem": "Mapei Mapegrout SHB – structural polymer repair mortar, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "Encapsulate rebar after priming. Build out in layers max 30 mm. Cure minimum 7 days. Low permeability critical."
          }
        ]
      },
      {
        "slug": "reinforcement-mesh",
        "label": "Reinforcement mesh",
        "materials": [
          {
            "materialName": "Stainless steel rebar (316 grade)",
            "productType": "316 grade stainless steel reinforcement bar",
            "brandArdex": "InfraBuild (OneSteel) – 316 stainless steel rebar, 6 m lengths, various diameters",
            "brandSika": "Midalia Steel – duplex stainless rebar 316 / 2205, 6 m length",
            "brandFosroc": "Liberty Steel – stainless rebar 316 grade, 6 m length",
            "brandTremco": "Stainless Steel Specialists Australia – 316 SS rebar, 6 m",
            "brandParchem": "Mtalex – 316 grade stainless reinforcing bar, 6 m length",
            "unitOfMeasure": "length",
            "packSize": "6 m",
            "notes": "For replacement rebar in chloride-affected zones. Lap splice or mechanical coupler to existing black steel."
          }
        ]
      },
      {
        "slug": "epoxy-anchoring-adhesives",
        "label": "Epoxy anchoring adhesives",
        "materials": [
          {
            "materialName": "Epoxy adhesive (rebar anchoring)",
            "productType": "Structural 2-part epoxy anchor and injection resin",
            "brandArdex": "Ardex RA 142 – 2-part epoxy injection and anchoring adhesive, 380 mL cartridge",
            "brandSika": "Sika AnchorFix-3+ – high-strength 2-part epoxy anchor adhesive, 345 mL cartridge",
            "brandFosroc": "Fosroc Nitobond EP – 2-part structural epoxy adhesive, 380 mL cartridge",
            "brandTremco": null,
            "brandParchem": null,
            "unitOfMeasure": "cartridge",
            "packSize": "380 mL",
            "notes": "Drill hole 1.5x bar dia. Clean: blow, brush, blow x3. Inject resin, insert bar with rotation. Min embedment per ETA."
          }
        ]
      },
      {
        "slug": "cfrp-strips-laminates",
        "label": "CFRP strips & laminates",
        "materials": [
          {
            "materialName": "Carbon-fibre reinforcement strip (CFRP)",
            "productType": "Pultruded CFRP laminate strip",
            "brandArdex": null,
            "brandSika": "Sika CarboDur M614 – higher modulus CFRP laminate strip, roll",
            "brandFosroc": "Fosroc Nitowrap CW – unidirectional carbon fibre fabric system for structural strengthening, roll",
            "brandTremco": "Mapei Mapewrap C Uni-Axial – CFRP unidirectional strip, roll",
            "brandParchem": "Parchem Nitowrap Carbon – CFRP laminate reinforcement strip, roll",
            "unitOfMeasure": "roll/length",
            "packSize": "various",
            "notes": "For flexural and shear strengthening. Apply with compatible epoxy laminating resin. Structural engineer to design."
          }
        ]
      },
      {
        "slug": "epoxy-laminating-resins",
        "label": "Epoxy laminating resins",
        "materials": [
          {
            "materialName": "Epoxy laminating resin (CFRP bonding)",
            "productType": "2-part epoxy laminating and impregnation resin for CFRP",
            "brandArdex": "Ardex – specify Sika Sikadur-300 epoxy laminating system (complementary)",
            "brandSika": "Sika Sikadur-300 – 2-part epoxy impregnation and laminating resin for CFRP, kit",
            "brandFosroc": "Fosroc Nitowrap 410 – 2-part epoxy laminating resin for CFRP strengthening systems, kit",
            "brandTremco": null,
            "brandParchem": "Fosroc Nitowrap 410 – 2-part epoxy laminating resin for CFRP systems (via Parchem), kit",
            "unitOfMeasure": "kit",
            "packSize": "various",
            "notes": "Prime concrete first. Apply resin, embed CFRP strip, apply second resin coat. Control temperature 10-35 deg C."
          }
        ]
      },
      {
        "slug": "abrasives-blades-tools",
        "label": "Abrasives, blades & tools",
        "materials": [
          {
            "materialName": "Wire brush (steel)",
            "productType": "Steel wire brush for surface preparation",
            "brandArdex": "Osborn – steel wire cup brush and hand brush, each",
            "brandSika": "Garant – steel wire hand brush for masonry and concrete, each",
            "brandFosroc": "Stanley – 5-row steel wire brush, each",
            "brandTremco": "Makita GA-WC – angle grinder wire cup brush, 100/125 mm",
            "brandParchem": "Generic – steel wire brush, each",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "For removing loose rust and contamination from rebar. Follow with blast cleaning or grinder for Sa 2.5."
          },
          {
            "materialName": "Grit blast media (steel grit)",
            "productType": "Steel grit and garnet abrasive blast media",
            "brandArdex": "Abrasive Blasting Supplies – steel grit G18 / G25 angular, 25 kg bag",
            "brandSika": "Blastmaster – steel grit G18 angular, 25 kg bag",
            "brandFosroc": "Newson Gale – garnet blasting media G25, 25 kg bag",
            "brandTremco": "Eltech – steel grit G25, 25 kg bag",
            "brandParchem": "Clemco – steel shot S230 and grit G18, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "25 kg",
            "notes": "For blast-cleaning rebar to Sa 2.5 per ISO 8501-1. Collect and contain all blast media on site."
          }
        ]
      }
    ]
  },
  {
    "slug": "concrete-cracking",
    "label": "Concrete cracking",
    "productCategories": [
      {
        "slug": "injection-resins-pu-flexible",
        "label": "Injection resins (PU flexible)",
        "materials": [
          {
            "materialName": "Polyurethane injection resin (flexible)",
            "productType": "Flexible and hydrophilic PU injection resin",
            "brandArdex": "Ardex CE 300 – hydrophilic polyurethane injection resin, 600 mL / 20 L drum",
            "brandSika": "Sika Injection-107 (hydrophilic) / Sika Injection-306 (hydrophobic) – PU resin, 600 mL",
            "brandFosroc": "Fosroc Nitofill PU130 – hydrophobic flexible polyurethane injection resin, 600 mL cartridge",
            "brandTremco": "Tremco THC Injection Resin – expanding polyurethane injection resin, 600 mL",
            "brandParchem": "Fosroc Nitofill PU150 – hydrophilic expanding polyurethane injection resin, 600 mL",
            "unitOfMeasure": "cartridge/drum",
            "packSize": "600 mL / 20 L",
            "notes": "For active or dormant cracks. Hydrophilic type expands on contact with water. Min crack width 0.1 mm."
          }
        ]
      },
      {
        "slug": "injection-resins-epoxy-rigid",
        "label": "Injection resins (epoxy rigid)",
        "materials": [
          {
            "materialName": "Epoxy injection resin (rigid, structural)",
            "productType": "2-part rigid epoxy structural injection resin",
            "brandArdex": null,
            "brandSika": "Sika Injection-451 N / Sikadur-52 – low-viscosity 2-part epoxy injection resin, 380 mL",
            "brandFosroc": "Fosroc Nitofill Epoxy – 2-part rigid epoxy injection resin, 380 mL cartridge",
            "brandTremco": null,
            "brandParchem": "Parchem Nitofill Epoxy – 2-part rigid epoxy injection resin, 380 mL kit",
            "unitOfMeasure": "cartridge/kit",
            "packSize": "380 mL / 5 L",
            "notes": "For structural crack reinstatement. Crack must be dry or use suitable primer. Inject from low to high port."
          }
        ]
      },
      {
        "slug": "crack-injection-ports",
        "label": "Crack injection ports",
        "materials": [
          {
            "materialName": "Crack injection ports (surface-mounted)",
            "productType": "Surface-mounted plastic injection ports and packers",
            "brandArdex": "Ardex – specify Desoi plastic surface injection ports (complementary)",
            "brandSika": "Sika Crack Port – plastic surface-mounted crack injection port, each",
            "brandFosroc": "Fosroc Injection Packer – surface-mounted injection port, each",
            "brandTremco": "Tremco Injection Port – surface-mounted crack injection port, each",
            "brandParchem": "Desoi Flat Port – plastic surface-mounted injection port, each",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Bond to crack surface with epoxy paste. Space at 1x crack depth intervals. Remove after injection and cure."
          }
        ]
      },
      {
        "slug": "epoxy-anchoring-adhesives",
        "label": "Epoxy anchoring adhesives",
        "materials": [
          {
            "materialName": "Epoxy paste (port adhesive)",
            "productType": "High-modulus 2-part epoxy paste for port bonding",
            "brandArdex": "Ardex – specify Sika Sikadur-31 (complementary system)",
            "brandSika": "Sika Sikadur-31 – high-modulus 2-part epoxy paste adhesive, 380 mL cartridge",
            "brandFosroc": "Fosroc Nitobond EP Paste – 2-part structural epoxy paste adhesive, 380 mL cartridge",
            "brandTremco": null,
            "brandParchem": "Parchem Epoxy Port Adhesive – 2-part epoxy paste, 380 mL cartridge",
            "unitOfMeasure": "cartridge",
            "packSize": "380 mL",
            "notes": "Bond injection ports to crack surface. Also seals crack face between ports. Allow full cure before injecting."
          }
        ]
      },
      {
        "slug": "sealants-polyurethane",
        "label": "Sealants (polyurethane)",
        "materials": [
          {
            "materialName": "Polyurethane sealant (flexible joint)",
            "productType": "1-part polyurethane flexible joint sealant",
            "brandArdex": "Ardex RA 040 – 1-part polyurethane joint sealant, 600 mL cartridge",
            "brandSika": "Sika Sikaflex-11FC / Sikaflex Pro-3 WF – 1-part PU sealant, 600 mL cartridge",
            "brandFosroc": "Fosroc Thioflex 600 (polysulfide) / Nitoseal MS600 (MS polymer) – flexible joint sealants, 600 mL cartridge",
            "brandTremco": "Tremco Dymonic 100 – high-movement PU sealant, 600 mL cartridge",
            "brandParchem": "Parchem Pro-Sealant PU600 – 1-part PU sealant, 600 mL cartridge",
            "unitOfMeasure": "cartridge",
            "packSize": "600 mL",
            "notes": "For dormant or movement cracks routed and sealed. Joint width to depth ratio 2:1. Bond breaker tape at base."
          }
        ]
      },
      {
        "slug": "backer-rods",
        "label": "Backer rods",
        "materials": [
          {
            "materialName": "Backer rod (closed-cell foam)",
            "productType": "Closed-cell polyethylene foam backer rod",
            "brandArdex": "Norseal V740 – closed-cell polyethylene backer rod, 6-50 mm dia",
            "brandSika": "Sika – specify Norseal V740 or Rexnord backer rod (complementary)",
            "brandFosroc": "Fosroc – specify Norseal V740 closed-cell backer rod (complementary)",
            "brandTremco": "Norseal V740 – closed-cell polyethylene backer rod, 6-50 mm dia",
            "brandParchem": "Rexnord Villex – closed-cell polyethylene backer rod, 6-50 mm dia",
            "unitOfMeasure": "roll",
            "packSize": "6-20 mm dia",
            "notes": "Insert to control sealant depth at 1:1 width to depth. Prevents 3-point adhesion. Slightly oversized for compression."
          }
        ]
      },
      {
        "slug": "abrasives-blades-tools",
        "label": "Abrasives, blades & tools",
        "materials": [
          {
            "materialName": "Saw-cut crack chaser blade",
            "productType": "Diamond crack chaser and grooving blade",
            "brandArdex": "Husqvarna Vari-Cut – diamond crack chaser blade, 125 mm dia",
            "brandSika": "Norton Clipper – diamond crack chaser disc, 115/125 mm dia",
            "brandFosroc": "Makita Diamond – segmented crack chaser blade, 125 mm",
            "brandTremco": "Bosch Expert – diamond crack chasing blade, 125 mm dia",
            "brandParchem": "Lackmond Rock Master – crack chaser grooving blade, 125 mm",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Route cracks to min 10 mm wide x 10 mm deep before sealant application. Use with vacuum extraction."
          },
          {
            "materialName": "Masking tape",
            "productType": "General purpose painters masking tape",
            "brandArdex": "3M 2090 – painters masking tape, 48 mm roll",
            "brandSika": "Tesa 4323 – general purpose masking tape, 48 mm roll",
            "brandFosroc": "Intertape PG21 – professional masking tape, 48 mm roll",
            "brandTremco": "Shurtape CP 66 – painter grade masking tape, 48 mm roll",
            "brandParchem": "Selleys – masking tape, 48 mm roll",
            "unitOfMeasure": "roll",
            "packSize": "48 mm",
            "notes": "Mask edges before sealant. Remove immediately after tooling before product skins over."
          }
        ]
      }
    ]
  },
  {
    "slug": "settlement-cracks",
    "label": "Settlement cracks",
    "productCategories": [
      {
        "slug": "injection-resins-pu-flexible",
        "label": "Injection resins (PU flexible)",
        "materials": [
          {
            "materialName": "Polyurethane injection resin (expanding)",
            "productType": "Expanding and hydrophilic polyurethane injection resin",
            "brandArdex": "Ardex CE 300 – hydrophilic expanding polyurethane injection resin, 600 mL / 20 L drum",
            "brandSika": "Sika Injection-107 – expanding hydrophilic PU injection resin, 600 mL / 20 L drum",
            "brandFosroc": "Fosroc Nitofill PU150 – hydrophilic expanding polyurethane injection resin, 600 mL / 20 L drum",
            "brandTremco": "Tremco THC Injection Resin – expanding PU foam injection, 600 mL / 20 L drum",
            "brandParchem": "Parchem Nitofill PU Hydrophilic – expanding PU injection, 600 mL / 20 L drum",
            "unitOfMeasure": "drum",
            "packSize": "20 L",
            "notes": "Reacts with water to expand and fill void. Use for active leaks or voids under slabs. Multiple stages."
          }
        ]
      },
      {
        "slug": "injection-resins-epoxy-rigid",
        "label": "Injection resins (epoxy rigid)",
        "materials": [
          {
            "materialName": "Epoxy injection resin (rigid)",
            "productType": "Rigid 2-part epoxy structural injection resin",
            "brandArdex": null,
            "brandSika": "Sika Injection-451 N / Sikadur-52 – low-viscosity rigid 2-part epoxy injection, 380 mL",
            "brandFosroc": "Fosroc Nitofill Epoxy – rigid 2-part epoxy injection resin, 380 mL cartridge",
            "brandTremco": null,
            "brandParchem": "Parchem Nitofill Epoxy – rigid 2-part epoxy injection resin, 380 mL kit",
            "unitOfMeasure": "cartridge/kit",
            "packSize": "380 mL / 5 L",
            "notes": "Structural reinstatement of dormant settlement cracks. Crack must be dry or pre-treat with PU first."
          }
        ]
      },
      {
        "slug": "crack-injection-ports",
        "label": "Crack injection ports",
        "materials": [
          {
            "materialName": "Crack injection ports",
            "productType": "Surface-mounted plastic crack injection ports",
            "brandArdex": "Ardex – specify Desoi plastic surface injection port (complementary)",
            "brandSika": "Sika Crack Port – plastic surface-mounted crack injection port, each",
            "brandFosroc": "Fosroc Injection Packer – surface-mounted crack injection port, each",
            "brandTremco": "Tremco – surface-mounted crack injection port, each",
            "brandParchem": "Desoi Flat Port – plastic surface-mounted injection port, each",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Space at 1x crack depth or 100-150 mm. Bond with epoxy paste and allow to cure before injecting."
          }
        ]
      },
      {
        "slug": "structural-anchors-dowels",
        "label": "Structural anchors & dowels",
        "materials": [
          {
            "materialName": "Helical stainless-steel tie bars (Helifix)",
            "productType": "316 SS helical tie and stitching bar",
            "brandArdex": "Helifix HeliBond / Helibond Plus – 316 SS helical tie bar, 6 mm dia, 225-1000 mm lengths",
            "brandSika": "Ancon Teplo – 316 SS helical bar for masonry and concrete stitching, 6 mm dia",
            "brandFosroc": "Thor Helical – 316 SS helical tie and stitching bar, 6 mm dia",
            "brandTremco": "Simpson Strong-Tie Helix – 316 SS helical tie bar, 6 mm dia",
            "brandParchem": "Tfix – 316 SS helical tie bar for masonry and concrete stitching, 6 mm dia",
            "unitOfMeasure": "each/m",
            "packSize": "various",
            "notes": "Drill hole, inject resin, insert bar, allow to cure. Provides tensile stitching action across cracks."
          }
        ]
      },
      {
        "slug": "repair-mortars-polymer-modified",
        "label": "Repair mortars (polymer-modified)",
        "materials": [
          {
            "materialName": "Masonry repair mortar",
            "productType": "Polymer-modified masonry and crack repair mortar",
            "brandArdex": "Ardex BR 340 – polymer-modified masonry repair mortar, 20 kg bag",
            "brandSika": "Sika MonoTop-412N – polymer-modified masonry repair mortar, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc GP – general purpose masonry repair mortar, 25 kg bag",
            "brandTremco": "Tremco TREMproof Mortar – masonry repair mortar, 25 kg bag",
            "brandParchem": "Mapei Mapegrout SHB – structural masonry repair mortar, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "Make-good to cracks and voids in masonry after structural repair and stitching. Match colour of existing."
          }
        ]
      },
      {
        "slug": "lime-repointing-mortars",
        "label": "Lime & repointing mortars",
        "materials": [
          {
            "materialName": "Lime mortar (repointing)",
            "productType": "Natural hydraulic lime (NHL) repointing mortar",
            "brandArdex": "Ardex – specify Surebuild 450 NHL natural hydraulic lime (complementary)",
            "brandSika": "Sika – specify Surebuild 450 NHL or Unitex UniPoint (complementary)",
            "brandFosroc": "Fosroc – specify Surebuild 450 NHL natural hydraulic lime (complementary)",
            "brandTremco": "Surebuild 450 NHL – natural hydraulic lime mortar, 25 kg bag",
            "brandParchem": "Unitex UniPoint – pre-blended NHL lime repointing mortar, 20 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "For heritage and soft brick only; must be weaker than substrate. Never use OPC as it traps moisture."
          }
        ]
      },
      {
        "slug": "sealants-polyurethane",
        "label": "Sealants (polyurethane)",
        "materials": [
          {
            "materialName": "Polyurethane sealant",
            "productType": "1-part polyurethane crack and joint sealant",
            "brandArdex": "Ardex RA 040 – 1-part polyurethane sealant, 600 mL cartridge",
            "brandSika": "Sika Sikaflex-11FC – 1-part polyurethane sealant, 600 mL cartridge",
            "brandFosroc": "Fosroc Nitoseal MS600 – 1-part MS polymer sealant, 600 mL cartridge",
            "brandTremco": "Tremco Dymonic 100 – 1-part polyurethane sealant, 600 mL cartridge",
            "brandParchem": "Parchem Pro-Sealant PU600 – 1-part polyurethane sealant, 600 mL cartridge",
            "unitOfMeasure": "cartridge",
            "packSize": "600 mL",
            "notes": "Surface-seal settlement cracks after injection or stitching. Apply with backer rod. Movement capacity +/-25%."
          }
        ]
      },
      {
        "slug": "backer-rods",
        "label": "Backer rods",
        "materials": [
          {
            "materialName": "Backer rod",
            "productType": "Closed-cell polyethylene foam backer rod",
            "brandArdex": "Norseal V740 – closed-cell polyethylene backer rod, various dia",
            "brandSika": "Sika – specify Norseal V740 backer rod (complementary)",
            "brandFosroc": "Fosroc – specify Norseal V740 closed-cell backer rod (complementary)",
            "brandTremco": "Norseal V740 – closed-cell polyethylene backer rod, various dia",
            "brandParchem": "Rexnord Villex – closed-cell polyethylene backer rod, various dia",
            "unitOfMeasure": "roll",
            "packSize": "various",
            "notes": "Insert before sealant to control depth. Prevents 3-point adhesion failure. Size slightly over joint width."
          }
        ]
      }
    ]
  },
  {
    "slug": "slab-edge-deterioration",
    "label": "Slab edge deterioration",
    "productCategories": [
      {
        "slug": "repair-mortars-polymer-modified",
        "label": "Repair mortars (polymer-modified)",
        "materials": [
          {
            "materialName": "Concrete repair mortar",
            "productType": "Polymer-modified slab edge repair mortar",
            "brandArdex": "Ardex BR 340 – polymer-modified slab edge repair mortar, 20 kg bag",
            "brandSika": "Sika MonoTop-612 / MonoTop-620 – polymer repair mortar for slab edge, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc HB / Renderoc LA – structural slab edge repair mortar, 25 kg bag",
            "brandTremco": "Tremco Eucocrete HBM – polymer-modified structural repair mortar, 25 kg bag",
            "brandParchem": "Mapei Mapegrout SHB – structural polymer repair mortar, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "Form edge with steel or PVC angle. Apply in lifts max 30 mm. Cure min 7 days. Protect from traffic."
          }
        ]
      },
      {
        "slug": "epoxy-repair-mortars",
        "label": "Epoxy repair mortars",
        "materials": [
          {
            "materialName": "Epoxy repair mortar",
            "productType": "2-part / 3-part epoxy slab edge repair mortar",
            "brandArdex": "Ardex RA 88 Plus – 2-part structural epoxy repair mortar, 4.5 kg kit",
            "brandSika": "Sika Sikadur-42 – 3-part epoxy mortar for slab edge, 5 kg kit",
            "brandFosroc": "Fosroc Nitomortar 50 – 3-part epoxy slab edge repair mortar, 5 kg kit",
            "brandTremco": "Tremco Eucocrete HBM – polymer-modified structural repair mortar, 25 kg bag",
            "brandParchem": "Fosroc Nitomortar AP – 3-part structural epoxy repair mortar, 4.5 kg kit",
            "unitOfMeasure": "kit",
            "packSize": "5 kg",
            "notes": "High-strength early return to service. Good abrasion and impact resistance for slab edges. Temp 10-35 deg C."
          }
        ]
      },
      {
        "slug": "bonding-agents-sbr-latex",
        "label": "Bonding agents & SBR latex",
        "materials": [
          {
            "materialName": "Bonding agent / SBR latex",
            "productType": "SBR polymer bonding agent and primer",
            "brandArdex": "Ardex P 51 – water-based acrylic bonding primer, 5 L",
            "brandSika": "Sika Latex SBR – SBR latex bonding agent, 5 L",
            "brandFosroc": "Fosroc Nitobond SBR – SBR latex bonding agent, 5 L",
            "brandTremco": "Tremco THC Bonding Agent – acrylic bonding primer, 5 L",
            "brandParchem": "Fosroc Nitobond SBR – SBR latex bonding agent and admixture, 5 L",
            "unitOfMeasure": "litre",
            "packSize": "5 L",
            "notes": "Essential for adhesion of repair mortar to existing slab edge. Apply, allow to become tacky, then apply mortar."
          }
        ]
      },
      {
        "slug": "edge-forms-accessories",
        "label": "Edge forms & accessories",
        "materials": [
          {
            "materialName": "Edge form (steel/plastic angle)",
            "productType": "Galvanised steel or PVC edge form angle",
            "brandArdex": "Hy-Ten – galvanised steel edge form angle, m length",
            "brandSika": "Rapid Formwork – PVC plastic edge form angle, m length",
            "brandFosroc": "Dincel – PVC permanent structural edge and kicker form, m",
            "brandTremco": "Fletcher Concrete – galvanised steel edge form angle, m",
            "brandParchem": "Generic – 50x50x3 mm galvanised steel angle edge form, m",
            "unitOfMeasure": "m",
            "packSize": "various",
            "notes": "Fix with concrete nails or screws. Leave in place or strip after cure. Ensures clean arris on repaired edge."
          }
        ]
      },
      {
        "slug": "reinforcement-mesh",
        "label": "Reinforcement mesh",
        "materials": [
          {
            "materialName": "Stainless steel reinforcement mesh",
            "productType": "316 SS welded wire reinforcement mesh",
            "brandArdex": "InfraBuild (OneSteel) – 316 SS welded wire mesh, 2400x1200 mm sheet",
            "brandSika": "Midalia Steel – SS welded reinforcement mesh 316 grade, various sheet sizes",
            "brandFosroc": "Liberty OneSteel – 316 SS reinforcing mesh, sheet",
            "brandTremco": "Stainless Steel Specialists Australia – 316 SS welded mesh, sheet",
            "brandParchem": "Mtalex – stainless steel welded mesh 316, various sizes",
            "unitOfMeasure": "sheet",
            "packSize": "various",
            "notes": "For supplementary reinforcement in edge repairs. 316 SS in chloride environments. Maintain min 30 mm cover."
          }
        ]
      },
      {
        "slug": "curing-compounds",
        "label": "Curing compounds",
        "materials": [
          {
            "materialName": "Curing compound",
            "productType": "Water-based acrylic concrete curing compound",
            "brandArdex": null,
            "brandSika": "Sika Antisol E – acrylic resin curing compound, 5 L",
            "brandFosroc": "Fosroc Concure WB30 – water-based wax emulsion curing compound, 5 L",
            "brandTremco": "Tremco Eucocrete WB Cure – water-based acrylic curing compound, 5 L",
            "brandParchem": "Mapei Mapecure S – acrylic curing compound, 5 L",
            "unitOfMeasure": "litre",
            "packSize": "5 L",
            "notes": "Apply immediately after repair mortar finishing. Cure minimum 7 days before any trafficking."
          }
        ]
      },
      {
        "slug": "abrasives-blades-tools",
        "label": "Abrasives, blades & tools",
        "materials": [
          {
            "materialName": "Angle grinder disc (grinding)",
            "productType": "Diamond and abrasive concrete grinding disc",
            "brandArdex": "Husqvarna Vari-Cut – diamond grinding disc, 100/125 mm dia",
            "brandSika": "Norton Bear-Tex – abrasive concrete grinding disc, 100/125 mm dia",
            "brandFosroc": "Metabo – abrasive grinding wheel, 125 mm dia",
            "brandTremco": "Makita – abrasive and diamond grinding disc, 125 mm dia",
            "brandParchem": "Bosch Expert – concrete surface grinding disc, 125 mm dia",
            "unitOfMeasure": "each",
            "packSize": "100/125 mm",
            "notes": "Prepare slab edge surface prior to repair. Achieve min CSP 3 profile per ICRI 310.2. Use with vacuum extraction."
          }
        ]
      }
    ]
  },
  {
    "slug": "magnesite-flooring-deterioration",
    "label": "Magnesite flooring deterioration",
    "productCategories": [
      {
        "slug": "moisture-suppression-primers",
        "label": "Moisture suppression primers",
        "materials": [
          {
            "materialName": "Two-part epoxy moisture control primer",
            "productType": "Two-part epoxy moisture-suppressing floor primer",
            "brandArdex": "Ardex MC Rapid – two-part epoxy moisture control primer for high-RH substrates, 10 L kit",
            "brandSika": "Sika Primer MB – two-part epoxy moisture-suppressing floor primer, 8 L kit",
            "brandFosroc": "Fosroc Nitoprime 28 – two-part penetrating epoxy primer for damp and high-moisture substrates, 4 L kit",
            "brandTremco": "Parchem Epirez 510 – two-part low-viscosity epoxy adhesion and moisture-control primer, 5 L kit",
            "brandParchem": "Mapei Primer G – solvent-free acrylic adhesion and moisture-barrier primer, 1 L",
            "unitOfMeasure": "kit",
            "packSize": "4–10 L",
            "notes": "Mandatory pre-application moisture testing — ASTM F2170 in-situ RH probe or anhydrous calcium chloride test. Substrate must achieve minimum CSP 2 profile. Remove all friable, delaminating, or actively corroding magnesite before priming. Allow primer to cure fully before applying self-levelling compound. Do not apply over active efflorescence or contaminated surface."
          },
          {
            "materialName": "Single-component acrylic adhesion primer",
            "productType": "Single-component acrylic floor levelling primer",
            "brandArdex": "Ardex P 51 – single-component acrylic adhesion primer for floor levelling systems, 5 L",
            "brandSika": "Sika Primer-3N – single-component adhesion primer for porous and semi-porous substrates, 1 L",
            "brandFosroc": "Fosroc Nitobond SBR – SBR latex adhesion primer for floor levelling, 5 L",
            "brandTremco": "Parchem Concure SBR – SBR primer and curing admixture for floor applications, 5 L",
            "brandParchem": "Mapei Eco Prim T – single-component acrylic primer for self-levelling underlayments, 1 L",
            "unitOfMeasure": "litre",
            "packSize": "1–5 L",
            "notes": "Used over encapsulated magnesite where moisture levels are within acceptable limits (typically <75% RH). Apply to clean primed surface, allow to become tacky before applying self-levelling compound. Do not dilute. Coverage approx 8–12 m²/L depending on porosity."
          }
        ]
      },
      {
        "slug": "self-levelling-underlayments",
        "label": "Self-levelling underlayments",
        "materials": [
          {
            "materialName": "Cementitious self-levelling compound",
            "productType": "Cement-based self-levelling floor underlayment",
            "brandArdex": "Ardex K 15 – cement-based self-levelling floor compound 3–20 mm, 25 kg bag",
            "brandSika": "Sika Level-01 Top – cement-based self-levelling underlayment 3–20 mm, 25 kg bag",
            "brandFosroc": "Fosroc Nitofloor FC3 – cementitious floor levelling and screed compound, 25 kg bag",
            "brandTremco": "Parchem Flowfill FC – pumpable self-levelling floor compound 2–30 mm, 25 kg bag",
            "brandParchem": "Mapei Ultraplan Eco – self-levelling underlayment 2–20 mm, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "25 kg",
            "notes": "Apply over fully cured moisture suppression primer. Pour and spread to required depth — product self-levels within tolerance. Minimum application thickness 3 mm. Do not apply directly to magnesite without moisture primer. Allow full cure before installing floor coverings — typically 24–48 hrs depending on thickness and ambient conditions. Inspect for pinholes and touch up before covering."
          },
          {
            "materialName": "Rapid-setting self-levelling compound",
            "productType": "Rapid-setting self-levelling floor underlayment",
            "brandArdex": "Ardex K 301 – rapid-setting self-levelling compound, trafficable 2–4 hrs, 25 kg bag",
            "brandSika": "Sika Level-125 – rapid-setting self-levelling floor compound, 25 kg bag",
            "brandFosroc": "Fosroc Nitofloor RS – rapid-setting floor levelling compound, 25 kg bag",
            "brandTremco": "Parchem Flowfill RS – rapid-set self-levelling compound, trafficable 3–4 hrs, 25 kg bag",
            "brandParchem": "Mapei Ultraplan Maxi Plus – rapid self-levelling underlayment 3–30 mm, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "25 kg",
            "notes": "Use where fast return to service is required. Mixing is time-critical — use a mechanical spiral mixer and pour within 10 minutes of mixing. Close windows and doors to prevent draughts during application. Do not walk on surface for minimum 2–4 hours. Check manufacturer TDS for floor covering installation timelines after rapid-set SLCs."
          }
        ]
      },
      {
        "slug": "floor-patching-compounds",
        "label": "Floor patching compounds",
        "materials": [
          {
            "materialName": "Feather-edge skim patch compound",
            "productType": "Polymer-modified feather-edge floor patching compound",
            "brandArdex": "Ardex Feather Finish – polymer-modified feather-edge skimming and patching compound, 10 kg bag",
            "brandSika": "Sika MonoTop-412N – fine polymer repair mortar for feather edge to 10 mm, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc FC – fine cosmetic fairing mortar for thin-section patching, 25 kg bag",
            "brandTremco": "Parchem Renderoc FC – polymer-modified fairing coat for floor patching, 25 kg bag",
            "brandParchem": "Mapei Planitop Fast 330 – rapid-set repair mortar for thin-section floor patching, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "10–25 kg",
            "notes": "For localised failed areas, low spots, and surface irregularities in existing magnesite or concrete substrate. Prime surface first. Can feather to near-zero edge. Apply in layers not exceeding 10 mm per lift. Not a substitute for full self-levelling compound where planarity tolerance is critical for hard floor coverings."
          },
          {
            "materialName": "Rapid-set floor patching mortar",
            "productType": "Rapid-setting cementitious floor repair mortar",
            "brandArdex": "Ardex RA 90 – rapid-setting floor repair and patching mortar, 25 kg bag",
            "brandSika": "Sika MonoTop-412N – rapid-setting fine repair mortar, 0–10 mm, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc LA – rapid low-alkali repair mortar for thin-section floor patching, 25 kg bag",
            "brandTremco": "Parchem Speed Rep – rapid-setting floor repair mortar, 25 kg bag",
            "brandParchem": "Mapei Planitop 400 – polymer-modified rapid repair mortar for floors, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "25 kg",
            "notes": "Use for isolated floor depressions, damaged saw-cut edges, or localised substrate failure prior to self-levelling. Trafficable typically within 1–3 hours. Do not overcoat with SLC until mortar has reached sufficient compressive strength — check TDS."
          }
        ]
      },
      {
        "slug": "floor-grinding-preparation",
        "label": "Floor grinding & preparation",
        "materials": [
          {
            "materialName": "Floor grinder (single or double head)",
            "productType": "Diamond floor grinding machine for surface preparation",
            "brandArdex": "Husqvarna PG 280 – single-head floor grinder with dust shroud, 280 mm working width",
            "brandSika": "Scanmaskin SM 250 – single-head concrete floor grinding machine, 250 mm dia",
            "brandFosroc": "Blastrac 1-10DS – single-head floor grinder with integrated vacuum connection, 250 mm",
            "brandTremco": "HTC Superfloor 270EG – edge and floor grinder, 270 mm",
            "brandParchem": "Bosch GBR 15 CA – angle grinder with floor grinding cup wheel, 150 mm",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "CAUTION: Magnesite dust contains magnesium chloride — classified as a respiratory hazard. Grinding must be performed wet or with M-class or H-class HEPA vacuum extraction at all times. Operator PPE: P2 respirator minimum, eye protection, gloves. Achieve min CSP 2 profile on magnesite before primer application. Do not generate dry airborne dust."
          },
          {
            "materialName": "HEPA vacuum (M-class / H-class)",
            "productType": "M-class HEPA dust extractor for magnesite and concrete dust",
            "brandArdex": "Festool CTL MIDI – M-class HEPA dust extractor, 15 L, for magnesite grinding",
            "brandSika": "Makita VC3211MX1 – M-class HEPA industrial vacuum, 32 L",
            "brandFosroc": "Nilfisk ATTIX 33 – M-class HEPA dust extractor, 33 L",
            "brandTremco": "Karcher NT 30/1 Me – M-class HEPA wet/dry vacuum, 30 L",
            "brandParchem": "Bosch GAS 35 M AFC – M-class HEPA dust extractor, 35 L",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Mandatory for magnesite grinding and preparation. M-class filtration rated to capture particles down to 1 µm. Connect directly to grinder dust shroud. Dispose of collected magnesite dust as chemical waste — do not empty into general waste. Replace HEPA filter regularly. Safe Work Australia guidance on silica and construction dust applies."
          }
        ]
      }
    ]
  }
];
