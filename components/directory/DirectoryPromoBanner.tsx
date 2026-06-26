"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Slide = {
  label: string;
  heading: string;
  sub: string;
  cta: string;
};

const SLIDES: Slide[] = [
  {
    label: "Strata Managers Search Here Daily",
    heading: "Be Seen. Be Chosen.",
    sub: "Put your business where the decisions are made",
    cta: "Get Listed →",
  },
  {
    label: "Contractors & Consultants",
    heading: "Your Next Client Is Looking for You",
    sub: "Be visible to owners corporations and property managers across Australia",
    cta: "List Your Business →",
  },
  {
    label: "Don't Miss Out",
    heading: "Your Competitors Are Already Here",
    sub: "Claim your spot and start receiving enquiries from serious clients",
    cta: "Claim Your Spot →",
  },
];

export default function DirectoryPromoBanner(_props: { listedLabel?: string }) {
  const router = useRouter();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Advertise your business — learn more"
      onClick={() => router.push("/advertise")}
      onKeyDown={(e) => { if (e.key === "Enter") router.push("/advertise"); }}
      style={{
        position: "relative",
        width: "100%",
        height: 88,
        overflow: "hidden",
        background: "#ffffff",
        border: "1px solid #111111",
        boxShadow: "0 4px 20px rgba(100,100,100,0.4)",
        cursor: "pointer",
      }}
    >
      {/* Navy shimmer lines, top & bottom */}
      <div className="rba-promo-line rba-promo-line-top" />
      <div className="rba-promo-line rba-promo-line-bottom" />

      {SLIDES.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== active}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "0 28px",
            opacity: i === active ? 1 : 0,
            transform: i === active ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 600ms ease, transform 600ms ease",
            pointerEvents: i === active ? "auto" : "none",
          }}
        >
          {/* Left: navy accent bar + label + heading + subtext */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, minWidth: 0, flex: "1 1 auto" }}>
            <span
              style={{
                width: 2,
                height: 48,
                flexShrink: 0,
                background: "linear-gradient(180deg, transparent, #0a2540, transparent)",
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#64748b",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#b91c1c",
                  lineHeight: 1.15,
                  marginTop: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {s.heading}
              </div>
              <div
                className="rba-promo-sub"
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: "#475569",
                  marginTop: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {s.sub}
              </div>
            </div>
          </div>

          {/* Right: red underlined text-link CTA */}
          <a
            href="/advertise"
            onClick={(e) => e.stopPropagation()}
            style={{
              flexShrink: 0,
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#b91c1c",
              textDecoration: "none",
              borderBottom: "2px solid #b91c1c",
              paddingBottom: 2,
              whiteSpace: "nowrap",
            }}
          >
            {s.cta}
          </a>
        </div>
      ))}

      {/* Navigation dots */}
      <div
        style={{
          position: "absolute",
          bottom: 7,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          zIndex: 5,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={(e) => { e.stopPropagation(); setActive(i); }}
            style={{
              height: 6,
              width: i === active ? 18 : 6,
              borderRadius: 999,
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 400ms ease, background 400ms ease",
              background: i === active ? "#0a2540" : "#cbd5e1",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes rbaPromoShimmer {
          0% { background-position: -150% 0; }
          100% { background-position: 250% 0; }
        }
        .rba-promo-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          z-index: 4;
          background: linear-gradient(90deg, transparent, #0a2540, transparent);
          background-size: 200% 100%;
          animation: rbaPromoShimmer 3.5s linear infinite;
        }
        .rba-promo-line-top { top: 0; }
        .rba-promo-line-bottom { bottom: 0; }
        @media (max-width: 600px) {
          .rba-promo-sub { display: none; }
        }
      `}</style>
    </div>
  );
}
