import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

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
      description: 'T.ex. "Röd Nivå" eller "Blå Nivå".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-adress",
      type: "slug",
      description: "Skapas automatiskt — behöver inte ändras.",
      options: { source: "namnPaNivan", maxLength: 96 },
      validation: (r) => r.required(),
      hidden: ({ document }) => !!document?.slug,
    }),
    defineField({
      name: "farg",
      title: "Färg för den här nivån",
      type: "color",
      description: "Visas som en liten färgprick i cupinfo-listan på sidan.",
    }),

    // ─── Spelschema ───────────────────────────────────────────────
    defineField({
      name: "spelschemaEtikett",
      title: "Etikett vid spelschemat",
      type: "string",
      description: 'T.ex. "2026 – Uppdaterat 2026-09-09 kl 16:00".',
    }),
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
              description: 'T.ex. "Flickor Röd A".',
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "Länk till spelprogram",
              type: "url",
              description: "Klistra in länken till spelprogrammet. Lämna tom om klassen saknar spelprogram.",
            }),
            defineField({
              name: "notat",
              title: "Notat (valfritt)",
              type: "string",
              description: 'Visas som en orange varningstext, t.ex. "UTGÅR!".',
            }),
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
      description: "Syns ovanför klassindelnings-tabellen.",
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
              description: 'T.ex. "Flickor Röd A".',
              validation: (r) => r.required(),
            }),
            defineField({
              name: "argang",
              title: "Årgång",
              type: "string",
              description: 'T.ex. "2010" eller "2012/2013".',
              validation: (r) => r.required(),
            }),
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
      description: "Syns nedanför klassindelnings-tabellen.",
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
