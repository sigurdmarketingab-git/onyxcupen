import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
}

export default function PageHero({ label, title, subtitle, breadcrumbs }: PageHeroProps) {
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.label,
          ...(crumb.href ? { item: `https://onyxcupen.se${crumb.href}` } : {}),
        })),
      }
    : null;

  return (
    <section className="bg-[#0f1217] pt-14 pb-10 border-b border-white/8">
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <div className="mx-auto max-w-7xl px-5">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Brödsmulor" className="flex items-center gap-1 mb-5 flex-wrap">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#6b7280] shrink-0" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-sm text-[#9ca3af] hover:text-[#EFEFEF] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-sm text-[#c4cad4]" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-[#9ca3af] max-w-2xl leading-relaxed text-sm sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
