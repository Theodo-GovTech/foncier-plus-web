"use client";

import { Link } from "@/i18n/navigation";
import type { AriaAttributes, ReactNode } from "react";

type SectionLinkProps = {
  id: string;
  children: ReactNode;
  className?: string;
  "aria-current"?: AriaAttributes["aria-current"];
};

export const SectionLink = ({
  id,
  children,
  className,
  "aria-current": ariaCurrent,
}: SectionLinkProps) => {
  // Sections live on the home page
  return (
    <Link
      href={{ pathname: "/", hash: id }}
      onNavigate={() => document.getElementById(id)?.scrollIntoView()}
      aria-current={ariaCurrent}
      className={className}
    >
      {children}
    </Link>
  );
};
