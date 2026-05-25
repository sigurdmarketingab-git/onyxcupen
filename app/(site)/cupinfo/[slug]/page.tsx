import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import TocAccordion, { type TocItem } from "@/components/TocAccordion";
import { getCupinfo, getAllCupinfoSlugs } from "@/lib/sanity";
import { ExternalLink, Check, Calendar, Users, CreditCard, BookOpen, Layers, type LucideIcon } from "lucide-react";

const tocIconMap: Record<string, LucideIcon> = { Calendar, Users, CreditCard, BookOpen, Layers };

export async function generateStaticParams() {
  const slugs = await getAllCupinfoSlugs();
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }));
}

function Section({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="flex items-center gap-2.5 text-xl font-bold text-white mb-5 pb-3 border-b border-white/12">
        <Icon className="h-5 w-5 text-[#F3811F] shrink-0" />
        {title}
      </h2>
      <div className="text-sm text-[#c4cad4] leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[#232830] border border-white/12 p-5">
      <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
      <div className="text-sm text-[#c4cad4] leading-relaxed">{children}</div>
    </div>
  );
}

function ResultRow({ klass, href, note }: { klass: string; href?: string | null; note?: string }) {
  return (
    <div className="flex items-center justify-between py-3.5 px-5 border-b border-white/8 last:border-0">
      <span className="text-sm text-[#EFEFEF]">{klass}</span>
      <div className="flex items-center gap-2">
        {note && (
          <span className="text-xs font-medium text-[#F3811F] bg-[#F3811F]/10 px-2.5 py-0.5 rounded-lg">
            {note}
          </span>
        )}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F3811F] hover:text-white"
          >
            Visa spelschema <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

function PrisKort({
  titel,
  pris,
  enhet,
  highlight,
  items,
  notat,
}: {
  titel: string;
  pris?: string;
  enhet?: string;
  highlight?: boolean;
  items?: string[];
  notat?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 flex flex-col gap-4 ${
        highlight ? "bg-[#F3811F]/8 border-[#F3811F]/40" : "bg-[#232830] border-white/12"
      }`}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-2">{titel}</p>
        {pris && <p className="text-3xl font-extrabold text-white">{pris}</p>}
        {enhet && <p className="text-sm text-[#9ca3af]">{enhet}</p>}
      </div>
      {items && items.length > 0 && (
        <ul className="flex flex-col gap-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="h-4 w-4 text-[#F3811F] shrink-0 mt-0.5" />
              <span className="text-sm text-[#c4cad4]">{item}</span>
            </li>
          ))}
        </ul>
      )}
      {notat && (
        <p className="text-xs text-[#9ca3af] border-t border-white/10 pt-3 leading-relaxed">
          {notat}
        </p>
      )}
    </div>
  );
}

export default async function CupinfoNiva({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCupinfo(slug);
  if (!data) notFound();

  // Bygg TOC dynamiskt med ikonnamn som strängar (kan serialiseras över server→client-gränsen)
  const tocItems: TocItem[] = [
    ...(data.spelschema?.length ? [{ id: "spelschema", label: "Spelschema", icon: "Calendar" as const }] : []),
    ...(data.klassindelning?.length ? [{ id: "klassindelning", label: "Klassindelning", icon: "Users" as const }] : []),
    ...(data.avgifter?.length ? [{ id: "avgifter", label: "Avgifter", icon: "CreditCard" as const }] : []),
    ...((data.spelregler?.length || data.spelreglerIngress) ? [{ id: "spelregler", label: "Spelregler", icon: "BookOpen" as const }] : []),
    ...(data.ovrigInfo?.length ? [{ id: "ovriginformation", label: "Övrig information", icon: "Layers" as const }] : []),
  ];

  // Adaptiv grid-klass för avgifter beroende på antal kort
  const avgifterGrid =
    data.avgifter?.length === 1
      ? "grid-cols-1 max-w-sm"
      : data.avgifter?.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <PageHero
        title={data.namnPaNivan}
        subtitle="All information du behöver inför cupen – spelregler, schema, avgifter och praktiska detaljer."
        breadcrumbs={[
          { label: "Hem", href: "/" },
          { label: "Cupinfo", href: "/cupinfo" },
          { label: data.namnPaNivan },
        ]}
        accentColor={data.farg?.hex}
      />

      <div className="bg-[#181B22] py-12">
        <div className="mx-auto max-w-7xl px-5">

          {/* Mobil TOC — accordion (client component) */}
          {tocItems.length > 0 && <TocAccordion items={tocItems} />}

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar TOC — desktop */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block lg:w-56 shrink-0">
                <div className="sticky top-28 rounded-xl bg-[#232830] border border-white/12 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-3">
                    Innehåll
                  </p>
                  <nav className="flex flex-col gap-0.5">
                    {tocItems.map(({ id, label, icon }) => {
                      const Icon = tocIconMap[icon];
                      return (
                        <a
                          key={id}
                          href={`#${id}`}
                          className="flex items-center gap-2.5 text-sm text-[#c4cad4] hover:text-[#F3811F] transition-colors py-1.5 px-2 rounded-lg hover:bg-white/5"
                        >
                          <Icon className="h-3.5 w-3.5 text-[#F3811F]/60 shrink-0" />
                          {label}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </aside>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col gap-12">

              {/* Spelschema */}
              {data.spelschema?.length > 0 && (
                <Section id="spelschema" title="Spelschema" icon={Calendar}>
                  {data._updatedAt && (
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                        Uppdaterat {new Date(data._updatedAt).toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                    </div>
                  )}
                  <div className="rounded-xl bg-[#232830] border border-white/12 overflow-hidden">
                    {data.spelschema.map((s: any) => (
                      <ResultRow key={s._key} klass={s.klass} href={s.href} note={s.notat} />
                    ))}
                  </div>
                </Section>
              )}

              {/* Klassindelning */}
              {data.klassindelning?.length > 0 && (
                <Section id="klassindelning" title="Klassindelning" icon={Users}>
                  {data.klassindelningTextForst && <p>{data.klassindelningTextForst}</p>}
                  <div className="rounded-xl bg-[#232830] border border-white/12 overflow-hidden my-4">
                    {data.klassindelning.map((k: any) => (
                      <div
                        key={k._key}
                        className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 last:border-0"
                      >
                        <span className="text-sm text-[#EFEFEF]">{k.klass}</span>
                        <span className="text-sm font-mono font-semibold text-[#F3811F]">
                          {k.argang}
                        </span>
                      </div>
                    ))}
                  </div>
                  {data.klassindelningTextEfter && (
                    <p className="whitespace-pre-line">{data.klassindelningTextEfter}</p>
                  )}
                </Section>
              )}

              {/* Avgifter */}
              {data.avgifter?.length > 0 && (
                <Section id="avgifter" title="Avgifter" icon={CreditCard}>
                  <div className={`grid ${avgifterGrid} gap-4 my-4`}>
                    {data.avgifter.map((kort: any) => (
                      <PrisKort
                        key={kort._key}
                        titel={kort.titel}
                        pris={kort.pris}
                        enhet={kort.enhet}
                        highlight={kort.highlight}
                        items={kort.items}
                        notat={kort.notat}
                      />
                    ))}
                  </div>
                  {data.avgifterNotis && (
                    <div className="rounded-xl bg-[#F3811F]/8 border border-[#F3811F]/25 px-5 py-4 text-sm text-[#c4cad4] leading-relaxed">
                      {data.avgifterNotis}
                    </div>
                  )}
                </Section>
              )}

              {/* Spelregler */}
              {(data.spelregler?.length > 0 || data.spelreglerIngress) && (
                <Section id="spelregler" title="Spelregler" icon={BookOpen}>
                  {data.spelreglerIngress && <p>{data.spelreglerIngress}</p>}
                  {data.spelregler?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                      {data.spelregler.map((ruta: any) => (
                        <div
                          key={ruta._key}
                          className="rounded-xl bg-[#232830] border border-white/12 p-5 space-y-2"
                        >
                          <h4 className="text-sm font-bold text-white">{ruta.titel}</h4>
                          <p className="text-sm text-[#c4cad4] whitespace-pre-line">{ruta.innehall}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </Section>
              )}

              {/* Övrig information */}
              {data.ovrigInfo?.length > 0 && (
                <Section id="ovriginformation" title="Övrig information" icon={Layers}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.ovrigInfo.map((ruta: any) => (
                      <InfoBox key={ruta._key} title={ruta.titel}>
                        <p className="whitespace-pre-line">{ruta.innehall}</p>
                      </InfoBox>
                    ))}
                  </div>
                </Section>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
