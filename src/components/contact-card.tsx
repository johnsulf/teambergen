import type { ContactIcon, ContactItem } from "@/data/site";

const iconPaths: Record<ContactIcon, React.ReactNode> = {
  email: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5 12 5 12 5s-6.264 0-7.831.437a2.506 2.506 0 0 0-1.766 1.766C2 8.769 2 12 2 12s0 3.231.403 4.797a2.506 2.506 0 0 0 1.766 1.766C5.736 19 12 19 12 19s6.265 0 7.831-.437a2.506 2.506 0 0 0 1.762-1.766C22 15.231 22 12 22 12s0-3.231-.407-4.797ZM9.996 15.005V8.995L15.495 12l-5.5 3.005Z"
    />
  ),
  tiktok: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
    />
  ),
  snapchat: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2C9.243 2 7.5 4.243 7.5 7v2.5c-1 .2-2 .5-2.5 1-.4.4-.2 1 .3 1.2.8.3 1.5.8 1.7 1.3.2.5 0 1-.5 1.5-.7.7-1.5 1-2 1.2-.3.1-.5.5-.3.8.5.8 2.3 1.5 3.8 1.5h.5c.3 1 1.3 2 3.5 2s3.2-1 3.5-2h.5c1.5 0 3.3-.7 3.8-1.5.2-.3 0-.7-.3-.8-.5-.2-1.3-.5-2-1.2-.5-.5-.7-1-.5-1.5.2-.5.9-1 1.7-1.3.5-.2.7-.8.3-1.2-.5-.5-1.5-.8-2.5-1V7c0-2.757-1.757-5-4.5-5Z"
    />
  ),
};

function ContactIcon({ icon }: { icon: ContactIcon }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-5 shrink-0 text-muted-foreground"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      {iconPaths[icon]}
    </svg>
  );
}

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
          <li key={item.href}>
            <a
              href={item.href}
              className="flex items-center gap-3 p-3 border border-border hover:bg-muted transition-colors"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              <ContactIcon icon={item.icon} />
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
