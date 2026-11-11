import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { getContactLinks } from "@/lib/cms/data";
import { EditorOnly } from "@/components/cms/editor-provider";
import { EditButton } from "@/components/cms/edit-button";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { ContactCard } from "@/components/contact-card";
import { SponsorLogos } from "@/components/sponsor-logos";
import { Button } from "@/components/ui/button";
import { ScoreTable, type ScoreTableColumn } from "@/components/score-table";

export const metadata: Metadata = {
  title: "Kontakt Team Bergen? – Sponsormuligheter innen diskgolf",
  description:
    "Kontakt Team Bergen? på e-post eller sosiale medier, eller les hva det innebærer å sponse oss.",
};

const sponsorColumns: ScoreTableColumn[] = [
  {
    title: "Hva pengene går til",
    items: [
      {
        title: "Reise til turneringer",
        description: "Påmelding, reise og overnatting på de større turneringene.",
      },
      {
        title: "Egne konkurranser",
        description:
          "Vi vil arrangere flere turneringer på Vestlandet, så flere får spilt lokalt.",
      },
      {
        title: "Trening og utstyr",
        description:
          "Treningsutstyr, og det som trengs for å få med nye spillere.",
      },
    ],
  },
  {
    title: "Hva du får igjen",
    items: [
      {
        title: "Logoen din",
        description:
          "På draktene, i innleggene våre og på arrangementene vi holder.",
      },
      {
        title: "Folk i miljøet",
        description:
          "Du blir kjent med mange av dem som spiller diskgolf på Vestlandet.",
      },
      {
        title: "En avtale som passer",
        description:
          "Penger, utstyr eller noe annet. Vi finner ut av det sammen.",
      },
    ],
  },
];

export default async function KontaktPage() {
  const contactItems = await getContactLinks();
  const mailto = `mailto:${siteConfig.email}`;

  return (
    <>
      <PageHeader
        title="Kontakt oss"
        lead="Spørsmål om laget, sponsing eller noe helt annet? Send oss en melding."
      />

      <Section>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Skriv til oss
            </h2>
            <p className="text-muted-foreground max-w-md mb-6">
              E-post er det sikreste, så svarer en av oss. Du finner oss også
              på Instagram, YouTube, TikTok og Snapchat.
            </p>
            <a
              href={mailto}
              className="font-heading text-xl font-bold tracking-tight break-all underline decoration-primary decoration-4 underline-offset-6 transition-colors hover:decoration-foreground sm:text-2xl md:text-3xl"
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="relative w-full lg:w-auto lg:min-w-80">
            <EditorOnly>
              <EditButton href="/admin/kontakt" className="absolute -top-3 right-3 z-10">
                Rediger lenker
              </EditButton>
            </EditorOnly>
            <ContactCard title="Finn oss her" items={contactItems} />
          </div>
        </div>
      </Section>

      <Section id="sponsor" variant="muted">
        <h2 className="text-3xl font-bold tracking-tight mb-3">Bli sponsor</h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          Det koster penger å reise på turneringer og å arrangere egne. Med en
          sponsor kan vi gjøre mer av begge deler.
        </p>

        <ScoreTable columns={sponsorColumns} />

        <div className="mt-12">
          <p className="mb-4 text-lg font-medium">
            Send oss en e-post, så tar vi en prat om hva som kan passe.
          </p>
          <Button render={<a href={`${mailto}?subject=Sponsing`} />}>
            Send e-post
          </Button>
        </div>
      </Section>

      <SponsorLogos />
    </>
  );
}
