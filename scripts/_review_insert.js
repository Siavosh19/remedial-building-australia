#!/usr/bin/env node
// Insert one or more object literals at the END of a named array in a .ts/.tsx
// file (just before the array's closing ']'). Bracket-balanced.
// Usage: node scripts/_review_insert.js <file> <arrayVarName> <blockFile>
//   <arrayVarName> e.g. PRODUCTS | CEMENTITIOUS_CARDS | REF_CARDS | MS_CARDS
//   <blockFile> = file containing the object literal(s), e.g. "{ ... },\n{ ... }"
const fs = require("fs");

const [file, varName, blockFile] = process.argv.slice(2);
if (!file || !varName || !blockFile) { console.error("usage: <file> <arrayVar> <blockFile>"); process.exit(2); }

let src = fs.readFileSync(file, "utf8");
let block = fs.readFileSync(blockFile, "utf8").replace(/\s+$/,"");

// Find "<varName> ... = [" and the opening bracket position.
const re = new RegExp("\\b" + varName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b[^=]*=\\s*\\[");
const m = re.exec(src);
if (!m) { console.error(`array ${varName} not found in ${file}`); process.exit(3); }
const open = src.indexOf("[", m.index + m[0].length - 1);

// Bracket-match to the closing ']'.
let depth = 0, close = -1;
for (let i = open; i < src.length; i++) {
  const c = src[i];
  if (c === "[") depth++;
  else if (c === "]") { depth--; if (depth === 0) { close = i; break; } }
}
if (close < 0) { console.error("could not find array close"); process.exit(4); }

// Find last non-whitespace char before ']'.
let p = close - 1;
while (p > open && /\s/.test(src[p])) p--;
const lastChar = src[p];

let insertion;
if (lastChar === "[") {
  // empty array
  insertion = "\n  " + block + "\n";
} else if (lastChar === ",") {
  insertion = "\n  " + block + "\n";
} else {
  // last element has no trailing comma → add one
  insertion = ",\n  " + block + "\n";
}

src = src.slice(0, p + 1) + insertion + src.slice(p + 1, close) + src.slice(close);
fs.writeFileSync(file, src);
console.error(`INSERTED ${block.length} chars into ${varName} in ${file}`);
