import fs from 'fs';

const DUR = '/Users/siasepehrara/Desktop/RBA_New_Businesses_From_Web/_source_json';
const COUNT = parseInt(process.argv[2] || '8', 10);

const all = JSON.parse(fs.readFileSync(DUR + '/thin-cats.json', 'utf8'));
const done = new Set(
  fs.readdirSync(DUR).filter((f) => /^cat-\d+\.json$/.test(f)).map((f) => parseInt(f.match(/\d+/)[0], 10))
);
const remaining = all.filter((c) => !done.has(c.id));
const batch = remaining.slice(0, COUNT).map((c) => ({ id: c.id, name: c.name }));
console.log(`total ${all.length} | done ${done.size} | remaining ${remaining.length} | this wave ${batch.length}`);
if (batch.length === 0) { console.log('ALL DONE'); process.exit(0); }

const batchJson = JSON.stringify(batch);
const durJson = JSON.stringify(DUR);

// The generated workflow uses ONLY single-quoted string concatenation (no backticks,
// no ${}), so this template needs no escaping beyond the two real interpolations.
const waveJs = `export const meta = {
  name: 'directory-business-research-wave',
  description: 'Gentle wave (big-city focus): research AU businesses for ${batch.length} categories',
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
console.log('wrote /tmp/wave.js (durable store, big-city focus) for', batch.length, 'categories:', batch.map((c) => c.id).join(','));
