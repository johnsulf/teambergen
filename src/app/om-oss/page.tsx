import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ScoreCard, type ScoreCardItem } from "@/components/score-card";

export const metadata: Metadata = {
  title: "Om Team Bergen? – Diskgolf i Bergen og på Vestlandet",
  description:
    "Team Bergen? er fem diskgolfere fra Bergen. Les om hvordan laget startet, hvor navnet kommer fra og hva vi vil få til.",
};

const values: ScoreCardItem[] = [
  {
    title: "Alle nivåer",
    description:
      "Du trenger ikke være god for å spille med oss. Samtidig skal de som vil satse, få gjøre det.",
  },
  {
    title: "Flere spillere",
    description:
      "Vi vil at flere på Vestlandet skal prøve diskgolf, og hjelper gjerne til der vi kan.",
  },
  {
    title: "Bli bedre",
    description:
      "Vi vil bli bedre, hver for oss og som lag. Derfor trener vi sammen og spiller så mange turneringer vi rekker.",
  },
];

export default function OmOssPage() {
  return (
    <>
      <PageHeader
        title="Om oss"
        lead="Fem diskgolfere fra Bergen. Vi spiller turneringer, trener sammen og vil ha flere med ut på banene."
      />

      <Section>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Slik startet det
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Team Bergen? begynte med at noen av oss spilte runder sammen på
                banene rundt Bergen. Etter hvert ble det flere runder, så
                turneringer, og til slutt et lag.
              </p>
              <p>
                Navnet har vi lånt fra <em>Bergen?</em>-skiltet på Flesland,
                som de fleste har sett når de har landet i byen.
              </p>
              <p>
                I dag trener vi sammen, spiller turneringer på Vestlandet og
                ellers i landet, og prøver å få flere med på diskgolf i Bergen.
              </p>
            </div>
          </div>
          <figure className="shrink-0 w-full lg:w-2/5 border-2 border-border shadow-sm overflow-hidden">
            <Image
              src="/images/mini.webp"
              alt="Team Bergen? i aksjon på diskgolfbanen"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </figure>
        </div>
      </Section>

      <Section variant="muted">
        <h2 className="text-3xl font-bold tracking-tight mb-10">
          Det vi vil
        </h2>

        <ScoreCard items={values} />
      </Section>

      <Section variant="secondary">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Veien videre
            </h2>
            <p className="text-secondary-foreground/70 text-lg leading-relaxed">
              Vi vil gjerne spille flere turneringer og få på plass flere
              sponsorer. Har du lyst til å støtte oss, eller bare bli kjent med
              oss, ta kontakt.
            </p>
          </div>
          <div className="shrink-0 flex gap-3 items-start">
            <Button render={<Link href="/team" />}>Møt teamet</Button>
            <Button variant="outline" render={<Link href="/kontakt#sponsor" />}>
              Bli sponsor
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
