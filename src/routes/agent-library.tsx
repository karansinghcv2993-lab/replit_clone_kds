import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CatalogueSection } from "@/components/site/CatalogueSection";
import { SolutionsSection } from "@/components/site/SolutionsSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/agent-library")({
  head: () => ({
    meta: [
      { title: "Agent Library — KDS ERP Crew" },
      {
        name: "description",
        content:
          "Explore the complete KDS ERP Crew AI Agent Library featuring intelligent AI agents for Microsoft Dynamics 365.",
      },
    ],
  }),
  component: AgentLibraryPage,
});

function AgentLibraryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <CatalogueSection />
      <SolutionsSection />
      <SiteFooter />
      <Toaster position="bottom-right" />
    </div>
  );
}
