import heroWave from "@/assets/hero-banner-2.png";
import { Logo } from "./Logo";
import { CheckCircle2, BookOpen, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden text-hero-foreground" style={{ backgroundColor: "#051895" }}>
      <img
        src={heroWave}
        alt=""
        width={1920}
        height={1080}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hero/50 via-hero/40 to-hero" />

      <div className="relative mx-auto max-w-screen-2xl px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
        <Logo className="text-hero-foreground" />

        <div className="mt-14 max-w-5xl md:mt-20">
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Enterprise AI Agent Catalogue
          </h1>
          <div className="mt-5 max-w-4xl">
            <p className="text-lg font-semibold text-hero-foreground md:text-xl">
              AI Agents for Modern Enterprises
            </p>
            <ul className="mt-3 space-y-2">
              {[
                "Automate Business Processes with Intelligent AI Agents",
                "Streamline Operations Across Microsoft Dynamics 365",
                "Optimize Workflows with Enterprise-Grade AI Automation",
                "Enable Seamless Integration with Your Existing Business Systems",
                "Deploy Tailored AI Agents Built for Your Unique Business Needs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-base leading-relaxed text-hero-muted md:text-lg">
                  <span className="mt-0.5 text-gray-400 font-bold">➜</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

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
              className="inline-flex items-center gap-2 rounded-full border border-hero-tile-border bg-hero-tile px-5 py-2.5 text-sm font-medium text-hero-foreground backdrop-blur transition hover:bg-white/10"
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

          <div className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-4">
            <StatTile value="90+" label="AI Agents" />
            <StatTile value="21+" label="Business Functions" />
            <StatTile value="10+" label="Industries Covered" />
            <StatTile
              value={<CheckCircle2 className="h-6 w-6 text-brand" />}
              label="Microsoft Dynamics 365 Ready"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-hero-tile-border bg-hero-tile p-4 backdrop-blur">
      <div className="flex h-8 items-center text-2xl font-bold md:text-3xl">
        {value}
      </div>
      <div className="mt-2 text-xs text-hero-muted md:text-sm">{label}</div>
    </div>
  );
}
