import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-secondary text-secondary-foreground border-b-2 border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <div className="flex-1">
            <p className="text-sm font-medium text-secondary-foreground/50 uppercase tracking-wider mb-3">
              Diskgolfteam fra Bergen
            </p>
            <h1 className="text-5xl md:text-7xl tracking-wider leading-none font-brand">
              TEAM
              <span className="text-primary"> BERGEN?</span>
            </h1>

            <p className="text-lg text-secondary-foreground/70 max-w-lg mt-6 leading-relaxed">
              Vi er en gjeng som vil litt mer med sporten vår - både på og
              utenfor banen.
            </p>

            <div className="flex gap-3 flex-wrap mt-8">
              <Button render={<Link href="/team" />}>Møt teamet</Button>
              <Button
                variant="outline"
                render={<Link href="/kontakt#sponsor" />}
              >
                Bli sponsor
              </Button>
            </div>
          </div>

          <figure className="shrink-0 w-full lg:w-96 border-2 border-border shadow-md overflow-hidden">
            <Image
              src="/images/mini2.webp"
              alt="Team Bergen? på diskgolfbanen"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              priority
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
