import Link from "next/link";
import type { AriaAttributes, ReactNode } from "react";

type NavButtonVariant = "solid" | "outline" | "accent";

// `border` sets the width only — each variant owns its border-color, otherwise
// two border-color utilities collide and CSS source order decides the winner.
const baseClassName =
  "inline-flex h-[30px] items-center justify-center rounded-xs border px-4 text-[15px] leading-none font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variantClassName: Record<NavButtonVariant, string> = {
  solid: "border-brand bg-brand text-white hover:bg-brand-hover",
  outline: "border-brand bg-white text-brand hover:bg-brand/5",
  accent:
    "border-brand-accent bg-brand-accent text-white hover:bg-brand-accent-hover",
};

type NavButtonBaseProps = {
  variant: NavButtonVariant;
  children: ReactNode;
  "aria-current"?: AriaAttributes["aria-current"];
};

type NavButtonProps = NavButtonBaseProps &
  (
    | { href: string; external?: false }
    | { href: string; external: true }
    | { href?: never; external?: never }
  );

export function NavButton({
  variant,
  children,
  "aria-current": ariaCurrent,
  ...props
}: NavButtonProps) {
  const className = `${baseClassName} ${variantClassName[variant]}`;

  if (props.href === undefined) {
    return (
      <button type="button" aria-current={ariaCurrent} className={className}>
        {children}
      </button>
    );
  }

  if (props.external) {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-current={ariaCurrent}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={props.href} aria-current={ariaCurrent} className={className}>
      {children}
    </Link>
  );
}
