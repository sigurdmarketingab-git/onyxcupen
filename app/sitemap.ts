import { MetadataRoute } from "next";
import { getAllCupinfoSlugs, getAllNyhetSlugs } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://onyxcupen.se";
  const staticRoutes = ["/", "/cupinfo", "/nyheter", "/boende", "/kontakt", "/resultat", "/for-besokare"];
  const cupinfoSlugs = await getAllCupinfoSlugs();
  const nyhetSlugs = await getAllNyhetSlugs();

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...(cupinfoSlugs ?? []).map((s: { slug: string }) => ({
      url: `${base}/cupinfo/${s.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...(nyhetSlugs ?? []).map((s: { slug: string }) => ({
      url: `${base}/nyheter/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
