import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';

export const metadata: Metadata = {
  title: 'Om Team Bergen? – Diskgolf i Bergen og på Vestlandet',
  description:
    'Team Bergen? er et inkluderende diskgolfteam fra Bergen. Vi jobber for å utvikle diskgolf på Vestlandet og skape et sterkt fellesskap for spillere på alle nivåer.',
};

export default function OmOssPage() {
  return (
    <>
      <PageHeader
        title="Om oss"
        lead="Vi er en gjeng diskgolf-entusiaster fra Bergen som vil litt mer med sporten vår."
      />

      {/* Story section */}
      <Section variant="default">
        <div className="max-w-5xl flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 bg-team-navy text-white rounded-full text-sm font-medium mb-6">
              Historien vår
            </span>
            <h2 className="mb-6">Fra uformelle runder til seriøs satsing</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Team Bergen? startet med noe så enkelt som en felles kjærlighet
                for diskgolf og miljøet i Bergen. Det som begynte som uformelle
                runder på lokale baner, utviklet seg raskt til noe større - et
                lag bygget på samhold og konkurranseinstinkt.
              </p>
              <p>
                Spørsmålstegnet i navnet er ikke tilfeldig. Det er inspirert av
                det velkjente <em>Bergen?</em>-skiltet på Flesland - et uttrykk
                mange kjenner igjen, og som gir navnet en tydelig forankring i
                byen vi representerer. For oss handler Team Bergen? om
                utvikling, samhold og ambisjonen om å bli bedre sammen.
              </p>
              <p>
                I dag satser vi målrettet. Vi trener sammen, konkurrerer
                regionalt og nasjonalt, og jobber aktivt for å styrke
                diskgolfmiljøet på Vestlandet. Vi representerer Bergen med
                stolthet - både i måten vi spiller på og i fellesskapet vi
                bygger.
              </p>
            </div>
          </div>
          {/* Visual element */}
          <div
            className="shrink-0 w-64 h-64 lg:w-80 lg:h-80 relative hidden lg:block"
            aria-hidden="true"
          >
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-team-gold/20 to-team-navy/20 rotate-6" />
            <div className="absolute inset-4 rounded-xl bg-team-navy/10 backdrop-blur-sm -rotate-3 flex items-center justify-center">
              <span className="text-8xl select-none">🥏</span>
            </div>
            <div className="absolute -bottom-4 -left-4 px-5 py-2 rounded-full bg-team-gold text-[#261900] font-semibold text-sm shadow-lg">
              Siden 2024
            </div>
          </div>
        </div>
      </Section>

      {/* Values section */}
      <Section variant="alt">
        <div className="max-w-5xl mb-14">
          <h2>Hva vi står for</h2>
          <p className="lead max-w-xl mt-4">
            Team Bergen? handler om mer enn å kaste disker. Vi bygger
            fellesskap, utvikler spillere og setter Vestlandet på
            diskgolfkartet.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-14 max-w-5xl">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-team-gold/10 flex items-center justify-center mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-team-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg mb-2 tracking-tight">Inkluderende miljø</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Vi vil skape et stort og inkluderende miljø der alle er velkomne –
              uansett nivå. Samtidig gir vi mulighet for de som vil satse og
              utvikle seg videre.
            </p>
          </div>
          <div>
            <div className="w-14 h-14 rounded-2xl bg-team-gold/10 flex items-center justify-center mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-team-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-lg mb-2 tracking-tight">
              Vekst på Vestlandet
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Vi vil gjøre diskgolf så stort som mulig på Vestlandet. Vi jobber
              for å spre kjennskap til sporten og bygge et sterkt fellesskap i
              regionen.
            </p>
          </div>
          <div>
            <div className="w-14 h-14 rounded-2xl bg-team-gold/10 flex items-center justify-center mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-team-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg mb-2 tracking-tight">Seriøs satsing</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Vi trener målrettet og konkurrerer på regionalt og nasjonalt nivå.
              Målet er å bli bedre - både individuelt og som lag.
            </p>
          </div>
        </div>
      </Section>

      {/* Vision section */}
      <Section variant="primary">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
          <div className="flex-1">
            <h2 className="!text-white mb-6">Veien videre</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Vi drømmer om å bygge det sterkeste diskgolfteamet på Vestlandet.
              Med flere turneringer, bedre trening og et voksende nettverk av
              sponsorer, jobber vi mot å sette Bergen på det nasjonale
              diskgolfkartet.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-4 items-start">
            <Link
              href="/team"
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Møt teamet
            </Link>
            <Link
              href="/kontakt#sponsor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white/80 hover:text-team-gold font-medium transition-colors group"
            >
              Bli sponsor
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
