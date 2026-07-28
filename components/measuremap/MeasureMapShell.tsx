import type { ReactNode } from "react";
import Link from "next/link";
import { Ruler } from "lucide-react";

// Compact, software-style chrome shared by every MeasureMap workspace page.
// Deliberately self-contained (its own header) so MeasureMap reads as a
// separate product from the marketing site, while still linking home.
export default function MeasureMapShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white">
              <Ruler className="h-4 w-4" />
            </span>
            <Link href="/measuremap" className="text-sm font-bold tracking-tight">
              RBA <span className="text-red-600">MeasureMap</span>
            </Link>
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
              Private beta
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-500 sm:inline">{email}</span>
            <Link
              href="/"
              className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              RBA site
            </Link>
            <a
              href="/api/directory/logout"
              className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
            >
              Sign out
            </a>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
