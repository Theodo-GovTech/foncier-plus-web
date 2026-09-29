"use client";

import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

type HomeLinkProps = { children: ReactNode; className?: string };

export const HomeLink = ({ children, className }: HomeLinkProps) => {
  return (
    <Link
      href="/"
      scroll={false}
      onNavigate={() => window.scrollTo({ top: 0 })}
      className={className}
    >
      {children}
    </Link>
  );
};
