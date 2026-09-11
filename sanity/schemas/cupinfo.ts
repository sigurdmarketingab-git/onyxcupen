import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

/**
 * Cupinfo-sidan är gemensam för Röd och Blå nivå — nästan all information är
 * densamma och ska bara underhållas på ett ställe. Det fåtal rader och avsnitt
 * som bara gäller en nivå märks upp med det här fältet och får en tydlig
 * etikett på sidan.
 */
const gallerNiva = () =>
  defineField({
    name: "gallerNiva",
    title: "Vilken nivå gäller det här?",
    type: "string",
    description:
      "Låt stå på \"Gäller båda nivåerna\" om informationen är gemensam. Väljer du en nivå visas en tydlig etikett på sidan.",
    options: {
      list: [
        { title: "Gäller båda nivåerna", value: "alla" },
        { title: "Endast Röd nivå", value: "rod" },
        { title: "Endast Blå nivå", value: "bla" },
      ],
      layout: "radio",
    },
    initialValue: "alla",
  });

export default defineType({
  name: "cupinfo",
  title: "Cup-info per nivå",
  type: "document",
  fields: [
    // ─── Grundinfo ────────────────────────────────────────────────
    defineField({
      name: "namnPaNivan",
      title: "Namn på nivån",
      type: "string",
      description:
        'Rubriken högst upp på sidan. Täcker sidan båda nivåerna skriver du t.ex. "Röd & Blå nivå".',
      validation: (r) => r.required(),
    }),
    // Sidans URL-adress skapas automatiskt från rubriken — se lib/slug.ts.
    // Fältet ligger kvar dolt och innehåller den adress som gällde tidigare,
    // så att redan delade länkar kan skickas vidare i stället för att ge 404.
    defineField({
      name: "slug",
      title: "URL-adress",
      type: "slug",
      hidden: true,
    }),

    // ─── Spelschema ───────────────────────────────────────────────
    defineField({
      name: "spelschema",
      title: "Spelschema – klasser",
      type: "array",
      description: "Lägg till en rad per klass. Dra för att ändra ordning. Lämna tom om spelschema inte finns ännu.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "klass",
              title: "Klassnamn",
              type: "string",
              placeholder: "T.ex. Flickor Röd A",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "Länk till spelprogram",
              type: "url",
              description: "Klistra in länken till spelprogrammet. Lämna tom om klassen saknar spelprogram.",
              placeholder: "https://www.profixio.com/...",
            }),
            defineField({
              name: "notat",
              title: "Notat (valfritt)",
              type: "string",
              description: "Visas som en orange varningstext på raden.",
              placeholder: "T.ex. UTGÅR!",
            }),
            gallerNiva(),
          ],
          preview: { select: { title: "klass", subtitle: "href" } },
        },
      ],
    }),

    // ─── Klassindelning ───────────────────────────────────────────
    defineField({
      name: "klassindelningTextForst",
      title: "Klassindelning – inledande text",
      type: "text",
      rows: 4,
      description: "Syns ovanför klassindelnings-tabellen. Kan lämnas tom.",
      placeholder: "T.ex. Indelningen nedan gäller för Onyxcupen 2026. Lag i samma klass möter varandra i gruppspelet.",
    }),
    defineField({
      name: "klassindelning",
      title: "Klassindelning – tabellrader",
      type: "array",
      description: "En rad per klass. Dra för att ändra ordning.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "klass",
              title: "Klass",
              type: "string",
              placeholder: "T.ex. Flickor Röd A",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "argang",
              title: "Årgång",
              type: "string",
              placeholder: "T.ex. 2012 eller 2012/2013",
              validation: (r) => r.required(),
            }),
            gallerNiva(),
          ],
          preview: { select: { title: "klass", subtitle: "argang" } },
        },
      ],
    }),
    defineField({
      name: "klassindelningTextEfter",
      title: "Klassindelning – avslutande text",
      type: "text",
      rows: 6,
      description: "Syns nedanför klassindelnings-tabellen. Kan lämnas tom.",
      placeholder: "T.ex. Dispensspelare kan delta i klasser upp till två år äldre än sin faktiska årgång.",
    }),

    // ─── Avgifter ─────────────────────────────────────────────────
    defineField({
      name: "avgifter",
      title: "Avgifter – priskort",
      type: "array",
      description: "Lägg till ett kort per avgiftsalternativ. Dra för att ändra ordning.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "titel",
              title: "Titel",
              type: "string",
              description: 'T.ex. "Anmälningsavgift" eller "Deltagarpaket 1".',
              validation: (r) => r.required(),
            }),
            defineField({
              name: "pris",
              title: "Pris",
              type: "string",
              description: 'T.ex. "3 250 kr".',
            }),
            defineField({
              name: "enhet",
              title: "Enhet",
              type: "string",
              description: '"per lag" eller "per person".',
            }),
            defineField({
              name: "highlight",
              title: "Markera det här kortet?",
              type: "boolean",
              description: "Ger kortet en orange kant så det sticker ut. Välj max ett per år.",
              initialValue: false,
            }),
            defineField({
              name: "items",
              title: "Vad ingår",
              type: "array",
              of: [{ type: "string" }],
              description: "Skriv in en sak per rad — tryck Enter för ny rad.",
            }),
            defineField({
              name: "notat",
              title: "Notat (valfritt)",
              type: "text",
              rows: 2,
              description: "Visas som liten grå text längst ner på kortet.",
            }),
            gallerNiva(),
          ],
          preview: {
            select: { title: "titel", subtitle: "pris" },
          },
        },
      ],
    }),
    defineField({
      name: "avgifterNotis",
      title: "Avgifter – informationsruta",
      type: "text",
      rows: 4,
      description: "Text i den orange rutan under priskorten (t.ex. info om fria ledare och betalningsdatum).",
    }),

    // ─── Spelregler ───────────────────────────────────────────────
    defineField({
      name: "spelreglerIngress",
      title: "Spelregler – inledande text",
      type: "text",
      rows: 3,
      description: "Syns ovanför regelavsnitten.",
    }),
    defineField({
      name: "spelregler",
      title: "Spelregler – avsnitt",
      type: "array",
      description: "Lägg till ett avsnitt per ämne, t.ex. Matchtider, Straffar, WO. Dra för att ändra ordning.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "titel",
              title: "Rubrik",
              type: "string",
              description: 'T.ex. "Matchtider" eller "WO (walkover)".',
              validation: (r) => r.required(),
            }),
            defineField({
              name: "innehall",
              title: "Text",
              type: "text",
              rows: 5,
            }),
            gallerNiva(),
          ],
          preview: { select: { title: "titel" } },
        },
      ],
    }),

    // ─── Övrig information ────────────────────────────────────────
    defineField({
      name: "ovrigInfo",
      title: "Övrig information – avsnitt",
      type: "array",
      description: "Lägg till ett avsnitt per ämne, t.ex. Mat, Boende, Avhopp. Dra för att ändra ordning.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "titel",
              title: "Rubrik",
              type: "string",
              description: 'T.ex. "Mat" eller "Kiosk & servering".',
              validation: (r) => r.required(),
            }),
            defineField({
              name: "innehall",
              title: "Text",
              type: "text",
              rows: 6,
            }),
            gallerNiva(),
          ],
          preview: { select: { title: "titel" } },
        },
      ],
    }),

    orderRankField({ type: "cupinfo" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "namnPaNivan" },
    prepare({ title }) {
      return { title: title ?? "Namnlös nivå" };
    },
  },
});
