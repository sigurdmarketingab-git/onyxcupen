import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { resolveSlugs } from "./slug";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-05-25",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Bypass CDN for installningar — settings must always be fresh
const freshClient = client.withConfig({ useCdn: false });

// ─── URL-adresser ─────────────────────────────────────────────
// Kunden fyller aldrig i en URL själv — adressen följer rubriken. Byter
// kunden rubrik byter sidan adress, och den gamla adressen skickas vidare
// till den nya via tidigareAdress() nedan.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityDoc = { _id: string } & Record<string, any>;

export type CupinfoNiva = {
  _id: string;
  namnPaNivan: string;
  slug: string;
};

async function slugUppslag(typ: "nyhet" | "cupinfo") {
  const rubrikFalt = typ === "nyhet" ? "titel" : "namnPaNivan";
  const docs = await client.fetch(
    `*[_type == $typ] | order(_id) { _id, "rubrik": ${rubrikFalt}, "slug": slug.current }`,
    { typ }
  );
  return resolveSlugs(docs);
}

async function slugKarta(typ: "nyhet" | "cupinfo"): Promise<Record<string, string>> {
  return (await slugUppslag(typ)).karta;
}

/**
 * Slår upp vart en adress som inte längre används ska skickas vidare.
 * Returnerar null om adressen aldrig har funnits.
 */
export async function tidigareAdress(
  typ: "nyhet" | "cupinfo",
  slug: string
): Promise<string | null> {
  const { karta, tidigare } = await slugUppslag(typ);
  const nuvarande = tidigare[slug];
  // En adress som är i bruk av en annan sida ska aldrig omdirigeras.
  if (!nuvarande || Object.values(karta).includes(slug)) return null;
  return nuvarande;
}

function medSlug<T extends { _id: string }>(docs: T[], karta: Record<string, string>) {
  return docs.map((doc) => ({ ...doc, slug: karta[doc._id] }));
}

// ─── Installningar (singleton) ────────────────────────────────
export async function getInstallningar() {
  return freshClient.fetch(`*[_type == "installningar"][0]`);
}

// ─── Nyheter ──────────────────────────────────────────────────
export async function getAllNyheter() {
  const [nyheter, karta] = await Promise.all([
    client.fetch<SanityDoc[]>(
      `*[_type == "nyhet"] | order(publishedAt desc) {
        _id, titel, publishedAt,
        "excerpt": pt::text(helaNyhetsbeskrivningen),
        nyhetsbild
      }`
    ),
    slugKarta("nyhet"),
  ]);
  return medSlug(nyheter, karta);
}

export async function getLatestNyheter(count = 6) {
  const [nyheter, karta] = await Promise.all([
    client.fetch<SanityDoc[]>(
      `*[_type == "nyhet"] | order(publishedAt desc)[0...$count] {
        _id, titel, publishedAt,
        "excerpt": pt::text(helaNyhetsbeskrivningen),
        nyhetsbild
      }`,
      { count }
    ),
    slugKarta("nyhet"),
  ]);
  return medSlug(nyheter, karta);
}

export async function getNyhet(slug: string) {
  const karta = await slugKarta("nyhet");
  const id = Object.keys(karta).find((key) => karta[key] === slug);
  if (!id) return null;
  return client.fetch(`*[_id == $id][0]`, { id });
}

export async function getAllNyhetSlugs() {
  const karta = await slugKarta("nyhet");
  return Object.values(karta).map((slug) => ({ slug }));
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
export async function getAllCupinfo(): Promise<CupinfoNiva[]> {
  const [nivaer, karta] = await Promise.all([
    client.fetch<Omit<CupinfoNiva, "slug">[]>(
      `*[_type == "cupinfo"] | order(orderRank) { _id, namnPaNivan }`
    ),
    slugKarta("cupinfo"),
  ]);
  return medSlug(nivaer, karta);
}

export async function getCupinfo(slug: string) {
  const karta = await slugKarta("cupinfo");
  const id = Object.keys(karta).find((key) => karta[key] === slug);
  if (!id) return null;
  return client.fetch(`*[_id == $id][0] { ..., _updatedAt }`, { id });
}

export async function getAllCupinfoSlugs() {
  const karta = await slugKarta("cupinfo");
  return Object.values(karta).map((slug) => ({ slug }));
}
