export const siteConfig = {
  name: "Team Bergen?",
  url: "https://teambergen.no",
  description:
    "Vi er en gjeng diskgolf-entusiaster fra Bergen og omegn som vil litt mer med sporten vår.",
  ogImage: "/og-image.jpg",
};

export type ContactIcon =
  | "email"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "snapchat";

export interface ContactItem {
  icon: ContactIcon;
  label: string;
  href: string;
  external?: boolean;
}

export const contactItems: ContactItem[] = [
  {
    icon: "email",
    label: "teambergendg@gmail.com",
    href: "mailto:teambergendg@gmail.com",
    external: false,
  },
  {
    icon: "instagram",
    label: "@teambergendg",
    href: "https://www.instagram.com/teambergendg/",
    external: true,
  },
  {
    icon: "youtube",
    label: "Team Bergen DG",
    href: "https://www.youtube.com/@teambergendg",
    external: true,
  },
  {
    icon: "tiktok",
    label: "@teambergendg",
    href: "https://www.tiktok.com/@teambergendg",
    external: true,
  },
  {
    icon: "snapchat",
    label: "teambergen",
    href: "https://www.snapchat.com/add/teambergen",
    external: true,
  },
];

export const socialLinks = {
  instagram: "https://www.instagram.com/teambergendg/",
  youtube: "https://www.youtube.com/@teambergendg",
  tiktok: "https://www.tiktok.com/@teambergendg",
  snapchat: "https://www.snapchat.com/add/teambergen",
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: "Team Bergen?",
  alternateName: "Team Bergen",
  description:
    "Diskgolfteam fra Bergen og Vestlandet. Vi er en gjeng diskgolf-entusiaster som vil litt mer med sporten vår.",
  url: "https://teambergen.no",
  logo: "https://teambergen.no/favicon.svg",
  image: "https://teambergen.no/og-image.jpg",
  sport: "Disc Golf",
  location: {
    "@type": "Place",
    name: "Bergen",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bergen",
      addressRegion: "Vestland",
      addressCountry: "NO",
    },
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 60.39,
      longitude: 5.32,
    },
    geoRadius: "100000",
  },
  sameAs: [
    "https://www.instagram.com/teambergendg/",
    "https://www.youtube.com/@teambergendg",
    "https://www.tiktok.com/@teambergendg",
    "https://www.snapchat.com/add/teambergen",
  ],
  member: [
    {
      "@type": "Person",
      name: "Morten Dahlberg",
      jobTitle: "Teamleder og arrangør",
    },
    { "@type": "Person", name: "Olav Breistein", jobTitle: "Spiller" },
    { "@type": "Person", name: "Michael White", jobTitle: "Spiller" },
    { "@type": "Person", name: "Erlend Johnsen", jobTitle: "Spiller" },
  ],
};
