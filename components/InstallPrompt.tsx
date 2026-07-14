"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// The animated install walkthrough (iPhone/Android, tap-by-tap). Lazy-loaded so
// its ~800 lines only download when the visitor actually opens the guide.
const InstallGuide = dynamic(() => import("./InstallGuide"), { ssr: false });

// Non-intrusive "install this app" banner for mobile web visitors.
//
// Behaviour (deliberately unobtrusive):
//   - Mobile viewports only (<= 767px). Desktop never sees it.
//   - Never shown once the app is already installed (standalone display mode).
//   - Appears 5s after load, not immediately.
//   - Dismissing it (x) hides it for 30 days on that device.
//   - Android/Chrome: shows a real "Install App" button wired to the native
//     beforeinstallprompt flow.
//   - iOS Safari: shows text guidance. Wording matches iOS 26 / iPhone 17 where
//     the Share control now lives in the "..." menu (there is no visible Share
//     square in the toolbar anymore).

const DISMISS_KEY = "pwa-banner-dismissed";
const DISMISS_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const SHOW_DELAY_MS = 5000;

// Minimal typing for the non-standard beforeinstallprompt event (Chromium only).
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"android" | "ios" | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const deferredRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Already installed / running standalone -> never prompt.
    const nav = window.navigator as Navigator & { standalone?: boolean };
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      nav.standalone === true;
    if (standalone) return;

    // Mobile viewports only.
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    // Respect a recent dismissal (30 days); reset once expired.
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed) {
      const ts = Number(dismissed);
      if (!Number.isNaN(ts) && Date.now() - ts < DISMISS_MS) return;
      localStorage.removeItem(DISMISS_KEY);
    }

    const isIOS = /iPad|iPhone|iPod/.test(nav.userAgent);
    let timer: number | undefined;

    const onBeforeInstall = (e: Event) => {
      e.preventDefault(); // stop Chrome's own mini-infobar
      deferredRef.current = e as BeforeInstallPromptEvent;
      setMode("android");
      timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    // iOS has no beforeinstallprompt — show the text guidance path instead.
    if (isIOS) {
      setMode("ios");
      timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const install = async () => {
    const dp = deferredRef.current;
    if (!dp) return;
    await dp.prompt();
    await dp.userChoice;
    deferredRef.current = null;
    setVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  if (!visible || !mode) return null;

  return (
    <>
      <div style={bannerStyle} role="dialog" aria-label="Install app">
        <div style={{ flex: 1, paddingRight: 10, fontSize: 14 }}>
          <p style={{ margin: "0 0 3px", fontWeight: 600 }}>
            Install our app for a faster experience
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 12.5, color: "#bbb", lineHeight: 1.4 }}>
            Add it to your home screen — it opens full-screen and works offline.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {mode === "android" && (
              <button onClick={install} style={installBtnStyle}>
                Install App
              </button>
            )}
            <button
              onClick={() => setShowGuide(true)}
              style={mode === "ios" ? installBtnStyle : guideBtnStyle}
            >
              See how to install &rarr;
            </button>
          </div>
        </div>
        <button onClick={dismiss} aria-label="Dismiss" style={closeBtnStyle}>
          &times;
        </button>
      </div>

      {/* Full-screen animated guide, opened from the banner. Pre-selects the
          visitor's platform; they can still toggle iPhone/Android inside. */}
      {showGuide && (
        <div style={guideOverlayStyle} role="dialog" aria-modal="true" aria-label="Install guide">
          <button onClick={() => setShowGuide(false)} aria-label="Close guide" style={guideCloseStyle}>
            &times;
          </button>
          <InstallGuide initialPlatform={mode === "android" ? "android" : "ios"} />
        </div>
      )}
    </>
  );
}

const bannerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 20,
  left: 20,
  right: 20,
  background: "#222",
  color: "#fff",
  padding: 15,
  borderRadius: 12,
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  zIndex: 9999,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const installBtnStyle: React.CSSProperties = {
  background: "#007aff",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: 6,
  fontWeight: "bold",
  cursor: "pointer",
};

const closeBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#aaa",
  fontSize: 24,
  lineHeight: 1,
  cursor: "pointer",
  padding: "0 5px",
};

const guideBtnStyle: React.CSSProperties = {
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.35)",
  padding: "8px 14px",
  borderRadius: 6,
  fontWeight: 600,
  fontSize: 13,
  cursor: "pointer",
};

const guideOverlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 10000,
  background: "#eef1f6",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
};

const guideCloseStyle: React.CSSProperties = {
  position: "fixed",
  top: "calc(env(safe-area-inset-top) + 10px)",
  right: 14,
  zIndex: 10001,
  width: 40,
  height: 40,
  borderRadius: 999,
  background: "rgba(0,0,0,0.55)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.25)",
  fontSize: 26,
  lineHeight: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
