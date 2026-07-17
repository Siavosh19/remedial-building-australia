import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";

// Shared chrome for every public + employer Industry Jobs page.
export default function IndustryJobsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh] flex-1 bg-white">{children}</main>
      <footer className="border-t border-sky-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Industry Jobs — career opportunities across Australia&apos;s remedial building, strata, engineering,
              consulting and property sectors.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/industry-jobs" className="hover:text-sky-700">Browse Jobs</Link>
              <Link href="/directory/dashboard/jobs/new" className="hover:text-sky-700">Post a Job</Link>
              <Link href="/directory/dashboard/jobs" className="hover:text-sky-700">Employer Dashboard</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
              <Link href="/contact" className="hover:text-sky-700">Contact</Link>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
        </div>
      </footer>
    </>
  );
}
