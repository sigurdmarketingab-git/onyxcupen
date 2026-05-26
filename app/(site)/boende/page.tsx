import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ExternalLink, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Boende",
  description:
    "Boendealternativ nära Rosvalla Arena i Nyköping under Onyxcupen 2026. Hitta hotell och stugbyar för hela laget.",
};
import { getAllBoende, urlFor } from "@/lib/sanity";

export default async function BoendePage() {
  const boendeAlternativ = await getAllBoende();

  return (
    <>
      <PageHero
        label="Boende"
        title="Övernattning under cupen"
        subtitle="Vi har förhandlat fram förmånliga priser på boende för cupdeltagare i Nyköping."
        breadcrumbs={[{ label: "Hem", href: "/" }, { label: "Boende" }]}
      />

      <div className="bg-[#181B22] py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col gap-6">
            {boendeAlternativ?.map((alt: any) => {
              const imgUrl = alt.bild ? urlFor(alt.bild).width(800).url() : null;
              const isFullbokat = alt.status === "fullbokat";

              return (
                <div
                  key={alt._id}
                  className="rounded-2xl bg-[#1e2229] border border-white/8 overflow-hidden flex flex-col md:flex-row"
                >
                  {imgUrl && (
                    <div className="md:w-72 lg:w-96 shrink-0 h-56 md:h-auto overflow-hidden">
                      <img src={imgUrl} alt={alt.namn} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="p-6 lg:p-8 flex flex-col flex-1 gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-xl font-bold text-white">{alt.namn}</h2>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {alt.erbjudande && (
                          <span className="inline-block rounded-full bg-green-500/15 text-green-400 px-2.5 py-0.5 text-xs font-semibold">
                            Erbjudande!
                          </span>
                        )}
                        {isFullbokat && (
                          <span className="inline-block rounded-full bg-red-500/15 text-red-400 px-2.5 py-0.5 text-xs font-medium">
                            Fullbokat
                          </span>
                        )}
                      </div>
                    </div>

                    {alt.adress && (
                      <div className="flex items-center gap-1.5 text-xs text-[#9ca3af]">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span>{alt.adress}</span>
                      </div>
                    )}

                    {alt.beskrivning && (
                      <p className="text-sm text-[#c4cad4] leading-relaxed flex-1">
                        {alt.beskrivning}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-white/8">
                      {alt.pris && (
                        <div className="rounded-lg bg-[#F3811F]/10 border border-[#F3811F]/20 px-4 py-2">
                          <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider">Kostnad</p>
                          <p className="text-sm font-semibold text-[#F3811F]">{alt.pris}</p>
                        </div>
                      )}

                      {alt.telefon && (
                        <a
                          href={`tel:${alt.telefon.replace(/[^0-9+]/g, "")}`}
                          className="flex items-center gap-1.5 text-sm text-[#9ca3af] hover:text-white"
                        >
                          <Phone className="h-3.5 w-3.5 shrink-0" />
                          <span>{alt.telefon}</span>
                        </a>
                      )}

                      {alt.ctaTyp === "hemsida" && alt.hemsidaUrl && !isFullbokat && (
                        <a
                          href={alt.hemsidaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#F3811F] hover:underline"
                        >
                          Till hemsidan <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl bg-[#1e2229] border border-white/8 p-6">
            <h3 className="font-semibold text-white mb-2">Kontakta oss om boende</h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed">
              Har du frågor om boende, mat eller fakturafrågor? Kontakta Anna Karlsson på{" "}
              <a href="mailto:anna@onyxinnebandy.se" className="text-[#F3811F] hover:underline">
                anna@onyxinnebandy.se
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
