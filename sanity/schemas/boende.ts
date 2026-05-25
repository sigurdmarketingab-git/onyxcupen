import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "boende",
  title: "Boende",
  type: "document",
  fields: [
    defineField({
      name: "namn",
      title: "Namn",
      type: "string",
      description: "Namnet på boendet, t.ex. 'Nyköpings Vandrarhem'.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "adress",
      title: "Adress",
      type: "string",
      description: "Gatuadress och ort, t.ex. 'Brunnsgatan 4, 611 32 Nyköping'.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      description: "Sätt till 'Fullbokat' när inga platser finns kvar — ett rött märke visas då på kortet.",
      options: { list: ["Tillgänglig", "Fullbokat"], layout: "radio" },
      initialValue: "Tillgänglig",
    }),
    defineField({
      name: "erbjudande",
      title: 'Visa "Erbjudande!"-badge',
      type: "boolean",
      description: "Kryssa i för att visa ett grönt 'Erbjudande!'-märke på kortet.",
      initialValue: false,
    }),
    defineField({
      name: "bild",
      title: "Bild",
      type: "image",
      description: "En representativ bild av boendet. Visas till vänster på kortet.",
      options: { hotspot: true },
    }),
    defineField({
      name: "beskrivning",
      title: "Beskrivning",
      type: "text",
      rows: 4,
      description: "Beskriv boendet — läge, vad som ingår, antal platser etc.",
    }),
    defineField({
      name: "pris",
      title: "Pris",
      type: "string",
      description: "T.ex. '250 kr per säng/natt' eller 'Ingår i deltagarpaket 1'.",
    }),
    defineField({
      name: "telefon",
      title: "Telefonnummer",
      type: "string",
      description: "Valfritt. Visas som klickbar länk för mobilanvändare.",
    }),
    defineField({
      name: "ctaTyp",
      title: "Knapp på kortet",
      type: "string",
      description: "Välj om kortet ska ha en knapp och vart den ska leda.",
      options: {
        list: [
          { title: "Ingen knapp", value: "ingen" },
          { title: "Länk till boendets hemsida", value: "hemsida" },
          { title: "Länk till kontaktsidan", value: "kontakt" },
        ],
        layout: "radio",
      },
      initialValue: "ingen",
    }),
    defineField({
      name: "hemsidaUrl",
      title: "Länk till boendets hemsida",
      type: "url",
      description: "Klistra in boendets webbadress, t.ex. https://www.goodmorninghotels.se",
      hidden: ({ document }) => document?.ctaTyp !== "hemsida",
      validation: (r) =>
        r.custom((val, ctx) => {
          if (ctx.document?.ctaTyp === "hemsida" && !val) return "URL krävs när 'Länk till hemsida' är valt.";
          return true;
        }),
    }),
    orderRankField({ type: "boende" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "namn", subtitle: "status", media: "bild" },
  },
});
