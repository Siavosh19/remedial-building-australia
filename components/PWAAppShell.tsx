"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ClipboardList, Briefcase, Newspaper, type LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// PWA app shell — turns the installed ("Add to Home Screen") app into a focused
// 4-tab experience. This renders ONLY when the site is launched as a standalone
// PWA; in a normal mobile browser it renders nothing, so the website is unchanged.
//
//   Directory · Quote · Jobs · News   (public browsing is open to everyone)
//
// Requesting a quote, posting a job and listing/claiming a business still require
// an account — those destinations already funnel to login server-side, so the
// tabs just navigate there. On first launch we show a one-time welcome gate
// ("Log in" / "Continue as guest"), remembered in localStorage.
// ─────────────────────────────────────────────────────────────────────────────

const TABS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/directory", label: "Directory", icon: Building2 },
  { href: "/request-quotes", label: "Quotes", icon: ClipboardList },
  { href: "/industry-jobs", label: "Jobs", icon: Briefcase },
  { href: "/industry-news", label: "News", icon: Newspaper },
];

// Routes that have their own navigation (business portal, admin, client & supplier
// dashboards, and the focused auth flows) — the public tab bar hides on these.
const HIDE_PREFIXES = [
  "/directory/dashboard",
  "/directory/admin",
  "/directory/admin-review",
  "/client",
  "/supplier-dashboard",
  "/directory/login",
  "/directory/signup",
  "/directory/claim",
  "/directory/forgot-password",
  "/directory/reset-password",
];

const WELCOMED_KEY = "rba-pwa-welcomed";

function tabActive(href: string, pathname: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PWAAppShell() {
  const pathname = usePathname();
  const [standalone, setStandalone] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Detect standalone / installed PWA mode (client-only; unknown during SSR).
  useEffect(() => {
    const isStandalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      window.matchMedia?.("(display-mode: fullscreen)").matches ||
      // iOS Safari exposes this instead of display-mode.
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setStandalone(!!isStandalone);
  }, []);

  // First-launch welcome gate — only in the installed app, only once.
  useEffect(() => {
    if (!standalone) return;
    try {
      if (!localStorage.getItem(WELCOMED_KEY)) setShowWelcome(true);
    } catch {
      /* localStorage unavailable (private mode) — skip the gate */
    }
  }, [standalone]);

  const isPortal = HIDE_PREFIXES.some((p) => pathname.startsWith(p));
  const showBar = standalone && !isPortal;

  // Pad page content so the fixed bar never covers the footer. Toggled on <body>
  // so it applies across every public page without editing each one.
  useEffect(() => {
    document.body.classList.toggle("pwa-tabbar", showBar);
    return () => document.body.classList.remove("pwa-tabbar");
  }, [showBar]);

  function dismissWelcome() {
    try {
      localStorage.setItem(WELCOMED_KEY, "1");
    } catch {
      /* ignore */
    }
    setShowWelcome(false);
  }

  return (
    <>
      {/* ── First-launch welcome gate ─────────────────────────────────────── */}
      {showWelcome && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-sky-950 px-8 text-center"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome"
        >
          <img src="/icon.png" alt="" width={72} height={72} className="mb-6 rounded-2xl shadow-lg" />
          <h1 className="text-2xl font-extrabold leading-tight text-white">Remedial Building Australia</h1>
          <p className="mt-3 max-w-xs text-sm leading-6 text-sky-100/80">
            Browse the directory, jobs and industry news freely. Log in to request quotes, post a job or manage your listing.
          </p>
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <Link
              href="/directory/login"
              onClick={dismissWelcome}
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Log in
            </Link>
            <button
              onClick={dismissWelcome}
              className="rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/50 hover:text-white"
            >
              Continue as guest
            </button>
          </div>
        </div>
      )}

      {/* ── PWA bottom tab bar (installed app, public pages only) ──────────── */}
      {showBar && (
        <nav
          className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-slate-200 bg-white/95 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] backdrop-blur"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          aria-label="Primary"
        >
          {TABS.map((tab) => {
            const active = tabActive(tab.href, pathname);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold transition ${
                  active ? "text-sky-900" : "text-slate-400"
                }`}
              >
                <Icon size={21} className={active ? "text-red-500" : ""} />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
