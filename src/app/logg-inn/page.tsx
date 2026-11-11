import type { Metadata } from "next";
import Link from "next/link";
import { GoogleSignInButton } from "@/components/cms/google-sign-in-button";
import { safeInternalPath } from "@/lib/cms/utils";

export const metadata: Metadata = {
  title: "Logg inn",
  robots: { index: false, follow: false },
};

const errors: Record<string, string> = {
  "ingen-tilgang":
    "Google-kontoen din har ikke tilgang til å redigere siden. Spør en av de andre i teamet om å legge deg til.",
  innlogging: "Innloggingen ble avbrutt eller feilet. Prøv igjen.",
};

export default async function LoggInnPage({
  searchParams,
}: {
  searchParams: Promise<{ feil?: string; neste?: string }>;
}) {
  const { feil, neste } = await searchParams;
  const error = feil ? (errors[feil] ?? errors.innlogging) : null;

  return (
    <div className="grow bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-10 px-4 py-20 sm:px-6 md:py-28 lg:flex-row lg:items-center lg:gap-20">
        <div className="flex-1">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-secondary-foreground/50">
            For teamet
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Logg inn</h1>
          <p className="mt-4 max-w-md text-lg text-secondary-foreground/70">
            Her logger vi i Team Bergen? inn for å skrive innlegg og oppdatere tekstene på siden.
          </p>
        </div>

        <div className="w-full max-w-sm border-2 border-border bg-background p-6 text-foreground shadow-md">
          <h2 className="font-bold">Bruk Google-kontoen din</h2>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">
            Bare adresser som er lagt inn som redaktører, får tilgang.
          </p>
          {error && (
            <p role="alert" className="mb-5 border-2 border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          <GoogleSignInButton next={safeInternalPath(neste)} />
          <Link
            href="/"
            className="mt-6 inline-block text-sm font-medium underline decoration-primary decoration-2 underline-offset-4 hover:decoration-foreground"
          >
            Tilbake til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}
