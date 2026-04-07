import type { ReactNode } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  pdga?: number;
  order: number;
  bio: ReactNode;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'morten-dahlberg',
    name: 'Morten Dahlberg',
    role: 'Teamleder, Arrangør',
    pdga: 222425,
    order: 1,
    bio: (
      <>
        <p>
          Morten er en engasjert og jovial kar som legger ned enormt mye arbeid
          for diskgolf på Vestlandet. Han er en sentral figur i miljøet gjennom
          sin rolle som arrangør av flere store vestlandsturneringer som
          Vestkysttouren 2025, Bergen Diskgolf Marathon og stemningsfulle
          halloween-turneringer med glødende discer.
        </p>
        <p>
          Med et ønske om å løfte spillere i Bergen og omegn til norgestoppen,
          tok Morten initiativet til å opprette Team Bergen?.
        </p>
      </>
    ),
  },
  {
    id: 'olav-breistein',
    name: 'Olav Breistein',
    role: 'Spiller',
    pdga: 59468,
    order: 2,
    bio: (
      <p>
        Olav er godt kjent både lokalt og nasjonalt i diskgolfmiljøet. Han er
        engasjert i det som skjer hjemme i Bergen, og er du ute etter tips og
        triks, er Olav personen å spørre. Han er som regel å finne i toppen av
        konkurransene på Vestlandet, og klatrer ofte mot toppen nasjonalt. I
        2021 ble han tatt ut til å representere Norge i EM.
      </p>
    ),
  },
  {
    id: 'michael-white',
    name: 'Michael White',
    role: 'Spiller',
    pdga: 196859,
    order: 3,
    bio: (
      <p>
        Michael begynte med diskgolf i 2023 og har på kort tid utviklet seg til
        en sterk spiller. Med bakgrunn fra badminton på internasjonalt nivå har
        han overført mange av sine ferdigheter til diskgolf. Michael er opptatt
        av at alle skal trives med sporten på sin måte, og tar seg gjerne tid
        til en prat med alle han ser på banen. Han har begynt å hevde seg i
        toppen på Vestlandet og sikter høyt nasjonalt for kommende sesong.
      </p>
    ),
  },
  {
    id: 'erlend-johnsen',
    name: 'Erlend Johnsen',
    role: 'Spiller',
    pdga: 94422,
    order: 4,
    bio: (
      <p>
        Erlend er en trygg og imøtekommende person som er sentral i
        diskgolfmiljøet i Bergen. Alle som har spilt ukesgolf i Lynghaugparken
        vet hvem Erlend er - både fordi han er med på å arrangere, og fordi han
        som regel kjemper om seieren. Han legger ned mange timer for å forbedre
        sitt eget og andres spill, og har blant annet utviklet diskgolf-appen
        dgputt.
      </p>
    ),
  },
];
