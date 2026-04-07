import dgputtLogo from '@/assets/sponsors/dgputt.png';
import exactLogo from '@/assets/sponsors/exact.png';
import mgmLogo from '@/assets/sponsors/mgm.png';
import type { StaticImageData } from 'next/image';

export interface Sponsor {
  name: string;
  logo: StaticImageData;
  url: string;
}

export const sponsors: Sponsor[] = [
  {
    name: 'DGPUTT',
    logo: dgputtLogo,
    url: 'https://dgputt.app/',
  },
  {
    name: 'Exact',
    logo: exactLogo,
    url: 'https://teamexact.com/nb/',
  },
  {
    name: 'MGM',
    logo: mgmLogo,
    url: 'https://mgmflisogmur.no/',
  },
];
