/**
 * Liten etikett som märker upp innehåll som bara gäller en av nivåerna.
 *
 * Cupinfo-sidan är gemensam för Röd och Blå nivå eftersom nästan all
 * information är densamma. Det fåtal rader och avsnitt som skiljer får den
 * här etiketten så att läsaren direkt ser vad som gäller det egna laget.
 */

export const NIVAER: Record<string, { namn: string; farg: string }> = {
  rod: { namn: "Röd nivå", farg: "#F87171" },
  bla: { namn: "Blå nivå", farg: "#60A5FA" },
};

export default function NivaEtikett({
  niva,
  className = "",
}: {
  niva?: string | null;
  className?: string;
}) {
  // "alla" och tomt värde betyder gemensam information — ingen etikett behövs.
  const info = niva ? NIVAER[niva] : undefined;
  if (!info) return null;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${className}`}
      style={{ color: info.farg, backgroundColor: `${info.farg}1a` }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: info.farg }}
        aria-hidden="true"
      />
      Endast {info.namn}
    </span>
  );
}
