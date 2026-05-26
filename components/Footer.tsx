import Link from "next/link";
import { MapPin, Mail } from "lucide-react";

const contacts = [
  {
    name: "Anna Karlsson",
    role: "Administration (boende, mat och fakturafrågor)",
    email: "anna@onyxinnebandy.se",
  },
  {
    name: "Jonas Olsson",
    role: "Tävlingsledning (dispenser, spelschema, protester)",
    email: "jonas@jonols.se",
  },
  {
    name: 'Sverker "Kecke" Lundh',
    role: "Marknadsfrågor",
    email: "kecke@onyxinnebandy.se",
  },
];

const quickLinks = [
  { label: "Cupinfo Röd Nivå", href: "/cupinfo/rod-niva" },
  { label: "Boende", href: "/boende" },
  { label: "Resultat & Spelprogram", href: "/resultat" },
  { label: "För besökare", href: "/for-besokare" },
  { label: "Nyheter", href: "/nyheter" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/12 mt-auto pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Onyxcupen"
                className="h-14 w-auto mb-4"
              />
            </Link>
            <p className="text-sm text-[#9ca3af] leading-relaxed mb-5">
              En fantastisk innebandyhelg i Nyköping. Arrangeras av Onyx Innebandy.
            </p>
            <div className="flex items-center gap-1.5 text-sm text-[#9ca3af] mb-5">
              <MapPin className="h-4 w-4 shrink-0 text-[#6b7280]" />
              <span>Idrottsvägen 2, 611 62 Nyköping</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.instagram.com/onyx.innebandy/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/6 hover:bg-[#F3811F]/15 hover:text-[#F3811F] text-[#9ca3af] transition-colors text-sm font-medium"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                Instagram
              </a>
              <a
                href="https://www.facebook.com/onyxinnebandy/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/6 hover:bg-[#F3811F]/15 hover:text-[#F3811F] text-[#9ca3af] transition-colors text-sm font-medium"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                Facebook
              </a>
            </div>
            {/* Onyx Innebandy logo */}
            <div className="mt-8">
              <p className="text-xs font-semibold text-[#6b7280] mb-3 uppercase tracking-wider">Organisatör</p>
              <img
                src="/images/footer-partner.webp"
                alt="Onyx Innebandy"
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-5">
              Snabblänkar
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#c4cad4] hover:text-[#F3811F] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-5">
              Kontaktinformation
            </h3>
            <div className="flex flex-col gap-5">
              {contacts.map((c) => (
                <div key={c.email}>
                  <p className="text-sm font-semibold text-[#EFEFEF]">{c.name}</p>
                  <p className="text-xs text-[#9ca3af] mt-0.5 mb-2 leading-relaxed">{c.role}</p>
                  <a
                    href={`mailto:${c.email}`}
                    className="inline-flex items-center gap-1.5 text-sm text-[#F3811F] hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {c.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Policy-länk ovanför divider */}
        <div className="mt-12 flex justify-left text-xs text-[#6b7280]">
          <Link href="/anvandarvillkor" className="hover:text-[#9ca3af] transition-colors">
            Användarvillkor och integritetspolicy
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 pt-5 border-t border-white/12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[#6b7280]">
          <span>Alla rättigheter förbehållna © 2026 Onyx Innebandy</span>
          <a
            href="https://sigurdmarketing.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span>Hemsida skapad av ©</span>
            <img
              src="/images/footer-banner.svg"
              alt="Sigurd Marketing"
              className="h-12 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
