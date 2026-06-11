"use client";

import { useState } from "react";

type LeadDelivery = {
  id: number;
  response_status: string;
  delivered_at: string;
  opened_at: string | null;
  lead: {
    category: string | null;
    suburb: string | null;
    state: string;
    urgency: string;
    budget_range: string | null;
    submitted_by_name: string;
    submitted_by_email: string;
    submitted_by_phone: string | null;
  };
};

type RevealedContact = { name: string; email: string; phone: string | null };

interface Props {
  isSubscribed: boolean;
  deliveries: LeadDelivery[];
}

const URGENCY_LABEL: Record<string, string> = {
  emergency: "Emergency",
  within_week: "Within a week",
  within_month: "Within a month",
  planning: "Planning ahead",
};
const URGENCY_COLOUR: Record<string, string> = {
  emergency: "bg-red-100 text-red-800",
  within_week: "bg-amber-100 text-amber-800",
  within_month: "bg-sky-100 text-sky-800",
  planning: "bg-slate-100 text-slate-700",
};
const BUDGET_LABEL: Record<string, string> = {
  under_5k: "Under $5k",
  "5k_20k": "$5k – $20k",
  "20k_100k": "$20k – $100k",
  "100k_plus": "$100k+",
};

const STATUS_GROUPS = [
  { key: "new", label: "New" },
  { key: "viewed", label: "Viewed" },
  { key: "accepted", label: "Accepted" },
  { key: "declined", label: "Declined" },
];

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
}

export default function LeadsDashboardClient({ isSubscribed, deliveries }: Props) {
  const [statuses, setStatuses] = useState<Record<number, string>>(
    Object.fromEntries(deliveries.map((d) => [d.id, d.response_status]))
  );
  const [contacts, setContacts] = useState<Record<number, RevealedContact>>({});
  const [loading, setLoading] = useState<Record<number, string>>({});

  async function accept(deliveryId: number) {
    setLoading((l) => ({ ...l, [deliveryId]: "accepting" }));
    try {
      const res = await fetch(`/api/directory/leads/${deliveryId}/accept`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setStatuses((s) => ({ ...s, [deliveryId]: "accepted" }));
        setContacts((c) => ({ ...c, [deliveryId]: data.contact }));
      }
    } finally {
      setLoading((l) => { const n = { ...l }; delete n[deliveryId]; return n; });
    }
  }

  async function decline(deliveryId: number) {
    setLoading((l) => ({ ...l, [deliveryId]: "declining" }));
    try {
      const res = await fetch(`/api/directory/leads/${deliveryId}/decline`, { method: "POST" });
      if (res.ok) {
        setStatuses((s) => ({ ...s, [deliveryId]: "declined" }));
      }
    } finally {
      setLoading((l) => { const n = { ...l }; delete n[deliveryId]; return n; });
    }
  }

  const grouped = STATUS_GROUPS.map((g) => ({
    ...g,
    items: deliveries.filter((d) => (statuses[d.id] ?? d.response_status) === g.key),
  }));

  if (!isSubscribed) {
    return (
      <div className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">Incoming leads</h1>
          <p className="mt-3 text-slate-600">Leads submitted by potential customers through your directory listing.</p>
        </div>

        {/* Locked leads (blurred) */}
        <div className="relative space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm blur-sm select-none">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="h-5 w-40 rounded bg-slate-200" />
                  <div className="mt-2 h-4 w-56 rounded bg-slate-100" />
                </div>
                <div className="h-4 w-24 rounded bg-slate-100" />
              </div>
              <div className="mt-4 flex gap-6">
                <div className="h-4 w-28 rounded bg-slate-100" />
                <div className="h-4 w-20 rounded bg-slate-100" />
                <div className="h-4 w-16 rounded bg-slate-100" />
              </div>
            </div>
          ))}

          {/* Upgrade overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white/80 backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-slate-950">Leads are locked</p>
            <p className="mt-2 max-w-sm text-center text-sm text-slate-600">
              Upgrade to a paid plan to receive and respond to leads from customers looking for your services.
            </p>
            <a
              href="/directory/dashboard/subscription"
              className="mt-5 inline-flex rounded-full bg-sky-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              View subscription options
            </a>
          </div>
        </div>
      </div>
    );
  }

  const hasAny = deliveries.length > 0;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Incoming leads</h1>
        <p className="mt-3 text-slate-600">Leads submitted by potential customers through your directory listing.</p>
      </div>

      {!hasAny ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">No leads yet</p>
          <p className="mt-2 text-slate-600">Your listing will start receiving leads once it is active and published.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {grouped.map((group) => {
            if (!group.items.length) return null;
            return (
              <section key={group.key}>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  {group.label} <span className="ml-1 text-slate-400">({group.items.length})</span>
                </h2>
                <div className="space-y-4">
                  {group.items.map((delivery) => {
                    const status = statuses[delivery.id] ?? delivery.response_status;
                    const contact = contacts[delivery.id];
                    const isAccepted = status === "accepted";
                    const isDeclined = status === "declined";
                    const isPending = !isAccepted && !isDeclined;

                    return (
                      <div
                        key={delivery.id}
                        className={`rounded-3xl border bg-white p-6 shadow-sm transition ${
                          isDeclined ? "border-slate-100 opacity-60" : "border-slate-200"
                        }`}
                      >
                        {/* Top row */}
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="space-y-1">
                            {delivery.lead.category && (
                              <p className="text-sm font-bold text-sky-800">{delivery.lead.category}</p>
                            )}
                            <p className="text-base font-semibold text-slate-900">
                              {[delivery.lead.suburb, delivery.lead.state].filter(Boolean).join(", ")}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-bold ${
                                URGENCY_COLOUR[delivery.lead.urgency] ?? "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {URGENCY_LABEL[delivery.lead.urgency] ?? delivery.lead.urgency}
                            </span>
                            {delivery.lead.budget_range && (
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                {BUDGET_LABEL[delivery.lead.budget_range] ?? delivery.lead.budget_range}
                              </span>
                            )}
                            <span className="text-xs text-slate-400">{formatDate(delivery.delivered_at)}</span>
                          </div>
                        </div>

                        {/* Revealed contact details (after accept) */}
                        {isAccepted && contact && (
                          <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Contact details</p>
                            <p className="mt-2 font-semibold text-slate-900">{contact.name}</p>
                            <p className="mt-0.5 text-sm text-slate-700">
                              <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                            </p>
                            {contact.phone && (
                              <p className="mt-0.5 text-sm text-slate-700">
                                <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                              </p>
                            )}
                          </div>
                        )}

                        {/* Accepted without contact data (already accepted on load) */}
                        {isAccepted && !contact && (
                          <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Contact details</p>
                            <p className="mt-2 font-semibold text-slate-900">{delivery.lead.submitted_by_name}</p>
                            <p className="mt-0.5 text-sm text-slate-700">
                              <a href={`mailto:${delivery.lead.submitted_by_email}`} className="hover:underline">
                                {delivery.lead.submitted_by_email}
                              </a>
                            </p>
                            {delivery.lead.submitted_by_phone && (
                              <p className="mt-0.5 text-sm text-slate-700">
                                <a href={`tel:${delivery.lead.submitted_by_phone}`} className="hover:underline">
                                  {delivery.lead.submitted_by_phone}
                                </a>
                              </p>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        {isPending && (
                          <div className="mt-5 flex gap-3">
                            <button
                              type="button"
                              onClick={() => accept(delivery.id)}
                              disabled={!!loading[delivery.id]}
                              className="rounded-full bg-sky-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60"
                            >
                              {loading[delivery.id] === "accepting" ? "Accepting…" : "Accept"}
                            </button>
                            <button
                              type="button"
                              onClick={() => decline(delivery.id)}
                              disabled={!!loading[delivery.id]}
                              className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                            >
                              {loading[delivery.id] === "declining" ? "Declining…" : "Decline"}
                            </button>
                          </div>
                        )}

                        {isDeclined && (
                          <p className="mt-4 text-xs text-slate-400">Declined — this lead will not count toward your monthly limit reversal.</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
