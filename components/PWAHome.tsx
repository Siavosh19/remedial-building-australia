"use client";

import Link from "next/link";
import {
  Building2, ClipboardList, Briefcase, Newspaper,
  Bell, ShieldCheck, ArrowRight, type LucideIcon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// PWA home screen (installed app only, rendered by PWAAppShell at "/").
// Full-width Sydney hero + navy overlay, 2×2 image cards, and the
// "Built on Experience" banner over a faint blueprint background.
// ─────────────────────────────────────────────────────────────────────────────

const NAVY = "#16324F";
const RED = "#E4572E";

// Faint architectural / blueprint grid behind the card section.
const BLUEPRINT =
  "repeating-linear-gradient(0deg, rgba(22,50,79,0.05) 0 1px, transparent 1px 26px)," +
  "repeating-linear-gradient(90deg, rgba(22,50,79,0.05) 0 1px, transparent 1px 26px)";

const CARDS: { href: string; label: string; desc: string; icon: LucideIcon; img: string }[] = [
  { href: "/directory", label: "Directory", desc: "Find trusted building specialists and suppliers.", icon: Building2, img: "/Images/Categories/facade-external-envelope.jpg" },
  { href: "/industry-news", label: "News", desc: "Stay informed with the latest industry updates.", icon: Newspaper, img: "/Images/building-industry-news-desk-laptop/building-industry-news-desk-laptop.jpg" },
  { href: "/request-quotes", label: "Quotes", desc: "Request and compare project quotes.", icon: ClipboardList, img: "/Images/signup-page/request-quotes.jpg" },
  { href: "/industry-jobs", label: "Jobs", desc: "Browse and post jobs across Australia.", icon: Briefcase, img: "/Images/News/construction-site-aerial.jpg" },
];

export default function PWAHome() {
  return (
    <div
      className="fixed inset-0 z-40 overflow-y-auto"
      style={{ background: "#eef1f5", paddingBottom: "calc(96px + env(safe-area-inset-bottom))" }}
    >
      {/* Fill at least the full viewport so the cards stretch and leave no gap. */}
      <div className="flex min-h-full flex-col">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/Images/Categories/homepage-hero.jpg')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(15,31,53,0.88) 0%, rgba(15,31,53,0.60) 55%, rgba(15,31,53,0.48) 100%)" }} />
        <div className="relative px-5 pb-9" style={{ paddingTop: "calc(env(safe-area-inset-top) + 22px)" }}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src="/icon.png" alt="" width={54} height={54} className="rounded-2xl shadow-lg" />
              <div className="min-w-0">
                <h1 className="text-[22px] font-extrabold leading-[1.12] text-white">Remedial<br />Building Australia</h1>
                <div className="mt-2 h-[3px] w-9 rounded-full" style={{ background: RED }} />
              </div>
            </div>
            <Link
              href="/directory/dashboard"
              aria-label="Notifications"
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)" }}
            >
              <Bell size={19} color="#fff" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full ring-2" style={{ background: RED, boxShadow: "0 0 0 2px rgba(15,31,53,0.9)" }} />
            </Link>
          </div>
          <p className="mt-4 max-w-[17rem] text-[13px] leading-5 text-white/85">
            Australia&rsquo;s trusted platform for the remedial building industry.
          </p>
        </div>
      </div>

      {/* ── Cards over blueprint (flex-fills the remaining height) ───────── */}
      <div className="relative -mt-5 flex flex-1 flex-col rounded-t-[22px] px-4 pb-3 pt-5" style={{ background: "#eef1f5", backgroundImage: BLUEPRINT }}>
        <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-3.5">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.href}
                href={c.href}
                className="relative flex min-h-[188px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70 transition active:scale-[0.985]"
              >
                {/* photo + white gradient so the left (text) stays readable */}
                <div className="pointer-events-none absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${c.img}')` }} />
                <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(105deg, #ffffff 42%, rgba(255,255,255,0.62) 74%, rgba(255,255,255,0.38) 100%)" }} />
                <div className="relative flex h-full flex-1 flex-col p-3.5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: NAVY }}>
                    <Icon size={22} color="#fff" />
                  </span>
                  <h3 className="mt-3 text-[17px] font-extrabold" style={{ color: NAVY }}>{c.label}</h3>
                  <div className="mt-1.5 h-[3px] w-7 rounded-full" style={{ background: RED }} />
                  <p className="mt-2 text-[12px] leading-[1.35] text-slate-500">{c.desc}</p>
                  <span className="mt-auto flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-500">
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── "Built on Experience" banner ───────────────────────────────── */}
        <div className="relative mt-3.5 flex shrink-0 items-center gap-3.5 overflow-hidden rounded-2xl px-4 py-4" style={{ background: NAVY }}>
          <ShieldCheck size={36} color="#fff" strokeWidth={1.6} className="shrink-0" />
          <div className="min-w-0">
            <div className="text-[14px] font-extrabold leading-tight text-white">Built on Experience. Focused on Quality.</div>
            <p className="mt-1 text-[11px] leading-snug text-white/70">
              Connecting building professionals, sharing knowledge and supporting better buildings across Australia.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
