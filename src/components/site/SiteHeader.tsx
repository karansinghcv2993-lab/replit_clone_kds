import { Logo } from "./Logo";
import { toast } from "sonner";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-3 md:px-10">
        {/* Logo */}
        <a href="https://keydynamicssolutions.com/" target="_blank" rel="noopener noreferrer">
          <Logo />
        </a>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => scrollTo("catalogue")}
            className="text-sm font-medium text-gray-700 transition hover:text-[#051895]"
          >
            Agent Library
          </button>
          <a
            href="https://keydynamicssolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-700 transition hover:text-[#051895]"
          >
            About Us
          </a>
        </nav>

        {/* CTA */}
        <a
          href="https://keydynamicssolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          style={{ backgroundColor: "#051895" }}
        >
          Request a Quote
        </a>
      </div>
    </header>
  );
}
