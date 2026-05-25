import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const client = createClient({
  projectId: "ylp5n3um",
  dataset: "production",
  apiVersion: "2025-05-25",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── Installningar (singleton) ────────────────────────────────
export async function getInstallningar() {
  return client.fetch(`*[_type == "installningar"][0]`);
}

// ─── Nyheter ──────────────────────────────────────────────────
export async function getAllNyheter() {
  return client.fetch(
    `*[_type == "nyhet"] | order(publishedAt desc) {
      _id, titel, "slug": slug.current, publishedAt, kortBeskrivning, nyhetsbild
    }`
  );
}

export async function getLatestNyheter(count = 6) {
  return client.fetch(
    `*[_type == "nyhet"] | order(publishedAt desc)[0...$count] {
      _id, titel, "slug": slug.current, publishedAt, kortBeskrivning, nyhetsbild
    }`,
    { count }
  );
}

export async function getNyhet(slug: string) {
  return client.fetch(
    `*[_type == "nyhet" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getAllNyhetSlugs() {
  return client.fetch(`*[_type == "nyhet"]{ "slug": slug.current }`);
}

// ─── Boende ───────────────────────────────────────────────────
export async function getAllBoende() {
  return client.fetch(`*[_type == "boende"] | order(orderRank)`);
}

// ─── Kontakt ──────────────────────────────────────────────────
export async function getAllKontakter() {
  return client.fetch(`*[_type == "kontakt"] | order(orderRank)`);
}

// ─── För besökare ─────────────────────────────────────────────
export async function getAllForBesokare() {
  return client.fetch(`*[_type == "forBesokare"] | order(orderRank)`);
}

// ─── Resultat ─────────────────────────────────────────────────
export async function getAllResultat() {
  return client.fetch(`*[_type == "resultat"] | order(orderRank)`);
}

// ─── Cupinfo ──────────────────────────────────────────────────
export async function getAllCupinfo() {
  return client.fetch(
    `*[_type == "cupinfo"] | order(orderRank) {
      _id, namnPaNivan, "slug": slug.current, farg
    }`
  );
}

export async function getCupinfo(slug: string) {
  return client.fetch(
    `*[_type == "cupinfo" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getAllCupinfoSlugs() {
  return client.fetch(`*[_type == "cupinfo"]{ "slug": slug.current }`);
}
