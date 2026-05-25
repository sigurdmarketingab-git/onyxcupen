import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "resultat",
  title: "Resultat",
  type: "document",
  fields: [
    defineField({
      name: "ar",
      title: "År",
      type: "string",
      description: 'Vilket cup-år gäller det här? T.ex. "2026".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "klasser",
      title: "Klasser",
      type: "array",
      description: "Lägg till en rad per klass. Dra för att ändra ordning.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "namn",
              title: "Klassnamn",
              type: "string",
              description: 'T.ex. "Flickor Röd A" eller "Pojkar Röd B".',
              validation: (r) => r.required(),
            }),
            defineField({
              name: "url",
              title: "Länk till spelprogram/resultat",
              type: "url",
              description: "Länken till den externa sidan (stats.innebandy.se eller liknande).",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "namn", subtitle: "url" },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    orderRankField({ type: "resultat" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "ar" },
    prepare({ title }) {
      return { title: `Onyxcupen ${title}` };
    },
  },
});
