/**
 * Smart directory classifier.
 * For each business description, produces:
 *   Main Category, Subcategory, Best Directory Label,
 *   Secondary Tags, Service Areas
 * Also writes Best Directory Label into "Trade (from Name)" (col D).
 *
 * Uses approved-labels.js — new label suggestions are queued for review.
 *
 * Flags:
 *   --test   run on first 50 rows with descriptions (show output, no file write)
 *   --force  re-classify rows that already have a Best Directory Label
 */

require('dotenv').config({ path: '.env.local' });
const XLSX   = require('xlsx');
const path   = require('path');
const os     = require('os');
const { APPROVED_LABELS, SUGGESTED_LABELS, suggestNew } = require('./approved-labels');

const FILE      = path.join(os.homedir(), 'Desktop', 'RBA_Directory_2026-06-12.xlsx');
const TEST_MODE = process.argv.includes('--test');
const FORCE     = process.argv.includes('--force');
const limitArg  = process.argv.find(a => a.startsWith('--limit='));
const LIMIT     = limitArg ? parseInt(limitArg.split('=')[1], 10) : null;

// ── Australian locations ──────────────────────────────────────────────────────
const AU_LOCATIONS = [
  'NSW','VIC','QLD','SA','WA','TAS','NT','ACT',
  'New South Wales','Victoria','Queensland','South Australia',
  'Western Australia','Tasmania','Northern Territory',
  'Australian Capital Territory',
  'Sydney','Melbourne','Brisbane','Perth','Adelaide','Hobart','Darwin','Canberra',
  'Gold Coast','Sunshine Coast','Newcastle','Wollongong','Geelong','Townsville',
  'Cairns','Toowoomba','Ballarat','Bendigo','Launceston','Albury','Wodonga',
  'Rockhampton','Mackay','Bunbury','Mandurah','Busselton','Geraldton','Albany',
  'Broome','Kalgoorlie','Port Hedland','Karratha','Exmouth','Esperance',
  'Mildura','Shepparton','Warrnambool','Traralgon','Horsham','Sale',
  'Dubbo','Orange','Tamworth','Armidale','Wagga Wagga','Lismore','Coffs Harbour',
  'Gosford','Central Coast','Penrith','Parramatta','Blacktown',
  'Ipswich','Logan','Redlands','Moreton Bay',
  'Mount Gambier','Whyalla','Port Augusta','Port Pirie',
  'Alice Springs','Katherine','Palmerston',
  'South East QLD','South East Queensland','SEQ',
  'South West WA','Greater Sydney','Greater Melbourne',
  'Hunter Valley','Hunter Region','Illawarra','Riverina',
  'Barossa Valley','Fleurieu Peninsula',
  'Far North QLD','North QLD','South QLD',
  'Northern Rivers','Mid-North Coast',
];

const AU_LOC_RE = new RegExp(
  '\\b(' + AU_LOCATIONS.map(l => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\b',
  'gi'
);

function extractServiceAreas(desc) {
  if (!desc) return '';
  return [...new Set((desc.match(AU_LOC_RE) || []).map(m => m.trim()))].join(', ');
}

// ── Entity type ───────────────────────────────────────────────────────────────
function entityType(d) {
  if (/\bmanufactur/.test(d)) return 'manufacturer';
  if (/wholesale|distributor|\bsupplier\b/.test(d) &&
      !/supply and install|supply & install|supply,\s*install/.test(d)) return 'supplier';
  if (/\bconsult\b|consulting|consultancy|advisory|audit|assess|inspection|inspecting|certif|surveyor|planner/.test(d)) return 'consultant';
  if (/home builder|house builder|custom home|luxury home|new home|residential builder|volume builder/.test(d)) return 'builder';
  if (/commercial.*builder|commercial.*construct|construction.*company|construction.*group|general contractor/.test(d)) return 'commercial_builder';
  return 'contractor';
}

// ── Main category ─────────────────────────────────────────────────────────────
function mainCategory(d) {
  // Environmental must come first — "site remediation" is not asbestos
  if (/environmental.*consult|environmental.*assess|environmental.*monitoring|environmental.*testing|site.*remediation(?!.*asbestos)|occupational.*hygiene/.test(d)) return 'Environmental Consulting';
  if (/demolition|deconstruct/.test(d)) return 'Demolition';
  if (/asbestos remov|asbestos test|asbestos.*manag|asbestos.*consult|hazardous material/.test(d)) return 'Asbestos Removal';
  if (/caulk|joint.*seal|joint sealing|sealant.*service/.test(d)) return 'Caulking & Sealants';
  // Plumbing before earthmoving — hydro-excavation is still plumbing
  if (/plumb/.test(d) && /excavat/.test(d)) return 'Plumbing';
  // Concrete before earthmoving — concrete contractors mention excavation as ancillary
  if (/concret/.test(d) && /excavat/.test(d)) return 'Concrete';
  if (/earthmov|excavat/.test(d)) return 'Earthmoving & Excavation';
  if (/crane.*hire|crane.*service|lifting.*solution|rigging.*service/.test(d)) return 'Crane & Lifting';
  if (/blind\b|blinds\b|curtain\b|awning\b/.test(d)) return 'Blinds & Window Furnishings';
  if (/basement.*construct|basement.*build|basement.*solution/.test(d)) return 'Basement Construction';
  if (/building.*surveyor/.test(d)) return 'Building Surveyor';
  if (/basix|section j\b|thermal.*assessment|nabers.*assess/.test(d)) return 'Energy Efficiency';
  if (/hardware.*store|hardware.*supply|mitre 10|bunnings/.test(d)) return 'Hardware Supplier';
  if (/water damage|flood.*restor|flood.*mould|mould.*flood|mould.*remov|mold.*remov|fire damage.*restor|water.*restor|emergency.*restor|iicrc|decontaminat/.test(d)) return 'Water Damage & Restoration';
  if (/tree remov|tree.*service|arborist|stump grind/.test(d)) return 'Tree Services';
  if (/rubbish remov|waste remov|skip bin|junk remov/.test(d)) return 'Waste Removal';
  if (/render|plaster(?!.*board)/.test(d)) return 'Rendering & Plastering';
  if (/fitout|fit.out|shop.*fit|office.*fit/.test(d)) return 'Fitout';
  if (/deck.*install|deck.*build|decking|deck.*seal|deck.*coat|deck.*stain|deck.*restor|deck.*rescue|boardwalk|pergola|carport\b/.test(d)) return 'Decking & Pergolas';
  if (/\bpatio\b(?!.*concrete.*contractor|.*concrete.*specialist)/.test(d) && !/concret.*driv|driv.*concret/.test(d)) return 'Decking & Pergolas';
  if (/automatic.*gate|roller door|automated gate/.test(d)) return 'Automated Gates & Doors';
  if (/paving|asphalt|bitumen|driveway.*lay|driveway.*seal|kerbing/.test(d)) return 'Paving & Driveways';
  if (/underpinning|underpinn|grout.*inject|polyurethane.*inject|chemical.*grout|soil.*retention/.test(d)) return 'Underpinning';
  if (/reblock|restump/.test(d)) return 'Reblocking & Restumping';
  if (/lift.*install|lift.*service|lift.*maintenance|elevator|escalator|dumb.*waiter/.test(d)) return 'Lifts & Elevators';
  if (/skylight/.test(d)) return 'Skylights';
  if (/ceiling.*partition|suspended ceiling|wall.*partition|ceiling.*install/.test(d)) return 'Ceilings & Partitions';
  if (/line marking/.test(d)) return 'Line Marking';
  if (/protective coat|industrial coat|epoxy coat|anti-corrosion|coating.*service|coating.*specialist/.test(d)) return 'Protective Coatings';
  // KEY FIX: \broofing\b — "waterproofing" contains "roofing" as substring, word boundary prevents false match
  if (/\broofing\b|roof repair|roof restoration|roof.*specialist|metal roof|colorbond|reroofing|roof.*tile|tile.*roof|roof.*inspect/.test(d)) return 'Roofing';
  if (/gutter/.test(d)) return 'Gutters & Roofing';
  if (/tile.*grout|grout.*tile|tile.*restor|grout.*clean|tile.*clean/.test(d)) return 'Tiling';
  if (/carpet.*clean|cleaning.*company|cleaning.*service|pressure.*clean|exterior.*clean|window.*clean|commercial.*clean|strata.*clean/.test(d)) return 'Cleaning Services';
  if (/balcony.*leak|balcony.*waterproof|rising damp|damp.*solution|damp.*proof|sub.floor.*ventil/.test(d)) return 'Waterproofing';
  if (/pipe relining|pipe re-lining|pipeline.*relining/.test(d)) return 'Pipe Relining';
  if (/leak detection/.test(d)) return 'Leak Detection';
  if (/quantity surveyor|cost estimat|tax depreciation/.test(d)) return 'Quantity Surveying';
  if (/building certif|private certif|building.*permit|construction certificate/.test(d)) return 'Building Certification';
  if (/building.*pest inspect|pest.*building inspect/.test(d)) return 'Building & Pest Inspection';
  if (/building inspector|building inspection|property inspect|building.*consultant|dilapidation/.test(d)) return 'Building Inspection';
  if (/fire protection|fire sprinkler|fire safety|fire suppression|fire door|fire detection|fire alarm/.test(d)) return 'Fire Protection';
  if (/bal assessment|bushfire.*attack|bushfire.*manag|bushfire.*consult/.test(d)) return 'Bushfire Consulting';
  if (/cathodic.*protect|corrosion.*control|corrosion.*consult|galvani|corrosion.*special|marine.*corrosion|electrolysis.*specialist/.test(d)) return 'Corrosion Protection';
  if (/waterproof|damp/.test(d)) return 'Waterproofing';
  if (/rope access|abseiling|height safety|ewp hire|elevated work platform|roof access.*walkway|access.*hatch|fall.*arrest/.test(d)) return 'Rope Access & Height Safety';
  if (/scaffold/.test(d)) return 'Scaffolding';
  if (/facade|cladding|aluminium composite|acm panel/.test(d)) return 'Façade & Cladding';
  if (/air condition|hvac|heating and cooling|heating.*cooling|split system|home ventilation|ventilation.*system/.test(d)) return 'Air Conditioning / HVAC';
  if (/structural engineer|geotechnical|civil engineer|soil test/.test(d)) return 'Structural & Geotechnical Engineering';
  if (/architect\b|architectural design/.test(d)) return 'Architecture';
  if (/building designer|architectural drafting|building design|drafting service/.test(d)) return 'Building Design';
  if (/remedial build|remedial contractor|remedial specialist|building rectif|strata remediat/.test(d)) return 'Remedial Building';
  if (/blocked.*drain|drain.*clear|drain.*camera|drain.*pipe.*service|sewer.*repair|hot water.*system/.test(d)) return 'Plumbing';
  if (/plumb/.test(d)) return 'Plumbing';
  if (/solar.*install|solar.*panel|solar.*system|solar.*batter|solar.*power|solar.*energy/.test(d)) return 'Solar';
  if (/electrical|electrician/.test(d)) return 'Electrical';
  if (/epoxy floor|concrete.*floor.*coat|floor coating|concrete.*floor.*finish|floor.*sealer/.test(d)) return 'Epoxy & Concrete Flooring';
  if (/\broof\b/.test(d)) return 'Roofing';
  if (/tiling|tile.*install|tiler\b|regrouting|\bgrouting\b|tile.*grout|silicone.*replac/.test(d)) return 'Tiling';
  // Tile supplier/shop — entity type will set label to Flooring Supplier
  if (/\btile\b/.test(d)) return 'Tiling';
  if (/flooring|floor.*install|vinyl floor|timber floor|floor.*sand|floor.*polish|microcement/.test(d)) return 'Flooring';
  if (/insulation/.test(d)) return 'Insulation';
  if (/concrete.*repair|crack injection|concrete.*specialist|spalling/.test(d)) return 'Concrete Repairs';
  if (/concret|shotcrete|formwork/.test(d)) return 'Concrete';
  if (/bricklay|masonry|brickwork|tuckpoint|stone.*restor|repoint/.test(d)) return 'Bricklaying & Masonry';
  if (/balustrade|balustrading/.test(d)) return 'Balustrades';
  if (/window.*door|aluminium window|glass.*window/.test(d)) return 'Windows & Doors';
  // Glass & Glazing — also catch "glass" businesses that don't say "glazing" explicitly
  if (/glazing|glass.*install|glass.*supplier|\bglass\b.*replac|\bglass\b.*repair|glass.*aluminium|aluminium.*glass|\bglass\b/.test(d)) return 'Glass & Glazing';
  if (/steel fabricat|structural steel.*fabricat|fabricat.*steel|metal fabricat|welding.*fabricat|fabricat.*welding|\bwelding\b/.test(d)) return 'Steel Fabrication';
  if (/structural steel|steel.*frame|steel.*structure|steel.*building/.test(d)) return 'Steel Fabrication';
  if (/drainage|stormwater/.test(d)) return 'Drainage';
  if (/fencing|fence.*install/.test(d)) return 'Fencing';
  if (/landscap|garden design|turf.*install|green wall|grounds.*mainten/.test(d)) return 'Landscaping';
  if (/pool builder|swimming pool|pool.*construct/.test(d)) return 'Pool Building';
  if (/pest control|termite/.test(d)) return 'Pest Control';
  if (/security.*system|cctv|alarm.*install|access control/.test(d)) return 'Security Systems';
  if (/paint|decorat/.test(d)) return 'Painting & Decorating';
  if (/survey\b|surveying|cadastral|land.*survey/.test(d)) return 'Surveying';
  if (/strata manag|owners.*corporation/.test(d)) return 'Strata Management';
  if (/property manag/.test(d)) return 'Property Management';
  if (/project manag/.test(d)) return 'Project Management';
  if (/engineer/.test(d)) return 'Engineering';
  if (/carpentry|joinery|cabinet.*maker/.test(d)) return 'Carpentry & Joinery';
  if (/interior design/.test(d)) return 'Interior Design';
  if (/access.*consult|dda.*consult|disability.*access.*consult|access.*audit|universal design/.test(d)) return 'Access Consulting';
  if (/heritage.*consult|cultural heritage|aboriginal.*heritage/.test(d)) return 'Heritage Consulting';
  if (/high.rise.*mainten|building.*mainten|property.*mainten/.test(d)) return 'Building Maintenance';
  if (/home builder|house builder|custom home|luxury home/.test(d)) return 'Home Building';
  if (/renovation|extension/.test(d)) return 'Renovations & Extensions';
  if (/commercial construct|construction company|construction.*group|civil.*construct/.test(d)) return 'Commercial Construction';
  if (/town planning|urban.*planning|planning.*consult/.test(d)) return 'Town Planning';
  if (/building material|construction material|building supply/.test(d)) return 'Building Materials';
  if (/builder\b/.test(d)) return 'Building & Construction';
  return '';
}

// ── Best Directory Label ──────────────────────────────────────────────────────
function bestLabel(cat, etype, d) {
  const map = {
    'Remedial Building':           { contractor:'Remedial Building Contractor', consultant:'Building Inspector' },
    'Waterproofing':               { contractor:'Waterproofing Contractor', supplier:'Building Material Supplier', consultant:'Building Inspector' },
    'Concrete':                    { contractor:'Concrete Contractor', supplier:'Concrete Supplier', manufacturer:'Concrete Supplier' },
    'Concrete Repairs':            { contractor:'Concrete Repair Contractor', consultant:'Engineering Consultant' },
    'Façade & Cladding':           { contractor:'Façade Contractor', supplier:'Cladding Supplier', consultant:'Façade Consultant', manufacturer:'Cladding Supplier' },
    'Roofing':                     { contractor:'Roofing Contractor', supplier:'Building Material Supplier' },
    'Gutters & Roofing':           { contractor:'Guttering Contractor' },
    'Painting & Decorating':       { contractor:'Painting Contractor' },
    'Protective Coatings':         { contractor:'Protective Coatings Contractor', supplier:'Building Material Supplier' },
    'Epoxy & Concrete Flooring':   { contractor:'Epoxy Flooring Contractor' },
    'Tiling':                      { contractor:'Tiling Contractor', supplier:'Flooring Supplier', manufacturer:'Flooring Supplier' },
    'Flooring':                    { contractor:'Flooring Contractor', supplier:'Flooring Supplier', manufacturer:'Flooring Supplier' },
    'Rendering & Plastering':      { contractor:'Rendering Contractor' },
    'Ceilings & Partitions':       { contractor:'Ceilings & Partitions Contractor', supplier:'Building Material Supplier' },
    'Carpentry & Joinery':         { contractor:'Carpentry Contractor', supplier:'Joinery Supplier', manufacturer:'Joinery Supplier' },
    'Decking & Pergolas':          { contractor:'Decking Contractor', supplier:'Building Material Supplier' },
    'Fitout':                      { contractor:'Fitout Contractor' },
    'Bricklaying & Masonry':       { contractor:'Bricklaying Contractor', supplier:'Masonry Contractor' },
    'Balustrades':                 { contractor:'Balustrade Contractor', supplier:'Balustrade Supplier', manufacturer:'Balustrade Supplier' },
    'Windows & Doors':             { contractor:'Window & Door Manufacturer', supplier:'Window & Door Supplier', manufacturer:'Window & Door Manufacturer' },
    'Glass & Glazing':             { contractor:'Glazing Contractor', supplier:'Glass & Glazing Supplier', manufacturer:'Glass & Glazing Supplier' },
    'Steel Fabrication':           { contractor:'Steel Fabricator', supplier:'Steel Supplier', manufacturer:'Steel Supplier' },
    'Fire Protection':             { contractor:'Fire Services Contractor' },
    'Plumbing':                    { contractor:'Plumbing Contractor' },
    'Pipe Relining':               { contractor:'Pipe Relining Contractor' },
    'Electrical':                  { contractor:'Electrical Contractor' },
    'Solar':                       { contractor:'Solar Installer', supplier:'Solar Installer' },
    'Air Conditioning / HVAC':     { contractor:'HVAC Contractor', supplier:'HVAC Contractor' },
    'Scaffolding':                 { contractor:'Scaffolding Contractor', supplier:'Scaffolding Supplier', manufacturer:'Scaffolding Supplier' },
    'Rope Access & Height Safety': { contractor:'Rope Access Contractor', supplier:'Access Equipment Supplier' },
    'Underpinning':                { contractor:'Underpinning Contractor' },
    'Reblocking & Restumping':     { contractor:'Reblocking & Restumping Contractor' },
    'Lifts & Elevators':           { contractor:'Lifts & Escalators Contractor', supplier:'Lifts & Escalators Contractor' },
    'Demolition':                  { contractor:'Demolition Contractor', consultant:'Demolition Contractor' },
    'Basement Construction':       { contractor:'Commercial Builder', builder:'Commercial Builder' },
    'Corrosion Protection':        { contractor:'Corrosion Protection Specialist', consultant:'Corrosion Protection Specialist' },
    'Earthmoving & Excavation':    { contractor:'Earthmoving Contractor' },
    'Drainage':                    { contractor:'Drainage Contractor', supplier:'Building Material Supplier' },
    'Paving & Driveways':          { contractor:'Paving Contractor' },
    'Fencing':                     { contractor:'Fencing Contractor', supplier:'Building Material Supplier' },
    'Landscaping':                 { contractor:'Landscaping Contractor' },
    'Asbestos Removal':            { contractor:'Asbestos Removal Contractor' },
    'Caulking & Sealants':         { contractor:'Caulking & Sealant Contractor', supplier:'Building Material Supplier' },
    'Crane & Lifting':             { contractor:'Crane & Rigging Contractor', supplier:'Access Equipment Supplier' },
    'Skylights':                   { contractor:'Skylight Supplier', supplier:'Skylight Supplier', manufacturer:'Skylight Supplier' },
    'Leak Detection':              { contractor:'Leak Detection Specialist', consultant:'Leak Detection Specialist' },
    'Building Inspection':         { consultant:'Building Inspector', contractor:'Building Inspector' },
    'Building & Pest Inspection':  { consultant:'Building & Pest Inspector', contractor:'Building & Pest Inspector' },
    'Building Certification':      { consultant:'Building Certifier', contractor:'Building Certifier' },
    'Building Surveyor':           { consultant:'Building Inspector', contractor:'Building Inspector' },
    'Quantity Surveying':          { consultant:'Quantity Surveyor' },
    'Architecture':                { consultant:'Architect' },
    'Building Design':             { consultant:'Building Designer' },
    'Structural & Geotechnical Engineering': { consultant:'Structural Engineering Consultant', contractor:'Engineering Consultant' },
    'Engineering':                 { consultant:'Engineering Consultant', contractor:'Engineering Consultant' },
    'Strata Management':           { consultant:'Strata Management', contractor:'Strata Management' },
    'Property Management':         { consultant:'Property Manager', contractor:'Property Manager' },
    'Project Management':          { consultant:'Project Manager', contractor:'Project Manager' },
    'Cleaning Services':           { contractor:'Cleaning Contractor' },
    'Water Damage & Restoration':  { contractor:'Water Damage Restoration Contractor' },
    'Pest Control':                { contractor:'Pest Control Contractor' },
    'Security Systems':            { contractor:'Security Systems Contractor', supplier:'Security Systems Contractor' },
    'Insulation':                  { contractor:'Insulation Contractor', supplier:'Insulation Supplier', manufacturer:'Insulation Supplier' },
    'Pool Building':               { contractor:'Pool Builder' },
    'Environmental Consulting':    { consultant:'Environmental Consultant', contractor:'Environmental Consultant' },
    'Access Consulting':           { consultant:'Access Consultant' },
    'Heritage Consulting':         { consultant:'Heritage Consultant' },
    'Town Planning':               { consultant:'Town Planner' },
    'Bushfire Consulting':         { consultant:'Bushfire Consultant', contractor:'Bushfire Consultant' },
    'Home Building':               { builder:'Home Builder', contractor:'Home Builder' },
    'Commercial Construction':     { commercial_builder:'Commercial Builder', contractor:'Commercial Builder' },
    'Building & Construction':     { builder:'Home Builder', commercial_builder:'Commercial Builder', contractor:'General Building Services' },
    'Renovations & Extensions':    { contractor:'Renovation Contractor', builder:'Renovation Contractor' },
    'Building Maintenance':        { contractor:'Building Maintenance Contractor' },
    'Building Materials':          { supplier:'Building Material Supplier', manufacturer:'Building Material Supplier' },
    'Hardware Supplier':           { supplier:'Hardware Supplier', manufacturer:'Hardware Supplier' },
    'Waste Removal':               { contractor:'General Building Services' },
    'Fitout':                      { contractor:'Fitout Contractor' },
    'Tree Services':               { contractor:'Tree Services Contractor' },
    'Surveying':                   { consultant:'Quantity Surveyor', contractor:'Quantity Surveyor' },
    'Interior Design':             { consultant:'Interior Designer', contractor:'Interior Designer' },
    'Blinds & Window Furnishings': { contractor:'Building Maintenance Contractor', supplier:'Building Material Supplier', manufacturer:'Building Material Supplier' },
    'Automated Gates & Doors':     { contractor:'Garage Door Contractor', supplier:'Building Material Supplier' },
    'Line Marking':                { contractor:'Paving Contractor' },
    'Energy Efficiency':           { consultant:'Building Designer', contractor:'Building Designer' },
    'Building & Construction':     { builder:'Home Builder', commercial_builder:'Commercial Builder', contractor:'General Building Services' },
    'Paving & Driveways':          { contractor:'Paving Contractor' },
  };

  const catMap = map[cat];
  if (catMap) {
    const label = catMap[etype] || catMap['contractor'] || catMap['consultant'] || Object.values(catMap)[0];
    if (label) return label;
  }
  if (etype === 'consultant') return 'General Building Services';
  if (etype === 'supplier' || etype === 'manufacturer') return 'Building Material Supplier';
  return 'General Building Services';
}

// ── Subcategory ───────────────────────────────────────────────────────────────
function subCategory(cat, d) {
  const checks = [
    [/torch.on|torch applied/,          'Torch-on membrane waterproofing'],
    [/below.*ground|basement.*waterp/,   'Below-ground & basement waterproofing'],
    [/balcony.*waterp|waterp.*balcony/,  'Balcony & wet area waterproofing'],
    [/shower.*waterp|wet.*area/,         'Wet area & shower waterproofing'],
    [/rising damp|damp.*proof/,          'Damp proofing & rising damp treatment'],
    [/roof.*waterp/,                     'Roof waterproofing'],
    [/crack.*inject|inject.*crack|epoxy.*inject/, 'Crack injection & structural repair'],
    [/shotcrete|shotcreting/,            'Shotcrete & sprayed concrete'],
    [/formwork/,                         'Formwork & slab construction'],
    [/concrete.*pump/,                   'Concrete pumping'],
    [/concrete.*polish|polished.*concrete/, 'Polished concrete'],
    [/precast/,                          'Precast concrete products'],
    [/aluminium composite|acm panel/,    'Aluminium composite panel cladding'],
    [/frp|grc/,                          'FRP / GRC facade systems'],
    [/glass.*curtain|curtain.*wall/,     'Curtain wall & glazed facades'],
    [/render.*facade|facade.*render/,    'Rendered facade systems'],
    [/metal roof|colorbond/,             'Metal & Colorbond roofing'],
    [/tile.*roof|roof.*tile/,            'Roof tiling'],
    [/torch.on.*roof|roof.*membrane/,    'Torch-on & membrane roofing'],
    [/roof.*restor/,                     'Roof restoration & coating'],
    [/industrial.*paint|protective.*coat/, 'Industrial & protective coatings'],
    [/residential.*paint/,               'Residential painting'],
    [/commercial.*paint/,                'Commercial painting'],
    [/epoxy.*floor|floor.*epoxy/,        'Epoxy floor coatings'],
    [/timber.*floor|hardwood.*floor/,    'Timber & hardwood flooring'],
    [/vinyl.*floor|lvt|spc floor/,       'Vinyl & LVT flooring'],
    [/carpet/,                           'Carpet supply & installation'],
    [/floor.*sand|floor.*polish/,        'Floor sanding & polishing'],
    [/microcement|micro.*cement/,        'Microcement flooring'],
    [/geotechnical|soil.*test/,          'Geotechnical & soil investigation'],
    [/structural.*assess/,               'Structural assessment & reporting'],
    [/structural.*design/,               'Structural design & documentation'],
    [/solar.*battery|battery.*solar/,    'Solar & battery storage'],
    [/commercial.*solar/,                'Commercial solar'],
    [/residential.*solar/,               'Residential solar'],
    [/stainless.*steel/,                 'Stainless steel fabrication'],
    [/structural.*steel/,                'Structural steel supply & fabrication'],
    [/steel.*frame/,                     'Steel framing systems'],
    [/welding/,                          'Welding & metal fabrication'],
    [/pool.*tiling|tiling.*pool/,        'Pool tiling'],
    [/large.*format|rectified.*tile/,    'Large format & rectified tiling'],
    [/tile.*grout|grout.*restor/,        'Grout & tile restoration'],
    [/blocked.*drain|drain.*camera/,     'Blocked drains & drain camera inspection'],
    [/hot water/,                        'Hot water system installation & repair'],
    [/gas/,                              'Gas fitting & appliance installation'],
  ];

  for (const [re, label] of checks) {
    if (re.test(d)) return label;
  }

  const fallbacks = {
    'Waterproofing':       'General waterproofing services',
    'Concrete':            'Concrete supply & placement',
    'Concrete Repairs':    'Concrete remediation & crack repairs',
    'Roofing':             'Roofing installation & repair',
    'Painting & Decorating': 'Interior & exterior painting',
    'Tiling':              'Floor & wall tiling',
    'Flooring':            'Flooring supply & installation',
    'Rendering & Plastering': 'External rendering & internal plastering',
    'Steel Fabrication':   'Custom steel fabrication',
    'Plumbing':            'Plumbing installation & repairs',
    'Electrical':          'Electrical installation & maintenance',
    'Air Conditioning / HVAC': 'HVAC installation & servicing',
    'Solar':               'Solar panel installation',
    'Scaffolding':         'Scaffolding hire & erection',
    'Landscaping':         'Landscape design & construction',
    'Cleaning Services':   'Commercial & residential cleaning',
    'Building Inspection': 'Independent building inspections',
    'Structural & Geotechnical Engineering': 'Structural engineering consultancy',
    'Strata Management':   'Owners corporation management',
    'Façade & Cladding':   'External facade & cladding systems',
    'Remedial Building':   'Remedial building & structural repair',
  };
  return fallbacks[cat] || '';
}

// ── Secondary tags ────────────────────────────────────────────────────────────
function secondaryTags(cat, d) {
  const tags = new Set();
  const add  = (cond, tag) => { if (cond) tags.add(tag); };

  add(/waterproof/.test(d),                  'Waterproofing');
  add(/concrete/.test(d),                    'Concrete');
  add(/structural.*repair|crack.*repair/.test(d), 'Structural Repairs');
  add(/remedial/.test(d),                    'Remedial Works');
  add(/strata\b/.test(d),                    'Strata');
  add(/commercial/.test(d),                  'Commercial');
  add(/residential/.test(d),                 'Residential');
  add(/industrial/.test(d),                  'Industrial');
  add(/\broofing\b|roof\b/.test(d),          'Roofing');
  add(/scaffold/.test(d),                    'Scaffolding');
  add(/facade|cladding/.test(d),             'Façade & Cladding');
  add(/balcony/.test(d),                     'Balconies');
  add(/paint/.test(d),                       'Painting');
  add(/tiling|tile/.test(d),                 'Tiling');
  add(/flooring/.test(d),                    'Flooring');
  add(/render/.test(d),                      'Rendering');
  add(/plaster/.test(d),                     'Plastering');
  add(/electrical/.test(d),                  'Electrical');
  add(/plumb/.test(d),                       'Plumbing');
  add(/hvac|air condition/.test(d),          'HVAC');
  add(/solar/.test(d),                       'Solar');
  add(/fire.*safety|fire.*protect/.test(d),  'Fire Safety');
  add(/asbestos/.test(d),                    'Asbestos');
  add(/glass|glazing/.test(d),               'Glazing');
  add(/steel/.test(d),                       'Steel');
  add(/insulation/.test(d),                  'Insulation');
  add(/epoxy/.test(d),                       'Epoxy Coatings');
  add(/inspect/.test(d),                     'Inspections');
  add(/certif/.test(d),                      'Certification');
  add(/engineer/.test(d),                    'Engineering');
  add(/heritage/.test(d),                    'Heritage');
  add(/high.rise|highrise/.test(d),          'High-Rise');
  add(/new build|new construction/.test(d),  'New Construction');
  add(/repair/.test(d),                      'Repairs');
  add(/maintenance/.test(d),                 'Maintenance');
  add(/design/.test(d),                      'Design');
  add(/suppli/.test(d),                      'Supply');
  add(/government/.test(d),                  'Government Projects');
  add(/aged care/.test(d),                   'Aged Care');
  add(/education|school/.test(d),            'Education Sector');
  add(/hospital|health/.test(d),             'Healthcare Sector');

  tags.delete(cat);
  return [...tags].slice(0, 6).join(', ');
}

// ── Full classifier ───────────────────────────────────────────────────────────
function classify(name, desc) {
  if (!desc || !desc.trim()) return null;
  const d = desc.toLowerCase();

  const etype = entityType(d);
  const cat   = mainCategory(d);
  const label = cat ? bestLabel(cat, etype, d) : (etype === 'supplier' ? 'Building Material Supplier' : 'General Building Services');
  const sub   = cat ? subCategory(cat, d) : '';
  const tags  = secondaryTags(cat, d);
  const areas = extractServiceAreas(desc);

  return {
    'Main Category':        cat || 'General Building Services',
    'Subcategory':          sub,
    'Best Directory Label': label,
    'Secondary Tags':       tags,
    'Service Areas':        areas,
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────
function main() {
  const wb   = XLSX.readFile(FILE);
  const ws   = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
  console.log(`Loaded ${rows.length} rows`);

  const classifyCols = ['Main Category','Subcategory','Best Directory Label','Secondary Tags','Service Areas'];

  // Build column order — keep existing, insert new cols after 'Category (Web)'
  const existingCols = Object.keys(rows[0]);
  const toAdd = classifyCols.filter(c => !existingCols.includes(c));
  const insertAfter = 'Category (Web)';
  const insertIdx = existingCols.indexOf(insertAfter);
  let ordered;
  if (insertIdx >= 0) {
    ordered = [
      ...existingCols.slice(0, insertIdx + 1),
      ...toAdd,
      ...existingCols.slice(insertIdx + 1).filter(c => !toAdd.includes(c)),
    ];
  } else {
    ordered = [...existingCols, ...toAdd];
  }

  let classified = 0, skipped = 0;

  // In test mode: first 50 rows WITH descriptions
  let targets = rows.filter(r => (r['Verified Business Type (Web)'] || '').trim());
  if (TEST_MODE) {
    targets = targets.slice(0, 50);
    console.log(`TEST MODE — first 50 rows with descriptions (read-only, no file write)\n`);
  } else if (LIMIT) {
    targets = targets.slice(0, LIMIT);
    console.log(`LIMIT MODE — processing first ${LIMIT} rows with descriptions`);
  }

  targets.forEach(row => {
    const desc = (row['Verified Business Type (Web)'] || '').trim();
    if (!desc) { skipped++; return; }
    if (!FORCE && !TEST_MODE && (row['Best Directory Label'] || '').trim()) { skipped++; return; }

    const result = classify(row.name, desc);
    if (!result) { skipped++; return; }

    if (!TEST_MODE) {
      // Write all 5 classification columns
      classifyCols.forEach(col => { row[col] = result[col] || ''; });
      // Also write Best Directory Label into "Trade (from Name)" (col D)
      row['Trade (from Name)'] = result['Best Directory Label'] || '';
    }

    classified++;

    if (TEST_MODE) {
      console.log(`[${classified}] ${row.name}`);
      console.log(`  Desc:  ${desc.slice(0, 100)}`);
      console.log(`  Cat:   ${result['Main Category']}`);
      console.log(`  Sub:   ${result['Subcategory'] || '—'}`);
      console.log(`  Label: ${result['Best Directory Label']}`);
      console.log(`  Tags:  ${result['Secondary Tags'] || '—'}`);
      console.log(`  Areas: ${result['Service Areas'] || '—'}`);
      console.log('');
    }
  });

  if (TEST_MODE) {
    console.log(`\n── Test complete: ${classified} rows shown ──`);
    console.log(`Run without --test (add --force to re-classify already done rows) to write to file.`);
    if (SUGGESTED_LABELS.length) {
      console.log(`\nNew labels suggested (not added): ${SUGGESTED_LABELS.map(s => s.label).join(', ')}`);
    }
    return;
  }

  // Save to file
  const reordered = rows.map(row => {
    const obj = {};
    ordered.forEach(k => { obj[k] = row[k] ?? ''; });
    return obj;
  });
  const wsNew = XLSX.utils.json_to_sheet(reordered, { header: ordered });
  const colWidths = {};
  reordered.forEach(row => {
    ordered.forEach(k => {
      colWidths[k] = Math.max(colWidths[k] || k.length, String(row[k] || '').length);
    });
  });
  wsNew['!cols'] = ordered.map(k => ({ wch: Math.min(colWidths[k] || 10, 80) }));
  const wbNew = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wbNew, wsNew, 'Directory');
  XLSX.writeFile(wbNew, FILE);

  console.log(`\nClassified: ${classified} | Skipped: ${skipped}`);
  console.log(`Saved to: ${FILE}`);
  if (SUGGESTED_LABELS.length) {
    console.log(`\nNew label suggestions for review:\n${SUGGESTED_LABELS.map(s => `  ${s.label} — ${s.reason}`).join('\n')}`);
  }
}

main();
