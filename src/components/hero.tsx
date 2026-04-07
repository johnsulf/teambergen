import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

export function Hero() {
  return (
    <section className="bg-secondary text-secondary-foreground border-b-2 border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <div className="flex-1">
            <p className="text-sm font-medium text-secondary-foreground/50 uppercase tracking-wider mb-3">
              Diskgolfteam fra Bergen
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
              Team Bergen
              <span className="text-primary">?</span>
            </h1>

            <p className="text-lg text-secondary-foreground/70 max-w-lg mt-6 leading-relaxed">
              Vi er en gjeng entusiaster som vil litt mer med sporten vår - både
              på og utenfor banen.
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

          <div
            className="shrink-0 w-48 h-48 md:w-64 md:h-64 border-2 border-border bg-primary p-6 shadow-md hidden md:flex items-center justify-center"
            aria-hidden="true"
          >
            <Image src={logo} alt="" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
