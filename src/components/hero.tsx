import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditableText } from "@/components/cms/editable-text";

export function Hero() {
  return (
    <section className="bg-secondary text-secondary-foreground border-b-2 border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <div className="flex-1">
            <EditableText
              id="home.hero.eyebrow"
              label="Forsiden: liten tekst over logoen"
              fallback="Diskgolfteam fra Bergen"
              className="text-sm font-medium text-secondary-foreground/50 uppercase tracking-wider mb-3"
            />
            <h1 className="text-5xl md:text-7xl tracking-wider leading-none font-brand">
              TEAM
              <span className="text-primary"> BERGEN?</span>
            </h1>

            <div className="mt-6">
              <EditableText
                id="home.hero.lead"
                label="Forsiden: ingress"
                fallback="Fem diskgolfere fra Bergen. Vi spiller turneringer, trener sammen og vil ha flere med ut på banene."
                className="text-lg text-secondary-foreground/70 max-w-lg leading-relaxed"
              />
            </div>

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
