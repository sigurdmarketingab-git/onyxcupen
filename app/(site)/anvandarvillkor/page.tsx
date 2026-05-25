import PageHero from "@/components/PageHero";
import { Mail } from "lucide-react";

const sections = [
  {
    id: "ansvarig",
    title: "Ansvarig för behandlingen",
    content: (
      <p>
        ONYX Innebandysällskap (IBS), en ideell förening med organisationsnummer{" "}
        <span className="text-[#E8E8E8]/90 font-medium">819001-3154</span> och säte i Sverige, är
        personuppgiftsansvarig för behandling av dina uppgifter. Vid frågor, kontakta oss via e-post:{" "}
        <a
          href="mailto:anna@onyxinnebandy.se"
          className="text-[#F3811F] hover:text-white inline-flex items-center gap-1"
        >
          <Mail className="h-3.5 w-3.5" />
          anna@onyxinnebandy.se
        </a>
        .
      </p>
    ),
  },
  {
    id: "insamling",
    title: "Vilka uppgifter vi samlar in och varför",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          Vi använder en integritetsvärnande analysmetod för att förstå hur webbplatsen används och förbättra
          dess funktion. Analysen sker utan cookies och utan att personuppgifter lagras.
        </p>
        <p>
          Den data som samlas in är aggregerad och anonym: sidvisningar, trafikkällor, enhetstyp och
          ungefärligt land. Inga IP-adresser eller personidentifierare lagras.
        </p>
      </div>
    ),
  },
  {
    id: "rättslig-grund",
    title: "Rättslig grund för behandlingen",
    content: (
      <p>
        Behandlingen sker med stöd av berättigat intresse enligt artikel 6.1(f) i dataskyddsförordningen
        (GDPR). Vårt berättigade intresse är att förstå hur webbplatsen används för att kunna förbättra
        informationen om Onyxcupen samt säkerställa webbplatsens funktion.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p>
        Webbplatsen använder <strong className="text-[#E8E8E8]/90">inga tracking-cookies</strong>. Vi
        använder privacy-first webbanalys som inte kräver samtycke eller cookie-banner. Ingen data delas
        med reklamplattformar eller tredje part.
      </p>
    ),
  },
  {
    id: "tredje-parter",
    title: "Tredje parter och överföringar",
    content: (
      <p>
        Vi delar inte dina uppgifter med tredje part. Eftersom vi inte samlar in personuppgifter via
        analysen sker inga överföringar av persondata utanför EU/EES.
      </p>
    ),
  },
  {
    id: "rattigheter",
    title: "Dina rättigheter",
    content: (
      <div className="flex flex-col gap-3">
        <p>Du har enligt GDPR rätt att:</p>
        <ul className="flex flex-col gap-2 pl-0">
          {[
            "Begära tillgång till de personuppgifter vi har om dig.",
            "Begära rättelse av felaktiga uppgifter.",
            "Begära radering av dina uppgifter i vissa fall.",
            "Invända mot behandlingen eller begära begränsning.",
          ].map((right) => (
            <li key={right} className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F3811F] shrink-0" />
              <span>{right}</span>
            </li>
          ))}
        </ul>
        <p>
          Vill du utöva någon av dessa rättigheter kan du kontakta oss via{" "}
          <a href="mailto:anna@onyxinnebandy.se" className="text-[#F3811F] hover:text-white">
            anna@onyxinnebandy.se
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    id: "incidenter",
    title: "Dataskyddsincidenter",
    content: (
      <p>
        Vid personuppgiftsincidenter följer vi våra skyldigheter enligt Artikel 33 i GDPR och informerar,
        om nödvändigt, både berörda individer och Integritetsskyddsmyndigheten (IMY).
      </p>
    ),
  },
  {
    id: "andringar",
    title: "Ändringar i policyn",
    content: (
      <p>
        Vi kan komma att uppdatera denna policy vid behov. Senaste uppdateringen gjordes den{" "}
        <span className="text-[#E8E8E8]/90">24 maj 2026</span>.
      </p>
    ),
  },
];

export default function AnvandarvillkorPage() {
  return (
    <>
      <PageHero
        label="Juridiskt"
        title="Användarvillkor och integritetspolicy"
        subtitle="Hur ONYX Innebandysällskap hanterar personuppgifter när du använder onyxcupen.se."
        breadcrumbs={[{ label: "Hem", href: "/" }, { label: "Användarvillkor" }]}
      />

      <div className="bg-[#181B22] py-16">
        <div className="mx-auto max-w-3xl px-5">
          {/* Intro card */}
          <div className="rounded-2xl bg-[#1e2229] border border-white/8 p-6 mb-10">
            <p className="text-sm text-[#E8E8E8]/70 leading-relaxed">
              Denna sida beskriver hur ONYX Innebandysällskap (IBS) behandlar personuppgifter när du
              använder vår webbplats <span className="text-[#E8E8E8]/90">onyxcupen.se</span>. Genom att
              besöka och använda webbplatsen samtycker du till vår hantering av data enligt denna policy.
            </p>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-8">
            {sections.map((section, i) => (
              <div key={section.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F3811F]/10 text-[#F3811F] text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <h2 className="text-base font-semibold text-white">{section.title}</h2>
                </div>
                <div className="pl-9 text-sm text-[#E8E8E8]/65 leading-relaxed">
                  {section.content}
                </div>
                {i < sections.length - 1 && (
                  <div className="pl-9 pt-4 border-b border-white/6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
