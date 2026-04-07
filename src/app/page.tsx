import type { Metadata } from 'next';
import { Hero } from '@/components/hero';
import { ValueProps } from '@/components/value-props';
import { TeamTeaser } from '@/components/team-teaser';
import { SponsorTeaser } from '@/components/sponsor-teaser';
import { SponsorLogos } from '@/components/sponsor-logos';

export const metadata: Metadata = {
  title: 'Team Bergen? – Diskgolfteam fra Bergen og Vestlandet',
  description:
    'Team Bergen? er et diskgolfteam fra Bergen. Vi trener sammen, konkurrerer på Vestlandet og nasjonalt, og ønsker å vokse diskgolfmiljøet i regionen. Søker sponsorer!',
};

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <TeamTeaser />
      <SponsorTeaser />
      <SponsorLogos variant="alt" />
    </>
  );
}
