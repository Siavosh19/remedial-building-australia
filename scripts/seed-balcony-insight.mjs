// Seeds the first RBA Insight: "Why Balconies Leak Even After Repairs".
// Idempotent — upserts by slug, so it is safe to run more than once.
//
// Run where the production DATABASE_URL is available, e.g.:
//   DATABASE_URL="postgres://…" node scripts/seed-balcony-insight.mjs
//
// Requires the generated Prisma client (npx prisma generate).

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const slug = "why-balconies-leak-even-after-repairs";

const body_content = `Balcony leaks are one of the most common and frustrating defects in apartment buildings. Unfortunately, many balconies continue to leak even after repairs have been carried out. In some cases, the problem returns within only a few years, leading owners to question why the previous works failed.

The reality is that replacing tiles or applying a new waterproof membrane alone does not always address the underlying cause of water ingress. A successful balcony repair requires the entire waterproofing system and drainage design to work together.

## 1. Incorrect Falls Above the Waterproof Membrane

Modern construction methods often place the screed above the waterproof membrane. While this approach is permitted under Australian Standards, it can create problems if adequate falls are not provided.

Water that penetrates through grout joints and tiles can become trapped on top of the membrane. If the membrane does not have sufficient falls towards drainage outlets, water remains ponded for extended periods, increasing the risk of membrane deterioration and leakage.

## 2. Missing or Defective Cavity Flashings

Many balcony leaks originate from wall junctions rather than the balcony floor itself. In numerous buildings, cavity flashings are missing, incorrectly installed, or damaged.

Without properly detailed cavity flashings, water entering external walls can bypass the waterproofing system and migrate into apartments below, causing persistent leaks despite previous repairs.

## 3. Inadequate Door Threshold Heights

Insufficient door hob heights remain a major cause of balcony water ingress. During heavy rainfall, water can accumulate faster than the drainage system can remove it, allowing water to overflow beneath sliding doors and enter internal areas.

Low thresholds are commonly encountered in older buildings and some newer developments where architectural requirements have prioritised level transitions over waterproofing performance.

## 4. Poor Waterproofing Detailing

Even when high-quality membranes are used, poor detailing around critical areas can lead to premature failure.

Common problem areas include:

* Door tracks and thresholds.
* Balustrade posts and fixings.
* Penetrations and outlets.
* Wall-to-floor junctions.
* Upturn terminations.
* Expansion joints.

These locations require careful detailing and are often where leaks first develop.

## 5. Wrong Membrane Selection

Not all waterproofing membranes are suitable for every balcony. Selecting a system without considering movement, exposure conditions, UV resistance, or compatibility with surrounding materials can result in cracking, debonding, or early deterioration.

The membrane system should be selected based on the building design, expected movement, exposure conditions, and the proposed floor finish.

## 6. Drainage Deficiencies

Blocked drains, undersized outlets, poor set-downs, and inadequate overflow provisions can all contribute to water ponding and increased hydrostatic pressure on the waterproofing system.

A balcony may appear to have been repaired correctly, but if the drainage system remains defective, leaks are likely to return.

## 7. Repairs Focused on Symptoms Rather Than Causes

In many cases, previous repairs have addressed visible symptoms rather than identifying the root cause.

Examples include:

* Replacing tiles without replacing the membrane.
* Applying sealants around doors as a temporary solution.
* Regrouting surfaces instead of investigating waterproofing failures.
* Local patch repairs where systemic defects are present.

While these measures may temporarily reduce water ingress, they often fail to provide a long-term solution.

## The Importance of a Holistic Repair Strategy

Balcony leaks are rarely caused by a single issue. Successful remediation generally requires consideration of:

* Waterproofing membranes.
* Falls and drainage.
* Door thresholds.
* Cavity flashings.
* Balustrade details.
* Movement joints.
* Wall interfaces.
* Overflow provisions.

A proper investigation should identify the source of water ingress and address the underlying causes rather than simply treating the symptoms.

Understanding why balconies leak even after repairs can help owners corporations and apartment owners make better decisions and avoid repeated expenditure on ineffective repair works.`;

const data = {
  title: "Why Balconies Leak Even After Repairs",
  slug,
  category: "Waterproofing",
  summary:
    "Many balconies keep leaking even after repairs because the work treats the symptoms — new tiles or a fresh membrane — without fixing the underlying waterproofing system and drainage. Here are seven common reasons balcony repairs fail, and why a holistic strategy matters.",
  featured_image_url: "/Images/RBA%20Insight/Balcony%20Leak.png",
  featured_image_alt_text:
    "Water leaking from an apartment balcony with cracked tiles and a failed waterproofing membrane",
  body_content,
  author: "Remedial Building Australia",
  status: "published",
  published_date: new Date(),
  seo_title: "Why Balconies Leak Even After Repairs — Common Causes",
  seo_description:
    "Seven reasons apartment balconies keep leaking after repairs — falls, cavity flashings, thresholds, detailing, membrane selection and drainage — and why a holistic fix is essential.",
  related_defect_pages: [
    "/defect-library/balconies-podiums/balcony-leaks",
    "/defect-library/balconies-podiums/failed-screeds",
    "/defect-library/balconies-podiums/tile-delamination",
  ],
  related_repair_systems: ["/repair-systems/balcony-waterproofing-failure"],
  is_featured: true,
  reading_time_minutes: Math.max(1, Math.round(body_content.trim().split(/\s+/).length / 200)),
};

const article = await prisma.rbaInsightsArticle.upsert({
  where: { slug },
  update: data,
  create: data,
});

console.log(`✓ RBA Insight #${article.id} "${article.title}" (${article.status}) → /rba-insights/${article.slug}`);

await prisma.$disconnect();
