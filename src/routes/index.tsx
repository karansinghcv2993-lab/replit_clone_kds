import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/site/HeroSection";
import { HighlightsSection } from "@/components/site/HighlightsSection";
import { SolutionsSection } from "@/components/site/SolutionsSection";
import { CatalogueSection } from "@/components/site/CatalogueSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Agent Catalogue — MyWave AI" },
      {
        name: "description",
        content:
          "A library of 352+ enterprise AI agents designed to automate, orchestrate, and govern complex business processes across Order to Cash, Procure to Pay, Supply Chain, Finance, and SAP Business One.",
      },
      { property: "og:title", content: "AI Agent Catalogue — MyWave AI" },
      {
        property: "og:description",
        content:
          "352+ enterprise AI agents for finance, supply chain, insurance, banking, healthcare, and SAP Business One.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <HighlightsSection />
      <SolutionsSection />
      <CatalogueSection />
      <SiteFooter />
      <Toaster position="bottom-right" />
    </div>
  );
}
