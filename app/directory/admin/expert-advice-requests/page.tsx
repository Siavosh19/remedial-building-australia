import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

const SUPABASE_URL  = "https://krttmsatnftkdnbtwouy.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydHRtc2F0bmZ0a2RuYnR3b3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MDQyODYsImV4cCI6MjA5NDk4MDI4Nn0.av5L6-CHe_9VkTUuOdUenZ-B8beMqPhJA59KIVAfIlY";

type FileRef = { label: string; filename: string; url: string };

type Request = {
  id: number;
  created_at: string;
  service: string;
  service_name: string;
  name: string;
  email: string;
  phone: string | null;
  property_type: string | null;
  building_address: string;
  description: string;
  urgency: string | null;
  extra_fields: { label: string; value: string }[] | null;
  uploaded_file_refs: FileRef[] | null;
  disclaimer_accepted: boolean;
  disclaimer_version: string;
  disclaimer_accepted_at: string | null;
  ip_address: string | null;
  payment_id: string | null;
  payment_status: string;
};

const PAYMENT_CLS: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-800",
  paid:      "bg-emerald-100 text-emerald-800",
  failed:    "bg-red-100 text-red-700",
  refunded:  "bg-slate-100 text-slate-600",
};

function fmt(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-AU", { timeZone: "Australia/Sydney", dateStyle: "medium", timeStyle: "short" });
}

export default async function ExpertAdviceRequestsPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_ANON;
  const sb = createClient(SUPABASE_URL, sbKey);

  const { data: requests, error } = await sb
    .from("expert_advice_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  const rows: Request[] = requests ?? [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Expert Advice Requests</h1>
        <p className="mt-1 text-sm text-slate-500">
          {rows.length} total
          {error ? <span className="ml-2 text-red-500">— DB error: {error.message}</span> : null}
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-8 py-16 text-center text-slate-400">
          No expert advice requests yet.
        </div>
      ) : (
        <div className="space-y-6">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {/* Header bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400">#{r.id}</span>
                  <span className="rounded-lg bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-sky-800">
                    {r.service_name}
                  </span>
                  <span className={`rounded-lg px-2.5 py-0.5 text-xs font-bold ${PAYMENT_CLS[r.payment_status] ?? "bg-slate-100 text-slate-600"}`}>
                    {r.payment_status}
                  </span>
                </div>
                <span className="text-xs text-slate-400">{fmt(r.created_at)}</span>
              </div>

              <div className="grid gap-6 p-5 md:grid-cols-2">

                {/* Customer details */}
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Customer</p>
                  <p className="font-semibold text-slate-900">{r.name}</p>
                  <a href={`mailto:${r.email}`} className="text-sm text-sky-700 hover:underline">{r.email}</a>
                  {r.phone && <p className="mt-0.5 text-sm text-slate-600">{r.phone}</p>}
                  {r.property_type && <p className="mt-1 text-xs text-slate-500">{r.property_type}</p>}
                  <p className="mt-1 text-xs text-slate-500">{r.building_address}</p>
                  {r.urgency && (
                    <span className="mt-2 inline-block rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                      {r.urgency}
                    </span>
                  )}
                </div>

                {/* Disclaimer */}
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Disclaimer</p>
                  <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold ${r.disclaimer_accepted ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>
                    {r.disclaimer_accepted ? (
                      <>
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 shrink-0"><path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"/></svg>
                        Disclaimer accepted
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 shrink-0"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 4a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0V5ZM8 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>
                        Disclaimer NOT accepted
                      </>
                    )}
                  </div>
                  {r.disclaimer_accepted_at && (
                    <p className="mt-1.5 text-xs text-slate-500">Accepted: {fmt(r.disclaimer_accepted_at)}</p>
                  )}
                  <p className="mt-0.5 text-xs text-slate-400">Version: {r.disclaimer_version}</p>
                  {r.ip_address && <p className="mt-0.5 text-xs text-slate-400">IP: {r.ip_address}</p>}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Description</p>
                  <p className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700 whitespace-pre-wrap">
                    {r.description}
                  </p>
                </div>

                {/* Extra fields */}
                {r.extra_fields && r.extra_fields.length > 0 && (
                  <div className="md:col-span-2">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Additional Information</p>
                    <div className="grid gap-1 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm">
                      {r.extra_fields.map((f, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="min-w-[180px] font-semibold text-slate-500">{f.label}:</span>
                          <span className="text-slate-700">{f.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Uploaded files */}
                {r.uploaded_file_refs && r.uploaded_file_refs.length > 0 && (
                  <div className="md:col-span-2">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Uploaded Files</p>
                    <div className="flex flex-wrap gap-2">
                      {r.uploaded_file_refs.map((f, i) => (
                        f.url ? (
                          <a
                            key={i}
                            href={f.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-sky-700 hover:border-sky-300 hover:text-sky-900 transition"
                          >
                            {f.filename}
                            <ExternalLink size={10} />
                          </a>
                        ) : (
                          <span key={i} className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500">
                            {f.filename}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment */}
                {r.payment_id && (
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Payment</p>
                    <p className="text-xs text-slate-600">ID: {r.payment_id}</p>
                    <p className="text-xs text-slate-600">Status: {r.payment_status}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
