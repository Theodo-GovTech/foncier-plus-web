"use client";

import { Link, usePathname } from "@/i18n/navigation";
import type { AriaAttributes, ReactNode } from "react";

type PageLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  "aria-current"?: AriaAttributes["aria-current"];
};

// With `trailingSlash`, the pathname of a page ends with "/"
export const isCurrentPage = (pathname: string, href: string) =>
  pathname === href || pathname === `${href}/`;

export const PageLink = ({
  href,
  children,
  className,
  "aria-current": ariaCurrent,
}: PageLinkProps) => {
  const isCurrent = isCurrentPage(usePathname(), href);

  return (
    <Link
      href={href}
      scroll={!isCurrent}
      onNavigate={() => {
        if (isCurrent) window.scrollTo({ top: 0 });
      }}
      aria-current={ariaCurrent}
      className={className}
    >
      {children}
    </Link>
  );
};
