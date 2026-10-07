import Markdown, { type Components } from "react-markdown";

type MarkdownContentProps = { children: string };

// Tailwind preflight resets every default style of the elements rendered from markdown
const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold lg:text-[40px] lg:leading-[46px]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-6 text-2xl font-bold lg:text-[28px]">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="mt-4 text-xl font-bold">{children}</h3>,
  ul: ({ children }) => (
    <ul className="list-disc space-y-3 pl-6">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-3 pl-6">{children}</ol>
  ),
  // Link kept as written: /fr/contact/ for a page, /a-propos/doc.pdf for a file of public/
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-semibold underline underline-offset-4 transition-colors hover:text-brand-accent"
    >
      {children}
    </a>
  ),
};

export const MarkdownContent = ({ children }: MarkdownContentProps) => (
  <div className="mx-auto flex max-w-page flex-col gap-6 px-4 pb-20 text-brand lg:px-[114px]">
    <Markdown components={components}>{children}</Markdown>
  </div>
);
