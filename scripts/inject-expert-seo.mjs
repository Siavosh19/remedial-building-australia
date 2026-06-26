// One-off: add SEO metadata + Service/Breadcrumb schema to Expert Remedial
// Advice pages. Idempotent — safe to re-run.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const BASE = "app/expert-remedial-advice";

// slug "" = the section index page (metadata only, no Service schema).
const PAGES = {
  "": {
    title: "Expert Remedial Advice | Remedial Building Australia",
    description:
      "Independent desktop remedial advice for owners, strata managers and building stakeholders — defect assessments, scope, quote and tender reviews, budgets, repair strategy and capital works forecasts.",
  },
  "preliminary-defect-assessment": {
    title: "Preliminary Defect Assessment | Expert Remedial Advice",
    description:
      "Independent desktop review of photos and building information to identify the likely defect, its causes, a risk rating and a recommended next step.",
    serviceName: "Preliminary Defect Assessment",
  },
  "scope-quote-tender-review": {
    title: "Scope, Quote & Tender Review | Expert Remedial Advice",
    description:
      "Independent review of a remedial scope, quote or tender before you approve or sign — checking for missing items, vague wording, exclusions and variation risk.",
    serviceName: "Scope, Quote & Tender Review",
  },
  "remedial-budget-estimate": {
    title: "Remedial Budget Estimate | Expert Remedial Advice",
    description:
      "Realistic, defensible budget estimates to support strata planning, funding and decision making before committing to remedial works.",
    serviceName: "Remedial Budget Estimate",
  },
  "building-repair-strategy-advice": {
    title: "Building Repair Strategy Advice | Expert Remedial Advice",
    description:
      "Tailored, risk-based repair strategy advice that prioritises the right remedial works in the right order to protect your building and its value.",
    serviceName: "Building Repair Strategy Advice",
  },
  "pre-purchase-apartment-defect-review": {
    title: "Pre-Purchase Apartment Defect Review | Expert Remedial Advice",
    description:
      "Independent defect and building-risk review before you buy an apartment — surfacing the red flags that affect value, liveability and future repair costs.",
    serviceName: "Pre-Purchase Apartment Defect Review",
  },
  "capital-works-forecast": {
    title: "Capital Works Forecast | Expert Remedial Advice",
    description:
      "Long-term capital works forecasting to help strata schemes plan and budget for remedial and maintenance works with confidence.",
    serviceName: "Capital Works Forecast",
  },
};

const esc = (s) => s.replace(/"/g, '\\"');
let changed = 0;
const problems = [];

for (const [slug, cfg] of Object.entries(PAGES)) {
  const file = slug ? `${BASE}/${slug}/page.tsx` : `${BASE}/page.tsx`;
  if (!existsSync(file)) {
    problems.push(`${file}: not found`);
    continue;
  }
  let src = readFileSync(file, "utf8");
  const path = slug ? `/expert-remedial-advice/${slug}` : "/expert-remedial-advice";

  // Skip if we've already processed this file.
  if (src.includes("export const metadata")) {
    problems.push(`${file}: already has metadata — skipped`);
    continue;
  }

  // 1) Ensure `import type { Metadata }` at the very top.
  if (!/import type \{ Metadata \} from "next";/.test(src)) {
    src = `import type { Metadata } from "next";\n` + src;
  }

  // 2) Service schema import + render (service pages only).
  const useService = Boolean(cfg.serviceName);
  if (useService && !src.includes("ServiceSchema")) {
    src = src.replace(
      /^(import SiteHeader from "@\/components\/SiteHeader";)$/m,
      `$1\nimport ServiceSchema from "@/components/expert-advice/ServiceSchema";`,
    );
  }

  // 3) metadata export before the default export.
  const metaBlock =
    `export const metadata: Metadata = {\n` +
    `  title: "${esc(cfg.title)}",\n` +
    `  description:\n    "${esc(cfg.description)}",\n` +
    `  alternates: { canonical: "${path}" },\n` +
    `};\n\n`;
  if (!/export default function/.test(src)) {
    problems.push(`${file}: no default export anchor`);
    continue;
  }
  src = src.replace(/export default function/, metaBlock + "export default function");

  // 4) Render <ServiceSchema /> right after the first <SiteHeader />.
  if (useService) {
    const m = src.match(/^([ \t]*)<SiteHeader \/>/m);
    if (m) {
      const indent = m[1];
      const tag =
        `${indent}<ServiceSchema\n` +
        `${indent}  name="${esc(cfg.serviceName)}"\n` +
        `${indent}  description="${esc(cfg.description)}"\n` +
        `${indent}  path="${path}"\n` +
        `${indent}/>`;
      src = src.replace(m[0], `${m[0]}\n${tag}`);
    } else {
      problems.push(`${file}: no <SiteHeader /> anchor for schema`);
    }
  }

  writeFileSync(file, src);
  changed++;
}

console.log(`expert pages changed=${changed}`);
if (problems.length) {
  console.log("NOTES:");
  for (const p of problems) console.log("  " + p);
}
