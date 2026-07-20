/**
 * AICoWorkerSection — wheel-picker style infinite vertical feature navigator.
 *
 * Architecture:
 *   • LOOPED = features × 3  (so there are real items above AND below at all times)
 *   • `step` starts at FEATURES.length (middle copy) and counts up.
 *   • translateY = (CENTER − step) × ITEM_H  →  item[step] always sits at center row.
 *   • Arrow and center highlight are absolutely-positioned; they never move.
 *   • Only the <ul> translates.
 *   • Silent reset: when step hits 2×FEATURES.length we snap back to FEATURES.length
 *     (identical visual position in the middle copy) with animation off for one frame.
 */

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import bgImage from "@/assets/erpcrew-section-bg.png";

// ─── data ────────────────────────────────────────────────────────────────────

const FEATURES = [
  "Natural Language Process Automation",
  "Real-Time ERP Data Insights",
  "Intelligent Document Processing",
  "Autonomous Workflow Orchestration",
  "Predictive Analytics & Forecasting",
  "Multi-Agent Collaboration",
  "Compliance & Audit Automation",
  "Seamless Dynamics 365 Integration",
];

// ─── layout constants ─────────────────────────────────────────────────────────

const VISIBLE   = 5;                        // rows shown at once
const CENTER    = Math.floor(VISIBLE / 2);  // = 2  (0-indexed middle slot)
const ITEM_H    = 72;                       // px  – height of every row
const VIEWPORT  = VISIBLE * ITEM_H;        // px  – total height of the picker
const INTERVAL  = 2200;                     // ms  – auto-advance period

// Triple so that, at any step, slots above AND below the center are filled.
const LOOPED  = [...FEATURES, ...FEATURES, ...FEATURES];
const N       = FEATURES.length;            // = 8

// ─── component ───────────────────────────────────────────────────────────────

export function AICoWorkerSection() {
  // Start in the middle copy so rows are populated above and below immediately.
  const [step, setStep]       = useState(N);
  const [animate, setAnimate] = useState(true);

  // Auto-advance the list upward.
  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Silent reset: when step would exhaust the bottom copy, jump back one full
  // cycle (N steps) — the tripled list looks identical at step and step±N.
  useEffect(() => {
    if (step >= 2 * N) {
      setAnimate(false);          // disable CSS transition for one frame
      setStep((s) => s - N);     // snap — no visual change, items are identical
    }
  }, [step]);

  // Re-enable the CSS transition on the next animation frame after the snap.
  useEffect(() => {
    if (!animate) {
      const raf = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animate]);

  // The translation that places item[step] in the center slot:
  //   item[i].top = i × ITEM_H + translateY
  //   center slot top = CENTER × ITEM_H
  //   → translateY = (CENTER − step) × ITEM_H
  const translateY = (CENTER - step) * ITEM_H;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 mx-auto flex max-w-screen-2xl flex-col items-center gap-12 px-6 py-24 md:flex-row md:items-center md:gap-16 md:px-10 lg:gap-28">

        {/* ── LEFT: copy ─────────────────────────────────────────────────── */}
        <div className="flex-1">
          <span
            className="inline-block rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
            style={{ background: "#2ababe" }}
          >
            AI Co-Worker
          </span>

          <h2
            className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl"
            style={{ color: "#051895" }}
          >
            Your AI Co-Worker,{" "}
            <span style={{ color: "#fba226" }}>Always On</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-600">
            KDS ERP Crew deploys intelligent AI agents that work alongside your
            teams inside Microsoft Dynamics&nbsp;365 — automating repetitive
            tasks, surfacing real-time insights, and orchestrating complex
            workflows so your people can focus on what matters most.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#catalogue"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: "#051895" }}
            >
              Explore Agent Library <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#highlights"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition hover:bg-slate-50"
              style={{ borderColor: "#051895", color: "#051895" }}
            >
              See Live Demos <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* ── RIGHT: wheel picker ─────────────────────────────────────────── */}
        <div
          className="w-full flex-shrink-0 md:w-[440px] lg:w-[520px]"
          style={{ position: "relative", height: VIEWPORT, overflow: "hidden" }}
        >
          {/* ── Fixed teal arrow — absolutely positioned, NEVER moves ── */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: CENTER * ITEM_H,          // exactly the center row's top
              left: 0,
              height: ITEM_H,
              display: "flex",
              alignItems: "center",
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            {/* CSS border-trick triangle — pure, no SVG */}
            <span
              style={{
                display: "inline-block",
                width: 0,
                height: 0,
                borderTop: "9px solid transparent",
                borderBottom: "9px solid transparent",
                borderLeft: "14px solid #2ababe",
                flexShrink: 0,
              }}
            />
          </div>


          {/* ── Scrolling list ── */}
          <ul
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              margin: 0,
              padding: 0,
              listStyle: "none",
              transform: `translateY(${translateY}px)`,
              transition: animate
                ? `transform ${Math.round(INTERVAL * 0.4)}ms cubic-bezier(0.4,0,0.2,1)`
                : "none",
            }}
          >
            {LOOPED.map((label, i) => {
              // Signed distance from center: negative = above, positive = below.
              // When i === step, dist === 0 → this item IS at the center slot.
              const dist    = i - step;
              const absDist = Math.abs(dist);
              const isActive = dist === 0;

              // Items more than CENTER slots away are invisible (outside viewport).
              const opacity =
                absDist === 0 ? 1
                : absDist === 1 ? 0.4
                : absDist === 2 ? 0.15
                : 0;

              return (
                <li
                  key={i}
                  style={{
                    height: ITEM_H,
                    display: "flex",
                    alignItems: "center",
                    // Indent so text starts after the fixed arrow (arrow ~24px + 1rem gap)
                    paddingLeft: "2.25rem",
                    opacity,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  <span
                    style={{
                      fontSize: isActive ? "1.625rem" : "1.375rem",
                      fontWeight: isActive ? 800 : 500,
                      lineHeight: 1.15,
                      color: isActive ? "#051895" : "#475569",
                      letterSpacing: isActive ? "-0.025em" : "-0.01em",
                      transition: "font-size 0.4s ease, color 0.4s ease, font-weight 0.4s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
