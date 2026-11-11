import { ScoreCard, type ScoreCardItem } from "@/components/score-card";
import { EditableText } from "@/components/cms/editable-text";

const defaults = [
  {
    title: "Turneringer",
    description:
      "Vi spiller flest turneringer her på Vestlandet, men reiser også en del rundt i landet.",
  },
  {
    title: "Trening",
    description:
      "Vi trener sammen når vi får det til, og sier fra til hverandre når kastene ikke sitter.",
  },
  {
    title: "Bergen",
    description:
      "Det blir stadig flere som spiller diskgolf i Bergen. Vi vil gjerne ha med enda flere.",
  },
];

export function ValueProps() {
  const items: ScoreCardItem[] = defaults.map((item, i) => ({
    title: (
      <EditableText
        id={`home.why.${i + 1}.title`}
        label={`Hvorfor Team Bergen?: hull ${i + 1}, tittel`}
        fallback={item.title}
        as="h3"
        className="text-xl font-bold tracking-tight mb-2"
      />
    ),
    description: (
      <EditableText
        id={`home.why.${i + 1}.text`}
        label={`Hvorfor Team Bergen?: hull ${i + 1}, tekst`}
        fallback={item.description}
        className="text-muted-foreground leading-relaxed"
      />
    ),
  }));

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <EditableText
          id="home.why.title"
          label="Hvorfor Team Bergen?: overskrift"
          fallback="Hvorfor Team Bergen?"
          as="h2"
          className="text-3xl font-bold tracking-tight mb-3"
        />
        <EditableText
          id="home.why.intro"
          label="Hvorfor Team Bergen?: ingress"
          fallback="Det startet med vanlige runder på lokale baner, og etter hvert ble det et lag. Spørsmålstegnet har vi lånt fra Bergen?-skiltet på Flesland. Lurer du på noe, er det bare å spørre."
          className="text-muted-foreground max-w-xl mb-12"
        />

        <ScoreCard items={items} />
      </div>
    </section>
  );
}
