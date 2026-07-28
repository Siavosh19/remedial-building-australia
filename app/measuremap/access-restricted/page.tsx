import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { hasMeasureMapAccess } from "@/lib/measuremap/access";

// Intentionally OUTSIDE the (workspace) route group so it is not itself gated —
// that would loop. A logged-out visitor is sent to login; a visitor who DOES
// have access is bounced back into the app so they never sit on this page.
export const dynamic = "force-dynamic";

export default async function AccessRestrictedPage() {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/measuremap");
  if (await hasMeasureMapAccess(user.id)) redirect("/measuremap");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </div>
        <h1 className="mt-4 text-lg font-bold text-slate-900">MeasureMap access restricted</h1>
        <p className="mt-2 text-sm text-slate-500">
          Your account doesn&apos;t have access to RBA MeasureMap. It&apos;s currently in private
          testing. If you believe you should have access, contact the RBA team.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to RBA
        </Link>
      </div>
    </main>
  );
}
