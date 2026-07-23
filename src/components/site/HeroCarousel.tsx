/**
 * HeroCarousel — animated 3-slide carousel for the hero section.
 *
 * All slide content is driven by the SLIDES config array.
 * Transitions: crossfade background + slide-up text, 5 s autoplay, infinite loop.
 */

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, BookOpen, ArrowLeft, Sparkles } from "lucide-react";
import slide1Bg from "../../../attached_assets/Picture_1_1784827309966.png";
import slide2Bg from "../../../attached_assets/Picture_2_1784827309966.png";
import slide3Bg from "../../../attached_assets/Picture_3_1784827309966.png";
import slide4Bg from "../../../attached_assets/Picture_4_1784827309967.png";
import slide5Bg from "../../../attached_assets/Picture_5_1784827309967.png";
import slide6Bg from "../../../attached_assets/Picture_6_1784827309967.png";

// ─── Slide data (single source of truth) ─────────────────────────────────────

interface Stat {
  value: string | React.ReactNode;
  label: string;
}

interface Slide {
  bg: string;
  overlay: boolean;
  heading: string;
  description: string;
  stats: Stat[];
}

const SLIDES: Slide[] = [
  {
    bg: slide1Bg,
    overlay: true,
    heading: "Digital Transaction Management Assistant",
    description:
      "Transform ERP transactions into intelligent, AI-driven workflows that improve visibility, accelerate approvals, and streamline business operations.",
    stats: [
      { value: "90+", label: "Transaction Use Cases" },
      { value: "21+", label: "Business Functions" },
      { value: "10+", label: "Enterprise Workflows" },
      {
        value: <CheckCircle2 className="h-6 w-6 text-white" />,
        label: "End-to-End Transaction Management",
      },
    ],
  },
  {
    bg: slide2Bg,
    overlay: true,
    heading: "From ERP Data to Decision Intelligence",
    description:
      "Turn real-time ERP data into actionable insights with AI-powered analytics, predictive intelligence, and smarter business decisions.",
    stats: [
      { value: "100+", label: "Data Connectors" },
      { value: "21+", label: "Business Functions" },
      { value: "10+", label: "Analytics Modules" },
      {
        value: <CheckCircle2 className="h-6 w-6 text-white" />,
        label: "Always-On Decision Intelligence",
      },
    ],
  },
  {
    bg: slide3Bg,
    overlay: true,
    heading: "AI-Powered Approval Automation",
    description:
      "Automate approval workflows across your organization with intelligent routing, real-time notifications, and secure approvals from anywhere.",
    stats: [
      { value: "100+", label: "Approval Scenarios" },
      { value: "21+", label: "Business Functions" },
      {
        value: <CheckCircle2 className="h-6 w-6 text-white" />,
        label: "Real-Time Workflow Visibility",
      },
      {
        value: <CheckCircle2 className="h-6 w-6 text-white" />,
        label: "Always-On AI Approval Assistant",
      },
    ],
  },
  {
    bg: slide4Bg,
    overlay: false,
    heading: "AI-Driven Transaction Processing",
    description:
      "Accelerate transaction processing with AI-powered validation, automation, and exception handling for faster, more accurate operations.",
    stats: [
      { value: "90+", label: "Transaction Use Cases" },
      { value: "21+", label: "Business Functions" },
      { value: "10+", label: "Enterprise Workflows" },
      {
        value: <CheckCircle2 className="h-6 w-6 text-white" />,
        label: "End-to-End Transaction Management",
      },
    ],
  },
  {
    bg: slide5Bg,
    overlay: false,
    heading: "AI-Powered Data Insights",
    description:
      "Unlock meaningful business intelligence with AI-driven analytics, interactive dashboards, and real-time performance monitoring.",
    stats: [
      { value: "100+", label: "Data Connectors" },
      { value: "21+", label: "Business Functions" },
      { value: "10+", label: "Analytics Modules" },
      {
        value: <CheckCircle2 className="h-6 w-6 text-white" />,
        label: "Always-On Decision Intelligence Assistant",
      },
    ],
  },
  {
    bg: slide6Bg,
    overlay: false,
    heading: "Smart AI Approval Assistant",
    description:
      "Empower teams with an intelligent approval assistant that delivers contextual recommendations, instant notifications, and seamless ERP approvals.",
    stats: [
      { value: "100+", label: "Approval Scenarios" },
      { value: "21+", label: "Business Functions" },
      {
        value: <CheckCircle2 className="h-6 w-6 text-white" />,
        label: "Real-Time Workflow Visibility",
      },
      {
        value: <CheckCircle2 className="h-6 w-6 text-white" />,
        label: "Always-On AI Approval Assistant",
      },
    ],
  },
];

const AUTOPLAY_MS = 5500;

// ─── Utility ─────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Split a stat string like "90+" into { num: 90, suffix: "+" }.
 * Returns null if the string doesn't start with a digit (e.g. it's an icon).
 */
function parseStatValue(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

/**
 * Counts from 0 → target with an ease-out cubic curve over `duration` ms.
 * Resets to 0 whenever `active` flips to false so the next activation
 * always starts from zero.
 */
function useCountUp(target: number, active: boolean, duration = 1200): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      // Stop any running animation but keep the current displayed value so the
      // outgoing slide always shows its final number throughout the exit fade.
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    // Incoming slide: reset to 0 first, then count up to target.
    setCount(0);
    startRef.current = null;

    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const t = Math.min((timestamp - startRef.current) / duration, 1);
      // Ease-out cubic: fast start, decelerates to final value
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration]);

  return count;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatTile({ value, label, visible }: { value: React.ReactNode; label: string; visible: boolean }) {
  // Determine if this tile has a numeric value we can animate
  const parsed = typeof value === "string" ? parseStatValue(value) : null;
  const count = useCountUp(parsed?.num ?? 0, visible && parsed !== null);

  const displayValue = parsed
    ? `${count}${parsed.suffix}`
    : value;

  return (
    <div
      className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <div className="flex h-8 items-center text-2xl font-bold text-white md:text-3xl">
        {displayValue}
      </div>
      <div className="mt-2 text-xs text-white/80 md:text-sm">{label}</div>
    </div>
  );
}

// ─── Main carousel ───────────────────────────────────────────────────────────

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [textVisible, setTextVisible] = useState(true);
  const [statsVisible, setStatsVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = SLIDES.length;

  const goTo = useCallback(
    (idx: number) => {
      if (idx === current) return;
      // Fade out text + stats
      setTextVisible(false);
      setStatsVisible(false);
      setTimeout(() => {
        setPrev(current);
        setCurrent(idx);
        // Small stagger: text fades in slightly before stats
        setTextVisible(true);
        setTimeout(() => setStatsVisible(true), 120);
      }, 300);
    },
    [current],
  );

  const next = useCallback(() => goTo((current + 1) % total), [current, goTo, total]);
  const goBack = useCallback(() => goTo((current - 1 + total) % total), [current, goTo, total]);

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  // Reset autoplay on manual navigation
  const manualNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    next();
    timerRef.current = setInterval(next, AUTOPLAY_MS);
  };
  const manualPrev = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    goBack();
    timerRef.current = setInterval(next, AUTOPLAY_MS);
  };
  const manualDot = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(i);
    timerRef.current = setInterval(next, AUTOPLAY_MS);
  };

  // ── Dynamically measure the sticky header's rendered height ─────────────────
  // Sets --header-h on :root so the section min-height adapts to any header
  // size change (responsive resizing, future layout changes, etc.) without
  // any hardcoded pixel value.
  useLayoutEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const apply = (h: number) =>
      document.documentElement.style.setProperty("--header-h", `${h}px`);

    // Set immediately so the first paint is correct
    apply(header.getBoundingClientRect().height);

    const ro = new ResizeObserver(([entry]) => {
      const h =
        entry.borderBoxSize?.[0]?.blockSize ??
        entry.contentRect.height;
      apply(h);
    });
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  const slide = SLIDES[current];

  return (
    // overflow-clip (not overflow-hidden) — clips absolutely-positioned
    // backgrounds without creating a scroll container, which could otherwise
    // confine position:sticky to this element as its scroll ancestor.
    <section
      className="relative overflow-clip flex flex-col"
      style={{ minHeight: "calc(100svh - var(--header-h, 5.375rem) - 45px)" }}
    >
      {/* ── Background layers (crossfade) ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : i === prev ? 0 : 0,
          }}
        >
          <img
            src={s.bg}
            alt=""
            width={1920}
            height={960}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover object-top"
            style={{
              transform: i === current ? "scale(1.03)" : "scale(1)",
              transition: "transform 6s ease-out, opacity 0.7s ease",
            }}
          />
        </div>
      ))}


      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-6 pt-10 md:px-10 md:pt-14">
        <div className="mt-14 flex flex-1 flex-col justify-end max-w-5xl md:mt-20 pb-[85px]">

          {/* Heading + description */}
          <div
            className="mb-10 md:mb-[70px] transition-all duration-300"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <h1
              className="font-bold leading-[1.05] tracking-tight text-[2.55rem] md:text-[3.1875rem] text-white"
            >
              {slide.heading}
            </h1>
            <p className="mt-[30px] text-base leading-relaxed text-white/90 md:text-lg">
              {slide.description}
            </p>
          </div>

          {/* CTA buttons — always visible, don't animate per-slide */}
          <div className="mb-10 md:mb-[70px] flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("highlights")}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground shadow-lg shadow-brand/20 transition hover:brightness-110"
            >
              <Sparkles className="h-4 w-4" />
              Agent Highlights
            </button>
            <button
              onClick={() => scrollTo("catalogue")}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
              style={{ backgroundColor: "#051895" }}
            >
              <BookOpen className="h-4 w-4" />
              Complete AI Agent Catalogue
            </button>
            <a
              href="https://keydynamicssolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
              style={{ backgroundColor: "#fba226" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Key Dynamic Solutions
            </a>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {slide.stats.map((stat, i) => (
              <StatTile
                key={`${current}-${i}`}
                value={stat.value}
                label={stat.label}
                visible={statsVisible}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Navigation arrows ── */}
      <button
        onClick={manualPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur transition hover:bg-white md:left-6"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      <button
        onClick={manualNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur transition hover:bg-white md:right-6"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>

      {/* ── Pagination dots ── */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => manualDot(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-2.5 rounded-full transition-all duration-300"
            style={{
              width: i === current ? "2rem" : "0.625rem",
              backgroundColor: i === current ? "#051895" : "rgba(5,24,149,0.3)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
