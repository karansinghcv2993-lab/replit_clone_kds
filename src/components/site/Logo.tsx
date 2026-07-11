import kdsLogo from "@/assets/kds-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src={kdsLogo} alt="KDS ERP Crew logo" className="h-9 w-9 object-contain" />
      <span className="text-xl font-semibold tracking-tight">
        KDS ERP Crew
      </span>
    </div>
  );
}
