import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import FinancialClient from "./FinancialClient";
import { tierLabel } from "@/lib/directory-tier";

export const dynamic = "force-dynamic";

export type Txn = {
  id: string;
  date: string;
  amount: number; // cents
  currency: string;
  status: string; // succeeded | refunded | partial_refund | failed | …
  refunded: number; // cents
  receiptUrl: string | null;
  description: string | null;
};

export default async function BusinessFinancialPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const id = Number(companyId);
  const company = await prisma.company.findUnique({ where: { id }, include: { directory_subscription: true } });
  if (!company) return <div className="text-slate-500">Business not found.</div>;

  const sub = company.directory_subscription;
  const customerId = sub?.stripe_customer_id ?? null;

  let txns: Txn[] = [];
  if (stripe && customerId) {
    const charges = await stripe.charges.list({ customer: customerId, limit: 50 });
    txns = charges.data.map((c) => ({
      id: c.id,
      date: new Date(c.created * 1000).toISOString(),
      amount: c.amount,
      currency: c.currency.toUpperCase(),
      status: c.refunded ? "refunded" : c.amount_refunded > 0 ? "partial_refund" : c.status,
      refunded: c.amount_refunded,
      receiptUrl: c.receipt_url ?? null,
      description: c.description ?? null,
    }));
  }

  return (
    <div>
      <Link href="/directory/admin/billing" className="text-sm font-semibold text-sky-700 hover:underline">← Back to Billing</Link>
      <div className="mt-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{company.name}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {tierLabel(company.plan_type)} plan · subscription {sub?.subscription_status ?? "none"}
          {sub?.cancel_at_period_end ? " · cancels at period end" : ""}
          {sub?.current_period_end ? ` · renews ${new Date(sub.current_period_end).toLocaleDateString("en-AU")}` : ""}
        </p>
      </div>
      <FinancialClient
        companyId={id}
        companyName={company.name}
        hasCustomer={Boolean(customerId)}
        subActive={["active", "trialing"].includes(sub?.subscription_status ?? "")}
        transactions={txns}
      />
    </div>
  );
}
