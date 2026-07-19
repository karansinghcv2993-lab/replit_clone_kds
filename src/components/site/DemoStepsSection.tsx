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
import step1Img from "@/assets/demo-step-1.png";
import step2Img from "@/assets/demo-step-2.png";
import step3Img from "@/assets/demo-step-3.png";
import step4Img from "@/assets/demo-step-4.png";

// ─── Step data (source of truth: attached Word document) ──────────────────────

const STEPS = [
  {
    number: 1,
    title: "Share Your Requirements",
    description:
      "Tell us about your business, ERP environment, and the processes you want to automate.",
    image: step1Img,
    alt: "A form on screen for entering personal information — step 1 of the KDS ERP Crew demo booking",
  },
  {
    number: 2,
    title: "Schedule Your Demo",
    description:
      "Choose a convenient date and time for a personalized live demonstration with our ERP experts.",
    image: step2Img,
    alt: "KDS ERP Crew operations dashboard showing AI-powered analytics and metrics",
  },
  {
    number: 3,
    title: "Experience KDS ERP Crew",
    description:
      "See AI-powered agents automate transactions, approvals, reporting, and business workflows in real time.",
    image: step3Img,
    alt: "KDS ERP Crew live dashboard demonstrating real-time workflow automation",
  },
  {
    number: 4,
    title: "Launch Your AI Journey",
    description:
      "Receive a tailored implementation roadmap and discover how KDS ERP Crew can accelerate your enterprise transformation.",
    image: step4Img,
    alt: "KDS ERP Crew logo on screen — ready to launch your enterprise AI journey",
  },
] as const;

type Step = (typeof STEPS)[number];

// Fraction of the sticky scroll range used as initial hold (≈ 1 viewport)
const HOLD = 0.25;
// Number of slide-in transitions (all cards except the first)
const TRANSITIONS = STEPS.length - 1; // 3

// ─── Individual step card ─────────────────────────────────────────────────────

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">

      {/* ── Left panel — step illustration image ── */}
      {/*
        Mobile : full width, 52vw tall (shows the monitor comfortably).
        Desktop: 46% wide, full card height; image is object-contain so the
                 whole monitor mockup is always visible.
        Background matches the warm cream tone of the step images.
      */}
      <div
        className="relative flex h-[52vw] max-h-[340px] min-h-[180px] flex-shrink-0 items-center justify-center overflow-hidden md:h-auto md:max-h-none md:min-h-0 md:w-[46%]"
        style={{ backgroundColor: "#ede8e1" }}
      >
        <img
          src={step.image}
          alt={step.alt}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>

      {/* ── Right panel — text content ── */}
      <div
        className="flex flex-1 flex-col justify-center px-7 py-7 md:px-10 md:py-10 lg:px-12 lg:py-12"
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
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "rgba(5,24,149,0.07)" }}
        >
          {String(step.number).padStart(2, "0")}
        </p>

        {/* Title */}
        <h3
          className="-mt-1 text-xl font-bold leading-snug md:text-2xl lg:text-[1.625rem]"
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
      const scrolled = -rect.top;                                // px scrolled into section
      const stickyRange = el.offsetHeight - window.innerHeight;  // total sticky scroll distance
      if (stickyRange <= 0) return;

      const raw = Math.max(0, Math.min(1, scrolled / stickyRange));
      // First HOLD fraction = no animation; remaining (1-HOLD) = 3 card transitions
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
    const DEPTH_SCALE = 0.027; // scale reduction per depth level
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
        <div className="flex-shrink-0 px-6 pb-4 pt-10 text-center md:pt-12">
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
        <div className="relative flex flex-1 items-center justify-center overflow-clip px-4 pb-6 md:px-10 md:pb-8">
          {/*
            Card container height is capped so the card matches the natural
            proportions of the square step images rather than stretching to
            fill the full remaining viewport height.
            min() keeps it within the viewport on shorter screens.
          */}
          <div
            className="relative w-full max-w-4xl"
            style={{ height: "min(400px, calc(100dvh - 250px))" }}
          >
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
