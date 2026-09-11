import { Fragment } from "react";

/**
 * Gör webbadresser och e-postadresser klickbara i vanlig brödtext.
 *
 * Textfälten i Sanity är rena textrutor utan formateringsverktyg, så kunden
 * kan inte skapa en länk manuellt. I stället räcker det att skriva eller
 * klistra in adressen — den blir en länk automatiskt när sidan renderas.
 */

// En webbadress (med eller utan https://) eller en e-postadress.
const LANK =
  /(https?:\/\/[^\s]+|www\.[^\s]+|[^\s@]+@[^\s@]+\.[a-zA-ZåäöÅÄÖ]{2,})/g;

// Skiljetecken direkt efter en adress hör till meningen, inte till länken.
const SLUTTECKEN = /[.,;:!?)\]}'"»…]+$/;

// Textfälten är rena textrutor, men HTML klistras ibland in ändå (t.ex.
// <a href="...">). Utan rensning visas taggarna som synlig text på sidan.
const HTML_TAGG = /<[^>]*>/g;

function tillHref(adress: string): string {
  if (adress.startsWith("http")) return adress;
  if (adress.includes("@")) return `mailto:${adress}`;
  return `https://${adress}`;
}

export default function LinkedText({
  text,
  className,
}: {
  text?: string | null;
  className?: string;
}) {
  if (!text) return null;

  // split() med en capture-grupp ger [text, träff, text, träff, …] —
  // udda index är alltså alltid en adress.
  const delar = text.replace(HTML_TAGG, "").split(LANK);

  return (
    <span className={className}>
      {delar.map((del, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{del}</Fragment>;

        const slut = del.match(SLUTTECKEN)?.[0] ?? "";
        const adress = slut ? del.slice(0, -slut.length) : del;
        const arEpost = !adress.startsWith("http") && adress.includes("@");

        return (
          <Fragment key={i}>
            <a
              href={tillHref(adress)}
              {...(arEpost ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="font-medium text-[#F3811F] underline underline-offset-2 decoration-[#F3811F]/40 hover:decoration-[#F3811F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F3811F] rounded-sm"
            >
              {adress}
            </a>
            {slut}
          </Fragment>
        );
      })}
    </span>
  );
}
