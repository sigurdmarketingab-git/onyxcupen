import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getNyhet, getAllNyhetSlugs, tidigareAdress, urlFor } from "@/lib/sanity";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const nyhet = await getNyhet(slug);
  if (!nyhet) return {};
  const excerpt = nyhet.excerpt ?? nyhet.titel;
  return {
    title: nyhet.titel,
    description: excerpt.length > 160 ? excerpt.slice(0, 157) + "..." : excerpt,
    openGraph: {
      title: nyhet.titel,
      description: excerpt.length > 160 ? excerpt.slice(0, 157) + "..." : excerpt,
      type: "article",
      publishedTime: nyhet.publishedAt,
      url: `https://onyxcupen.se/nyheter/${slug}`,
      ...(nyhet.nyhetsbild
        ? { images: [{ url: urlFor(nyhet.nyhetsbild).width(1200).height(630).url(), width: 1200, height: 630 }] }
        : {}),
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllNyhetSlugs();
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }));
}

function formatDatum(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const portableTextComponents = {
  marks: {
    // Länk-annotationen finns i nyhetsschemat men saknade renderare, så
    // länkar som lades in i Studio blev oklickbara i brödtexten.
    link: ({ value, children }: { value?: { href?: string }; children: React.ReactNode }) => {
      const href = value?.href ?? "";
      const externLank = href.startsWith("http");
      return (
        <a
          href={href}
          {...(externLank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-[#F3811F] underline underline-offset-2 decoration-[#F3811F]/40 hover:decoration-[#F3811F]"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: any) => {
      const url = urlFor(value).width(800).url();
      return (
        <figure className="my-6 rounded-2xl overflow-hidden">
          <img src={url} alt={value.alt ?? ""} className="w-full object-cover" />
        </figure>
      );
    },
  },
};

export default async function NyhetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nyhet = await getNyhet(slug);

  if (!nyhet) {
    // Adressen följer rubriken, så en omdöpt nyhet byter adress. Länkar som
    // delats tidigare skickas vidare i stället för att visa 404.
    const nuvarande = await tidigareAdress("nyhet", slug);
    if (nuvarande) redirect(`/nyheter/${nuvarande}`);
    notFound();
  }

  const imgUrl = nyhet.nyhetsbild ? urlFor(nyhet.nyhetsbild).width(1200).height(675).url() : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: nyhet.titel,
    datePublished: nyhet.publishedAt,
    publisher: { "@type": "Organization", name: "Onyx Innebandy", url: "https://onyxcupen.se" },
    ...(imgUrl ? { image: [imgUrl] } : {}),
  };

  return (
    <div className="bg-[#181B22] py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mx-auto max-w-3xl px-5">
        <nav aria-label="Brödsmulor" className="flex items-center gap-1 mb-8 flex-wrap">
          {[
            { label: "Hem", href: "/" },
            { label: "Nyheter", href: "/nyheter" },
            { label: nyhet.titel },
          ].map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3 text-[#E8E8E8]/25 shrink-0" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-xs text-[#E8E8E8]/40 hover:text-[#E8E8E8]/70 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className="text-xs text-[#E8E8E8]/55 truncate max-w-[200px]"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <article>
          {nyhet.publishedAt && (
            <p className="text-xs text-[#E8E8E8]/40 mb-3">{formatDatum(nyhet.publishedAt)}</p>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 leading-tight">
            {nyhet.titel}
          </h1>

          {imgUrl && (
            <div className="rounded-2xl overflow-hidden mb-8 aspect-video bg-[#1e2229]">
              <img src={imgUrl} alt={nyhet.titel} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-invert max-w-none text-[#E8E8E8]/80 leading-relaxed">
            {nyhet.helaNyhetsbeskrivningen ? (
              <PortableText
                value={nyhet.helaNyhetsbeskrivningen}
                components={portableTextComponents}
              />
            ) : nyhet.excerpt ? (
              <p>{nyhet.excerpt}</p>
            ) : null}
          </div>
        </article>
      </div>
    </div>
  );
}
