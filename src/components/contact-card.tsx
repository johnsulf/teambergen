import type { ContactItem } from "@/data/site";

interface ContactCardProps {
  title?: string;
  items: ContactItem[];
}

export function ContactCard({ title = "Kontakt", items }: ContactCardProps) {
  return (
    <div className="border-2 border-border bg-card p-6 shadow-sm">
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="flex items-center gap-3 p-3 border border-border hover:bg-muted transition-colors"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              <span className="font-medium text-sm">{item.label}</span>
              {item.external && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 ml-auto text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
