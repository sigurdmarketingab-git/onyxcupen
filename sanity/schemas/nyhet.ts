import { defineField, defineType } from "sanity";

export default defineType({
  name: "nyhet",
  title: "Nyhet",
  type: "document",
  fields: [
    defineField({
      name: "titel",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-adress",
      type: "slug",
      description: "Skapas automatiskt från titeln — behöver inte ändras.",
      options: { source: "titel", maxLength: 96 },
      validation: (r) => r.required(),
      hidden: ({ document }) => !!document?.slug,
    }),
    defineField({
      name: "publishedAt",
      title: "Publiceringsdatum",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "nyhetsbild",
      title: "Nyhetsbild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "helaNyhetsbeskrivningen",
      title: "Hela nyhetsbeskrivningen",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Rubrik H2", value: "h2" },
            { title: "Rubrik H3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Fet", value: "strong" },
              { title: "Kursiv", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Länk",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
        { type: "image", options: { hotspot: true } },
      ],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Publiceringsdatum, nyast först",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "titel", subtitle: "publishedAt", media: "nyhetsbild" },
    prepare({ title, subtitle, media }) {
      const date = subtitle ? new Date(subtitle).toLocaleDateString("sv-SE") : "";
      return { title, subtitle: date, media };
    },
  },
});
