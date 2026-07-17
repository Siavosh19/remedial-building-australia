// One-off codemod: convert internal <a href="/..."> anchors to Next.js <Link>.
// Safe by design:
//  - Only converts href that is a string ("/...") or template (`/...`) starting
//    with a single "/" (internal route). Leaves http(s), //, mailto:, tel:, #,
//    and dynamic href={expr} anchors as plain <a>.
//  - Leaves any <a> that carries a target= attribute (e.g. target="_blank").
//  - Brace-aware tag scan (won't break on onClick={() => ...}).
//  - Stack-paired open/close so files with a mix of internal + external anchors
//    convert only the right ones.
// Usage: node scripts/link-codemod.mjs <file> [file...]
import { readFileSync, writeFileSync } from "node:fs";

function scanTagEnd(src, start) {
  // start points at the char after "<a". Return index of the tag-closing ">".
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") depth--;
    else if (c === ">" && depth === 0) return i;
  }
  return -1;
}

function isInternalTag(tag) {
  if (/\btarget\s*=/.test(tag)) return false; // opens a new context — keep <a>
  // href="/..." (but not "//...")
  const strHref = tag.match(/\bhref\s*=\s*"([^"]*)"/);
  if (strHref) {
    const v = strHref[1];
    return v.startsWith("/") && !v.startsWith("//");
  }
  // href={`/...`}
  const tplHref = tag.match(/\bhref\s*=\s*\{`([^`]*)`\}/);
  if (tplHref) {
    const v = tplHref[1];
    return v.startsWith("/") && !v.startsWith("//");
  }
  return false; // no static href, or href={expr} — leave as <a>
}

function transform(src) {
  let out = "";
  let i = 0;
  const stack = []; // booleans: was the matching <a> converted?
  let converted = 0;
  while (i < src.length) {
    // opening <a  (followed by whitespace or > — not <abbr> etc.)
    if (src[i] === "<" && src[i + 1] === "a" && /[\s>]/.test(src[i + 2] || "")) {
      const tagEnd = scanTagEnd(src, i + 2);
      if (tagEnd === -1) { out += src[i++]; continue; }
      const tag = src.slice(i, tagEnd + 1);
      const internal = isInternalTag(tag);
      if (internal) {
        out += "<Link" + tag.slice(2); // replace "<a" -> "<Link"
        converted++;
        stack.push(true);
      } else {
        out += tag;
        stack.push(false);
      }
      i = tagEnd + 1;
      continue;
    }
    // closing </a>
    if (src.startsWith("</a>", i)) {
      const wasConverted = stack.pop();
      out += wasConverted ? "</Link>" : "</a>";
      i += 4;
      continue;
    }
    out += src[i++];
  }
  return { out, converted };
}

function ensureImport(src) {
  if (/\bimport\s+Link\s+from\s+["']next\/link["']/.test(src)) return src;
  // Insert after the first import line, or after a leading "use client".
  const lines = src.split("\n");
  let insertAt = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*["']use client["'];?\s*$/.test(lines[i])) { insertAt = i + 1; }
    if (/^\s*import\b/.test(lines[i])) { insertAt = i + 1; break; }
  }
  lines.splice(insertAt, 0, 'import Link from "next/link";');
  return lines.join("\n");
}

for (const file of process.argv.slice(2)) {
  const src = readFileSync(file, "utf8");
  const { out, converted } = transform(src);
  if (converted === 0) { console.log(`  0  ${file} (unchanged)`); continue; }
  const withImport = ensureImport(out);
  writeFileSync(file, withImport);
  console.log(`${String(converted).padStart(3)}  ${file}`);
}
