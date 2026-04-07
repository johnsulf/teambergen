import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.svg';

export function Hero() {
  return (
    <section className="hero-gradient bg-noise min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Decorative blurred orbs */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 -right-32 w-[31rem] h-[31rem] rounded-full bg-team-gold/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="animate-fade-up stagger-1 text-white">
              Team Bergen?
            </h1>
            <p className="text-sm text-white/50 mt-2 animate-fade-up stagger-1 font-medium tracking-wide uppercase">
              Ja, med spørsmålstegn!
            </p>

            <p className="text-lg md:text-xl text-white/80 max-w-xl mt-6 leading-relaxed animate-fade-up stagger-2 lg:mr-auto">
              Diskgolfteam fra Bergen og Vestlandet. Vi er en gjeng entusiaster
              som vil litt mer med sporten vår – både på og utenfor banen.
            </p>

            {/* CTA buttons */}
            <div className="flex gap-4 justify-center lg:justify-start flex-wrap mt-10 animate-fade-up stagger-3">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/15 font-medium transition-all group"
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

          {/* Visual element */}
          <div
            className="shrink-0 w-72 h-72 md:w-96 md:h-96 relative animate-fade-up stagger-2 hidden md:block"
            aria-hidden="true"
          >
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-team-gold/20 to-secondary/20 rotate-6" />
            <div className="absolute inset-4 rounded-xl bg-white/25 backdrop-blur-sm -rotate-3 flex items-center justify-center p-8">
              <Image
                src={logo}
                alt=""
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/40"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
