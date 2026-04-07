import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Siden finnes ikke",
  description:
    "Beklager, vi fant ikke siden du lette etter. Gå tilbake til forsiden for å finne det du søker.",
};

export default function NotFound() {
  return (
    <div className="grow flex items-center justify-center bg-secondary text-secondary-foreground">
      <section className="py-20 text-center">
        <div className="mx-auto px-4 max-w-2xl">
          <div className="text-9xl mb-8">🥏</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Oi, griplock!
          </h1>
          <p className="text-xl text-secondary-foreground/70 mb-10">
            Siden du lette etter er OB!
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button render={<Link href="/" />}>Til forsiden</Button>
            <Button variant="outline" render={<Link href="/team" />}>
              Møt teamet
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
