/**
 * HeroCarousel — animated 3-slide carousel for the hero section.
 *
 * All slide content is driven by the SLIDES config array.
 * Transitions: crossfade background + slide-up text, 5 s autoplay, infinite loop.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, BookOpen, ArrowLeft, Sparkles } from "lucide-react";
import slide1Bg from "@/assets/hero-slide-1.jpg";
import slide2Bg from "@/assets/hero-slide-2.jpg";
import slide3Bg from "@/assets/hero-slide-3.jpg";

// ─── Slide data (single source of truth) ─────────────────────────────────────

interface Stat {
  value: string | React.ReactNode;
  label: string;
}

interface Slide {
  bg: string;
  heading: string;
  description: string;
  stats: Stat[];
}

const SLIDES: Slide[] = [
  {
    bg: slide1Bg,
    heading: "Digital Transaction Management Assistant",
    description:
      "Your AI-powered digital assistant for creating, validating, tracking, and managing ERP transactions with speed, accuracy, and intelligent automation. Streamline complex business processes, reduce manual effort, ensure compliance, and gain real-time visibility across every transaction.",
    stats: [
      { value: "90+", label: "Transaction Use Cases" },
      { value: "21+", label: "Business Functions" },
      { value: "10+", label: "Enterprise Workflows" },
      {
        value: <CheckCircle2 className="h-6 w-6 text-brand" />,
        label: "End-to-End Transaction Management",
      },
    ],
  },
  {
    bg: slide2Bg,
    heading: "From ERP Data to Decision Intelligence",
    description:
      "Transform scattered ERP data into meaningful business intelligence with an AI-powered digital assistant. Unify data from ERP systems, databases, documents, and spreadsheets into a single trusted source, enabling real-time dashboards, KPI reporting, governance, and decision-ready insights for faster, smarter business decisions.",
    stats: [
      { value: "100+", label: "Data Connectors" },
      { value: "21+", label: "Business Functions" },
      { value: "10+", label: "Analytics Modules" },
      {
        value: <CheckCircle2 className="h-6 w-6 text-brand" />,
        label: "Always-On Decision Intelligence",
      },
    ],
  },
  {
    bg: slide3Bg,
    heading: "AI-Powered Approval Automation",
    description:
      "Transform manual approval workflows into intelligent, automated processes with an AI-powered digital assistant. Reduce approval cycle times, strengthen governance, and enable secure approvals anytime, anywhere.",
    stats: [
      { value: "100+", label: "Approval Scenarios" },
      { value: "21+", label: "Business Functions" },
      {
        value: <CheckCircle2 className="h-6 w-6 text-brand" />,
        label: "Real-Time Workflow Visibility",
      },
      {
        value: <CheckCircle2 className="h-6 w-6 text-brand" />,
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

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatTile({ value, label, visible }: { value: React.ReactNode; label: string; visible: boolean }) {
  return (
    <div
      className="rounded-xl border border-gray-200 bg-white/70 p-4 backdrop-blur transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <div className="flex h-8 items-center text-2xl font-bold text-gray-900 md:text-3xl">{value}</div>
      <div className="mt-2 text-xs text-gray-600 md:text-sm">{label}</div>
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

  const slide = SLIDES[current];

  return (
    <section className="relative overflow-hidden">
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
            className="h-full w-full object-cover"
            style={{
              transform: i === current ? "scale(1.03)" : "scale(1)",
              transition: "transform 6s ease-out, opacity 0.7s ease",
            }}
          />
        </div>
      ))}

      {/* ── Left-side gradient overlay for text readability ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 80%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
        <div className="mt-14 max-w-5xl md:mt-20">

          {/* Heading + description */}
          <div
            className="transition-all duration-300"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <h1
              className="font-bold leading-[1.05] tracking-tight text-[2.55rem] md:text-[3.1875rem]"
              style={{ color: "#051895" }}
            >
              {slide.heading}
            </h1>
            <div className="mt-5 max-w-4xl">
              <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                {slide.description}
              </p>
            </div>
          </div>

          {/* CTA buttons — always visible, don't animate per-slide */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
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
          <div className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-4">
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
