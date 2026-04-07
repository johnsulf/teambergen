const valueProps = [
  {
    icon: 'M5 3a2 2 0 00-2 2v2.086a2 2 0 00.586 1.414l.414.414A2 2 0 014.586 10H3a2 2 0 00-2 2v1a2 2 0 002 2h1a5.002 5.002 0 004.927 4.146c.186.046.38.07.573.079V21a1 1 0 001 1h2a1 1 0 001-1v-1.775c.193-.009.387-.033.573-.079A5.002 5.002 0 0019 15h1a2 2 0 002-2v-1a2 2 0 00-2-2h-1.586a2 2 0 00.586-1.414V6.5A2 2 0 0017.5 4.086V4a2 2 0 00-2-2H5z',
    title: 'Seriøs satsing',
    description:
      'Vi trener målrettet og konkurrerer på regionalt og nasjonalt nivå. Målet er å bli bedre – både individuelt og som lag.',
  },
  {
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    title: 'Sterkt fellesskap',
    description:
      'Diskgolf er en individuell sport, men sammen blir vi bedre. Vi deler tips, heier hverandre frem og har det gøy på veien.',
  },
  {
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    title: 'Bergensstolthet',
    description:
      'Bergen og Vestlandet har fantastiske baner og et voksende miljø. Vi vil sette regionen på diskgolfkartet.',
  },
];

export function ValueProps() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mb-16 md:mb-20">
          <h2 className="mb-4 animate-fade-up">Hvorfor Team Bergen?</h2>
          <p className="lead max-w-xl animate-fade-up stagger-1">
            Vi er mer enn bare et team – vi er et fellesskap av diskgolfspillere
            som vil utvikle oss og sporten i regionen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {valueProps.map((prop, index) => (
            <div
              key={prop.title}
              className={`animate-fade-up stagger-${index + 1}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-team-gold/10 flex items-center justify-center mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-team-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={prop.icon}
                  />
                </svg>
              </div>
              <h3 className="text-lg mb-2 tracking-tight">{prop.title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
