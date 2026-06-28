"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthHeader from "@/components/AuthHeader";

export default function VerifyEmailPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [dest, setDest] = useState("/directory/dashboard");

  useEffect(() => {
    const token = decodeURIComponent(params.token);

    fetch("/api/directory/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setState("success");
          const d = data.role === "supplier_user"
            ? "/supplier-dashboard/setup"
            : data.role === "ai_scope_user"
            ? "/ai-scope-builder"
            : data.role === "client_user"
            ? "/client/dashboard"
            : "/directory/dashboard";
          setDest(d);
          setTimeout(() => router.push(d), 2500);
        } else {
          setState("error");
          setErrorMsg(data.error ?? "Verification failed.");
        }
      })
      .catch(() => {
        setState("error");
        setErrorMsg("Something went wrong. Please try again.");
      });
  }, [params.token, router]);

  return (
    <div className="min-h-screen bg-slate-50">
      <AuthHeader />
      <div className="flex min-h-[calc(100vh-57px)] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-sm text-center">

        {state === "loading" && (
          <>
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
            <p className="text-lg font-semibold text-slate-800">Verifying your email…</p>
          </>
        )}

        {state === "success" && (
          <>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-xl font-bold text-slate-950">Email verified!</p>
            <p className="mt-3 text-slate-500">Your account is confirmed. Taking you to your dashboard…</p>
            <a
              href={dest}
              className="mt-6 inline-flex rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Go to dashboard →
            </a>
          </>
        )}

        {state === "error" && (
          <>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
            <p className="text-xl font-bold text-slate-950">Verification failed</p>
            <p className="mt-3 text-slate-500">{errorMsg}</p>
            <p className="mt-4 text-sm text-slate-400">
              The link may have expired (links are valid for 24 hours). Try signing up again or contact{" "}
              <a href="mailto:info@remedialbuildingaustralia.com.au" className="text-sky-600 underline">
                info@remedialbuildingaustralia.com.au
              </a>
            </p>
            <a
              href="/directory/signup"
              className="mt-6 inline-flex rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Sign up again
            </a>
          </>
        )}

      </div>
      </div>
    </div>
  );
}
