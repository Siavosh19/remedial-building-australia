"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Interactive "add the app to your phone" walkthrough. Rendered on /install and
// linked from the mobile install banner. Purely presentational — it simulates
// the Safari (iOS 26) and Chrome (Android) install steps with a highlighted
// "tap here" marker; nothing here reads or writes real device state.

const ICON = "/apple-touch-icon.png?v=2";

type Platform = "ios" | "android";
interface Tap { sel: string; label: string; }
interface Step { t: string; p: string; screen: string; tap?: Tap; }
interface Flow { note: string; steps: Step[]; }
interface TapPos { ring: CSSProperties; label: CSSProperties; text: string; }

function homeGrid(): string {
  const filler = (n: number) =>
    Array.from({ length: n })
      .map(() => '<div class="app"><span class="t"></span><span class="l"></span></div>')
      .join("");
  return `<div class="scr"><div class="home"><div class="grid">
      ${filler(3)}
      <div class="app rba"><span class="t" style="background-image:url(\'${ICON}\')"></span><span class="l">RBA</span></div>
      ${filler(8)}
    </div></div></div>`;
}

const SCREENS: Record<string, () => string> = {
  iosPage: () => `
      <div class="scr">
        <div class="statusbar"></div>
        <div class="page">
          <div class="hero">Remedial Building Australia</div>
          <div class="ln m"></div><div class="ln"></div><div class="ln s"></div>
          <div class="ln m"></div><div class="ln s"></div><div class="ln"></div>
        </div>
        <div class="safari-bottom">
          <span class="nav">&#8249;</span><span class="nav">&#8250;</span>
          <span class="pill">remedialbuildingaustralia.com.au</span>
          <span class="iconbtn more-btn" style="color:#007aff;font-size:17px">&#8943;</span>
          <span class="nav">&#9633;</span>
        </div>
      </div>`,
  iosSheet: () => `
      <div class="scr"><div class="statusbar"></div><div class="page" style="filter:brightness(.82)">
        <div class="hero">Remedial Building Australia</div><div class="ln m"></div><div class="ln"></div><div class="ln s"></div></div>
        <div class="sheet">
          <div class="row"><span>Copy</span><span class="r-ic">&#128203;</span></div>
          <div class="row"><span>Add to Reading List</span><span class="r-ic">&#128366;</span></div>
          <div class="row row-add"><span><b>Add to Home Screen</b></span><span class="r-ic">&#43;</span></div>
          <div class="row"><span>Markup</span><span class="r-ic">&#9998;</span></div>
        </div>
      </div>`,
  iosDialog: () => `
      <div class="scr"><div class="statusbar"></div><div class="page" style="filter:brightness(.7)"></div>
        <div class="dialog"><div class="box">
          <div class="dhead"><span class="cancel">Cancel</span><b style="font-size:12px">Add to Home Screen</b><span class="add">Add</span></div>
          <div class="dbody"><span class="app-ic" style="background-image:url(\'${ICON}\')"></span>
            <div class="meta"><b>RBA</b><span>remedialbuildingaustralia.com.au</span></div></div>
        </div></div>
      </div>`,
  iosHome: () => homeGrid(),
  andPage: () => `
      <div class="scr">
        <div class="statusbar"></div>
        <div class="chrome-top">
          <span class="addr">remedialbuildingaustralia.com.au</span>
          <span class="iconbtn more-btn" style="font-size:16px">&#8942;</span>
        </div>
        <div class="page">
          <div class="hero">Remedial Building Australia</div>
          <div class="ln m"></div><div class="ln"></div><div class="ln s"></div>
          <div class="ln m"></div><div class="ln s"></div><div class="ln"></div>
        </div>
      </div>`,
  andMenu: () => `
      <div class="scr">
        <div class="statusbar"></div>
        <div class="chrome-top"><span class="addr">remedialbuildingaustralia.com.au</span><span class="iconbtn" style="font-size:16px">&#8942;</span></div>
        <div class="page" style="filter:brightness(.85)"><div class="hero">Remedial Building Australia</div><div class="ln m"></div></div>
        <div class="sheet" style="top:6px;bottom:auto;left:auto;right:6px;width:64%;background:#fff;padding:5px">
          <div class="row" style="background:#fff"><span>New tab</span></div>
          <div class="row" style="background:#fff"><span>History</span></div>
          <div class="row row-install" style="background:#fff"><span><b>Install app</b></span><span class="r-ic">&#8681;</span></div>
          <div class="row" style="background:#fff"><span>Share&#8230;</span></div>
        </div>
      </div>`,
  andDialog: () => `
      <div class="scr"><div class="statusbar"></div>
        <div class="chrome-top"><span class="addr">remedialbuildingaustralia.com.au</span><span class="iconbtn">&#8942;</span></div>
        <div class="page" style="filter:brightness(.6)"></div>
        <div class="dialog android"><div class="box">
          <div class="dbody"><span class="app-ic" style="background-image:url(\'${ICON}\')"></span>
            <div class="meta"><b>Install app</b><span>Remedial Building Australia</span></div></div>
          <div class="android-actions"><span class="btn">Cancel</span><span class="btn btn-install" style="background:color-mix(in srgb,#1a73e8 12%,#fff)">Install</span></div>
        </div></div>
      </div>`,
  andHome: () => homeGrid(),
};

const FLOWS: Record<Platform, Flow> = {
  ios: {
    note: '<b>On iPhone 17 (iOS 26)</b> the old Share square is gone \u2014 the option now lives inside the <kbd>&#8943;</kbd> menu at the bottom-right of Safari. This guide points you straight to it.',
    steps: [
      { t: "Open the site in Safari", p: 'Go to <b>remedialbuildingaustralia.com.au</b> in <b>Safari</b> (not Chrome \u2014 only Safari can install on iPhone).', screen: "iosPage" },
      { t: "Tap the \u22ef menu", p: 'At the <b>bottom-right</b> of Safari, tap the <kbd>&#8943;</kbd> (More) button.', screen: "iosPage", tap: { sel: ".more-btn", label: "Tap" } },
      { t: "Choose \u201cAdd to Home Screen\u201d", p: 'Scroll the menu if needed, then tap <kbd>Add to Home Screen</kbd>.', screen: "iosSheet", tap: { sel: ".row-add", label: "Tap" } },
      { t: "Tap \u201cAdd\u201d", p: 'A preview shows the RBA icon and name. Tap <kbd>Add</kbd> at the top-right.', screen: "iosDialog", tap: { sel: ".add", label: "Tap" } },
      { t: "Done \u2014 it\u2019s on your home screen", p: 'The RBA icon now sits on your home screen. Tap it any time to open the app full-screen.', screen: "iosHome", tap: { sel: ".rba .t", label: "RBA" } },
    ],
  },
  android: {
    note: '<b>On Android (Chrome)</b> you may see an <b>\u201cInstall app\u201d</b> banner pop up on its own \u2014 tapping that does the same thing. If it doesn\u2019t appear, use the <kbd>&#8942;</kbd> menu as shown here.',
    steps: [
      { t: "Open the site in Chrome", p: 'Go to <b>remedialbuildingaustralia.com.au</b> in <b>Chrome</b>.', screen: "andPage" },
      { t: "Tap the \u22ee menu", p: 'At the <b>top-right</b> of Chrome, tap the <kbd>&#8942;</kbd> (three dots) button.', screen: "andPage", tap: { sel: ".more-btn", label: "Tap" } },
      { t: "Tap \u201cInstall app\u201d", p: 'In the menu, tap <kbd>Install app</kbd> (sometimes shown as \u201cAdd to Home screen\u201d).', screen: "andMenu", tap: { sel: ".row-install", label: "Tap" } },
      { t: "Confirm \u2014 tap \u201cInstall\u201d", p: 'A dialog shows the RBA icon. Tap <kbd>Install</kbd>.', screen: "andDialog", tap: { sel: ".btn-install", label: "Tap" } },
      { t: "Done \u2014 it\u2019s on your home screen", p: 'The RBA app is added. Find its icon on your home screen and tap to open.', screen: "andHome", tap: { sel: ".rba .t", label: "RBA" } },
    ],
  },
};

const CSS = String.raw`:root {
    --navy: #0f2748;
--navy-deep: #0a1c34;
--navy-soft: #1c3a5e;
    --hivis: #ffb400;
--hivis-ink: #7a5200;
    --ios-blue: #007aff;
    --ground: #eef1f6;
--card: #ffffff;
--ink: #14202f;
--ink-soft: #55637a;
--hair: #dde3ec;
--shadow: 20px 40px 80px -30px rgba(15, 39, 72, 0.45);
}
@media (prefers-color-scheme: dark) {
:root {
--navy: #17335a;
--ground: #0a121f;
--card: #111c2e;
--ink: #e8eef7;
--ink-soft: #93a2ba;
--hair: #24344b;
--shadow: 20px 40px 90px -30px rgba(0, 0, 0, 0.7);
}
}
:root[data-theme="light"] {
--navy: #0f2748;
--ground: #eef1f6;
--card: #ffffff;
--ink: #14202f;
--ink-soft: #55637a;
--hair: #dde3ec;
--shadow: 20px 40px 80px -30px rgba(15,39,72,0.45);
}
:root[data-theme="dark"] {
--navy: #17335a;
--ground: #0a121f;
--card: #111c2e;
--ink: #e8eef7;
--ink-soft: #93a2ba;
--hair: #24344b;
--shadow: 20px 40px 90px -30px rgba(0,0,0,0.7);
}
.ig-root * {
box-sizing: border-box;
}
.ig-root {
margin: 0;
background:
      radial-gradient(1200px 600px at 100% -10%, color-mix(in srgb, var(--navy) 12%, transparent), transparent 60%),
      var(--ground);
color: var(--ink);
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
line-height: 1.5;
}
.ig-root .wrap {
max-width: 1040px;
margin: 0 auto;
padding: clamp(20px, 5vw, 56px) clamp(16px, 4vw, 40px) 64px;
}
.ig-root
  .eyebrow {
display: inline-flex;
align-items: center;
gap: 8px;
font-size: 12px;
font-weight: 700;
letter-spacing: 0.14em;
text-transform: uppercase;
color: var(--ink-soft);
margin: 0 0 14px;
}
.ig-root .eyebrow .dot {
width: 7px;
height: 7px;
border-radius: 50%;
background: var(--hivis);
box-shadow: 0 0 0 3px color-mix(in srgb, var(--hivis) 30%, transparent);
}
.ig-root h1 {
font-size: clamp(28px, 5.2vw, 44px);
line-height: 1.05;
letter-spacing: -0.02em;
margin: 0 0 12px;
text-wrap: balance;
font-weight: 800;
}
.ig-root .lede {
font-size: clamp(15px, 2.2vw, 18px);
color: var(--ink-soft);
max-width: 60ch;
margin: 0 0 28px;
}
.ig-root
  .toggle {
display: inline-flex;
padding: 4px;
gap: 4px;
border-radius: 14px;
background: color-mix(in srgb, var(--navy) 8%, var(--card));
border: 1px solid var(--hair);
margin-bottom: 32px;
}
.ig-root .toggle button {
appearance: none;
border: 0;
cursor: pointer;
font: inherit;
font-weight: 650;
padding: 9px 20px;
border-radius: 10px;
color: var(--ink-soft);
background: transparent;
display: inline-flex;
align-items: center;
gap: 8px;
transition: color .18s;
}
.ig-root .toggle button svg {
width: 16px;
height: 16px;
}
.ig-root .toggle button[aria-selected="true"] {
color: #fff;
background: var(--navy);
box-shadow: 0 6px 16px -8px var(--navy);
}
.ig-root
  .stage {
display: grid;
grid-template-columns: minmax(0, 300px) 1fr;
gap: clamp(28px, 5vw, 60px);
align-items: start;
}
@media (max-width: 760px) {
.ig-root .stage {
grid-template-columns: 1fr;
}
}
.ig-root
  .phone-col {
position: sticky;
top: 28px;
display: flex;
flex-direction: column;
align-items: center;
gap: 18px;
}
@media (max-width: 760px) {
.ig-root .phone-col {
position: static;
}
}
.ig-root .phone {
width: 270px;
aspect-ratio: 9 / 19.5;
background: #0b0f16;
border-radius: 42px;
padding: 11px;
box-shadow: var(--shadow), inset 0 0 0 2px #2a3242;
position: relative;
}
.ig-root .screen {
position: relative;
width: 100%;
height: 100%;
border-radius: 32px;
overflow: hidden;
background: #f6f7f9;
color: #1c1c1e;
}
.ig-root .island {
position: absolute;
top: 9px;
left: 50%;
transform: translateX(-50%);
width: 78px;
height: 22px;
background: #0b0f16;
border-radius: 14px;
z-index: 30;
}
.ig-root
  .scr {
position: absolute;
inset: 0;
display: flex;
flex-direction: column;
font-size: 11px;
}
.ig-root .scr .statusbar {
height: 34px;
flex: 0 0 34px;
}
.ig-root .chrome-top {
display: flex;
align-items: center;
gap: 6px;
padding: 6px 8px;
background: #ececf0;
border-bottom: 1px solid #d9d9de;
}
.ig-root .addr {
flex: 1;
background: #fff;
border-radius: 8px;
padding: 5px 9px;
color: #3c3c43;
font-size: 10px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}
.ig-root .iconbtn {
width: 26px;
height: 22px;
display: grid;
place-items: center;
border-radius: 6px;
color: #3c3c43;
font-size: 15px;
}
.ig-root .page {
flex: 1;
overflow: hidden;
background: #fff;
padding: 12px 12px 0;
}
.ig-root .page .hero {
height: 46px;
border-radius: 8px;
background: linear-gradient(120deg, var(--navy), var(--navy-soft));
margin-bottom: 10px;
display:flex;
align-items:center;
padding:0 10px;
color:#fff;
font-weight:700;
font-size:11px;
letter-spacing:.02em;
}
.ig-root .page .ln {
height: 8px;
border-radius: 4px;
background: #e7e9ee;
margin-bottom: 7px;
}
.ig-root .page .ln.s {
width: 60%;
}
.ig-root .page .ln.m {
width: 82%;
}
.ig-root .safari-bottom {
display: flex;
align-items: center;
gap: 8px;
padding: 8px 12px 14px;
background: #f6f7f9;
border-top: 1px solid #e2e2e6;
}
.ig-root .safari-bottom .nav {
color: #007aff;
font-size: 17px;
}
.ig-root .safari-bottom .pill {
flex: 1;
background: #e9e9ee;
border-radius: 10px;
padding: 7px 10px;
text-align: center;
color: #3c3c43;
font-size: 10px;
}
.ig-root
  .sheet {
position: absolute;
left: 6px;
right: 6px;
bottom: 6px;
background: #f2f2f7;
border-radius: 16px;
padding: 6px;
z-index: 20;
box-shadow: 0 -10px 40px rgba(0,0,0,.18);
}
.ig-root .sheet .row {
display: flex;
align-items: center;
justify-content: space-between;
gap: 10px;
padding: 11px 12px;
background: #fff;
font-size: 12px;
color: #1c1c1e;
}
.ig-root .sheet .row + .row {
margin-top: 1px;
}
.ig-root .sheet .row:first-of-type {
border-radius: 12px 12px 4px 4px;
}
.ig-root .sheet .row:last-of-type {
border-radius: 4px 4px 12px 12px;
}
.ig-root .sheet .row .r-ic {
color: #1c1c1e;
font-size: 15px;
width: 22px;
text-align:center;
}
.ig-root
  .dialog {
position: absolute;
inset: 0;
background: rgba(0,0,0,.28);
display: flex;
align-items: flex-start;
justify-content: center;
z-index: 25;
}
.ig-root .dialog.android {
align-items: center;
}
.ig-root .dialog .box {
margin-top: 40px;
width: 90%;
background: #fff;
border-radius: 14px;
overflow: hidden;
}
.ig-root .dialog.android .box {
margin-top: 0;
border-radius: 18px;
padding-bottom: 6px;
}
.ig-root .dialog .dhead {
display: flex;
align-items: center;
justify-content: space-between;
padding: 12px 14px;
border-bottom: 1px solid #ececf0;
}
.ig-root .dialog .dhead .cancel {
color: #007aff;
font-size: 12px;
}
.ig-root .dialog .dhead .add {
color: #007aff;
font-weight: 700;
font-size: 12px;
}
.ig-root .dialog .dbody {
display: flex;
align-items: center;
gap: 11px;
padding: 14px;
}
.ig-root .app-ic {
width: 44px;
height: 44px;
border-radius: 10px;
flex: 0 0 44px;
background-size: cover;
box-shadow: 0 2px 6px rgba(0,0,0,.15);
}
.ig-root .dialog .meta b {
font-size: 12px;
}
.ig-root .dialog .meta span {
font-size: 10px;
color: #8e8e93;
display:block;
}
.ig-root .android-actions {
display: flex;
justify-content: flex-end;
gap: 6px;
padding: 4px 14px 12px;
}
.ig-root .android-actions .btn {
font-size: 12px;
font-weight: 600;
color: #1a73e8;
padding: 7px 12px;
border-radius: 8px;
}
.ig-root
  .home {
position: absolute;
inset: 0;
background: linear-gradient(160deg, #24476f, #0f2748 70%);
padding: 40px 20px 16px;
z-index: 15;
}
.ig-root .home .grid {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 16px 12px;
}
.ig-root .home .app {
display: flex;
flex-direction: column;
align-items: center;
gap: 5px;
}
.ig-root .home .app .t {
width: 42px;
height: 42px;
border-radius: 11px;
background: rgba(255,255,255,.16);
}
.ig-root .home .app .l {
font-size: 8px;
color: #fff;
opacity: .9;
}
.ig-root .home .app.rba .t {
background-size: cover;
box-shadow: 0 4px 12px rgba(0,0,0,.35);
}
.ig-root
  .tap {
position: absolute;
z-index: 40;
border: 3px solid var(--hivis);
border-radius: 50%;
box-shadow: 0 0 0 4px rgba(255,180,0,.28);
pointer-events: none;
animation: pulse 1.6s ease-in-out infinite;
}
@keyframes pulse {
0%,100% {
transform: scale(1);
box-shadow: 0 0 0 4px rgba(255,180,0,.28);
}
50% {
transform: scale(1.12);
box-shadow: 0 0 0 9px rgba(255,180,0,0);
}
}
.ig-root .tap-label {
position: absolute;
z-index: 41;
background: var(--hivis);
color: #241a00;
font-weight: 800;
font-size: 10px;
letter-spacing: .04em;
text-transform: uppercase;
padding: 4px 9px;
border-radius: 999px;
white-space: nowrap;
box-shadow: 0 6px 16px -4px rgba(255,180,0,.7);
}
@media (prefers-reduced-motion: reduce) {
.ig-root .tap {
animation: none;
}
}
.ig-root .stepcount {
font-size: 12px;
font-weight: 700;
letter-spacing: .1em;
text-transform: uppercase;
color: var(--hivis-ink);
background: color-mix(in srgb, var(--hivis) 22%, var(--card));
padding: 5px 12px;
border-radius: 999px;
}
@media (prefers-color-scheme: dark) {
.ig-root .stepcount {
color: var(--hivis);
background: color-mix(in srgb, var(--hivis) 14%, transparent);
}
}
.ig-root
  .steps {
display: flex;
flex-direction: column;
gap: 10px;
}
.ig-root .step {
display: grid;
grid-template-columns: 40px 1fr;
gap: 14px;
align-items: start;
cursor: pointer;
padding: 16px 18px;
border-radius: 16px;
border: 1px solid var(--hair);
background: var(--card);
transition: border-color .18s, transform .18s, box-shadow .18s;
text-align: left;
width: 100%;
font: inherit;
color: inherit;
}
.ig-root .step:hover {
border-color: color-mix(in srgb, var(--navy) 40%, var(--hair));
}
.ig-root .step:focus-visible {
outline: 3px solid var(--ios-blue);
outline-offset: 2px;
}
.ig-root .step[aria-current="true"] {
border-color: var(--hivis);
box-shadow: 0 12px 30px -18px var(--navy), inset 3px 0 0 var(--hivis);
transform: translateX(2px);
}
.ig-root .step .num {
width: 40px;
height: 40px;
border-radius: 11px;
display: grid;
place-items: center;
font-weight: 800;
font-size: 16px;
background: color-mix(in srgb, var(--navy) 10%, var(--card));
color: var(--navy);
font-variant-numeric: tabular-nums;
}
.ig-root .step[aria-current="true"] .num {
background: var(--navy);
color: #fff;
}
.ig-root .step h3 {
margin: 4px 0 4px;
font-size: 16px;
letter-spacing: -0.01em;
}
.ig-root .step p {
margin: 0;
font-size: 14px;
color: var(--ink-soft);
}
.ig-root .step p kbd {
font: inherit;
font-weight: 700;
color: var(--ink);
background: color-mix(in srgb, var(--hivis) 26%, transparent);
padding: 1px 6px;
border-radius: 6px;
}
.ig-root .step .detail {
display: none;
}
.ig-root .step[aria-current="true"] .detail {
display: block;
}
.ig-root .navrow {
display: flex;
align-items: center;
gap: 12px;
margin-top: 22px;
}
.ig-root .btn {
appearance: none;
font: inherit;
font-weight: 700;
cursor: pointer;
border-radius: 12px;
padding: 12px 22px;
border: 1px solid var(--hair);
background: var(--card);
color: var(--ink);
transition: transform .12s, background .18s, opacity .18s;
}
.ig-root .btn:active {
transform: translateY(1px);
}
.ig-root .btn.primary {
background: var(--navy);
border-color: var(--navy);
color: #fff;
}
.ig-root .btn.primary:hover {
background: var(--navy-soft);
}
.ig-root .btn:disabled {
opacity: .4;
cursor: default;
}
.ig-root .btn:focus-visible {
outline: 3px solid var(--ios-blue);
outline-offset: 2px;
}
.ig-root .note {
margin-top: 26px;
font-size: 13px;
color: var(--ink-soft);
border-top: 1px solid var(--hair);
padding-top: 18px;
display:flex;
gap:10px;
}
.ig-root .note b {
color: var(--ink);
}
.ig-root .note .badge {
flex:0 0 auto;
width: 20px;
height: 20px;
border-radius: 6px;
background: color-mix(in srgb, var(--hivis) 30%, transparent);
color: var(--hivis-ink);
display:grid;
place-items:center;
font-weight:800;
font-size:12px;
}`;

export default function InstallGuide({ initialPlatform = "ios" }: { initialPlatform?: Platform } = {}) {
  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [idx, setIdx] = useState(0);
  const [tap, setTap] = useState<TapPos | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const flow = FLOWS[platform];
  const safeIdx = Math.min(idx, flow.steps.length - 1);
  const step = flow.steps[safeIdx];

  useEffect(() => {
    const compute = () => {
      const scr = screenRef.current;
      const inner = innerRef.current;
      const t = FLOWS[platform].steps[safeIdx].tap;
      if (!scr || !inner || !t) { setTap(null); return; }
      const target = inner.querySelector(t.sel) as HTMLElement | null;
      if (!target) { setTap(null); return; }
      const sRect = scr.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      const cx = tRect.left - sRect.left + tRect.width / 2;
      const cy = tRect.top - sRect.top + tRect.height / 2;
      const d = Math.max(30, Math.max(tRect.width, tRect.height) + 14);
      const below = cy < 60;
      setTap({
        ring: { left: cx - d / 2, top: cy - d / 2, width: d, height: d },
        label: {
          left: Math.min(Math.max(cx - 20, 6), sRect.width - 54),
          top: below ? cy + d / 2 + 4 : cy - d / 2 - 22,
        },
        text: t.label,
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [platform, safeIdx]);

  const go = (i: number) => { setIdx(i); };
  const selectPlatform = (p: Platform) => { setPlatform(p); setIdx(0); };
  const lastStep = safeIdx === flow.steps.length - 1;

  return (
    <div className="ig-root" style={{ minHeight: "100dvh" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="wrap">
        <p className="eyebrow"><span className="dot" /> Remedial Building Australia &middot; Install guide</p>
        <h1>Add the RBA app to your phone</h1>
        <p className="lede">It takes about 20 seconds. Once it&rsquo;s on your home screen it opens full-screen like a normal app, loads faster, and the pages you&rsquo;ve viewed still work with no signal. Pick your phone below and follow the highlighted taps.</p>

        <div className="toggle" role="tablist" aria-label="Choose your phone">
          <button role="tab" aria-selected={platform === "ios"} onClick={() => selectPlatform("ios")}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8zM14.2 6.2c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3z" /></svg>
            iPhone
          </button>
          <button role="tab" aria-selected={platform === "android"} onClick={() => selectPlatform("android")}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 9v7a1 1 0 001 1h1v3a1 1 0 002 0v-3h2v3a1 1 0 002 0v-3h1a1 1 0 001-1V9H6zM4.5 9A1.5 1.5 0 003 10.5v4a1.5 1.5 0 003 0v-4A1.5 1.5 0 004.5 9zm15 0a1.5 1.5 0 00-1.5 1.5v4a1.5 1.5 0 003 0v-4A1.5 1.5 0 0019.5 9zM15.5 4.3l1-1.5a.3.3 0 00-.5-.3l-1 1.6A5.9 5.9 0 0012 3.6c-1 0-2 .2-2.9.6l-1-1.6a.3.3 0 00-.5.3l1 1.5A5.5 5.5 0 006 8.2h12a5.5 5.5 0 00-2.5-3.9zM9.5 6.6a.6.6 0 110-1.2.6.6 0 010 1.2zm5 0a.6.6 0 110-1.2.6.6 0 010 1.2z" /></svg>
            Android
          </button>
        </div>

        <div className="stage">
          <div className="phone-col">
            <div className="phone">
              <div className="island" />
              <div className="screen" ref={screenRef}>
                <div ref={innerRef} style={{ position: "absolute", inset: 0 }} dangerouslySetInnerHTML={{ __html: SCREENS[step.screen]() }} />
                {tap && (
                  <>
                    <div className="tap" style={tap.ring} />
                    <div className="tap-label" style={tap.label}>{tap.text}</div>
                  </>
                )}
              </div>
            </div>
            <span className="stepcount">Step {safeIdx + 1} of {flow.steps.length}</span>
          </div>

          <div>
            <div className="steps" role="list">
              {flow.steps.map((s, i) => (
                <button key={i} className="step" role="listitem" aria-current={i === safeIdx} onClick={() => go(i)}>
                  <span className="num">{i + 1}</span>
                  <span>
                    <h3>{s.t}</h3>
                    <p className="detail" dangerouslySetInnerHTML={{ __html: s.p }} />
                  </span>
                </button>
              ))}
            </div>
            <div className="navrow">
              <button className="btn" disabled={safeIdx === 0} onClick={() => go(safeIdx - 1)}>&larr; Back</button>
              <button className="btn primary" onClick={() => go(lastStep ? 0 : safeIdx + 1)}>
                {lastStep ? "Start over \u21ba" : "Next step \u2192"}
              </button>
            </div>
            <div className="note">
              <span className="badge">i</span>
              <div dangerouslySetInnerHTML={{ __html: flow.note }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
