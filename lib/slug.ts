/**
 * URL-adresser skapas automatiskt från rubriken så att kunden aldrig behöver
 * fylla i dem själv i Sanity. Svenska tecken translittereras (å/ä → a, ö → o)
 * för att matcha de slugs som redan är publicerade.
 */

const TRANSLIT: Record<string, string> = {
  å: "a", ä: "a", ö: "o", à: "a", á: "a",
  é: "e", è: "e", ë: "e", í: "i", ó: "o",
  ô: "o", ø: "o", ú: "u", ü: "u", ñ: "n", ç: "c",
  æ: "ae", ß: "ss",
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u00c0-\u024f]/g, (c) => TRANSLIT[c] ?? c)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96)
    .replace(/-+$/g, "");
}

type SlugSource = { _id: string; rubrik?: string | null; slug?: string | null };

export type SlugUppslag = {
  /** _id → sidans nuvarande adress */
  karta: Record<string, string>;
  /** adress som gällde tidigare → sidans nuvarande adress */
  tidigare: Record<string, string>;
};

/**
 * Räknar fram adressen för varje dokument av en typ.
 *
 * Adressen följer alltid rubriken — byter kunden rubrik byter sidan adress.
 * Den gamla adressen sparas i `tidigare` så att länkar som redan delats kan
 * skickas vidare till den nya i stället för att landa på en 404-sida.
 *
 * Om två rubriker ger samma adress får den andra ett "-2" på slutet, så att
 * ingen sida blir onåbar.
 */
export function resolveSlugs(docs: SlugSource[]): SlugUppslag {
  const upptagna = new Set<string>();
  const karta: Record<string, string> = {};
  const tidigare: Record<string, string> = {};

  for (const doc of docs) {
    const bas = slugify(doc.rubrik ?? "") || "sida";
    let slug = bas;
    for (let n = 2; upptagna.has(slug); n++) slug = `${bas}-${n}`;
    upptagna.add(slug);

    karta[doc._id] = slug;
    if (doc.slug && doc.slug !== slug) tidigare[doc.slug] = slug;
  }

  return { karta, tidigare };
}
