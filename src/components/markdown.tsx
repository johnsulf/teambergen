import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

const linkClass =
  "font-medium underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:decoration-current";

const components: Components = {
  a: ({ href = "", children, node: _node, ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={linkClass}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
};

interface MarkdownProps {
  children: string;
  /** «text» arver typografien rundt, «prose» er for lengre innlegg. */
  variant?: "text" | "prose";
  className?: string;
}

/** Trygg markdown-visning (rå HTML rendres ikke). Fungerer på server og klient. */
export function Markdown({ children, variant = "text", className }: MarkdownProps) {
  return (
    <div
      className={cn(
        variant === "prose"
          ? "prose prose-tb max-w-none"
          : "space-y-4 [&_em]:italic [&_li]:ml-5 [&_ol]:list-decimal [&_strong]:font-semibold [&_ul]:list-disc",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
