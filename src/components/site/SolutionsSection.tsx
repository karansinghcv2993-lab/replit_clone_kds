import { useState } from "react";
import { SOLUTIONS, type Solution } from "@/data/catalogue";
import { Network, ArrowRight, Zap, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function SolutionsSection() {
  const [open, setOpen] = useState<Solution | null>(null);

  return (
    <section
      id="solutions"
      className="border-b border-border bg-surface px-6 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-2 inline-flex items-center gap-2 rounded-md bg-foreground px-2 py-1 text-xs font-semibold uppercase tracking-widest text-background">
          <Network className="h-3.5 w-3.5" />
          How Agents Work Together
        </div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          End-to-End Process Solutions
        </h2>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            Individual agents are powerful. Together, they orchestrate entire
            business processes — from first signal to final settlement. Click
            any process to see the full agent-by-agent flow.
          </p>
          <button
            onClick={() =>
              toast("External link disabled in this clone", {
                description: "Would open /solutions",
              })
            }
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            View all solutions <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <button
              key={s.title}
              onClick={() => setOpen(s)}
              className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
            >
              <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">
                {s.steps} steps
              </div>
              <h3 className="text-base font-bold leading-snug text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                {s.desc}
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 text-xs">
                <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                  <Zap className="h-3.5 w-3.5 text-brand" />
                  {s.automation}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {s.outcome}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="sm:max-w-xl">
          {open && (
            <>
              <DialogHeader>
                <div className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">
                  {open.steps} steps
                </div>
                <DialogTitle className="text-xl">{open.title}</DialogTitle>
                <DialogDescription className="text-sm leading-relaxed">
                  {open.desc}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-4 border-t border-border pt-4 text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <Zap className="h-4 w-4 text-brand" />
                  {open.automation}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {open.outcome}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                The detailed step-by-step flow lives on a dedicated solution
                page on the original site — not included in this clone.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
