import { useMemo, useState } from "react";
import { AGENTS, type Agent, type AgentCategory } from "@/data/catalogue";
import { Sparkles, PlayCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { DemoModal } from "./DemoModal";
import { Link } from "@tanstack/react-router";

type TabId = "o2c" | "p2p" | "sc" | "cf" | "d365ba";

const TABS: {
  id: TabId;
  label: string;
  short: string;
  cats: AgentCategory[];
  totalHint: string;
}[] = [
  { id: "o2c",   label: "Order to Cash",                short: "O2C",  cats: ["O2C"],      totalHint: "See all O2C agents in the catalogue" },
  { id: "p2p",   label: "Procure to Pay",               short: "P2P",  cats: ["P2P"],      totalHint: "See all P2P agents in the catalogue" },
  { id: "sc",    label: "Supply Chain",                  short: "SC",   cats: ["Supply Chain"], totalHint: "See all Supply Chain agents" },
  { id: "cf",    label: "Cross Functional",              short: "CF",   cats: ["Platform"], totalHint: "See all Platform agents in the catalogue" },
  { id: "d365ba",label: "Dynamics 365 Business Agents", short: "D365", cats: ["D365 BA"],  totalHint: "See all Dynamics 365 Business Agents" },
];

export function HighlightsSection() {
  const [active, setActive] = useState<TabId>("o2c");
  const [modalAgent, setModalAgent] = useState<Agent | null>(null);

  const featured = useMemo(() => {
    return AGENTS.filter((a) => a.demo);
  }, []);

  const tab = TABS.find((t) => t.id === active)!;
  const items = featured.filter((a) => tab.cats.includes(a.cat));

  return (
    <section id="highlights" className="border-b border-border bg-white px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-2 inline-flex items-center gap-2 rounded-md bg-brand px-2 py-1 text-xs font-semibold uppercase tracking-widest text-brand-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Agent Highlights
        </div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: "#051895" }}>
          Experience AI Agents in Action
        </h2>
        <p className="mt-3 max-w-full text-base leading-relaxed text-muted-foreground">
          Discover featured KDS ERP Crew AI agents built for Microsoft Dynamics
          365. Explore intelligent solutions across Order to Cash, Procure to
          Pay, Supply Chain, Finance, Manufacturing, Retail, Healthcare, BFSI,
          and more. Select any agent to learn how it transforms business
          operations.
        </p>

        {/* Tab bar */}
        <div className="mt-8 overflow-x-auto">
          <div className="flex min-w-max gap-1 border-b border-border">
            {TABS.map((t) => {
              const count = featured.filter((a) =>
                t.cats.includes(a.cat),
              ).length;
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "text-brand"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isActive
                        ? "bg-brand text-brand-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-t bg-brand" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {items.length} agent highlights
            </span>{" "}
            with live video demos — {tab.label}
          </p>
          <Link
            to="/agent-library"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            {tab.totalHint} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((a) => (
            <DemoCard key={a.name} agent={a} onOpen={() => setModalAgent(a)} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <p className="text-sm font-semibold text-foreground">
            Need something more specialised?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore the complete KDS ERP Crew AI Agent Library with 90+ agents
            across all industries and process categories below.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("catalogue")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            Browse Full Catalogue <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <DemoModal
        agent={modalAgent}
        onOpenChange={(o) => !o && setModalAgent(null)}
      />
    </section>
  );
}

function DemoCard({ agent, onOpen }: { agent: Agent; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group flex h-full flex-col rounded-xl border border-border bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-brand" />
          <h3 className="text-sm font-semibold leading-tight text-foreground">
            {agent.name}
          </h3>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-xs font-medium text-brand-foreground">
          <PlayCircle className="h-3 w-3" /> Demo
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {agent.desc}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition group-hover:opacity-100">
        Watch Demo <ArrowRight className="h-3 w-3" />
      </span>
    </button>
  );
}
