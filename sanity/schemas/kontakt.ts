import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "kontakt",
  title: "Kontaktperson",
  type: "document",
  fields: [
    defineField({
      name: "namn",
      title: "Namn",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ansvarsomrade",
      title: "Ansvarsområde",
      type: "string",
      description: 'T.ex. "Administration (boende, mat och fakturafrågor)".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      title: "E-postadress",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "bild",
      title: "Profilbild",
      type: "image",
      description: "Visas på kontaktsidan.",
      options: { hotspot: true },
    }),
    orderRankField({ type: "kontakt" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "namn", subtitle: "ansvarsomrade", media: "bild" },
  },
});
