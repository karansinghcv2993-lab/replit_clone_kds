import { Logo } from "./Logo";

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/key-dynamics-solutions/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/KeyDynamicsSolutions/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/keydynamics_365",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@keydynamicssolutions",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/keydynamicssolutions",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  return (
    <footer className="px-6 py-14 text-hero-foreground md:px-10" style={{ backgroundColor: "#051895" }}>
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">

          {/* ── Left: About ── */}
          <div className="max-w-lg">
            <Logo />

            <h3 className="mt-6 text-base font-bold text-hero-foreground">
              About Key Dynamics Solutions (KDS)
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-hero-muted">
              KDS ERP Crew is an AI-powered enterprise automation platform developed and owned by Key Dynamics Solutions. KDS empowers organizations with AI, ERP, CRM, Data Analytics, and Microsoft Power Platform solutions to simplify operations, automate business processes, and accelerate digital transformation.
            </p>

            <p className="mt-5 text-sm font-semibold text-hero-foreground">
              Want to know more about KDS?
            </p>
            <p className="mt-1 text-sm text-hero-muted">
              Discover our solutions, services, and success stories by visiting the KDS website.
            </p>
            <a
              href="https://keydynamicssolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Visit KDS Website →
            </a>
          </div>

          {/* ── Right: Connect ── */}
          <div className="flex flex-col gap-4 md:items-end md:text-right">
            <h3 className="text-base font-bold text-hero-foreground">Connect With KDS</h3>
            <p className="max-w-xs text-sm leading-relaxed text-hero-muted md:text-right">
              Stay connected for the latest updates, AI innovations, ERP insights, and digital transformation stories.
            </p>

            <div className="mt-2 flex items-center gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Copyright (full-width, left-aligned, below both columns) ── */}
        <div className="mt-10 space-y-1 border-t border-white/10 pt-6">
          <p className="text-xs text-hero-muted">
            © 2026 Key Dynamics Solutions Pvt. Ltd. All Rights Reserved.
          </p>
          <p className="text-xs text-hero-muted">
            KDS ERP Crew™ is a product of Key Dynamics Solutions.
          </p>
        </div>

      </div>
    </footer>
  );
}
