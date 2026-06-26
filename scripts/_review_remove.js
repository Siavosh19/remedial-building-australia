#!/usr/bin/env node
// Remove a single object literal from an array in a .ts/.tsx file by matching a
// field value (name / rangeName) substring. Brace-balanced; handles trailing or
// leading comma. Usage: node scripts/_review_remove.js <file> "<name-substr>"
// Exits non-zero (and changes nothing) if 0 or >1 matches are found.
const fs = require("fs");

const [file, needle] = process.argv.slice(2);
if (!file || !needle) { console.error("usage: <file> <name-substr>"); process.exit(2); }

let src = fs.readFileSync(file, "utf8");

// Normalise the needle for tolerant matching (collapse spaces, lowercase).
const norm = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();
const wantedRe = /(?:^|\s)(?:name|rangeName)\s*:\s*"([^"]*)"/g;

// Find every name/rangeName field whose value contains the needle (normalised).
const hits = [];
let m;
while ((m = wantedRe.exec(src)) !== null) {
  if (norm(m[1]).includes(norm(needle))) {
    hits.push({ idx: m.index + m[0].indexOf('"'), value: m[1] });
  }
}
if (hits.length === 0) { console.error(`NOT FOUND: ${needle} in ${file}`); process.exit(3); }
if (hits.length > 1) {
  console.error(`AMBIGUOUS (${hits.length}): ${needle} -> ${hits.map(h => h.value).join(" | ")}`);
  process.exit(4);
}

const pos = hits[0].idx;

// Walk backward to the object's opening brace (first unbalanced '{').
let depth = 0, start = -1;
for (let i = pos; i >= 0; i--) {
  const c = src[i];
  if (c === "}") depth++;
  else if (c === "{") { if (depth === 0) { start = i; break; } depth--; }
}
if (start < 0) { console.error("could not find opening brace"); process.exit(5); }

// Walk forward to the matching closing brace.
depth = 0; let end = -1;
for (let i = start; i < src.length; i++) {
  const c = src[i];
  if (c === "{") depth++;
  else if (c === "}") { depth--; if (depth === 0) { end = i; break; } }
}
if (end < 0) { console.error("could not find closing brace"); process.exit(6); }

// Expand to swallow one comma + surrounding whitespace/newlines so the array
// stays valid whether this was a middle or last element.
let a = start, b = end + 1;
// trailing comma after the object
let t = b;
while (t < src.length && /\s/.test(src[t])) t++;
if (src[t] === ",") {
  b = t + 1;
} else {
  // last element: drop the preceding comma instead
  let p = a - 1;
  while (p >= 0 && /\s/.test(src[p])) p--;
  if (src[p] === ",") a = p;
}
// also consume the blank line left behind (up to and including one trailing newline run)
while (b < src.length && src[b] !== "\n") { if (!/\s/.test(src[b])) break; b++; }
if (src[b] === "\n") b++;
// trim leading whitespace on the start line back to the previous newline
let ls = a;
while (ls > 0 && src[ls - 1] !== "\n") ls--;
if (src.slice(ls, a).trim() === "") a = ls;

const before = src.length;
src = src.slice(0, a) + src.slice(b);
fs.writeFileSync(file, src);
console.error(`REMOVED "${hits[0].value}" from ${file} (${before - src.length} chars)`);
