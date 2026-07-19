import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import bgImage from "@/assets/erpcrew-section-bg.png";

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

// Triplicate so there's always content above and below visible window
const LOOPED = [...FEATURES, ...FEATURES, ...FEATURES];

const VISIBLE = 5;                        // rows in the viewport
const CENTER  = Math.floor(VISIBLE / 2); // = 2 (0-indexed center slot)
const ITEM_H  = 72;                       // px per row
const INTERVAL = 2200;                    // ms between steps

export function AICoWorkerSection() {
  // `step` counts total advances; we translate by -step * ITEM_H
  const [step, setStep]         = useState(0);
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Silent reset: once step goes past FEATURES.length, snap back
  useEffect(() => {
    if (step >= FEATURES.length) {
      setAnimated(false);
      setStep((s) => s - FEATURES.length);
    }
  }, [step]);

  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  // The list starts offset so that LOOPED[step] sits in the CENTER slot.
  // Initial position: slot 0 maps to LOOPED index 0, but we want CENTER in
  // the middle. We pre-offset by CENTER rows, then subtract step rows.
  // translateY = (CENTER - step) * ITEM_H
  const translateY = (CENTER - step) * ITEM_H;

  const viewportH = VISIBLE * ITEM_H; // total height of the scrolling window

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

        {/* ── LEFT: copy ── */}
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

          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
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

        {/* ── RIGHT: Magnific-style fixed-center scroller ── */}
        <div
          className="w-full flex-shrink-0 md:w-[440px] lg:w-[520px]"
          style={{ height: viewportH, position: "relative", overflow: "hidden" }}
        >
          {/* ── FIXED arrow — never moves, always at vertical center ── */}
          <div
            className="pointer-events-none absolute left-0 z-20 flex items-center"
            style={{
              top: CENTER * ITEM_H,
              height: ITEM_H,
            }}
          >
            {/* Teal solid triangle */}
            <span
              style={{
                display: "inline-block",
                width: 0,
                height: 0,
                borderTop: "9px solid transparent",
                borderBottom: "9px solid transparent",
                borderLeft: "13px solid #2ababe",
                marginRight: "1rem",
                flexShrink: 0,
              }}
            />
          </div>

          {/* Top fade — blends into the hex-bg colours */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10"
            style={{
              height: ITEM_H * 1.6,
              background: "linear-gradient(to bottom, rgba(248,250,252,0.96) 0%, rgba(248,250,252,0) 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
            style={{
              height: ITEM_H * 1.6,
              background: "linear-gradient(to top, rgba(248,250,252,0.96) 0%, rgba(248,250,252,0) 100%)",
            }}
          />

          {/* ── Scrolling list — translates up; arrow stays put ── */}
          <ul
            className="absolute left-0 top-0 w-full"
            style={{
              transform: `translateY(${translateY}px)`,
              transition: animated
                ? `transform ${Math.round(INTERVAL * 0.38)}ms cubic-bezier(0.4,0,0.2,1)`
                : "none",
            }}
          >
            {LOOPED.map((label, i) => {
              // Distance from the center slot for this item at current step
              // When step=0: item i occupies visual slot i, center slot = CENTER
              // So dist = i - CENTER - step  (negative = above center)
              const dist    = i - step - CENTER;
              const absDist = Math.abs(dist);
              const isCenter = dist === 0;

              const opacity =
                absDist === 0 ? 1
                : absDist === 1 ? 0.42
                : absDist === 2 ? 0.16
                : 0;

              return (
                <li
                  key={i}
                  className="flex items-center"
                  style={{
                    height: ITEM_H,
                    // indent by the arrow width so text lines up after it
                    paddingLeft: "2rem",
                    opacity,
                    transition: "opacity 0.35s ease",
                  }}
                >
                  <span
                    style={{
                      fontSize: isCenter ? "1.65rem" : "1.4rem",
                      fontWeight: isCenter ? 800 : 600,
                      lineHeight: 1.15,
                      color: isCenter ? "#051895" : "#334155",
                      letterSpacing: isCenter ? "-0.02em" : "-0.01em",
                      transition: "font-size 0.35s ease, color 0.35s ease, font-weight 0.35s ease",
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
