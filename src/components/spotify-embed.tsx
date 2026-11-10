import { cn } from "@/lib/utils";

interface SpotifyEmbedProps {
  showId: string;
  title: string;
  height?: number;
  className?: string;
}

export function SpotifyEmbed({
  showId,
  title,
  height = 352,
  className,
}: SpotifyEmbedProps) {
  return (
    <iframe
      title={title}
      src={`https://open.spotify.com/embed/show/${showId}?utm_source=generator`}
      width="100%"
      height={height}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      className={cn("block w-full rounded-xl border-0", className)}
    />
  );
}
