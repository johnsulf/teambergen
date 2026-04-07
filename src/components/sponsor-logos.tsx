import Image from "next/image";
import { sponsors } from "@/data/sponsors";
import { Section } from "./section";

interface SponsorLogosProps {
  title?: string;
  variant?: "default" | "muted";
}

export function SponsorLogos({
  title = "Våre samarbeidspartnere",
  variant = "default",
}: SponsorLogosProps) {
  return (
    <Section variant={variant}>
      <h2 className="text-3xl font-bold tracking-tight mb-8">{title}</h2>
      <div className="border-2 border-border bg-secondary p-6 flex flex-wrap justify-center items-center gap-8 md:gap-16 shadow-sm">
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            title={sponsor.name}
          >
            <div className="relative w-28 h-14 md:w-40 md:h-20">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                fill
                className="object-contain"
              />
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
