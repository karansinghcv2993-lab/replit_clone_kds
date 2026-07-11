export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden>
        <path
          d="M2 22 C 7 12, 12 12, 15 20 S 22 32, 25 22 S 32 12, 38 22"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M2 28 C 7 22, 12 22, 15 26 S 22 32, 25 28 S 32 24, 38 28"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
      </svg>
      <span className="text-xl font-semibold tracking-tight">
        KDS ERP Crew
      </span>
    </div>
  );
}
