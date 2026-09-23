"use client";

import { useSyncExternalStore } from "react";

type Section = { id: string; label: string };

type SectionNavProps = { sections: Section[] };

const linkClassName =
  "font-semibold text-[17px] text-brand transition-colors hover:text-brand/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-current:text-brand-accent aria-current:hover:text-brand-accent/70";

const subscribeToScroll = (onScroll: () => void) => {
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
};

// The active section is the one showing right below the sticky header.
const getActiveSectionId = (sections: Section[]) => {
  const headerBottom =
    document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
  return sections.find(({ id }) => {
    const rect = document.getElementById(id)?.getBoundingClientRect();
    return (
      rect !== undefined &&
      rect.top <= headerBottom &&
      headerBottom < rect.bottom
    );
  })?.id;
};

export const SectionNav = ({ sections }: SectionNavProps) => {
  const activeSectionId = useSyncExternalStore(
    subscribeToScroll,
    () => getActiveSectionId(sections),
    // The page loads at its top, on the first section.
    () => sections[0].id,
  );

  return (
    <nav
      aria-label="Sections de la page"
      className="mx-auto flex max-w-page gap-6 px-4 py-6 lg:px-[114px]"
    >
      {/* Plain anchors: unlike `<Link>`, they scroll again when the URL already has this hash. */}
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={id === activeSectionId}
          className={linkClassName}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};
