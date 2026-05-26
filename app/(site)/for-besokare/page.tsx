import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "För besökare",
  description:
    "Tips på aktiviteter och sevärdheter i Nyköping under Onyxcupen-helgen. Perfekt för familjer och supportrar.",
};
import { getAllForBesokare, urlFor } from "@/lib/sanity";

const kategoriLabels: Record<string, string> = {
  aktiviteter: "Aktiviteter",
  kultur: "Kultur",
  mat: "Mat",
};

function groupByKategori(items: any[]) {
  const map = new Map<string, any[]>();
  for (const item of items) {
    const kat = item.kategori ?? "ovrigt";
    if (!map.has(kat)) map.set(kat, []);
    map.get(kat)!.push(item);
  }
  return [...map.entries()];
}

export default async function ForBesokare() {
  const platser = await getAllForBesokare();
  const grupper = groupByKategori(platser ?? []);

  return (
    <>
      <PageHero
        label="För besökare"
        title="Vad kan man göra som besökare?"
        subtitle="Nyköping har mycket att erbjuda. Här är några tips på aktiviteter och sevärdheter under cuphelgen."
        breadcrumbs={[{ label: "Hem", href: "/" }, { label: "För besökare" }]}
      />

      <div className="bg-[#181B22] py-16">
        <div className="mx-auto max-w-7xl px-5">
          {grupper.length === 0 ? (
            <p className="text-[#9ca3af] text-sm">Inget publicerat ännu.</p>
          ) : (
            <div className="flex flex-col gap-16">
              {grupper.map(([kategori, items]) => (
                <div key={kategori}>
                  <SectionLabel>{kategoriLabels[kategori] ?? kategori}</SectionLabel>
                  <div className="flex flex-col gap-6">
                    {items.map((plats: any) => {
                      const imgUrl = plats.bild
                        ? urlFor(plats.bild).width(800).url()
                        : null;
                      return (
                        <div
                          key={plats._id}
                          className="rounded-2xl bg-[#1e2229] border border-white/8 overflow-hidden flex flex-col md:flex-row"
                        >
                          {imgUrl && (
                            <div className="md:w-80 lg:w-96 shrink-0 h-56 md:h-auto overflow-hidden">
                              <img
                                src={imgUrl}
                                alt={plats.namn}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="p-7 flex flex-col gap-4 flex-1">
                            <h3 className="text-xl font-bold text-white">{plats.namn}</h3>
                            <div className="text-sm text-[#c4cad4] leading-relaxed space-y-3">
                              {plats.beskrivning?.split("\n\n").map((para: string, i: number) => (
                                <p key={i}>{para}</p>
                              ))}
                            </div>
                            {plats.hemsidaUrl && (
                              <a
                                href={plats.hemsidaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#F3811F] hover:text-white"
                              >
                                Till hemsidan <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
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
