"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Free strata software feature slides. Same crossfade/dots pattern as
// StrataConnectSlides, but themed for the dark hero card: each slide groups 3 of
// the module's 9 features into one highlight (not an exhaustive list — the full
// set lives on /strata-software). All slide text renders in the DOM (hidden via
// opacity only), so it stays crawlable for SEO.
type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
};

const SLIDES: Slide[] = [
  {
    image: "/Images/News/strata-owners-corporation-committee-apartment-insurance.jpg",
    alt: "Strata owners corporation committee managing levies and insurance",
    eyebrow: "Levies, arrears, reconciliation",
    title: "The money side, automated",
    body:
      "Budget once and contributions apportion by entitlement automatically. Arrears escalate on their own ladder with a record of every step, and importing the bank statement receipts contributions from the payment reference.",
    points: [
      "Levies and notices ready to issue each period",
      "Arrears and interest, escalated and recorded",
      "Bank statement import receipts contributions for you",
    ],
  },
  {
    image: "/Images/News/Strata manager overseeing residential building assets.jpg",
    alt: "Compliance and capital works oversight for a residential strata building",
    eyebrow: "Compliance, capital works, reporting",
    title: "Stay ahead of what's due",
    body:
      "Fire, lift, valuation and insurance due dates warn the committee well before they lapse. A ten-year capital works forecast is tested against the fund, and financial statements and the AGM pack assemble from the scheme's own records.",
    points: [
      "Compliance due dates before they lapse",
      "Ten-year capital works forecast",
      "Financial statements and AGM pack, built in",
    ],
  },
  {
    image: "/Images/News/strata-apartment-complex-multiunit-class2.jpg",
    alt: "Multi-unit strata apartment complex roll and defect management",
    eyebrow: "Roll, defects, registers",
    title: "Everyday admin, handled",
    body:
      "Keep the strata roll current with entitlements and a payment reference for every lot, log defects and send them straight to verified trades, and record every meeting, motion and by-law in one place.",
    points: [
      "Strata roll with a payment reference per lot",
      "Defects logged and quoted to verified trades",
      "Meetings, motions, by-laws and more, in one register",
    ],
  },
];

const INTERVAL_MS = 5500;

export default function StrataSoftwareSlides() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* Crossfading slide stack, in a white card against the dark hero — the
          same split-image treatment as Strata Connect. Mobile: image on top
          (fixed), text fills the rest. Desktop: image left half, text right. */}
      <div className="relative h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-lg sm:h-[380px]">
        {SLIDES.map((s, i) => (
          <article
            key={s.title}
            aria-hidden={i !== active}
            className={`absolute inset-0 grid grid-rows-[210px_1fr] transition-opacity duration-700 ease-in-out sm:grid-cols-2 sm:grid-rows-1 ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {/* Image half */}
            <div className="relative h-full w-full">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>

            {/* Text half */}
            <div className="flex flex-col justify-center gap-3.5 px-7 py-7 sm:px-9 sm:py-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-700">
                {s.eyebrow}
              </p>
              <h3 className="text-xl font-extrabold leading-snug text-sky-950 sm:text-2xl">
                {s.title}
              </h3>
              <p className="text-[15px] leading-7 text-slate-600">{s.body}</p>
              <ul className="mt-1 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm font-medium text-sky-900">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-700" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
            aria-current={i === active}
            className={`h-2.5 rounded-full transition-all ${
              i === active ? "w-7 bg-red-500" : "w-2.5 bg-white/25 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
