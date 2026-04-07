import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Om Team Bergen? – Diskgolf i Bergen og på Vestlandet",
  description:
    "Team Bergen? er et inkluderende diskgolfteam fra Bergen. Vi jobber for å utvikle diskgolf på Vestlandet og skape et sterkt fellesskap for spillere på alle nivåer.",
};

const values = [
  {
    title: "Inkluderende miljø",
    description:
      "Vi vil skape et stort og inkluderende miljø der alle er velkomne – uansett nivå. Samtidig gir vi mulighet for de som vil satse og utvikle seg videre.",
  },
  {
    title: "Vekst på Vestlandet",
    description:
      "Vi vil gjøre diskgolf så stort som mulig på Vestlandet. Vi jobber for å spre kjennskap til sporten og bygge et sterkt fellesskap i regionen.",
  },
  {
    title: "Seriøs satsing",
    description:
      "Vi trener målrettet og konkurrerer på regionalt og nasjonalt nivå. Målet er å bli bedre — både individuelt og som lag.",
  },
];

export default function OmOssPage() {
  return (
    <>
      <PageHeader
        title="Om oss"
        lead="Vi er en gjeng diskgolf-entusiaster fra Bergen som vil litt mer med sporten vår."
      />

      <Section>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Fra uformelle runder til seriøs satsing
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Team Bergen? startet med noe så enkelt som en felles kjærlighet
                for diskgolf og miljøet i Bergen. Det som begynte som uformelle
                runder på lokale baner, utviklet seg raskt til noe større — et
                lag bygget på samhold og konkurranseinstinkt.
              </p>
              <p>
                Spørsmålstegnet i navnet er ikke tilfeldig. Det er inspirert av
                det velkjente <em>Bergen?</em>-skiltet på Flesland — et uttrykk
                mange kjenner igjen, og som gir navnet en tydelig forankring i
                byen vi representerer. For oss handler Team Bergen? om
                utvikling, samhold og ambisjonen om å bli bedre sammen.
              </p>
              <p>
                I dag satser vi målrettet. Vi trener sammen, konkurrerer
                regionalt og nasjonalt, og jobber aktivt for å styrke
                diskgolfmiljøet på Vestlandet. Vi representerer Bergen med
                stolthet — både i måten vi spiller på og i fellesskapet vi
                bygger.
              </p>
            </div>
          </div>
          <div
            className="shrink-0 w-48 h-48 lg:w-64 lg:h-64 border-2 border-border bg-primary flex items-center justify-center shadow-md hidden lg:flex"
            aria-hidden="true"
          >
            <span className="text-7xl lg:text-8xl">🥏</span>
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <h2 className="text-3xl font-bold tracking-tight mb-3">
          Hva vi står for
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          Team Bergen? handler om mer enn å kaste disker. Vi bygger fellesskap,
          utvikler spillere og setter Vestlandet på diskgolfkartet.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="secondary">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Veien videre
            </h2>
            <p className="text-secondary-foreground/70 text-lg leading-relaxed">
              Vi drømmer om å bygge det sterkeste diskgolfteamet på Vestlandet.
              Med flere turneringer, bedre trening og et voksende nettverk av
              sponsorer, jobber vi mot å sette Bergen på det nasjonale
              diskgolfkartet.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3 items-start">
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
