"use client";

import { useEffect } from "react";

// Route-level error boundary for the client portal. Without this, an unexpected
// error renders a blank white screen ("dodgy"). This catches it, keeps the app
// shell, and offers a retry.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
        <svg className="h-7 w-7 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-slate-900">Something went wrong</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        This page hit an unexpected error. Your data is safe — try again.
      </p>
      <button
        onClick={reset}
        className="mt-5 rounded-full bg-sky-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
      >
        Try again
      </button>
    </div>
  );
}
