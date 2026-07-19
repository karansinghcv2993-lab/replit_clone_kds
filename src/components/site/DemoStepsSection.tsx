/**
 * DemoStepsSection — scroll-driven sticky stacked cards.
 *
 * 4 cards representing the steps to book a KDS ERP Crew demo.
 * As the user scrolls, each card slides up from below and stacks on top of
 * the previous one, creating a layered deck effect. After all 4 cards are
 * in place the section unpins and normal scrolling resumes.
 *
 * Scroll mechanics:
 *   outer section height = 500vh
 *   sticky range         = 4 × 100vh
 *   initial hold         = 1 × 100vh  (card 0 visible, no animation)
 *   3 transitions        = 3 × 100vh  (one per card slide-in)
 */

import { useEffect, useRef, useState } from "react";

// ─── Step data (source of truth: attached Word document) ──────────────────────

const STEPS = [
  {
    number: 1,
    title: "Share Your Requirements",
    description:
      "Tell us about your business, ERP environment, and the processes you want to automate.",
  },
  {
    number: 2,
    title: "Schedule Your Demo",
    description:
      "Choose a convenient date and time for a personalized live demonstration with our ERP experts.",
  },
  {
    number: 3,
    title: "Experience KDS ERP Crew",
    description:
      "See AI-powered agents automate transactions, approvals, reporting, and business workflows in real time.",
  },
  {
    number: 4,
    title: "Launch Your AI Journey",
    description:
      "Receive a tailored implementation roadmap and discover how KDS ERP Crew can accelerate your enterprise transformation.",
  },
] as const;

type Step = (typeof STEPS)[number];

// Fraction of the sticky scroll range used as initial hold (≈ 1 viewport)
const HOLD = 0.25;
// Number of slide-in transitions (all cards except the first)
const TRANSITIONS = STEPS.length - 1; // 3

// ─── ERP / AI Network Illustration (consistent across all cards) ──────────────

function ERPIllustration() {
  const orbitAngles = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      viewBox="0 0 360 280"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[17rem]"
      aria-hidden
    >
      {/* ── Dashed connection lines from center to outer nodes ── */}
      <line x1="180" y1="140" x2="88"  y2="68"  stroke="rgba(42,186,190,0.4)" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="180" y1="140" x2="272" y2="68"  stroke="rgba(42,186,190,0.4)" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="180" y1="140" x2="76"  y2="216" stroke="rgba(42,186,190,0.4)" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="180" y1="140" x2="284" y2="216" stroke="rgba(42,186,190,0.4)" strokeWidth="1.5" strokeDasharray="5 4" />

      {/* ── Node: Transactions (top-left) ── */}
      <circle cx="88" cy="68" r="29" fill="rgba(42,186,190,0.1)" stroke="rgba(42,186,190,0.55)" strokeWidth="1.5" />
      <rect x="79" y="57" width="12" height="16" rx="2" fill="none" stroke="#2ababe" strokeWidth="1.5" />
      <path d="M79 62h12M79 66h12M79 70h7" stroke="#2ababe" strokeWidth="1.2" strokeLinecap="round" />
      <text x="88" y="104" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7.5" fontFamily="sans-serif">Transactions</text>

      {/* ── Node: Approvals (top-right) ── */}
      <circle cx="272" cy="68" r="29" fill="rgba(42,186,190,0.1)" stroke="rgba(42,186,190,0.55)" strokeWidth="1.5" />
      <circle cx="272" cy="68" r="11" fill="none" stroke="#2ababe" strokeWidth="1.5" />
      <polyline points="266,68 270,72 279,62" fill="none" stroke="#2ababe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="272" y="104" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7.5" fontFamily="sans-serif">Approvals</text>

      {/* ── Node: Analytics (bottom-left) ── */}
      <circle cx="76" cy="216" r="29" fill="rgba(42,186,190,0.1)" stroke="rgba(42,186,190,0.55)" strokeWidth="1.5" />
      <rect x="66" y="215" width="4" height="9"  rx="1" fill="#2ababe" />
      <rect x="72" y="209" width="4" height="15" rx="1" fill="#2ababe" />
      <rect x="78" y="212" width="4" height="12" rx="1" fill="#2ababe" />
      <text x="76" y="252" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7.5" fontFamily="sans-serif">Analytics</text>

      {/* ── Node: Workflows (bottom-right) ── */}
      <circle cx="284" cy="216" r="29" fill="rgba(42,186,190,0.1)" stroke="rgba(42,186,190,0.55)" strokeWidth="1.5" />
      <circle cx="278" cy="210" r="4" fill="none" stroke="#2ababe" strokeWidth="1.4" />
      <circle cx="290" cy="210" r="4" fill="none" stroke="#2ababe" strokeWidth="1.4" />
      <circle cx="284" cy="221" r="4" fill="none" stroke="#2ababe" strokeWidth="1.4" />
      <line x1="280" y1="213" x2="285" y2="217" stroke="#2ababe" strokeWidth="1.2" />
      <line x1="289" y1="213" x2="284" y2="217" stroke="#2ababe" strokeWidth="1.2" />
      <text x="284" y="252" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7.5" fontFamily="sans-serif">Workflows</text>

      {/* ── Central AI agent node ── */}
      {/* Outer pulse ring */}
      <circle cx="180" cy="140" r="54" fill="none" stroke="rgba(42,186,190,0.13)" strokeWidth="1.5" />
      {/* Rim */}
      <circle cx="180" cy="140" r="47" fill="rgba(5,24,149,0.55)" stroke="rgba(42,186,190,0.7)" strokeWidth="2" />
      {/* Fill */}
      <circle cx="180" cy="140" r="39" fill="#051895" />
      {/* Label */}
      <text x="180" y="135" textAnchor="middle" fill="#2ababe" fontSize="22" fontWeight="bold" fontFamily="sans-serif">AI</text>
      <text x="180" y="151" textAnchor="middle" fill="rgba(42,186,190,0.65)" fontSize="7" fontFamily="sans-serif" letterSpacing="1.5">ERP CREW</text>
      {/* Circuit dots on rim */}
      {orbitAngles.map((deg, idx) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={idx}
            cx={180 + Math.cos(rad) * 47}
            cy={140 + Math.sin(rad) * 47}
            r="2.5"
            fill="rgba(42,186,190,0.55)"
          />
        );
      })}
    </svg>
  );
}

// ─── Individual step card ─────────────────────────────────────────────────────

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">

      {/* Left panel — ERP illustration on dark brand gradient */}
      {/* Mobile: full width, fixed 11rem tall. Desktop: 42% wide, stretches to full card height */}
      <div
        className="relative flex h-44 flex-shrink-0 items-center justify-center overflow-hidden md:h-auto md:w-[42%]"
        style={{
          background: "linear-gradient(140deg, #010923 0%, #030e59 45%, #051895 80%)",
        }}
      >
        {/* Radial glow behind illustration */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(42,186,190,0.22) 0%, transparent 70%)",
          }}
        />
        <ERPIllustration />
      </div>

      {/* Right panel — text content */}
      <div className="flex flex-1 flex-col justify-center px-7 py-7 md:px-11 md:py-11"
           style={{ minWidth: 0 }}
      >
        {/* Step badge */}
        <span
          className="inline-flex w-fit items-center rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest"
          style={{ backgroundColor: "rgba(251,162,38,0.12)", color: "#fba226" }}
        >
          Step {step.number}
        </span>

        {/* Large decorative number */}
        <p
          aria-hidden
          className="mt-3 select-none font-black leading-none"
          style={{ fontSize: "clamp(3.5rem,7vw,5.5rem)", color: "rgba(5,24,149,0.07)" }}
        >
          {String(step.number).padStart(2, "0")}
        </p>

        {/* Title */}
        <h3
          className="-mt-1 text-xl font-bold leading-snug md:text-2xl lg:text-3xl"
          style={{ color: "#051895" }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-gray-500">
          {step.description}
        </p>

        {/* Teal accent bar */}
        <div
          className="mt-6 h-1 w-10 rounded-full"
          style={{ backgroundColor: "#2ababe" }}
        />
      </div>
    </div>
  );
}

// ─── Main section export ──────────────────────────────────────────────────────

export function DemoStepsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  /**
   * progress: 0 → TRANSITIONS (0 → 3)
   *   0   = only card 0 visible (initial hold)
   *   1   = card 1 fully slid in
   *   2   = card 2 fully slid in
   *   3   = card 3 fully slid in → section unpins
   */
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;                           // px scrolled into section
      const stickyRange = el.offsetHeight - window.innerHeight; // total sticky scroll distance
      if (stickyRange <= 0) return;

      const raw = Math.max(0, Math.min(1, scrolled / stickyRange));
      // First HOLD fraction = no animation; remaining 1-HOLD = 3 card transitions
      const p = raw < HOLD ? 0 : ((raw - HOLD) / (1 - HOLD)) * TRANSITIONS;
      setProgress(p);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /**
   * Per-card CSS transform based on current scroll progress.
   *
   * Card 0: always visible; scales down and shifts up as cards stack on top.
   * Cards 1-3:
   *   - Below viewport (translateY 110%) until their transition segment begins.
   *   - Slide up with ease-out cubic during progress [(i-1), i].
   *   - Fully in (stacked) once progress ≥ i; subsequent cards push them behind.
   */
  const getCardStyle = (i: number): React.CSSProperties => {
    const DEPTH_SCALE = 0.028; // scale reduction per depth level
    const DEPTH_SHIFT = -9;    // px translateY per depth level (peek-out effect)

    if (i === 0) {
      const depth = Math.min(TRANSITIONS, progress);
      return {
        transform: `translateY(${DEPTH_SHIFT * depth}px) scale(${1 - DEPTH_SCALE * depth})`,
        zIndex: 1,
        willChange: "transform",
      };
    }

    // t: how far through this card's animation we are
    //   negative = card hasn't started yet
    //   0–1      = animating in
    //   >1       = fully in (may get depth from later cards)
    const t = progress - (i - 1);

    if (t < 0) {
      return { transform: "translateY(110%)", zIndex: i + 1, willChange: "transform" };
    }

    if (t < 1) {
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      return {
        transform: `translateY(${(1 - eased) * 110}%)`,
        zIndex: i + 1,
        willChange: "transform",
      };
    }

    // Fully in; later cards may push this one behind
    const depth = Math.min(TRANSITIONS - i, t - 1);
    return {
      transform: `translateY(${DEPTH_SHIFT * depth}px) scale(${1 - DEPTH_SCALE * depth})`,
      zIndex: i + 1,
      willChange: "transform",
    };
  };

  // Active card index for progress dot indicator
  const activeCard = Math.min(STEPS.length - 1, Math.floor(progress));

  return (
    <section
      ref={sectionRef}
      className="relative"
      /**
       * 500vh outer height:
       *   sticky range = 4 × 100vh
       *   hold (25%)   = 1 × 100vh  →  card 0 visible, user reads it
       *   transitions  = 3 × 100vh  →  ~100vh of scroll per card slide-in
       */
      style={{ height: "500vh" }}
    >
      {/* ── Sticky viewport ── */}
      <div
        className="sticky top-0 flex h-[100dvh] flex-col overflow-clip"
        style={{ backgroundColor: "#f7f8ff" }}
      >
        {/* ── Section header ── */}
        <div className="flex-shrink-0 px-6 pb-4 pt-10 text-center md:pt-14">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#2ababe" }}
          >
            Get Started
          </p>
          <h2
            className="text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem]"
            style={{ color: "#051895" }}
          >
            Book Your KDS ERP Crew Demo in 4 Simple Steps
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500 md:text-[1.0625rem]">
            Experience KDS ERP Crew in action. Book a personalized demo to see how AI-powered
            digital assistants automate and optimize your ERP workflows.
          </p>
        </div>

        {/* ── Progress dots ── */}
        <div className="flex-shrink-0 flex items-center justify-center gap-2 pb-3">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                height: "8px",
                width: i === activeCard ? "32px" : "8px",
                backgroundColor:
                  i < activeCard
                    ? "#2ababe"
                    : i === activeCard
                      ? "#051895"
                      : "rgba(5,24,149,0.18)",
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* ── Card stack ── */}
        <div className="relative flex-1 overflow-clip px-4 pb-6 md:px-10 md:pb-10">
          {/*
            The relative container fills remaining height.
            Each card is absolutely inset-0 inside it.
            Cards translate from translateY(110%) to translateY(0) as scroll progresses.
          */}
          <div className="relative mx-auto h-full max-w-4xl">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={getCardStyle(i)}
              >
                <StepCard step={step} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
