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
            text: "Fälten här styr vad som visas på startsidan — snabbfaktan med datum och plats, om anmälningsknappen ska synas och vart den ska länka. Uppdatera inför varje nytt cupår. Anmälningsknappen visas automatiskt baserat på slutdatumet — du behöver inte göra något manuellt.",
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
      name: "cupDatum",
      title: "Datum",
      type: "string",
      description: 'T.ex. "12–14 september". Visas i snabbfaktan på startsidan.',
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
  ],
  preview: {
    select: { title: "cupAr", subtitle: "cupDatum" },
    prepare({ title, subtitle }) {
      return { title: `Onyxcupen ${title ?? ""}`, subtitle };
    },
  },
});
