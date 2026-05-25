import Link from "next/link";
import { MapPin, Calendar, Info, ChevronRight, Clock, CreditCard, ChevronDown, Check, BedDouble, BarChart2, Compass } from "lucide-react";
import Button from "@/components/Button";
import { getInstallningar, getLatestNyheter, urlFor } from "@/lib/sanity";

const infoCards = [
  {
    title: "Cupinfo Röd Nivå",
    description: "Spelregler, matchtider, dispenser, avgifter och klassindelning.",
    href: "/cupinfo/rod-niva",
    icon: Info,
  },
  {
    title: "Boende",
    description: "Övernattning i arena och hotell i Nyköping med rabatterade priser.",
    href: "/boende",
    icon: BedDouble,
  },
  {
    title: "Resultat & Spelprogram",
    description: "Alla spelscheman och resultat för samtliga klasser.",
    href: "/resultat",
    icon: BarChart2,
  },
  {
    title: "För besökare",
    description: "Aktiviteter och sevärdheter i Nyköping under cuphelgen.",
    href: "/for-besokare",
    icon: Compass,
  },
];

function formatDatum(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export default async function HomePage() {
  const [inst, nyheter] = await Promise.all([
    getInstallningar(),
    getLatestNyheter(3),
  ]);

  const isRegistrationOpen = inst?.anmalningsOppen ?? false;

  const snabbfakta = [
    { icon: Calendar, label: "Datum", value: inst?.cupDatum ?? "–", sub: inst?.cupAr ?? "" },
    { icon: MapPin, label: "Plats", value: inst?.cupPlats ?? "–", sub: inst?.cupOrt ?? "" },
    ...(isRegistrationOpen
      ? [
          { icon: CreditCard, label: "Anmälningsavgift", value: inst?.anmalningsavgift ?? "–", sub: inst?.anmalningsEnhet ?? "" },
          { icon: Clock, label: "Sista anmälningsdag", value: inst?.sistaAnmalningsdag ?? "–", sub: "" },
        ]
      : []),
  ];

  const anmalningsUrl = inst?.anmalningsUrl ?? "#";

  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-[90vh] flex items-center"
        style={{
          backgroundImage:
            "url('https://onyxcupen.se/wp-content/uploads/2025/07/087A7187-1.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-[#181B22]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:py-36">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#F3811F] mb-4">
              Innebandycup i Sverige
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white mb-6">
              Välkommen till
              <br />
              <span className="text-[#F3811F]">Onyxcupen</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8 max-w-xl">
              En smidig, rolig och proffsig innebandyhelg – allt under ett tak. Spela och upplev en
              cup där matcher och atmosfär sitter ihop, {inst?.cupDatum ?? ""} {inst?.cupAr ?? ""} i {inst?.cupOrt ?? "Nyköping"}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {isRegistrationOpen && (
                <Button href={anmalningsUrl} external size="lg">
                  Anmäl lag
                </Button>
              )}
              <Button href="/cupinfo/rod-niva" variant="outlined" size="lg" className="bg-black/25 backdrop-blur-sm">
                Läs mer om cupen
              </Button>
            </div>
          </div>

          {/* Scroll-indikator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </section>

      {/* SNABBFAKTA — visas bara om Sanity har data */}
      {inst && (
        <section className="border-y border-white/15 bg-[#1e2229]">
          <div className="mx-auto max-w-7xl">
            <div
              className={`grid gap-px bg-white/10 ${
                snabbfakta.length === 2
                  ? "grid-cols-2"
                  : snabbfakta.length === 3
                  ? "grid-cols-3"
                  : "grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {snabbfakta.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="bg-[#1e2229] px-4 py-5 sm:px-6 sm:py-7 flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 h-8 w-8 rounded-lg bg-[#F3811F]/15 flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5 text-[#F3811F]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-0.5 leading-tight">{label}</p>
                    <p className="text-sm sm:text-base font-bold text-white leading-snug">{value}</p>
                    {sub && <p className="text-xs text-[#9ca3af]">{sub}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INFORMATION — snabb navigering */}
      <section className="bg-[#181B22] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#F3811F] mb-3">
              Information
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Allt du behöver veta</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {infoCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group rounded-2xl bg-[#232830] border border-white/12 p-6 hover:border-[#F3811F]/50 hover:bg-[#272d36] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 transition-all duration-200"
                >
                  <div className="mb-4 inline-flex items-center justify-center h-11 w-11 rounded-xl bg-[#F3811F]/12 group-hover:bg-[#F3811F]/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#F3811F]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-base">{card.title}</h3>
                  <p className="text-sm text-[#9ca3af] leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#F3811F] group-hover:gap-2 transition-all">
                    Läs mer <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* VARFÖR ONYXCUPEN */}
      <section id="mer" className="bg-[#181B22] pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#F3811F] mb-3">
              Varför Onyxcupen?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">En cup som levererar</h2>
          </div>

          <div className="flex flex-col gap-8">

            {/* Rad 1: Text vänster, Bild höger */}
            <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[340px]">
              <div className="bg-[#232830] border border-white/12 p-8 sm:p-10 flex flex-col justify-center gap-4 order-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#F3811F]">
                  Alla matcher
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Samma hall – hela helgen
                </h3>
                <p className="text-[#9ca3af] leading-relaxed">
                  Ingen bilkaravan mellan hallar – alla matcher spelas i{" "}
                  <strong className="text-white font-semibold">Rosvalla Arena</strong>, en komplett
                  anläggning med flera planer under samma tak. Bättre översikt, enklare logistik och
                  mer tid för laget.
                </p>
              </div>
              <div className="relative min-h-[260px] md:min-h-0 order-2">
                <img
                  src="https://onyxcupen.se/wp-content/uploads/2025/07/image-18.avif"
                  alt="Rosvalla Arena i Nyköping"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Rad 2: Bild vänster, Text höger */}
            <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[340px]">
              <div className="relative min-h-[260px] md:min-h-0 order-2 md:order-1">
                <img
                  src="/EFT_Nykoping.jpg"
                  alt="Svenska landslagsspelare i Rosvalla Arena"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
              <div className="bg-[#232830] border border-white/12 p-8 sm:p-10 flex flex-col justify-center gap-4 order-1 md:order-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#F3811F]">
                  Arrangör
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Arrangeras av Onyx – med rutin från toppen
                </h3>
                <ul className="flex flex-col gap-2">
                  {[
                    "Arrangör av Distrikts-SM i innebandy",
                    "Värd för landslagsturneringen EFT",
                    "Trygg organisation med beprövad logistik",
                  ].map((m) => (
                    <li key={m} className="flex items-start gap-2.5 text-sm text-[#c4cad4]">
                      <Check className="h-4 w-4 text-[#F3811F] shrink-0 mt-0.5" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rad 3: Text vänster, Bild höger */}
            <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[340px]">
              <div className="bg-[#232830] border border-white/12 p-8 sm:p-10 flex flex-col justify-center gap-4 order-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#F3811F]">
                  Upplevelse
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Mer än bara matcher
                </h3>
                <p className="text-[#9ca3af] leading-relaxed">
                  Cuphelgen erbjuder mer än innebandy. God mat, roliga aktiviteter och förmånliga
                  hotellpaket gör att hela laget trivs – på och utanför planen.
                </p>
              </div>
              <div className="relative min-h-[260px] md:min-h-0 order-2">
                <img
                  src="https://onyxcupen.se/wp-content/uploads/2025/07/image-10.avif"
                  alt="Aktiviteter under cuphelgen"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NYHETER */}
      {nyheter && nyheter.length > 0 && (
        <section className="bg-[#181B22] pb-20 sm:pb-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#F3811F] mb-2">
                  Senaste
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Nyheter</h2>
              </div>
              <Link
                href="/nyheter"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F3811F] hover:text-white"
              >
                Alla nyheter <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {nyheter.map((item: any) => {
                const imgUrl = item.nyhetsbild
                  ? urlFor(item.nyhetsbild).width(600).height(338).url()
                  : null;
                const datum = item.publishedAt ? formatDatum(item.publishedAt) : "";
                return (
                  <Link
                    key={item._id}
                    href={`/nyheter/${item.slug}`}
                    className="group rounded-2xl bg-[#232830] border border-white/12 overflow-hidden hover:border-[#F3811F]/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 transition-all duration-200"
                  >
                    <div className="aspect-video overflow-hidden bg-[#252a33]">
                      {imgUrl && (
                        <img
                          src={imgUrl}
                          alt={item.titel}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-[#9ca3af] mb-2 font-medium">{datum}</p>
                      <h3 className="font-semibold text-white mb-2 leading-snug">{item.titel}</h3>
                      <p className="text-sm text-[#9ca3af] leading-relaxed line-clamp-2">
                        {item.kortBeskrivning}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FOTOGALLERI */}
      <section className="bg-[#181B22] pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5">

          {/* Mobil: helbredd + 2×2 */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
              <img
                src="https://onyxcupen.se/wp-content/uploads/2025/07/087A8998-1.avif"
                alt="Publik med svensk flagga under Onyxcupen"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: "https://onyxcupen.se/wp-content/uploads/2025/07/087A9281-1.avif", alt: "Spelarna kramar om varandra" },
                { src: "https://onyxcupen.se/wp-content/uploads/2025/07/54562376486_ac43f3ba36_k-1.avif", alt: "Innebandykillar firar ett mål" },
                { src: "https://onyxcupen.se/wp-content/uploads/2025/07/54555909365_973de7547c_k-1.avif", alt: "Innebandymatch i Rosvalla" },
                { src: "https://onyxcupen.se/wp-content/uploads/2025/07/54556531065_37b81c9c30_k-1.avif", alt: "Glada innebandytjejer" },
              ].map((p) => (
                <div key={p.src} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img src={p.src} alt={p.alt} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: bento grid */}
          <div className="hidden md:flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3 h-[340px]">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://onyxcupen.se/wp-content/uploads/2025/07/087A9281-1.avif"
                  alt="Spelarna kramar om varandra"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 relative rounded-2xl overflow-hidden">
                <img
                  src="https://onyxcupen.se/wp-content/uploads/2025/07/087A8998-1.avif"
                  alt="Publik med svensk flagga under Onyxcupen"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 h-[240px]">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://onyxcupen.se/wp-content/uploads/2025/07/54562376486_ac43f3ba36_k-1.avif"
                  alt="Innebandykillar firar ett mål"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://onyxcupen.se/wp-content/uploads/2025/07/54555909365_973de7547c_k-1.avif"
                  alt="Innebandymatch i Rosvalla"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://onyxcupen.se/wp-content/uploads/2025/07/54556531065_37b81c9c30_k-1.avif"
                  alt="Glada innebandytjejer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA-BANNER — visas bara medan anmälan är öppen */}
      {isRegistrationOpen && (
        <section className="bg-[#181B22] pb-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="rounded-2xl bg-[#232830] border-t-2 border-[#F3811F] shadow-[0_0_80px_rgba(243,129,31,0.12)] px-8 sm:px-12 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="flex flex-col gap-7">
                <h2 className="font-[family-name:var(--font-serpentine)] text-4xl sm:text-5xl font-bold text-white leading-tight">
                  Anmäl ditt lag till Onyxcupen
                </h2>
                <Button href={anmalningsUrl} external size="lg" className="self-start">
                  Anmäl lag nu
                </Button>
              </div>
              <div className="flex lg:justify-end">
                <div className="flex items-center gap-4 bg-[#181B22] rounded-2xl px-6 py-5">
                  <Calendar className="h-5 w-5 text-[#F3811F] shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#F3811F] mb-1">
                      Sista anmälningsdag
                    </p>
                    <p className="text-white font-bold text-lg leading-none">
                      {inst?.sistaAnmalningsdag ?? "–"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
