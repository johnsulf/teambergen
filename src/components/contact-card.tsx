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
  facebook: (
    <path
      fill="currentColor"
      stroke="none"
      transform="translate(2 2) scale(0.8333)"
      d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
    />
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
  spotify: (
    <path
      fill="currentColor"
      stroke="none"
      transform="translate(2 2) scale(0.8333)"
      d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
    />
  ),
  link: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
    />
  ),
  discord: (
    <path
      fill="currentColor"
      stroke="none"
      transform="translate(2 2) scale(0.8333)"
      d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
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
          <li key={item.id ?? item.href}>
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
