import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { HeroSection } from "@/components/site/HeroSection";
import { HighlightsSection } from "@/components/site/HighlightsSection";
import { SolutionsSection } from "@/components/site/SolutionsSection";
import { CatalogueSection } from "@/components/site/CatalogueSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Enterprise AI Agent Catalogue — KDS ERP Crew" },
      {
        name: "description",
        content:
          "A comprehensive library of enterprise AI agents built to automate, orchestrate, and optimize business processes across Microsoft Dynamics 365.",
      },
      { property: "og:title", content: "Enterprise AI Agent Catalogue — KDS ERP Crew" },
      {
        property: "og:description",
        content:
          "90+ enterprise AI agents for Microsoft Dynamics 365 across Finance, Sales, Procurement, Supply Chain, Manufacturing, Retail, Healthcare, BFSI, Insurance, and more.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <HeroSection />
      <HighlightsSection />
      <SolutionsSection />
      <CatalogueSection />
      <SiteFooter />
      <Toaster position="bottom-right" />
    </div>
  );
}
