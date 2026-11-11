import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader, pageHeaderLeadClass } from "@/components/page-header";
import { EditableText } from "@/components/cms/editable-text";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ScoreCard, type ScoreCardItem } from "@/components/score-card";

export const metadata: Metadata = {
  title: "Om Team Bergen? – Diskgolf i Bergen og på Vestlandet",
  description:
    "Team Bergen? er fem diskgolfere fra Bergen. Les om hvordan laget startet, hvor navnet kommer fra og hva vi vil få til.",
};

const defaultValues = [
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

const storyFallback = [
  "Team Bergen? begynte med at noen av oss spilte runder sammen på banene rundt Bergen. Etter hvert ble det flere runder, så turneringer, og til slutt et lag.",
  "Navnet har vi lånt fra *Bergen?*-skiltet på Flesland, som de fleste har sett når de har landet i byen.",
  "I dag trener vi sammen, spiller turneringer på Vestlandet og ellers i landet, og prøver å få flere med på diskgolf i Bergen.",
].join("\n\n");

export default function OmOssPage() {
  const values: ScoreCardItem[] = defaultValues.map((item, i) => ({
    title: (
      <EditableText
        id={`om-oss.values.${i + 1}.title`}
        label={`Om oss: hull ${i + 1}, tittel`}
        fallback={item.title}
        as="h3"
        className="text-xl font-bold tracking-tight mb-2"
      />
    ),
    description: (
      <EditableText
        id={`om-oss.values.${i + 1}.text`}
        label={`Om oss: hull ${i + 1}, tekst`}
        fallback={item.description}
        className="text-muted-foreground leading-relaxed"
      />
    ),
  }));

  return (
    <>
      <PageHeader
        title="Om oss"
        lead={
          <EditableText
            id="om-oss.lead"
            label="Om oss: ingress"
            fallback="Fem diskgolfere fra Bergen. Vi spiller turneringer, trener sammen og vil ha flere med ut på banene."
            className={pageHeaderLeadClass}
          />
        }
      />

      <Section>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1">
            <EditableText
              id="om-oss.story.title"
              label="Om oss: overskrift historien"
              fallback="Slik startet det"
              as="h2"
              className="text-3xl font-bold tracking-tight mb-6"
            />
            <EditableText
              id="om-oss.story.text"
              label="Om oss: historien"
              markdown
              fallback={storyFallback}
              className="text-foreground/80 leading-relaxed"
            />
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
        <EditableText
          id="om-oss.values.title"
          label="Om oss: overskrift verdier"
          fallback="Det vi vil"
          as="h2"
          className="text-3xl font-bold tracking-tight mb-10"
        />

        <ScoreCard items={values} />
      </Section>

      <Section variant="secondary">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          <div className="flex-1">
            <EditableText
              id="om-oss.next.title"
              label="Om oss: overskrift veien videre"
              fallback="Veien videre"
              as="h2"
              className="text-3xl font-bold tracking-tight mb-6"
            />
            <EditableText
              id="om-oss.next.text"
              label="Om oss: veien videre"
              fallback="Vi vil gjerne spille flere turneringer og få på plass flere sponsorer. Har du lyst til å støtte oss, eller bare bli kjent med oss, ta kontakt."
              className="text-secondary-foreground/70 text-lg leading-relaxed"
            />
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
