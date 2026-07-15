import kdsLogoHeader from "@/assets/kds-logo-header.png";
import { Link } from "@tanstack/react-router";


export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-3 md:px-10">
        {/* Logo */}
        <Link to="/">
          <img src={kdsLogoHeader} alt="KDS ERP Crew" className="h-[3.75rem] object-contain" />
        </Link>

        {/* Nav + CTA grouped on the right */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8">
            <Link
              to="/agent-library"
              className="text-[15.4px] font-medium text-gray-700 transition hover:text-[#051895]"
            >
              Agent Library
            </Link>
            <a
              href="https://keydynamicssolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15.4px] font-medium text-gray-700 transition hover:text-[#051895]"
            >
              About Us
            </a>
          </nav>

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
      </div>
    </header>
  );
}
