import Link from "next/link";

/**
 * Minimal top bar for auth-flow / account screens that don't use SiteHeader.
 * Logo on the left, "Login / Create Account" button in the top-right corner.
 */
export default function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link
          href="/"
          className="text-sm font-extrabold tracking-tight text-sky-950 transition hover:text-sky-700 sm:text-base"
        >
          Remedial Building Australia
        </Link>
        <a
          href="/directory/login"
          className="inline-flex shrink-0 items-center rounded-xl bg-red-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-800 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          <span className="sm:hidden">Login</span>
          <span className="hidden sm:inline">Login / Create Account</span>
        </a>
      </div>
    </header>
  );
}
