# Onyx Cupen — Redesign Project

## Projektöversikt

En fullständig redesign av **onyxcupen.se** — en årlig innebandycup för ungdomslag från hela Sverige. Sidan är informationstät och riktar sig till lagledare, spelare och föräldrar. Målet är att flytta från WordPress/Bricks till en modern stack som ägaren kan underhålla själv.

**Nuvarande sida:** https://onyxcupen.se  
**Språk:** Svenska (endast)  
**Deploy:** Vercel (gratis hobby-tier, kopplad till befintlig domän via loopia.com)

---

## Tech Stack

| Del | Val | Motivering |
|-----|-----|------------|
| Framework | Next.js (App Router) | Industristandard, fungerar sömlöst med Sanity och Vercel |
| CMS | Sanity | Kundvänligt Studio-UI, strukturerade scheman, bra för återkommande evenemang |
| Komponenter | shadcn/ui + Tailwind CSS | Gratis, open source, ger full kodägandeskap — inte ett Figma-kit |
| E-post | Resend (om behövs) eller Loopias e-posttjänst | Avgörs när e-postflöden identifieras |
| Hosting | Vercel | Gratis för hobby-projekt, noll konfiguration för Next.js |

---

## Designprinciper

**UX är alltid prioritet ett.** Sidan är inte en SaaS-produkt eller en design-showcase. Det är ett informationsverktyg för barnfamiljer och lagledare, målgrupp man/kvinna oteknisk till medelteknisk i 40-60 års åldern. Håll detta i åtanke vid varje beslut.

1. **Minimalism och konsistens** — Inga häftiga animationer, parallax-effekter eller visuella trick. Enkelhet och enhetlighet vinner.
2. **Kognitiv belastning** — Sidan är extremt informationstät. Bryt upp innehåll i tydliga sektioner, använd gruppering, hierarki och whitespace för att guida ögat.
3. **Behåll varumärkesidentiteten** — Typografi, accentfärger och övriga designtokens hämtas från den nuvarande sidan via Chrome DevTools (CSS Overview → Colors/Fonts). Dessa ska bevaras exakt.
4. **Bilder är livet** — Autentiska foton från cupen gör sidan levande. Ersätt aldrig med placeholders i produktion. Använd exakt de bilder som redan finns enligt Chrome Devtools på sidan onyxcupen.se. Gäller även textinnehåll.
5. **Tillgänglighet** — WCAG AA-kontrast, semantisk HTML, keyboard-navigerbar.

---

## Arbetsflöde — Initial Redesign

### Steg 1: Inspektera nuvarande sida
Innan något kodas, öppna onyxcupen.se i Chrome DevTools och dokumentera:
- **CSS Overview → Colors** — Alla färger som används (bakgrund, text, accenter)
- **CSS Overview → Fonts** — Typsnittsfamiljer och vikter
- **Sidstruktur** — Vilka sektioner finns? (Hero, Om cupen, Schema, Anmälan, Kontakt, etc.)
- **Innehåll** — All text och alla bilder som ska bevaras

### Steg 2: Bygg komponenter
- Starta alltid med Sanity-schema för det givna innehållet
- Bygg sidan sektion för sektion, mobil-first
- Använd shadcn/ui-komponenter där de passar (navigering, tabeller, formulär, accordion)

### Steg 3: Jämför mot original
- Ta screenshot med Chrome DevTools
- Jämför visuellt mot originalet — samma innehåll, bättre UX
- Kontrollera: spacing, typografi, färger, responsivitet

### Steg 4: Iterera
Upprepa steg 3–4 tills skillnaderna är acceptabla. Stoppa aldrig efter ett pass.

---

## Sanity CMS — Scheman

Scheman definieras **efter** att Chrome DevTools-inspektionen av onyxcupen.se är klar. Utgå alltid från faktiskt innehåll, inte antaganden. Modellera bara det som behövs.

---

## Resultat

Cupresultat hanteras **inte** på denna sida. De länkas till ett externt system (standard inom innebandyvärlden). På sidan visas enbart en sektion med tydliga länkkort per kategori (t.ex. Flickor röd, Pojkar blå) — varje kort öppnar rätt URL i en ny flik. Ingen API-integration behövs.

---

## Regler

- **Börja alltid med Chrome DevTools-inspektion** av onyxcupen.se innan du gör något visuellt
- **Ändra inte text eller bilder** i initial redesign — exakt samma innehåll, ny design
- **Fråga om du är osäker** på innehållsstruktur — hellre en fråga för mycket än ett felaktigt Sanity-schema
- **Ingen överteknik** — om en statisk Next.js-komponent räcker, använd inte en dynamisk. Enkelhet vinner.
- **Kunden ska kunna uppdatera allt** via Sanity Studio utan att röra koden

---

## Design Skills att använda

Använd dessa skills i kombination — alltid med UX som slutgiltigt filter:

- `impeccable` — visuell hierarki, spacing, typografi, layout-audit
- `ui-ux-pro-max` — komponentdesign, UX-mönster
- `frontend-design` — produktionsklar komponentkod
- `design-motion-principles` — används sparsamt, bara för micro-interactions som förbättrar UX (t.ex. accordion-öppning, focus-states)

**Prioritetsordning:** Användbarhet → Läsbarhet → Estetik → Animation
