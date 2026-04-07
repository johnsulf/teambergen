import type { Metadata } from 'next';
import { contactItems } from '@/data/site';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { ContactCard } from '@/components/contact-card';
import { SponsorLogos } from '@/components/sponsor-logos';

export const metadata: Metadata = {
  title: 'Kontakt Team Bergen? – Sponsormuligheter innen diskgolf',
  description:
    'Kontakt Team Bergen? for samarbeid eller sponsing. Vi søker partnere som vil støtte diskgolf i Bergen og på Vestlandet. Se hva du får igjen som sponsor.',
};

const needsItems = [
  {
    title: 'Delta på større turneringer',
    description: 'Støtte til opphold, reise og påmeldingsavgift',
  },
  {
    title: 'Arrangere konkurranser',
    description:
      'Gi Vestlandet et bredt utvalg av turneringer og øke lokal deltakelse',
  },
  {
    title: 'Utvikle sporten',
    description: 'Trening, utstyr og rekruttering av nye spillere',
  },
];

const getsItems = [
  {
    title: 'Synlighet',
    description: 'Logo på klær, sosiale medier og ved arrangementer',
  },
  {
    title: 'Lokalt engasjement',
    description: 'Støtt en voksende sport med et engasjert miljø',
  },
  {
    title: 'Nettverksbygging',
    description: 'Bli kjent med aktive folk i diskgolfmiljøet',
  },
  {
    title: 'Positiv assosiasjon',
    description: 'Knytt merkevaren din til idrett, helse og fellesskap',
  },
];

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        title="Kontakt oss"
        lead="Vil du vite mer om teamet, samarbeide med oss, eller bare slå av en prat om diskgolf? Ta kontakt!"
      />

      {/* Contact card section */}
      <Section variant="default">
        <div className="max-w-5xl flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 bg-team-navy text-white rounded-full text-sm font-medium mb-6">
              Ta kontakt
            </span>
            <h2 className="mb-4">Vi vil gjerne høre fra deg</h2>
            <p className="lead max-w-md mb-8">
              Enten du er nysgjerrig på teamet, vil samarbeide, eller bare slå
              av en prat om diskgolf – her finner du oss.
            </p>
          </div>
          <div className="w-full lg:w-auto lg:min-w-80">
            <ContactCard title="Finn oss her" items={contactItems} />
          </div>
        </div>
      </Section>

      {/* Sponsor section */}
      <Section id="sponsor" variant="alt">
        <div className="max-w-5xl mb-14">
          <span className="inline-block px-4 py-1.5 bg-team-navy text-white rounded-full text-sm font-medium mb-4">
            Sponsormuligheter
          </span>
          <h2>Bli sponsor</h2>
          <p className="lead max-w-xl mt-4">
            Vi søker samarbeidspartnere som vil være med på å løfte diskgolf på
            Vestlandet. Diskgolf vokser raskt – bli med på reisen!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
          {/* What we need */}
          <div className="rounded-xl bg-background p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl tracking-tight">Dette trenger vi</h3>
            </div>
            <ul className="space-y-4">
              {needsItems.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-team-gold shrink-0" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-foreground/65">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* What you get */}
          <div className="rounded-xl bg-background p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-team-gold/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-team-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h3 className="text-xl tracking-tight">Dette får du</h3>
            </div>
            <ul className="space-y-4">
              {getsItems.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mt-0.5 text-green-600 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-foreground/65">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14">
          <p className="mb-6 text-lg">Interessert i å høre mer?</p>
          <a
            href="mailto:teambergendg@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-team-gold text-[#261900] font-medium btn-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Ta kontakt om sponsing
          </a>
        </div>
      </Section>

      <SponsorLogos />
    </>
  );
}
