import { Card, CardContent } from "@/components/ui/card";

const valueProps = [
  {
    title: "Seriøs satsing",
    description:
      "Vi trener målrettet og konkurrerer på regionalt og nasjonalt nivå. Målet er å bli bedre — både individuelt og som lag.",
  },
  {
    title: "Sterkt fellesskap",
    description:
      "Diskgolf er en individuell sport, men sammen blir vi bedre. Vi deler tips, heier hverandre frem og har det gøy på veien.",
  },
  {
    title: "Bergensstolthet",
    description:
      "Bergen og Vestlandet har fantastiske baner og et voksende miljø. Vi vil sette regionen på diskgolfkartet.",
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
          Vi er mer enn bare et team — vi er et fellesskap av diskgolfspillere
          som vil utvikle oss og sporten i regionen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {valueProps.map((prop) => (
            <Card key={prop.title}>
              <CardContent>
                <h3 className="font-bold mb-2">{prop.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {prop.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
