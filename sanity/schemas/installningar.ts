import { defineField, defineType } from "sanity";

export default defineType({
  name: "installningar",
  title: "Cupinställningar",
  type: "document",
  fields: [
    defineField({
      name: "cupAr",
      title: "Cup-år",
      type: "string",
      description: 'Vilket år är cupen? T.ex. "2026".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cupDatum",
      title: "Datum",
      type: "string",
      description: 'Visas i snabbfakta på startsidan. T.ex. "12–14 september".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cupPlats",
      title: "Plats (arenanamn)",
      type: "string",
      description: 'T.ex. "Rosvalla Arena".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cupOrt",
      title: "Ort",
      type: "string",
      description: 'T.ex. "Nyköping". Visas som undertext till platsen.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "anmalningsOppen",
      title: "Anmälan öppen?",
      type: "boolean",
      description:
        "Styr om anmälningsfakta (avgift och sista dag) visas på startsidan. Sätt till AV när anmälningsperioden är slut.",
      initialValue: false,
    }),
    defineField({
      name: "anmalningsavgift",
      title: "Anmälningsavgift",
      type: "string",
      description: 'T.ex. "3 250 kr". Visas i snabbfakta när anmälan är öppen.',
    }),
    defineField({
      name: "anmalningsEnhet",
      title: "Avgifts-enhet",
      type: "string",
      description: 'T.ex. "per lag".',
    }),
    defineField({
      name: "sistaAnmalningsdag",
      title: "Sista anmälningsdag",
      type: "string",
      description: 'T.ex. "31 augusti 2026". Visas i snabbfakta när anmälan är öppen.',
    }),
    defineField({
      name: "anmalningsUrl",
      title: "Länk till anmälningsformulär",
      type: "url",
      description: "Länken som anmälningsknappen på startsidan pekar till.",
    }),
  ],
  preview: {
    select: { title: "cupAr", subtitle: "cupDatum" },
    prepare({ title, subtitle }) {
      return { title: `Onyxcupen ${title ?? ""}`, subtitle };
    },
  },
});
