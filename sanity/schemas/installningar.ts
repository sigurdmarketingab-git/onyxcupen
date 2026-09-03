import { defineField, defineType } from "sanity";
import { FormNote } from "../components/FormNote";

export default defineType({
  name: "installningar",
  title: "Cupinställningar",
  type: "document",
  fields: [
    defineField({
      name: "info",
      title: "",
      type: "string",
      readOnly: true,
      components: {
        input: () =>
          FormNote({
            text: "Fälten här styr vad som visas på startsidan — snabbfaktan med datum och plats, om anmälningsknappen ska synas och vart den ska länka, samt bakgrundsbilden högst upp och textsektionen om Nyköpings Vinterspel längre ner. Uppdatera inför varje nytt cupår. Anmälningsknappen visas automatiskt baserat på slutdatumet — du behöver inte göra något manuellt.",
          }),
      },
    }),
    defineField({
      name: "cupAr",
      title: "Cup-år",
      type: "string",
      description: 'T.ex. "2026". Visas i hero-texten och i snabbfaktan.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cupStartDatum",
      title: "Cupens första dag",
      type: "date",
      description: "Välj startdatumet med kalenderväljaren. Visningsdatumet på sidan (t.ex. \"12–14 september\") genereras automatiskt.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cupSlutDatum",
      title: "Cupens sista dag",
      type: "date",
      description: "Välj slutdatumet med kalenderväljaren.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cupPlats",
      title: "Plats (arenanamn)",
      type: "string",
      description: 'T.ex. "Rosvalla Eventcenter". Visas i snabbfaktan.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cupOrt",
      title: "Ort",
      type: "string",
      description: 'T.ex. "Nyköping". Visas som undertext till platsen och i hero-meningen.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "anmalningStangerDatum",
      title: "Anmälan stänger",
      type: "date",
      description:
        "Välj sista dag för anmälan. Anmälningsknappen, avgiftsrutan och CTA-bannern visas automatiskt fram till och med detta datum — dagen efter försvinner de av sig själv. Lämna tomt om anmälan inte är öppen.",
    }),
    defineField({
      name: "anmalningsavgift",
      title: "Anmälningsavgift",
      type: "string",
      description: 'T.ex. "3 250 kr per lag". Visas i snabbfaktan medan anmälan är öppen.',
    }),
    defineField({
      name: "anmalningsUrl",
      title: "Länk till anmälningsformulär",
      type: "url",
      description: "Den URL som anmälningsknappen pekar till.",
    }),

    // ─── Startsidans toppbild ─────────────────────────────────────
    defineField({
      name: "heroBild",
      title: "Bakgrundsbild högst upp på startsidan",
      type: "image",
      description:
        'Rekommenderad storlek: 2400 × 1350 px (liggande, 16:9). Minst 1920 px bred — mindre bilder blir suddiga på stora skärmar. Spara som JPG eller WebP och håll filen under 500 kB; det här är det första besökaren laddar, så tunga bilder gör sidan långsam. Bilden skalas alltid så att den täcker hela ytan, vilket innebär att kanterna beskärs olika mycket beroende på skärmstorlek. Klicka på "Hotspot" efter uppladdning och placera cirkeln på det viktigaste i bilden — den punkten är alltid kvar i bild. Lämna tomt för att behålla nuvarande standardbild.',
      options: { hotspot: true },
    }),

    // ─── Nyköpings Vinterspel ─────────────────────────────────────
    defineField({
      name: "vinterspelRubrik",
      title: "Nyköpings Vinterspel – rubrik",
      type: "string",
      description: "Rubriken i den lilla sektionen om Nyköpings Vinterspel på startsidan.",
      placeholder: "T.ex. En del av Nyköpings Vinterspel",
    }),
    defineField({
      name: "vinterspelText",
      title: "Nyköpings Vinterspel – text",
      type: "text",
      rows: 4,
      description:
        "Kort beskrivning av vad Nyköpings Vinterspel är, 2–4 meningar. Hela sektionen visas bara när det här fältet är ifyllt — töm det för att dölja den.",
    }),
  ],
  preview: {
    select: { title: "cupAr", subtitle: "cupDatum" },
    prepare({ title, subtitle }) {
      return { title: `Onyxcupen ${title ?? ""}`, subtitle };
    },
  },
});
