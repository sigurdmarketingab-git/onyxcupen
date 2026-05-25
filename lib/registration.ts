const SWEDISH_MONTHS = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

/** Returns true if today is on or before the closing date (YYYY-MM-DD). */
export function isAnmalningOppen(stangerDatum?: string | null): boolean {
  if (!stangerDatum) return false;
  const today = new Date().toISOString().split("T")[0];
  return stangerDatum >= today;
}

/** Formats a YYYY-MM-DD date as "31 augusti 2026" in Swedish. */
export function formatSwedishDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${SWEDISH_MONTHS[month - 1]} ${year}`;
}
