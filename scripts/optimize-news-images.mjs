import sharp from "sharp";
import { readdirSync, readFileSync, writeFileSync, statSync, unlinkSync } from "fs";
import { join, extname } from "path";

const DIR = join(process.cwd(), "public", "Images", "News");
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;
const SIZE_THRESHOLD = 1024 * 1024; // 1 MB

// Clean up clearly-mangled new filenames so keyword matching works.
const RENAMES = {
  "forwaterproofing-defect-balcony.jpg": "waterproofing-defect-balcony.jpg",
  "forbuilding-defects-general.jpg": "building-defects-general.jpg",
  "newsdamaged-building-facade.jpg": "damaged-building-facade.jpg",
  "workscaffolding-on-building.jpg": "scaffolding-on-building.jpg",
  "storyapartment-building-exterior.jpg": "apartment-building-exterior.jpg",
  "oofing-membrane-installation.jpg": "roofing-membrane-installation.jpg",
  "defectsconstruction-site-aerial.jpg": "construction-site-aerial.jpg",
  "failureswater-leak-ceiling.jpg": "water-leak-ceiling.jpg",
  "strata-apartment-complex-Multiunit Building Class2.jpg":
    "strata-apartment-complex-multiunit-class2.jpg",
};

// Broken stray duplicates to delete outright.
const DELETE = ["australian-flag-building.jpg .png"];

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png"]);
const KB = (n) => (n / 1024).toFixed(0) + "KB";

let processed = 0;
let saved = 0;

for (const name of DELETE) {
  try {
    unlinkSync(join(DIR, name));
    console.log(`🗑  deleted  ${name}`);
  } catch {}
}

for (const file of readdirSync(DIR)) {
  const ext = extname(file).toLowerCase();
  if (!IMAGE_EXTS.has(ext)) continue;

  const srcPath = join(DIR, file);
  const before = statSync(srcPath).size;
  const meta = await sharp(srcPath).metadata();

  const oversized = before > SIZE_THRESHOLD || (meta.width ?? 0) > MAX_WIDTH;
  const isRealJpeg = meta.format === "jpeg";
  const jpegExt = ext === ".jpg" || ext === ".jpeg";
  // Also reformat PNG-data-in-.jpg-file even if not oversized.
  const mislabeled = jpegExt && !isRealJpeg;
  if (!oversized && !mislabeled && !RENAMES[file]) continue;

  const buf = readFileSync(srcPath);
  let pipeline = sharp(buf).rotate(); // respect EXIF orientation
  if ((meta.width ?? 0) > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const destName = RENAMES[file] ?? file;
  const destExt = extname(destName).toLowerCase();
  let out;
  if (destExt === ".png") {
    out = await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer();
  } else {
    out = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();
  }

  const destPath = join(DIR, destName);
  writeFileSync(destPath, out);
  if (destName !== file) unlinkSync(srcPath); // renamed → remove old

  const tag = destName !== file ? `  →  ${destName}` : "";
  console.log(
    `✔  ${file}${tag}\n     ${KB(before)} → ${KB(out.length)}  (${meta.width}px→${Math.min(meta.width ?? 0, MAX_WIDTH)}px, ${meta.format}→${destExt.slice(1)})`
  );
  processed++;
  saved += before - out.length;
}

console.log(`\nDone. Processed ${processed} images, saved ${(saved / 1048576).toFixed(1)} MB.`);
