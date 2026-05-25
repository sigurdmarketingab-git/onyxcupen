import PageHero from "@/components/PageHero";
import { Mail } from "lucide-react";
import { getAllKontakter, urlFor } from "@/lib/sanity";

export default async function KontaktPage() {
  const kontakter = await getAllKontakter();

  return (
    <>
      <PageHero
        title="Kontakta oss"
        subtitle="Välj rätt kontaktperson nedan så får du snabbast svar."
        breadcrumbs={[{ label: "Hem", href: "/" }, { label: "Kontakt" }]}
      />

      <div className="bg-[#181B22] py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kontakter?.map((k: any) => {
              const imgUrl = k.bild ? urlFor(k.bild).width(128).height(128).url() : null;
              return (
                <div
                  key={k._id}
                  className="rounded-2xl bg-[#232830] border border-white/12 p-6 flex items-start gap-5"
                >
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={k.namn}
                      className="h-16 w-16 rounded-xl object-cover border border-white/12 shrink-0"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-xl bg-[#2d3340] border border-white/12 shrink-0" />
                  )}
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <p className="font-semibold text-white text-base">{k.namn}</p>
                    <p className="text-sm text-[#9ca3af] leading-relaxed">{k.ansvarsomrade}</p>
                    <a
                      href={`mailto:${k.email}`}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#F3811F] hover:text-white"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {k.email}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
