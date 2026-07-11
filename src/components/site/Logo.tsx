import kdsLogoFull from "@/assets/kds-logo-full.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img src={kdsLogoFull} alt="KDS ERP Crew" className="h-[3.75rem] object-contain" />
    </div>
  );
}
