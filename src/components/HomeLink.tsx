"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type HomeLinkProps = { children: ReactNode };

export const HomeLink = ({ children }: HomeLinkProps) => {
  // `<Link>` alone keeps the scroll position when already home: scroll to the
  // top ourselves on every navigation, and keep Next.js from moving it after.
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
