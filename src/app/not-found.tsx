import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Siden finnes ikke',
  description:
    'Beklager, vi fant ikke siden du lette etter. Gå tilbake til forsiden for å finne det du søker.',
};

export default function NotFound() {
  return (
    <div className="grow flex items-center justify-center hero-gradient bg-noise">
      <section className="py-20 text-center relative z-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-9xl mb-8">🥏</div>
          <h1 className="mb-4 text-white">Oi, griplock!</h1>
          <p className="text-xl text-white/70 mb-10">
            Siden du lette etter er OB!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-team-gold text-[#261900] font-medium btn-accent"
            >
              Til forsiden
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center px-6 py-3 rounded-xl text-white/80 hover:text-team-gold font-medium transition-colors"
            >
              Møt teamet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
