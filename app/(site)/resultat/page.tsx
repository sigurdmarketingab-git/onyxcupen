import PageHero from "@/components/PageHero";
import { ExternalLink } from "lucide-react";
import { getAllResultat } from "@/lib/sanity";

export default async function ResultatPage() {
  const resultat = await getAllResultat();

  return (
    <>
      <PageHero
        label="Resultat"
        title="Resultat och spelprogram"
        subtitle="Spelprogram och resultat för samtliga klasser och årgångar. Klicka på en klass för att se fullständigt schema och resultat."
        breadcrumbs={[{ label: "Hem", href: "/" }, { label: "Resultat" }]}
      />

      <div className="bg-[#181B22] py-16">
        <div className="mx-auto max-w-7xl px-5">
          {resultat?.length === 0 ? (
            <p className="text-[#9ca3af] text-sm">Inga resultat publicerade ännu.</p>
          ) : (
            <div className="flex flex-col gap-10">
              {resultat?.map((data: any) => (
                <div key={data._id}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-bold text-white">Onyxcupen {data.ar}</h2>
                  </div>

                  <div className="rounded-2xl bg-[#1e2229] border border-white/8 overflow-hidden">
                    {data.klasser?.map((k: any, i: number) => (
                      <div
                        key={k._key}
                        className={`flex items-center justify-between px-6 py-4 ${
                          i < data.klasser.length - 1 ? "border-b border-white/6" : ""
                        }`}
                      >
                        <span className="text-sm text-[#E8E8E8]">{k.namn}</span>
                        <div className="flex items-center gap-3">
                          {k.url ? (
                            <a
                              href={k.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#F3811F]/10 hover:bg-[#F3811F]/20 px-3 py-1.5 text-xs font-medium text-[#F3811F] transition-colors"
                            >
                              Spelprogram &amp; resultat <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <span className="text-xs text-[#E8E8E8]/30">Ej tillgänglig</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-2xl bg-[#1e2229] border border-white/8 p-6">
            <p className="text-sm text-[#E8E8E8]/60 leading-relaxed">
              Alla spelprogram och resultat hanteras via{" "}
              <strong className="text-white">innebandy.se</strong>. Klicka på länkarna ovan för att
              komma till respektive klass spelprogram, grupptabeller och slutspelsschema.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
