import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SponsorTeaser() {
  return (
    <section className="py-16 md:py-24 bg-secondary text-secondary-foreground border-y-2 border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Bli sponsor
            </h2>
            <p className="text-secondary-foreground/70 text-lg mb-8 leading-relaxed max-w-lg">
              Diskgolf vokser raskt i Norge, og Team Bergen? er en synlig og
              aktiv del av miljøet på Vestlandet. Støtt lokal idrett og få
              eksponering mot en engasjert målgruppe.
            </p>

            <ul className="space-y-2 mb-8 text-sm">
              {[
                "Synlighet på drakter, bag og sosiale medier",
                "Støtt lokal idrett og voksende miljø",
                "Nå en engasjert målgruppe",
                "Fleksible sponsoravtaler",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary shrink-0" />
                  <span className="text-secondary-foreground/80">{text}</span>
                </li>
              ))}
            </ul>

            <Button render={<Link href="/kontakt#sponsor" />}>
              Ta kontakt
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
