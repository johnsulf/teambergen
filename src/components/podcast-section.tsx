import Link from "next/link";
import { podcast } from "@/data/site";
import { Button } from "@/components/ui/button";
import { SpotifyEmbed } from "@/components/spotify-embed";

export function PodcastSection() {
  return (
    <section
      id="podcast"
      className="py-16 md:py-24 bg-background scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Podcast
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              {podcast.name}
            </h2>
            <div className="space-y-4 text-muted-foreground max-w-md leading-relaxed">
              <p>
                Vi har startet en podcast der vi prater diskgolf. Nye episoder
                kommer på Spotify.
              </p>
              <p>
                Vi spiller inn på Discord, og alle kan bli med i serveren og
                høre på mens vi tar opp.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap mt-8">
              <Button
                render={
                  <a
                    href={podcast.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Hør på Spotify
              </Button>
              <Button
                variant="outline"
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
            </div>

            <Link
              href="/podcast"
              className="inline-block mt-6 text-sm font-medium underline decoration-primary decoration-2 underline-offset-4 hover:decoration-foreground transition-colors"
            >
              Mer om podcasten
            </Link>
          </div>

          <div className="w-full lg:w-[28rem] shrink-0">
            <SpotifyEmbed
              showId={podcast.spotifyShowId}
              title={`${podcast.name} på Spotify`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
