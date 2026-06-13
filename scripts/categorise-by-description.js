/**
 * Reads the Desktop Excel, removes "Trade (from Name)" column,
 * adds a "Category (Web)" column based on the web description,
 * then sorts: rows with a description first, blank descriptions last.
 */

const XLSX = require('xlsx');
const path = require('path');
const os   = require('os');

const FILE = path.join(os.homedir(), 'Desktop', 'RBA_Directory_2026-06-12.xlsx');

// ── Category logic ────────────────────────────────────────────────────────────
function categorise(desc) {
  if (!desc || !desc.trim()) return '';
  const d = desc.toLowerCase();

  // ── Supplier / manufacturer / wholesaler detection ─────────────────────────
  // Check AFTER we know the trade — but flag supply-only vs install
  const supplyOnly = (
    /\bwholesale\b/.test(d) ||
    /\bdistributor\b/.test(d) ||
    /\bmanufactur/.test(d) ||
    (/\bsupplier\b/.test(d) && !/supply and install|supply & install|supply,\s*install/.test(d))
  );

  // Helper: returns "Supplier — <type>" when trade + supply-only context matches
  function sup(label) { return supplyOnly ? `Supplier — ${label}` : label; }

  // ── Specific trades (order matters — most specific first) ──────────────────

  if (/asbestos remov|asbestos test|asbestos survey|asbestos manag|asbestos.*consult|hazardous material/.test(d))
    return 'Asbestos Removal';

  if (/caulk|sealant.*service|sealing.*specialist|caulking.*specialist|joint.*seal|joint sealing/.test(d))
    return 'Caulking & Sealants';

  if (/earthmov|excavat|earth.*work|bulk.*excavat/.test(d))
    return 'Earthmoving & Excavation';

  if (/crane.*hire|crane.*service|crane.*rental|lifting.*solution|rigging.*service/.test(d))
    return 'Crane & Lifting';

  if (/blind\b|blinds\b|curtain\b|shutter.*window|window.*shutter|awning\b|awnings\b/.test(d))
    return 'Blinds & Window Furnishings';

  if (/basement.*construct|basement.*build|basement.*solution/.test(d))
    return 'Basement Construction';

  if (/building.*surveyor|building surveyor|building.*survey.*professional/.test(d))
    return 'Building Surveyor';

  if (/basix|section j\b|thermal.*assessment|energy.*rating.*build|nabers.*assess/.test(d))
    return 'Energy Efficiency';

  if (/hardware.*store|hardware.*supply|mitre 10|bunnings/.test(d))
    return 'Hardware Supplier';

  if (/water damage|flood damage|flood.*restor|mould.*remov|mold.*remov|fire damage.*restor|smoke damage|disaster restor|water.*restor|iicrc|restor.*service.*specialist|emergency.*restor|decontaminat/.test(d))
    return 'Water Damage & Restoration';

  if (/tree remov|tree.*service|tree.*lopping|tree.*prun|arborist|tree.*cutting|tree.*surgeon|tree.*trim|stump grind/.test(d))
    return 'Tree Services / Arborist';

  if (/rubbish remov|waste remov|skip bin|rubbish.*hire|junk remov/.test(d))
    return 'Waste & Rubbish Removal';

  if (/render|plaster/.test(d))
    return 'Rendering & Plastering';

  if (/fitout|fit.out|shop.*fit|office.*fit|store.*fit|commercial.*interior.*fit/.test(d))
    return 'Fitout';

  if (/deck.*install|deck.*build|decking.*specialist|deck.*restor|deck.*seal|deck.*care|deck.*stain|deck.*coat|boardwalk|pergola|carport\b|patio\b|patios\b|enclosure.*build/.test(d))
    return 'Decking & Pergolas';

  if (/automatic.*gate|automated gate|gate.*automat|gate.*motor|automatic.*door.*entrance|roller door/.test(d))
    return 'Automated Gates & Doors';

  if (/glass.*repair|glass.*replac|windscreen|window.*repair|glass.*product|glass.*specialist/.test(d))
    return 'Glass & Glazing';

  if (/paving|hardstand|bitumen.*spray|asphalt.*lay|asphalt.*repair|asphalt.*crack|crack.*seal|driveway.*lay|driveway.*seal|bituminous|kerbing/.test(d))
    return 'Paving & Driveways';

  if (/underpinning|underpinn/.test(d))
    return 'Underpinning';

  if (/reblock|restump/.test(d))
    return 'Reblocking & Restumping';

  if (/\blift\b.*install|lift.*service.*company|lift.*maintenance|lift.*modernisa|lift.*refurb|lift.*company|home.*lift\b|residential.*lift|\belevator\b|\bescalator\b|dumb.*waiter|service.*lift/.test(d))
    return 'Lifts & Elevators';

  if (/skylight/.test(d))
    return 'Skylights';

  if (/ceiling.*partition|partition.*ceiling|suspended ceiling|ceiling.*tile|wall.*partition|ceiling.*contractor|ceiling.*install|ceiling.*specialist/.test(d))
    return 'Ceilings & Partitions';

  if (/mezzanine/.test(d))
    return 'Mezzanine';

  if (/line marking|linemar/.test(d))
    return 'Line Marking';

  if (/protective coat|industrial coat|epoxy coat|anti-corrosion|surface.*coat|abrasion.*coat|coating.*service|coating.*specialist|coating.*applic|residential.*coating|commercial.*coating/.test(d))
    return 'Protective Coatings';

  if (/carpet.*clean|upholstery.*clean|a.*full.*service.*clean|cleaning.*company|cleaning.*provider|cleaning.*specialist|cleaning.*service/.test(d))
    return 'Cleaning Services';

  if (/balcony.*leak|balcony.*repair|balcony.*waterproof/.test(d))
    return 'Waterproofing';

  if (/steel.*post|steel.*product|metal.*building product|aluminium.*product|aluminum.*product/.test(d))
    return sup('Metal Products');

  if (/carpenter\b/.test(d))
    return 'Carpentry & Joinery';

  if (/pipe relining|pipe re-lining/.test(d))
    return 'Pipe Relining';

  if (/leak detection/.test(d))
    return 'Leak Detection';

  if (/quantity surveyor|cost estimat|tax depreciation schedule|insurance valuation/.test(d))
    return 'Quantity Surveying';

  if (/building certif|private certif|building.*permit.*certif|construction certificate|certifying.*building|building.*approv.*authority/.test(d))
    return 'Building Certifier';

  if (/building.*pest inspect|pest.*building inspect/.test(d))
    return 'Building & Pest Inspection';

  if (/building inspector|building inspection|property inspect|building.*consultant|pre.purchase.*inspect|dilapidation.*report/.test(d))
    return 'Building Inspection';

  if (/fire protection|fire sprinkler|fire safety|fire suppression|fire extinguish|fire compliance|fire hydrant|fire detection|fire alarm|fire & life safety|fire and life safety|fire.*door|fire.*rated.*door|smoke.*door/.test(d))
    return 'Fire Protection';

  if (/bal assessment|bushfire.*attack|bushfire.*manag|bushfire.*plan|bushfire.*consult|bushfire.*risk|bushfire.*assess/.test(d))
    return 'Bushfire Consulting';

  if (/cathodic.*protect|direct.*cp\b|corrosion.*control|corrosion.*consult|corrosion.*manag|corrosion.*special|hot.dip galvani|\bgalvanising\b|\bgalvanizing\b/.test(d))
    return 'Corrosion Protection';

  if (/rising damp|damp.*solution|damp.*proof|damp.*treat|damp.*remediat|damp.*specialist|damp.*control|damp.*problem|sub.floor.*ventil|subfloor.*ventil/.test(d))
    return 'Waterproofing';

  if (/waterproof/.test(d))
    return sup('Waterproofing');

  if (/rope access|abseiling|abseil\b|height safety|ewp hire|elevated work platform|vertical access/.test(d))
    return 'Rope Access & Height Safety';

  if (/scaffold/.test(d))
    return sup('Scaffolding');

  if (/facade|cladding|alucobond|alpolic|vitrabond|composite panel|aluminium composite|acm panel|frp panel/.test(d))
    return sup('Facade & Cladding');

  if (/air condition|hvac|heating and cooling|heating & cooling|ducted.*(air|cool|heat)|split system|refrigeration.*trade|commercial refrigerat|\bhome ventilation\b|ventilation.*system|ventilation.*solution/.test(d))
    return 'Air Conditioning / HVAC';

  if (/structural engineer|structural.*assessment|structural.*design|geotechnical|civil engineer|pavement engineer|soil test/.test(d))
    return 'Structural & Geotechnical Engineering';

  if (/architect\b|architectural design/.test(d))
    return 'Architect';

  if (/building designer|architectural drafting|building design|drafting service|bim drafting|3d model/.test(d))
    return 'Building Designer / Drafter';

  if (/remedial build|remedial contractor|remedial specialist|building rectif|building rectification|building repair.*specialist|strata remediat|structural.*repair.*conserv|conservation.*build.*restor|speciali.*assess.*repair.*protect/.test(d))
    return 'Remedial Builder';

  if (/blocked.*drain|drain.*block|drain.*camera|sewer.*repair|hot water.*system|hot water.*install|hot water.*service|hot water.*speciali/.test(d))
    return 'Plumbing';

  if (/plumb/.test(d))
    return 'Plumbing';

  if (/electrical|electrician/.test(d))
    return 'Electrical';

  if (/paint|decorat/.test(d))
    return 'Painting & Decorating';

  if (/epoxy floor|concrete coating|concrete.*floor.*coat|floor coating/.test(d))
    return 'Epoxy & Concrete Flooring';

  if (/roofing|roof repair|roof restoration|roof.*specialist|metal roof|colorbond roof|roof.*til|roof.*inspect/.test(d))
    return 'Roofing';

  if (/gutter/.test(d))
    return 'Gutters & Roofing';

  if (/tiling|tile.*install|tile.*specialist|tiler\b|regrouting|regrout|\bgrouting\b|grout.*restor|tile.*grout|silicone.*replac|grout.*replac|tile.*inject|drummy.*tile|loose.*tile/.test(d))
    return 'Tiling';

  if (/flooring|floor.*install|vinyl floor|timber floor|carpet|floor.*sand|floor.*polish|microcement|micro.*cement/.test(d))
    return sup('Flooring');

  if (/insulation/.test(d))
    return sup('Insulation');

  if (/concrete.*repair|concrete.*rectif|crack injection|concrete.*specialist|spalling|concrete.*remedi/.test(d))
    return 'Concrete Repairs';

  if (/concret|shotcrete|shotcreting|\bformwork\b/.test(d))
    return 'Concrete';

  if (/bricklay|brick.*mason|blocklay|masonry|brickwork|brick.*work|brick.*repair|brick.*restor|limestone.*repair|tuckpoint|stone.*restor|stone.*repair|stone.*repoin|repoint/.test(d))
    return 'Bricklaying & Masonry';

  if (/balustrade|balustrading/.test(d))
    return sup('Balustrades');

  if (/window.*door|door.*window|aluminium window|aluminum window|glass.*window|window.*glaz/.test(d))
    return sup('Windows & Doors');

  if (/glazing|glass.*install|glass.*supplier|glass.*specialist/.test(d))
    return sup('Glass & Glazing');

  if (/garage door/.test(d))
    return 'Garage Doors';

  if (/steel fabricat|structural steel|metal fabricat|\bwelding\b|weld.*service|weld.*fabricat|steel.*frame.*build|steel.*framing/.test(d))
    return sup('Steel Fabrication');

  if (/sandblasting|abrasive blast|powder coating|protective coat|industrial coat/.test(d))
    return 'Sandblasting & Protective Coatings';

  if (/demolition|deconstruct/.test(d))
    return 'Demolition';

  if (/drainage|drain.*install|stormwater/.test(d))
    return sup('Drainage');

  if (/fencing|fence.*install|fence.*contractor/.test(d))
    return sup('Fencing');

  if (/landscap|garden design|garden.*construct|turf.*install|lawn.*install|green wall|vertical.*garden|roof.*garden/.test(d))
    return 'Landscaping';

  if (/irrigation/.test(d))
    return 'Irrigation';

  if (/pool builder|swimming pool|pool.*construct/.test(d))
    return 'Pool Builder';

  if (/pest control|termite/.test(d))
    return 'Pest Control';

  if (/security.*system|cctv|alarm.*install|access control|security.*integrat|security.*company|security.*service|commercial.*alarm|residential.*alarm/.test(d))
    return 'Security Systems';

  if (/solar.*install|solar.*panel|solar.*system|solar.*batter|battery.*solar|solar.*power|solar.*energy|energy.*storage.*solar|home.*solar/.test(d))
    return 'Solar';

  if (/locksmith/.test(d))
    return 'Locksmith';

  if (/window cleaning/.test(d))
    return 'Window Cleaning';

  if (/commercial cleaning|office cleaning|strata.*cleaning|end of lease|bond cleaning|pressure cleaning|exterior cleaning|building.*cleaning/.test(d))
    return 'Cleaning Services';

  if (/stone.*supply|natural stone|limestone.*supply|sandstone.*supply/.test(d))
    return sup('Stone & Masonry');

  if (/timber.*suppli|timber.*merchant|timber.*dealer|timber.*product|hardwood.*deck/.test(d))
    return sup('Timber');

  if (/mechanical.*ventilation|ventilation.*design|mechanical.*design|mechanical.*engineer|hvac.*design/.test(d))
    return 'HVAC / Mechanical Engineering';

  if (/generator.*hire|plant.*hire|equipment.*hire|site.*office.*hire|portable.*building|transportable.*building/.test(d))
    return 'Equipment & Plant Hire';

  if (/fabrication|cnc.*profile|bespoke.*fabricat/.test(d))
    return sup('Metal Fabrication');

  if (/survey\b|surveying|cadastral|land.*survey/.test(d))
    return 'Surveying';

  if (/environmental.*consult|environmental.*assess|environmental.*manage|occupational.*hygiene|environmental.*audit/.test(d))
    return 'Environmental Consulting';

  if (/building material|construction material|building supply/.test(d))
    return sup('Building Materials');

  if (/carpet|flooring.*supply/.test(d))
    return sup('Flooring');

  if (/strata manag|strata.*service|strata.*compli|strata.*council/.test(d))
    return 'Strata Management';

  if (/property manag/.test(d))
    return 'Property Management';

  if (/project manag/.test(d))
    return 'Project Management';

  if (/engineer/.test(d))
    return 'Engineering Consultants';

  if (/consultant\b/.test(d))
    return 'Consultants';

  if (/carpentry|joinery|cabinet.*maker|cabinet.*install|carpenter\b/.test(d))
    return 'Carpentry & Joinery';

  if (/interior design/.test(d))
    return 'Interior Design';

  if (/energy effic|energy audit|veu rebate|energy.*saving|green.*build|sustainable.*build|passive.*house|passive.*design/.test(d))
    return 'Energy Efficiency';

  if (/town planning|urban.*planning|planning.*consultanc|planning.*consult/.test(d))
    return 'Town Planning';

  if (/access.*consult|dda.*consult|disability.*access|universal design/.test(d))
    return 'Access Consulting';

  if (/heritage.*consult|cultural heritage|indigenous.*heritage|aboriginal.*heritage/.test(d))
    return 'Heritage Consulting';

  if (/high.rise.*maintenance|highrise.*maintenance|building.*maintenance|property.*maintenance/.test(d))
    return 'Building Maintenance';

  if (/home builder|house builder|custom home|luxury home|new home.*build|build.*new home/.test(d))
    return 'Home Builder';

  if (/renovation|extension|home extension/.test(d))
    return 'Renovations & Extensions';

  if (/commercial construct|construction company|construction.*group|construction.*project|government.*construct|insurance.*repair.*specialist|building contractor|civil.*construct/.test(d))
    return 'Commercial Construction';

  if (/builder\b|build.*home|home.*build|dream.*home|custom.*build|build.*quality/.test(d))
    return 'Builder / Construction';

  if (/maintenance service|property maintenance|building maintenance/.test(d))
    return 'Building Maintenance';

  if (supplyOnly)
    return 'Building Supplier';

  return '';
}

// ── Main ──────────────────────────────────────────────────────────────────────
function main() {
  const wb   = XLSX.readFile(FILE);
  const ws   = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

  console.log(`Loaded ${rows.length} rows`);

  // New column order: remove "Trade (from Name)", add "Category (Web)" after description col
  const keep    = ['id','name','category','Verified Business Type (Web)','Category (Web)'];
  const rest    = Object.keys(rows[0]).filter(k =>
    !keep.includes(k) && k !== 'Trade (from Name)'
  );
  const ordered = [...keep, ...rest];

  let categorised = 0;

  rows.forEach(row => {
    const desc = (row['Verified Business Type (Web)'] || '').trim();
    const cat  = categorise(desc);
    row['Category (Web)'] = cat;
    if (cat) categorised++;
  });

  console.log(`Categorised: ${categorised} / ${rows.length}`);

  // Sort:
  //   1. Has category → sorted by Category then Name
  //   2. Has description but no category → sorted by Name
  //   3. No description → bottom, sorted by Name
  function rowTier(r) {
    if ((r['Category (Web)'] || '').trim()) return 0;      // categorised
    if ((r['Verified Business Type (Web)'] || '').trim()) return 1; // desc only
    return 2;                                               // nothing
  }
  rows.sort((a, b) => {
    const ta = rowTier(a), tb = rowTier(b);
    if (ta !== tb) return ta - tb;
    if (ta === 0) {
      const catCmp = a['Category (Web)'].localeCompare(b['Category (Web)']);
      if (catCmp !== 0) return catCmp;
    }
    return (a.name || '').localeCompare(b.name || '');
  });

  const reordered = rows.map(row => {
    const obj = {};
    ordered.forEach(k => { obj[k] = row[k] ?? ''; });
    return obj;
  });

  const wsNew = XLSX.utils.json_to_sheet(reordered);

  // Column widths
  const colWidths = {};
  reordered.forEach(row => {
    Object.keys(row).forEach(k => {
      colWidths[k] = Math.max(colWidths[k] || k.length, String(row[k] || '').length);
    });
  });
  wsNew['!cols'] = ordered.map(k => ({ wch: Math.min(colWidths[k] || 10, 80) }));

  const wbNew = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wbNew, wsNew, 'Directory');
  XLSX.writeFile(wbNew, FILE);

  console.log(`Done. Saved to: ${FILE}`);

  // Summary of categories assigned
  const tally = {};
  rows.forEach(r => {
    const c = r['Category (Web)'] || '(uncategorised)';
    tally[c] = (tally[c] || 0) + 1;
  });
  const sorted = Object.entries(tally).sort((a,b) => b[1]-a[1]);
  console.log('\nTop categories:');
  sorted.slice(0, 30).forEach(([cat, n]) => console.log(`  ${n.toString().padStart(4)}  ${cat}`));
}

main();
