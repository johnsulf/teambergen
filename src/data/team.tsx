import type { ReactNode } from "react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  pdga?: number;
  image?: string;
  order: number;
  bio: ReactNode;
}

export const teamMembers: TeamMember[] = [
  {
    id: "morten-dahlberg",
    name: "Morten Dahlberg",
    role: "Teamleder",
    pdga: 222425,
    image: "/images/morten.webp",
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
    id: "eirik-lauritsen",
    name: "Eirik Lauritsen",
    role: "Sponsor- og arrangementsansvarlig",
    pdga: 278349,
    order: 2,
    bio: (
      <p>
        Eirik har på kort tid gjort seg bemerket i diskgolfmiljøet i Bergen. Han
        er aktiv lokalt og er blant annet primus motor bak Vestkysttouren, der
        han har gjort en formidabel jobb med å stable en gammel storhet på beina
        igjen. En av hans store bidrag er arbeidet med å innhente gode sponsorer
        til deltakerne på touren.
      </p>
    ),
  },
  {
    id: "olav-breistein",
    name: "Olav Breistein",
    role: "Spiller",
    pdga: 59468,
    image: "/images/olav.webp",
    order: 3,
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
    id: "michael-white",
    name: "Michael White",
    role: "Spiller",
    pdga: 196859,
    order: 4,
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
    id: "erlend-johnsen",
    name: "Erlend Johnsen",
    role: "Spiller",
    pdga: 94422,
    image: "/images/erlend.webp",
    order: 5,
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
