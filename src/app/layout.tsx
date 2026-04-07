import type { Metadata } from "next";
import { Inter, Bevan, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { structuredData } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const bevan = Bevan({
  subsets: ["latin"],
  variable: "--font-bevan",
  weight: ["400"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://teambergen.no"),
  title: {
    default: "Team Bergen? – Diskgolf fra Bergen",
    template: "%s | Team Bergen?",
  },
  description:
    "Vi er en gjeng diskgolf-entusiaster fra Bergen og omegn som vil litt mer med sporten vår.",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Team Bergen?",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Team Bergen? – Diskgolfteam fra Vestlandet",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  other: {
    "geo.region": "NO-46",
    "geo.placename": "Bergen",
    "geo.position": "60.39;5.32",
    ICBM: "60.39, 5.32",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      className={`${inter.variable} ${bevan.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
