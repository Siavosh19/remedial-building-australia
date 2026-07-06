import fs from 'fs';
const DUR = '/Users/siasepehrara/Desktop/RBA_New_Businesses_From_Web/_source_json';

// Targeted categories the user flagged as missing — id maps to the real DB category,
// name is an ENRICHED search label (synonyms) to maximise yield.
const BATCH = [
  { id: 311,  name: "Fire Engineer / Fire Safety Engineer / Fire Engineering Consultant" },
  { id: 308,  name: "Hydraulic Engineer / Hydraulic Services Engineer / Hydraulic Design Consultant" },
  { id: 309,  name: "Mechanical Engineer / Mechanical Services Engineer / HVAC Engineer" },
  { id: 312,  name: "Acoustic Engineer / Acoustic Consultant / Noise & Vibration Consultant" },
  { id: 310,  name: "Electrical Engineer / Electrical Services Engineer / Electrical Design Consultant" },
  { id: 304,  name: "Civil Engineer / Civil Engineering Consultant" },
  { id: 527,  name: "Stormwater Engineer / Stormwater Design Consultant / Stormwater Drainage Engineer" },
  { id: 2143, name: "Consulting Arborist / Arboricultural Consultant / Tree Report / Arborist" },
  { id: 417,  name: "Timber Window Manufacturer / Timber Window Supplier / Timber Joinery Windows" },
  { id: 418,  name: "Timber Window Restoration / Sash Window Restoration / Timber Window Repair" },
  { id: 419,  name: "Heritage Window Specialist / Heritage Timber Windows / Heritage Window Restoration" },
  { id: 416,  name: "Window Replacement / Window Installation Company / Window Installer" },
  { id: 2250, name: "Window & Door Installation / Window Supply & Install / Window Installation Pty Ltd" },
];

const batchJson = JSON.stringify(BATCH);
const durJson = JSON.stringify(DUR);
const waveJs = `export const meta = {
  name: 'directory-targeted-research-wave',
  description: 'Targeted wave (big-city focus): engineers + timber-window businesses for ${BATCH.length} categories',
  phases: [{ title: 'Research' }],
}
const BATCH = ${batchJson};
const DUR = ${durJson};
phase('Research')
function makePrompt(c) {
  var L = [];
  L.push('Research real, currently-operating AUSTRALIAN businesses for a remedial-building trade directory.');
  L.push('');
  L.push('CATEGORY LABEL: "' + c.name + '" (slash-separated trade terms — use them as your search queries).');
  L.push('');
  L.push('FOCUS ON THE BIG APARTMENT / STRATA CITIES where remedial building work is concentrated. Search the trade terms combined with these metros (priority order): Sydney, Melbourne, Brisbane, Gold Coast, Perth, Adelaide, Canberra — plus Newcastle, Wollongong, Sunshine Coast. DO NOT spend effort on regional/rural towns.');
  L.push('');
  L.push('GOAL: find genuine Australian businesses in THIS trade operating in those cities (aim 12-18 good ones). Capture as much contact detail as possible, but BE TOKEN-EFFICIENT: a focused set of searches, only fetch the most relevant business sites.');
  L.push('');
  L.push('METHOD: web-search to discover names; aggregators (Yellowpages/Oneflare/Hipages/Google) ONLY to discover names, never copy their data — get details from each business OWN site. Real businesses in THIS trade only; skip directories themselves.');
  L.push('');
  L.push('FOR EACH capture (use empty string if absent — never invent): name, phone, email, address, suburb, state (NSW/VIC/QLD/WA/SA/ACT/TAS/NT), postcode, website, abn, description (1-2 sentences), services, service_areas, source_url.');
  L.push('');
  L.push('OUTPUT: Use the Write tool to save valid JSON at EXACTLY this path: ' + DUR + '/cat-' + c.id + '.json');
  L.push('Shape: {"categoryId": ' + c.id + ', "categoryName": ' + JSON.stringify(c.name) + ', "businesses": [ {fields...} ]}');
  L.push('Then return ONLY: cat ' + c.id + ': <N> saved.');
  return L.join(String.fromCharCode(10));
}
const results = await parallel(BATCH.map(function (c) {
  return function () { return agent(makePrompt(c), { label: 'r:' + c.id, phase: 'Research', model: 'sonnet' }); };
}));
return results.filter(Boolean).join(String.fromCharCode(10));
`;
fs.writeFileSync('/tmp/wave.js', waveJs);
console.log('wrote /tmp/wave.js for', BATCH.length, 'targeted categories:', BATCH.map(c=>c.id).join(','));
