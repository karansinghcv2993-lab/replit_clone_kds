import { Logo } from "./Logo";
import { toast } from "sonner";

export function SiteFooter() {
  return (
    <footer className="px-6 py-12 text-hero-foreground md:px-10" style={{ backgroundColor: "#051895" }}>
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-md">
            <Logo />
            <p className="mt-3 text-sm text-hero-muted">
              Enterprise AI agents built for Microsoft Dynamics 365 to automate
              business processes, orchestrate cross-functional workflows, and
              deliver intelligent, policy-driven enterprise operations.
            </p>
            <div className="mt-5 flex gap-6">
              <div>
                <p className="text-2xl font-bold text-hero-foreground">150+</p>
                <p className="mt-0.5 text-xs text-hero-muted">AI Agents</p>
              </div>
              <div className="border-l border-white/10 pl-6">
                <p className="text-sm font-semibold text-hero-foreground">Across 11 Business</p>
                <p className="text-xs text-hero-muted">Process Categories</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 text-sm md:items-end">
            <button
              onClick={() =>
                toast("External link disabled in this preview", {
                  description: "Would open kdserpcrew.ai",
                })
              }
              className="text-hero-muted hover:text-hero-foreground"
            >
              www.kdserpcrew.ai
            </button>
            <p className="text-xs text-hero-muted">
              Microsoft Dynamics 365 | Power Platform | Azure AI Ready
            </p>
            <p className="text-xs text-hero-muted">
              © 2026 Key Dynamics Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
