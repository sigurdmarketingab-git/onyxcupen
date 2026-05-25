import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "forBesokare",
  title: "För besökare",
  type: "document",
  fields: [
    defineField({
      name: "namn",
      title: "Namn",
      type: "string",
      description: 'Namnet på platsen eller aktiviteten, t.ex. "Boda Borg" eller "Sörmlands Museum".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "string",
      description: "Valj vilken kategori den har platsen tillhor. Anvands for att gruppera pa sidan.",
      options: {
        list: [
          { title: "Aktiviteter", value: "aktiviteter" },
          { title: "Kultur", value: "kultur" },
          { title: "Mat", value: "mat" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "bild",
      title: "Bild",
      type: "image",
      description: "En representativ bild av platsen.",
      options: { hotspot: true },
    }),
    defineField({
      name: "beskrivning",
      title: "Beskrivning",
      type: "text",
      rows: 5,
      description: "Beskriv platsen — vad man kan göra där, öppettider, avstånd från arenan etc.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "hemsidaUrl",
      title: "Länk till hemsida",
      type: "url",
      description: 'Valfritt. Om ifylld visas en knapp "Till hemsidan" pa kortet.',
    }),
    orderRankField({ type: "forBesokare" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "namn", subtitle: "kategori", media: "bild" },
    prepare({ title, subtitle, media }) {
      const kategoriLabel: Record<string, string> = { aktiviteter: "Aktiviteter", kultur: "Kultur", mat: "Mat" };
      return { title, subtitle: kategoriLabel[subtitle] ?? subtitle, media };
    },
  },
});
