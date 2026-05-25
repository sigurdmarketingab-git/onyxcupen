import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "ylp5n3um",
  dataset: "production",
  apiVersion: "2025-05-25",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function uploadImage(url: string, filename: string) {
  const res = await fetch(url);
  if (!res.ok) { console.warn(`  ⚠ Kunde inte hämta bild: ${url}`); return null; }
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  console.log(`  ↑ Bild uppladdad: ${filename}`);
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function deleteAll(type: string) {
  const ids = await client.fetch<string[]>(`*[_type == $type]._id`, { type });
  for (const id of ids) await client.delete(id);
  console.log(`Rensade ${ids.length} befintliga ${type}-dokument`);
}

// ─── KONTAKTER ───────────────────────────────────────────────────────────────
async function seedKontakter() {
  await deleteAll("kontakt");
  const data = [
    { namn: "Anna Karlsson", ansvarsomrade: "Administration (boende, mat och fakturafrågor)", email: "anna@onyxinnebandy.se", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/07/Group-8-768x768.avif" },
    { namn: "Jonas Olsson", ansvarsomrade: "Tävlingsledning (dispenser, spelschema, protester)", email: "jonas@jonols.se", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/07/Frame-1272638762.avif" },
    { namn: 'Sverker "Kecke" Lundh', ansvarsomrade: "Marknadsfrågor", email: "kecke@onyxinnebandy.se", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/07/Frame-6.avif" },
  ];
  for (let i = 0; i < data.length; i++) {
    const { imgUrl, ...rest } = data[i];
    const bild = await uploadImage(imgUrl, `kontakt-${i}.avif`);
    await client.create({ _type: "kontakt", ...rest, ...(bild ? { bild } : {}), orderRank: `${i}` });
    console.log(`✓ Kontakt: ${data[i].namn}`);
  }
}

// ─── BOENDEN ─────────────────────────────────────────────────────────────────
async function seedBoenden() {
  await deleteAll("boende");
  const data = [
    { namn: "Nyköpings Vandrarhem", adress: "Brunnsgatan 4, 611 32 Nyköping", status: "Tillgänglig", erbjudande: true, beskrivning: "Vi har reserverat 20 sängplatser den 12–14 september på nedre plan av Nyköpings Vandrarhem. Perfekt för ett lag. Promenadavstånd till arenan. Frukost ingår ej men kan beställas i matpaket frukost/lunch/middag som serveras på Rosvalla. Först till kvarn.", pris: "250 kr per säng/natt", ctaTyp: "hemsida", hemsidaUrl: "https://www.nyköpingsvandrarhem.se", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/07/image-16-1536x1152.avif", orderRank: "0" },
    { namn: "Rosvalla Arena", adress: "Rosvalla, Idrottsvägen 12", status: "Fullbokat", erbjudande: false, beskrivning: "De lag som har bokat övernattning hårt golv bor på: 1) Rosvalla Arena i direkt anslutning till hallarna 2) Närliggande skola/gymnastikhall på 5–10 min gångavstånd 3) Skola/gymnastikhall 5–10 min med bil 4) Skola/gymnastikhall/hembygdsgård 10–20 min med bil. Vi tillämpar först till kvarn! Utcheckning senast kl 12:00 på söndagen.", pris: "Ingår i deltagarpaket 1", ctaTyp: "ingen", imgUrl: null, orderRank: "1" },
    { namn: "Good Morning Hotels", adress: "Gumsbackevägen 2, 611 38 Nyköping", status: "Tillgänglig", erbjudande: true, beskrivning: "Vi har reserverat ett antal rum på Good Morning Hotels+ i Nyköping den 12–14 september där vi kan erbjuda ett rabatterat pris för cupdeltagare. För att boka – ring direkt till Good Morning och uppge Onyxcupen.", pris: "Rabatterat hotellpris", telefon: "0155-289000", ctaTyp: "hemsida", hemsidaUrl: "https://www.goodmorninghotels.se", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/07/image-8-1536x1536.webp", orderRank: "2" },
  ];
  for (const b of data) {
    const { imgUrl, ...rest } = b;
    const bild = imgUrl ? await uploadImage(imgUrl, `boende-${b.namn.toLowerCase().replace(/\s+/g, "-")}.webp`) : null;
    await client.create({ _type: "boende", ...rest, ...(bild ? { bild } : {}) });
    console.log(`✓ Boende: ${b.namn}`);
  }
}

// ─── FÖR BESÖKARE ─────────────────────────────────────────────────────────────
async function seedForBesokare() {
  await deleteAll("forBesokare");
  const data = [
    { namn: "Boda Borg", kategori: "aktiviteter", beskrivning: "Att Questa är att kliva in i en ny värld. Och en till. Och en till. Ni är tre till fem personer som samarbetar. Hur många Questar du och ditt lag klarar av är upp till er. Allt går på tid, och allt är på riktigt. Inga simulationer, ingen virtuell verklighet. Det är ni mot utmaningen – och det gäller att vara här och nu.\n\nBoda Borg Oxelösund ligger närmast Stockholm och är en av Sveriges största anläggningar. Vi har 24 Questar, aktiviteter och paket för alla slags grupper. Kom och upplev ett minnesvärt äventyr tillsammans!", hemsidaUrl: "https://www.bodaborg.se/oxelosund", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/07/image-10.avif", orderRank: "0" },
    { namn: "Sörmlands Museum", kategori: "kultur", beskrivning: "Museet visar flera utställningar året om och anordnar olika aktiviteter.\n\nSörmlands museum ligger i Nyköpings västra hamn, mitt emot Nyköpingshus. I museet finns en restaurang med lunchservering och fika. Till en del evenemang/aktiviteter behöver biljett bokas.", hemsidaUrl: "https://sormlandsmuseum.se", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/07/image-13.avif", orderRank: "1" },
  ];
  for (const f of data) {
    const { imgUrl, ...rest } = f;
    const bild = await uploadImage(imgUrl, `besokare-${f.namn.toLowerCase().replace(/\s+/g, "-")}.avif`);
    await client.create({ _type: "forBesokare", ...rest, ...(bild ? { bild } : {}) });
    console.log(`✓ För besökare: ${f.namn}`);
  }
}

// ─── RESULTAT ────────────────────────────────────────────────────────────────
async function seedResultat() {
  await deleteAll("resultat");
  const data = [
    { ar: "2025", orderRank: "0", klasser: [{ _key: "fra", namn: "Flickor Röd A", url: "https://stats.innebandy.se/sasong/43/turnering/1329/fas/spelprogram" }, { _key: "frbc", namn: "Flickor Röd B/C", url: "https://stats.innebandy.se/sasong/43/turnering/1330/fas/spelprogram" }, { _key: "prb", namn: "Pojkar Röd B", url: "https://stats.innebandy.se/sasong/43/turnering/1212/fas/spelprogram" }, { _key: "prc", namn: "Pojkar Röd C", url: "https://stats.innebandy.se/sasong/43/turnering/1213/fas/spelprogram" }, { _key: "prd", namn: "Pojkar Röd D", url: "https://stats.innebandy.se/sasong/43/turnering/7550/fas/spelprogram" }] },
    { ar: "2024", orderRank: "1", klasser: [{ _key: "fr", namn: "Flickor Röd", url: "https://stats.innebandy.se/sasong/42/turnering/7551/fas/spelprogram" }, { _key: "pra", namn: "Pojkar Röd A", url: "https://stats.innebandy.se/sasong/42/turnering/1328/fas/spelprogram" }, { _key: "prb", namn: "Pojkar Röd B", url: "https://stats.innebandy.se/sasong/42/turnering/1212/fas/spelprogram" }, { _key: "prc", namn: "Pojkar Röd C", url: "https://stats.innebandy.se/sasong/42/turnering/1213/fas/spelprogram" }, { _key: "prd", namn: "Pojkar Röd D", url: "https://stats.innebandy.se/sasong/42/turnering/7550/fas/spelprogram" }] },
    { ar: "2023", orderRank: "2", klasser: [{ _key: "fra", namn: "Flickor Röd A", url: "https://stats.innebandy.se/sasong/41/turnering/1329/fas/spelprogram" }, { _key: "pra", namn: "Pojkar Röd A", url: "https://stats.innebandy.se/sasong/41/turnering/1328/fas/spelprogram" }, { _key: "prb", namn: "Pojkar Röd B", url: "https://stats.innebandy.se/sasong/41/turnering/1212/fas/spelprogram" }, { _key: "prc", namn: "Pojkar Röd C", url: "https://stats.innebandy.se/sasong/41/turnering/1213/fas/spelprogram" }] },
  ];
  for (const r of data) {
    await client.create({ _type: "resultat", ...r });
    console.log(`✓ Resultat: ${r.ar}`);
  }
}

// ─── NYHETER ─────────────────────────────────────────────────────────────────
async function seedNyheter() {
  await deleteAll("nyhet");
  const data = [
    { slug: "sirius-dominerade-i-pojkar-rod-d", titel: "Sirius dominerade i Pojkar Röd D", datum: "2025-09-15", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/09/PRD_Sirius.jpg", kort: "IK Sirius deltog med två lag i Onyxcupen Röd D och i båda grupperna blev det full poäng för båda lagen i gruppspelet. I finalen ställdes de båda två Siriuslag mot varandra.", full: "IK Sirius deltog med två lag i Onyxcupen Röd D och i båda grupperna blev det full poäng för båda lagen i gruppspelet. I finalen ställdes de båda två Siriuslag mot varandra. Där drog Sirius Svart längsta trået och vann med 4-2." },
    { slug: "nykvarn-vann-pojkar-rod-c", titel: "Nykvarn vann Pojkar Röd C", datum: "2025-09-15", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/09/PRC_Nykvarn.jpg", kort: "Ännu ett mycket jämnt slutspel utspelades sig i Pojkar Röd C.", full: "Ännu ett mycket jämnt slutspel utspelades sig i Pojkar Röd C." },
    { slug: "alvsjo-vann-aven-filckor-rod-b", titel: "Älvsjö vann även Flickor Röd B", datum: "2025-09-15", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/09/FRB_Alvsjo.jpg", kort: "Även i Onyxcupen Flickor Röd B så var det ett mycket jämnt och spännande slutspel. Finalen slutade 1-1 och efter en mållös förlängning blev det Älvsjö som var starkast i straffläggningen.", full: "Även i Onyxcupen Flickor Röd B så var det ett mycket jämnt och spännande slutspel. Finalen slutade 1-1 och efter en mållös förlängning blev det Älvsjö som var starkast i straffläggningen." },
    { slug: "alvsjo-vann-flickor-rod-a", titel: "Älvsjö vann Flickor Röd A", datum: "2025-09-15", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/09/FRA_Alvsjo.jpg", kort: "Det var ett mycket jämnt slutspel i Flickor Röd A, där Hovslätt vann mot Telge med 1-0 i sin semifinal och Älvsjö slog ut Onyx efter förlängning. I finalen var Älvsjö starkast och vann över Hovslätt med 1-0.", full: "Det var ett mycket jämnt slutspel i Flickor Röd A, där Hovslätt vann mot Telge med 1-0 i sin semifinal och Älvsjö slog ut Onyx efter förlängning. I finalen var Älvsjö starkast och vann över Hovslätt med 1-0." },
    { slug: "segrare-i-onyxcupen-pojkar-rod-b-2025", titel: "Onyx segrare i Onyxcupen Pojkar Röd B", datum: "2025-09-15", imgUrl: "https://onyxcupen.se/wp-content/uploads/2025/09/PRB_Onyx_P11.jpg", kort: "I finalen möttes Onyx P11 och Onyx P10. Det var en mycket jämn och spännande match som länge var mållös innan en målexplosion i slutet av slutperioden.", full: "I finalen möttes Onyx P11 och Onyx P10. Det var en mycket jämn och spännande match som länge var mållös innan en målexplosion i slutet av slutperioden. Efter en mållös förlängning visades sig P11-laget vara bättre på straffar." },
    { slug: "andrat-spelschema", titel: "Ändrat spelschema", datum: "2025-09-09", imgUrl: "https://onyxcupen.se/wp-content/uploads/2024/10/Frame-1272638760.png", kort: "Tyvärr har vi drabbats av sena avhopp i Onyxcupen, vilket gör att vi lägger ned Pojkar Röd A-klassen och erbjuder två lag att istället deltaga i Pojkar Röd B-klassen.", full: "Tyvärr har vi drabbats av sena avhopp i Onyxcupen, vilket gör att vi lägger ned Pojkar Röd A-klassen och erbjuder två lag att istället deltaga i Pojkar Röd B-klassen. De flesta lag har inga förändringar, men vissa lag har fått någon mindre ändring." },
    { slug: "valkomna-till-onyxcupen-2025", titel: "Välkomna till Onyxcupen 2025!", datum: "2025-09-08", imgUrl: "https://onyxcupen.se/wp-content/uploads/2024/10/Frame-1272638760.png", kort: "Det är med stor glädje vi hälsar er alla varmt välkomna till Onyxcupen Röd 2025. Vi ser fram emot några härliga innebandydagar i Nyköping.", full: "Det är med stor glädje vi hälsar er alla varmt välkomna till Onyxcupen Röd 2025. Vi ser fram emot några härliga innebandydagar i Nyköping." },
    { slug: "spelschema-kommer", titel: "Spelschema kommer", datum: "2025-09-02", imgUrl: "https://onyxcupen.se/wp-content/uploads/2024/10/Frame-1272638760.png", kort: "Ni är många som undrar över spelschemat. Det är ännu inte klart då vi fortfarande jobbar på att få med fler lag i Flickor Röd B och C.", full: "Ni är många som undrar över spelschemat. Det är ännu inte klart då vi fortfarande jobbar på att få med fler lag i Flickor Röd B och C. Självklart måste spelschemat vara klart en vecka innan cupen drar igång, så vi siktar på att ha det klart senast fredag." },
    { slug: "boenden-pa-hart-underlag-fullbokat", titel: "Boenden på hårt underlag fullbokat!", datum: "2025-08-25", imgUrl: "https://onyxcupen.se/wp-content/uploads/2024/10/Frame-1272638760.png", kort: "Våra boendepaket, ingående i deltagarpaket 1, är nu fullbokade.", full: "Våra boendepaket, ingående i deltagarpaket 1, är nu fullbokade." },
  ];

  for (const n of data) {
    const nyhetsbild = await uploadImage(n.imgUrl, `nyhet-${n.slug}.jpg`);
    await client.create({
      _type: "nyhet",
      titel: n.titel,
      slug: { _type: "slug", current: n.slug },
      publishedAt: new Date(n.datum).toISOString(),
      ...(nyhetsbild ? { nyhetsbild } : {}),
      kortBeskrivning: n.kort,
      helaNyhetsbeskrivningen: [
        { _type: "block", _key: "block1", style: "normal", children: [{ _type: "span", _key: "span1", text: n.full, marks: [] }], markDefs: [] },
      ],
    });
    console.log(`✓ Nyhet: ${n.titel}`);
  }
}

async function main() {
  console.log("Startar seed med bilduppladdning...\n");
  await seedKontakter();
  await seedBoenden();
  await seedForBesokare();
  await seedResultat();
  await seedNyheter();
  console.log("\n✅ Klart! Allt innehåll inklusive bilder är nu i Sanity.");
}

main().catch(console.error);
