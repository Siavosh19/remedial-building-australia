"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Strata Connect feature/benefit slides. Each slide is split image + text and the
// set auto-crossfades. All slide text is rendered in the DOM (only hidden via
// opacity), so it stays crawlable for SEO. Images are strata-related shots reused
// from the news library in /public/Images.
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
    image: "/Images/News8-Apartment.jpg",
    alt: "Strata apartment building serviced through Strata Connect",
    eyebrow: "One request, every trade",
    title: "From remedial works to cleaning",
    body:
      "Waterproofing, concrete repair, façades, roofing — or everyday cleaning and maintenance. A single request reaches the right specialists across every trade.",
    points: [
      "Every remedial and building services trade",
      "One work order, matched automatically",
    ],
  },
  {
    image: "/Images/News14 Rope Access.jpg",
    alt: "Remedial rope-access work on a strata building",
    eyebrow: "Quotes, faster",
    title: "Available businesses near the building",
    body:
      "Your work order is matched to verified businesses operating in the right area — competitive quotes come back quickly, with no chasing trades one at a time.",
    points: [
      "Matched to verified, available specialists",
      "Compare competitive quotes side by side",
    ],
  },
  {
    image: "/Images/News 30 Highrise Building.jpg",
    alt: "High-rise strata building managed with Strata Connect",
    eyebrow: "Submit once, not every time",
    title: "No repeating a quote form",
    body:
      "Owners corporations and strata managers simply forward a work order. Strata Connect handles the matching — you stay in control while the right specialists come to you.",
    points: [
      "Forward a work order — no repeat forms",
      "Full control, less admin per repair",
    ],
  },
];

const INTERVAL_MS = 5500;

export default function StrataConnectSlides() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* Crossfading slide stack. Mobile: image on top (fixed), text fills the
          rest. Desktop: image left half, text right half. Fixed heights give the
          absolute-stacked slides a stable box without clipping the text. */}
      <div className="relative h-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:h-[400px]">
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

            {/* Text half — generous padding so nothing touches the card edges */}
            <div className="flex flex-col justify-center gap-3.5 px-7 py-7 sm:px-10 sm:py-9">
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
              i === active ? "w-7 bg-red-700" : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
