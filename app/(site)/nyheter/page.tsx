import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Nyheter",
  description:
    "Senaste nytt om Onyxcupen – anmälan, spelschema, praktisk info och uppdateringar inför innebandycupen i Nyköping.",
};
import SectionLabel from "@/components/SectionLabel";
import Link from "next/link";
import { getAllNyheter, urlFor } from "@/lib/sanity";

function getYear(publishedAt: string) {
  return new Date(publishedAt).getFullYear().toString();
}

function formatDatum(publishedAt: string) {
  return new Date(publishedAt).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function groupByYear(items: any[]) {
  const map = new Map<string, any[]>();
  for (const item of items) {
    const year = getYear(item.publishedAt);
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(item);
  }
  return [...map.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
}

export default async function NyheterPage() {
  const nyheter = await getAllNyheter();
  const grupper = groupByYear(nyheter ?? []);

  return (
    <>
      <PageHero
        label="Senaste"
        title="Nyheter"
        subtitle="Håll dig uppdaterad med det senaste från Onyxcupen."
        breadcrumbs={[{ label: "Hem", href: "/" }, { label: "Nyheter" }]}
      />

      <div className="bg-[#181B22] py-16">
        <div className="mx-auto max-w-7xl px-5">
          {grupper.length === 0 ? (
            <p className="text-[#9ca3af] text-sm">Inga nyheter publicerade ännu.</p>
          ) : (
            <div className="flex flex-col gap-16">
              {grupper.map(([year, items]) => (
                <div key={year}>
                  <SectionLabel>Onyxcupen {year}</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((nyhet: any) => {
                      const imgUrl = nyhet.nyhetsbild
                        ? urlFor(nyhet.nyhetsbild).width(600).height(338).url()
                        : null;
                      return (
                        <Link
                          key={nyhet._id}
                          href={`/nyheter/${nyhet.slug}`}
                          className="group rounded-2xl bg-[#232830] border border-white/12 overflow-hidden hover:border-[#F3811F]/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 transition-all duration-200"
                        >
                          <div className="aspect-video overflow-hidden bg-[#252a33]">
                            {imgUrl && (
                              <img
                                src={imgUrl}
                                alt={nyhet.titel}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            )}
                          </div>
                          <div className="p-5">
                            <p className="text-xs text-[#9ca3af] mb-2 font-medium">
                              {nyhet.publishedAt ? formatDatum(nyhet.publishedAt) : ""}
                            </p>
                            <h2 className="font-semibold text-white mb-2 leading-snug">
                              {nyhet.titel}
                            </h2>
                            <p className="text-sm text-[#9ca3af] leading-relaxed line-clamp-3">
                              {nyhet.excerpt?.slice(0, 220)}
                            </p>
                            <span className="mt-4 inline-block text-xs font-semibold text-[#F3811F]">
                              Läs mer →
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
