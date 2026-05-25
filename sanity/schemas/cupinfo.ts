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
      title: "URL-slug",
      type: "slug",
      description: 'Genereras automatiskt. Används i URL:en, t.ex. "/cupinfo/rod-niva".',
      options: { source: "namnPaNivan", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "farg",
      title: "Accentfärg",
      type: "color",
      description: "Välj en färg som representerar den här nivån (används i cupinfo-listan).",
    }),

    // ─── Spelschema ───────────────────────────────────────────────
    defineField({
      name: "spelschemaEtikett",
      title: "Spelschema-etikett",
      type: "string",
      description: 'T.ex. "2026 – Uppdaterat 2026-09-09 kl 16:00".',
    }),
    defineField({
      name: "spelschema",
      title: "Spelschema – aktuellt år",
      type: "array",
      description: "En rad per klass. Dra för att ändra ordning. Lämna tom om spelschema saknas.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "klass",
              title: "Klass",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "Länk till spelprogram",
              type: "url",
              description: "Lämna tom om klassen saknar spelprogram.",
            }),
            defineField({
              name: "notat",
              title: "Notat",
              type: "string",
              description: 'T.ex. "UTGÅR!" — visas som orange etikett.',
            }),
          ],
          preview: { select: { title: "klass", subtitle: "href" } },
        },
      ],
    }),

    // ─── Klassindelning ───────────────────────────────────────────
    defineField({
      name: "klassindelningTextForst",
      title: "Klassindelning – text ovanför tabellen",
      type: "text",
      rows: 4,
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
      title: "Klassindelning – text nedanför tabellen",
      type: "text",
      rows: 6,
    }),

    // ─── Avgifter — flexibel array ────────────────────────────────
    // Fronten anpassar sig till valfritt antal kort (1, 2, 3...).
    defineField({
      name: "avgifter",
      title: "Avgifter – priskort",
      type: "array",
      description:
        "Lägg till ett kort per avgiftsalternativ. Dra för att ändra ordning. Fronten visar alla kort du lägger till.",
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
              title: "Markerat kort?",
              type: "boolean",
              description: "Ger kortet orange ram. Välj max ett per år.",
              initialValue: false,
            }),
            defineField({
              name: "items",
              title: "Vad ingår",
              type: "array",
              of: [{ type: "string" }],
              description: "En rad per inkluderad sak.",
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
      title: "Avgifter – orange notisruta",
      type: "text",
      rows: 4,
      description:
        "Texten i den orange rutan under priskorten (info om fria ledare, betalningsdatum etc.).",
    }),

    // ─── Spelregler — flexibel array ──────────────────────────────
    // En ruta per regelavsnitt. Fronten visar alla rutor i 2-kol grid.
    defineField({
      name: "spelreglerIngress",
      title: "Spelregler – inledande mening",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "spelregler",
      title: "Spelregler – informationsrutor",
      type: "array",
      description:
        "En ruta per regelavsnitt. Dra för att ändra ordning. Fronten visar alla rutor i ett 2-kolumnsgrid.",
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
              title: "Innehåll",
              type: "text",
              rows: 5,
            }),
          ],
          preview: { select: { title: "titel" } },
        },
      ],
    }),

    // ─── Övrig information — flexibel array ──────────────────────
    // En ruta per ämne. Fronten visar alla rutor i 2-kol grid.
    defineField({
      name: "ovrigInfo",
      title: "Övrig information – informationsrutor",
      type: "array",
      description:
        "En ruta per ämne (t.ex. Mat, Boende, Avhopp). Dra för att ändra ordning. Fronten visar alla rutor i ett 2-kolumnsgrid.",
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
              title: "Innehåll",
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
