"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ClipboardList, Briefcase, Newspaper, type LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// PWA app shell — turns the installed ("Add to Home Screen") app into a focused,
// locked-down 4-section experience:
//
//   welcome gate (Log in / Continue as guest)
//     → 2×2 launcher home
//       → Directory · News · Quotes · Jobs, with a doubled-height navy tab bar
//
// EVERYTHING here is gated on `standalone` (installed-app / display-mode:
// standalone). In a normal browser on phone, tablet or desktop this renders
// nothing and sets no body classes, so the website is completely unchanged.
//
// "Full lockdown": in the installed app we (a) hide the public SiteHeader and the
// marketing footers via body classes (see app/globals.css), and (b) intercept
// clicks so navigation is confined to the 4 sections + the auth/portal flows they
// funnel into. Requesting a quote and posting a job still require an account —
// those destinations gate server-side, so the tabs just navigate there.
// ─────────────────────────────────────────────────────────────────────────────

const NAVY = "#16324F";

// The only 4 sections the installed app exposes, in display order.
const SECTIONS: { href: string; label: string; icon: LucideIcon; blurb: string }[] = [
  { href: "/directory", label: "Directory", icon: Building2, blurb: "Find building specialists" },
  { href: "/industry-news", label: "News", icon: Newspaper, blurb: "Latest industry updates" },
  { href: "/request-quotes", label: "Quotes", icon: ClipboardList, blurb: "Request project quotes" },
  { href: "/industry-jobs", label: "Jobs", icon: Briefcase, blurb: "Browse & post jobs" },
];

// Internal paths the installed app may navigate to: the 4 sections + their
// sub-pages, the auth/portal flows those funnel into, and API routes (logout /
// account switch). Anything else is blocked in standalone mode.
const ALLOWED_PREFIXES = ["/directory", "/industry-news", "/request-quotes", "/industry-jobs", "/client", "/supplier-dashboard"];

// Routes with their own chrome / focused auth — the bottom bar hides on these.
const HIDE_BAR_PREFIXES = [
  "/directory/dashboard", "/directory/admin", "/directory/admin-review",
  "/client", "/supplier-dashboard", "/directory/login", "/directory/signup",
  "/directory/claim", "/directory/forgot-password", "/directory/reset-password",
];

const WELCOMED_KEY = "rba-pwa-welcomed";

const underPrefix = (path: string, prefixes: string[]) =>
  prefixes.some((p) => path === p || path.startsWith(`${p}/`));
const isAllowedPath = (path: string) =>
  path === "/" || path.startsWith("/api/") || underPrefix(path, ALLOWED_PREFIXES);
const isSectionPath = (path: string) => underPrefix(path, SECTIONS.map((s) => s.href));

function tabActive(href: string, pathname: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PWAAppShell() {
  const pathname = usePathname();
  const [standalone, setStandalone] = useState(false);
  const [welcomed, setWelcomed] = useState(true); // assume welcomed until we learn otherwise

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
    try { setWelcomed(!!localStorage.getItem(WELCOMED_KEY)); } catch { setWelcomed(true); }
  }, [standalone]);

  const hideBar = underPrefix(pathname, HIDE_BAR_PREFIXES);
  const isSection = isSectionPath(pathname);
  const showWelcome = standalone && !welcomed;
  const isLauncher = standalone && !showWelcome && pathname === "/";
  const showBar = standalone && !showWelcome && !hideBar && (pathname === "/" || isSection);

  // Body classes (standalone only) drive the CSS lockdown + bar spacing.
  useEffect(() => {
    const b = document.body;
    b.classList.toggle("pwa-standalone", standalone);
    b.classList.toggle("pwa-section", standalone && isSection && !hideBar);
    b.classList.toggle("pwa-tabbar", showBar);
    return () => { b.classList.remove("pwa-standalone", "pwa-section", "pwa-tabbar"); };
  }, [standalone, isSection, hideBar, showBar]);

  // Full lockdown: block any in-app navigation to a path outside the 4 sections.
  // Runs in the capture phase so it beats Next's <Link> handler; external links,
  // tel:/mailto: and same-page anchors are left alone.
  useEffect(() => {
    if (!standalone) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) return;
      let url: URL;
      try { url = new URL(href, window.location.origin); } catch { return; }
      if (url.origin !== window.location.origin) return; // external → open normally
      if (isAllowedPath(url.pathname)) return;
      e.preventDefault();
      e.stopPropagation();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [standalone]);

  function dismissWelcome() {
    try { localStorage.setItem(WELCOMED_KEY, "1"); } catch { /* ignore */ }
    setWelcomed(true);
  }

  if (!standalone) return null;

  return (
    <>
      {/* ── First-launch welcome gate ─────────────────────────────────────── */}
      {showWelcome && (
        <div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center px-8 text-center"
          style={{ background: NAVY, paddingBottom: "env(safe-area-inset-bottom)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome"
        >
          <img src="/icon.png" alt="" width={76} height={76} className="mb-6 rounded-2xl shadow-lg" />
          <h1 className="text-2xl font-extrabold leading-tight text-white">Remedial Building Australia</h1>
          <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
            Browse the directory, news and jobs freely. Log in to request quotes, post a job or manage your listing.
          </p>
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <Link href="/directory/login" onClick={dismissWelcome} className="rounded-xl bg-white px-6 py-3 text-sm font-bold" style={{ color: NAVY }}>
              Log in
            </Link>
            <button onClick={dismissWelcome} className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/60">
              Continue as guest
            </button>
          </div>
        </div>
      )}

      {/* ── Launcher home — 2×2 section cards (installed app, at "/") ──────── */}
      {isLauncher && (
        <div className="fixed inset-0 z-40 flex flex-col bg-slate-50" style={{ paddingBottom: "calc(80px + env(safe-area-inset-bottom))" }}>
          <div className="flex items-center gap-3 px-5 pb-5 pt-8" style={{ background: NAVY }}>
            <img src="/icon.png" alt="" width={40} height={40} className="rounded-xl" />
            <div className="min-w-0">
              <div className="truncate text-base font-extrabold leading-tight text-white">Remedial Building Australia</div>
              <div className="text-[12px] text-white/60">Choose a section</div>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 content-start gap-3 p-4">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl bg-white p-3 text-center shadow-sm ring-1 ring-slate-200 transition active:scale-[0.98]"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: NAVY }}>
                    <Icon size={30} color="#fff" />
                  </span>
                  <span className="text-[15px] font-bold" style={{ color: NAVY }}>{s.label}</span>
                  <span className="text-[11px] leading-snug text-slate-400">{s.blurb}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Doubled-height navy bottom tab bar ────────────────────────────── */}
      {showBar && (
        <nav
          className="fixed inset-x-0 bottom-0 z-50 flex items-stretch"
          style={{ background: NAVY, paddingBottom: "env(safe-area-inset-bottom)" }}
          aria-label="Primary"
        >
          {SECTIONS.map((tab) => {
            const active = tabActive(tab.href, pathname);
            const Icon = tab.icon;
            const color = active ? "#ffffff" : "rgba(255,255,255,0.55)";
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-label={tab.label}
                aria-current={active ? "page" : undefined}
                className="flex flex-1 flex-col items-center justify-center gap-1 py-3.5 text-[12px] font-semibold transition"
                style={{ color }}
              >
                <Icon size={30} color={color} />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
