"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type HomeLinkProps = { children: ReactNode };

export const HomeLink = ({ children }: HomeLinkProps) => {
  return (
    <Link
      href="/"
      scroll={false}
      onNavigate={() => window.scrollTo({ top: 0 })}
    >
      {children}
    </Link>
  );
};
