import { Logo } from "./Logo";
import { toast } from "sonner";

export function SiteFooter() {
  return (
    <footer className="bg-hero px-6 py-10 text-hero-foreground md:px-10">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <Logo />
          <p className="mt-3 max-w-md text-sm text-hero-muted">
            Enterprise AI agents built for configuration and deployment in
            partnership with your team.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 text-sm md:items-end">
          <button
            onClick={() =>
              toast("External link disabled in this clone", {
                description: "Would open mywave.ai",
              })
            }
            className="text-hero-muted hover:text-hero-foreground"
          >
            mywave.ai
          </button>
          <p className="text-xs text-hero-muted">
            © {new Date().getFullYear()} MyWave — homepage clone for demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
