import { URGENCY_OPTIONS } from "@/lib/quote-options";
import { getAllLeadPricesCents } from "@/lib/lead-pricing";
import LeadPricingClient from "./LeadPricingClient";

export const dynamic = "force-dynamic";

export default async function AdminLeadPricingPage() {
  const byUrgency = await getAllLeadPricesCents();
  const prices = URGENCY_OPTIONS.map((o) => ({
    urgency: o.id,
    label: o.label,
    amount_cents: byUrgency[o.id] ?? 0,
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Lead Pricing</h1>
        <p className="mt-1 text-sm text-slate-500">
          What a business pays to buy a single lead once its weekly interest allowance is used up. Priced by the
          client&apos;s urgency. Checkout and the lead wallet read these values live — no deploy needed.
        </p>
      </div>
      <LeadPricingClient initialPrices={prices} />
    </div>
  );
}
