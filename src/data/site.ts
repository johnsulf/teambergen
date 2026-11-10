export const siteConfig = {
  name: "Team Bergen?",
  url: "https://teambergen.no",
  email: "teambergendg@gmail.com",
  description:
    "Fem diskgolfere fra Bergen. Vi spiller turneringer, trener sammen og vil ha flere med ut på banene.",
  ogImage: "/og-image.jpg",
};

export const podcast = {
  name: "Team Bergen? Podcast",
  spotifyShowId: "1B3UjZ9W9QT6WpAO8WMlut",
  spotifyUrl: "https://open.spotify.com/show/1B3UjZ9W9QT6WpAO8WMlut",
  discordUrl: "https://discord.gg/jaTEbUNuJe",
  /** Plattformer uten url vises som «Kommer snart». */
  platforms: [
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/1B3UjZ9W9QT6WpAO8WMlut",
    },
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/no/podcast/team-bergen-podcast/id6829929178",
    },
  ] as { name: string; url?: string }[],
};

export type ContactIcon =
  | "email"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "snapchat"
  | "spotify"
  | "discord";

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
  {
    icon: "spotify",
    label: "Team Bergen? Podcast",
    href: "https://open.spotify.com/show/1B3UjZ9W9QT6WpAO8WMlut",
    external: true,
  },
  {
    icon: "discord",
    label: "Discord-serveren",
    href: "https://discord.gg/jaTEbUNuJe",
    external: true,
  },
];

export const socialLinks = {
  instagram: "https://www.instagram.com/teambergendg/",
  youtube: "https://www.youtube.com/@teambergendg",
  tiktok: "https://www.tiktok.com/@teambergendg",
  snapchat: "https://www.snapchat.com/add/teambergen",
  spotify: "https://open.spotify.com/show/1B3UjZ9W9QT6WpAO8WMlut",
  discord: "https://discord.gg/jaTEbUNuJe",
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: "Team Bergen?",
  alternateName: "Team Bergen",
  description:
    "Diskgolfteam fra Bergen. Vi spiller turneringer, trener sammen og vil ha flere med ut på banene.",
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
    "https://open.spotify.com/show/1B3UjZ9W9QT6WpAO8WMlut",
    "https://podcasts.apple.com/no/podcast/team-bergen-podcast/id6829929178",
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
