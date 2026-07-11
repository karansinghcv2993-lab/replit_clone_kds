import { useMemo, useState } from "react";
import {
  AGENTS,
  CATEGORY_COUNTS,
  type Agent,
  type AgentCategory,
} from "@/data/catalogue";
import { BookOpen, Search, PlayCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DemoModal } from "./DemoModal";
import { toast } from "sonner";

type Filter = "All" | AgentCategory;

const FILTER_LABELS: Record<AgentCategory, string> = {
  "O2C": "O2C",
  "P2P": "P2P",
  "Supply Chain": "Supply Chain",
  "Finance": "Finance",
  "Platform": "Platform",
  "Insurance": "Insurance",
  "Manufacturing": "Manufacturing",
  "Retail & CPG": "Retail & CPG",
  "Healthcare": "Healthcare",
  "Trade Finance": "Trade Finance",
  "BFSI": "BFSI",
  "D365": "D365",
  "D365 BA": "D365 Business",
};

const FILTERS: Filter[] = [
  "All",
  "O2C",
  "P2P",
  "Supply Chain",
  "Finance",
  "Platform",
  "Insurance",
  "Manufacturing",
  "Retail & CPG",
  "Healthcare",
  "Trade Finance",
  "BFSI",
  "D365",
  "D365 BA",
];

export function CatalogueSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const [q, setQ] = useState("");
  const [modal, setModal] = useState<Agent | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return AGENTS.filter((a) => {
      if (filter !== "All" && a.cat !== filter) return false;
      if (!query) return true;
      return (
        a.name.toLowerCase().includes(query) ||
        a.desc.toLowerCase().includes(query)
      );
    });
  }, [filter, q]);

  return (
    <section id="catalogue" className="bg-white px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-foreground p-1.5 text-background">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Full Catalogue
          </span>
        </div>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          The KDS ERP Crew Agent Library
        </h2>
        <p className="mt-3 max-w-full text-base leading-relaxed text-muted-foreground">
          Explore the complete KDS ERP Crew AI Agent Library, featuring
          intelligent AI agents for Microsoft Dynamics 365 across Finance,
          Sales, Procurement, Supply Chain, Manufacturing, Retail, Healthcare,
          BFSI, Insurance, and more. Each agent is designed to automate
          business processes, enhance productivity, and deliver enterprise-grade
          AI automation.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800">
          Every AI agent is configured, customized, and deployed by Key
          Dynamics Solutions to fit your unique business needs.
          <button
            onClick={() =>
              toast("External link disabled in this preview", {
                description: "Would open Key Dynamics Solutions contact page",
              })
            }
            className="underline hover:text-amber-900"
          >
            Contact us to get started →
          </button>
        </div>

        {/* Search + filter */}
        <div className="sticky top-0 z-10 -mx-6 mt-8 border-b border-border bg-white/90 px-6 py-3 backdrop-blur md:-mx-10 md:px-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map((f) => {
                const count =
                  f === "All"
                    ? AGENTS.length
                    : (CATEGORY_COUNTS[f as AgentCategory] ?? 0);
                const active = f === filter;
                const label = f === "All" ? "All" : FILTER_LABELS[f as AgentCategory];
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                      active
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border bg-white text-foreground hover:border-brand hover:text-brand"
                    }`}
                  >
                    {label}
                    <span
                      className={`rounded-full px-1.5 text-[10px] font-semibold ${
                        active ? "bg-white/25" : "bg-muted"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search agents..."
                className="pl-9"
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            shown{filter !== "All" ? ` in ${filter === "D365 BA" ? "D365 Business" : filter}` : ""}
            {q ? ` matching "${q}"` : ""}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((a) => (
            <div
              key={`${a.cat}-${a.name}`}
              className="group flex h-full flex-col rounded-xl border border-border bg-white p-4 transition hover:border-brand hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex shrink-0 items-center rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
                  {FILTER_LABELS[a.cat]}
                </span>
                {a.demo && (
                  <button
                    onClick={() => setModal(a)}
                    className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[10px] font-medium text-brand-foreground hover:brightness-110"
                  >
                    <PlayCircle className="h-3 w-3" /> Demo
                  </button>
                )}
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-foreground">
                {a.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted-foreground">
            No agents match your filter.
          </div>
        )}
      </div>

      <DemoModal agent={modal} onOpenChange={(o) => !o && setModal(null)} />
    </section>
  );
}
