"use client";

import { Link, usePathname } from "@/i18n/navigation";
import type { ReactNode } from "react";

type HomeLinkProps = { children: ReactNode; className?: string };

export const HomeLink = ({ children, className }: HomeLinkProps) => {
  const isHomePage = usePathname() === "/";

  return (
    <Link
      href="/"
      scroll={false}
      onNavigate={() =>
        window.scrollTo({ top: 0, behavior: isHomePage ? "auto" : "instant" })
      }
      className={className}
    >
      {children}
    </Link>
  );
};
