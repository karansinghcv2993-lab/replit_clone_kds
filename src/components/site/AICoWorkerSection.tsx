import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
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

// We duplicate to create a seamless loop
const LOOPED = [...FEATURES, ...FEATURES];

const VISIBLE = 5; // number of rows shown at once
const CENTER = Math.floor(VISIBLE / 2); // index 2 — middle slot
const ITEM_H = 64; // px — height of each row
const INTERVAL = 2000; // ms between auto-advances

export function AICoWorkerSection() {
  // `offset` = how many items we've advanced (always increments, never wraps)
  const [offset, setOffset] = useState(0);
  const [animated, setAnimated] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start auto-scroll
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setOffset((o) => o + 1);
    }, INTERVAL);
    return () => clearInterval(intervalRef.current!);
  }, []);

  // When offset would push us past the real list, silently reset to keep the
  // number manageable (always stay within the doubled array so no flicker)
  useEffect(() => {
    if (offset >= FEATURES.length) {
      // Jump back by FEATURES.length — visually identical but offset shrinks
      setAnimated(false);
      setOffset((o) => o - FEATURES.length);
    }
  }, [offset]);

  // Re-enable animation on the next paint after the silent reset
  useEffect(() => {
    if (!animated) {
      // One frame delay so the DOM reflects the new offset before we turn CSS back on
      const raf = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  // The translate puts item[offset] in the TOP slot; we want it in CENTER slot
  // So translateY = -(offset - CENTER) * ITEM_H, clamped to offset>=CENTER
  const translateY = -Math.max(0, offset - CENTER) * ITEM_H;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "520px" }}
    >
      {/* Background image */}
      <img
        src={bgImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Dark navy overlay for readability */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(5,24,149,0.72)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-screen-2xl flex-col items-center gap-12 px-6 py-20 md:flex-row md:items-center md:gap-16 md:px-10 lg:gap-24">
        {/* ── LEFT: copy ── */}
        <div className="flex-1 text-white">
          {/* Eyebrow */}
          <span
            className="inline-block rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{ background: "#2ababe", color: "#fff" }}
          >
            AI Co-Worker
          </span>

          <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Your AI Co-Worker,{" "}
            <span style={{ color: "#fba226" }}>Always On</span>
          </h2>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">
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
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
              style={{ background: "#fba226", color: "#051895" }}
            >
              Explore the Agent Library <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#highlights"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("highlights")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              See Live Demos <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* ── RIGHT: feature navigator ── */}
        <div className="w-full flex-shrink-0 md:w-[420px] lg:w-[480px]">
          <FeatureScroller
            offset={offset}
            animated={animated}
            translateY={translateY}
          />
        </div>
      </div>
    </section>
  );
}

/* ── Feature Scroller component ── */
function FeatureScroller({
  offset,
  animated,
  translateY,
}: {
  offset: number;
  animated: boolean;
  translateY: number;
}) {
  // Which visual slot is the "center" highlighted one?
  // The center slot always shows LOOPED[offset] (since offset advances).
  // We just need per-slot distance from center to style each.
  const visibleItems = Array.from({ length: VISIBLE }, (_, slotIdx) => {
    const dataIdx = (offset + slotIdx) % LOOPED.length;
    return { label: LOOPED[dataIdx], slotIdx };
  });

  return (
    <div
      className="relative select-none overflow-hidden rounded-2xl"
      style={{
        height: VISIBLE * ITEM_H,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Top & bottom fade masks */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,24,149,0.55) 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24"
        style={{
          background:
            "linear-gradient(to top, rgba(5,24,149,0.55) 0%, transparent 100%)",
        }}
      />

      {/* Center highlight bar */}
      <div
        className="pointer-events-none absolute inset-x-0 z-10"
        style={{
          top: CENTER * ITEM_H,
          height: ITEM_H,
          background: "rgba(42,186,190,0.12)",
          borderTop: "1px solid rgba(42,186,190,0.35)",
          borderBottom: "1px solid rgba(42,186,190,0.35)",
        }}
      />

      {/* Scrolling list */}
      <ul
        className="absolute left-0 top-0 w-full"
        style={{
          transform: `translateY(${translateY}px)`,
          transition: animated ? `transform ${INTERVAL * 0.35}ms cubic-bezier(0.4,0,0.2,1)` : "none",
        }}
      >
        {LOOPED.map((label, i) => {
          // Distance from where this item would sit in the center slot
          const distFromCenter = i - offset - CENTER;
          // For visual styling: how far is it from the currently-visible center?
          // We use the slot distance for the currently rendered window
          const slotDist = Math.abs(distFromCenter);
          const isCenter = distFromCenter === 0;

          const opacity =
            slotDist === 0 ? 1 : slotDist === 1 ? 0.6 : slotDist === 2 ? 0.3 : 0;

          return (
            <li
              key={i}
              className="flex items-center gap-3 px-6"
              style={{
                height: ITEM_H,
                opacity,
                transition: "opacity 0.3s ease",
              }}
            >
              {/* Arrow indicator — only on center */}
              <ChevronRight
                className="h-5 w-5 flex-shrink-0 transition-all duration-300"
                style={{
                  color: isCenter ? "#fba226" : "#2ababe",
                  opacity: isCenter ? 1 : 0.4,
                  transform: isCenter ? "scale(1.2)" : "scale(1)",
                }}
              />
              <span
                className="text-sm font-semibold leading-snug tracking-wide"
                style={{
                  color: isCenter ? "#fff" : "rgba(255,255,255,0.7)",
                  fontSize: isCenter ? "1rem" : "0.875rem",
                  transition: "all 0.3s ease",
                }}
              >
                {label}
              </span>
              {/* Teal accent dot on center */}
              {isCenter && (
                <span
                  className="ml-auto h-2 w-2 flex-shrink-0 rounded-full"
                  style={{ background: "#2ababe" }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
