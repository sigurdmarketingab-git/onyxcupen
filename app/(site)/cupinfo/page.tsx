import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ChevronRight } from "lucide-react";
import { getAllCupinfo } from "@/lib/sanity";

// TEST: Temporär mock för att visa hur sidan ser ut med flera nivåer.
// Ta bort mockNivåer och sammanfogningen nedan när riktiga nivåer finns i Sanity.
const mockNivåer = [
  { _id: "mock-bla", namnPaNivan: "Blå Nivå", slug: "bla-niva", farg: { hex: "#3b82f6" } },
];

export default async function CupinfoIndex() {
  const sanityNivåer = await getAllCupinfo();
  const nivåer = [...(sanityNivåer ?? []), ...mockNivåer];

  return (
    <>
      <PageHero
        title="Cupinfo"
        subtitle="Välj din nivå för att hitta spelschema, klassindelning, avgifter och all praktisk information."
        breadcrumbs={[{ label: "Hem", href: "/" }, { label: "Cupinfo" }]}
      />

      <div className="bg-[#181B22] py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {nivåer.map((nivå: any) => {
              const color = nivå.farg?.hex ?? "#F3811F";
              return (
                <Link
                  key={nivå._id}
                  href={`/cupinfo/${nivå.slug}`}
                  className="group cursor-pointer rounded-2xl bg-[#232830] overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 transition-all duration-200"
                  style={{ borderTop: `2px solid ${color}` }}
                >
                  <div className="px-8 py-10 flex flex-col gap-6 h-full">
                    <div
                      className="w-5 h-5 rounded-md shrink-0"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    <div className="flex-1">
                      <h2 className="font-[family-name:var(--font-serpentine)] text-3xl font-bold text-white leading-tight mb-3">
                        {nivå.namnPaNivan}
                      </h2>
                      <p className="text-sm text-[#9ca3af] leading-relaxed">
                        Spelschema, klassindelning, avgifter och spelregler.
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all duration-200"
                      style={{ color }}
                    >
                      Gå till nivå <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
