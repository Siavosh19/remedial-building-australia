// Shared Australian location data used by the directory location-suggest and
// search routes. Hardcoded city/suburb coordinates take priority over (often
// noisy) business-location coordinates so location ranking stays accurate.

export const STATE_NAMES: Record<string, string> = {
  NSW: "New South Wales",
  VIC: "Victoria",
  QLD: "Queensland",
  WA: "Western Australia",
  SA: "South Australia",
  TAS: "Tasmania",
  ACT: "Australian Capital Territory",
  NT: "Northern Territory",
};

export type SuburbCoord = { name: string; stateCode: string; lat: number; lng: number };

export const SUBURB_COORDS: SuburbCoord[] = [
  // Capital cities
  { name: "Sydney",           stateCode: "NSW", lat: -33.8688, lng: 151.2093 },
  { name: "Melbourne",        stateCode: "VIC", lat: -37.8136, lng: 144.9631 },
  { name: "Brisbane",         stateCode: "QLD", lat: -27.4698, lng: 153.0251 },
  { name: "Perth",            stateCode: "WA",  lat: -31.9505, lng: 115.8605 },
  { name: "Adelaide",         stateCode: "SA",  lat: -34.9285, lng: 138.6007 },
  { name: "Canberra",         stateCode: "ACT", lat: -35.2809, lng: 149.1300 },
  { name: "Darwin",           stateCode: "NT",  lat: -12.4634, lng: 130.8456 },
  { name: "Hobart",           stateCode: "TAS", lat: -42.8821, lng: 147.3272 },
  // Major regional centres
  { name: "Gold Coast",       stateCode: "QLD", lat: -28.0167, lng: 153.4000 },
  { name: "Newcastle",        stateCode: "NSW", lat: -32.9283, lng: 151.7817 },
  { name: "Wollongong",       stateCode: "NSW", lat: -34.4278, lng: 150.8931 },
  { name: "Sunshine Coast",   stateCode: "QLD", lat: -26.6500, lng: 153.0667 },
  { name: "Geelong",          stateCode: "VIC", lat: -38.1499, lng: 144.3617 },
  { name: "Townsville",       stateCode: "QLD", lat: -19.2590, lng: 146.8169 },
  { name: "Cairns",           stateCode: "QLD", lat: -16.9186, lng: 145.7781 },
  { name: "Toowoomba",        stateCode: "QLD", lat: -27.5598, lng: 151.9507 },
  { name: "Ballarat",         stateCode: "VIC", lat: -37.5622, lng: 143.8503 },
  { name: "Bendigo",          stateCode: "VIC", lat: -36.7570, lng: 144.2794 },
  // Sydney suburbs
  { name: "Bondi",            stateCode: "NSW", lat: -33.8919, lng: 151.2760 },
  { name: "Bondi Beach",      stateCode: "NSW", lat: -33.8915, lng: 151.2767 },
  { name: "Bondi Junction",   stateCode: "NSW", lat: -33.8916, lng: 151.2507 },
  { name: "Bronte",           stateCode: "NSW", lat: -33.9029, lng: 151.2676 },
  { name: "Coogee",           stateCode: "NSW", lat: -33.9218, lng: 151.2571 },
  { name: "Maroubra",         stateCode: "NSW", lat: -33.9497, lng: 151.2506 },
  { name: "Randwick",         stateCode: "NSW", lat: -33.9150, lng: 151.2403 },
  { name: "Darlinghurst",     stateCode: "NSW", lat: -33.8777, lng: 151.2194 },
  { name: "Paddington",       stateCode: "NSW", lat: -33.8841, lng: 151.2270 },
  { name: "Surry Hills",      stateCode: "NSW", lat: -33.8872, lng: 151.2106 },
  { name: "Newtown",          stateCode: "NSW", lat: -33.8973, lng: 151.1780 },
  { name: "Glebe",            stateCode: "NSW", lat: -33.8793, lng: 151.1870 },
  { name: "Pyrmont",          stateCode: "NSW", lat: -33.8699, lng: 151.1926 },
  { name: "North Sydney",     stateCode: "NSW", lat: -33.8399, lng: 151.2073 },
  { name: "Chatswood",        stateCode: "NSW", lat: -33.7969, lng: 151.1807 },
  { name: "Manly",            stateCode: "NSW", lat: -33.7969, lng: 151.2877 },
  { name: "Parramatta",       stateCode: "NSW", lat: -33.8148, lng: 151.0019 },
  { name: "Blacktown",        stateCode: "NSW", lat: -33.7700, lng: 150.9060 },
  { name: "Penrith",          stateCode: "NSW", lat: -33.7509, lng: 150.6942 },
  { name: "Liverpool",        stateCode: "NSW", lat: -33.9213, lng: 150.9235 },
  { name: "Bankstown",        stateCode: "NSW", lat: -33.9173, lng: 151.0344 },
  { name: "Hornsby",          stateCode: "NSW", lat: -33.7027, lng: 151.0989 },
  { name: "Ryde",             stateCode: "NSW", lat: -33.8200, lng: 151.1039 },
  { name: "Castle Hill",      stateCode: "NSW", lat: -33.7295, lng: 151.0024 },
  { name: "Cronulla",         stateCode: "NSW", lat: -34.0573, lng: 151.1516 },
  { name: "Hurstville",       stateCode: "NSW", lat: -33.9677, lng: 151.1022 },
  { name: "Kogarah",          stateCode: "NSW", lat: -33.9634, lng: 151.1330 },
  { name: "Sutherland",       stateCode: "NSW", lat: -34.0318, lng: 151.0575 },
  { name: "Leichhardt",       stateCode: "NSW", lat: -33.8852, lng: 151.1557 },
  // Melbourne suburbs
  { name: "St Kilda",         stateCode: "VIC", lat: -37.8618, lng: 144.9777 },
  { name: "Fitzroy",          stateCode: "VIC", lat: -37.8000, lng: 144.9783 },
  { name: "Richmond",         stateCode: "VIC", lat: -37.8228, lng: 145.0030 },
  { name: "South Yarra",      stateCode: "VIC", lat: -37.8411, lng: 145.0019 },
  { name: "Toorak",           stateCode: "VIC", lat: -37.8458, lng: 145.0164 },
  { name: "Brighton",         stateCode: "VIC", lat: -37.9044, lng: 145.0008 },
  { name: "Frankston",        stateCode: "VIC", lat: -38.1440, lng: 145.1249 },
  { name: "Dandenong",        stateCode: "VIC", lat: -37.9883, lng: 145.2141 },
  { name: "Box Hill",         stateCode: "VIC", lat: -37.8201, lng: 145.1227 },
  { name: "Ringwood",         stateCode: "VIC", lat: -37.8167, lng: 145.2273 },
  { name: "Footscray",        stateCode: "VIC", lat: -37.8018, lng: 144.8996 },
  { name: "Williamstown",     stateCode: "VIC", lat: -37.8614, lng: 144.8973 },
  // Brisbane suburbs
  { name: "South Brisbane",   stateCode: "QLD", lat: -27.4810, lng: 153.0211 },
  { name: "West End",         stateCode: "QLD", lat: -27.4799, lng: 153.0055 },
  { name: "Toowong",          stateCode: "QLD", lat: -27.4842, lng: 152.9888 },
  { name: "Chermside",        stateCode: "QLD", lat: -27.3881, lng: 153.0340 },
  { name: "Indooroopilly",    stateCode: "QLD", lat: -27.4997, lng: 152.9701 },
  { name: "Springwood",       stateCode: "QLD", lat: -27.6137, lng: 153.1007 },
  // Perth suburbs
  { name: "Fremantle",        stateCode: "WA",  lat: -32.0569, lng: 115.7439 },
  { name: "Joondalup",        stateCode: "WA",  lat: -31.7457, lng: 115.7669 },
  { name: "Mandurah",         stateCode: "WA",  lat: -32.5282, lng: 115.7228 },
  { name: "Rockingham",       stateCode: "WA",  lat: -32.2788, lng: 115.7283 },
  { name: "Armadale",         stateCode: "WA",  lat: -32.1520, lng: 116.0085 },
  // Adelaide suburbs
  { name: "Glenelg",          stateCode: "SA",  lat: -34.9820, lng: 138.5153 },
  { name: "Norwood",          stateCode: "SA",  lat: -34.9228, lng: 138.6218 },
  { name: "Marion",           stateCode: "SA",  lat: -35.0212, lng: 138.5611 },
];

// Fast lookup: "sydney:nsw" → {lat, lng}
export const COORDS_BY_KEY = new Map(
  SUBURB_COORDS.map((s) => [`${s.name.toLowerCase()}:${s.stateCode.toLowerCase()}`, { lat: s.lat, lng: s.lng }])
);

// Lookup a city/suburb by name alone (first match). Returns its state + coords.
export function lookupSuburb(name: string): SuburbCoord | undefined {
  const lower = name.trim().toLowerCase();
  return SUBURB_COORDS.find((s) => s.name.toLowerCase() === lower);
}

export const STATE_CODES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as const;

// Map a full state name (or code) to its 2–3 letter code.
export function toStateCode(text: string): string | undefined {
  const up = text.trim().toUpperCase();
  if ((STATE_CODES as readonly string[]).includes(up)) return up;
  for (const [code, name] of Object.entries(STATE_NAMES)) {
    if (name.toUpperCase() === up) return code;
  }
  return undefined;
}

// Derive the state from an Australian 4-digit postcode.
export function postcodeToState(pc: string): string | undefined {
  const n = parseInt(pc, 10);
  if (!Number.isFinite(n)) return undefined;
  if (n >= 200 && n <= 299) return "ACT";
  if (n >= 800 && n <= 999) return "NT";
  if (n >= 1000 && n <= 2599) return "NSW";
  if (n >= 2600 && n <= 2618) return "ACT";
  if (n >= 2619 && n <= 2899) return "NSW";
  if (n >= 2900 && n <= 2920) return "ACT";
  if (n >= 2921 && n <= 2999) return "NSW";
  if (n >= 3000 && n <= 3999) return "VIC";
  if (n >= 4000 && n <= 4999) return "QLD";
  if (n >= 5000 && n <= 5999) return "SA";
  if (n >= 6000 && n <= 6999) return "WA";
  if (n >= 7000 && n <= 7999) return "TAS";
  if (n >= 8000 && n <= 8999) return "VIC";
  if (n >= 9000 && n <= 9999) return "QLD";
  return undefined;
}
