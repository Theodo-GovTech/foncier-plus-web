import type { ReactNode } from "react";

type ContactFormButtonProps = {
  children: ReactNode;
};

export const ContactFormButton = ({ children }: ContactFormButtonProps) => (
  <button
    type="submit"
    className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 border border-brand-accent bg-brand-accent px-4 text-[16px] leading-none font-bold whitespace-nowrap text-white transition-colors hover:bg-brand-accent-hover"
  >
    {children}
  </button>
);
