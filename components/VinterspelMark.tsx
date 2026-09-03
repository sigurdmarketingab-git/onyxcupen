import { cn } from "@/lib/utils";

const TITLE = "Onyxcupen är en del av Nyköpings Vinterspel";
export const VINTERSPEL_LOGO = "/images/vinterspel/vinterspel-liggande-vit.svg";
const SYMBOL = "/images/vinterspel/vinterspel-symbol-vit.svg";

type Variant = "hero" | "footer" | "navbar";

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
  if (variant === "navbar") {
    // Symbolen istället för hela lockupen — wordmarket blir oläsbart i
    // navbarens höjd, så namnet skrivs ut som riktig text bredvid.
    return (
      <div className={cn("flex items-center gap-2.5", className)} title={TITLE}>
        <img src={SYMBOL} alt="" className="h-8 w-auto opacity-80" />
        <span className="text-[11px] leading-tight text-[#9ca3af]">
          En del av
          <br />
          <span className="font-semibold text-[#c4cad4]">
            Nyköpings Vinterspel
          </span>
        </span>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={className}>
        <p className="text-xs font-semibold text-[#6b7280] mb-3 uppercase tracking-wider">
          En del av
        </p>
        <img
          src={VINTERSPEL_LOGO}
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
      <img
        src={VINTERSPEL_LOGO}
        alt="Nyköpings Vinterspel"
        className="h-14 w-auto"
      />
    </div>
  );
}
