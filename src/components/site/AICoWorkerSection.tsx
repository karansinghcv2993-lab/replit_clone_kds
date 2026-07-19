import { useEffect, useRef, useState } from "react";
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

// Duplicate for seamless infinite loop
const LOOPED = [...FEATURES, ...FEATURES];

const VISIBLE = 5;       // rows shown at a time
const CENTER = Math.floor(VISIBLE / 2); // = 2 (middle slot)
const ITEM_H = 72;       // px per row
const INTERVAL = 2200;   // ms between advances

export function AICoWorkerSection() {
  const [offset, setOffset] = useState(0);
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setOffset((o) => o + 1), INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Silent reset once we pass the real list length — no visual jump
  useEffect(() => {
    if (offset >= FEATURES.length) {
      setAnimated(false);
      setOffset((o) => o - FEATURES.length);
    }
  }, [offset]);

  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  // Slide the list so the item at `offset` lands in the CENTER slot
  const translateY = -Math.max(0, offset - CENTER) * ITEM_H;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image — no overlay, colours retained as-is */}
      <img
        src={bgImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-screen-2xl flex-col items-center gap-12 px-6 py-24 md:flex-row md:items-center md:gap-16 md:px-10 lg:gap-28">

        {/* ── LEFT: copy ── */}
        <div className="flex-1">
          {/* Eyebrow */}
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

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#catalogue"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("catalogue")
                  ?.scrollIntoView({ behavior: "smooth" });
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
                document
                  .getElementById("highlights")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition hover:bg-slate-50"
              style={{ borderColor: "#051895", color: "#051895" }}
            >
              See Live Demos <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* ── RIGHT: Magnific-style floating feature list ── */}
        <div
          className="w-full flex-shrink-0 md:w-[440px] lg:w-[520px]"
          style={{ height: VISIBLE * ITEM_H, position: "relative", overflow: "hidden" }}
        >
          {/* Top fade — matches background white */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10"
            style={{
              height: ITEM_H * 1.4,
              background: "linear-gradient(to bottom, rgba(249,250,252,1) 0%, rgba(249,250,252,0) 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
            style={{
              height: ITEM_H * 1.4,
              background: "linear-gradient(to top, rgba(249,250,252,1) 0%, rgba(249,250,252,0) 100%)",
            }}
          />

          {/* Scrolling list — no card, no border, items float over the bg */}
          <ul
            className="absolute left-0 top-0 w-full"
            style={{
              transform: `translateY(${translateY}px)`,
              transition: animated
                ? `transform ${INTERVAL * 0.38}ms cubic-bezier(0.4,0,0.2,1)`
                : "none",
            }}
          >
            {LOOPED.map((label, i) => {
              const dist = i - offset - CENTER;
              const absDist = Math.abs(dist);
              const isCenter = dist === 0;

              // Magnific-style: center = full opacity, ±1 = 45%, ±2 = 18%, beyond = 0
              const opacity =
                absDist === 0 ? 1
                : absDist === 1 ? 0.45
                : absDist === 2 ? 0.18
                : 0;

              return (
                <li
                  key={i}
                  className="flex items-center"
                  style={{
                    height: ITEM_H,
                    opacity,
                    transition: "opacity 0.35s ease",
                  }}
                >
                  {/* Triangle indicator — only visible on center, Magnific-style */}
                  <span
                    className="mr-4 flex-shrink-0 transition-all duration-300"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "8px solid transparent",
                      borderBottom: "8px solid transparent",
                      borderLeft: `12px solid ${isCenter ? "#2ababe" : "transparent"}`,
                      opacity: isCenter ? 1 : 0,
                      transform: isCenter ? "scale(1)" : "scale(0.6)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: isCenter ? "1.65rem" : "1.45rem",
                      fontWeight: isCenter ? 800 : 600,
                      lineHeight: 1.15,
                      color: isCenter ? "#051895" : "#334155",
                      letterSpacing: isCenter ? "-0.02em" : "-0.01em",
                      transition: "all 0.35s ease",
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
