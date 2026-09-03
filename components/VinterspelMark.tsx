import { cn } from "@/lib/utils";

const TITLE = "Onyxcupen är en del av Nyköpings Vinterspel";
const LOGO = "/images/vinterspel/vinterspel-liggande-vit.svg";

type Variant = "hero" | "footer";

/**
 * Endorsement-lockup som visar att Onyxcupen ingår i Nyköpings Vinterspel.
 * Sajten är mörk, därför används alltid den vita logotypvarianten.
 */
export default function VinterspelMark({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  if (variant === "footer") {
    return (
      <div className={className}>
        <p className="text-xs font-semibold text-[#6b7280] mb-3 uppercase tracking-wider">
          En del av
        </p>
        <img
          src={LOGO}
          alt="Nyköpings Vinterspel"
          title={TITLE}
          className="h-14 w-auto"
        />
      </div>
    );
  }

  // hero
  return (
    <div
      className={cn(
        "inline-flex items-center gap-4 border-t border-white/15 pt-5",
        className,
      )}
      title={TITLE}
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
        En del av
      </span>
      <img src={LOGO} alt="Nyköpings Vinterspel" className="h-14 w-auto" />
    </div>
  );
}
