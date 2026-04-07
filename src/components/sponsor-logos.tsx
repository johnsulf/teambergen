import Image from 'next/image';
import { sponsors } from '@/data/sponsors';
import { Section } from './section';

interface SponsorLogosProps {
  title?: string;
  variant?: 'default' | 'alt';
}

export function SponsorLogos({
  title = 'Våre samarbeidspartnere',
  variant = 'default',
}: SponsorLogosProps) {
  return (
    <Section variant={variant}>
      <div className="mb-10">
        <h2>{title}</h2>
      </div>

      <div className="bg-team-navy rounded-xl p-6 flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-all duration-300 hover:scale-105"
            title={sponsor.name}
          >
            <div className="relative w-32 h-16 md:w-48 md:h-24 flex items-center justify-center">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={200}
                height={100}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
