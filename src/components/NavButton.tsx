import { Link } from "@/i18n/navigation";
import { PageLink } from "@/components/PageLink";
import type { AriaAttributes, ReactNode } from "react";

type NavButtonVariant = "solid" | "outline" | "accent";

type NavButtonSize = "sm" | "lg";

const baseClassName =
  "inline-flex items-center justify-center border px-4 text-[16px] leading-none font-bold whitespace-nowrap transition-colors";

const sizeClassName: Record<NavButtonSize, string> = {
  sm: "h-[30px]",
  lg: "h-12",
};

const variantClassName: Record<NavButtonVariant, string> = {
  solid: "border-brand bg-brand text-white hover:bg-brand-hover",
  outline: "border-brand bg-white text-brand hover:bg-brand/5",
  accent:
    "border-brand-accent bg-brand-accent text-white hover:bg-brand-accent-hover",
};

type NavButtonBaseProps = {
  variant: NavButtonVariant;
  size?: NavButtonSize;
  children: ReactNode;
  "aria-current"?: AriaAttributes["aria-current"];
};

type NavButtonProps = NavButtonBaseProps &
  ({ href: string; external?: boolean } | { href?: never; external?: never });

export const NavButton = ({
  variant,
  size = "sm",
  children,
  href,
  external,
  "aria-current": ariaCurrent,
}: NavButtonProps) => {
  const className = `${baseClassName} ${sizeClassName[size]} ${variantClassName[variant]}`;

  if (href === undefined) {
    return (
      <button type="button" aria-current={ariaCurrent} className={className}>
        {children}
      </button>
    );
  }

  // `<Link>` handles external hrefs, they need the `target`/`rel` pair
  if (external) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-current={ariaCurrent}
        className={className}
      >
        {children}
      </Link>
    );
  }

  // `<PageLink>` scrolls back to the top when the page is already displayed
  return (
    <PageLink href={href} aria-current={ariaCurrent} className={className}>
      {children}
    </PageLink>
  );
};
