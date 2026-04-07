import type { Metadata } from "next";
import { contactItems } from "@/data/site";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { ContactCard } from "@/components/contact-card";
import { SponsorLogos } from "@/components/sponsor-logos";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Kontakt Team Bergen? – Sponsormuligheter innen diskgolf",
  description:
    "Kontakt Team Bergen? for samarbeid eller sponsing. Vi søker partnere som vil støtte diskgolf i Bergen og på Vestlandet. Se hva du får igjen som sponsor.",
};

const needsItems = [
  {
    title: "Delta på større turneringer",
    description: "Støtte til opphold, reise og påmeldingsavgift",
  },
  {
    title: "Arrangere konkurranser",
    description:
      "Gi Vestlandet et bredt utvalg av turneringer og øke lokal deltakelse",
  },
  {
    title: "Utvikle sporten",
    description: "Trening, utstyr og rekruttering av nye spillere",
  },
];

const getsItems = [
  {
    title: "Synlighet",
    description: "Logo på klær, sosiale medier og ved arrangementer",
  },
  {
    title: "Lokalt engasjement",
    description: "Støtt en voksende sport med et engasjert miljø",
  },
  {
    title: "Nettverksbygging",
    description: "Bli kjent med aktive folk i diskgolfmiljøet",
  },
  {
    title: "Positiv assosiasjon",
    description: "Knytt merkevaren din til idrett, helse og fellesskap",
  },
];

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        title="Kontakt oss"
        lead="Vil du vite mer om teamet, samarbeide med oss, eller bare slå av en prat om diskgolf? Ta kontakt!"
      />

      <Section>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Vi vil gjerne høre fra deg
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Enten du er nysgjerrig på teamet, vil samarbeide, eller bare slå
              av en prat om diskgolf - her finner du oss.
            </p>
          </div>
          <div className="w-full lg:w-auto lg:min-w-80">
            <ContactCard title="Finn oss her" items={contactItems} />
          </div>
        </div>
      </Section>

      <Section id="sponsor" variant="muted">
        <h2 className="text-3xl font-bold tracking-tight mb-3">Bli sponsor</h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          Vi søker samarbeidspartnere som vil være med på å løfte diskgolf på
          Vestlandet. Diskgolf vokser raskt - bli med på reisen!
        </p>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <h3 className="text-xl font-bold mb-4">Dette trenger vi</h3>
              <ul className="space-y-4">
                {needsItems.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="w-2 h-2 mt-2 bg-primary shrink-0" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-xl font-bold mb-4">Dette får du</h3>
              <ul className="space-y-4">
                {getsItems.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="w-2 h-2 mt-2 bg-accent shrink-0" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <p className="mb-4 text-lg font-medium">Interessert i å høre mer?</p>
          <Button render={<a href="mailto:teambergendg@gmail.com" />}>
            Ta kontakt om sponsing
          </Button>
        </div>
      </Section>

      <SponsorLogos />
    </>
  );
}
