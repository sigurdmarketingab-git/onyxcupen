import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Info, ChevronRight } from "lucide-react";
import { getAllCupinfo } from "@/lib/sanity";

export default async function CupinfoIndex() {
  const nivåer = await getAllCupinfo();

  return (
    <>
      <PageHero
        title="Cupinfo"
        subtitle="Välj din nivå för att hitta spelschema, klassindelning, avgifter och all praktisk information."
        breadcrumbs={[{ label: "Hem", href: "/" }, { label: "Cupinfo" }]}
      />

      <div className="bg-[#181B22] py-12">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col gap-4 max-w-2xl">
            {nivåer?.length > 0 ? (
              nivåer.map((nivå: any) => {
                const color = nivå.farg?.hex ?? "#F3811F";
                return (
                  <Link
                    key={nivå._id}
                    href={`/cupinfo/${nivå.slug}`}
                    className="group flex items-center gap-5 rounded-2xl bg-[#232830] border border-white/12 px-6 py-5 hover:border-white/25 hover:bg-[#252a33] transition-colors"
                  >
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
                    >
                      <Info className="h-5 w-5" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-white">{nivå.namnPaNivan}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-[#6b7280] shrink-0 group-hover:text-[#9ca3af] transition-colors" />
                  </Link>
                );
              })
            ) : (
              <p className="text-[#9ca3af] text-sm">Ingen cupinfo är publicerad ännu.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
