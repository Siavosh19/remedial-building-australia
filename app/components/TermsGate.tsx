"use client";

import { useEffect, useState } from "react";

const TERMS_VERSION = "2026-06";
const STORE_KEY = `rba_terms_accepted_v${TERMS_VERSION}`;

export default function TermsGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip for pages that signal a logged-in user (acceptance recorded at signup)
    if ((window as unknown as Record<string, unknown>).RBA_USER_LOGGED_IN === true) return;
    try {
      if (localStorage.getItem(STORE_KEY) === "yes") return;
    } catch {
      // private browsing / storage blocked — show gate anyway
    }
    setVisible(true);
  }, []);

  function agree() {
    try { localStorage.setItem(STORE_KEY, "yes"); } catch {}
    setVisible(false);
  }

  function decline() {
    window.location.href = "https://www.google.com";
  }

  if (!visible) return null;

  return (
    <>
      {/* Lock scroll while gate is open */}
      <style>{`
        html, body { overflow: hidden !important; }
        @keyframes rbaIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        #rba-gate-agree:hover { background: #142c46 !important; }
        #rba-gate-decline:hover { background: #e2e7ec !important; }
      `}</style>

      <div
        id="rba-terms-gate"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rba-terms-title"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          background: "rgba(13, 27, 42, 0.78)",
          backdropFilter: "blur(4px)",
          fontFamily: 'ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{
          background: "#fff",
          maxWidth: "540px",
          width: "100%",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,.35)",
          borderTop: "5px solid #1b3a5b",
          animation: "rbaIn .35s ease",
        }}>
          {/* Header */}
          <div style={{ padding: "28px 30px 8px" }}>
            <p style={{
              fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase",
              color: "#1b3a5b", fontWeight: 700, margin: "0 0 8px",
            }}>
              Before you continue
            </p>
            <h2 id="rba-terms-title" style={{ margin: 0, fontSize: "22px", color: "#0d1b2a", lineHeight: 1.25 }}>
              Terms &amp; Conditions
            </h2>
          </div>

          {/* Body */}
          <div style={{ padding: "14px 30px 4px", color: "#3a4756", fontSize: "14.5px", lineHeight: 1.6 }}>
            <p style={{ margin: "0 0 12px" }}>
              This platform provides{" "}
              <strong style={{ color: "#0d1b2a" }}>general technical information only</strong>{" "}
              — it is not engineering, design or compliance advice. All content, data and AI-generated
              scopes{" "}
              <strong style={{ color: "#0d1b2a" }}>
                must be independently verified and signed off by a qualified, licensed professional
              </strong>{" "}
              before use.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              By selecting <strong style={{ color: "#0d1b2a" }}>I Agree</strong> you confirm you have
              read and accept our{" "}
              <a href="/terms" target="_blank" rel="noopener" style={{ color: "#1b3a5b", fontWeight: 600 }}>
                Terms &amp; Conditions
              </a>
              , including the limitation of liability and assumption of risk.
            </p>
          </div>

          {/* Footer buttons */}
          <div style={{ padding: "8px 30px 28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              id="rba-gate-decline"
              onClick={decline}
              style={{
                flex: "1 1 200px", border: 0, cursor: "pointer",
                padding: "13px 18px", borderRadius: "9px",
                fontSize: "15px", fontWeight: 700,
                background: "#eef1f4", color: "#3a4756",
                transition: "background .15s",
              }}
            >
              Decline &amp; Leave
            </button>
            <button
              id="rba-gate-agree"
              onClick={agree}
              style={{
                flex: "1 1 200px", border: 0, cursor: "pointer",
                padding: "13px 18px", borderRadius: "9px",
                fontSize: "15px", fontWeight: 700,
                background: "#1b3a5b", color: "#fff",
                transition: "background .15s",
              }}
            >
              I Agree
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
