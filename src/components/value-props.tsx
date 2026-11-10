import { ScoreCard, type ScoreCardItem } from "@/components/score-card";

const valueProps: ScoreCardItem[] = [
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
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-3">
          Hvorfor Team Bergen?
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          Det startet med vanlige runder på lokale baner, og etter hvert ble
          det et lag. Spørsmålstegnet har vi lånt fra Bergen?-skiltet på
          Flesland. Lurer du på noe, er det bare å spørre.
        </p>

        <ScoreCard items={valueProps} />
      </div>
    </section>
  );
}
