import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "onyxcupen",
  title: "Onyxcupen CMS",
  projectId: "ylp5n3um",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Innehåll")
          .items([
            S.listItem()
              .title("Cupinstallningar")
              .child(
                S.document()
                  .schemaType("installningar")
                  .documentId("installningar")
              ),
            S.listItem()
              .title("Nyheter")
              .child(
                S.documentList()
                  .title("Nyheter")
                  .filter('_type == "nyhet"')
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),
            orderableDocumentListDeskItem({ type: "boende", title: "Boenden", S, context }),
            orderableDocumentListDeskItem({ type: "forBesokare", title: "För besökare", S, context }),
            orderableDocumentListDeskItem({ type: "resultat", title: "Resultat", S, context }),
            orderableDocumentListDeskItem({ type: "cupinfo", title: "Cup-info per nivå", S, context }),
            S.listItem()
              .title("Kontaktuppgifter")
              .child(S.documentList().title("Kontaktuppgifter").filter('_type == "kontakt"')),
          ]),
    }),
    colorInput(),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
