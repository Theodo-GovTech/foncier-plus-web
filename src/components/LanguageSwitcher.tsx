"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { CaretDownIcon } from "@/components/icons/CaretDownIcon";
import { CaretTopIcon } from "@/components/icons/CaretTopIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<(typeof routing.locales)[number], string> = {
  fr: "Français",
  en: "English",
};

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const Caret = isOpen ? CaretTopIcon : CaretDownIcon;
  const colorClassName = isOpen
    ? "text-brand-accent"
    : "text-brand hover:text-brand-accent";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className={`flex items-center gap-1.5 text-[15px] font-extrabold transition-colors ${colorClassName}`}
      >
        <GlobeIcon aria-hidden="true" />
        <span className="underline underline-offset-4">
          {locale.toUpperCase()}
        </span>
        <Caret aria-hidden="true" />
      </button>
      {isOpen && (
        <ul className="absolute top-full right-0 z-10 mt-2 w-36 rounded-xs border border-line bg-white py-2 shadow-lg">
          {routing.locales.map((loc) => (
            <li key={loc}>
              <Link
                href={pathname}
                locale={loc}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-1.5 text-[15px] text-brand hover:bg-brand/5 ${
                  loc === locale ? "font-bold" : "font-normal"
                }`}
              >
                {localeLabels[loc]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
