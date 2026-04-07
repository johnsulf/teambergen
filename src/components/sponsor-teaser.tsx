import Link from 'next/link';

const benefits = [
  {
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    text: 'Synlighet på drakter, bag og sosiale medier',
  },
  {
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    text: 'Støtt lokal idrett og voksende miljø',
  },
  {
    icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
    text: 'Nå en engasjert målgruppe',
  },
  {
    icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11',
    text: 'Fleksible sponsoravtaler',
  },
];

export function SponsorTeaser() {
  return (
    <section className="section-padding hero-gradient bg-noise text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-team-gold/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Content */}
          <div className="flex-1 text-left">
            <h2 className="!text-white mb-4">Bli sponsor</h2>
            <p className="text-white/75 text-lg mb-8 leading-relaxed">
              Diskgolf vokser raskt i Norge, og Team Bergen? er en synlig og
              aktiv del av miljøet på Vestlandet. Støtt lokal idrett og få
              eksponering mot en engasjert målgruppe.
            </p>

            <ul className="space-y-3 mb-10">
              {benefits.map((benefit) => (
                <li key={benefit.text} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-team-gold/20 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-team-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={benefit.icon}
                      />
                    </svg>
                  </span>
                  <span className="text-white/85">{benefit.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/kontakt#sponsor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-team-gold text-[#261900] font-medium btn-accent"
            >
              Ta kontakt
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Visual element */}
          <div
            className="shrink-0 w-64 h-64 lg:w-80 lg:h-80 relative"
            aria-hidden="true"
          >
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-secondary/20 to-team-gold/20 rotate-3" />
            <div className="absolute inset-4 rounded-xl bg-white/10 backdrop-blur-sm -rotate-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 lg:h-32 lg:w-32 text-team-gold"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
