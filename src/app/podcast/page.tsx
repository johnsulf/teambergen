import type { Metadata } from "next";
import { podcast } from "@/data/site";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { SpotifyEmbed } from "@/components/spotify-embed";
import { ScoreCard, type ScoreCardItem } from "@/components/score-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Team Bergen? Podcast – Diskgolfpodcast fra Bergen",
  description:
    "Team Bergen? Podcast er en diskgolfpodcast fra Bergen. Hør episodene på Spotify, eller bli med på Discord og hør på mens vi spiller inn.",
};

const joinSteps: ScoreCardItem[] = [
  {
    title: "Bli med i serveren",
    description:
      "Trykk på lenken under. Du trenger en Discord-konto, men den er gratis.",
  },
  {
    title: "Gå inn i Sending",
    description:
      "Når vi spiller inn, sitter vi i talekanalen Sending på serveren.",
  },
  {
    title: "Hør på eller prat med",
    description:
      "Du kan bare høre på, eller være med i praten mens vi tar opp.",
  },
];

export default function PodcastPage() {
  return (
    <>
      <PageHeader
        title="Podcast"
        lead="Vi prater diskgolf, og du kan høre på mens vi spiller inn."
      />

      <Section>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Hør episodene
            </h2>
            <p className="text-muted-foreground max-w-md leading-relaxed mb-8">
              Du kan høre på her, eller der du vanligvis hører på podcast.
            </p>

            <ul className="border-2 border-border bg-card shadow-md divide-y-2 divide-border">
              {podcast.platforms.map((platform) => (
                <li key={platform.name}>
                  {platform.url ? (
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-primary"
                    >
                      <span className="font-bold">{platform.name}</span>
                      <span
                        aria-hidden
                        className="font-heading text-lg leading-none transition-transform group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-4 px-5 py-4">
                      <span className="font-bold text-muted-foreground">
                        {platform.name}
                      </span>
                      <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Kommer snart
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-[28rem] shrink-0">
            <SpotifyEmbed
              showId={podcast.spotifyShowId}
              title={`${podcast.name} på Spotify`}
            />
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <h2 className="text-3xl font-bold tracking-tight mb-3">
          Vær med når vi spiller inn
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          Vi tar opp podcasten på Discord, og serveren er åpen for alle som vil
          høre på.
        </p>

        <ScoreCard items={joinSteps} />

        <div className="mt-12">
          <Button
            render={
              <a
                href={podcast.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Bli med på Discord
          </Button>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            Det er begrenset med plass. Virker ikke lenken, er serveren full
            akkurat nå. Send oss en e-post, så finner vi ut av det.
          </p>
        </div>
      </Section>
    </>
  );
}
