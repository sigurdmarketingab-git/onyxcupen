"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, Info, Calendar, Users, CreditCard, BookOpen, BedDouble } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/Button";

type CupinfoItem = { slug: string; namnPaNivan: string };

type NavChild = { label: string; href: string; icon: React.ComponentType<{ className?: string }> };
type NavLink =
  | { label: string; href: string; children: NavChild[] }
  | { label: string; href: string; children?: never };

const staticLinks: NavLink[] = [
  { label: "Nyheter", href: "/nyheter" },
  { label: "För besökare", href: "/for-besokare" },
  { label: "Resultat", href: "/resultat" },
  { label: "Kontakt", href: "/kontakt" },
];

function buildNavLinks(cupinfoItems: CupinfoItem[]): NavLink[] {
  if (cupinfoItems.length === 1) {
    const slug = cupinfoItems[0].slug;
    const namn = cupinfoItems[0].namnPaNivan;
    return [
      {
        label: "Cupinfo",
        href: `/cupinfo/${slug}`,
        children: [
          { label: `${namn} – All info`, href: `/cupinfo/${slug}`, icon: Info },
          { label: "Spelschema", href: `/cupinfo/${slug}#spelschema`, icon: Calendar },
          { label: "Klassindelning", href: `/cupinfo/${slug}#klassindelning`, icon: Users },
          { label: "Avgifter", href: `/cupinfo/${slug}#avgifter`, icon: CreditCard },
          { label: "Spelregler", href: `/cupinfo/${slug}#spelregler`, icon: BookOpen },
          { label: "Boende", href: "/boende", icon: BedDouble },
        ],
      },
      ...staticLinks,
    ];
  }
  return [
    { label: "Cupinfo", href: "/cupinfo" },
    ...staticLinks,
  ];
}

export default function Navbar({
  anmalningsOppen = false,
  anmalningsUrl,
  cupinfoItems = [],
}: {
  anmalningsOppen?: boolean;
  anmalningsUrl?: string | null;
  cupinfoItems?: CupinfoItem[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navLinks = buildNavLinks(cupinfoItems);

  function openDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }

  function closeDropdown() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 100);
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/12 bg-[#181B22]/92 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 py-4 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo.png" alt="Onyxcupen" className="h-12 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-base font-medium text-[#c4cad4] hover:text-white hover:bg-white/5 transition-colors"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                    onClick={() => (dropdownOpen ? closeDropdown() : openDropdown())}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                        dropdownOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "absolute top-full left-0 mt-1.5 w-60 rounded-xl bg-[#232830] border border-white/12 shadow-2xl py-1.5",
                      "transition-all duration-200 ease-out",
                      dropdownOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1.5 pointer-events-none"
                    )}
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    {link.children.map((child) => {
                      const Icon = child.icon;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-3 text-base text-[#c4cad4] hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Icon className="h-4 w-4 text-[#F3811F]/70 shrink-0" />
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-base font-medium text-[#c4cad4] hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          {anmalningsOppen && anmalningsUrl && (
            <Button href={anmalningsUrl} external className="hidden lg:inline-flex shrink-0">
              Anmäl lag
            </Button>
          )}

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#c4cad4] hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Stäng meny" : "Öppna meny"}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full z-[60] w-[88vw] bg-[#181B22] shadow-2xl lg:hidden flex flex-col transition-translate duration-300 ease-out",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/12">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="Onyxcupen" className="h-10 w-auto" />
          </Link>
          <button
            className="p-2 rounded-lg text-[#c4cad4] hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Stäng meny"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-2xl font-medium text-[#c4cad4] hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setMobileSubOpen((v) => !v)}
                >
                  <span>{link.label}</span>
                  <ChevronRight
                    className={cn(
                      "h-6 w-6 opacity-60 transition-[rotate] duration-200",
                      mobileSubOpen && "rotate-90"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    mobileSubOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="mb-2 mx-1 rounded-xl border border-white/10 bg-[#232830] divide-y divide-white/8 overflow-hidden">
                      {link.children.map((child) => {
                        const Icon = child.icon;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-4 px-5 py-4 text-xl text-[#9ca3af] hover:text-white hover:bg-white/5 transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            <Icon className="h-5 w-5 text-[#F3811F]/80 shrink-0" />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-4 rounded-xl text-2xl font-medium text-[#c4cad4] hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Drawer footer CTA */}
        {anmalningsOppen && anmalningsUrl && (
          <div className="px-4 py-5 border-t border-white/12">
            <Button href={anmalningsUrl} external size="lg" className="w-full">
              Anmäl lag
            </Button>
          </div>
        )}
      </div>

    </>
  );
}
