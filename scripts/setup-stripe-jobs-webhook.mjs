// Creates (or reports) the Stripe webhook endpoint for the Industry Jobs board
// and writes STRIPE_JOBS_WEBHOOK_SECRET into the local env files. Run with:
//   set -a; . ./.env.local; set +a; node scripts/setup-stripe-jobs-webhook.mjs
import Stripe from "stripe";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) { console.error("STRIPE_SECRET_KEY not set."); process.exit(1); }

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";
const url = `${base.replace(/\/$/, "")}/api/webhooks/stripe-jobs`;
const stripe = new Stripe(key, { apiVersion: "2026-05-27.dahlia" });

const existing = await stripe.webhookEndpoints.list({ limit: 100 });
const dupe = existing.data.find((e) => e.url === url);
if (dupe) {
  console.log(`A webhook for ${url} already exists (${dupe.id}).`);
  console.log("Stripe only reveals the signing secret at creation time. If you don't");
  console.log("have it saved, delete that endpoint in the Stripe dashboard and re-run this.");
  process.exit(0);
}

const ep = await stripe.webhookEndpoints.create({
  url,
  enabled_events: ["checkout.session.completed"],
  description: "Industry Jobs board — one-time job listing payments",
  api_version: "2026-05-27.dahlia",
});

const secret = ep.secret;
const files = [".env.local", ".env.prod", ".env.production.local"];
const updated = [];
for (const f of files) {
  if (!existsSync(f)) continue;
  const body = readFileSync(f, "utf8");
  if (/^STRIPE_JOBS_WEBHOOK_SECRET=/m.test(body)) continue; // don't clobber
  writeFileSync(f, `${body}${body.endsWith("\n") ? "" : "\n"}STRIPE_JOBS_WEBHOOK_SECRET=${secret}\n`);
  updated.push(f);
}

console.log(`Created webhook endpoint ${ep.id}`);
console.log(`  URL:    ${url}`);
console.log(`  Events: checkout.session.completed`);
console.log(`  Secret written to: ${updated.join(", ") || "(no env files found)"}`);
console.log(`\nIMPORTANT: also add STRIPE_JOBS_WEBHOOK_SECRET to your Vercel project env`);
console.log(`(Production) — copy it from .env.local. The secret is NOT printed here for safety.`);
